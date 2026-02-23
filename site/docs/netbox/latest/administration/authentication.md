---
title: Authentication
sidebar_label: Authentication
tags:
  - community
  - netbox
---

# Authentication

NetBox supports local authentication and remote auth backends.

## Local Authentication

Users are created in **Admin → Users**. Passwords are hashed with PBKDF2-SHA256.

## LDAP / Active Directory

Install `django-auth-ldap` and configure in `configuration.py`:

```python
import ldap
from django_auth_ldap.config import LDAPSearch

AUTH_LDAP_SERVER_URI = 'ldaps://dc.example.com'
AUTH_LDAP_BIND_DN = 'cn=netbox,ou=service,dc=example,dc=com'
AUTH_LDAP_BIND_PASSWORD = 'secret'
AUTH_LDAP_USER_SEARCH = LDAPSearch(
    'ou=users,dc=example,dc=com',
    ldap.SCOPE_SUBTREE,
    '(uid=%(user)s)',
)
```

## SSO (Enterprise Only)

SAML 2.0 and OIDC SSO are available in NetBox Enterprise. See the [Enterprise SSO docs](/docs/enterprise/latest/features/sso).

## API Token Authentication

All REST API requests require a valid API token in the `Authorization: Token <token>` header. Tokens are created in **Profile → API Tokens**.

## Session Timeout

Configure `LOGIN_TIMEOUT` (in seconds) in `configuration.py`. Default is `None` (session persists until browser close).
