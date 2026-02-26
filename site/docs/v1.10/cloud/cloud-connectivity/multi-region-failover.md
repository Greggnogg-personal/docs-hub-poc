---
source: localdocs
tags:
  - cloud
  - administration
  - operations
  - networking
versions:
  netbox_cloud: v1.10
status: current
title: AWS Multi Region Failover (v1.10)
lastUpdatedAt: 1762194867000
canonical: /docs/v1.10/cloud/cloud-connectivity/multi-region-failover/
---

# Overview

NetBox Cloud includes multi-region deployment options as an add-on available to Premium Tier customers to improve availability and resilience. In this setup, your NetBox data is replicated across regions, allowing for a failover strategy in the event of a regional AWS outage.

This feature is typically recommended for customers with high availability requirements or global operations where downtime has significant impact.

## Prerequisites

- NetBox Cloud Premium Tier subscription

## Architecture

A multi-region deployment consists of:

- **Primary NetBox Instance**
  - Runs in your selected primary AWS region.
  - Provides full read/write access.
  - Has a unique hostname in the format `xxx.cloud.netboxapp.com`.

- **Secondary NetBox Instance**
  - Runs in a secondary AWS region.
  - Operates in read-only mode during normal operations.
  - Can be promoted to primary in a failover event.
  - Has a unique hostname in the format `xxx.cloud.netboxapp.com`.
  - Custom hostnames are not supported - both instances must use the standard `xxx.cloud.netboxapp.com` format.

- **Global Database Replication**
  - Uses AWS RDS PostgreSQL global replication.
  - Keeps database state synchronized between primary and secondary regions.

```mermaid
flowchart TD
    %% Use explicit direction and cleaner structure
    direction TB
    
    %% Force R/W to top by defining it first
    RW(("NetBox Clients<br/>read & write")):::primary
    RWC[dunder-mifflin-dev.cloud.netboxapp.com<br/>dunder-mifflin-dev-use1.cloud.netboxapp.com]:::primary
    
    subgraph "NetBoxLabs AWS Hosting"
        subgraph "us-east-1 (Primary - R/W)"
            LB1[Load Balancer]:::primary
            NI1[NetBox Instances]:::primary
            DB1[("Dunder Mifflin DB<br/>(R/W)")]:::primary
        end
    end
    
    %% Force R/O to bottom by defining it second
    RO(("NetBox Clients<br/>read only")):::secondary
    ROC[dunder-mifflin-dev-ro.cloud.netboxapp.com<br/>dunder-mifflin-dev-usw2.cloud.netboxapp.com]:::secondary
    
    subgraph "NetBoxLabs AWS Hosting"
        subgraph "us-west-2 (Secondary - R/O)"
            LB2[Load Balancer]:::secondary
            NI2[NetBox Instances]:::secondary
            DB2[("Dunder Mifflin DB<br/>(R/O)")]:::secondary
        end
    end
    
    %% Primary region connections (R/W)
    RW --> RWC
    RWC --> LB1
    LB1 --> NI1
    NI1 --> DB1
    
    %% Secondary region connections (R/O)
    RO --> ROC
    ROC --> LB2
    LB2 --> NI2
    NI2 --> DB2
    
    %% Global replication
    DB1 -.->|Global Replication| DB2
    
    %% Force layout order with explicit positioning
    classDef primary fill:#1565c0,stroke:#0d47a1,color:#ffffff
    classDef secondary fill:#e65100,stroke:#bf360c,color:#ffffff
```


## Availability

Multi-region failover is available as an add-on for Premium Tier customers.

## When to Use Multi-Region Failover

This feature is best suited for customers who:

- Operate globally with strict uptime requirements.
- Require disaster recovery readiness.
- Need read-only access in multiple regions.

For customers with standard availability needs, a single-region deployment is often sufficient.

## Next Steps

If you are interested in enabling multi-region failover for your NetBox Cloud deployment:

1. **Contact your account team** to discuss requirements and availability
2. **Schedule implementation** with our deployment team

Our team will help scope requirements, estimate implementation timeline, and guide you through the setup process.
