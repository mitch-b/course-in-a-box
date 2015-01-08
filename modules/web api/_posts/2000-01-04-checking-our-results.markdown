---
title: Running the OData Service
published: true
---

# Running the OData Service

1. Click Start in the toolbar to run your Web Application.
2. You will get a forbidden message, because right now we have no root resource for IIS to display. Let's navigate to our Todos resource entity set using Google Chrome or Mozilla Firefox.

> Internet Explorer (if JSON result) will automatically ask you to download the response. Just makes it slightly more inconvenient.

    [http://localhost:your-port-number/odata/Todos](http://localhost:your-port-number/odata/Todos)

3. (Optional) Alternatively, you can use an extension like Postman for Chrome (recommended), or REST client for Firefox.

Try several OData calls:

    [http://localhost:your-port-number/odata/Todos(1)](http://localhost:your-port-number/odata/Todos(1))

    [http://localhost:your-port-number/odata/Todos(1)/UserCompletedBy](http://localhost:your-port-number/odata/Todos(1)/UserCompletedBy)

    [http://localhost:your-port-number/odata/Todos?$filter= Completed eq false](http://localhost:your-port-number/odata/Todos?$filter= Completed eq false)

    [http://localhost:your-port-number/odata/Todos?$filter= Finished eq false](http://localhost:your-port-number/odata/Todos?$filter= Finished eq false)
    [http://localhost:your-port-number/odata/Todos?$filter= Finished eq true](http://localhost:your-port-number/odata/Todos?$filter= Finished eq true)

    [http://localhost:your-port-number/odata/Todos/$count](http://localhost:your-port-number/odata/Todos/$count)
    [http://localhost:your-port-number/odata/Todos?$format=json](http://localhost:your-port-number/odata/Todos?$format=json)

You'll notice `$count` and `$format` are not supported. We'll check on those in the next section.
