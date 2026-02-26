---
tags:
  - helm
  - enterprise
  - netbox
  - troubleshooting
  - kubernetes
versions:
  enterprise: v1.11
status: current
related_docs:
  - netbox-enterprise-helm-overview
  - netbox-enterprise-helm-prerequisites
  - netbox-enterprise-helm-install
  - netbox-enterprise-helm-operations
  - netbox-enterprise-helm-values-guide
source: localdocs
lastUpdatedAt: 1764689862000
canonical: /docs/preview/helm/v1.11/netbox-enterprise-helm-troubleshooting/
---
# NetBox Enterprise Helm Troubleshooting

<nav aria-label="breadcrumb">
  <ol style={{display: 'flex', listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', fontSize: '14px', color: '#666'}}>
    <li><a href="/docs/" style={{color: '#3498db', textDecoration: 'none'}}>NetBox Labs Documentation</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li><a href="/docs/helm/" style={{color: '#3498db', textDecoration: 'none'}}>Helm Installation Guides</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li style={{color: '#666'}}>Troubleshooting</li>
  </ol>
</nav>

<div style={{background: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px', padding: '15px', margin: '20px 0', color: '#856404'}}>
  <strong>Beta Notice:</strong> These Helm charts are currently in beta. While stable for testing and development environments, 
  please thoroughly test in your specific environment before production deployment. 
  For the most up-to-date information, please refer to the <a href="https://docs.netboxlabs.com/enterprise" target="_blank">main documentation</a>.
</div>

This guide covers common issues and their solutions when deploying and operating NetBox Enterprise using Helm.

## Common Installation Issues

### Helm Chart Repository Issues

**Problem:** Cannot add or update Helm chart repository

```bash
Error: failed to fetch https://netboxlabs.com/charts/enterprise-helm/index.yaml : 404 Not Found
```

**Solution:**

1. Verify you have access to the Enterprise Portal and valid credentials
2. Ensure your organization has access to the Enterprise Helm charts
3. Check if the repository URL has changed in your Enterprise Portal
4. Re-add the repository with fresh credentials:

```bash
## Remove existing repository
helm repo remove netboxlabs-enterprise

## Re-add with current credentials from Enterprise Portal
helm repo add netboxlabs-enterprise https://netboxlabs.com/charts/enterprise-helm/ \
  --username YOUR_USERNAME \
  --password YOUR_PASSWORD
```

## License Configuration Issues

**Problem:** License validation failures

```bash
Error: license validation failed: invalid license format
```

**Solution:**

1. Verify the license file format in your base values file
2. Ensure license content is properly base64 encoded
3. Check license expiration date
4. Contact NetBox Labs support if license appears invalid

**Problem:** License file not found during deployment

**Solution:**

1. Verify the base values file contains the license configuration
2. Ensure the values file is being used in the deployment:

```bash
helm install netbox netboxlabs-enterprise/netbox-enterprise \
  -f values-base.yaml \
  -f values-extra.yaml \
  --namespace netbox-enterprise \
  --create-namespace
```

### Image Pull Issues

**Problem:** Cannot pull NetBox Enterprise images

```bash
Error: ImagePullBackOff
```

**Solution:**

1. Verify image registry credentials are configured correctly
2. Check if your cluster has access to the NetBox Labs registry
3. For air-gapped deployments, ensure images are available in your private registry
4. Verify image tags match your license version

```bash
## Check pod status
kubectl get pods -n netbox-enterprise

## Check pod events for detailed error information
kubectl describe pod <pod-name> -n netbox-enterprise
```

## Common Runtime Issues

### Database Connection Issues

**Problem:** NetBox cannot connect to PostgreSQL

**Solution:**

1. Verify database credentials in your values file
2. Check database network connectivity
3. For external databases, ensure security groups/firewall rules allow access
4. Verify database service is running and accessible

```bash
## Check database pod status (if using bundled PostgreSQL)
kubectl get pods -n netbox-enterprise | grep postgresql

## Check database connectivity from NetBox pod
kubectl exec -it <netbox-pod> -n netbox-enterprise -- nc -zv <db-host> 5432
```

## Redis Connection Issues

**Problem:** NetBox cannot connect to Redis

**Solution:**

1. Verify Redis configuration in your values file
2. Check Redis service status
3. Ensure Redis authentication matches NetBox configuration

```bash
## Check Redis pod status (if using bundled Redis)
kubectl get pods -n netbox-enterprise | grep redis

## Test Redis connectivity
kubectl exec -it <netbox-pod> -n netbox-enterprise -- redis-cli -h <redis-host> ping
```

## Storage Issues

**Problem:** Persistent volumes not mounting correctly

**Solution:**

1. Verify your cluster has appropriate storage classes
2. Check persistent volume claim status
3. Ensure adequate storage space is available

```bash
## Check PVC status
kubectl get pvc -n netbox-enterprise

## Check storage class availability
kubectl get storageclass
```

## Performance Issues

**Problem:** Slow response times or timeouts

**Solution:**

1. Check resource limits and requests in values file
2. Monitor pod resource usage
3. Verify database performance
4. Consider scaling recommendations

```bash
## Check pod resource usage
kubectl top pods -n netbox-enterprise

## Check pod limits and requests
kubectl describe pod <netbox-pod> -n netbox-enterprise
```

## Networking Issues

### Ingress/LoadBalancer Issues

**Problem:** Cannot access NetBox Enterprise web interface

**Solution:**

1. Verify ingress controller is installed and configured
2. Check ingress resource configuration
3. Verify DNS resolution for ingress hostname
4. Check SSL/TLS certificate configuration

```bash
## Check ingress status
kubectl get ingress -n netbox-enterprise

## Check ingress controller logs
kubectl logs -n ingress-nginx deployment/ingress-nginx-controller
```

## Service Discovery Issues

**Problem:** Services cannot communicate within cluster

**Solution:**

1. Verify service configurations
2. Check network policies
3. Ensure DNS resolution within cluster

```bash
## Check service status
kubectl get services -n netbox-enterprise

## Test DNS resolution from pod
kubectl exec -it <pod-name> -n netbox-enterprise -- nslookup <service-name>
```

## Configuration Issues

### Values File Problems

**Problem:** Configuration not being applied

**Solution:**

1. Verify YAML syntax in values files
2. Check values file precedence (later files override earlier ones)
3. Use `helm template` to preview rendered configuration

```bash
## Validate values file syntax
helm template netbox netboxlabs-enterprise/netbox-enterprise \
  -f values-base.yaml \
  -f values-extra.yaml \
  --dry-run

## Check current configuration
helm get values netbox -n netbox-enterprise
```

## Environment Variable Issues

**Problem:** Environment variables not being set correctly

**Solution:**

1. Verify environment variable configuration in values file
2. Check pod environment variables
3. Ensure sensitive values are using secrets

```bash
## Check pod environment variables
kubectl exec -it <netbox-pod> -n netbox-enterprise -- env | grep NETBOX
```

## Logging and Monitoring

### Log Access

```bash
## View NetBox application logs
kubectl logs -f deployment/netbox -n netbox-enterprise

## View database logs (if using bundled PostgreSQL)
kubectl logs -f deployment/postgresql -n netbox-enterprise

## View Redis logs (if using bundled Redis)
kubectl logs -f deployment/redis -n netbox-enterprise
```

## Health Checks

```bash
## Check deployment status
kubectl get deployments -n netbox-enterprise

## Check pod readiness and health
kubectl get pods -n netbox-enterprise -o wide

## Check service endpoints
kubectl get endpoints -n netbox-enterprise
```

## Upgrade Issues

### Upgrade Failures

**Problem:** Helm upgrade fails

**Solution:**

1. Review upgrade logs for specific errors
2. Verify new chart version compatibility
3. Check for breaking changes in release notes
4. Consider rolling back if necessary

```bash
## Check upgrade history
helm history netbox -n netbox-enterprise

## Rollback if needed
helm rollback netbox <revision> -n netbox-enterprise
```

## Migration Issues

**Problem:** Database migrations fail during upgrade

**Solution:**

1. Check NetBox logs for migration errors
2. Verify database permissions
3. Ensure adequate database resources
4. Contact support for complex migration issues

## Getting Support

### Collecting Diagnostic Information

Before contacting support, gather the following information:

```bash
## Cluster information
kubectl cluster-info

## NetBox deployment status
kubectl get all -n netbox-enterprise

## Pod logs
kubectl logs deployment/netbox -n netbox-enterprise --tail=100

## Events
kubectl get events -n netbox-enterprise --sort-by=.metadata.creationTimestamp

## Helm release information
helm list -n netbox-enterprise
helm get values netbox -n netbox-enterprise
```

## Support Channels

- **Enterprise Support**: Contact through your Enterprise Portal
- **Documentation**: Review the [NetBox Labs Enterprise documentation](https://docs.netboxlabs.com/enterprise)
- **Professional Services**: Available for complex deployments and migrations

### Known Issues

Check the [NetBox Enterprise release notes](https://docs.netboxlabs.com/enterprise/release-notes/) for known issues and workarounds in your version.
