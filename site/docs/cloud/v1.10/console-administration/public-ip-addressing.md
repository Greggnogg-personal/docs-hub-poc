---
source: localdocs
tags:
  - cloud
  - netbox
  - administration
  - networking
  - configuration
versions:
  netbox_cloud: v1.10
status: current
lastUpdatedAt: 1758900000000
canonical: /docs/v1.10/cloud/console-administration/public-ip-addressing/
---

# Public IP Addressing

## Traffic Originating From NetBox Cloud

The Public IP addresses that outbound traffic from your NetBox Cloud instance (eg. webhooks) will be seen to be originating from are listed below. This will vary depending on the region that your instance is located in.   

You can whitelist these IP ranges so that inbound access from your NetBox Cloud instance(s) is restricted to just these addresses: 

### US-EAST-1

**IPv4**
```
3.225.69.195
3.233.255.24
34.231.51.53
```

**IPv6**
```
2600:1f18:462e:4c00::/56
```
### EU-WEST-1

**IPv4**
```
108.128.2.233
3.252.161.89
46.51.185.39
```

**IPv6**

```
2a05:d018:1128:7a00::/56
```

### EU-WEST-2

**IPv4**
```
13.42.148.73
18.132.136.73
18.132.221.240
```

**IPv6**
```
2a05:d01c:11e:a800::/56
```

### EU-CENTRAL-1

**IPv4**
```
3.64.103.189
3.78.107.243
35.159.178.138
```

**IPv6**
```
2a05:d014:10d2:3d00::/56
```

### US-WEST-2

**IPv4**
```
34.208.60.75
44.253.3.25
50.112.218.116
```

**IPv6**
```
2600:1f14:1a64:f600::/56
```
