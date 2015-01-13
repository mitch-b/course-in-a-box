---
title: Setting up the Core
published: true
---

# Setting up Component.js and our Navigation Router

We have a base project and it runs. Now let's set up some core components to ease our long-term development. We will do that by setting up our application initializer (`Component.js`) and our own custom navigation router (handling loading and unloading of views).

## Component.js

A Component in the UI5 world is an independent and resuable part of a web application. There are "faceless" and "UI" components that make up an application. Let's take a look at SAPUI5's documentation for a concise explanation:

<hr />

* **Faceless components** (class: `sap.ui.core.Component`)

  * Faceless components do not have a user interface and are used, for example, for a service that delivers data from a back-end system.

* **UI components** (class: `sap.ui.core.UIComponent`)

  * UI components extend components and add rendering functionality to the component. They represent a screen area or element on the user interface, for example, a button or a shell, along with the respective settings and metadata.

<cite> &mdash; [SAPUI5 SDK Documentation](https://sapui5.netweaver.ondemand.com/sdk/#docs/guide/958ead51e2e94ab8bcdc90fb7e9d53d0.html)</cite>

<hr />

At the base of our web application, we will create a new instance of a UIComponent. This UIComponent will contain settings and metadata about our core user interface. As part of those settings, we will declare a base view, and what URL routes map to which sub-views inside of the base view (a Master-Detail page).
