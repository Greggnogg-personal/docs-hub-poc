---
tags:
  - administration
  - authentication
  - cloud
  - discovery
  - enterprise
  - netbox
  - operations
title: Technical Information
source: localdocs
lastUpdatedAt: 1756890057000
canonical: >-
  /docs/integrations/platform-integrations/vmware-vcenter/vmware-vcenter-tech-info/
---
# Technical Information

## VMware vCenter to NetBox Object Mapping

This document provides a comprehensive mapping of VMware vCenter object types to their corresponding NetBox object types, based on the integration implementation.

## Object Type Mapping Table

| **VMware vCenter Object** | **NetBox Object Type** | **Key Fields Mapped** | **Mapping Details** |
|---------------------------|------------------------|----------------------|-------------------|
| **Datacenter** | `ClusterGroup` | `name` → `name` | Maps vCenter datacenter names to NetBox cluster groups for organizational hierarchy. |
| **Cluster** | `Cluster` | `name` → `name`<br/>
`datacenter.name` → `group`<br/>
`hosts[]` → `scope_site` or `scope_site_group` | Maps vCenter clusters to NetBox clusters, scoped to sites or site groups based on host distribution. |
| **ESXi Host** | `Device` | `summary.config.name` → `name`<br/>
`summary.hardware.vendor` → `manufacturer.name`<br/>
`summary.hardware.model` → `device_type.model`<br/>
`hardware.systemInfo.serialNumber` → `serial`<br/>
`config.product.fullName` → `platform.name`<br/>
`runtime.powerState` → `status`<br/>
`site_name` (from tags) → `site` | Maps host hardware details, platform information, and operational status. Site assignment based on `netbox_site:` tags or defaults to "DefaultSite". |
| **Host Device Type** | `DeviceType` | `summary.hardware.model` → `model`<br/>
`summary.hardware.vendor` → `manufacturer` | Creates device types based on host hardware model and vendor information. |
| **Host Platform** | `Platform` | `config.product.fullName` → `name` | Maps ESXi version and platform information to NetBox platform objects. |
| **Host Role** | `DeviceRole` | `Static` → `name` | Always set to "ESXi Host" for all vCenter hosts. |
| **Host Interface** | `Interface` | `device` → `name`<br/>
`spec.mac` → `primary_mac_address`<br/>
`spec.ip.ipAddress` + `spec.ip.subnetMask` → `description` | Maps both virtual (vNIC) and physical (pNIC) interfaces with MAC addresses and IP configurations. |
| **Virtual Machine** | `VirtualMachine` | `name` → `name`<br/>
`config.instanceUuid` → `custom_fields.vm_uuid`<br/>
`runtime.powerState` → `status`<br/>
`config.hardware.numCPU` → `vcpus`<br/>
`config.hardware.memoryMB` → `memory`<br/>
`config.guestFullName` → `platform.name`<br/>
`cluster` → `cluster`<br/>
`site` → `site` | Maps VM properties including name, UUID, power state, CPU/memory resources, guest OS, and cluster/site relationships. |
| **VM Role** | `DeviceRole` | `Static` → `name` | Always set to "Virtual Machine" for all vCenter VMs. |
| **VM Platform** | `Platform` | `config.guestFullName` → `name` | Maps guest operating system information to NetBox platform objects. |
| **VM Interface** | `VMInterface` | `deviceInfo.label` → `name`<br/>
`connectable.connected` → `enabled`<br/>
`macAddress` → `primary_mac_address`<br/>
`deviceInfo.summary` → `description`<br/>
`virtual_switch_mtu` → `mtu` | Maps VM network adapters with connection status, MAC addresses, descriptions, and MTU information from associated virtual switches. |
| **Virtual Disk** | `VirtualDisk` | `deviceInfo.label` → `name`<br/>
`capacityInKB` → `size`<br/>
`backing.datastore.name` → `custom_fields.datastore_name`<br/>
`backing.fileName` → `custom_fields.vmdk_file_path` | Maps VM disk information including size (converted from KB to MB), datastore name, and VMDK file paths. |
| **IP Address** | `IPAddress` | `ipAddress` + `subnetMask` → `address` (CIDR)<br/>
`device_id` → `assigned_object` | Maps both host and VM IP addresses with subnet masks converted to CIDR notation. |
| **MAC Address** | `MACAddress` | `macAddress` → `mac_address` | Maps interface MAC addresses to NetBox MAC address objects for both hosts and VMs. |
| **Site** | `Site` | `netbox_site:siteName` (from tags) → `name`<br/>
`Static` → `DefaultSite` | Creates sites based on host tags or defaults to "DefaultSite" if no site information available. |
| **Site Group** | `SiteGroup` | `f"SiteGroup-{cluster.name}"` → `name` | Creates site groups for clusters spanning multiple sites using custom field relationships. |
| **Cluster Type** | `ClusterType` | `Static` → `name` | Always set to "VMware vSphere" for all vCenter clusters. |
| **Manufacturer** | `Manufacturer` | `summary.hardware.vendor` → `name` | Maps host hardware vendor information to NetBox manufacturer objects. |

## Field Mapping Details

### Host Status Mapping
| **vCenter Power State** | **NetBox Status** |
|-------------------------|-------------------|
| `poweredOn` | `active` |
| `poweredOff` | `offline` |
| `suspended` | `staged` |
| Any other value | `offline` |

### VM Status Mapping
| **vCenter Power State** | **NetBox Status** |
|-------------------------|-------------------|
| `poweredOn` | `active` |
| `poweredOff` | `offline` |
| `suspended` | `staged` |
| Any other value | `offline` |

### Interface Type Mapping
| **vCenter Interface Type** | **NetBox Interface Type** |
|---------------------------|---------------------------|
| `vnic` (Virtual NIC) | `other` |
| `pnic` (Physical NIC) | `other` |
| VM Network Adapter | `virtual` |

### Site Discovery Logic
The integration uses a sophisticated site discovery mechanism:

1. **Tag-based Discovery**: Hosts with `netbox_site:siteName` tags create sites with the specified names
2. **Default Site Fallback**: Hosts without site tags are assigned to "DefaultSite"
3. **Multi-site Clusters**: Clusters spanning multiple sites create SiteGroups with custom field relationships

### Cluster Scoping Logic
| **Host Site Distribution** | **Cluster Scope** |
|---------------------------|-------------------|
| Single site | `scope_site` |
| Multiple sites | `scope_site_group` (creates SiteGroup) |
| No site info | `scope_site` (DefaultSite) |

### IP Address Processing
The integration processes IP addresses with advanced logic:

- **CIDR Conversion**: Automatically converts subnet masks to CIDR notation
- **Primary IP Assignment**: First IPv4/IPv6 addresses become primary IPs for hosts and VMs
- **Interface Association**: IP addresses are linked to specific interfaces via `assigned_object` relationships

### MTU Discovery
VM interface MTU values are retrieved from:
- **Standard vSwitches**: From host network system configuration
- **Distributed vSwitches**: From DVS manager configuration
- **Fallback**: Defaults to `None` if MTU cannot be determined

## Data Flow

1. **Authentication**: Establishes connection to vCenter using pyVmomi with retry mechanism
2. **Datacenter Discovery**: Traverses vCenter hierarchy to identify datacenters and compute resources
3. **Host Discovery**: Collects ESXi host information including hardware details, interfaces, and tags
4. **Cluster Discovery**: Identifies clusters and standalone hosts within each datacenter
5. **VM Discovery**: Gathers virtual machine details including hardware configuration and network adapters
6. **Site Resolution**: Processes host tags to determine site assignments and create site hierarchies
7. **Entity Building**: Creates NetBox entities with proper relationships and custom fields
8. **Data Ingestion**: Sends entities to NetBox via Diode for processing

## Custom Fields

The integration requires and utilizes several custom fields:

| **Custom Field** | **Object Type** | **Purpose** |
|------------------|-----------------|-------------|
| `vm_uuid` | Virtual Machine | Stores vCenter VM instance UUID |
| `datastore_name` | Virtual Disk | Stores associated vCenter datastore name |
| `vmdk_file_path` | Virtual Disk | Stores VMDK file path information |
| `parent_site_groups` | Site | Links sites to parent site groups for multi-site clusters |

## Tags and Metadata

All objects created by the integration are tagged with:
- `vmware`
- `vcenter`
- `discovered`

Additional tags from vCenter (excluding `netbox_site:` tags) are preserved and added to the tag list.

## Notes

- **Site Creation**: Sites are created automatically based on host tags or default to "DefaultSite"
- **Duplicate Handling**: The integration handles duplicate entities by reusing existing NetBox objects
- **Fallback Values**: Default values are provided for missing or invalid data
- **MAC Address Normalization**: MAC addresses are converted to uppercase format
- **IP Address Validation**: Only valid IP addresses with proper subnet masks are processed
- **Standalone Hosts**: Hosts outside clusters are grouped into datacenter-specific standalone clusters
- **SSL Handling**: Supports SSL certificate validation bypass for development/testing environments
