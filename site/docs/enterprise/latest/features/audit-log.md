---
title: Audit Log
sidebar_label: Audit Log
tags:
  - enterprise
  - netbox
---

# Audit Log

The Enterprise Audit Log records every change made in NetBox — who changed what, when, and from where.

## What Is Logged

| Action | Captured |
|--------|----------|
| Object create | ✓ |
| Object update | ✓ (diff of changed fields) |
| Object delete | ✓ |
| Login / logout | ✓ |
| Failed login attempts | ✓ |
| API token creation/deletion | ✓ |

## Viewing the Audit Log

Navigate to **Admin → Audit Log** in the NetBox UI. Filter by user, object type, action, or date range.

## Exporting

Audit events can be streamed in real time to external SIEM platforms:

- **Syslog** — configure in `AUDIT_LOG_SYSLOG_SERVER`
- **Webhook** — HTTP POST to an arbitrary URL on each event
- **CSV export** — download from the UI for date ranges up to 90 days

## Retention

By default, audit log entries are retained indefinitely. Configure `AUDIT_LOG_RETENTION_DAYS` to automatically purge old records.
