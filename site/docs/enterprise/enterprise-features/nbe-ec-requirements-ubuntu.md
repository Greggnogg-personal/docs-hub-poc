---
source: localdocs
tags:
  - administration
  - api
  - cloud
  - enterprise
  - installation
  - netbox
versions:
  netbox_enterprise: v1.10
status: current
title: 'NetBox Enterprise: NetBox Enterprise Requirements for Ubuntu'
description: >-
  Ubuntu-specific system preparation steps for NetBox Enterprise Embedded
  Cluster installation
lastUpdatedAt: 1765462686000
canonical: /docs/enterprise/enterprise-features/nbe-ec-requirements-ubuntu/
---

# NetBox Enterprise Requirements for Ubuntu

## Overview

This guide provides Ubuntu-specific preparation steps for NetBox Enterprise Embedded Cluster installation. Complete these steps before running the NetBox Enterprise installer.

**Prerequisites:**

- Review [general NetBox Enterprise requirements](nbe-ec-requirements.md)
- Fresh Ubuntu 22.04 LTS or 24.04 LTS installation
- Root or sudo access
- Static IP address configured

## Tested Versions

NetBox Enterprise has been tested on the following Ubuntu LTS releases:

| Version | Release Name | Kernel | Support Status |
|---------|--------------|--------|----------------|
| **Ubuntu 24.04 LTS** | Noble Numbat | 6.8+ | Recommended |
| **Ubuntu 22.04 LTS** | Jammy Jellyfish | 5.15+ | Supported |

**Note:** While Ubuntu meets kernel 4.3+ requirements, LTS versions receive extended support and are recommended for production deployments.

## Firewall Configuration Options

Ubuntu supports two firewall management approaches. Choose ONE method based on your environment:

| Approach | When to Use | Advantages | Disadvantages |
|----------|-------------|------------|---------------|
| **Direct iptables** | Default Ubuntu installations, headless servers | Simple, direct control, fewer dependencies | Manual rule management, no built-in CLI |
| **UFW (Uncomplicated Firewall)** | Desktop installations, existing UFW deployments | User-friendly commands, preset application profiles | Additional abstraction layer |

:::warning[Important: Choose One Method]
Using both iptables and UFW simultaneously can cause conflicts. Select the method that matches your environment and stick with it.

:::
## Preparation Steps

### Step 1: Disable Swap \{#disable-swap\}

Kubernetes requires swap to be disabled to ensure predictable memory allocation.

```bash
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# Verify: should return no output
swapon --show
```

### Step 2: Configure Firewall Rules

Choose ONE firewall configuration method:

#### Option A: Direct iptables (Recommended for Servers) \{#required-commands-direct-iptables-approach\}

Install iptables-persistent to save rules across reboots:

```bash
sudo apt update && sudo apt install -y iptables-persistent
```

Configure pod networking for Kubernetes:

```bash
# Allow pod-to-pod communication across Kubernetes networks
sudo iptables -I FORWARD -s 10.244.0.0/17 -d 10.244.128.0/17 -j ACCEPT
sudo iptables -I OUTPUT -s 10.244.0.0/17 -d 10.244.128.0/17 -j ACCEPT
sudo iptables -I FORWARD -s 10.244.128.0/17 -d 10.244.0.0/17 -j ACCEPT
sudo iptables -I OUTPUT -s 10.244.128.0/17 -d 10.244.0.0/17 -j ACCEPT

# Save rules persistently
sudo netfilter-persistent save

# Verify rules are configured
sudo iptables -L FORWARD -n | grep 10.244
```

#### Option B: UFW (For Existing UFW Environments) \{#optional-if-using-ufw\}

Install and enable UFW:

```bash
sudo apt install -y ufw
sudo ufw --force enable
```

Open required Kubernetes and NetBox Enterprise ports:

```bash
# Kubernetes API and control plane
sudo ufw allow 6443/tcp
sudo ufw allow 2379:2380/tcp
sudo ufw allow 10250,10251,10252,10255,5473,10257,10259/tcp

# NodePort services range
sudo ufw allow 30000:32767/tcp

# Pod networking (VXLAN and BGP)
sudo ufw allow 4789/udp
sudo ufw allow 179/tcp
```

Configure pod networking through UFW:

```bash
# Route rules for pod-to-pod communication
sudo ufw route allow from 10.244.0.0/17 to 10.244.128.0/17
sudo ufw route allow from 10.244.128.0/17 to 10.244.0.0/17

# Reload firewall
sudo ufw reload

# Verify routing rules
sudo ufw status | grep 10.244
```

### Step 3: Load Kernel Modules \{#load-kernel-modules-identical-to-rhel-requirements\}

Load and persist required kernel modules for container networking:

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

### Step 4: Reboot and Verify \{#reboot-and-proceed-with-installation\}

Reboot to apply all system changes:

```bash
sudo reboot now
```

**Post-Reboot Verification:**

```bash
swapon --show                              # Should return nothing
lsmod | grep -E 'br_netfilter|ip_vs|overlay'
sudo iptables -L -n | grep 10.244          # Or: sudo ufw status | grep 10.244
```

## Pre-Installation Checklist

Before proceeding to installation, verify all requirements:

- [ ] Ubuntu 22.04 LTS or 24.04 LTS installed
- [ ] Swap memory disabled and verified
- [ ] Firewall configured (iptables OR UFW, not both)
- [ ] Pod networking rules configured (10.244.0.0/17 ↔ 10.244.128.0/17)
- [ ] Kernel modules loaded (br_netfilter, ip_vs, overlay)
- [ ] System rebooted and changes verified
- [ ] Static IP address configured
- [ ] Hostname is resolvable

## Next Steps

1. **Proceed to Installation**: Follow the [NetBox Enterprise installation guide](nbe-ec-installation.md)
2. **Review Special Configurations**: If using proxies, SELinux, or restricted environments, see [special configurations](nbe-ec-requirements.md#special-cases-for-restricted-environments)
3. **Plan Data Migration** (Optional): Review the [migration guide](nbe-migrating.md) if importing existing NetBox data

## Troubleshooting

### Firewall Issues

**Problem:** Cannot connect to admin console or NetBox after installation

**Solution:**

Verify firewall allows required ports:

```bash
# For iptables
sudo iptables -L -n | grep -E '6443|30000|443|80'

# For UFW
sudo ufw status | grep -E '6443|30000|443|80'
```

If ports are missing, add them manually:

```bash
# iptables
sudo iptables -I INPUT -p tcp --dport 30000 -j ACCEPT
sudo netfilter-persistent save

# UFW
sudo ufw allow 30000/tcp
sudo ufw allow 443/tcp
sudo ufw allow 80/tcp
```

### Pod Networking Issues

**Problem:** Pods cannot communicate with each other

**Solution:**

Verify pod networking rules:

```bash
# iptables
sudo iptables -L FORWARD -n | grep 10.244

# UFW
sudo ufw status | grep 10.244
```

If rules are missing, reconfigure pod networking following Step 2 above.

### Kernel Module Issues

**Problem:** Installation fails with kernel module errors

**Solution:**

Manually verify and reload modules:

```bash
# Check if modules exist
modinfo br_netfilter
modinfo overlay

# Reload modules
sudo modprobe br_netfilter ip_vs ip_vs_rr ip_vs_wrr ip_vs_sh overlay

# Verify loaded
lsmod | grep -E 'br_netfilter|ip_vs|overlay'
```

If modules don't exist, install kernel headers:

```bash
sudo apt update
sudo apt install -y linux-headers-$(uname -r)
```

See also: [General requirements](nbe-ec-requirements.md), [Linux changes](nbe-ec-linux-changes.md), [Troubleshooting](nbe-troubleshooting.md)
