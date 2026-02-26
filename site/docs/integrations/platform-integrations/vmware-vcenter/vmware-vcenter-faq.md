---
tags:
  - administration
  - api
  - assurance
  - authentication
  - cloud
  - discovery
  - enterprise
  - netbox
title: VMware vCenter Integration - FAQ and Troubleshooting
source: localdocs
lastUpdatedAt: 1757060243000
canonical: /docs/integrations/platform-integrations/vmware-vcenter/vmware-vcenter-faq/
---

# VMware vCenter Integration FAQ and Troubleshooting

This document provides answers to commonly asked questions about the NetBox VMware vCenter integration.

## General Questions

**Q: Does the integration support multiple vCenter instances?**  
**A:** Yes, to ingest data from multiple vCenters, you can run multiple instances of the integration with separate configurations.

**Q: Can NetBox push configurations to vCenter?**  
**A:** No. The integration is currently data-in only, synchronising from vCenter into NetBox.

**Q: Is the integration free to use?**  
**A:** The vCenter integration is available with commercial editions of NetBox.

**Q: Do I have to buy NetBox Assurance to use the NetBox vCenter integration?**  
**A:** Yes. The NetBox vCenter integration extracts and transforms the latest state from VMware vCenter which is sent to NetBox Assurance where users can control how it is ingested into NetBox.

**Q: Which versions of NetBox are supported?**  
**A:** 4.2.3 and above.

**Q: Which versions of vCenter are supported?**  
**A:** The integration targets compatibility with the latest VMware vCenter APIs.

## Technical Questions

**Q: What authentication methods does the integration support?**  
**A:** The integration supports username/password authentication to vCenter. API tokens are obtained automatically during the authentication process.

**Q: How does the integration handle SSL certificates?**  
**A:** The integration supports both SSL certificate validation and bypass modes. Use the `SKIP_SSL` configuration option to bypass SSL validation for development/testing environments.

**Q: What happens if a vCenter host is unreachable?**  
**A:** The integration will log warnings for unreachable hosts and continue processing other hosts. Unreachable hosts will not be ingested into NetBox.

**Q: How are site assignments determined for hosts?**  
**A:** Sites are determined by `netbox_site:siteName` tags on vCenter hosts. Hosts without these tags are assigned to a "DefaultSite".

**Q: What happens to VMs when their host is offline?**  
**A:** VMs are processed regardless of host status, but their power state is mapped to NetBox status (powered off VMs become "offline" status).

**Q: How does the integration handle duplicate IP addresses?**  
**A:** The integration handles duplicate IP addresses by reusing existing NetBox entities when possible.

**Q: What custom fields are required in NetBox?**  
**A:** The integration requires these custom fields:
- `vm_uuid` (Virtual Machine, Text)
- `datastore_name` (Virtual Disk, Text)  
- `vmdk_file_path` (Virtual Disk, Text)
- `parent_site_groups` (Site, Multiple objects)

## Troubleshooting

### Connection Issues

**Problem: Connection to vCenter fails with SSL errors**  
**Solution:** 
- Verify SSL certificates are valid on the vCenter server
- Use `SKIP_SSL=true` in configuration for testing (not recommended for production)
- Check firewall rules allow HTTPS traffic to vCenter
- Verify vCenter hostname resolves correctly

**Problem: Authentication fails with "Invalid credentials"**  
**Solution:**
- Verify username and password are correct
- Check if account has required vCenter permissions
- Ensure account is not locked or expired
- Verify vCenter authentication service is running

### Common Error Messages

**"❌ VCENTER_HOST must be provided in policy config"**
- Add `VCENTER_HOST` to your policy configuration
- Verify hostname is correct and resolvable

**"❌ VCENTER_USER and VCENTER_PWD must be provided in policy config"**
- Add `VCENTER_USER` and `VCENTER_PWD` to your policy configuration
- Verify credentials are correct
