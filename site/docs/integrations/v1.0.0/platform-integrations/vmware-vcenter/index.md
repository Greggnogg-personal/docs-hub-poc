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
title: VMware vCenter Integration
description: >-
  Synchronize VMware vCenter virtual infrastructure into NetBox Discovery.
  Automatically imports datacenters, clusters, virtual machines, and resource
  management data for unified visibility.
source: localdocs
lastUpdatedAt: 1767887294000
canonical: /docs/integrations/platform-integrations/vmware-vcenter/index/
---
# VMware vCenter Integration

## Overview

The NetBox vCenter integration helps organisations maintain a unified view of their virtual infrastructure by synchronising VMware vCenter data into NetBox. This eliminates manual data entry, reduces documentation drift, and provides a single source of truth for your network inventory.

### What Gets Synchronized
- **Datacenters**
- **Clusters**
- **Hosts**
- **Virtual Machines**
- **Virtual Interfaces**
- **IP Addresses**
- **Virtual Disks**
- **Host Interfaces (vNICs, pNICs)**

:::info[Technical Info]
  For full details of vCenter to NetBox object and attribute mappings, please refer to the [Technical Info](./vmware-vcenter-tech-info) section. 

:::
### Key Features

- **Automated Discovery**: Automatically discovers and synchronizes data from vCenter into NetBox
- **Real-time Data Synchronization**: Keeps NetBox data current with vCenter inventory
- **Comprehensive Object Mapping**: Maps Datacenters, Clusters, Hosts, Virtual Machines, Virtual Interfaces, IP Addresses, Virtual Disks and Host Interfaces (vNICs, pNICs)
- **NetBox Assurance Integration**: Leverages NetBox Assurance for safe data ingestion and deviation management
- **Secure Authentication**: OAuth2 client credentials for secure communication with NetBox, plus Vault integrations for vCenter secrets
- **Easy Deployment**: Docker-based agents run in multiple network locations 

### Integration Architecture

The VMaware vCenter integration is built using the NetBox Labs controller integrations framework, which provides:

- **Standardized Integration Pattern**: Consistent approach across all controller integrations
- **NetBox Assurance Integration**: Built-in support for safe data ingestion and deviation management with [NetBox Assurance](../../../assurance/index)
- **Agent Based**: Runs as part of the NetBox Discovery agent ecosystem using the Orb Agent Pro image

### Compatibility

#### Supported NetBox Versions
- **NetBox Cloud** and **NetBox Enterprise** v4.2.3 and later with **NetBox Assurance**

#### Supported VMware vCenter Server Versions
- **vCenter Server** 8.0.2.x and later
