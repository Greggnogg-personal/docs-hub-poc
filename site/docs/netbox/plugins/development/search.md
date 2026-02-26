---
tags:
  - administration
  - authentication
  - automation
  - community
  - dcim
  - netbox
canonical: /docs/netbox/plugins/development/search/
---
# Search

Plugins can define and register their own models to extend NetBox's core search functionality. Typically, a plugin will include a file named `search.py`, which holds all search indexes for its models (see the example below).

```python
# search.py
from netbox.search import SearchIndex
from .models import MyModel

class MyModelIndex(SearchIndex):
    model = MyModel
    fields = (
        ('name', 100),
        ('description', 500),
        ('comments', 5000),
    )
    display_attrs = ('site', 'device', 'status', 'description')
```

Fields listed in `display_attrs` will not be cached for search, but will be displayed alongside the object when it appears in global search results. This is helpful for conveying to the user additional information about an object.

To register one or more indexes with NetBox, define a list named `indexes` at the end of this file:

```python
indexes = [MyModelIndex]
```

:::tip
The path to the list of search indexes can be modified by setting `search_indexes` in the PluginConfig instance.

:::
### SearchIndex

Base class for building search indexes.

**Attributes:**

| Name | Type | Description |
| --- | --- | --- |
| model | Any | The model class for which this index is used. |
| category | Any | The label of the group under which this indexer is categorized (for form field display). If none, the name of the model's app will be used. |
| fields | Any | An iterable of two-tuples defining the model fields to be indexed and the weight associated with each. |
| display_attrs | Any | An iterable of additional object attributes to include when displaying search results. |

#### get_field_type(instance, field_name)

Return the data type of the specified model field.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| instance | Any | No description available | - |
| field_name | Any | No description available | - |

#### get_attr_type(instance, field_name)

Return the data type of the specified object attribute.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| instance | Any | No description available | - |
| field_name | Any | No description available | - |

#### get_field_value(instance, field_name)

Return the value of the specified model field as a string (or None).

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| instance | Any | No description available | - |
| field_name | Any | No description available | - |

#### to_cache(cls, instance, custom_fields=None)

Return a list of ObjectFieldValue representing the instance fields to be cached.

**Parameters:**

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| cls | Any | No description available | - |
| instance | Any | The instance being cached. | - |
| custom_fields | Any | An iterable of CustomFields to include when caching the instance. If None, all custom fields defined for the model will be included. (This can also be provided during bulk caching to avoid looking up the available custom fields for each instance.) | None |
