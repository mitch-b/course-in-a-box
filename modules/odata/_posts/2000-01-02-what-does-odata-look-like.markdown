---
title: What Does OData Look Like?
published: true
---

# What does OData look like?

For a quick re-cap, you should know, to follow the REST standard, working with entities involves talking different VERBS to your server resource. The verbs supported by OData (as of v2) are:

- `GET`: Get a collection of entities (as a feed document) or a single entity (as an entry document).
- `POST`: Create a new entity from data sent in request.
- `PUT`: Update an existing entity from data set in request (all attributes set).
- `PATCH(/MERGE)`: Update an existing entity from data set in request (only need changed attributes).
- `DELETE`: Remove an entity.

Along with the verbs (or HTTP methods) above, an OData request will also include a URI. A URI (Uniform Resource Identifier) in simple terms is an address of a resource. Just like you would have your own postal address to identify you on Earth (or wherever you're from), any online resource will have their own address to identify it. For our example, we'll say we're managing products over HTTPS scheme at authority server.com with a path of /odata/Products :

`https://server.com/odata/Products`

As you'd expect, we can interact with this entity using any of the HTTP methods above (if they are implemented by your service). Here are some example calls and responses.

### `GET https://server.com/odata/Products`

*Response (200 OK):*

```json
{ "d": { "results": [
    {
        "id": "https://server.com/odata/Products(1)",
        "Id": "1",
        "Category": "Meat",
        "name": "Slim Jim Beef Stick"
    },
    {
        "id": "https://server.com/odata/Products(2)",
        "Id": "2",
        "Category": "Not meat",
        "name": "Poppycock Almond"
    }
]}}
```

### `GET https://server.com/odata/Products(1)`

*Response (200 OK): *

```json
{ "d": {

        "id": "https://server.com/odata/Products(1)",
        "Id": "1",
        "Category": "Meat",
        "name": "Slim Jim Beef Stick"
    }
}
```

### `POST https://server.com/odata/Products`

Send data:
```json
{
    "Category": "Meat",
    "name": "Slim Jim Extra Spicy Beef Stick"
}
```
*Response (201 Created):*

```json
{ "d": {

        "id": "https://server.com/odata/Products(3)",
        "Id": "3",
        "Category": "Meat",
        "name": "Slim Jim Extra Spicy Beef Stick"
    }
}
```

The true power of OData can be seen in our ability to filter, or query, data in the HTTP query string.

A request to `https://server.com/odata/Products?$filter= Category eq 'Meat'`

*Response (200 OK): *
```json
{ "d": { "results": [
    {
        "id": "https://server.com/odata/Products(1)",
        "Id": "1",
        "Category": "Meat",
        "name": "Slim Jim Beef Stick"
    },
    {
        "id": "https://server.com/odata/Products(3)",
        "Id": "3",
        "Category": "Meat",
        "name": "Slim Jim Extra Spicy Beef Stick"
    }
]}}
```

Or, how about `https://server.com/odata/Products?$filter= startswith(name, 'Slim')`

*Response (200 OK): *
```json
{ "d": { "results": [
    {
        "id": "https://server.com/odata/Products(1)",
        "Id": "1",
        "Category": "Meat",
        "name": "Slim Jim Beef Stick"
    },
    {
        "id": "https://server.com/odata/Products(3)",
        "Id": "3",
        "Category": "Meat",
        "name": "Slim Jim Extra Spicy Beef Stick"
    }
]}}
```

By changing the Accept header of your HTTPS Request, you can get `JSON Light`, `JSON Verbose`, or `AtomPub XML`. Examples:

- `Accept: application/json;odata=verbose` (OData v2 Compatible)
- `Accept: application/json;odata=light` (OData v3-4 Compatible)
- `Accept: application/json` (use OData version compatible)
- `Accept: application/xml`
- `Accept: application/atom+xml`


According to the OData v3 spec, `MaxDataServiceVersion` request header of v2.0 should force an `application/json` accept header to return a JSON Verbose result (since JSON light was introduced as default in v3). We will address this particular point later in the lab.
