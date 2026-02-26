---
tags:
  - api
  - automation
  - community
  - dcim
  - netbox
  - tenancy
canonical: /docs/netbox/plugins/development/forms/
---
# Forms

## Form Classes

NetBox provides several base form classes for use by plugins. Additional form classes are also available for other standard base model classes (PrimaryModel, OrganizationalModel, and NestedGroupModel).

| Form Class                 | Purpose                              |
|----------------------------|--------------------------------------|
| `NetBoxModelForm`          | Create/edit individual objects       |
| `NetBoxModelImportForm`    | Bulk import objects from CSV data    |
| `NetBoxModelBulkEditForm`  | Edit multiple objects simultaneously |
| `NetBoxModelFilterSetForm` | Filter objects within a list view   |

### `NetBoxModelForm`

This is the base form for creating and editing NetBox models. It extends Django's ModelForm to add support for tags and custom fields.

| Attribute   | Description                                                                           |
|-------------|---------------------------------------------------------------------------------------|
| `fieldsets` | A tuple of `FieldSet` instances which control how form fields are rendered (optional) |

#### Subclasses

The corresponding model-specific subclasses of `NetBoxModelForm` are documented below.

| Model Class           | Form Class                |
|-----------------------|---------------------------|
| `PrimaryModel`        | `PrimaryModelForm`        |
| `OrganizationalModel` | `OrganizationalModelForm` |
| `NestedGroupModel`    | `NestedGroupModelForm`    |

#### Example

```python
from django.utils.translation import gettext_lazy as _
from dcim.models import Site
from netbox.forms import NetBoxModelForm
from utilities.forms.fields import CommentField, DynamicModelChoiceField
from utilities.forms.rendering import FieldSet
from .models import MyModel

class MyModelForm(NetBoxModelForm):
    site = DynamicModelChoiceField(
        queryset=Site.objects.all()
    )
    comments = CommentField()
    fieldsets = (
        FieldSet('name', 'status', 'site', 'tags', name=_('Model Stuff')),
        FieldSet('tenant_group', 'tenant', name=_('Tenancy')),
    )

    class Meta:
        model = MyModel
        fields = ('name', 'status', 'site', 'comments', 'tags')
```

:::tip[Comment fields]
If your form has a `comments` field, there's no need to list it; this will always appear last on the page.

:::
### `NetBoxModelImportForm`

This form facilitates the bulk import of new objects from CSV, JSON, or YAML data. As with model forms, you'll need to declare a `Meta` subclass specifying the associated `model` and `fields`. NetBox also provides several form fields suitable for importing various types of CSV data, listed [below](#csv-import-fields).

#### Subclasses

The corresponding model-specific subclasses of `NetBoxModelImportForm` are documented below.

| Model Class           | Form Class                      |
|-----------------------|---------------------------------|
| `PrimaryModel`        | `PrimaryModelImportForm`        |
| `OrganizationalModel` | `OrganizationalModelImportForm` |
| `NestedGroupModel`    | `NestedGroupModelImportForm`    |

#### Example

```python
from django.utils.translation import gettext_lazy as _
from dcim.models import Site
from netbox.forms import NetBoxModelImportForm
from utilities.forms import CSVModelChoiceField
from .models import MyModel


class MyModelImportForm(NetBoxModelImportForm):
    site = CSVModelChoiceField(
        queryset=Site.objects.all(),
        to_field_name='name',
        help_text=_('Assigned site')
    )

    class Meta:
        model = MyModel
        fields = ('name', 'status', 'site', 'comments')
```

### `NetBoxModelBulkEditForm`

This form facilitates editing multiple objects in bulk. Unlike a model form, this form does not have a child `Meta` class, and must explicitly define each field. All fields in a bulk edit form are generally declared with `required=False`.

| Attribute         | Description                                                                                 |
|-------------------|---------------------------------------------------------------------------------------------|
| `model`           | The model of object being edited                                                            |
| `fieldsets`       | A tuple of `FieldSet` instances which control how form fields are rendered (optional)       |
| `nullable_fields` | A tuple of fields which can be nullified (set to empty) using the bulk edit form (optional) |

#### Subclasses

The corresponding model-specific subclasses of `NetBoxModelBulkEditForm` are documented below.

| Model Class           | Form Class                        |
|-----------------------|-----------------------------------|
| `PrimaryModel`        | `PrimaryModelBulkEditForm`        |
| `OrganizationalModel` | `OrganizationalModelBulkEditForm` |
| `NestedGroupModel`    | `NestedGroupModelBulkEditForm`    |

#### Example

```python
from django import forms
from django.utils.translation import gettext_lazy as _
from dcim.models import Site
from netbox.forms import NetBoxModelBulkEditForm
from utilities.forms import CommentField, DynamicModelChoiceField
from utilities.forms.rendering import FieldSet
from .models import MyModel, MyModelStatusChoices


class MyModelBulkEditForm(NetBoxModelBulkEditForm):
    name = forms.CharField(
        required=False
    )
    status = forms.ChoiceField(
        choices=MyModelStatusChoices,
        required=False
    )
    site = DynamicModelChoiceField(
        queryset=Site.objects.all(),
        required=False
    )
    comments = CommentField()

    model = MyModel
    fieldsets = (
        FieldSet('name', 'status', 'site', name=_('Model Stuff')),
    )
    nullable_fields = ('site', 'comments')
```

### `NetBoxModelFilterSetForm`

This form class is used to render a form expressly for filtering a list of objects. Its fields should correspond to filters defined on the model's filter set.

| Attribute   | Description                                                                           |
|-------------|---------------------------------------------------------------------------------------|
| `model`     | The model of object being edited                                                      |
| `fieldsets` | A tuple of `FieldSet` instances which control how form fields are rendered (optional) |

#### Subclasses

The corresponding model-specific subclasses of `NetBoxModelFilterSetForm` are documented below.

| Model Class           | Form Class                         |
|-----------------------|------------------------------------|
| `PrimaryModel`        | `PrimaryModelFilterSetForm`        |
| `OrganizationalModel` | `OrganizationalModelFilterSetForm` |
| `NestedGroupModel`    | `NestedGroupModelFilterSetForm`    |

#### Example

```python
from dcim.models import Site
from netbox.forms import NetBoxModelFilterSetForm
from utilities.forms import DynamicModelMultipleChoiceField, MultipleChoiceField
from .models import MyModel, MyModelStatusChoices

class MyModelFilterForm(NetBoxModelFilterSetForm):
    site_id = DynamicModelMultipleChoiceField(
        queryset=Site.objects.all(),
        required=False
    )
    status = MultipleChoiceField(
        choices=MyModelStatusChoices,
        required=False
    )

    model = MyModel
```

## General Purpose Fields

In addition to the [form fields provided by Django](https://docs.djangoproject.com/en/stable/ref/forms/fields/), NetBox provides several field classes for use within forms to handle specific types of data. These can be imported from `utilities.forms.fields` and are documented below.

### ColorField

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

### CommentField

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

### JSONField

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

### MACAddressField

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

### SlugField

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

## Dynamic Object Fields

### DynamicModelChoiceField

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

### DynamicModelMultipleChoiceField

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

## Content Type Fields

### ContentTypeChoiceField

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

### ContentTypeMultipleChoiceField

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

## CSV Import Fields

### CSVChoiceField

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

### CSVMultipleChoiceField

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

### CSVModelChoiceField

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

### CSVContentTypeField

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

### CSVMultipleContentTypeField

This class provides specific functionality for NetBox plugin development. Refer to the NetBox source code for detailed implementation.

## Form Rendering

### FieldSet

A generic grouping of fields, with an optional name. Each item will be rendered on its own row under the provided heading (name), if any. The following types may be passed as items: * Field name (string) * InlineFields instance * TabbedGroups instance * ObjectAttribute instance

### InlineFields

A set of fields rendered inline (side-by-side) with a shared label.

### TabbedGroups

Two or more groups of fields (FieldSets) arranged under tabs among which the user can toggle.

### ObjectAttribute

Renders the value for a specific attribute on the form's instance. This may be used to display a read-only value and convey additional context to the user. If the attribute has a `get_absolute_url()` method, it will be rendered as a hyperlink.
