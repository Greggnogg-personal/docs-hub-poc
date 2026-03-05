---
tags:
  - helm
  - enterprise
  - netbox
  - getting-started
  - kubernetes
versions:
  enterprise: v1.11
status: current
related_docs:
  - netbox-enterprise-helm-prerequisites
  - netbox-enterprise-helm-install
  - netbox-enterprise-helm-operations
  - netbox-enterprise-helm-advanced-configuration
source: localdocs
lastUpdatedAt: 1764689862000
canonical: /docs/preview/helm/v1.11/netbox-enterprise-helm-overview/
---

import BetaBanner from './components/BetaBanner';

# NetBox Enterprise Helm Installation Guide

<nav aria-label="breadcrumb">
  <ol style={{display: 'flex', listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', fontSize: '14px', color: '#666'}}>
    <li><a href="/docs/" style={{color: '#3498db', textDecoration: 'none'}}>NetBox Labs Documentation</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li><a href="/docs/helm/" style={{color: '#3498db', textDecoration: 'none'}}>Helm Installation Guides</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li style={{color: '#666'}}>Overview</li>
  </ol>
</nav>

<BetaBanner />

## Overview

NetBox Enterprise is a comprehensive network source of truth and infrastructure resource management platform. This guide covers the production deployment of NetBox Enterprise using Helm on Kubernetes.

## Architecture

The NetBox Enterprise Helm chart deploys:

### Core Components

- **NetBox Enterprise Web**: Main application pods running Nginx Unit as the application server
- **NetBox Enterprise Worker**: Background task processing pods (RQ workers)
- **Enterprise Licensing**: Integrated licensing and telemetry components

### Data Layer

- **PostgreSQL**: Primary database (internal via Crunchy Data Operator or external)
- **Redis**: Task queue and caching (internal via Bitnami chart)
- **Persistent Storage**: Media files, reports, and custom scripts

### Optional Components

- **Reloader**: Automatic pod restarts on configuration changes

### Security Features

- Non-root containers with read-only root filesystem
- Pod security contexts with seccomp profiles
- TLS support for all external connections
- Network policy support

This installation guide covers both internal database deployments (default) and external database configurations for production environments.

## Authentication and Access

NetBox Enterprise requires authentication to access both the container registry and Helm charts. This documentation uses the **LICENSE_ID** method as the standard authentication approach:

- **Registry Access**: Uses `proxy.enterprise.netboxlabs.com` for Docker images
- **Helm Charts**: Uses `registry.enterprise.netboxlabs.com` for Helm chart access
- **Authentication**: Your LICENSE_ID serves as both username and password for registry access

### Documentation Approach

The commands in this guide use variables for flexibility:

- `$LICENSE_ID` - Your NetBox Enterprise license identifier
- `$USERNAME` - Your email address (for registry login)
- `$CHART_VERSION` - Helm chart version (set to use specific version or leave empty for latest)

This allows you to customize versions and credentials while following the same procedures across different environments.

## Next Steps

Continue with the installation process:

1. **[Prerequisites](netbox-enterprise-helm-prerequisites.md)** - System requirements and setup
2. **[Installation](netbox-enterprise-helm-install.md)** - Recommended guided installation
3. **[Operations](netbox-enterprise-helm-operations.md)** - Backup, upgrade, and scaling procedures
4. **[NetBox Enterprise Troubleshooting](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-troubleshooting/)** - Advanced troubleshooting guide

---

## Complete Installation Guide

1. → **Overview** - Architecture and approach
2. [Prerequisites](netbox-enterprise-helm-prerequisites.md) - System requirements
3. [Installation](netbox-enterprise-helm-install.md) - Installation procedures
4. [Advanced Configuration](advanced/netbox-enterprise-helm-advanced-configuration.md) - Configuration reference
5. [Operations](netbox-enterprise-helm-operations.md) - Backup and maintenance

import BackToTop from './components/BackToTop';

<BackToTop />
