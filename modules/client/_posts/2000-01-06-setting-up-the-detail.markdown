---
title: Setting up the Detail View
published: true
---

# Setting up the Detail View

We now need to build a list view to populate a Master list of sales orders from our service.

## Create a new View

1. Right click on the `odatalabclient` folder
1. Choose New > Other &hellip;
1. Type view in the filter box. Choose view under SAPUI5 Application Development folder.

    ![eclipse_04_add_new_view.PNG]({{site.baseurl}}/img/eclipse_04_add_new_view.PNG)

1. Enter `Master` as the view name and choose XML development paradigm.

## Create a Sales Order List

1. Open `Master.view.xml`

1. Replace file contents with this snippet:

    ```xml
    <mvc:View
        controllerName="odatalabclient.view.Master"
        displayBlock="true"
        xmlns:mvc="sap.ui.core.mvc"
        xmlns="sap.m">
        <Page
            id="page"
            title="Sales Orders">
        </Page>
    </mvc:View>
    ```

    Now we have our base `sap.m.Page` to add our content. You'll notice the controller name changes a bit to keep with our standard. I noticed that the 'New View' wizard does not retain a full namespace. This is something to be aware of.

1. In the same file, add a `sap.m.List` to the content of our Page. Replace the Page object with the following:

    ```xml
    <Page
        id="page"
        title="Sales Orders">
        <content>
            <List
                id="list"
                mode="{device>/listMode}"
                items="{/SalesOrders}"
                growing="true"
                growingScrollToLoad="true">
                <items>
                    <ObjectListItem
                        type="{device>/listItemType}"
                        title="{SoId}">
                    </ObjectListItem>
                </items>
            </List>
        </content>
    </Page>
    ```

    You'll notice a couple things here.

    1. We are using our `{device}` model that we set in `Component.js`. See how we are accessing those helper attributes we created?
    1. We have a `sap.m.List` with `sap.m.ObjectListItem` items
    1. The items are populated from our model `{/SalesOrders}`. We have not yet configured this piece.

1. Change the name of our Master controller in `Master.controller.js`

    ```js
    sap.ui.controller("odatalabclient.view.Master", {
        // ...
    ```

    Let's run our application now and see some of this in effect.

1. Refresh your browser window to see our changes.

//--::--// TODO: add image?

## Master Controller

Now that our view is up to speed, let's finally hook up to our OData service! In the `onInit` function of our controller, let's create an OData model and assign it to the model accessible in our view.

To do that, let's add some config in our `Component.js` so that we don't have configuration saved in a controller.

1. Open `Component.js`, identify the config section under metadata.
1. Add our sales order service:

    ```js
    rootView: "odatalabclient.view.App",
    config: {
        salesOrderService: {
            url: "http://localhost:your-port-number/odata/srv",
            user: "TEST1",
            password: "TestUserPassword"
        }
    },
    ```

1. In our `Master.controller.js`, let's un-comment the `onInit` function. (don't forget to remove the comma at the end of the function curly braces!)

    ```js
    sap.ui.controller("odatalabclient.view.Master", {

    /**
    * Called when a controller is instantiated and its View controls (if available) are already created.
    * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
    * @memberOf view.Master
    */
        onInit: function() {

        }

    });
    ```





