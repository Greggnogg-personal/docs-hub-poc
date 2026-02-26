---
title: Comments
description: Comment model for NetBox Change Management reviews
tags:
  - administration
  - authentication
  - cloud
  - enterprise
  - netbox
  - operations
source: localdocs
lastUpdatedAt: 1767887294000
canonical: /docs/developer/plugins-extensions/changes/models/comment/
---
# Comments

As part of the review process, users can leave comments on [change requests](./changerequest) to ask question or suggest changes. Each comment may start a thread of [replies](./commentreply) and can be marked resolved, which will hide the reply thread.

## Fields

### Author

The user who created the comment.

### Change Request

The [change request](./changerequest) to which the comment applies.

### Change Diff

The specific change within the change request the comment applies (optional).

### Content

The comment body.

### Resolved

A boolean attribute indicating whether the comment has been addressed by the change request owner.
