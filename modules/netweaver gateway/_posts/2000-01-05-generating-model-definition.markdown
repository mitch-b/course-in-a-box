---
title: Generating Model Definition
published: true
---

# Generating the Model Definition

As we saw in the Gateway Service Development Process module, building the Model Definition is our first step. In this demo, we are going to generate our model based on an existing remote RFC. However, to start, we need to create a new project to host our service.

## Creating our Service Builder Project

1. Open transaction `SEGW`
1. Click the Create New Project button
1. Add your project name. For this demo, use Z[your ID]_DEMO_ORDERS

    Fill out the fields below as applicable.

    ![sap_01_create_project.PNG]({{site.baseurl}}/img/sap_01_create_project.PNG)

1. After clicking on the green check button, your new project is created.

    ![sap_02_project_created.PNG]({{site.baseurl}}/img/sap_02_project_created.PNG)

    Now we can begin creating our data model for the service.

## Creating our SalesOrder Entity

1. Right click on the Data Model folder and choose Import > RFC/BOR Interface

    ![sap_03_import_rfc.PNG]({{site.baseurl}}/img/sap_03_import_rfc.PNG)

    A wizard will now pop up helping determine which RFC to import, and where the RFC resides (local or remote).

1. Enter a human readable Entity Type Name: `SalesOrder`
1. In our case, we will connect to a separate ECC system.
1. Choose `Remote Function Call` in the Data Souce Type drop down.
1. We are going to build our service off `BAPI_EPM_SO_GET_LIST`.

    ![sap_04_create_entity_type.PNG]({{site.baseurl}}/img/sap_04_create_entity_type.PNG)

    If your Gateway instance is able to access the RFC, you should be prompted with what fields you want to expose from outputs.

1. Select the structure labeled `SOHEADERDATA[]`. This will select all fields of the structure to expose.

    ![sap_05_choose_fields.PNG]({{site.baseurl}}/img/sap_05_choose_fields.PNG)

1. Mark the Sales Order ID as the key for the structure.

    ![sap_06_set_entity_key.PNG]({{site.baseurl}}/img/sap_06_set_entity_key.PNG)

    After clicking Finish, our Entity should be fully created into our Data Model.

    ![sap_07_entity_display.PNG]({{site.baseurl}}/img/sap_07_entity_display.PNG)

## Creating a SalesOrders Entity Set

Now that we have our entity, we can make a collection of that Entity. A collection of SalesOrder entities is called an EntitySet.

1. Right click on the Entity Set and click Create.
1. Supply Entity Set Name: `SalesOrders`
1. Supply Entity Type Name: `SalesOrder`

    ![sap_08_create_entity_set.PNG]({{site.baseurl}}/img/sap_08_create_entity_set.PNG)

1. Now, make sure Create/Update/Delete/Paging are all checked as enabled for the entity set.

    ![sap_09_entity_set_show_properties.PNG]({{site.baseurl}}/img/sap_09_entity_set_show_properties.PNG)

    We now have an Entity `SalesOrder` and its corresponding Entity Set `SalesOrders` created.

1. In the same way, go create Entity `LineItem` using table `SOITEMDATA[]` from `BAPI_EPM_SO_GET_LIST`. Mark the keys of the `LineItem` entity as well. Then you can create the Entity Set `LineItems`.

1. Once your entities and entity sets are created, be sure to Save your progress. You should now see something similar to:

   ![sap_10_entity_sets_created.PNG]({{site.baseurl}}/img/sap_10_entity_sets_created.PNG)

## Creating Associations Between SalesOrder and LineItem

1. Right click on Associations and choose Create

    ![sap_11_create_association.PNG]({{site.baseurl}}/img/sap_11_create_association.PNG)

    We have `1` Sales Order, which has an association of `0..n` Line Items (since a Sales Order needs to exist to have 0 or more line items related to it).

    ![sap_12_create_association_2.PNG]({{site.baseurl}}/img/sap_12_create_association_2.PNG)

    ![sap_13_create_association_3.PNG]({{site.baseurl}}/img/sap_13_create_association_3.PNG)

Now, your associations will be created.

    ![sap_14_finished_data_model.PNG]({{site.baseurl}}/img/sap_14_finished_data_model.PNG)

Fantastic. Step one of our service generation is complete. Our Data Model is finished, now let's move on to generating the Data Provider classes.
