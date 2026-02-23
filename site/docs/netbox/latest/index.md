---
title: 'NetBox Community Documentation'
sidebar_label: Overview
tags:
  - community
  - netbox
---

# The Premier Network Source of Truth

NetBox is the leading solution for modeling and documenting modern networks. By combining the traditional disciplines of IP address management (IPAM) and datacenter infrastructure management (DCIM) with powerful APIs and extensions, NetBox provides the ideal "source of truth" to power network automation.

## What is NetBox?

Thousands of organizations worldwide put NetBox at the heart of their infrastructure. It provides:

- **IP Address Management (IPAM)** — prefixes, ranges, addresses, VRFs, and route targets
- **Datacenter Infrastructure Management (DCIM)** — racks, devices, cables, and power
- **Virtualization** — VMs, clusters, and hypervisors
- **Circuits** — providers, circuit types, and terminations
- **Overlays** — VLANs, L2VPNs, and VXLANs
- **Extensibility** — plugins, REST API, GraphQL, and webhooks

## Quick Navigation

- [Installation Guide](./getting-started/installation) — get NetBox running in minutes
- [Docker Setup](./getting-started/docker) — containerised deployment
- [Configuration Reference](./configuration/overview) — all configuration parameters
- [REST API](./features/ipam) — integrate NetBox with your toolchain

## Architecture

NetBox is a Django application backed by PostgreSQL, with optional Redis caching. It exposes a full REST API and a GraphQL endpoint, enabling deep automation integrations.

```
Browser / API clients
        │
   ┌────▼─────┐     ┌───────────┐
   │  NetBox  │────▶│ PostgreSQL│
   │ (Django) │     └───────────┘
   └────┬─────┘     ┌───────────┐
        └──────────▶│  Redis    │
                    └───────────┘
```

Ready to get started? Head to the [Installation Guide](./getting-started/installation).
