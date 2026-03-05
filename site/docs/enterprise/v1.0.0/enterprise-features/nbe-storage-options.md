---
tags:
  - administration
  - cloud
  - configuration
  - enterprise
  - netbox
  - operations
category: enterprise-documentation
audience: administrators
complexity: intermediate
title: 'NetBox Enterprise: NetBox Enterprise Storage Options'
source: localdocs
lastUpdatedAt: 1764934729000
canonical: /docs/enterprise/enterprise-features/nbe-storage-options/
---
# NetBox Enterprise Storage Options

Multi-Node NetBox Enterprise requires external S3-compatible object storage for shared media files, image uploads, and custom plugin files. This guide covers storage providers, bucket setup, CORS configuration, and troubleshooting.

:::important[S3 Storage Required]
Unlike single-node deployments, Multi-Node NetBox Enterprise **requires** external S3-compatible storage. Built-in local storage cannot be shared across multiple nodes. All cluster nodes must access the same S3 bucket for NetBox to function correctly.

:::
## Overview

### Why S3 Storage?

S3-compatible object storage provides:

- **Shared Access**: All cluster nodes can read and write to the same storage
- **Durability**: Built-in redundancy and data protection
- **Scalability**: Grows automatically with your media storage needs
- **High Availability**: Geographic replication and fault tolerance
- **Cost Effective**: Pay only for storage used

### CORS Requirement

Cross-Origin Resource Sharing (CORS) configuration is **required** for all external S3 deployments. NetBox's web interface makes direct browser requests to S3 for static files and media. Without proper CORS settings, browsers will block these requests, causing images, static files, and other media to fail loading.

:::danger[CORS is Mandatory]
Do not skip CORS configuration. Without it, NetBox's UI will not function correctly—users will see broken images, missing icons, and failed uploads.

:::
## Supported Storage Providers

NetBox Enterprise supports any S3-compatible storage service that implements AWS S3 API with Signature Version 4 authentication.

### Cloud Services

| Provider | Service | Compatibility | Notes |
|----------|---------|---------------|-------|
| **AWS** | Amazon S3 | ✅ Native | Fully compatible, recommended |
| **Google Cloud** | Cloud Storage | ✅ S3-compatible API | Use XML API endpoint |
| **Azure** | Blob Storage | ✅ S3-compatible endpoint | Requires S3-compatible gateway |
| **DigitalOcean** | Spaces | ✅ Native | Fully S3-compatible |

### Self-Hosted Options

| Software | Maturity | Recommended For |
|----------|----------|-----------------|
| **MinIO** | Production-ready | General purpose, on-premises |
| **Ceph (RadosGW)** | Production-ready | Large scale, existing Ceph deployments |
| **SeaweedFS** | Production-ready | High performance, distributed systems |
| **Cloudian HyperStore** | Enterprise | Regulated industries, compliance |

## S3 Bucket Setup

### Create S3 Bucket

Before configuring NetBox Enterprise, create an S3 bucket with appropriate settings.

#### AWS S3

```bash
# Create bucket
aws s3api create-bucket \
    --bucket netbox-enterprise-media \
    --region us-east-1 \
    --create-bucket-configuration LocationConstraint=us-east-1

# Enable versioning (recommended)
aws s3api put-bucket-versioning \
    --bucket netbox-enterprise-media \
    --versioning-configuration Status=Enabled

# Block public access
aws s3api put-public-access-block \
    --bucket netbox-enterprise-media \
    --public-access-block-configuration \
        BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

#### DigitalOcean Spaces

```bash
# Create Space (using s3cmd)
s3cmd mb s3://netbox-enterprise-media \
    --host=nyc3.digitaloceanspaces.com \
    --host-bucket='%(bucket)s.nyc3.digitaloceanspaces.com'
```

#### MinIO

```bash
# Create bucket (using mc)
mc mb myminio/netbox-enterprise-media

# Enable versioning
mc version enable myminio/netbox-enterprise-media
```

### IAM Policy & Access Keys

Create an IAM user or service account with appropriate permissions.

#### AWS IAM Policy

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetBucketLocation"
            ],
            "Resource": "arn:aws:s3:::netbox-enterprise-media"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::netbox-enterprise-media/*"
        }
    ]
}
```

**Create IAM User**:

```bash
# Create user
aws iam create-user --user-name netbox-s3-user

# Attach policy
aws iam put-user-policy \
    --user-name netbox-s3-user \
    --policy-name NetBoxS3Access \
    --policy-document file://netbox-s3-policy.json

# Create access keys
aws iam create-access-key --user-name netbox-s3-user
```

Save the `AccessKeyId` and `SecretAccessKey` for NetBox Enterprise configuration.

## CORS Configuration \{#cors-configuration\}

Configure CORS to allow NetBox's web interface to access S3 resources directly from user browsers.

### AWS S3 \{#cors-aws\}

#### Using AWS Console

1. Navigate to your S3 bucket
2. Go to the **Permissions** tab
3. Scroll to **Cross-origin resource sharing (CORS)**
4. Add the following CORS configuration:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "HEAD"],
        "AllowedOrigins": ["https://your-netbox-domain.com"],
        "ExposeHeaders": ["ETag"],
        "MaxAgeSeconds": 3000
    }
]
```

#### Using AWS CLI

```bash
# Create CORS configuration file
cat > cors.json <<'EOF'
{
    "CORSRules": [
        {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "HEAD"],
            "AllowedOrigins": ["https://your-netbox-domain.com"],
            "ExposeHeaders": ["ETag"],
            "MaxAgeSeconds": 3000
        }
    ]
}
EOF

# Apply CORS configuration
aws s3api put-bucket-cors \
    --bucket netbox-enterprise-media \
    --cors-configuration file://cors.json
```

#### Using Terraform

```hcl
resource "aws_s3_bucket_cors_configuration" "netbox" {
  bucket = aws_s3_bucket.netbox_media.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["https://your-netbox-domain.com"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}
```

**AWS Documentation**: [AWS S3 CORS Configuration](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ManageCorsUsing.html)

### DigitalOcean Spaces \{#cors-digitalocean\}

#### Using DigitalOcean Control Panel

1. Navigate to your Space in the DigitalOcean dashboard
2. Go to the **Settings** tab
3. Scroll to **CORS Configurations**
4. Click **Add** and configure:
   - **Origin:** `https://your-netbox-domain.com`
   - **Allowed Methods:** GET, HEAD
   - **Allowed Headers:** *
   - **Access Control Max Age:** 3000

#### Using s3cmd

```bash
# Create CORS configuration file
cat > cors.xml <<'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>https://your-netbox-domain.com</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>HEAD</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <ExposeHeader>ETag</ExposeHeader>
    </CORSRule>
</CORSConfiguration>
EOF

# Apply CORS configuration
s3cmd setcors cors.xml \
    s3://netbox-enterprise-media \
    --host=nyc3.digitaloceanspaces.com \
    --host-bucket='%(bucket)s.nyc3.digitaloceanspaces.com'
```

**DigitalOcean Documentation**: [Spaces CORS Configuration](https://docs.digitalocean.com/products/spaces/how-to/configure-cors/)

### MinIO \{#cors-minio\}

#### Using MinIO Client (mc)

```bash
# Install mc if not already installed
# See: https://min.io/docs/minio/linux/reference/minio-mc.html

# Configure mc alias (one-time setup)
mc alias set myminio https://your-minio-endpoint.com ACCESS_KEY SECRET_KEY

# Create CORS configuration file
cat > cors.json <<'EOF'
{
    "CORSRules": [
        {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "HEAD"],
            "AllowedOrigins": ["https://your-netbox-domain.com"],
            "ExposeHeaders": ["ETag"],
            "MaxAgeSeconds": 3000
        }
    ]
}
EOF

# Apply CORS configuration
mc anonymous set-json cors.json myminio/netbox-enterprise-media
```

#### Using MinIO Console

1. Navigate to MinIO Console (typically port 9001)
2. Go to **Buckets** → Select your bucket
3. Click **Summary** → **CORS Configuration**
4. Add CORS rule with the same configuration as above

**MinIO Documentation**: [MinIO CORS Configuration](https://min.io/docs/minio/linux/administration/object-management.html#bucket-cors-configuration)

### Google Cloud Storage \{#cors-gcloud\}

```bash
# Create CORS configuration file
cat > cors.json <<'EOF'
[
    {
        "origin": ["https://your-netbox-domain.com"],
        "method": ["GET", "HEAD"],
        "responseHeader": ["Content-Type", "ETag"],
        "maxAgeSeconds": 3000
    }
]
EOF

# Apply CORS configuration
gsutil cors set cors.json gs://netbox-enterprise-media
```

**Google Cloud Documentation**: [Cloud Storage CORS Configuration](https://cloud.google.com/storage/docs/configuring-cors)

### Azure Blob Storage \{#cors-azure\}

```bash
# Apply CORS using Azure CLI
az storage cors add \
    --services b \
    --methods GET HEAD \
    --origins "https://your-netbox-domain.com" \
    --allowed-headers "*" \
    --exposed-headers "ETag" \
    --max-age 3000 \
    --account-name netboxstorage
```

**Azure Documentation**: [Azure Blob CORS Configuration](https://learn.microsoft.com/en-us/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services)

## Next Steps

- **Installation**: Configure S3 during NetBox Enterprise setup - see [Storage Installation](nbe-storage-installation.md)
- **Migration**: Migrate existing local storage to S3 - see [Storage Migration](nbe-storage-migration.md)

## Troubleshooting

### Images Not Loading \{#troubleshooting-images\}

**Symptoms**: Broken images, missing icons, failed uploads

**Cause**: CORS configuration missing or incorrect

**Solution**:

1. Check browser console for CORS errors:
   ```
   Access to fetch at 'https://s3.amazonaws.com/...' from origin 'https://netbox.example.com'
   has been blocked by CORS policy
   ```

2. Verify CORS configuration includes your NetBox domain:
   ```bash
   # AWS
   aws s3api get-bucket-cors --bucket netbox-enterprise-media

   # MinIO
   mc anonymous get-json myminio/netbox-enterprise-media
   ```

3. Ensure `AllowedOrigins` matches your NetBox URL exactly (including `https://`)

4. Clear browser cache after fixing CORS

### Connection Errors \{#troubleshooting-connection\}

**Symptoms**: "Unable to connect to S3" errors during installation or file uploads

**Possible Causes & Solutions**:

1. **Incorrect Endpoint**:
   - Verify endpoint URL format
   - AWS: `s3.{region}.amazonaws.com` or just `{region}.amazonaws.com`
   - DigitalOcean: `{region}.digitaloceanspaces.com`
   - MinIO: `https://minio.example.com` (include protocol)

2. **Network Connectivity**:
   - Test connection from cluster nodes:
     ```bash
     curl -I https://s3.amazonaws.com
     telnet minio.example.com 9000
     ```
   - Check firewall rules allow outbound HTTPS (port 443)

3. **Invalid Credentials**:
   - Verify Access Key ID and Secret Access Key
   - Check IAM permissions (AWS)
   - Test credentials with AWS CLI:
     ```bash
     aws s3 ls s3://netbox-enterprise-media \
         --profile netbox-test
     ```

### SSL Certificate Errors \{#troubleshooting-ssl\}

**Symptoms**: SSL verification errors, certificate validation failures

**Causes**:
- Self-signed certificates (self-hosted MinIO, Ceph)
- Expired certificates
- Certificate CN mismatch

**Solutions**:

1. **Use Valid Certificates** (recommended):
   - Obtain certificates from public CA (Let's Encrypt)
   - Configure S3 service with valid certificate

2. **Disable SSL Verification** (not recommended):
   - In NetBox Enterprise Admin Console, enable **Skip SSL Verification**
   - Only use for testing or isolated environments

3. **Add CA Certificate** (self-signed):
   - Upload custom CA certificate in NetBox Enterprise Admin Console configuration
   - Consult your S3 provider documentation for CA certificate requirements

### Permission Errors \{#troubleshooting-permissions\}

**Symptoms**: "Access Denied" or "403 Forbidden" errors

**Solution**:

1. Verify IAM policy includes required permissions:
   - `s3:ListBucket`
   - `s3:GetObject`
   - `s3:PutObject`
   - `s3:DeleteObject`

2. Check bucket policy doesn't deny access

3. Verify bucket exists and name is correct

4. For AWS: Confirm IAM user/role has policy attached

### Performance Issues \{#troubleshooting-performance\}

**Symptoms**: Slow image loading, timeouts during uploads

**Solutions**:

1. **Use Regional Endpoints**:
   - Deploy S3 in same region as NetBox cluster
   - Use region-specific S3 endpoints

2. **Enable CDN** (CloudFront, Cloudflare):
   - Add CDN in front of S3 bucket
   - Configure NetBox to use CDN URL

3. **Optimize Network**:
   - Use private networking when possible (AWS VPC endpoints, DigitalOcean VPC)
   - Check network latency between cluster and S3

4. **Review S3 Configuration**:
   - Ensure adequate IOPS/throughput provisioned
   - Monitor S3 request metrics

## Best Practices

### Security

- **Private Buckets**: Never make NetBox media bucket public
- **Least Privilege**: Use IAM policies with minimum required permissions
- **Credential Rotation**: Regularly rotate S3 access keys
- **TLS Encryption**: Always use HTTPS endpoints
- **Bucket Policies**: Restrict access to specific IP ranges if possible

### Reliability

- **Enable Versioning**: Protect against accidental deletions
- **Configure Lifecycle Policies**: Archive or delete old versions
- **Monitor Usage**: Set up alerts for unusual activity
- **Test Restores**: Regularly test backup restoration procedures

### Cost Optimization

- **Storage Classes**: Use appropriate storage tier (Standard, Infrequent Access)
- **Lifecycle Rules**: Move old objects to cheaper storage classes
- **Delete Incomplete Uploads**: Clean up failed multipart uploads
- **Monitor Costs**: Review S3 usage and costs monthly

### Performance

- **Regional Proximity**: Deploy S3 in same region as NetBox
- **CDN**: Use CloudFront or similar for global deployments
- **Connection Pooling**: Let NetBox handle connection management
- **Monitoring**: Track request latency and error rates

## Next Steps

After configuring S3 storage:

1. **[Install Multi-Node NetBox Enterprise](nbe-multi-node.md)** - Complete your deployment
2. **[Troubleshooting Guide](nbe-troubleshooting.md)** - Resolve issues
3. **[TLS Ingress Configuration](nbe-tls-ingress.md)** - Secure your deployment

:::info[Need Help?]
Contact NetBox Labs support for assistance with S3 configuration or Multi-Node deployment.

:::
