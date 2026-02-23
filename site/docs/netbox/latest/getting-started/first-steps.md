---
title: First Steps with NetBox
sidebar_label: First Steps
tags:
  - community
  - netbox
---

# First Steps with NetBox

After installing NetBox, follow this guide to create your first objects and explore the UI.

## Log In

Navigate to your NetBox URL and sign in with the superuser account you created during setup.

## Create a Site

All infrastructure in NetBox is anchored to **Sites**. Start by creating one.

1. Go to **Organization → Sites**
2. Click **+ Add**
3. Fill in:
   - **Name**: `Primary DC`
   - **Status**: Active
   - **Region**: _(optional, create one first)_
4. Click **Save**

## Add a Rack

1. Go to **DCIM → Racks**
2. Click **+ Add**
3. Select your site, set a **Name** and **Height** (e.g. 42U)
4. Click **Save**

## Add a Device

1. Go to **DCIM → Devices**
2. Click **+ Add**
3. Select your **Device Type** (create one if needed), **Site**, **Rack**, and **Position**
4. Click **Save**

## Assign an IP Address

1. Go to **IPAM → IP Addresses**
2. Click **+ Add**
3. Enter the address in CIDR notation (e.g. `10.0.0.1/24`)
4. Assign it to the device interface you created above
5. Click **Save**

## Explore the REST API

NetBox ships with a browsable REST API at `/api/`. You can also use the auto-generated OpenAPI schema:

```bash
curl -H "Authorization: Token <your-token>" \
     https://netbox.example.com/api/dcim/sites/ | jq
```

## Next Steps

- [Configuration Reference](../configuration/overview) — tune NetBox for your environment
- [IPAM Features](../features/ipam) — prefix hierarchies, VRFs, and more
- [DCIM Features](../features/dcim) — racks, cables, and power
