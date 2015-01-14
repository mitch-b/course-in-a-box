---
title: Setting up the SplitApp
published: true
---

# Setting up the SplitApp for our Master-Detail Views

Now that our component and router are both set up, let's reconfigure our index to properly manage loading and unloading our Master-Detail application.

## Replace default App view with a SplitApp

1. Open `/WebContent/odatalabclient/App.view.xml`.

    > If this is the first XML file you've opened in the project, Eclipse sometimes defaults to a design view of XML. There is a tab near the bottom which allows you to switch to the Source view. Do that now.

1. Replace it's contents with:

    ```xml
    <mvc:View
        xmlns:mvc="sap.ui.core.mvc"
        displayBlock="true"
        xmlns="sap.m">
        <SplitApp id="splitApp" />
    </mvc:View>
    ```

    We are cleaning up the default `<View>` tag, and assigning a single `sap.m.SplitApp` as our sole control. Our `odatalabclient.Component`'s routes will assign the Master and Detail views into this SplitApp control. You will also notice that this is the `rootView` in our `odatalabclient.Component`.

1. (Optional) At this time, there is no need for the default `App.controller.js` file. Since our SplitApp will not have any logic in its own Controller, we can remove this file.

    Let's take a look at running the application now to make sure things are still good.

1. Ensure your Tomcat server is still running by clicking on the Servers tab. If it says `[Started, Synchronized]`, then your server is still up and refreshed with your latest file changes.
1. Open your browser to [http://localhost:8080/odatalabclient/](http://localhost:8080/odatalabclient/)

You should see a screen that looks similar to the last, but you shouldn't see "Title" at the top anymore.
