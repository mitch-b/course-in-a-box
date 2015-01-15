---
title: Using our Router
published: true
---

# Using our Router

In order to pass details down to our Detail view, we will take advantage of our custom Router to take a deep-linkable route, and load the appropriate detail information.

## Notifying our Router of a Change

Instead of displaying an alert that we clicked on a Sales Order, we instead want to load information about the sales order in our Detail view, right? Well, since we are now using our base Controller class, it is easy to grab our router and navigate to a new route.

1. Open `Master.controller.js`
1. Add a new function named `showDetail` and adjust our `onSelect` to call it instead:

    ```js
    onSelect : function(oEvent) {
        // Get the list item, either from the listItem parameter or from the event's
        // source itself (will depend on the device-dependent mode).
        this.showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
    },

    showDetail : function(oItem) {
        // If we're on a phone, include nav in history; if not, don't.
        var bReplace = jQuery.device.is.phone ? false : true;
        this.getRouter().navTo("salesorder", {
            from: "master",
            salesorder: oItem.getBindingContext().getPath().substr(1)
        }, bReplace);
    }
    ```

    Simply by calling `this.getRouter()` we can access any functions available in our `Router.js`.

1. Let's run the application now and check the browser console (using F12)

    When you click (or tap) on an item, you will see an error similar to:

    `resource odatalabclient/view/Detail.view.xml could not be loaded`

This is good. Our router is firing, and matching the route up with what we set in our UIComponent configuration. However, the view doesn't exist yet. Let's go ahead and create it now.
