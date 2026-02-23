---
title: Discovery Agent Setup
sidebar_label: Agent Setup
tags:
  - community
  - enterprise
  - cloud
---

# Discovery Agent Setup

The Discovery Agent is a lightweight Python daemon that polls network devices and pushes data to NetBox via Diode.

## Architecture

A single agent can manage multiple **target groups** (sets of devices). For large environments, deploy multiple agents and partition targets by site or device type.

## Installation Methods

### pip

```bash
pip install netboxlabs-discovery-agent
```

### Docker

```bash
docker run -d \
  --name discovery-agent \
  -v /etc/discovery:/config:ro \
  -e NETBOX_TOKEN=your-token \
  ghcr.io/netbox-community/discovery-agent:latest
```

### Helm (Kubernetes)

```bash
helm repo add netboxlabs https://charts.netboxlabs.com
helm install discovery-agent netboxlabs/discovery-agent \
  --set netbox.url=https://netbox.example.com \
  --set netbox.token=your-token
```

## Configuration Reference

| Key | Type | Description |
|-----|------|-------------|
| `netbox.url` | string | NetBox base URL |
| `netbox.token` | string | API token |
| `targets[].name` | string | Target group name (for logging) |
| `targets[].driver` | string | NAPALM driver name |
| `targets[].hosts` | list | IPs, hostnames, or CIDR ranges |
| `targets[].credentials` | object | `username`, `password`, optional `ssh_key` |
| `schedule.interval` | int | Polling interval in seconds (default: `900`) |

## Drivers Supported

The agent uses NAPALM under the hood. Tested drivers:

- `cisco_ios` — Cisco IOS and IOS-XE
- `cisco_nxos` — Cisco NX-OS
- `juniper_junos` — Junos
- `arista_eos` — Arista EOS
- `panos` — Palo Alto PAN-OS
