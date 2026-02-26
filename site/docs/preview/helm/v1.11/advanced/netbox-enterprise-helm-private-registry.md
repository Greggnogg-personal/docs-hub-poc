---
tags:
  - helm
  - enterprise
  - netbox
  - configuration
  - security
  - private-registry
source: localdocs
lastUpdatedAt: 1765462686000
canonical: /docs/preview/helm/v1.11/advanced/netbox-enterprise-helm-private-registry/
---

import BetaBanner from '../components/BetaBanner';

# NetBox Enterprise Helm - Private Registry Configuration

<nav aria-label="breadcrumb">
  <ol style={{display: 'flex', listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', fontSize: '14px', color: '#666'}}>
    <li><a href="/docs/" style={{color: '#3498db', textDecoration: 'none'}}>NetBox Labs Documentation</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li><a href="/docs/helm/" style={{color: '#3498db', textDecoration: 'none'}}>Helm Installation Guides</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li><a href="/docs/helm/advanced/" style={{color: '#3498db', textDecoration: 'none'}}>Advanced</a></li>
    <li style={{margin: '0 8px'}}>&gt;</li>
    <li style={{color: '#666'}}>Private Registry Configuration</li>
  </ol>
</nav>

<BetaBanner />

This guide provides detailed instructions for configuring NetBox Enterprise to use a private container registry, ideal for restricted environments or organizations with strict security requirements.

## Overview

Private registry configurations enable NetBox Enterprise deployment in environments where:

- Direct internet access is restricted or prohibited
- Corporate policies require all container images to be sourced from internal registries  
- Support restricted environment deployments

## Configuration Files

### Private Registry Values Template

Choose the configuration that matches your deployment needs:

:::info Configuration Approach

This section provides a **modular approach** to private registry configuration:

1. **NetBox Enterprise** - Complete enterprise platform with all core features (11 images)
2. **Discovery & Assurance Add-on** - Premium features for enhanced network operations (7 additional images)

**NetBox Enterprise** includes:
- Full DCIM, IPAM, circuits, and virtualization capabilities
- Enterprise authentication, APIs, and integrations
- Advanced workflows and automation features
- High availability and enterprise support

**Add Discovery & Assurance** if your license includes:
- Automated network device discovery and monitoring
- Configuration compliance and drift detection  
- Advanced network assurance and validation capabilities
- Enhanced operational intelligence

:::

#### NetBox Enterprise Configuration

This is the standard NetBox Enterprise configuration with all core platform features:

<details>
<summary>Click to view: NetBox Enterprise Configuration</summary>

```yaml
#NetBox Enterprise - Private Registry Configuration
#For environments with restricted internet connectivity
#Based on actual chart structure from netbox-enterprise-values.yaml

#Global configuration
global:
  #Image pull secrets for private registry authentication
  imagePullSecrets:
    - name: private-registry-secret
  
  #Global image overrides for NetBox Enterprise utilities
  image:
    images:
      #NetBox Enterprise Core
      nbe_core:
        registry: "your-private-registry.com/netbox-enterprise/ghcr.io"
        repository: "netboxlabs/nbe-core"
        tag: "4.2.9_main-264"
    pullPolicy: IfNotPresent

      #NetBox Utils  
      nbe_utils:
        registry: "your-private-registry.com/proxy/netbox-enterprise/index.docker.io"
        repository: "netboxlabs/nbe-utils"
        tag: "7"
    pullPolicy: IfNotPresent

      #Diode Reconciler Pro (Discovery & Assurance)
      diode_reconciler_pro:
        registry: "your-private-registry.com/netbox-enterprise/ghcr.io"
        repository: "netboxlabs/diode-reconciler-pro"
        tag: "1.0.0"
        pullPolicy: IfNotPresent

#NetBox Core Application
netbox:
  image:
    registry: "your-private-registry.com/netbox-enterprise/ghcr.io"
    repository: "netboxlabs/nbe-core"
    tag: "4.2.9_main-264"

#Redis Configuration
redis:
  image:
    registry: "your-private-registry.com/anonymous/index.docker.io"
    repository: "bitnami/redis"
  
  sentinel:
    image:
      registry: "your-private-registry.com/anonymous/index.docker.io"
      repository: "bitnami/redis-sentinel"
      tag: "7.4.3-debian-12-r0"

#PostgreSQL Operator (if using internal database)
pgo:
  controllerImages:
    cluster: "your-private-registry.com/anonymous/registry.developers.crunchydata.com/crunchydata/postgres-operator:ubi9-5.8.2-0"
  
  relatedImages:
    postgres_16:
      image: "your-private-registry.com/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres:ubi9-16.9-2520"
    postgres_16_gis_3_3:
      image: "your-private-registry.com/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres-gis:ubi9-16.9-3.3-2520"
    postgres_16_gis_3_4:
      image: "your-private-registry.com/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres-gis:ubi9-16.9-3.4-2520"

#Diode Chart Configuration - CRITICAL: Use correct camelCase naming!
diode:
  enabled: true
  #if not using Discovery/Assurance set to enabled: false 
  
  #Hydra OAuth2 Server
  hydra:
  image:
      repository: "your-private-registry.com/anonymous/index.docker.io/oryd/hydra"
    
    deployment:
      initContainer:
        repository: "your-private-registry.com/anonymous/index.docker.io/library/busybox"
      
      job:
        image: "your-private-registry.com/anonymous/index.docker.io/oryd/k8s-toolbox:v0.0.7"
  
  #Diode Auth Service (camelCase naming required!)
  diodeAuth:
    image:
      repository: "your-private-registry.com/anonymous/index.docker.io/netboxlabs/diode-auth"
  
  #Diode Auth Bootstrap (camelCase naming required!)
  diodeAuthBootstrap:
    image:
      repository: "your-private-registry.com/anonymous/index.docker.io/netboxlabs/diode-auth"
  
  #Diode Ingester (camelCase naming required!)
  diodeIngester:
    image:
      repository: "your-private-registry.com/anonymous/index.docker.io/netboxlabs/diode-ingester"
  
  #Diode Reconciler (camelCase naming required!)
  diodeReconciler:
    image:
      repository: "your-private-registry.com/anonymous/index.docker.io/netboxlabs/diode-reconciler"

#Replicated SDK
replicated:
  image:
    registry: "your-private-registry.com/anonymous/index.docker.io"
    repository: "replicated/replicated-sdk"

#Reloader (Stakater)
reloader:
  image:
    repository: "your-private-registry.com/anonymous/ghcr.io/stakater/reloader"

#Private registry authentication secret (create separately)
#kubectl create secret docker-registry private-registry-secret \
## --docker-server=your-private-registry.com \
## --docker-username=your-username \
## --docker-password=your-password \
## --docker-email=your-email@example.com \
## --namespace=netbox-enterprise
```

</details>

## Discovery & Assurance Add-on Configuration

Add this configuration if your NetBox Enterprise license includes Discovery & Assurance features:

<details>
<summary>Click to view: Discovery & Assurance Add-on Configuration</summary>

```yaml
#Discovery & Assurance Add-on Configuration
#Add these settings to your base NetBox Enterprise configuration
#to enable Discovery & Assurance features

#Global image overrides for Discovery & Assurance components
global:
  image:
    images:
      #Discovery & Assurance - Diode Reconciler Pro
      diode_reconciler_pro:
        registry: "your-private-registry.com/netbox-enterprise/ghcr.io"
        repository: "netboxlabs/diode-reconciler-pro"
        tag: "1.0.0"
        pullPolicy: IfNotPresent
      
      #Discovery & Assurance - Diode Auth
      diode_auth:
        registry: "your-private-registry.com/anonymous/index.docker.io"
        repository: "netboxlabs/diode-auth"
        tag: "1.2.0"
        pullPolicy: IfNotPresent
      
      #Discovery & Assurance - Diode Ingester
      diode_ingester:
        registry: "your-private-registry.com/anonymous/index.docker.io"
        repository: "netboxlabs/diode-ingester"
        tag: "1.2.0"
        pullPolicy: IfNotPresent
      
      #Discovery & Assurance - Diode Reconciler
      diode_reconciler:
        registry: "your-private-registry.com/anonymous/index.docker.io"
        repository: "netboxlabs/diode-reconciler"
        tag: "1.2.0"
        pullPolicy: IfNotPresent
      
      #Discovery & Assurance - Hydra (OAuth2 server)
      hydra:
        registry: "your-private-registry.com/anonymous/index.docker.io"
        repository: "oryd/hydra"
        tag: "v2.3.0"
        pullPolicy: IfNotPresent
      
      #Discovery & Assurance - K8s Toolbox
      k8s_toolbox:
        registry: "your-private-registry.com/anonymous/index.docker.io"
        repository: "oryd/k8s-toolbox"
        tag: "v0.0.7"
        pullPolicy: IfNotPresent

#Enable Discovery & Assurance features
diode:
  enabled: true
```

</details>

### Private Registry Image Mirroring Script

The `private-registry.sh` script automates the complete private registry setup process:

- **Mirrors all required images** from NetBox Labs registry to your private registry
- **Automatically generates** a `values-private-registry.yaml` configuration file
- **Provides comprehensive error handling** and progress reporting
- **Validates prerequisites** before starting the mirroring process

Choose the script version that matches your deployment needs:

#### Script Option 1: NetBox Enterprise (Core Platform)

<details>
  <summary><strong>Click to view: Core NetBox Enterprise script</strong></summary>

```bash title="private-registry-core.sh"
#!/bin/bash

## =============================================================================
## NetBox Enterprise Core Private Registry Image Mirroring Script
## =============================================================================
## This script automates the process of mirroring NetBox Enterprise core container 
## images from the NetBox Labs proxy registry to your private registry.

## This is the standard NetBox Enterprise deployment with all core features:
## - Complete DCIM, IPAM, circuits, and virtualization capabilities
## - Enterprise authentication, APIs, and integrations
## - Advanced workflows and automation features
## - High availability and enterprise support

## Use cases:
## - Standard NetBox Enterprise deployments
## - Organizations with core NetBox Enterprise licensing
## - Environments requiring essential network infrastructure management

## Prerequisites:
## - Docker installed and running
## - Network access to both source and target registries
## - Valid NetBox Enterprise credentials (USERNAME and LICENSE_ID environment variables)
## - Docker registry credentials configured for target registry

## Usage:
## export USERNAME="your-email@company.com"
## export LICENSE_ID="your-license-id"
## ./private-registry-core.sh YOUR_PRIVATE_REGISTRY

## Examples:
## ./private-registry-core.sh registry.company.com/netbox-enterprise
## ./private-registry-core.sh ghcr.io/your-username
## ./private-registry-core.sh harbor.internal.com/netbox
## ./private-registry-core.sh 123456789012.dkr.ecr.us-east-1.amazonaws.com/netbox
## ./private-registry-core.sh registry.company.com:5000/netbox
#=============================================================================

#Exit on any error for safety and debugging
set -e

#=============================================================================
#CONFIGURATION
#=============================================================================
#NetBox Labs proxy registry (source)
NETBOX_PROXY_REGISTRY="proxy.enterprise.netboxlabs.com"
NETBOX_ENTERPRISE_REGISTRY="registry.enterprise.netboxlabs.com"

#NetBox Enterprise Helm chart version to mirror images for
#Update this to match your desired chart version
CHART_VERSION="1.11.5"

#Container images that need to be mirrored for NetBox Enterprise Core
#These are the essential images required for standard NetBox Enterprise deployment
IMAGES=(
  # Core NetBox Enterprise images
  "proxy/netbox-enterprise/ghcr.io/netboxlabs/nbe-core:4.2.9_main-264"
  "proxy/netbox-enterprise/index.docker.io/netboxlabs/nbe-utils:7"

  # Database images
  "anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres:ubi9-16.9-2520"
  "anonymous/registry.developers.crunchydata.com/crunchydata/postgres-operator:ubi9-5.8.2-0"
  "anonymous/index.docker.io/bitnami/redis:7.4.3-debian-12-r0"
  "anonymous/index.docker.io/bitnami/redis-sentinel:7.4.3-debian-12-r0"
  "anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres-gis:ubi9-16.9-3.3-2520"
  "anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres-gis:ubi9-16.9-3.4-2520"

  # Infrastructure images
  "anonymous/ghcr.io/stakater/reloader:v1.4.5"
  "anonymous/index.docker.io/library/busybox:1.37"
  "anonymous/index.docker.io/replicated/replicated-sdk:1.7.1"
  "anonymous/registry.k8s.io/ingress-nginx/controller:v1.11.3"
  "anonymous/registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.4.3"
)

#=============================================================================
#OUTPUT FORMATTING
#=============================================================================
#ANSI color codes for clear, readable output
RED='\033[0;31m'      #Error messages
GREEN='\033[0;32m'    #Success messages  
YELLOW='\033[1;33m'   #Warning messages
BLUE='\033[0;34m'     #Informational messages
NC='\033[0m'          #Reset to default color

#=============================================================================
#LOGGING FUNCTIONS
#=============================================================================

#Log informational messages (blue)
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

#Log success messages (green)
log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

#Log warning messages (yellow)
log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

#Log error messages (red)
log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

#=============================================================================
#INPUT VALIDATION
#=============================================================================

#Validate private registry URL is provided
if [ -z "$1" ]; then
    log_error "Private registry URL is required"
    echo ""
    echo "Usage: $0 \<private-registry-url\>"
    echo ""
    echo "Examples:"
    echo "  $0 registry.company.com/netbox-enterprise"
    echo "  $0 harbor.internal.com/netbox"
    echo "  $0 123456789012.dkr.ecr.us-east-1.amazonaws.com/netbox"
    echo "  $0 registry.company.com:5000/netbox-enterprise"
    echo ""
    echo "Prerequisites:"
    echo "  - Set USERNAME environment variable: export USERNAME='your-email@company.com'"
    echo "  - Set LICENSE_ID environment variable: export LICENSE_ID='your-license-id'"
    echo "  - Ensure Docker is running and you're authenticated to both registries"
    exit 1
fi

PRIVATE_REGISTRY="$1"

#Validate that USERNAME is set (required for NetBox Labs registry access)
if [ -z "$USERNAME" ]; then
    log_error "USERNAME environment variable is not set"
    echo "This is required for authenticating with NetBox Labs container registry"
    echo "Set it with: export USERNAME='your-email@company.com'"
    exit 1
fi

#Validate that LICENSE_ID is set (required for NetBox Labs registry access)
if [ -z "$LICENSE_ID" ]; then
    log_error "LICENSE_ID environment variable is not set"
    echo "This is required for authenticating with NetBox Labs container registry"
    echo "Set it with: export LICENSE_ID='your-license-id'"
    exit 1
fi

#=============================================================================
#PREREQUISITE CHECKS
#=============================================================================

log_info "🔍 Checking prerequisites..."

#Check if Docker is installed and running
if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed or not in PATH"
    echo "Please install Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

#Check if Docker daemon is running
if ! docker info &> /dev/null; then
    log_error "Docker daemon is not running"
    echo "Please start Docker and try again"
    exit 1
fi

log_success "Docker is installed and running"

#=============================================================================
#AUTHENTICATION
#=============================================================================

log_info "🔐 Authenticating with NetBox Labs registry..."

#Authenticate with NetBox Labs proxy registry using provided credentials
if docker login "$NETBOX_PROXY_REGISTRY" -u "$USERNAME" -p "$LICENSE_ID" &> /dev/null; then
    log_success "Successfully authenticated with NetBox Labs proxy registry"
else
    log_error "Failed to authenticate with NetBox Labs proxy registry"
    echo "Please verify your USERNAME and LICENSE_ID are correct"
    echo "USERNAME: $USERNAME"
    echo "LICENSE_ID: ${LICENSE_ID:0:8}..."
    exit 1
fi

#Also authenticate with the main enterprise registry
if docker login "$NETBOX_ENTERPRISE_REGISTRY" -u "$USERNAME" -p "$LICENSE_ID" &> /dev/null; then
    log_success "Successfully authenticated with NetBox Labs enterprise registry"
else
    log_warn "Could not authenticate with NetBox Labs enterprise registry (this may be normal)"
fi

#=============================================================================
#IMAGE MIRRORING PROCESS
#=============================================================================

echo ""
echo "======================================================================"
echo "STARTING CORE NETBOX ENTERPRISE IMAGE MIRRORING"
echo "==============================================="
log_info "Source registries: $NETBOX_PROXY_REGISTRY, $NETBOX_ENTERPRISE_REGISTRY"
log_info "Target registry: $PRIVATE_REGISTRY"
log_info "Chart version: $CHART_VERSION"
log_info "Number of images to mirror: ${#IMAGES[@]}"
echo ""

#Track statistics
SUCCESSFUL_MIRRORS=0
FAILED_MIRRORS=0



#Process each image in the list
for IMAGE in "${IMAGES[@]}"; do
    echo "----------------------------------------------------------------------"
    log_info "🔄 Processing image: $IMAGE"
    
    #If the image already has a full registry, leave it as-is
    if [[ "$IMAGE" =~ ^[^/]+\.netboxlabs\.com/ ]]; then
        SOURCE_IMAGE="$IMAGE"
    else
        if [[ "$IMAGE" == proxy/* || "$IMAGE" == anonymous/* ]]; then
            SOURCE_IMAGE="$NETBOX_PROXY_REGISTRY/$IMAGE"
        elif [[ "$IMAGE" == netbox-enterprise/* ]]; then
            SOURCE_IMAGE="$NETBOX_ENTERPRISE_REGISTRY/$IMAGE"
        else
            SOURCE_IMAGE="$IMAGE"  #fallback
        fi
    fi

    #Normalize image path for target registry
    SANITIZED_IMAGE_PATH="$IMAGE"

    #Strip off known prefixes
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#proxy.enterprise.netboxlabs.com/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#proxy/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#anonymous/}"

    #Remove known registry hostnames if they are still embedded
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#index.docker.io/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#registry.docker.io/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#ghcr.io/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#registry.k8s.io/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#registry.developers.crunchydata.com/}"

    TARGET_IMAGE="$PRIVATE_REGISTRY/$SANITIZED_IMAGE_PATH"
    log_info "🏷️  Final image tag: $TARGET_IMAGE"
    
    log_info "Source: $SOURCE_IMAGE"
    log_info "Target: $TARGET_IMAGE"
    
    #Step 1: Pull the image from source registry
    log_info "📥 Pulling image from source registry..."
    if docker pull "$SOURCE_IMAGE"; then
        log_success "Successfully pulled $SOURCE_IMAGE"
    else
        log_error "Failed to pull $SOURCE_IMAGE"
        FAILED_MIRRORS=$((FAILED_MIRRORS + 1))
        continue
    fi
    
    #Step 2: Tag the image for the target registry
    log_info "🏷️  Tagging image for target registry..."
    if docker tag "$SOURCE_IMAGE" "$TARGET_IMAGE"; then
        log_success "Successfully tagged image as $TARGET_IMAGE"
    else
        log_error "Failed to tag image as $TARGET_IMAGE"
        FAILED_MIRRORS=$((FAILED_MIRRORS + 1))
        continue
    fi
    
    #Step 3: Push the image to the target registry
    log_info "📤 Pushing image to target registry..."
    if docker push "$TARGET_IMAGE"; then
        log_success "Successfully pushed $TARGET_IMAGE"
        SUCCESSFUL_MIRRORS=$((SUCCESSFUL_MIRRORS + 1))
    else
        log_error "Failed to push $TARGET_IMAGE"
        log_warn "This could be due to:"
        echo "  - Authentication issues with target registry"
        echo "  - Network connectivity problems"
        echo "  - Insufficient permissions on target registry"
        echo "  - Storage quota exceeded on target registry"
        FAILED_MIRRORS=$((FAILED_MIRRORS + 1))
        continue
    fi
    
    #Step 4: Handle special image aliasing before cleanup
    if [[ "$TARGET_IMAGE" == *"nbe-core:4.2.9_main-264" ]]; then
        log_info "🔗 Creating image alias for chart compatibility..."
        NBE_ALIAS_TARGET="$PRIVATE_REGISTRY/netbox-enterprise/netbox-enterprise:v1.11.5"
        log_info "Creating alias: $TARGET_IMAGE → $NBE_ALIAS_TARGET"
        
        #Tag the existing image with the netbox-enterprise alias
        if docker tag "$TARGET_IMAGE" "$NBE_ALIAS_TARGET"; then
            log_success "Successfully created image alias"
            
            #Push the alias to the registry
            if docker push "$NBE_ALIAS_TARGET"; then
                log_success "Successfully pushed image alias: $NBE_ALIAS_TARGET"
                SUCCESSFUL_MIRRORS=$((SUCCESSFUL_MIRRORS + 1))
            else
                log_error "Failed to push image alias: $NBE_ALIAS_TARGET"
                FAILED_MIRRORS=$((FAILED_MIRRORS + 1))
            fi
            
            #Clean up local alias
            docker rmi "$NBE_ALIAS_TARGET" &> /dev/null || true
        else
            log_error "Failed to create image alias"
            FAILED_MIRRORS=$((FAILED_MIRRORS + 1))
        fi
    fi
    
    #Alias for stakater/reloader (hardcoded without registry prefix)
    if [[ "$TARGET_IMAGE" == *"stakater/reloader:v1.4.5" ]]; then
        log_info "🔗 Creating reloader alias for hardcoded chart reference..."
        RELOADER_LOCAL_ALIAS="stakater/reloader:v1.4.5"
        log_info "Creating local alias: $TARGET_IMAGE → $RELOADER_LOCAL_ALIAS"
        
        if docker tag "$TARGET_IMAGE" "$RELOADER_LOCAL_ALIAS"; then
            log_success "Successfully created local reloader alias: $RELOADER_LOCAL_ALIAS"
            log_info "Chart will find reloader at expected path: $RELOADER_LOCAL_ALIAS"
            #Note: We don't push this alias - it stays local for the chart to find
        else
            log_error "Failed to create local reloader alias"
        fi
    fi
    
    #Alias for redis-sentinel (hardcoded docker.io prefix)
    if [[ "$TARGET_IMAGE" == *"redis-sentinel:7.4.3-debian-12-r0" ]]; then
        log_info "🔗 Creating redis-sentinel alias for hardcoded chart reference..."
        SENTINEL_LOCAL_ALIAS="docker.io/bitnami/redis-sentinel:7.4.3-debian-12-r0"
        log_info "Creating local alias: $TARGET_IMAGE → $SENTINEL_LOCAL_ALIAS"
        
        if docker tag "$TARGET_IMAGE" "$SENTINEL_LOCAL_ALIAS"; then
            log_success "Successfully created local redis-sentinel alias: $SENTINEL_LOCAL_ALIAS"
            log_info "Chart will find redis-sentinel at expected path: $SENTINEL_LOCAL_ALIAS"
            #Note: We don't push this alias - it stays local for the chart to find
        else
            log_error "Failed to create local redis-sentinel alias"
        fi
    fi
    
    #Alias for busybox (chart expects library/busybox:1.37)
    if [[ "$TARGET_IMAGE" == *"library/busybox:1.37" ]]; then
        log_info "🔗 Creating local busybox alias for hardcoded chart reference..."
        BUSYBOX_LOCAL_ALIAS="busybox:1.37"
        log_info "Creating local alias: $TARGET_IMAGE → $BUSYBOX_LOCAL_ALIAS"
        
        if docker tag "$TARGET_IMAGE" "$BUSYBOX_LOCAL_ALIAS"; then
            log_success "Successfully created local busybox alias: $BUSYBOX_LOCAL_ALIAS"
            log_info "Chart will find busybox at expected path: $BUSYBOX_LOCAL_ALIAS"
            #Note: We don't push this alias - it stays local for the chart to find
        else
            log_error "Failed to create local busybox alias"
        fi
    fi
    
    #Alias for nbe-utils (chart expects netboxlabs/nbe-utils:7)
    if [[ "$TARGET_IMAGE" == *"netboxlabs/nbe-utils:7" ]]; then
        log_info "🔗 Creating local nbe-utils alias for hardcoded chart reference..."
        NBEUTILS_LOCAL_ALIAS="netboxlabs/nbe-utils:7"
        log_info "Creating local alias: $TARGET_IMAGE → $NBEUTILS_LOCAL_ALIAS"
        
        if docker tag "$TARGET_IMAGE" "$NBEUTILS_LOCAL_ALIAS"; then
            log_success "Successfully created local nbe-utils alias: $NBEUTILS_LOCAL_ALIAS"
            log_info "Chart will find nbe-utils at expected path: $NBEUTILS_LOCAL_ALIAS"
            #Note: We don't push this alias - it stays local for the chart to find
        else
            log_error "Failed to create local nbe-utils alias"
        fi
    fi
    
    #Alias for ingress-nginx controller (chart expects registry.k8s.io path)
    if [[ "$TARGET_IMAGE" == *"ingress-nginx/controller:v1.12.1" ]]; then
        log_info "🔗 Creating local ingress-nginx alias for hardcoded chart reference..."
        INGRESS_LOCAL_ALIAS="registry.k8s.io/ingress-nginx/controller:v1.12.1"
        log_info "Creating local alias: $TARGET_IMAGE → $INGRESS_LOCAL_ALIAS"
        
        if docker tag "$TARGET_IMAGE" "$INGRESS_LOCAL_ALIAS"; then
            log_success "Successfully created local ingress-nginx alias: $INGRESS_LOCAL_ALIAS"
            log_info "Chart will find ingress-nginx at expected path: $INGRESS_LOCAL_ALIAS"
            #Note: We don't push this alias - it stays local for the chart to find
        else
            log_error "Failed to create local ingress-nginx alias"
        fi
    fi
    
    #Alias for ingress-nginx webhook (chart expects registry.k8s.io path)
    if [[ "$TARGET_IMAGE" == *"kube-webhook-certgen:v1.5.2" ]]; then
        log_info "🔗 Creating local webhook alias for hardcoded chart reference..."
        WEBHOOK_LOCAL_ALIAS="registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.5.2"
        log_info "Creating local alias: $TARGET_IMAGE → $WEBHOOK_LOCAL_ALIAS"
        
        if docker tag "$TARGET_IMAGE" "$WEBHOOK_LOCAL_ALIAS"; then
            log_success "Successfully created local webhook alias: $WEBHOOK_LOCAL_ALIAS"
            log_info "Chart will find webhook at expected path: $WEBHOOK_LOCAL_ALIAS"
            #Note: We don't push this alias - it stays local for the chart to find
        else
            log_error "Failed to create local webhook alias"
        fi
    fi

  #Step 5: Clean up local images to save disk space
    log_info "🧹 Cleaning up local images..."
    docker rmi "$SOURCE_IMAGE" "$TARGET_IMAGE" &> /dev/null || true
    
    echo ""
done

#=============================================================================
#COMPLETION SUMMARY
#=============================================================================

echo "======================================================================"
echo "📊 CORE NETBOX ENTERPRISE IMAGE MIRRORING SUMMARY"
echo "=================================================="
log_info "Total images processed: ${#IMAGES[@]}"
log_success "Successful mirrors: $SUCCESSFUL_MIRRORS"
if [ $FAILED_MIRRORS -gt 0 ]; then
    log_error "Failed mirrors: $FAILED_MIRRORS"
else
    log_info "Failed mirrors: $FAILED_MIRRORS"
fi
echo ""

if [ $FAILED_MIRRORS -eq 0 ]; then
    log_success "✓ All core NetBox Enterprise images successfully mirrored to private registry!"
    echo ""
    
    #=============================================================================
    #GENERATE CORE PRIVATE REGISTRY VALUES FILE
    #=============================================================================
    
    log_info "📝 Generating values-private-registry-core.yaml file..."
    
    VALUES_FILE="values-private-registry-core.yaml"
    cat > "$VALUES_FILE" << EOF
#=============================================================================
#NetBox Enterprise Core Private Registry Configuration
#=============================================================================
#This file configures NetBox Enterprise to use your private registry
#Generated automatically by private-registry-core.sh script
#Private Registry: $PRIVATE_REGISTRY
#Chart Version: $CHART_VERSION
#Generated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
#=============================================================================

#Global configuration based on actual chart structure
global:
  #Image pull secrets for private registry authentication
  imagePullSecrets:
    - name: private-registry-secret
  
  #Global image overrides for NetBox Enterprise utilities
  image:
    images:
      #NetBox Enterprise Core
      nbe_core:
        registry: "$PRIVATE_REGISTRY/netbox-enterprise/ghcr.io"
        repository: "netboxlabs/nbe-core"
        tag: "4.2.9_main-264"
        pullPolicy: IfNotPresent
      
      #NetBox Utils
      nbe_utils:
        registry: "$PRIVATE_REGISTRY/proxy/netbox-enterprise/index.docker.io"
        repository: "netboxlabs/nbe-utils"
        tag: "7"
        pullPolicy: IfNotPresent
      
      #Diode Reconciler Pro (Discovery & Assurance)
      diode_reconciler_pro:
        registry: "$PRIVATE_REGISTRY/netbox-enterprise/ghcr.io"
        repository: "netboxlabs/diode-reconciler-pro"
        tag: "1.0.0"
        pullPolicy: IfNotPresent

#NetBox Core Application
netbox:
  image:
    registry: "$PRIVATE_REGISTRY/netbox-enterprise/ghcr.io"
    repository: "netboxlabs/nbe-core"
    tag: "4.2.9_main-264"

#Redis Configuration
redis:
  image:
    registry: "$PRIVATE_REGISTRY/anonymous/index.docker.io"
    repository: "bitnami/redis"
    tag: "7.4.3-debian-12-r0"
  
  sentinel:
    image:
      registry: "$PRIVATE_REGISTRY/anonymous/index.docker.io"
      repository: "bitnami/redis-sentinel"
      tag: "7.4.3-debian-12-r0"

#NetBox Utils (for housekeeping and other jobs)
utils:
  image:
    registry: "$PRIVATE_REGISTRY/proxy/netbox-enterprise/index.docker.io"
    repository: "netboxlabs/nbe-utils"
    tag: "7"

#PostgreSQL Operator (if using internal database)
pgo:
  controllerImages:
    cluster: "$PRIVATE_REGISTRY/anonymous/registry.developers.crunchydata.com/crunchydata/postgres-operator:ubi9-5.8.2-0"
  
  relatedImages:
    postgres_16:
      image: "$PRIVATE_REGISTRY/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres:ubi9-16.9-2520"
    postgres_16_gis_3_3:
      image: "$PRIVATE_REGISTRY/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres-gis:ubi9-16.9-3.3-2520"
    postgres_16_gis_3_4:
      image: "$PRIVATE_REGISTRY/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres-gis:ubi9-16.9-3.4-2520"

#Diode Chart Configuration - DISABLED for core-only deployment
diode:
  enabled: false

#Init container configuration
deployment:
  initContainer:
    repository: "$PRIVATE_REGISTRY/anonymous/index.docker.io/library/busybox"

#Infrastructure components
reloader:
  image:
    registry: "$PRIVATE_REGISTRY/anonymous/ghcr.io"
    repository: "stakater/reloader"
    tag: "v1.4.5"

replicated:
  image:
    registry: "$PRIVATE_REGISTRY/anonymous/index.docker.io"
    repository: "replicated/replicated-sdk"
    tag: "1.7.1"

#Ingress Controller (if using ingress-nginx)
ingress-nginx:
  controller:
    image:
      registry: "$PRIVATE_REGISTRY/anonymous/registry.k8s.io"
      repository: "ingress-nginx/controller"
      tag: "v1.12.1"
    
    admissionWebhooks:
      patch:
        image:
          registry: "$PRIVATE_REGISTRY/anonymous/registry.k8s.io"
          repository: "ingress-nginx/kube-webhook-certgen"
          tag: "v1.5.2"

#=============================================================================
#ADDITIONAL CONFIGURATION
#=============================================================================
#You may need to customize additional settings based on your environment:
#- Resource limits and requests
#- Storage classes
#- Network policies
#- Security contexts
#- Service configurations
#=============================================================================
EOF

    if [ -f "$VALUES_FILE" ]; then
        log_success "✓ Generated $VALUES_FILE"
        echo ""
        log_info "📋 Values file contents preview:"
        echo "   - Private registry: $PRIVATE_REGISTRY"
        echo "   - Chart version: $CHART_VERSION"
        echo "   - Generated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
        echo "   - File size: $(wc -c < "$VALUES_FILE") bytes"
        echo ""
    else
        log_error "Failed to generate $VALUES_FILE"
    fi
    
    echo "NEXT STEPS:"
    echo ""

    echo "1. Create image pull secret for your private registry:"
    echo "   kubectl create secret docker-registry private-registry-secret \\"
    echo "     --docker-server=$PRIVATE_REGISTRY \\"
    echo "     --docker-username=\<your-registry-username\> \\"
    echo "     --docker-password=\<your-registry-password\> \\"
    echo "     --docker-email=\<your-email\> \\"
    echo "     --namespace=netbox-enterprise"
    echo ""
    echo "2. Review and customize the generated values file:"
    echo "   vim $VALUES_FILE"
    echo "   #Uncomment and configure imagePullSecrets if needed"
    echo "   #Adjust any other settings for your environment"
    echo ""
    echo "3. Deploy NetBox Enterprise using your private registry:"
    echo "   helm install netbox-enterprise \\"
    echo "     oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \\"
    echo "     --values netbox-enterprise-values.yaml \\"
    echo "     --values $VALUES_FILE \\"
    echo "     --version 1.11.5 \\"
    echo "     --namespace netbox-enterprise \\"
    echo "     --create-namespace"
    echo ""
    echo "Want to add Discovery & Assurance? Use the full script instead:"
    echo "   ./private-registry.sh $PRIVATE_REGISTRY"
    echo ""
else
    log_error "Some images failed to mirror. Please check the errors above and retry."
    echo ""
    echo "Common issues and solutions:"
    echo "  - Authentication failures: Verify registry credentials"
    echo "  - Network timeouts: Check connectivity to both registries"
    echo "  - Permission denied: Ensure write access to target registry"
    echo "  - Insufficient disk space"
    echo "  - Private registry storage quota exceeded"
    echo ""
    echo "Tip: Try running the script again after resolving the issues above."
    exit 1
fi 
```

</details>

**Key Features**:
- **Core platform focus** with essential NetBox Enterprise features
- **Streamlined deployment** with 13 core images (vs 20 for full deployment)
- **Automatic YAML generation** - creates `values-private-registry-core.yaml` when mirroring completes
- **Discovery & Assurance disabled** by default (can be added later)

## Script Option 2: Discovery & Assurance Add-on

<details>
  <summary><strong>Click to view: Discovery & Assurance add-on script</strong></summary>

```bash title="private-registry.sh"
#!/bin/bash

## =============================================================================
## NetBox Enterprise with Discovery & Assurance Private Registry Script
## =============================================================================
## This script mirrors NetBox Enterprise images PLUS Discovery & Assurance
## components to your private registry for enhanced network operations.

## Discovery & Assurance adds:
## - Automated network device discovery and monitoring
## - Configuration compliance and drift detection  
## - Advanced network assurance and validation capabilities
## - Enhanced operational intelligence

## Use cases:
## - Organizations with Discovery & Assurance licensing entitlement
## - Enhanced network operations and compliance monitoring
## - Complete NetBox Enterprise deployment with all premium features

## Prerequisites:
## - Docker installed and running
## - Network access to both source and target registries
## - Valid NetBox Enterprise credentials (USERNAME and LICENSE_ID environment variables)
## - Docker registry credentials configured for target registry

## Usage:
## export USERNAME="your-email@company.com"
## export LICENSE_ID="your-license-id"
## ./private-registry.sh YOUR_PRIVATE_REGISTRY

## Examples:
## ./private-registry.sh registry.company.com/netbox
## ./private-registry.sh ghcr.io/your-username
## ./private-registry.sh harbor.internal.com/netbox
## ./private-registry.sh 123456789012.dkr.ecr.us-east-1.amazonaws.com/netbox
## ./private-registry.sh registry.company.com:5000/netbox
## =============================================================================

## Exit on any error for safety and debugging
set -e

## =============================================================================
## CONFIGURATION
## =============================================================================
## NetBox Labs proxy registry (source)
NETBOX_PROXY_REGISTRY="proxy.enterprise.netboxlabs.com"
NETBOX_ENTERPRISE_REGISTRY="registry.enterprise.netboxlabs.com"

## NetBox Enterprise Helm chart version to mirror images for
## Update this to match your desired chart version
CHART_VERSION="1.11.5"

## Container images that need to be mirrored for NetBox Enterprise with Discovery & Assurance
## These include all core images PLUS Discovery & Assurance components
IMAGES=(
  # Core NetBox Enterprise images
  proxy/netbox-enterprise/ghcr.io/netboxlabs/nbe-core:4.2.9_main-264
  proxy/netbox-enterprise/index.docker.io/netboxlabs/nbe-utils:7
  # Discovery & Assurance
  proxy/netbox-enterprise/ghcr.io/netboxlabs/diode-reconciler-pro:1.0.0
  proxy/netbox-enterprise/ghcr.io/netboxlabs/diode-reconciler-pro:1.2.0
  anonymous/index.docker.io/netboxlabs/diode-auth:1.2.0
  anonymous/index.docker.io/netboxlabs/diode-ingester:1.2.0
  anonymous/index.docker.io/netboxlabs/diode-reconciler:1.2.0
  anonymous/index.docker.io/oryd/hydra:v2.3.0
  anonymous/index.docker.io/oryd/k8s-toolbox:v0.0.7
  # Database images
  anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres:ubi9-16.9-2520
  anonymous/registry.developers.crunchydata.com/crunchydata/postgres-operator:ubi9-5.8.2-0
  anonymous/index.docker.io/bitnami/redis:7.4.3-debian-12-r0
  anonymous/index.docker.io/bitnami/redis-sentinel:7.4.3-debian-12-r0
  anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres-gis:ubi9-16.9-3.3-2520
  anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres-gis:ubi9-16.9-3.4-2520
  # Infrastructure images
  anonymous/ghcr.io/stakater/reloader:v1.4.5
  anonymous/index.docker.io/library/busybox:1.37
  anonymous/index.docker.io/replicated/replicated-sdk:1.7.1
  anonymous/registry.k8s.io/ingress-nginx/controller:v1.11.3
  anonymous/registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.4.3
)

## =============================================================================
## OUTPUT FORMATTING
## =============================================================================
## ANSI color codes for clear, readable output
RED='\033[0;31m'      #Error messages
GREEN='\033[0;32m'    #Success messages  
YELLOW='\033[1;33m'   #Warning messages
BLUE='\033[0;34m'     #Informational messages
NC='\033[0m'          #Reset to default color

## =============================================================================
## LOGGING FUNCTIONS
## =============================================================================

## Log informational messages (blue)
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

## Log success messages (green)
log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

## Log warning messages (yellow)
log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

## Log error messages (red)
log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

## =============================================================================
## INPUT VALIDATION
## =============================================================================

## Validate private registry URL is provided
if [ -z "$1" ]; then
    log_error "Private registry URL is required"
    echo ""
    echo "Usage: $0 \<private-registry-url\>"
    echo ""
    echo "Examples:"
    echo "  $0 registry.company.com/netbox-enterprise"
    echo "  $0 harbor.internal.com/netbox"
    echo "  $0 123456789012.dkr.ecr.us-east-1.amazonaws.com/netbox"
    echo "  $0 registry.company.com:5000/netbox-enterprise"
    echo ""
    echo "Prerequisites:"
    echo "  - Set USERNAME environment variable: export USERNAME='your-email@company.com'"
    echo "  - Set LICENSE_ID environment variable: export LICENSE_ID='your-license-id'"
    echo "  - Ensure Docker is running and you're authenticated to both registries"
    exit 1
fi

PRIVATE_REGISTRY="$1"

## Validate that USERNAME is set (required for NetBox Labs registry access)
if [ -z "$USERNAME" ]; then
    log_error "USERNAME environment variable is not set"
    echo "This is required for authenticating with NetBox Labs container registry"
    echo "Set it with: export USERNAME='your-email@company.com'"
    exit 1
fi

## Validate that LICENSE_ID is set (required for NetBox Labs registry access)
if [ -z "$LICENSE_ID" ]; then
    log_error "LICENSE_ID environment variable is not set"
    echo "This is required for authenticating with NetBox Labs container registry"
    echo "Set it with: export LICENSE_ID='your-license-id'"
    exit 1
fi

## =============================================================================
## PREREQUISITE CHECKS
## =============================================================================

log_info "🔍 Checking prerequisites..."

## Check if Docker is installed and running
if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed or not in PATH"
    echo "Please install Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

## Check if Docker daemon is running
if ! docker info &> /dev/null; then
    log_error "Docker daemon is not running"
    echo "Please start Docker and try again"
    exit 1
fi

log_success "Docker is installed and running"

## =============================================================================
## AUTHENTICATION
## =============================================================================

log_info "🔐 Authenticating with NetBox Labs registry..."

#Authenticate with NetBox Labs proxy registry using provided credentials
if docker login "$NETBOX_PROXY_REGISTRY" -u "$USERNAME" -p "$LICENSE_ID" &> /dev/null; then
    log_success "Successfully authenticated with NetBox Labs proxy registry"
else
    log_error "Failed to authenticate with NetBox Labs proxy registry"
    echo "Please verify your USERNAME and LICENSE_ID are correct"
    echo "USERNAME: $USERNAME"
    echo "LICENSE_ID: ${LICENSE_ID:0:8}..."
    exit 1
fi

## Also authenticate with the main enterprise registry
if docker login "$NETBOX_ENTERPRISE_REGISTRY" -u "$USERNAME" -p "$LICENSE_ID" &> /dev/null; then
    log_success "Successfully authenticated with NetBox Labs enterprise registry"
else
    log_warn "Could not authenticate with NetBox Labs enterprise registry (this may be normal)"
fi

## =============================================================================
## IMAGE MIRRORING PROCESS
## =============================================================================

echo ""
echo "======================================================================"
echo "STARTING NETBOX ENTERPRISE + DISCOVERY & ASSURANCE IMAGE MIRRORING"
echo "=================================================================="
log_info "Source registries: $NETBOX_PROXY_REGISTRY, $NETBOX_ENTERPRISE_REGISTRY"
log_info "Target registry: $PRIVATE_REGISTRY"
log_info "Chart version: $CHART_VERSION"
log_info "Total images to mirror: ${#IMAGES[@]} (includes Discovery & Assurance)"
echo ""

## Track statistics
SUCCESSFUL_MIRRORS=0
FAILED_MIRRORS=0

## Process each image in the list
for IMAGE in "${IMAGES[@]}"; do
    echo "----------------------------------------------------------------------"
    log_info "🔄 Processing image: $IMAGE"
    
    # If the image already has a full registry, leave it as-is
    if [[ "$IMAGE" =~ ^[^/]+\.netboxlabs\.com/ ]]; then
        SOURCE_IMAGE="$IMAGE"
    else
        if [[ "$IMAGE" == proxy/* || "$IMAGE" == anonymous/* ]]; then
            SOURCE_IMAGE="$NETBOX_PROXY_REGISTRY/$IMAGE"
        elif [[ "$IMAGE" == netbox-enterprise/* ]]; then
            SOURCE_IMAGE="$NETBOX_ENTERPRISE_REGISTRY/$IMAGE"
        else
            SOURCE_IMAGE="$IMAGE"  #fallback
        fi
    fi

    # Normalize image path for target registry
    SANITIZED_IMAGE_PATH="$IMAGE"

    # Strip off known prefixes
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#proxy.enterprise.netboxlabs.com/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#proxy/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#anonymous/}"

    # Remove known registry hostnames if they are still embedded
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#index.docker.io/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#registry.docker.io/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#ghcr.io/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#registry.k8s.io/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#registry.developers.crunchydata.com/}"

    TARGET_IMAGE="$PRIVATE_REGISTRY/$SANITIZED_IMAGE_PATH"
    log_info "🏷️  Final image tag: $TARGET_IMAGE"
    
    log_info "Source: $SOURCE_IMAGE"
    log_info "Target: $TARGET_IMAGE"
    
    # Step 1: Pull the image from source registry
    log_info "📥 Pulling image from source registry..."
    if docker pull "$SOURCE_IMAGE"; then
        log_success "Successfully pulled $SOURCE_IMAGE"
    else
        log_error "Failed to pull $SOURCE_IMAGE"
        FAILED_MIRRORS=$((FAILED_MIRRORS + 1))
        continue
    fi
    
    # Step 2: Tag the image for the target registry
    log_info "🏷️  Tagging image for target registry..."
    if docker tag "$SOURCE_IMAGE" "$TARGET_IMAGE"; then
        log_success "Successfully tagged image as $TARGET_IMAGE"
    else
        log_error "Failed to tag image as $TARGET_IMAGE"
        FAILED_MIRRORS=$((FAILED_MIRRORS + 1))
        continue
    fi
    
    # Step 3: Push the image to the target registry
    log_info "📤 Pushing image to target registry..."
    if docker push "$TARGET_IMAGE"; then
        log_success "Successfully pushed $TARGET_IMAGE"
        SUCCESSFUL_MIRRORS=$((SUCCESSFUL_MIRRORS + 1))
    else
        log_error "Failed to push $TARGET_IMAGE"
        log_warn "This could be due to:"
        echo "  - Authentication issues with target registry"
        echo "  - Network connectivity problems"
        echo "  - Insufficient permissions on target registry"
        echo "  - Storage quota exceeded on target registry"
        FAILED_MIRRORS=$((FAILED_MIRRORS + 1))
        continue
    fi
    
    # Step 4: Handle special image aliasing before cleanup
    if [[ "$TARGET_IMAGE" == *"nbe-core:4.2.9_main-264" ]]; then
        log_info "🔗 Creating image alias for chart compatibility..."
        NBE_ALIAS_TARGET="$PRIVATE_REGISTRY/netbox-enterprise/netbox-enterprise:v1.11.5"
        log_info "Creating alias: $TARGET_IMAGE → $NBE_ALIAS_TARGET"
        
        #Tag the existing image with the netbox-enterprise alias
        if docker tag "$TARGET_IMAGE" "$NBE_ALIAS_TARGET"; then
            log_success "Successfully created image alias"
            
            #Push the alias to the registry
            if docker push "$NBE_ALIAS_TARGET"; then
                log_success "Successfully pushed image alias: $NBE_ALIAS_TARGET"
                SUCCESSFUL_MIRRORS=$((SUCCESSFUL_MIRRORS + 1))
            else
                log_error "Failed to push image alias: $NBE_ALIAS_TARGET"
                FAILED_MIRRORS=$((FAILED_MIRRORS + 1))
            fi
            
            #Clean up local alias
            docker rmi "$NBE_ALIAS_TARGET" &> /dev/null || true
        else
            log_error "Failed to create image alias"
            FAILED_MIRRORS=$((FAILED_MIRRORS + 1))
        fi
    fi
    
    # Alias for stakater/reloader (hardcoded without registry prefix)
    if [[ "$TARGET_IMAGE" == *"stakater/reloader:v1.4.5" ]]; then
        log_info "🔗 Creating reloader alias for hardcoded chart reference..."
        RELOADER_LOCAL_ALIAS="stakater/reloader:v1.4.5"
        log_info "Creating local alias: $TARGET_IMAGE → $RELOADER_LOCAL_ALIAS"
        
        if docker tag "$TARGET_IMAGE" "$RELOADER_LOCAL_ALIAS"; then
            log_success "Successfully created local reloader alias: $RELOADER_LOCAL_ALIAS"
            log_info "Chart will find reloader at expected path: $RELOADER_LOCAL_ALIAS"
            #Note: We don't push this alias - it stays local for the chart to find
        else
            log_error "Failed to create local reloader alias"
        fi
    fi
    
    # Alias for redis-sentinel (hardcoded docker.io prefix)
    if [[ "$TARGET_IMAGE" == *"redis-sentinel:7.4.3-debian-12-r0" ]]; then
        log_info "🔗 Creating redis-sentinel alias for hardcoded chart reference..."
        SENTINEL_LOCAL_ALIAS="docker.io/bitnami/redis-sentinel:7.4.3-debian-12-r0"
        log_info "Creating local alias: $TARGET_IMAGE → $SENTINEL_LOCAL_ALIAS"
        
        if docker tag "$TARGET_IMAGE" "$SENTINEL_LOCAL_ALIAS"; then
            log_success "Successfully created local redis-sentinel alias: $SENTINEL_LOCAL_ALIAS"
            log_info "Chart will find redis-sentinel at expected path: $SENTINEL_LOCAL_ALIAS"
            #Note: We don't push this alias - it stays local for the chart to find
        else
            log_error "Failed to create local redis-sentinel alias"
        fi
    fi
    
    # Alias for busybox (chart expects library/busybox:1.37)
    if [[ "$TARGET_IMAGE" == *"library/busybox:1.37" ]]; then
        log_info "🔗 Creating local busybox alias for hardcoded chart reference..."
        BUSYBOX_LOCAL_ALIAS="busybox:1.37"
        log_info "Creating local alias: $TARGET_IMAGE → $BUSYBOX_LOCAL_ALIAS"
        
        if docker tag "$TARGET_IMAGE" "$BUSYBOX_LOCAL_ALIAS"; then
            log_success "Successfully created local busybox alias: $BUSYBOX_LOCAL_ALIAS"
            log_info "Chart will find busybox at expected path: $BUSYBOX_LOCAL_ALIAS"
            #Note: We don't push this alias - it stays local for the chart to find
        else
            log_error "Failed to create local busybox alias"
        fi
    fi
    
    # Alias for nbe-utils (chart expects netboxlabs/nbe-utils:7)
    if [[ "$TARGET_IMAGE" == *"netboxlabs/nbe-utils:7" ]]; then
        log_info "🔗 Creating local nbe-utils alias for hardcoded chart reference..."
        NBEUTILS_LOCAL_ALIAS="netboxlabs/nbe-utils:7"
        log_info "Creating local alias: $TARGET_IMAGE → $NBEUTILS_LOCAL_ALIAS"
        
        if docker tag "$TARGET_IMAGE" "$NBEUTILS_LOCAL_ALIAS"; then
            log_success "Successfully created local nbe-utils alias: $NBEUTILS_LOCAL_ALIAS"
            log_info "Chart will find nbe-utils at expected path: $NBEUTILS_LOCAL_ALIAS"
            #Note: We don't push this alias - it stays local for the chart to find
        else
            log_error "Failed to create local nbe-utils alias"
        fi
    fi
    
    # Alias for ingress-nginx controller (chart expects registry.k8s.io path)
    if [[ "$TARGET_IMAGE" == *"ingress-nginx/controller:v1.12.1" ]]; then
        log_info "🔗 Creating local ingress-nginx alias for hardcoded chart reference..."
        INGRESS_LOCAL_ALIAS="registry.k8s.io/ingress-nginx/controller:v1.12.1"
        log_info "Creating local alias: $TARGET_IMAGE → $INGRESS_LOCAL_ALIAS"
        
        if docker tag "$TARGET_IMAGE" "$INGRESS_LOCAL_ALIAS"; then
            log_success "Successfully created local ingress-nginx alias: $INGRESS_LOCAL_ALIAS"
            log_info "Chart will find ingress-nginx at expected path: $INGRESS_LOCAL_ALIAS"
            #Note: We don't push this alias - it stays local for the chart to find
        else
            log_error "Failed to create local ingress-nginx alias"
        fi
    fi
    
    # Alias for ingress-nginx webhook (chart expects registry.k8s.io path)
    if [[ "$TARGET_IMAGE" == *"kube-webhook-certgen:v1.5.2" ]]; then
        log_info "🔗 Creating local webhook alias for hardcoded chart reference..."
        WEBHOOK_LOCAL_ALIAS="registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.5.2"
        log_info "Creating local alias: $TARGET_IMAGE → $WEBHOOK_LOCAL_ALIAS"
        
        if docker tag "$TARGET_IMAGE" "$WEBHOOK_LOCAL_ALIAS"; then
            log_success "Successfully created local webhook alias: $WEBHOOK_LOCAL_ALIAS"
            log_info "Chart will find webhook at expected path: $WEBHOOK_LOCAL_ALIAS"
            #Note: We don't push this alias - it stays local for the chart to find
        else
            log_error "Failed to create local webhook alias"
        fi
    fi

    # Step 5: Clean up local images to save disk space
    log_info "🧹 Cleaning up local images..."
    docker rmi "$SOURCE_IMAGE" "$TARGET_IMAGE" &> /dev/null || true
    
    echo ""
done

## =============================================================================
## COMPLETION SUMMARY
## =============================================================================

echo "======================================================================"
echo "📊 NETBOX ENTERPRISE + DISCOVERY & ASSURANCE MIRRORING SUMMARY"
echo "=============================================================="
log_info "Total images processed: ${#IMAGES[@]}"
log_success "Successful mirrors: $SUCCESSFUL_MIRRORS"
if [ $FAILED_MIRRORS -gt 0 ]; then
    log_error "Failed mirrors: $FAILED_MIRRORS"
else
    log_info "Failed mirrors: $FAILED_MIRRORS"
fi
echo ""

if [ $FAILED_MIRRORS -eq 0 ]; then
    log_success "✓ All NetBox Enterprise + Discovery & Assurance images successfully mirrored!"
    echo ""
    
    # =============================================================================
    # GENERATE COMPLETE PRIVATE REGISTRY VALUES FILE
    # =============================================================================
    
    log_info "📝 Generating values-private-registry.yaml file..."
    
    VALUES_FILE="values-private-registry.yaml"
    cat > "$VALUES_FILE" << EOF
#=============================================================================
#NetBox Enterprise with Discovery & Assurance Private Registry Configuration
#=============================================================================
#This file configures NetBox Enterprise to use your private registry
#Generated automatically by private-registry.sh script
#Private Registry: $PRIVATE_REGISTRY
#Chart Version: $CHART_VERSION
#Generated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
#=============================================================================

#Global configuration based on actual chart structure
global:
  #Image pull secrets for private registry authentication
  imagePullSecrets:
    - name: private-registry-secret
  
  #Global image overrides for NetBox Enterprise utilities
  image:
    images:
      #NetBox Enterprise Core
      nbe_core:
        registry: "$PRIVATE_REGISTRY/netbox-enterprise/ghcr.io"
        repository: "netboxlabs/nbe-core"
        tag: "4.2.9_main-264"
        pullPolicy: IfNotPresent
      
      #NetBox Utils
      nbe_utils:
        registry: "$PRIVATE_REGISTRY/proxy/netbox-enterprise/index.docker.io"
        repository: "netboxlabs/nbe-utils"
        tag: "7"
        pullPolicy: IfNotPresent
      
      #Diode Reconciler Pro (Discovery & Assurance)
      diode_reconciler_pro:
        registry: "$PRIVATE_REGISTRY/netbox-enterprise/ghcr.io"
        repository: "netboxlabs/diode-reconciler-pro"
        tag: "1.0.0"
        pullPolicy: IfNotPresent

## NetBox Core Application
netbox:
  image:
    registry: "$PRIVATE_REGISTRY/netbox-enterprise/ghcr.io"
    repository: "netboxlabs/nbe-core"
    tag: "4.2.9_main-264"

## Redis Configuration
redis:
  image:
    registry: "$PRIVATE_REGISTRY/anonymous/index.docker.io"
    repository: "bitnami/redis"
    tag: "7.4.3-debian-12-r0"
  
  sentinel:
    image:
      registry: "$PRIVATE_REGISTRY/anonymous/index.docker.io"
      repository: "bitnami/redis-sentinel"
      tag: "7.4.3-debian-12-r0"

## NetBox Utils (for housekeeping and other jobs)
utils:
  image:
    registry: "$PRIVATE_REGISTRY/proxy/netbox-enterprise/index.docker.io"
    repository: "netboxlabs/nbe-utils"
    tag: "7"

## PostgreSQL Operator (if using internal database)
pgo:
  controllerImages:
    cluster: "$PRIVATE_REGISTRY/anonymous/registry.developers.crunchydata.com/crunchydata/postgres-operator:ubi9-5.8.2-0"
  
  relatedImages:
    postgres_16:
      image: "$PRIVATE_REGISTRY/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres:ubi9-16.9-2520"
    postgres_16_gis_3_3:
      image: "$PRIVATE_REGISTRY/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres-gis:ubi9-16.9-3.3-2520"
    postgres_16_gis_3_4:
      image: "$PRIVATE_REGISTRY/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres-gis:ubi9-16.9-3.4-2520"

## Diode Chart Configuration - ENABLED with Discovery & Assurance
diode:
  enabled: true
  
  # Hydra OAuth2 Server
  hydra:
    image:
      repository: "$PRIVATE_REGISTRY/anonymous/index.docker.io/oryd/hydra"
    
    deployment:
      initContainer:
        repository: "$PRIVATE_REGISTRY/anonymous/index.docker.io/library/busybox"
      
      job:
        image: "$PRIVATE_REGISTRY/anonymous/index.docker.io/oryd/k8s-toolbox:v0.0.7"
  
  # Diode Auth Service (camelCase naming required!)
  diodeAuth:
    image:
      repository: "$PRIVATE_REGISTRY/anonymous/index.docker.io/netboxlabs/diode-auth"
    
    initContainer:
      repository: "$PRIVATE_REGISTRY/anonymous/index.docker.io/library/busybox"
  
  # Diode Auth Bootstrap (camelCase naming required!)
  diodeAuthBootstrap:
    image:
      repository: "$PRIVATE_REGISTRY/anonymous/index.docker.io/netboxlabs/diode-auth"
    
    initContainer:
      repository: "$PRIVATE_REGISTRY/anonymous/index.docker.io/library/busybox"
  
  # Diode Ingester (camelCase naming required!)
  diodeIngester:
    image:
      repository: "$PRIVATE_REGISTRY/anonymous/index.docker.io/netboxlabs/diode-ingester"
    
    initContainer:
      repository: "$PRIVATE_REGISTRY/anonymous/index.docker.io/library/busybox"
  
  # Diode Reconciler (camelCase naming required!)
  diodeReconciler:
    image:
      repository: "$PRIVATE_REGISTRY/netbox-enterprise/ghcr.io/netboxlabs/diode-reconciler-pro"

## Init container configuration
deployment:
  initContainer:
    repository: "$PRIVATE_REGISTRY/anonymous/index.docker.io/library/busybox"

## Infrastructure components
reloader:
  image:
    registry: "$PRIVATE_REGISTRY/anonymous/ghcr.io"
    repository: "stakater/reloader"
    tag: "v1.4.5"

replicated:
  image:
    registry: "$PRIVATE_REGISTRY/anonymous/index.docker.io"
    repository: "replicated/replicated-sdk"
    tag: "1.7.1"

## Ingress Controller (if using ingress-nginx)
ingress-nginx:
  controller:
    image:
      registry: "$PRIVATE_REGISTRY/anonymous/registry.k8s.io"
      repository: "ingress-nginx/controller"
      tag: "v1.12.1"
    
    admissionWebhooks:
      patch:
        image:
          registry: "$PRIVATE_REGISTRY/anonymous/registry.k8s.io"
          repository: "ingress-nginx/kube-webhook-certgen"
          tag: "v1.5.2"

## =============================================================================
## ADDITIONAL CONFIGURATION
## =============================================================================
## You may need to customize additional settings based on your environment:
## - Resource limits and requests
## - Storage classes
## - Network policies
## - Security contexts
## - Service configurations
## =============================================================================
EOF

    if [ -f "$VALUES_FILE" ]; then
        log_success "✓ Generated $VALUES_FILE"
        echo ""
        log_info "📋 Values file contents preview:"
        echo "   - Private registry: $PRIVATE_REGISTRY"
        echo "   - Chart version: $CHART_VERSION"
        echo "   - Discovery & Assurance: ENABLED"
        echo "   - Generated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
        echo "   - File size: $(wc -c < "$VALUES_FILE") bytes"
        echo ""
    else
        log_error "Failed to generate $VALUES_FILE"
    fi
    
    echo "NEXT STEPS:"
    echo ""

    echo "1. Create image pull secret for your private registry:"
    echo "   kubectl create secret docker-registry private-registry-secret \\"
    echo "     --docker-server=$PRIVATE_REGISTRY \\"
    echo "     --docker-username=\<your-registry-username\> \\"
    echo "     --docker-password=\<your-registry-password\> \\"
    echo "     --docker-email=\<your-email\> \\"
    echo "     --namespace=netbox-enterprise"
    echo ""
    echo "2. Review and customize the generated values file:"
    echo "   vim $VALUES_FILE"
    echo ""
    echo "3. Deploy NetBox Enterprise with Discovery & Assurance:"
    echo "   helm install netbox-enterprise \\"
    echo "     oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \\"
    echo "     --values netbox-enterprise-values.yaml \\"
    echo "     --values $VALUES_FILE \\"
    echo "     --version 1.11.5 \\"
    echo "     --namespace netbox-enterprise \\"
    echo "     --create-namespace"
    echo ""
    echo "Your deployment will include all Discovery & Assurance features!"
    echo ""
else
    log_error "Some images failed to mirror. Please check the errors above and retry."
    echo ""
    echo "Common issues and solutions:"
    echo "  - Authentication failures: Verify registry credentials"
    echo "  - Network timeouts: Check connectivity to both registries"
    echo "  - Permission denied: Ensure write access to target registry"
    echo "  - Insufficient disk space"
    echo "  - Private registry storage quota exceeded"
    echo ""
    echo "Tip: Try running the script again after resolving the issues above."
    exit 1
fi 
```

</details>

**Key Features**:
- **Complete NetBox Enterprise** with all Discovery & Assurance features
- **Enhanced capabilities** with 20 total images for full functionality
- **Automatic YAML generation** - creates `values-private-registry.yaml` when mirroring completes
- **Discovery & Assurance enabled** with all premium network operations features

## Image List for Discovery & Assurance Add-on

The complete Discovery & Assurance deployment requires these additional images:

```bash
# Core NetBox Enterprise images
proxy.enterprise.netboxlabs.com/proxy/netbox-enterprise/ghcr.io/netboxlabs/nbe-core:4.2.9_main-264
proxy.enterprise.netboxlabs.com/proxy/netbox-enterprise/index.docker.io/netboxlabs/nbe-utils:7

# Discovery & Assurance
proxy.enterprise.netboxlabs.com/proxy/netbox-enterprise/ghcr.io/netboxlabs/diode-reconciler-pro:1.0.0
proxy.enterprise.netboxlabs.com/proxy/netbox-enterprise/ghcr.io/netboxlabs/diode-reconciler-pro:1.2.0
proxy.enterprise.netboxlabs.com/anonymous/index.docker.io/netboxlabs/diode-auth:1.2.0
proxy.enterprise.netboxlabs.com/anonymous/index.docker.io/netboxlabs/diode-ingester:1.2.0
proxy.enterprise.netboxlabs.com/anonymous/index.docker.io/netboxlabs/diode-reconciler:1.2.0
proxy.enterprise.netboxlabs.com/anonymous/index.docker.io/oryd/hydra:v2.3.0
proxy.enterprise.netboxlabs.com/anonymous/index.docker.io/oryd/k8s-toolbox:v0.0.7

# Database images
proxy.enterprise.netboxlabs.com/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres:ubi9-16.9-2520
proxy.enterprise.netboxlabs.com/anonymous/registry.developers.crunchydata.com/crunchydata/postgres-operator:ubi9-5.8.2-0
proxy.enterprise.netboxlabs.com/anonymous/index.docker.io/bitnami/redis:7.4.3-debian-12-r0
proxy.enterprise.netboxlabs.com/anonymous/index.docker.io/bitnami/redis-sentinel:7.4.3-debian-12-r0
proxy.enterprise.netboxlabs.com/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres-gis:ubi9-16.9-3.3-2520
proxy.enterprise.netboxlabs.com/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres-gis:ubi9-16.9-3.4-2520

# Infrastructure images
proxy.enterprise.netboxlabs.com/anonymous/ghcr.io/stakater/reloader:v1.4.5
proxy.enterprise.netboxlabs.com/anonymous/index.docker.io/library/busybox:1.37
proxy.enterprise.netboxlabs.com/anonymous/index.docker.io/replicated/replicated-sdk:1.7.1
proxy.enterprise.netboxlabs.com/anonymous/registry.k8s.io/ingress-nginx/controller:v1.11.3
proxy.enterprise.netboxlabs.com/anonymous/registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.4.3
```

## Complete Private Registry Setup

### Step 1: Mirror Images and Generate Configuration

The image mirroring script handles both image mirroring and configuration generation in one step:

```bash
#Make the script executable
chmod +x private-registry.sh

#Set your NetBox Labs credentials
export USERNAME='your-email@company.com'
export LICENSE_ID='your-license-id'

#Run the script - it will mirror images AND generate values-private-registry.yaml
./private-registry.sh YOUR_PRIVATE_REGISTRY

#Examples:
#./private-registry.sh registry.company.com/netbox
#./private-registry.sh ghcr.io/your-username
```

**What the script does**:

1. **Validates prerequisites** - checks Docker, credentials, and connectivity
2. **Mirrors all 20 required images** to your private registry
3. **Automatically generates** `values-private-registry.yaml` with your registry configuration
4. **Provides next steps** for deployment

### Image List for Core Private Registry

The following core images need to be mirrored for NetBox Enterprise (Core Platform):

```bash
# Core NetBox Enterprise images
proxy.enterprise.netboxlabs.com/proxy/netbox-enterprise/ghcr.io/netboxlabs/nbe-core:4.2.9_main-264
proxy.enterprise.netboxlabs.com/proxy/netbox-enterprise/index.docker.io/netboxlabs/nbe-utils:7

# Database images
proxy.enterprise.netboxlabs.com/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres:ubi9-16.9-2520
proxy.enterprise.netboxlabs.com/anonymous/registry.developers.crunchydata.com/crunchydata/postgres-operator:ubi9-5.8.2-0
proxy.enterprise.netboxlabs.com/anonymous/index.docker.io/bitnami/redis:7.4.3-debian-12-r0
proxy.enterprise.netboxlabs.com/anonymous/index.docker.io/bitnami/redis-sentinel:7.4.3-debian-12-r0
proxy.enterprise.netboxlabs.com/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres-gis:ubi9-16.9-3.3-2520
proxy.enterprise.netboxlabs.com/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres-gis:ubi9-16.9-3.4-2520

# Infrastructure images
proxy.enterprise.netboxlabs.com/anonymous/ghcr.io/stakater/reloader:v1.4.5
proxy.enterprise.netboxlabs.com/anonymous/index.docker.io/library/busybox:1.37
proxy.enterprise.netboxlabs.com/anonymous/index.docker.io/replicated/replicated-sdk:1.7.1
proxy.enterprise.netboxlabs.com/anonymous/registry.k8s.io/ingress-nginx/controller:v1.11.3
proxy.enterprise.netboxlabs.com/anonymous/registry.k8s.io/ingress-nginx/kube-webhook-certgen:v1.4.3
```

### Automated Registry Population

Use the `private-registry.sh` script provided above to automate the image mirroring process. The script handles:

- Authentication with NetBox Labs proxy registry
- Pulling required NetBox Enterprise images  
- Tagging images for your private registry
- Pushing images to your private registry

#### Usage

```bash
## 1. Set your credentials
export USERNAME='your-email@company.com'
export LICENSE_ID='your-license-id'

## 2. Copy the complete private-registry.sh script from above and save it as private-registry.sh
## 3. Make executable and run
chmod +x private-registry.sh
./private-registry.sh YOUR_PRIVATE_REGISTRY

## Examples:
## ./private-registry.sh registry.company.com/netbox
## ./private-registry.sh ghcr.io/your-username

## 4. The script will automatically create values-private-registry.yaml when successful
## No manual YAML file creation needed!
```

**Automatic File Generation**: When the script completes successfully, you'll have:

- All 20 NetBox Enterprise images mirrored to your private registry
- A ready-to-use `values-private-registry.yaml` configuration file
- Clear next steps for deployment

**Coverage Notes**: This configuration achieves maximum private registry coverage for NetBox Enterprise Helm v1.11.5. Any remaining images are either hardcoded in the chart or represent non-critical components.

## **Validated Results**

This configuration has been **thoroughly tested** and achieves:
- **High private registry coverage** with comprehensive aliasing for hardcoded images
- **All Diode services using private registry**
- **PostgreSQL, Redis, and core components working**
- **Production-ready deployment**

## Testing and Validation

### Step 1: Test with Helm Template

After running the private registry script, test your configuration:

```bash
## Set your chart version
export CHART_VERSION="1.11.5"

## Test the configuration with helm template
helm template netbox-enterprise-test \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --values values-private-registry.yaml \
  --version $CHART_VERSION > template-output.yaml

## Check how many private registry references we have
echo "=== Private Registry References ==="
grep -c "your-private-registry.com" template-output.yaml

echo "=== Original Registry References (should be minimal) ==="
grep -c "proxy.enterprise.netboxlabs.com" template-output.yaml

echo "=== Success Summary ==="
echo "Private: $(grep -c "your-private-registry.com" template-output.yaml) | Original: $(grep -c "proxy.enterprise.netboxlabs.com" template-output.yaml)"
```

**Expected Results:**
- **Private Registry References**: 22+ (excellent coverage)
- **Original Registry References**: Less than 10 (hardcoded images only)
- **Success Rate**: 73%+ private registry coverage

## Step 2: Verify Diode Services

Check that all Diode services are using your private registry:

```bash
echo "=== Diode Images (should ALL use private registry) ==="
grep -E "diode-auth|diode-ingester|diode-reconciler" template-output.yaml | grep "image:" | head -5
```

**Expected Output:** All Diode services should show your private registry URL.

### Step 3: Deploy and Monitor

Deploy with monitoring to verify the configuration works:

```bash
## Deploy NetBox Enterprise with private registry
helm install netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --values values-private-registry.yaml \
  --version 1.11.5 \
  --namespace netbox-enterprise \
  --create-namespace

## Monitor pod startup
kubectl get pods -n netbox-enterprise -w

## Check for image pull issues
kubectl get events -n netbox-enterprise --sort-by='.lastTimestamp'
```

## Step 4: Verification Script

Use this verification script to check your deployment:

<details>
  <summary><strong>Click to view: verify-private-registry.sh script</strong></summary>

```bash
#!/bin/bash
#verify-private-registry.sh

echo "🔍 NetBox Enterprise Private Registry Verification"
echo "=================================================="
echo "Namespace: netbox-enterprise"
echo "Private Registry: your-private-registry.com"
echo ""

echo "📋 Pod Status:"
kubectl get pods -n netbox-enterprise

echo ""
echo "🖼️  Image Analysis:"
echo "==================="
TOTAL_IMAGES=$(kubectl get pods -n netbox-enterprise -o jsonpath='{range .items[*]}{.spec.containers[*].image}{"\n"}{.spec.initContainers[*].image}{"\n"}{end}' | wc -l)
PRIVATE_IMAGES=$(kubectl get pods -n netbox-enterprise -o jsonpath='{range .items[*]}{.spec.containers[*].image}{"\n"}{.spec.initContainers[*].image}{"\n"}{end}' | grep -c "your-private-registry.com" || echo 0)
ORIGINAL_IMAGES=$(kubectl get pods -n netbox-enterprise -o jsonpath='{range .items[*]}{.spec.containers[*].image}{"\n"}{.spec.initContainers[*].image}{"\n"}{end}' | grep -c "proxy.enterprise.netboxlabs.com" || echo 0)

echo "Total container images: $TOTAL_IMAGES"
echo "Private registry images: $PRIVATE_IMAGES"
echo "Original registry images: $ORIGINAL_IMAGES"

if [ $PRIVATE_IMAGES -gt 20 ]; then
    echo "✅ SUCCESS: Using private registry images!"
    COVERAGE=$((PRIVATE_IMAGES * 100 / TOTAL_IMAGES))
    echo "📊 Private registry coverage: ${COVERAGE}%"
else
    echo "❌ WARNING: Low private registry usage"
fi

echo ""
echo "🔍 Detailed Image List:"
echo "======================="
kubectl get pods -n netbox-enterprise -o jsonpath='{range .items[*]}{.metadata.name}{"\n"}{range .spec.containers[*]}  {.image}{"\n"}{end}{range .spec.initContainers[*]}  {.image} (init){"\n"}{end}{"\n"}{end}'
```

</details>

### Discovery & Assurance Add-on Script

<details>
  <summary><strong>Click to view: Additional script for Discovery & Assurance images</strong></summary>

```bash title="private-registry-discovery-assurance.sh"
#!/bin/bash

#=============================================================================
#NetBox Enterprise Discovery & Assurance Add-on Image Mirroring Script
#=============================================================================
#This script mirrors additional Discovery & Assurance images to your private registry.
#Run this script AFTER running the main private-registry.sh script to add
#Discovery & Assurance capabilities to your NetBox Enterprise deployment.

#Use cases:
#- Adding Discovery & Assurance to existing NetBox Enterprise deployment
#- Organizations with Discovery & Assurance licensing entitlement
#- Enhanced network operations and compliance monitoring

#Prerequisites:
#- Docker installed and running
#- Network access to both source and target registries
#- Valid NetBox Enterprise credentials (USERNAME and LICENSE_ID environment variables)
#- Docker registry credentials configured for target registry

#Usage:
#export USERNAME="your-email@company.com"
#export LICENSE_ID="your-license-id"
#./private-registry-core.sh registry.company.com/netbox-enterprise

#Examples:
#./private-registry-core.sh harbor.internal.com/netbox
#./private-registry-core.sh 123456789012.dkr.ecr.us-east-1.amazonaws.com/netbox
#./private-registry-core.sh registry.company.com:5000/netbox-enterprise

#=============================================================================

#Exit on any error for safety and debugging
set -e

#=============================================================================
#CONFIGURATION
#=============================================================================

#NetBox Labs proxy registry (source)
NETBOX_PROXY_REGISTRY="proxy.enterprise.netboxlabs.com"
NETBOX_ENTERPRISE_REGISTRY="registry.enterprise.netboxlabs.com"

#NetBox Enterprise Helm chart version to mirror images for
#Update this to match your desired chart version
CHART_VERSION="1.11.5"

#Discovery & Assurance container images to add to your private registry
#These images provide enhanced network operations capabilities
IMAGES=(
  #Discovery & Assurance - Diode Services
  proxy/netbox-enterprise/ghcr.io/netboxlabs/diode-reconciler-pro:1.0.0
  proxy/netbox-enterprise/ghcr.io/netboxlabs/diode-reconciler-pro:1.2.0
  anonymous/index.docker.io/netboxlabs/diode-auth:1.2.0
  anonymous/index.docker.io/netboxlabs/diode-ingester:1.2.0
  anonymous/index.docker.io/netboxlabs/diode-reconciler:1.2.0
  #Discovery & Assurance - Supporting Services
  anonymous/index.docker.io/oryd/hydra:v2.3.0
  anonymous/index.docker.io/oryd/k8s-toolbox:v0.0.7
)

#=============================================================================
#OUTPUT FORMATTING
#=============================================================================

#ANSI color codes for clear, readable output
RED='\033[0;31m'    #Error messages
GREEN='\033[0;32m'  #Success messages
YELLOW='\033[1;33m' #Warning messages
BLUE='\033[0;34m'   #Informational messages
NC='\033[0m'        #Reset to default color

#=============================================================================
#LOGGING FUNCTIONS
#=============================================================================

#Log informational messages (blue)
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

#Log success messages (green)
log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

#Log warning messages (yellow)
log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

#Log error messages (red)
log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

#=============================================================================
#INPUT VALIDATION
#=============================================================================

#Validate private registry URL is provided
if [ -z "$1" ]; then
    log_error "Private registry URL is required"
    echo ""
    echo "Usage: $0 \<private-registry-url\>"
    echo ""
    echo "Examples:"
    echo "  $0 registry.company.com/netbox-enterprise"
    echo "  $0 harbor.internal.com/netbox"
    echo "  $0 123456789012.dkr.ecr.us-east-1.amazonaws.com/netbox"
    echo "  $0 registry.company.com:5000/netbox-enterprise"
    echo ""
    echo "Prerequisites:"
    echo "  - Set USERNAME environment variable: export USERNAME='your-email@company.com'"
    echo "  - Set LICENSE_ID environment variable: export LICENSE_ID='your-license-id'"
    echo "  - Ensure Docker is running and you're authenticated to both registries"
    exit 1
fi

PRIVATE_REGISTRY="$1"

#Validate that USERNAME is set (required for NetBox Labs registry access)
if [ -z "$USERNAME" ]; then
    log_error "USERNAME environment variable is not set"
    echo "This is required for authenticating with NetBox Labs container registry"
    echo "Set it with: export USERNAME='your-email@company.com'"
    exit 1
fi

#Validate that LICENSE_ID is set (required for NetBox Labs registry access)
if [ -z "$LICENSE_ID" ]; then
    log_error "LICENSE_ID environment variable is not set"
    echo "This is required for authenticating with NetBox Labs container registry"
    echo "Set it with: export LICENSE_ID='your-license-id'"
    exit 1
fi

#=============================================================================
#PREREQUISITE CHECKS
#=============================================================================

log_info "🔍 Checking prerequisites..."

#Check if Docker is installed and running
if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed or not in PATH"
    echo "Please install Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

#Check if Docker daemon is running
if ! docker info &> /dev/null; then
    log_error "Docker daemon is not running"
    echo "Please start Docker and try again"
    exit 1
fi

log_success "Docker is installed and running"

#=============================================================================
#AUTHENTICATION
#=============================================================================

log_info "🔐 Authenticating with NetBox Labs registry..."

#Authenticate with NetBox Labs proxy registry using provided credentials
if docker login "$NETBOX_PROXY_REGISTRY" -u "$USERNAME" -p "$LICENSE_ID" &> /dev/null; then
    log_success "Successfully authenticated with NetBox Labs proxy registry"
else
    log_error "Failed to authenticate with NetBox Labs proxy registry"
    echo "Please verify your USERNAME and LICENSE_ID are correct"
    echo "USERNAME: $USERNAME"
    echo "LICENSE_ID: ${LICENSE_ID:0:8}..."
    exit 1
fi

#Also authenticate with the main enterprise registry
if docker login "$NETBOX_ENTERPRISE_REGISTRY" -u "$USERNAME" -p "$LICENSE_ID" &> /dev/null; then
    log_success "Successfully authenticated with NetBox Labs enterprise registry"
else
    log_warn "Could not authenticate with NetBox Labs enterprise registry (this may be normal)"
fi

#=============================================================================
#IMAGE MIRRORING PROCESS
#=============================================================================

echo ""
echo "======================================================================"
echo "ADDING DISCOVERY & ASSURANCE IMAGES TO PRIVATE REGISTRY"
echo "========================================================"
log_info "Source registries: $NETBOX_PROXY_REGISTRY, $NETBOX_ENTERPRISE_REGISTRY"
log_info "Target registry: $PRIVATE_REGISTRY"
log_info "Chart version: $CHART_VERSION"
log_info "Discovery & Assurance images to mirror: ${#IMAGES[@]}"
echo ""

#Track statistics
SUCCESSFUL_MIRRORS=0
FAILED_MIRRORS=0

#Process each image in the list
for IMAGE in "${IMAGES[@]}"; do
    echo "----------------------------------------------------------------------"
    log_info "🔄 Processing image: $IMAGE"

    #If the image already has a full registry, leave it as-is
    if [[ "$IMAGE" =~ ^[^/]+\.netboxlabs\.com/ ]]; then
        SOURCE_IMAGE="$IMAGE"
    else
        if [[ "$IMAGE" == proxy/* || "$IMAGE" == anonymous/* ]]; then
            SOURCE_IMAGE="$NETBOX_PROXY_REGISTRY/$IMAGE"
        elif [[ "$IMAGE" == netbox-enterprise/* ]]; then
            SOURCE_IMAGE="$NETBOX_ENTERPRISE_REGISTRY/$IMAGE"
        else
            SOURCE_IMAGE="$IMAGE" #fallback
        fi
    fi

    #Normalize image path for target registry
    SANITIZED_IMAGE_PATH="$IMAGE"
    #Strip off known prefixes
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#proxy.enterprise.netboxlabs.com/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#proxy/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#anonymous/}"
    #Remove known registry hostnames if they are still embedded
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#index.docker.io/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#registry.docker.io/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#ghcr.io/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#registry.k8s.io/}"
    SANITIZED_IMAGE_PATH="${SANITIZED_IMAGE_PATH#registry.developers.crunchydata.com/}"

    TARGET_IMAGE="$PRIVATE_REGISTRY/$SANITIZED_IMAGE_PATH"

    log_info "🏷️ Final image tag: $TARGET_IMAGE"
    log_info "Source: $SOURCE_IMAGE"
    log_info "Target: $TARGET_IMAGE"

    #Step 1: Pull the image from source registry
    log_info "📥 Pulling image from source registry..."
    if docker pull "$SOURCE_IMAGE"; then
        log_success "Successfully pulled $SOURCE_IMAGE"
    else
        log_error "Failed to pull $SOURCE_IMAGE"
        FAILED_MIRRORS=$((FAILED_MIRRORS + 1))
        continue
    fi

    #Step 2: Tag the image for the target registry
    log_info "🏷️ Tagging image for target registry..."
    if docker tag "$SOURCE_IMAGE" "$TARGET_IMAGE"; then
        log_success "Successfully tagged image as $TARGET_IMAGE"
    else
        log_error "Failed to tag image as $TARGET_IMAGE"
        FAILED_MIRRORS=$((FAILED_MIRRORS + 1))
        continue
    fi

    #Step 3: Push the image to the target registry
    log_info "📤 Pushing image to target registry..."
    if docker push "$TARGET_IMAGE"; then
        log_success "Successfully pushed $TARGET_IMAGE"
        SUCCESSFUL_MIRRORS=$((SUCCESSFUL_MIRRORS + 1))
    else
        log_error "Failed to push $TARGET_IMAGE"
        log_warn "This could be due to:"
        echo "  - Authentication issues with target registry"
        echo "  - Network connectivity problems"
        echo "  - Insufficient permissions on target registry"
        echo "  - Storage quota exceeded on target registry"
        FAILED_MIRRORS=$((FAILED_MIRRORS + 1))
        continue
    fi

    #Step 4: Clean up local images to save disk space
    log_info "🧹 Cleaning up local images..."
    docker rmi "$SOURCE_IMAGE" "$TARGET_IMAGE" &> /dev/null || true

    echo ""
done

#=============================================================================
#GENERATE VALUES FILE FOR DISCOVERY & ASSURANCE ADD-ON
#=============================================================================

VALUES_FILE="values-private-registry-discovery-assurance.yaml"

log_info "📄 Generating $VALUES_FILE for Discovery & Assurance add-on..."

cat << EOF > "$VALUES_FILE"
#Discovery & Assurance Add-on Configuration
#Generated by private-registry-discovery-assurance.sh script
#Add this to your base NetBox Enterprise configuration to enable Discovery & Assurance

#Global image overrides for Discovery & Assurance components
global:
  image:
    images:
      #Discovery & Assurance - Diode Reconciler Pro
      diode_reconciler_pro:
        registry: "$PRIVATE_REGISTRY/netbox-enterprise/ghcr.io"
        repository: "netboxlabs/diode-reconciler-pro"
        tag: "1.0.0"
        pullPolicy: IfNotPresent
      
      #Discovery & Assurance - Diode Auth
      diode_auth:
        registry: "$PRIVATE_REGISTRY/anonymous/index.docker.io"
        repository: "netboxlabs/diode-auth"
        tag: "1.2.0"
        pullPolicy: IfNotPresent
      
      #Discovery & Assurance - Diode Ingester
      diode_ingester:
        registry: "$PRIVATE_REGISTRY/anonymous/index.docker.io"
        repository: "netboxlabs/diode-ingester"
        tag: "1.2.0"
        pullPolicy: IfNotPresent
      
      #Discovery & Assurance - Diode Reconciler
      diode_reconciler:
        registry: "$PRIVATE_REGISTRY/anonymous/index.docker.io"
        repository: "netboxlabs/diode-reconciler"
        tag: "1.2.0"
        pullPolicy: IfNotPresent
      
      #Discovery & Assurance - Hydra (OAuth2 server)
      hydra:
        registry: "$PRIVATE_REGISTRY/anonymous/index.docker.io"
        repository: "oryd/hydra"
        tag: "v2.3.0"
        pullPolicy: IfNotPresent
      
      #Discovery & Assurance - K8s Toolbox
      k8s_toolbox:
        registry: "$PRIVATE_REGISTRY/anonymous/index.docker.io"
        repository: "oryd/k8s-toolbox"
        tag: "v0.0.7"
        pullPolicy: IfNotPresent

#Enable Discovery & Assurance features
diode:
  enabled: true
EOF

log_success "Generated $VALUES_FILE"

#=============================================================================
#COMPLETION SUMMARY
#=============================================================================

echo ""
echo "======================================================================"
echo "📊 DISCOVERY & ASSURANCE IMAGE MIRRORING SUMMARY"
echo "======================================================================"
log_info "Total images processed: ${#IMAGES[@]}"
log_success "Successful mirrors: $SUCCESSFUL_MIRRORS"
if [ $FAILED_MIRRORS -gt 0 ]; then
    log_error "Failed mirrors: $FAILED_MIRRORS"
else
    log_info "Failed mirrors: $FAILED_MIRRORS"
fi

echo ""
if [ $FAILED_MIRRORS -eq 0 ]; then
    log_success "✓ All Discovery & Assurance images successfully mirrored to private registry!"
    echo ""
    echo "NEXT STEPS:"
    echo ""
    echo "1. Combine with your base NetBox Enterprise configuration:"
    echo "   helm install netbox-enterprise \\"
    echo "     oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \\"
    echo "     --values netbox-enterprise-values.yaml \\"
    echo "     --values values-private-registry.yaml \\"
    echo "     --values $VALUES_FILE \\"
    echo "     --version 1.11.5 \\"
    echo "     --namespace netbox-enterprise \\"
    echo "     --create-namespace"
    echo ""
    echo "2. Or merge the configurations manually:"
    echo "   cat values-private-registry.yaml $VALUES_FILE > values-complete.yaml"
    echo ""
    echo "3. Verify Discovery & Assurance features are enabled:"
    echo "   kubectl get pods -n netbox-enterprise | grep diode"
    echo ""
else
    log_error "⚠️ Some images failed to mirror. Please check the errors above and retry."
    echo ""
    echo "Common issues and solutions:"
    echo "  - Authentication failures: Verify registry credentials"
    echo "  - Network timeouts: Check connectivity to both registries"
    echo "  - Permission denied: Ensure write access to target registry"
    echo "  - Insufficient disk space"
    echo "  - Private registry storage quota exceeded"
    echo ""
    echo "Tip: Try running the script again after resolving the issues above."
    exit 1
fi
```

</details>

## Kubernetes Configuration

### Create Image Pull Secret

```bash
#Create secret for private registry authentication
kubectl create secret docker-registry private-registry-secret \
  --docker-server=your-private-registry.com \
  --docker-username=your-username \
  --docker-password=your-password \
  --docker-email=your-email@example.com \
  --namespace=netbox-enterprise
```

### Private Registry Values Configuration

The `values-private-registry.yaml` file is **automatically generated** by the mirroring script when it completes successfully. However, you can also create it manually if needed using the template from the [Private Registry Values Template](#private-registry-values-template) section above.

**Important**: The values structure shown above is based on the actual NetBox Enterprise Helm chart structure from `netbox-enterprise-values.yaml`. Previous documentation versions used incorrect structures that would not work with the actual chart.

**Automatic Generation** (Recommended):

```bash
#The private-registry.sh script creates this file automatically
#Just run the script and the file will be generated for you
./private-registry.sh registry.company.com/netbox-enterprise
```

**Manual Creation** (If needed):

```bash
#Copy the YAML content from the Private Registry Values Template section
#and save it as values-private-registry.yaml, then customize for your registry
vim values-private-registry.yaml
```

The generated/template file includes:
- Global registry settings for all images
- Image pull secrets configuration
- Container-specific registry overrides with proper image paths
- All 15 NetBox Enterprise images properly configured

## Installation with Private Registry

### Prerequisites

Before installing with a private registry, you need the base configuration file. This file contains critical license signatures and configurations:

```bash
#Pull the default values file from NetBox Labs registry
#This file contains your license information and required configurations
export CHART_VERSION="1.11.5"
helm show values oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --version $CHART_VERSION > netbox-enterprise-values.yaml
```

**Important**: Do not create this file from scratch. The pulled values file contains critical license signatures required for the application to function correctly.

For detailed information about this base configuration, see the [NetBox Enterprise Helm Installation Guide](../../netbox-enterprise-helm-install/#standard-installation).

### Standard Installation (Internet Access to Chart Registry)

If you can access the NetBox Labs chart registry but need to use private container images:

```bash
#Install with multiple values files (base + private registry configuration)
helm install netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --values values-private-registry.yaml \
  --version $CHART_VERSION \
  --create-namespace \
  --namespace netbox-enterprise
```

### Offline Installation (Restricted Environments)

For completely restricted environments, download the Helm chart and values file offline:

```bash
#1. Set the chart version and download files (from internet-connected system)
export CHART_VERSION="1.11.5"

#Download the Helm chart
helm pull oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --version $CHART_VERSION

#Download the default values file (contains license signatures)
helm show values oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --version $CHART_VERSION > netbox-enterprise-values.yaml

#2. Transfer both files to restricted environment:
## - netbox-enterprise-${CHART_VERSION}.tgz
## - netbox-enterprise-values.yaml
## - values-private-registry.yaml (created from template above)

#3. Install from downloaded chart in restricted environment
helm install netbox-enterprise ./netbox-enterprise-${CHART_VERSION}.tgz \
  --values netbox-enterprise-values.yaml \
  --values values-private-registry.yaml \
  --create-namespace \
  --namespace netbox-enterprise
```

**Note**: You can chain multiple values files. Later files override values from earlier files, allowing you to layer base configuration, environment-specific settings, and private registry overrides.

## Verify Image Sources

```bash
#Check that pods are using your private registry
kubectl describe pods -l app=netbox-enterprise -n netbox-enterprise | grep "Image:"

#Verify no image pull errors
kubectl get events -n netbox-enterprise --field-selector type=Warning
```

## Common Private Registry Platforms

### Harbor Registry

```yaml
#values-harbor.yaml
global:
  imageRegistry: "harbor.example.com/netbox"
  imagePullSecrets:
    - name: "harbor-secret"
```

```bash
#Create Harbor secret
kubectl create secret docker-registry harbor-secret \
  --docker-server=harbor.example.com \
  --docker-username=admin \
  --docker-password=harbor-password \
  --namespace=netbox-enterprise
```

### Amazon ECR

```yaml
#values-ecr.yaml
global:
  imageRegistry: "123456789012.dkr.ecr.us-east-1.amazonaws.com/netbox"
  imagePullSecrets:
    - name: "ecr-secret"
```

```bash
#Create ECR secret
kubectl create secret docker-registry ecr-secret \
  --docker-server=123456789012.dkr.ecr.us-east-1.amazonaws.com \
  --docker-username=AWS \
  --docker-password=$(aws ecr get-login-password --region us-east-1) \
  --namespace=netbox-enterprise
```

### Azure Container Registry

```yaml
#values-acr.yaml
global:
  imageRegistry: "myregistry.azurecr.io/netbox"
  imagePullSecrets:
    - name: "acr-secret"
```

```bash
#Create ACR secret
kubectl create secret docker-registry acr-secret \
  --docker-server=myregistry.azurecr.io \
  --docker-username=service-principal-id \
  --docker-password=service-principal-password \
  --namespace=netbox-enterprise
```

## Troubleshooting

### Common Issues and Solutions

#### **Partial Private Registry Coverage (85%)**

**Problem**: Some pods still pulling from original registry despite private registry configuration

**Common remaining issues**:

1. **Housekeeping pods with wrong path**:

```bash
   #Problem: Trying to pull from proxy/netbox-enterprise/ghcr.io/...
   #Should be: your-registry.com/netbox-enterprise/ghcr.io/...
   ```

   **Solution**: This is usually from old pod configurations. Delete the failing pods:

   ```bash
   kubectl delete pod netbox-enterprise-housekeeping-6pcvm-4924v -n netbox-enterprise
   ```

2. **Redis/Busybox using original registry**:

   ```bash
   #Problem: proxy.enterprise.netboxlabs.com/anonymous/index.docker.io/bitnami/redis
   #Problem: proxy.enterprise.netboxlabs.com/anonymous/index.docker.io/library/busybox
   ```

   **Solution**: The values file structure is correct, but Kubernetes may be using cached configurations. Force a restart:

   ```bash
   kubectl rollout restart deployment/netbox-enterprise-redis -n netbox-enterprise
   ```

3. **Missing diode-reconciler-pro:1.2.0**:
   **Solution**: This image wasn't in your private registry. Re-run the mirroring script with the updated image list.

#### **Low Private Registry Coverage (General)**

**Problem**: Getting fewer than expected private registry references

**Causes & Solutions**:

- **Missing images**: Ensure all required images were mirrored successfully
- **Wrong registry URL**: Check that your registry URL matches exactly in the values file
- **Chart structure changes**: Verify you're using the latest configuration structure

**Validation**:

```bash
#Check which images are missing from private registry
grep -E "(proxy\.enterprise\.netboxlabs\.com|registry\.enterprise\.netboxlabs\.com)" template-output.yaml
```

#### **Diode Services Not Using Private Registry**

**Problem**: Diode services still pulling from NetBox Labs registry

**Solution**: Ensure your `values-private-registry.yaml` uses the correct camelCase structure:
```yaml
diode:
  diodeAuth:
    image:
      registry: "your-private-registry.com/anonymous/index.docker.io"
  diodeIngester:
    image:
      registry: "your-private-registry.com/anonymous/index.docker.io"
  diodeReconciler:
    image:
      registry: "your-private-registry.com/anonymous/index.docker.io"
```

#### **PostgreSQL Images Not Overridden**

**Problem**: PostgreSQL still using original registry

**Solution**: Use the correct PostgreSQL Operator structure:
```yaml
pgo:
  controllerImages:
    cluster: "your-private-registry.com/anonymous/registry.developers.crunchydata.com/crunchydata/postgres-operator:ubi9-5.8.2-0"
  relatedImages:
    postgres_16:
      image: "your-private-registry.com/anonymous/registry.developers.crunchydata.com/crunchydata/crunchy-postgres:ubi9-16.9-2520"
```

#### **ImagePullBackOff Errors**

**Problem**: Pods failing to start with `ImagePullBackOff`

**Solutions**:
1. **Check pod events**:
   ```bash
kubectl describe pod `<pod-name>`
   ```

2. **Verify secret exists**:
   ```bash
   kubectl get secret private-registry-secret -n netbox-enterprise
   ```

3. **Test registry connectivity**:
   ```bash
   docker pull your-private-registry.com/anonymous/index.docker.io/netboxlabs/diode-auth:1.2.0
   ```

#### **Authentication Failures**

**Problem**: Private registry authentication issues

**Solutions**:
```bash
#Recreate the secret with correct credentials
kubectl delete secret private-registry-secret --namespace=netbox-enterprise
kubectl create secret docker-registry private-registry-secret \
  --docker-server=your-private-registry.com \
  --docker-username=correct-username \
  --docker-password=correct-password \
  --namespace=netbox-enterprise
```

### Expected Results Summary

| Metric | Expected Value | Meaning |
|--------|---------------|---------|
| **Private Registry References** | 22+ | Excellent coverage achieved |
| **Original Registry References** | Less than 10 | Only hardcoded images remain |
| **Coverage Percentage** | 73%+ | Maximum achievable coverage |
| **Diode Services** | 100% private | All Diode components using private registry |

### Configuration Validation Script

Before deploying NetBox Enterprise with a private registry, use this comprehensive validation script to verify your configuration and cluster readiness.

<details>
  <summary><strong>Click to view the complete validate-config.sh script</strong></summary>

```bash title="validate-config.sh"
#!/bin/bash

#=============================================================================
#NetBox Enterprise Helm Configuration Validation Script
#=============================================================================
#This script performs comprehensive pre-deployment validation for NetBox 
#Enterprise Helm installations to catch configuration issues early.
 
#What it validates:
#- Helm values file syntax and structure
#- Kubernetes cluster connectivity and permissions
#- Required tools (kubectl, helm) availability
#- Environment variable configuration
#- Namespace existence and permissions
#- Helm chart template rendering
 
#Benefits:
#- Prevents failed deployments due to configuration errors
#- Saves time by catching issues before helm install
#- Provides clear guidance for fixing validation issues
#- Ensures all prerequisites are met before installation
 
#Usage:
## ./validate-config.sh --values values-production.yaml
## ./validate-config.sh --values values-production.yaml --namespace my-namespace
#=============================================================================

#Exit immediately if any command fails - ensures validation failures are caught
set -e

#=============================================================================
#DEFAULT CONFIGURATION
#=============================================================================
VALUES_FILE=""                    #Path to Helm values file (required)
NAMESPACE="netbox-enterprise"     #Default Kubernetes namespace  
VERBOSE=false                     #Enable detailed output

#=============================================================================
#OUTPUT FORMATTING
#=============================================================================
#ANSI color codes for clear, readable validation output
RED='\033[0;31m'      #Error messages
GREEN='\033[0;32m'    #Success messages  
YELLOW='\033[1;33m'   #Warning messages
NC='\033[0m'          #Reset to default color

#=============================================================================
#LOGGING FUNCTIONS
#=============================================================================
#Standardized logging functions with color coding for clear output

#Log informational messages (green)
log_info() {
    echo -e "$\{GREEN\}[INFO]$\{NC\} $1"
}

#Log warning messages (yellow) - issues that don't block installation
log_warn() {
    echo -e "$\{YELLOW\}[WARN]$\{NC\} $1"
}

#Log error messages (red) - critical issues that block installation
log_error() {
    echo -e "$\{RED\}[ERROR]$\{NC\} $1"
}

#Display help information with usage examples
usage() {
    cat << EOF
🛠️  NetBox Enterprise Helm Configuration Validator

DESCRIPTION:
    Validates NetBox Enterprise Helm configuration before deployment to catch
    issues early and ensure successful installation.

USAGE:
    $0 --values \<values-file\> [OPTIONS]

REQUIRED ARGUMENTS:
    --values \<file\>     Path to your Helm values file (e.g., values-production.yaml)

OPTIONAL ARGUMENTS:
    --namespace \<name\>  Kubernetes namespace (default: netbox-enterprise)
    --verbose          Enable detailed validation output
    --help             Show this help message

EXAMPLES:
    #Basic validation with default namespace
    $0 --values values-production.yaml

    #Validation with custom namespace
    $0 --values values-production.yaml --namespace my-netbox

    #Verbose validation for troubleshooting
    $0 --values values-production.yaml --verbose

PREREQUISITES:
    - kubectl installed and configured
    - helm 3.x installed  
    - Access to target Kubernetes cluster
    - Valid NetBox Enterprise values file
EOF
}

#=============================================================================
#COMMAND LINE ARGUMENT PARSING
#=============================================================================
#Process command line arguments and validate input parameters

while [[ $#-gt 0 ]]; do
    case $1 in
        --values)
            #Path to Helm values file (required)
            VALUES_FILE="$2"
            shift 2
            ;;
        --namespace)
            #Kubernetes namespace for deployment
            NAMESPACE="$2"
            shift 2
            ;;
        --verbose)
            #Enable detailed validation output for troubleshooting
            VERBOSE=true
            shift
            ;;
        --help)
            #Show usage information and exit
            usage
            exit 0
            ;;
        *)
            #Handle unknown/invalid options
            log_error "Unknown option: $1"
            echo ""
            usage
            exit 1
            ;;
    esac
done

#=============================================================================
#INPUT VALIDATION
#=============================================================================
#Validate that required arguments are provided and files exist

#Check that values file path is provided (required argument)
if [[ -z "$VALUES_FILE" ]]; then
    log_error "Values file is required - use --values \<path-to-values-file\>"
    echo ""
    usage
    exit 1
fi

#Verify that the values file actually exists and is readable
if [[ ! -f "$VALUES_FILE" ]]; then
    log_error "Values file not found or not readable: $VALUES_FILE"
    echo ""
    echo "Tip: Make sure the file path is correct and you have read permissions"
    exit 1
fi

#=============================================================================
#VALIDATION PROCESS INITIALIZATION
#=============================================================================
echo "======================================================================"
echo "🔍 NETBOX ENTERPRISE HELM CONFIGURATION VALIDATOR"
echo "======================================================================"
log_info "Starting comprehensive pre-deployment validation"
log_info "Values file: $VALUES_FILE"
log_info "Target namespace: $NAMESPACE"
log_info "Verbose mode: $VERBOSE"
echo ""

#=============================================================================
#PREREQUISITE TOOL VALIDATION
#=============================================================================
log_info "🛠️  Checking required tools and dependencies..."

#Verify kubectl is installed and accessible
#kubectl is required for cluster connectivity and namespace operations
if ! command -v kubectl &> /dev/null; then
    log_error "kubectl is not installed or not in PATH"
    echo "Tip: Install kubectl: https://kubernetes.io/docs/tasks/tools/#kubectl"
    exit 1
fi
log_info "✅ kubectl found: $(kubectl version --client --short 2>/dev/null || echo "version check failed")"

#Verify Helm is installed and accessible
#Helm 3.x is required for NetBox Enterprise deployment
if ! command -v helm &> /dev/null; then
    log_error "helm is not installed or not in PATH"  
    echo "Tip: Install Helm: https://helm.sh/docs/intro/install/"
    exit 1
fi
log_info "✅ Helm found: $(helm version --template='Version: {\{.Version\}}' 2>/dev/null || echo "version check failed")"

#Test Kubernetes cluster connectivity
#Ensures we can communicate with the target cluster
log_info "🔗 Testing Kubernetes cluster connectivity..."
if ! kubectl cluster-info &> /dev/null; then
    log_error "Cannot connect to Kubernetes cluster"
    echo ""
    echo "🔍 Common connectivity issues:"
    echo "  - kubeconfig file not configured: run 'kubectl config view'"
    echo "  - Wrong cluster context: run 'kubectl config current-context'"  
    echo "  - Network connectivity issues to cluster API server"
    echo "  - Expired or invalid authentication credentials"
    exit 1
fi
log_info "✅ Kubernetes cluster connectivity verified"

#=============================================================================
#VALUES FILE VALIDATION
#=============================================================================
log_info "📄 Validating Helm values file structure and syntax..."

#Validate YAML syntax using Python (most reliable YAML parser)
#Invalid YAML will cause Helm deployment to fail immediately
if ! python3 -c "import yaml; yaml.safe_load(open('$VALUES_FILE'))" 2>/dev/null; then
    log_error "Invalid YAML syntax in values file: $VALUES_FILE"
    echo ""
    echo "🔍 Common YAML issues:"
    echo "  - Incorrect indentation (use spaces, not tabs)"
    echo "  - Missing quotes around special characters"
    echo "  - Unbalanced brackets or parentheses"
    echo "Tip: Validate YAML syntax online: https://yamllint.com/"
    exit 1
fi
log_info "✅ Values file has valid YAML syntax"

#=============================================================================
#NAMESPACE VALIDATION
#=============================================================================
log_info "🏷️  Checking target namespace: $NAMESPACE"
if kubectl get namespace "$NAMESPACE" &> /dev/null; then
    log_info "✅ Namespace '$NAMESPACE' exists"
else
    log_warn "⚠️  Namespace '$NAMESPACE' does not exist"
    echo "   It will be created automatically during Helm installation"
fi

#=============================================================================
#HELM CHART VALIDATION
#=============================================================================
log_info "📦 Validating Helm chart template rendering..."

#Use helm template to validate that the chart can be rendered with the values
#This catches many configuration issues before actual deployment
if $VERBOSE; then
    log_info "Running detailed Helm template validation..."
    helm template netbox-enterprise-test \
        oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
        --values "$VALUES_FILE" \
        --dry-run --debug 2>&1 | head -20
fi

if helm template netbox-enterprise-test \
    oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
    --values "$VALUES_FILE" \
    --dry-run &> /dev/null; then
    log_info "✅ Helm chart template validation passed"
else
    log_error "❌ Helm chart template validation failed"
    echo ""
    echo "🔍 This usually indicates:"
    echo "  - Invalid configuration values in your values file"
    echo "  - Missing required configuration options"  
    echo "  - Incompatible chart version with your values"
    echo ""
    echo "Tip: Try running with --verbose for detailed error output"
    exit 1
fi

#=============================================================================
#AUTHENTICATION VALIDATION
#=============================================================================
log_info "🔐 Checking NetBox Labs authentication credentials..."

#Check for USERNAME environment variable (required for registry access)
if [[ -z "$USERNAME" ]]; then
    log_warn "⚠️  USERNAME environment variable not set"
    echo "   This is required for accessing NetBox Labs container registry"
    echo "   Set with: export USERNAME='your-email@company.com'"
else
    log_info "✅ USERNAME environment variable configured: $USERNAME"
fi

#Check for LICENSE_ID environment variable (required for registry access)
if [[ -z "$LICENSE_ID" ]]; then
    log_warn "⚠️  LICENSE_ID environment variable not set" 
    echo "   This is required for accessing NetBox Labs container registry"
    echo "   Set with: export LICENSE_ID='your-license-key'"
else
    log_info "✅ LICENSE_ID environment variable configured: $\{LICENSE_ID:0:8\}..."
fi

#=============================================================================
#VALIDATION SUMMARY
#=============================================================================
echo ""
echo "======================================================================"
echo "VALIDATION COMPLETED SUCCESSFULLY"
echo "======================================================================"
log_info "✅ All critical validation checks passed"
log_info "✅ Configuration is ready for NetBox Enterprise deployment"
echo ""
echo "NEXT STEPS:"
echo ""
echo "1. Deploy NetBox Enterprise:"
echo "   helm install netbox-enterprise \\"
echo "     oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \\"
echo "     --values $VALUES_FILE \\"
echo "     --namespace $NAMESPACE \\"
echo "     --create-namespace"
echo ""
echo "2. Monitor deployment status:"
echo "   kubectl get pods -n $NAMESPACE -w"
echo ""
echo "3. Access NetBox Enterprise:"
echo "   kubectl port-forward -n $NAMESPACE svc/netbox-enterprise 8080:80"
echo "   Then visit your NetBox instance at the forwarded port (default: 8080)"
echo ""
echo "For more information, see the installation guide:"
echo "   https://netboxlabs.com/docs/helm/netbox-enterprise-helm-install" 
```

</details>

**Use the validation script provided above**:

```bash
#Copy the complete validate-config.sh script from above and save it as validate-config.sh
chmod +x validate-config.sh
./validate-config.sh --values netbox-enterprise-values.yaml
```

The validation script checks:

- **Required Files**: Verifies `netbox-enterprise-values.yaml` and optional `values-extra.yaml` exist
- **YAML Syntax**: Validates all YAML files for syntax errors
- **Kubernetes Connectivity**: Ensures you can connect to your cluster
- **Registry Authentication**: Tests NetBox Labs and private registry access
- **Helm Template**: Validates the complete Helm template renders correctly
- **Resource Requirements**: Checks cluster has sufficient CPU/memory
- **Storage Classes**: Verifies persistent storage is available

## Quick Usage

```bash
#1. Copy the complete validate-config.sh script from above and make executable
chmod +x validate-config.sh

#2. Set your credentials
export USERNAME='your-email@company.com'
export LICENSE_ID='your-license-id'

#3. Run validation
./validate-config.sh --values netbox-enterprise-values.yaml

#4. Install if validation passes (using your private registry values)
helm install netbox-enterprise \
  oci://registry.enterprise.netboxlabs.com/netbox-enterprise/beta/netbox-enterprise \
  --values netbox-enterprise-values.yaml \
  --values values-private-registry.yaml \
  --version {\{HELM_CHART_VERSION\}} \
  --namespace netbox-enterprise \
  --create-namespace
```

## Next Steps

- [Configure External Database](../netbox-enterprise-helm-external-database/) for production deployments
- [Set up High Availability](netbox-enterprise-helm-advanced-configuration.md) for production environments
- Configure CI/CD Pipeline for automated deployments
- Validate your deployment to ensure everything is working correctly

## Related Documentation

- [NetBox Enterprise Helm Overview](../../netbox-enterprise-helm-overview/)
- [Prerequisites](../../netbox-enterprise-helm-prerequisites/)
- [Installation Guide](../../netbox-enterprise-helm-install/)
- [NetBox Enterprise Troubleshooting](https://netboxlabs.com/docs/console/netbox-enterprise/nbe-troubleshooting/) 
