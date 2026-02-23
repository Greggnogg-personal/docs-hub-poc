---
title: Backups
sidebar_label: Backups
tags:
  - cloud
  - netbox
---

# Backups

NetBox Cloud automatically backs up all instance data daily. Manual snapshots can be triggered at any time.

## Automatic Backups

| Plan | Frequency | Retention |
|------|-----------|-----------|
| Free | Daily | 7 days |
| Professional | Daily | 30 days |
| Enterprise | Daily + hourly | 90 days |

Backups include the PostgreSQL database, uploaded media files, and instance configuration.

## Manual Snapshot

1. Go to **Instances → [your instance] → Backups**
2. Click **Create Snapshot**
3. Optionally enter a label
4. Click **Confirm**

Snapshot creation is near-instant (copy-on-write). Available storage: 10 GB (Free), unlimited (Professional/Enterprise).

## Restore

To restore from a backup:

1. Open **Instances → [your instance] → Backups**
2. Select the backup to restore from
3. Click **···** → **Restore**
4. Confirm — the instance will be restored to the selected point in time

:::caution
Restoring overwrites current data. This operation cannot be undone.
:::

## Export / Download

Enterprise plan customers can download full backup archives (gzip-compressed PostgreSQL dump + media tarball) from the Backups tab.
