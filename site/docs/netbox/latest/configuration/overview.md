---
title: Configuration Overview
sidebar_label: Overview
tags:
  - community
  - netbox
---

# Configuration Overview

NetBox is configured through `netbox/configuration.py`. This file is never tracked by the upstream git repository — it is your environment-specific configuration.

## Required Parameters

At minimum, you must set:

| Parameter      | Description                              |
|----------------|------------------------------------------|
| `ALLOWED_HOSTS` | Hostnames/IPs NetBox will respond to     |
| `DATABASE`      | PostgreSQL connection settings           |
| `REDIS`         | Redis connection settings (tasks/cache)  |
| `SECRET_KEY`    | 50+ character random secret              |

See [Required Parameters](./required-parameters) for full details.

## Optional Parameters

Optional settings include:

- `DEBUG` — enable/disable Django debug mode (never `True` in production)
- `TIME_ZONE` — default: `UTC`
- `LOGIN_REQUIRED` — require authentication to view any page
- `MEDIA_ROOT` — filesystem path for uploaded media
- `EMAIL` — outgoing SMTP settings

## Dynamic Configuration

Some settings can be changed at runtime through the **Admin → Configuration** UI or via the API, without restarting the service. These include:

- Maintenance mode
- Login banner text
- Pagination defaults
- Custom field defaults
