---
title: Installing NetBox
sidebar_label: Installation
tags:
  - community
  - netbox
---

# Installing NetBox

This guide walks you through installing NetBox on a Linux server. For a faster path, see the [Docker guide](./docker).

## Prerequisites

| Component  | Minimum Version | Notes                          |
|------------|-----------------|--------------------------------|
| Python     | 3.10+           | 3.12 recommended               |
| PostgreSQL | 14+             | 15+ recommended                |
| Redis      | 6.0+            |                                |
| nginx/Apache | —             | Reverse proxy (recommended)    |

### System packages

```bash
# Debian / Ubuntu
sudo apt update && sudo apt install -y \
  python3 python3-pip python3-venv python3-dev \
  postgresql postgresql-contrib \
  redis-server \
  nginx git
```

## Database Setup

```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE netbox;
CREATE USER netbox WITH PASSWORD 'your-strong-password';
GRANT ALL PRIVILEGES ON DATABASE netbox TO netbox;
\q
```

## Install NetBox

```bash
# Clone the latest stable release
sudo mkdir -p /opt/netbox
cd /opt/netbox
sudo git clone -b main https://github.com/netbox-community/netbox.git .

# Create virtualenv and install dependencies
sudo python3 -m venv /opt/netbox/venv
source /opt/netbox/venv/bin/activate
pip install -r requirements.txt
```

## Configuration

Copy the example configuration and edit it:

```bash
cd /opt/netbox/netbox/netbox
cp configuration_example.py configuration.py
```

Set the required parameters in `configuration.py`:

```python
ALLOWED_HOSTS = ['netbox.example.com', 'localhost']

DATABASE = {
    'NAME': 'netbox',
    'USER': 'netbox',
    'PASSWORD': 'your-strong-password',
    'HOST': 'localhost',
    'PORT': '',
    'CONN_MAX_AGE': 300,
}

REDIS = {
    'tasks': { 'HOST': 'localhost', 'PORT': 6379, 'DATABASE': 0, 'SSL': False },
    'caching': { 'HOST': 'localhost', 'PORT': 6379, 'DATABASE': 1, 'SSL': False },
}

SECRET_KEY = 'your-very-secret-key-at-least-50-chars'
```

## Run Migrations & Create Superuser

```bash
cd /opt/netbox
source venv/bin/activate
python netbox/manage.py migrate
python netbox/manage.py createsuperuser
```

## Start Services

```bash
sudo systemctl enable netbox netbox-rq
sudo systemctl start  netbox netbox-rq
```

## Next Steps

- [First Steps](./first-steps) — creating your first objects
- [Configuration Reference](../configuration/overview) — full parameter list
