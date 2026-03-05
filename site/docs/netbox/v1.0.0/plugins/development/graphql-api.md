---
tags:
  - api
  - authentication
  - community
  - configuration
  - netbox
  - operations
canonical: /docs/netbox/plugins/development/graphql-api/
---
# GraphQL API

## Defining the Schema Class

A plugin can extend NetBox's GraphQL API by registering its own schema class. By default, NetBox will attempt to import `graphql.schema` from the plugin, if it exists. This path can be overridden by defining `graphql_schema` on the PluginConfig instance as the dotted path to the desired Python class.

### Example

```python
# graphql.py
import strawberry
import strawberry_django

from . import models


@strawberry_django.type(
    models.MyModel,
    fields='__all__',
)
class MyModelType:
    pass


@strawberry.type
class MyQuery:
    @strawberry.field
    def dummymodel(self, id: int) -> DummyModelType:
        return None
    dummymodel_list: list[DummyModelType] = strawberry_django.field()


schema = [
    MyQuery,
]
```

## GraphQL Objects

NetBox provides two object type classes for use by plugins.

### BaseObjectType

Base GraphQL object type for all NetBox objects. Restricts the model queryset to enforce object permissions.

### NetBoxObjectType

**Bases:** ChangelogMixin, CustomFieldsMixin, JournalEntriesMixin, TagsMixin, BaseObjectType

Provides functionality for NetBox plugin development.

## GraphQL Filters

NetBox provides a base filter class for use by plugins which employ subclasseses of `NetBoxModel`.

### NetBoxModelFilter

**Bases:** CustomFieldsFilterMixin, JournalEntriesFilterMixin, TagsFilterMixin, ChangeLoggingMixin, BaseModelFilter

Provides functionality for NetBox plugin development.

Additionally, the following filter classes are available for subclasses of standard base models.

| Model Class           | FilterSet Class                                    |
|-----------------------|----------------------------------------------------|
| `PrimaryModel`        | `netbox.graphql.filters.PrimaryModelFilter`        |
| `OrganizationalModel` | `netbox.graphql.filters.OrganizationalModelFilter` |
| `NestedGroupModel`    | `netbox.graphql.filters.NestedGroupModelFilter`    |
