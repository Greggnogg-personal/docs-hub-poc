---
tags:
  - administration
  - api
  - authentication
  - cloud
  - discovery
  - enterprise
  - netbox
title: 'NetBox Enterprise: Linux Root-Level Changes'
description: >-
  Reference guide for system-level changes made by NetBox Enterprise Embedded
  Cluster installation
source: localdocs
lastUpdatedAt: 1765462686000
canonical: /docs/enterprise/enterprise-features/nbe-ec-linux-changes/
---

# Linux Root-Level Changes

## Overview

This document provides a comprehensive reference of system-level changes made to a Linux host when installing NetBox Enterprise Embedded Cluster. Understanding these changes is essential for security audits, system administration, and troubleshooting.

**Purpose:** This reference helps administrators:

- Review changes before installation for security approval
- Understand file system modifications for backup planning
- Troubleshoot installation or runtime issues
- Audit system changes for compliance requirements

**Scope:** All changes are related to the embedded Kubernetes cluster (k0s), container runtime (containerd), and NetBox Enterprise application components.

:::info[Non-Destructive Installation]
NetBox Enterprise installation does not modify existing system files or configurations outside the directories listed below. All changes are contained within dedicated paths for the embedded cluster.

:::
## Installation Overview

NetBox Enterprise creates a self-contained embedded cluster with the following components:

| Component | Purpose | Install Location |
|-----------|---------|------------------|
| **k0s** | Kubernetes distribution | `/usr/local/bin/k0s`, `/etc/k0s`, `/var/lib/embedded-cluster` |
| **containerd** | Container runtime | `/opt/containerd`, `/run/containerd` |
| **CNI Plugins** | Container networking | `/etc/cni`, `/opt/cni`, `/var/lib/cni` |
| **kubelet** | Kubernetes node agent | `/var/lib/kubelet` |
| **NetBox Application** | Main application | Within Kubernetes pods |
| **Logs** | System and application logs | `/var/log/embedded-cluster`, `/var/log/pods` |

## Directories Created \{#key-directories-created\}

### Configuration Directories

Configuration files for Kubernetes and container networking.

| Path | Description | Contains |
|------|-------------|----------|
| `/etc/k0s` | k0s Kubernetes configuration | Cluster configuration YAML, certificates, kubeconfig |
| `/etc/cni` | Container Network Interface config | CNI plugin configuration files |
| `/etc/containerd` | Containerd configuration | containerd config.toml (if manually configured) |
| `/etc/systemd/system/` | Service unit files | `k0scontroller.service`, `containerd.service` unit files |

### Binary and Plugin Directories

Executable binaries for Kubernetes and container operations.

| Path | Description | Contains |
|------|-------------|----------|
| `/usr/local/bin/k0s` | k0s binary | Main Kubernetes distribution binary |
| `/usr/libexec/k0s` | k0s helper executables | Internal service components and utilities |
| `/opt/cni` | CNI plugin binaries | Container networking plugins |
| `/opt/containerd` | Containerd binaries | Container runtime executables and libraries |

### Runtime Directories

Temporary runtime data, sockets, and process information.

| Path | Description | Contains |
|------|-------------|----------|
| `/run/k0s` | k0s runtime files | PID files, runtime state |
| `/run/containerd` | Containerd runtime | Unix sockets for containerd API, shims |
| `/run/calico` | Calico runtime data | Calico CNI plugin runtime state (if used) |

### Data and State Directories

Persistent data for Kubernetes components and container storage.

| Path | Description | Contains |
|------|-------------|----------|
| `/var/lib/embedded-cluster` | Main installation directory | k0s installation, cluster state, configuration |
| `/var/lib/k0s` | k0s data directory | Kubernetes data, certificates (symlink to embedded-cluster) |
| `/var/lib/kubelet` | Kubelet state | Pod manifests, volumes, plugins, pod data |
| `/var/lib/containers` | OCI container storage | Container images, layers, metadata |
| `/var/lib/cni` | CNI plugin state | Network state, IP allocations |
| `/var/lib/calico` | Calico persistent data | Calico network plugin configuration (if used) |

### Logging Directories

Log files for troubleshooting and monitoring.

| Path | Description | Contains |
|------|-------------|----------|
| `/var/log/embedded-cluster` | Installation and cluster logs | Embedded Cluster installer logs, cluster events |
| `/var/log/pods` | Kubernetes pod logs | Per-pod log files organized by namespace/pod name |
| `/var/log/containers` | Container logs | Symlinks to container logs (typically from journald) |
| `/var/log/calico` | Calico logs | Calico agent and networking logs (if used) |

### Control Group (cgroup) Hierarchies

Resource isolation for Kubernetes workloads.

| Path | Description | Purpose |
|------|-------------|---------|
| `/sys/fs/cgroup/kubepods` | Kubernetes pod cgroups | CPU, memory, and I/O limits for pods |
| `/sys/fs/cgroup/system.slice/containerd.service` | Containerd service cgroup | Resource limits for containerd process |
| `/sys/fs/cgroup/system.slice/k0scontroller.service` | k0s controller cgroup | Resource limits for k0s controller process |

:::note[cgroup Considerations]
Systems with non-standard cgroup configurations or strict resource controls may require adjustment. The embedded cluster uses systemd cgroup driver for compatibility.

:::
## System Services \{#binaries-and-services\}

NetBox Enterprise installs the following systemd services:

| Service | Description | Auto-Start | Purpose |
|---------|-------------|------------|---------|
| `k0scontroller.service` | k0s Kubernetes controller | Yes | Manages Kubernetes control plane (API server, etcd, scheduler) |
| `containerd.service` | Container runtime | Yes (if manually installed) | Provides container execution environment |

**View Service Status:**

```bash
# Check k0s controller
systemctl status k0scontroller

# Check containerd (if manually installed)
systemctl status containerd
```

## Network Port Requirements \{#firewall-requirements\}

Required network ports for cluster operation:

### External Access Ports

Ports that require external access from users and administrators.

| Port | Protocol | Service | Access From | Purpose |
|------|----------|---------|-------------|---------|
| 80 | TCP | NetBox HTTP | External users | NetBox web UI and API (redirects to HTTPS) |
| 443 | TCP | NetBox HTTPS & Diode gRPC | External users | Secure NetBox web UI, API, and Diode ingestion |
| 30000 | TCP | Admin Console | Administrators | NetBox Enterprise admin console |

### Internal Cluster Ports

Ports used for internal Kubernetes cluster communication.

| Port | Protocol | Service | Access From | Purpose |
|------|----------|---------|-------------|---------|
| 6443 | TCP | Kubernetes API | Internal | Kubernetes API server for kubectl, kubelet communication |
| 2379-2380 | TCP | etcd | Internal | Kubernetes backing store (control plane only) |
| 10250 | TCP | Kubelet API | Internal | Health checks, log retrieval, pod metrics |
| 10251-10252 | TCP | kube-scheduler, kube-controller | Internal | Kubernetes control plane components |
| 10255 | TCP | Kubelet (read-only) | Internal | Read-only kubelet metrics |
| 5473 | TCP | Calico Typha (if used) | Internal | Calico datastore caching layer |
| 10257 | TCP | kube-controller-manager | Internal | Control plane secure port |
| 10259 | TCP | kube-scheduler | Internal | Scheduler secure port |

### Pod Networking Ports

Ports used for container networking and service mesh.

| Port | Protocol | Service | Access From | Purpose |
|------|----------|---------|-------------|---------|
| 4789 | UDP | VXLAN | Internal | Default VXLAN overlay networking |
| 8472 | UDP | VXLAN (alternative) | Internal | Alternative VXLAN port (rarely used) |
| 179 | TCP | BGP | Internal | Border Gateway Protocol (if Calico uses BGP mode) |
| 51820 | UDP | WireGuard | Internal | Encrypted pod networking (if WireGuard enabled) |

### NodePort Service Range

| Port Range | Protocol | Service | Access From | Purpose |
|------------|----------|---------|-------------|---------|
| 30000-32767 | TCP | NodePort services | Varies | Kubernetes NodePort service range (admin console uses 30000) |

:::warning[Firewall Configuration Required]
Ensure your firewall allows these ports. See distribution-specific guides:
- [Ubuntu firewall configuration](nbe-ec-requirements-ubuntu.md#step-2-configure-firewall-rules)
- [RHEL firewall configuration](nbe-ec-requirements-rhel.md#configure-firewall)

:::
## Pod-to-Pod Networking

NetBox Enterprise requires pod-to-pod communication across Kubernetes pod networks:

| Network Range | Purpose | Firewall Requirement |
|---------------|---------|----------------------|
| `10.244.0.0/17` | Pod network (range 1) | Allow bidirectional traffic |
| `10.244.128.0/17` | Pod network (range 2) | Allow bidirectional traffic |

**Required Firewall Rules:**

- Allow traffic from `10.244.0.0/17` to `10.244.128.0/17`
- Allow traffic from `10.244.128.0/17` to `10.244.0.0/17`

See [Special Configurations](./nbe-ec-requirements.md#special-cases-for-restricted-environments) for restricted environment guidance.

## Security Considerations

### File Permissions

NetBox Enterprise installation creates files and directories with restricted permissions:

- **Service binaries**: Owned by root, executable by root only
- **Configuration files**: Readable by root only (contain sensitive data like certificates)
- **Data directories**: Owned by root or container runtime user
- **Log files**: Readable by root, may be readable by specific service accounts

### Sensitive Files

The following files contain sensitive information and should be protected:

| Path | Contains | Security Note |
|------|----------|---------------|
| `/etc/k0s/` | Kubernetes certificates and keys | Root-only access, TLS certificates for cluster communication |
| `/var/lib/embedded-cluster/` | Cluster configuration, secrets | Contains kubeconfig and cluster credentials |
| `/run/k0s/` | Runtime authentication tokens | Temporary tokens for API access |

:::warning[Backup Security]
When backing up NetBox Enterprise, ensure `/etc/k0s/` and `/var/lib/embedded-cluster/` are included and stored securely. These contain cluster certificates and configuration.

:::
### SELinux Considerations (RHEL)

On RHEL systems with SELinux enabled, additional security contexts are applied:

- `container_var_lib_t` for `/var/lib/embedded-cluster/`
- `container_runtime_exec_t` for k0s and containerd binaries
- `container_ro_file_t` for container snapshots

See [RHEL SELinux configuration](nbe-ec-requirements-rhel.md#optional---enable-selinux-enforcing) for details.

## Disk Space Requirements

Typical disk usage by directory:

| Directory | Initial Size | Growth Rate | Notes |
|-----------|--------------|-------------|-------|
| `/var/lib/embedded-cluster/` | ~500 MB | Moderate | Contains k0s, etcd data, grows with cluster state |
| `/var/lib/containers/` | ~2-5 GB | High | Container images, grows with installed plugins |
| `/var/log/embedded-cluster/` | ~50-100 MB | Low | Installation logs, relatively static |
| `/var/log/pods/` | ~100 MB | Moderate to High | Application logs, grows with usage and retention |

**Recommendations:**

- Allocate at least 50 GB for `/var/lib` (see [system requirements](nbe-ec-requirements.md#recommended))
- Implement log rotation for `/var/log/pods/` and `/var/log/containers/`
- Monitor disk usage regularly with `df -h /var/lib`

## Cleanup and Uninstallation

:::danger[Data Loss Warning]
Uninstalling NetBox Enterprise removes all cluster data, including NetBox database contents, configuration, and plugins. Ensure backups are current before uninstalling.

:::
**To completely remove NetBox Enterprise:**

```bash
# Stop and remove embedded cluster
/var/lib/embedded-cluster/bin/netbox-enterprise reset

# Remove installation directories
sudo rm -rf /var/lib/embedded-cluster
sudo rm -rf /var/lib/k0s
sudo rm -rf /etc/k0s

# Remove systemd service files
sudo rm -f /etc/systemd/system/k0scontroller.service
sudo systemctl daemon-reload

# Remove k0s binary
sudo rm -f /usr/local/bin/k0s

# Optional: Remove logs
sudo rm -rf /var/log/embedded-cluster
sudo rm -rf /var/log/pods
```

**Directories to preserve for backup before uninstall:**

- `/var/lib/embedded-cluster/` - Full cluster state
- `/etc/k0s/` - Certificates and configuration

## Troubleshooting

### Disk Space Issues

**Problem:** Installation fails with "no space left on device"

**Solution:**

```bash
# Check disk usage
df -h /var/lib

# Identify large directories
du -sh /var/lib/* | sort -h

# Clean up container images if needed
crictl rmi --prune
```

### Permission Issues

**Problem:** Services fail to start due to permission errors

**Solution:**

```bash
# Verify ownership
ls -la /var/lib/embedded-cluster
ls -la /etc/k0s

# Fix ownership if needed (use with caution)
sudo chown -R root:root /var/lib/embedded-cluster
sudo chown -R root:root /etc/k0s
```

### Port Conflicts

**Problem:** Installation fails due to port already in use

**Solution:**

```bash
# Check what's using required ports
sudo lsof -i :6443
sudo lsof -i :30000

# If another service is using these ports, stop it or choose different ports
```

## Additional Resources

- [NetBox Enterprise System Requirements](nbe-ec-requirements.md)
- [Ubuntu Preparation Guide](nbe-ec-requirements-ubuntu.md)
- [RHEL Preparation Guide](nbe-ec-requirements-rhel.md)
- [NetBox Enterprise Installation](nbe-ec-installation.md)
- [Troubleshooting Guide](nbe-troubleshooting.md)
