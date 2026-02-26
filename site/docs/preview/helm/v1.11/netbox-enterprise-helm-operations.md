---
tags:
  - helm
  - enterprise
  - netbox
  - operations
  - kubernetes
  - docker
versions:
  enterprise: v1.11
status: current
related_docs:
  - netbox-enterprise-helm-overview
  - netbox-enterprise-helm-prerequisites
  - netbox-enterprise-helm-install
  - netbox-enterprise-helm-advanced-configuration
source: localdocs
lastUpdatedAt: 1764689862000
canonical: /docs/preview/helm/v1.11/netbox-enterprise-helm-operations/
---

import BetaBanner from './components/BetaBanner';

# Operations

<nav aria-label="breadcrumb">
  <ol style={{display: 'flex', listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', fontSize: '14px', color: '#666'}}>
    <li><a href="/docs/" style={{color: '#3498db', textDecoration: 'none'}}>NetBox Labs Documentation</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li><a href="/docs/helm/" style={{color: '#3498db', textDecoration: 'none'}}>Helm Installation Guides</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li style={{color: '#666'}}>Operations</li>
  </ol>
</nav>

<BetaBanner />

## Table of Contents

1. [Backup & Restore Procedures](#backup--restore-procedures) - Data protection and disaster recovery
2. [Support Bundle Generation](#support-bundle-generation) - Troubleshooting aid
3. [Next Steps](#next-steps) - Continue to troubleshooting

## Backup & Restore Procedures

For comprehensive backup and restore procedures, refer to the main NetBox Enterprise documentation:

- **[NetBox Enterprise Backups](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-backups/)** - Complete backup procedures including automated backups, database snapshots, and media file protection
- **[NetBox Enterprise Troubleshooting](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-troubleshooting/)** - Restore procedures, disaster recovery, and backup validation

These guides cover:
- Database backup and restore procedures
- Media file backup and recovery
- Automated backup scheduling
- External database backup strategies
- Restore mode configuration
- Disaster recovery procedures

## Support Bundle Generation

NetBox Enterprise includes built-in support for the troubleshoot.sh framework, providing comprehensive diagnostic information for support cases.

### Method 1: Using kubectl support-bundle (Recommended)

```bash
## Install the plugin
curl https://krew.sh/support-bundle | bash

## Generate support bundle
kubectl support-bundle --namespace netbox-enterprise
```

This automatically collects:

- Cluster information and resources
- NetBox deployment status
- Application logs (with configurable limits)
- Database connection status
- Storage information
- Network configuration
- Storage information

## Method 2: Manual Collection (Fallback)

If the above methods are unavailable, collect manually:

```bash
mkdir netbox-support-bundle
cd netbox-support-bundle

## Collect basic information
kubectl get all -n netbox-enterprise > resources.yaml
kubectl describe all -n netbox-enterprise > descriptions.yaml
kubectl get events -n netbox-enterprise > events.yaml

## Collect logs
kubectl logs -n netbox-enterprise deployment/netbox-enterprise > netbox-logs.txt
kubectl logs -n netbox-enterprise deployment/netbox-enterprise-worker > worker-logs.txt

## Create archive
tar czf netbox-support-bundle-$(date +%Y%m%d-%H%M%S).tar.gz *
```

## Information to Include

When contacting support, include:

- Helm chart version
- Kubernetes version and platform
- Description of the issue
- Steps to reproduce
- Recent changes made
- Support bundle file

## Next Steps

After completing operational procedures, continue with:

1. **[NetBox Enterprise Troubleshooting](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-troubleshooting/)** - Comprehensive troubleshooting guide
2. **[Advanced Configuration](advanced/netbox-enterprise-helm-advanced-configuration.md)** - Configuration examples and patterns
3. **[NetBox Enterprise Documentation](https://docs.netboxlabs.com/netbox-enterprise/)** - Application-specific guides

For performance issues, see the [NetBox Enterprise Troubleshooting Guide](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-troubleshooting/).

import BackToTop from './components/BackToTop';

<BackToTop />
