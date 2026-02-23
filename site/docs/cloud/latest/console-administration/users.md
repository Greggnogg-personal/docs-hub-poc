---
title: User Management
sidebar_label: User Management
tags:
  - cloud
  - netbox
---

# User Management

Manage who has access to your NetBox Cloud organisation and instances.

## Roles

| Role   | Description                                      |
|--------|--------------------------------------------------|
| Owner  | Full access; can delete the organisation         |
| Admin  | Manage members, billing, and all instances       |
| Member | Access to assigned instances only                |

## Invite a User

1. Go to **Organization → Members**
2. Click **Invite Member**
3. Enter their email and select a role
4. Click **Send Invitation**

The invitee receives an email to create or link their account.

## Remove a User

1. Go to **Organization → Members**
2. Find the user, click **···** → **Remove from organization**

:::caution
Removing a user immediately revokes their access to all instances in your organisation.
:::
