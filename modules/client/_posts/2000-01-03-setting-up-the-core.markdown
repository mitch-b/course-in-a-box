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
            name: "OData Lab 1 Client",
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


    1. Looking at our `deviceModel` setup, you'll see we have some helper items we can use within our view to accomodate phones or larger screens based on `{device>/isPhone}` and multiple other options.

    1. You'll notice we set up some routes already &hellip; we will create these view destinations soon.

        Since our UIComponent will know about all views and routes underneath it, it makes sense to setup all of these URL matches to what views the UIComponent is responsible to show the end user.

        Let's work on building our Router class which we are referencing in our UIComponent.


## Create Router.js

Our custom router will handle several things including browser navigation history and deep-linking. When it comes to explaining what your own navigation router in UI5 can do, nobody says it better than SAP.

<hr />

Applications exist independently, and navigation within those applications usually starts at the root control [&hellip;]. If you want to only be able to jump into your application at the starting point, then [&hellip;] that will work. However, it will not give you the ability to bookmark a certain position within the application, and it will not support resuming application flow from that bookmarked position.

<cite> &mdash; [SAPUI5 SDK Documentation](https://sapui5.netweaver.ondemand.com/sdk/#docs/guide/688f36bd758e4ce2b4e682eef4dc794e.html)</cite>

<hr />

1. Create a new file by right clicking the folder `WebContent` and choosing New > File. This will create a new file at the same root as your `index.html` file.
1. Name the new file `Router.js`.
1. Copy the following snippet into the file. This is provided by SAP's best practices example. The only changes involve different namespacing and control IDs.

    ```js
    jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
    jQuery.sap.require("sap.ui.core.routing.Router");
    jQuery.sap.declare("odatalabclient.Router");

    sap.ui.core.routing.Router.extend("odatalabclient.Router", {

        constructor : function() {
            sap.ui.core.routing.Router.apply(this, arguments);
            this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this);
        },

        myNavBack : function(sRoute, mData) {
            var oHistory = sap.ui.core.routing.History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            //The history contains a previous entry
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var bReplace = true; // otherwise we go backwards with a forward history
                this.navTo(sRoute, mData, bReplace);
            }
        },

        /**
         * Changes the view without changing the hash
         *
         * @param {object} oOptions must have the following properties
         * <ul>
         *  <li> currentView : the view you start the navigation from.</li>
         *  <li> targetViewName : the fully qualified name of the view you want to navigate to.</li>
         *  <li> targetViewType : the viewtype eg: XML</li>
         *  <li> isMaster : default is false, true if the view should be put in the master</li>
         *  <li> transition : default is "show", the navigation transition</li>
         *  <li> data : the data passed to the navContainers livecycle events</li>
         * </ul>
         * @public
         */
        myNavToWithoutHash : function (oOptions) {
            var oSplitApp = this._findSplitApp(oOptions.currentView);

            // Load view, add it to the page aggregation, and navigate to it
            var oView = this.getView(oOptions.targetViewName, oOptions.targetViewType);
            oSplitApp.addPage(oView, oOptions.isMaster);
            oSplitApp.to(oView.getId(), oOptions.transition || "show", oOptions.data);
        },

        backWithoutHash : function (oCurrentView, bIsMaster) {
            var sBackMethod = bIsMaster ? "backMaster" : "backDetail";
            this._findSplitApp(oCurrentView)[sBackMethod]();
        },

        destroy : function() {
            sap.ui.core.routing.Router.prototype.destroy.apply(this, arguments);
            this._oRouteMatchedHandler.destroy();
        },

        _findSplitApp : function(oControl) {
            sAncestorControlName = "splitApp";
            if (oControl instanceof sap.ui.core.mvc.View && oControl.byId(sAncestorControlName)) {
                return oControl.byId(sAncestorControlName);
            }
            return oControl.getParent() ? this._findSplitApp(oControl.getParent(), sAncestorControlName) : null;
        }

    });
    ```

    Remember, we already set our custom router class in our custom UIComponent above. So no action needs to be taken, this is just a reminder of how this comes into play with our UIComponent.

    ```js
    // ...

    routing: {
        config: {
            routerClass: odatalabclient.Router,
            viewType: "XML",
            viewPath: "odatalabclient.view",
            targetAggregation: "detailPages",
            clearTarget: false
        },

    // ...
    ```

    In order to use the properties of our Router, we need to *include* it in our UIComponent as a dependency. At the top of the `Component.js` file, add our require statement.

1. Open `Component.js`
1. Add this line near the top of the file:

    ```js
    jQuery.sap.declare("odatalabclient.Component");
    jQuery.sap.require("odatalabclient.Router"); // added on line 2
    ```

That should be enough of our Component/Router configuration.

## Adjust index.html to load our UIComponent instead of a NavContainer

Since we have now created an extension of UIComponent which will set up our initial view (`App.view.xml`), let's change our `index.html`. The default bootstrapping that the UI5 SDK does is create your initial view using JavaScript in the index. Like we just read, using a NavContainer (which we get with `sap.m.App`), we don't get the powerful deep-linking capabilities of our router. So let's swap out a NavContainer for our UIComponent.

1. Open `index.html`
1. Find the following context:

    ```js
    sap.ui.localResources("odatalabclient");
    var app = new sap.m.App({initialPage:"idApp1"});
    var page = sap.ui.view({id:"idApp1", viewName:"odatalabclient.App", type:sap.ui.core.mvc.ViewType.XML});
    app.addPage(page);
    app.placeAt("content");
    ```

1. Replace the contents of this `<script>` tag with this snippet to create an instance of our `Component.js`

    ```js
    sap.ui.getCore().attachInit(function() {
        new sap.m.Shell({
            app: new sap.ui.core.ComponentContainer({
                height : "100%",
                name : "odatalabclient"
            })
        }).placeAt("content");
    });
    ```

