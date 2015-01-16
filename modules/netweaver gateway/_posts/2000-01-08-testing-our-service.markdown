---
title: Testing Our Service
published: true
---

# Testing our Service

Just as we looked at sample queries for OData services in the previous module, let's try some against our new service.

#### `GET http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders`

_Response (200 OK):_

```xml
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xml:base="http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/">
  <id>http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders</id>
  <title type="text">SalesOrders</title>
  <updated>2015-01-16T04:42:46Z</updated>
  <author>
    <name />
  </author>
  <link href="SalesOrders" rel="self" title="SalesOrders" />
  <entry>
    <id>http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders('0500000000')</id>
    <title type="text">SalesOrders('0500000000')</title>
    <updated>2015-01-16T04:42:46Z</updated>
    <category term="Z_DEMO_ORDERS_SRV.SalesOrder" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />
    <link href="SalesOrders('0500000000')" rel="edit" title="SalesOrder" />
    <link href="SalesOrders('0500000000')/OrdtoItm" rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/OrdtoItm" type="application/atom+xml;type=feed" title="OrdtoItm" />
    <link href="SalesOrders('0500000000')/$links/OrdtoItm" rel="http://schemas.microsoft.com/ado/2007/08/dataservices/relatedlinks/OrdtoItm" type="application/xml" title="OrdtoItm" />
    <content type="application/xml">
      <m:properties>
        <d:NetAmountExt>21737.0000</d:NetAmountExt>
        <d:NetAmount>21737.00</d:NetAmount>
        <d:GrossAmountExt>25867.0300</d:GrossAmountExt>
        <d:GrossAmount>25867.03</d:GrossAmount>
        <d:CurrencyCode>EUR</d:CurrencyCode>
        <d:BuyerName>SAP</d:BuyerName>
        <d:BuyerId>0100000000</d:BuyerId>
        <d:Note>EPM DG: SO ID 0500000000 Deliver as fast as possible</d:Note>
        <d:ChangedByBp />
        <d:CreatedByBp />
        <d:ChangedAt>2014-09-02T05:00:00.0000000</d:ChangedAt>
        <d:ChangedBy>0000000033</d:ChangedBy>
        <d:CreatedAt>2014-09-02T05:00:00.0000000</d:CreatedAt>
        <d:CreatedBy>0000000033</d:CreatedBy>
        <d:SoId>0500000000</d:SoId>
        <d:TaxAmount>4130.03</d:TaxAmount>
        <d:TaxAmountExt>4130.0300</d:TaxAmountExt>
        <d:LifecycleStatus>N</d:LifecycleStatus>
        <d:BillingStatus />
        <d:DeliveryStatus />
      </m:properties>
    </content>
  </entry>
</feed>
```
<br />
Your typical response will be in XML by default. If you want a JSON response, you need to ask for it (per OData spec). Simply append `$format=json` to your query, or change your `Accept` HTTP request header.
<br />
#### `GET http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders?$format=json`

_Response (200 OK):_

> In OData v3 JSON terms, this would be a JSON Verbose response

```json
{
  "d":{
    "results":[
      {
        "__metadata":{
          "id":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders('0500000000')",
          "uri":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders('0500000000')",
          "type":"Z_DEMO_ORDERS_SRV.SalesOrder",
          "properties":{
            "OrdtoItm":{
              "associationuri":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders('0500000000')/$links/OrdtoItm"
            }
          }
        },
        "NetAmountExt":"21737.0000",
        "NetAmount":"21737.00",
        "GrossAmountExt":"25867.0300",
        "GrossAmount":"25867.03",
        "CurrencyCode":"EUR",
        "BuyerName":"SAP",
        "BuyerId":"0100000000",
        "Note":"EPM DG: SO ID 0500000000 Deliver as fast as possible",
        "ChangedByBp":"",
        "CreatedByBp":"",
        "ChangedAt":"\/Date(1409634000000)\/",
        "ChangedBy":"0000000033",
        "CreatedAt":"\/Date(1409634000000)\/",
        "CreatedBy":"0000000033",
        "SoId":"0500000000",
        "TaxAmount":"4130.03",
        "TaxAmountExt":"4130.0300",
        "LifecycleStatus":"N",
        "BillingStatus":"",
        "DeliveryStatus":"",
        "OrdtoItm":{
          "__deferred":{
            "uri":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders('0500000000')/OrdtoItm"
          }
        }
      }
    ]
  }
}
```
<br />
#### `GET http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders?$filter=SoId le '0500000010' and BuyerName eq 'TECUM' &$format=json`

```json
{
  "d":{
    "results":[
      {
        "__metadata":{
          "id":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders('0500000002')",
          "uri":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders('0500000002')",
          "type":"Z_DEMO_ORDERS_SRV.SalesOrder",
          "properties":{
            "OrdtoItm":{
              "associationuri":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders('0500000002')/$links/OrdtoItm"
            }
          }
        },
        "NetAmountExt":"4732.0000",
        "NetAmount":"4732.00",
        "GrossAmountExt":"5631.0800",
        "GrossAmount":"5631.08",
        "CurrencyCode":"EUR",
        "BuyerName":"TECUM",
        "BuyerId":"0100000005",
        "Note":"EPM DG: SO ID 0500000002 Deliver as fast as possible",
        "ChangedByBp":"",
        "CreatedByBp":"",
        "ChangedAt":"\/Date(1409634000000)\/",
        "ChangedBy":"0000000033",
        "CreatedAt":"\/Date(1409634000000)\/",
        "CreatedBy":"0000000033",
        "SoId":"0500000002",
        "TaxAmount":"899.08",
        "TaxAmountExt":"899.0800",
        "LifecycleStatus":"N",
        "BillingStatus":"",
        "DeliveryStatus":"",
        "OrdtoItm":{
          "__deferred":{
            "uri":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders('0500000002')/OrdtoItm"
          }
        }
      }
    ]
  }
}
```
<br />
#### `GET http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders('0500000011')?$format=json`

_Response (200 OK):_

```json
{
  "d":{
    "__metadata":{
      "id":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders('0500000011')",
      "uri":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders('0500000011')",
      "type":"Z_DEMO_ORDERS_SRV.SalesOrder",
      "properties":{
        "OrdtoItm":{
          "associationuri":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders('0500000011')/$links/OrdtoItm"
        }
      }
    },
    "NetAmountExt":"273.9000",
    "NetAmount":"273.90",
    "GrossAmountExt":"325.9400",
    "GrossAmount":"325.94",
    "CurrencyCode":"EUR",
    "BuyerName":"Panorama Studios",
    "BuyerId":"0100000004",
    "Note":"EPM DG: SO ID 0500000011 Deliver as fast as possible",
    "ChangedByBp":"",
    "CreatedByBp":"",
    "ChangedAt":"\/Date(1409634000000)\/",
    "ChangedBy":"0000000033",
    "CreatedAt":"\/Date(1409634000000)\/",
    "CreatedBy":"0000000033",
    "SoId":"0500000011",
    "TaxAmount":"52.04",
    "TaxAmountExt":"52.0400",
    "LifecycleStatus":"N",
    "BillingStatus":"",
    "DeliveryStatus":"",
    "OrdtoItm":{
      "__deferred":{
        "uri":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders('0500000011')/OrdtoItm"
      }
    }
  }
}
```
<br />
#### `GET http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/SalesOrders('0500000011')/OrdtoItm?$format=json`

_Response (200 OK):_

```json
{
  "d":{
    "results":[
      {
        "__metadata":{
          "id":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/LineItems(SoId='0500000011',SoItemPos='0000000010')",
          "uri":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/LineItems(SoId='0500000011',SoItemPos='0000000010')",
          "type":"Z_DEMO_ORDERS_SRV.LineItem"
        },
        "SoId":"0500000011",
        "SoItemPos":"0000000010",
        "ProductId":"HT-1104",
        "Note":"EPM DG: SO ID 0500000011 Item 0000000010",
        "CurrencyCode":"JPY",
        "GrossAmount":"65.45",
        "GrossAmountExt":"65.4500",
        "NetAmount":"55.00",
        "NetAmountExt":"55.0000",
        "TaxAmount":"10.45",
        "TaxAmountExt":"10.4500",
        "DeliveryDate":"\/Date(1410238800000)\/",
        "Quantity":"1.000",
        "QuantityUnit":"EA"
      },
      {
        "__metadata":{
          "id":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/LineItems(SoId='0500000011',SoItemPos='0000000020')",
          "uri":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/LineItems(SoId='0500000011',SoItemPos='0000000020')",
          "type":"Z_DEMO_ORDERS_SRV.LineItem"
        },
        "SoId":"0500000011",
        "SoItemPos":"0000000020",
        "ProductId":"HT-1105",
        "Note":"EPM DG: SO ID 0500000011 Item 0000000020",
        "CurrencyCode":"EUR",
        "GrossAmount":"103.53",
        "GrossAmountExt":"103.5300",
        "NetAmount":"87.00",
        "NetAmountExt":"87.0000",
        "TaxAmount":"16.53",
        "TaxAmountExt":"16.5300",
        "DeliveryDate":"\/Date(1410238800000)\/",
        "Quantity":"3.000",
        "QuantityUnit":"EA"
      },
      {
        "__metadata":{
          "id":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/LineItems(SoId='0500000011',SoItemPos='0000000030')",
          "uri":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/LineItems(SoId='0500000011',SoItemPos='0000000030')",
          "type":"Z_DEMO_ORDERS_SRV.LineItem"
        },
        "SoId":"0500000011",
        "SoItemPos":"0000000030",
        "ProductId":"HT-1106",
        "Note":"EPM DG: SO ID 0500000011 Item 0000000030",
        "CurrencyCode":"MXN",
        "GrossAmount":"121.38",
        "GrossAmountExt":"121.3800",
        "NetAmount":"102.00",
        "NetAmountExt":"102.0000",
        "TaxAmount":"19.38",
        "TaxAmountExt":"19.3800",
        "DeliveryDate":"\/Date(1410238800000)\/",
        "Quantity":"3.000",
        "QuantityUnit":"EA"
      },
      {
        "__metadata":{
          "id":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/LineItems(SoId='0500000011',SoItemPos='0000000040')",
          "uri":"http://server.com:1234/sap/opu/odata/sap/Z_DEMO_ORDERS_SRV/LineItems(SoId='0500000011',SoItemPos='0000000040')",
          "type":"Z_DEMO_ORDERS_SRV.LineItem"
        },
        "SoId":"0500000011",
        "SoItemPos":"0000000040",
        "ProductId":"HT-1107",
        "Note":"EPM DG: SO ID 0500000011 Item 0000000040",
        "CurrencyCode":"ARS",
        "GrossAmount":"35.58",
        "GrossAmountExt":"35.5800",
        "NetAmount":"29.90",
        "NetAmountExt":"29.9000",
        "TaxAmount":"5.68",
        "TaxAmountExt":"5.6800",
        "DeliveryDate":"\/Date(1410238800000)\/",
        "Quantity":"1.000",
        "QuantityUnit":"EA"
      }
    ]
  }
}
```

## Closing

If your results appear like those seen above, your service is complete! You are now ready to build an SAPUI5 client to consume your NetWeaver Gateway OData service!

[Skip to Client Building Module]({{site.baseurl}}/modules/client/getting-started/)
