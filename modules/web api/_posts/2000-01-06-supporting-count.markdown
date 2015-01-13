---
title: Supporting $count
published: true
---

# Enabling $count in Web API OData v1-3

`$count` is actually a part of OData v3 specification, which is similar to `$inlinecount` of OData v2 specification. `$count` must return a single integer value in the response. `$inlinecount` will return total count of entity set along with the entity set itself in the response. Both have their uses, however when working with SAPUI5, `$count` is expected to be supported. Which is interesting, because SAP NetWeaver Gateway only produces OData v2 services. Regardless, it is a feature that we need to implement. Let's take a look.

`https://server.com/odata/Todos/$count`

_Response (200 OK, text/plain):_

```
2
```

In Web API OData, you can implement your own OData path handler which implements the `IODataPathHandler` interface. In this way, we can take over the handler to check if our valid route is `$count`, then simply return an integer value of the entity set length. This can be set as a property of `MapODataServiceRoute` in `WebApiConfig` which we added earlier when registering our OData routes.

1. Create a new folder called Helpers in the root of your project
1. Add a new Class in the folder. Name it `CountPathSegment.cs`

In order to have a valid path segment, we must declare a type which inherits from `ODataPathSegment`. This custom path segment will let Web API know information about the path segment name (`$count`), `IEdmType` (`Edm.Int32`, per OData v3 specification), and entity set (derive from controller).

```csharp
using Microsoft.Data.Edm;
using Microsoft.Data.Edm.Library;
using System.Web.Http.OData.Routing;

namespace ODataLab1.Helpers
{
    public class CountPathSegment : ODataPathSegment
    {
        public override string SegmentKind
        {
            get
            {
                return "$count";
            }
        }

        public override IEdmType GetEdmType(IEdmType previousEdmType)
        {
            return EdmCoreModel.Instance.FindDeclaredType("Edm.Int32");
        }

        public override IEdmEntitySet GetEntitySet(IEdmEntitySet previousEntitySet)
        {
            return previousEntitySet;
        }

        public override string ToString()
        {
            return "$count";
        }
    }
}
```

Now that we have the path segment, we need to add a path handler.

1. Add a new Class in the folder. Name it `CountODataPathHandler.cs`

The path handler will hook into the default OData path handler and will recognize the "`$count`" segment, and return an instance of our above `ODataPathSegment`. If it sees anything other than "`$count`" as the segment name, it will pass through to the base method, as you would expect.

```csharp
using Microsoft.Data.Edm;
using System.Web.Http.OData.Routing;

namespace ODataLab1.Helpers
{
    public class CountODataPathHandler : DefaultODataPathHandler
    {
        protected override ODataPathSegment ParseAtEntityCollection(IEdmModel model, ODataPathSegment previous, IEdmType previousEdmType, string segment)
        {
            if (segment == "$count")
            {
                return new CountPathSegment();
            }
            return base.ParseAtEntityCollection(model, previous, previousEdmType, segment);
        }
    }
}
```

Finally, we need a custom routing convention to tie this custom segment in with a controller/action.

1. Add a new Class in the folder. Name it `CountODataRoutingConvention.cs`

A custom routing convention maps a route to an OData Controller and an Action. In this case, our route is "`$count`", our controller would be specified in the URI path (`https://server.com/odata/Products/$count`), and our action will need to be called `GetCount`. We can specify any name, but it will have to be available in every entity. Let's extend `EntitySetRoutingConvention` and override `SelectAction()`.

```csharp
using System.Linq;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.OData.Routing;
using System.Web.Http.OData.Routing.Conventions;

namespace ODataLab1.Helpers
{
    public class CountODataRoutingConvention : EntitySetRoutingConvention
    {
        public override string SelectAction(ODataPath odataPath, HttpControllerContext controllerContext, ILookup<string, HttpActionDescriptor> actionMap)
        {
            if (controllerContext.Request.Method == HttpMethod.Get && odataPath.PathTemplate == "~/entityset/$count")
            {
                if (actionMap.Contains("GetCount"))
                {
                    return "GetCount";
                }
            }
            return null; // let default routes handle
        }
    }
}
```

Now Web API knows which method to call when it sees the `/$count` segment. Fantastic.

Now that we have a custom routing convention, let's register it in `WebApiConfig`.

1. We need to include our new custom routing convention in a new list of `ODataRoutingConventions`. Add this line right before the call to `config.Routes.MapODataServiceRoute`.

```csharp
IList<IODataRoutingConvention> conventions = ODataRoutingConventions.CreateDefault();
conventions.Insert(0, new CountODataRoutingConvention()); // allow $count segments in WebAPI OData v1-3
```

> Tip : if you see errors when typing classes which are not yet in your using clauses, click in the red area in Visual Studio and press `[Control + .]` - you can then hit enter to let Visual Studio add the reference for you. Handy!

1. Now, we add our custom conventions and our `CountODataPathHandler` into our `MapODataServiceRoute` call. Add these additional parameters to the function call.

```csharp
config.Routes.MapODataServiceRoute("odata", "odata", GetModel(), new CountODataPathHandler(), conventions);
```

Before we can run the project, we still need to implement our `GetCount` method in the `TodosController`. Remember, our custom routing convention determines the action name that is called. Add this action in your `TodosController`:

```csharp
public HttpResponseMessage GetCount(ODataQueryOptions<Todo> queryOptions)
{
    IQueryable<Todo> queryResults = queryOptions.ApplyTo(GetTodos()) as IQueryable<Todo>;
    int count = queryResults.Count();
    HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
    response.Content = new StringContent(count.ToString(), Encoding.UTF8, "text/plain");
    return response;
}
```

Let's build the project and run it again. Try:

[http://localhost:your-port-number/odata/Todos/$count](http://localhost:your-port-number/odata/Todos/$count)

Now you should get a text/plain response with an integer value. Great! We did it! For any new ODataControllers, you will simply need to implement `GetCount` action to support `/$count` path.
