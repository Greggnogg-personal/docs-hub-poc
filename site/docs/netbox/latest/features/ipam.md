---
title: IP Address Management (IPAM)
sidebar_label: IPAM
tags:
  - community
  - netbox
---

# IP Address Management

NetBox provides a comprehensive hierarchical IPAM system covering everything from RIR-owned aggregates down to individual host addresses.

## Object Hierarchy

```
RIR
 └─ Aggregate (e.g. 10.0.0.0/8)
     └─ Prefix (e.g. 10.1.0.0/16)
         └─ Prefix (e.g. 10.1.1.0/24)
             └─ IP Range (10.1.1.100–10.1.1.200)
             └─ IP Address (10.1.1.5/24)
```

## Key Objects

### Aggregates
Top-level summary blocks assigned to a Regional Internet Registry (RIR). They don't overlap and together represent your entire allocated IP space.

### Prefixes
Subdivisions within aggregates. Prefixes can nest to any depth and are associated with Sites and VRFs.

### IP Ranges
Contiguous ranges within a prefix, often used for DHCP pools.

### IP Addresses
Individual host addresses. An IP address can be assigned to a device interface, VM interface, or FHRP group.

## VRFs

Virtual Routing and Forwarding instances allow overlapping IP spaces (useful for multi-tenant environments). Every prefix and IP can be scoped to a VRF.

## VLAN Management

VLANs and VLAN Groups are modelled in IPAM and can be scoped to a site or location for accurate multi-site management.
