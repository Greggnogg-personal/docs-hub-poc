---
tags:
  - api
  - authentication
  - cloud
  - enterprise
  - netbox
  - sso
category: enterprise-documentation
audience: administrators
complexity: intermediate
title: 'NetBox Enterprise: OpenID Connect (OIDC) Single Sign-On'
description: >-
  Configure OpenID Connect authentication for NetBox Enterprise with Microsoft
  Entra ID, Okta, or generic OIDC providers
versions:
  cloud: v1.10
  enterprise: v1.10
source: localdocs
lastUpdatedAt: 1765462686000
canonical: /docs/enterprise/enterprise-features/nbe-oidc-sso/
---
# OpenID Connect (OIDC) Single Sign-On

Configure NetBox Enterprise to authenticate users via OpenID Connect, an identity layer built on OAuth 2.0.

## Overview

NetBox Enterprise supports OIDC integration through Python Social Auth, enabling authentication with:
- Microsoft Entra ID (Azure AD)
- Okta
- Google Workspace, Auth0, Keycloak, and other OIDC-compliant providers

User accounts are created automatically on first login. Permissions must be assigned manually or via group mapping.

### Before You Begin \{#prerequisites\}

**Requirements:**
- NetBox Enterprise v1.10 or later with admin console access
- OIDC-compliant identity provider with application registration capability
- HTTPS configured (required for production)
- Client ID and client secret from your identity provider
- Redirect URI configured in identity provider: `https://<your-domain>/oauth/complete/<backend-name>/`

**Network:**
- NetBox must reach identity provider OAuth endpoints
- Users must reach both NetBox and identity provider

## Supported Backends \{#understanding-oidc-backends\}

| Provider | Backend Name | Redirect URI Suffix |
|----------|--------------|---------------------|
| Microsoft Entra ID | `azuread-oauth2` | `/oauth/complete/azuread-oauth2/` |
| Okta | `okta-openidconnect` | `/oauth/complete/okta-openidconnect/` |
| Generic OIDC | `oidc` | `/oauth/complete/oidc/` |

## Identity Provider Setup \{#identity-provider-configuration\}

### Microsoft Entra ID \{#microsoft-entra-id\}

1. Navigate to **Entra admin center > App registrations > New registration**
2. Configure application:
   - Name: NetBox Enterprise
   - Account type: Single tenant
   - Redirect URI: `https://<your-domain>/oauth/complete/azuread-oauth2/`
3. Copy **Application (client) ID** and **Directory (tenant) ID** from Overview
4. Navigate to **Certificates & secrets > New client secret**
5. Copy the secret **Value** (not Secret ID)

**For group mapping:** Configure optional claims under **Token configuration** to include groups claim with role claims enabled.

### Okta \{#okta\}

1. Navigate to **Applications > Create App Integration**
2. Select **OIDC** sign-in method and **Web Application** type
3. Configure:
   - Grant type: Authorization Code
   - Sign-in redirect URI: `https://<your-domain>/oauth/complete/okta-openidconnect/`
4. Copy **Client ID** and **Client secret**
5. Note your Okta domain (e.g., `your-org.okta.com`)

**API URL:** Use `https://<okta-domain>/oauth2/` for default authorization server or `https://<okta-domain>/oauth2/<auth-server-id>/` for custom servers.

### Generic OIDC Provider \{#generic-oidc-provider\}

1. Create OAuth 2.0/OIDC application in provider console
2. Configure:
   - Application type: Web application
   - Redirect URI: `https://<your-domain>/oauth/complete/oidc/`
   - Grant type: Authorization Code
3. Copy **Client ID** and **Client Secret**
4. Locate OpenID configuration endpoint (usually `https://<provider-domain>/.well-known/openid-configuration`)

Verify endpoint accessibility:
```bash
curl https://<provider-domain>/.well-known/openid-configuration
```

## NetBox Configuration \{#netbox-enterprise-configuration\}

### Add Configuration \{#accessing-configuration\}

Access admin console at `https://<cluster-host>:30000/` and navigate to **Config > Show Advanced Settings > NetBox Python Configuration Overrides**.

**Microsoft Entra ID:**
```python
REMOTE_AUTH_BACKEND = 'social_core.backends.azuread.AzureADOAuth2'
SOCIAL_AUTH_AZUREAD_OAUTH2_KEY = '<application-id>'
SOCIAL_AUTH_AZUREAD_OAUTH2_SECRET = '<client-secret>'
SOCIAL_AUTH_AZUREAD_OAUTH2_TENANT_ID = '<tenant-id>'
```

**Okta:**
```python
REMOTE_AUTH_BACKEND = 'social_core.backends.okta_openidconnect.OktaOpenIdConnect'
SOCIAL_AUTH_OKTA_OPENIDCONNECT_KEY = '<client-id>'
SOCIAL_AUTH_OKTA_OPENIDCONNECT_SECRET = '<client-secret>'
SOCIAL_AUTH_OKTA_OPENIDCONNECT_API_URL = 'https://<okta-domain>/oauth2/'
```

**Generic OIDC:**
```python
REMOTE_AUTH_BACKEND = 'social_core.backends.open_id_connect.OpenIdConnectAuth'
SOCIAL_AUTH_OIDC_KEY = '<client-id>'
SOCIAL_AUTH_OIDC_SECRET = '<client-secret>'
SOCIAL_AUTH_OIDC_OIDC_ENDPOINT = 'https://<provider-domain>/.well-known/openid-configuration'
```

### Deploy \{#deploying-configuration\}

1. Click **Save config**
2. Click **Go to updated version**
3. Click **Deploy**
4. Wait for Ready state

Configuration changes require application restart. Existing sessions remain active.

## Testing \{#testing-authentication\}

1. Log out of NetBox
2. Click **Log In** and select OIDC authentication option
3. Authenticate with provider credentials
4. Verify redirect to NetBox and successful login
5. Navigate to **Admin > Users** to verify account creation

## Group Mapping \{#group-mapping-and-permissions\}

Users created via OIDC have no permissions by default. Configure group mapping to assign permissions automatically.

### Microsoft Entra ID Group Mapping \{#microsoft-entra-id-group-mapping\}

Add to configuration:

```python
# Required for group mapping
SOCIAL_AUTH_AZUREAD_OAUTH2_RESOURCE = 'https://graph.microsoft.com/'

# Configure authentication pipeline
SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.user.get_username',
    'social_core.pipeline.social_auth.associate_by_email',
    'social_core.pipeline.user.create_user',
    'social_core.pipeline.social_auth.associate_user',
    'netbox.authentication.user_default_groups_handler',
    'social_core.pipeline.social_auth.load_extra_data',
    'social_core.pipeline.user.user_details',
    'nbc_auth_extensions.azure_authentication.azuread_map_groups',
)

# Group mapping configuration
SOCIAL_AUTH_PIPELINE_CONFIG = {
    'AZUREAD_USER_FLAGS_BY_GROUP': {
        'is_superuser': ['<azure-group-id-for-superusers>'],
        'is_staff': ['<azure-group-id-for-staff>']
    },
    'AZUREAD_GROUP_MAP': {
        '<azure-group-id>': '<netbox-group-name>',
    }
}
```

**Requirements:**
- Configure optional claims in Azure app registration to include groups
- Use Azure group object IDs (not display names)
- Create NetBox groups before configuring mapping
- Users receive permissions from mapped NetBox groups

**Okta and Generic OIDC:** Contact NetBox Labs support for provider-specific group mapping configuration.

## Troubleshooting \{#troubleshooting\}

:::info[kubectl Access]
Commands below require [cluster shell access](nbe-troubleshooting.md#command-line-access).

:::
### Redirect URI Mismatch \{#redirect-uri-mismatch\}

**Error:** redirect_uri_mismatch

**Cause:** Redirect URI in identity provider does not match NetBox format exactly.

**Resolution:** Verify redirect URI matches `https://<domain>/oauth/complete/<backend-name>/` with trailing slash. Common issues: missing slash, HTTP instead of HTTPS, incorrect backend name.

### Authentication Succeeds But Not Logged In \{#not-logged-in-after-authentication\}

**Symptoms:** Redirected to NetBox after provider authentication but not logged in.

**Resolution:**

1. Verify `REMOTE_AUTH_BACKEND` matches provider
2. Check client ID and secret are correct
3. For generic OIDC, verify configuration endpoint is accessible from NetBox
4. Check NetBox logs:

   ```bash
   kubectl logs <netbox-pod> -n kotsadm | grep -i oauth
   ```

### Groups Not Syncing \{#groups-not-syncing\}

**Symptoms:** User logs in but groups in NetBox do not match provider groups.

**Resolution:**

1. Verify identity provider sends group information:
   - Microsoft Entra ID: Configure optional claims for groups
   - Okta: Add groups scope to application
   - Generic OIDC: Verify provider supports group claims
2. Check authentication pipeline includes group processing steps
3. Verify group format matches expected format (IDs vs names)
4. Check logs:
   ```bash
   kubectl logs <netbox-pod> -n kotsadm | grep social_auth
   ```

### SSL Certificate Verification Fails \{#ssl-certificate-verification-fails\}

**Error:** SSL: CERTIFICATE_VERIFY_FAILED

**Development workaround:**
```python
SOCIAL_AUTH_VERIFY_SSL = False
```

**Production:** Install provider SSL certificate in NetBox certificate store. Do not disable SSL verification.

### Token Endpoint Not Reachable \{#token-endpoint-not-reachable\}

**Symptoms:** Connection timeout during authentication.

**Resolution:**

1. Verify network connectivity from NetBox pod:
   ```bash
   kubectl exec <netbox-pod> -n kotsadm -- curl https://<provider-domain>/.well-known/openid-configuration
   ```
2. Check firewall rules allow outbound HTTPS
3. Verify DNS resolution

### Users Cannot Access NetBox After Login \{#users-cannot-access-netbox-after-login\}

**Cause:** OIDC creates accounts but does not grant permissions automatically.

**Resolution:**

1. Navigate to **Admin > Users**
2. Locate OIDC user
3. Assign groups or individual permissions
4. Set **Staff status** for admin access
5. Set **Superuser status** for full system access

For automatic permission assignment, configure group mapping.

## Security Considerations \{#security-considerations\}

**HTTPS Requirement:** Use HTTPS for both NetBox and identity provider in production. OAuth 2.0 security depends on encrypted transport.

**Client Secret Storage:** Secrets are encrypted at rest in Kubernetes. Rotate regularly:
1. Generate new secret in identity provider
2. Update NetBox configuration
3. Deploy changes
4. Revoke old secret after verification

**Token Expiration:** OIDC tokens expire and are not automatically refreshed. Users must re-authenticate when sessions expire. Configure session timeout:
```python
SESSION_COOKIE_AGE = 3600  # 1 hour for high-security
SESSION_COOKIE_AGE = 86400  # 24 hours for standard
```

**Audit Logging:** Monitor authentication logs:
```bash
kubectl logs <netbox-pod> -n kotsadm | grep authentication
```

## Related Documentation \{#additional-resources\}

- [Azure Group Mapping](nbe-azure-group-mapping.md)
- [SAML Single Sign-On](nbe-saml.md)
- [LDAP Authentication](nbe-ldap.md)
- [Python Social Auth Documentation](https://python-social-auth.readthedocs.io/)
