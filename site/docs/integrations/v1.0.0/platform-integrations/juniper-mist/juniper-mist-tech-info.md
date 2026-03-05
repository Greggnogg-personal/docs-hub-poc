---
tags:
  - automation
  - cloud
  - discovery
  - enterprise
  - getting-started
  - integration
  - netbox
title: Juniper Mist NetBox Integration - Technical Information
source: localdocs
lastUpdatedAt: 1757060243000
canonical: /docs/integrations/platform-integrations/juniper-mist/juniper-mist-tech-info/
---
# Technical Information

# Juniper Mist to NetBox Object Mapping

This document provides a comprehensive mapping of Juniper Mist object types to their corresponding NetBox object types, based on the integration implementation.

## Object Type Mapping Table

| **Juniper Mist Object** | **NetBox Object Type** | **Key Fields Mapped** | **Mapping Details** |
|-------------------------|------------------------|----------------------|-------------------|
| **Organization** | `Tenant` | `org_id` → `name`<br/>
`org_id` → `slug`<br/>
`org_id` → `description` | Maps Mist organization ID to NetBox tenant with descriptive naming. |
| **Site** | `Site` | `name` → `name`<br/>
`name` → `slug`<br/>
`timezone` → `time_zone`<br/>
`id` → `custom_fields.mist_id` | Maps Mist sites to NetBox sites with timezone information and Mist ID preservation. |
| **Device (Inventory)** | `Device` | `name` or `serial` → `name`<br/>
`serial` → `serial`<br/>
`connected` → `status`<br/>
`type` → `role.name`<br/>
`model` → `device_type.model`<br/>
`mac` → `custom_fields.mist_mac`<br/>
`id` → `asset_tag` | Maps Mist inventory devices to NetBox devices with connection status, hardware details, and custom fields. |
| **Device Type** | `DeviceType` | `model` → `model`<br/>
`type` → `custom_fields.mist_type` | Creates device types based on Mist device model with type information in custom fields. |
| **Device Role** | `DeviceRole` | `type` → `name`<br/>
`type` → `slug` | Maps Mist device types (ap, switch, etc.) to NetBox device roles. |
| **Platform** | `Platform` | `Static` → `name` | Always set to "Junos" for all Mist devices. |
| **Manufacturer** | `Manufacturer` | `Static` → `name` | Always set to "Juniper" for all Mist devices. |
| **Wireless LAN** | `WirelessLAN` | `ssid` → `ssid`<br/>
`enabled` → `status`<br/>
`auth.type` → `auth_type`<br/>
`auth.pairwise` → `auth_cipher`<br/>
`id` → `custom_fields.mist_wlan_id`<br/>
`ap_ids` → `custom_fields.mist_ap_ids`<br/>
`apply_to` → `custom_fields.mist_ap_scope`<br/>
`wxtag_ids` → `custom_fields.mist_wxtag_ids` | Maps Mist WLANs to NetBox wireless LANs with authentication details and AP associations. |
| **Unassigned Site** | `Site` | `Static` → `name` | Creates "Unassigned Mist Inventory" site for devices without valid site assignments. |

## Field Mapping Details

### Device Status Mapping
| **Mist Connection Status** | **NetBox Status** |
|---------------------------|-------------------|
| `true` (connected) | `active` |
| `false` (disconnected) | `offline` |

### Wireless LAN Status Mapping
| **Mist WLAN Status** | **NetBox Status** |
|---------------------|-------------------|
| `true` (enabled) | `active` |
| `false` (disabled) | `disabled` |

### Authentication Type Mapping
| **Mist Auth Type** | **NetBox Auth Type** |
|-------------------|---------------------|
| `open` | `open` |
| `psk` | `wpa-personal` |
| `psk-tkip` | `wpa-personal` |
| `psk-wpa2-tkip` | `wpa-personal` |
| `eap` | `wpa-enterprise` |
| `eap192` | `wpa-enterprise` |
| `wep` | `wep` |
| Any other value | `Unknown` |

### Authentication Cipher Mapping
| **Mist Auth Type** | **Mist Pairwise Ciphers** | **NetBox Auth Cipher** |
|-------------------|---------------------------|----------------------|
| `eap192` | Any | `aes` |
| `psk-tkip` | Any | `tkip` |
| `psk-wpa2-tkip` | Any | `tkip` |
| `wep` | Any | `auto` |
| `open` | Any | `None` |
| `psk` | Contains "tkip" | `tkip` |
| `psk` | Contains "ccmp" or "wpa3" | `aes` |
| `eap` | Contains "tkip" | `tkip` |
| `eap` | Contains "ccmp" or "wpa3" | `aes` |
| Any other | No recognized ciphers | `None` |

### Site Assignment Logic
The integration uses sophisticated site assignment:

1. **Valid Site Assignment**: Devices with valid `site_id` are assigned to corresponding NetBox sites
2. **Unassigned Site Fallback**: Devices with invalid or missing `site_id` are assigned to "Unassigned Mist Inventory" site
3. **Site Creation**: All Mist sites are automatically created as NetBox sites with timezone information

### WLAN Scope Mapping
| **Mist Apply To** | **NetBox Scope** | **Custom Field Usage** |
|------------------|------------------|----------------------|
| `site` | `scope_site` | Standard site scoping |
| `wxtags` | `scope_site` | Uses `mist_wxtag_ids` custom field |
| `aps` | `scope_site` | Uses `mist_ap_ids` custom field |
| `None` | `scope_site` | Default site scoping |

## Custom Fields

The integration requires and utilizes several custom fields:

| **Custom Field** | **Object Type** | **Purpose** |
|------------------|-----------------|-------------|
| `mist_id` | Site | Stores Mist site ID for reference |
| `mist_mac` | Device | Stores Mist device MAC address |
| `mist_type` | Device Type | Stores Mist device type (ap, switch, etc.) |
| `mist_wlan_id` | Wireless LAN | Stores Mist WLAN ID for reference |
| `mist_ap_ids` | Wireless LAN | Stores JSON array of AP IDs serving the WLAN |
| `mist_ap_scope` | Wireless LAN | Stores WLAN application scope (site, wxtags, aps) |
| `mist_wxtag_ids` | Wireless LAN | Stores JSON array of WX tag IDs (when apply_to=wxtags) |
| `mist_wlans_served` | Device | Stores JSON array of WLAN IDs served by the device |
| `mist_aps_serving_this` | Wireless LAN | Stores JSON array of device MACs serving the WLAN |

## Tags and Metadata

All objects created by the integration are tagged with:
- `juniper`
- `mist`
- `discovered`

## Notes

- **Device Naming**: Devices are named using the Mist `name` field, falling back to `serial` if name is empty, or "Unnamed" if both are missing
- **Serial Number Handling**: Uses Mist `serial` field as NetBox device serial number
- **Asset Tag**: Uses Mist device `id` as NetBox asset tag for inventory tracking
- **WLAN Uniqueness**: WLANs are deduplicated based on unique (wlan_id, site_id, ssid) combinations
- **Device-WLAN Relationships**: Bidirectional relationships are maintained through custom fields
- **Unassigned Inventory**: Devices without valid site assignments are grouped in a dedicated "Unassigned Mist Inventory" site
- **Timezone Support**: Site timezone information is preserved from Mist configuration
- **Authentication Security**: Supports various Mist authentication types with proper cipher mapping
- **API Rate Limiting**: Integration handles Mist API rate limits and pagination automatically
