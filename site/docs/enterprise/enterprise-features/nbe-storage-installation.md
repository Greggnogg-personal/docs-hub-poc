---
tags:
  - administration
  - cloud
  - configuration
  - enterprise
  - installation
  - netbox
category: enterprise-documentation
audience: administrators
complexity: intermediate
title: 'NetBox Enterprise: NetBox Enterprise Storage Installation'
source: localdocs
lastUpdatedAt: 1764934729000
canonical: /docs/enterprise/enterprise-features/nbe-storage-installation/
---
# NetBox Enterprise Storage Installation

Configure S3-compatible storage during NetBox Enterprise installation. For existing installations, see [Storage Migration](nbe-storage-migration.md). For storage providers and CORS setup, see [Storage Options](nbe-storage-options.md).

## Installation Configuration

When prompted for **File Storage** configuration during installation:

1. Select **External S3-Compatible Storage**
2. Provide the following details:

| Field | Description | Example |
|-------|-------------|---------|
| **S3 Endpoint** | S3 service endpoint URL | `s3.amazonaws.com` (AWS) |
| | | `nyc3.digitaloceanspaces.com` (DO) |
| | | `minio.example.com` (MinIO) |
| **S3 Bucket Name** | Name of your S3 bucket | `netbox-enterprise-media` |
| **S3 Region** | Storage region | `us-east-1` (AWS) |
| | | `nyc3` (DigitalOcean) |
| **Access Key ID** | S3 access key | `AKIAIOSFODNN7EXAMPLE` |
| **Secret Access Key** | S3 secret key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |

## Advanced Options

Additional S3 configuration options (if needed):

| Option | Description | When to Use |
|--------|-------------|-------------|
| **Custom Endpoint URL** | Override default endpoint | Self-hosted S3 (MinIO, Ceph) |
| **Path Style Access** | Use path-style URLs instead of virtual-hosted | Older S3 implementations |
| **SSL Verification** | Verify SSL certificates | Disable for self-signed certs (not recommended) |
| **Custom ACL** | Set object ACL | Customize object permissions |

## Testing S3 Configuration

After configuration, NetBox Enterprise will test S3 connectivity:

1. **Upload Test**: Attempts to write a test file to S3
2. **Read Test**: Attempts to read the test file back
3. **Delete Test**: Removes the test file
4. **CORS Test**: Verifies browser access (performed post-deployment)

If tests fail, review your S3 credentials, bucket permissions, and network connectivity. See [Storage Options - Troubleshooting](nbe-storage-options.md#troubleshooting) for details.
