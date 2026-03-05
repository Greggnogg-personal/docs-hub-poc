---
tags:
  - authentication
  - cloud
  - enterprise
  - netbox
category: enterprise-documentation
audience: administrators
complexity: intermediate
title: LDAP Authentication (v1.13)
description: >-
  Configure LDAP authentication for NetBox Enterprise with Active Directory or
  OpenLDAP
versions:
  cloud: v1.10
  enterprise: v1.10
source: localdocs
lastUpdatedAt: 1769027798000
canonical: /docs/v1.13/enterprise/enterprise-features/nbe-ldap/
---
# LDAP Authentication

Configure NetBox Enterprise to authenticate users via LDAP, enabling integration with Active Directory, OpenLDAP, and other LDAP-compliant directory services.

## Overview

LDAP authentication enables NetBox to verify credentials against a directory server rather than storing passwords locally. Users authenticate with directory credentials, and NetBox creates local accounts linked to LDAP identities.

Group memberships can be synchronized automatically for automated permission assignment.

### Before You Begin \{#prerequisites\}

**LDAP Server Requirements:**
- Active Directory, OpenLDAP, or LDAP-compliant directory server
- LDAP server accessible from NetBox (port 389 for LDAP, 636 for LDAPS)
- Service account (bind DN) with read access to users and groups
- SSL/TLS certificate if using LDAPS (recommended for production)

**NetBox Requirements:**
- NetBox Enterprise v1.10 or later with admin console access
- Understanding of LDAP DNs and your directory schema

**Network:**
- NetBox can reach LDAP server on port 389 (LDAP) or 636 (LDAPS)
- Firewall rules allow outbound connections
- DNS resolution for LDAP server hostname

## LDAP Terminology \{#understanding-ldap-authentication\}

| Term | Description | Example |
|------|-------------|---------|
| Distinguished Name (DN) | Unique identifier for LDAP entry | `cn=John Doe,ou=Users,dc=example,dc=com` |
| Bind DN | Service account NetBox uses to query LDAP | `cn=netbox,ou=Service Accounts,dc=example,dc=com` |
| Search Base (Base DN) | Starting point for LDAP searches | `ou=Users,dc=example,dc=com` |
| Search Filter | LDAP query expression to find entries | `(uid=%(user)s)` |
| Group Type | Defines group membership structure | Active Directory: `NestedGroupOfNamesType`<br/>OpenLDAP: `PosixGroupType` |

### Active Directory vs OpenLDAP \{#active-directory-vs-openldap\}

| Aspect | Active Directory | OpenLDAP |
|--------|------------------|----------|
| User search attribute | `sAMAccountName` | `uid` |
| Group type | `NestedGroupOfNamesType` | `PosixGroupType` |
| Typical user base | `cn=Users,dc=domain` | `ou=People,dc=domain` |
| Typical group base | `cn=Users,dc=domain` | `ou=Groups,dc=domain` |
| Referrals | Often requires disabling | Usually not needed |

## LDAP Server Setup \{#ldap-server-configuration\}

### Create Service Account \{#creating-a-service-account\}

Create a dedicated account for NetBox directory queries.

**Active Directory:**
1. Open Active Directory Users and Computers
2. Create new user (e.g., "netbox-service")
3. Set password to never expire
4. Grant read access to users and groups (default Domain Users is sufficient)
5. Note DN: `cn=netbox-service,cn=Users,dc=example,dc=com`

**OpenLDAP:**
```ldif
dn: cn=netbox,ou=Service Accounts,dc=example,dc=com
objectClass: simpleSecurityObject
objectClass: organizationalRole
cn: netbox
userPassword: {SSHA}...
```

### Configure LDAPS \{#configuring-ssltls\}

For production, configure LDAP over SSL/TLS:

**Active Directory:**
1. Install certificate on domain controllers
2. Verify LDAPS listening on port 636:
   ```bash
   openssl s_client -connect ldap.example.com:636
   ```

**OpenLDAP:**
1. Configure TLS in `slapd.conf` or `cn=config`
2. Specify certificate and key paths
3. Restart OpenLDAP service
4. Test: `openssl s_client -connect ldap.example.com:636`

### Identify DNs \{#identifying-user-and-group-dns\}

Find user and group search bases:

```bash
# Find user search base
ldapsearch -x -H ldap://your-server -b "dc=example,dc=com" "(objectClass=person)" dn

# Find group search base
ldapsearch -x -H ldap://your-server -b "dc=example,dc=com" "(objectClass=group)" dn

# Locate specific group DN
ldapsearch -x -H ldap://your-server -b "dc=example,dc=com" "(cn=Netbox Users)" dn
```

Document these values for NetBox configuration.

## NetBox Configuration \{#netbox-enterprise-configuration\}

Configure LDAP through Python configuration overrides and environment variables in the admin console.

Access admin console at `https://<cluster-host>:30000/` and navigate to **Config > Show Advanced Settings**.

### Python Configuration \{#python-configuration\}

Add to **NetBox Python Configuration Overrides**:

```python
# Enable LDAP authentication
REMOTE_AUTH_ENABLED = True
REMOTE_AUTH_BACKEND = 'netbox.authentication.LDAPBackend'
REMOTE_AUTH_AUTO_CREATE_USER = True
```

### Environment Variables \{#environment-variable-configuration\}

Add to **Environment Variables** section. All values must be quoted strings.

## Active Directory Configuration \{#active-directory-configuration\}

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

## OpenLDAP Configuration \{#openldap-configuration\}

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

## Configuration Parameters \{#configuration-parameters\}

### Server Connection \{#server-connection\}

**AUTH_LDAP_SERVER_URI:** LDAP server URL. Use `ldaps://` for SSL/TLS (recommended). Can specify multiple servers: `"ldaps://ldap1:636 ldaps://ldap2:636"`.

**AUTH_LDAP_BIND_DN:** Service account DN. Must have read access to users and groups.

**AUTH_LDAP_BIND_PASSWORD:** Service account password. Stored encrypted in NetBox configuration.

**LDAP_IGNORE_CERT_ERRORS:** Set to `"false"` for production (validate certificates). Set to `"true"` only for testing with self-signed certificates.

### Connection Options \{#connection-options\}

**AUTH_LDAP_CONNECTION_OPTIONS:** Python dictionary of LDAP options. `ldap.OPT_REFERRALS: 0` disables referrals (often required for Active Directory).

**AUTH_LDAP_CACHE_TIMEOUT:** Duration (seconds) to cache LDAP queries. Use `"0"` for testing, `"300"` or higher for production.

### User Search \{#user-search\}

**AUTH_LDAP_USER_SEARCH_ATTR:** LDAP attribute containing username. Active Directory: `"sAMAccountName"`. OpenLDAP: `"uid"`.

**AUTH_LDAP_USER_SEARCH_BASEDN:** Starting point for user searches.

**AUTH_LDAP_USER_SEARCH:** Complete LDAPSearch query. Format: `'LDAPSearch("base-dn", ldap.SCOPE_SUBTREE, "filter")'`. `%(user)s` is replaced with login username.

**Scope options:**
- `ldap.SCOPE_SUBTREE`: Search base DN and descendants (most common)
- `ldap.SCOPE_ONELEVEL`: Search only direct children
- `ldap.SCOPE_BASE`: Search only base DN

### Group Configuration \{#group-configuration\}

**AUTH_LDAP_GROUP_TYPE:** Defines LDAP group structure. Active Directory: `"NestedGroupOfNamesType"`. OpenLDAP: `"PosixGroupType"`. Other options: `"GroupOfNamesType"`, `"GroupOfUniqueNamesType"`.

**AUTH_LDAP_GROUP_SEARCH_BASEDN:** Starting point for group searches.

**AUTH_LDAP_FIND_GROUP_PERMS:** Set to `"true"` to enable group-based access control. Set to `"false"` for manual permission assignment only.

**AUTH_LDAP_MIRROR_GROUPS:** Set to `"true"` to automatically create NetBox groups matching LDAP groups. Set to `"false"` to manually manage NetBox groups.

**Important:** When enabled, NetBox groups must not already exist.

### Group Mapping \{#group-mapping\}

**AUTH_LDAP_REQUIRE_GROUP_DN:** LDAP group DN that users must belong to for access. Users not in this group cannot log in. Optional but recommended.

**AUTH_LDAP_IS_ADMIN_DN:** LDAP group DN for users who should have staff status. Members can access NetBox admin interface.

**AUTH_LDAP_IS_SUPERUSER_DN:** LDAP group DN for users who should have superuser status. Members have all permissions and unrestricted access. **Warning:** Exercise extreme caution.

## Deploy \{#deploying-configuration\}

1. Click **Save config**
2. Click **Go to updated version**
3. Click **Deploy**
4. Wait for Ready state

Configuration changes require application restart. Existing sessions remain active.

## Testing \{#testing-authentication\}

1. Log out of NetBox
2. Enter LDAP credentials:
   - Active Directory: Use `sAMAccountName` (typically without domain)
   - OpenLDAP: Use `uid`
3. Click **Log In**
4. Verify successful login
5. Navigate to **Admin > Users** to verify account creation

**Verify group membership** (if group mirroring enabled):
1. Navigate to **Admin > Users**
2. Locate LDAP user
3. Click username
4. Verify **Groups** section shows LDAP groups
5. Check **Staff status** if in admin group
6. Check **Superuser status** if in superuser group

## Group Mirroring vs Manual Groups \{#group-mirroring-vs-manual-groups\}

### Group Mirroring \{#group-mirroring-auth_ldap_mirror_groups-true\} (AUTH_LDAP_MIRROR_GROUPS: "true")

**How it works:** NetBox automatically creates groups matching LDAP group names. User LDAP group memberships synchronized to NetBox.

**Requirements:** NetBox groups must not exist before enabling. LDAP group names must be valid NetBox group names.

**Advantages:** Automatic synchronization, no manual group creation, memberships stay current.

**Disadvantages:** Less control over group names, permissions assigned after creation, all LDAP groups mirrored.

### Manual Group Management \{#manual-group-management-auth_ldap_mirror_groups-false\}

**How it works:** Create NetBox groups manually before configuring LDAP. Map LDAP groups to NetBox groups using group DNs.

**Advantages:** Full control over group names and permissions, selective mapping, cleaner structure.

**Disadvantages:** Manual setup required, additional configuration complexity.

**Recommended:** Use manual group management for production to maintain control over permissions.

## Troubleshooting \{#troubleshooting\}

:::info[kubectl Access]
Commands below require [cluster shell access](nbe-troubleshooting.md#command-line-access).

:::
### Cannot Connect to LDAP Server \{#cannot-connect-to-ldap-server\}

**Error:** Can't contact LDAP server / connection timeout

**Resolution:**

1. Verify network connectivity:
   ```bash
   kubectl exec <netbox-pod> -n kotsadm -- nc -zv ldap.example.com 636
   ```
2. Check LDAP server is listening (port 389 for LDAP, 636 for LDAPS)
3. Verify firewall rules allow outbound connections
4. Test LDAP server directly:
   ```bash
   ldapsearch -x -H ldaps://ldap.example.com -b "dc=example,dc=com" -D "cn=admin,dc=example,dc=com" -W
   ```
5. Verify DNS resolution:
   ```bash
   kubectl exec <netbox-pod> -n kotsadm -- nslookup ldap.example.com
   ```

### Bind Failure \{#bind-failure\}

**Error:** Invalid credentials in NetBox logs

**Resolution:**

1. Verify bind DN and password match service account exactly
2. Test credentials with ldapsearch:
   ```bash
   ldapsearch -x -H ldaps://ldap.example.com -D "cn=netbox,dc=example,dc=com" -W
   ```
3. Check service account permissions (must have read access)
4. Verify account not disabled or locked
5. Try different formats (Active Directory may require UPN: `netbox@example.com` or down-level: `DOMAIN\netbox`)

### User Not Found \{#user-not-found\}

**Error:** User not found in LDAP

**Resolution:**

1. Verify user search base includes user's organizational unit
2. Test search manually:
   ```bash
   ldapsearch -x -H ldaps://ldap.example.com -b "cn=Users,dc=example,dc=com" "(sAMAccountName=testuser)"
   ```
3. Check user search attribute matches login format (Active Directory: `sAMAccountName`, OpenLDAP: `uid`)
4. Verify search filter has correct syntax: `"(uid=%(user)s)"` (include parentheses)
5. Expand search scope to parent OU or domain root if needed

### SSL Certificate Errors \{#ssl-certificate-errors\}

**Error:** certificate verify failed / SSL: CERTIFICATE_VERIFY_FAILED

**Testing workaround:** Set `LDAP_IGNORE_CERT_ERRORS: "true"` to bypass validation.

**Production resolution:**

1. Install CA certificate in NetBox Enterprise's trusted certificates (contact NetBox Labs support)
2. Verify certificate:
   ```bash
   openssl s_client -connect ldap.example.com:636 -showcerts
   ```
   Check subject matches hostname, certificate not expired, signed by trusted CA.
3. Use certificate from trusted CA or add self-signed CA to trusted certificates

### Groups Not Syncing \{#groups-not-syncing\}

**Symptoms:** User logs in successfully but no group memberships in NetBox.

**Resolution:**

1. Verify `AUTH_LDAP_FIND_GROUP_PERMS: "true"`
2. Check group search base includes user's groups:
   ```bash
   ldapsearch -x -H ldaps://ldap.example.com -b "cn=Users,dc=example,dc=com" "(objectClass=group)"
   ```
3. Verify group type (Active Directory: `"NestedGroupOfNamesType"`, OpenLDAP: `"PosixGroupType"`)
4. Check NetBox logs:
   ```bash
   kubectl logs <netbox-pod> -n kotsadm | grep -i ldap
   ```
5. For group mirroring: Ensure `AUTH_LDAP_MIRROR_GROUPS: "true"` and NetBox groups do not already exist

### User Cannot Access NetBox \{#user-cannot-access-netbox\}

**Symptoms:** User logs in but sees "You do not have permission to access this page"

**Resolution:**

1. Check `AUTH_LDAP_REQUIRE_GROUP_DN`: User must be member of specified group
2. Verify user in required group:
   ```bash
   ldapsearch -x -H ldaps://ldap.example.com -b "cn=Netbox Users,cn=Users,dc=example,dc=com" "(member=cn=testuser,cn=Users,dc=example,dc=com)"
   ```
3. Verify NetBox groups have permissions (**Admin > Authentication > Groups**)
4. Check user **Active** flag (**Admin > Users**)
5. Assign permissions manually if not using group mappings

## Security Considerations \{#security-considerations\}

**Service Account:** Use dedicated account with minimum required permissions (read-only access to users and groups). Use strong password that does not expire. Rotate regularly. Monitor usage for anomalies.

**SSL/TLS Encryption:** LDAP credentials and queries are plain text without encryption. Always use LDAPS (ldaps://) in production. Never use plain LDAP for production. Validate SSL certificates (`LDAP_IGNORE_CERT_ERRORS: "false"`). Use certificates from trusted CAs. Ensure strong TLS versions (TLS 1.2+). Plain LDAP acceptable only for isolated test environments.

**Superuser Access:** Exercise extreme caution with `AUTH_LDAP_IS_SUPERUSER_DN`. Superusers have unrestricted access. Limit to small number of trusted administrators. Regularly audit superuser group membership in LDAP. Document all access grants. Consider privileged access management for temporary elevation.

**Group Access Control:** Use `AUTH_LDAP_REQUIRE_GROUP_DN` to restrict access. Create dedicated LDAP group for NetBox access. Regularly review group memberships. Remove access immediately for terminated employees.

**Audit Logging:** Monitor authentication events:
```bash
kubectl logs <netbox-pod> -n kotsadm | grep authentication
```

**Account Management:** User accounts created automatically on first login. Passwords never stored in NetBox (authenticated via LDAP). Disabling users in LDAP immediately prevents NetBox access. Deleting users from LDAP does not delete NetBox accounts. Consider periodic cleanup of orphaned accounts.

## Related Documentation \{#related-documentation\}

- [Microsoft Entra ID Single Sign-On](nbe-azure-sso.md)
- [SAML Single Sign-On](nbe-saml.md)
- [OpenID Connect (OIDC) SSO](nbe-oidc-sso.md)
- [NetBox LDAP Authentication Documentation](https://docs.netbox.dev/en/stable/administration/authentication/ldap/)
- [django-auth-ldap Documentation](https://django-auth-ldap.readthedocs.io/)
