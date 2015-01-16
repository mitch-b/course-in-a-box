---
title: What is NetWeaver Gateway?
published: true
---

# What is NetWeaver Gateway?

SAP NetWeaver Gateway performs the function of providing simple, secure and controlled access to SAP data via OData services. It helps in extending the reach of SAP data to any platform, any device any application (any developer) that can consume the service using the OData protocol. One of the major benefits is the OData standard helps hide lot of the complexity associated with SAP data.

Succinctly stated, SAP NetWeaver Gateway provides an open REST-based interface to SAP data based on the OData access protocol.

## Architecture

NetWeaver Gateway is essential an ABAP layer between the SAP Business Suite Systems (ECC, CRM&hellip;) and the various consumption channels (devices, browsers, applications).

At a high level, the NetWeaver Gateway architecture is three tier: Consumer Tier, NW Gateway Tier and the Business Suite System Tier as represented in figure below &mdash; commonly referred to as 'hub deployment'. An embedded deployment of NetWeaver Gateway where the business suite system acts as a NetWeaver Gateway is also possible, though not recommended for security reasons. All ABAP AS (Application Server) 7.4 systems inherently have NetWeaver Gateway add-on as part of a standard component (SAPGW_FND) and hence can act as a NetWeaver Gateway system.

![nwg_01_architecture.PNG]({{site.baseurl}}/img/nwg_01_architecture.PNG)

### Consumer Tier

This consists of UI centric clients that consume the OData services created in NetWeaver Gateway using HTTP (HTML5/SAPUI5, .NET, PHP &hellip;). Nearly any client that can talk HTTP and construct and parse XML or JSON formats can consume a NetWeaver Gateway service. The yellow boxes in the figure above represent the consumer tier.

### SAP NetWeaver Gateway Tier

The core technology of NetWeaver Gateway consists of an OData Library and runtime components that process OData requests and house the functionality needed to create OData services.

In addition, there is a comprehensive service building console (transaction `SEGW`) that provides various options to build Gateway Services from scratch, or by re-using existing technical objects like RFCs, BOR, GenIL and BW Queries.

Gateway also has support tools for monitoring, tracing and troubleshooting services.

### SAP Business Suite Systems

This tier is where the data actually lies (ECC, CRM, SRM &hellip; etc ). The data access protocol between NetWeaver Gateway and the Business Suite Systems is RFC.
