---
tags:
  - helm
  - enterprise
  - netbox
  - installation
  - kubernetes
  - docker
versions:
  enterprise: v1.11
status: current
related_docs:
  - netbox-enterprise-helm-overview
  - netbox-enterprise-helm-prerequisites
  - netbox-enterprise-helm-operations
  - netbox-enterprise-helm-advanced-configuration
source: localdocs
lastUpdatedAt: 1765462686000
canonical: /docs/preview/helm/v1.11/netbox-enterprise-helm-install/
---

import BetaBanner from './components/BetaBanner';

# Installation

<nav aria-label="breadcrumb">
  <ol style={{display: 'flex', listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', fontSize: '14px', color: '#666'}}>
    <li><a href="/docs/" style={{color: '#3498db', textDecoration: 'none'}}>NetBox Labs Documentation</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li><a href="/docs/helm/" style={{color: '#3498db', textDecoration: 'none'}}>Helm Installation Guides</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li style={{color: '#666'}}>Installation</li>
  </ol>
</nav>

<BetaBanner />

## Table of Contents

1. [Quick Start](#quick-start) - Get running fast
2. [Authentication & Registry Setup](#authentication--registry-setup) - Required first steps
3. [Standard Installation](#standard-installation) - Most common deployment
4. [Common Installation Issues](#common-installation-issues) - Troubleshooting
5. [Next Steps](#next-steps) - What to do after installation

This guide covers the complete installation process for NetBox Enterprise using Helm on Kubernetes.

## Installation Methods

Choose the installation method that best fits your environment:

- **[Quick Start](#quick-start)** - Fastest path to deployment with defaults (no values file needed)
- **[Standard Installation](#standard-installation)** - Production-ready with custom configuration (requires values file for customizations)
- **[Advanced Configuration](../advanced/netbox-enterprise-helm-advanced-configuration/)** - Detailed configuration patterns
- **[External Database Setup](../advanced/netbox-enterprise-helm-external-database/)** - Production database configuration
- **[Private Registry Setup](../advanced/netbox-enterprise-helm-private-registry/)** - For restrictive environments

> **Need help with configuration?** See [Advanced Configuration](../advanced/netbox-enterprise-helm-advanced-configuration/) for detailed configuration examples and patterns.

## Quick Start

For a quick installation in a clean Kubernetes cluster, the chart's default values often work without modification:

```bash
## After authentication (see steps below) - no values file needed for defaults
helm install netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --namespace netbox-enterprise \
  --create-namespace
```

The chart includes everything needed for a functional deployment, including an NGINX Ingress Controller, databases, and all required components.

**Note**: This Quick Start approach uses default values. If you need custom configuration (like custom ingress settings, database connections, etc.), use the [Standard Installation](#standard-installation) method instead.

**⚠️ Important**: Before starting, ensure you meet all [prerequisites](netbox-enterprise-helm-prerequisites.md).

4. **Verify deployment**:
   ```bash
   kubectl get pods -n netbox-enterprise
   kubectl get ingress -n netbox-enterprise
   ```

> **Installation problems?** See the common installation issues section below or the [NetBox Enterprise Troubleshooting Guide](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-troubleshooting/) for advanced diagnostics.

## Authentication & Registry Setup

NetBox Enterprise requires authentication to access the container registry and Helm chart. You'll need your USERNAME and LICENSE_ID provided by NetBox Labs.

### Step 1: Set Authentication Variables

This is used for logging into the registries and pulling the Helm chart:

```bash
## Set your credentials
export USERNAME="your-email@company.com"
export LICENSE_ID="your-license-id-here"

## Optional: Set specific Helm chart version (leave empty for latest)
export CHART_VERSION="1.11.5"  # or export CHART_VERSION="" for latest

## Verify they are set
echo "Username: $USERNAME"
echo "License ID: $LICENSE_ID"
echo "Chart Version: $CHART_VERSION"
```

## Step 2: Log in to the Registries

You need to authenticate to pull images for the deployment and to access the Helm charts:

```bash
## Log in to the Docker registry (for image pulls)
docker login proxy.enterprise.netboxlabs.com -u $USERNAME -p $LICENSE_ID

## Log in to the OCI registry for Helm charts
helm registry login registry.enterprise.netboxlabs.com -u $USERNAME -p $LICENSE_ID
```

**Note**: Docker images are pulled from `proxy.enterprise.netboxlabs.com` but authentication uses your LICENSE_ID

## Step 3: Pull the Values File (Required for Standard Installation)

For the Standard Installation method, you must pull the existing values file from the registry, which contains your license information and required configurations:

```bash
## Get default values (needed for Standard Installation with customizations)
helm show values oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  ${CHART_VERSION:+--version $CHART_VERSION} > netbox-enterprise-values.yaml
```

**Important**: Do not create a values file from scratch. The pulled values file contains critical license signatures and configurations required for the application to function correctly.

**Note**: This step is only needed for the Standard Installation method. The Quick Start method uses defaults without requiring a values file.

## Standard Installation

This is the recommended approach for production deployments with custom configuration.

### Step 1: Complete Authentication Setup

Follow the [Authentication & Registry Setup](#authentication--registry-setup) steps above.

### Step 2: Create Configuration Template

Create your `values-extra.yaml` file by copying the complete template from the [Advanced Configuration Guide](../advanced/netbox-enterprise-helm-advanced-configuration/#configuration-template):

```bash
## Copy the complete values-extra.yaml template from the Advanced Configuration Guide
## and save it as values-extra.yaml, then customize as needed
vim values-extra.yaml
```

## Step 3: Configure Your Values

Customize your `values-extra.yaml` file with your specific requirements:

```yaml
## Example: Basic ingress configuration (from values-extra.yaml template)
netbox:
  ingress:
    enabled: true
    className: 'nginx'  # Uses included nginx-ingress (RECOMMENDED)
    hosts:
      - host: netbox.company.com  # Replace with your domain
        paths:
          - path: /
            pathType: Prefix
    annotations:
      cert-manager.io/cluster-issuer: 'letsencrypt-prod'  # If using cert-manager
```

The template includes comprehensive examples with clear commenting explaining each setting.

> **For complete configuration examples**, see [Advanced Configuration Guide](../advanced/netbox-enterprise-helm-advanced-configuration/).

## Step 4: Install NetBox Enterprise

**Note**: You can omit the --values-extra.yaml if you don't have customizations beyond the pulled values file.

```bash
helm install netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --values values-extra.yaml \
  ${CHART_VERSION:+--version $CHART_VERSION} \
  --create-namespace \
  --namespace netbox-enterprise
```

> **Installation failing?** Check the common installation issues section below for quick solutions.

## Access Your Installation

After successful installation, retrieve the admin password and access NetBox Enterprise:

```bash
## Get the admin password
kubectl -n netbox-enterprise get secret netbox-enterprise-secret-config -o jsonpath='{.data.password}' | base64 -d

## Port forward to access the application
kubectl port-forward -n netbox-enterprise svc/netbox-enterprise 8080:80
```

Then visit your NetBox Enterprise instance (via the port forward above) and login with:
- Username: `admin` (or your configured `superuserUsername`)
- Password: Retrieved from the secret above

## Advanced Deployments

For production environments and advanced configurations, see:

- **[Advanced Configuration](../advanced/netbox-enterprise-helm-advanced-configuration/)** - Resource limits, ingress, security hardening
- **[External Database](../advanced/netbox-enterprise-helm-external-database/)** - PostgreSQL and Redis configuration
- **[Private Registry](../advanced/netbox-enterprise-helm-private-registry/)** - Restricted environment deployments
- **[Deployment Examples](../advanced/netbox-enterprise-helm-deployment-examples/)** - Complete deployment scenarios

For cloud-specific configurations (AWS EKS, Azure AKS, GCP GKE), contact NetBox Labs support for guidance.

## Common Installation Issues

If you encounter problems during installation, check these common issues:

### Complete NetBox Enterprise Troubleshooting

For comprehensive NetBox Enterprise troubleshooting, see the [NetBox Enterprise Troubleshooting Guide](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-troubleshooting/) which covers advanced tools, debug logging, and support bundle generation.

### Helm-Specific Issues

**Resource Issues**
```bash
## Check if your cluster has enough resources
kubectl describe nodes | grep -A5 "Allocated resources"
kubectl top nodes

## If nodes are under resource pressure:
## - Add more nodes to your cluster
## - Reduce resource requests in values-extra.yaml
## - Check for resource limits in your values file
```

**Pod Pull Issues**
```bash
## Check pod status for ImagePullBackOff errors
kubectl get pods -n netbox-enterprise
kubectl describe pod <pod-name> -n netbox-enterprise

## Common causes:
## - Registry authentication failed (see below)
## - Incorrect image tags in values file
## - Network connectivity to registry
```

**Registry Authentication Issues**
```bash
## Verify your credentials are set correctly
echo "Username: $USERNAME"
echo "License: $LICENSE_ID"

## Test registry login
docker login registry.enterprise.netboxlabs.com -u $USERNAME -p $LICENSE_ID

## Recreate the registry secret if needed
kubectl delete secret regcred -n netbox-enterprise
kubectl create secret docker-registry regcred \
  --docker-server=registry.enterprise.netboxlabs.com \
  --docker-username=$USERNAME \
  --docker-password=$LICENSE_ID \
  --namespace netbox-enterprise
```

---

## Next Steps

After successful installation, continue with:

1. **[Advanced Configuration](../advanced/netbox-enterprise-helm-advanced-configuration/)** - Configuration reference and examples
2. **[Operations](../netbox-enterprise-helm-operations/)** - Backup and maintenance procedures

---

## Complete Installation Guide

1. [Overview](../netbox-enterprise-helm-overview/) - Architecture and approach
2. [Prerequisites](../netbox-enterprise-helm-prerequisites/) - System requirements
3. → **Installation** - Installation procedures
4. [Advanced Configuration](../advanced/netbox-enterprise-helm-advanced-configuration/) - Configuration reference
5. [Operations](../netbox-enterprise-helm-operations/) - Backup and maintenance

import BackToTop from './components/BackToTop';

<BackToTop />
