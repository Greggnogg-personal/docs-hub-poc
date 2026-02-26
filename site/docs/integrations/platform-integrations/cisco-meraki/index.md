---
tags:
  - assurance
  - automation
  - cloud
  - discovery
  - enterprise
  - integration
  - netbox
  - networking
title: Cisco Meraki Integration
source: localdocs
lastUpdatedAt: 1767887294000
canonical: /docs/integrations/platform-integrations/cisco-meraki/index/
---
# Cisco Meraki Integration

## Overview

The NetBox Cisco Meraki integration provides comprehensive synchronization of Cisco Meraki cloud-managed infrastructure data into NetBox, enabling organizations to maintain a unified view of their wireless, switching, and security appliance infrastructure within their NetBox environment.

### What Gets Synchronized
- **Organizations and Networks**
- **Device Types**
- **Devices**
- **Interfaces and Ports**
- **IP Addresses**
- **VLANs**
- **Wireless Networks**

:::info[Technical Info]
  For full details of Cisco Meraki to NetBox object and attribute mappings, please refer to the [Technical Info](./cisco-meraki-tech-info) section.

:::
### Key Features

- **Automated Discovery**: Automatically discovers and synchronizes data from Cisco Meraki into NetBox
- **Real-time Data Synchronization**: Keeps NetBox data current with Cisco Meraki inventory
- **Comprehensive Object Mapping**: Maps Organizations, Networks, Sites, Devices, Interfaces, IPs, and WirelessLANs
- **NetBox Assurance Integration**: Leverages NetBox Assurance for safe data ingestion and deviation management
- **Secure Authentication**: OAuth2 client credentials for secure communication with NetBox, plus Vault integrations for Cisco Meraki secrets
- **Easy Deployment**: Docker-based agents run in multiple network locations 

### Integration Architecture

The Cisco Meraki integration is built using the NetBox Labs controller integrations framework, which provides:

- **Standardized Integration Pattern**: Consistent approach across all controller integrations
- **NetBox Assurance Integration**: Built-in support for safe data ingestion and deviation management with [NetBox Assurance](../../../assurance/index)
- **Agent Based**: Runs as part of the NetBox Discovery agent ecosystem using the Orb Agent Pro image

### Compatibility

#### Supported NetBox Versions
- **NetBox Cloud** and **NetBox Enterprise** v4.2.3 and later with **NetBox Assurance**

#### Supported Cisco Meraki Dashboard API Versions
- This integration is built on the Cisco Meraki Dashboard API (v1)
