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
title: SAML Single Sign-On (v1.12)
description: >-
  Configure SAML 2.0 authentication for NetBox Enterprise with any
  SAML-compliant identity provider
versions:
  cloud: v1.10
  enterprise: v1.10
source: localdocs
lastUpdatedAt: 1764177275000
canonical: /docs/v1.12/enterprise/enterprise-features/nbe-saml/
---
# SAML Single Sign-On

Configure NetBox Enterprise to authenticate users via SAML 2.0, an XML-based standard for exchanging authentication and authorization data between identity providers and service providers. This guide covers configuration for any SAML-compliant identity provider including Okta, Microsoft Entra ID, OneLogin, and others.

## Prerequisites

Before configuring SAML authentication, ensure the following requirements are met:

**Identity Provider Requirements:**
- SAML 2.0 compliant identity provider
- Administrative access to configure SAML applications
- Ability to configure custom attribute mappings
- Access to download or view IdP metadata

**NetBox Enterprise Requirements:**
- NetBox Enterprise v1.10 or later
- Admin console access (`https://<your-cluster-host-or-ip>:30000/`)
- HTTPS configured for production deployments
- NetBox Enterprise URL accessible from user browsers

**Network Requirements:**
- NetBox Enterprise must be reachable by users (for redirect back from IdP)
- HTTPS required for production (HTTP only allowed for localhost testing)

**Local Environment:**
- OpenSSL for generating service provider certificates
- Text editor for editing multi-line certificates

## Understanding SAML Authentication

SAML (Security Assertion Markup Language) enables web-based single sign-on by allowing identity providers to pass authorization credentials to service providers.

### SAML Terminology

**Service Provider (SP):**
- The application being accessed (NetBox Enterprise in this case)
- Requests authentication from the identity provider
- Consumes SAML assertions to grant access

**Identity Provider (IdP):**
- The authentication system (Okta, Entra ID, OneLogin, etc.)
- Authenticates users and issues SAML assertions
- Provides metadata describing its configuration

**SAML Assertion:**
- XML document containing authentication statements
- Includes user identity and attributes
- Digitally signed by the identity provider

**ACS URL (Assertion Consumer Service URL):**
- The endpoint where the IdP sends SAML assertions
- For NetBox Enterprise: `https://<your-netbox-domain>/oauth/complete/saml/`

**Entity ID:**
- Unique identifier for the service provider or identity provider
- For NetBox Enterprise SP: typically the NetBox URL
- For IdP: provided in IdP metadata

### Authentication Flow

1. User attempts to access NetBox Enterprise
2. NetBox redirects user to identity provider with SAML authentication request
3. User authenticates with identity provider credentials
4. Identity provider generates SAML assertion
5. Identity provider signs assertion with its private key
6. User's browser posts the SAML assertion to NetBox ACS URL
7. NetBox validates the assertion signature using IdP's public certificate
8. NetBox extracts user attributes from the assertion
9. NetBox creates or updates the user account
10. User is granted access to NetBox

## Generating Service Provider Certificates

NetBox Enterprise requires a public certificate and private key to identify itself to the identity provider and to optionally sign SAML requests.

### Creating the Certificate and Key

Generate a 2048-bit RSA private key and self-signed certificate:

```shell
# Generate private key
openssl genpkey -algorithm RSA -out saml_private_key.pem -pkeyopt rsa_keygen_bits:2048

# Generate self-signed certificate (valid for 365 days)
openssl req -new -x509 -key saml_private_key.pem -out saml_cert.pem -days 365
```

When prompted for certificate information:
- **Country Name**: Two-letter country code (e.g., US)
- **State or Province**: Full state name
- **Locality Name**: City name
- **Organization Name**: Your organization name
- **Organizational Unit**: Department or division (optional)
- **Common Name**: NetBox Enterprise or your NetBox domain
- **Email Address**: Administrative contact email

### Certificate Security

**Important security considerations:**

- Store the private key securely (never share or commit to version control)
- The private key will be placed in NetBox Enterprise configuration
- Use appropriate certificate validity periods (365 days recommended)
- Rotate certificates before expiration
- Document certificate expiration dates

### Certificate Format

NetBox Enterprise requires certificates in PEM format with header and footer intact:

**Certificate (saml_cert.pem):**
```
-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAKL0UG...
(base64 encoded certificate data)
...vZm9ybWF0aW9uMRMwEQYDVQQD
-----END CERTIFICATE-----
```

**Private Key (saml_private_key.pem):**
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQ...
(base64 encoded private key data)
...9w0BAQEFAASCBKcwggSjAgEA
-----END PRIVATE KEY-----
```

Keep these files accessible for the configuration steps below.

## Identity Provider Configuration

Configure your SAML identity provider to recognize NetBox Enterprise as a service provider. Steps vary by provider but follow a common pattern.

### Required Information for IdP

Provide the following information to your identity provider:

**Assertion Consumer Service (ACS) URL:**
```
https://<your-netbox-domain>/oauth/complete/saml/
```

**SP Entity ID:**
```
https://<your-netbox-domain>
```

**Example:**
- NetBox URL: `https://netbox.example.com`
- ACS URL: `https://netbox.example.com/oauth/complete/saml/`
- SP Entity ID: `https://netbox.example.com`

**SP Certificate:**
- Upload or paste the public certificate (saml_cert.pem) generated earlier
- Some providers call this the "signing certificate" or "verification certificate"

### Configuring User Attributes

Configure attribute mappings in your identity provider. NetBox Enterprise expects the following attributes in SAML assertions:

| SAML Attribute | IdP User Property | Description |
|----------------|-------------------|-------------|
| `email` | Email address | User's email address (used as username) |
| `first_name` | First name / Given name | User's first name |
| `last_name` | Last name / Surname | User's last name |
| `groups` | Group memberships | List of groups (for group mapping) |

**Configuration varies by provider:**

**Okta:**
- Navigate to **Applications > [Your App] > SAML Settings**
- Add attribute statements:
  - Name: `email`, Value: `user.email`
  - Name: `first_name`, Value: `user.firstName`
  - Name: `last_name`, Value: `user.lastName`
- Add group attribute statement:
  - Name: `groups`, Filter: `Matches regex: .*` (or specific group filter)

**Microsoft Entra ID:**
- Navigate to **Enterprise applications > [Your App] > Single sign-on**
- Edit **Attributes & Claims**:
  - Claim name: `email`, Source attribute: `user.mail`
  - Claim name: `first_name`, Source attribute: `user.givenname`
  - Claim name: `last_name`, Source attribute: `user.surname`
  - Claim name: `groups`, Source: `user.groups`

**OneLogin:**
- Navigate to **Applications > [Your App] > Parameters**
- Add parameters:
  - Field name: `email`, Value: `Email`
  - Field name: `first_name`, Value: `First Name`
  - Field name: `last_name`, Value: `Last Name`
  - Field name: `groups`, Value: `User Roles` (or groups)

### Collecting IdP Information

After configuring the IdP application, collect the following information for NetBox configuration:

**IdP Entity ID:**
- Unique identifier for your identity provider
- Found in SAML metadata or IdP configuration

**IdP SSO URL:**
- The URL where NetBox sends authentication requests
- Also called "Single Sign-On URL" or "SAML Login URL"

**IdP x509 Certificate:**
- Public certificate used to verify SAML assertion signatures
- Download from IdP or extract from SAML metadata XML
- PEM format without headers (base64 encoded certificate data only)

**Example of extracting certificate from metadata:**

If your IdP provides a metadata URL, download and extract the certificate:

```shell
curl -o metadata.xml https://your-idp.com/metadata

# Extract certificate (remove XML tags and newlines)
grep -oP '(?<=<X509Certificate>).*?(?=</X509Certificate>)' metadata.xml
```

The certificate should be a single line of base64-encoded data without headers.

## NetBox Enterprise Configuration

Configure SAML authentication through the NetBox Enterprise admin console.

### Accessing Configuration

1. Access the admin console at `https://<your-cluster-host-or-ip>:30000/`
2. Navigate to the **Config** tab
3. Enable **Show Advanced Settings**
4. Locate the **NetBox Python Configuration Overrides** section

### Adding SAML Configuration

Add the following configuration, replacing placeholder values with your actual information:

```python
# Enable remote authentication
REMOTE_AUTH_ENABLED = True
REMOTE_AUTH_AUTO_CREATE_USER = True
REMOTE_AUTH_BACKEND = 'social_core.backends.saml.SAMLAuth'

# Force HTTPS for OAuth redirects
SOCIAL_AUTH_REDIRECT_IS_HTTPS = True

# Service Provider (NetBox) configuration
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

# Technical contact information
SOCIAL_AUTH_SAML_TECHNICAL_CONTACT = {
    "givenName": "Technical Support",
    "emailAddress": "<technical-contact-email>"
}

# Support contact information
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

### Configuration Parameters

**REMOTE_AUTH_ENABLED**
- Enables remote authentication backend
- Must be set to `True`

**REMOTE_AUTH_AUTO_CREATE_USER**
- Automatically creates NetBox user accounts on first login
- Must be set to `True`

**REMOTE_AUTH_BACKEND**
- Specifies the authentication backend
- Must be `'social_core.backends.saml.SAMLAuth'`

**SOCIAL_AUTH_REDIRECT_IS_HTTPS**
- Forces HTTPS in OAuth redirect URLs
- Set to `True` for production deployments
- Set to `False` only for local development with HTTP

**SOCIAL_AUTH_SAML_SP_ENTITY_ID**
- Unique identifier for NetBox as a service provider
- Typically your NetBox URL
- Must match the Entity ID configured in your IdP

**SOCIAL_AUTH_SAML_SP_PUBLIC_CERT**
- The public certificate generated earlier (saml_cert.pem)
- Include the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` headers
- Use triple quotes for multi-line string

**SOCIAL_AUTH_SAML_SP_PRIVATE_KEY**
- The private key generated earlier (saml_private_key.pem)
- Include the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` headers
- Keep this secure (stored encrypted in NetBox configuration)

**SOCIAL_AUTH_SAML_ORG_INFO**
- Organization metadata published in SAML metadata endpoint
- Optional but recommended for proper SAML configuration
- Displayed to users in some identity providers

**SOCIAL_AUTH_SAML_TECHNICAL_CONTACT / SUPPORT_CONTACT**
- Contact information for SAML-related issues
- Published in SAML metadata
- Used by identity providers to contact you about configuration issues

**SOCIAL_AUTH_SAML_ENABLED_IDPS**
- Dictionary of identity provider configurations
- Key (e.g., "default") is the IdP name used in URLs
- Multiple IdPs can be configured using different keys

**IdP Configuration Keys:**
- `entity_id`: IdP's unique identifier from metadata
- `url`: IdP's SSO URL where authentication requests are sent
- `x509cert`: IdP's public certificate (base64 data without headers)
- `attr_user_permanent_id`: SAML attribute containing unique user ID
- `attr_first_name`: SAML attribute containing user's first name
- `attr_last_name`: SAML attribute containing user's last name
- `attr_username`: SAML attribute used as NetBox username
- `attr_email`: SAML attribute containing user's email address

### Multi-Line String Formatting

For certificates and private keys, use Python triple-quoted strings:

**Correct:**
```python
SOCIAL_AUTH_SAML_SP_PUBLIC_CERT = """-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAKL0UG...
(certificate data)
-----END CERTIFICATE-----"""
```

**Incorrect (will cause errors):**
```python
SOCIAL_AUTH_SAML_SP_PUBLIC_CERT = "-----BEGIN CERTIFICATE-----MIIDXTCCAkW..."  # Missing newlines
```

### Deploying Configuration

After adding configuration:

1. Scroll to the bottom of the Config page
2. Click **Save config**
3. Click **Go to updated version** when prompted
4. Click **Deploy** to apply changes
5. Wait for NetBox Enterprise to reach **Ready** state

Configuration changes require application restart. Existing user sessions remain active during deployment.

## Testing Authentication

After deploying SAML configuration, test that authentication works correctly.

### Initial Login Test

1. Open NetBox Enterprise in a browser
2. Log out if currently authenticated
3. Navigate to the login page
4. Verify a SAML authentication option appears
5. Click the SAML authentication link
6. You will be redirected to your identity provider
7. Authenticate with your IdP credentials
8. After successful authentication, you will be redirected to NetBox

### Verifying User Creation

After first login:

1. Verify you are logged in by checking the username at the top right
2. Navigate to your user profile (click your username, select **Profile**)
3. Verify your user details match your IdP account:
   - Username should match email address
   - First name and last name should be populated
   - Email address should match IdP

### Checking User in Admin Interface

If you have admin access:

1. Navigate to **Admin > Authentication > Users**
2. Locate your SAML-authenticated user
3. Verify the user account was created correctly
4. Note that new users have no permissions by default

### Testing Subsequent Logins

1. Log out of NetBox
2. Log in again via SAML
3. Verify login succeeds without creating a duplicate user account
4. Existing user account should be reused for subsequent logins

## SAML Metadata

NetBox Enterprise publishes SAML metadata that some identity providers can consume for automatic configuration.

### Accessing Metadata

NetBox SAML metadata is available at:

```
https://<your-netbox-domain>/oauth/metadata/saml/
```

**Example:**
```
https://netbox.example.com/oauth/metadata/saml/
```

This metadata includes:
- Service Provider Entity ID
- Assertion Consumer Service URL
- Public certificate
- Organization information

### Using Metadata for IdP Configuration

Some identity providers support importing SAML metadata:

1. Copy the metadata URL
2. In your IdP, select "Configure via metadata URL" or similar option
3. Paste the NetBox metadata URL
4. The IdP will automatically configure most settings
5. Verify attribute mappings manually (often not included in metadata import)

## Assigning Permissions

Users authenticated via SAML have no permissions by default. Assign permissions using one of the following methods:

### Manual Permission Assignment

For individual users:

1. Navigate to **Admin > Authentication > Users**
2. Locate the SAML user
3. Assign appropriate groups or individual permissions
4. Set **Staff status** if the user needs admin interface access
5. Set **Superuser status** if the user needs full system access

### Group-Based Permissions

For automated permission assignment based on IdP groups, configure SAML group mapping. See [SAML Group Mapping](nbe-saml-group-map.md) for detailed instructions.

## Troubleshooting

### SAML Response Errors

**Symptoms:**
- Error message: "SAML response validation failed"
- Redirected to error page after IdP authentication
- NetBox logs show signature verification errors

**Resolution:**

1. **Verify IdP certificate:**
   - Check that the x509cert in configuration matches the current IdP certificate
   - Remove headers (`-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`)
   - Remove all newlines (certificate should be a single line)
   - Remove any whitespace

2. **Check certificate expiration:**
   - IdP certificates may expire and need renewal
   - Download fresh certificate from IdP metadata

3. **Verify ACS URL:**
   - Ensure the ACS URL in IdP configuration exactly matches:
     ```
     https://<your-netbox-domain>/oauth/complete/saml/
     ```
   - Common issues: missing trailing slash, HTTP instead of HTTPS

### Attribute Mapping Errors

**Symptoms:**
- User logs in successfully but username is empty or incorrect
- First name or last name missing from user profile
- Error messages about missing required attributes

**Resolution:**

1. **Check attribute configuration in IdP:**
   - Verify attributes are configured with correct names
   - Attribute names are case-sensitive
   - Required attributes: `email`, `first_name`, `last_name`

2. **Verify attribute values:**
   - Test user must have values for all required attributes in IdP
   - Empty attributes in IdP will cause errors

3. **Inspect SAML assertion:**
   - Enable SAML debugging in NetBox logs
   - Check actual attribute names sent by IdP
   - Update NetBox configuration if attribute names differ

### Certificate Format Errors

**Symptoms:**
- Error: "Could not deserialize key data"
- Error: "PEM routines: no start line"
- Configuration fails to deploy

**Resolution:**

1. **Verify certificate format:**
   - SP certificate and private key must include headers
   - Must use triple-quoted strings in Python configuration
   - Newlines must be preserved

2. **Correct format example:**
   ```python
   SOCIAL_AUTH_SAML_SP_PUBLIC_CERT = """-----BEGIN CERTIFICATE-----
   MIIDXTCCAkWgAwIBAgIJAKL0UG...
   (multiple lines of base64 data)
   -----END CERTIFICATE-----"""
   ```

3. **Test certificate files:**
   ```shell
   # Verify certificate
   openssl x509 -in saml_cert.pem -text -noout

   # Verify private key
   openssl rsa -in saml_private_key.pem -check
   ```

### Entity ID Mismatch

**Symptoms:**
- Error: "The response was received at a URL that is not configured"
- IdP rejects authentication requests from NetBox

**Resolution:**

1. **Verify SP Entity ID matches in both locations:**
   - NetBox configuration: `SOCIAL_AUTH_SAML_SP_ENTITY_ID`
   - IdP application configuration: Entity ID or Audience

2. **Common mismatches:**
   - Trailing slash: `https://netbox.example.com` vs `https://netbox.example.com/`
   - HTTP vs HTTPS
   - Subdomain differences

3. **Update both NetBox and IdP to use identical Entity IDs**

### IdP SSO URL Errors

**Symptoms:**
- Timeout when attempting to log in
- Cannot reach identity provider
- Browser shows connection refused

**Resolution:**

1. **Verify IdP SSO URL is correct:**
   - Check the `url` parameter in `SOCIAL_AUTH_SAML_ENABLED_IDPS`
   - Verify the URL is accessible from your browser

2. **Test IdP availability:**
   ```shell
   curl -I <idp-sso-url>
   ```

3. **Check for typos:**
   - Extra spaces
   - Incorrect protocol (HTTP vs HTTPS)
   - Incorrect domain or path

### User Not Logged In After Authentication

**Symptoms:**
- Redirected back to NetBox after IdP authentication
- Not logged into NetBox
- No error message displayed

**Resolution:**

1. **Check NetBox logs:**
   ```shell
   kubectl logs <netbox-pod> -n kotsadm | grep -i saml
   ```

2. **Verify required attributes are present:**
   - `email` attribute must be present in SAML assertion
   - Attribute names in NetBox config must match IdP attribute names

3. **Check REMOTE_AUTH_ENABLED and REMOTE_AUTH_AUTO_CREATE_USER:**
   - Both must be set to `True`

### HTTPS Redirect Issues

**Symptoms:**
- Redirected to HTTP instead of HTTPS after authentication
- Mixed content warnings
- Login loop (redirects back to IdP repeatedly)

**Resolution:**

1. **Verify SOCIAL_AUTH_REDIRECT_IS_HTTPS:**
   - Must be set to `True` for production HTTPS deployments

2. **Check reverse proxy configuration:**
   - Ensure reverse proxy forwards the correct protocol
   - May need to configure `X-Forwarded-Proto` header

3. **Verify NetBox is accessed via HTTPS:**
   - Always access NetBox via HTTPS URL
   - HTTP access may cause redirect issues

## Security Considerations

### Certificate Management

**Service Provider Certificates:**
- Store private keys securely (encrypted in NetBox configuration)
- Rotate certificates before expiration
- Use appropriate validity periods (1 year recommended)
- Document expiration dates and renewal procedures

**Identity Provider Certificates:**
- Monitor IdP certificate expiration
- Update NetBox configuration when IdP rotates certificates
- Test authentication after certificate updates

### HTTPS Requirement

SAML assertions contain sensitive authentication data:
- Always use HTTPS in production
- HTTP should only be used for localhost development
- Ensure valid TLS certificates on NetBox Enterprise
- Configure HSTS (HTTP Strict Transport Security) headers

### Assertion Security

SAML assertions are digitally signed to prevent tampering:
- IdP signs assertions with its private key
- NetBox verifies signatures using IdP's public certificate
- Never disable signature verification
- Always use current IdP certificates

### User Provisioning

Users are automatically created on first login:
- Accounts cannot be deleted via IdP (must be disabled in NetBox)
- Consider implementing automated deprovisioning
- Regularly audit user accounts and permissions
- Disable unused accounts manually

### Audit Logging

NetBox logs all authentication events:
- Monitor logs for failed authentication attempts
- Review logs for unusual patterns
- Set up alerting for repeated failures

**View authentication logs:**
```shell
kubectl logs <netbox-pod> -n kotsadm | grep authentication
```

## Related Documentation

- [SAML Group Mapping](nbe-saml-group-map.md) - Configure group-based access control
- [Microsoft Entra ID Single Sign-On](nbe-azure-sso.md) - Alternative OAuth 2.0 configuration
- [OpenID Connect (OIDC) SSO](nbe-oidc-sso.md) - Alternative OAuth 2.0 configuration
- [LDAP Authentication](nbe-ldap.md) - Alternative authentication method

## Additional Resources

- [SAML 2.0 Specification](https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)
- [Python Social Auth SAML Backend](https://python-social-auth.readthedocs.io/en/latest/backends/saml.html)
- [Okta SAML Configuration](https://help.okta.com/en-us/Content/Topics/Apps/Apps_App_Integration_Wizard_SAML.htm)
- [Microsoft Entra SAML Configuration](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal-setup-sso)
