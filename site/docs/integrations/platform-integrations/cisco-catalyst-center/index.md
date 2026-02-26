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
title: Cisco Catalyst Center Integration
description: >-
  Automatically discover and synchronize network infrastructure from Cisco
  Catalyst Center into NetBox Discovery. Synchronizes devices, platforms, IP
  addresses, and more to maintain an accurate network inventory.
source: localdocs
lastUpdatedAt: 1767887294000
canonical: /docs/integrations/platform-integrations/cisco-catalyst-center/index/
---
# Cisco Catalyst Center Integration

## Overview

The Cisco Catalyst Center integration automatically discovers and synchronizes your network infrastructure data from Catalyst Center into NetBox, ensuring your NetBox instance remains current with your actual network infrastructure. This eliminates manual data entry, reduces documentation drift, and provides a single source of truth for your network inventory.

### What Gets Synchronized
- **Devices**
- **Platforms**
- **Interfaces**
- **IP Addresses**
- **MAC Addresses**
- **Sites**
- **Roles**

:::info[Technical Info]
  For full details of Catalyst Center to NetBox object and attribute mappings, please refer to the [Technical Info](./cisco-catalyst-center-tech-info) section. 

:::
### Key Features

- **Automated Device Discovery**: Automatically discovers and synchronizes Cisco Catalyst devices from Catalyst Center
- **Real-time Data Synchronization**: Keeps NetBox data current with Catalyst Center inventory
- **Comprehensive Object Mapping**: Maps devices, interfaces, IP addresses, MAC Addresses, sites, and roles
- **NetBox Assurance Integration**: Leverages NetBox Assurance for safe data ingestion and deviation management
- **Secure Authentication**: OAuth2 client credentials for secure communication with NetBox, plus Vault integrations for controller secrets
- **Easy Deployment**: Docker-based agents run in multiple network locations 

### Integration Architecture

The Cisco Catalyst Center integration is built using the NetBox Labs controller integrations framework, which provides:

- **Standardized Integration Pattern**: Consistent approach across all controller integrations
- **NetBox Assurance Integration**: Built-in support for safe data ingestion and deviation management with [NetBox Assurance](/docs/assurance/)
- **Agent Based**: Runs as part of the NetBox Discovery agent ecosystem using the Orb Agent Pro image

### Compatibility

#### Supported NetBox Versions
- **NetBox Cloud** and **NetBox Enterprise** v4.2.3 and later with **NetBox Assurance**

#### Supported Cisco Catalyst Center Versions
- **Cisco Catalyst Center** 2.3.x and later

