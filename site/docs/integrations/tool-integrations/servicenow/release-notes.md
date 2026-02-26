---
title: release notes
description: ServiceNow NetBox CMDB Integration documentation
tags:
  - administration
  - cloud
  - enterprise
  - integration
  - netbox
  - operations
source: localdocs
lastUpdatedAt: 1768942587000
canonical: /docs/integrations/tool-integrations/servicenow/release-notes/
---
# NetBox CMDB Integration v1.x Release Notes

## Version Information
- **Application Version**: 1.4.0
- **ServiceNow Compatibility**: Certified for Yokohama and Zurich versions.

---

### 1.4.0

New features:
- **Flexible Tenant Usage Configuration**: Added new Tenant Usage setup page allowing administrators to configure how NetBox Tenants should be imported - as Customers, Departments, both, or neither. When selecting "Customers only" or "Departments only", Tenant Group IDs are now ignored. When selecting "Both", Tenant Group IDs remain mandatory to distinguish between the two types. This feature provides simplified control over tenant synchronization behavior through a dedicated configuration interface
- **NetBox Locations Support**: Full support for NetBox Locations as a distinct object type, separate from Sites and Regions. Locations can now be imported from NetBox and exported from ServiceNow, with proper hierarchical relationships within Sites. The cmn_location table now includes a NetBox Type field to distinguish between Sites, Locations, and Regions
- **Dynamic CI Class Management**: New Class Manager configuration page enabling administrators to register any ServiceNow CI class for NetBox integration. This removes the limitation of hardcoded CI class mappings and allows flexible integration with any custom or standard CMDB CI classes. Registered classes are synchronized with NetBox through a custom field choice list

Known issues:
- Update set preview may show warnings about missing sys_pd_snapshot references (cosmetic only, accept remote update). See [Known Issues](known-issues.md#issue-1-update-set-preview-warning-for-process-definition-references)
- Guided Setup may display blank page after pre-installation checklist. See [Known Issues](known-issues.md#issue-2-guided-setup-blank-page-after-pre-installation-checklist) for workaround procedure

### 1.3.4

Fixes:
- Includes hotfix-103

### hotfix-103

Fixes:
- Fixes situation when some devices would be imported with a region as a site

### 1.3.3

New features:
- Better duplication avoidance in CMDB objects with proper IRE rules for the Devices data source
- Better duplication avoidance in non-CMDB incoming objects, where identical object names will now cause record to be updated rather than duplicated
- Use of ServiceNow Normalization Data Services plugin (com.glide.data_services_canonicalization.client) is now supported to normalize incoming manufacturers and customers
- ServiceNow import cache makes for an important performance increase when mass importing objects in ServiceNow by tagging them in NetBox

Fixes:
- Low-level hardware IRE rule would prevent other higher-level ones from running
- Some records with dependencies would fail to populate the dependency in a reference field when created
- Error "must make a unique set" returned by NetBox was not trapped
- Device Export would crash when customized OpStatus and InstallStatus values are used
- Some Flow Actions would show as corrupted in their JSON Builder step

### 1.2.6

Fixes:
* Guided setup would show a blank page on Xanadu
* Guided setup would skip over steps and not execute in the correct order
* Setting up the temp admin channel during guided setup would not allow to go back to the previous screen if it failed

### 1.2.2

Fixes:
* Exporting objects that already exist sometimes create an error 500, now trapped
* Flagging devices with NetBox Synchronize would cause dependent sites and manufacturers to fail exporting
* Unused application parameters are not created on new installs
* At install time, a warning during the update set commit falsely claimed that some fields were being deleted and that some data loss would occur
* NetBox[ObjectType]NB classes would attempt to validate even when no NetBox Correlation ID was present

### 1.2.1

New features:
* New tags in NetBox. Setting up the application in ServiceNow will create two new tags in NetBox:
** ServiceNowSyncFrom, which is automatically assigned to any NetBox object that was exported from ServiceNow.
** ServiceNowSyncTo, a user-controlled tag to allow an object to be imported into ServiceNow
* Object validation. A device or any other object type that is being imported into ServiceNow or exported to NetBox will be validated:
** In NetBox:
*** Ensuring the object is tagged with ServiceNowSyncTo
*** Ensuring all referenced objects (ex. for a device, its type, manufacturer, site, regions and tenant) are also tagged
** In ServiceNow:
*** Ensuring the object if flagged with NetBox Synchronize
*** Ensuring the object's includes values in all fields that are mandatory in NetBox
*** Ensuring all referenced objects are also flagged and have values in their own mandatory fields
** In either direction, objects that are declared invalid will not be exported / imported
* Force dependency tagging. Two new true/false parameters:
** Force ServiceNowSyncTo Tagging: Upon validation of a NetBox object, automatically tag objects that are untagged to make them valid
** Force NetBox Synchronize flags: Upon validation of a ServiceNow object, automatically flag them with NetBox Synchronize to make them valid
*** Note: If mandatory fields are missing values, ServiceNow objects will remain invalid and not be synchronized
* New fields in ServiceNow for NetBox objects.
** Ready for export: True / false, if the object has been validated for export
** Export ready message: Status of the readiness of a ServiceNow object to be exported to NetBox, including the cause for the object being invalid
* Detailed logging. Validation results will appear in NetBox Logs if Log Level is set to Medium or High in the parameters

### 1.1.4

Fixed:
* Some data sources could get stuck with multiple files
* Guided setup had one non-functional page on WashingtonDC

### 1.1

New features:
* Full support for the Xanadu version of ServiceNow
* Streamlined installation process

### 1.0-patch-2

Contains:
* patch-1
* hotfix-38
* hotfix-42
* hotfix-43
* hotfix-44

### 1.0-hotfix-44
Released: 2025-03-14

Fixed:
* Users could change the API usernames during guided setup, but changes would be ignored in favor of hard-coded values
* Cosmetic and functional changes in Guided setup pages

Notes:
* Horfix-44 will install without error on ServiceNow Xanadu, but will throw errors at commit time on WashingtonDC. The following errors in the commit log can safely be ignored, as they relate to new tables in Xanadu used for the New Experience Guided setup :
** Table 'sys_es_latest_script' does not exist
** Table 'sys_pd_process_variant' does not exist

### 1.0-hotfix-43
Released: 2025-03-07

Fixed:
* Flow actions Get... as file would fail when going through a MID server

Installation:
* This hotfix might require elevated privileges to install, as it contains five new ACLs for role mid_server:
** create, read and write sys_attachment
** read and write sys_data_source 

### 1.0-hotfix-42
Released: 2025-03-07

Fixed:
* Cosmetic changes only

### 1.0-patch-1

Contains:
* hotfix-29
* hotfix-32

### 1.0-hotfix-38

Fixed:
* Guided setup would fail at data selection step
* Bulk import Flow would fail at Test API Connection step

### 1.0-hotfix-32

Fixed:
* Guided setup would fail when using a MID server

### 1.0-hotfix-29

Fixed:
* Parameter values would get overwritten when installing a new version of the application

### 1.0

Initial release, supporting the following features:
* Bi-directional data synchronization between ServiceNow and NetBox
* Flow Designer actions for customized workflows
* NetBox menu in ServiceNow to view synchronized data
* Supports MID server for on-premise NetBox instances
* Guided setup for application configuration
* Certified for ServiceNow WashingtonDC release (all patch levels)

Objects synchronized are:
| ServiceNow | NetBox | Remarks |
| ---------- | ------ | ------- |
| Configuration items | Devices | Classes related to networks |
| Hardware models | Device types |  |
| Companies (manufacturers) | Manufacturers |  |
| Departments | Tenants | Tenant must be part of a Tenant Group identified as Departments |
| Companies (customers) | Tenants | Tenant must be part of a Tenant Group identified as Customers |
| Location (region) | Region |  |
| Location (site) | Site |  |
