---
tags:
  - cloud
  - configuration
  - discovery
  - enterprise
  - netbox
  - troubleshooting
title: Cisco Catalyst Center Integration - FAQ and Troubleshooting
source: localdocs
lastUpdatedAt: 1756890057000
canonical: >-
  /docs/integrations/platform-integrations/cisco-catalyst-center/cisco-catalyst-center-faq/
---
# Troubleshooting

## Common Issues

1. **Authentication Errors**:
   ```
   ❌ CCC_HOST environment variable must be set.
   ❌ CCC_USER and CCC_PWD must be provided in policy config.
   ```
   **Solution**: Verify your `.env` file contains all required variables.

2. **Connection Errors**:
   ```
   Failed to authenticate with Cisco Catalyst Center
   ```
   **Solution**: Check your Catalyst Center credentials and network connectivity.

3. **Diode Connection Errors**:
   ```
   ❌ Missing Diode connection details in .env
   ```
   **Solution**: Verify your Diode client ID and secret are correct.

4. **Permission Errors**:
   ```
   Permission denied when accessing /opt/orb/
   ```
   **Solution**: Ensure the current directory has proper read permissions.
