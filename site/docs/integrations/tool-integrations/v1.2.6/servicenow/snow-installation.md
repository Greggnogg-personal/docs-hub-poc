---
title: Snow Installation
description: ServiceNow NetBox CMDB Integration documentation - Version v1.2.6
tags:
  - cloud
  - enterprise
  - integration
  - netbox
  - servicenow
  - version-1-2-6
source: localdocs
version: v1.2.6
lastUpdatedAt: 1758826258000
canonical: /docs/integrations/tool-integrations/v1.2.6/servicenow/snow-installation/
---

# Installation and Setup

## Table of Contents

### [Before Starting](#before-starting)

### [Uploading and Committing the Application](#uploading-and-committing-the-application)

### [Configuration Using Guided Setup](#configuration-using-guided-setup)
- [Accessing the Guided Setup](#accessing-the-guided-setup)

### [Phase 1: Plugins](#phase-1-plugins)
- [Step 1.1: Install Plugins](#step-11-install-plugins)

### [Phase 2: Post-Installation Setup](#phase-2-post-installation-setup)
- [Step 2.1: Create the HTTP(s) Connection Record](#step-21-create-the-https-connection-record)
- [Step 2.2: (Optional) HTTP(s) Connection Setup](#step-22-optional-https-connection-setup)
- [Step 2.3: Create Application Parameters](#step-23-create-application-parameters)
- [Step 2.4: Create or select own company](#step-24-create-or-select-own-company)
- [Step 2.5: Setup Temporary Admin Connection to NetBox](#step-25-setup-temporary-admin-connection-to-netbox)
- [Step 2.6: Setup ServiceNow to NetBox Credentials](#step-26-setup-servicenow-to-netbox-credentials)
- [Step 2.7: Associate Credentials](#step-27-associate-credentials)
- [Step 2.8: Setup NetBox to ServiceNow Credentials](#step-28-setup-netbox-to-servicenow-credentials)
- [Step 2.9: Test Connections](#step-29-test-connections)

### [Common Installation Issues](#common-installation-issues)

---

## Before Starting

Before you start the installation, ensure the following requirements are met:

- **Administrative Privileges**: You must be logged in with admin privileges on both NetBox and ServiceNow instances
- **ServiceNow Version**: Xanadu or Yokohama are certified for v1.2 of the NetBox CMDB Integration application
- **IntegrationHub License**: Your ServiceNow instance must be licensed for IntegrationHub for proper integration functionality

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
   - Once the file has uploaded, click on the **Preview** button
   - ⏱️ *This operation may take several minutes*
   - Review and skip or accept any conflicts
     - If the choice if not clear wether to skip or accept, speak to a NetBox Labs representative for specific instruction

4. **Commit the Update Set**
   - After the preview is complete, click the **Commit** button
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
- Install all the suggested plugins
- These plugins are mandatory for the integration to work

📝 *Note: Plugin installation runs in the background. You don't need to wait for completion before proceeding to the next phase.*

## Phase 2: Post-Installation Setup

Complete the following configuration steps:

### Step 2.1: Create the HTTP(s) Connection Record

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

### Step 2.2: (Optional) HTTP(s) Connection Setup

- This step allows you to modify connection parameters if needed later in the setup
- Return to this step if connection adjustments are required

### Step 2.3: Create Application Parameters

Configure application parameters based on your installation scenario:

**For New Installations**:
- When prompted: *"No existing NetBox parameters detected, this looks like a new install. Parameters will be created after pressing Save"*
- Press **Save** to create new parameters with default values

**For Existing Installations**:
- The system displays the number of existing parameters
- Choose whether to overwrite existing parameters with default values
- Missing parameters will be automatically recreated with default values

### Step 2.4: Create or select own company

**Give the NetBox application a reference to your own company**:

1. **Purpose**
   - When Department records are imported from NetBox, they will be associated to the selected company

2. **Select or create the record**
   - If your company already exists in ServiceNow, select it from the list
   - If not, enter its name in the text field and click Save

### Step 2.5: Setup Temporary Admin Connection to NetBox

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

### Step 2.6: Setup ServiceNow to NetBox Credentials

**Create credentials for ServiceNow to access NetBox API**:

1. **Create API Credentials on NetBox**
   - Configure the following fields:
     - **Username**: Set appropriate username
     - **Password**: Set secure password
     - **API Token**: Generate API token

2. **Critical API Token Requirements**
   - ⚠️ **MANDATORY**: The API Token MUST be a hexadecimal string of exactly 32 characters
   - Example format: `a1b2c3d4e5f67890abcdef1234567890`

3. **Troubleshooting Connection Issues**
   - If errors occur, verify:
     - API Token format (32-character hexadecimal string)
     - HTTP(s) connection record configuration (Step 2.1)
     - Temporary admin credentials (Step 2.5)

### Step 2.7: Associate Credentials

**Link credentials to the connection record**:

1. **Manual Association Required**
   - Follow on-screen instructions to manually associate the credentials created in Step 2.6
   - Link to the HTTP(s) Connection record created in Step 2.1
   - **Remember to save** before proceeding to the next step

### Step 2.8: Setup NetBox to ServiceNow Credentials

**Create credentials for NetBox to access ServiceNow API**:

1. **Create ServiceNow API Access**
   - Configure the following:
     - **Username**: Set appropriate username (modifiable)
     - **Password**: Set secure password (modifiable)
     - **API Key**: Automatically generated (do not modify)

2. **Integration Notes**
   - Credentials are stored locally and in your NetBox instance
   - ServiceNow credentials are stored in NetBox webhook headers

3. **Troubleshooting**
   - If errors occur, verify:
     - HTTP(s) connection record configuration (Step 2.1)
     - Temporary admin credentials (Step 2.5)

### Step 2.9: Test Connections

**Validate bidirectional connectivity**:

1. **Connection Testing**
   - Test ServiceNow to NetBox communication
   - Test NetBox to ServiceNow communication
   - Verify API responses and authentication

2. **Validation Steps**
   - Confirm all connection parameters are correct
   - Validate credential associations
   - Monitor for any errors or warnings

## Common Installation Issues

|Issue | Possible Cause | Solution |
|-------|---------------|----------|
|Update Set Import Fails | File corruption or version mismatch | Re-download update set from NetBox Labs |
|Plugin Installation Errors | Missing dependencies or insufficient permissions | Verify ServiceNow admin privileges and dependency requirements |
|Connection Test Fails | Network connectivity or firewall issues | Check network configuration and firewall rules |
|API Token Rejected | Incorrect token format | Ensure API token is exactly 32 hexadecimal characters |
|Credential Association Fails | Timing or configuration issues | Retry association after verifying all previous steps |
|Temporary Admin Channel Failed | Invalid NetBox admin credentials | Verify NetBox admin credentials and permissions |
