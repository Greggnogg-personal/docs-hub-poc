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
title: 'NetBox Enterprise: SAML Single Sign-On'
description: >-
  Configure SAML 2.0 authentication for NetBox Enterprise with any
  SAML-compliant identity provider
versions:
  cloud: v1.10
  enterprise: v1.10
source: localdocs
lastUpdatedAt: 1765492231000
canonical: /docs/enterprise/enterprise-features/nbe-saml/
---
# SAML Single Sign-On

Configure NetBox Enterprise to authenticate users via SAML 2.0, enabling integration with identity providers like Okta, Microsoft Entra ID, OneLogin, and others.

## Overview

SAML (Security Assertion Markup Language) is an XML-based standard for exchanging authentication and authorization data. NetBox acts as the service provider (SP) while your identity provider (IdP) authenticates users and issues SAML assertions.

User accounts are created automatically on first login. Permissions must be assigned manually or via group mapping.

### Before You Begin \{#prerequisites\}

**Requirements:**
- NetBox Enterprise v1.10 or later with admin console access
- SAML 2.0 compliant identity provider with administrative access
- HTTPS configured (required for production)
- OpenSSL for generating service provider certificates

**Network:**
- NetBox must be reachable by users (for redirect back from IdP)
- HTTPS required for production (HTTP only allowed for localhost testing)

## SAML Terminology \{#understanding-saml-authentication\}

| Term | Description |
|------|-------------|
| Service Provider (SP) | NetBox Enterprise - requests authentication from IdP |
| Identity Provider (IdP) | Authentication system (Okta, Entra ID, etc.) - authenticates users |
| SAML Assertion | XML document containing authentication statements, signed by IdP |
| ACS URL | Assertion Consumer Service - endpoint where IdP sends assertions: `https://<domain>/oauth/complete/saml/` |
| Entity ID | Unique identifier for SP or IdP (typically NetBox URL for SP) |

### Authentication Flow \{#authentication-flow\}

1. User attempts to access NetBox
2. NetBox redirects user to IdP with SAML request
3. User authenticates with IdP credentials
4. IdP generates and signs SAML assertion
5. Browser posts assertion to NetBox ACS URL
6. NetBox validates signature using IdP public certificate
7. NetBox extracts user attributes and creates/updates account
8. User is granted access

## Generate Service Provider Certificates \{#generating-service-provider-certificates\}

NetBox requires a public certificate and private key to identify itself to the IdP.

```bash
# Generate private key
openssl genpkey -algorithm RSA -out saml_private_key.pem -pkeyopt rsa_keygen_bits:2048

# Generate self-signed certificate (valid 365 days)
openssl req -new -x509 -key saml_private_key.pem -out saml_cert.pem -days 365
```

When prompted, provide organization information. Use NetBox domain for Common Name.

**Security:**
- Store private key securely (never commit to version control)
- Use 365-day validity periods
- Document expiration dates
- Rotate before expiration

**Certificate Format:** Certificates must be in PEM format with headers intact (`-----BEGIN CERTIFICATE-----` / `-----END CERTIFICATE-----`).

## Identity Provider Configuration \{#identity-provider-configuration\}

Configure your IdP to recognize NetBox as a service provider.

### Required Information for IdP \{#required-information-for-idp\}

Provide these values to your identity provider:

```
ACS URL: https://<your-netbox-domain>/oauth/complete/saml/
SP Entity ID: https://<your-netbox-domain>
SP Certificate: <contents of saml_cert.pem>
```

### User Attribute Mapping \{#configuring-user-attributes\}

Configure your IdP to send these attributes in SAML assertions:

| SAML Attribute | IdP Property | Description |
|----------------|--------------|-------------|
| `email` | Email address | User email (used as username) |
| `first_name` | First name | User first name |
| `last_name` | Last name | User last name |
| `groups` | Group memberships | List of groups (for group mapping) |

**Provider Examples:**

| Provider | How to Configure |
|----------|------------------|
| **Okta** | **Applications > [App] > SAML Settings > Attribute Statements**<br/>Add: `email=user.email`, `first_name=user.firstName`, `last_name=user.lastName`<br/>**Group Attribute Statement:** `groups` with filter `Matches regex: .*` |
| **Entra ID** | **Enterprise apps > [App] > Single sign-on > Attributes & Claims**<br/>Add: `email=user.mail`, `first_name=user.givenname`, `last_name=user.surname`, `groups=user.groups` |
| **OneLogin** | **Applications > [App] > Parameters**<br/>Add: `email=Email`, `first_name=First Name`, `last_name=Last Name`, `groups=User Roles` |

### Collect IdP Information \{#collecting-idp-information\}

After configuring your IdP application, collect:

**IdP Entity ID:** Unique identifier for your identity provider (from metadata)

**IdP SSO URL:** URL where NetBox sends authentication requests (Single Sign-On URL)

**IdP x509 Certificate:** Public certificate for verifying signatures. Download from IdP or extract from metadata:

```bash
curl -o metadata.xml https://your-idp.com/metadata
grep -oP '(?<=<X509Certificate>).*?(?=</X509Certificate>)' metadata.xml
```

Certificate should be a single line of base64 data without headers.

## NetBox Configuration \{#netbox-enterprise-configuration\}

Access admin console at `https://<cluster-host>:30000/` and navigate to **Config > Show Advanced Settings > NetBox Python Configuration Overrides**.

### Add SAML Configuration \{#adding-saml-configuration\}

```python
# Enable remote authentication
REMOTE_AUTH_ENABLED = True
REMOTE_AUTH_AUTO_CREATE_USER = True
REMOTE_AUTH_BACKEND = 'social_core.backends.saml.SAMLAuth'

# Force HTTPS for OAuth redirects (set False only for localhost testing)
SOCIAL_AUTH_REDIRECT_IS_HTTPS = True

# Service Provider configuration
SOCIAL_AUTH_SAML_SP_ENTITY_ID = "https://<your-netbox-domain>"
SOCIAL_AUTH_SAML_SP_PUBLIC_CERT = """-----BEGIN CERTIFICATE-----
<your-certificate-data-here>
-----END CERTIFICATE-----"""
SOCIAL_AUTH_SAML_SP_PRIVATE_KEY = """-----BEGIN PRIVATE KEY-----
<your-private-key-data-here>
-----END PRIVATE KEY-----"""

# Organization information (displayed in SAML metadata)
SOCIAL_AUTH_SAML_ORG_INFO = {
    "en-US": {
        "name": "<your-organization-name>",
        "displayname": "<your-organization-display-name>",
        "url": "<your-organization-website>",
    }
}

# Technical contact
SOCIAL_AUTH_SAML_TECHNICAL_CONTACT = {
    "givenName": "Technical Support",
    "emailAddress": "<technical-contact-email>"
}

# Support contact
SOCIAL_AUTH_SAML_SUPPORT_CONTACT = {
    "givenName": "Support Team",
    "emailAddress": "<support-contact-email>"
}

# Identity Provider configuration
SOCIAL_AUTH_SAML_ENABLED_IDPS = {
    "default": {
        "entity_id": "<idp-entity-id>",
        "url": "<idp-sso-url>",
        "x509cert": "<idp-certificate-without-headers>",
        "attr_user_permanent_id": "email",
        "attr_first_name": "first_name",
        "attr_last_name": "last_name",
        "attr_username": "email",
        "attr_email": "email",
    }
}
```

### Configuration Parameters \{#configuration-parameters\}

**Certificates:** Use triple-quoted strings to preserve newlines. Include PEM headers for SP certificate and key. IdP certificate should be base64 data only (no headers).

**Entity IDs:** SP Entity ID must match the value configured in IdP exactly (including/excluding trailing slash).

**Multiple IdPs:** Add additional entries to `SOCIAL_AUTH_SAML_ENABLED_IDPS` dictionary with different keys.

### Deploy \{#deploying-configuration\}

1. Click **Save config**
2. Click **Go to updated version**
3. Click **Deploy**
4. Wait for Ready state

Configuration changes require application restart. Existing sessions remain active.

## Testing \{#testing-authentication\}

1. Log out of NetBox
2. Navigate to login page
3. Click SAML authentication link
4. Authenticate with IdP credentials
5. Verify redirect to NetBox and successful login
6. Navigate to **Admin > Users** to verify account creation

**Verify user details:**
- Username matches email address
- First and last names populated
- Email matches IdP

## SAML Metadata \{#saml-metadata\}

NetBox publishes SAML metadata at:
```
https://<your-netbox-domain>/oauth/metadata/saml/
```

Some identity providers can import this URL for automatic configuration. Metadata includes SP Entity ID, ACS URL, public certificate, and organization information. Attribute mappings must still be configured manually.

## Assigning Permissions \{#assigning-permissions\}

Users authenticated via SAML have no permissions by default.

**Manual assignment:**
1. Navigate to **Admin > Users**
2. Locate SAML user
3. Assign groups or individual permissions
4. Set **Staff status** for admin interface access
5. Set **Superuser status** for full system access

**Automated assignment:** Configure SAML group mapping. See [SAML Group Mapping](nbe-saml-group-map.md) for details.

## Troubleshooting \{#troubleshooting\}

:::info[kubectl Access]
Commands below require [cluster shell access](nbe-troubleshooting.md#command-line-access).

:::
### SAML Response Validation Failed \{#saml-response-errors\}

**Error:** SAML response validation failed / signature verification errors

**Resolution:**

1. Verify IdP certificate: Remove headers and newlines (single line base64), check expiration, download fresh from metadata
2. Verify ACS URL matches exactly: `https://<domain>/oauth/complete/saml/` (including trailing slash)
3. Check certificate hasn't expired

### Attribute Mapping Errors \{#attribute-mapping-errors\}

**Symptoms:** User logs in but username empty, first/last name missing

**Resolution:**

1. Check attribute names in IdP configuration (case-sensitive)
2. Verify test user has values for all required attributes (`email`, `first_name`, `last_name`)
3. Enable SAML debugging and inspect actual attribute names sent by IdP

### Certificate Format Errors \{#certificate-format-errors\}

**Error:** Could not deserialize key data / PEM routines: no start line

**Resolution:**

SP certificate and key must include headers and use triple-quoted strings:
```python
SOCIAL_AUTH_SAML_SP_PUBLIC_CERT = """-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAKL0UG...
-----END CERTIFICATE-----"""
```

Verify certificates:
```bash
openssl x509 -in saml_cert.pem -text -noout
openssl rsa -in saml_private_key.pem -check
```

### Entity ID Mismatch \{#entity-id-mismatch\}

**Error:** The response was received at a URL that is not configured

**Resolution:**

1. Verify SP Entity ID matches in both NetBox configuration and IdP
2. Common issues: trailing slash, HTTP vs HTTPS, subdomain differences
3. Update both to use identical values

### IdP SSO URL Errors \{#idp-sso-url-errors\}

**Symptoms:** Timeout or connection refused when attempting login

**Resolution:**

1. Verify IdP SSO URL is correct (check `url` in `SOCIAL_AUTH_SAML_ENABLED_IDPS`)
2. Test URL accessibility:
   ```bash
   curl -I <idp-sso-url>
   ```
3. Check for typos, incorrect protocol, or wrong domain

### User Not Logged In After Authentication \{#user-not-logged-in-after-authentication\}

**Symptoms:** Redirected to NetBox but not logged in, no error message

**Resolution:**

1. Check NetBox logs:
   ```bash
   kubectl logs <netbox-pod> -n kotsadm | grep -i saml
   ```
2. Verify `email` attribute present in SAML assertion
3. Confirm `REMOTE_AUTH_ENABLED` and `REMOTE_AUTH_AUTO_CREATE_USER` set to `True`

### HTTPS Redirect Issues \{#https-redirect-issues\}

**Symptoms:** Redirected to HTTP instead of HTTPS, login loop

**Resolution:**

1. Set `SOCIAL_AUTH_REDIRECT_IS_HTTPS: True` for production HTTPS
2. Verify reverse proxy forwards correct protocol headers
3. Always access NetBox via HTTPS URL

## Security Considerations \{#security-considerations\}

**HTTPS Requirement:** SAML assertions contain sensitive data. Use HTTPS in production (HTTP only for localhost testing). Ensure valid TLS certificates and configure HSTS headers.

**Certificate Management:**
- SP certificates: Encrypted in NetBox configuration. Rotate before expiration. Document expiration dates.
- IdP certificates: Monitor expiration. Update NetBox configuration when IdP rotates certificates. Test authentication after updates.

**Assertion Security:** SAML assertions are digitally signed. Never disable signature verification. Always use current IdP certificates.

**User Provisioning:** Accounts created automatically on first login cannot be deleted via IdP. Implement automated deprovisioning or audit accounts regularly. Disable unused accounts manually.

**Audit Logging:** Monitor authentication events:
```bash
kubectl logs <netbox-pod> -n kotsadm | grep authentication
```

## Related Documentation \{#related-documentation\}

- [SAML Group Mapping](nbe-saml-group-map.md)
- [Microsoft Entra ID Single Sign-On](nbe-azure-sso.md)
- [OpenID Connect (OIDC) SSO](nbe-oidc-sso.md)
- [LDAP Authentication](nbe-ldap.md)
- [SAML 2.0 Specification](https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)
- [Python Social Auth SAML Backend](https://python-social-auth.readthedocs.io/en/latest/backends/saml.html)
