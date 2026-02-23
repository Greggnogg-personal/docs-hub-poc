---
title: VPN & Overlays
sidebar_label: VPN
tags:
  - community
  - netbox
---

# VPN & Overlays

NetBox models VPN and overlay technologies used in modern networks.

## L2VPN

Model VXLAN, EVPN, VPLS, and other Layer 2 overlay topologies. L2VPNs have terminations that link to interfaces or VLAN assignments.

## Tunnel Objects

Model IPsec, GRE, and other tunnels. Each tunnel has:
- Encapsulation type
- Two endpoint interfaces (local and remote)
- Optional `ipsec-profile` reference

## IKE & IPsec Profiles

Define reusable IKE proposals, IKE policies, IPsec proposals, and IPsec profiles that can be referenced across multiple tunnels — matching the way network vendors implement it.

## Use Cases

- Document VPN headend / spoke topologies
- Cross-reference tunnel interfaces with DCIM device models
- Feed VPN config data into automation pipelines via API
