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
title: SAML Group Mapping (v1.12)
description: >-
  Configure automatic permission assignment based on SAML identity provider
  group membership in NetBox Enterprise
versions:
  cloud: v1.10
  enterprise: v1.10
source: localdocs
lastUpdatedAt: 1764177275000
canonical: /docs/v1.12/enterprise/enterprise-features/nbe-saml-group-map/
---
# SAML Group Mapping

Configure NetBox Enterprise to automatically assign permissions and user flags based on SAML identity provider group membership. This guide builds on basic SAML authentication and enables group-based access control.

## Prerequisites

Before configuring SAML group mapping, ensure the following requirements are met:

**SAML SSO Configuration:**
- Basic SAML authentication must be working (see [SAML Single Sign-On](nbe-saml.md))
- Users can successfully log in via SAML
- Identity provider is configured with appropriate attribute mappings

**Identity Provider Requirements:**
- Ability to send group information in SAML assertions
- Group attribute configured and named `groups`
- Test users assigned to groups in the identity provider

**NetBox Enterprise Requirements:**
- NetBox Enterprise v1.10 or later
- Admin console access
- NetBox groups created and configured with appropriate permissions
- Understanding of NetBox permission model

**Important:** NetBox groups must exist before you configure mapping. Group mapping does not create NetBox groups automatically.

## Understanding SAML Group Mapping

When a user authenticates via SAML, the identity provider includes group membership information in the SAML assertion. NetBox Enterprise extracts this information and maps IdP groups to NetBox groups based on your configuration.

### How It Works

1. User authenticates via SAML identity provider
2. Identity provider generates SAML assertion with user attributes
3. SAML assertion includes a `groups` attribute containing group names
4. NetBox Enterprise receives and validates the SAML assertion
5. NetBox clears the user's existing group memberships
6. NetBox maps IdP group names to NetBox groups based on configuration
7. NetBox sets user flags (`is_staff`, `is_superuser`) based on group membership
8. User receives permissions from their assigned NetBox groups

### Group Identifiers

Unlike Azure AD group mapping (which uses object IDs), SAML group mapping uses **group names** as identifiers. The identity provider sends group names as strings in the SAML assertion.

**Example:**
```json
{
  "attributes": {
    "groups": [
      "Network Administrators",
      "Network Engineers",
      "All Employees"
    ]
  }
}
```

Group names are case-sensitive and must match exactly between the IdP and NetBox configuration.

### Groups Attribute Requirement

NetBox Enterprise expects group information in a SAML attribute named `groups`. If your identity provider uses a different attribute name (such as `MemberOf`, `roles`, or `memberOf`), you must reconfigure your IdP to use `groups`.

**Common attribute names by provider:**
- **Okta**: Configurable (set to `groups`)
- **Microsoft Entra ID**: Configurable (set to `groups`)
- **OneLogin**: Often `MemberOf` (must change to `groups`)
- **Auth0**: Often `roles` (must change to `groups`)

## Identity Provider Configuration

Configure your SAML identity provider to include group information in authentication assertions.

### Configuring Group Attributes

The steps to send group information vary by provider:

**Okta:**

1. Navigate to **Applications > [Your App] > SAML Settings**
2. In the **Attribute Statements** section (or **Group Attribute Statements**), add:
   - Name: `groups`
   - Name format: `Unspecified`
   - Filter: `Matches regex: .*` (sends all groups)
     - Or use a specific filter like `Starts with: NetBox` (sends only groups starting with "NetBox")
3. Save the configuration

**Microsoft Entra ID:**

1. Navigate to **Enterprise applications > [Your App] > Single sign-on**
2. Edit **Attributes & Claims**
3. Add a group claim:
   - Name: `groups`
   - Source attribute: `user.assignedgroups` or `user.groups`
   - Emit as: `sAMAccountName` (sends group names, not object IDs)
4. Select which groups to include:
   - Groups assigned to the application (recommended)
   - All groups
   - Security groups only
5. Save the configuration

**OneLogin:**

1. Navigate to **Applications > [Your App] > Parameters**
2. Add a new parameter:
   - Field name: `groups`
   - Flags: Check **Include in SAML assertion**
   - Value: Select **User Roles** or **Multi-value parameter**
3. Map the parameter to the user's group memberships
4. Save the configuration

**Auth0:**

1. Navigate to **Applications > [Your App] > Addons > SAML2 Web App**
2. In the **Settings** tab, modify the mappings:
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
3. Ensure the Auth0 user profile includes group information
4. Save the configuration

### Verifying Group Attribute

After configuring your IdP, verify that groups are included in SAML assertions:

1. Use a SAML tracer browser extension (e.g., SAML-tracer for Firefox/Chrome)
2. Attempt a test login via SAML
3. Capture the SAML response
4. Verify the response includes an attribute named `groups`
5. Verify the `groups` attribute contains the expected group names

**Example SAML assertion snippet:**
```xml
<saml:Attribute Name="groups">
  <saml:AttributeValue>Network Administrators</saml:AttributeValue>
  <saml:AttributeValue>Network Engineers</saml:AttributeValue>
</saml:Attribute>
```

## NetBox Enterprise Configuration

Configure group mapping through the NetBox Enterprise admin console by modifying the authentication pipeline and adding group mapping configuration.

### Accessing Configuration

1. Access the admin console at `https://<your-cluster-host-or-ip>:30000/`
2. Navigate to the **Config** tab
3. Enable **Show Advanced Settings**
4. Locate the **NetBox Python Configuration Overrides** section

### Complete Configuration

Add the following configuration, including both basic SAML settings and group mapping configuration:

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
        "name": "<your-organization-name>",
        "displayname": "<your-organization-display-name>",
        "url": "<your-organization-website>",
    }
}

SOCIAL_AUTH_SAML_TECHNICAL_CONTACT = {
    "givenName": "Technical Support",
    "emailAddress": "<technical-contact-email>"
}

SOCIAL_AUTH_SAML_SUPPORT_CONTACT = {
    "givenName": "Support Team",
    "emailAddress": "<support-contact-email>"
}

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

### Configuration Parameters

**SOCIAL_AUTH_PIPELINE**
- Defines the authentication pipeline steps
- Must include `'nbc_auth_extensions.saml_authentication.saml_map_groups'` as the final step
- Do not modify the order of other pipeline steps

**SOCIAL_AUTH_PIPELINE_CONFIG**
- Container for all group mapping configuration
- Must include both `SAML_USER_FLAGS_BY_GROUP` and `SAML_GROUP_MAP` keys

**SAML_USER_FLAGS_BY_GROUP**
- Maps IdP group names to NetBox user flags
- `is_staff`: Grants access to the NetBox admin interface (list of group names)
- `is_superuser`: Grants all permissions and superuser status (list of group names)
- Users in multiple mapped groups will have the highest privilege level
- **Warning:** Exercise extreme caution when assigning superuser status

**SAML_GROUP_MAP**
- Maps IdP group names to NetBox group names
- Keys: IdP group names (strings, case-sensitive)
- Values: NetBox group names (must match exactly)
- NetBox groups must already exist before mapping

### Configuration Example

A practical example for a typical deployment:

```python
SOCIAL_AUTH_PIPELINE_CONFIG = {
    'SAML_USER_FLAGS_BY_GROUP': {
        'is_staff': [
            'NetBox Admins',
            'NetBox Superusers'
        ],
        'is_superuser': [
            'NetBox Superusers'
        ]
    },
    'SAML_GROUP_MAP': {
        'NetBox Admins': 'Network Admins',
        'NetBox Engineers': 'Network Engineers',
        'NetBox Viewers': 'Read Only Users'
    }
}
```

In this example:
- Members of "NetBox Admins" or "NetBox Superusers" IdP groups can access the admin interface
- Members of "NetBox Superusers" IdP group become NetBox superusers
- Three IdP groups are mapped to corresponding NetBox groups

**Important notes:**
- IdP group names are on the left (keys in SAML_GROUP_MAP)
- NetBox group names are on the right (values in SAML_GROUP_MAP)
- All names are case-sensitive strings
- Names must match exactly

### Deploying Configuration

After adding configuration:

1. Scroll to the bottom of the Config page
2. Click **Save config**
3. Click **Go to updated version** when prompted
4. Click **Deploy** to apply changes
5. Wait for NetBox Enterprise to reach **Ready** state

Configuration changes require application restart. Existing user sessions remain active during deployment.

## Creating NetBox Groups

Before group mapping can function, you must create NetBox groups and assign appropriate permissions.

### Creating Groups

1. Navigate to **Admin > Authentication > Groups** in NetBox
2. Click **Add Group**
3. Configure the group:
   - **Name**: Must match exactly the name used in `SAML_GROUP_MAP`
   - **Permissions**: Select specific permissions for this group
4. Click **Save**

### Assigning Permissions

NetBox uses a fine-grained permission model. For each group, assign permissions based on the principle of least privilege:

**Common Permission Patterns:**

**Read Only Users:**
- View permissions for all relevant object types (dcim, ipam, circuits, etc.)
- No add, change, or delete permissions

**Network Engineers:**
- View permissions for all object types
- Add, change, and delete permissions for devices, interfaces, IP addresses
- Limited or no permissions for administrative functions

**Network Admins:**
- All permissions for network-related objects
- View permissions for administrative objects
- May include some admin permissions like managing users

**Superusers:**
- Assigned via `is_superuser` flag, not group permissions
- Have all permissions automatically

### Verifying Group Configuration

After creating groups:

1. Navigate to **Admin > Authentication > Groups**
2. Verify all groups referenced in `SAML_GROUP_MAP` exist
3. Click each group name to verify permissions are assigned correctly
4. Document which IdP groups map to which NetBox groups

## Testing Group Mapping

After configuring group mapping, test that permissions are assigned correctly.

### Initial Test

1. Identify a test user who is a member of mapped IdP groups
2. Verify the test user's group memberships in your identity provider
3. Log out of NetBox if currently authenticated
4. Log in via SAML as the test user
5. After successful authentication, verify you are logged in

### Verifying User Flags

Check that user flags were set correctly:

1. Navigate to **Admin > Authentication > Users** (requires admin access)
2. Locate the test user in the user list
3. Click the username to view user details
4. Verify the following:
   - **Staff status**: Should be checked if user is in an `is_staff` group
   - **Superuser status**: Should be checked if user is in an `is_superuser` group
   - **Active**: Should be checked (enabled by default)

### Verifying Group Membership

Check that NetBox groups were assigned correctly:

1. In the user details page, scroll to the **Groups** section
2. Verify the user is a member of expected NetBox groups
3. Group memberships should match the user's IdP groups based on your mapping configuration

**Example:**
- IdP groups: "NetBox Admins", "NetBox Engineers"
- Expected NetBox groups: "Network Admins", "Network Engineers"

### Verifying Permissions

Test that permissions are functional:

1. Log in as the test user (if not already logged in)
2. Attempt to access functionality that should be permitted
3. Attempt to access functionality that should be denied
4. Verify permission enforcement matches expectations

**Common Tests:**
- Read only users should be able to view but not edit devices
- Engineers should be able to create and modify devices
- Admins should be able to access the admin interface
- Superusers should have unrestricted access

### Testing Group Membership Updates

Group membership is refreshed on each login. To test updates:

1. Add the test user to a new IdP group
2. Add the new IdP group to your `SAML_GROUP_MAP` configuration
3. Deploy the updated configuration
4. Log out and log back in as the test user
5. Verify the new NetBox group appears in the user's group memberships

## Group Membership Behavior

Understanding how NetBox handles group membership is important for managing access control.

### Group Synchronization

On each login:
1. NetBox extracts the `groups` attribute from the SAML assertion
2. NetBox removes all existing group memberships for the user
3. NetBox adds new group memberships based on current IdP groups
4. User flags (`is_staff`, `is_superuser`) are updated based on current groups

**Important:** Group memberships are cleared and rebuilt on each login. Any manually assigned groups will be removed.

### Manual Group Assignments

Do not manually assign groups to SAML-authenticated users in NetBox:
- Manual assignments will be removed on next login
- Group assignments are managed exclusively through the IdP
- To grant access, add users to appropriate IdP groups

### Multiple Mapped Groups

If a user is in multiple mapped IdP groups:
- The user will be added to all corresponding NetBox groups
- Permissions are additive (union of all group permissions)
- User flags use the highest privilege level (if any group grants `is_superuser`, the user becomes a superuser)

### Unmapped Groups

If a user is in IdP groups that are not in `SAML_GROUP_MAP`:
- Those groups are ignored by NetBox
- User is not added to any NetBox group for unmapped IdP groups
- Only explicitly mapped groups affect NetBox permissions

## Troubleshooting

### Groups Not Syncing

**Symptoms:**
- User logs in successfully via SAML
- NetBox groups do not match IdP groups
- User has no group memberships after login

**Resolution:**

1. **Verify groups attribute is configured in IdP:**
   - Check that the IdP sends a `groups` attribute in SAML assertions
   - Use a SAML tracer to inspect the actual assertion
   - Attribute must be named `groups` (not `MemberOf`, `roles`, etc.)

2. **Check NetBox logs for errors:**
   ```shell
   kubectl logs <netbox-pod> -n kotsadm | grep -i "saml.*group"
   ```
   Look for errors related to group mapping or missing attributes.

3. **Verify pipeline configuration:**
   - Check that `'nbc_auth_extensions.saml_authentication.saml_map_groups'` is included in `SOCIAL_AUTH_PIPELINE`
   - Verify it is the last step in the pipeline

4. **Test with a user who has groups:**
   - Verify the test user is actually a member of groups in the IdP
   - Empty group membership in IdP will result in no NetBox groups

### Groups Attribute Name Mismatch

**Symptoms:**
- Groups are configured in IdP but not syncing
- NetBox logs show empty or missing groups attribute
- Group mapping configuration appears correct

**Resolution:**

Your identity provider may be using a different attribute name for groups. Common alternatives:
- `MemberOf`
- `roles`
- `memberOf`
- `group`

**Solution:**
Reconfigure your identity provider to use `groups` as the attribute name. NetBox Enterprise expects this specific name and does not support alternative attribute names without code modifications.

**For each provider:**
- **Okta**: Edit the attribute statement name to `groups`
- **Entra ID**: Set claim name to `groups` in Attributes & Claims
- **OneLogin**: Change parameter field name to `groups`
- **Auth0**: Update mappings to use `groups` key

### NetBox Groups Not Found

**Symptoms:**
- NetBox logs show: "group not found locally"
- User logs in successfully but is not added to any groups
- Some groups work but others do not

**Resolution:**

1. **Verify NetBox groups exist:**
   - Navigate to **Admin > Authentication > Groups** in NetBox
   - Verify each group referenced in `SAML_GROUP_MAP` exists
   - Group names must match exactly (case-sensitive)

2. **Check for typos:**
   - Common issues: extra spaces, capitalization differences
   - NetBox group name: "Network Admins" (with space)
   - Configuration: `'NetworkAdmins'` (no space) - this will not match

3. **Create missing groups:**
   - For each group referenced in configuration, create a corresponding NetBox group
   - Assign appropriate permissions to each group

### Case Sensitivity Issues

**Symptoms:**
- Configuration appears correct but groups not mapping
- NetBox logs show groups not found

**Resolution:**

Group names are case-sensitive in SAML group mapping. Verify exact capitalization:

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

**Debugging steps:**
1. Check NetBox logs to see actual group names received from IdP
2. Compare with your configuration
3. Update configuration to match exact capitalization

### Permissions Not Applied

**Symptoms:**
- User is added to NetBox groups successfully
- User does not have expected permissions
- "You do not have permission to access this page" errors

**Resolution:**

1. **Verify group permissions:**
   - Navigate to **Admin > Authentication > Groups**
   - Click each group name
   - Verify permissions are assigned to the group
   - Empty groups grant no permissions

2. **Check user flags:**
   - Navigate to **Admin > Authentication > Users**
   - Locate the user
   - Verify **Active** is checked (required for all access)
   - Verify **Staff status** is checked if user needs admin access

3. **Review permission requirements:**
   - Different NetBox features require different permissions
   - Admin interface requires `is_staff` flag
   - Some actions require multiple permissions (view and change)

### Configuration Not Taking Effect

**Symptoms:**
- Configuration updated but behavior unchanged
- Old group mappings still in effect

**Resolution:**

1. **Verify configuration was deployed:**
   - Check that you clicked **Save config** and **Deploy**
   - Verify NetBox Enterprise reached **Ready** state after deployment

2. **Check for configuration errors:**
   - Review the Config page for syntax errors
   - Python syntax errors may prevent configuration from loading
   - Verify `SAML_USER_FLAGS_BY_GROUP` uses lists, not sets:
     - Correct: `'is_staff': ['Group1', 'Group2']`
     - Incorrect: `'is_staff': {'Group1', 'Group2'}`

3. **Force a re-login:**
   - Log out of NetBox completely
   - Clear browser cookies for the NetBox domain
   - Log in again via SAML
   - Group mappings are applied at login time

## Security Considerations

### Superuser Assignment

Exercise extreme caution when configuring `is_superuser` groups:

- Superusers have unrestricted access to NetBox
- Superusers can modify any data, including configuration
- Superusers can elevate other users to superuser status
- Superusers can access the Django admin interface

**Recommendations:**
- Limit `is_superuser` to a small, well-controlled IdP group
- Regularly audit membership of superuser groups
- Use group-based permissions for most users instead of superuser status
- Document who has superuser access and why

### Group Membership Synchronization

Group memberships are synchronized on each login:

- Removing a user from an IdP group immediately revokes their NetBox access on next login
- Adding a user to an IdP group immediately grants access on next login
- Users may retain access until their session expires if removed from groups
- Consider forcing re-authentication for terminated employees

### Group Name Management

Group names in SAML assertions are visible to users:

- Use professional, descriptive group names
- Avoid embedding sensitive information in group names
- Consider using dedicated groups for NetBox access (e.g., prefix with "NetBox")
- Document group purposes and permission levels

### Audit Logging

All group mapping operations are logged:

- Log entries include user, groups added, and user flags set
- Logs are written to the NetBox application log
- Monitor logs for unexpected group assignments
- Review logs during security audits

**View group mapping logs:**
```shell
kubectl logs <netbox-pod> -n kotsadm | grep "SAML group mapping"
```

### Privileged Access Management

Consider implementing privileged access management:

- Use IdP access request workflows for temporary superuser access
- Require approval workflows for adding users to superuser groups
- Implement just-in-time access for administrative operations
- Regularly review group memberships and access patterns

## Related Documentation

- [SAML Single Sign-On](nbe-saml.md) - Configure basic SAML authentication
- [Microsoft Entra ID Group Mapping](nbe-azure-group-mapping.md) - Alternative group mapping using Azure AD
- [OpenID Connect (OIDC) SSO](nbe-oidc-sso.md) - Alternative OAuth 2.0 configuration
- [LDAP Authentication](nbe-ldap.md) - Alternative authentication method using LDAP

## Additional Resources

- [SAML 2.0 Specification](https://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)
- [Python Social Auth Pipeline](https://python-social-auth.readthedocs.io/en/latest/pipeline.html)
- [Okta Group Attribute Statements](https://help.okta.com/en-us/Content/Topics/Apps/Apps_App_Integration_Wizard_SAML.htm)
- [Microsoft Entra SAML Group Claims](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-fed-group-claims)
