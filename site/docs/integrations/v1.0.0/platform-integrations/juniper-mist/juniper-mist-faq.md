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
title: Juniper Mist Integration - FAQ and Troubleshooting
source: localdocs
lastUpdatedAt: 1757060243000
canonical: /docs/integrations/platform-integrations/juniper-mist/juniper-mist-faq/
---

# Juniper Mist Integration FAQ and Troubleshooting

This document provides answers to commonly asked questions about the NetBox Juniper Mist integration.

## General Questions

**Q: Does the integration support multiple Mist organizations?**  
**A:** Yes, to ingest data for multiple organizations, you can run separate integration instances with different configurations.

**Q: Can NetBox push configurations to Mist?**  
**A:** No. The integration is currently data-in only, synchronising from Mist into NetBox.

**Q: Is the integration free to use?**  
**A:** The Mist integration is available with commercial editions of NetBox.

**Q: Do I have to buy NetBox Assurance to use the NetBox Mist integration?**  
**A:** Yes. The NetBox Mist integration extracts and transforms the latest state from Juniper Mist which is sent to NetBox Assurance where users can control how it is ingested into NetBox.

**Q: Which versions of NetBox are supported?**  
**A:** 4.2.3 and above.

**Q: Which versions of the Mist API are supported?**  
**A:** This integration is built on the Juniper Mist Cloud API (v1)

## Technical Questions

**Q: What authentication methods does the integration support?**  
**A:** The integration supports API token authentication to Mist. You need to provide a valid Mist API token and organization ID.

**Q: How does the integration handle API rate limits?**  
**A:** The integration uses the Mist API client which automatically handles rate limiting and pagination. The client includes built-in retry logic for rate-limited requests.

**Q: What happens if a Mist device is unreachable?**  
**A:** The integration will process all devices from the inventory API regardless of connection status. Disconnected devices will be marked as "offline" status in NetBox.

**Q: How are site assignments determined for devices?**  
**A:** Devices are assigned to sites based on their `site_id` field from the Mist inventory. Devices with invalid or missing `site_id` are assigned to an "Unassigned Mist Inventory" site.

**Q: What happens to WLANs when their serving devices are offline?**  
**A:** WLANs are processed independently of device status. The integration creates WLAN entities based on site configurations, not just active devices.

**Q: How does the integration handle duplicate WLANs?**  
**A:** The integration deduplicates WLANs based on unique combinations of (wlan_id, site_id, ssid). Each unique combination creates one NetBox WirelessLAN entity.

**Q: What custom fields are required in NetBox?**  
**A:** The integration requires these custom fields:
- `mist_id` (Site, Text)
- `mist_mac` (Device, Text)
- `mist_type` (Device Type, Text)
- `mist_wlan_id` (Wireless LAN, Text)
- `mist_ap_ids` (Wireless LAN, JSON)
- `mist_ap_scope` (Wireless LAN, Selection)
- `mist_wxtag_ids` (Wireless LAN, JSON)
- `mist_wlans_served` (Device, JSON)
- `mist_aps_serving_this` (Wireless LAN, JSON)

## Troubleshooting

### Connection Issues

**Problem: Connection to Mist API fails with authentication errors**  
**Solution:** 
- Verify API token is valid and has appropriate permissions
- Check if the organization ID is correct
- Ensure the API token hasn't expired
- Verify Mist API service is accessible from your network

**Problem: Authentication fails with "Invalid API token"**  
**Solution:**
- Verify the API token is correctly formatted
- Check if the token has the required scopes for the organization
- Ensure the token is not expired or revoked
- Verify the organization ID matches the token's access

**Problem: API requests return 403 Forbidden**  
**Solution:**
- Check if the API token has sufficient permissions
- Verify the organization ID is correct
- Ensure the token has access to the specific organization
- Check if there are any IP restrictions on the API token

### Common Error Messages

**"❌ MIST_APITOKEN must be provided in policy config"**
- Add `MIST_APITOKEN` to your policy configuration
- Verify the API token is valid and properly formatted

**"❌ MIST_ORG_ID must be provided in policy config"**
- Add `MIST_ORG_ID` to your policy configuration
- Verify the organization ID is correct
