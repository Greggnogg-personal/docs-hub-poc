---
title: Running NetBox with Docker
sidebar_label: Docker
tags:
  - community
  - netbox
---

# Running NetBox with Docker

The official [netbox-docker](https://github.com/netbox-community/netbox-docker) project provides a production-grade `docker-compose` setup.

## Quick Start

```bash
git clone -b release https://github.com/netbox-community/netbox-docker.git
cd netbox-docker
tee docker-compose.override.yml <<EOF
version: '3.4'
services:
  netbox:
    ports:
      - 8000:8080
EOF
docker compose pull
docker compose up -d
```

Navigate to `http://localhost:8000` — default credentials are **admin / admin**.

:::caution
Change the default password immediately in production.
:::

## Environment Variables

Key variables to override via `.env` or compose override:

| Variable             | Description                   | Default          |
|----------------------|-------------------------------|------------------|
| `SUPERUSER_PASSWORD` | Initial admin password        | `admin`          |
| `SECRET_KEY`         | Django secret key             | random on init   |
| `DB_PASSWORD`        | PostgreSQL password           | `netbox`         |
| `REDIS_PASSWORD`     | Redis auth password           | _(none)_         |
| `ALLOWED_HOSTS`      | Comma-separated allowed hosts | `*`              |

## Upgrading

```bash
docker compose pull
docker compose up -d
docker compose exec netbox python manage.py migrate
```
