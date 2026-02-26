---
tags:
  - community
  - cloud
  - enterprise
lastUpdatedAt: 1740488502000
canonical: /docs/orb-agent/configs/local/
---
# Local
Local config manager retrieves policies from the local configuration file passed to the agent.
It does not require any specific configuration, it just needs to be activated and config file passed.

```yaml
orb:
  config_manager:
    active: local
  ...
```

