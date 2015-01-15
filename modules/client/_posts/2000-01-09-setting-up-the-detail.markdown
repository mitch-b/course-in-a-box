---
title: Setting up the Detail View
published: true
---

# Setting up the Detail View

Just like we set up our Master view, we'll do exactly the same with our Detail view. In our detail view, we hope to display:

* Sales Order Number
* Buyer Name
* NetAmount

Any time our master list changes, our detail list should update with new values as well.

## Create a new View

1. Right click on the `view` folder
1. Choose New > Other &hellip;
1. Type view in the filter box. Choose view under SAPUI5 Application Development folder.

    ![eclipse_04_add_new_view.PNG]({{site.baseurl}}/img/eclipse_04_add_new_view.PNG)

1. Enter `Detail` as the view name and choose XML development paradigm.

1. Update the `Detail.view.xml` file with these contents:

    ```xml
    <mvc:View
        controllerName="odatalabclient.view.Detail"
        xmlns:mvc="sap.ui.core.mvc"
        xmlns:core="sap.ui.core"
        xmlns="sap.m">
        <Page
            showNavButton="{device>/isPhone}"
            navButtonPress="onNavBack"
            class="sapUiFioriObjectPage"
            title="Sales Order">
            <content>
                <ObjectHeader
                    title="{BuyerName}">
                </ObjectHeader>
            </content>
        </Page>
    </mvc:View>
    ```

    Let's take a look at what we've set up.

    1. A navigation button will show depending on if our device is a phone or not. We'll demo that.
    1. We have a `sap.m.Page` object whose content is an `sap.m.ObjectHeader` object which is currently displaying the `BuyerName` field from our Master list's `/SalesOrders` objects.

    Now let's get our Detail controller ready to start pushing data to the view and handling our events.

1. Update the `Detail.controller.js` file with these contents:

    ```js
    jQuery.sap.require("odatalabclient.util.Controller");

    odatalabclient.util.Controller.extend("odatalabclient.view.Detail", {

        onInit : function() {
            this.getRouter().attachRouteMatched(this.onRouteMatched, this);
        },

        onRouteMatched : function(oEvent) {
            var oParameters = oEvent.getParameters();
            var sSalesOrderPath = "/" + oParameters.arguments.salesorder;
            this.bindView(sSalesOrderPath);
        },

        bindView : function (sSalesOrderPath) {
            var oView = this.getView();
            oView.bindElement(sSalesOrderPath);
        }

    });
    ```

1. Run the application
1. Choose an item in the list

    You should now see the BuyerName associated with the sales order show up in the Detail view.
