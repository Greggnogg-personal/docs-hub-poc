---
tags:
  - administration
  - automation
  - community
  - configuration
  - integration
  - netbox
canonical: /docs/netbox/plugins/development/dashboard-widgets/
---
# Dashboard Widgets

Each NetBox user can customize his or her personal dashboard by adding and removing widgets and by manipulating the size and position of each. Plugins can register their own dashboard widgets to complement those already available natively.

## The DashboardWidget Class

All dashboard widgets must inherit from NetBox's `DashboardWidget` base class. Subclasses must provide a `render()` method, and may override the base class' default characteristics.

Widgets which require configuration by a user must also include a `ConfigForm` child class which inherits from `WidgetConfigForm`. This form is used to render the user configuration options for the widget.

### DashboardWidget

Base class for custom dashboard widgets.

**Attributes:**

| Name | Type | Description |
| --- | --- | --- |
| description | Any | A brief, user-friendly description of the widget's function |
| default_title | Any | The string to show for the widget's title when none has been specified. |
| default_config | Any | Default configuration parameters, as a dictionary mapping |
| width | Any | The widget's default width (1 to 12) |
| height | Any | The widget's default height; the number of rows it consumes |

#### ConfigForm

**Bases:** WidgetConfigForm

The widget's configuration form.

#### render(request)

This method is called to render the widget's content.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| request | Any | The current request | - |

## Widget Registration

To register a dashboard widget for use in NetBox, import the `register_widget()` decorator and use it to wrap each `DashboardWidget` subclass:

```python
from extras.dashboard.widgets import DashboardWidget, register_widget

@register_widget
class MyWidget1(DashboardWidget):
    ...

@register_widget
class MyWidget2(DashboardWidget):
    ...
```

## Example

```python
from django import forms
from extras.dashboard.utils import register_widget
from extras.dashboard.widgets import DashboardWidget, WidgetConfigForm


@register_widget
class ReminderWidget(DashboardWidget):
    default_title = 'Reminder'
    description = 'Add a virtual sticky note'

    class ConfigForm(WidgetConfigForm):
        content = forms.CharField(
            widget=forms.Textarea()
        )

    def render(self, request):
        return self.config.get('content')
```

## Initialization

To register the widget, it becomes essential to import the widget module. The recommended approach is to accomplish this within the `ready` method situated in your `PluginConfig`:

```python
class FooBarConfig(PluginConfig):
    def ready(self):
        super().ready()
        from . import widgets  # point this to the above widget module you created
```
