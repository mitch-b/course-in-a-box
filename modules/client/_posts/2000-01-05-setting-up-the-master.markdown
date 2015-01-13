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
        controllerName="odatalabclient.Master"
        displayBlock="true"
        xmlns:mvc="sap.ui.core.mvc"
        xmlns="sap.m">
        <Page
            id="page"
            title="Sales Orders">
        </Page>
    </mvc:View>
    ```

    Now we have our base `sap.m.Page` to add our content.

1. Add a `sap.m.List` to the content of our Page.

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

    1. We are using our `{device>/}` model that we set in `Component.js`.
    1. We have a `sap.m.List` with `sap.m.ObjectListItem` items
    1. The items are populated from our model `{/SalesOrders}`. We have not yet configured this piece.

    Let's run our application now and see some of this in effect.

1. Refresh your browser window to see our changes.
