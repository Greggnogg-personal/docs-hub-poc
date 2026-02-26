---
tags:
  - administration
  - authentication
  - cloud
  - enterprise
  - netbox
  - sso
category: enterprise-documentation
audience: administrators
complexity: intermediate
title: 'NetBox Enterprise: SAML Group Mapping'
description: >-
  Configure automatic permission assignment based on SAML identity provider
  group membership in NetBox Enterprise
versions:
  cloud: v1.10
  enterprise: v1.10
source: localdocs
lastUpdatedAt: 1765492231000
canonical: /docs/enterprise/enterprise-features/nbe-saml-group-map/
---
# SAML Group Mapping

Configure NetBox Enterprise to automatically assign permissions and user flags based on SAML identity provider group membership.

## Overview

When users authenticate via SAML, the identity provider sends group membership information in assertions. NetBox maps IdP groups to NetBox groups, automatically assigning permissions based on your configuration.

Group mapping requires basic SAML authentication to be working first. See [SAML Single Sign-On](nbe-saml.md).

### Before You Begin \{#prerequisites\}

**Requirements:**
- Basic SAML authentication working (users can log in)
- Identity provider configured to send `groups` attribute in SAML assertions
- NetBox Enterprise v1.10 or later with admin console access
- NetBox groups created with appropriate permissions

**Important:** NetBox groups must exist before configuring mapping. Group mapping does not create groups automatically.

## How It Works \{#understanding-saml-group-mapping\}

1. User authenticates via SAML
2. IdP includes `groups` attribute in SAML assertion (list of group names)
3. NetBox validates assertion
4. NetBox clears user's existing group memberships
5. NetBox maps IdP groups to NetBox groups based on configuration
6. NetBox sets user flags (`is_staff`, `is_superuser`) based on group membership
7. User receives permissions from assigned NetBox groups

### Group Identifiers \{#group-identifiers\}

SAML group mapping uses **group names** as identifiers (unlike Azure AD which uses object IDs). IdP sends group names as strings in the SAML assertion. Names are case-sensitive and must match exactly.

**Example assertion:**
```json
{
  "attributes": {
    "groups": ["Network Administrators", "Network Engineers", "All Employees"]
  }
}
```

### Groups Attribute Requirement \{#groups-attribute-requirement\}

NetBox expects a `groups` attribute. If your IdP uses a different name (`MemberOf`, `roles`, `memberOf`), reconfigure your IdP to use `groups`.

| Provider | Default | Change To |
|----------|---------|-----------|
| Okta | Configurable | Set to `groups` |
| Entra ID | Configurable | Set to `groups` |
| OneLogin | Often `MemberOf` | Change to `groups` |
| Auth0 | Often `roles` | Change to `groups` |

## Identity Provider Configuration \{#identity-provider-configuration\}

Configure your IdP to include group information in SAML assertions.

### Okta

1. Navigate to **Applications > [App] > SAML Settings**
2. Add group attribute statement:
   - Name: `groups`
   - Name format: `Unspecified`
   - Filter: `Matches regex: .*` (all groups) or `Starts with: NetBox` (filtered)

### Microsoft Entra ID

1. Navigate to **Enterprise apps > [App] > Single sign-on > Attributes & Claims**
2. Add group claim:
   - Name: `groups`
   - Source: `user.assignedgroups` or `user.groups`
   - Emit as: `sAMAccountName` (group names, not object IDs)
   - Include: Groups assigned to application (recommended) or all groups

### OneLogin

1. Navigate to **Applications > [App] > Parameters**
2. Add parameter:
   - Field name: `groups`
   - Flags: Check **Include in SAML assertion**
   - Value: **User Roles** or **Multi-value parameter**

### Auth0

1. Navigate to **Applications > [App] > Addons > SAML2 Web App > Settings**
2. Modify mappings:
   ```json
   {
     "mappings": {
       "email": "email",
       "first_name": "given_name",
       "last_name": "family_name",
       "groups": "groups"
     }
   }
   ```

### Verify Groups Attribute \{#verifying-group-attribute\}

Use a SAML tracer browser extension:
1. Attempt test login
2. Capture SAML response
3. Verify response includes `groups` attribute with expected group names

**Example SAML assertion:**
```xml
<saml:Attribute Name="groups">
  <saml:AttributeValue>Network Administrators</saml:AttributeValue>
  <saml:AttributeValue>Network Engineers</saml:AttributeValue>
</saml:Attribute>
```

## NetBox Configuration \{#netbox-enterprise-configuration\}

Access admin console at `https://<cluster-host>:30000/` and navigate to **Config > Show Advanced Settings > NetBox Python Configuration Overrides**.

### Complete Configuration \{#complete-configuration\}

Add to existing SAML configuration:

```python
# Basic SAML authentication (from nbe-saml.md)
REMOTE_AUTH_ENABLED = True
REMOTE_AUTH_AUTO_CREATE_USER = True
REMOTE_AUTH_BACKEND = 'social_core.backends.saml.SAMLAuth'
SOCIAL_AUTH_REDIRECT_IS_HTTPS = True

SOCIAL_AUTH_SAML_SP_ENTITY_ID = "https://<your-netbox-domain>"
SOCIAL_AUTH_SAML_SP_PUBLIC_CERT = """-----BEGIN CERTIFICATE-----
<your-certificate-data>
-----END CERTIFICATE-----"""
SOCIAL_AUTH_SAML_SP_PRIVATE_KEY = """-----BEGIN PRIVATE KEY-----
<your-private-key-data>
-----END PRIVATE KEY-----"""

SOCIAL_AUTH_SAML_ORG_INFO = {
    "en-US": {
        "name": "<organization-name>",
        "displayname": "<organization-display-name>",
        "url": "<organization-website>",
    }
}

SOCIAL_AUTH_SAML_TECHNICAL_CONTACT = {
    "givenName": "Technical Support",
    "emailAddress": "<technical-email>"
}

SOCIAL_AUTH_SAML_SUPPORT_CONTACT = {
    "givenName": "Support Team",
    "emailAddress": "<support-email>"
}

SOCIAL_AUTH_SAML_ENABLED_IDPS = {
    "default": {
        "entity_id": "<idp-entity-id>",
        "url": "<idp-sso-url>",
        "x509cert": "<idp-certificate>",
        "attr_user_permanent_id": "email",
        "attr_first_name": "first_name",
        "attr_last_name": "last_name",
        "attr_username": "email",
        "attr_email": "email",
    }
}

# Authentication pipeline with group mapping
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
    'nbc_auth_extensions.saml_authentication.saml_map_groups',
)

# Group mapping configuration
SOCIAL_AUTH_PIPELINE_CONFIG = {
    'SAML_USER_FLAGS_BY_GROUP': {
        'is_staff': ['idp-staff-group-name'],
        'is_superuser': ['idp-superuser-group-name']
    },
    'SAML_GROUP_MAP': {
        'idp-group-name-1': 'netbox-group-name-1',
        'idp-group-name-2': 'netbox-group-name-2'
    }
}
```

### Configuration Parameters \{#configuration-parameters\}

**SOCIAL_AUTH_PIPELINE:** Authentication pipeline steps. Must include `'nbc_auth_extensions.saml_authentication.saml_map_groups'` as final step. Do not modify order of other steps.

**SOCIAL_AUTH_PIPELINE_CONFIG:** Container for group mapping. Must include both `SAML_USER_FLAGS_BY_GROUP` and `SAML_GROUP_MAP`.

**SAML_USER_FLAGS_BY_GROUP:** Maps IdP group names to NetBox user flags.
- `is_staff`: Grants admin interface access (list of group names)
- `is_superuser`: Grants all permissions and superuser status (list of group names)
- Users in multiple mapped groups receive highest privilege level
- **Warning:** Exercise extreme caution with superuser status

**SAML_GROUP_MAP:** Maps IdP group names to NetBox group names.
- Keys: IdP group names (case-sensitive strings)
- Values: NetBox group names (must match exactly)
- NetBox groups must already exist

### Configuration Example \{#configuration-example\}

```python
SOCIAL_AUTH_PIPELINE_CONFIG = {
    'SAML_USER_FLAGS_BY_GROUP': {
        'is_staff': ['NetBox Admins', 'NetBox Superusers'],
        'is_superuser': ['NetBox Superusers']
    },
    'SAML_GROUP_MAP': {
        'NetBox Admins': 'Network Admins',
        'NetBox Engineers': 'Network Engineers',
        'NetBox Viewers': 'Read Only Users'
    }
}
```

In this example:
- Members of "NetBox Admins" or "NetBox Superusers" can access admin interface
- Members of "NetBox Superusers" become superusers
- Three IdP groups map to NetBox groups

**Note:** IdP group names (keys) map to NetBox group names (values). All names are case-sensitive.

### Deploy \{#deploying-configuration\}

1. Click **Save config**
2. Click **Go to updated version**
3. Click **Deploy**
4. Wait for Ready state

## Create NetBox Groups \{#creating-netbox-groups\}

Before group mapping works, create NetBox groups with appropriate permissions.

### Create Groups \{#creating-groups\}

1. Navigate to **Admin > Authentication > Groups**
2. Click **Add Group**
3. Configure:
   - **Name:** Must match name in `SAML_GROUP_MAP` exactly
   - **Permissions:** Select specific permissions
4. Click **Save**

### Assign Permissions \{#assigning-permissions\}

Assign permissions based on principle of least privilege:

**Read Only Users:**
- View permissions for relevant object types

**Network Engineers:**
- View permissions for all object types
- Add, change, delete for devices, interfaces, IP addresses

**Network Admins:**
- All permissions for network objects
- View permissions for administrative objects

**Superusers:**
- Assigned via `is_superuser` flag (not group permissions)
- Have all permissions automatically

### Verify Groups \{#verifying-group-configuration\}

1. Navigate to **Admin > Authentication > Groups**
2. Verify all groups in `SAML_GROUP_MAP` exist
3. Click each group to verify permissions
4. Document IdP to NetBox group mappings

## Testing \{#testing-group-mapping\}

### Initial Test \{#initial-test\}

1. Identify test user with mapped IdP group memberships
2. Verify user group memberships in IdP
3. Log out of NetBox
4. Log in via SAML as test user

### Verify User Flags \{#verifying-user-flags\}

1. Navigate to **Admin > Authentication > Users**
2. Locate test user
3. Click username
4. Verify:
   - **Staff status:** Checked if user in `is_staff` group
   - **Superuser status:** Checked if user in `is_superuser` group
   - **Active:** Checked (default)

### Verify Group Membership \{#verifying-group-membership\}

1. In user details page, scroll to **Groups** section
2. Verify user is member of expected NetBox groups
3. Group memberships should match IdP groups based on mapping

### Verify Permissions \{#verifying-permissions\}

Test permission enforcement:
1. Log in as test user
2. Attempt permitted operations (should succeed)
3. Attempt denied operations (should fail)

**Common tests:**
- Read-only: Can view but not edit devices
- Engineers: Can create and modify devices
- Admins: Can access admin interface
- Superusers: Unrestricted access

### Test Group Updates \{#testing-group-membership-updates\}

Group membership refreshes on each login:
1. Add test user to new IdP group
2. Add new group to `SAML_GROUP_MAP`
3. Deploy updated configuration
4. Log out and log in
5. Verify new NetBox group appears in memberships

## Group Membership Behavior \{#group-membership-behavior\}

### Synchronization \{#group-synchronization\}

On each login:
1. NetBox extracts `groups` from SAML assertion
2. NetBox removes all existing group memberships
3. NetBox adds new memberships based on current IdP groups
4. User flags updated based on current groups

**Important:** Group memberships are cleared and rebuilt on each login. Manual assignments will be removed.

### Manual Assignments \{#manual-group-assignments\}

Do not manually assign groups to SAML users in NetBox. Manual assignments are removed on next login. To grant access, add users to appropriate IdP groups.

### Multiple Groups \{#multiple-mapped-groups\}

If user is in multiple mapped IdP groups:
- User added to all corresponding NetBox groups
- Permissions are additive (union of all group permissions)
- User flags use highest privilege (any `is_superuser` group makes user superuser)

### Unmapped Groups \{#unmapped-groups\}

IdP groups not in `SAML_GROUP_MAP` are ignored. User not added to NetBox groups for unmapped IdP groups.

## Troubleshooting \{#troubleshooting\}

:::info[kubectl Access]
Commands below require [cluster shell access](nbe-troubleshooting.md#command-line-access).

:::
### Groups Not Syncing \{#groups-not-syncing\}

**Symptoms:** User logs in but NetBox groups do not match IdP groups.

**Resolution:**

1. Verify IdP sends `groups` attribute (use SAML tracer)
2. Check NetBox logs:
   ```bash
   kubectl logs <netbox-pod> -n kotsadm | grep -i "saml.*group"
   ```
3. Verify pipeline includes `'nbc_auth_extensions.saml_authentication.saml_map_groups'` as final step
4. Test with user who has IdP group memberships

### Groups Attribute Name Mismatch \{#groups-attribute-name-mismatch\}

**Symptoms:** Groups configured in IdP but not syncing.

**Cause:** IdP using different attribute name (`MemberOf`, `roles`, `memberOf`, `group`).

**Resolution:** Reconfigure IdP to use `groups` as attribute name. NetBox expects this specific name.

### NetBox Groups Not Found \{#netbox-groups-not-found\}

**Symptoms:** Logs show "group not found locally."

**Resolution:**

1. Verify NetBox groups exist (**Admin > Authentication > Groups**)
2. Check names match exactly (case-sensitive)
3. Common issues: Extra spaces, capitalization differences
4. Create missing groups with appropriate permissions

### Case Sensitivity Issues \{#case-sensitivity-issues\}

**Symptoms:** Configuration appears correct but groups not mapping.

**Resolution:**

Group names are case-sensitive. Verify exact capitalization:

**Incorrect:**
```python
'SAML_GROUP_MAP': {
    'network admins': 'Network Admins',  # IdP sends "Network Admins"
}
```

**Correct:**
```python
'SAML_GROUP_MAP': {
    'Network Admins': 'Network Admins',  # Exact match
}
```

Check logs for actual group names received from IdP and update configuration to match.

### Permissions Not Applied \{#permissions-not-applied\}

**Symptoms:** User in NetBox groups but no expected permissions.

**Resolution:**

1. Verify group permissions (**Admin > Authentication > Groups**)
2. Check user **Active** flag (required for access)
3. Check **Staff status** if admin access needed
4. Empty groups grant no permissions

### Configuration Not Taking Effect \{#configuration-not-taking-effect\}

**Symptoms:** Configuration updated but behavior unchanged.

**Resolution:**

1. Verify configuration was deployed (clicked **Save config** and **Deploy**)
2. Check for Python syntax errors in configuration
3. Verify `SAML_USER_FLAGS_BY_GROUP` uses lists: `['Group1', 'Group2']` (not sets)
4. Force re-login: Log out, clear cookies, log in again

## Security Considerations \{#security-considerations\}

**Superuser Assignment:** Exercise extreme caution with `is_superuser` groups. Superusers have unrestricted access and can modify any data. Limit to small, well-controlled IdP group. Regularly audit membership.

**Group Synchronization:** Group memberships sync on each login. Removing user from IdP group revokes NetBox access on next login. Users may retain access until session expires. Consider forcing re-authentication for terminated employees.

**Group Names:** Group names are visible to users. Use professional, descriptive names. Avoid embedding sensitive information. Consider using dedicated groups for NetBox access (e.g., prefix with "NetBox").

**Audit Logging:** All group mapping operations are logged. Monitor logs for unexpected assignments:
```bash
kubectl logs <netbox-pod> -n kotsadm | grep "SAML group mapping"
```

**Privileged Access:** Consider implementing:
- IdP access request workflows for temporary superuser access
- Approval workflows for superuser group additions
- Just-in-time access for administrative operations
- Regular reviews of group memberships and access patterns

## Related Documentation \{#related-documentation\}

- [SAML Single Sign-On](nbe-saml.md)
- [Microsoft Entra ID Group Mapping](nbe-azure-group-mapping.md)
- [OpenID Connect (OIDC) SSO](nbe-oidc-sso.md)
- [LDAP Authentication](nbe-ldap.md)
- [Python Social Auth Pipeline](https://python-social-auth.readthedocs.io/en/latest/pipeline.html)
