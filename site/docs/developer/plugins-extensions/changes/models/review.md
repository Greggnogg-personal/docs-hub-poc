---
title: Reviews
description: Review model for NetBox Change Management workflow
tags:
  - authentication
  - automation
  - cloud
  - enterprise
  - netbox
  - operations
source: localdocs
lastUpdatedAt: 1767887294000
canonical: /docs/developer/plugins-extensions/changes/models/review/
---
# Reviews

Reviews are submitted to approve, reject, or comment on a [change request](./changerequest). The users eligible to review a particular change request are determined by its assigned [change policy](./policy).

## Fields

### Change Request

The [change request](./changerequest) being reviewed.

### User

The author of the review.

### Status

The current status of the review. Valid statuses are listed below.

| Status            | Description                                                      |
|-------------------|------------------------------------------------------------------|
| Pending           | The review is in progress                                        |
| Comment           | The reviewer has questions or feedback                           |
| Changes Requested | The reviewer has requested modifications to the proposed changes |
| Approved          | The proposed changes are accepted                                |
| Rejected          | The proposed changes are rejected                                |
