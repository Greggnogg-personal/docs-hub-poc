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
title: Juniper Mist Integration
source: localdocs
lastUpdatedAt: 1767887294000
canonical: /docs/integrations/platform-integrations/juniper-mist/index/
---
# Juniper Mist Integration

## Overview

The NetBox Juniper Mist integration helps organisations maintain a single pane of glass view of their Mist managed infrastructure alongside the rest of their NetBox data.

### What Gets Synchronized
- **Organizations**
- **Sites**
- **Devices (APs and switches for both inventory and installed devices)**
- **Wireless LANs**

:::info[Technical Info]
  For full details of Juniper Mist to NetBox object and attribute mappings, please refer to the [Technical Info](./juniper-mist-tech-info)  section.

:::
### Key Features

- **Automated Discovery**: Automatically discovers and synchronizes data from Juniper Mist into NetBox
- **Real-time Data Synchronization**: Keeps NetBox data current with Juniper Mist inventory
- **Comprehensive Object Mapping**: Maps Organizations, Sites, Devices (APs and switches for both inventory and installed devices) and WirelessLANs
- **NetBox Assurance Integration**: Leverages NetBox Assurance for safe data ingestion and deviation management
- **Secure Authentication**: OAuth2 client credentials for secure communication with NetBox, plus Vault integrations for Juniper Mist secrets
- **Easy Deployment**: Docker-based agents run in multiple network locations 

### Integration Architecture

The Juniper Mist integration is built using the NetBox Labs controller integrations framework, which provides:

- **Standardized Integration Pattern**: Consistent approach across all controller integrations
- **NetBox Assurance Integration**: Built-in support for safe data ingestion and deviation management with [NetBox Assurance](../../../assurance/index)
- **Agent Based**: Runs as part of the NetBox Discovery agent ecosystem using the Orb Agent Pro image

### Compatibility

#### Supported NetBox Versions
- **NetBox Cloud** and **NetBox Enterprise** v4.2.3 and later with **NetBox Assurance**

#### Supported Juniper Mist Cloud API Versions
- This integration is built on the Juniper Mist Cloud API (v1)
