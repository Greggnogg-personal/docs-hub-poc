---
tags:
  - assurance
  - automation
  - cloud
  - discovery
  - enterprise
  - integration
  - netbox
  - networking
title: Cisco Meraki Integration - FAQ and Troubleshooting
source: localdocs
lastUpdatedAt: 1757434234000
canonical: /docs/integrations/platform-integrations/cisco-meraki/cisco-meraki-faq/
---

# Cisco Meraki Integration FAQ and Troubleshooting

This document provides answers to commonly asked questions about the NetBox Cisco Meraki integration.

## General Questions

**Q: Does the integration support multiple Meraki organizations?**  
**A:** Yes, to ingest data for multiple organizations, you can run separate integration instances with different configurations.

**Q: Can NetBox push configurations to Meraki?**  
**A:** No. The integration is currently data-in only, synchronising from Meraki into NetBox.

**Q: Is the integration free to use?**  
**A:** The Meraki integration is available with commercial editions of NetBox.

**Q: Do I have to buy NetBox Assurance to use the NetBox Meraki integration?**  
**A:** Yes. The NetBox Meraki integration extracts and transforms the latest state from Cisco Meraki Dashboard which is sent to NetBox Assurance where users can control how it is ingested into NetBox.

**Q: Which versions of NetBox are supported?**  
**A:** 4.2.3 and above.

**Q: Which versions of Meraki Dashboard are supported?**  
**A:** This integration is built on the Cisco Meraki Dashboard API (v1).

## Technical Questions

**Q: What authentication methods does the integration support?**  
**A:** The integration supports API key authentication to Meraki Dashboard. You need to provide a valid Meraki API key and organization ID.

**Q: How does the integration handle API rate limits?**  
**A:** The integration uses the Meraki SDK which automatically handles rate limiting and retry logic. The SDK includes built-in retry mechanisms with configurable timeouts and maximum retry attempts.

**Q: How are site assignments determined for devices?**  
**A:** Devices are assigned to sites based on their `networkId` field from the Meraki organization devices. Each Meraki network becomes a NetBox site.

**Q: What happens to WLANs when their serving devices are offline?**  
**A:** WLANs are processed independently of device status. The integration creates WLAN entities based on network SSID configurations, not just active devices.

**Q: How does the integration handle duplicate WLANs?**  
**A:** The integration deduplicates WLANs based on unique combinations of (network_id, ssid_name). Each unique combination creates one NetBox WirelessLAN entity.

**Q: What custom fields are required in NetBox?**  
**A:** The integration requires these custom fields:
- `meraki_network_id` (Site, Text)

**Q: Which device types are supported?**  
**A:** The integration supports three Meraki device types:
- `MR` series (Wireless APs)
- `MS` series (Switches)
- `MX` series (Security Appliances)

## Troubleshooting

### Connection Issues

**Problem: Connection to Meraki API fails with authentication errors**  
**Solution:** 
- Verify API key is valid and has appropriate permissions
- Check if the organization ID is correct
- Ensure the API key hasn't expired
- Verify Meraki Dashboard API is accessible from your network

**Problem: Authentication fails with "Invalid API key"**  
**Solution:**
- Verify the API key is correctly formatted
- Check if the key has the required permissions for the organization
- Ensure the key is not expired or revoked
- Verify the organization ID matches the key's access

**Problem: API requests return 403 Forbidden**  
**Solution:**
- Check if the API key has sufficient permissions
- Verify the organization ID is correct
- Ensure the key has access to the specific organization
- Check if there are any IP restrictions on the API key

### Common Error Messages

**"❌ MERAKI_API_KEY must be provided in policy config"**
- Add `MERAKI_API_KEY` to your policy configuration
- Verify the API key is valid and properly formatted

**"❌ MERAKI_ORG_ID must be provided in policy config"**
- Add `MERAKI_ORG_ID` to your policy configuration
- Verify the organization ID is correct
