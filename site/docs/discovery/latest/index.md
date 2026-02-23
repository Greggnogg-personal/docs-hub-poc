---
title: NetBox Discovery Documentation
sidebar_label: Overview
tags:
  - community
  - enterprise
  - cloud
---

# NetBox Discovery Documentation

NetBox Discovery automatically maps your network and populates NetBox with discovered infrastructure — reducing the manual effort of keeping your source of truth accurate.

## How It Works

```
Network devices / cloud APIs
           │
    ┌──────▼───────┐
    │  Discovery   │   ← polls, scans, imports
    │   Agent(s)   │
    └──────┬───────┘
           │  gRPC / HTTPS
    ┌──────▼───────┐
    │   Diode      │   ← event bus / dedup / normalization
    └──────┬───────┘
           │
    ┌──────▼───────┐
    │   NetBox     │   ← updated source of truth
    └──────────────┘
```

## Key Capabilities

- **Multi-vendor scanning** — Cisco, Juniper, Arista, and more via NAPALM/Nornir
- **Cloud imports** — AWS, Azure, GCP asset discovery
- **SNMP polling** — Layer 2/3 topology mapping
- **Change detection** — only syncs deltas to NetBox, not full re-imports
- **Reconciliation UI** — review and approve discovered changes before commit

## Quick Start

- [Quick Start Guide](./getting-started/quick-start) — discover your first devices in minutes
- [Agent Setup](./getting-started/agent) — deploy and configure the Discovery agent
