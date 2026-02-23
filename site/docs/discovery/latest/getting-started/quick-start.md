---
title: Discovery Quick Start
sidebar_label: Quick Start
tags:
  - community
  - enterprise
  - cloud
---

# Discovery Quick Start

Get Discovery scanning your network in under 10 minutes.

## Prerequisites

- A running NetBox instance (Community, Enterprise, or Cloud)
- A NetBox API token with write access
- Python 3.10+ on the agent host
- Network access from the agent to target devices

## Install the Agent

```bash
pip install netboxlabs-discovery-agent
```

## Configure

Create `~/.config/discovery/config.yaml`:

```yaml
netbox:
  url: https://netbox.example.com
  token: your-api-token

targets:
  - name: core-switches
    driver: cisco_ios
    hosts:
      - 10.0.1.1
      - 10.0.1.2
    credentials:
      username: admin
      password: ${SWITCH_PASSWORD}   # from env

  - name: spine-layer
    driver: arista_eos
    hosts:
      - 10.0.2.0/30
    credentials:
      username: admin
      password: ${ARISTA_PASSWORD}
```

## Run

```bash
discovery-agent run --config ~/.config/discovery/config.yaml
```

The agent outputs a summary of objects created or updated in NetBox.

## Schedule

For continuous discovery, run the agent as a cron job or systemd timer:

```
# /etc/systemd/system/discovery.timer
[Unit]
Description=NetBox Discovery — run every 15 minutes

[Timer]
OnBootSec=2min
OnUnitActiveSec=15min

[Install]
WantedBy=timers.target
```

## Next Steps

- [Agent Setup](./agent) — advanced agent configuration and multi-site deployment
