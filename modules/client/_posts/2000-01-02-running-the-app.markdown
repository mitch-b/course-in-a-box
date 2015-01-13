---
title: Running on Tomcat
published: true
---

# Running the Application

Now that we have a base project, let's just make sure that runs properly. We will run our application in an [Apache Tomcat](http://tomcat.apache.org/) runtime. As part of the SAPUI5 Development Toolkit Plugin that SAP provides, there are some Java Servlets that will prove useful to us when hooking up to our SAP NetWeaver Gateway service. This won't be too detrimental when connecting to an ASP.NET Web API service either, so both backends can follow along here.

## Locate your Tomcat Binaries

First thing we'll want to do is figure out where we have Tomcat extracted. For this lab, let's assume you have it downloaded at `C:\tomcat\apache-tomcat-8.0.x\`. My folder looks like this:

![windows_01_tomcat_location.PNG]({{site.baseurl}}/img/windows_01_tomcat_location.PNG)

## Adding a Server Runtime in Eclipse

1. Click on Window > Show View &hellip; > Other &hellip;
1. Type `servers` into the filter box. Double click on the Servers result.
1. In my Eclipse perspective, the Servers view defaults to the bottom of my workbench. Right click inside this view pane and choose New > Server.
1. Expand the Apache folder and choose the Tomcat version which matches your downloaded version. I will choose `Tomcat v8.0 Server`.
1. Leave hostname as `localhost` and click Next.
1. Click Browse button and navigate to the root of your Tomcat directory. For example, I will navigate to `C:\tomcat\apache-tomcat-8.0.12\` since that is the location of my extracted files.
1. Click Next.
1. Click the 'Add All' button. You should see your Eclipse project in the list on the left move over to the right indicating the Tomcat server will host the application files.
1. Click Finish.

![eclipse_03_add_to_server.PNG]({{site.baseurl}}/img/eclipse_03_add_to_server.PNG)

Now that the server is configured, let's try running it.

## Starting and Stopping Tomcat from Eclipse

You will control starting/stopping straight from the Servers view in Eclipse. By right clicking on the server, you can control it's state.

1. Right click our new `Tomcat v8.0 Server at localhost` and choose Start.

The server will initialize, and when your console window stops updating, you can launch your favorite browser to [http://localhost:8080/ODataLabClient](http://localhost:8080/ODataLabClient).

> By default, adding a Tomcat server will try and bind to port 8080. If this is not available, you can choose another port by double clicking on the server in the Servers view itself, and changing the values in the settings.

![firefox_01_first_look.PNG]({{site.baseurl}}/img/firefox_01_first_look.PNG)

Yep. A nearly blank screen. But this is exactly what we have in our code base, so let's build from here. Next we will look at setting up some UI5 internals.
