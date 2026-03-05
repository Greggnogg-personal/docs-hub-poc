---
tags:
  - authentication
  - cloud
  - enterprise
  - netbox
  - sso
category: enterprise-documentation
audience: administrators
complexity: intermediate
title: OpenID Connect (OIDC) Single Sign-On (v1.12)
description: >-
  Configure OpenID Connect authentication for NetBox Enterprise with Microsoft
  Entra ID, Okta, or generic OIDC providers
versions:
  cloud: v1.10
  enterprise: v1.10
source: localdocs
lastUpdatedAt: 1764177275000
canonical: /docs/v1.12/enterprise/enterprise-features/nbe-oidc-sso/
---
# OpenID Connect (OIDC) Single Sign-On

Configure NetBox Enterprise to authenticate users via OpenID Connect (OIDC), an identity layer built on top of OAuth 2.0. OIDC enables integration with identity providers like Microsoft Entra ID, Okta, Google Workspace, and other standards-compliant providers.

## Prerequisites

Before configuring OIDC authentication, ensure the following requirements are met:

**Identity Provider Requirements:**
- OIDC-compliant identity provider with application registration capability
- Client ID and client secret for NetBox Enterprise
- OpenID configuration endpoint (`.well-known/openid-configuration`)
- Ability to configure redirect URIs

**NetBox Enterprise Requirements:**
- NetBox Enterprise v1.10 or later
- Admin console access
- HTTPS configured for production deployments
- Redirect URI: `https://<your-netbox-domain>/oauth/complete/<backend-name>/`

**Network Requirements:**
- NetBox Enterprise must reach the identity provider's OAuth endpoints
- Users must reach both NetBox and the identity provider

## Understanding OIDC Backends

NetBox Enterprise supports multiple OIDC backends through the Python Social Auth library. Choose the backend based on your identity provider:

| Provider | Backend Name | Use Case |
|----------|--------------|----------|
| Microsoft Entra ID | `azuread-oauth2` | Organizations using Microsoft Entra ID/Azure AD with OAuth 2.0 |
| Okta | `okta-openidconnect` | Organizations using Okta as identity provider |
| Generic OIDC | `open-id-connect` | Any OIDC-compliant provider not listed above |

The backend name appears in the redirect URI and determines which authentication flow NetBox uses.

## Identity Provider Configuration

### Microsoft Entra ID

1. Navigate to the Microsoft Entra admin center
2. Select **Applications > App registrations > New registration**
3. Configure the application:
   - **Name**: NetBox Enterprise
   - **Supported account types**: Accounts in this organizational directory only (single tenant)
   - **Redirect URI**:
     - Platform: Web
     - URI: `https://<your-netbox-domain>/oauth/complete/azuread-oauth2/`
4. Note the **Application (client) ID** from the Overview page
5. Note the **Directory (tenant) ID** from the Overview page
6. Navigate to **Certificates & secrets > Client secrets > New client secret**
7. Add a description and select an expiration period
8. Copy the client secret **Value** (not the Secret ID)

**Token Configuration:**

For group-based access control, configure optional claims:

1. Navigate to **Token configuration > Add optional claim**
2. Select **ID** token type
3. Add the `groups` claim
4. Enable **Emit groups as role claims**

### Okta

1. Sign in to your Okta admin console
2. Navigate to **Applications > Applications > Create App Integration**
3. Select **OIDC - OpenID Connect** as the sign-in method
4. Select **Web Application** as the application type
5. Configure the application:
   - **App integration name**: NetBox Enterprise
   - **Grant type**: Authorization Code
   - **Sign-in redirect URIs**: `https://<your-netbox-domain>/oauth/complete/okta-openidconnect/`
   - **Sign-out redirect URIs**: `https://<your-netbox-domain>/` (optional)
   - **Controlled access**: Configure based on your requirements
6. Save and note the **Client ID**
7. Note the **Client secret** from the Client Credentials section
8. Note your **Okta domain** (e.g., `your-org.okta.com`)

**API URL Configuration:**

The Okta OIDC backend requires an API URL pointing to your authorization server:
- Default authorization server: `https://<okta-domain>/oauth2/`
- Custom authorization server: `https://<okta-domain>/oauth2/<auth-server-id>/`

### Generic OIDC Provider

For providers not specifically supported (Google Workspace, Auth0, Keycloak, etc.):

1. Create an OAuth 2.0 / OIDC application in your provider's console
2. Configure the application:
   - **Application type**: Web application
   - **Redirect URI**: `https://<your-netbox-domain>/oauth/complete/oidc/`
   - **Grant type**: Authorization Code
3. Note the **Client ID**
4. Note the **Client Secret**
5. Locate the **OpenID configuration endpoint**:
   - Usually: `https://<provider-domain>/.well-known/openid-configuration`
   - This endpoint must be accessible from NetBox Enterprise

**Verifying the Configuration Endpoint:**

Test the endpoint returns valid JSON:

```shell
curl https://<provider-domain>/.well-known/openid-configuration
```

The response should include `authorization_endpoint`, `token_endpoint`, and `userinfo_endpoint`.

## NetBox Enterprise Configuration

Configure OIDC authentication through the NetBox Enterprise admin console.

### Accessing Configuration

1. Access the admin console at `https://<your-cluster-host-or-ip>:30000/`
2. Navigate to the **Config** tab
3. Enable **Show Advanced Settings**
4. Scroll to **NetBox Python Configuration Overrides**

### Configuration Format

Add Python configuration as key-value pairs. Each line defines a configuration variable.

**Microsoft Entra ID Configuration:**

```python
REMOTE_AUTH_BACKEND = 'social_core.backends.azuread.AzureADOAuth2'
SOCIAL_AUTH_AZUREAD_OAUTH2_KEY = '<application-id>'
SOCIAL_AUTH_AZUREAD_OAUTH2_SECRET = '<client-secret>'
SOCIAL_AUTH_AZUREAD_OAUTH2_TENANT_ID = '<tenant-id>'
```

**Okta Configuration:**

```python
REMOTE_AUTH_BACKEND = 'social_core.backends.okta_openidconnect.OktaOpenIdConnect'
SOCIAL_AUTH_OKTA_OPENIDCONNECT_KEY = '<client-id>'
SOCIAL_AUTH_OKTA_OPENIDCONNECT_SECRET = '<client-secret>'
SOCIAL_AUTH_OKTA_OPENIDCONNECT_API_URL = 'https://<okta-domain>/oauth2/'
```

**Generic OIDC Configuration:**

```python
REMOTE_AUTH_BACKEND = 'social_core.backends.open_id_connect.OpenIdConnectAuth'
SOCIAL_AUTH_OIDC_KEY = '<client-id>'
SOCIAL_AUTH_OIDC_SECRET = '<client-secret>'
SOCIAL_AUTH_OIDC_OIDC_ENDPOINT = 'https://<provider-domain>/.well-known/openid-configuration'
```

### Deploying Configuration

After adding configuration:

1. Scroll to the bottom of the Config page
2. Click **Save config**
3. Click **Go to updated version** when prompted
4. Click **Deploy** to apply the changes
5. Wait for NetBox Enterprise to reach **Ready** state

Configuration changes require application restart. Existing user sessions remain active.

## Testing Authentication

### Initial Login Test

1. Open NetBox Enterprise in a browser
2. Log out if currently authenticated
3. Click **Log In** at the top right
4. Verify an OIDC authentication option appears (provider name will vary)
5. Click the OIDC authentication link
6. You will be redirected to your identity provider
7. Authenticate with your provider credentials
8. You may be prompted to grant NetBox access to your profile
9. After successful authentication, you will be redirected to NetBox

### Verifying User Creation

After first login:

1. Click your username at the top right
2. Select **Profile** from the dropdown
3. Verify your user details match your identity provider account
4. Navigate to **Admin > Users** (requires superuser access)
5. Locate your user account in the user list
6. Verify the user was created with correct username and email

Users authenticate via OIDC but are stored locally in NetBox. Permissions and group memberships are managed within NetBox after initial creation.

### Testing Group Membership

If your identity provider sends group information:

1. Configure group mapping (see [Group Mapping and Permissions](#group-mapping-and-permissions))
2. Log in via OIDC
3. Navigate to **Admin > Users**
4. View your user account
5. Verify **Groups** section shows groups from your identity provider

## Group Mapping and Permissions

After OIDC authentication succeeds, users are created in NetBox but have no permissions by default. You must configure group mapping to automatically assign permissions based on identity provider groups.

### Microsoft Entra ID Group Mapping

For detailed Microsoft Entra ID group mapping configuration, see [Azure Group Mapping](nbe-azure-group-mapping.md).

**Configuration overview:**

Group mapping for Microsoft Entra ID requires additional configuration in the admin console using the `SOCIAL_AUTH_PIPELINE_CONFIG` parameter:

```python
REMOTE_AUTH_BACKEND = 'social_core.backends.azuread.AzureADOAuth2'
SOCIAL_AUTH_AZUREAD_OAUTH2_KEY = '<application-id>'
SOCIAL_AUTH_AZUREAD_OAUTH2_SECRET = '<client-secret>'
SOCIAL_AUTH_AZUREAD_OAUTH2_TENANT_ID = '<tenant-id>'

# Required for group mapping
SOCIAL_AUTH_AZUREAD_OAUTH2_RESOURCE = 'https://graph.microsoft.com/'

# Configure authentication pipeline with group mapping
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
        '<another-azure-group-id>': '<another-netbox-group-name>'
    }
}
```

**How it works:**
1. User authenticates via Azure AD
2. NetBox retrieves user's Azure AD group memberships
3. Groups listed in `AZUREAD_USER_FLAGS_BY_GROUP` grant superuser or staff status
4. Groups listed in `AZUREAD_GROUP_MAP` add user to corresponding NetBox groups
5. NetBox groups must already exist before mapping

**Prerequisites for Azure AD group mapping:**
- Configure optional claims in Azure AD app registration to include groups
- Azure AD groups must use object IDs (not display names) in configuration
- NetBox groups must be created manually before mapping

### Okta Group Mapping

Okta group mapping follows a similar pattern but is not currently documented. Contact NetBox Labs support for Okta-specific group mapping configuration.

### Generic OIDC Group Mapping

Generic OIDC provider group mapping depends on the provider's group claim format. Contact NetBox Labs support for provider-specific configuration guidance.

### Manual Permission Assignment

Without group mapping, you must manually assign permissions after users log in:

1. User logs in via OIDC (account created automatically)
2. Navigate to **Admin > Users** in NetBox
3. Locate the OIDC user
4. Assign appropriate groups or individual permissions
5. Set **Staff status** if user needs admin panel access
6. Set **Superuser status** if user needs full system access

This approach works for small deployments but does not scale well.

## Troubleshooting

### Redirect URI Mismatch

**Symptoms:**
- Error message: "redirect_uri_mismatch" or similar
- Redirected to error page after attempting authentication

**Resolution:**

Verify the redirect URI configured in your identity provider exactly matches the format NetBox uses:

```
https://<netbox-domain>/oauth/complete/<backend-name>/
```

Common issues:
- Missing trailing slash
- HTTP instead of HTTPS
- Incorrect backend name
- Extra path segments

**Backend name reference:**
- Microsoft Entra ID: `azuread-oauth2`
- Okta: `okta-openidconnect`
- Generic OIDC: `oidc`

### Not Logged In After Authentication

**Symptoms:**
- Redirected back to NetBox after successful provider authentication
- Not logged into NetBox
- No error message displayed

**Resolution:**

Check the following configuration items:

1. **Backend configuration**: Verify `REMOTE_AUTH_BACKEND` matches the provider
2. **Client credentials**: Verify client ID and secret are correct
3. **OIDC endpoint**: For generic OIDC, verify the configuration endpoint is accessible
4. **Network connectivity**: Ensure NetBox can reach the token endpoint

**Check NetBox logs:**

```shell
kubectl logs <netbox-pod> -n kotsadm | grep -i oauth
```

Look for authentication errors or failed token exchanges.

### Groups Not Syncing

**Symptoms:**
- User logs in successfully
- User's groups in NetBox do not match provider groups

**Resolution:**

1. **Verify group claims**: Ensure your identity provider sends group information:
   - Microsoft Entra ID: Configure optional claims for groups
   - Okta: Add groups scope to application
   - Generic OIDC: Verify provider supports group claims

2. **Check group mapping configuration**: Verify pipeline includes group processing steps

3. **Inspect user details**: Log in and check what claims NetBox receives:

```shell
kubectl logs <netbox-pod> -n kotsadm | grep "social_auth"
```

4. **Verify group format**: Some providers send group IDs instead of group names. You may need custom pipeline functions to handle group mapping.

### SSL Certificate Verification Fails

**Symptoms:**
- Error: "SSL: CERTIFICATE_VERIFY_FAILED"
- Cannot reach OIDC endpoint

**Resolution:**

For development and testing only, you can disable SSL verification:

```python
SOCIAL_AUTH_VERIFY_SSL = False
```

**Production resolution:**

Install the provider's SSL certificate in NetBox Enterprise's certificate store. Do not disable SSL verification in production.

### Token Endpoint Not Reachable

**Symptoms:**
- Connection timeout during authentication
- Error: "Failed to fetch user details"

**Resolution:**

1. Verify network connectivity:

```shell
# From within NetBox pod
kubectl exec <netbox-pod> -n kotsadm -- curl https://<provider-domain>/.well-known/openid-configuration
```

2. Check firewall rules allow outbound HTTPS to identity provider
3. Verify DNS resolution for provider domain
4. For on-premises identity providers, ensure routes are configured

### Users Cannot Access NetBox After Login

**Symptoms:**
- User logs in successfully
- User sees "You do not have permission to access this page"

**Resolution:**

OIDC authentication creates user accounts but does not grant permissions automatically.

1. Navigate to **Admin > Users**
2. Locate the OIDC user
3. Assign appropriate groups or permissions
4. Set **Staff status** if user needs admin access
5. Set **Superuser status** if user needs full system access

For automatic permission assignment, configure group mapping.

## Security Considerations

### HTTPS Requirement

Production deployments must use HTTPS for both NetBox Enterprise and the identity provider. OAuth 2.0 security depends on encrypted transport.

**Development exception:**

Some providers allow HTTP redirect URIs for local development testing. Configure appropriate development URLs based on your testing environment.

### Client Secret Storage

Client secrets are stored in NetBox Enterprise configuration. This configuration is:
- Encrypted at rest in Kubernetes secrets
- Not exposed in the NetBox UI
- Only accessible via admin console or kubectl

Rotate client secrets regularly:
1. Generate new secret in identity provider
2. Update NetBox configuration
3. Deploy changes
4. Revoke old secret after verification

### Token Expiration

OIDC tokens expire. NetBox does not automatically refresh tokens. Users must re-authenticate when their session expires.

Configure session timeout based on your security requirements:

```python
# Short session for high-security environments
SESSION_COOKIE_AGE = 3600  # 1 hour

# Standard session for typical environments
SESSION_COOKIE_AGE = 86400  # 24 hours
```

### Audit Logging

NetBox logs authentication events. Monitor logs for:
- Failed authentication attempts
- New user creation via OIDC
- Permission denied after authentication

Access logs:

```shell
kubectl logs <netbox-pod> -n kotsadm | grep authentication
```

## Additional Resources

### Python Social Auth Documentation

NetBox Enterprise uses Python Social Auth for OIDC support. For advanced configuration:

- [Python Social Auth Documentation](https://python-social-auth.readthedocs.io/)
- [Microsoft Entra ID Backend](https://python-social-auth.readthedocs.io/en/latest/backends/azuread.html)
- [Okta OpenID Connect Backend](https://python-social-auth.readthedocs.io/en/latest/backends/okta.html)
- [Generic OpenID Connect Backend](https://python-social-auth.readthedocs.io/en/latest/backends/open_id_connect.html)

### Related NetBox Enterprise Documentation

- [Azure Group Mapping](nbe-azure-group-mapping.md) - Configure group-based access control
- [SAML Single Sign-On](nbe-saml.md) - Alternative SSO method using SAML 2.0
- [LDAP Authentication](nbe-ldap.md) - Integrate with LDAP directories

### Provider-Specific Documentation

- [Microsoft Entra ID OAuth 2.0](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-protocols)
- [Okta OpenID Connect](https://developer.okta.com/docs/reference/api/oidc/)
- [Google Workspace OAuth](https://developers.google.com/identity/protocols/oauth2/openid-connect)
- [Auth0 OpenID Connect](https://auth0.com/docs/authenticate/protocols/openid-connect-protocol)
