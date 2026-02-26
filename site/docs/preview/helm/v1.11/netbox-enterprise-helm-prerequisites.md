---
tags:
  - helm
  - enterprise
  - netbox
  - getting-started
  - kubernetes
  - private-registry
versions:
  enterprise: v1.11
status: current
related_docs:
  - netbox-enterprise-helm-overview
  - netbox-enterprise-helm-install
  - netbox-enterprise-helm-operations
  - netbox-enterprise-helm-advanced-configuration
source: localdocs
lastUpdatedAt: 1764689862000
canonical: /docs/preview/helm/v1.11/netbox-enterprise-helm-prerequisites/
---

import BetaBanner from './components/BetaBanner';

# Prerequisites

<nav aria-label="breadcrumb">
  <ol style={{display: 'flex', listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', fontSize: '14px', color: '#666'}}>
    <li><a href="/docs/" style={{color: '#3498db', textDecoration: 'none'}}>NetBox Labs Documentation</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li><a href="/docs/helm/" style={{color: '#3498db', textDecoration: 'none'}}>Helm Installation Guides</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li style={{color: '#666'}}>Prerequisites</li>
  </ol>
</nav>

<BetaBanner />

This guide covers all prerequisites for NetBox Enterprise Helm deployment, including system requirements, access setup, and preparation steps.

## Prerequisites Checklist

Before proceeding with installation, verify you have:

### System Requirements

- [ ] **Kubernetes cluster** version 1.26+ (recommended: 1.29+, tested with 1.29)
- [ ] **Helm 3.x** installed locally
- [ ] **kubectl** configured with cluster admin access
- [ ] **Recommended resources**: 8+ vCPU, 24+ GB RAM, 100+ GB SSD storage
- [ ] **Swap disabled** on cluster nodes

> **Having resource issues?** Monitor cluster resources with `kubectl top nodes` and `kubectl describe nodes`.

### Access & Authentication

- [ ] **Enterprise Portal access** with license key
- [ ] **Registry credentials** configured (`registry.enterprise.netboxlabs.com` access)
- [ ] **Kubernetes namespace** created (e.g., `netbox-enterprise`)
- [ ] **RBAC permissions** configured (see RBAC Requirements below)
- [ ] **LoadBalancer support** OR ingress controller configured

> **Registry authentication problems?** Test with `docker login registry.enterprise.netboxlabs.com -u $USERNAME -p $LICENSE_ID`.

#### RBAC Requirements

**Recommended Approach: Cluster Admin** (Fully Tested)

For most deployments, we recommend using cluster admin permissions with kubectl configured for cluster administration:

```bash
## Verify cluster admin access
kubectl auth can-i '*' '*' --all-namespaces
```

**Alternative for Restricted Environments: Namespace-Scoped Permissions**

For environments with strict RBAC policies, NetBox Enterprise is designed to work with namespace-scoped permissions. While this approach follows security best practices, it has not been fully validated across all deployment scenarios.

**Core Required Permissions:**

- **Secrets** (for Helm 3 metadata storage)
- **ConfigMaps, Services, Deployments, StatefulSets**
- **PersistentVolumeClaims, Ingresses, Jobs**
- **Pod read access** (for monitoring and operations)

**Example Namespace-Scoped Configuration:**

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: netbox-admin
  namespace: netbox-enterprise
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: admin  # Built-in Kubernetes admin role
subjects:
- kind: User
  name: customer-user
```

**When Cluster-Level Permissions Are Required:**

Cluster admin access is needed only for optional components that customers may choose to install separately:

- **Prometheus Operator CRDs** (monitoring)
- **Ingress controllers** (if not pre-existing)
- **Custom storage operators** (if using specialized storage)

**Important Note:** The namespace-scoped approach represents our engineering design intent to follow security best practices. However, we recommend thorough testing in your specific environment before production deployment, as validation across all customer configurations is ongoing.

## Dependencies

- [ ] **PostgreSQL** (external) OR sufficient resources for bundled database
- [ ] **Redis** (internal only - sufficient resources for bundled cache)
- [ ] **Storage class** configured for persistent volumes
- [ ] **TLS certificates** prepared (manual or cert-manager)
- [ ] **DNS records** configured for ingress hostnames

> **Database connection issues?** Test connectivity from a NetBox pod: `kubectl exec -it deployment/netbox-enterprise -- psql $DATABASE_URL` or use basic connectivity testing: `kubectl run -it --rm debug --image=busybox --restart=Never -- nc -zv hostname port`.

### Network & Security

- [ ] **Firewall rules** configured for inbound traffic to Kubernetes ingress IP and outbound for installations/upgrades/licensing
- [ ] **Network policies** (if applicable) configured
- [ ] **Security context** reviewed for your environment
- [ ] **Pod exec permissions** available for operations (backups, restore, custom plugins, Python commands)
- [ ] **Service mesh** (if applicable) configured

> **Pod Exec Permissions**: NetBox Enterprise requires the ability to execute commands within pods for essential operations including database backups and restores, custom plugin installations, and Python management commands. While customers can restrict these permissions during normal operations, they must be enabled for installation and maintenance activities.

> **Network connectivity problems?** Verify firewall rules and network policies allow required traffic. For comprehensive firewall requirements, refer to [NetBox Enterprise Requirements](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-ec-requirements/) and [Linux System Changes](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-ec-linux-changes/). For proxy configurations and restricted environments, see [Special Cases for Restricted Environments](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-ec-requirements/#special-cases-for-restricted-environments).

### Verification Commands

```bash
## Check Kubernetes version
kubectl version

## Verify cluster resources
kubectl top nodes

## Check storage classes
kubectl get storageclass

## Verify namespace
kubectl get ns netbox-enterprise

## Test registry access
helm registry login registry.enterprise.netboxlabs.com
```

## Table of Contents

1. [System Requirements](#system-requirements) - Infrastructure needs
2. [Network Requirements](#network-requirements) - Connectivity and ingress
3. [Storage Requirements](#storage-requirements) - Persistent volumes
4. [Database Requirements](#database-requirements) - PostgreSQL and Redis
5. [License Requirements](#license-requirements) - NetBox Enterprise access
6. [Enterprise Portal Requirements](#enterprise-portal-requirements) - Portal access
7. [Private Registry Requirements](#private-registry-requirements-environments-with-restricted-connectivity) - Restrictive environment deployments
8. [Next Steps](#next-steps) - Continue to installation

Before deploying NetBox Enterprise, ensure your environment meets the following requirements.

## System Requirements

### Recommended System Requirements

The following are the recommended system requirements for a production deployment of NetBox Enterprise running two replicas. For larger environments with more replicas, additional resources should be allocated.

- **8+ Virtual CPU (vCPU)**
- **24+ GB Memory (RAM)**
- **100+ GB SSD free disk space in /var/lib**
- **disable swap if enabled**

> **Note**: These are recommended minimums for production deployments. Actual resource usage will vary based on your specific workload, number of devices, and usage patterns.

### Kubernetes Requirements

- **Kubernetes Version**: 1.26+ (recommended: 1.29+, tested with 1.29)

### Helm Requirements

- **Helm Version**: 3.17.3 or higher
- **OCI Support**: Required for chart registry access

## Network Requirements

- **Ingress Controller**:
  - Option 1: Use an existing NGINX Ingress Controller in your cluster
  - Option 2: The chart includes its own NGINX Ingress Controller (enabled by default with Diode)
- **Port Requirements**:
  - **Inbound** (to Kubernetes ingress IP): HTTP (80), HTTPS (443), Diode (80 if using Diode), Replicated SDK (3000/tcp for support bundles)
  - **Outbound** (for installations/upgrades/licensing): See [NetBox Enterprise Requirements](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-ec-requirements/) and [Linux System Changes](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-ec-linux-changes/) for detailed firewall rules
  - **Restricted Environments**: For proxy configurations, see [Special Cases for Restricted Environments](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-ec-requirements/#special-cases-for-restricted-environments)
- **DNS**: Configure DNS records for your ingress hostname

## Storage Requirements

The chart requires persistent storage for:

- NetBox media files
- Database storage (if using internal PostgreSQL)
- Redis data (if persistence is enabled)

### Storage Class Configuration

Check if your cluster has a default storage class:

```bash
kubectl get storageclass
```

### Storage Considerations for Restricted Environments

#### Media Files with S3 Backend

While S3 can be configured for media file storage, local persistent volumes remain required for operational functionality. The S3 backend provides partial storage offloading but does not eliminate the need for local storage.

Local persistent storage with ReadWriteOnce access mode is required regardless of S3 backend configuration. Multi-NetBox pod deployments with shared storage (ReadWriteMany) are not supported in the current release.

> **Ready to install?** Proceed to [Installation Guide](netbox-enterprise-helm-install.md) for step-by-step deployment instructions.

## Database Requirements

NetBox Enterprise can use either internal databases (default) or external PostgreSQL. **Redis is always deployed internally and external Redis is strongly discouraged.**

### Option 1: Internal Databases (Default)

The chart includes:

- **PostgreSQL**: Deployed using Crunchy Data PostgreSQL Operator
- **Redis**: Deployed using Bitnami Redis chart with no persistence

### Option 2: External PostgreSQL

**⚠️ Important**: External Redis is not supported and strongly discouraged. NetBox Enterprise uses Redis only for ephemeral caching - using external Redis introduces unnecessary latency and performance issues with no benefit. Always use the internal Redis deployment.

#### PostgreSQL Requirements

- **Version**: PostgreSQL 14 or higher
- **Resources**:
  - **Minimum**: 1 CPU, 2Gi memory
  - **Recommended**: 2+ CPUs, 4Gi+ memory for production
- **Connection**: Accessible from Kubernetes cluster
- **Authentication**: Username/password authentication
- **TLS**: Optional TLS support available

> **Database performance issues?** Monitor with `kubectl exec deployment/netbox-enterprise -- python manage.py dbshell -c "SELECT count(*) FROM pg_stat_activity;"`.

## License Requirements

- Valid NetBox Enterprise license file provided by NetBox Labs
- License file will be configured during installation

## Enterprise Portal Requirements

NetBox Enterprise requires authentication to access both the container registry and Helm charts using your **LICENSE_ID**.

### Required Access

- Access to `proxy.enterprise.netboxlabs.com` for Docker images
- Access to `registry.enterprise.netboxlabs.com` for Helm charts
- Valid NetBox Enterprise LICENSE_ID provided by NetBox Labs

### Variable Setup

Set up your environment variables for authentication and configuration:

```bash
## Required credentials
export LICENSE_ID="your-license-id-here"
export USERNAME="your-email@company.com"

## Optional: Set specific chart version
export CHART_VERSION="1.11.5"  # or leave empty for latest

## Authenticate with registries
docker login proxy.enterprise.netboxlabs.com -u $USERNAME -p $LICENSE_ID
helm registry login registry.enterprise.netboxlabs.com -u $USERNAME -p $LICENSE_ID
```

## Private Registry Requirements (Environments with Restricted Connectivity)

For restrictive environments, you'll need to:

1. **Mirror all required images** to your private registry
2. **Configure image pull secrets** in your Kubernetes cluster
3. **Update values file** with private registry configuration

Required images include:

- NetBox Enterprise core images
- PostgreSQL and Redis images
- NGINX Ingress Controller images
- Diode service images

See the [Private Registry Setup Guide](advanced/netbox-enterprise-helm-private-registry.md) for detailed procedures.

## Next Steps

After verifying all prerequisites, continue with:

1. **[Installation](netbox-enterprise-helm-install.md)** - Step-by-step deployment guide
2. **[Advanced Configuration](advanced/netbox-enterprise-helm-advanced-configuration.md)** - Configuration reference
3. **[Operations](netbox-enterprise-helm-operations.md)** - Backup and maintenance

---

## Complete Installation Guide

1. [Overview](netbox-enterprise-helm-overview.md) - Architecture and approach
2. → **Prerequisites** - System requirements
3. [Installation](netbox-enterprise-helm-install.md) - Installation procedures
4. [Advanced Configuration](advanced/netbox-enterprise-helm-advanced-configuration.md) - Configuration reference
5. [Operations](netbox-enterprise-helm-operations.md) - Backup and maintenance

import BackToTop from './components/BackToTop';

<BackToTop />
