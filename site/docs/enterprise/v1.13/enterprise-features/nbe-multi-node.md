---
tags:
  - administration
  - configuration
  - enterprise
  - high-availability
  - installation
  - netbox
  - operations
category: enterprise-documentation
audience: administrators
complexity: advanced
title: NetBox Enterprise Multi-Node Deployment (v1.13)
source: localdocs
lastUpdatedAt: 1769032343000
canonical: /docs/v1.13/enterprise/enterprise-features/nbe-multi-node/
---
# NetBox Enterprise Multi-Node Deployment

NetBox Enterprise Multi-Node enables high-availability (HA) deployments by distributing NetBox across multiple servers in an active-active configuration. This provides zero-downtime maintenance, automatic failover, and horizontal scaling.

## High Availability Overview

Multi-Node deployment uses Kubernetes to distribute NetBox pods across multiple physical or virtual machines:

- **Active-Active Configuration**: All nodes actively serve traffic simultaneously
- **Automatic Failover**: If a node fails, traffic automatically routes to healthy nodes without manual intervention
- **Zero Downtime**: Perform maintenance, upgrades, or node replacements without service interruption
- **Horizontal Scaling**: Add nodes as usage grows to distribute load

Multi-Node is a **Premium tier add-on** supporting up to 3 nodes (with additional nodes available). For pricing, see the [NetBox Labs pricing page](https://netboxlabs.com/pricing) or contact sales.

## Requirements

Multi-Node deployments have one additional requirement compared to single-node installations:

**External S3-Compatible Storage** (required for multi-node and available in v1.13+):

- Cloud providers: AWS S3, Google Cloud Storage, Azure Blob Storage, DigitalOcean Spaces
- Self-hosted: MinIO, Ceph (with RadosGW), SeaweedFS
- Must be accessible from all nodes
- Requires AWS Signature Version 4 authentication

All other requirements (hardware, OS, network) are the same as single-node installations. See [NetBox Enterprise Requirements](nbe-ec-requirements.md).

## Installation Steps

### Step 1: Install NetBox Enterprise on First Node

Follow the standard [NetBox Enterprise Installation Guide](nbe-ec-installation.md) on your first node with these considerations:

1. During installation, configure **External S3-Compatible Storage** when prompted (required for multi-node)
2. Set **Replicas** to `1` for initial deployment
3. PostgreSQL and Redis can be built-in or external (external recommended for production HA)

Complete the installation and verify NetBox is accessible and functioning correctly.

### Step 2: Add Nodes to the Cluster

1. Access the Admin Console at `https://<first-node-ip>:30000/`
2. Navigate to **Cluster Management** tab
3. Click **Add node** button to generate join commands

   ![Add a Node](/enterprise-images/netbox-enterprise/multi-node-add-dialog.jpg)

4. On each new node, run the provided commands:

   ```bash
   # Download the binary
   curl -k https://<first-node-ip>:30000/api/v1/embedded-cluster/binary -o netbox-enterprise.tgz

   # Extract the binary
   tar -xvf netbox-enterprise.tgz

   # Join the cluster (use the token from Admin Console)
   sudo ./netbox-enterprise join <first-node-ip>:30000 <join-token>
   ```

   ![Join Node Terminal Output](/enterprise-images/netbox-enterprise/multi-node-join-terminal.jpg)

5. Verify nodes have joined successfully in the **Cluster Management** tab

   ![Cluster Management Nodes View](/enterprise-images/netbox-enterprise/multi-node-cluster-management.jpg)
6. Enable cluster HA:

   When joining the third node, the installer will prompt you to enable high availability. If you choose **Yes** during the join process, HA will be enabled automatically.

   If you did not enable HA during the join process, you can enable it later using the CLI:

    ```bash
    sudo ./netbox-enterprise enable-ha
    ```

The Embedded Cluster will automatically distribute workloads across all nodes once they join.

## Load Balancer Configuration

For true high availability, configure a load balancer in front of your multi-node cluster to provide a single entry point and automatic failover.

### Requirements

- TCP load balancer (Layer 4) or application load balancer (Layer 7)
- TLS/SSL certificate with SANs for all node hostnames plus load balancer hostname
- Health check capability

### Example Configuration

Consider a 3-node cluster:

- **Node Hostnames**: `netbox-01.example.com`, `netbox-02.example.com`, `netbox-03.example.com`
- **Load Balancer VIP**: `netbox.example.com`
- **TLS Certificate SANs**: All four DNS names (3 nodes + load balancer)

### Load Balancer Setup

1. **Configure backend pool** with all cluster nodes
2. **Forward TCP port 443** to all three nodes for NetBox web UI
3. **Forward TCP port 443** to all three nodes for Diode gRPC (if using Discovery/integrations)
4. **Configure health checks** to verify node availability
5. **Install TLS certificate** in NetBox Enterprise Admin Console with SANs for all hostnames

### Health Check Configuration

Configure health checks to verify node availability:

| Check Type | Endpoint | Expected Response |
|------------|----------|-------------------|
| **HTTP** | `https://node:443/login/` | 200 OK |
| **TCP** | Port 443 | Connection accepted |

### Certificate Installation

Install your TLS certificate with multiple SANs via the Admin Console:

1. Navigate to Admin Console → **Config** → **TLS**
2. Upload certificate, private key, and CA bundle (if applicable)
3. Verify certificate includes all node hostnames plus load balancer hostname
4. Save configuration and deploy changes

Users will access NetBox at `https://netbox.example.com` while the load balancer distributes requests across all healthy nodes.

## Disaster Recovery for Multi-Node

Multi-node deployments use the same disaster recovery procedures as single-node installations. See the [Backups Guide](nbe-backups.md#using-disaster-recovery-for-backups) for complete instructions.

**Important for Multi-Node Restore:**

1. **Create a Backup**: Follow the standard [disaster recovery backup procedure](nbe-backups.md#backing-up-the-netbox-enterprise-installation) which stores backups in your configured S3 bucket.

2. **Restore**: When restoring a multi-node deployment:
   - Run `./netbox-enterprise restore` on the first node
   - When prompted for S3 credentials, provide the **same bucket, endpoint, and credentials** used in your original deployment
   - When prompted to add nodes during the restore process, use the provided join commands to add additional nodes to the cluster
   - Complete the restore workflow following the [restore instructions](nbe-backups.md#restoring-the-netbox-enterprise-installation)

The restore process will recreate your multi-node cluster with all data preserved from the S3-backed disaster recovery backup.

## Post-Installation

After deployment:

- **Configure Backups**: Set up regular database backups using the [Backups Guide](nbe-backups.md)
- **Configure SSO** (optional): [Azure AD](nbe-azure-sso.md), [LDAP](nbe-ldap.md), [OIDC](nbe-oidc-sso.md), [SAML](nbe-saml.md)
- **Install Plugins** (optional): [Built-in](nbe-ec-built-in-plugins.md) or [Custom](nbe-ec-custom-plugins.md)
- **Configure TLS**: See [TLS Ingress Configuration](nbe-tls-ingress.md)

## Troubleshooting

For issues specific to multi-node deployments:

:::info[About kubectl Access]
The troubleshooting commands below run using `kubectl`. See the [troubleshooting documentation](nbe-troubleshooting.md#accessing-your-cluster) for instructions on accessing your cluster from the command line.

:::
**Pod Distribution Issues**: Verify nodes are healthy and have sufficient resources:
```bash
kubectl get nodes
kubectl get pods -n kotsadm -o wide
```

**S3 Access Errors**: Verify S3 credentials and connectivity from all nodes:
```bash
aws s3 ls s3://your-bucket-name
```

**Images Not Loading**: Check that CORS is properly configured on your S3 bucket to allow requests from your NetBox domain.

For general troubleshooting, see the [NetBox Enterprise Troubleshooting Guide](nbe-troubleshooting.md).
