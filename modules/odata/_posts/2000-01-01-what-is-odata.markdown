---
title: What is OData?
published: true
---

# What is OData?

## Definitions

> OData (Open Data Protocol) is an OASIS standard that defines the best practice for building and consuming RESTful APIs. OData helps you focus on your business logic while building RESTful APIs without having to worry about the approaches to define request and response headers, status codes, HTTP methods, URL conventions, media types, payload formats and query options etc. OData also guides you about tracking changes, defining functions/actions for reusable procedures and sending asynchronous/batch requests etc. Additionally, OData provides facility for extension to fulfil any custom needs of your RESTful APIs.
>
> OData RESTful APIs are easy to consume. The OData metadata, a machine-readable description of the data model of the APIs, enables the creation of powerful generic client proxies and tools.
>
> -- <cite>odata.org</cite>

This summary tells us that OData is useful to developers in that we can ensure we adhere to Web standards (using HTTP verbs appropriately, and request attributes) without spending much time configuring the service endpoints. Given a database resource (like a table for an entity), for instance, we can generate and expose an entire entity which supports all CRUD operations.

Yes, we can already do that today using frameworks like ASP.NET MVC and Web API. However, what we gain with OData also includes powerful query tools over HTTP. That means, we don't need any special drivers to read and sort through data at these endpoints - all this is done over the HTTP requests. If a client can speak HTTP, it can use OData. This makes it an extensible tool and easily consumable.
