---
tags:
  - helm
  - enterprise
  - netbox
  - configuration
  - getting-started
source: localdocs
lastUpdatedAt: 1765462686000
canonical: /docs/preview/helm/v1.11/advanced/netbox-enterprise-helm-deployment-examples/
---

import BetaBanner from '../components/BetaBanner';

# NetBox Enterprise Helm Deployment Examples

<nav aria-label="breadcrumb">
  <ol style={{display: 'flex', listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', fontSize: '14px', color: '#666'}}>
    <li><a href="/docs/" style={{color: '#3498db', textDecoration: 'none'}}>NetBox Labs Documentation</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li><a href="/docs/helm/" style={{color: '#3498db', textDecoration: 'none'}}>Helm Installation Guides</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li><a href="/docs/helm/advanced/" style={{color: '#3498db', textDecoration: 'none'}}>Advanced</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li style={{color: '#666'}}>Deployment Examples</li>
  </ol>
</nav>

<BetaBanner />

This guide provides deployment automation examples and validation procedures for NetBox Enterprise Helm installations.

> **Prerequisites**: Complete the [Installation Guide](../../netbox-enterprise-helm-install/), [Prerequisites](../../netbox-enterprise-helm-prerequisites/), and review [Advanced Configuration](../netbox-enterprise-helm-advanced-configuration/) before using these automation examples.

## Installation Options and Verification

### Helm Installation Options

When deploying NetBox Enterprise, these installation options can enhance your deployment process:

```bash
## Standard installation with options
helm install netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --version 1.11.5 \
  --create-namespace \
  --namespace netbox-enterprise \
  --wait \              # Wait until deployment is ready
  --timeout 10m \       # Set timeout for installation
  --debug               # Show debug information

## Preview installation without executing
helm install netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --version 1.11.5 \
  --dry-run \           # Preview without installing
  --debug               # Show what would be created
```

## Preflight Checks

Before installation, validate your configuration and cluster readiness:

```bash
## Run preflight checks on your configuration
helm template netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --version 1.11.5 | kubectl apply --dry-run=client -f -

## Check cluster resources
kubectl top nodes
kubectl describe nodes | grep -A 5 "Allocated resources"

## Verify storage classes
kubectl get storageclass

## Check required secrets exist
kubectl get secrets -n netbox-enterprise
```

## Post-Installation Verification

After deployment, systematically verify all components:

```bash
## Check pod status and readiness
kubectl get pods -n netbox-enterprise
kubectl get deployments -n netbox-enterprise
kubectl get statefulsets -n netbox-enterprise

## Verify all pods are running and ready
kubectl wait --for=condition=ready pod -l app.kubernetes.io/instance=netbox-enterprise -n netbox-enterprise --timeout=600s

## Check services and networking
kubectl get svc -n netbox-enterprise
kubectl get ingress -n netbox-enterprise
kubectl get endpoints -n netbox-enterprise

## Test database connectivity
kubectl exec -n netbox-enterprise deployment/netbox-enterprise -- \
  python manage.py check --database default

## Test application health endpoint (internal container check)
kubectl exec -n netbox-enterprise deployment/netbox-enterprise -- \
  curl -f http://127.0.0.1:8080/login/ -I

## Get admin credentials
echo "Admin Password: $(kubectl -n netbox-enterprise get secret netbox-enterprise-secret-config -o jsonpath='{.data.password}' | base64 -d)"
```

## Deployment Automation

⚠️ **Testing Required**: These CI/CD pipeline examples are provided as templates and must be tested and customized for your specific environment. Update registry URLs, credentials, and deployment configurations before use.

### CI/CD Pipeline Example (GitLab CI)
```yaml
## .gitlab-ci.yml
stages:
  - validate
  - deploy

variables:
  HELM_VERSION: "3.14.0"
  KUBECTL_VERSION: "1.29.0"

validate_deployment:
  stage: validate
  script:
    - helm lint ./helm-values/
    - helm template netbox-enterprise oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise --values values-production.yaml --version 1.11.5 > /tmp/manifests.yaml
    - kubectl --dry-run=client apply -f /tmp/manifests.yaml

deploy_staging:
  stage: deploy
  script:
    - helm upgrade --install netbox-enterprise-staging \
        oci://registry.replicated.com/netbox-enterprise/beta/netbox-enterprise \
        --values values-staging.yaml \
        --version 1.11.5 \
        --namespace netbox-staging \
        --create-namespace
  environment:
    name: staging
    url: https://netbox-staging.example.com

deploy_production:
  stage: deploy
  script:
    - helm upgrade --install netbox-enterprise \
        oci://registry.replicated.com/netbox-enterprise/beta/netbox-enterprise \
        --values values-production.yaml \
        --version 1.11.5 \
        --namespace netbox \
        --create-namespace
  environment:
    name: production
    url: https://netbox.example.com
  when: manual
  only:
    - main
```

## GitHub Actions Example
```yaml
## .github/workflows/deploy.yml
name: Deploy NetBox Enterprise

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Helm
        uses: azure/setup-helm@v3
        with:
          version: '3.14.0'
          
      - name: Configure kubectl
        uses: azure/k8s-set-context@v3
        with:
          method: kubeconfig
          kubeconfig: ${{ secrets.KUBECONFIG }}
          
      - name: Login to Replicated
        run: |
          echo "${{ secrets.REPLICATED_PASSWORD }}" | helm registry login registry.replicated.com -u ${{ secrets.REPLICATED_USERNAME }} --password-stdin
          
      - name: Deploy to staging
        if: github.event_name == 'pull_request'
        run: |
          helm upgrade --install netbox-enterprise-staging \
            oci://registry.replicated.com/netbox-enterprise/beta/netbox-enterprise \
            --values values-staging.yaml \
            --version 1.11.5 \
            --namespace netbox-staging \
            --create-namespace
            
      - name: Deploy to production
        if: github.ref == 'refs/heads/main'
        run: |
          helm upgrade --install netbox-enterprise \
            oci://registry.replicated.com/netbox-enterprise/beta/netbox-enterprise \
            --values values-production.yaml \
            --version 1.11.5 \
            --namespace netbox \
            --create-namespace
```

## Validation and Testing

### Deployment Validation Script

⚠️ **Testing Required**: This validation script should be tested in your environment before use. Commands may need adjustment based on your specific deployment configuration.

```bash
#!/bin/bash
## validate-deployment.sh

set -e

NAMESPACE="netbox"
RELEASE_NAME="netbox-enterprise"

echo "Validating NetBox Enterprise deployment..."

## Check pod status
echo "Checking pod status..."
kubectl get pods -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME

## Wait for pods to be ready
echo "Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod -l app.kubernetes.io/instance=$RELEASE_NAME -n $NAMESPACE --timeout=600s

## Check service endpoints
echo "Checking service endpoints..."
kubectl get svc -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME

## Test HTTP connectivity
echo "Testing HTTP connectivity..."
SERVICE_IP=$(kubectl get svc ${RELEASE_NAME}-nginx-ingress-controller -n $NAMESPACE -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
if curl -s -o /dev/null -w "%{http_code}" http://$SERVICE_IP | grep -q "200"; then
  echo "✓ HTTP connectivity successful"
else
  echo "✗ HTTP connectivity failed"
  exit 1
fi

## Check database connectivity
echo "Checking database connectivity..."
kubectl exec -n $NAMESPACE deployment/$RELEASE_NAME-netbox -- python manage.py check --database default

echo "✓ Deployment validation complete!"
```

## Next Steps

After completing your deployment:

1. **[Operations Guide](../../netbox-enterprise-helm-operations/)** - Backup procedures, maintenance tasks, and upgrade procedures
2. **[Advanced Configuration](../netbox-enterprise-helm-advanced-configuration/)** - Configuration reference and customization options
3. **[NetBox Enterprise Troubleshooting](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-troubleshooting/)** - Common issues and diagnostic procedures

This deployment guide focuses on automation and validation procedures while leveraging the detailed configuration information available in the dedicated [Advanced Configuration](../netbox-enterprise-helm-advanced-configuration/), [External Database](../netbox-enterprise-helm-external-database/), and [Private Registry](../netbox-enterprise-helm-private-registry/) guides. 
