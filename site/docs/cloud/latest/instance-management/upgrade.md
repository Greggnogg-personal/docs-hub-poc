---
title: Upgrading NetBox Cloud Instances
sidebar_label: Upgrade
tags:
  - cloud
  - netbox
---

# Upgrading NetBox Cloud Instances

NetBox Cloud instances are updated automatically in managed update windows. You can also trigger an upgrade manually.

## Managed Update Windows

By default, instances on the Professional and Enterprise plans receive updates during the maintenance window configured in **Organization → Settings → Maintenance Window** (UTC, weekly).

## Manual Upgrade

1. Go to **Instances** in the Console
2. Click the instance name
3. If a newer version is available, an **Upgrade Available** banner is shown
4. Click **Upgrade** and confirm

Upgrades typically complete in under 5 minutes. Instances remain available during the upgrade process (zero-downtime rolling upgrade).

## Version Pinning

Enterprise plan customers can pin an instance to a specific minor version (e.g. 4.1.x) for up to 6 months. Contact support to enable pinning.

## Rollback

If an issue is detected after upgrade, NetBox Cloud performs an automatic rollback within the first 10 minutes. Manual rollback requests can be submitted via support for up to 24 hours post-upgrade.
