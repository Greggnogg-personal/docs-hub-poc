---
title: Kubernetes Deployment
sidebar_label: Kubernetes
tags:
  - enterprise
  - netbox
---

# Kubernetes Deployment

NetBox Enterprise ships an official Helm chart for production Kubernetes deployments.

## Prerequisites

- Kubernetes 1.24+
- Helm 3.10+
- A `PersistentVolume` provisioner (for media storage)
- PostgreSQL 14+ accessible from the cluster
- Redis 6+ accessible from the cluster

## Add the Helm Repository

```bash
helm repo add netboxlabs https://charts.netboxlabs.com
helm repo update
```

## Install

```bash
helm install netbox-enterprise netboxlabs/netbox-enterprise \
  --namespace netbox \
  --create-namespace \
  --set netbox.secretKey="$(openssl rand -base64 48)" \
  --set postgresql.host=postgres.example.com \
  --set postgresql.password="$PG_PASSWORD" \
  --set redis.host=redis.example.com \
  --set license.key="$NBE_LICENSE_KEY"
```

## Scaling

```bash
kubectl scale deployment netbox-enterprise --replicas=3 -n netbox
```

The chart supports horizontal pod autoscaling — see `values.yaml` for `hpa.*` settings.

## Values Reference

Full values reference: `helm show values netboxlabs/netbox-enterprise`
