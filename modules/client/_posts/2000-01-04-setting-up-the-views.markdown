---
title: Setting up the Views
published: true
---

# Setting up the SplitApp and Master-Detail Views

Now that our component and router are both set up, let's set up some views so that we can try running the app again.

1. Open `/WebContent/odatalabclient/App.view.xml`
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

