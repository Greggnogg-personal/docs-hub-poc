---
title: snow faq
description: ServiceNow NetBox CMDB Integration documentation
tags:
  - api
  - authentication
  - cloud
  - enterprise
  - integration
  - netbox
source: localdocs
lastUpdatedAt: 1768942587000
canonical: /docs/integrations/tool-integrations/servicenow/snow-faq/
---
# FAQ and Troubleshooting

## Version Information
- **Application Version**: 1.4.0
- **ServiceNow Compatibility**: Certified for Yokohama and Zurich versions.

---

## Table of Contents

### [Installation Issues](#installation-issues)
- [Are there any known issues with the current version?](#are-there-any-known-issues-with-the-current-version)
- [Update set installation won't get past the Preview phase](#update-set-installation-wont-get-past-the-preview-phase)
- [What can I check to see that installation went well?](#what-can-i-check-to-see-that-installation-went-well)
- [What new tables are included with the application?](#what-new-tables-are-included-with-the-application)
- [Under which license should I subscribe the new tables?](#under-which-license-should-i-subscribe-the-new-tables)

### [Guided Setup Issues](#guided-setup-issues)
- [I'm missing some plugins and don't have a license for them](#im-missing-some-plugins-and-dont-have-a-license-for-them)
- [What's the purpose of manually creating an HTTP(s) connection record?](#whats-the-purpose-of-manually-creating-an-https-connection-record)
- [Both our NetBox and ServiceNow instances are in the cloud but we have a MID server on premises, should I configure it in step 2.1 or 2.2 of the Guided Setup?](#both-our-netbox-and-servicenow-instances-are-in-the-cloud-but-we-have-a-mid-server-on-premises-should-i-configure-it-in-step-21-or-22-of-the-guided-setup)
- [The connection test keeps failing, how do I troubleshoot connections?](#the-connection-test-keeps-failing-how-do-i-troubleshoot-connections)

### [Application Parameters](#application-parameters)
- [What are the important Application parameters to know about initially?](#what-are-the-important-application-parameters-to-know-about-initially)
- [How can I tell the application to increase the logging level?](#how-can-i-tell-the-application-to-increase-the-logging-level)
- [How do I configure how NetBox Tenants are imported? (v1.4.0+)](#how-do-i-configure-how-netbox-tenants-are-imported-v140)
- [What are the NetBox Tenant Group ID parameters used for?](#what-are-the-netbox-tenant-group-id-parameters-used-for)
- [How do I add custom CI classes to the NetBox integration? (v1.4.0+)](#how-do-i-add-custom-ci-classes-to-the-netbox-integration-v140)
- [What's the difference between Sites, Regions, and Locations in NetBox? (v1.4.0+)](#whats-the-difference-between-sites-regions-and-locations-in-netbox-v140)
- [Why not use the sys_properties table instead of a custom table for parameters?](#why-not-use-the-sys_properties-table-instead-of-a-custom-table-for-parameters)
- [What is the nbk parameter for?](#what-is-the-nbk-parameter-for)

### [Data Synchronization](#data-synchronization)
- [Data is not getting synchronized from ServiceNow to NetBox (export)](#data-is-not-getting-synchronized-from-servicenow-to-netbox-export)
- [Data is not getting synchronized from NetBox to ServiceNow](#data-is-not-getting-synchronized-from-netbox-to-servicenow)
- [I have objects in NetBox that are tagged with both ServiceNowSyncTo and ServiceNowSyncFrom, why is that?](#i-have-objects-in-netbox-that-are-tagged-with-both-servicenowsyncto-and-servicenowsyncfrom-why-is-that)
- [How do I pause synchronization between systems, one way or another?](#how-do-i-pause-synchronization-between-systems-one-way-or-another)
- [How do I cancel synchronization between systems, one way or another, for example if it's overly long?](#how-do-i-cancel-synchronization-between-systems-one-way-or-another-for-example-if-its-overly-long)
- [I'm getting duplicate records in ServiceNow or NetBox](#im-getting-duplicate-records-in-servicenow-or-netbox)

---

## Installation Issues

### Are there any known issues with the current version?

Each release may have known issues that are documented along with workarounds and resolution plans.

**Where to Find Known Issues**:
1. **Known Issues Document**: Check the dedicated [Known Issues](known-issues.md) document for detailed information about current issues, their impact, and workarounds
2. **Release Notes**: Review the [Release Notes](release-notes.md) for version-specific known issues listed under each release
3. **Version-Specific Information**: Issues are organized by version number, so check the section corresponding to your installed version

**When to Check**:
- Before installing or upgrading the application
- When encountering unexpected behavior during installation
- When troubleshooting integration issues
- After reviewing this FAQ if your issue isn't covered

**Important**: Some known issues may have specific workarounds that differ from general troubleshooting steps. Always check the known issues documentation before attempting other solutions.

### Update set installation won't get past the Preview phase

**Common Causes**:
- **Missing Dependencies**: Ensure all required plugins are installed (IntegrationHub Starter Pack, System Import Sets)
- **Version Incompatibility**: Verify the update set version matches your ServiceNow instance version
- **Insufficient Privileges**: Confirm you have admin privileges on the ServiceNow instance
- **Conflicting Customizations**: Local customizations may conflict with the application

**Resolution Steps**:
1. Check the preview log for specific error messages
2. Verify all dependencies are installed and activated
3. Review any conflicts shown in the preview results
4. Contact NetBox Labs support if errors persist

### What can I check to see that installation went well?

**Verification Checklist**:
1. **Application Menu**: Verify "NetBox" application appears in the application navigator
2. **Tables Created**: Check that new tables are present, for example:
   - `x_nbl_cmdb_netbox_parameters`
   - `x_nbl_cmdb_netbox_notification_queue`
   - `x_nbl_cmdb_device_types_import_set`
   - `x_nbl_cmdb_devices_import_set`
   - `x_nbl_cmdb_netbox_locations_import` (v1.4.0+)
3. **Extended Fields**: Verify that 22 NetBox fields are added to existing tables:
   - `cmdb_ci`: 4 fields (correlation ID, synchronize flag, ready for export, ready message)
   - `cmdb_hardware_product_model`: 4 fields (correlation ID, synchronize flag, ready for export, ready message)
   - `cmn_department`: 4 fields (correlation ID, synchronize flag, ready for export, ready message)
   - `cmn_location`: 6 fields (correlation ID, synchronize flag, ready for export, ready message, NetBox type, level)
   - `core_company`: 4 fields (correlation ID, synchronize flag, ready for export, ready message)
4. **Guided Setup**: Access **All > NetBox > Configuration > Guided Setup** successfully
5. **No Critical Errors**: Check system logs for any critical errors during installation

### What new tables are included with the application?

**Import Set Tables**:
- `x_nbl_cmdb_devices_import_set` - NetBox devices staging
- `x_nbl_cmdb_device_types_import_set` - NetBox device types staging
- `x_nbl_cmdb_netbox_sites_import` - NetBox sites staging
- `x_nbl_cmdb_netbox_regions_import` - NetBox regions staging
- `x_nbl_cmdb_netbox_locations_import` - NetBox locations staging (v1.4.0+)
- `x_nbl_cmdb_netbox_clients_import` - NetBox tenants/clients staging
- `x_nbl_cmdb_netbox_departments_imports` - NetBox departments staging
- `x_nbl_cmdb_netbox_manufacturers_import` - NetBox manufacturers staging

**Configuration Tables**:
- `x_nbl_cmdb_netbox_parameters` - Application configuration parameters
- `x_nbl_cmdb_netbox_notification_queue` - NetBox notification queue

### Under which license should I subscribe the new tables?

**Licensing Guidance**:
- **Import Set Tables**: These are typically covered under the base ServiceNow platform license as they are temporary staging tables
- **Configuration Tables**: These tables would usually be licensed under the ITSM allotment, but can be included wherever some allotments remain
- **Extended Fields**: No additional licensing required as they extend existing licensed tables

**Recommendation**: Consult with your ServiceNow account manager for specific licensing questions, as requirements may vary based on your ServiceNow contract and usage.

## Guided Setup Issues

### I'm getting a blank page when attempting to run the Guided Setup

**Quick Resolution**:
This is a known issue in version 1.4.0. See the [Known Issues](known-issues.md#issue-2-guided-setup-blank-page-after-pre-installation-checklist) document for the detailed workaround procedure.

**General Troubleshooting** (if the documented workaround doesn't apply):
- In most cases, if the Guided Setup doesn't start, the Workflow Studio and/or the PlayBook Experience plugins are at an older version
- Make sure you update the plugins to the versions stated in the installation guide (see [Installation and Setup](snow-installation.md))
- If you updated your plugins after initially starting the Guided Setup, you will need to perform these steps to reinitialize it:
  - With Admin privileges, navigate to **All > Adoption Services > Guided Setup**
  - Depending on your ServiceNow and Guided Setup versions, select either **Build your guided setups** or **Go to Guided Setup Builder**
  - Open the **NetBox CMDB Integration Setup** for edition
  - Without doing any changes, finalize the Guided Setup and finish the procedure. This should reset the NetBox Guided Setup to a working state

### I'm missing some plugins and don't have a license for them

**Required Plugins**:
- **Essential Plugins** (Required):
  - IntegrationHub Starter Pack

**Resolution Options**:
1. **Contact ServiceNow**: Request licensing for required plugins through your ServiceNow account manager
2. **PDI Users**: Activate plugins through the PDI configuration screen

### What's the purpose of manually creating an HTTP(s) connection record?

**Purpose and Importance**:
- **Application Package**: This record cannot be packaged with the NetBox CMDB Integration scoped application and must therefore be created manually during the setup process
- **API Communication**: Establishes the connection between ServiceNow and your NetBox instance
- **Authentication**: Stores connection parameters and credential references
- **MID Server Support**: Configures routing through MID servers if required
- **Standardization**: Uses ServiceNow's standard HTTP connection framework for reliability

**Key Requirements**:
- **Name**: Must be exactly "NetBox API" (serves as a key for the application)
- **Connection Alias**: Must be `x_nbl_cmdb.NetBox_API`
- **URL Format**: Must not include trailing slash

### Both our NetBox and ServiceNow instances are in the cloud but we have a MID server on premises, should I configure it in step 2.1 or 2.2 of the Guided Setup?

**Recommendation**: 
- If both instances are in the cloud, direct communication is typically possible and no MID server is necessary
- MID server configuration should only be used if network policies require it
- Step 2.2 of the Guided Setup is for optional modifications after initial setup

**Decision Factors**:
- **Network Policies**: Check if your organization requires all API traffic to route through the MID server
- **Security Requirements**: Some organizations mandate MID server usage for all external connections
- **Performance**: Direct cloud-to-cloud communication is typically faster

**Testing Approach**: Try without the MID server first, then add it in Step 2.2 if connection tests fail.

### The connection test keeps failing, how do I troubleshoot connections?

1. **Credential Records Not Properly Associated with the API Key**
- A common mistake during Guided Setup is not saving a record before the step is marked as complete
- Go back to the **Associate credentials** step and reset it
- Associate the API Key again with the record and save or update it before marking the step as complete
- Finish the Guided Setup and test your connections again
- **Note**: Every time you restart a **Setup Credentials for...** step, passwords and keys are reset to new values. Make sure you take note of them again before saving

2. **Verify Basic Connectivity**
   - Check for firewall restrictions between instances
   - Verify DNS resolution of NetBox hostname

3. **Check API Token Format**
   - Ensure API token is exactly 32 hexadecimal characters
   - Verify token is active in NetBox
   - Verify that the token in NetBox is associated with a user with sufficient privileges
   - Test token manually using curl or Postman with a simple API call, for example:
      - curl -X 'GET' 'https://YOUR-NETBOX-INSTANCE/api/dcim/sites/' -H 'accept: application/json' -H 'Authorization: Token YOUR-NETBOX-API-TOKEN'

4. **Validate Connection Record**
   - Confirm connection name is exactly "NetBox API"
   - Verify URL has no trailing slash
   - Check credential association is correct

5. **Review Network Configuration**
   - Check MID server configuration if applicable
   - Verify proxy settings if required
   - Test from ServiceNow's network diagnostic tools

6. **Check Logs**
   - Review ServiceNow system logs for detailed error messages
   - Check NetBox logs for incoming connection attempts
   - Look for authentication or authorization errors

7. **Restart Guided Setup**
   - Try running the Guided Setup again, making sure you note all usernames, passwords and API tokens as you go

## Application Parameters

### What are the important Application parameters to know about initially?

**Critical Parameters for Initial Setup**:

| Parameter | Purpose | Default Value |
|-----------|---------|---------------|
| **NetBox Log Level** | Controls application logging verbosity | Medium |
| **API user in NetBox** | Username for ServiceNow → NetBox API calls | servicenow_integration |
| **API user in ServiceNow** | Username for NetBox → ServiceNow API calls | netbox_integration |
| **Import [ObjectType]** | Enable/disable synchronization from NetBox to ServiceNow (import direction) for specific objects | false |
| **Export [ObjectType]** | Enable/disable synchronization from ServiceNow to NetBox (export direction) for specific objects | false |

**Navigation**: Go to **All > NetBox > Configuration > Parameters** to view and modify these settings (see [User Guide, Application Parameters](snow-user-guide.md#application-parameters)).

### How can I tell the application to increase the logging level?

**Steps to Increase Logging**:

1. **Navigate to Parameters**
   - Go to **All > NetBox > Configuration > Parameters**
   - Find the "NetBox Log Level" parameter

2. **Available Log Levels** (case insensitive):
   - **Low**: Basic operational messages
   - **Medium**: Moderate detail including warnings (default)
   - **High**: Detailed debug information

3. **Change Log Level**
   - Edit the "NetBox Log Level" parameter
   - Set value to "High" for maximum detail
   - Save the parameter

4. **View Logs**
   - Check **All > NetBox > Maintenance > NetBox Logs** for NetBox-related entries (see [Technical Information, Logging](snow-technical-info.md#logging))

### How do I configure how NetBox Tenants are imported? (v1.4.0+)

**New in v1.4.0**: The Tenant Usage Configuration page provides flexible control over tenant synchronization.

**Quick Configuration**:
1. Navigate to **All > NetBox > Configuration > Setup Tenant Usage**
2. Select one of the following options:
   - **Both**: Import and export tenants as both Customers and Departments. **REQUIRES** Tenant Group IDs to distinguish between them.
   - **Customers only**: Synchronize tenants only as Companies (customers). Tenant Group ID ignored.
   - **Departments only**: Synchronize tenants only as Departments. Tenant Group ID ignored.
   - **None**: Disable tenant synchronization entirely.

**Important**: 
- When selecting "Both", you MUST configure Tenant Group IDs in Application Parameters. This is how the application distinguishes which NetBox tenants should become Customers vs Departments in ServiceNow.
- When selecting "Customers only" or "Departments only", Tenant Group IDs are ignored.

**Navigation**: **All > NetBox > Configuration > Setup Tenant Usage**

### What are the NetBox Tenant Group ID parameters used for?

**Purpose**: These parameters control how NetBox tenants are mapped to ServiceNow organizational structures.

**Key Parameters**:
- **NetBox Tenant Group ID for Customers**: Specifies which NetBox tenant group contains tenants that should map to ServiceNow customer companies when "Both" is selected in Setup Tenant Usage
- **NetBox Tenant Group ID for Departments**: Specifies which NetBox tenant group contains tenants that should map to ServiceNow departments when "Both" is selected in Setup Tenant Usage

**Usage Requirements**:
- **MANDATORY** when "Both" is selected in Setup Tenant Usage: Required to distinguish which tenants become Customers vs Departments
- **IGNORED** when "Customers only" or "Departments only" is selected
- **NOT USED** when "None" is selected

**Behavior**:
- **Import**: Tenants will be imported into ServiceNow as Customers or Departments according to their tenant group
- **Export**: ServiceNow records are assigned to these tenant groups in NetBox
- **Format**: Integer value representing the NetBox tenant group ID

**Configuration**: Set these parameters manually in the Parameters table or use **All > NetBox > Configuration > Setup Tenant Usage** for guided configuration.

### How do I add custom CI classes to the NetBox integration? (v1.4.0+)

**New in v1.4.0**: The Class Manager allows you to register any ServiceNow CI class for NetBox integration.

**Steps to Add CI Classes**:
1. **Navigate to Class Manager**
   - Go to **All > NetBox > Configuration > Class Manager**

2. **Select CI Classes to Register**
   - Browse available CMDB CI classes from the ServiceNow database
   - Select one or more classes you want to integrate with NetBox
   - **Recommendation**: Register up to 6 classes at a time for optimal performance

3. **Register the Classes**
   - Click the register/add button
   - The application will automatically:
     - Add the classes to the NetBox custom field choice list
     - Configure the necessary synchronization rules
     - Make the classes available for device mapping

4. **Configure in NetBox**
   - In NetBox, edit or create devices
   - Set the "ServiceNow CI Class" custom field to one of the registered classes
   - Tagged devices will now be imported to the corresponding CI class in ServiceNow

**Important Notes**:
- Classes must be descendants of `cmdb_ci` in the ServiceNow class hierarchy
- Registration process may take a few moments for multiple classes
- Registered classes appear in the NetBox device custom field choices immediately
- You can register both standard ServiceNow CI classes and custom classes from your implementation

**Prior to v1.4.0**: Only hardcoded CI classes based on device role keywords were supported (router, switch, firewall, etc.)

### What's the difference between Sites, Regions, and Locations in NetBox? (v1.4.0+)

**New in v1.4.0**: Full support for NetBox Locations as a distinct object type.

**Object Types**:

**Regions** (NetBox and ServiceNow):
- Geographic or organizational groupings
- Hierarchical structure (regions can contain sub-regions)
- **In ServiceNow**: A `cmn_location` record is classified as a Region if:
  - NetBox Type field = "region", OR
  - ServiceNow Location Type has a sequence number lower than the Site default, OR
  - The location is positioned above a Site in the location hierarchy
- Typically parents of Sites

**Sites** (NetBox and ServiceNow):
- Physical locations where equipment is installed
- Usually assigned to a Region
- **In ServiceNow**: A `cmn_location` record is classified as a Site if:
  - NetBox Type field = "site", OR
  - ServiceNow Location Type matches or has the same sequence as the Site default location type
- Contain devices and can contain Locations

**Locations** (NetBox concept, new in v1.4.0):
- Sub-site physical locations (buildings, floors, rooms, racks)
- Hierarchical structure within a Site
- **In ServiceNow**: A `cmn_location` record is classified as a Location if:
  - NetBox Type field = "location", OR
  - ServiceNow Location Type has a sequence number higher than the Site default, OR
  - The location is positioned below a Site in the location hierarchy
- More granular than Sites, used for detailed asset placement

**Synchronization**:
- All three types synchronize to ServiceNow's `cmn_location` table
- The **NetBox Type** field distinguishes between them
- Proper hierarchical relationships are maintained (Regions → Sites → Locations)
- Each has separate import/export parameters for control

**Navigation in ServiceNow**:
- **All > NetBox > NetBox Regions**: View regions
- **All > NetBox > NetBox Sites**: View sites
- **All > NetBox > NetBox Locations**: View locations (v1.4.0+)

**Configuration**: Navigate to **All > NetBox > Configuration > Setup Locations, Sites and Regions** for guided configuration

### Why not use the sys_properties table instead of a custom table for parameters?

**Design Rationale**:

**Advantages of Custom Table**:
- **Scoped Isolation**: Parameters are contained within the application scope
- **Enhanced Metadata**: Supports detailed descriptions and ordering
- **Guided Setup Integration**: Easier integration with setup wizards
- **Backup/Restore**: Parameters are included in application update sets
- **Security**: Scoped access controls

**Limitations of sys_properties**:
- Global scope could cause conflicts
- Limited metadata support
- More complex Guided Setup integration
- Potential interference with other applications

### What is the nbk parameter for?

**Purpose**: The `nbk` parameter is a **temporary administrative credential** used during the Guided Setup process.

**Details**:
- **Temporary Nature**: Created during Guided Setup and automatically deleted afterward
- **Elevated Privileges**: Provides admin-level access to NetBox for configuration
- **Security**: Ensures only low-privilege accounts remain after setup completion
- **Usage**: Enables ServiceNow to configure NetBox settings during initial setup

**Important**: This parameter should not exist after Guided Setup completion. If it persists, it may indicate an incomplete setup process. If you think the setup has concluded normally, you can and should delete the parameter from the table.

## Data Synchronization

### Data is not getting synchronized from ServiceNow to NetBox (export)

1. **Check NetBox Ready for Export and NetBox Ready Message fields**
   - On records that are not synchronizing, use the NetBox view to check the field values
   - NetBox Ready for Export should be set to `true`
   - If it is not, check the NetBox Ready Message for clues on why the field is not exporting
     - If the record is not ready for export, an explanation outlining the cause will be provided

2. **Check Synchronization Parameters**
   - Verify "Export [ObjectType]" parameters are set to `true`
   - In ServiceNow, check that specific records have "NetBox Synchronize" field set to `true`

3. **Verify Connection Health**
   - Test API connectivity in both directions by navigating to **All > NetBox > Maintenance > Test connections**
   - Check credential validity and expiration
   - Review HTTP connection record configuration

4. **Review Flow Execution**
   - Check **All > Process Automation > Flow Designer > Executions**
   - Look for flows in the NetBox CMDB Integration application labeled as Create/Update NetBox [ObjectType] 
   - Look for failed or stuck flow executions
   - Review error messages in execution logs
   - Increase NetBox Log Level parameter if logs are not verbose enough

### Data is not getting synchronized from NetBox to ServiceNow

1. **Check Event Queue and Clear Cache**
   - If some objects were recently synchronized and you are trying again to import them, they may be stored in the Import Cache
   - Navigate to **All > NetBox > Maintenance > Event Queue** and try finding the object in the list by filtering on Remote Object Type and Remote ID
   - If the object figures in the cache, use the **Clear Import Cache** function in the same menu
     - **Note**: Clearing the cache will not affect the import process but may impact performance if you are currently importing objects from NetBox in large quantities

2. **Check tags in NetBox object**
   - On NetBox, verify that objects not being synchronized are tagged with ServiceNowSyncTo

3. **Check NetBox logs**
   - Set the "NetBox Log Level" parameter to High
   - Trigger the data synchronization again on the object by making a minor change to it
   - Navigate to **All > NetBox > Maintenance > NetBox Logs**
   - Filter logs on: 
     - [NetBox Notification API]: check that a log record was created for the modified object and that the record was processed (Notification received) and not ignored (Ignoring notification)
     - [NetBox Notification Queue Processing]: check that the received notification has values in all the fields
     - [NetBoxSetup.rest]: check that a GET statement was issued for the object in question and that the response code is 200
     - [Validate Remote Object]: check that the object validation was successful. Check the messages for clues about why it wasn't

4. **Check Synchronization Parameters**
   - Verify "Import NetBox [ObjectType]" parameters are set to `true`

5. **Check the Buffer Data Sources**
   - Navigate to **All > NetBox > Configuration > Data Sources**
   - Open the NetBox Buffer data source and check if it contains attachments. Refresh the record several times to see if the number of attachments starts decreasing after a while

6. **Check the other Data Sources**
   - Navigate to **All > NetBox > Configuration > Data Sources**
   - Open data sources other than Buffer
   - Verify that data sources don't contain more than one attachment
     - Delete all attachments if so and submit an incident report to NetBox Labs

7. **Verify Connection Health**
   - Test API connectivity in both directions by navigating to **All > NetBox > Maintenance > Test connections**
   - Check credential validity and expiration
   - Review HTTP connection record configuration

8. **Webhook Configuration**
   - Verify NetBox webhooks are properly configured
   - Check webhook URL points to correct ServiceNow instance
   - Confirm webhook authentication credentials

9. **NetBox Event Rules**
   - Ensure event rules are active in NetBox
   - Verify event rules trigger on appropriate object changes
   - Check event rule conditions and actions

### I have objects in NetBox that are tagged with both ServiceNowSyncTo and ServiceNowSyncFrom, why is that?

**The ServiceNowSyncTo Tag** is a synchronization control tag that tells ServiceNow to proceed with importing the objects when a webhook is received to its API. It is basically a granular, record-level way of telling the application which records should be synchronized in the NetBox to ServiceNow direction, and which shouldn't (see [User Guide, Synchronization Control](snow-user-guide.md#synchronization-control)).

On the other hand, the **ServiceNowSyncFrom Tag** is only an indicator that data for this record was sent by ServiceNow. It is not meant to act as a control and will have no effect if removed. In fact, it will come back as soon as a new export on that record is triggered in ServiceNow.

It is therefore possible for a record to have both tags if data flows in both directions.

### How do I pause synchronization between systems, one way or another?

**Temporary Pause Options**:

**Option 1: Disable Synchronization Parameters**
- Navigate to **All > NetBox > Configuration > Parameters**
- Set "Import NetBox [ObjectType]" and "Export NetBox [ObjectType]" parameters to `false` for affected object types
- This stops all synchronization for those objects

**Option 2: Record-Level Control**
- Set "NetBox Synchronize" field to `false` on specific records
- This provides granular control over individual items

**Option 3: Connection Disruption** (Emergency only)
- Modify HTTP connection record to invalid URL
- Remove or invalidate API credentials
- **Warning**: This may cause errors in logs

**Resuming Synchronization**:
- Reverse the changes made during pause
- Verify connection tests pass
- Monitor initial synchronization for any issues

**Best Practice**: Use Option 1 (parameter-based) for planned maintenance, as it's the cleanest approach and doesn't generate error messages.

### How do I cancel synchronization between systems, one way or another, for example if it's overly long?

**In the ServiceNow to NetBox direction**:
- Navigate to Flow Designer
- Open all flows labeled "Create/update NetBox [ObjectType]"
- For each flow, go to Executions and cancel the ones that are pending

**In the NetBox to ServiceNow direction**:
- Navigate to **All > NetBox > Maintenance > Event queue**
- Delete all records in the table

### I'm getting duplicate records in ServiceNow or NetBox

Duplicate records can occur during synchronization due to various factors such as data inconsistencies or identification rule challenges.

**Mitigation Steps**:

1. **Install and Configure the ServiceNow "Normalization Data Services" Plugin**
   - The plugin helps keep the Company (core_company) table free of duplicates by setting up aliases for company names (ex. Cisco Systems, Inc.) and normalize them all to the same value (Cisco) 

2. **Review ServiceNow Class Identification Rules**
   - In ServiceNow's **CI Class Manager**, ensure that the identification rules are aligned with your organization's data strategy (see [Technical Information, CI Classification](snow-technical-info.md#ci-classification-identification-and-reconciliation))
   - By default, **the NetBox Correlation ID** sits at an order of 250, after serial number but before name identifiers

3. **Review Correlation IDs**
   - Check that NetBox Correlation ID fields are properly populated
   - Verify correlation IDs are unique and consistent between systems

4. **Manual Cleanup**
   - Identify duplicate records
   - Manually merge or delete duplicates as appropriate
   - Document patterns for NetBox Labs support

**Future Improvements**: NetBox Labs is developing enhanced IRE rules and automated deduplication capabilities that will be included in future releases to minimize this issue.
