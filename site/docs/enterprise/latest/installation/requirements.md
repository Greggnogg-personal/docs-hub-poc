---
title: Enterprise Installation Requirements
sidebar_label: Requirements
tags:
  - enterprise
  - netbox
---

# Enterprise Installation Requirements

## Minimum Hardware (Single Node)

| Component | Minimum     | Recommended      |
|-----------|-------------|------------------|
| CPU       | 4 vCPU      | 8 vCPU           |
| RAM       | 8 GB        | 16 GB            |
| Disk      | 50 GB SSD   | 200 GB NVMe SSD  |
| Network   | 1 Gbps      | 10 Gbps          |

## HA Cluster

For HA deployments, provision **two** application nodes with the specs above, plus a separate PostgreSQL primary/replica pair (4 vCPU / 8 GB RAM each).

## Software Prerequisites

| Package    | Version  |
|------------|----------|
| RHEL / Ubuntu LTS | 8.x / 22.04+ |
| Python     | 3.10+    |
| PostgreSQL | 14+      |
| Redis      | 6.0+     |
| Docker / Podman | 20.10+ (optional) |

## Networking

- Outbound HTTPS (443) to `updates.netboxlabs.com` for license validation
- Internal TCP/5432 between app nodes and PostgreSQL
- Internal TCP/6379 between app nodes and Redis

## Licenses

Enterprise requires a valid license key issued by NetBox Labs. Contact [sales@netboxlabs.com](mailto:sales@netboxlabs.com).
