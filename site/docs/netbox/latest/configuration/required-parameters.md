---
title: Required Configuration Parameters
sidebar_label: Required Parameters
tags:
  - community
  - netbox
---

# Required Configuration Parameters

These parameters **must** be set before NetBox will start.

## ALLOWED_HOSTS

A list of valid hostnames and IP addresses NetBox may be reached at.

```python
ALLOWED_HOSTS = ['netbox.example.com', '10.0.0.5', 'localhost']
```

## DATABASE

```python
DATABASE = {
    'ENGINE': 'django.db.backends.postgresql',
    'NAME': 'netbox',
    'USER': 'netbox',
    'PASSWORD': 'yourpassword',
    'HOST': 'localhost',
    'PORT': '',
    'CONN_MAX_AGE': 300,
}
```

## REDIS

Two separate Redis databases are required — one for task queuing (`rqworker`) and one for caching.

```python
REDIS = {
    'tasks': {
        'HOST': 'localhost', 'PORT': 6379, 'DATABASE': 0, 'SSL': False,
    },
    'caching': {
        'HOST': 'localhost', 'PORT': 6379, 'DATABASE': 1, 'SSL': False,
    },
}
```

## SECRET_KEY

A randomly generated string of at least 50 characters used for cryptographic signing.

```python
SECRET_KEY = 'r8eFHDm36YgSY4_EvmYKz7nWnN3Xt4TBmHLqXjhsBDvT2yvzq'
```

Generate one securely:

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(60))"
```
