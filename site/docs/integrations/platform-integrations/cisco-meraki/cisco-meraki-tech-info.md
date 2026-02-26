---
tags:
  - automation
  - cloud
  - discovery
  - enterprise
  - getting-started
  - integration
  - netbox
title: Technical Information
source: localdocs
lastUpdatedAt: 1757434234000
canonical: /docs/integrations/platform-integrations/cisco-meraki/cisco-meraki-tech-info/
---
# Technical Information

# Cisco Meraki to NetBox Object Mapping

This document provides a comprehensive mapping of Cisco Meraki object types to their corresponding NetBox object types, based on the integration implementation.

## Object Type Mapping Table

| **Cisco Meraki Object** | **NetBox Object Type** | **Key Fields Mapped** | **Mapping Details** |
|-------------------------|------------------------|----------------------|-------------------|
| **Organization** | `Tenant` | `name` → `name`<br/>
`id` → `description`<br/>
`name` → `slug` | Maps Meraki organization to NetBox tenant with descriptive naming and ID preservation. |
| **Network** | `Site` | `name` → `name`<br/>
`name` → `slug`<br/>
`id` → `custom_fields.meraki_network_id`<br/>
`tags` → `tags` | Maps Meraki networks to NetBox sites with network ID preservation and tag inheritance. |
| **Device (Inventory)** | `Device` | `name` or `serial` → `name`<br/>
`serial` → `serial`<br/>
`model` → `device_type.model`<br/>
`firmware` → `platform.name`<br/>
`tags` → `tags` | Maps Meraki devices to NetBox devices with hardware details, firmware information, and tag inheritance. |
| **Device Type** | `DeviceType` | `model` → `model`<br/>
`Static` → `manufacturer` | Creates device types based on Meraki device model with Cisco as manufacturer. |
| **Device Role** | `DeviceRole` | `model` prefix → `name` | Maps Meraki device model prefixes (MR, MS, MX) to NetBox device roles. |
| **Platform** | `Platform` | `model` + `firmware` → `name`<br/>
`Static` → `manufacturer` | Creates platforms based on device model and firmware version. |
| **Manufacturer** | `Manufacturer` | `Static` → `name` | Always set to "Cisco" for all Meraki devices. |
| **Wireless LAN** | `WirelessLAN` | `name` → `ssid`<br/>
`enabled` → `status`<br/>
`authMode` → `auth_type`<br/>
`encryptionMode` → `auth_cipher`<br/>
`scope_site` → `scope_site` | Maps Meraki SSIDs to NetBox wireless LANs with authentication and encryption details. |
| **VLAN** | `VLAN` | `id` → `vid`<br/>
`name` → `name`<br/>
`Static` → `status` | Maps Meraki appliance VLANs to NetBox VLANs with active status. |
| **VLAN Group** | `VLANGroup` | `network.name` → `name`<br/>
`scope_site` → `scope_site` | Creates VLAN groups scoped to sites for each Meraki network. |
| **Interface** | `Interface` | `name` → `name`<br/>
`enabled` → `enabled`<br/>
`type` → `type`<br/>
`description` → `description` | Maps Meraki device interfaces to NetBox interfaces with configuration details. |
| **IP Address** | `IPAddress` | `ip` + `subnet` → `address`<br/>
`assigned_object` → `assigned_object` | Maps Meraki IP configurations to NetBox IP addresses in CIDR notation. |
| **MAC Address** | `MACAddress` | `mac` → `mac_address`<br/>
`assigned_object` → `assigned_object` | Maps Meraki device MAC addresses to NetBox MAC address objects. |

## Field Mapping Details

### Device Status Mapping
| **Meraki Device Status** | **NetBox Status** |
|--------------------------|-------------------|
| In inventory | `active` |
| Any other status | `active` |

### Wireless LAN Status Mapping
| **Meraki SSID Status** | **NetBox Status** |
|----------------------|-------------------|
| `true` (enabled) | `active` |
| `false` (disabled) | `disabled` |

### Device Role Mapping
| **Meraki Model Prefix** | **NetBox Device Role** |
|------------------------|----------------------|
| `MR` | `Wireless AP` |
| `MS` | `Switch` |
| `MX` | `Firewall` |

### Authentication Type Mapping
| **Meraki Auth Mode** | **NetBox Auth Type** |
|---------------------|---------------------|
| `open` | `open` |
| `psk` | `wpa-personal` |
| `8021x-meraki` | `wpa-enterprise` |
| `8021x-radius` | `wpa-enterprise` |
| `ipsk-with-radius` | `wpa-enterprise` |
| Any other value | `open` |

### Authentication Cipher Mapping
| **Meraki Encryption Mode** | **NetBox Auth Cipher** |
|---------------------------|----------------------|
| `wep` | `wep` |
| `wpa` | `tkip` |
| `wpa-eap` | `tkip` |
| `wpa2` | `aes` |
| `wpa2-eap` | `aes` |
| `open` | `auto` |
| Any other value | `auto` |

### Interface Type Mapping
| **Meraki Device Type** | **Interface Types Created** |
|----------------------|---------------------------|
| `MR` (Wireless AP) | Radio interfaces (2.4GHz, 5GHz, 6GHz) |
| `MS` (Switch) | Physical switch ports |
| `MX` (Firewall) | Appliance ports and VLAN interfaces |

### VLAN Status Mapping
| **Meraki VLAN Status** | **NetBox Status** |
|----------------------|-------------------|
| All VLANs from API | `active` |

## Data Flow

1. **Authentication**: Establishes connection to Meraki Dashboard API using organization API key
2. **Organization Discovery**: Creates tenant based on organization data
3. **Network Discovery**: Fetches all networks from Meraki organization and creates NetBox sites
4. **VLAN Group Creation**: Creates VLAN groups scoped to each site/network
5. **VLAN Discovery**: Fetches appliance VLAN configurations and creates NetBox VLANs
6. **Wireless LAN Discovery**: Processes SSID configurations from wireless networks
7. **Device Discovery**: Retrieves organization devices and creates device entities with roles and types
8. **Interface Creation**: Creates interfaces based on device type (radios, ports, VLAN interfaces)
9. **IP Address Processing**: Creates management IPs and VLAN gateway IPs
10. **MAC Address Association**: Links MAC addresses to interfaces
11. **Primary IP Assignment**: Sets primary IPv4/IPv6 on devices
12. **Data Ingestion**: Sends entities to NetBox via Diode for processing

## Custom Fields

The integration requires and utilizes several custom fields:

| **Custom Field** | **Object Type** | **Purpose** |
|------------------|-----------------|-------------|
| `meraki_network_id` | Site | Stores Meraki network ID for reference |

## Tags and Metadata

All objects created by the integration are tagged with:
- `cisco`
- `meraki`
- `discovered`

Additional tags from Meraki networks and devices are preserved and added to the tag list.

## Notes

- **Device Naming**: Devices are named using the Meraki `name` field, falling back to `serial` if name is empty
- **Serial Number Handling**: Uses Meraki `serial` field as NetBox device serial number
- **Platform Creation**: Platforms are created based on device model and firmware version
- **Interface Management**: Creates different interface types based on device role (radios for APs, ports for switches, etc.)
- **VLAN Processing**: Only processes networks with appliance capabilities for VLAN creation
- **Wireless LAN Processing**: Only processes networks with wireless capabilities for SSID creation
- **IP Address Handling**: Creates management IPs and VLAN gateway IPs with proper CIDR notation
- **Rate Limiting**: Integration uses Meraki SDK with built-in rate limiting and retry logic
- **Device Filtering**: Only processes supported device types (MR, MS, MX) and ignores others
- **Primary IP Assignment**: Automatically assigns first IPv4/IPv6 addresses as primary IPs on devices
