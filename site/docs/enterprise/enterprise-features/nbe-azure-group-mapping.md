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
title: 'NetBox Enterprise: Microsoft Entra ID Group Mapping'
description: >-
  Configure automatic permission assignment based on Microsoft Entra ID group
  membership in NetBox Enterprise
versions:
  cloud: v1.10
  enterprise: v1.10
source: localdocs
lastUpdatedAt: 1763135515000
canonical: /docs/enterprise/enterprise-features/nbe-azure-group-mapping/
---
# Microsoft Entra ID Group Mapping

Configure NetBox Enterprise to automatically assign permissions and user flags based on Microsoft Entra ID (formerly Azure Active Directory) group membership. This guide builds on basic SSO authentication and enables group-based access control.

## Prerequisites

Before configuring group mapping, ensure the following requirements are met:

**Microsoft Entra ID SSO Configuration:**
- Basic SSO authentication must be working (see [Microsoft Entra ID Single Sign-On](nbe-azure-sso.md))
- Users can successfully log in via Entra ID
- App registration is configured with appropriate redirect URIs

**Microsoft Entra ID Requirements:**
- Optional claims configured to include groups in tokens
- Azure AD group object IDs for groups you want to map
- Access to view group memberships in Entra ID

**NetBox Enterprise Requirements:**
- NetBox Enterprise v1.10 or later
- Admin console access
- NetBox groups created and configured with appropriate permissions
- Understanding of NetBox permission model

**Important:** NetBox groups must exist before you configure mapping. Group mapping does not create NetBox groups automatically.

## Understanding Group Mapping

When a user authenticates via Microsoft Entra ID, NetBox Enterprise queries the Microsoft Graph API to retrieve the user's group memberships. The authentication pipeline then maps Azure AD groups to NetBox groups based on your configuration.

### How It Works

1. User authenticates via Microsoft Entra ID OAuth 2.0
2. NetBox Enterprise receives an access token from Azure AD
3. NetBox queries Microsoft Graph API endpoint: `users/{user-id}/transitiveMemberOf`
4. Microsoft returns all groups the user belongs to (including nested groups)
5. NetBox clears the user's existing group memberships
6. NetBox maps Azure AD group IDs to NetBox groups based on configuration
7. NetBox sets user flags (`is_staff`, `is_superuser`) based on group membership
8. User receives permissions from their assigned NetBox groups

### Microsoft Graph API Integration

NetBox Enterprise uses the Microsoft Graph API to retrieve group information:

**API Endpoint:**
```
https://graph.microsoft.com/v1.0/users/{user-id}/transitiveMemberOf
```

**Key Features:**
- Retrieves all groups including nested group memberships
- Supports pagination for users with many group memberships
- Filters results to only include groups (not directories or other objects)
- Requires `https://graph.microsoft.com/` as the OAuth resource

### Group Identifiers

Microsoft Entra ID group mapping uses **object IDs** (GUIDs), not display names. Object IDs are stable identifiers that do not change when group names are updated.

**Example object ID:**
```
a1b2c3d4-e5f6-7890-1234-567890abcdef
```

You can find group object IDs in the Microsoft Entra admin center under **Groups > [Group Name] > Overview**.

## Microsoft Entra ID Configuration

Configure your Entra ID app registration to include group information in authentication tokens.

### Configuring Group Claims

1. Navigate to the [Microsoft Entra admin center](https://entra.microsoft.com/)
2. Select **Identity > Applications > App registrations**
3. Select your NetBox Enterprise app registration
4. Navigate to **Token configuration**
5. Click **Add optional claim**
6. Select **ID** as the token type
7. Select the **groups** claim from the list
8. Check **Turn on the Microsoft Graph groups claim**
9. Select group types to include:
   - **Security groups**: Recommended for most deployments
   - **All groups**: Includes distribution lists and Microsoft 365 groups
10. Click **Add**

### Granting API Permissions

The app registration requires permissions to read group information:

1. Navigate to **API permissions** in your app registration
2. Verify **User.Read** permission is present (added by default)
3. For group claims, you may need **GroupMember.Read.All** depending on your configuration
4. If prompted, grant admin consent for your organization

### Locating Group Object IDs

For each Azure AD group you want to map:

1. Navigate to **Identity > Groups > All groups**
2. Search for the group by name
3. Click the group name to open the group details
4. Note the **Object ID** from the Overview page
5. Document the object ID and group purpose for NetBox configuration

## NetBox Enterprise Configuration

Configure group mapping through the NetBox Enterprise admin console by modifying the authentication pipeline and adding group mapping configuration.

### Accessing Configuration

1. Access the admin console at `https://<your-cluster-host-or-ip>:30000/`
2. Navigate to the **Config** tab
3. Enable **Show Advanced Settings**
4. Locate the **NetBox Python Configuration Overrides** section

### Complete Configuration

Add the following configuration, including both basic SSO settings and group mapping configuration:

```python
# Basic SSO authentication
REMOTE_AUTH_BACKEND = 'social_core.backends.azuread.AzureADOAuth2'
SOCIAL_AUTH_AZUREAD_OAUTH2_KEY = '<application-id>'
SOCIAL_AUTH_AZUREAD_OAUTH2_SECRET = '<client-secret-value>'
SOCIAL_AUTH_AZUREAD_OAUTH2_TENANT_ID = '<tenant-id>'

# Microsoft Graph API access (required for group mapping)
SOCIAL_AUTH_AZUREAD_OAUTH2_RESOURCE = 'https://graph.microsoft.com/'

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
    'nbc_auth_extensions.azure_authentication.azuread_map_groups',
)

# Group mapping configuration
SOCIAL_AUTH_PIPELINE_CONFIG = {
    'AZUREAD_USER_FLAGS_BY_GROUP': {
        'is_staff': ['<azure-group-id-for-staff>'],
        'is_superuser': ['<azure-group-id-for-superusers>']
    },
    'AZUREAD_GROUP_MAP': {
        '<azure-group-id-1>': '<netbox-group-name-1>',
        '<azure-group-id-2>': '<netbox-group-name-2>'
    }
}
```

### Configuration Parameters

**SOCIAL_AUTH_AZUREAD_OAUTH2_RESOURCE**
- Specifies the OAuth resource for Microsoft Graph API
- Must be set to `'https://graph.microsoft.com/'`
- Required for group mapping to function

**SOCIAL_AUTH_PIPELINE**
- Defines the authentication pipeline steps
- Must include `'nbc_auth_extensions.azure_authentication.azuread_map_groups'` as the final step
- Do not modify the order of other pipeline steps

**SOCIAL_AUTH_PIPELINE_CONFIG**
- Container for all group mapping configuration
- Must include both `AZUREAD_USER_FLAGS_BY_GROUP` and `AZUREAD_GROUP_MAP` keys

**AZUREAD_USER_FLAGS_BY_GROUP**
- Maps Azure AD group IDs to NetBox user flags
- `is_staff`: Grants access to the NetBox admin interface
- `is_superuser`: Grants all permissions and superuser status
- Users in multiple mapped groups will have the highest privilege level
- **Warning:** Exercise extreme caution when assigning superuser status

**AZUREAD_GROUP_MAP**
- Maps Azure AD group IDs to NetBox group names
- Keys: Azure AD group object IDs (GUIDs)
- Values: NetBox group names (must match exactly)
- NetBox groups must already exist before mapping

### Configuration Example

A practical example for a typical deployment:

```python
SOCIAL_AUTH_PIPELINE_CONFIG = {
    'AZUREAD_USER_FLAGS_BY_GROUP': {
        'is_staff': [
            'a1b2c3d4-e5f6-7890-1234-567890abcdef',  # NetBox Admins
            '11111111-2222-3333-4444-555555555555'   # NetBox Superusers
        ],
        'is_superuser': [
            '11111111-2222-3333-4444-555555555555'   # NetBox Superusers
        ]
    },
    'AZUREAD_GROUP_MAP': {
        'a1b2c3d4-e5f6-7890-1234-567890abcdef': 'Network Admins',
        'b2c3d4e5-f6a7-8901-2345-678901bcdefg': 'Network Engineers',
        'c3d4e5f6-a7b8-9012-3456-789012cdefgh': 'Read Only Users'
    }
}
```

In this example:
- Members of "NetBox Admins" or "NetBox Superusers" Azure AD groups can access the admin interface
- Members of "NetBox Superusers" Azure AD group become NetBox superusers
- Three Azure AD groups are mapped to corresponding NetBox groups

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
   - **Name**: Must match exactly the name used in `AZUREAD_GROUP_MAP`
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
2. Verify all groups referenced in `AZUREAD_GROUP_MAP` exist
3. Click each group name to verify permissions are assigned correctly
4. Document which Azure AD groups map to which NetBox groups

## Testing Group Mapping

After configuring group mapping, test that permissions are assigned correctly.

### Initial Test

1. Identify a test user who is a member of mapped Azure AD groups
2. Verify the test user's Azure AD group memberships in Entra admin center
3. Log out of NetBox if currently authenticated
4. Log in via Microsoft Entra ID as the test user
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
3. Group memberships should match the user's Azure AD groups based on your mapping configuration

**Example:**
- Azure AD groups: "NetBox Admins", "Network Engineers"
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

1. Add the test user to a new Azure AD group
2. Add the new Azure AD group to your `AZUREAD_GROUP_MAP` configuration
3. Deploy the updated configuration
4. Log out and log back in as the test user
5. Verify the new NetBox group appears in the user's group memberships

## Group Membership Behavior

Understanding how NetBox handles group membership is important for managing access control.

### Group Synchronization

On each login:
1. NetBox queries Microsoft Graph API for current group memberships
2. NetBox removes all existing group memberships for the user
3. NetBox adds new group memberships based on current Azure AD groups
4. User flags (`is_staff`, `is_superuser`) are updated based on current groups

**Important:** Group memberships are cleared and rebuilt on each login. Any manually assigned groups will be removed.

### Manual Group Assignments

Do not manually assign groups to Entra ID-authenticated users in NetBox:
- Manual assignments will be removed on next login
- Group assignments are managed exclusively through Azure AD
- To grant access, add users to appropriate Azure AD groups

### Nested Groups

NetBox retrieves nested group memberships:
- If a user is in Group A, and Group A is a member of Group B, the user is considered a member of both groups
- This behavior matches Azure AD's transitive group membership
- Use nested groups to simplify Azure AD group management

### Multiple Mapped Groups

If a user is in multiple mapped Azure AD groups:
- The user will be added to all corresponding NetBox groups
- Permissions are additive (union of all group permissions)
- User flags use the highest privilege level (if any group grants `is_superuser`, the user becomes a superuser)

## Troubleshooting

### Groups Not Syncing

**Symptoms:**
- User logs in successfully via Entra ID
- NetBox groups do not match Azure AD groups
- User has no group memberships after login

**Resolution:**

1. **Verify group claims are configured:**
   - Open the Microsoft Entra admin center
   - Navigate to your app registration **Token configuration**
   - Verify the **groups** claim is present for ID tokens
   - Ensure **Turn on the Microsoft Graph groups claim** is enabled

2. **Check NetBox logs for errors:**
   ```shell
   kubectl logs <netbox-pod> -n kotsadm | grep -i "azure.*group"
   ```
   Look for errors related to Microsoft Graph API or group mapping.

3. **Verify SOCIAL_AUTH_AZUREAD_OAUTH2_RESOURCE:**
   - Must be set to `'https://graph.microsoft.com/'`
   - Without this setting, NetBox cannot query the Graph API

4. **Check pipeline configuration:**
   - Verify `'nbc_auth_extensions.azure_authentication.azuread_map_groups'` is included in `SOCIAL_AUTH_PIPELINE`
   - Verify it is the last step in the pipeline

5. **Test Graph API access manually:**
   Verify NetBox can reach Microsoft Graph API:
   ```shell
   kubectl exec <netbox-pod> -n kotsadm -- curl https://graph.microsoft.com/v1.0/
   ```

### NetBox Groups Not Found

**Symptoms:**
- NetBox logs show: "group not found locally"
- User logs in successfully but is not added to any groups
- Some groups work but others do not

**Resolution:**

1. **Verify NetBox groups exist:**
   - Navigate to **Admin > Authentication > Groups** in NetBox
   - Verify each group referenced in `AZUREAD_GROUP_MAP` exists
   - Group names must match exactly (case-sensitive)

2. **Check for typos:**
   - Common issues: extra spaces, capitalization differences
   - NetBox group name: "Network Admins" (with space)
   - Configuration: `'Network_Admins'` (with underscore) - this will not match

3. **Create missing groups:**
   - For each group referenced in configuration, create a corresponding NetBox group
   - Assign appropriate permissions to each group

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

### Microsoft Graph API Errors

**Symptoms:**
- Login fails after Entra ID authentication
- NetBox logs show errors contacting Microsoft Graph API
- Error messages mention timeouts or authorization failures

**Resolution:**

1. **Verify network connectivity:**
   ```shell
   kubectl exec <netbox-pod> -n kotsadm -- curl -I https://graph.microsoft.com
   ```
   Verify NetBox can reach Microsoft Graph API.

2. **Check API permissions:**
   - Navigate to your app registration in Entra admin center
   - Select **API permissions**
   - Verify **User.Read** permission is granted
   - If missing, add the permission and grant admin consent

3. **Verify access token:**
   - Check NetBox logs for token-related errors
   - Verify `SOCIAL_AUTH_AZUREAD_OAUTH2_RESOURCE` is set correctly
   - Access tokens must include the correct audience for Graph API

4. **Check for expired secrets:**
   - Client secrets expire based on the configured lifetime
   - If the secret expired, generate a new one and update NetBox configuration

### Group Object IDs vs Display Names

**Symptoms:**
- Configuration uses group display names instead of object IDs
- Groups do not sync despite correct configuration syntax

**Resolution:**

Azure AD group mapping requires **object IDs**, not display names. Object IDs are GUIDs that look like:
```
a1b2c3d4-e5f6-7890-1234-567890abcdef
```

**Incorrect (display names):**
```python
'AZUREAD_GROUP_MAP': {
    'Network Admins': 'Network Admins',
    'Network Engineers': 'Network Engineers'
}
```

**Correct (object IDs):**
```python
'AZUREAD_GROUP_MAP': {
    'a1b2c3d4-e5f6-7890-1234-567890abcdef': 'Network Admins',
    'b2c3d4e5-f6a7-8901-2345-678901bcdefg': 'Network Engineers'
}
```

To find object IDs:
1. Navigate to **Groups** in Entra admin center
2. Click the group name
3. Copy the **Object ID** from the Overview page

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

3. **Force a re-login:**
   - Log out of NetBox completely
   - Clear browser cookies for the NetBox domain
   - Log in again via Entra ID
   - Group mappings are applied at login time

## Security Considerations

### Superuser Assignment

Exercise extreme caution when configuring `is_superuser` groups:

- Superusers have unrestricted access to NetBox
- Superusers can modify any data, including configuration
- Superusers can elevate other users to superuser status
- Superusers can access the Django admin interface

**Recommendations:**
- Limit `is_superuser` to a small, well-controlled Azure AD group
- Regularly audit membership of superuser groups
- Use group-based permissions for most users instead of superuser status
- Document who has superuser access and why

### Group Membership Synchronization

Group memberships are synchronized on each login:

- Removing a user from an Azure AD group immediately revokes their NetBox access on next login
- Adding a user to an Azure AD group immediately grants access on next login
- Users may retain access until their session expires if removed from groups
- Consider forcing re-authentication for terminated employees

### Access Token Security

NetBox Enterprise uses OAuth access tokens to query Microsoft Graph API:

- Access tokens are short-lived (typically 1 hour)
- Tokens are stored in memory during authentication only
- Tokens are not persisted after group mapping completes
- Ensure HTTPS is used for all authentication flows in production

### Audit Logging

All group mapping operations are logged:

- Log entries include user, groups added, and user flags set
- Logs are written to the NetBox application log
- Monitor logs for unexpected group assignments
- Review logs during security audits

**View group mapping logs:**
```shell
kubectl logs <netbox-pod> -n kotsadm | grep "Azure AD group mapping"
```

### Privileged Access Management

Consider implementing privileged access management:

- Use Azure AD Privileged Identity Management for temporary superuser access
- Require approval workflows for adding users to superuser groups
- Implement just-in-time access for administrative operations
- Regularly review group memberships and access patterns

## Related Documentation

- [Microsoft Entra ID Single Sign-On](nbe-azure-sso.md) - Configure basic SSO authentication
- [SAML Group Mapping](nbe-saml-group-map.md) - Alternative group mapping using SAML
- [OpenID Connect (OIDC) SSO](nbe-oidc-sso.md) - Alternative OAuth 2.0 configuration
- [LDAP Authentication](nbe-ldap.md) - Alternative authentication method using LDAP

## Additional Resources

- [Microsoft Graph API Documentation](https://learn.microsoft.com/en-us/graph/api/overview)
- [Microsoft Graph API: List transitiveMemberOf](https://learn.microsoft.com/en-us/graph/api/user-list-transitivememberof)
- [Azure AD Group Claims](https://learn.microsoft.com/en-us/entra/identity-platform/optional-claims)
- [Python Social Auth Pipeline](https://python-social-auth.readthedocs.io/en/latest/pipeline.html)
