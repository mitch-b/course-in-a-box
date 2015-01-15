---
title: Setting up the Master Events
published: true
---

# Handling Click Events in Master View

While it's fantastic that our Master view is now showing items from our service, we now need to handle _what happens_ when you click (or tap) on one of these items.

`sap.m.List` will fire an internal event `select` when one of it's items has been pressed. This will be useful for our Desktop clients. Similarly, our item templates (built on a `sap.m.ObjectListItem`) will fire a `press` event if Active. We will use this event firing for our mobile clients.

Let's attach an event handler to these in our Master view.

1. Open `Master.view.xml`
1. Change our list to add new event handlers

    ```xml
    <List
        id="list"
        mode="{device>/listMode}"
        items="{/SalesOrders}"
        select="onSelect"
        growing="true"
        growingScrollToLoad="true">
        <items>
            <ObjectListItem
                type="{device>/listItemType}"
                press="onSelect"
                title="{SoId}">
            </ObjectListItem>
        </items>
    </List>
    ```

    These event handlers need to live in our view's controller class. Let's add them now.

1. Open `Master.controller.js`
1. Add the new function:

    ```js
    sap.ui.controller("odatalabclient.view.Master", {

        onSelect : function(oEvent) {
            alert("Selected an item!");
        }

    });
    ```

1. Let's try it out.

    ![client_04_click_event.PNG]({{site.baseurl}}/img/client_04_click_event.PNG)

Now that we have attached to a click event, it's not too difficult to grab the binding context (the OData path, in this case) from the selected item. Before we do that though, let's spend time looking at UI5 ability to extend classes to make our job easier going forward.
