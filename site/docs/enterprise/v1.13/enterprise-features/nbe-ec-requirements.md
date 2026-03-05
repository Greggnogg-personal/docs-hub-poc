---
tags:
  - administration
  - authentication
  - cloud
  - enterprise
  - netbox
title: NetBox Enterprise System Requirements (v1.13)
description: >-
  Hardware, software, and network requirements for NetBox Enterprise Embedded
  Cluster installations
source: localdocs
lastUpdatedAt: 1769027798000
canonical: /docs/v1.13/enterprise/enterprise-features/nbe-ec-requirements/
---
# NetBox Enterprise System Requirements \{#netbox-enterprise-requirements\}

## Overview

NetBox Enterprise uses an embedded Kubernetes cluster to provide a production-ready NetBox deployment. This document outlines the system, network, and software requirements needed for successful installation and operation.

:::warning[Hostname and IP address cannot be changed after installation]

:::
## System Requirements \{#host-system-requirements\}

<a id="hardware-requirements"></a>

### Hardware Requirements \{#recommended\}

| Deployment Type | vCPU | Memory (RAM) | Disk Space | Disk Location |
|-----------------|------|--------------|------------|---------------|
| **Production** (Recommended) | 8 vCPU | 24 GB | 100 GB SSD | `/var/lib` |
| **Non-Production** (Minimum) | 4 vCPU | 16 GB | 50 GB SSD | `/var/lib` |

**Additional Requirements:**

- Swap must be disabled (Kubernetes requirement)
- SSD or NVMe storage recommended for database performance
- x86-64 architecture required

### Operating System Requirements \{#host-operating-system\}

**Linux Kernel Requirements:**

- Linux kernel version 4.3 or higher
- `x86-64` architecture
- Required kernel modules: `br_netfilter`, `ip_vs`, `ip_vs_rr`, `ip_vs_wrr`, `ip_vs_sh`, `overlay`

NetBox Enterprise supports any Linux distribution that meets these kernel requirements. The following distributions have been tested and have specific preparation guides available:

#### Supported Linux Distributions

The following Linux distributions have been tested and validated for use with NetBox Enterprise Embedded Cluster:

import DistributionList from '@site/src/components/DistributionList';

<DistributionList />

:::note[Distribution-Specific Guides]
For **Red Hat Enterprise Linux (RHEL)** deployments, see additional requirements [here](../nbe-ec-requirements-rhel).

For **Ubuntu** deployments, see additional requirements [here](../nbe-ec-requirements-ubuntu).

:::
### Network Requirements

**Required Ports:**

| Port | Protocol | Purpose | Source |
|------|----------|---------|--------|
| `80` | TCP | NetBox HTTP | External users |
| `443` | TCP | NetBox HTTPS & Diode gRPC | External users |
| `30000` | TCP | Admin Console | Administrators |
| `6443` | TCP | Kubernetes API | Internal |
| `2379-2380` | TCP | etcd | Internal |
| `10250` | TCP | Kubelet API | Internal |
| `4789` | UDP | VXLAN overlay (Calico) | Internal |
| `179` | TCP | BGP (if Calico uses BGP) | Internal |

**Network Configuration:**

- Static IP address required (no DHCP)
- Hostname must be fully qualified domain name (FQDN) or resolvable short name
- Pod networking uses `10.244.0.0/17` and `10.244.128.0/17` ranges

<a id="special-configurations"></a>

## Special Configurations \{#special-cases-for-restricted-environments\}

<a id="proxy-environments"></a>

### Proxy Environments \{#traditional-proxies\}

NetBox Enterprise supports installation through proxies (version 1.6.0+).

**Required Proxy Configuration:**

Before installing, configure your proxy to allow the following hostnames:

* ***.enterprise.netboxlabs.com**
* **replicated.app**
* **proxy.replicated.com**

If your proxy does not support wildcard hostnames, specify the following individual hosts instead of `*.enterprise.netboxlabs.com`:

* **app.enterprise.netboxlabs.com**
* **proxy.enterprise.netboxlabs.com**
* **registry.enterprise.netboxlabs.com**

These hostnames are required to access various resources used in the NetBox Enterprise installation.

**Installation with Proxy:**

Pass proxy arguments to the NetBox Enterprise installer when following the [installation guide](../nbe-ec-installation):

```bash
sudo ./netbox-enterprise install \
  --license license.yaml \
  --http-proxy http://proxy.example.com:8888 \
  --https-proxy http://proxy.example.com:8888
```

:::note[Proxy Configuration]
NetBox Enterprise does not inherit proxy settings from shell environment variables. You must explicitly provide proxy configuration via command-line flags.

:::
**Proxy Options:**

* `--http-proxy <proxy-url>` and `--https-proxy <proxy-url>`

    The proxy URL should be a complete URL to reach the proxy (e.g., `http://myhost:8888`).

* `--no-proxy`

    By default, the installer will automatically disable proxying on internal cluster addresses and the default network interface. If the installer can't autodetect an interface or you have a more complicated network, specify this manually as a comma-separated list of addresses with CIDR netmasks (`1.2.3.4/32`) or domains (`foo.com`, `*.bar.com`).

### Man-In-The-Middle (MITM) Proxies

If you are using a MITM proxy (one that uses an internal TLS certificate authority for communication with the proxy, rather than directly passing encrypted traffic), you will need an additional option:

* `--private-ca </path/to/private-ca-bundle>`

This allows the cluster to accept traffic encrypted using your internal CA.

<a id="firewalld-common-on-rhel"></a>

### Firewalld (Common on RHEL) \{#firewalld\}

If using Firewalld, create a zone before installation:

**Step 1: Create Zone Configuration**

Create `/etc/firewalld/zones/netbox-enterprise.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<zone target="ACCEPT">
  <short>netbox-enterprise</short>
  <description>Zone for NetBox Enterprise communication</description>
  <!-- Add your host IP addresses here -->
  <source address="10.244.0.0/17"/>
  <source address="10.244.128.0/17"/>
  <port protocol="tcp" port="2380"/>
  <port protocol="udp" port="4789"/>
  <port protocol="tcp" port="6443"/>
  <port protocol="tcp" port="7443"/>
  <port protocol="tcp" port="9091"/>
  <port protocol="tcp" port="9443"/>
  <port protocol="tcp" port="10249"/>
  <port protocol="tcp" port="10250"/>
  <port protocol="tcp" port="10256"/>
  <port protocol="tcp" port="30000"/>
  <port protocol="tcp" port="22"/>
</zone>
```

**Step 2: Add External Access**

Add source addresses for hosts that need access. For example, for IP `1.2.3.4` and network `192.168.123.0/24`:

```xml
<source address="1.2.3.4/32" />
<source address="192.168.123.0/24" />
```

**Step 3: Reload Firewall**

```bash
sudo firewall-cmd --reload
```

Then proceed with normal [installation](../nbe-ec-installation).

### SELinux (RHEL Systems) \{#selinux\}

NetBox Enterprise can run with SELinux in enforcing mode, but requires initial installation in permissive mode.

**Step 1: Disable SELinux Enforcement Temporarily**

```bash
sudo setenforce 0
```

**Step 2: Install NetBox Enterprise**

Follow the standard [installation guide](../nbe-ec-installation).

**Step 3: Configure SELinux Policies**

After installation completes, configure SELinux to allow NetBox Enterprise operations:

```bash
export EC_DIR="/var/lib/embedded-cluster"
export KUBE_DIR="${EC_DIR}/k0s"

# Mark cluster directory for containerd
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

**Step 4: Re-enable SELinux Enforcement**

```bash
sudo setenforce 1
```

Or reboot to apply permanently.

:::warning[SELinux and Upgrades]
When upgrading NetBox Enterprise or installing plugins, temporarily set SELinux to permissive mode, then re-run the configuration steps above before re-enabling enforcement.

:::
## Next Steps

1. Follow distribution-specific preparation: [Ubuntu](../nbe-ec-requirements-ubuntu) or [RHEL](../nbe-ec-requirements-rhel)
2. Proceed to the [installation guide](../nbe-ec-installation)

See also: [Linux system changes](../nbe-ec-linux-changes), [Troubleshooting](../nbe-troubleshooting)
