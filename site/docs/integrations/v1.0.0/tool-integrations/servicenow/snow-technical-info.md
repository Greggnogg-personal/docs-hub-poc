---
title: snow technical info
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
canonical: /docs/integrations/tool-integrations/servicenow/snow-technical-info/
---
# Technical Information

## Version Information
- **Application Version**: 1.4.0
- **ServiceNow Compatibility**: Certified for Yokohama and Zurich versions.

---

## Table of Contents

### [New Tables in ServiceNow](#new-tables-in-servicenow)
- [Import Set Tables](#import-set-tables)
- [Other Custom Tables](#other-custom-tables)

### [Extended ServiceNow Tables](#extended-servicenow-tables)
- [Configuration Item (cmdb_ci)](#configuration-item-cmdb_ci)
- [Location (cmn_location)](#location-cmn_location)
- [Hardware Product Model (cmdb_hardware_product_model)](#hardware-product-model-cmdb_hardware_product_model)
- [Department (cmn_department)](#department-cmn_department)
- [Company (core_company)](#company-core_company)

### [CI Class Management](#ci-class-management)

### [Tenant Synchronization Configuration](#tenant-synchronization-configuration)

### [Data Synchronization - Import](#data-synchronization---import)
- [Bulk Import from NetBox](#bulk-import-from-netbox)
- [Real-time Import from NetBox](#real-time-import-from-netbox)

### [Data Synchronization - Export](#data-synchronization---export)
- [Bulk Export to NetBox](#bulk-export-to-netbox)
- [Real-time Export to NetBox](#real-time-export-to-netbox)

### [Logging](#logging)
- [What to look for in the Application Log](#what-to-look-for-in-the-application-log)

---

## New Tables in ServiceNow

The NetBox CMDB Integration application creates several new tables in ServiceNow for staging imported data from NetBox or for other purposes:

### Import Set Tables

| Table Name | Purpose | Key Fields |
|------------|---------|------------|
| `x_nbl_cmdb_devices_import_set` | Staging table for NetBox devices | Device name, serial, asset tag, device type, site, location, status |
| `x_nbl_cmdb_device_types_import_set` | Staging table for NetBox device types | Model, manufacturer, height, weight, specifications |
| `x_nbl_cmdb_netbox_sites_import` | Staging table for NetBox sites | Site name, description, physical address, contact information |
| `x_nbl_cmdb_netbox_regions_import` | Staging table for NetBox regions | Region name, description, hierarchy |
| `x_nbl_cmdb_netbox_locations_import` | Staging table for NetBox locations | Location name, description, site reference, parent location, hierarchy |
| `x_nbl_cmdb_netbox_clients_import` | Staging table for NetBox tenants/clients | Client name, description, contact details |
| `x_nbl_cmdb_netbox_departments_imports` | Staging table for NetBox departments | Department information and organizational structure |
| `x_nbl_cmdb_netbox_manufacturers_import` | Staging table for NetBox manufacturers | Manufacturer name, description, contact information |

### Other Custom Tables

| Table Name | Purpose | Key Fields |
|------------|---------|------------|
| `x_nbl_cmdb_netbox_notification_queue` | Queue for incoming NetBox notifications received through the NetBox REST API | Notification type, status, payload |
| `x_nbl_cmdb_netbox_parameters` | Configuration parameters | Parameter name, value, description |

## Extended ServiceNow Tables

The application extends existing ServiceNow tables with NetBox-specific fields:

### Configuration Item (cmdb_ci)
| Field Name | Type | Purpose |
|------------|------|---------|
| `x_nbl_cmdb_netbox_correlation_id` | String | Unique identifier linking ServiceNow CI to NetBox object |
| `x_nbl_cmdb_netbox_synchronize` | Boolean | Flag indicating if CI should be synchronized with NetBox |
| `x_nbl_cmdb_netbox_ready_export` | Boolean | States if a record, after validation, is ready to be exported to NetBox |
| `x_nbl_cmdb_netbox_ready_message` | String | States the result of a record validation |

### Location (cmn_location)
| Field Name | Type | Purpose | Notes |
|------------|------|---------|-------|
| `x_nbl_cmdb_netbox_correlation_id` | String | Unique identifier linking ServiceNow location to NetBox location | |
| `x_nbl_cmdb_netbox_synchronize` | Boolean | Flag indicating if location should be synchronized with NetBox | |
| `x_nbl_cmdb_netbox_type` | Choice | Specifies whether location is a Region, Site, or Location in NetBox | Values: 'region', 'site', 'location' |
| `x_nbl_cmdb_is_netbox_site` | Boolean | ~~States if a location record in ServiceNow must be interpreted as a Site in NetBox~~ | **DEPRECATED**: Use `netbox_type` instead |
| `x_nbl_cmdb_is_netbox_region` | Boolean | ~~States if a location record in ServiceNow must be interpreted as a Region in NetBox~~ | **DEPRECATED**: Use `netbox_type` instead |
| `x_nbl_cmdb_level` | Integer | Hierarchical level in NetBox location structure | |
| `x_nbl_cmdb_netbox_ready_export` | Boolean | States if a record, after validation, is ready to be exported to NetBox | |
| `x_nbl_cmdb_netbox_ready_message` | String | States the result of a record validation | |

**Location Classification Logic**:
Locations are classified as Region, Site, or Location based on multiple factors in the following priority order:
1. Explicit `netbox_type` field value (takes precedence)
2. ServiceNow Location Type matching configured defaults
3. Hierarchical position relative to Sites (above = Region, below = Location)

See FAQ for detailed classification rules and configuration options.

### Hardware Product Model (cmdb_hardware_product_model)
| Field Name | Type | Purpose |
|------------|------|---------|
| `x_nbl_cmdb_netbox_correlation_id` | String | Links ServiceNow model to NetBox device type |
| `x_nbl_cmdb_netbox_synchronize` | Boolean | Flag indicating if model should be synchronized with NetBox |
| `x_nbl_cmdb_netbox_ready_export` | Boolean | States if a record, after validation, is ready to be exported to NetBox |
| `x_nbl_cmdb_netbox_ready_message` | String | States the result of a record validation |

### Department (cmn_department)
| Field Name | Type | Purpose |
|------------|------|---------|
| `x_nbl_cmdb_netbox_correlation_id` | String | Links ServiceNow department to NetBox tenant |
| `x_nbl_cmdb_netbox_synchronize` | Boolean | Flag indicating if department should be synchronized with NetBox |
| `x_nbl_cmdb_netbox_ready_export` | Boolean | States if a record, after validation, is ready to be exported to NetBox |
| `x_nbl_cmdb_netbox_ready_message` | String | States the result of a record validation |

### Company (core_company)
| Field Name | Type | Purpose |
|------------|------|---------|
| `x_nbl_cmdb_netbox_correlation_id` | String | Links ServiceNow company to NetBox organization |
| `x_nbl_cmdb_netbox_synchronize` | Boolean | Flag indicating if company should be synchronized with NetBox |
| `x_nbl_cmdb_netbox_ready_export` | Boolean | States if a record, after validation, is ready to be exported to NetBox |
| `x_nbl_cmdb_netbox_ready_message` | String | States the result of a record validation |

## CI Class Management

The application provides dynamic CI class management, allowing administrators to register any ServiceNow CI class for NetBox integration without code modifications.

**Implementation**:

1. **NetBox Custom Field**:
   - Custom field `servicenow_ci_class` created on NetBox Devices
   - Choice list dynamically populated with registered ServiceNow CI classes
   - Field value determines target CI class during import to ServiceNow

2. **Class Registration System**:
   - **Script Include**: `NetBoxClassificationUtils` manages class registration/deregistration
   - **Configuration UI**: Class Manager page (**All > NetBox > Configuration > Class Manager**)
   - **Application Parameter**: `NetBox Choice Set ID for Classes` stores the NetBox custom field choice set ID
   - **Registration Process**:
     - Select CI classes from ServiceNow CMDB hierarchy
     - System automatically creates choice entries in NetBox
     - Registered classes synchronized across ServiceNow and NetBox
   - **Performance**: Recommend registering up to 6 classes at a time

3. **Default Registered Classes**:
   - `cmdb_ci_hardware` (Hardware)
   - `cmdb_ci_server` (Server)
   - `cmdb_ci_ip_router` (IP Router)
   - `cmdb_ci_ip_switch` (IP Switch)
   - `cmdb_ci_ip_firewall` (IP Firewall)
   - `cmdb_ci_wap_network` (Wireless Access Point)
   - `cmdb_ci_virtualization_server` (Virtualization Server)
   - `cmdb_ci_power_eq` (Power Equipment)
   - `cmdb_ci_facility_hardware` (Facility Hardware)

4. **Device Classification**:
   - **Script Include**: `NetBoxDeviceNB` validates and applies CI class from NetBox custom field
   - **Validation**: Ensures CI class is registered before import
   - **Backward Compatibility**: Role-based classification still supported as fallback

## Tenant Synchronization Configuration

The application provides flexible tenant synchronization configuration, allowing control over how NetBox Tenants are imported and exported.

**Implementation**:

1. **Configuration UI**:
   - **Setup Page**: **All > NetBox > Configuration > Setup Tenant Usage**
   - **Script Include**: `NetBoxTenantNB` handles tenant classification logic
   - **Data Broker Transforms**: Process tenant usage selections and configure parameters

2. **Configuration Options**:
   | Option | Import Customers | Import Departments | Export Customers | Export Departments | Tenant Group IDs |
   |--------|------------------|-------------------|------------------|-------------------|------------------|
   | Both | true | true | true | true | **MANDATORY** - Required to distinguish Customers from Departments |
   | Customers only | true | false | true | false | Ignored |
   | Departments only | false | true | false | true | Ignored |
   | None | false | false | false | false | Not used |

3. **Tenant Group ID Integration**:
   - **"Both" Configuration**: Tenant Group IDs MUST be specified to distinguish which NetBox tenant group contains Customers vs Departments
   - **"Customers only" / "Departments only"**: All tenants synchronize as the selected type

4. **Related Parameters**:
   - `Import NetBox Customers`
   - `Import NetBox Departments`
   - `Export NetBox Customers`
   - `Export NetBox Departments`
   - `NetBox Tenant Group ID for Customers` (mandatory when "Both", ignored otherwise)
   - `NetBox Tenant Group ID for Departments` (mandatory when "Both", ignored otherwise)

## Data Synchronization - Import

Data may be imported into ServiceNow using one or both of these two methods:
1. **Bulk Import** triggered in ServiceNow using a Flow
2. **Real-time sync** triggered by create, update or delete events in NetBox

### Bulk Import from NetBox

Importing data in bulk implies the following sequential actions:
1. **Trigger the Flow**: In Flow Designer, the NetBox Bulk Import flow is triggered manually with the Test function, or on a determined schedule, the latter requiring the activation of the flow (inactive by default)
2. **Fetching the Data**: Data is fetched through flow actions that make use of the NetBox API. A series of queries looking for the ServiceNowSyncTo tags is made, and one data file per object type is fetched. Each file contains all the records for the type. The "Import NetBox [ObjectType]" parameters are honored, so files only get imported if a given parameter for an object type is set to `true`. The fetching order is generally from foundation to complex objects so that reference fields can be populated first, for example, manufacturers come before device types so that the manufacturer field for the device type record can be properly referenced in ServiceNow.
3. **Buffering Phase**: Incoming data files are attached to the "NetBox Buffer" data source, which has no transform map and serves only as temporary storage. The "NetBox Cycle Buffer" flow runs periodically to move files from the buffer to their destination data source, determined from the files' names.
4. **Extract, Transform and Load Phase**: When reaching their destination data sources, the files are extracted to staging tables, one per object type, and become Import Sets. For non-CMDB objects, a simple transformer checks for the existence of a NetBox Correlation ID or a matching name to identify existing records. For imported devices, a robust transformer is in place to classify CIs and identify existing records through the normal existing IRE process.

### Real-time Import from NetBox

When a record is created, updated or deleted on NetBox, the following actions take place:
1. **NetBox Event Trap and Webhook**: The event is trapped by NetBox and triggers a Webhook to the NetBox CMDB Integration application's API in ServiceNow.
2. **API Responder and Event Notification**: In ServiceNow, the application's API receives the call and converts it to an event notification by creating a record in table NetBox Notifications. The notification contains the event and object type, the object's NetBox ID, as well as a ServiceNow sys_id if found.
3. **Event Queue Processing**: A flow named NetBox Notification Queue Processing is triggered by the addition of a record in the queue and starts processing the notification, first by validating the NetBox object to see if it and all its dependencies (like a site's region) are also properly tagged and not already present in ServiceNow. A cache mechanism is in place to avoid fetching the same objects more than once in a given period of time.
4. **Fetching the Data, Buffering and ETL**: The same flow calls the NetBox API to get all objects that are not already present in ServiceNow. Steps 2, 3 and 4 of the bulk import process are exactly followed, with the exception that the incoming objects are obtained by ID, one at a time, instead of in bulk.

### Duplicate Prevention on CMDB and Non-CMDB Objects

1. **Incoming CMDB Objects** benefit from the same identification and reconciliation rules that are currently available in your ServiceNow installation. Identification of CIs is made on the new NetBox Correlation ID field, but also on the usual fields such as name, asset tag, IP address, etc. No specific reconciliation rules are provided with the application, but they can be added according to your situation if you have a multi-sourced CMDB.
2. **Incoming Non-CMDB Objects** are also matched on the new NetBox Correlation ID field, but also on name if the field is empty, for example on a first sync.
3. **Outgoing CMDB and Non-CMDB Objects** will be rejected by NetBox on their first sync if they violate unicity rules on name, slug or other table-specific fields. This rejection will prompt ServiceNow to fetch the existing object's ID number and to reattempt an update on the record rather than creating a new one.

## Data Synchronization - Export

Data is exported from ServiceNow into NetBox using one or both of these two methods:
1. **Bulk Export** triggered in ServiceNow using a Flow
2. **Real-time sync** triggered by create, update or delete events in ServiceNow

### Bulk Export to NetBox

The process of exporting data in bulk follows these steps:
1. **Trigger the Flow**: In Flow Designer, the NetBox Bulk Export flow is triggered manually with the Test function, or on a determined schedule, the latter requiring the activation of the flow (inactive by default)
2. **Validating the Devices**: Device records meant to be exported are validated by checking that they and all their dependencies are properly marked with the NetBox Synchronize flag. Invalid objects are marked as such and are excluded from the export.
3. **Exporting the Objects**: From foundation to complex objects, objects that are marked with the NetBox Synchronization flag but don't already have a NetBox Correlation ID, meaning that they have never been synchronized, are queried from their respective tables. From there, they are sent (posted) to NetBox through its API, one by one.

### Real-time Export to NetBox

When a ServiceNow record is created, updated or deleted, the following actions take place:
1. **Flow Trigger**: One of the NetBox Create/Update [ObjectType] flows gets triggered by the event. According to the event type, it will create (post), update (patch) or delete the same record over on NetBox.

## CI Classification, Identification and Reconciliation

### Incoming Data

1. **Classification**

The application supports two classification methods for imported devices:

**Primary Method - Custom Field Classification**:
- Uses NetBox custom field `servicenow_ci_class` on device records
- Device imported to CI class specified in custom field
- CI class must be registered through Class Manager
- Validation occurs before import; invalid classes logged and device skipped

**Fallback Method - Role-Based Classification**:
- When `servicenow_ci_class` custom field is not set, classification uses NetBox device role
- A keyword match is applied on the role name or role slug and the CI is statically mapped to the classes listed in the table below:
| Role Name or Slug Contains | Mapped CI Class | Table name |
|----------------------------|-----------------|------------|
| router | IP Router | cmdb_ci_ip_router |
| switch | IP Switch | cmdb_ci_ip_switch |
| vsphere | Virtualization Server | cmdb_ci_virtualization_server |
| virtualization-server | Virtualization Server | cmdb_ci_virtualization_server |
| server | Server | cmdb_ci_server |
| wireless-access-point | Wireless Access Point | cmdb_ci_wap_network |
| wap | Wireless Access Point | cmdb_ci_wap_network |
| pdu | Power Equipment | cmdb_ci_power_eq |
| firewall | IP Firewall | cmdb_ci_ip_firewall |
| patch-panel | Facility Hardware | cmdb_ci_facility_hardware |
| (other) | Hardware | cmdb_ci_hardware |

- Role-based classification rules can be customized by editing the Devices Transformer in table **CMDB Integration Studio Application Data Source** (cmdb_inst_application_feed), or in IntegrationHub ETL

2. **Identification**
- The NetBox CMDB Integration application inserts one identification rule under cmdb_ci_hardware
- It is based on the new NetBox Correlation ID field, a unique record number in NetBox
- It is ordered at 250, usually between the serial number and the name fields
- Other identification rules, either ServiceNow defaults or customized, remain active
- The identification rule can be customized in the CI Class Manager, under table Hardware

3. **Reconciliation**
- No reconciliation rules are added by the application
- The application will adapt to your own rules in a manner that suits your data governance

### Outgoing Data

1. **Classification**

**CI Class Assignment**:
- Exported devices have their CI class automatically populated in NetBox custom field `servicenow_ci_class`
- **Script Include**: `NetBoxDeviceSN` determines CI class from `sys_class_name` field
- CI class validated against registered classes before export
- Enables proper round-trip synchronization (export from ServiceNow, import back with correct class)

**Role Assignment**:
- Generic role ID defined in Application Parameters still used for device role
- ServiceNow classes do not translate to dynamic NetBox roles
- All exported devices assigned the same generic role ID
- See [User Guide, Application Parameters](snow-user-guide.md#application-parameters) for role configuration

## Logging

The NetBox CMDB Integration application supports three levels of logging verbosity, adjusted in **All > NetBox > Configuration > Application Parameters** through Log Level (see [User Guide, Application Parameters](snow-user-guide.md#application-parameters)):
- Low: logs minimal information
- Medium (default): logs beginning and end of synchronization processes
- High: logs entire synchronization processes

### What to look for in the Application Log

Log entries are marked with the process name that generates them to help you filter them:
- Import events
   - [NetBox Notification API] Webhooks received from NetBox and Loop avoidance information
   - [NetBox Notification Queue Processing] Notifications that come from the API responder into the flow that processes them
   - [NetBoxDependencyManager] Dependency checking for a given remote object
   - [NetBox[ObjectType]NB] Validation of remote objects
- Export events
   - [Create/Update NetBox [ObjectType]]: Flows triggered by table events that meet the NetBox conditions
   - [NetBox[ObjectType]SN] Validation and dependency checking for local ServiceNow objects
- Other common events
   - [NetBoxSetup.rest] REST API calls made from ServiceNow to NetBox with result code
   - [NetBoxUtils.*] Various methods for data manipulation, conversion and movement

Where [ObjectType] is one of:
- Region
- Site
- Location
- Manufacturer
- DeviceType
- Customer
- Department
- Device
