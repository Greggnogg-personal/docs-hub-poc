---
title: Snow Installation
description: ServiceNow NetBox CMDB Integration documentation - Version v1.4.012
tags:
  - cloud
  - enterprise
  - integration
  - netbox
  - servicenow
  - version-1-4-012
source: localdocs
version: v1.4.012
lastUpdatedAt: 1768942587000
canonical: /docs/integrations/tool-integrations/v1.4.012/servicenow/snow-installation/
---

# Installation and Setup

## Version Information
- **Application Version**: 1.4.0
- **ServiceNow Compatibility**: Certified for Yokohama and Zurich versions.

---

## Table of Contents

### [Before Starting](#before-starting)

### [Uploading and Committing the Application](#uploading-and-committing-the-application)

### [Configuration Using Guided Setup](#configuration-using-guided-setup)
- [Accessing the Guided Setup](#accessing-the-guided-setup)

### [Phase 1: Plugins](#phase-1-plugins)
- [Step 1.1: Install Plugins](#step-11-install-plugins)

### [Phase 2: Setup](#phase-2-setup)
- [Step 2.1: Create or Update Connection](#step-21-create-or-update-connection)
- [Step 2.2: Create Application Parameters](#step-22-create-application-parameters)
- [Step 2.3: Setup Own Company](#step-23-setup-own-company)
- [Step 2.4: Upgrade Database](#step-24-upgrade-database)
- [Step 2.5: Setup Temporary Admin Channel](#step-25-setup-temporary-admin-channel)
- [Step 2.6: Setup Credential for ServiceNow to NetBox](#step-26-setup-credential-for-servicenow-to-netbox)
- [Step 2.7: Associate Credential](#step-27-associate-credential)
- [Step 2.8: Setup Location Type](#step-28-setup-location-type)
- [Step 2.9: Determine NetBox Tenant Mapping](#step-29-determine-netbox-tenant-mapping)
- [Step 2.10: Create CI Classes in NetBox](#step-210-create-ci-classes-in-netbox)
- [Step 2.11: Customize Classes](#step-211-customize-classes)
- [Step 2.12: Setup Credential for NetBox to ServiceNow](#step-212-setup-credential-for-netbox-to-servicenow)
- [Step 2.13: Test Credentials](#step-213-test-credentials)

### [Common Installation Issues](#common-installation-issues)

---

## Before Starting

Before you start the installation, ensure the following requirements are met:

- **Administrative Privileges**: You must be logged in with admin privileges on both NetBox and ServiceNow instances
- **ServiceNow Version**: Yokohama and Zurich are certified for v1.4.0 of the NetBox CMDB Integration application
- **IntegrationHub License**: Your ServiceNow instance must be licensed for IntegrationHub for proper integration functionality
- **Required ServiceNow Applications Versions**: Ensure you have access to install Workflow Studio v26.3+ and PlayBook Experience v26.3+ (see [Plugin Requirements](#step-11-install-plugins)

## Uploading and Committing the Application

Follow these steps to install the NetBox ServiceNow Integration application in your ServiceNow instance:

1. **Navigate to Retrieved Update Sets**
   - Go to **All > System Update Sets > Retrieved Update Sets**

2. **Import the Update Set**
   - Navigate to the **Related Links** section at the bottom of the list
   - Click on **Import Update Set From XML**
   - Select the **NetBox CMDB Integration** application file and click **Upload**
   - ⏱️ *This operation may take several minutes*

3. **Preview the Update Set**
   - Once the file has uploaded, click on the the **NetBox CMDB Integration** update set to open the details page
   - Click on the **Preview Update Set** button
   - ⏱️ *This operation may take several minutes*
   - Review and skip or accept any conflicts
     - If the choice if not clear whether to skip or accept, reach out to NetBox Labs  for specific instructions

4. **Commit the Update Set**
   - After the preview is complete, click the **Commit Update Set** button
   - ⏱️ *This operation may take several minutes*

5. **Handle Any Errors**
   - If any errors occur during commit, check the Release Notes to determine which errors can safely be ignored
   - Document any persistent errors for support escalation if needed

## Configuration Using Guided Setup

After successful installation, use the built-in Guided Setup to configure the application:

### Accessing the Guided Setup

**Navigate to Guided Setup**
- Go to **All > NetBox > Configuration > Guided Setup**
- Review the **Pre-checklist** and fulfill any outstanding requirements
- Click **Get Started** when ready

## Phase 1: Plugins

The guided setup begins with ensuring required plugins are installed:

### Step 1.1: Install Plugins

**Installation Steps**:
- Install all the suggested plugins
- These plugins are mandatory for the integration to work

📝 *Note: Plugin installation runs in the background. You don't need to wait for completion before proceeding to the next phase.*

## Phase 2: Setup

Complete the following configuration steps:

### Step 2.1: Create or Update Connection

**Configure the primary connection to your NetBox instance**:

1. **Required Fields**:
   - **Name**: `NetBox API` ⚠️ *(case sensitive and must match exactly)*
   - **Connection Alias**: `x_990381_netbox_cl.NetBox_API`
   - **Host**: Your NetBox instance hostname or IP address
   - **Connection URL**: `https://instanceNameOrIP` ⚠️ *(no trailing slash)*

2. **MID Server Configuration** (NetBox Enterprise Only):
   - Select **Use MID** if your NetBox instance is only accessible through a MID server
   - Configure MID server parameters as needed

3. **Save the Record**
   - Save the connection record
   - Mark the step as complete


### Step 2.2: Create Application Parameters

Configure application parameters based on your installation scenario:

**For New Installations**:
- When prompted: *"No existing NetBox parameters detected, this looks like a new install. Parameters will be created after pressing Save"*
- Press **Save** to create new parameters with default values

**For Existing Installations**:
- The system displays the number of existing parameters
- Choose whether to overwrite existing parameters with default values
- Missing parameters will be automatically recreated with default values

### Step 2.3: Setup Own Company

**Give the NetBox application a reference to your own company**:

1. **Purpose**
   - When Department records are imported from NetBox, they will be associated to the selected company

2. **Select or Create the Record**
   - If your company already exists in ServiceNow, select it from the list
   - If not, enter its name in the text field and click Save

### Step 2.4: Upgrade Database

**Perform database maintenance for version upgrades** (v1.4.0+):

1. **Purpose**
   - Runs database maintenance tasks required when upgrading between versions
   - This step runs only once and is skipped on subsequent guided setup runs

2. **Automatic Process**
   - The system automatically detects if database upgrades are needed
   - Follow on-screen instructions if any manual intervention is required

📝 *Note: This step is automatically skipped for new installations*

### Step 2.5: Setup Temporary Admin Channel

**Establish elevated access for configuration**:

1. **Purpose and Security**
   - Creates temporary elevated privileges on your NetBox instance for automated configuration
   - This temporary channel enables ServiceNow to configure NetBox during setup
   - Only low-privilege accounts remain after completion

2. **Configuration**
   - Follow on-screen instructions to establish the temporary communication channel
   - Provide temporary admin credentials for your NetBox instance

3. **Deletion of temporary credential**
   - The credential is stored in the NetBox Parameters table under the name "nbk"
   - It is automatically removed at the end of setup, during the Test connections step (2.9)
   - If you later observe the nbk parameter in the table, perhaps because you didn't finish the setup, you may either:
      - Finish the Guided setup procedure
      - Run the "Test connections" step manually from the **All > NetBox > Maintenance > Test connections** menu item
      - Delete the "nbk" parameter manually

### Step 2.6: Setup Credential for ServiceNow to NetBox

**Create credentials for ServiceNow to access NetBox API**:

1. **Create API Credentials**
   - Configure the following fields:
     - **Username**: Set appropriate username
     - **Password**: Set secure password
     - **API Token**: Generate API token

2. **Critical API Token Requirements**
   - ⚠️ **MANDATORY**: The API Token MUST be a hexadecimal string of exactly 32 characters
   - Example format: `a1b2c3d4e5f67890abcdef1234567890`

3. **Important Note**
   - Every time you visit or refresh this page, values are randomly generated again
   - If this step fails, you will need to copy/paste the information a second time

4. **Troubleshooting Connection Issues**
   - If errors occur, verify:
     - API Token format (32-character hexadecimal string)
     - HTTP(s) connection record configuration (Step 2.1)
     - Temporary admin credentials (Step 2.5)

### Step 2.7: Associate Credential

**Link credentials to the connection record**:

1. **Manual Association Required**
   - Follow on-screen instructions to manually associate the credentials created in Step 2.6
   - Link to the HTTP(s) Connection record created in Step 2.1
   - ⚠️ **CRITICAL**: Remember to save the record before proceeding to the next step

### Step 2.8: Setup Location Type (v1.4.0+)

**Configure ServiceNow location types for NetBox integration**:

1. **Purpose**
   - Choose a ServiceNow location type that will help differentiate between NetBox Sites, Regions, and Locations
   - This determines how location hierarchy is interpreted during synchronization

2. **Configuration**
   - Select the default location type that represents NetBox Sites in your ServiceNow instance
   - Location types with sequences lower than this default will be classified as Regions
   - Location types with sequences higher will be classified as Locations

📝 *Note: See the FAQ for detailed information about location classification in v1.4.0*

### Step 2.9: Determine NetBox Tenant Mapping (v1.4.0+)

**Select how NetBox Tenants should be handled in ServiceNow**:

1. **Configuration Options**
   - **Both**: Import and export tenants as both Customers and Departments
     - ⚠️ **REQUIRES**: Tenant Group IDs must be configured in Application Parameters to distinguish Customers from Departments
   - **Customers only**: Synchronize tenants only as Companies (customers)
     - Tenant Group ID not required, will be ignored
   - **Departments only**: Synchronize tenants only as Departments
     - Tenant Group ID  not required, will be ignored
   - **None**: Disable tenant synchronization entirely

2. **Important for "Both" Option**
   - After selecting "Both", you must configure **NetBox Tenant Group ID for Customers** and **NetBox Tenant Group ID for Departments** in the Application Parameters
   - These IDs specify which NetBox tenant groups contain Customers vs Departments
   - Without these IDs configured, the application cannot distinguish between tenant types

3. **Navigation for Future Changes**
   - Settings can be modified later at **All > NetBox > Configuration > Setup Tenant Usage**

### Step 2.10: Create CI Classes in NetBox (v1.4.0+)

**Initialize CI class support in NetBox**:

1. **Purpose**
   - Creates a custom field on Devices in NetBox for ServiceNow CI class mapping
   - Populates the field with default CI classes

2. **Automatic Process**
   - The system automatically creates the necessary NetBox custom fields
   - Default CI classes are registered in NetBox
   - Follow on-screen instructions to complete the process

### Step 2.11: Customize Classes (v1.4.0+)

**Select additional CI classes for NetBox integration**:

1. **Purpose**
   - Add custom or additional ServiceNow CI classes to the NetBox integration
   - Classes selected here will be available in NetBox device configuration

2. **Configuration**
   - Browse available CMDB CI classes
   - Select classes you want to integrate with NetBox
   - **Recommendation**: Register up to 6 classes at a time for optimal performance

3. **Navigation for Future Changes**
   - Additional classes can be added later at **All > NetBox > Configuration > Class Manager**

### Step 2.12: Setup Credential for NetBox to ServiceNow

**Create credentials for NetBox to access ServiceNow API**:

1. **Create ServiceNow API Access**
   - Configure the following:
     - **Username**: Set appropriate username (modifiable)
     - **Password**: Set secure password (modifiable)
     - **API Key**: Automatically generated (do not modify)

2. **Important Note**
   - Every time you visit or refresh this page, values change
   - If this step fails, you will need to copy/paste the information a second time

3. **Integration Notes**
   - Credentials are stored locally and in your NetBox instance
   - ServiceNow credentials are stored in NetBox webhook headers

4. **Troubleshooting**
   - If errors occur, verify:
     - HTTP(s) connection record configuration (Step 2.1)
     - Temporary admin credentials (Step 2.5)

### Step 2.13: Test Credentials

**Validate bidirectional connectivity**:

1. **Connection Testing**
   - Test ServiceNow to NetBox communication
   - Test NetBox to ServiceNow communication
   - Verify API responses and authentication

2. **Important**
   - ServiceNow to NetBox test must succeed for NetBox to ServiceNow test to run
   - If this step fails, return to Step 2.7 (Associate Credential) and verify the record was saved

3. **Validation Steps**
   - Confirm all connection parameters are correct
   - Validate credential associations
   - Monitor for any errors or warnings

4. **Temporary Credential Cleanup**
   - The temporary admin credential (nbk parameter) is automatically deleted upon successful completion
   - This ensures only low-privilege accounts remain after setup

## Common Installation Issues

|Issue | Possible Cause | Solution |
|-------|----------------|----------|
|Update Set Import Fails | File corruption or version mismatch | Re-download update set from NetBox Labs |
|Plugin Installation Errors | Missing dependencies or insufficient permissions | Verify ServiceNow admin privileges and dependency requirements |
|Connection Test Fails | Network connectivity or firewall issues | Check network configuration and firewall rules |
|API Token Rejected | Incorrect token format | Ensure API token is exactly 32 hexadecimal characters |
|Credential Association Fails | Timing or configuration issues | Retry association after verifying all previous steps |
|Temporary Admin Channel Failed | Invalid NetBox admin credentials | Verify NetBox admin credentials and permissions |
