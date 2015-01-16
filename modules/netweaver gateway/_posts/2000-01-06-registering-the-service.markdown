---
title: Registering the Service
published: true
---

# Registering our Service

Registering the service can also be done in the Service Builder transaction. This only needs to be done once.

1. Expand Service Maintenance folder
1. Right click on `GW_HUB` and choose Register.

    ![sap_16_register_service.PNG]({{site.baseurl}}/img/sap_16_register_service.PNG)

1. Choose system alias `LOCAL` and Continue.

    ![sap_17_add_service.PNG]({{site.baseurl}}/img/sap_17_add_service.PNG)

This registers the service in `SICF` and you can now see it in that transaction.

> In `SICF`, navigate `sap` > `opu` > `odata` > `sap`

At this point, you can now access the metadata document at the service endpoint.

http://service.com:1234/8102/sap/opu/odata/sap/Z\_DEMO\_ORDERS\_SRV/$metadata

This should give you an XML (only content type supported) response of all the entities, entity sets, and operations allowed in the service.

Now, your web developers can look at the service while we work on mapping the CRUD-Q (Create, Read, Update, Delete, Query) operations from the entity to the RFC.
