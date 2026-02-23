---
title: NetBox Enterprise Documentation
sidebar_label: Overview
tags:
  - enterprise
  - netbox
---

# NetBox Enterprise Documentation

NetBox Enterprise is the self-hosted, production-hardened distribution of NetBox. It includes all Community features plus enterprise-grade additions: SSO, high availability, audit logging, and dedicated support.

## What's Included

| Feature               | Community | Enterprise |
|-----------------------|:---------:|:----------:|
| Core NetBox           | ✓         | ✓          |
| REST API & GraphQL    | ✓         | ✓          |
| Custom Fields & Links | ✓         | ✓          |
| SSO / SAML / OIDC     | ✗         | ✓          |
| High Availability     | ✗         | ✓          |
| Audit Log             | ✗         | ✓          |
| Kubernetes Helm Chart | ✗         | ✓          |
| Enterprise Support    | ✗         | ✓          |

## Deployment Options

- **Virtual Machines** — standard Linux install with the Enterprise package
- **Kubernetes** — official Helm chart with HA configuration
- **Air-gapped** — offline deployment with mirrored packages

## Navigation

- [Feature Overview](./features/overview) — full feature rundown
- [High Availability](./features/ha) — active/passive cluster setup
- [SSO & SAML](./features/sso) — integrate with your identity provider
- [Installation Requirements](./installation/requirements) — hardware and software prerequisites
