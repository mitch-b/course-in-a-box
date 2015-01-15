---
title: Setting up the Master View
published: true
---

# Setting up the Master View

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

1. Change the contents of `Master.controller.js`:

    ```js
    jQuery.sap.require("odatalabclient.Component");
    sap.ui.controller("odatalabclient.view.Master", {
        onInit: function() {
            var config = odatalabclient.Component.getMetadata().getConfig();
            var url = config.salesOrderService.url;
            var model = new sap.ui.model.odata.ODataModel(url, true);
            // model.setDefaultCountMode("Inline");
            this.getView().setModel(model);
        }
    });
    ```

    The first line brings in our UIComponent shell so that we can access the config we added. Inside the `onInit` function, we bring the url into a variable and assign it into a new instance of an `sap.ui.model.odata.ODataModel` object. By getting the view object from our controller, we can inject our model.

1. Refresh your browser window to see our changes.

//--::--// TODO: add image

We are seeing our sales orders! This is great.

1. A request is sent to our router (which we initialized in our UIComponent)
1. The request is loaded as a masterPages aggregation of our main view (App.view.xml)
1. The view (Master.view.xml) is loaded in.
1. The Master controller initialization event fires.
1. We create an instance of an OData model (provided service URL)
1. After assigning the model to the view, our List in our view is making a request about `/SalesOrders`
  1. A call is made to the `$metadata` endpoint to get information about the service.
  1. We attempt to read a `$count` of all resources
  1. We read in some `/SalesOrders` records from the OData endpoint and display in our List

All of this we have configured so far. Let's now try and display more information about these items in a detail view next.
