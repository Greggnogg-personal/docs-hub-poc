---
tags:
  - community
source: localdocs
lastUpdatedAt: 1758803717000
canonical: /docs/v3.7/netbox/models/dcim/manufacturer/
---
# Manufacturers

A manufacturer represents the "make" of a device; e.g. Cisco or Dell. Each [device type](./devicetype.md) must be assigned to a manufacturer. ([Inventory items](./inventoryitem.md) and [platforms](./platform.md) may also be associated with manufacturers.)

## Fields

### Name

A unique human-friendly name.

### Slug

A unique URL-friendly identifier. (This value can be used for filtering.)
