---
tags:
  - helm
  - enterprise
  - netbox
  - configuration
  - operations
  - database
  - postgresql
source: localdocs
lastUpdatedAt: 1765462686000
canonical: /docs/preview/helm/v1.11/advanced/netbox-enterprise-helm-external-database/
---

import BetaBanner from '../components/BetaBanner';

# NetBox Enterprise Helm - External Database Configuration

<nav aria-label="breadcrumb">
  <ol style={{display: 'flex', listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', fontSize: '14px', color: '#666'}}>
    <li><a href="/docs/" style={{color: '#3498db', textDecoration: 'none'}}>NetBox Labs Documentation</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li><a href="/docs/helm/" style={{color: '#3498db', textDecoration: 'none'}}>Helm Installation Guides</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li><a href="/docs/helm/advanced/" style={{color: '#3498db', textDecoration: 'none'}}>Advanced</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li style={{color: '#666'}}>External Database Configuration</li>
  </ol>
</nav>

<BetaBanner />

This guide provides detailed instructions for configuring NetBox Enterprise to use external PostgreSQL databases instead of the built-in containerized database.

> **Need the basics first?** See [Installation Guide](../../netbox-enterprise-helm-install/) for standard installation steps, or [Prerequisites](../../netbox-enterprise-helm-prerequisites/) for system requirements.

## Configuration Options

Choose the configuration that matches your deployment needs:

:::info Configuration Approach

This section provides a **modular approach** to external database configuration:

1. **NetBox Enterprise (Core Platform)** - Essential database configuration for core features
2. **Discovery & Assurance Add-on** - Additional database requirements for premium features

**NetBox Enterprise** includes:
- Main NetBox database for DCIM, IPAM, circuits, and virtualization
- Enterprise authentication, APIs, and integrations
- Advanced workflows and automation features

**Add Discovery & Assurance** if your license includes:
- Automated network device discovery and monitoring
- Configuration compliance and drift detection  
- Advanced network assurance and validation capabilities
- Enhanced operational intelligence (requires additional databases)

:::

### NetBox Enterprise (Core Platform) Configuration

This is the standard external database configuration for core NetBox Enterprise:

<details>
<summary>Click to view: NetBox Enterprise External Database Configuration</summary>

```yaml
## NetBox Enterprise - External Database Configuration (Core Platform)
## For connecting to external PostgreSQL databases

## Disable internal PostgreSQL
postgresql:
  enabled: false

## NetBox Core Database Configuration
netbox:
  # External database configuration
  externalDatabase:
    enabled: true
    type: postgresql
    host: 'your-postgres-host.example.com'
    port: 5432
    database: 'netbox_db'
    username: 'netbox_user'
    # Password should be provided via secret
    existingSecret: 'netbox-db-secret'
    existingSecretPasswordKey: 'password'

  # Database connection pool settings
  database:
MAX_CONNS: 20
      CONN_MAX_AGE: 300

## Redis configuration (internal recommended)
redis:
  enabled: true  # Always keep this true (recommended)
  architecture: standalone
  auth:
    enabled: false

## Diode Chart Configuration - DISABLED for core-only deployment
diode:
  enabled: false

## Database secret creation (run this separately):
## kubectl create secret generic netbox-db-secret \
## --from-literal=password='your-database-password' \
## --namespace=netbox-enterprise

## Example for AWS RDS (Core):
## netbox:
## externalDatabase:
## host: "netbox-prod.cluster-xyz.us-east-1.rds.amazonaws.com"
## port: 5432
## database: "netbox_db"
## username: "netbox_user"
## existingSecret: "netbox-db-secret"

## Example for Google Cloud SQL (Core):
## netbox:
## externalDatabase:
## host: "10.1.0.3"  # Private IP
## port: 5432
## database: "netbox_db"
## username: "netbox_user"
## existingSecret: "netbox-db-secret"
```

</details>

## Discovery & Assurance Add-on Configuration

Add this configuration if your NetBox Enterprise license includes Discovery & Assurance features:

<details>
<summary>Click to view: Discovery & Assurance Add-on External Database Configuration</summary>

```yaml
## Discovery & Assurance Add-on - External Database Configuration
## Add these settings to your base NetBox Enterprise configuration
## to enable Discovery & Assurance with external databases

## Enable Discovery & Assurance features
diode:
  enabled: true
  
  # Hydra OAuth2 Server Database
  hydra:
    database:
      enabled: true
      type: postgresql
      host: 'your-postgres-host.example.com'
      port: 5432
      database: 'hydra_db'
      username: 'hydra_user'
      existingSecret: 'hydra-db-secret'
      existingSecretPasswordKey: 'password'
  
  # Diode Services Database Configuration
  diodeAuth:
    database:
      enabled: true
      type: postgresql
      host: 'your-postgres-host.example.com'
      port: 5432
      database: 'diode_db'
      username: 'diode_user'
      existingSecret: 'diode-db-secret'
      existingSecretPasswordKey: 'password'
  
  diodeIngester:
    database:
      # Uses same diode_db as diodeAuth
      enabled: true
      type: postgresql
      host: 'your-postgres-host.example.com'
      port: 5432
      database: 'diode_db'
      username: 'diode_user'
      existingSecret: 'diode-db-secret'
      existingSecretPasswordKey: 'password'
  
  diodeReconciler:
    database:
      # Uses same diode_db as diodeAuth
      enabled: true
      type: postgresql
      host: 'your-postgres-host.example.com'
      port: 5432
      database: 'diode_db'
      username: 'diode_user'
      existingSecret: 'diode-db-secret'
      existingSecretPasswordKey: 'password'

## Additional database secrets for Discovery & Assurance (run separately):
## kubectl create secret generic hydra-db-secret \
## --from-literal=password='your-hydra-password' \
## --namespace=netbox-enterprise

## kubectl create secret generic diode-db-secret \
## --from-literal=password='your-diode-password' \
## --namespace=netbox-enterprise
```

</details>

## Overview

Using external PostgreSQL databases provides several advantages:
- **Improved Performance**: Dedicated database resources
- **Better Backup/Recovery**: Established database backup procedures
- **High Availability**: Database clustering and failover
- **Scalability**: Independent database scaling
- **Compliance**: Meet organizational database requirements

> ⚠️ **Redis Recommendation**: We **strongly recommend** using the built-in Redis instance rather than external Redis. Redis contains only ephemeral cache data, so external Redis provides no backup/recovery benefits while likely impacting performance due to network latency. The built-in Redis is optimized for NetBox Enterprise's caching patterns.

## Database Requirements

### PostgreSQL Requirements
- **Version**: PostgreSQL 12 or higher
- **Databases**: NetBox Enterprise requires multiple databases:
  - `netbox_db` - Main NetBox database
  - `diode_db` - Diode service database
  - `hydra_db` - Authentication service database
- **Users**: Separate users for each database (recommended)
- **Extensions**: `pg_trgm` extension required

## PostgreSQL Setup

### Create Databases and Users

```sql
-- Connect as PostgreSQL superuser
-- Create databases
CREATE DATABASE netbox_db;
CREATE DATABASE diode_db;
CREATE DATABASE hydra_db;

-- Create users
CREATE USER netbox_user WITH PASSWORD 'secure_password_1';
CREATE USER diode_user WITH PASSWORD 'secure_password_2';
CREATE USER hydra_user WITH PASSWORD 'secure_password_3';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE netbox_db TO netbox_user;
GRANT ALL PRIVILEGES ON DATABASE diode_db TO diode_user;
GRANT ALL PRIVILEGES ON DATABASE hydra_db TO hydra_user;

-- Enable required extensions
\c netbox_db
CREATE EXTENSION IF NOT EXISTS pg_trgm;

\c diode_db
CREATE EXTENSION IF NOT EXISTS pg_trgm;

\c hydra_db
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

### Database Configuration

> ⚠️ **Optimization Notice**: The following PostgreSQL settings are **suggestions only**. You must test and validate these settings in your specific environment. Optimal values depend on your hardware, scale, and usage patterns.

```conf
## postgresql.conf - SUGGESTIONS ONLY - Test before using in production
shared_buffers = 256MB
effective_cache_size = 1GB
work_mem = 4MB
maintenance_work_mem = 64MB
max_connections = 200
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
```

## Kubernetes Secret Configuration

### Multiple Database Secrets Creation

Create separate secrets for each database:

```bash
## Create secrets for each database
kubectl create secret generic external-postgres-secret-netbox \
  --from-literal=uri="postgres://netbox_user:$(printf '%s' 'complex$password' | jq -sRr @uri)@postgres.example.com:5432/netbox_db"

kubectl create secret generic external-postgres-secret-diode \
  --from-literal=uri="postgres://diode_user:$(printf '%s' 'complex$password' | jq -sRr @uri)@postgres.example.com:5432/diode_db"

kubectl create secret generic external-postgres-secret-hydra \
  --from-literal=uri="postgres://hydra_user:$(printf '%s' 'complex$password' | jq -sRr @uri)@postgres.example.com:5432/hydra_db"
```

## Password Encoding for Special Characters

For passwords containing special characters:

```bash
## For passwords with special characters, use jq for URL encoding
PASSWORD='my$pecial@password!'
ENCODED_PASSWORD=$(printf '%s' "$PASSWORD" | jq -sRr @uri)
echo "Encoded password: $ENCODED_PASSWORD"

## Use encoded password in connection string
CONNECTION_STRING="postgres://username:${ENCODED_PASSWORD}@hostname:5432/database"
```

## Alternative: Single Secret with Multiple Keys

```bash
## Create a single secret with multiple database URIs
kubectl create secret generic external-databases \
  --from-literal=netbox-uri="postgres://netbox_user:password@postgres.example.com:5432/netbox_db" \
  --from-literal=diode-uri="postgres://diode_user:password@postgres.example.com:5432/diode_db" \
  --from-literal=hydra-uri="postgres://hydra_user:password@postgres.example.com:5432/hydra_db"
```



## Helm Values Configuration

Create your external database values file using the complete template provided below:

```bash
## Copy the complete external-database-values.yaml template from below
## and save it as values-external-db.yaml, then customize as needed
vim values-external-db.yaml
```

The template contains configuration for external PostgreSQL databases while keeping the built-in Redis (recommended):

```yaml
## NetBox Enterprise - External Database Configuration
## For connecting to external PostgreSQL databases

netbox:
  # External database configuration
  externalDatabase:
    enabled: true
    type: postgresql
    host: 'your-postgres-host.example.com'
    port: 5432
    database: 'netbox'
    username: 'netbox'
    # Password should be provided via secret
    existingSecret: 'netbox-db-secret'
    existingSecretPasswordKey: 'password'

## Disable internal PostgreSQL
postgresql:
  enabled: false

## Redis configuration (internal recommended)
redis:
  enabled: true  # Always keep this true (recommended)
```



## Chaining Values Files

Helm values files are merged in order, with **later files taking precedence** over earlier ones. This allows you to combine multiple configuration layers:

```bash
## Example: Private Registry + External Database
helm install netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \        # Base (license info)
  --values values-private-registry.yaml \         # Private registry config
  --values values-external-db.yaml \              # External DB config (WINS)
  --version 1.11.5 \
  --namespace netbox-enterprise \
  --create-namespace
```

**Values File Priority** (last wins):
1. `netbox-enterprise-values.yaml` - Base configuration with license
2. `values-private-registry.yaml` - Private registry overrides
3. `values-external-db.yaml` - Database overrides (highest priority)

## Installation with External Databases

### Core NetBox Enterprise Deployment

```bash
## Install with external database (core only)
helm install netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --values values-external-db-core.yaml \
  --version 1.11.5 \
  --create-namespace \
  --namespace netbox-enterprise
```

## Full NetBox Enterprise + Discovery & Assurance

```bash
## Install with external database (full deployment)
helm install netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --values values-external-db-core.yaml \
  --values values-external-db-discovery-assurance.yaml \
  --version 1.11.5 \
  --create-namespace \
  --namespace netbox-enterprise
```

## Combined with Private Registry

```bash
## Install with both private registry AND external database
helm install netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --values values-private-registry.yaml \
  --values values-external-db-core.yaml \
  --version 1.11.5 \
  --create-namespace \
  --namespace netbox-enterprise
```

**Note**: Use the base values file (contains license) plus your external database configuration files.

## Verify Database Connectivity

```bash
## Check pod logs for database connections
kubectl logs -l app=netbox-enterprise -c netbox

## Test database connectivity from within the cluster
kubectl run -it --rm debug --image=postgres:13 --restart=Never -- \
  psql postgres://netbox_user:password@postgres.example.com:5432/netbox_db -c "SELECT version();"
```

## Cloud Provider Examples

### AWS RDS Configuration

```yaml
## values-rds.yaml
postgresql:
  enabled: false

externalDatabase:
  netbox:
    host: netbox-cluster.cluster-xyz.us-east-1.rds.amazonaws.com
    port: 5432
    database: netbox
    username: netbox_user
    existingSecret: rds-secret
    existingSecretPasswordKey: password

## Keep built-in Redis (recommended)
redis:
  enabled: true
```

## Azure Database Configuration

```yaml
## values-azure-db.yaml
postgresql:
  enabled: false

externalDatabase:
  netbox:
    host: netbox-server.postgres.database.azure.com
    port: 5432
    database: netbox
    username: netbox_user@netbox-server
    existingSecret: azure-db-secret
    existingSecretPasswordKey: password

## Keep built-in Redis (recommended)
redis:
  enabled: true
```

## Google Cloud SQL Configuration

```yaml
## values-gcp-sql.yaml
postgresql:
  enabled: false

externalDatabase:
  netbox:
    host: 127.0.0.1  # Using Cloud SQL Proxy
    port: 5432
    database: netbox
    username: netbox_user
    existingSecret: gcp-sql-secret
    existingSecretPasswordKey: password

## Cloud SQL Proxy sidecar
cloudSqlProxy:
  enabled: true
  connectionName: project-id:region:instance-name
  serviceAccountKey: gcp-sa-key

## Keep built-in Redis (recommended)
redis:
  enabled: true
```

## Backup and Recovery

When using external databases, backup responsibilities are split:

**Your Organization's Responsibility:**
- External PostgreSQL database backups using your established procedures
- Database infrastructure maintenance and disaster recovery
- Ensuring database availability and performance

**NetBox Enterprise Handles:**
- Application-level data consistency
- Redis cache data (internal Redis recommended)
- Static files and media uploads

For NetBox Enterprise application-level backup procedures, refer to the [NetBox Enterprise Backup Documentation](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-backups/).

## Next Steps

- [Configure High Availability](netbox-enterprise-helm-advanced-configuration.md) for production environments
- Set up CI/CD Pipeline for automated deployments
- [Configure Private Registry](../netbox-enterprise-helm-private-registry/) if using private container registries
- Validate your deployment to ensure everything is working correctly

## Related Documentation

- [NetBox Enterprise Helm Overview](../../netbox-enterprise-helm-overview/)
- [Prerequisites](../../netbox-enterprise-helm-prerequisites/)
- [Installation Guide](../../netbox-enterprise-helm-install/)
- [NetBox Enterprise Backup Guide](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-backups/) 
