---
title: SSO & SAML
sidebar_label: SSO & SAML
tags:
  - enterprise
  - netbox
---

# SSO & SAML

NetBox Enterprise supports SAML 2.0 and OIDC identity providers for seamless single sign-on.

## Supported Providers

| Provider | Protocol | Notes |
|----------|----------|-------|
| Okta | SAML 2.0 / OIDC | Recommended |
| Azure Active Directory | SAML 2.0 / OIDC | |
| Google Workspace | OIDC | |
| Ping Identity | SAML 2.0 | |
| Any SAML 2.0 IdP | SAML 2.0 | Generic |

## Configuration (Okta example)

In your `configuration.py`:

```python
SOCIAL_AUTH_BACKEND = 'social_core.backends.saml.SAMLAuth'

SOCIAL_AUTH_SAML_SP_ENTITY_ID = 'https://netbox.example.com'
SOCIAL_AUTH_SAML_SP_PUBLIC_CERT = '...'
SOCIAL_AUTH_SAML_SP_PRIVATE_KEY = '...'

SOCIAL_AUTH_SAML_ENABLED_IDPS = {
    'okta': {
        'entity_id': 'https://your-okta-domain.okta.com/...',
        'url': 'https://your-okta-domain.okta.com/app/1234/sso/saml',
        'x509cert': '...',
        'attr_user_permanent_id': 'email',
        'attr_first_name': 'firstName',
        'attr_last_name': 'lastName',
        'attr_email': 'email',
    }
}
```

## Attribute Mapping

NetBox maps IdP attributes to user fields. At minimum, `email` must be provided. `firstName`/`lastName` are optional but recommended.

## JIT Provisioning

When a user logs in via SSO for the first time, NetBox automatically creates their account. Group/role assignments can be synced from IdP group attributes.
