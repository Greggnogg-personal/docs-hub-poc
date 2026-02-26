---
tags:
  - administration
  - api
  - authentication
  - cloud
  - enterprise
  - netbox
title: >-
  NetBox Enterprise: NetBox Enterprise Requirements for Red Hat Enterprise Linux
  (RHEL)
description: >-
  RHEL-specific system preparation steps for NetBox Enterprise Embedded Cluster
  installation
source: localdocs
lastUpdatedAt: 1765833193000
canonical: /docs/enterprise/enterprise-features/nbe-ec-requirements-rhel/
---

# NetBox Enterprise Requirements for Red Hat Enterprise Linux (RHEL)

## Overview

This guide provides RHEL-specific preparation steps for NetBox Enterprise Embedded Cluster installation. Complete these steps before running the NetBox Enterprise installer.

**Prerequisites:**

- Review [general NetBox Enterprise requirements](nbe-ec-requirements.md)
- Fresh RHEL 9.x installation
- Root or sudo access
- Static IP address configured
- Active Red Hat subscription (for package installation)

## Tested Versions

NetBox Enterprise has been tested on the following RHEL releases:

| Version | Kernel | Support Status | Notes |
|---------|--------|----------------|-------|
| **RHEL 9.5** | 5.14+ | Recommended | Latest tested release |
| **RHEL 9.x** | 5.14+ | Supported | All RHEL 9 minor versions |

**Note:** RHEL 9 provides long-term support and is recommended for production deployments.

## Preparation Steps \{#steps-to-prepare-rhel\}

### Step 1: Disable Swap \{#disable-swap\}

Kubernetes requires swap to be disabled to ensure predictable memory allocation.

```bash
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# Verify: should return no output
swapon --show
```

### Step 2: Configure SELinux \{#set-selinux-to-permissive-mode-can-be-enforced-later\}

NetBox Enterprise can run with SELinux in enforcing mode, but requires initial installation in permissive mode.

**Set SELinux to permissive temporarily:**

```bash
sudo setenforce 0
sudo sed -i --follow-symlinks 's/SELINUX=enforcing/SELINUX=permissive/g' /etc/sysconfig/selinux

# Verify: should show "Permissive"
getenforce
```

:::note[Re-enabling SELinux]
After installation completes successfully, you can re-enable SELinux enforcing mode. See [Step 7: Optional - Enable SELinux Enforcing](#optional---enable-selinux-enforcing) below.

:::
<a id="step-3-configure-firewalld"></a>

### Step 3: Configure Firewalld \{#configure-firewall\}

Install and configure Firewalld for Kubernetes networking.

#### Install Firewalld (if not present)

```bash
sudo dnf -y install dnf-plugins-core
sudo dnf -y install firewalld
sudo systemctl enable --now firewalld
```

#### Open Required Ports

```bash
# Kubernetes API, etcd, and control plane components
sudo firewall-cmd --permanent --add-port={6443,2379,2380,10250,10251,10252,10255,5473,10257,10259}/tcp

# NodePort services range (includes admin console on 30000)
sudo firewall-cmd --permanent --add-port=30000-32767/tcp

# Pod networking (VXLAN and BGP)
sudo firewall-cmd --permanent --add-port=4789/udp
sudo firewall-cmd --permanent --add-port=179/tcp

# Reload firewall to apply changes
sudo firewall-cmd --reload

# Verify: list open ports
sudo firewall-cmd --list-ports
```

:::tip[Advanced Firewalld Configuration]
For more restrictive firewall configurations using zones, see [Firewalld section in general requirements](nbe-ec-requirements.md#firewalld).

:::
### Step 4: Load Kernel Modules \{#configure-kernel-modules-and-parameters\}

Install kernel headers and load required kernel modules for container networking.

#### Install Kernel Headers

```bash
sudo dnf -y install kernel-devel-$(uname -r)
```

#### Load and Persist Kernel Modules

```bash
# Load modules immediately
sudo modprobe br_netfilter ip_vs ip_vs_rr ip_vs_wrr ip_vs_sh overlay

# Configure modules to load on boot
cat <<EOF | sudo tee /etc/modules-load.d/kubernetes.conf
br_netfilter
ip_vs
ip_vs_rr
ip_vs_wrr
ip_vs_sh
overlay
EOF

# Apply system configuration
sudo sysctl --system

# Verify modules are loaded
lsmod | grep -E 'br_netfilter|ip_vs|overlay'
```

### Step 5: Optional - Install Containerd \{#install-containerd-optional-runtime\}

NetBox Enterprise includes an embedded container runtime, but you can optionally install containerd for additional container management capabilities.

:::info[Optional Step]
This step is **optional**. Skip if you don't need standalone container management tools.

```bash
# Add Docker repository (containerd source)
sudo dnf config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo
sudo dnf makecache

# Install containerd
sudo dnf install containerd.io -y

# Generate default configuration
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml

# Enable systemd cgroup driver
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml

# Enable and start containerd
sudo systemctl enable --now containerd

# Verify containerd is running
sudo systemctl status containerd
```

:::
### Step 6: Reboot and Verify \{#reboot\}

Reboot to apply all system changes:

```bash
sudo reboot now
```

**Post-Reboot Verification:**

```bash
swapon --show                              # Should return nothing
getenforce                                 # Should show "Permissive"
lsmod | grep -E 'br_netfilter|ip_vs|overlay'
sudo firewall-cmd --list-ports
```

## Pre-Installation Checklist

Before proceeding to installation, verify all requirements:

- [ ] RHEL 9.x installed with active subscription
- [ ] Swap memory disabled and verified
- [ ] SELinux set to permissive mode
- [ ] Firewalld installed and running
- [ ] Required ports opened (6443, 2379-2380, 10250-10259, 30000-32767, 4789, 179)
- [ ] Kernel modules loaded (br_netfilter, ip_vs, overlay)
- [ ] Kernel headers installed
- [ ] System rebooted and changes verified
- [ ] Static IP address configured
- [ ] Hostname is resolvable

## Next Steps

1. **Proceed to Installation**: Follow the [NetBox Enterprise installation guide](nbe-ec-installation.md)
2. **Review Special Configurations**: If using proxies or restricted environments, see [special configurations](nbe-ec-requirements.md#special-cases-for-restricted-environments)
3. **Optional: Enable SELinux Enforcing**: After successful installation, see [Step 7 below](#optional---enable-selinux-enforcing)
4. **Plan Data Migration** (Optional): Review the [migration guide](nbe-migrating.md) if importing existing NetBox data

<a id="step-7-optional---enable-selinux-enforcing"></a>

## Step 7: Optional - Enable SELinux Enforcing \{#optional---enable-selinux-enforcing\}

After NetBox Enterprise installation completes successfully, you can re-enable SELinux enforcing mode.

:::warning[Post-Installation Only]
Only perform these steps **after** NetBox Enterprise installation completes successfully. SELinux must be in permissive mode during installation.

:::
### Install SELinux Tools

```bash
sudo dnf -y install setroubleshoot-server setools mcstrans
```

### Configure SELinux Policies

Apply SELinux policies for NetBox Enterprise components:

```bash
export EC_DIR="/var/lib/embedded-cluster"
export KUBE_DIR="${EC_DIR}/k0s"

# Mark embedded cluster directory for containerd
sudo semanage fcontext -a -t container_var_lib_t "${EC_DIR}"
sudo restorecon -R -v "${EC_DIR}"

# Allow binary execution
sudo semanage fcontext -a -t container_runtime_exec_t "${KUBE_DIR}/bin/containerd.*"
sudo semanage fcontext -a -t container_runtime_exec_t "${KUBE_DIR}/bin/runc"
sudo restorecon -R -v "${KUBE_DIR}/bin"

# Configure containerd permissions
sudo semanage fcontext -a -t container_var_lib_t "${KUBE_DIR}/containerd(/.*)?"
sudo semanage fcontext -a -t container_ro_file_t "${KUBE_DIR}/containerd/io.containerd.snapshotter.*/snapshots(/.*)?"
sudo restorecon -R -v ${KUBE_DIR}/containerd
```

**Verification:**

```bash
# Check applied contexts
ls -lZ /var/lib/embedded-cluster
ls -lZ /var/lib/embedded-cluster/k0s/bin/
```

### Check for SELinux Denials

Run sealert to identify any remaining SELinux denials:

```bash
sealert -a /var/log/audit/audit.log
```

If denials are found, sealert will provide suggestions. Example output:

:::note
It is important you understand these before enabling and that you can possible be creating security risks if you do not understand what you're enabling.

```log
SELinux is preventing /usr/sbin/setfiles from 'read, append' accesses...
*****  Plugin leaks (86.2 confidence) suggests   *****************************
ausearch -x /usr/sbin/setfiles --raw | audit2allow -D -M my-setfiles
semodule -X 300 -i my-setfiles.pp
```

:::
:::warning[Security Considerations]
Review and understand each suggested policy before applying it. Blindly applying suggested policies can create security risks. Consult with your security team if unsure.

:::
### Apply Suggested Policies

For each denial identified by sealert:

1. **Review the suggestion** and understand what access is being granted
2. **Run the suggested commands** to create and install a policy module
3. **Verify the denial is resolved** by running sealert again

Example:

```bash
# Generate policy module from audit logs
ausearch -x /usr/sbin/setfiles --raw | audit2allow -D -M my-setfiles

# Install the policy module
semodule -X 300 -i my-setfiles.pp
```

### Verify No Remaining Denials

Repeat the sealert check until no denials remain:

```bash
sealert -a /var/log/audit/audit.log
```

When the command returns no output, all denials have been resolved.

### Enable SELinux Enforcing

Once all denials are resolved, enable enforcing mode:

```bash
# Enable enforcing mode immediately
sudo setenforce 1

# Make change persistent across reboots
sudo sed -i --follow-symlinks 's/SELINUX=permissive/SELINUX=enforcing/g' /etc/sysconfig/selinux
```

**Verification:**

```bash
# Should show "Enforcing"
getenforce
```

### Monitor for New Denials

After enabling enforcing mode, monitor audit logs for new denials:

```bash
# Check audit logs
sudo ausearch -m avc -ts recent

# Or use sealert
sealert -a /var/log/audit/audit.log
```

:::note[Maintenance and Upgrades]
When upgrading NetBox Enterprise or installing plugins:
1. Temporarily set SELinux to permissive: `sudo setenforce 0`
2. Perform the upgrade or plugin installation
3. Check for new denials: `sealert -a /var/log/audit/audit.log`
4. Apply any required policy updates
5. Re-enable enforcing mode: `sudo setenforce 1`

:::
## Troubleshooting

### Firewall Issues

**Problem:** Cannot connect to admin console or NetBox after installation

**Solution:**

Verify firewall allows required ports:

```bash
# Check firewalld status
sudo systemctl status firewalld

# List all open ports
sudo firewall-cmd --list-all
```

If ports are missing, add them:

```bash
sudo firewall-cmd --permanent --add-port=30000/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --reload
```

### SELinux Denials

**Problem:** Services fail to start or function with SELinux enforcing

**Solution:**

Check audit logs for denials:

```bash
# View recent denials
sudo ausearch -m avc -ts recent

# Or use sealert for detailed analysis
sealert -a /var/log/audit/audit.log
```

If denials are found, either:
1. Apply suggested policies (after review)
2. Temporarily set SELinux to permissive during troubleshooting: `sudo setenforce 0`

### Kernel Module Issues

**Problem:** Installation fails with kernel module errors

**Solution:**

Verify modules and headers:

```bash
# Check if kernel headers match running kernel
uname -r
rpm -q kernel-devel-$(uname -r)

# If mismatch, install correct headers
sudo dnf -y install kernel-devel-$(uname -r)

# Reload modules
sudo modprobe br_netfilter ip_vs ip_vs_rr ip_vs_wrr ip_vs_sh overlay

# Verify loaded
lsmod | grep -E 'br_netfilter|ip_vs|overlay'
```

### Subscription Issues

**Problem:** Cannot install packages due to subscription errors

**Solution:**

Verify Red Hat subscription status:

```bash
# Check subscription status
sudo subscription-manager status

# If not registered, register system
sudo subscription-manager register --username <username>

# Attach subscription
sudo subscription-manager attach --auto

# Refresh repositories
sudo dnf clean all && sudo dnf makecache
```

See also: [General requirements](nbe-ec-requirements.md), [Linux changes](nbe-ec-linux-changes.md), [Troubleshooting](nbe-troubleshooting.md)
