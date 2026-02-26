---
tags:
  - cloud
  - enterprise
  - installation
  - kubernetes
  - netbox
category: enterprise-documentation
audience: administrators
complexity: intermediate
title: NetBox Enterprise Installation (v1.13)
description: Step-by-step guide for installing NetBox Enterprise Embedded Cluster
source: localdocs
lastUpdatedAt: 1769027798000
canonical: /docs/v1.13/enterprise/enterprise-features/nbe-ec-installation/
---

# NetBox Enterprise Installation

## Overview

This guide walks through the complete installation process for NetBox Enterprise Embedded Cluster. The installation consists of two main phases: deploying the Kubernetes cluster infrastructure, then configuring and deploying the NetBox application within that cluster.

**Expected Duration:** 30-45 minutes

## Prerequisites

Before beginning installation, ensure you have completed all preparation steps:

### Required Preparation

- [ ] **System prepared**: Complete distribution-specific preparation
  - [Ubuntu preparation steps](nbe-ec-requirements-ubuntu.md)
  - [RHEL preparation steps](nbe-ec-requirements-rhel.md)
- [ ] **Authorization token received**: Obtain download token from NetBox Labs
- [ ] **Hostname finalized**: Choose permanent hostname (cannot be changed after installation due to kubernetes limitations)
- [ ] **IP address finalized**: Configure static IP (cannot be changed after installation due to kubernetes limitations)
- [ ] **Firewall configured**: Ensure [required ports](nbe-ec-requirements.md#network-requirements) are open

:::danger[Hostname and IP Cannot Change]
The hostname and IP address of the host **cannot be changed** after installation. Finalize these settings before proceeding.

:::
### Recommended Preparation

- [ ] **TLS certificate ready**: Prepare custom TLS certificate for admin console (optional, can configure later)
- [ ] **Database planned**: Decide between embedded PostgreSQL or external database
- [ ] **Cache planned**: Decide between embedded Redis or external cache
- [ ] **Resource allocation planned**: Review [system requirements](nbe-ec-requirements.md#recommended)

### Network Requirements

Verify network connectivity from your installation host:

| Service | URL/Hostname | Purpose |
|---------|--------------|---------|
| Download server | `app.enterprise.netboxlabs.com` | Installer download |
| Container registry | `registry.enterprise.netboxlabs.com` | Container images |
| License validation | `proxy.enterprise.netboxlabs.com` | License checking |

For proxy environments, see [proxy configuration](nbe-ec-requirements.md#traditional-proxies).

## Installation Process

### Phase 1: Deploy the Admin Console and Cluster\{#deploying-the-cluster\}

#### Step 1: Download Installer

Download the NetBox Enterprise installer package to your prepared host:

```bash
# Download installer (replace <token> with your authorization token)
curl -f "https://app.enterprise.netboxlabs.com/embedded/netbox-enterprise/stable" \
  -H "Authorization: <token>" \
  -o netbox-enterprise-stable.tgz
```

**Verify Download:**

```bash
# Check file size (should be approximately 300 MB)
ls -lh netbox-enterprise-stable.tgz

# Verify file is complete (not empty or truncated)
file netbox-enterprise-stable.tgz
```

Expected output: `netbox-enterprise-stable.tgz: gzip compressed data`

:::tip[Download Troubleshooting]
- If download fails, verify firewall allows HTTPS to `app.enterprise.netboxlabs.com`
- For proxy environments, use: `curl -f ... --proxy http://proxy:port ...`
- Contact NetBox Labs support if authorization token doesn't work

:::
#### Step 2: Extract and Install

Extract the installer and launch the installation process:

```bash
# Extract installer package
tar -xvzf netbox-enterprise-stable.tgz

# Launch installation with license file
sudo ./netbox-enterprise install --license license.yaml
```

**For Proxy Environments:**

```bash
sudo ./netbox-enterprise install \
  --license license.yaml \
  --http-proxy http://proxy.example.com:8888 \
  --https-proxy http://proxy.example.com:8888
```

**Installation Process:**

The installer will:
1. Verify system requirements
2. Prompt you to create an **Admin Console password** (save this securely)
3. Install embedded cluster components
4. Start the Admin Console

**Expected Output:**

```bash
Visit the Admin Console to configure and install netbox-enterprise: http://your-hostname:30000
```

**Installation Duration:** 5-10 minutes

### Phase 2: Configure and Deploy NetBox \{#deploying-netbox\}

#### Step 3: Access Admin Console

Open the Admin Console URL in your web browser:

```
http://your-hostname:30000
```

Enter the Admin Console password created during installation and click **Start**.

<div style={{maxWidth:"75%"}}>![Screenshot: Welcome to the NetBox Enterprise Admin Console](/enterprise-images/netbox-enterprise/installation/ent-01-welcome.png)</div>

#### Step 4: Configure TLS (Optional but Recommended)

The Admin Console initially uses a self-signed certificate. You'll see a TLS warning:

<div style={{maxWidth:"75%"}}>![Screenshot: Secure the Admin Console](/enterprise-images/netbox-enterprise/installation/ent-02a-tls.png)</div>

##### Option A: Accept Self-Signed Certificate (Quickstart)

Click `Continue` and accept the self-signed certificate in your browser. You can configure a custom certificate later.

##### Option B: Upload Custom TLS Certificate (Recommended for Production)

<div style={{maxWidth:"75%"}}>![Screenshot: Secure the Admin Console](/enterprise-images/netbox-enterprise/installation/ent-02b-tls.png)</div>

1. Set your hostname (FQDN recommended)
2. Upload your TLS certificate and private key
3. Click `Upload and continue`

For detailed TLS configuration, see [TLS and Ingress documentation](nbe-tls-ingress.md).

#### Step 5: Log In to Admin Console

After TLS configuration, log in with your Admin Console password:

<div style={{maxWidth:"75%"}}>![Screenshot: Log In](/enterprise-images/netbox-enterprise/installation/ent-03-login.png)</div>

#### Step 6: Cluster Node Configuration

**Once logged in, you'll be presented with the option to add additional nodes to the cluster.**

For single-node deployments, click **Continue** without adding nodes.

For multi-node high-availability deployments, see the [Multi-Node Installation Guide](nbe-multi-node.md).

<div style={{maxWidth:"75%"}}>![Screenshot: Nodes](/enterprise-images/netbox-enterprise/installation/ent-04-cluster.png)</div>

### Phase 3: Configure NetBox Application \{#configure-netbox-enterprise\}

#### Step 7: Create NetBox Superuser

Configure the initial NetBox superuser account:

<div style={{maxWidth:"75%"}}>![Screenshot: NetBox Configuration](/enterprise-images/netbox-enterprise/installation/ent-05-superuser.png)</div>

##### Superuser Configuration:

| Field | Description | Example |
|-------|-------------|---------|
| Hostname | NetBox FQDN | `netbox.example.com` |
| Username | NetBox admin username | `admin` |
| Email | Administrator email address | `admin@example.com` |
| Password | NetBox initial admin password | (secure password) |

!!! tip Password Management
    Save this password securely. You'll use it to log in to NetBox after deployment.

!!! warning One Time NetBox Admin Password
    The NetBox admin password is only set on initial installation and cannot be reset from the admin console later (you must use advanced tools to reset it on the command line).

#### Step 8: Configure Replicas and Resources

Set the number of NetBox application replicas and resource allocation:

<div style={{maxWidth:"75%"}}>![Screenshot: Replicas and Resources](/enterprise-images/netbox-enterprise/installation/ent-06-replicas-and-resources.png)</div>

##### Replica Configuration:

| Setting | Recommended | Notes |
|---------|-------------|-------|
| **Initial Installation** | 1 replica | Start with 1 for faster initial deployment |
| **Production (After Setup)** | 2-3 replicas | Increase after verifying installation |

##### Resource Presets:

| Preset | Memory per Replica | Use Case |
|--------|-------------------|----------|
| **Regular** (Default) | Up to 1.5Gi | Standard workloads |
| **Large** | Up to 3Gi | Moderate to heavy workloads |
| **Extra Large** | Up to 6Gi | Very large repositories or datasets |
| **2x Large** | Up to 12Gi | Repositories over 1GB or high-memory operations |

Choose the preset based on your workload requirements. You can adjust this later if needed.

**Configure your file storage:**

Choose between built-in local storage or external S3-compatible storage:

- **Built-in Local Storage**: Suitable for single-node deployments where files are stored locally on the server
- **External S3-Compatible Storage**: Required for multi-node deployments; optional but recommended for single-node deployments for better backup and disaster recovery

If using S3-compatible storage, provide:
- **S3 Endpoint**: Your S3 endpoint URL (e.g., `s3.amazonaws.com`, `s3.us-east-1.amazonaws.com`, or your MinIO/other provider endpoint)
- **Bucket Name**: The S3 bucket name for storing NetBox media files
- **Region**: The S3 region (e.g., `us-east-1`)
- **Access Key ID**: S3 access credentials
- **Secret Access Key**: S3 secret credentials

For migrating to S3 storage, see the [Storage Migration Guide](nbe-storage-migration.md).

<div style={{maxWidth:"75%"}}>![Screenshot: Built-in or external File Storage](/enterprise-images/netbox-enterprise/installation/ent-15-filestore.png)</div>

:::warning[Restore Mode]
Do **not** enable Restore Mode during initial installation. Only use Restore Mode when [migrating existing data](nbe-migrating.md).

:::
#### Step 9: Configure Database (PostgreSQL)

Choose between embedded PostgreSQL or external database:

<div style={{maxWidth:"75%"}}>![Screenshot: Built-in or external PostgreSQL](/enterprise-images/netbox-enterprise/installation/ent-07-postgresql.png)</div>

##### Option A: Built-in PostgreSQL (Recommended)

No configuration required. Automatically managed and included in cluster backups.

##### Option B: External PostgreSQL

For existing managed databases (AWS RDS, Cloud SQL, etc.). Requires hostname, port, database name, and credentials.

<div style={{maxWidth:"75%"}}>![Screenshot: External PostgreSQL Configuration](/enterprise-images/netbox-enterprise/installation/ent-07a-postgresql.png)</div>

#### Step 10: Configure Cache (Redis)

Choose between embedded Redis or external cache:

<div style={{maxWidth:"75%"}}>![Screenshot: Built-in or external Redis](/enterprise-images/netbox-enterprise/installation/ent-08-redis.png)</div>

##### Option A: Built-in Redis (Recommended)

No configuration required. Automatically managed.

##### Option B: External Redis

For existing managed cache (AWS ElastiCache, etc.). Requires hostname, port, and password if authentication is enabled.

<div style={{maxWidth:"75%"}}>![Screenshot: External Redis Configuration](/enterprise-images/netbox-enterprise/installation/ent-08a-redis.png)</div>

#### Step 11: Accept Terms of Service

Accept the NetBox Enterprise Terms of Service to proceed with deployment:

<div style={{maxWidth:"75%"}}>![Screenshot: Accept TOS](/enterprise-images/netbox-enterprise/installation/ent-09-accept.png)</div>

Type **ACCEPT** (case-insensitive) and click `Continue`.

### Phase 4: Deploy and Verify \{#finish-the-deployment\}

#### Step 12: Run Pre-flight Checks

The installer runs pre-flight checks to verify system readiness:

<div style={{maxWidth:"75%"}}>![Screenshot: Preflights](/enterprise-images/netbox-enterprise/installation/ent-10-preflights.png)</div>

**Pre-flight Checks Verify:**

- Sufficient system resources (CPU, memory, disk)
- Required network ports are available
- Kernel modules loaded
- System configuration meets requirements

If checks fail, review error messages and correct issues before proceeding.

#### Step 13: Deploy NetBox

Click **`Deploy`** to start the NetBox application deployment.

You'll be redirected to the Admin Console Dashboard showing deployment status:

<div style={{maxWidth:"75%"}}>![Screenshot: Deployment "Unavailable"](/enterprise-images/netbox-enterprise/installation/ent-11-deploying.png)</div>

**Deployment Process:**

The initial deployment performs:
1. Pull container images from registry
2. Start NetBox application pods
3. Initialize PostgreSQL database
4. Run database migrations
5. Configure NGINX ingress
6. Health check all services

**Expected Duration:** 10-15 minutes for initial deployment

#### Step 14: Verify Deployment Success \{#verify-the-deployment\}

Monitor the dashboard until status changes to **`Ready`**:

<div style={{maxWidth:"75%"}}>![Screenshot: Deployment "Ready"](/enterprise-images/netbox-enterprise/installation/ent-12-ready.png)</div>

**When Status Shows `Ready`:**

- NetBox is fully initialized
- Database migrations completed
- Application is accessible on ports 80 and 443

#### Step 15: Access NetBox

Once deployed, access NetBox via web browser:

```
http://your-hostname
```

Or for HTTPS (with valid TLS certificate):

```
https://your-hostname
```

**Log in with your superuser credentials:**

<div style={{maxWidth:"75%"}}>![Screenshot: NetBox Enterprise Login](/enterprise-images/netbox-enterprise/installation/ent-13-nb-login.png)</div>

**Verify successful login:**

![Screenshot: NetBox Enterprise Home](/enterprise-images/netbox-enterprise/installation/ent-14-nb-home.png)

## Post-Installation

| Task | Instructions |
|------|--------------|
| **Increase replicas** (production) | Admin Console > Config > Number of Replicas > Save > Deploy |
| **Configure authentication** | [SAML](nbe-saml.md), [Azure AD](nbe-azure-sso.md), [OIDC](nbe-oidc-sso.md), [LDAP](nbe-ldap.md) |
| **Install plugins** | [Built-in plugins](nbe-ec-built-in-plugins.md), [Custom plugins](nbe-ec-custom-plugins.md) |
| **Configure backups** | [Backup guide](nbe-backups.md) |
| **Migrate existing data** | [Migration guide](nbe-migrating.md) |

## Troubleshooting

For detailed troubleshooting, see the [Troubleshooting Guide](nbe-troubleshooting.md).

| Issue | Quick Check |
|-------|-------------|
| Installation fails | Verify swap disabled (`swapon --show`), kernel modules loaded, disk space available |
| Cannot access Admin Console | Check `systemctl status k0scontroller` and firewall allows port 30000 |
| Deployment stuck "Unavailable" | Check pod status: `sudo /var/lib/embedded-cluster/bin/kubectl get pods -A` |
| Pre-flight checks fail | Review failure message; common causes: disk space, port conflicts, missing kernel modules |
| Cannot log in to NetBox | Verify pods running; reset password via Admin Console > Config |

**Reset and retry installation:**

```bash
sudo ./netbox-enterprise reset
sudo ./netbox-enterprise install --license license.yaml
```

## Additional Resources

- [NetBox Enterprise Overview](nbe-overview.md)
- [System Requirements](nbe-ec-requirements.md)
- [Linux System Changes](nbe-ec-linux-changes.md)
- [Data Migration Guide](nbe-migrating.md)
- [NetBox Enterprise Troubleshooting](nbe-troubleshooting.md)
- [Release Notes](nbe-release-notes.md)
