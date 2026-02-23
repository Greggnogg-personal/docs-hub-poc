---
title: Data Center Infrastructure Management (DCIM)
sidebar_label: DCIM
tags:
  - community
  - netbox
---

# Data Center Infrastructure Management

NetBox models the full physical infrastructure stack from region down to individual port connectors.

## Hierarchy

```
Region
 └─ Site
     └─ Location (room, row, cage…)
         └─ Rack
             └─ Device
                 └─ Interfaces / Ports / Modules
                         │
                      Cables  ──▶  Patch Panels / Pass-throughs
```

## Sites & Locations

**Sites** represent physical facilities (data centres, branch offices, colocation). **Locations** subdivide a site into rooms, cage areas, or rows.

## Racks

Racks track unit height (U), power capacity, weight, and which devices occupy which units. NetBox renders a visual rack elevation for quick at-a-glance inventory.

## Devices & Device Types

**Device Types** are manufacturer-model templates that define the component structure (interfaces, power ports, console ports, module bays). **Devices** are instances of a device type placed in a rack at a specific site.

## Cables & Connectivity

Every physical connection (copper, fibre, power) is modelled as a **Cable** with two endpoints. The cable trace feature lets you follow a path from a server NIC through patch panels to the upstream switch port.

## Power Tracking

Model power distribution units (PDUs), power feeds, and power outlets. NetBox calculates power utilisation per rack and flags overloaded circuits.
