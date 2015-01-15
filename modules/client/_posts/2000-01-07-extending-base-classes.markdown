---
title: Extending Base Classes
published: true
---

# Using Base Classes

In our UI5 application, we can create a base Controller class which can contain common functions that we may reuse and want in multiple places. These helper functions could include actions such as accessing the component's EventBus, or grabbing the UIComponent's custom Router we implemented.

## Create a Base Controller

To make accessing the Router easy from all of our views/controllers, let's make a base Controller class that we can extend to our Master, Detail or other controllers. In this base Controller, we can build helper methods which can reduce code verbosity.

1. Create a new folder by right clicking on `WebContent`. Choose name `util`.
1. Right click on `util` and choose New > File.
1. Create a new file named `Controller.js`
1. Add the following code:

    ```js
    jQuery.sap.declare("odatalabclient.util.Controller");

    sap.ui.core.mvc.Controller.extend("odatalabclient.util.Controller", {
        getEventBus : function () {
            return this.getOwnerComponent().getEventBus();
        },

        getRouter : function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }
    });
    ```

    Our base controller extends `sap.ui.core.mvc.Controller` and implements two helper functions: `getEventBus` and `getRouter`.

    If we then extend `odatalabclient.util.Controller` instead of creating a new instance of a `sap.ui.Controller`, we can use these helper methods anywhere in our functions. Let's implement this now.

1. Open `Master.controller.js`
1. Require our new Controller util class
1. Change our instantiation to an extension of our base Controller

    ```js
    jQuery.sap.require("odatalabclient.util.Controller");

    odatalabclient.util.Controller.extend("odatalabclient.view.Master", {

        onSelect : function(oEvent) {
            alert("Selected an item!");
        }

    });
    ```

1. Go ahead and run the app. It should behave exactly the same as before, but now we have demonstrated how you can extend a base class in UI5.
