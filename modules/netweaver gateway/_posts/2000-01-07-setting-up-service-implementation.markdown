---
title: Setting up Service Implementation
published: true
---

# Setting up Service Implementation

In this section, we will code the query operation for the entity sets.

1. Expand Service Implementation
1. Expand SalesOrders
1. Right click on `GetEntitySet (Query)`, choose Map to DataSource

    ![sap_18_map_salesorders_to_ds.PNG]({{site.baseurl}}/img/sap_18_map_salesorders_to_ds.PNG)

1. Click the Propose Mapping button to automatically map from the RFC response.
1. Additionally, add the two input parameters `SoId` and `BuyerName` of the Function Module as seen manually below.
1. Click on the box to the left of SoId to select the first row. Click on the Insert Row button at the top.
1. Click on the small box in the Entity Set property box when selected. This will propose options for the field. Choose `SoId`.
1. Click and drag `SELPARAMSOID[]` from the right hand side into the Data Source Parameter box for the top row.

1. Similarly, click on the box to the left of `BuyerName` to seleft the row. Click on the Insert Row button at the top.
1. Click on the small box in the Entity Set property box when selected. This will propose options for the field. Choose `BuyerName`.
1. Click and drag `SELPARAMBUYERNAME[]` from the right hand side into the Data Source Parameter box for the row.

    The end result should look similar to this screenshot:

    ![sap_19_propose_mapping.PNG]({{site.baseurl}}/img/sap_19_propose_mapping.PNG)

    This is all that we need to do to finish the mapping of our SalesOrders Entity Set. **Save the project, and re-generate the runtime objects.**

1. In a similar manner, complete the implementation of our Entity Set `LineItems`.

    ![sap_20_map_lineitems_to_ds.PNG]({{site.baseurl}}/img/sap_20_map_lineitems_to_ds.PNG)

1. Additionally, manually add the required input parameter `SoId` as seen below:

   ![sap_21_lineitems_soid_input.PNG]({{site.baseurl}}/img/sap_21_lineitems_soid_input.PNG)

1. Now that our Query requests are ready for our entity sets, let's add a Read (`GetEntity`) service implementation for our `SalesOrder` entity set. We will use this in our client to get additional details about a Sales Order.

    ![sap_22_map_salesorders_getentity.PNG]({{site.baseurl}}/img/sap_22_map_salesorders_getentity.PNG)

Once we're done, again, don't forget to **save and re-generate the runtime objects**.

Now that we have our service built and activated, let's run some queries against our service to test that it is working as expected.
