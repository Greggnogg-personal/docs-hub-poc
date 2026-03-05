---
tags:
  - administration
  - community
  - integration
  - netbox
canonical: /docs/netbox/plugins/development/event-types/
---
# Event Types

Plugins can register their own custom event types for use with NetBox [event rules](../../models/extras/eventrule.md). This is accomplished by calling the `register()` method on an instance of the `EventType` class. This can be done anywhere within the plugin. An example is provided below.

```python
from django.utils.translation import gettext_lazy as _
from netbox.events import EventType, EVENT_TYPE_KIND_SUCCESS

EventType(
    name='ticket_opened',
    text=_('Ticket opened'),
    kind=EVENT_TYPE_KIND_SUCCESS
).register()
```

### EventType

A type of event which can occur in NetBox. Event rules can be defined to automatically perform some action in response to an event.
