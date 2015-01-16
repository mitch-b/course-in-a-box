---
title: Supporting $format
published: true
---

# Enabling $format in Web API OData v1-3

Oddly enough, `$format` is supported across all OData specs v1-3. However, ASP.NET Web API OData v1-3 does not support this query option. This feature is added in the query parameters of your request.

`https://server.com/odata/Todos?$format=application/json`

If the server supports it, it will try and format its response in the requested format. However, Web API will give you an exception if you try this now.

The query specified in the URI is not valid. `Query option 'Format' is not allowed. To allow it, set the 'AllowedQueryOptions' property on EnableQueryAttribute or QueryValidationSettings.`

Let's create a new Message Handler. Since this is a query string parameter and not a route, the quickest way to deal with this is to read incoming messages coming into the server. You can tie into Message Handlers in Web API to capture the request and set the appropriate accept header based on the $format attribute. (See OData spec on `$format`).


<br />

## Sorry, you have hit the end of this module. This is still a work in progress.
