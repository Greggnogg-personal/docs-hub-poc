---
title: Comment Replies
description: Comment reply model for NetBox Change Management reviews
tags:
  - authentication
  - automation
  - cloud
  - enterprise
  - netbox
  - operations
source: localdocs
lastUpdatedAt: 1767887294000
canonical: /docs/developer/plugins-extensions/changes/models/commentreply/
---
# Comment Replies

Each [comment](./comment) on a [change request](./changerequest) starts a new discussion thread to which users can reply. This helps keep the discussion around a change request organized.

## Fields

### Author

The user who created the reply.

### Comment

The comment to which the reply thread belongs.

### Content

The reply body.
