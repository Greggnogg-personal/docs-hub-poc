---
tags:
  - administration
  - api
  - authentication
  - enterprise
  - netbox
  - storage
category: enterprise-documentation
audience: administrators
complexity: intermediate
title: 'NetBox Enterprise: Migrating to S3-Compatible Storage'
source: localdocs
lastUpdatedAt: 1769030791000
canonical: /docs/enterprise/enterprise-features/nbe-storage-migration/
---
# Migrating to S3-Compatible Storage

NetBox Enterprise can store media files (uploaded images, device type images, custom scripts, and attachments) in either local filesystem storage or external S3-compatible object storage. This guide explains how to migrate from local storage to S3-compatible storage.

## When to Migrate

Consider migrating to S3-compatible storage when:

- **Preparing for Multi-Node Deployment**: Multi-node high-availability deployments require S3-compatible storage so all nodes can access the same files
- **Improving Backup and Disaster Recovery**: Cloud-based object storage typically offers better durability, redundancy, and backup options than local storage
- **Centralizing Storage**: Manage media files alongside other organizational data in a centralized storage service

:::note
Multi-node deployments require S3-compatible storage starting with NetBox Enterprise v1.13. See the [Multi-Node Deployment Guide](nbe-multi-node.md) for details.

:::
## Prerequisites

:::info[Storage Provider Options]
NetBox Enterprise supports any S3-compatible storage provider including AWS S3, Google Cloud Storage, Azure Blob Storage, DigitalOcean Spaces, MinIO, and more. See [Storage Options](nbe-storage-options.md) for complete provider details, bucket setup, and CORS configuration.

:::
## Migration Prerequisites

Before starting the migration:

1. **NetBox Enterprise v1.13 or later** installed and running
2. **S3 bucket configured** with appropriate permissions for read/write access
3. **Access credentials** (Access Key ID and Secret Access Key)
4. **Network connectivity** from your NetBox Enterprise server to the S3 endpoint
5. **Backup** of your current NetBox data (see [Backups Guide](nbe-backups.md))

## Migration Overview

The migration process consists of eight main steps:

1. **Prepare**: Configure your S3 bucket and verify connectivity
2. **Enter Maintenance Mode**: Put NetBox Enterprise into maintenance mode via the Admin Console
3. **Copy**: Copy existing files from local storage to S3
4. **Verify**: Confirm all files copied successfully and match the originals
5. **Database Migration**: Update database file references to point to S3 storage
6. **Extract State**: Copy the migration state file from the pod for your records
7. **Configure and Exit Maintenance Mode**: Update NetBox Enterprise to use S3 storage and exit maintenance mode via the Admin Console
8. **Test**: Verify NetBox can access files and upload new files to S3

This approach ensures data consistency by performing the migration while NetBox is in maintenance mode, preventing any file changes during the migration process.

## Step 1: Prepare S3 Storage

### Configure S3 Bucket and Credentials

1. Create an S3 bucket in your chosen storage provider
2. Note the following information:
   - **Bucket name**
   - **Region** (e.g., `us-east-1`)
   - **Endpoint URL** (if using non-AWS S3, e.g., `https://s3.your-domain.com`)
   - **Access Key ID**
   - **Secret Access Key**

### Test S3 Connectivity

Verify network connectivity and credentials by temporarily configuring S3 in a shell session.

:::info[About kubectl Access]
The migration commands run inside your NetBox Enterprise cluster using `kubectl`. See the [troubleshooting documentation](nbe-troubleshooting.md#accessing-your-cluster) for instructions on accessing your cluster from the command line.

:::
## Step 2: Enter Maintenance Mode

Before starting the migration, put NetBox Enterprise into maintenance mode to prevent any file changes during the migration process.

1. Access the Admin Console at `https://<your-server>:30000/`
2. Log in with your Admin Console password
3. On the **Config** tab, check the `Enable Maintenance Mode` option
4. **Save Config**, then **Go to the updated version** and click **Deploy** to apply the change

:::warning[NetBox Will Be Unavailable]
While in maintenance mode, NetBox will be unavailable to users. Plan your maintenance window accordingly.

:::
Wait for NetBox to fully stop before proceeding to the next step. The Admin Console Dashboard will show the application status as **Ready**, but NetBox will be unreachable.

## Step 3: Copy Files to S3

Copy your existing media files from local storage to S3.

### Access the Maintenance Mode Pod

First, open an interactive shell session inside the maintenance mode pod:

:::info[About kubectl Access]
The migration commands run inside your NetBox Enterprise cluster using `kubectl`. See the [troubleshooting documentation](nbe-troubleshooting.md#accessing-your-cluster) for instructions on accessing your cluster from the command line.

```shell
# Get maintenance mode pod information
NETBOX_NAMESPACE="$(kubectl get deployments \
  -A -l 'app.kubernetes.io/component=maintenance-mode' \
  -ojsonpath='{.items[0].metadata.namespace}')" && \
MAINTENANCE_POD="$(kubectl get pod \
  -o name \
  -n "${NETBOX_NAMESPACE}" \
  -l 'app.kubernetes.io/component=maintenance-mode' \
  | head -n 1)"

# Open an interactive shell in the maintenance mode container
kubectl exec -it "${MAINTENANCE_POD}" \
  -n "${NETBOX_NAMESPACE}" \
  -- /bin/bash
```

:::
### Set Environment Variables Inside the Pod

Once inside the pod, set your S3 credentials as environment variables:

```shell
# Set environment variables with your S3 credentials
export AWS_ACCESS_KEY_ID="your-access-key-id"
export AWS_SECRET_ACCESS_KEY="your-secret-access-key"
export AWS_STORAGE_BUCKET_NAME="your-bucket-name"
export AWS_S3_REGION_NAME="us-east-1"

# For non-AWS S3 providers (MinIO, etc.), also set endpoint:
# export AWS_S3_ENDPOINT_URL="https://s3.your-domain.com"
```

### Run the Copy Command

With the environment variables set, run the migration copy command:

```shell
# Preview the copy operation (dry run)
python manage.py migrate_storage copy \
  --source filesystem \
  --destination s3 \
  --state-file /tmp/migrate-state.json \
  --dry-run

# Perform the actual copy
python manage.py migrate_storage copy \
  --source filesystem \
  --destination s3 \
  --state-file /tmp/migrate-state.json \
  --batch-size 100
```

The copy process will:
- Test connectivity to S3
- Copy all media files to the S3 bucket
- Display progress and report any errors
- Track progress in `/tmp/migrate-state.json` in case the operation is interrupted

:::note[Copy Progress]
The copy process tracks its state in the state file, so you can safely interrupt and restart it. Previously copied files will be skipped.

:::
:::warning[Keep the Shell Session Open]
Stay in the same pod shell session for the verify and database migration steps. The environment variables and state file need to persist across all migration commands.

:::
## Step 4: Verify Files

Verify that all files copied successfully by comparing checksums between the source and destination. Continue in the same pod shell session from Step 3.

```shell
# Verify all files (run inside the pod)
python manage.py migrate_storage verify \
  --source filesystem \
  --destination s3 \
  --state-file /tmp/migrate-state.json
```

The verification process will:
- Compare checksums for each file
- Verify file sizes match
- Report any discrepancies or missing files

:::warning[Do Not Proceed if Verification Fails]
If verification reports errors, investigate and resolve them before continuing. Do not proceed to the database migration step until all files verify successfully.

:::
## Step 5: Migrate Database References

With files copied and verified, update the database to point file references to the S3 storage backend. Continue in the same pod shell session.

```shell
# Update database records to use S3 paths (run inside the pod)
python manage.py migrate_storage database_migration \
  --source filesystem \
  --destination s3 \
  --state-file /tmp/migrate-state.json
```

When prompted, confirm that you want to proceed with the database migration.

## Step 6: Extract State File and Exit Pod

After completing the copy, verify, and database migration steps, extract the state file from the pod for your records, then exit the shell session.

### Exit the Pod Shell

```shell
# Exit the pod shell session
exit
```

### Copy State File from Pod

From your local machine, copy the migration state file for your records:

```shell
# Get maintenance mode pod information (if not already set)
NETBOX_NAMESPACE="$(kubectl get deployments \
  -A -l 'app.kubernetes.io/component=maintenance-mode' \
  -ojsonpath='{.items[0].metadata.namespace}')" && \
MAINTENANCE_POD="$(kubectl get pod \
  -o name \
  -n "${NETBOX_NAMESPACE}" \
  -l 'app.kubernetes.io/component=maintenance-mode' \
  | head -n 1)"

# Copy state file from pod to local machine
kubectl cp "${NETBOX_NAMESPACE}/${MAINTENANCE_POD#pod/}:/tmp/migrate-state.json" \
  ./migrate-state.json

# Verify the file was copied
cat ./migrate-state.json
```

:::info[State File]
Keep the state file for your records. It documents which files were migrated and can be useful for troubleshooting if issues arise.

:::
## Step 7: Configure S3 and Exit Maintenance Mode

Now that the files are migrated and database references updated, configure NetBox Enterprise to use S3 storage and exit maintenance mode through the Admin Console.

### Update Storage Configuration

1. Access the Admin Console at `https://<your-server>:30000/`
2. Log in with your Admin Console password
3. Navigate to the **Config** tab
4. Scroll to the **Storage Configuration** section
5. Change **Storage Type** from **Built-in Local Storage** to **External S3-Compatible Storage**
6. Enter your S3 configuration using the same values you used in Step 3:
   - **S3 Endpoint**: Your S3 endpoint URL (e.g., `s3.amazonaws.com`, `s3.us-east-1.amazonaws.com`, or custom endpoint)
   - **Bucket Name**: Your S3 bucket name
   - **Region**: Your S3 region (e.g., `us-east-1`)
   - **Access Key ID**: Your S3 access credentials
   - **Secret Access Key**: Your S3 secret credentials
7. Disable **Maintenance Mode** by un-checking **Enable Maintenance Mode**
8. Click **Save config** at the bottom of the form

:::tip[Use the Same Credentials]
Use the same S3 credentials (Access Key ID, Secret Access Key, bucket name, region, and endpoint) that you exported as environment variables in Step 3. This ensures NetBox connects to the same S3 bucket where your files were migrated.

:::
### Deploy and Exit Maintenance Mode

After saving the configuration:

1. You will be returned to the main Admin Console screen
2. Click **Deploy** to apply the new S3 storage configuration
3. This will also exit maintenance mode and start NetBox with the new configuration

NetBox Enterprise will start with the new storage configuration. This typically takes 2-3 minutes.

## Step 8: Test and Verify

After completing the migration, thoroughly test NetBox's file operations:

### Verification Checklist

- [ ] **View Existing Images**: Navigate to device types and verify uploaded images display correctly
- [ ] **View Attachments**: Check that existing attachments are accessible
- [ ] **Upload New Image**: Upload a device type image and verify it saves to S3
- [ ] **Upload New Attachment**: Create a new attachment and verify it saves to S3
- [ ] **Check Admin Console**: Verify no errors in the Admin Console dashboard
- [ ] **Review Logs**: Check NetBox logs for any storage-related errors

### Verify Files in S3

Use your S3 provider's console or CLI to confirm files exist in the bucket:

```shell
# Example for AWS S3
aws s3 ls s3://your-bucket-name/media/ --recursive
```

You should see your media files in the bucket under appropriate paths.

## Troubleshooting

### Connectivity Errors

**Symptom**: Cannot connect to S3 endpoint

**Solutions**:
- Verify the S3 endpoint URL is correct
- Check network connectivity: `ping s3.amazonaws.com` or equivalent
- Verify firewall rules allow outbound HTTPS traffic
- For self-hosted S3 (MinIO, etc.), verify the endpoint is accessible from your NetBox server

### Authentication Errors

**Symptom**: "Access Denied" or "Invalid credentials" errors

**Solutions**:
- Verify Access Key ID and Secret Access Key are correct
- Check IAM permissions for the S3 bucket (read, write, list permissions required)
- Ensure credentials haven't expired
- For MinIO or other providers, verify credentials format matches their requirements

### SSL Certificate Errors

**Symptom**: SSL verification errors when connecting to S3

**Solutions**:
- For self-signed certificates, configure your certificate authority in the Admin Console
- Verify the S3 endpoint uses a valid SSL certificate
- Check system CA certificates are up to date
- For testing only (not recommended for production), you can temporarily disable SSL verification in the S3 configuration

### Files Not Appearing After Migration

**Symptom**: NetBox shows broken images or missing attachments after migration

**Solutions**:
- Verify the database migration step completed successfully
- Check S3 bucket permissions allow read access
- Verify NetBox is configured with correct S3 credentials
- Review NetBox logs for specific error messages: `kubectl logs -n <namespace> <netbox-pod> -c netbox`

### Copy or Verify Failures

**Symptom**: Some files fail to copy or verify

**Solutions**:
- Re-run the copy command - it will skip already-copied files
- Check source files are readable and not corrupted
- Verify sufficient space in S3 bucket
- Check for files with special characters in names

## Important Notes

:::warning[Keep Original Files]
Do not delete your original local media files immediately after migration. Keep them as a backup for at least several weeks until you confirm the S3 storage is working reliably.

:::
:::info[Multi-Node Deployment]
After migrating to S3 storage, your NetBox Enterprise deployment is ready for multi-node configuration. See the [Multi-Node Deployment Guide](nbe-multi-node.md) for instructions on adding additional nodes.

:::
## Next Steps

- **Configure Backups**: Set up disaster recovery backups that include your S3 storage. See the [Backups Guide](nbe-backups.md)
- **Multi-Node Deployment**: If preparing for high availability, proceed with [Multi-Node Deployment](nbe-multi-node.md)
- **Monitor Storage**: Regularly monitor your S3 bucket usage and costs
- **Test Restores**: Periodically test restoring from backups to ensure disaster recovery works correctly
