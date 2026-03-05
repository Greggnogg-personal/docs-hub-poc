---
tags:
  - administration
  - authentication
  - community
  - configuration
  - dcim
  - netbox
canonical: /docs/netbox/plugins/development/views/
---
# Views

## Writing Basic Views

If your plugin will provide its own page or pages within the NetBox web UI, you'll need to define views. A view is a piece of business logic which performs an action and/or renders a page when a request is made to a particular URL. HTML content is rendered using a [template](./templates.md). Views are typically defined in `views.py`, and URL patterns in `urls.py`.

As an example, let's write a view which displays a random animal and the sound it makes. We'll use Django's generic `View` class to minimize the amount of boilerplate code needed.

```python
from django.shortcuts import render
from django.views.generic import View
from .models import Animal

class RandomAnimalView(View):
    """
    Display a randomly-selected animal.
    """
    def get(self, request):
        animal = Animal.objects.order_by('?').first()
        return render(request, 'netbox_animal_sounds/animal.html', {
            'animal': animal,
        })
```

This view retrieves a random Animal instance from the database and passes it as a context variable when rendering a template named `animal.html`. HTTP `GET` requests are handled by the view's `get()` method, and `POST` requests are handled by its `post()` method.

Our example above is extremely simple, but views can do just about anything. They are generally where the core of your plugin's functionality will reside. Views also are not limited to returning HTML content: A view could return a CSV file or image, for instance. For more information on views, see the [Django documentation](https://docs.djangoproject.com/en/stable/topics/class-based-views/).

### URL Registration

To make the view accessible to users, we need to register a URL for it. We do this in `urls.py` by defining a `urlpatterns` variable containing a list of paths.

```python
from django.urls import path
from . import views

urlpatterns = [
    path('random/', views.RandomAnimalView.as_view(), name='random_animal'),
]
```

A URL pattern has three components:

* `route` - The unique portion of the URL dedicated to this view
* `view` - The view itself
* `name` - A short name used to identify the URL path internally

This makes our view accessible at the URL `/plugins/animal-sounds/random/`. (Remember, our `AnimalSoundsConfig` class sets our plugin's base URL to `animal-sounds`.) Viewing this URL should show the base NetBox template with our custom content inside it.

## NetBox Model Views

NetBox provides several generic view classes and additional helper functions, to simplify the implementation of plugin logic. These are recommended to be used whenever possible to keep the maintenance overhead of plugins low.

### View Classes

Generic view classes (documented below) facilitate common operations, such as creating, viewing, modifying, and deleting objects. Plugins can subclass these views for their own use.

| View Class           | Description                                            |
|----------------------|--------------------------------------------------------|
| `ObjectView`         | View a single object                                   |
| `ObjectEditView`     | Create or edit a single object                         |
| `ObjectDeleteView`   | Delete a single object                                 |
| `ObjectChildrenView` | A list of child objects within the context of a parent |
| `ObjectListView`     | View a list of objects                                 |
| `BulkImportView`     | Import a set of new objects                            |
| `BulkEditView`       | Edit multiple objects                                  |
| `BulkRenameView`     | Rename multiple objects                                |
| `BulkDeleteView`     | Delete multiple objects                                |

:::warning
Please note that only the classes which appear in this documentation are currently supported. Although other classes may be present within the `views.generic` module, they are not yet supported for use by plugins.

:::
### URL registration

The NetBox URL registration process has two parts:

1. View classes can be decorated with `@register_model_view()`. This registers a new URL for the model.
2. All of a model's URLs can be included in `urls.py` using the `get_model_urls()` function. This call is usually required twice: once to import general views for the model and again to import model detail views tied to the object's primary key.

### register_model_view

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

:::note[Changed in NetBox v4.2]
In NetBox v4.2, the `register_model_view()` function was extended to support the registration of list views by passing `detail=False`.

:::
### get_model_urls

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

:::note[Changed in NetBox v4.2]
In NetBox v4.2, the `get_model_urls()` function was extended to support retrieving registered general model views (e.g. for listing objects) by passing `detail=False`.

:::
### Example Usage

```python
# views.py
from netbox.views.generic import ObjectEditView
from utilities.views import register_model_view
from .models import Thing

@register_model_view(Thing, name='add', detail=False)
@register_model_view(Thing, name='edit')
class ThingEditView(ObjectEditView):
    queryset = Thing.objects.all()
    template_name = 'myplugin/thing.html'
    ...
```

```python
# urls.py
from django.urls import include, path
from utilities.urls import get_model_urls

urlpatterns = [
    path('thing/', include(get_model_urls('myplugin', 'thing', detail=False))),
    path('thing/`<int:pk>`/', include(get_model_urls('myplugin', 'thing'))),
    ...
]
```

## Object Views

Below are the class definitions for NetBox's object views. These views handle CRUD actions for individual objects. The view, add/edit, and delete views each inherit from `BaseObjectView`, which is not intended to be used directly.

### BaseObjectView

**Bases:** ObjectPermissionRequiredMixin, View

Base class for generic views which display or manipulate a single object.

**Attributes:**

| Name | Type | Description |
| --- | --- | --- |
| queryset | Any | Django QuerySet from which the object(s) will be fetched |
| template_name | Any | The name of the HTML template file to render |

#### get_queryset(request)

Return the base queryset for the view.
By default, this returns `self.queryset.all()`.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| request | Any | The current request | - |

#### get_object(**kwargs)

Return the object being viewed or modified.
The object is identified by an arbitrary set of keyword arguments gleaned from the URL, which are passed to `get_object_or_404()`.
(Typically, only a primary key is needed.) If no matching object is found, return a 404 response.

#### get_extra_context(request, instance)

Return any additional context data to include when rendering the template.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| request | Any | The current request | - |
| instance | Any | The object being viewed | - |

### ObjectView

**Bases:** ActionsMixin, BaseObjectView

Retrieve a single object for display. Note: If `template_name` is not specified, it will be determined automatically based on the queryset model.

**Attributes:**

| Name | Type | Description |
| --- | --- | --- |
| layout | Any | An instance of `netbox.ui.layout.Layout` which defines the page layout (overrides HTML template) |
| tab | Any | A ViewTab instance for the view |
| actions | Any | An iterable of ObjectAction subclasses (see ActionsMixin) |

#### get_template_name()

Return self.template_name if defined.
Otherwise, dynamically resolve the template name using the queryset model's `app_label` and `model_name`.

#### get(request, **kwargs)

GET request handler.
`*args` and `**kwargs` are passed to identify the object being queried.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| request | Any | The current request | - |

### ObjectEditView

**Bases:** GetReturnURLMixin, BaseObjectView

Create or edit a single object.

**Attributes:**

| Name | Type | Description |
| --- | --- | --- |
| form | Any | The form used to create or edit the object |

#### get_object(**kwargs)

Return an object for editing.
If no keyword arguments have been specified, this will be a new instance.

#### alter_object(obj, request, url_args, url_kwargs)

Provides a hook for views to modify an object before it is processed.
For example, a parent object can be defined given some parameter from the request URL.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| obj | Any | The object being edited | - |
| request | Any | The current request | - |
| url_args | Any | URL path args | - |
| url_kwargs | Any | URL path kwargs | - |

#### get_extra_addanother_params(request)

Return a dictionary of extra parameters to use on the Add Another button.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| request | Any | No description available | - |

#### get(request, *args, **kwargs)

GET request handler.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| request | Any | The current request | - |

#### post(request, *args, **kwargs)

POST request handler.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| request | Any | The current request | - |

### ObjectDeleteView

**Bases:** GetReturnURLMixin, BaseObjectView

Delete a single object.

#### get(request, *args, **kwargs)

GET request handler.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| request | Any | The current request | - |

#### post(request, *args, **kwargs)

POST request handler.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| request | Any | The current request | - |

### ObjectChildrenView

**Bases:** ObjectView, ActionsMixin, TableMixin

Display a table of child objects associated with the parent object. For example, NetBox uses this to display the set of child IP addresses within a parent prefix.

**Attributes:**

| Name | Type | Description |
| --- | --- | --- |
| child_model | Any | The model class which represents the child objects |
| table | Any | The django-tables2 Table class used to render the child objects list |
| filterset | Any | A django-filter FilterSet that is applied to the queryset |
| filterset_form | Any | The form class used to render filter options |
| actions | Any | An iterable of ObjectAction subclasses (see ActionsMixin) |

#### get_children(request, parent)

Return a QuerySet of child objects.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| request | Any | The current request | - |
| parent | Any | The parent object | - |

#### prep_table_data(request, queryset, parent)

Provides a hook for subclassed views to modify data before initializing the table.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| request | Any | The current request | - |
| queryset | Any | The filtered queryset of child objects | - |
| parent | Any | The parent object | - |

#### get(request, *args, **kwargs)

GET handler for rendering child objects.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| request | Any | No description available | - |

## Multi-Object Views

Below are the class definitions for NetBox's multi-object views. These views handle simultaneous actions for sets objects. The list, import, edit, and delete views each inherit from `BaseMultiObjectView`, which is not intended to be used directly.

### BaseMultiObjectView

**Bases:** ObjectPermissionRequiredMixin, View

Base class for generic views which display or manipulate multiple objects.

**Attributes:**

| Name | Type | Description |
| --- | --- | --- |
| queryset | Any | Django QuerySet from which the object(s) will be fetched |
| table | Any | The django-tables2 Table class used to render the objects list |
| template_name | Any | The name of the HTML template file to render |

#### get_queryset(request)

Return the base queryset for the view.
By default, this returns `self.queryset.all()`.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| request | Any | The current request | - |

#### get_extra_context(request)

Return any additional context data to include when rendering the template.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| request | Any | The current request | - |

### ObjectListView

**Bases:** BaseMultiObjectView, ActionsMixin, TableMixin

Display multiple objects, all the same type, as a table.

**Attributes:**

| Name | Type | Description |
| --- | --- | --- |
| filterset | Any | A django-filter FilterSet that is applied to the queryset |
| filterset_form | Any | The form class used to render filter options |
| actions | Any | An iterable of ObjectAction subclasses (see ActionsMixin) |

#### export_yaml()

Export the queryset of objects as concatenated YAML documents.

#### export_table(table, columns=None, filename=None, delimiter=None)

Export all table data in CSV format.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| table | Any | The Table instance to export | - |
| columns | Any | A list of specific columns to include. If None, all columns will be exported. | None |
| filename | Any | The name of the file attachment sent to the client. If None, will be determined automatically from the queryset model name. | None |
| delimiter | Any | The character used to separate columns (a comma is used by default) | None |

#### export_template(template, request)

Render an ExportTemplate using the current queryset.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| template | Any | ExportTemplate instance | - |
| request | Any | The current request | - |

#### get(request)

GET request handler.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| request | Any | The current request | - |

### BulkImportView

**Bases:** GetReturnURLMixin, BaseMultiObjectView

Import objects in bulk (CSV/JSON/YAML format).

**Attributes:**

| Name | Type | Description |
| --- | --- | --- |
| model_form | Any | The form used to create each imported object |

#### prep_related_object_data(parent, data)

Hook to modify the data for related objects before it's passed to the related object form (for example, to assign a parent object).

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| parent | Any | No description available | - |
| data | Any | No description available | - |

#### save_object(object_form, request)

Provide a hook to modify the object immediately before saving it (e.g.
to encrypt secret data).

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| object_form | Any | The model form instance | - |
| request | Any | The current request | - |

### BulkEditView

**Bases:** GetReturnURLMixin, BaseMultiObjectView

Edit objects in bulk.

**Attributes:**

| Name | Type | Description |
| --- | --- | --- |
| filterset | Any | FilterSet to apply when deleting by QuerySet |
| form | Any | The form class used to edit objects in bulk |

#### post_save_operations(form, obj)

This method is called for each object in _update_objects.
Override to perform additional object-level operations that are specific to a particular ModelForm.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| form | Any | No description available | - |
| obj | Any | No description available | - |

### BulkRenameView

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

### BulkDeleteView

**Bases:** GetReturnURLMixin, BaseMultiObjectView

Delete objects in bulk.

**Attributes:**

| Name | Type | Description |
| --- | --- | --- |
| filterset | Any | FilterSet to apply when deleting by QuerySet |
| table | Any | The table used to display devices being deleted |

## Feature Views

These views are provided to enable or enhance certain NetBox model features, such as change logging or journaling. These typically do not need to be subclassed: They can be used directly e.g. in a URL path.

:::note
These feature views are automatically registered for all models that implement the respective feature.  There is usually no need to override them. However, if that's the case, the URL must be registered manually in `urls.py` instead of using the `register_model_view()` function or decorator.

:::
### ObjectChangeLogView

**Bases:** ConditionalLoginRequiredMixin, View

Present a history of changes made to a particular object. The model class must be passed as a keyword argument when referencing this view in a URL path. For example: path('sites/``<int:pk>``/changelog/', ObjectChangeLogView.as_view(), name='site_changelog', kwargs=\{'model': 'Site'\}),

**Attributes:**

| Name | Type | Description |
| --- | --- | --- |
| base_template | Any | The name of the template to extend. If not provided, "`{app}/{model}.html`" will be used. |

### ObjectJournalView

**Bases:** ConditionalLoginRequiredMixin, View

Show all journal entries for an object. The model class must be passed as a keyword argument when referencing this view in a URL path. For example: path('sites/``<int:pk>``/journal/', ObjectJournalView.as_view(), name='site_journal', kwargs=\{'model': 'Site'\}),

**Attributes:**

| Name | Type | Description |
| --- | --- | --- |
| base_template | Any | The name of the template to extend. If not provided, "`{app}/{model}.html`" will be used. |

## Extending Core Views

### Additional Tabs

Plugins can "attach" a custom view to a NetBox model by registering it with `register_model_view()`. To include a tab for this view within the NetBox UI, declare a TabView instance named `tab`, and add it to the template context dict:

```python
from dcim.models import Site
from myplugin.models import Stuff
from netbox.views import generic
from utilities.views import ViewTab, register_model_view

@register_model_view(Site, name='myview', path='some-other-stuff')
class MyView(generic.ObjectView):
    ...
    tab = ViewTab(
        label='Other Stuff',
        badge=lambda obj: Stuff.objects.filter(site=obj).count(),
        permission='myplugin.view_stuff'
    )

    def get(self, request, pk):
        ...
        return render(
            request,
            "myplugin/mytabview.html",
            context={
                "tab": self.tab,
            },
        )
```

### ViewTab

ViewTabs are used for navigation among multiple object-specific views, such as the changelog or journal for a particular object.

#### render(instance)

Return the attributes needed to render a tab in HTML if the tab should be displayed.
Otherwise, return None.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| instance | Any | No description available | - |

### Extra Template Content

Plugins can inject custom content into certain areas of core NetBox views. This is accomplished by subclassing `PluginTemplateExtension`, optionally designating one or more particular NetBox models, and defining the desired method(s) to render custom content. Five methods are available:

| Method              | View        | Description                                         |
|---------------------|-------------|-----------------------------------------------------|
| `head()`            | All         | Custom HTML `<head>` block includes                 |
| `navbar()`          | All         | Inject content inside the top navigation bar        |
| `list_buttons()`    | List view   | Add buttons to the top of the page                  |
| `buttons()`         | Object view | Add buttons to the top of the page                  |
| `alerts()`          | Object view | Inject content at the top of the page               |
| `left_page()`       | Object view | Inject content on the left side of the page         |
| `right_page()`      | Object view | Inject content on the right side of the page        |
| `full_width_page()` | Object view | Inject content across the entire bottom of the page |

Additionally, a `render()` method is available for convenience. This method accepts the name of a template to render, and any additional context data you want to pass. Its use is optional, however.

To control where the custom content is injected, plugin authors can specify an iterable of models by overriding the `models` attribute on the subclass. Extensions which do not specify a set of models will be invoked on every view, where supported.

When a PluginTemplateExtension is instantiated, context data is assigned to `self.context`. Available data includes:

* `object` - The object being viewed (object views only)
* `model` - The model of the list view (list views only)
* `request` - The current request
* `settings` - Global NetBox settings
* `config` - Plugin-specific configuration parameters

For example, accessing `{\{ request.user \}}` within a template will return the current user.

Declared subclasses should be gathered into a list or tuple for integration with NetBox. By default, NetBox looks for an iterable named `template_extensions` within a `template_content.py` file. (This can be overridden by setting `template_extensions` to a custom value on the plugin's PluginConfig.) An example is below.

```python
from netbox.plugins import PluginTemplateExtension
from .models import Animal

class SiteAnimalCount(PluginTemplateExtension):
    models = ['dcim.site']

    def right_page(self):
        return self.render('netbox_animal_sounds/inc/animal_count.html', extra_context={
            'animal_count': Animal.objects.count(),
        })

template_extensions = [SiteAnimalCount]
```
