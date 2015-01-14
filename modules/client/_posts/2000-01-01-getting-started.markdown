---
title: Getting Started
published: true
---

# Setting Up Your Project

Let's now build a very simple SAPUI5 client which will try to parse an OData endpoint and display a list of objects based on the response it receives querying the entity set.

## Creating the UI5 Project

1. Open Eclipse
1. If prompted, create a new workspace at `[your preferred directory]\workspaces\odata-lab`

![eclipse_01_create_workspace.PNG]({{site.baseurl}}/img/eclipse_01_create_workspace.PNG)

1. If presented with welcome screen, click the Workbench icon in the top right of this view.
1. Create a new project by choosing the New Project icon, and choosing 'Project…'
1. Search in filter for 'ui5' and click Next

![eclipse_02_create_ui5_project.PNG]({{site.baseurl}}/img/eclipse_02_create_ui5_project.PNG)

1. Set application name as : 'ODataLabClient'
1. Set library as 'sap.m' and leave 'Create an Initial View' checked.
1. When creating the initial view, set Name to 'App' and choose XML development paradigm. Click Finish.
1. If you are prompted to open the Java EE perspective, you can switch to it if you'd like.
1. Right click the folder named `odatalabclient` which is under the `WebContent` folder.
1. Choose Rename&hellip; , change it to `view`. Our controllers (JS) and views (XML) will be stored in here.


Now, let's take a look at what it takes to run a UI5 application on Tomcat.
