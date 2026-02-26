---
tags:
  - helm
  - enterprise
  - netbox
  - configuration
  - operations
  - private-registry
source: localdocs
lastUpdatedAt: 1765462686000
canonical: >-
  /docs/preview/helm/v1.11/advanced/netbox-enterprise-helm-advanced-configuration/
---

import BetaBanner from '../components/BetaBanner';

# NetBox Enterprise Helm - Advanced Configuration Examples

<nav aria-label="breadcrumb">
  <ol style={{display: 'flex', listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', fontSize: '14px', color: '#666'}}>
    <li><a href="/docs/" style={{color: '#3498db', textDecoration: 'none'}}>NetBox Labs Documentation</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li><a href="/docs/helm/" style={{color: '#3498db', textDecoration: 'none'}}>Helm Installation Guides</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li><a href="/docs/helm/advanced/" style={{color: '#3498db', textDecoration: 'none'}}>Advanced</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li style={{color: '#666'}}>Advanced Configuration Examples</li>
  </ol>
</nav>

<BetaBanner />

This guide covers the configuration and customization of NetBox Enterprise Helm deployments using overlay values files and advanced configuration examples.

> **Need the basics first?** See [Installation Guide](../../netbox-enterprise-helm-install/) for standard installation steps, or [Prerequisites](../../netbox-enterprise-helm-prerequisites/) for system requirements.

## Configuration Overview

The NetBox Enterprise Helm chart supports a two-tier configuration approach:

1. **Base values file**: Generated from the Enterprise Portal containing license information and default configurations
2. **Overlay values file**: Custom values file (`values-extra.yaml`) containing environment-specific customizations

This approach ensures license information remains intact while allowing environment-specific customizations.

## Configuration Template

Here's the `values-extra.yaml` template for common configuration overrides:

```yaml
## NetBox Enterprise Helm Chart - Additional Values Configuration
## This file contains common configuration overrides for NetBox Enterprise deployments
## Use this file alongside the base values file obtained from the Enterprise Portal

## =============================================================================
## INGRESS CONFIGURATION
## =============================================================================
## IMPORTANT: NetBox Enterprise Helm chart includes nginx-ingress by default.
## This is the officially supported and tested ingress solution.
## Only uncomment and modify these settings if you need custom ingress configuration.
## For production deployments, we recommend using the included nginx-ingress.

netbox:
  ingress:
    enabled: true
    className: 'nginx' # Uses included nginx-ingress (RECOMMENDED)
    hosts:
      - host: netbox.example.com # Replace with your domain
        paths:
          - path: /
            pathType: Prefix
    tls:
      - secretName: netbox-tls
        hosts:
          - netbox.example.com # Replace with your domain
    annotations:
      # Standard nginx-ingress annotations (recommended)
      cert-manager.io/cluster-issuer: 'letsencrypt-prod' # If using cert-manager
      nginx.ingress.kubernetes.io/proxy-body-size: '100m'
      nginx.ingress.kubernetes.io/proxy-connect-timeout: '60'
      nginx.ingress.kubernetes.io/proxy-read-timeout: '60'
      nginx.ingress.kubernetes.io/proxy-send-timeout: '60'

  # =============================================================================
  # RESOURCE CONFIGURATION
  # =============================================================================
  # Production-ready resource allocations. Adjust based on your environment.

  # NetBox application resources
  resources:
    requests:
      cpu: '1000m' # 1 vCPU minimum for responsive UI
      memory: '4Gi' # 4GB minimum for NetBox Enterprise
    limits:
      cpu: '4000m' # Allow bursting up to 4 vCPUs
      memory: '8Gi' # Memory limit for large datasets

  # Horizontal scaling (adjust based on load requirements)
  replicaCount: 3 # Number of NetBox replicas for high availability

  # Worker configuration for background task processing
  worker:
    replicaCount: 2 # Background job processing replicas
    resources:
      requests:
        cpu: '500m' # Background job processing
        memory: '1Gi' # Worker memory requirements
      limits:
        cpu: '2000m' # Worker CPU limits
        memory: '4Gi' # Worker memory limits

  # =============================================================================
  # STORAGE CONFIGURATION
  # =============================================================================
  # Persistent storage for NetBox media files and reports

  persistence:
    enabled: true
    storageClass: 'fast-ssd' # Use your cluster's SSD storage class
    size: '100Gi' # Adjust based on your data requirements

## =============================================================================
## ENVIRONMENT VARIABLES
## =============================================================================
## Additional environment configuration (optional)

## extraEnvironment:
## TZ: 'UTC'                    # Timezone setting
## DJANGO_DEBUG: 'false'       # Keep false for production

## =============================================================================
## DATABASE CONFIGURATION
## =============================================================================
## Internal PostgreSQL configuration (only if using internal database)
## For external databases, see external-database-values.yaml template

postgresql:
  enabled: true # Set to false if using external database
  resources:
    requests:
      cpu: '1000m' # Database CPU requirements
      memory: '2Gi' # Database memory requirements
    limits:
      cpu: '2000m' # Database CPU limits
      memory: '4Gi' # Database memory limits
  persistence:
    size: '200Gi' # Database storage size

## =============================================================================
## REDIS CONFIGURATION
## =============================================================================
## IMPORTANT: Always use the internal Redis deployment. External Redis is
## strongly discouraged as it provides no benefits and impacts performance.
## Redis contains only ephemeral cache data.

redis:
  enabled: true # Always keep this true (recommended)
  resources:
    requests:
      cpu: '100m' # Redis CPU requirements
      memory: '256Mi' # Redis memory requirements
    limits:
      cpu: '500m' # Redis CPU limits
      memory: '1Gi' # Redis memory limits
```

This template includes:
- **Ingress configuration** with nginx-ingress (officially supported)
- **Production resource allocations** for NetBox and workers
- **Storage configuration** for persistent volumes
- **Database settings** for internal PostgreSQL
- **Redis configuration** (internal deployment recommended)

## Authentication Setup

```bash
## Set up authentication variables
export LICENSE_ID="your-license-id-here"
export USERNAME="your-email@company.com"

## Optional: Set specific Helm chart version (leave empty for latest)
export CHART_VERSION="1.11.5"  # or export CHART_VERSION="" for latest

## Authenticate with registries
docker login proxy.enterprise.netboxlabs.com -u $USERNAME -p $LICENSE_ID
helm registry login registry.enterprise.netboxlabs.com -u $USERNAME -p $LICENSE_ID
```

## Basic Configuration Workflow

### Step 1: Generate Base Values File

```bash
## Helm authentication (to netboxlabs.com)
helm registry login registry.enterprise.netboxlabs.com -u $USERNAME -p $LICENSE_ID

## Get default values
helm show values oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  ${CHART_VERSION:+--version $CHART_VERSION} > netbox-enterprise-values.yaml
```

## Step 2: Create Overlay Values File

Create and customize your `values-extra.yaml` file using the complete template provided above:

```bash
## Copy the complete values-extra.yaml template from above
## and save it as values-extra.yaml, then customize as needed
vim values-extra.yaml
```

The template includes comprehensive configuration options with clear commenting explaining each setting.

## Step 3: Deploy with Multiple Values Files

```bash
## Deploy with your customizations
helm install netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --values values-extra.yaml \
  ${CHART_VERSION:+--version $CHART_VERSION} \
  --create-namespace \
  --namespace netbox-enterprise
```

## Essential Configuration Commands

### Validation Commands

```bash
## Show default values from chart
helm show values oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  ${CHART_VERSION:+--version $CHART_VERSION}

## Validate your values file
helm template netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --values values-extra.yaml \
  ${CHART_VERSION:+--version $CHART_VERSION} \
  --dry-run

## Test configuration without installing
helm install netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --values values-extra.yaml \
  ${CHART_VERSION:+--version $CHART_VERSION} \
  --dry-run --debug
```

## Management Commands

```bash
## Get current values from installed release
helm get values netbox-enterprise -n netbox-enterprise

## Compare values between releases
helm get values netbox-enterprise -n netbox-enterprise --revision 1
helm get values netbox-enterprise -n netbox-enterprise --revision 2

## Upgrade with new values
helm upgrade netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --values values-extra.yaml \
  ${CHART_VERSION:+--version $CHART_VERSION}
```

## Common Configuration Patterns

The `values-extra.yaml` template provides these common configuration patterns:

### Basic Ingress with TLS (from template)

```yaml
## IMPORTANT: NetBox Enterprise includes nginx-ingress by default
netbox:
  ingress:
    enabled: true
    className: 'nginx'  # Uses included nginx-ingress (RECOMMENDED)
    hosts:
      - host: netbox.example.com  # Replace with your domain
        paths:
          - path: /
            pathType: Prefix
    tls:
      - secretName: netbox-tls
        hosts:
          - netbox.example.com  # Replace with your domain
    annotations:
      # Standard nginx-ingress annotations (recommended)
      cert-manager.io/cluster-issuer: 'letsencrypt-prod'  # If using cert-manager
      nginx.ingress.kubernetes.io/proxy-body-size: '100m'
```

## Production Resources (from template)

```yaml
netbox:
  # NetBox application resources
  resources:
    requests:
      cpu: '1000m'      # 1 vCPU minimum for responsive UI
      memory: '4Gi'     # 4GB minimum for NetBox Enterprise
    limits:
      cpu: '4000m'      # Allow bursting up to 4 vCPUs
      memory: '8Gi'     # Memory limit for large datasets

  # Horizontal scaling (adjust based on load requirements)
  replicaCount: 3       # Number of NetBox replicas for high availability

  # Worker configuration for background task processing
  worker:
    replicaCount: 2     # Background job processing replicas
    resources:
      requests:
        cpu: '500m'     # Background job processing
        memory: '1Gi'   # Worker memory requirements
      limits:
        cpu: '2000m'    # Worker CPU limits
        memory: '4Gi'   # Worker memory limits
```

### External Database Configuration

For external databases, copy the template from the [External Database Guide](../netbox-enterprise-helm-external-database/):

```bash
## Copy the complete external-database-values.yaml template from the External Database Guide
## and save it as values-external-db.yaml, then customize as needed
vim values-external-db.yaml
```

See [External Database Guide](../netbox-enterprise-helm-external-database/) for complete setup.

## Private Registry Configuration

For private registries, copy the template from the [Private Registry Guide](../netbox-enterprise-helm-private-registry/):

```bash
## Copy the complete private-registry.yaml template from the Private Registry Guide
## and save it as values-private-registry.yaml, then customize as needed
vim values-private-registry.yaml
```

See [Private Registry Guide](../netbox-enterprise-helm-private-registry/) for complete setup.

## Custom Storage (from template)

```yaml
## Persistent storage for NetBox media files and reports
netbox:
  persistence:
    enabled: true
    storageClass: 'fast-ssd'  # Use your cluster's SSD storage class
    size: '100Gi'             # Adjust based on your data requirements
    accessMode: ReadWriteOnce # Required: RWO only (see limitations below)
```

## Storage Backend Considerations

**S3 Backend for Media Files**:
While S3 can be configured for media file storage, local persistent volumes remain required for operational functionality. The S3 backend provides partial storage offloading but does not eliminate the need for local storage.

**Storage Configuration**:
Local persistent storage with ReadWriteOnce access mode is required regardless of S3 backend configuration. Multi-NetBox pod deployments with shared storage (ReadWriteMany) are not supported in the current release.



## Validation and Testing

### Pre-deployment Validation

```bash
#!/bin/bash
## Validate configuration before deployment

echo "Running pre-deployment validation..."

## Check cluster resources
kubectl top nodes
kubectl describe nodes | grep -A 5 "Allocated resources"

## Check storage classes
kubectl get storageclass

## Validate Helm template
helm template netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --values values-extra.yaml \
  ${CHART_VERSION:+--version $CHART_VERSION} \
  --dry-run --debug
```

## Post-deployment Verification

```bash
#!/bin/bash
## Verify deployment after installation

echo "Running post-deployment verification..."

## Check deployment status
kubectl get pods -n netbox-enterprise
kubectl get svc -n netbox-enterprise
kubectl get ingress -n netbox-enterprise

## Test application health
kubectl exec -it deployment/netbox-enterprise -- \
  curl -f http://127.0.0.1:8080/api/
```



## Next Steps

- Set up CI/CD Pipeline for automated deployments
- Configure validation and testing to ensure everything is working correctly
- For cloud-specific configurations, contact NetBox Labs support for guidance

## Related Documentation

- [NetBox Enterprise Helm Overview](../../netbox-enterprise-helm-overview/)
- [Prerequisites](../../netbox-enterprise-helm-prerequisites/)
- [Installation Guide](../../netbox-enterprise-helm-install/)
- [NetBox Enterprise Troubleshooting](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-troubleshooting/) 
