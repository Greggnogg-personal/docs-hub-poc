---
title: Snow Technical Info
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
lastUpdatedAt: 1758858700000
canonical: /docs/integrations/tool-integrations/v1.2.6/servicenow/snow-technical-info/
---

# Technical Information

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

|Table Name | Purpose | Key Fields |
|------------|---------|------------|
|`x_990381_netbox_cl_devices_import_set` | Staging table for NetBox devices | Device name, serial, asset tag, device type, site, location, status |
|`x_990381_netbox_cl_device_types_import_set` | Staging table for NetBox device types | Model, manufacturer, height, weight, specifications |
|`x_990381_netbox_cl_netbox_sites_import` | Staging table for NetBox sites | Site name, description, physical address, contact information |
|`x_990381_netbox_cl_netbox_regions_import` | Staging table for NetBox regions | Region name, description, hierarchy |
|`x_990381_netbox_cl_netbox_clients_import` | Staging table for NetBox tenants/clients | Client name, description, contact details |
|`x_990381_netbox_cl_netbox_departments_imports` | Staging table for NetBox departments | Department information and organizational structure |
|`x_990381_netbox_cl_netbox_manufacturers_import` | Staging table for NetBox manufacturers | Manufacturer name, description, contact information |
 |
### Other Custom Tables

|Table Name | Purpose | Key Fields |
|------------|---------|------------|
|`x_990381_netbox_cl_netbox_notification_queue` | Queue for incoming NetBox notifications received through the NetBox REST API | Notification type, status, payload |
|`x_990381_netbox_cl_netbox_parameters` | Configuration parameters | Parameter name, value, description |
 |
## Extended ServiceNow Tables

The application extends existing ServiceNow tables with NetBox-specific fields:

### Configuration Item (cmdb_ci)
|Field Name | Type | Purpose |
|------------|------|---------|
|`x_990381_netbox_cl_netbox_correlation_id` | String | Unique identifier linking ServiceNow CI to NetBox object |
|`x_990381_netbox_cl_netbox_synchronize` | Boolean | Flag indicating if CI should be synchronized with NetBox |
|`x_990381_netbox_cl_netbox_ready_export` | Boolean | States if a record, after validation, is ready to be exported to NetBox |
|`x_990381_netbox_cl_netbox_ready_message` | String | States the result of a record validation |
 |
### Location (cmn_location)
|Field Name | Type | Purpose |
|------------|------|---------|
|`x_990381_netbox_cl_netbox_correlation_id` | String | Unique identifier linking ServiceNow location to NetBox location |
|`x_990381_netbox_cl_netbox_synchronize` | Boolean | Flag indicating if location should be synchronized with NetBox |
|`x_990381_netbox_cl_is_netbox_site` | Boolean | States if a location record in ServiceNow must be interpreted as a Site in NetBox |
|`x_990381_netbox_cl_is_netbox_region` | Boolean | States if a location record in ServiceNow must be interpreted as a Region in NetBox |
|`x_990381_netbox_cl_level` | Integer | Hierarchical level in NetBox location structure |
|`x_990381_netbox_cl_netbox_ready_export` | Boolean | States if a record, after validation, is ready to be exported to NetBox |
|`x_990381_netbox_cl_netbox_ready_message` | String | States the result of a record validation |
 |
### Hardware Product Model (cmdb_hardware_product_model)
|Field Name | Type | Purpose |
|------------|------|---------|
|`x_990381_netbox_cl_netbox_correlation_id` | String | Links ServiceNow model to NetBox device type |
|`x_990381_netbox_cl_netbox_synchronize` | Boolean | Flag indicating if model should be synchronized with NetBox |
|`x_990381_netbox_cl_netbox_ready_export` | Boolean | States if a record, after validation, is ready to be exported to NetBox |
|`x_990381_netbox_cl_netbox_ready_message` | String | States the result of a record validation |
 |
### Department (cmn_department)
|Field Name | Type | Purpose |
|------------|------|---------|
|`x_990381_netbox_cl_netbox_correlation_id` | String | Links ServiceNow department to NetBox tenant |
|`x_990381_netbox_cl_netbox_synchronize` | Boolean | Flag indicating if department should be synchronized with NetBox |
|`x_990381_netbox_cl_netbox_ready_export` | Boolean | States if a record, after validation, is ready to be exported to NetBox |
|`x_990381_netbox_cl_netbox_ready_message` | String | States the result of a record validation |
 |
### Company (core_company)
|Field Name | Type | Purpose |
|------------|------|---------|
|`x_990381_netbox_cl_netbox_correlation_id` | String | Links ServiceNow company to NetBox organization |
|`x_990381_netbox_cl_netbox_synchronize` | Boolean | Flag indicating if company should be synchronized with NetBox |
|`x_990381_netbox_cl_netbox_ready_export` | Boolean | States if a record, after validation, is ready to be exported to NetBox |
|`x_990381_netbox_cl_netbox_ready_message` | String | States the result of a record validation |
 |
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
3. **Event Queue Processing**: A flow named NetBox Notification Queue Processing is triggered by the addition of a record in the queue and starts processing the notification, first by validating the NetBox object to see if it and all its dependencies (like a site's region) are also properly tagged and not already present in ServiceNow.
4. **Fetching the Data, Buffering and ETL**: The same flow calls the NetBox API to get all objects that are not already present in ServiceNow. Steps 2, 3 and 4 of the bulk import process are exactly followed, with the exception that the incoming objects are obtained by ID, one at a time, instead of in bulk.

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

## Logging

The NetBox CMDB Integration application supports three levels of logging verbosity, adjusted in **All > NetBox > Configuration > Application Parameters** through Log Level:
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
- Manufacturer
- DeviceType
- Customer
- Department
- Device
