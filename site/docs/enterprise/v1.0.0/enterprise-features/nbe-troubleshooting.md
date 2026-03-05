---
tags:
  - administration
  - authentication
  - cloud
  - enterprise
  - netbox
  - troubleshooting
category: enterprise-documentation
audience: administrators
complexity: advanced
title: 'NetBox Enterprise: Advanced Tools and Troubleshooting'
description: Diagnostic procedures and solutions for common NetBox Enterprise issues
versions:
  cloud: v1.10
  enterprise: v1.10
source: localdocs
lastUpdatedAt: 1769030791000
canonical: /docs/enterprise/enterprise-features/nbe-troubleshooting/
---
# Advanced Tools and Troubleshooting

This guide provides diagnostic procedures and solutions for issues you may encounter when running NetBox Enterprise.

## Accessing Your Cluster \{#accessing-your-cluster\}

Most troubleshooting procedures require cluster access through either the command line or web console.

### Command-Line Access \{#command-line-access\}

**Prerequisite:** NetBox Enterprise installer deployment.

Enter the cluster shell environment to use kubectl and related tools:

```shell
/var/lib/embedded-cluster/bin/netbox-enterprise shell
```

This shell session has kubectl preconfigured with cluster credentials and context. All subsequent kubectl commands execute within this environment.

**Example session:**

```shell
# Enter cluster shell
/var/lib/embedded-cluster/bin/netbox-enterprise shell

# Now kubectl commands work
kubectl -n kotsadm get pods

# Exit shell when done
exit
```

### Web Console Access

Access the admin console in a browser at `https://<your-cluster-host-or-ip>:30000/` where `<your-cluster-host-or-ip>` is your server hostname or IP address.

The admin console provides:
- Configuration management
- Log viewing
- System status monitoring
- Application deployment controls

**Note:** The admin console uses a self-signed certificate by default. Your browser will display a security warning on first access.

## Getting Help

If you encounter an issue that is not covered in this guide, contact NetBox Labs support with the following information:

- NetBox Enterprise version
- Kubernetes cluster environment details
- Support bundle (see [Generating a Support Bundle](#generating-a-support-bundle))
- Relevant error messages from logs

## Diagnostic Tools

### Support Bundles \{#generating-a-support-bundle\}

Support bundles collect system information, configuration, and logs for troubleshooting. Generate a support bundle when reporting issues to NetBox Labs.

**Command-line generation:**

1. [Access your cluster](#command-line-access) from the shell
2. Run the support bundle collector:

```shell
kubectl support-bundle /var/lib/embedded-cluster/support/host-support-bundle.yaml --load-cluster-specs
```

The tool runs diagnostic tests and displays results in a TUI interface. Press `s` to save a summary text file or `q` to quit. A `.tar.gz` bundle file is created in the current directory regardless of the option selected.

![Support Bundle Output](/enterprise-images/netbox-enterprise/netbox-enterprise-support-bundle-tui.png)

### Log Access

View container logs directly using kubectl:

```shell
kubectl logs netbox-enterprise-<pod_id> -n kotsadm
```

Replace `<pod_id>` with the actual pod identifier from your cluster.

## Common Issues

### Git Repository Sync Failures

**Symptoms:**
- Large repositories (over 1GB) fail to sync
- Sync operations timeout
- Worker pods are killed with out-of-memory (OOM) errors
- Files larger than 50MB fail to process

**Cause:**
Default worker pod resource limits are insufficient for large repository operations.

**Solution:**

Increase worker pod resource allocation through the admin console:

1. Access the admin console at `https://your-cluster-host-or-ip:30000/`
2. Navigate to **Config** section
3. Under **Resources**, select an appropriate preset:
   - **Regular (up to 1.5Gi mem per replica)**: Standard workloads
   - **Large (up to 3Gi mem per replica)**: Moderate to heavy workloads
   - **Extra Large (up to 6Gi mem per replica)**: Very large repositories
   - **2x Large (up to 12Gi mem per replica)**: Repositories over 1GB
4. Click **Save Config**
5. Deploy the updated configuration

**Verification:**

Check that worker pods have restarted with new resource limits:

```shell
# Verify resource limits
kubectl -n kotsadm get deployment netbox-enterprise-worker -o yaml \
  | yq -r '.spec.template.spec.containers[] | select(.name == "netbox-worker") | .resources'

# Check worker pod status
kubectl -n kotsadm get pods -l app=netbox-enterprise-worker

# Monitor pod restart
kubectl -n kotsadm get pods -w
```

Test repository sync:

1. Navigate to **Operations > Integrations > Data Sources** in NetBox
2. Add or select your Git repository
3. Click **Sync** and monitor progress
4. Verify completion in the NetBox UI or worker logs

**Additional steps if issue persists:**

- Use `.gitignore` patterns to exclude large binary files not needed for NetBox
- Split large monorepos into smaller, focused repositories
- Contact NetBox Labs support for specialized configuration

### Excessive Log Output

**Symptoms:**
- Log storage fills rapidly
- Difficult to locate relevant error messages
- Performance degradation due to high I/O

**Cause:**
Debug logging is enabled in a production environment.

**Solution:**

Disable debug logging through the admin console:

1. Access the admin console
2. Navigate to **Config** section
3. Find **Enable Debug Logging** toggle
4. Disable the toggle
5. Click **Save Config**
6. Deploy the updated configuration

**Important:** Debug logging exposes detailed system information and significantly impacts performance. Only enable debug mode in non-production environments when actively troubleshooting issues.

### Enabling Debug Logging (Non-Production Only)

Debug logging provides detailed operational information for diagnosing issues. Enable it only in development or test environments.

**Steps:**

1. Access the admin console
2. Navigate to **Config** section
3. Find **Enable Debug Logging** toggle
4. Enable the toggle
5. Click **Save Config**
6. Deploy the updated configuration

![Debug Logging Enabled](/enterprise-images/netbox-enterprise/netbox-enterprise-debug-checkbox.png)

**View debug logs:**

```shell
kubectl logs netbox-enterprise-<pod_id> -n kotsadm
```

![Debug Logging Example](/enterprise-images/netbox-enterprise/netbox-enterprise-debug-logging-example.png)

Disable debug logging after completing troubleshooting to restore normal performance.

### Cluster Access Issues

**Symptoms:**
- Cannot connect to admin console
- kubectl commands fail
- Cannot access NetBox web interface

**Solution:**

**Web console access:**

The admin console is available at `https://your-cluster-host-or-ip:30000/` in default installations.

**Command-line access:**

For NetBox Enterprise installer deployments, enter the cluster shell environment:

```shell
/var/lib/embedded-cluster/bin/netbox-enterprise shell
```

This provides a shell with kubectl configured to interact with the embedded cluster.

## Command-Line Tools Reference

NetBox Enterprise includes specialized tools for cluster management and diagnostics. All tools require cluster access as described in [Accessing Your Cluster](#accessing-your-cluster).

### kubectl

Standard Kubernetes CLI for interacting with cluster resources. Included with NetBox Enterprise installer.

**Common operations:**

```shell
# List all pods in the kotsadm namespace
kubectl -n kotsadm get pods

# View pod logs
kubectl logs <pod-name> -n kotsadm

# Describe a resource
kubectl describe pod <pod-name> -n kotsadm

# Get deployment details
kubectl -n kotsadm get deployment <deployment-name> -o yaml
```

### preflight

Validation tool that checks system requirements before deployment or upgrade. Included with NetBox Enterprise installer.

**Manual installation:**

```shell
curl https://krew.sh/preflight | bash
```

**Usage:**

```shell
# Run preflight checks
kubectl preflight <spec-file>

# Example with NetBox Enterprise spec
kubectl preflight /var/lib/embedded-cluster/support/host-preflight.yaml
```

Use preflight when planning upgrades or diagnosing installation issues.

### support-bundle

Generates comprehensive diagnostic bundles containing logs, configuration, and cluster state. Included with NetBox Enterprise installer.

**Manual installation:**

```shell
curl https://krew.sh/support-bundle | bash
```

**Usage:**

```shell
# Generate support bundle
kubectl support-bundle <spec-file> --load-cluster-specs

# Example with NetBox Enterprise spec
kubectl support-bundle /var/lib/embedded-cluster/support/host-support-bundle.yaml --load-cluster-specs
```

The command creates a `.tar.gz` file in the current directory. Provide this file to NetBox Labs support when reporting issues.

**Output options:**
- Press `s` to save a summary text file
- Press `q` to quit (bundle file is still created)

### k9s

Optional terminal UI for managing and viewing cluster resources interactively. Not included with installer.

**Installation:**

See installation instructions at [k9scli.io](https://k9scli.io/).

**Usage:**

```shell
# Launch k9s
k9s
```

K9s provides a visual interface for common kubectl operations and real-time resource monitoring.

## Related Documentation

- [NetBox Enterprise Installation](nbe-ec-installation.md)
- [NetBox Enterprise Requirements](nbe-ec-requirements.md)
- [NetBox Enterprise Overview](nbe-overview.md)
