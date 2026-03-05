---
title: Policies
description: Change management policies for NetBox Change Management
tags:
  - administration
  - automation
  - cloud
  - enterprise
  - netbox
  - operations
source: localdocs
lastUpdatedAt: 1767887294000
canonical: /docs/developer/plugins-extensions/changes/models/policy/
---
# Policies

A policy defines the conditions that must be met for a [change request](./changerequest) to be merged. Each policy defines one or more [rules](./policyrule) which assert these conditions. All rules must be met for the policy to be satisfied.

:::note
A policy with no rules defined will always fail.

:::
## Fields

### Name

The name by which the policy is referenced.
