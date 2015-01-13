---
title: Setting up the Core
published: true
---

# Setting up Component.js and our Navigation Router

We have a base project and it runs. Now let's set up some core components to ease our long-term development. We will do that by setting up a UIComponent which encapsulates our entire application (`Component.js`) and our own custom navigation router (handling loading and unloading of views).

## Component.js

A Component in the UI5 world is an independent and resuable part of a web application. There are "faceless" and "UI" components that make up an application. Let's take a look at SAPUI5's documentation for a concise explanation:

<hr />

* **Faceless components** (class: `sap.ui.core.Component`)

  * Faceless components do not have a user interface and are used, for example, for a service that delivers data from a back-end system.

* **UI components** (class: `sap.ui.core.UIComponent`)

  * UI components extend components and add rendering functionality to the component. They represent a screen area or element on the user interface, for example, a button or a shell, along with the respective settings and metadata.

<cite> &mdash; [SAPUI5 SDK Documentation](https://sapui5.netweaver.ondemand.com/sdk/#docs/guide/958ead51e2e94ab8bcdc90fb7e9d53d0.html)</cite>

<hr />

At the base of our web application, we will create a new instance of a UIComponent. This UIComponent will contain settings and metadata about our core user interface. As part of those settings, we will declare a base view, and what URL routes map to which sub-views inside of the base view (a Master-Detail page).

1. Create a new file by right clicking the folder `WebContent` and choosing New > File. This will create a new file at the same root as your `index.html` file.
1. Name the new file `Component.js` (case sensitive).
1. Copy the following snippet into the file.

```js
jQuery.sap.declare("odatalabclient.Component");

sap.ui.core.UIComponent.extend("odatalabclient.Component", {
    metadata: {
        name: "OData Lab Client",
        includes: [],
        dependencies: {
            libs: ["sap.m", "sap.ui.layout"],
            components: []
        },
        rootView: "odatalabclient.App",
        config: {
            // add whatever config you need globally here
        },
        routing: {
            config: {
                routerClass: odatalabclient.Router,
                viewType: "XML",
                viewPath: "odatalabclient.view",
                targetAggregation: "detailPages",
                clearTarget: false
            },
            routes: [
                {
                    pattern: "",
                    name: "main",
                    view: "Master",
                    targetAggregation: "masterPages",
                    targetControl: "splitApp",
                    subroutes: [
                        {
                            pattern: "salesorder/{salesOrderId}/:tab:",
                            name: "salesorder",
                            view: "Detail"
                        }
                    ]
                },
                {
                    name: "catchallMaster",
                    view: "Master",
                    targetAggregation: "masterPages",
                    targetControl: "splitApp",
                    subroutes: [
                        {
                            pattern: ":all:",
                            name: "catchallDetail",
                            view: "NotFound",
                            transition: "show"
                        }
                    ]
                }
            ]
        }
    },

    init: function() {
        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

        // set device model (phone/desktop support)
        var deviceModel = new sap.ui.model.json.JSONModel({
            isTouch: sap.ui.Device.support.touch,
            isNoTouch: !sap.ui.Device.support.touch,
            isPhone: sap.ui.Device.system.phone,
            isNoPhone: !sap.ui.Device.system.phone,
            listMode: sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
            listItemType: sap.ui.Device.system.phone ? "Active" : "Inactive"
        });

        deviceModel.setDefaultBindingMode("OneWay"); // only set once, then read-only
        this.setModel(deviceModel, "device");
    }
});
```

//--::--// TODO: let's look at each segment above...

## Create Router.js

[https://sapui5.netweaver.ondemand.com/sdk/#docs/guide/688f36bd758e4ce2b4e682eef4dc794e.html](https://sapui5.netweaver.ondemand.com/sdk/#docs/guide/688f36bd758e4ce2b4e682eef4dc794e.html)

//--::--// TODO: let's add our navigation router. manage browser history etc.

## Adjust index.html to load Component.js

Since we have now created a UIComponent which will set up our initial view (`App.view.xml`), let's change our `index.html`. The default bootstrapping that the UI5 SDK does is create your initial view using JavaScript in the index. Let's clear that out and instantiate our new UIComponent instead.

1. Open `index.html`
1. Find the following context:

        ```js
        <script>
            sap.ui.localResources("odatalabclient");
            var app = new sap.m.App({initialPage:"idApp1"});
            var page = sap.ui.view({id:"idApp1", viewName:"odatalabclient.App", type:sap.ui.core.mvc.ViewType.XML});
            app.addPage(page);
            app.placeAt("content");
        </script>
        ```

1. Replace the contents of this script with this snippet to create an instance of our `Component.js`

        ```js
        <script>
            sap.ui.getCore().attachInit(function() {
                new sap.m.Shell({
                    app: new sap.ui.core.ComponentContainer({
                        height : "100%",
                        name : "odatalabclient"
                    })
                }).placeAt("content");
            });
        </script>
        ```

