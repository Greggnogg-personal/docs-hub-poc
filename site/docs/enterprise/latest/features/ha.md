---
title: High Availability
sidebar_label: High Availability
tags:
  - enterprise
  - netbox
---

# High Availability

NetBox Enterprise supports an active/passive HA cluster for production deployments requiring maximum uptime.

## Architecture

```
              ┌──────────────┐
   clients ──▶│  Load Balancer│
              └──────┬───────┘
               ┌─────┴──────┐
         ┌─────▼─────┐ ┌────▼──────┐
         │  Primary  │ │  Standby  │
         │  NetBox   │ │  NetBox   │
         └─────┬─────┘ └────┬──────┘
               └──────┬─────┘
              ┌───────▼───────┐
              │  PostgreSQL   │
              │  (streaming   │
              │  replication) │
              └───────────────┘
```

## Failover

Failover is managed by the load balancer health checks. The standby node becomes active automatically if the primary fails a health check three times in 10 seconds.

## Setup

Refer to the [Installation Requirements](../installation/requirements) and the Ansible playbooks shipped with your Enterprise license for step-by-step HA deployment.
