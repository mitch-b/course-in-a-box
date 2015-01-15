---
title: Gateway Service Development Process
published: true
---

# Gateway Service Development Process

The gateway Service Builder (transaction `SEGW`) provides all the design time tools for the service creation process. The service creation process itself has three distinct steps, Data Model Definition, Service Implementation and Service Maintenance.

The figure below illustrates the three phases in service creation with the various methods that can be leveraged to perform each step. The blocks highlighted in blue is the approach we will be using in our demo service creation.

![nwg_02_service_building.PNG]({{site.baseurl}}/img/nwg_02_service_building.PNG)

## Data Model Definition

In this phase we create the Entity Types that are needed and define the relationships between the entities. This can be done by using declarative data definition, import from an EDMX file or import from RFC/BOR interface.

A collection of entites (entity set) is exposed as a resource which can then be queried using a URI using various query options  that the OData protocol provides and the relevant HTTP verbs. After creating the  Entities, Entity Sets and Entity relationship we generate the repository objects.

As an example, if we were creating the back end services for a Sales Order display app, the entities could be orders, materials, business partners. The figure below is an attempt to represent this:

![nwg_03_model_definition.PNG]({{site.baseurl}}/img/nwg_03_model_definition.PNG)

After creating the data model one can generate the runtime artifacts for the service. The runtime artifacts that are created automatically are the Model Provider Class (MPC) and its extension class, Data Provider Class (DPC) stub and its extension class, the technical data model and the service.

## Service Implementation

During this phase, operations that are to be supported by the gateway service (CRUD-Q) are coded or mapped to methods of a BOR or an RFC function module. This is achieved either by manual code based implementation using the ABAP workbench or by using the Map to Data Source function that is available in the `SEGW`.  Data provider class methods are manually changed or automatically generated  based on the option chosen.

## Service Maintenance

This phase consists of service activation in the gateway system. The service is ready for consumption after this phase. Service activation can be performed using tcode `/IWFND/MAINT_SERVICES`. This functionality has also been extended in transaction `SEGW`.

<hr />
<br />

## Additional Tools

<h4>Integrated test environment</h4>

Transaction `/IWFND/GW_CLIENT` can be leveraged to test the service locally using various query options.

<h4>Error Log Tracking</h4>

Transactions `/IWFND/ERROR_LOG` and `/IWFND/APPS_LOG` can be leveraged.
