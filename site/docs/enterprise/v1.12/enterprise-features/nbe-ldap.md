---
tags:
  - authentication
  - cloud
  - enterprise
  - netbox
category: enterprise-documentation
audience: administrators
complexity: intermediate
title: LDAP Authentication (v1.12)
description: >-
  Configure LDAP authentication for NetBox Enterprise with Active Directory or
  OpenLDAP
versions:
  cloud: v1.10
  enterprise: v1.10
source: localdocs
lastUpdatedAt: 1764177275000
canonical: /docs/v1.12/enterprise/enterprise-features/nbe-ldap/
---
# LDAP Authentication

Configure NetBox Enterprise to authenticate users via LDAP (Lightweight Directory Access Protocol), enabling integration with Active Directory, OpenLDAP, and other LDAP-compliant directory services. This guide covers basic LDAP authentication and group-based access control.

## Prerequisites

Before configuring LDAP authentication, ensure the following requirements are met:

**LDAP Server Requirements:**
- Active Directory, OpenLDAP, or other LDAP-compliant directory server
- LDAP server accessible from NetBox Enterprise (port 389 for LDAP, port 636 for LDAPS)
- Service account (bind DN) with read access to users and groups
- SSL/TLS certificate if using LDAPS (recommended for production)

**NetBox Enterprise Requirements:**
- NetBox Enterprise v1.10 or later
- Admin console access (`https://<your-cluster-host-or-ip>:30000/`)
- Understanding of NetBox permission model

**LDAP Knowledge Requirements:**
- LDAP distinguished names (DN) structure
- Your LDAP schema (Active Directory vs OpenLDAP)
- User search base and attributes
- Group structure and membership attributes

**Network Requirements:**
- NetBox Enterprise can reach LDAP server on port 389 (LDAP) or 636 (LDAPS)
- Firewall rules allow outbound connections to LDAP server
- DNS resolution for LDAP server hostname (if using hostname)

## Understanding LDAP Authentication

LDAP authentication enables NetBox Enterprise to verify user credentials against a directory server rather than storing passwords locally. Users authenticate with their directory credentials, and NetBox creates local user accounts linked to LDAP identities.

### How It Works

1. User enters username and password in NetBox login form
2. NetBox connects to LDAP server using configured bind DN (service account)
3. NetBox searches for the user's LDAP entry using the configured search base and filter
4. NetBox attempts to bind (authenticate) as the user with provided password
5. If authentication succeeds, NetBox retrieves user attributes (email, first name, last name)
6. NetBox retrieves user's group memberships from LDAP
7. NetBox creates or updates local user account
8. NetBox maps LDAP groups to NetBox groups based on configuration
9. User is granted access to NetBox with appropriate permissions

### LDAP Terminology

**Distinguished Name (DN):**
- Unique identifier for an LDAP entry
- Example: `cn=John Doe,ou=Users,dc=example,dc=com`
- Components: cn (common name), ou (organizational unit), dc (domain component)

**Bind DN:**
- Service account used by NetBox to connect to LDAP
- Requires read access to users and groups
- Example: `cn=netbox,ou=Service Accounts,dc=example,dc=com`

**Search Base (Base DN):**
- Starting point for LDAP searches
- Narrows search scope to specific organizational unit or domain
- Example: `ou=Users,dc=example,dc=com`

**Search Filter:**
- LDAP query expression to find specific entries
- Example: `(uid=%(user)s)` finds user by uid attribute

**Group Type:**
- Defines how group membership is structured in LDAP
- Active Directory: `NestedGroupOfNamesType`
- OpenLDAP: `PosixGroupType`

### Active Directory vs OpenLDAP

NetBox supports both Active Directory and OpenLDAP with different configuration requirements:

| Aspect | Active Directory | OpenLDAP |
|--------|------------------|----------|
| User search attribute | `sAMAccountName` | `uid` |
| Group type | `NestedGroupOfNamesType` | `PosixGroupType` |
| Typical user base | `cn=Users,dc=domain` | `ou=People,dc=domain` |
| Typical group base | `cn=Users,dc=domain` | `ou=Groups,dc=domain` |
| Referrals | Often requires disabling | Usually not needed |

## LDAP Server Configuration

Before configuring NetBox, prepare your LDAP server.

### Creating a Service Account

Create a dedicated LDAP account for NetBox to use for directory queries:

**Active Directory:**
1. Open Active Directory Users and Computers
2. Create new user (e.g., "netbox-service")
3. Set password to never expire
4. Grant read access to users and groups (typically default Domain Users is sufficient)
5. Note the distinguished name (e.g., `cn=netbox-service,cn=Users,dc=example,dc=com`)

**OpenLDAP:**
1. Create service account entry in LDAP
2. Assign appropriate read permissions
3. Example LDIF:
   ```ldif
   dn: cn=netbox,ou=Service Accounts,dc=example,dc=com
   objectClass: simpleSecurityObject
   objectClass: organizationalRole
   cn: netbox
   userPassword: \{SSHA\}...
   ```

### Configuring SSL/TLS

For production deployments, configure LDAPS (LDAP over SSL/TLS):

**Active Directory:**
1. Install certificate on domain controllers
2. Verify LDAPS is listening on port 636
3. Test with: `openssl s_client -connect ldap.example.com:636`

**OpenLDAP:**
1. Configure TLS in `slapd.conf` or `cn=config`
2. Specify certificate and key paths
3. Restart OpenLDAP service
4. Test with: `openssl s_client -connect ldap.example.com:636`

### Identifying User and Group DNs

Determine the appropriate DNs for your environment:

**Find user search base:**
```shell
ldapsearch -x -H ldap://your-server -b "dc=example,dc=com" "(objectClass=person)" dn
```

**Find group search base:**
```shell
ldapsearch -x -H ldap://your-server -b "dc=example,dc=com" "(objectClass=group)" dn
```

**Locate specific group DN:**
```shell
ldapsearch -x -H ldap://your-server -b "dc=example,dc=com" "(cn=Netbox Users)" dn
```

Document these values for NetBox configuration.

## NetBox Enterprise Configuration

Configure LDAP authentication through both Python configuration overrides and environment variables in the NetBox Enterprise admin console.

### Accessing Configuration

1. Access the admin console at `https://<your-cluster-host-or-ip>:30000/`
2. Navigate to the **Config** tab
3. Enable **Show Advanced Settings**

### Python Configuration

Add the following to **NetBox Python Configuration Overrides**:

```python
# Enable LDAP authentication
REMOTE_AUTH_ENABLED = True
REMOTE_AUTH_BACKEND = 'netbox.authentication.LDAPBackend'
REMOTE_AUTH_AUTO_CREATE_USER = True
```

**Configuration parameters:**
- `REMOTE_AUTH_ENABLED`: Enables remote authentication (set to `True`)
- `REMOTE_AUTH_BACKEND`: Specifies LDAP backend (must be `'netbox.authentication.LDAPBackend'`)
- `REMOTE_AUTH_AUTO_CREATE_USER`: Automatically creates NetBox user accounts on first login (set to `True`)

### Environment Variable Configuration

Environment variables configure LDAP-specific settings. Add these in the **Environment Variables** section of the admin console.

**Important:** All environment variable values must be quoted strings, even for boolean and numeric values. This prevents formatting errors when values are passed to containers.

**Example:**
- Correct: `"true"`, `"0"`, `"636"`
- Incorrect: `true`, `0`, `636`

## Active Directory Configuration

Complete environment variable configuration for Active Directory:

```yaml
AUTH_LDAP_SERVER_URI: "ldaps://ad.example.com:636"
AUTH_LDAP_BIND_DN: "cn=netbox-service,cn=Users,dc=example,dc=com"
AUTH_LDAP_BIND_PASSWORD: "your-service-account-password"
LDAP_IGNORE_CERT_ERRORS: "false"

AUTH_LDAP_CONNECTION_OPTIONS: "{ ldap.OPT_REFERRALS: 0 }"
AUTH_LDAP_CACHE_TIMEOUT: "0"

AUTH_LDAP_GROUP_TYPE: "NestedGroupOfNamesType"
AUTH_LDAP_GROUP_SEARCH_BASEDN: "cn=Users,dc=example,dc=com"
AUTH_LDAP_FIND_GROUP_PERMS: "true"

AUTH_LDAP_REQUIRE_GROUP_DN: "cn=Netbox Users,cn=Users,dc=example,dc=com"
AUTH_LDAP_IS_ADMIN_DN: "cn=Netbox Admins,cn=Users,dc=example,dc=com"
AUTH_LDAP_IS_SUPERUSER_DN: "cn=Netbox Superusers,cn=Users,dc=example,dc=com"
AUTH_LDAP_MIRROR_GROUPS: "true"

AUTH_LDAP_USER_SEARCH_ATTR: "sAMAccountName"
AUTH_LDAP_USER_SEARCH_BASEDN: "cn=Users,dc=example,dc=com"
AUTH_LDAP_USER_SEARCH: 'LDAPSearch("cn=Users,dc=example,dc=com", ldap.SCOPE_SUBTREE, "(sAMAccountName=%(user)s)")'
```

**Replace placeholders:**
- `ad.example.com`: Your Active Directory server hostname
- `dc=example,dc=com`: Your domain components
- `netbox-service`: Your service account name
- `your-service-account-password`: Service account password
- Group DNs: Distinguished names for your NetBox access groups

## OpenLDAP Configuration

Complete environment variable configuration for OpenLDAP:

```yaml
AUTH_LDAP_SERVER_URI: "ldaps://ldap.example.com:636"
AUTH_LDAP_BIND_DN: "cn=netbox,ou=Service Accounts,dc=example,dc=com"
AUTH_LDAP_BIND_PASSWORD: "your-service-account-password"
LDAP_IGNORE_CERT_ERRORS: "false"

AUTH_LDAP_CONNECTION_OPTIONS: "{ ldap.OPT_REFERRALS: 0 }"
AUTH_LDAP_CACHE_TIMEOUT: "0"

AUTH_LDAP_GROUP_TYPE: "PosixGroupType"
AUTH_LDAP_GROUP_SEARCH_BASEDN: "ou=Groups,dc=example,dc=com"
AUTH_LDAP_FIND_GROUP_PERMS: "true"

AUTH_LDAP_REQUIRE_GROUP_DN: "cn=netbox-users,ou=Groups,dc=example,dc=com"
AUTH_LDAP_IS_ADMIN_DN: "cn=netbox-admins,ou=Groups,dc=example,dc=com"
AUTH_LDAP_IS_SUPERUSER_DN: "cn=netbox-superusers,ou=Groups,dc=example,dc=com"
AUTH_LDAP_MIRROR_GROUPS: "true"

AUTH_LDAP_USER_SEARCH_ATTR: "uid"
AUTH_LDAP_USER_SEARCH_BASEDN: "ou=People,dc=example,dc=com"
AUTH_LDAP_USER_SEARCH: 'LDAPSearch("ou=People,dc=example,dc=com", ldap.SCOPE_SUBTREE, "(uid=%(user)s)")'
```

**Replace placeholders:**
- `ldap.example.com`: Your OpenLDAP server hostname
- `dc=example,dc=com`: Your domain components
- `netbox`: Your service account name
- `your-service-account-password`: Service account password
- Group DNs: Distinguished names for your NetBox access groups

## Configuration Parameters

### Server Connection

**AUTH_LDAP_SERVER_URI**
- LDAP server URL including protocol and port
- Use `ldaps://` for SSL/TLS (recommended)
- Use `ldap://` only for testing or internal networks
- Can specify multiple servers: `"ldaps://ldap1.example.com:636 ldaps://ldap2.example.com:636"`

**AUTH_LDAP_BIND_DN**
- Distinguished name of service account
- This account performs user and group searches
- Must have read access to relevant LDAP entries

**AUTH_LDAP_BIND_PASSWORD**
- Password for the bind DN service account
- Stored encrypted in NetBox Enterprise configuration

**LDAP_IGNORE_CERT_ERRORS**
- Whether to ignore SSL certificate validation errors
- Set to `"false"` for production (validate certificates)
- Set to `"true"` only for testing with self-signed certificates
- **Warning:** Setting to `"true"` in production creates security vulnerabilities

### Connection Options

**AUTH_LDAP_CONNECTION_OPTIONS**
- Python dictionary of LDAP connection options
- `ldap.OPT_REFERRALS: 0` disables LDAP referrals (often required for Active Directory)
- Format: `"{ ldap.OPT_REFERRALS: 0 }"`

**AUTH_LDAP_CACHE_TIMEOUT**
- Duration (in seconds) to cache LDAP query results
- Set to `"0"` to disable caching (recommended for testing)
- Set to `"300"` or higher for production to reduce LDAP queries

### User Search

**AUTH_LDAP_USER_SEARCH_ATTR**
- LDAP attribute containing username
- Active Directory: `"sAMAccountName"`
- OpenLDAP: `"uid"`

**AUTH_LDAP_USER_SEARCH_BASEDN**
- Starting point for user searches
- Active Directory example: `"cn=Users,dc=example,dc=com"`
- OpenLDAP example: `"ou=People,dc=example,dc=com"`

**AUTH_LDAP_USER_SEARCH**
- Complete LDAPSearch query for finding users
- Format: `'LDAPSearch("base-dn", ldap.SCOPE_SUBTREE, "filter")'`
- `%(user)s` is replaced with the username entered at login
- Scope options:
  - `ldap.SCOPE_SUBTREE`: Search base DN and all descendants (most common)
  - `ldap.SCOPE_ONELEVEL`: Search only direct children of base DN
  - `ldap.SCOPE_BASE`: Search only the base DN itself

### Group Configuration

**AUTH_LDAP_GROUP_TYPE**
- Defines LDAP group structure
- Active Directory: `"NestedGroupOfNamesType"` (supports nested groups)
- OpenLDAP: `"PosixGroupType"` (standard POSIX groups)
- Other options: `"GroupOfNamesType"`, `"GroupOfUniqueNamesType"`

**AUTH_LDAP_GROUP_SEARCH_BASEDN**
- Starting point for group searches
- Active Directory example: `"cn=Users,dc=example,dc=com"`
- OpenLDAP example: `"ou=Groups,dc=example,dc=com"`

**AUTH_LDAP_FIND_GROUP_PERMS**
- Whether to retrieve group memberships for permissions
- Set to `"true"` to enable group-based access control
- Set to `"false"` to disable group mapping (manual permission assignment only)

**AUTH_LDAP_MIRROR_GROUPS**
- Whether to automatically create NetBox groups matching LDAP groups
- Set to `"true"` to automatically mirror LDAP groups to NetBox
- Set to `"false"` to manually manage NetBox groups
- **Important:** When enabled, NetBox groups must not already exist

### Group Mapping

**AUTH_LDAP_REQUIRE_GROUP_DN**
- LDAP group DN that users must belong to for access
- Users not in this group cannot log in to NetBox
- Optional but recommended for access control
- Example: `"cn=Netbox Users,cn=Users,dc=example,dc=com"`

**AUTH_LDAP_IS_ADMIN_DN**
- LDAP group DN for users who should have staff status
- Members can access NetBox admin interface
- Example: `"cn=Netbox Admins,cn=Users,dc=example,dc=com"`

**AUTH_LDAP_IS_SUPERUSER_DN**
- LDAP group DN for users who should have superuser status
- Members have all permissions and unrestricted access
- **Warning:** Exercise extreme caution with superuser access
- Example: `"cn=Netbox Superusers,cn=Users,dc=example,dc=com"`

## Deploying Configuration

After adding configuration:

1. Scroll to the bottom of the Config page
2. Click **Save config**
3. Click **Go to updated version** when prompted
4. Click **Deploy** to apply changes
5. Wait for NetBox Enterprise to reach **Ready** state

Configuration changes require application restart. Existing user sessions remain active during deployment.

## Testing Authentication

After deploying LDAP configuration, test that authentication works correctly.

### Initial Login Test

1. Open NetBox Enterprise in a browser
2. Log out if currently authenticated
3. Navigate to the login page
4. Enter LDAP username and password:
   - Active Directory: Use `sAMAccountName` (typically without domain)
   - OpenLDAP: Use `uid`
5. Click **Log In**
6. If successful, you will be logged in to NetBox

### Verifying User Creation

After first login:

1. Verify you are logged in by checking the username at the top right
2. Navigate to your user profile (click your username, select **Profile**)
3. Verify your user details were populated from LDAP
4. Navigate to **Admin > Authentication > Users** (requires admin access)
5. Locate your LDAP user in the user list
6. Verify the user account was created

### Verifying Group Membership

If group mirroring is enabled:

1. Navigate to **Admin > Authentication > Users**
2. Locate your LDAP user
3. Click the username to view details
4. Scroll to the **Groups** section
5. Verify group memberships match your LDAP groups

If `AUTH_LDAP_IS_ADMIN_DN` is configured:
- Verify **Staff status** is checked if you are in the admin group

If `AUTH_LDAP_IS_SUPERUSER_DN` is configured:
- Verify **Superuser status** is checked if you are in the superuser group

### Testing Permissions

Test that permissions are functional:

1. Log in as a test user with known LDAP group memberships
2. Attempt to access functionality that should be permitted
3. Attempt to access functionality that should be denied
4. Verify permission enforcement matches expectations

## Group Mirroring vs Manual Groups

NetBox Enterprise supports two approaches for LDAP group integration:

### Group Mirroring (AUTH_LDAP_MIRROR_GROUPS: "true")

**How it works:**
- NetBox automatically creates groups matching LDAP group names
- User's LDAP group memberships are synchronized to NetBox
- Groups are managed automatically

**Requirements:**
- NetBox groups must not already exist before enabling
- LDAP group names must be valid NetBox group names
- Permissions must be assigned to auto-created groups

**Advantages:**
- Automatic synchronization
- No manual group creation required
- Group memberships stay current

**Disadvantages:**
- Less control over group names
- Permissions must be assigned after group creation
- All LDAP groups are mirrored (may create unnecessary groups)

### Manual Group Management (AUTH_LDAP_MIRROR_GROUPS: "false")

**How it works:**
- Create NetBox groups manually before configuring LDAP
- Map LDAP groups to NetBox groups using group DNs
- Control which LDAP groups map to NetBox

**Requirements:**
- NetBox groups must exist before users log in
- Additional configuration required for group mapping

**Advantages:**
- Full control over group names and permissions
- Selective mapping of LDAP groups
- Cleaner group structure

**Disadvantages:**
- Manual setup required
- Additional configuration complexity

**Recommended approach:** Use manual group management for production deployments to maintain control over permissions.

## Troubleshooting

### Cannot Connect to LDAP Server

**Symptoms:**
- Login fails immediately
- NetBox logs show connection timeouts or connection refused
- Error: "Can't contact LDAP server"

**Resolution:**

1. **Verify network connectivity:**
   ```shell
   kubectl exec <netbox-pod> -n kotsadm -- nc -zv ldap.example.com 636
   ```
   This should report "succeeded" if the connection works.

2. **Check LDAP server is listening:**
   - LDAP: port 389
   - LDAPS: port 636
   - Verify firewall rules allow outbound connections

3. **Test LDAP server directly:**
   ```shell
   ldapsearch -x -H ldaps://ldap.example.com -b "dc=example,dc=com" -D "cn=admin,dc=example,dc=com" -W
   ```

4. **Verify DNS resolution:**
   ```shell
   kubectl exec <netbox-pod> -n kotsadm -- nslookup ldap.example.com
   ```

### Bind Failure

**Symptoms:**
- Error: "Invalid credentials" in NetBox logs
- Authentication fails for all users
- NetBox cannot search LDAP directory

**Resolution:**

1. **Verify bind DN and password:**
   - Check `AUTH_LDAP_BIND_DN` matches service account DN exactly
   - Verify `AUTH_LDAP_BIND_PASSWORD` is correct
   - Test credentials with ldapsearch:
     ```shell
     ldapsearch -x -H ldaps://ldap.example.com -D "cn=netbox,dc=example,dc=com" -W
     ```

2. **Check service account permissions:**
   - Service account must have read access to users and groups
   - Verify account is not disabled or locked

3. **Review account format:**
   - Active Directory may require UPN format: `netbox@example.com`
   - Or down-level logon name format: `DOMAIN\netbox`
   - Try different formats if DN format fails

### User Not Found

**Symptoms:**
- Error: "User not found in LDAP"
- Specific users cannot log in
- Bind succeeds but user search fails

**Resolution:**

1. **Verify user search base:**
   - Check `AUTH_LDAP_USER_SEARCH_BASEDN` includes user's organizational unit
   - Test search manually:
     ```shell
     ldapsearch -x -H ldaps://ldap.example.com -b "cn=Users,dc=example,dc=com" "(sAMAccountName=testuser)"
     ```

2. **Check user search attribute:**
   - Active Directory: Verify using `sAMAccountName`
   - OpenLDAP: Verify using `uid`
   - Ensure attribute matches what users enter at login

3. **Verify search filter:**
   - Check `AUTH_LDAP_USER_SEARCH` filter is correct
   - Common issue: Missing parentheses in filter
   - Correct: `"(uid=%(user)s)"`
   - Incorrect: `"uid=%(user)s"`

4. **Expand search scope:**
   - If users are in different OUs, adjust base DN to parent OU
   - Or use domain root: `"dc=example,dc=com"`

### SSL Certificate Errors

**Symptoms:**
- Error: "certificate verify failed"
- Error: "SSL: CERTIFICATE_VERIFY_FAILED"
- Connection fails when using ldaps://

**Resolution:**

**For testing only:**
Set `LDAP_IGNORE_CERT_ERRORS: "true"` to bypass certificate validation.

**For production:**

1. **Install CA certificate:**
   - Obtain your LDAP server's CA certificate
   - Add to NetBox Enterprise's trusted certificates
   - Contact NetBox Labs support for assistance with certificate installation

2. **Verify certificate:**
   ```shell
   openssl s_client -connect ldap.example.com:636 -showcerts
   ```
   - Check certificate subject matches server hostname
   - Check certificate is not expired
   - Check certificate is signed by trusted CA

3. **Use valid certificate:**
   - Ensure LDAP server uses certificate from trusted CA
   - Or add self-signed CA to trusted certificates

### Groups Not Syncing

**Symptoms:**
- User logs in successfully
- No group memberships assigned in NetBox
- Permissions not working as expected

**Resolution:**

1. **Verify AUTH_LDAP_FIND_GROUP_PERMS is enabled:**
   - Must be set to `"true"` for group retrieval

2. **Check group search base:**
   - Verify `AUTH_LDAP_GROUP_SEARCH_BASEDN` includes user's groups
   - Test group search:
     ```shell
     ldapsearch -x -H ldaps://ldap.example.com -b "cn=Users,dc=example,dc=com" "(objectClass=group)"
     ```

3. **Verify group type:**
   - Active Directory: Use `"NestedGroupOfNamesType"`
   - OpenLDAP: Use `"PosixGroupType"`
   - Incorrect group type prevents group membership retrieval

4. **Check NetBox logs:**
   ```shell
   kubectl logs <netbox-pod> -n kotsadm | grep -i ldap
   ```
   Look for group-related errors or warnings.

5. **For group mirroring:**
   - Ensure `AUTH_LDAP_MIRROR_GROUPS: "true"`
   - Verify NetBox groups do not already exist (they will be auto-created)
   - Check that LDAP group names are valid NetBox group names

### User Cannot Access NetBox

**Symptoms:**
- User logs in successfully
- User sees "You do not have permission to access this page"
- User has no permissions in NetBox

**Resolution:**

1. **Check AUTH_LDAP_REQUIRE_GROUP_DN:**
   - If configured, user must be member of specified group
   - Verify user is actually in the required group:
     ```shell
     ldapsearch -x -H ldaps://ldap.example.com -b "cn=Netbox Users,cn=Users,dc=example,dc=com" "(member=cn=testuser,cn=Users,dc=example,dc=com)"
     ```

2. **Verify NetBox groups have permissions:**
   - Navigate to **Admin > Authentication > Groups**
   - Click each group user belongs to
   - Verify permissions are assigned
   - Empty groups grant no access

3. **Check user account status:**
   - Navigate to **Admin > Authentication > Users**
   - Locate LDAP user
   - Verify **Active** is checked

4. **Assign permissions manually:**
   - For users without group mappings
   - Assign appropriate groups or individual permissions

## Security Considerations

### Service Account Security

**Bind DN service account:**
- Use dedicated account for NetBox LDAP queries
- Grant minimum required permissions (read-only access to users and groups)
- Use strong password that does not expire
- Regularly rotate service account passwords
- Monitor service account usage for anomalies

### SSL/TLS Encryption

LDAP credentials and queries are transmitted in plain text without encryption:

**Production requirements:**
- Always use LDAPS (ldaps://) in production
- Never use plain LDAP (ldap://) for production
- Validate SSL certificates (`LDAP_IGNORE_CERT_ERRORS: "false"`)
- Use certificates from trusted CAs
- Ensure LDAP server enforces strong TLS versions (TLS 1.2+)

**Testing exception:**
- Plain LDAP acceptable only for isolated test environments
- Never expose plain LDAP to untrusted networks

### Superuser Access

Exercise extreme caution with `AUTH_LDAP_IS_SUPERUSER_DN`:

- Superusers have unrestricted access to NetBox
- Limit superuser group to small number of trusted administrators
- Regularly audit superuser group membership in LDAP
- Document all superuser access grants
- Consider using privileged access management for temporary elevation

### Group Access Control

Use `AUTH_LDAP_REQUIRE_GROUP_DN` to restrict access:

- Prevent unauthorized users from accessing NetBox
- Create dedicated LDAP group for NetBox access
- Regularly review group memberships
- Remove access immediately for terminated employees

### Audit Logging

NetBox logs all authentication events:

- Monitor logs for failed authentication attempts
- Review logs for unusual patterns
- Set up alerting for repeated failures
- Audit user creation and permission changes

**View authentication logs:**
```shell
kubectl logs <netbox-pod> -n kotsadm | grep authentication
```

### Account Management

LDAP-authenticated users require special handling:

- User accounts are created automatically on first login
- Passwords are never stored in NetBox (authenticated via LDAP)
- Disabling users in LDAP immediately prevents NetBox access
- Deleting users from LDAP does not delete NetBox accounts
- Consider periodic cleanup of orphaned accounts

## Related Documentation

- [Microsoft Entra ID Single Sign-On](nbe-azure-sso.md) - Alternative OAuth 2.0 authentication
- [SAML Single Sign-On](nbe-saml.md) - Alternative SAML 2.0 authentication
- [OpenID Connect (OIDC) SSO](nbe-oidc-sso.md) - Alternative OAuth 2.0 authentication

## Additional Resources

- [NetBox LDAP Authentication Documentation](https://docs.netbox.dev/en/stable/administration/authentication/ldap/)
- [django-auth-ldap Documentation](https://django-auth-ldap.readthedocs.io/)
- [Active Directory LDAP Syntax](https://learn.microsoft.com/en-us/windows/win32/adsi/search-filter-syntax)
- [OpenLDAP Administrator's Guide](https://www.openldap.org/doc/admin24/)
