---
title: Snow User Guide
description: ServiceNow NetBox CMDB Integration documentation - Version v1.4.012
tags:
  - cloud
  - enterprise
  - integration
  - netbox
  - operator
  - servicenow
  - version-1-4-012
source: localdocs
version: v1.4.012
lastUpdatedAt: 1768942587000
canonical: /docs/integrations/tool-integrations/v1.4.012/servicenow/snow-user-guide/
---

# User Guide

## Version Information
- **Application Version**: 1.4.0
- **ServiceNow Compatibility**: Certified for Yokohama and Zurich versions.

---

## Table of Contents

### [Introduction](#introduction)

### [Configuration](#configuration)
- [Guided Setup](#guided-setup)
- [Application Parameters](#application-parameters)
- [Connection and Credentials](#connection-and-credentials)
- [Data Sources](#data-sources)
- [Scheduled Data Imports](#scheduled-data-imports)

### [Data Synchronization](#data-synchronization)
- [Object Types and Mappings](#object-types-and-mappings)
- [Synchronization Control](#synchronization-control)
- [Data Validation](#data-validation)

### [Application Maintenance](#application-maintenance)
- [NetBox Logs](#netbox-logs)
- [Event Queue and Cache](#event-queue)
- [Test Connections](#test-connections)

### [Use Cases and Best Practices](#use-cases-and-best-practices)
- [Unidirectional Data Flow - ServiceNow to NetBox](#unidirectional-data-flow---servicenow-to-netbox)
- [Unidirectional Data Flow - NetBox to ServiceNow](#unidirectional-data-flow---netbox-to-servicenow)
- [Hybrid Data Flows](#hybrid-data-flows)
- [Alternating Data Flows](#alternating-data-flows)
- [Bidirectional Data Flows](#bidirectional-data-flows)

### [Implementation Examples](#implementation-examples)
- [ServiceNow as Authoritative Source on All Object Types](#servicenow-as-authoritative-source-on-all-object-types)
- [NetBox as Authoritative Source for Network Devices](#netbox-as-authoritative-source-for-network-devices)
- [Hybrid Data Flow with Data Governance Compliance](#hybrid-data-flow-with-data-governance-compliance)
- [Alternating Data Flows to Bidirectional Synchronization](#alternating-data-flows-to-bidirectional-synchronization)

---

## Introduction

NetBox CMDB Integration is a custom application, also known as a scoped application, that resides on a ServiceNow instance. Its main purpose is to facilitate the real-time exchange of data between ServiceNow and NetBox in a way that minimizes duplicate entries on both systems, thus reducing the chances for data obsolescence.

As both systems have different objectives and therefore different users, operational realities in the enterprise might warrant their concurrent use, a natural situation that risks compromising the perceived "source of truth" of corporate data.

The application was thus designed to allow data to flow in one or the other direction, or both at the same time. It works as well with cloud or on-premises instances of NetBox that reside behind a firewall, through the use of the ServiceNow Management, Instrumentation and Discovery (MID) server.

## Configuration

The NetBox CMDB Integration application comes with several granular means to configure and set it up in a way that will adapt to your environment. The following sections detail the configuration options available in the **All > NetBox > Configuration** menu items.

### Guided Setup

The Guided Setup provides a playbook-oriented step-by-step guide to configure the application initially. It may also be reused at any given time if, for example, some functionality stops working and needs to be reset to its out-of-box configuration.

Guided Setup configures both ServiceNow and NetBox from a central location. A complete description of its steps is offered in the [Installation guide](snow-installation.md) for the application.

### Application Parameters

Application parameters, sometimes referred to as NetBox parameters in ServiceNow, are user-controlled key-value pairs that will instruct the application on how to function in given situations. Refer to the table below to find a definition for each describing how it works, its possible value and what happens if you leave the parameter value blank.

|Parameter | Definition | Possible Values | Blank behavior |
|-----------|------------|-----------------|----------------|
|Import NetBox [ObjectType] | This family of parameters specifies which object types should be imported into ServiceNow from NetBox. The parameters are global, meaning that they will allow or prevent all objects of that type from synchronizing | true|false | Interpreted as false |
|Export NetBox [ObjectType] | This family of parameters specifies which object types should be exported from ServiceNow to NetBox. The parameters are global, meaning that they will allow or prevent all objects of that type from synchronizing | true|false | Acts as false |
|NetBox Tenant Group ID for [ObjectType] | Because of differences in their respective data models, the application must distinguish between NetBox Tenants that should be interpreted as Customers or as Departments. For this, Tenant Groups are used on NetBox to give the Tenants a category. The ID of those groups, one for Customers and one for Tenants, is specified here. | Integer ID values that exist in the Tenant Groups section on NetBox | **MANDATORY when "Both" is selected** in Setup Tenant Usage (required to distinguish Customers from Departments). IGNORED when only Customers or only Departments are synchronized (all tenants of that type will synchronize when blank). Use **All > NetBox > Configuration > Setup Tenant Usage** for simplified configuration. |
|Role ID - Generic | When exporting CIs to NetBox, ServiceNow will use this role ID for all of them. Note: CI class information is separately synchronized through the `servicenow_ci_class` custom field in NetBox. Manage CI classes through **All > NetBox > Configuration > Class Manager**. | Integer ID of a Device Role in NetBox | MANDATORY - Absence of a value will break the Device synchronization |
|Default Import Company | When importing NetBox Tenants as Departments, the Default Import Company parameter is used to set the Department's Company field. This value should refer to your own company in ServiceNow | A valid sys_id from the core_company table | Imported Departments will have no value in their Company field |
|API user in ServiceNow | This is the name of the user account in ServiceNow by which NetBox gains access to the application's API | A string value representing the user name | No effect, used for reference only |
|API user in NetBox | This is the name of the user account in NetBox by which ServiceNow gains access to its REST API | A string value representing the user name | No effect, used for reference only |
|Force NetBox Synchronize flag on dependencies | When exporting objects to NetBox, for example a Site, ServiceNow will validate if the record and all its dependencies (ex. the Site's Regions) are flagged with NetBox Synchronize. When this parameter is set to `true`, the flag will be "forced" to `true` on all objects. If it is set to `false` and the object or its dependencies are not flagged, the synchronization will be cancelled and a reason will be given in the logs and on the record for the aborted export (see [NetBox Logs](#netbox-logs under the Application Maintenance section and [Data Validation](#data-validation) under the Data Synchronization section below). | true|false | Interpreted as false |
|Force ServiceNowSyncTo tag on dependencies | When importing objects from NetBox, for example a Device Type, ServiceNow will validate if the remote record and all its dependencies (ex. the Device Type's Manufacturer) are tagged with ServiceNowSyncTo. When this parameter is set to `true`, the tag will be "forced" to `true` on all objects. If it is set to `false` and the object or its dependencies are not tagged, the synchronization will be cancelled and a reason will be given in the logs for the aborted import (see [NetBox Logs](#netbox-logs under the Application Maintenance section below). | true|false | Interpreted as false |
|NetBox Log Level | Sets the verbosity of logged events | Low|Medium|High | MANDATORY - Absence of a value may disrupt the logging functionality |
 |
### Connection and Credentials

This record shows the NetBox API Connection and Credential Alias record, used when API calls are made from ServiceNow to NetBox. It contains one connection record, also named NetBox API, that is created manually during the Guided Setup Process. This record specifies the address of your NetBox instance and the MID Server parameters. The connection record also refers to the credential record, named NetBox API Token, which is created automatically during the Guided Setup, but linked manually to the connection record. 

### Data Sources

The import process in the application, from NetBox to ServiceNow, is governed by API calls made to get the desired data. The returned JSON payloads are saved to files that are attached to ServiceNow data sources, made to ingest the data through transform maps for non-CMDB tables, and a robust transform map designed with Integration Hub ETL for CMDB data.

**Data File Buffering** Because data sources can only contain one file at a time, and because data synchronization between systems is asynchronous in nature, a buffering mechanism exists to hold files temporarily until the data sources become free again. The NetBox Buffer data source will therefore contain an arbitrary number of files that will trickle down to their destination data source over time. For large import operations, it may be useful to keep an eye on the buffer to see how things are moving along with the import process.

**Buffer Files Priority Management** Files in the buffer will be named according to their destination data source (devices, sites, etc.), and are prefixed with a number (100, 200, 300, 400). This number represents the order by which the data files will be moved to their destination data source. Specifically, all 100- files must be cleared out of the buffer before the 200- files will begin moving, and all of the latter must also be cleared before the 300- files are processed, and so on. This is done to honor dependencies, or references, between objects in a manner that respects a foundation-to-complex scheme, foundation objects (100-) being objects that have no references to other objects, dependent objects (200-, 300-) having references to foundation or other dependent objects, and complex objects (400-) having references to all other object types. The table below illustrates that concept.

|Level | Object type / file | References |
|-------|--------------------|------------|
|100 (foundation) | Customers | |
|Manufacturers | |
|Locations | Locations (hierarchy) |
|200 (dependent) | Departments | Customers |
|Device Types | Manufacturers |
|Regions | Regions (hierarchy) |
|300 (dependent) | Sites | Regions |
|400 (complex) | Devices | Customers |
|| Departments |
|| Device Types |
|| Manufacturers |
|| Sites or Locations |
 |

**Hierarchical Objects**. Both Locations and Regions in NetBox have parent-child relationships, forming hierarchies. To honor their dependencies to one another, hierarchical objects are ordered within their respective priority levels. A location or region hierarchy will always be imported in a single file with objects ordered from top-most parent to lowest child. Because import sets treat multiple entries sequentially from top to bottom, the hierarchies are preserved.

### Scheduled Data Imports

In order for data sources to process incoming files, they must be scheduled to trigger at regular intervals. By default, that interval is set for 5 minutes for the Manufacturers data source (a foundation object). The other data sources are daisy-chained from foundation to complex objects, set to run after the previous one completes.


## Data Synchronization

### Object Types and Mappings

The NetBox CMDB Integration application supports a number of objects that can be synchronized between systems, shown in the table below.

|NetBox Object Type | ServiceNow Mapping | Mapped Fields (NB ↔ SN) |
|--------------------|--------------------|---------------------------|
|Device | CIs of various classes | ID ↔ NetBox Correlation ID |
|| servicenow_ci_class (custom field) ↔ sys_class_name |
|| Device type ↔ Hardware product model |
|| Device Type Manufacturer ↔ Manufacturer |
|| Site ↔ Location |
|| Location ↔ Location |
|| Tenant ↔ Company or Department |
|| Name ↔ Name |
|| Asset tag ↔ Asset tag |
|| Serial Number ↔ Serial number |
|| Primary IP Address ↔ IP Address |
|| Description ↔ Description |
|| Status ↔ Installation status and Operational status |
|Device type | Hardware product models | ID ↔ NetBox Correlation ID |
|| Manufacturer ↔ Manufacturer |
|| Model ↔ Name and Model number |
|| Description ↔ Description |
|| Height ↔ Rack units |
|Manufacturer | Company | ID ↔ NetBox Correlation ID |
|| Name ↔ Name | 
|| -- ↔ Manufacturer = true |
|Site | Location | ID ↔ NetBox Correlation ID |
|| Region ↔ Parent |
|| Tenant ↔ Company |
|| -- ↔ Is NetBox Site = true |
|| -- ↔ Is NetBox Region = false |
|| -- ↔ Location type = Site |
|| Name ↔ Name |
|| Physical address ↔ Street |
|| Latitude ↔ Latitude |
|| Longitude ↔ Longitude |
|| Time zone ↔ Time zone |
|Region | Location | ID ↔ NetBox Correlation ID |
|| -- ↔ Is NetBox Site = false |
|| -- ↔ Is NetBox Region = true |
|| -- ↔ Location type = Region |
|| Name ↔ Name |
|Tenant | Company | ID ↔ NetBox Correlation ID |
|| --- ↔ Customer = true |
|| Name ↔ Name |
|Tenant | Department | ID ↔ NetBox Correlation ID |
|| Company ↔ Default Import Company (see [Application Parameters](#application-parameters) |
|| Name ↔ Name |
|| Description ↔ Description |
 |
**Distinguishing Between Customer and Department Tenants**. The application supports two types of NetBox Tenants. Configure tenant synchronization behavior through **All > NetBox > Configuration > Setup Tenant Usage**:
- **Both**: Synchronize tenants as both Customers and Departments. **REQUIRES** Tenant Group IDs to be specified in Application Parameters to distinguish which tenants should be Customers vs Departments.
- **Customers only**: Synchronize tenants only as Companies (customers). Tenant Group ID is ignored.
- **Departments only**: Synchronize tenants only as Departments. Tenant Group ID is ignored.
- **None**: Disable tenant synchronization entirely.

When Tenant Group IDs are specified, only tenants belonging to those specific Tenant Groups in NetBox will synchronize.

### Synchronization Control

The NetBox CMDB Integration offers table-level and record-level controls to specify which object types or records should or should not be synchronized between systems.  

**Import and Export Parameters in ServiceNow**. All global, table-level controls appear in the Import and Export Application Parameters. These are made to allow (value = `true`) or deny (value = `false`) movement of object types between systems. For example, one could decide that the source of truth for Sites, Regions, and Locations is in ServiceNow, therefore that these records should be exported to NetBox but never imported. This ensures a compliant flow of "truth" data in the selected direction.

**Configuration UI Pages**: Several configuration pages are available to simplify setup:
- **Setup Tenant Usage** (**All > NetBox > Configuration > Setup Tenant Usage**): Configure how tenants are synchronized
- **Setup Locations, Sites and Regions** (**All > NetBox > Configuration > Setup Locations, Sites and Regions**): Configure location type mapping
- **Class Manager** (**All > NetBox > Configuration > Class Manager**): Register CI classes for NetBox integration

**NetBox Synchronize Flag in ServiceNow**. At the record level, data will only be exported from ServiceNow to NetBox when records are flagged with NetBox Synchronize = `true`. 
- The flag can be manually turned on, or the application can automatically flag records when performing validation during exports (see [Data Validation](#data-validation). 
- **Please note** that any record imported from NetBox will have the flag automatically set. 
- Flagging one or more records on a form or in a list will immediately trigger record validation and export, but only if the Export parameter for that object type is set to `true`.
- Dependencies for that record, i.e. references to records of same or different types, will also immediately be flagged and exported, provided that:
   - Validation has passed (see [Data Validation](#data-validation);
   - Their respective Export parameters are set to `true`.

**ServiceNowSyncTo Tag in NetBox**. Similar to the flag in ServiceNow, NetBox also offers a means to mark records granularly with ServiceNowSyncTo tag. 
- The tag can manually be set, or it can be set automatically by ServiceNow when remote objects are being validated 
- Setting the tag on one or more objects in NetBox will immediately trigger an Webhook notification to ServiceNow and activate validation and import of that object.
- Dependencies of the initially tagged object will also be tagged and imported, provided that:
   - Remote validation has passed (see [Data Validation](#data-validation);
   - Their respective Import parameters are set to `true` in ServiceNow.

**ServiceNowSyncFrom Tag in NetBox**. This tag is automatically added when an object is exported from ServiceNow to NetBox. It does not act as a control on the NetBox side: it should only be seen as an indicator on data that comes from that source. 

### Data Validation

Data validation is performed in both directions when importing data into, or exporting data from, ServiceNow.

**ServiceNow Data Validation**. Validation of ServiceNow objects is performed on all object types before being exported, or when manually triggered using the NetBox view UI Actions described below. The validation includes:
- Checking for the Export parameter to be set to `true`;
   - Validation fails if the Export parameter of the initial object is turned off
- Checking that mandatory fields in NetBox are populated (e.g. Site is a mandatory field for a NetBox Device);
   - Validation fails is a mandatory field is a dependency and its Export parameter is turned off
- Checking that the record is flagged with NetBox Synchronize
   - Validation fails if the record is not flagged and the Force NetBox Synchronize Flag on Dependencies parameter is set to `false`
- Checking that all the record's dependencies are also flagged
   - Validation fails if a dependency is not flagged and the Force parameter is set to `false`

**Triggering Data Validation in ServiceNow**. Data validation in ServiceNow happens under these circumstances:
- When a record is flagged with NetBox Synchronize:
   - This triggers an immediate validation followed by an export if validation passes and the export parameter is set to `true` for the record and its dependencies;
- When a CI record is displayed in the NetBox view and the user clicks on the Refresh NetBox Export-Ready Status UI Action (under Related Links or the context menu):
   - This triggers a validation on the CI but does not force dependencies to be flagged;
   - The fields NetBox Ready for Export and Export Ready Message will display the readiness of the CI to be exported and where potential problems may lie;
- When a CI record is displayed in the NetBox view and the user clicks on the Make Ready to Export to NetBox UI Action (under Related Links or the context menu):
   - **Note**: The Force NetBox Synchronize Flag on Dependencies must be turned on for the UI Action to work. If it isn't, the user is presented with a message to that effect;
   - The action triggers a validation on the CI and forces dependencies to be flagged as well;
   - The fields NetBox Ready for Export and Export Ready Message will display the readiness of the CI to be exported and where potential problems may lie;
   - If validation passes, export will begin immediately

**NetBox Data Validation**. Validation of NetBox objects is performed remotely on all object types before they are imported in ServiceNow. This validation includes:
- Checking that the record is tagged with ServiceNowSyncTo
   - Validation fails if the record is not tagged and the Force ServiceNowSyncTo Tag on Dependencies is set to `false`
- Checking that all its dependencies are also tagged. 
   - Validation fails if a dependency is not tagged and the Force parameter is set to `false`
- **Note** There are no mandatory fields for dependencies in ServiceNow. No validation is performed on mandatory fields.
- **Note** If the object's Import parameter is set to `false`, validation will not occur for it and its dependencies
- **Note** If an object's dependency's Import parameter is set to `false`, that dependency is not validated and will not be imported.

**Triggering Data Validation in NetBox**. Data validation in NetBox happens under these circumstances:
- When a record is tagged with ServiceNowSyncTo:
   - This triggers an immediate Webhook message to the NetBox CMDB Integration API in ServiceNow
   - Before importing the object, ServiceNow will remotely validate the object and its dependencies and proceed with importing them if validation passes.


## Application Maintenance

The NetBox CMDB Integration application offers some maintenance tools to visualize what is happening between systems and troubleshoot issues. The following sections detail the items available in the **All > NetBox > Maintenance** menu.

### NetBox Logs

This application-centric view of the System Logs provides information on events that are happening in the exchange of data between systems. A full description of the log items available is provided in the [Technical Information document](snow-technical-info.md#logging).

Logging is performed at three levels of verbosity, controlled by the NetBox Log Level parameter (see [Application Parameters](#application-parameters section), which are:
- **Low**. Few details are logged. Use this level if no synchronization issues are encountered and you are conscious about log volume.
- **Medium**. This is the default value. It provides general information about processes starting and ending (for example, an object's local or remote validation), but internal process details are not included.
- **High**. This level is to be used to troubleshoot data synchronization issues. All events are logged with maximum details, providing a full picture of data validation and exchanges between systems.  

### Event Queue

The event queue is a record of all incoming webhooks sent from NetBox to ServiceNow. It is used to trigger validation and subsequent import of the data, as well as for caching incoming records to avoid fetching them repeatedly in a given period of time.

### Clear Import Cache

This tool allows clearing the Event Queue for all cached items. It can be useful when some records that are expected to be imported are not. This could happen if the record is cached and therefore skipping import.

### Test Connections

This tool offers a simple page to test two-way communications between ServiceNow and NetBox

## Use Cases and Best Practices

The NetBox CMDB Integration application offers a great range of flexibility and control and therefore many data synchronization scenarios are possible. The next sections are meant to help you get a clear picture of the various use cases that may apply to you, while offering some best practices for each.

### Unidirectional Data Flow - ServiceNow to NetBox

This synchronization pattern establishes ServiceNow as the authoritative source of truth while populating NetBox with consistent data. It can be applied to all supported object types or configured for specific subsets based on organizational needs.

**When to Consider This Approach**

Unidirectional ServiceNow-to-NetBox synchronization is particularly beneficial when:
- ServiceNow already contains a mature, well-maintained CMDB
- NetBox is being newly implemented with minimal or no existing data
- Your organization requires a single source of truth for configuration management
- There is a need to leverage ServiceNow's advanced data cleansing capabilities before populating NetBox

**Advantages**

The unidirectional export approach offers several key benefits:
- **Rapid NetBox Deployment**: Provides immediate population of NetBox with existing organizational data, eliminating the need to manually recreate infrastructure records
- **Data Consistency Assurance**: Ensures uniform data standards are maintained from the initial deployment, reducing the risk of data inconsistencies that can emerge over time
- **Leveraged Cleanup Tools**: Takes full advantage of ServiceNow's comprehensive data management capabilities including the CMDB Health Dashboard for data quality assessment, CI Class Manager for structural optimization, and CMDB Workspace for collaborative data stewardship

**Considerations and Limitations**

While effective, this approach has certain constraints to consider:
- **Limited NetBox Features**: Does not leverage NetBox's pre-built device type libraries and manufacturer catalogs, which may require manual recreation in ServiceNow
- **Data Preservation Challenges**: May not be suitable for environments where NetBox already contains critical data that must be preserved
- **Error Propagation**: Will replicate any existing data quality issues from ServiceNow into NetBox, potentially perpetuating legacy problems

**Implementation Best Practices**

To ensure successful unidirectional synchronization, follow these structured practices:

**0. Backup**
Perform a full backup of data to be synchronized on both systems before proceeding.

**1. Hierarchical Synchronization Sequence**
Execute synchronization in dependency order to maintain referential integrity. Choose one of two approaches:

**Option A: Manual Dependency Management**
- **Foundation Objects First**: Begin with independent objects such as departments, regions, and manufacturers that have no dependencies on other objects
- **Dependent Objects Second**: Proceed with objects that reference foundation objects, including device types, sites, and customers
- **Complex Objects Last**: Complete with complex objects like devices that may reference multiple other object types

**Option B: Automated Dependency Resolution**
- Set the **"Force NetBox Synchronize flag on dependencies"** parameter to `true`
- Synchronize objects in any order; the system will automatically flag and synchronize all required dependencies
- This approach simplifies the process but provides less granular control over the synchronization sequence

**2. Object Type Processing Strategy**
- Synchronize one object type completely before proceeding to the next
- Verify data consistency in NetBox after each object type synchronization
- Identify and correct any inconsistencies in ServiceNow before they propagate to NetBox
- Use the NetBox web interface to validate that synchronized data appears correctly and maintains proper relationships
- **Note**: When using **Option B (Automated Dependency Resolution)**, object types can be processed in any order as dependencies are automatically resolved

**3. Pre-Synchronization Data Preparation**
- Utilize ServiceNow's CMDB Health Dashboard to identify and resolve data quality issues
- Employ the CI Class Manager to optimize data structure and eliminate redundancies
- Leverage CMDB Workspace for collaborative review and correction of data before synchronization
- Establish clear data validation rules and ensure compliance before enabling export parameters

**Configuration Requirements**

For unidirectional ServiceNow-to-NetBox synchronization:
- Set "Export NetBox [ObjectType]" parameters to `true` for desired object types (Regions, Sites, Manufacturers, Device Types, Departments, Devices, Customers)
- Ensure corresponding "Import NetBox [ObjectType]" parameters remain `false` to prevent reverse synchronization
- Configure the "Force NetBox Synchronize flag on dependencies" parameter based on your dependency management preferences
- Verify that the NetBox synchronization flag is properly set on records intended for export

### Unidirectional Data Flow - NetBox to ServiceNow

This synchronization pattern positions NetBox as the authoritative data source while enriching ServiceNow's CMDB with accurate infrastructure information. It can be implemented across all supported object types or selectively configured for specific data categories where NetBox maintains superior data quality.

**When to Consider This Approach**

Unidirectional NetBox-to-ServiceNow synchronization is optimal when:
- NetBox contains comprehensive infrastructure data that is absent from ServiceNow
- NetBox data quality exceeds that of existing ServiceNow records due to dedicated network engineering maintenance
- Organizations seek to reduce dependency on Discovery tools for specific infrastructure components
- There is a need to consolidate multiple data sources into ServiceNow while leveraging NetBox's specialized infrastructure focus

**Advantages**

The unidirectional import approach delivers significant operational benefits:
- **Discovery Alternative**: Provides a reliable data ingestion method that complements or replaces traditional Discovery processes, particularly valuable for infrastructure components that may be difficult to discover automatically
- **Data Quality Exploitation**: Leverages NetBox's purpose-built infrastructure data management capabilities, especially beneficial when network engineering teams maintain high-quality, up-to-date records
- **Enhanced Data Processing**: Utilizes ServiceNow's sophisticated data cleansing ecosystem including Identification and Reconciliation Engine (IRE) for intelligent CI matching, Deduplication Tasks for eliminating redundant records, and Normalization Data Services for standardizing incoming companys such as manufacturers or customers.

**Considerations and Limitations**

This approach requires careful consideration of potential challenges:
- **Data Overwrite Risk**: May inadvertently overwrite valuable ServiceNow field data, such as custom descriptions
- **Quality Transfer**: Will propagate any data inconsistencies or quality issues present in NetBox directly into the ServiceNow CMDB, potentially affecting downstream processes
- **Field Mapping Constraints**: Limited by the predefined field mappings between NetBox objects and ServiceNow tables, which may not accommodate all organizational data requirements

**Implementation Best Practices**

Execute unidirectional NetBox-to-ServiceNow synchronization following these structured guidelines:

**0. Backup**
Perform a full backup of data to be synchronized on both systems before proceeding.

**1. Dependency-Aware Synchronization Order**
Maintain data integrity through hierarchical processing. Choose one of two approaches:

**Option A: Manual Dependency Management**
- **Foundation Objects First**: Initiate synchronization with independent objects including departments, regions, and manufacturers that form the foundation of your infrastructure hierarchy
- **Dependent Objects Second**: Progress to objects with references such as device types, sites, and customers that depend on foundation objects
- **Complex Objects Last**: Conclude with comprehensive objects like devices that may reference multiple other object types and require complete dependency chains

**Option B: Automated Dependency Resolution**
- Set the **"Force ServiceNowSyncTo tag on dependencies"** parameter to `true`
- Synchronize objects in any order; the system will automatically tag and synchronize all required dependencies in NetBox
- This approach simplifies the process but provides less granular control over the synchronization sequence

**2. Object Type Processing Strategy**
- Execute complete synchronization of each object type before advancing to dependent types
- Validate data accuracy and completeness in ServiceNow after each object type import
- Address any data quality issues in NetBox before they propagate to ServiceNow to maintain clean CMDB records
- Monitor ServiceNow's IRE processing to ensure proper CI classification and relationship establishment
- **Note**: When using **Option B (Automated Dependency Resolution)**, object types can be processed in any order as dependencies are automatically resolved

**3. NetBox Data Quality Preparation**
- Conduct thorough data quality assessment in NetBox prior to synchronization
- Implement data validation rules and consistency checks within NetBox
- Ensure all required fields are populated according to ServiceNow's field mapping requirements
- Establish clear data governance processes for maintaining NetBox data quality over time

**4. ServiceNow Post-Import Processing**
- Leverage ServiceNow's comprehensive data cleansing capabilities after each synchronization cycle
- Execute Deduplication Tasks to identify and resolve any duplicate records created during import
- Utilize Normalization Data Services to standardize data formats and ensure consistency with organizational standards
- Monitor CMDB Health Dashboard metrics to track data quality improvements and identify areas requiring attention

**Configuration Requirements**

For unidirectional NetBox-to-ServiceNow synchronization:
- Set "Import NetBox [ObjectType]" parameters to `true` for desired object types (Regions, Sites, Manufacturers, Device Types, Departments, Devices, Customers)
- Ensure corresponding "Export NetBox [ObjectType]" parameters remain `false` to prevent reverse synchronization
- Configure the "Force ServiceNowSyncTo tag on dependencies" parameter to automatically handle dependency tagging
- Verify that NetBox objects intended for import are properly tagged with the ServiceNowSyncTo tag
- Establish appropriate data validation rules to prevent import of incomplete or inconsistent records

### Hybrid Data Flows

Hybrid data flows describe a state when some object types flow in one direction while others flow in the opposite direction. As with unidirectional flows, not all object types need be included, for example customers might not be part of your business reality.

This synchronization pattern accommodates complex organizational requirements where different object types have different authoritative sources based on established data governance policies and operational responsibilities.

**When to Consider This Approach**

Hybrid synchronization is particularly valuable when:
- Data governance policies designate different systems as authoritative for different object types
- Organizational responsibilities are divided between teams using different systems
- Data quality varies significantly between systems for different object categories
- Regulatory or compliance requirements dictate specific data source authorities

**Advantages**

The hybrid approach provides strategic operational benefits:
- **Governance Compliance**: Ensures alignment with established data governance frameworks that designate specific systems as authoritative for particular data domains
- **Operational Efficiency**: Allows teams to maintain data in their primary operational systems while ensuring consistency across the enterprise
- **Quality Optimization**: Leverages the strengths of each system for the object types they manage most effectively

**Considerations and Limitations**

This approach requires careful planning and ongoing management:
- **Implementation Complexity**: Requires more extensive configuration and testing compared to unidirectional approaches
- **Maintenance Overhead**: Ongoing management becomes more complex with bidirectional flows requiring careful monitoring
- **Dependency Management**: Must carefully coordinate synchronization timing to maintain referential integrity across mixed data flows

**Implementation Best Practices**

To ensure successful hybrid synchronization, follow these structured guidelines:

**0. Backup**
Perform a full backup of data to be synchronized on both systems before proceeding.

**1. Governance Mapping**
- Document which system serves as the authoritative source for each object type
- Establish clear ownership and responsibility for data quality in each system
- Define validation rules and approval processes for changes to authoritative designations

**2. Object Type Processing Strategy**
Choose one of two dependency management approaches:

**Option A: Manual Dependency Management**
- Start from foundation objects and progress through dependent to complex objects
- Configure one object type completely before proceeding to the next
- Validate synchronization behavior and data integrity after each object type configuration

**Option B: Automated Dependency Resolution**
- Enable the appropriate **"Force"** parameters for your synchronization directions:
  - **"Force NetBox Synchronize flag on dependencies"** for ServiceNow-to-NetBox flows
  - **"Force ServiceNowSyncTo tag on dependencies"** for NetBox-to-ServiceNow flows
- Configure object types in any order; dependencies will be automatically managed
- This approach reduces configuration complexity but requires careful monitoring of automated dependency resolution

**3. Parameter Configuration**
- Set "Export NetBox [ObjectType]" parameters to `true` only for object types where ServiceNow is authoritative
- Set "Import NetBox [ObjectType]" parameters to `true` only for object types where NetBox is authoritative
- Ensure corresponding reverse parameters are set to `false` to prevent conflicting bidirectional flows

**4. Monitoring and Validation**
- Establish regular monitoring procedures for each synchronization direction
- Implement validation checks to ensure data consistency across systems
- Create alerting mechanisms for synchronization failures or data conflicts

### Alternating Data Flows

Sometimes, data governance rules and source data quality are at opposite ends of a spectrum: while the rules tell to use a source as authoritative, quality is better on the receiving end. In other cases, data quality might be deemed equal on both ends but incomplete, meaning that both source and destination have decent quality but only on a fraction of the total data.

Alternating data flows is a method by which an initial synchronization is performed from one end to the other and then flipped when data at the receiving end is considered equal or superior in quality. This method should be seen as an approach to data convergence before reaching a steady state that will remain in place until the data governance rules say otherwise.

**When to Consider This Approach**

Alternating synchronization is appropriate when:
- Data governance policies conflict with current data quality realities
- Both systems contain partial but complementary high-quality data sets
- There is a need to progressively consolidate and improve data quality over time
- Organizations are transitioning between different authoritative systems

**Advantages**

The alternating approach offers unique data management benefits:
- **Progressive Data Refinement**: Enables systematic improvement of data quality directly within operational systems, eliminating the need for external data manipulation tools or spreadsheet-based consolidation processes
- **Granular Control**: Leverages record-level controls such as the NetBox Synchronize flag in ServiceNow and the ServiceNowSyncTo tag in NetBox to perform selective synchronization on object subsets, enabling fine-grained approaches such as synchronizing only specific device types or locations
- **Maximum Quality Achievement**: Provides the most comprehensive approach to achieving optimal final data quality by iteratively combining the best aspects of data from both systems

**Considerations and Limitations**

This approach requires careful consideration:
- **Planning Complexity**: Demands meticulous advance planning for each object type, including identification of specific data sets that should migrate in each direction based on quality assessments
- **Resource Intensive**: Requires significant time and effort to execute properly, including multiple synchronization cycles and validation phases
- **Risk Management**: Involves multiple data transformations that must be carefully monitored to prevent data loss or corruption

**Implementation Best Practices**

Execute alternating data flows using these comprehensive guidelines:

**0. Backup**
Perform a full backup of data to be synchronized on both systems before proceeding and after each intermediary step to ensure recovery capabilities.

**1. Governance and Quality Assessment**
- Establish in advance the final target for data flows according to governance policies in place
- Conduct comprehensive data quality assessments for each object type in both systems
- Document specific quality advantages and gaps for each data set
- Define clear criteria for determining when data convergence is complete

**2. Object Type Processing Strategy**
- If required, identify subsets of object types that should be synchronized based on data quality analysis
- Perform synchronization one subset at a time to maintain control and validation capabilities
- Document the planned sequence of alternating synchronizations for each object type
- **Note**: When using **Option B (Automated Dependency Resolution)** in any phase, object types can be processed in any order as dependencies are automatically resolved

**3. Iterative Synchronization Process**
For each synchronization direction phase, choose one of two dependency management approaches:

**Option A: Manual Dependency Management**
- Process one object type at a time in order that respects referential dependencies (foundation → dependent → complex)
- Validate data quality improvements after each synchronization direction change
- Monitor for data conflicts or inconsistencies that may arise during alternating processes

**Option B: Automated Dependency Resolution**
- Enable the appropriate **"Force"** parameter for the current synchronization direction:
  - **"Force NetBox Synchronize flag on dependencies"** when flowing ServiceNow-to-NetBox
  - **"Force ServiceNowSyncTo tag on dependencies"** when flowing NetBox-to-ServiceNow
- Process object types in any order; dependencies will be automatically resolved
- Switch Force parameter settings when changing synchronization directions
- This approach simplifies each alternating phase but requires careful parameter management during direction changes

**4. Multi-Cycle Approach**
- Do not limit the procedure to a single direction change; plan for two or more cycles as required for full convergence
- This is especially important when using subsets for each object type, as multiple iterations may be necessary to achieve optimal results
- Establish clear completion criteria to determine when alternating synchronization has achieved its objectives

**Configuration Management**

For alternating data flows:
- Temporarily modify Import and Export parameters between synchronization phases
- Use record-level flags and tags to control specific object synchronization during each phase
- Implement careful change management processes to track parameter modifications throughout the alternating process
- Establish rollback procedures in case synchronization results do not meet quality expectations


### Bidirectional Data Flows

Bidirectional data flows represent the most comprehensive synchronization pattern where changes made in either system propagate to the other in real-time, creating a fully synchronized environment. This approach is implemented when no single system serves as the definitive authority and data must remain consistent regardless of where modifications occur.

**When to Consider This Approach**

Bidirectional synchronization is optimal when:
- No single system is designated as authoritative for specific object types
- Data ownership and maintenance responsibilities are shared between the same personnel across both systems
- Real-time data consistency is critical for operational effectiveness
- Teams require the flexibility to work primarily in either system while maintaining enterprise-wide data accuracy
- Specific data subsets have different authoritative sources, such as routers managed in ServiceNow while switches are managed in NetBox

**Advantages**

The bidirectional approach delivers maximum synchronization benefits:
- **Complete Data Consistency**: Ensures both systems maintain identical, current information at all times, eliminating discrepancies that can lead to operational confusion or errors
- **Operational Flexibility**: Allows users to work in their preferred system while ensuring all stakeholders have access to the most current information
- **Real-time Updates**: Provides immediate propagation of changes across systems, supporting dynamic operational environments where information changes frequently

**Considerations and Limitations**

This advanced approach requires careful consideration of potential challenges:
- **Update Loop Risk**: May create systematic overwrite conflicts when data changes in one system trigger automatic updates that users subsequently modify in the other system, potentially creating frustrating cyclical overwrites
- **Conflict Resolution Complexity**: Requires sophisticated mechanisms to handle simultaneous updates to the same record in both systems
- **Data Governance Challenges**: Can complicate data ownership and accountability when multiple systems can modify the same information

**Implementation Best Practices**

Execute bidirectional synchronization using these critical guidelines:

**0. Backup**
Perform comprehensive backups of both systems before enabling bidirectional synchronization.

**1. Data Governance**
- Establish clear documentation of data ownership responsibilities for each field and object type
- Define escalation procedures for resolving data conflicts when they arise
- Implement user training to ensure all personnel understand their data stewardship responsibilities

**2. Data Standards Harmonization**
- Ensure data formatting, validation rules, and business logic are identical across both systems
- Standardize field mappings and transformation rules to prevent data corruption during synchronization
- Establish consistent naming conventions and data entry procedures

**3. Convergence Prerequisites**
- Enable bidirectional synchronization only after achieving complete data convergence between systems
- Verify that all object types intended for bidirectional flow contain identical information before activation
- Conduct thorough testing in a controlled environment to validate synchronization behavior

**4. Object Type Processing Strategy**
- When implementing subset-based bidirectional flows, clearly define which data subsets flow in each direction
- Document and communicate the authoritative source for each subset to prevent user confusion
- **Note**: With both Force parameters enabled for bidirectional flows, object types can be processed in any order as dependencies are automatically resolved in both directions

**5. Monitoring and Conflict Management**
- Establish comprehensive monitoring for synchronization conflicts and resolution patterns
- Create procedures for manual conflict resolution when automated processes cannot determine the correct data state

**Configuration Requirements**

For bidirectional synchronization:
- Set both "Import NetBox [ObjectType]" and "Export NetBox [ObjectType]" parameters to `true` for applicable object types (Regions, Sites, Manufacturers, Device Types, Departments, Devices, Customers)
- Enable comprehensive logging to track all synchronization activities and conflicts
- Establish regular validation procedures to ensure ongoing data consistency

## Implementation Examples

### ServiceNow as Authoritative Source on All Object Types

**Scenario Overview**

GlobalTech Corporation is implementing NetBox to support their network engineering operations while maintaining ServiceNow as their enterprise CMDB system. The organization has invested significantly in ServiceNow data quality over the past three years, implementing comprehensive data governance processes and achieving a 95% data accuracy rate across their infrastructure records. NetBox is being deployed as a fresh installation to provide specialized network management capabilities while leveraging the high-quality data already maintained in ServiceNow.

**Business Requirements**:
- ServiceNow contains 850+ locations across 6 regions with high-quality, validated data
- 45 hardware manufacturers and 200+ device types are accurately catalogued in ServiceNow
- 12,000+ network devices require synchronization to NetBox
- Customer records are not part of this implementation scope
- No data cleansing is required in NetBox as ServiceNow data quality is authoritative

**Implementation Approach**: Unidirectional Data Flow - ServiceNow to NetBox

This scenario follows the **Unidirectional Data Flow - ServiceNow to NetBox** use case, as ServiceNow serves as the established source of truth and NetBox is a new installation requiring population with existing organizational data.

**Pre-Implementation Setup**

1. **Backup Preparation**
   - Perform full backup of ServiceNow CMDB data
   - Document current NetBox state (empty installation)
   - Create rollback procedures in case of synchronization issues

2. **Parameter Configuration**
   - Navigate to **All > NetBox > Configuration > Application Parameters**
   - **Export Parameters** (ServiceNow → NetBox):
     - Set **Export NetBox Regions** to `true`
     - Set **Export NetBox Sites** to `true`
     - Set **Export NetBox Manufacturers** to `true`
     - Set **Export NetBox Device Types** to `true`
     - Set **Export NetBox Departments** to `true`
     - Set **Export NetBox Devices** to `true`
     - Set **Export NetBox Customers** to `false` (not in scope)
   - **Import Parameters** (NetBox → ServiceNow):
     - Set **Import NetBox Regions** to `false`
     - Set **Import NetBox Sites** to `false`
     - Set **Import NetBox Manufacturers** to `false`
     - Set **Import NetBox Device Types** to `false`
     - Set **Import NetBox Departments** to `false`
     - Set **Import NetBox Devices** to `false`
     - Set **Import NetBox Customers** to `false`
   - Set **Force NetBox Synchronize flag on dependencies** to `true` for automated dependency management

**Implementation Method**: This example uses **Option B: Automated Dependency Resolution** from the Object Type Processing Strategy. The Force parameter eliminates the need to follow the strict foundation → dependent → complex sequence, as dependencies will be automatically flagged and synchronized when any object is processed.

**Step-by-Step Implementation**

**Note**: While this example follows the organized foundation → dependent → complex sequence (option A, as described in the  Object Type Processing Strategy sections above) for clarity and best practice demonstration.

**Phase 1: Foundation Objects Synchronization**

**Step 1: Synchronize Regions (Foundation Object)**
- **ServiceNow Actions**:
  - Navigate to **All > CMDB > Location > Locations**
  - Filter for location type = "Region"
  - Select all 6 regional locations
  - Set **NetBox Synchronize** flag to `true` for all regional records
  - Validation automatically triggers, verifying all mandatory fields are populated
  - Export process begins immediately upon successful validation

- **NetBox Results**:
  - 6 region records appear in NetBox with **ServiceNowSyncFrom** tags
  - Regional hierarchy is preserved based on parent-child relationships
  - All ServiceNow correlation IDs are populated for future reference tracking

**Step 2: Synchronize Manufacturers (Foundation Object)**
- **ServiceNow Actions**:
  - Navigate to **All > Product Catalog > Companies**
  - Filter for manufacturer = `true`
  - Select all 45 manufacturer records
  - Set **NetBox Synchronize** flag to `true`
  - Monitor synchronization completion in NetBox

- **NetBox Results**:
  - 45 manufacturer records created with **ServiceNowSyncFrom** tags
  - Company names and descriptions synchronized accurately
  - No dependencies required as these are foundation objects

**Step 3: Synchronize Departments (Foundation Object)**
- **ServiceNow Actions**:
  - Navigate to **All > Organization > Departments**
  - Select all department records requiring NetBox presence
  - Set **NetBox Synchronize** flag to `true`
  - Verify **Default Import Company** parameter is correctly configured

- **NetBox Results**:
  - Department records appear as NetBox tenants in the designated tenant group
  - **ServiceNowSyncFrom** tags indicate ServiceNow origin
  - Company associations properly maintained through parameter configuration

**Phase 2: Dependent Objects Synchronization**

**Step 4: Synchronize Sites (Dependent Object)**
- **ServiceNow Actions**:
  - Navigate to **All > CMDB > Location > Locations**
  - Filter for location type = "Site"
  - Verify all 850+ site records have valid region references
  - Set **NetBox Synchronize** flag to `true` for all site records
  - Validation process automatically verifies region dependencies exist and are flagged

- **NetBox Results**:
  - 850+ site records created with proper region associations
  - Physical addresses, coordinates, and timezone information synchronized
  - **ServiceNowSyncFrom** tags applied to all site records
  - Parent region relationships maintained correctly

**Step 5: Synchronize Device Types (Dependent Object)**
- **ServiceNow Actions**:
  - Navigate to **All > Product Catalog > Product Models**
  - Filter for hardware product models
  - Verify all 200+ device type records have valid manufacturer references
  - Set **NetBox Synchronize** flag to `true` for all device type records
  - Validation confirms manufacturer dependencies are properly flagged

- **NetBox Results**:
  - 200+ device type records created in NetBox
  - Manufacturer associations properly maintained
  - Height, weight, and specification data synchronized
  - **ServiceNowSyncFrom** tags indicate ServiceNow origin

**Phase 3: Complex Objects Synchronization**

**Step 6: Synchronize Devices (Complex Object)**
- **ServiceNow Actions**:
  - Navigate to **All > CMDB > Network**
  - Filter for network device CI classes (routers, switches, firewalls)
  - Verify all 12,000+ device records have complete dependency references:
    - Valid site assignments
    - Proper device type associations
    - Manufacturer information through device type
    - Department associations where applicable
  - Set **NetBox Synchronize** flag to `true` for device records in batches of 500
  - Monitor validation process to ensure all dependencies pass validation

- **NetBox Results**:
  - 12,000+ device records created with complete dependency relationships
  - Asset tags, serial numbers, and IP addresses properly synchronized
  - Site, device type, and tenant associations maintained
  - **ServiceNowSyncFrom** tags applied consistently
  - Installation and operational status information synchronized

**Validation and Verification**

**Post-Implementation Checks**:
1. **Data Consistency Verification**:
   - Compare record counts between ServiceNow and NetBox for each object type
   - Validate that all **ServiceNowSyncFrom** tags are present in NetBox
   - Confirm no **ServiceNowSyncTo** tags exist (unidirectional flow)

2. **Relationship Integrity**:
   - Verify device-to-site relationships are accurate
   - Confirm device-to-device-type associations
   - Validate regional hierarchy preservation

3. **Parameter Status**:
   - Confirm all Export parameters remain `true` for ongoing synchronization
   - Verify Import parameters remain `false` to prevent reverse flow
   - Validate **Force NetBox Synchronize flag on dependencies** continues to function

**Ongoing Operations**

**Real-time Synchronization**:
- New devices added to ServiceNow automatically trigger validation and export to NetBox
- Updates to existing ServiceNow records propagate to NetBox in real-time
- **NetBox Synchronize** flags on new records ensure continuous synchronization

**Monitoring**:
- Review **All > NetBox > Maintenance > NetBox Logs** regularly for synchronization status
- Monitor **All > NetBox > Configuration > Data Sources** for any buffering issues
- Use **All > NetBox > Maintenance > Test Connections** for periodic connectivity validation

This implementation successfully establishes ServiceNow as the authoritative source while providing GlobalTech's network engineering team with a fully populated, specialized NetBox environment for their operational requirements.

### NetBox as Authoritative Source for Network Devices

**Scenario Overview**

TechStartup Corporation has been using NetBox for two years as their primary network documentation tool, meticulously maintained by their network engineering team. The organization is now implementing ServiceNow for comprehensive IT service management and wants to leverage their high-quality NetBox device data to populate ServiceNow's CMDB. The focus is specifically on network infrastructure - devices, device types, and manufacturers - as these represent the core assets managed by the network team.

**Business Requirements**:
- NetBox contains 800+ network devices with comprehensive, accurate data maintained by network engineers
- 25 device types covering routers, switches, firewalls, and wireless access points are well-documented in NetBox
- 6 network equipment manufacturers are properly catalogued with complete information
- ServiceNow CMDB requires population with network infrastructure for incident and change management
- Other object types (sites, regions, departments) are managed separately and not part of this implementation

**Implementation Approach**: Unidirectional Data Flow - NetBox to ServiceNow

This scenario follows the **Unidirectional Data Flow - NetBox to ServiceNow** use case, as NetBox serves as the authoritative source for network device information and ServiceNow requires population with this specialized data.

**Pre-Implementation Setup**

1. **Backup Preparation**
   - Perform full backup of NetBox device, device type, and manufacturer data
   - Document current ServiceNow CMDB state for network infrastructure CIs
   - Create rollback procedures in case of synchronization issues

2. **Parameter Configuration**
   - Navigate to **All > NetBox > Configuration > Application Parameters**
   - **Import Parameters** (NetBox → ServiceNow):
     - Set **Import NetBox Regions** to `false` (not in scope)
     - Set **Import NetBox Sites** to `false` (not in scope)
     - Set **Import NetBox Manufacturers** to `true`
     - Set **Import NetBox Device Types** to `true`
     - Set **Import NetBox Departments** to `false` (not in scope)
     - Set **Import NetBox Devices** to `true`
     - Set **Import NetBox Customers** to `false` (not in scope)
   - **Export Parameters** (ServiceNow → NetBox):
     - Set **Export NetBox Regions** to `false`
     - Set **Export NetBox Sites** to `false`
     - Set **Export NetBox Manufacturers** to `false`
     - Set **Export NetBox Device Types** to `false`
     - Set **Export NetBox Departments** to `false`
     - Set **Export NetBox Devices** to `false`
     - Set **Export NetBox Customers** to `false`
   - Set **Force ServiceNowSyncTo tag on dependencies** to `true` for automated dependency management

**Implementation Method**: This example uses **Option B: Automated Dependency Resolution** from the Object Type Processing Strategy. The Force parameter enables synchronization of devices while automatically handling device type and manufacturer dependencies, eliminating the need to manually process foundation objects first and thus streamlining the process significantly.

**Step-by-Step Implementation**

**Phase 1: NetBox Data Preparation**

**Step 1: Validate NetBox Data Quality**
- **NetBox Actions**:
  - Review all 800+ device records for data completeness
  - Verify device type assignments are accurate for all devices
  - Confirm manufacturer information is properly associated through device types
  - Ensure asset tags, serial numbers, and site assignments are populated
  - Validate device status information is current

**Step 2: Tag Devices for Synchronization**
- **NetBox Actions**:
  - Navigate to NetBox device list (/dcim/devices/)
  - Apply **ServiceNowSyncTo** tag to all 800+ network devices
  - **Note**: Due to the Force parameter setting, device types and manufacturers do not need manual tagging
  - Monitor webhook notifications to ServiceNow as devices are tagged

**Phase 2: Automated Synchronization Execution**

**Step 3: Device Synchronization with Dependency Resolution**
- **ServiceNow Processing**:
  - NetBox webhooks automatically trigger ServiceNow validation for each tagged device
  - **Force ServiceNowSyncTo tag on dependencies** parameter automatically:
    - Tags the 25 device types referenced by the devices
    - Tags the 6 manufacturers referenced by the device types
    - Initiates import of manufacturers first, then device types, then devices
  - Buffer processing handles the sequential import according to dependency hierarchy

- **Expected Results**:
  - 6 manufacturer records imported into ServiceNow company table with manufacturer flag
  - 25 device type records imported into hardware product model table
  - 800+ device records imported into appropriate CI classes (network gear, routers, switches, etc.)
  - All records are flagged with **NetBox Synchronize** indicating their ServiceNow presence

**Phase 3: ServiceNow Data Processing**

**Step 4: IRE Processing and CI Classification**
- **ServiceNow Actions**:
  - Monitor **All > CMDB > Import Sets** for device import set processing
  - Validate IRE rules correctly classify devices into appropriate CI classes:
    - Routers → Network Gear or Router CI class
    - Switches → Network Gear or Switch CI class  
    - Firewalls → Network Gear or Firewall CI class
    - Access Points → Network Gear or Wireless Access Point CI class
  - Review correlation ID population for future synchronization tracking

**Step 5: Data Quality Validation**
- **ServiceNow Actions**:
  - Execute Deduplication Tasks to identify any duplicate CIs created during import
  - Use CMDB Health Dashboard to assess overall data quality post-import
  - Validate device-to-device-type relationships are properly established

**Validation and Verification**

**Post-Implementation Checks**:
1. **Record Count Verification**:
   - Confirm 6 manufacturer records in ServiceNow match NetBox manufacturer count
   - Validate 25 device type records imported successfully
   - Verify 800+ device records present in ServiceNow with proper CI classification

2. **Dependency Relationship Validation**:
   - Confirm device-to-device-type associations are accurate
   - Validate device-type-to-manufacturer relationships are maintained
   - Check that asset tags and serial numbers synchronized correctly

3. **Flag and Tag Status Verification**:
   - Verify all imported device, device type, and manufacturer records in ServiceNow have **NetBox Synchronize** flags set to `true`
   - Confirm all device, device type, and manufacturer records in NetBox have **ServiceNowSyncTo** tags
   - Validate no **ServiceNowSyncFrom** tags exist in NetBox (these only appear when data flows from ServiceNow to NetBox)
   - Confirm no reverse synchronization occurred (no data exported from ServiceNow to NetBox)

**Ongoing Operations**

**Real-time Synchronization**:
- New devices added to NetBox and tagged with **ServiceNowSyncTo** automatically trigger import to ServiceNow
- Device updates in NetBox propagate to ServiceNow in real-time through webhook processing
- Device type and manufacturer changes automatically flow through dependency relationships

**Monitoring**:
- Review **All > NetBox > Maintenance > NetBox Logs** for import processing status
- Monitor **All > NetBox > Configuration > Data Sources** for any buffer accumulation
- Use **All > NetBox > Maintenance > Test Connections** for periodic connectivity validation
- Execute regular CMDB Health Dashboard reviews to maintain data quality

**Benefits Realized**:
- Network engineering team continues using NetBox as their primary tool while ServiceNow gains accurate network infrastructure data
- Automated dependency resolution eliminated manual sequencing, reducing implementation time by approximately 60%
- ServiceNow incident and change management processes now have complete visibility into network infrastructure  
- Real-time synchronization ensures ServiceNow always reflects current NetBox network device state
- Force parameter automation reduced manual tagging effort from 831 objects (800 devices + 25 device types + 6 manufacturers) to just 800 devices

This implementation successfully leverages NetBox's specialized network device data while enabling ServiceNow's comprehensive ITSM capabilities, creating a powerful integrated environment for TechStartup's IT operations.

### Hybrid Data Flow with Data Governance Compliance

**Scenario Overview**

MidScale Enterprises operates under strict data governance policies that designate ServiceNow as the authoritative source for organizational and infrastructure reference data, while recognizing NetBox's superior quality for actual network device information. The company lacks Discovery licensing in ServiceNow, resulting in incomplete device data, while their network engineering team maintains comprehensive, accurate device information in NetBox. However, NetBox contains inconsistent foundation data with duplicates and non-standardized naming conventions that must be resolved.

**Business Requirements**:
- **Data Governance Mandate**: ServiceNow is the authoritative source for manufacturers, sites, regions, departments, and device types
- **ServiceNow Limitations**: Device data is incomplete due to lack of Discovery licensing, with gaps in network infrastructure visibility
- **NetBox Strengths**: Contains 1,200+ network devices with accurate, detailed information maintained by network engineers
- **NetBox Data Quality Issues**: Foundation and dependent objects have duplicates and inconsistent naming (e.g., "Building A" vs "Bldg A", "New York" vs "NY")
- **Integration Goal**: Leverage ServiceNow's governance-compliant foundation data while utilizing NetBox's superior device information

**Implementation Approach**: Hybrid Data Flows

This scenario follows the **Hybrid Data Flows** use case, where different object types have different authoritative sources based on data governance policies and operational realities.

**Implementation Method**: This example demonstrates **Hybrid Data Flows** using **Option B: Automated Dependency Resolution** for the ServiceNow-to-NetBox direction, followed by manual device synchronization from NetBox-to-ServiceNow after dependency cleanup.

**Data Flow Strategy**:
- **ServiceNow → NetBox**: Foundation and dependent objects (manufacturers, regions, sites, device types, departments)
- **NetBox → ServiceNow**: Complex objects (devices only, after dependency cleanup)

**Pre-Implementation Setup**

1. **Backup**
   - Perform full backup of both ServiceNow and NetBox data
   - Document current NetBox data quality issues and duplicate objects
   - Create rollback procedures for both synchronization directions

2. **Parameter Configuration - Phase 1 (ServiceNow → NetBox)**
   - Navigate to **All > NetBox > Configuration > Application Parameters**
   - **Export Parameters** (ServiceNow → NetBox):
     - Set **Export NetBox Regions** to `true`
     - Set **Export NetBox Sites** to `true`
     - Set **Export NetBox Manufacturers** to `true`
     - Set **Export NetBox Device Types** to `true`
     - Set **Export NetBox Departments** to `true`
     - Set **Export NetBox Devices** to `false` (not yet ready)
     - Set **Export NetBox Customers** to `false` (not in scope)
   - **Import Parameters** (NetBox → ServiceNow):
     - Set **Import NetBox Regions** to `false`
     - Set **Import NetBox Sites** to `false`
     - Set **Import NetBox Manufacturers** to `false`
     - Set **Import NetBox Device Types** to `false`
     - Set **Import NetBox Departments** to `false`
     - Set **Import NetBox Devices** to `false`
     - Set **Import NetBox Customers** to `false`
   - Set **Force NetBox Synchronize flag on dependencies** to `true`
   - Set **NetBox Tenant Group ID for Departments** to a valid Tenant group value in NetBox

**Phase 1: Foundation and Dependent Objects Synchronization (ServiceNow → NetBox)**

**Step 1: ServiceNow Data Preparation**
- **ServiceNow Actions**:
  - Review and validate data quality for all foundation and dependent object types
  - Ensure all manufacturer, region, site, device type, and department records are complete
  - Verify proper hierarchical relationships (regions → sites, manufacturers → device types)

**Step 2: Initiate Dependent Data Export**
- **ServiceNow Actions**:
  - Navigate to **All > Product Catalog > Product Models > Hardware Models** and set **NetBox Synchronize** flag to `true` for all networking model records to be synchronized
  - Due to **Force NetBox Synchronize flag on dependencies** parameter, this automatically triggers synchronization of their foundation dependencies (manufacturer objects)
  - Navigate to **All > CMDB > Location > Locations** and set **NetBox Synchronize** flag to `true` for all location records that would be considered sites in NetBox
  - Because the **Force NetBox Synchronize flag on dependencies** parameter is set to `true`, all dependent foundation objects (region records) will be automatically flagged and exported as well
  - Navigate to **All > Organization > Departments** and set **NetBox Synchronize** flag to `true` for all department records
  - Monitor synchronization progress in **All > NetBox > Maintenance > NetBox Logs**
  
- **Expected Results**:
  - All manufacturers, regions, sites, device types, and departments synchronized to NetBox
  - NetBox objects receive **ServiceNowSyncFrom** tags indicating ServiceNow origin
  - Tenants belong to the Tenant group designated for departments
  - Duplicate and inconsistent NetBox objects remain but are now supplemented with standardized ServiceNow data

**Step 3: NetBox Data Cleanup and Dependency Correction**
- **NetBox Actions**:
  - Identify devices currently referencing duplicate or inconsistent objects
  - Update device references to point to ServiceNow-synchronized objects (those with **ServiceNowSyncFrom** tags)
  - **Example Cleanup Operations**:
    - Change device site assignments from "Building A" to "Building A" (ServiceNowSyncFrom)
    - Update device types from local duplicates to ServiceNow-sourced standardized types
    - Reassign devices from "NY" region to "New York" (ServiceNowSyncFrom)
  - Remove or archive duplicate/inconsistent NetBox objects that are no longer referenced
  - Validate that all 1,200+ devices now reference only objects with **ServiceNowSyncFrom** tags

**Phase 2: Parameter Reconfiguration for Device Import**

**Step 4: Modify Parameters for Device Synchronization**
- **ServiceNow Actions**:
  - Navigate to **All > NetBox > Configuration > Application Parameters**
  - **Import Parameters** (NetBox → ServiceNow):
    - Set **Import NetBox Regions** to `false`
    - Set **Import NetBox Sites** to `false`
    - Set **Import NetBox Manufacturers** to `false`
    - Set **Import NetBox Device Types** to `false`
    - Set **Import NetBox Departments** to `false`
    - Set **Import NetBox Devices** to `true`
    - Set **Import NetBox Customers** to `false`
  - **Export Parameters** (maintain current settings):
    - Keep **Export NetBox Regions** at `true`
    - Keep **Export NetBox Sites** at `true`
    - Keep **Export NetBox Manufacturers** at `true`
    - Keep **Export NetBox Device Types** at `true`
    - Keep **Export NetBox Departments** at `true`
    - Keep **Export NetBox Devices** at `false`
    - Keep **Export NetBox Customers** at `false`
  - **Keep Force ServiceNowSyncTo tag on dependencies** set to `false` (all dependencies already synchronized in the opposite direction)

**Phase 3: Device Synchronization (NetBox → ServiceNow)**

**Step 5: NetBox Device Tagging and Validation**
- **NetBox Actions**:
  - Verify all 1,200+ devices reference only objects with **ServiceNowSyncFrom** tags
  - Navigate to NetBox device list
  - Apply **ServiceNowSyncTo** tag to a subset of network devices
  - **Note**: Since **Force ServiceNowSyncTo tag on dependencies** is `false`, only devices are tagged
  - Dependencies are not auto-tagged because they already exist in ServiceNow from Phase 1

- **ServiceNow Processing**:
  - Webhook notifications trigger validation for each tagged device
  - Validation confirms all device dependencies exist in ServiceNow (from Phase 1 synchronization)
  - Device import proceeds without dependency conflicts
  - IRE processing classifies devices into appropriate CI classes

**Validation and Verification**

**Post-Implementation Checks**:

1. **Governance Compliance Verification**:
   - Confirm ServiceNow remains authoritative for manufacturers, regions, sites, device types, and departments
   - Verify NetBox foundation objects display **ServiceNowSyncFrom** tags
   - Validate ongoing foundation data updates flow from ServiceNow to NetBox

2. **Data Quality Assessment**:
   - Confirm NetBox no longer contains duplicate or inconsistent foundation objects
   - Verify all devices reference standardized, governance-compliant objects
   - Validate 1,200+ devices imported successfully into ServiceNow with complete dependency relationships

3. **Bidirectional Flow Validation**:
   - **ServiceNow → NetBox**: Foundation and dependent objects continue to synchronize
   - **NetBox → ServiceNow**: Devices synchronize with clean dependency references
   - **Tag Status**: NetBox shows **ServiceNowSyncFrom** on foundation objects, **ServiceNowSyncTo** on devices

**Ongoing Operations**

**Real-time Synchronization**:
- **Foundation Data**: Any changes to manufacturers, sites, regions, device types, or departments in ServiceNow automatically propagate to NetBox
- **Device Updates**: Device changes in NetBox (additions, modifications, status updates) flow to ServiceNow in real-time
- **Data Quality**: NetBox dependency cleanup is maintained through ongoing ServiceNow synchronization

**Monitoring**:
- Monitor **All > NetBox > Maintenance > NetBox Logs** for both synchronization directions
- Regular CMDB Health Dashboard reviews to ensure data quality standards
- Periodic validation that NetBox devices reference only **ServiceNowSyncFrom** tagged dependencies

**Benefits Realized**:
- **Governance Compliance**: Strict adherence to data governance policies while leveraging system strengths
- **Data Quality Improvement**: NetBox foundation data standardized and deduplicated through ServiceNow integration
- **Operational Efficiency**: Network engineers continue using NetBox for device management while ensuring enterprise data consistency
- **Complete CMDB**: ServiceNow gains comprehensive network device visibility without Discovery licensing dependency
- **Dependency Integrity**: Clean, consistent relationships between devices and their foundation objects across both systems

**Key Success Factors**:
- **Phased Approach**: Foundation data cleanup before device synchronization prevented dependency conflicts
- **Force Parameter Strategy**: Automated foundation object synchronization followed by manual device control for precision
- **Data Governance**: Clear authority designation respected while optimizing for operational efficiency

This implementation successfully balances strict data governance requirements with operational realities, creating a robust hybrid environment where each system serves as the authority for its strengths while maintaining enterprise-wide data consistency.

### Alternating Data Flows to Bidirectional Synchronization

**Scenario Overview**

TechCorp Global has been operating ServiceNow and NetBox independently for several years, resulting in both systems containing partial but complementary data sets for network infrastructure. ServiceNow contains comprehensive site and manufacturer information from enterprise procurement and facilities management, while NetBox maintains detailed device and device type information from network engineering operations. The organization seeks to achieve complete data convergence across both systems before establishing bidirectional synchronization for optimal operational flexibility.

**Business Requirements**:
- **Partial Data Sets**: Both systems contain incomplete but high-quality data for different object types
- **ServiceNow Strengths**: Comprehensive site information (50+ locations) and manufacturer records (12 manufacturers) from enterprise systems
- **NetBox Strengths**: Detailed device inventory (2,800+ devices) and precise device type specifications (95 device types) maintained by network engineers
- **Convergence Goal**: Achieve identical data sets in both systems before enabling real-time bidirectional synchronization
- **Final State**: Bidirectional flows for devices and device types, unidirectional flow (ServiceNow → NetBox) for sites and manufacturers

**Implementation Approach**: Alternating Data Flows leading to Bidirectional Data Flows

This scenario follows the **Alternating Data Flows** use case to achieve data convergence, followed by **Bidirectional Data Flows** for ongoing operations.

**Implementation Method**: This example demonstrates **Alternating Data Flows** using **Option B: Automated Dependency Resolution** during foundation export phases, **Option A: Manual Processing** during device import phases, and transitioning to **Bidirectional Data Flows** for final operations.

**Data Flow Strategy**:
1. **Phase 1**: ServiceNow → NetBox (sites, manufacturers)
2. **Phase 2**: NetBox → ServiceNow (devices, device types)
3. **Phase 3**: ServiceNow → NetBox (remaining devices, final cleanup)
4. **Phase 4**: Enable bidirectional synchronization (devices, device types only)

**Pre-Implementation Setup**

1. **Backup**
   - Perform comprehensive backup of both ServiceNow and NetBox data
   - Document current data coverage and gaps in both systems
   - Create detailed rollback procedures for each phase

2. **Data Quality Assessment**
   - **ServiceNow Analysis**: Validate completeness of site and manufacturer data
   - **NetBox Analysis**: Document device and device type quality and coverage
   - **Gap Identification**: Identify missing devices in ServiceNow and missing foundation data in NetBox

**Phase 1: Foundation Data Convergence (ServiceNow → NetBox)**

**Step 1: Parameter Configuration for Foundation Export**
- **ServiceNow Actions**:
  - Navigate to **All > NetBox > Configuration > Application Parameters**
  - Set **Export NetBox Sites** to `true`
  - Set **Export NetBox Manufacturers** to `true`
  - Set **Export NetBox Regions** to `false`
  - Set **Export NetBox Departments** to `false`
  - Set **Export NetBox Customers** to `false`
  - Set **Force NetBox Synchronize flag on dependencies** to `true`
  - Ensure all **Import NetBox [ObjectType]** parameters remain `false`
  - Keep **Export NetBox Devices** and **Export NetBox Device Types** set to `false`

**Step 2: Synchronize Foundation Objects**
- **ServiceNow Actions**:
  - Navigate to **All > Organization > Locations** and set **NetBox Synchronize** flag to `true` for all site records
  - Navigate to **All > Organization > Companies** and set **NetBox Synchronize** flag to `true` for all manufacturer records
  - Monitor synchronization in **All > NetBox > Maintenance > NetBox Logs**

- **Expected Results**:
  - 50+ site records synchronized to NetBox with **ServiceNowSyncFrom** tags
  - 12 manufacturer records synchronized to NetBox with **ServiceNowSyncFrom** tags
  - NetBox devices can now reference standardized, enterprise-sourced sites and manufacturers

**Step 3: NetBox Foundation Data Cleanup**
- **NetBox Actions**:
  - Update device site assignments to reference ServiceNow-sourced sites (those with **ServiceNowSyncFrom** tags)
  - Update device type manufacturer assignments to reference ServiceNow-sourced manufacturers
  - Archive or remove duplicate NetBox-native foundation objects no longer needed
  - Validate that all devices and device types now reference **ServiceNowSyncFrom** tagged foundation objects

**Phase 2: Device Data Convergence (NetBox → ServiceNow)**

**Step 4: Parameter Reconfiguration for Device Import**
- **ServiceNow Actions**:
  - Set **Import NetBox Devices** to `true`
  - Set **Import NetBox Device Types** to `true`
  - Set **Force ServiceNowSyncTo tag on dependencies** to `true` (allows only having to tag devices)
  - Keep **Export NetBox Sites** and **Export NetBox Manufacturers** set to `true` for ongoing foundation synchronization

**Step 5: NetBox Device Tagging**
- **NetBox Actions**:
  - Navigate to NetBox device list (/dcim/devices/)
  - Apply **ServiceNowSyncTo** tag to all 2,800+ devices
  - Monitor webhook processing and ServiceNow import progress

- **ServiceNow Processing**:
  - Webhook notifications trigger validation for tagged objects
  - Device types import first, followed by devices
  - IRE processing classifies devices into appropriate CI classes
  - All imported records receive **NetBox Synchronize** flags

**Phase 3: Data Completeness and Final Cleanup (ServiceNow → NetBox)**

**Step 6: Parameter Adjustment for Reverse Device Flow**
- **ServiceNow Actions**:
  - Set **Export NetBox Devices** to `true`
  - Set **Export NetBox Device Types** to `true`
  - Set **Force NetBox Synchronize flag on dependencies** to `true` for automatic foundation handling
  - Change **Import NetBox Devices** and **Import NetBox Device Types** to `false`

**Step 7: ServiceNow Device Flagging and Export**
- **ServiceNow Actions**:
  - Navigate to the CMDB and identify any device records not yet synchronized to NetBox
  - Set **NetBox Synchronize** flag to `true` for remaining devices
  - Due to Force parameter, any missing device types or dependencies are automatically flagged
  - Monitor synchronization to ensure complete device coverage in NetBox

**Step 8: Final Data Validation and Cleanup**
- **Both Systems Actions**:
  - **Record Count Verification**: Confirm identical counts of devices, device types, sites, and manufacturers
  - **Relationship Validation**: Verify all device-to-site and device-type-to-manufacturer associations are consistent
  - **Quality Assessment**: Use CMDB Health Dashboard in ServiceNow and validate data completeness in NetBox
  - **Tag Status Review**: Ensure proper **ServiceNowSyncFrom**, **ServiceNowSyncTo**, and **NetBox Synchronize** flag distribution

**Phase 4: Enable Bidirectional Synchronization**

**Step 9: Final Parameter Configuration**
- **ServiceNow Actions**:
  - **Bidirectional Objects**: Set both **Import NetBox Devices** and **Export NetBox Devices** to `true`
  - **Bidirectional Objects**: Set both **Import NetBox Device Types** and **Export NetBox Device Types** to `true`
  - **Unidirectional Objects**: Keep **Export NetBox Sites** and **Export NetBox Manufacturers** at `true`, **Import** at `false`
  - **Force Parameters**: Set both **Force NetBox Synchronize flag on dependencies** and **Force ServiceNowSyncTo tag on dependencies** to `true`

**Step 10: Bidirectional Flow Validation**
- **Test Scenarios**:
  - **NetBox Device Update**: Modify a device in NetBox, confirm change propagates to ServiceNow
  - **ServiceNow Device Update**: Modify a device in ServiceNow, confirm change propagates to NetBox
  - **New Device Creation**: Add devices in both systems, verify proper synchronization
  - **Foundation Object Changes**: Confirm site and manufacturer updates from ServiceNow still flow to NetBox unidirectionally

**Ongoing Operations**

**Real-time Synchronization**:
- **Devices and Device Types**: Real-time synchronization in both directions with conflict monitoring
- **Sites and Manufacturers**: Continued unidirectional flow from ServiceNow to NetBox maintaining enterprise authority
- **Change Coordination**: Implement user training on data stewardship responsibilities for bidirectional objects

**Monitoring**:
- **Conflict Detection**: Monitor **All > NetBox > Maintenance > NetBox Logs** for synchronization conflicts
- **Data Consistency**: Regular validation that device and device type data remains identical between systems
- **Performance Monitoring**: Track synchronization timing and webhook processing efficiency

**Validation and Verification**

**Post-Implementation Checks**:

1. **Data Convergence Verification**:
   - Confirm 2,800+ devices exist identically in both systems
   - Validate 95 device types have identical specifications and relationships
   - Verify 50+ sites and 12 manufacturers maintain ServiceNow authority

2. **Synchronization Flow Validation**:
   - **Bidirectional**: Device and device type changes flow in both directions
   - **Unidirectional**: Site and manufacturer changes flow only from ServiceNow to NetBox
   - **Real-time**: All changes propagate within expected timeframes

3. **Tag and Flag Status**:
   - **NetBox**: Devices and device types have both **ServiceNowSyncTo** and **ServiceNowSyncFrom** tags
   - **NetBox**: Sites and manufacturers have only **ServiceNowSyncFrom** tags
   - **ServiceNow**: All synchronized objects have **NetBox Synchronize** flags set appropriately

**Benefits Realized**:
- **Complete Data Coverage**: Both systems now contain comprehensive, identical device and infrastructure data
- **Operational Flexibility**: Teams can work in their preferred system while maintaining enterprise-wide consistency
- **Data Governance**: Foundation objects (sites, manufacturers) maintain enterprise authority while operational objects (devices, device types) support flexible management
- **Conflict Minimization**: Alternating flow process eliminated data conflicts before enabling bidirectional synchronization
- **Efficiency Gains**: Reduced duplicate data entry and improved accuracy through automated synchronization

**Key Success Factors**:
- **Phased Approach**: Systematic convergence process prevented data conflicts and dependency issues
- **Force Parameter Strategy**: Intelligent use of automation while maintaining control over synchronization timing
- **Mixed Flow Architecture**: Optimal balance of bidirectional flexibility and unidirectional governance
- **Comprehensive Testing**: Thorough validation at each phase ensured data integrity throughout the process

This implementation demonstrates the power of alternating data flows to achieve complete data convergence before establishing a sophisticated mixed synchronization environment that balances operational flexibility with enterprise governance requirements.
