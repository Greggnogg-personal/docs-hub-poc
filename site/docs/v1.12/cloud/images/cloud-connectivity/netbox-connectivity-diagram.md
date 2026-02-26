---
source: localdocs
lastUpdatedAt: 1764177275000
canonical: /docs/v1.12/cloud/images/cloud-connectivity/netbox-connectivity-diagram/
---
# NetBox Cloud Connectivity Architecture Diagram (Mermaid)

This is the accurate, 100% validated connectivity architecture diagram for NetBox Cloud.

## Full Architecture Diagram

```mermaid
graph LR
    subgraph Customer["Customer Environment"]
        User[("👤 User")]
        Browser["Web Browser"]
        Terminal["Terminal/CLI"]

        subgraph Discovery["Discovery & Data Collection"]
            Server["Server (VM or HW)"]
            subgraph Orb["Orb Container"]
                DiodeSDK["Diode SDK"]
                YAMLConfig["yaml config"]
                Nmap["nmap"]
                NAPALM["NAPALM"]
                SNMP["SNMP"]
                Workers["workers"]
                VCenter["vcenter"]
                Catalyst["catalyst"]
                Mist["mist"]
            end
        end

        subgraph Devices["Network Devices"]
            Router["Router"]
            Switch["Switch"]
            VCenterHost["vCenter"]
        end
    end

    Internet{{"Internet<br/>━━━━━━━━━━━━━━━"}}

    subgraph AWS["AWS Cloud"]
        NLB["AWS Network Load Balancer<br/>• Route53 DNS<br/>• Port 443<br/>• Regional"]

        NGINX["NGINX Ingress Controller<br/>• TLS Termination<br/>• Hostname Routing<br/>• Virtual Hosts"]

        subgraph NetBoxCloud["NetBox Cloud"]
            NetBoxInstance["Your NetBox Instance"]
        end

        subgraph DiodeServices["Diode Services<br/>(if enabled)"]
            DiodeAuth["Diode HTTP Auth"]
            DiodeIngester["Diode Ingester<br/>(gRPC)"]
            DiodeReconciler["Diode Reconciler<br/>(gRPC)"]
        end
    end

    subgraph External["External Services"]
        SSO["SSO Providers<br/>(Okta, EntraID, SAML)"]
        Webhook["Webhook Receiver<br/>(AAP, ITSM, etc.)"]
    end

    %% User to NetBox flows
    User --> Browser
    User --> Terminal
    Browser -->|"HTTPS (443)"| Internet
    Terminal -->|"HTTPS (443)"| Internet

    %% Orb Container to devices
    Orb -->|"SSH (22)"| Router
    Orb -->|"SSH (22)"| Switch
    Orb -->|"SNMP (161)"| Router
    Orb -->|"SNMP (161)"| Switch
    Orb -->|"HTTPS (443)"| VCenterHost

    %% Orb to NetBox
    Orb -->|"gRPC/HTTPS (443)"| Internet

    %% Internet to AWS Infrastructure
    Internet -->|"HTTPS (443)"| NLB
    NLB -->|"HTTPS (443)"| NGINX
    NGINX -->|"Internal Routing"| NetBoxInstance
    NGINX -->|"Internal Routing"| DiodeServices

    %% SSO flows (bidirectional)
    Browser <-->|"HTTPS (443)"| SSO
    NetBoxInstance -->|"HTTPS (443)<br/>SAML/OIDC Validation"| SSO

    %% Webhook delivery
    NetBoxInstance -->|"HTTPS (443)"| Internet
    Internet -->|"HTTPS (443)"| Webhook

    %% Styling
    classDef customerStyle fill:#CFE2F3,stroke:#333,stroke-width:2px
    classDef awsStyle fill:#FF9900,stroke:#333,stroke-width:2px,color:#000
    classDef netboxStyle fill:#4A90E2,stroke:#333,stroke-width:2px,color:#fff
    classDef infraStyle fill:#E8F4F8,stroke:#333,stroke-width:2px
    classDef externalStyle fill:#B8E6B8,stroke:#333,stroke-width:2px

    class Customer,Discovery,Devices,Orb customerStyle
    class AWS awsStyle
    class NetBoxCloud,NetBoxInstance netboxStyle
    class NLB,NGINX,DiodeServices infraStyle
    class SSO,Webhook externalStyle
```

## Simplified Flow Diagram

```mermaid
sequenceDiagram
    participant User as User Browser
    participant Internet as Internet
    participant NLB as AWS NLB
    participant NGINX as NGINX Ingress
    participant NetBox as NetBox Instance
    participant SSO as SSO Provider

    Note over User,NetBox: Web Access Flow
    User->>Internet: HTTPS Request (443)
    Internet->>NLB: HTTPS (443)
    NLB->>NGINX: HTTPS (443)
    Note over NGINX: TLS Termination
    NGINX->>NetBox: HTTP (internal)
    NetBox-->>NGINX: Response
    NGINX-->>NLB: HTTPS
    NLB-->>Internet: HTTPS
    Internet-->>User: Page Content

    Note over User,SSO: SSO Authentication Flow
    User->>NetBox: Access Protected Resource
    NetBox->>User: Redirect to SSO
    User->>SSO: Authenticate (443)
    SSO-->>User: Auth Token
    User->>NetBox: Token
    NetBox->>SSO: Validate Token (443)
    SSO-->>NetBox: Validation Response
    NetBox-->>User: Authenticated Session
```

## Diode Data Ingestion Flow

```mermaid
sequenceDiagram
    participant Orb as Orb Container<br/>(Customer)
    participant Devices as Network Devices
    participant Internet as Internet
    participant NLB as AWS NLB
    participant NGINX as NGINX Ingress
    participant Diode as Diode Services
    participant NetBox as NetBox Instance

    Note over Orb,Devices: Discovery Phase
    Orb->>Devices: SSH (22) / SNMP (161)
    Devices-->>Orb: Device Data

    Note over Orb,NetBox: Data Ingestion Phase
    Orb->>Internet: gRPC over HTTPS (443)
    Internet->>NLB: gRPC/HTTPS (443)
    NLB->>NGINX: gRPC/HTTPS (443)
    NGINX->>Diode: Internal gRPC (8082/8083)
    Note over Diode: Authenticate & Process
    Diode->>NetBox: Store Data
    NetBox-->>Diode: Confirmation
    Diode-->>NGINX: Response
    NGINX-->>NLB: HTTPS
    NLB-->>Internet: HTTPS
    Internet-->>Orb: Success
```

## Infrastructure Layer Diagram

```mermaid
graph TB
    subgraph External["External Traffic"]
        HTTPS443["All Traffic<br/>HTTPS Port 443"]
    end

    subgraph Layer1["Load Balancing Layer"]
        NLB1["AWS Network Load Balancer"]
        NLB2["• Regional deployment"]
        NLB3["• Route53 DNS management"]
        NLB4["• Listens on port 443"]
    end

    subgraph Layer2["Ingress Layer"]
        NGINX1["NGINX Ingress Controller"]
        NGINX2["• TLS termination point"]
        NGINX3["• Hostname-based routing"]
        NGINX4["• Virtual host management"]
        NGINX5["• Certificate management"]
    end

    subgraph Layer3["Application Layer"]
        NetBox1["NetBox Instances"]
        NetBox2["• Internal port 8080"]
        NetBox3["• Multi-tenant isolated"]
        Diode1["Diode Services"]
        Diode2["• Auth: 8080"]
        Diode3["• Ingester: 8082"]
        Diode4["• Reconciler: 8083"]
    end

    HTTPS443 --> Layer1
    Layer1 --> Layer2
    Layer2 --> Layer3

    style External fill:#E3F2FD
    style Layer1 fill:#FFF3E0
    style Layer2 fill:#F3E5F5
    style Layer3 fill:#E8F5E9
```

## Port Reference

| Port | Protocol | Direction | Purpose |
|------|----------|-----------|---------|
| 443 | HTTPS | Customer → NetBox Cloud | Web UI, API, gRPC |
| 443 | HTTPS | Browser ↔ SSO Provider | Authentication |
| 443 | HTTPS | NetBox Cloud → SSO | Validation |
| 443 | HTTPS | NetBox Cloud → Webhooks | Event delivery |
| 22 | SSH | Orb Container → Devices | Device config (NAPALM) |
| 161 | SNMP | Orb Container → Devices | Device discovery |
| 443 | HTTPS | Orb Container → vCenter | vSphere integration |

## Internal Ports (Not Customer-Facing)

| Port | Service | Purpose |
|------|---------|---------|
| 8080 | NetBox Instance | Internal application port |
| 8080 | Diode HTTP Auth | Internal authentication |
| 8082 | Diode Ingester | Internal gRPC service |
| 8083 | Diode Reconciler | Internal gRPC service |

**Note**: All internal ports are accessed externally via HTTPS (443) through the NLB and NGINX Ingress Controller.

## Architecture Layers Explained

### 1. Load Balancing Layer (AWS NLB)
- Entry point for all external traffic
- DNS resolution via Route53
- Regional deployment for high availability
- Port 443 listener for HTTPS traffic
- Distributes traffic to NGINX Ingress Controllers

### 2. Ingress Layer (NGINX Ingress Controller)
- **TLS Termination**: Decrypts HTTPS traffic
- **Hostname Routing**: Routes based on DNS hostname
- **Virtual Hosts**: Manages multiple customer instances
- **Path Routing**: Directs traffic to correct services
- **Certificate Management**: Handles SSL/TLS certificates

### 3. Application Layer (NetBox + Diode)
- NetBox instances running on internal port 8080
- Diode services for data ingestion (if enabled)
- Multi-tenant isolation via namespaces
- Internal service-to-service communication

## Key Architectural Decisions

1. **All External Traffic Uses Port 443**
   - Simplified firewall rules for customers
   - Industry standard HTTPS port
   - Supports both HTTP/2 (web) and gRPC

2. **TLS Terminates at NGINX Ingress**
   - Centralized certificate management
   - Enables hostname-based routing
   - Internal traffic can be HTTP (encrypted at network layer)

3. **Two-Tier Load Balancing**
   - AWS NLB for network-layer distribution
   - NGINX for application-layer routing
   - Provides both performance and flexibility

4. **Internal Ports Not Exposed**
   - Services use internal ports (8080, 8082, 8083)
   - Only accessible within AWS infrastructure
   - Customer only needs to know about port 443

## Security Architecture

```mermaid
graph LR
    subgraph Untrusted["Untrusted Zone"]
        Client["Client"]
    end

    subgraph DMZ["DMZ Layer"]
        NLB["AWS NLB<br/>Port 443"]
    end

    subgraph TrustedEdge["Trusted Edge"]
        NGINX["NGINX Ingress<br/>TLS Termination"]
    end

    subgraph TrustedInternal["Trusted Internal"]
        NetBox["NetBox Instances<br/>Port 8080"]
    end

    Client -->|"Encrypted<br/>HTTPS"| NLB
    NLB -->|"Encrypted<br/>HTTPS"| NGINX
    NGINX -->|"Internal<br/>Network"| NetBox

    style Untrusted fill:#FFCDD2
    style DMZ fill:#FFF9C4
    style TrustedEdge fill:#C8E6C9
    style TrustedInternal fill:#B2DFDB
```

## Usage in Documentation

This Mermaid diagram can be embedded in Docusaurus documentation and will render as an interactive, scalable diagram. It provides the same information as the PNG/SVG but with the advantage of being:

- ✅ Always accurate (maintained as code)
- ✅ Accessible and screen-reader friendly
- ✅ Scalable and responsive
- ✅ Easy to update (just edit the Mermaid code)
- ✅ Version controlled with documentation

To use in documentation, simply include the Mermaid code block in any markdown file.
