---
tags:
  - automation
  - cloud
  - discovery
  - enterprise
  - integration
  - netbox
  - networking
title: Cisco Catalyst Center  NetBox Integration - Technical Information
source: localdocs
lastUpdatedAt: 1757060243000
canonical: >-
  /docs/integrations/platform-integrations/cisco-catalyst-center/cisco-catalyst-center-tech-info/
---
# Technical Information

## Cisco Catalyst Center to NetBox Object Mapping

This document provides a comprehensive mapping of Cisco Catalyst Center object types to their corresponding NetBox object types, based on the integration implementation.

## Object Type Mapping Table

| **Cisco Catalyst Center Object** | **NetBox Object Type** | **Key Fields Mapped** | **Mapping Details** |
|----------------------------------|------------------------|----------------------|-------------------|
| **Network Device** | `Device` | `hostname` → `name`<br/>
`platformId` → `device_type.model`<br/>
`serialNumber` → `serial`<br/>
`reachabilityStatus` → `status`<br/>
`managementIpAddress` → `primary_ip4/primary_ip6` | Maps device hostname, platform, serial number, and operational status. Management IP is set as primary IP based on IPv4/IPv6 detection. |
| **Device Platform** | `DeviceType` | `platformId` → `model`<br/>
`manufacturer` → `Cisco` | Creates device types based on platform ID with Cisco as the manufacturer. |
| **Device Location** | `Site` | `locationName` → `name`<br/>
`location` → `name`<br/>
`snmpLocation` → `name` | Maps device location to NetBox sites. Falls back to "Default Site" if no location specified. |
| **Device Role** | `DeviceRole` | `role` → `name` | Maps Catalyst Center device roles to NetBox roles. Defaults to "Network Device". |
| **Device Platform/OS** | `Platform` | `softwareType` + `softwareVersion` → `name` | Combines software type and version to create platform names. |
| **Network Interface** | `Interface` | `portName` → `name`<br/>
`portType` → `type`<br/>
`adminStatus` → `enabled`<br/>
`mtu` → `mtu`<br/>
`speed` → `speed`<br/>
`duplex` → `duplex`<br/>
`portMode` → `mode`<br/>
`description` → `description`<br/>
`macAddress` → `primary_mac_address` | Maps interface properties including name, type, status, MTU, speed, duplex, mode, description, and MAC address. |
| **IP Address** | `IPAddress` | `ipv4Address` + `ipv4Mask` → `address`<br/>
`addresses[].address.ipAddress` → `address`<br/>
`addresses[].address.ipMask` → `address` | Maps IPv4 addresses with subnet masks to CIDR notation. Supports both direct IPv4 fields and nested address arrays. |
| **MAC Address** | `MACAddress` | `macAddress` → `mac_address` | Maps interface MAC addresses to NetBox MAC address objects. |
| **Manufacturer** | `Manufacturer` | `Cisco` → `name` | Always set to "Cisco" for all Catalyst Center devices. |

## Field Mapping Details

### Device Status Mapping
| **Catalyst Center Status** | **NetBox Status** |
|---------------------------|-------------------|
| `Reachable` | `active` |
| `Unreachable` | `offline` |
| Any other value | `offline` |

### Interface Type Mapping
| **Catalyst Center Port Type/Name** | **NetBox Interface Type** |
|-----------------------------------|---------------------------|
| Contains "vlan" or starts with "vlan" | `virtual` |
| Contains "loopback" or starts with "lo" | `virtual` |
| Contains "port-channel" or starts with "po" | `lag` |
| Contains "tengig" or starts with "te" | `10gbase-t` |
| Contains "gigabit" or starts with "gi" | `1000base-t` |
| Contains "fast" or starts with "fa" | `100base-tx` |
| Contains "ethernet" or "eth" | `1000base-t` |
| Default fallback | `virtual` |

### Interface Mode Mapping
| **Catalyst Center Port Mode** | **NetBox Interface Mode** |
|------------------------------|---------------------------|
| `access` | `access` |
| Any other value | `None` |

### Interface Duplex Mapping
| **Catalyst Center Duplex** | **NetBox Duplex** |
|---------------------------|-------------------|
| `full`, `fdx` | `full` |
| `half`, `hdx` | `half` |
| `auto`, `a-full`, `a-half`, `auto-full`, `auto-half` | `auto` |
| Any other value | `auto` |

### Speed Parsing
The integration parses speed values from various formats:
- **Numeric values**: Direct conversion (e.g., `1000000` → `1000000`)
- **Gbps values**: Multiplied by 1,000,000 (e.g., `1G` → `1000000`)
- **Mbps values**: Multiplied by 1,000 (e.g., `100M` → `100000`)
- **Kbps values**: Direct conversion (e.g., `1000K` → `1000`)

## Data Flow

1. **Authentication**: Uses username/password to obtain API token
2. **Device Discovery**: Fetches all devices from Catalyst Center API
3. **Interface Discovery**: For each device, fetches associated interfaces
4. **Entity Building**: Creates NetBox entities for each discovered object
5. **Relationship Mapping**: Establishes relationships between devices, interfaces, IPs, and MAC addresses
6. **Data Ingestion**: Sends entities to NetBox via Diode for processing

## Tags and Metadata

All objects created by the integration are tagged with:
- `cisco`
- `catalyst-center`
- `discovered`

Additional device-specific tags from Catalyst Center are preserved and added to the tag list.

## Notes

- **Site Creation**: Sites are created automatically based on device location information
- **Duplicate Handling**: The integration handles duplicate IP addresses by reusing existing entities
- **Fallback Values**: Default values are provided for missing or invalid data
- **MAC Address Normalization**: MAC addresses are converted to uppercase format
- **IP Address Validation**: Only valid IP addresses are processed and mapped 
