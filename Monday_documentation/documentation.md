

# What is a monday app?

Learn about monday apps and the types of features you can develop with monday

<Embed typeOfEmbed="youtube" url="https://www.youtube.com/watch?v=nfb7wc6S4m8" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252Fnfb7wc6S4m8%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253Dnfb7wc6S4m8%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252Fnfb7wc6S4m8%252Fhqdefault.jpg%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22854%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" href="https://www.youtube.com/watch?v=nfb7wc6S4m8" providerUrl="https://www.youtube.com/" providerName="YouTube" />

<br />

monday.com is a customizable workOS that empowers teams to build processes, create projects, and complete day-to-day work according to their needs. It enables teams and organizations to develop tailored solutions to manage their workflows through various methods, including monday apps.

These apps expand the platform's core capabilities by allowing developers to create new building blocks, or apps, on top of monday using the apps framework. Each app is comprised of one or more app features built with the same framework.

The framework supports various app features that enable you to create innovative and functional apps to improve workflows. The options are infinite when you use the platform's building block features like <a href="https://support.monday.com/hc/en-us/articles/360001267945-What-are-the-board-views-" target="_blank">board views</a>, <a href="https://support.monday.com/hc/en-us/articles/360002187819-What-are-the-Dashboards-" target="_blank">dashboard widgets</a>, <a href="https://support.monday.com/hc/en-us/articles/360003445540-monday-com-Integrations" target="_blank">integrations</a>, <a href="https://support.monday.com/hc/en-us/articles/360001222900-monday-com-Automations" target="_blank">automations</a>.

This guide will walk through the essential details about building an app for monday and answer some of the most frequently asked questions. Let's get started!

# Who can build apps?

Any developer can build on top of monday.com using the apps framework. We designed the framework to function independently of your technologies (i.e., languages, frameworks, and infrastructure).

# What type of app features can I build?

The monday apps framework allows you to build various features, including board views, item views, board menu features, dashboard widgets, custom objects, account settings views, doc actions, AI assistant, integrations, and workspace templates.

## Board views

Board views enable users to visualize and manage data from a single monday.com board in many ways. Apps with board view features open in the tabs underneath the board title. Users can add them from the *Views Center* by clicking the **plus button (+)** in the tab section under the board title and selecting the app they want to add.

Check out our <a href="https://developer.monday.com/apps/docs/quickstart-view" target="_blank">quickstart guide</a> to learn how to build a simple view app!

<Image align="center" border={true} src="https://files.readme.io/cdb439c-Board_view.png" className="border" />

## Item views

Like board views, item views also allow users to see and manage data in different ways. However, item views are connected to a single item on a board, unlike board views that are connected to the entire board. Apps with item view features open in the <a href="https://support.monday.com/hc/en-us/articles/115005900249-The-Updates-Section" target="_blank">updates section</a> of an item. Users can add them from the *Item View Center* by clicking the **plus button (+)** in the tab section under the item name listed in the update.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/588e486-Item_view.png" title="Item View.jpg" className="border" />

## Board menu features

Unlike traditional board and item views, the board menu features enable developers to create apps that work on individual groups, individual items, or multiple items. These features extend the platform's capabilities as they operate on an item or group level.

You can read more about the board menu features <a href="https://developer.monday.com/apps/docs/board-menu-features" target="_blank">here</a>.

## Dashboard widget

<a href="https://support.monday.com/hc/en-us/articles/360002187819-The-Dashboards" target="_blank">Dashboards</a> provide a dedicated space to display data from multiple boards visually. Developers can build dashboard widgets that extend the built-in dashboard capabilities.

Dashboards live in the left-pane platform menu, just like boards! Users can add new widgets by clicking the **Add widget (+)** button underneath the dashboard title and selecting the app they want to add.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/4c49e75-Dashboard_widget.png" title="Dashboard Widget.jpg" className="border" />

## Custom objects

Custom objects allow you to create a view separate from a workflow while providing more real estate on the monday platform. Traditional views and widgets must be connected to a specific dashboard, board, or item on monday, but custom objects live independently in the left-pane menu so users can access the view outside of the context of a specific dashboard, board, or item.

You can read more about custom objects <a href="https://developer.monday.com/apps/docs/custom-objects" target="_blank">here</a>.

## Account settings view

The account settings view provides a dedicated space to display the global settings that impact the entire account. It is not a view that users can add to a board, unlike board and item views. This feature allocates space for developers to share the app's settings while making them more accessible.

You can read more about the account settings view <a href="https://developer.monday.com/apps/docs/account-settings-view" target="_blank">here</a>.

## Doc actions

Using the doc action feature, developers can create a plug-in that integrates their app with monday <a href="https://support.monday.com/hc/en-us/articles/360021702939-monday-workdocs" target="_blank">workdocs</a>. The doc action feature is a valuable tool that helps expand the workdocs functionality, eventually leading to more complex or automated workflows. For developers, this feature increases app exposure in a new market and leads to additional app usage opportunities in a different monday.com product.

You can read more about the doc actions feature <a href="https://developer.monday.com/apps/docs/doc-actions-for-workdocs" target="_blank">here</a>.

## AI assistant

The AI assistant app features leverage the power of artificial intelligence to build apps that further automate workflows and tasks. There are six different AI assistant app features to choose from based on your app's logic and where they can be accessed from the monday.com platform.

You can read more about the AI assistant app features <a href="https://developer.monday.com/apps/docs/ai-assistant" target="_blank">here</a>.

## Workspace templates

All of the other app features enable you to build apps that focus on a specific part of the monday.com platform (e.g., board, item, etc.), but workspace templates allow you to provide an all-in-one solution that contains everything users need. Workspace templates live in the left-pane platform menu; users can add them just like any board, document, or dashboard!

> 🚧 Templates for marketplace apps
>
> Workspace templates are useful for marketplace apps, but you must have another app feature in addition to the template. Apps with just a workspace template app feature will not be approved.

You can read more about workspace templates <a href="https://developer.monday.com/apps/docs/workspace-templates" target="_blank">here</a>.

<Image align="center" border={true} src="https://files.readme.io/0dba43b-Workspace_templates.png" className="border" />

# Who can use your monday apps?

It all depends on the <a href="https://developer.monday.com/apps/docs/share-your-apps" target="_blank">type of app</a> you create - private, public, or for the app marketplace!

You can build and install **private apps** that are exclusive to your monday.com account. These apps enable you to build on top of the platform to create custom functionalities that automate your workflows, integrate with your organization's other systems, and create visuals and custom reports for your needs. Users outside of the account cannot access your app.

You can also create a **public app** to share with the monday community. Like private apps, public apps enable you to build on top of the core platform to improve your workflows and bridge gaps in the system. The only difference is that people outside the account can access the app. You can build apps that enhance the monday.com product and sell them on your own or become a monday.com partner and create apps as a service you provide to your clients.

We also have an **app marketplace** where other monday.com users can browse for public third-party apps to install on their accounts. After building your app, you can [submit it for review](https://developer.monday.com/apps/docs/submit-your-app) for the app marketplace.

# What app features are supported on the monday.com mobile app?

Integrations, board views, and item views are currently supported on the mobile app. Learn more about building for mobile [here](https://developer.monday.com/apps/update/docs/building-for-mobile#/).

# Can I get a monday.com account for testing?

You can use any monday.com account to explore and test the monday.com apps framework. If you’re currently on a trial and need more time, you can [contact our support team](https://monday.com/helpcenter/contact-support) to request a trial extension.

For more thorough testing, we also offer free developer accounts designed specifically for app builders. You can sign up for a free developer account [here](https://auth.monday.com/users/sign_up_new?developer=true\&utm_source=dev_documentation#soft_signup_from_step) and start building right away.

## What’s included in a developer account?

Developer accounts include everything in the [Free plan](https://support.monday.com/hc/en-us/articles/360010487220-Understanding-the-Free-Plan), along with higher limits, advanced capabilities tailored for app development. They also include select Pro and Enterprise features commonly needed for building and testing apps.

These accounts include:

* Access to all monday.com products
* Up to 10 seats
* Up to 1,000 items per product
* Unlimited boards, dashboards, and workdocs
* Automations: 25,000 actions/month
* Integrations: 25,000 actions/month
* API complexity limit: 10M
* Account-, column-, and item-level permissions
* Access to all column types
* Private and shareable boards
* Item and board views
* Activity log tracking and filtering
* Templates
* Hacker theme

If your app requires additional testing capacity, submit a request [here](https://developer-community.monday.com/p/marketplace-partner-extensions) and our team will review it within 5 business days.

# How to start building?

We recommend all new monday app developers to start by going through our [views and widgets](https://developer.monday.com/apps/docs/quickstart-view) and [integrations](https://developer.monday.com/apps/docs/quickstart-integration) quickstart guides to familiarize themselves with our monday apps framework. You can also check out our [GitHub page](https://github.com/mondaycom/welcome-apps/tree/master/apps) for additional code examples.

Once you're ready to start building your first app, follow the instructions [here](https://developer.monday.com/apps/docs/create-an-app)!

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎



# What is a monday app?

Learn about monday apps and the types of features you can develop with monday

<Embed typeOfEmbed="youtube" url="https://www.youtube.com/watch?v=nfb7wc6S4m8" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252Fnfb7wc6S4m8%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253Dnfb7wc6S4m8%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252Fnfb7wc6S4m8%252Fhqdefault.jpg%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22854%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" href="https://www.youtube.com/watch?v=nfb7wc6S4m8" providerUrl="https://www.youtube.com/" providerName="YouTube" />

<br />

monday.com is a customizable workOS that empowers teams to build processes, create projects, and complete day-to-day work according to their needs. It enables teams and organizations to develop tailored solutions to manage their workflows through various methods, including monday apps.

These apps expand the platform's core capabilities by allowing developers to create new building blocks, or apps, on top of monday using the apps framework. Each app is comprised of one or more app features built with the same framework.

The framework supports various app features that enable you to create innovative and functional apps to improve workflows. The options are infinite when you use the platform's building block features like <a href="https://support.monday.com/hc/en-us/articles/360001267945-What-are-the-board-views-" target="_blank">board views</a>, <a href="https://support.monday.com/hc/en-us/articles/360002187819-What-are-the-Dashboards-" target="_blank">dashboard widgets</a>, <a href="https://support.monday.com/hc/en-us/articles/360003445540-monday-com-Integrations" target="_blank">integrations</a>, <a href="https://support.monday.com/hc/en-us/articles/360001222900-monday-com-Automations" target="_blank">automations</a>.

This guide will walk through the essential details about building an app for monday and answer some of the most frequently asked questions. Let's get started!

# Who can build apps?

Any developer can build on top of monday.com using the apps framework. We designed the framework to function independently of your technologies (i.e., languages, frameworks, and infrastructure).

# What type of app features can I build?

The monday apps framework allows you to build various features, including board views, item views, board menu features, dashboard widgets, custom objects, account settings views, doc actions, AI assistant, integrations, and workspace templates.

## Board views

Board views enable users to visualize and manage data from a single monday.com board in many ways. Apps with board view features open in the tabs underneath the board title. Users can add them from the *Views Center* by clicking the **plus button (+)** in the tab section under the board title and selecting the app they want to add.

Check out our <a href="https://developer.monday.com/apps/docs/quickstart-view" target="_blank">quickstart guide</a> to learn how to build a simple view app!

<Image align="center" border={true} src="https://files.readme.io/cdb439c-Board_view.png" className="border" />

## Item views

Like board views, item views also allow users to see and manage data in different ways. However, item views are connected to a single item on a board, unlike board views that are connected to the entire board. Apps with item view features open in the <a href="https://support.monday.com/hc/en-us/articles/115005900249-The-Updates-Section" target="_blank">updates section</a> of an item. Users can add them from the *Item View Center* by clicking the **plus button (+)** in the tab section under the item name listed in the update.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/588e486-Item_view.png" title="Item View.jpg" className="border" />

## Board menu features

Unlike traditional board and item views, the board menu features enable developers to create apps that work on individual groups, individual items, or multiple items. These features extend the platform's capabilities as they operate on an item or group level.

You can read more about the board menu features <a href="https://developer.monday.com/apps/docs/board-menu-features" target="_blank">here</a>.

## Dashboard widget

<a href="https://support.monday.com/hc/en-us/articles/360002187819-The-Dashboards" target="_blank">Dashboards</a> provide a dedicated space to display data from multiple boards visually. Developers can build dashboard widgets that extend the built-in dashboard capabilities.

Dashboards live in the left-pane platform menu, just like boards! Users can add new widgets by clicking the **Add widget (+)** button underneath the dashboard title and selecting the app they want to add.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/4c49e75-Dashboard_widget.png" title="Dashboard Widget.jpg" className="border" />

## Custom objects

Custom objects allow you to create a view separate from a workflow while providing more real estate on the monday platform. Traditional views and widgets must be connected to a specific dashboard, board, or item on monday, but custom objects live independently in the left-pane menu so users can access the view outside of the context of a specific dashboard, board, or item.

You can read more about custom objects <a href="https://developer.monday.com/apps/docs/custom-objects" target="_blank">here</a>.

## Account settings view

The account settings view provides a dedicated space to display the global settings that impact the entire account. It is not a view that users can add to a board, unlike board and item views. This feature allocates space for developers to share the app's settings while making them more accessible.

You can read more about the account settings view <a href="https://developer.monday.com/apps/docs/account-settings-view" target="_blank">here</a>.

## Doc actions

Using the doc action feature, developers can create a plug-in that integrates their app with monday <a href="https://support.monday.com/hc/en-us/articles/360021702939-monday-workdocs" target="_blank">workdocs</a>. The doc action feature is a valuable tool that helps expand the workdocs functionality, eventually leading to more complex or automated workflows. For developers, this feature increases app exposure in a new market and leads to additional app usage opportunities in a different monday.com product.

You can read more about the doc actions feature <a href="https://developer.monday.com/apps/docs/doc-actions-for-workdocs" target="_blank">here</a>.

## AI assistant

The AI assistant app features leverage the power of artificial intelligence to build apps that further automate workflows and tasks. There are six different AI assistant app features to choose from based on your app's logic and where they can be accessed from the monday.com platform.

You can read more about the AI assistant app features <a href="https://developer.monday.com/apps/docs/ai-assistant" target="_blank">here</a>.

## Workspace templates

All of the other app features enable you to build apps that focus on a specific part of the monday.com platform (e.g., board, item, etc.), but workspace templates allow you to provide an all-in-one solution that contains everything users need. Workspace templates live in the left-pane platform menu; users can add them just like any board, document, or dashboard!

> 🚧 Templates for marketplace apps
>
> Workspace templates are useful for marketplace apps, but you must have another app feature in addition to the template. Apps with just a workspace template app feature will not be approved.

You can read more about workspace templates <a href="https://developer.monday.com/apps/docs/workspace-templates" target="_blank">here</a>.

<Image align="center" border={true} src="https://files.readme.io/0dba43b-Workspace_templates.png" className="border" />

# Who can use your monday apps?

It all depends on the <a href="https://developer.monday.com/apps/docs/share-your-apps" target="_blank">type of app</a> you create - private, public, or for the app marketplace!

You can build and install **private apps** that are exclusive to your monday.com account. These apps enable you to build on top of the platform to create custom functionalities that automate your workflows, integrate with your organization's other systems, and create visuals and custom reports for your needs. Users outside of the account cannot access your app.

You can also create a **public app** to share with the monday community. Like private apps, public apps enable you to build on top of the core platform to improve your workflows and bridge gaps in the system. The only difference is that people outside the account can access the app. You can build apps that enhance the monday.com product and sell them on your own or become a monday.com partner and create apps as a service you provide to your clients.

We also have an **app marketplace** where other monday.com users can browse for public third-party apps to install on their accounts. After building your app, you can [submit it for review](https://developer.monday.com/apps/docs/submit-your-app) for the app marketplace.

# What app features are supported on the monday.com mobile app?

Integrations, board views, and item views are currently supported on the mobile app. Learn more about building for mobile [here](https://developer.monday.com/apps/update/docs/building-for-mobile#/).

# Can I get a monday.com account for testing?

You can use any monday.com account to explore and test the monday.com apps framework. If you’re currently on a trial and need more time, you can [contact our support team](https://monday.com/helpcenter/contact-support) to request a trial extension.

For more thorough testing, we also offer free developer accounts designed specifically for app builders. You can sign up for a free developer account [here](https://auth.monday.com/users/sign_up_new?developer=true\&utm_source=dev_documentation#soft_signup_from_step) and start building right away.

## What’s included in a developer account?

Developer accounts include everything in the [Free plan](https://support.monday.com/hc/en-us/articles/360010487220-Understanding-the-Free-Plan), along with higher limits, advanced capabilities tailored for app development. They also include select Pro and Enterprise features commonly needed for building and testing apps.

These accounts include:

* Access to all monday.com products
* Up to 10 seats
* Up to 1,000 items per product
* Unlimited boards, dashboards, and workdocs
* Automations: 25,000 actions/month
* Integrations: 25,000 actions/month
* API complexity limit: 10M
* Account-, column-, and item-level permissions
* Access to all column types
* Private and shareable boards
* Item and board views
* Activity log tracking and filtering
* Templates
* Hacker theme

If your app requires additional testing capacity, submit a request [here](https://developer-community.monday.com/p/marketplace-partner-extensions) and our team will review it within 5 business days.

# How to start building?

We recommend all new monday app developers to start by going through our [views and widgets](https://developer.monday.com/apps/docs/quickstart-view) and [integrations](https://developer.monday.com/apps/docs/quickstart-integration) quickstart guides to familiarize themselves with our monday apps framework. You can also check out our [GitHub page](https://github.com/mondaycom/welcome-apps/tree/master/apps) for additional code examples.

Once you're ready to start building your first app, follow the instructions [here](https://developer.monday.com/apps/docs/create-an-app)!

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎




# What is a monday app?

Learn about monday apps and the types of features you can develop with monday

<Embed typeOfEmbed="youtube" url="https://www.youtube.com/watch?v=nfb7wc6S4m8" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252Fnfb7wc6S4m8%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253Dnfb7wc6S4m8%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252Fnfb7wc6S4m8%252Fhqdefault.jpg%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22854%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" href="https://www.youtube.com/watch?v=nfb7wc6S4m8" providerUrl="https://www.youtube.com/" providerName="YouTube" />

<br />

monday.com is a customizable workOS that empowers teams to build processes, create projects, and complete day-to-day work according to their needs. It enables teams and organizations to develop tailored solutions to manage their workflows through various methods, including monday apps.

These apps expand the platform's core capabilities by allowing developers to create new building blocks, or apps, on top of monday using the apps framework. Each app is comprised of one or more app features built with the same framework.

The framework supports various app features that enable you to create innovative and functional apps to improve workflows. The options are infinite when you use the platform's building block features like <a href="https://support.monday.com/hc/en-us/articles/360001267945-What-are-the-board-views-" target="_blank">board views</a>, <a href="https://support.monday.com/hc/en-us/articles/360002187819-What-are-the-Dashboards-" target="_blank">dashboard widgets</a>, <a href="https://support.monday.com/hc/en-us/articles/360003445540-monday-com-Integrations" target="_blank">integrations</a>, <a href="https://support.monday.com/hc/en-us/articles/360001222900-monday-com-Automations" target="_blank">automations</a>.

This guide will walk through the essential details about building an app for monday and answer some of the most frequently asked questions. Let's get started!

# Who can build apps?

Any developer can build on top of monday.com using the apps framework. We designed the framework to function independently of your technologies (i.e., languages, frameworks, and infrastructure).

# What type of app features can I build?

The monday apps framework allows you to build various features, including board views, item views, board menu features, dashboard widgets, custom objects, account settings views, doc actions, AI assistant, integrations, and workspace templates.

## Board views

Board views enable users to visualize and manage data from a single monday.com board in many ways. Apps with board view features open in the tabs underneath the board title. Users can add them from the *Views Center* by clicking the **plus button (+)** in the tab section under the board title and selecting the app they want to add.

Check out our <a href="https://developer.monday.com/apps/docs/quickstart-view" target="_blank">quickstart guide</a> to learn how to build a simple view app!

<Image align="center" border={true} src="https://files.readme.io/cdb439c-Board_view.png" className="border" />

## Item views

Like board views, item views also allow users to see and manage data in different ways. However, item views are connected to a single item on a board, unlike board views that are connected to the entire board. Apps with item view features open in the <a href="https://support.monday.com/hc/en-us/articles/115005900249-The-Updates-Section" target="_blank">updates section</a> of an item. Users can add them from the *Item View Center* by clicking the **plus button (+)** in the tab section under the item name listed in the update.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/588e486-Item_view.png" title="Item View.jpg" className="border" />

## Board menu features

Unlike traditional board and item views, the board menu features enable developers to create apps that work on individual groups, individual items, or multiple items. These features extend the platform's capabilities as they operate on an item or group level.

You can read more about the board menu features <a href="https://developer.monday.com/apps/docs/board-menu-features" target="_blank">here</a>.

## Dashboard widget

<a href="https://support.monday.com/hc/en-us/articles/360002187819-The-Dashboards" target="_blank">Dashboards</a> provide a dedicated space to display data from multiple boards visually. Developers can build dashboard widgets that extend the built-in dashboard capabilities.

Dashboards live in the left-pane platform menu, just like boards! Users can add new widgets by clicking the **Add widget (+)** button underneath the dashboard title and selecting the app they want to add.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/4c49e75-Dashboard_widget.png" title="Dashboard Widget.jpg" className="border" />

## Custom objects

Custom objects allow you to create a view separate from a workflow while providing more real estate on the monday platform. Traditional views and widgets must be connected to a specific dashboard, board, or item on monday, but custom objects live independently in the left-pane menu so users can access the view outside of the context of a specific dashboard, board, or item.

You can read more about custom objects <a href="https://developer.monday.com/apps/docs/custom-objects" target="_blank">here</a>.

## Account settings view

The account settings view provides a dedicated space to display the global settings that impact the entire account. It is not a view that users can add to a board, unlike board and item views. This feature allocates space for developers to share the app's settings while making them more accessible.

You can read more about the account settings view <a href="https://developer.monday.com/apps/docs/account-settings-view" target="_blank">here</a>.

## Doc actions

Using the doc action feature, developers can create a plug-in that integrates their app with monday <a href="https://support.monday.com/hc/en-us/articles/360021702939-monday-workdocs" target="_blank">workdocs</a>. The doc action feature is a valuable tool that helps expand the workdocs functionality, eventually leading to more complex or automated workflows. For developers, this feature increases app exposure in a new market and leads to additional app usage opportunities in a different monday.com product.

You can read more about the doc actions feature <a href="https://developer.monday.com/apps/docs/doc-actions-for-workdocs" target="_blank">here</a>.

## AI assistant

The AI assistant app features leverage the power of artificial intelligence to build apps that further automate workflows and tasks. There are six different AI assistant app features to choose from based on your app's logic and where they can be accessed from the monday.com platform.

You can read more about the AI assistant app features <a href="https://developer.monday.com/apps/docs/ai-assistant" target="_blank">here</a>.

## Workspace templates

All of the other app features enable you to build apps that focus on a specific part of the monday.com platform (e.g., board, item, etc.), but workspace templates allow you to provide an all-in-one solution that contains everything users need. Workspace templates live in the left-pane platform menu; users can add them just like any board, document, or dashboard!

> 🚧 Templates for marketplace apps
>
> Workspace templates are useful for marketplace apps, but you must have another app feature in addition to the template. Apps with just a workspace template app feature will not be approved.

You can read more about workspace templates <a href="https://developer.monday.com/apps/docs/workspace-templates" target="_blank">here</a>.

<Image align="center" border={true} src="https://files.readme.io/0dba43b-Workspace_templates.png" className="border" />

# Who can use your monday apps?

It all depends on the <a href="https://developer.monday.com/apps/docs/share-your-apps" target="_blank">type of app</a> you create - private, public, or for the app marketplace!

You can build and install **private apps** that are exclusive to your monday.com account. These apps enable you to build on top of the platform to create custom functionalities that automate your workflows, integrate with your organization's other systems, and create visuals and custom reports for your needs. Users outside of the account cannot access your app.

You can also create a **public app** to share with the monday community. Like private apps, public apps enable you to build on top of the core platform to improve your workflows and bridge gaps in the system. The only difference is that people outside the account can access the app. You can build apps that enhance the monday.com product and sell them on your own or become a monday.com partner and create apps as a service you provide to your clients.

We also have an **app marketplace** where other monday.com users can browse for public third-party apps to install on their accounts. After building your app, you can [submit it for review](https://developer.monday.com/apps/docs/submit-your-app) for the app marketplace.

# What app features are supported on the monday.com mobile app?

Integrations, board views, and item views are currently supported on the mobile app. Learn more about building for mobile [here](https://developer.monday.com/apps/update/docs/building-for-mobile#/).

# Can I get a monday.com account for testing?

You can use any monday.com account to explore and test the monday.com apps framework. If you’re currently on a trial and need more time, you can [contact our support team](https://monday.com/helpcenter/contact-support) to request a trial extension.

For more thorough testing, we also offer free developer accounts designed specifically for app builders. You can sign up for a free developer account [here](https://auth.monday.com/users/sign_up_new?developer=true\&utm_source=dev_documentation#soft_signup_from_step) and start building right away.

## What’s included in a developer account?

Developer accounts include everything in the [Free plan](https://support.monday.com/hc/en-us/articles/360010487220-Understanding-the-Free-Plan), along with higher limits, advanced capabilities tailored for app development. They also include select Pro and Enterprise features commonly needed for building and testing apps.

These accounts include:

* Access to all monday.com products
* Up to 10 seats
* Up to 1,000 items per product
* Unlimited boards, dashboards, and workdocs
* Automations: 25,000 actions/month
* Integrations: 25,000 actions/month
* API complexity limit: 10M
* Account-, column-, and item-level permissions
* Access to all column types
* Private and shareable boards
* Item and board views
* Activity log tracking and filtering
* Templates
* Hacker theme

If your app requires additional testing capacity, submit a request [here](https://developer-community.monday.com/p/marketplace-partner-extensions) and our team will review it within 5 business days.

# How to start building?

We recommend all new monday app developers to start by going through our [views and widgets](https://developer.monday.com/apps/docs/quickstart-view) and [integrations](https://developer.monday.com/apps/docs/quickstart-integration) quickstart guides to familiarize themselves with our monday apps framework. You can also check out our [GitHub page](https://github.com/mondaycom/welcome-apps/tree/master/apps) for additional code examples.

Once you're ready to start building your first app, follow the instructions [here](https://developer.monday.com/apps/docs/create-an-app)!

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎




# What is a monday app?

Learn about monday apps and the types of features you can develop with monday

<Embed typeOfEmbed="youtube" url="https://www.youtube.com/watch?v=nfb7wc6S4m8" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252Fnfb7wc6S4m8%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253Dnfb7wc6S4m8%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252Fnfb7wc6S4m8%252Fhqdefault.jpg%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22854%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" href="https://www.youtube.com/watch?v=nfb7wc6S4m8" providerUrl="https://www.youtube.com/" providerName="YouTube" />

<br />

monday.com is a customizable workOS that empowers teams to build processes, create projects, and complete day-to-day work according to their needs. It enables teams and organizations to develop tailored solutions to manage their workflows through various methods, including monday apps.

These apps expand the platform's core capabilities by allowing developers to create new building blocks, or apps, on top of monday using the apps framework. Each app is comprised of one or more app features built with the same framework.

The framework supports various app features that enable you to create innovative and functional apps to improve workflows. The options are infinite when you use the platform's building block features like <a href="https://support.monday.com/hc/en-us/articles/360001267945-What-are-the-board-views-" target="_blank">board views</a>, <a href="https://support.monday.com/hc/en-us/articles/360002187819-What-are-the-Dashboards-" target="_blank">dashboard widgets</a>, <a href="https://support.monday.com/hc/en-us/articles/360003445540-monday-com-Integrations" target="_blank">integrations</a>, <a href="https://support.monday.com/hc/en-us/articles/360001222900-monday-com-Automations" target="_blank">automations</a>.

This guide will walk through the essential details about building an app for monday and answer some of the most frequently asked questions. Let's get started!

# Who can build apps?

Any developer can build on top of monday.com using the apps framework. We designed the framework to function independently of your technologies (i.e., languages, frameworks, and infrastructure).

# What type of app features can I build?

The monday apps framework allows you to build various features, including board views, item views, board menu features, dashboard widgets, custom objects, account settings views, doc actions, AI assistant, integrations, and workspace templates.

## Board views

Board views enable users to visualize and manage data from a single monday.com board in many ways. Apps with board view features open in the tabs underneath the board title. Users can add them from the *Views Center* by clicking the **plus button (+)** in the tab section under the board title and selecting the app they want to add.

Check out our <a href="https://developer.monday.com/apps/docs/quickstart-view" target="_blank">quickstart guide</a> to learn how to build a simple view app!

<Image align="center" border={true} src="https://files.readme.io/cdb439c-Board_view.png" className="border" />

## Item views

Like board views, item views also allow users to see and manage data in different ways. However, item views are connected to a single item on a board, unlike board views that are connected to the entire board. Apps with item view features open in the <a href="https://support.monday.com/hc/en-us/articles/115005900249-The-Updates-Section" target="_blank">updates section</a> of an item. Users can add them from the *Item View Center* by clicking the **plus button (+)** in the tab section under the item name listed in the update.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/588e486-Item_view.png" title="Item View.jpg" className="border" />

## Board menu features

Unlike traditional board and item views, the board menu features enable developers to create apps that work on individual groups, individual items, or multiple items. These features extend the platform's capabilities as they operate on an item or group level.

You can read more about the board menu features <a href="https://developer.monday.com/apps/docs/board-menu-features" target="_blank">here</a>.

## Dashboard widget

<a href="https://support.monday.com/hc/en-us/articles/360002187819-The-Dashboards" target="_blank">Dashboards</a> provide a dedicated space to display data from multiple boards visually. Developers can build dashboard widgets that extend the built-in dashboard capabilities.

Dashboards live in the left-pane platform menu, just like boards! Users can add new widgets by clicking the **Add widget (+)** button underneath the dashboard title and selecting the app they want to add.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/4c49e75-Dashboard_widget.png" title="Dashboard Widget.jpg" className="border" />

## Custom objects

Custom objects allow you to create a view separate from a workflow while providing more real estate on the monday platform. Traditional views and widgets must be connected to a specific dashboard, board, or item on monday, but custom objects live independently in the left-pane menu so users can access the view outside of the context of a specific dashboard, board, or item.

You can read more about custom objects <a href="https://developer.monday.com/apps/docs/custom-objects" target="_blank">here</a>.

## Account settings view

The account settings view provides a dedicated space to display the global settings that impact the entire account. It is not a view that users can add to a board, unlike board and item views. This feature allocates space for developers to share the app's settings while making them more accessible.

You can read more about the account settings view <a href="https://developer.monday.com/apps/docs/account-settings-view" target="_blank">here</a>.

## Doc actions

Using the doc action feature, developers can create a plug-in that integrates their app with monday <a href="https://support.monday.com/hc/en-us/articles/360021702939-monday-workdocs" target="_blank">workdocs</a>. The doc action feature is a valuable tool that helps expand the workdocs functionality, eventually leading to more complex or automated workflows. For developers, this feature increases app exposure in a new market and leads to additional app usage opportunities in a different monday.com product.

You can read more about the doc actions feature <a href="https://developer.monday.com/apps/docs/doc-actions-for-workdocs" target="_blank">here</a>.

## AI assistant

The AI assistant app features leverage the power of artificial intelligence to build apps that further automate workflows and tasks. There are six different AI assistant app features to choose from based on your app's logic and where they can be accessed from the monday.com platform.

You can read more about the AI assistant app features <a href="https://developer.monday.com/apps/docs/ai-assistant" target="_blank">here</a>.

## Workspace templates

All of the other app features enable you to build apps that focus on a specific part of the monday.com platform (e.g., board, item, etc.), but workspace templates allow you to provide an all-in-one solution that contains everything users need. Workspace templates live in the left-pane platform menu; users can add them just like any board, document, or dashboard!

> 🚧 Templates for marketplace apps
>
> Workspace templates are useful for marketplace apps, but you must have another app feature in addition to the template. Apps with just a workspace template app feature will not be approved.

You can read more about workspace templates <a href="https://developer.monday.com/apps/docs/workspace-templates" target="_blank">here</a>.

<Image align="center" border={true} src="https://files.readme.io/0dba43b-Workspace_templates.png" className="border" />

# Who can use your monday apps?

It all depends on the <a href="https://developer.monday.com/apps/docs/share-your-apps" target="_blank">type of app</a> you create - private, public, or for the app marketplace!

You can build and install **private apps** that are exclusive to your monday.com account. These apps enable you to build on top of the platform to create custom functionalities that automate your workflows, integrate with your organization's other systems, and create visuals and custom reports for your needs. Users outside of the account cannot access your app.

You can also create a **public app** to share with the monday community. Like private apps, public apps enable you to build on top of the core platform to improve your workflows and bridge gaps in the system. The only difference is that people outside the account can access the app. You can build apps that enhance the monday.com product and sell them on your own or become a monday.com partner and create apps as a service you provide to your clients.

We also have an **app marketplace** where other monday.com users can browse for public third-party apps to install on their accounts. After building your app, you can [submit it for review](https://developer.monday.com/apps/docs/submit-your-app) for the app marketplace.

# What app features are supported on the monday.com mobile app?

Integrations, board views, and item views are currently supported on the mobile app. Learn more about building for mobile [here](https://developer.monday.com/apps/update/docs/building-for-mobile#/).

# Can I get a monday.com account for testing?

You can use any monday.com account to explore and test the monday.com apps framework. If you’re currently on a trial and need more time, you can [contact our support team](https://monday.com/helpcenter/contact-support) to request a trial extension.

For more thorough testing, we also offer free developer accounts designed specifically for app builders. You can sign up for a free developer account [here](https://auth.monday.com/users/sign_up_new?developer=true\&utm_source=dev_documentation#soft_signup_from_step) and start building right away.

## What’s included in a developer account?

Developer accounts include everything in the [Free plan](https://support.monday.com/hc/en-us/articles/360010487220-Understanding-the-Free-Plan), along with higher limits, advanced capabilities tailored for app development. They also include select Pro and Enterprise features commonly needed for building and testing apps.

These accounts include:

* Access to all monday.com products
* Up to 10 seats
* Up to 1,000 items per product
* Unlimited boards, dashboards, and workdocs
* Automations: 25,000 actions/month
* Integrations: 25,000 actions/month
* API complexity limit: 10M
* Account-, column-, and item-level permissions
* Access to all column types
* Private and shareable boards
* Item and board views
* Activity log tracking and filtering
* Templates
* Hacker theme

If your app requires additional testing capacity, submit a request [here](https://developer-community.monday.com/p/marketplace-partner-extensions) and our team will review it within 5 business days.

# How to start building?

We recommend all new monday app developers to start by going through our [views and widgets](https://developer.monday.com/apps/docs/quickstart-view) and [integrations](https://developer.monday.com/apps/docs/quickstart-integration) quickstart guides to familiarize themselves with our monday apps framework. You can also check out our [GitHub page](https://github.com/mondaycom/welcome-apps/tree/master/apps) for additional code examples.

Once you're ready to start building your first app, follow the instructions [here](https://developer.monday.com/apps/docs/create-an-app)!

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎



# What is a monday app?

Learn about monday apps and the types of features you can develop with monday

<Embed typeOfEmbed="youtube" url="https://www.youtube.com/watch?v=nfb7wc6S4m8" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252Fnfb7wc6S4m8%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253Dnfb7wc6S4m8%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252Fnfb7wc6S4m8%252Fhqdefault.jpg%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22854%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" href="https://www.youtube.com/watch?v=nfb7wc6S4m8" providerUrl="https://www.youtube.com/" providerName="YouTube" />

<br />

monday.com is a customizable workOS that empowers teams to build processes, create projects, and complete day-to-day work according to their needs. It enables teams and organizations to develop tailored solutions to manage their workflows through various methods, including monday apps.

These apps expand the platform's core capabilities by allowing developers to create new building blocks, or apps, on top of monday using the apps framework. Each app is comprised of one or more app features built with the same framework.

The framework supports various app features that enable you to create innovative and functional apps to improve workflows. The options are infinite when you use the platform's building block features like <a href="https://support.monday.com/hc/en-us/articles/360001267945-What-are-the-board-views-" target="_blank">board views</a>, <a href="https://support.monday.com/hc/en-us/articles/360002187819-What-are-the-Dashboards-" target="_blank">dashboard widgets</a>, <a href="https://support.monday.com/hc/en-us/articles/360003445540-monday-com-Integrations" target="_blank">integrations</a>, <a href="https://support.monday.com/hc/en-us/articles/360001222900-monday-com-Automations" target="_blank">automations</a>.

This guide will walk through the essential details about building an app for monday and answer some of the most frequently asked questions. Let's get started!

# Who can build apps?

Any developer can build on top of monday.com using the apps framework. We designed the framework to function independently of your technologies (i.e., languages, frameworks, and infrastructure).

# What type of app features can I build?

The monday apps framework allows you to build various features, including board views, item views, board menu features, dashboard widgets, custom objects, account settings views, doc actions, AI assistant, integrations, and workspace templates.

## Board views

Board views enable users to visualize and manage data from a single monday.com board in many ways. Apps with board view features open in the tabs underneath the board title. Users can add them from the *Views Center* by clicking the **plus button (+)** in the tab section under the board title and selecting the app they want to add.

Check out our <a href="https://developer.monday.com/apps/docs/quickstart-view" target="_blank">quickstart guide</a> to learn how to build a simple view app!

<Image align="center" border={true} src="https://files.readme.io/cdb439c-Board_view.png" className="border" />

## Item views

Like board views, item views also allow users to see and manage data in different ways. However, item views are connected to a single item on a board, unlike board views that are connected to the entire board. Apps with item view features open in the <a href="https://support.monday.com/hc/en-us/articles/115005900249-The-Updates-Section" target="_blank">updates section</a> of an item. Users can add them from the *Item View Center* by clicking the **plus button (+)** in the tab section under the item name listed in the update.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/588e486-Item_view.png" title="Item View.jpg" className="border" />

## Board menu features

Unlike traditional board and item views, the board menu features enable developers to create apps that work on individual groups, individual items, or multiple items. These features extend the platform's capabilities as they operate on an item or group level.

You can read more about the board menu features <a href="https://developer.monday.com/apps/docs/board-menu-features" target="_blank">here</a>.

## Dashboard widget

<a href="https://support.monday.com/hc/en-us/articles/360002187819-The-Dashboards" target="_blank">Dashboards</a> provide a dedicated space to display data from multiple boards visually. Developers can build dashboard widgets that extend the built-in dashboard capabilities.

Dashboards live in the left-pane platform menu, just like boards! Users can add new widgets by clicking the **Add widget (+)** button underneath the dashboard title and selecting the app they want to add.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/4c49e75-Dashboard_widget.png" title="Dashboard Widget.jpg" className="border" />

## Custom objects

Custom objects allow you to create a view separate from a workflow while providing more real estate on the monday platform. Traditional views and widgets must be connected to a specific dashboard, board, or item on monday, but custom objects live independently in the left-pane menu so users can access the view outside of the context of a specific dashboard, board, or item.

You can read more about custom objects <a href="https://developer.monday.com/apps/docs/custom-objects" target="_blank">here</a>.

## Account settings view

The account settings view provides a dedicated space to display the global settings that impact the entire account. It is not a view that users can add to a board, unlike board and item views. This feature allocates space for developers to share the app's settings while making them more accessible.

You can read more about the account settings view <a href="https://developer.monday.com/apps/docs/account-settings-view" target="_blank">here</a>.

## Doc actions

Using the doc action feature, developers can create a plug-in that integrates their app with monday <a href="https://support.monday.com/hc/en-us/articles/360021702939-monday-workdocs" target="_blank">workdocs</a>. The doc action feature is a valuable tool that helps expand the workdocs functionality, eventually leading to more complex or automated workflows. For developers, this feature increases app exposure in a new market and leads to additional app usage opportunities in a different monday.com product.

You can read more about the doc actions feature <a href="https://developer.monday.com/apps/docs/doc-actions-for-workdocs" target="_blank">here</a>.

## AI assistant

The AI assistant app features leverage the power of artificial intelligence to build apps that further automate workflows and tasks. There are six different AI assistant app features to choose from based on your app's logic and where they can be accessed from the monday.com platform.

You can read more about the AI assistant app features <a href="https://developer.monday.com/apps/docs/ai-assistant" target="_blank">here</a>.

## Workspace templates

All of the other app features enable you to build apps that focus on a specific part of the monday.com platform (e.g., board, item, etc.), but workspace templates allow you to provide an all-in-one solution that contains everything users need. Workspace templates live in the left-pane platform menu; users can add them just like any board, document, or dashboard!

> 🚧 Templates for marketplace apps
>
> Workspace templates are useful for marketplace apps, but you must have another app feature in addition to the template. Apps with just a workspace template app feature will not be approved.

You can read more about workspace templates <a href="https://developer.monday.com/apps/docs/workspace-templates" target="_blank">here</a>.

<Image align="center" border={true} src="https://files.readme.io/0dba43b-Workspace_templates.png" className="border" />

# Who can use your monday apps?

It all depends on the <a href="https://developer.monday.com/apps/docs/share-your-apps" target="_blank">type of app</a> you create - private, public, or for the app marketplace!

You can build and install **private apps** that are exclusive to your monday.com account. These apps enable you to build on top of the platform to create custom functionalities that automate your workflows, integrate with your organization's other systems, and create visuals and custom reports for your needs. Users outside of the account cannot access your app.

You can also create a **public app** to share with the monday community. Like private apps, public apps enable you to build on top of the core platform to improve your workflows and bridge gaps in the system. The only difference is that people outside the account can access the app. You can build apps that enhance the monday.com product and sell them on your own or become a monday.com partner and create apps as a service you provide to your clients.

We also have an **app marketplace** where other monday.com users can browse for public third-party apps to install on their accounts. After building your app, you can [submit it for review](https://developer.monday.com/apps/docs/submit-your-app) for the app marketplace.

# What app features are supported on the monday.com mobile app?

Integrations, board views, and item views are currently supported on the mobile app. Learn more about building for mobile [here](https://developer.monday.com/apps/update/docs/building-for-mobile#/).

# Can I get a monday.com account for testing?

You can use any monday.com account to explore and test the monday.com apps framework. If you’re currently on a trial and need more time, you can [contact our support team](https://monday.com/helpcenter/contact-support) to request a trial extension.

For more thorough testing, we also offer free developer accounts designed specifically for app builders. You can sign up for a free developer account [here](https://auth.monday.com/users/sign_up_new?developer=true\&utm_source=dev_documentation#soft_signup_from_step) and start building right away.

## What’s included in a developer account?

Developer accounts include everything in the [Free plan](https://support.monday.com/hc/en-us/articles/360010487220-Understanding-the-Free-Plan), along with higher limits, advanced capabilities tailored for app development. They also include select Pro and Enterprise features commonly needed for building and testing apps.

These accounts include:

* Access to all monday.com products
* Up to 10 seats
* Up to 1,000 items per product
* Unlimited boards, dashboards, and workdocs
* Automations: 25,000 actions/month
* Integrations: 25,000 actions/month
* API complexity limit: 10M
* Account-, column-, and item-level permissions
* Access to all column types
* Private and shareable boards
* Item and board views
* Activity log tracking and filtering
* Templates
* Hacker theme

If your app requires additional testing capacity, submit a request [here](https://developer-community.monday.com/p/marketplace-partner-extensions) and our team will review it within 5 business days.

# How to start building?

We recommend all new monday app developers to start by going through our [views and widgets](https://developer.monday.com/apps/docs/quickstart-view) and [integrations](https://developer.monday.com/apps/docs/quickstart-integration) quickstart guides to familiarize themselves with our monday apps framework. You can also check out our [GitHub page](https://github.com/mondaycom/welcome-apps/tree/master/apps) for additional code examples.

Once you're ready to start building your first app, follow the instructions [here](https://developer.monday.com/apps/docs/create-an-app)!

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎



# What is a monday app?

Learn about monday apps and the types of features you can develop with monday

<Embed typeOfEmbed="youtube" url="https://www.youtube.com/watch?v=nfb7wc6S4m8" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252Fnfb7wc6S4m8%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253Dnfb7wc6S4m8%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252Fnfb7wc6S4m8%252Fhqdefault.jpg%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22854%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" href="https://www.youtube.com/watch?v=nfb7wc6S4m8" providerUrl="https://www.youtube.com/" providerName="YouTube" />

<br />

monday.com is a customizable workOS that empowers teams to build processes, create projects, and complete day-to-day work according to their needs. It enables teams and organizations to develop tailored solutions to manage their workflows through various methods, including monday apps.

These apps expand the platform's core capabilities by allowing developers to create new building blocks, or apps, on top of monday using the apps framework. Each app is comprised of one or more app features built with the same framework.

The framework supports various app features that enable you to create innovative and functional apps to improve workflows. The options are infinite when you use the platform's building block features like <a href="https://support.monday.com/hc/en-us/articles/360001267945-What-are-the-board-views-" target="_blank">board views</a>, <a href="https://support.monday.com/hc/en-us/articles/360002187819-What-are-the-Dashboards-" target="_blank">dashboard widgets</a>, <a href="https://support.monday.com/hc/en-us/articles/360003445540-monday-com-Integrations" target="_blank">integrations</a>, <a href="https://support.monday.com/hc/en-us/articles/360001222900-monday-com-Automations" target="_blank">automations</a>.

This guide will walk through the essential details about building an app for monday and answer some of the most frequently asked questions. Let's get started!

# Who can build apps?

Any developer can build on top of monday.com using the apps framework. We designed the framework to function independently of your technologies (i.e., languages, frameworks, and infrastructure).

# What type of app features can I build?

The monday apps framework allows you to build various features, including board views, item views, board menu features, dashboard widgets, custom objects, account settings views, doc actions, AI assistant, integrations, and workspace templates.

## Board views

Board views enable users to visualize and manage data from a single monday.com board in many ways. Apps with board view features open in the tabs underneath the board title. Users can add them from the *Views Center* by clicking the **plus button (+)** in the tab section under the board title and selecting the app they want to add.

Check out our <a href="https://developer.monday.com/apps/docs/quickstart-view" target="_blank">quickstart guide</a> to learn how to build a simple view app!

<Image align="center" border={true} src="https://files.readme.io/cdb439c-Board_view.png" className="border" />

## Item views

Like board views, item views also allow users to see and manage data in different ways. However, item views are connected to a single item on a board, unlike board views that are connected to the entire board. Apps with item view features open in the <a href="https://support.monday.com/hc/en-us/articles/115005900249-The-Updates-Section" target="_blank">updates section</a> of an item. Users can add them from the *Item View Center* by clicking the **plus button (+)** in the tab section under the item name listed in the update.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/588e486-Item_view.png" title="Item View.jpg" className="border" />

## Board menu features

Unlike traditional board and item views, the board menu features enable developers to create apps that work on individual groups, individual items, or multiple items. These features extend the platform's capabilities as they operate on an item or group level.

You can read more about the board menu features <a href="https://developer.monday.com/apps/docs/board-menu-features" target="_blank">here</a>.

## Dashboard widget

<a href="https://support.monday.com/hc/en-us/articles/360002187819-The-Dashboards" target="_blank">Dashboards</a> provide a dedicated space to display data from multiple boards visually. Developers can build dashboard widgets that extend the built-in dashboard capabilities.

Dashboards live in the left-pane platform menu, just like boards! Users can add new widgets by clicking the **Add widget (+)** button underneath the dashboard title and selecting the app they want to add.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/4c49e75-Dashboard_widget.png" title="Dashboard Widget.jpg" className="border" />

## Custom objects

Custom objects allow you to create a view separate from a workflow while providing more real estate on the monday platform. Traditional views and widgets must be connected to a specific dashboard, board, or item on monday, but custom objects live independently in the left-pane menu so users can access the view outside of the context of a specific dashboard, board, or item.

You can read more about custom objects <a href="https://developer.monday.com/apps/docs/custom-objects" target="_blank">here</a>.

## Account settings view

The account settings view provides a dedicated space to display the global settings that impact the entire account. It is not a view that users can add to a board, unlike board and item views. This feature allocates space for developers to share the app's settings while making them more accessible.

You can read more about the account settings view <a href="https://developer.monday.com/apps/docs/account-settings-view" target="_blank">here</a>.

## Doc actions

Using the doc action feature, developers can create a plug-in that integrates their app with monday <a href="https://support.monday.com/hc/en-us/articles/360021702939-monday-workdocs" target="_blank">workdocs</a>. The doc action feature is a valuable tool that helps expand the workdocs functionality, eventually leading to more complex or automated workflows. For developers, this feature increases app exposure in a new market and leads to additional app usage opportunities in a different monday.com product.

You can read more about the doc actions feature <a href="https://developer.monday.com/apps/docs/doc-actions-for-workdocs" target="_blank">here</a>.

## AI assistant

The AI assistant app features leverage the power of artificial intelligence to build apps that further automate workflows and tasks. There are six different AI assistant app features to choose from based on your app's logic and where they can be accessed from the monday.com platform.

You can read more about the AI assistant app features <a href="https://developer.monday.com/apps/docs/ai-assistant" target="_blank">here</a>.

## Workspace templates

All of the other app features enable you to build apps that focus on a specific part of the monday.com platform (e.g., board, item, etc.), but workspace templates allow you to provide an all-in-one solution that contains everything users need. Workspace templates live in the left-pane platform menu; users can add them just like any board, document, or dashboard!

> 🚧 Templates for marketplace apps
>
> Workspace templates are useful for marketplace apps, but you must have another app feature in addition to the template. Apps with just a workspace template app feature will not be approved.

You can read more about workspace templates <a href="https://developer.monday.com/apps/docs/workspace-templates" target="_blank">here</a>.

<Image align="center" border={true} src="https://files.readme.io/0dba43b-Workspace_templates.png" className="border" />

# Who can use your monday apps?

It all depends on the <a href="https://developer.monday.com/apps/docs/share-your-apps" target="_blank">type of app</a> you create - private, public, or for the app marketplace!

You can build and install **private apps** that are exclusive to your monday.com account. These apps enable you to build on top of the platform to create custom functionalities that automate your workflows, integrate with your organization's other systems, and create visuals and custom reports for your needs. Users outside of the account cannot access your app.

You can also create a **public app** to share with the monday community. Like private apps, public apps enable you to build on top of the core platform to improve your workflows and bridge gaps in the system. The only difference is that people outside the account can access the app. You can build apps that enhance the monday.com product and sell them on your own or become a monday.com partner and create apps as a service you provide to your clients.

We also have an **app marketplace** where other monday.com users can browse for public third-party apps to install on their accounts. After building your app, you can [submit it for review](https://developer.monday.com/apps/docs/submit-your-app) for the app marketplace.

# What app features are supported on the monday.com mobile app?

Integrations, board views, and item views are currently supported on the mobile app. Learn more about building for mobile [here](https://developer.monday.com/apps/update/docs/building-for-mobile#/).

# Can I get a monday.com account for testing?

You can use any monday.com account to explore and test the monday.com apps framework. If you’re currently on a trial and need more time, you can [contact our support team](https://monday.com/helpcenter/contact-support) to request a trial extension.

For more thorough testing, we also offer free developer accounts designed specifically for app builders. You can sign up for a free developer account [here](https://auth.monday.com/users/sign_up_new?developer=true\&utm_source=dev_documentation#soft_signup_from_step) and start building right away.

## What’s included in a developer account?

Developer accounts include everything in the [Free plan](https://support.monday.com/hc/en-us/articles/360010487220-Understanding-the-Free-Plan), along with higher limits, advanced capabilities tailored for app development. They also include select Pro and Enterprise features commonly needed for building and testing apps.

These accounts include:

* Access to all monday.com products
* Up to 10 seats
* Up to 1,000 items per product
* Unlimited boards, dashboards, and workdocs
* Automations: 25,000 actions/month
* Integrations: 25,000 actions/month
* API complexity limit: 10M
* Account-, column-, and item-level permissions
* Access to all column types
* Private and shareable boards
* Item and board views
* Activity log tracking and filtering
* Templates
* Hacker theme

If your app requires additional testing capacity, submit a request [here](https://developer-community.monday.com/p/marketplace-partner-extensions) and our team will review it within 5 business days.

# How to start building?

We recommend all new monday app developers to start by going through our [views and widgets](https://developer.monday.com/apps/docs/quickstart-view) and [integrations](https://developer.monday.com/apps/docs/quickstart-integration) quickstart guides to familiarize themselves with our monday apps framework. You can also check out our [GitHub page](https://github.com/mondaycom/welcome-apps/tree/master/apps) for additional code examples.

Once you're ready to start building your first app, follow the instructions [here](https://developer.monday.com/apps/docs/create-an-app)!

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎



# What is a monday app?

Learn about monday apps and the types of features you can develop with monday

<Embed typeOfEmbed="youtube" url="https://www.youtube.com/watch?v=nfb7wc6S4m8" html="%3Ciframe%20class%3D%22embedly-embed%22%20src%3D%22%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Fsrc%3Dhttps%253A%252F%252Fwww.youtube.com%252Fembed%252Fnfb7wc6S4m8%253Ffeature%253Doembed%26display_name%3DYouTube%26url%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253Dnfb7wc6S4m8%26image%3Dhttps%253A%252F%252Fi.ytimg.com%252Fvi%252Fnfb7wc6S4m8%252Fhqdefault.jpg%26type%3Dtext%252Fhtml%26schema%3Dyoutube%22%20width%3D%22854%22%20height%3D%22480%22%20scrolling%3D%22no%22%20title%3D%22YouTube%20embed%22%20frameborder%3D%220%22%20allow%3D%22autoplay%3B%20fullscreen%3B%20encrypted-media%3B%20picture-in-picture%3B%22%20allowfullscreen%3D%22true%22%3E%3C%2Fiframe%3E" href="https://www.youtube.com/watch?v=nfb7wc6S4m8" providerUrl="https://www.youtube.com/" providerName="YouTube" />

<br />

monday.com is a customizable workOS that empowers teams to build processes, create projects, and complete day-to-day work according to their needs. It enables teams and organizations to develop tailored solutions to manage their workflows through various methods, including monday apps.

These apps expand the platform's core capabilities by allowing developers to create new building blocks, or apps, on top of monday using the apps framework. Each app is comprised of one or more app features built with the same framework.

The framework supports various app features that enable you to create innovative and functional apps to improve workflows. The options are infinite when you use the platform's building block features like <a href="https://support.monday.com/hc/en-us/articles/360001267945-What-are-the-board-views-" target="_blank">board views</a>, <a href="https://support.monday.com/hc/en-us/articles/360002187819-What-are-the-Dashboards-" target="_blank">dashboard widgets</a>, <a href="https://support.monday.com/hc/en-us/articles/360003445540-monday-com-Integrations" target="_blank">integrations</a>, <a href="https://support.monday.com/hc/en-us/articles/360001222900-monday-com-Automations" target="_blank">automations</a>.

This guide will walk through the essential details about building an app for monday and answer some of the most frequently asked questions. Let's get started!

# Who can build apps?

Any developer can build on top of monday.com using the apps framework. We designed the framework to function independently of your technologies (i.e., languages, frameworks, and infrastructure).

# What type of app features can I build?

The monday apps framework allows you to build various features, including board views, item views, board menu features, dashboard widgets, custom objects, account settings views, doc actions, AI assistant, integrations, and workspace templates.

## Board views

Board views enable users to visualize and manage data from a single monday.com board in many ways. Apps with board view features open in the tabs underneath the board title. Users can add them from the *Views Center* by clicking the **plus button (+)** in the tab section under the board title and selecting the app they want to add.

Check out our <a href="https://developer.monday.com/apps/docs/quickstart-view" target="_blank">quickstart guide</a> to learn how to build a simple view app!

<Image align="center" border={true} src="https://files.readme.io/cdb439c-Board_view.png" className="border" />

## Item views

Like board views, item views also allow users to see and manage data in different ways. However, item views are connected to a single item on a board, unlike board views that are connected to the entire board. Apps with item view features open in the <a href="https://support.monday.com/hc/en-us/articles/115005900249-The-Updates-Section" target="_blank">updates section</a> of an item. Users can add them from the *Item View Center* by clicking the **plus button (+)** in the tab section under the item name listed in the update.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/588e486-Item_view.png" title="Item View.jpg" className="border" />

## Board menu features

Unlike traditional board and item views, the board menu features enable developers to create apps that work on individual groups, individual items, or multiple items. These features extend the platform's capabilities as they operate on an item or group level.

You can read more about the board menu features <a href="https://developer.monday.com/apps/docs/board-menu-features" target="_blank">here</a>.

## Dashboard widget

<a href="https://support.monday.com/hc/en-us/articles/360002187819-The-Dashboards" target="_blank">Dashboards</a> provide a dedicated space to display data from multiple boards visually. Developers can build dashboard widgets that extend the built-in dashboard capabilities.

Dashboards live in the left-pane platform menu, just like boards! Users can add new widgets by clicking the **Add widget (+)** button underneath the dashboard title and selecting the app they want to add.

<Image align="center" alt={2458} border={true} src="https://files.readme.io/4c49e75-Dashboard_widget.png" title="Dashboard Widget.jpg" className="border" />

## Custom objects

Custom objects allow you to create a view separate from a workflow while providing more real estate on the monday platform. Traditional views and widgets must be connected to a specific dashboard, board, or item on monday, but custom objects live independently in the left-pane menu so users can access the view outside of the context of a specific dashboard, board, or item.

You can read more about custom objects <a href="https://developer.monday.com/apps/docs/custom-objects" target="_blank">here</a>.

## Account settings view

The account settings view provides a dedicated space to display the global settings that impact the entire account. It is not a view that users can add to a board, unlike board and item views. This feature allocates space for developers to share the app's settings while making them more accessible.

You can read more about the account settings view <a href="https://developer.monday.com/apps/docs/account-settings-view" target="_blank">here</a>.

## Doc actions

Using the doc action feature, developers can create a plug-in that integrates their app with monday <a href="https://support.monday.com/hc/en-us/articles/360021702939-monday-workdocs" target="_blank">workdocs</a>. The doc action feature is a valuable tool that helps expand the workdocs functionality, eventually leading to more complex or automated workflows. For developers, this feature increases app exposure in a new market and leads to additional app usage opportunities in a different monday.com product.

You can read more about the doc actions feature <a href="https://developer.monday.com/apps/docs/doc-actions-for-workdocs" target="_blank">here</a>.

## AI assistant

The AI assistant app features leverage the power of artificial intelligence to build apps that further automate workflows and tasks. There are six different AI assistant app features to choose from based on your app's logic and where they can be accessed from the monday.com platform.

You can read more about the AI assistant app features <a href="https://developer.monday.com/apps/docs/ai-assistant" target="_blank">here</a>.

## Workspace templates

All of the other app features enable you to build apps that focus on a specific part of the monday.com platform (e.g., board, item, etc.), but workspace templates allow you to provide an all-in-one solution that contains everything users need. Workspace templates live in the left-pane platform menu; users can add them just like any board, document, or dashboard!

> 🚧 Templates for marketplace apps
>
> Workspace templates are useful for marketplace apps, but you must have another app feature in addition to the template. Apps with just a workspace template app feature will not be approved.

You can read more about workspace templates <a href="https://developer.monday.com/apps/docs/workspace-templates" target="_blank">here</a>.

<Image align="center" border={true} src="https://files.readme.io/0dba43b-Workspace_templates.png" className="border" />

# Who can use your monday apps?

It all depends on the <a href="https://developer.monday.com/apps/docs/share-your-apps" target="_blank">type of app</a> you create - private, public, or for the app marketplace!

You can build and install **private apps** that are exclusive to your monday.com account. These apps enable you to build on top of the platform to create custom functionalities that automate your workflows, integrate with your organization's other systems, and create visuals and custom reports for your needs. Users outside of the account cannot access your app.

You can also create a **public app** to share with the monday community. Like private apps, public apps enable you to build on top of the core platform to improve your workflows and bridge gaps in the system. The only difference is that people outside the account can access the app. You can build apps that enhance the monday.com product and sell them on your own or become a monday.com partner and create apps as a service you provide to your clients.

We also have an **app marketplace** where other monday.com users can browse for public third-party apps to install on their accounts. After building your app, you can [submit it for review](https://developer.monday.com/apps/docs/submit-your-app) for the app marketplace.

# What app features are supported on the monday.com mobile app?

Integrations, board views, and item views are currently supported on the mobile app. Learn more about building for mobile [here](https://developer.monday.com/apps/update/docs/building-for-mobile#/).

# Can I get a monday.com account for testing?

You can use any monday.com account to explore and test the monday.com apps framework. If you’re currently on a trial and need more time, you can [contact our support team](https://monday.com/helpcenter/contact-support) to request a trial extension.

For more thorough testing, we also offer free developer accounts designed specifically for app builders. You can sign up for a free developer account [here](https://auth.monday.com/users/sign_up_new?developer=true\&utm_source=dev_documentation#soft_signup_from_step) and start building right away.

## What’s included in a developer account?

Developer accounts include everything in the [Free plan](https://support.monday.com/hc/en-us/articles/360010487220-Understanding-the-Free-Plan), along with higher limits, advanced capabilities tailored for app development. They also include select Pro and Enterprise features commonly needed for building and testing apps.

These accounts include:

* Access to all monday.com products
* Up to 10 seats
* Up to 1,000 items per product
* Unlimited boards, dashboards, and workdocs
* Automations: 25,000 actions/month
* Integrations: 25,000 actions/month
* API complexity limit: 10M
* Account-, column-, and item-level permissions
* Access to all column types
* Private and shareable boards
* Item and board views
* Activity log tracking and filtering
* Templates
* Hacker theme

If your app requires additional testing capacity, submit a request [here](https://developer-community.monday.com/p/marketplace-partner-extensions) and our team will review it within 5 business days.

# How to start building?

We recommend all new monday app developers to start by going through our [views and widgets](https://developer.monday.com/apps/docs/quickstart-view) and [integrations](https://developer.monday.com/apps/docs/quickstart-integration) quickstart guides to familiarize themselves with our monday apps framework. You can also check out our [GitHub page](https://github.com/mondaycom/welcome-apps/tree/master/apps) for additional code examples.

Once you're ready to start building your first app, follow the instructions [here](https://developer.monday.com/apps/docs/create-an-app)!

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎




# Planning your app

A guide to planning, scoping, building, and launching your monday.com app

# Overview

Building an app for monday.com? This guide walks you through the complete development process, from initial concept to marketplace launch. Whether you're creating your first integration or expanding your existing app's capabilities, follow this structured approach to ensure success.

Your monday app development journey consists of four distinct phases, each with specific goals:

<Cards columns={2}>
  <Card title="Phase 1: App Definition" href="#phase-1-app-definition" icon="lightbulb">
    Define your app's purpose, identify target users, and validate market need
  </Card>

  <Card title="Phase 2: Technical Scoping" href="#phase-2-technical-scoping" icon="cogs">
    Plan technical architecture, select apps framework components, and design integration points
  </Card>

  <Card title="Phase 3: Building" href="#phase-3-building" icon="code">
    Develop, test, and deploy your app
  </Card>

  <Card title="Phase 4: App Review" href="#phase-4-app-review" icon="check-circle">
    Submit for marketplace review
  </Card>
</Cards>

# Phase 1: App Definition

**Goal:** Define what you're building and why it matters to users

In this phase, you'll identify the specific problem your app solves and how it creates value for monday.com users. The most successful apps integrate seamlessly into existing workflows and are part of a broader solution, rather than standalone tools.

<Accordion title="Market Research" icon="search">
  **User Needs Assessment:**

  * What gaps exist between monday.com and your product?
  * Which shared use cases would benefit from integration?
  * How do users currently handle these workflows manually?
    **Competition Analysis:**
  * What similar apps already exist in the marketplace?
  * How can your app differentiate itself?
  * What features are users requesting that aren't currently available?
</Accordion>

<Accordion title="Value Proposition" icon="bullseye">
  * How does monday.com integration enhance their existing workflows?
  * What time savings or efficiency gains will they experience?
  * How does your platform extend monday.com's functionality?
</Accordion>

⚠️ **Marketplace Saturation Alert (Q1 2026)**

Our marketplace already features a wide variety of apps, some of which share similar features or functionality. To encourage innovation and reduce redundancy, we recommend avoiding these heavily saturated areas:

* Automations: Multi-tool apps
* Integrations with Microsoft tools
* Google integrations

## Getting Started

### Set Up Your Developer Environment

<Tabs>
  <Tab title="New to monday.com">
    Sign up for a [developer account](https://auth.monday.com/users/sign_up_new?developer=true) to get:

    * Full access to monday.com features
    * Developer-specific resources and support
    * Extended trial benefits for testing

    Learn more [here](https://developer.monday.com/apps/docs/intro#can-i-get-a-mondaycom-account-for-testing)!
  </Tab>

  <Tab title="Existing User">
    Upgrade your existing account to developer status or create a separate development workspace for testing.
  </Tab>
</Tabs>

### Explore Ideas

Not sure what to build? Check out our [idea board](https://monday.com/appdeveloper/appideas#ideas) for community-requested features and emerging opportunities.

## Relevant Resources

<Cards>
  <Card title="Developer Account Setup" href="https://auth.monday.com/users/sign_up_new?developer=true" icon="user-plus">
    Get your development environment ready
  </Card>

  <Card title="Apps Framework Introduction" href="doc:intro" icon="book">
    Understand the technical foundation
  </Card>

  <Card title="Community Ideas" href="https://monday.com/appdeveloper/appideas#ideas" icon="comments">
    Find inspiration from user requests
  </Card>
</Cards>

# Phase 2: Technical Scoping

**Goal:** Design your app's technical architecture and plan implementation details

During this phase, you'll define exactly which APIs, authentication methods, and framework components your app will use. This is one of the most critical phases as proper technical scoping prevents changes later.

### Authentication Strategy

Choose the authentication method that best fits your app's use case:

<Tabs>
  <Tab title="OAuth 2.0">
    **Best for:** Most integrations requiring user authorization

    * Secure user consent flow
    * Token-based authentication
    * Automatic token refresh
  </Tab>

  <Tab title="API Tokens">
    **Best for:** Server-to-server integrations

    * Simple implementation
    * No user interaction required
    * Direct API access
  </Tab>

  <Tab title="JWT">
    **Best for:** Custom authentication flows

    * Stateless authentication
    * Custom claims support
    * Advanced security requirements
  </Tab>
</Tabs>

### App Type Selection

<Accordion title="Integration Recipes" icon="link">
  **Perfect for:** Automating workflows between monday.com and your platform.
  <br /><br />**Technical Requirements:**

  * Custom trigger blocks for initiating workflows
  * Custom action blocks for executing operations
  * Input/output field mapping
  * Error handling and retry logic
    <br /><br />**Scoping Checklist:**
  * \[ ] Trigger event types identified
  * \[ ] Action operations defined
  * \[ ] Required input fields mapped
  * \[ ] Output data structure planned
  * \[ ] Error scenarios documented
</Accordion>

<Accordion title="Views & Widgets" icon="desktop">
  **Perfect for:** Embedding your platform's interface within monday.com
  <br /><br />**Technical Requirements:**

  * React component architecture
  * monday.com design system compliance
  * SDK integration
  * Responsive design
    <br /><br />**Scoping Checklist:**
  * \[ ] UI components identified
  * \[ ] Data flow architecture planned
  * \[ ] User interaction patterns defined
  * \[ ] Performance requirements set
  * \[ ] Responsive breakpoints planned
</Accordion>

### Relevant Resources

<Cards>
  <Card title="Authentication Guide" href="doc:choosing-auth" icon="key">
    Choose the right auth method
  </Card>

  <Card title="API Reference" href="https://developer.monday.com/api-reference/docs" icon="code">
    Explore available endpoints
  </Card>

  <Card title="Custom Fields Guide" href="doc:custom-fields" icon="edit">
    Plan specialized data types
  </Card>
</Cards>

# Phase 3: Building

**Goal:** Transform your technical plan into a working monday.com app

In the building phase, your team will build your app by applying all of the knowledge gained from the previous phase. This phase should go smoothly and efficiently if you have thoroughly scoped out your app.

Taking the integration recipe example from above, the building phase is where you will be creating your custom trigger, action, and field type blocks.

### Iterative development

Build your app in focused iterations to catch issues early and adapt to discoveries:

### Phase outcome

After completing this phase, you will have your new monday app that’s ready for submission to our apps review team. As such, we recommend preparing the graphical assets and marketing copy that will accompany your application in this phase as well.

### Related resources

* [Submitting Your App to the Apps Marketplace](https://developer.monday.com/apps/docs/submit-your-app)
* [Versioning in Apps](https://developer.monday.com/apps/docs/versioning)
* [Multitenancy Best Practices](https://developer.monday.com/apps/docs/multitenancy)
* [Example Apps](https://developer.monday.com/apps/docs/welcome-apps)

## Phase 4: App review

The last phase in the monday app development cycle is the review phase.

At this point, your app should be built and should be ready for submission to our apps marketplace. In the review phase, you can expect some feedback from our team on your app.

### Phase outcome

Once finished, your app will be available in our marketplace for our users!

### Related resources

* [Submitting Your App to the Apps Marketplace](https://developer.monday.com/apps/docs/submit-your-app)
* [Sharing Your Apps with Customers](https://developer.monday.com/apps/docs/share-your-apps)

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎



# Planning your app

A guide to planning, scoping, building, and launching your monday.com app

# Overview

Building an app for monday.com? This guide walks you through the complete development process, from initial concept to marketplace launch. Whether you're creating your first integration or expanding your existing app's capabilities, follow this structured approach to ensure success.

Your monday app development journey consists of four distinct phases, each with specific goals:

<Cards columns={2}>
  <Card title="Phase 1: App Definition" href="#phase-1-app-definition" icon="lightbulb">
    Define your app's purpose, identify target users, and validate market need
  </Card>

  <Card title="Phase 2: Technical Scoping" href="#phase-2-technical-scoping" icon="cogs">
    Plan technical architecture, select apps framework components, and design integration points
  </Card>

  <Card title="Phase 3: Building" href="#phase-3-building" icon="code">
    Develop, test, and deploy your app
  </Card>

  <Card title="Phase 4: App Review" href="#phase-4-app-review" icon="check-circle">
    Submit for marketplace review
  </Card>
</Cards>

# Phase 1: App Definition

**Goal:** Define what you're building and why it matters to users

In this phase, you'll identify the specific problem your app solves and how it creates value for monday.com users. The most successful apps integrate seamlessly into existing workflows and are part of a broader solution, rather than standalone tools.

<Accordion title="Market Research" icon="search">
  **User Needs Assessment:**

  * What gaps exist between monday.com and your product?
  * Which shared use cases would benefit from integration?
  * How do users currently handle these workflows manually?
    **Competition Analysis:**
  * What similar apps already exist in the marketplace?
  * How can your app differentiate itself?
  * What features are users requesting that aren't currently available?
</Accordion>

<Accordion title="Value Proposition" icon="bullseye">
  * How does monday.com integration enhance their existing workflows?
  * What time savings or efficiency gains will they experience?
  * How does your platform extend monday.com's functionality?
</Accordion>

⚠️ **Marketplace Saturation Alert (Q1 2026)**

Our marketplace already features a wide variety of apps, some of which share similar features or functionality. To encourage innovation and reduce redundancy, we recommend avoiding these heavily saturated areas:

* Automations: Multi-tool apps
* Integrations with Microsoft tools
* Google integrations

## Getting Started

### Set Up Your Developer Environment

<Tabs>
  <Tab title="New to monday.com">
    Sign up for a [developer account](https://auth.monday.com/users/sign_up_new?developer=true) to get:

    * Full access to monday.com features
    * Developer-specific resources and support
    * Extended trial benefits for testing

    Learn more [here](https://developer.monday.com/apps/docs/intro#can-i-get-a-mondaycom-account-for-testing)!
  </Tab>

  <Tab title="Existing User">
    Upgrade your existing account to developer status or create a separate development workspace for testing.
  </Tab>
</Tabs>

### Explore Ideas

Not sure what to build? Check out our [idea board](https://monday.com/appdeveloper/appideas#ideas) for community-requested features and emerging opportunities.

## Relevant Resources

<Cards>
  <Card title="Developer Account Setup" href="https://auth.monday.com/users/sign_up_new?developer=true" icon="user-plus">
    Get your development environment ready
  </Card>

  <Card title="Apps Framework Introduction" href="doc:intro" icon="book">
    Understand the technical foundation
  </Card>

  <Card title="Community Ideas" href="https://monday.com/appdeveloper/appideas#ideas" icon="comments">
    Find inspiration from user requests
  </Card>
</Cards>

# Phase 2: Technical Scoping

**Goal:** Design your app's technical architecture and plan implementation details

During this phase, you'll define exactly which APIs, authentication methods, and framework components your app will use. This is one of the most critical phases as proper technical scoping prevents changes later.

### Authentication Strategy

Choose the authentication method that best fits your app's use case:

<Tabs>
  <Tab title="OAuth 2.0">
    **Best for:** Most integrations requiring user authorization

    * Secure user consent flow
    * Token-based authentication
    * Automatic token refresh
  </Tab>

  <Tab title="API Tokens">
    **Best for:** Server-to-server integrations

    * Simple implementation
    * No user interaction required
    * Direct API access
  </Tab>

  <Tab title="JWT">
    **Best for:** Custom authentication flows

    * Stateless authentication
    * Custom claims support
    * Advanced security requirements
  </Tab>
</Tabs>

### App Type Selection

<Accordion title="Integration Recipes" icon="link">
  **Perfect for:** Automating workflows between monday.com and your platform.
  <br /><br />**Technical Requirements:**

  * Custom trigger blocks for initiating workflows
  * Custom action blocks for executing operations
  * Input/output field mapping
  * Error handling and retry logic
    <br /><br />**Scoping Checklist:**
  * \[ ] Trigger event types identified
  * \[ ] Action operations defined
  * \[ ] Required input fields mapped
  * \[ ] Output data structure planned
  * \[ ] Error scenarios documented
</Accordion>

<Accordion title="Views & Widgets" icon="desktop">
  **Perfect for:** Embedding your platform's interface within monday.com
  <br /><br />**Technical Requirements:**

  * React component architecture
  * monday.com design system compliance
  * SDK integration
  * Responsive design
    <br /><br />**Scoping Checklist:**
  * \[ ] UI components identified
  * \[ ] Data flow architecture planned
  * \[ ] User interaction patterns defined
  * \[ ] Performance requirements set
  * \[ ] Responsive breakpoints planned
</Accordion>

### Relevant Resources

<Cards>
  <Card title="Authentication Guide" href="doc:choosing-auth" icon="key">
    Choose the right auth method
  </Card>

  <Card title="API Reference" href="https://developer.monday.com/api-reference/docs" icon="code">
    Explore available endpoints
  </Card>

  <Card title="Custom Fields Guide" href="doc:custom-fields" icon="edit">
    Plan specialized data types
  </Card>
</Cards>

# Phase 3: Building

**Goal:** Transform your technical plan into a working monday.com app

In the building phase, your team will build your app by applying all of the knowledge gained from the previous phase. This phase should go smoothly and efficiently if you have thoroughly scoped out your app.

Taking the integration recipe example from above, the building phase is where you will be creating your custom trigger, action, and field type blocks.

### Iterative development

Build your app in focused iterations to catch issues early and adapt to discoveries:

### Phase outcome

After completing this phase, you will have your new monday app that’s ready for submission to our apps review team. As such, we recommend preparing the graphical assets and marketing copy that will accompany your application in this phase as well.

### Related resources

* [Submitting Your App to the Apps Marketplace](https://developer.monday.com/apps/docs/submit-your-app)
* [Versioning in Apps](https://developer.monday.com/apps/docs/versioning)
* [Multitenancy Best Practices](https://developer.monday.com/apps/docs/multitenancy)
* [Example Apps](https://developer.monday.com/apps/docs/welcome-apps)

## Phase 4: App review

The last phase in the monday app development cycle is the review phase.

At this point, your app should be built and should be ready for submission to our apps marketplace. In the review phase, you can expect some feedback from our team on your app.

### Phase outcome

Once finished, your app will be available in our marketplace for our users!

### Related resources

* [Submitting Your App to the Apps Marketplace](https://developer.monday.com/apps/docs/submit-your-app)
* [Sharing Your Apps with Customers](https://developer.monday.com/apps/docs/share-your-apps)

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎



# Planning your app

A guide to planning, scoping, building, and launching your monday.com app

# Overview

Building an app for monday.com? This guide walks you through the complete development process, from initial concept to marketplace launch. Whether you're creating your first integration or expanding your existing app's capabilities, follow this structured approach to ensure success.

Your monday app development journey consists of four distinct phases, each with specific goals:

<Cards columns={2}>
  <Card title="Phase 1: App Definition" href="#phase-1-app-definition" icon="lightbulb">
    Define your app's purpose, identify target users, and validate market need
  </Card>

  <Card title="Phase 2: Technical Scoping" href="#phase-2-technical-scoping" icon="cogs">
    Plan technical architecture, select apps framework components, and design integration points
  </Card>

  <Card title="Phase 3: Building" href="#phase-3-building" icon="code">
    Develop, test, and deploy your app
  </Card>

  <Card title="Phase 4: App Review" href="#phase-4-app-review" icon="check-circle">
    Submit for marketplace review
  </Card>
</Cards>

# Phase 1: App Definition

**Goal:** Define what you're building and why it matters to users

In this phase, you'll identify the specific problem your app solves and how it creates value for monday.com users. The most successful apps integrate seamlessly into existing workflows and are part of a broader solution, rather than standalone tools.

<Accordion title="Market Research" icon="search">
  **User Needs Assessment:**

  * What gaps exist between monday.com and your product?
  * Which shared use cases would benefit from integration?
  * How do users currently handle these workflows manually?
    **Competition Analysis:**
  * What similar apps already exist in the marketplace?
  * How can your app differentiate itself?
  * What features are users requesting that aren't currently available?
</Accordion>

<Accordion title="Value Proposition" icon="bullseye">
  * How does monday.com integration enhance their existing workflows?
  * What time savings or efficiency gains will they experience?
  * How does your platform extend monday.com's functionality?
</Accordion>

⚠️ **Marketplace Saturation Alert (Q1 2026)**

Our marketplace already features a wide variety of apps, some of which share similar features or functionality. To encourage innovation and reduce redundancy, we recommend avoiding these heavily saturated areas:

* Automations: Multi-tool apps
* Integrations with Microsoft tools
* Google integrations

## Getting Started

### Set Up Your Developer Environment

<Tabs>
  <Tab title="New to monday.com">
    Sign up for a [developer account](https://auth.monday.com/users/sign_up_new?developer=true) to get:

    * Full access to monday.com features
    * Developer-specific resources and support
    * Extended trial benefits for testing

    Learn more [here](https://developer.monday.com/apps/docs/intro#can-i-get-a-mondaycom-account-for-testing)!
  </Tab>

  <Tab title="Existing User">
    Upgrade your existing account to developer status or create a separate development workspace for testing.
  </Tab>
</Tabs>

### Explore Ideas

Not sure what to build? Check out our [idea board](https://monday.com/appdeveloper/appideas#ideas) for community-requested features and emerging opportunities.

## Relevant Resources

<Cards>
  <Card title="Developer Account Setup" href="https://auth.monday.com/users/sign_up_new?developer=true" icon="user-plus">
    Get your development environment ready
  </Card>

  <Card title="Apps Framework Introduction" href="doc:intro" icon="book">
    Understand the technical foundation
  </Card>

  <Card title="Community Ideas" href="https://monday.com/appdeveloper/appideas#ideas" icon="comments">
    Find inspiration from user requests
  </Card>
</Cards>

# Phase 2: Technical Scoping

**Goal:** Design your app's technical architecture and plan implementation details

During this phase, you'll define exactly which APIs, authentication methods, and framework components your app will use. This is one of the most critical phases as proper technical scoping prevents changes later.

### Authentication Strategy

Choose the authentication method that best fits your app's use case:

<Tabs>
  <Tab title="OAuth 2.0">
    **Best for:** Most integrations requiring user authorization

    * Secure user consent flow
    * Token-based authentication
    * Automatic token refresh
  </Tab>

  <Tab title="API Tokens">
    **Best for:** Server-to-server integrations

    * Simple implementation
    * No user interaction required
    * Direct API access
  </Tab>

  <Tab title="JWT">
    **Best for:** Custom authentication flows

    * Stateless authentication
    * Custom claims support
    * Advanced security requirements
  </Tab>
</Tabs>

### App Type Selection

<Accordion title="Integration Recipes" icon="link">
  **Perfect for:** Automating workflows between monday.com and your platform.
  <br /><br />**Technical Requirements:**

  * Custom trigger blocks for initiating workflows
  * Custom action blocks for executing operations
  * Input/output field mapping
  * Error handling and retry logic
    <br /><br />**Scoping Checklist:**
  * \[ ] Trigger event types identified
  * \[ ] Action operations defined
  * \[ ] Required input fields mapped
  * \[ ] Output data structure planned
  * \[ ] Error scenarios documented
</Accordion>

<Accordion title="Views & Widgets" icon="desktop">
  **Perfect for:** Embedding your platform's interface within monday.com
  <br /><br />**Technical Requirements:**

  * React component architecture
  * monday.com design system compliance
  * SDK integration
  * Responsive design
    <br /><br />**Scoping Checklist:**
  * \[ ] UI components identified
  * \[ ] Data flow architecture planned
  * \[ ] User interaction patterns defined
  * \[ ] Performance requirements set
  * \[ ] Responsive breakpoints planned
</Accordion>

### Relevant Resources

<Cards>
  <Card title="Authentication Guide" href="doc:choosing-auth" icon="key">
    Choose the right auth method
  </Card>

  <Card title="API Reference" href="https://developer.monday.com/api-reference/docs" icon="code">
    Explore available endpoints
  </Card>

  <Card title="Custom Fields Guide" href="doc:custom-fields" icon="edit">
    Plan specialized data types
  </Card>
</Cards>

# Phase 3: Building

**Goal:** Transform your technical plan into a working monday.com app

In the building phase, your team will build your app by applying all of the knowledge gained from the previous phase. This phase should go smoothly and efficiently if you have thoroughly scoped out your app.

Taking the integration recipe example from above, the building phase is where you will be creating your custom trigger, action, and field type blocks.

### Iterative development

Build your app in focused iterations to catch issues early and adapt to discoveries:

### Phase outcome

After completing this phase, you will have your new monday app that’s ready for submission to our apps review team. As such, we recommend preparing the graphical assets and marketing copy that will accompany your application in this phase as well.

### Related resources

* [Submitting Your App to the Apps Marketplace](https://developer.monday.com/apps/docs/submit-your-app)
* [Versioning in Apps](https://developer.monday.com/apps/docs/versioning)
* [Multitenancy Best Practices](https://developer.monday.com/apps/docs/multitenancy)
* [Example Apps](https://developer.monday.com/apps/docs/welcome-apps)

## Phase 4: App review

The last phase in the monday app development cycle is the review phase.

At this point, your app should be built and should be ready for submission to our apps marketplace. In the review phase, you can expect some feedback from our team on your app.

### Phase outcome

Once finished, your app will be available in our marketplace for our users!

### Related resources

* [Submitting Your App to the Apps Marketplace](https://developer.monday.com/apps/docs/submit-your-app)
* [Sharing Your Apps with Customers](https://developer.monday.com/apps/docs/share-your-apps)

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎



# Planning your app

A guide to planning, scoping, building, and launching your monday.com app

# Overview

Building an app for monday.com? This guide walks you through the complete development process, from initial concept to marketplace launch. Whether you're creating your first integration or expanding your existing app's capabilities, follow this structured approach to ensure success.

Your monday app development journey consists of four distinct phases, each with specific goals:

<Cards columns={2}>
  <Card title="Phase 1: App Definition" href="#phase-1-app-definition" icon="lightbulb">
    Define your app's purpose, identify target users, and validate market need
  </Card>

  <Card title="Phase 2: Technical Scoping" href="#phase-2-technical-scoping" icon="cogs">
    Plan technical architecture, select apps framework components, and design integration points
  </Card>

  <Card title="Phase 3: Building" href="#phase-3-building" icon="code">
    Develop, test, and deploy your app
  </Card>

  <Card title="Phase 4: App Review" href="#phase-4-app-review" icon="check-circle">
    Submit for marketplace review
  </Card>
</Cards>

# Phase 1: App Definition

**Goal:** Define what you're building and why it matters to users

In this phase, you'll identify the specific problem your app solves and how it creates value for monday.com users. The most successful apps integrate seamlessly into existing workflows and are part of a broader solution, rather than standalone tools.

<Accordion title="Market Research" icon="search">
  **User Needs Assessment:**

  * What gaps exist between monday.com and your product?
  * Which shared use cases would benefit from integration?
  * How do users currently handle these workflows manually?
    **Competition Analysis:**
  * What similar apps already exist in the marketplace?
  * How can your app differentiate itself?
  * What features are users requesting that aren't currently available?
</Accordion>

<Accordion title="Value Proposition" icon="bullseye">
  * How does monday.com integration enhance their existing workflows?
  * What time savings or efficiency gains will they experience?
  * How does your platform extend monday.com's functionality?
</Accordion>

⚠️ **Marketplace Saturation Alert (Q1 2026)**

Our marketplace already features a wide variety of apps, some of which share similar features or functionality. To encourage innovation and reduce redundancy, we recommend avoiding these heavily saturated areas:

* Automations: Multi-tool apps
* Integrations with Microsoft tools
* Google integrations

## Getting Started

### Set Up Your Developer Environment

<Tabs>
  <Tab title="New to monday.com">
    Sign up for a [developer account](https://auth.monday.com/users/sign_up_new?developer=true) to get:

    * Full access to monday.com features
    * Developer-specific resources and support
    * Extended trial benefits for testing

    Learn more [here](https://developer.monday.com/apps/docs/intro#can-i-get-a-mondaycom-account-for-testing)!
  </Tab>

  <Tab title="Existing User">
    Upgrade your existing account to developer status or create a separate development workspace for testing.
  </Tab>
</Tabs>

### Explore Ideas

Not sure what to build? Check out our [idea board](https://monday.com/appdeveloper/appideas#ideas) for community-requested features and emerging opportunities.

## Relevant Resources

<Cards>
  <Card title="Developer Account Setup" href="https://auth.monday.com/users/sign_up_new?developer=true" icon="user-plus">
    Get your development environment ready
  </Card>

  <Card title="Apps Framework Introduction" href="doc:intro" icon="book">
    Understand the technical foundation
  </Card>

  <Card title="Community Ideas" href="https://monday.com/appdeveloper/appideas#ideas" icon="comments">
    Find inspiration from user requests
  </Card>
</Cards>

# Phase 2: Technical Scoping

**Goal:** Design your app's technical architecture and plan implementation details

During this phase, you'll define exactly which APIs, authentication methods, and framework components your app will use. This is one of the most critical phases as proper technical scoping prevents changes later.

### Authentication Strategy

Choose the authentication method that best fits your app's use case:

<Tabs>
  <Tab title="OAuth 2.0">
    **Best for:** Most integrations requiring user authorization

    * Secure user consent flow
    * Token-based authentication
    * Automatic token refresh
  </Tab>

  <Tab title="API Tokens">
    **Best for:** Server-to-server integrations

    * Simple implementation
    * No user interaction required
    * Direct API access
  </Tab>

  <Tab title="JWT">
    **Best for:** Custom authentication flows

    * Stateless authentication
    * Custom claims support
    * Advanced security requirements
  </Tab>
</Tabs>

### App Type Selection

<Accordion title="Integration Recipes" icon="link">
  **Perfect for:** Automating workflows between monday.com and your platform.
  <br /><br />**Technical Requirements:**

  * Custom trigger blocks for initiating workflows
  * Custom action blocks for executing operations
  * Input/output field mapping
  * Error handling and retry logic
    <br /><br />**Scoping Checklist:**
  * \[ ] Trigger event types identified
  * \[ ] Action operations defined
  * \[ ] Required input fields mapped
  * \[ ] Output data structure planned
  * \[ ] Error scenarios documented
</Accordion>

<Accordion title="Views & Widgets" icon="desktop">
  **Perfect for:** Embedding your platform's interface within monday.com
  <br /><br />**Technical Requirements:**

  * React component architecture
  * monday.com design system compliance
  * SDK integration
  * Responsive design
    <br /><br />**Scoping Checklist:**
  * \[ ] UI components identified
  * \[ ] Data flow architecture planned
  * \[ ] User interaction patterns defined
  * \[ ] Performance requirements set
  * \[ ] Responsive breakpoints planned
</Accordion>

### Relevant Resources

<Cards>
  <Card title="Authentication Guide" href="doc:choosing-auth" icon="key">
    Choose the right auth method
  </Card>

  <Card title="API Reference" href="https://developer.monday.com/api-reference/docs" icon="code">
    Explore available endpoints
  </Card>

  <Card title="Custom Fields Guide" href="doc:custom-fields" icon="edit">
    Plan specialized data types
  </Card>
</Cards>

# Phase 3: Building

**Goal:** Transform your technical plan into a working monday.com app

In the building phase, your team will build your app by applying all of the knowledge gained from the previous phase. This phase should go smoothly and efficiently if you have thoroughly scoped out your app.

Taking the integration recipe example from above, the building phase is where you will be creating your custom trigger, action, and field type blocks.

### Iterative development

Build your app in focused iterations to catch issues early and adapt to discoveries:

### Phase outcome

After completing this phase, you will have your new monday app that’s ready for submission to our apps review team. As such, we recommend preparing the graphical assets and marketing copy that will accompany your application in this phase as well.

### Related resources

* [Submitting Your App to the Apps Marketplace](https://developer.monday.com/apps/docs/submit-your-app)
* [Versioning in Apps](https://developer.monday.com/apps/docs/versioning)
* [Multitenancy Best Practices](https://developer.monday.com/apps/docs/multitenancy)
* [Example Apps](https://developer.monday.com/apps/docs/welcome-apps)

## Phase 4: App review

The last phase in the monday app development cycle is the review phase.

At this point, your app should be built and should be ready for submission to our apps marketplace. In the review phase, you can expect some feedback from our team on your app.

### Phase outcome

Once finished, your app will be available in our marketplace for our users!

### Related resources

* [Submitting Your App to the Apps Marketplace](https://developer.monday.com/apps/docs/submit-your-app)
* [Sharing Your Apps with Customers](https://developer.monday.com/apps/docs/share-your-apps)

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎



# Planning your app

A guide to planning, scoping, building, and launching your monday.com app

# Overview

Building an app for monday.com? This guide walks you through the complete development process, from initial concept to marketplace launch. Whether you're creating your first integration or expanding your existing app's capabilities, follow this structured approach to ensure success.

Your monday app development journey consists of four distinct phases, each with specific goals:

<Cards columns={2}>
  <Card title="Phase 1: App Definition" href="#phase-1-app-definition" icon="lightbulb">
    Define your app's purpose, identify target users, and validate market need
  </Card>

  <Card title="Phase 2: Technical Scoping" href="#phase-2-technical-scoping" icon="cogs">
    Plan technical architecture, select apps framework components, and design integration points
  </Card>

  <Card title="Phase 3: Building" href="#phase-3-building" icon="code">
    Develop, test, and deploy your app
  </Card>

  <Card title="Phase 4: App Review" href="#phase-4-app-review" icon="check-circle">
    Submit for marketplace review
  </Card>
</Cards>

# Phase 1: App Definition

**Goal:** Define what you're building and why it matters to users

In this phase, you'll identify the specific problem your app solves and how it creates value for monday.com users. The most successful apps integrate seamlessly into existing workflows and are part of a broader solution, rather than standalone tools.

<Accordion title="Market Research" icon="search">
  **User Needs Assessment:**

  * What gaps exist between monday.com and your product?
  * Which shared use cases would benefit from integration?
  * How do users currently handle these workflows manually?
    **Competition Analysis:**
  * What similar apps already exist in the marketplace?
  * How can your app differentiate itself?
  * What features are users requesting that aren't currently available?
</Accordion>

<Accordion title="Value Proposition" icon="bullseye">
  * How does monday.com integration enhance their existing workflows?
  * What time savings or efficiency gains will they experience?
  * How does your platform extend monday.com's functionality?
</Accordion>

⚠️ **Marketplace Saturation Alert (Q1 2026)**

Our marketplace already features a wide variety of apps, some of which share similar features or functionality. To encourage innovation and reduce redundancy, we recommend avoiding these heavily saturated areas:

* Automations: Multi-tool apps
* Integrations with Microsoft tools
* Google integrations

## Getting Started

### Set Up Your Developer Environment

<Tabs>
  <Tab title="New to monday.com">
    Sign up for a [developer account](https://auth.monday.com/users/sign_up_new?developer=true) to get:

    * Full access to monday.com features
    * Developer-specific resources and support
    * Extended trial benefits for testing

    Learn more [here](https://developer.monday.com/apps/docs/intro#can-i-get-a-mondaycom-account-for-testing)!
  </Tab>

  <Tab title="Existing User">
    Upgrade your existing account to developer status or create a separate development workspace for testing.
  </Tab>
</Tabs>

### Explore Ideas

Not sure what to build? Check out our [idea board](https://monday.com/appdeveloper/appideas#ideas) for community-requested features and emerging opportunities.

## Relevant Resources

<Cards>
  <Card title="Developer Account Setup" href="https://auth.monday.com/users/sign_up_new?developer=true" icon="user-plus">
    Get your development environment ready
  </Card>

  <Card title="Apps Framework Introduction" href="doc:intro" icon="book">
    Understand the technical foundation
  </Card>

  <Card title="Community Ideas" href="https://monday.com/appdeveloper/appideas#ideas" icon="comments">
    Find inspiration from user requests
  </Card>
</Cards>

# Phase 2: Technical Scoping

**Goal:** Design your app's technical architecture and plan implementation details

During this phase, you'll define exactly which APIs, authentication methods, and framework components your app will use. This is one of the most critical phases as proper technical scoping prevents changes later.

### Authentication Strategy

Choose the authentication method that best fits your app's use case:

<Tabs>
  <Tab title="OAuth 2.0">
    **Best for:** Most integrations requiring user authorization

    * Secure user consent flow
    * Token-based authentication
    * Automatic token refresh
  </Tab>

  <Tab title="API Tokens">
    **Best for:** Server-to-server integrations

    * Simple implementation
    * No user interaction required
    * Direct API access
  </Tab>

  <Tab title="JWT">
    **Best for:** Custom authentication flows

    * Stateless authentication
    * Custom claims support
    * Advanced security requirements
  </Tab>
</Tabs>

### App Type Selection

<Accordion title="Integration Recipes" icon="link">
  **Perfect for:** Automating workflows between monday.com and your platform.
  <br /><br />**Technical Requirements:**

  * Custom trigger blocks for initiating workflows
  * Custom action blocks for executing operations
  * Input/output field mapping
  * Error handling and retry logic
    <br /><br />**Scoping Checklist:**
  * \[ ] Trigger event types identified
  * \[ ] Action operations defined
  * \[ ] Required input fields mapped
  * \[ ] Output data structure planned
  * \[ ] Error scenarios documented
</Accordion>

<Accordion title="Views & Widgets" icon="desktop">
  **Perfect for:** Embedding your platform's interface within monday.com
  <br /><br />**Technical Requirements:**

  * React component architecture
  * monday.com design system compliance
  * SDK integration
  * Responsive design
    <br /><br />**Scoping Checklist:**
  * \[ ] UI components identified
  * \[ ] Data flow architecture planned
  * \[ ] User interaction patterns defined
  * \[ ] Performance requirements set
  * \[ ] Responsive breakpoints planned
</Accordion>

### Relevant Resources

<Cards>
  <Card title="Authentication Guide" href="doc:choosing-auth" icon="key">
    Choose the right auth method
  </Card>

  <Card title="API Reference" href="https://developer.monday.com/api-reference/docs" icon="code">
    Explore available endpoints
  </Card>

  <Card title="Custom Fields Guide" href="doc:custom-fields" icon="edit">
    Plan specialized data types
  </Card>
</Cards>

# Phase 3: Building

**Goal:** Transform your technical plan into a working monday.com app

In the building phase, your team will build your app by applying all of the knowledge gained from the previous phase. This phase should go smoothly and efficiently if you have thoroughly scoped out your app.

Taking the integration recipe example from above, the building phase is where you will be creating your custom trigger, action, and field type blocks.

### Iterative development

Build your app in focused iterations to catch issues early and adapt to discoveries:

### Phase outcome

After completing this phase, you will have your new monday app that’s ready for submission to our apps review team. As such, we recommend preparing the graphical assets and marketing copy that will accompany your application in this phase as well.

### Related resources

* [Submitting Your App to the Apps Marketplace](https://developer.monday.com/apps/docs/submit-your-app)
* [Versioning in Apps](https://developer.monday.com/apps/docs/versioning)
* [Multitenancy Best Practices](https://developer.monday.com/apps/docs/multitenancy)
* [Example Apps](https://developer.monday.com/apps/docs/welcome-apps)

## Phase 4: App review

The last phase in the monday app development cycle is the review phase.

At this point, your app should be built and should be ready for submission to our apps marketplace. In the review phase, you can expect some feedback from our team on your app.

### Phase outcome

Once finished, your app will be available in our marketplace for our users!

### Related resources

* [Submitting Your App to the Apps Marketplace](https://developer.monday.com/apps/docs/submit-your-app)
* [Sharing Your Apps with Customers](https://developer.monday.com/apps/docs/share-your-apps)

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎




# Deploy your app

After creating an app and adding features in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center), you need to deploy your code and connect it to the features to activate their functionality on the monday.com platform.

You can either deploy your code to monday.com's infrastructure (recommended) or provide a URL to externally hosted code.

# Deployment options

There are multiple ways to deploy your code depending on where it runs (client-side or server-side) and where it’s hosted.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Where code runs
      </th>

      <th>
        Deployment options
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Client-side (in the browser)
      </td>

      <td>
        • [CLI](https://developer.monday.com/apps/docs/deploy-your-app#client-side-code-via-cli-mondaycom) (recommended)<br />• [Upload as a Zip file](https://developer.monday.com/apps/docs/deploy-your-app#client-side-code-via-zip-file) (will eventually be deprecated)<br />• [External hosting](https://developer.monday.com/apps/docs/deploy-your-app#external-hosting)
      </td>
    </tr>

    <tr>
      <td>
        Server-side (on a server)
      </td>

      <td>
        • [CLI](https://developer.monday.com/apps/docs/deploy-your-app#server-side-code-via-cli-monday-code) (recommended)<br />• [External hosting](https://developer.monday.com/apps/docs/deploy-your-app#external-hosting)
      </td>
    </tr>
  </tbody>
</Table>

## Client-side code via CLI (monday.com)

The recommended way to deploy client-side code to monday.com's infrastructure is through the CLI (read more [here](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codepush)). It allows you to automate your deployment flow and integrate with your CI/CD tools.

For a visual walkthrough, check out our [client-side app deployment tutorial on YouTube](https://www.youtube.com/watch?v=gdZCE96M4jc).

```shell Terminal
$ mapps code:push --client-side -d <PROJECT DIRECTORY PATH> -i <APP_VERSION_ID_TO_PUSH> 
```

## Client-side code via Zip file

You can also upload your client-side code to monday.com's infrastructure as a `.zip` file.

<div style={{ backgroundColor: "rgba(255, 236, 164, 0.4)", border: "1px solid #FBC02D", padding: "10px", marginTop: "20px" }}>
  <strong>🚧 Zip file deployment will be deprecated soon. </strong>We recommend migrating to the <a href="https://developer.monday.com/docs/cli" target="_blank" style={{ color: "#FBC02D", textDecoration: "none" }}>CLI</a> for long-term support.
</div>

## Server-side code via CLI (monday code)

Server-side code can only be deployed using the CLI (read more [here](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codepush)). This is for app features that use monday code to run backend logic.

```shell Terminal
$ mapps code:push -i 123456 
```

## External hosting

If your code is hosted outside of monday.com's infrastructure, you can integrate it with monday.com's platform by providing a render URL in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center). Doing so allows your app to run on your own infrastructure while still being accessible on monday.com.

# How to deploy

1. [Create an app](https://developer.monday.com/apps/docs/create-an-app#build-an-app) in the Developer Center.
2. Add and configure [app features](https://developer.monday.com/apps/docs/create-an-app#add-app-features).
3. Navigate to the *Feature Deployment* widget in the top right corner.

<Image align="center" className="border" width="700px" border={true} src="https://files.readme.io/92b3a584508905254f0cdf346cda5c6cb5805ac62ffaa6b42be09e27931faae7-Screenshot_2025-04-25_at_3.43.20_PM3x.png" />

4. Select your deployment method:
   1. **CLI (client/server):** Follow the prompts and deploy via the CLI. Provide the subroute of the feature to render.
   2. **Zip file (client-side only):** Upload the Zip file.
   3. **External hosting:** Paste your render URL.
5. Click **Save** to save your deployment.

# App versioning

Code deployments only impact the selected draft version. If your app has multiple versions, make sure you're deploying to the right one.





# Deploy your app

After creating an app and adding features in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center), you need to deploy your code and connect it to the features to activate their functionality on the monday.com platform.

You can either deploy your code to monday.com's infrastructure (recommended) or provide a URL to externally hosted code.

# Deployment options

There are multiple ways to deploy your code depending on where it runs (client-side or server-side) and where it’s hosted.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Where code runs
      </th>

      <th>
        Deployment options
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Client-side (in the browser)
      </td>

      <td>
        • [CLI](https://developer.monday.com/apps/docs/deploy-your-app#client-side-code-via-cli-mondaycom) (recommended)<br />• [Upload as a Zip file](https://developer.monday.com/apps/docs/deploy-your-app#client-side-code-via-zip-file) (will eventually be deprecated)<br />• [External hosting](https://developer.monday.com/apps/docs/deploy-your-app#external-hosting)
      </td>
    </tr>

    <tr>
      <td>
        Server-side (on a server)
      </td>

      <td>
        • [CLI](https://developer.monday.com/apps/docs/deploy-your-app#server-side-code-via-cli-monday-code) (recommended)<br />• [External hosting](https://developer.monday.com/apps/docs/deploy-your-app#external-hosting)
      </td>
    </tr>
  </tbody>
</Table>

## Client-side code via CLI (monday.com)

The recommended way to deploy client-side code to monday.com's infrastructure is through the CLI (read more [here](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codepush)). It allows you to automate your deployment flow and integrate with your CI/CD tools.

For a visual walkthrough, check out our [client-side app deployment tutorial on YouTube](https://www.youtube.com/watch?v=gdZCE96M4jc).

```shell Terminal
$ mapps code:push --client-side -d <PROJECT DIRECTORY PATH> -i <APP_VERSION_ID_TO_PUSH> 
```

## Client-side code via Zip file

You can also upload your client-side code to monday.com's infrastructure as a `.zip` file.

<div style={{ backgroundColor: "rgba(255, 236, 164, 0.4)", border: "1px solid #FBC02D", padding: "10px", marginTop: "20px" }}>
  <strong>🚧 Zip file deployment will be deprecated soon. </strong>We recommend migrating to the <a href="https://developer.monday.com/docs/cli" target="_blank" style={{ color: "#FBC02D", textDecoration: "none" }}>CLI</a> for long-term support.
</div>

## Server-side code via CLI (monday code)

Server-side code can only be deployed using the CLI (read more [here](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codepush)). This is for app features that use monday code to run backend logic.

```shell Terminal
$ mapps code:push -i 123456 
```

## External hosting

If your code is hosted outside of monday.com's infrastructure, you can integrate it with monday.com's platform by providing a render URL in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center). Doing so allows your app to run on your own infrastructure while still being accessible on monday.com.

# How to deploy

1. [Create an app](https://developer.monday.com/apps/docs/create-an-app#build-an-app) in the Developer Center.
2. Add and configure [app features](https://developer.monday.com/apps/docs/create-an-app#add-app-features).
3. Navigate to the *Feature Deployment* widget in the top right corner.

<Image align="center" className="border" width="700px" border={true} src="https://files.readme.io/92b3a584508905254f0cdf346cda5c6cb5805ac62ffaa6b42be09e27931faae7-Screenshot_2025-04-25_at_3.43.20_PM3x.png" />

4. Select your deployment method:
   1. **CLI (client/server):** Follow the prompts and deploy via the CLI. Provide the subroute of the feature to render.
   2. **Zip file (client-side only):** Upload the Zip file.
   3. **External hosting:** Paste your render URL.
5. Click **Save** to save your deployment.

# App versioning

Code deployments only impact the selected draft version. If your app has multiple versions, make sure you're deploying to the right one.



# Deploy your app

After creating an app and adding features in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center), you need to deploy your code and connect it to the features to activate their functionality on the monday.com platform.

You can either deploy your code to monday.com's infrastructure (recommended) or provide a URL to externally hosted code.

# Deployment options

There are multiple ways to deploy your code depending on where it runs (client-side or server-side) and where it’s hosted.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Where code runs
      </th>

      <th>
        Deployment options
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Client-side (in the browser)
      </td>

      <td>
        • [CLI](https://developer.monday.com/apps/docs/deploy-your-app#client-side-code-via-cli-mondaycom) (recommended)<br />• [Upload as a Zip file](https://developer.monday.com/apps/docs/deploy-your-app#client-side-code-via-zip-file) (will eventually be deprecated)<br />• [External hosting](https://developer.monday.com/apps/docs/deploy-your-app#external-hosting)
      </td>
    </tr>

    <tr>
      <td>
        Server-side (on a server)
      </td>

      <td>
        • [CLI](https://developer.monday.com/apps/docs/deploy-your-app#server-side-code-via-cli-monday-code) (recommended)<br />• [External hosting](https://developer.monday.com/apps/docs/deploy-your-app#external-hosting)
      </td>
    </tr>
  </tbody>
</Table>

## Client-side code via CLI (monday.com)

The recommended way to deploy client-side code to monday.com's infrastructure is through the CLI (read more [here](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codepush)). It allows you to automate your deployment flow and integrate with your CI/CD tools.

For a visual walkthrough, check out our [client-side app deployment tutorial on YouTube](https://www.youtube.com/watch?v=gdZCE96M4jc).

```shell Terminal
$ mapps code:push --client-side -d <PROJECT DIRECTORY PATH> -i <APP_VERSION_ID_TO_PUSH> 
```

## Client-side code via Zip file

You can also upload your client-side code to monday.com's infrastructure as a `.zip` file.

<div style={{ backgroundColor: "rgba(255, 236, 164, 0.4)", border: "1px solid #FBC02D", padding: "10px", marginTop: "20px" }}>
  <strong>🚧 Zip file deployment will be deprecated soon. </strong>We recommend migrating to the <a href="https://developer.monday.com/docs/cli" target="_blank" style={{ color: "#FBC02D", textDecoration: "none" }}>CLI</a> for long-term support.
</div>

## Server-side code via CLI (monday code)

Server-side code can only be deployed using the CLI (read more [here](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codepush)). This is for app features that use monday code to run backend logic.

```shell Terminal
$ mapps code:push -i 123456 
```

## External hosting

If your code is hosted outside of monday.com's infrastructure, you can integrate it with monday.com's platform by providing a render URL in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center). Doing so allows your app to run on your own infrastructure while still being accessible on monday.com.

# How to deploy

1. [Create an app](https://developer.monday.com/apps/docs/create-an-app#build-an-app) in the Developer Center.
2. Add and configure [app features](https://developer.monday.com/apps/docs/create-an-app#add-app-features).
3. Navigate to the *Feature Deployment* widget in the top right corner.

<Image align="center" className="border" width="700px" border={true} src="https://files.readme.io/92b3a584508905254f0cdf346cda5c6cb5805ac62ffaa6b42be09e27931faae7-Screenshot_2025-04-25_at_3.43.20_PM3x.png" />

4. Select your deployment method:
   1. **CLI (client/server):** Follow the prompts and deploy via the CLI. Provide the subroute of the feature to render.
   2. **Zip file (client-side only):** Upload the Zip file.
   3. **External hosting:** Paste your render URL.
5. Click **Save** to save your deployment.

# App versioning

Code deployments only impact the selected draft version. If your app has multiple versions, make sure you're deploying to the right one.



# Deploy your app

After creating an app and adding features in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center), you need to deploy your code and connect it to the features to activate their functionality on the monday.com platform.

You can either deploy your code to monday.com's infrastructure (recommended) or provide a URL to externally hosted code.

# Deployment options

There are multiple ways to deploy your code depending on where it runs (client-side or server-side) and where it’s hosted.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Where code runs
      </th>

      <th>
        Deployment options
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Client-side (in the browser)
      </td>

      <td>
        • [CLI](https://developer.monday.com/apps/docs/deploy-your-app#client-side-code-via-cli-mondaycom) (recommended)<br />• [Upload as a Zip file](https://developer.monday.com/apps/docs/deploy-your-app#client-side-code-via-zip-file) (will eventually be deprecated)<br />• [External hosting](https://developer.monday.com/apps/docs/deploy-your-app#external-hosting)
      </td>
    </tr>

    <tr>
      <td>
        Server-side (on a server)
      </td>

      <td>
        • [CLI](https://developer.monday.com/apps/docs/deploy-your-app#server-side-code-via-cli-monday-code) (recommended)<br />• [External hosting](https://developer.monday.com/apps/docs/deploy-your-app#external-hosting)
      </td>
    </tr>
  </tbody>
</Table>

## Client-side code via CLI (monday.com)

The recommended way to deploy client-side code to monday.com's infrastructure is through the CLI (read more [here](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codepush)). It allows you to automate your deployment flow and integrate with your CI/CD tools.

For a visual walkthrough, check out our [client-side app deployment tutorial on YouTube](https://www.youtube.com/watch?v=gdZCE96M4jc).

```shell Terminal
$ mapps code:push --client-side -d <PROJECT DIRECTORY PATH> -i <APP_VERSION_ID_TO_PUSH> 
```

## Client-side code via Zip file

You can also upload your client-side code to monday.com's infrastructure as a `.zip` file.

<div style={{ backgroundColor: "rgba(255, 236, 164, 0.4)", border: "1px solid #FBC02D", padding: "10px", marginTop: "20px" }}>
  <strong>🚧 Zip file deployment will be deprecated soon. </strong>We recommend migrating to the <a href="https://developer.monday.com/docs/cli" target="_blank" style={{ color: "#FBC02D", textDecoration: "none" }}>CLI</a> for long-term support.
</div>

## Server-side code via CLI (monday code)

Server-side code can only be deployed using the CLI (read more [here](https://developer.monday.com/apps/docs/command-line-interface-cli#mapps-codepush)). This is for app features that use monday code to run backend logic.

```shell Terminal
$ mapps code:push -i 123456 
```

## External hosting

If your code is hosted outside of monday.com's infrastructure, you can integrate it with monday.com's platform by providing a render URL in the [Developer Center](https://developer.monday.com/apps/docs/the-developer-center). Doing so allows your app to run on your own infrastructure while still being accessible on monday.com.

# How to deploy

1. [Create an app](https://developer.monday.com/apps/docs/create-an-app#build-an-app) in the Developer Center.
2. Add and configure [app features](https://developer.monday.com/apps/docs/create-an-app#add-app-features).
3. Navigate to the *Feature Deployment* widget in the top right corner.

<Image align="center" className="border" width="700px" border={true} src="https://files.readme.io/92b3a584508905254f0cdf346cda5c6cb5805ac62ffaa6b42be09e27931faae7-Screenshot_2025-04-25_at_3.43.20_PM3x.png" />

4. Select your deployment method:
   1. **CLI (client/server):** Follow the prompts and deploy via the CLI. Provide the subroute of the feature to render.
   2. **Zip file (client-side only):** Upload the Zip file.
   3. **External hosting:** Paste your render URL.
5. Click **Save** to save your deployment.

# App versioning

Code deployments only impact the selected draft version. If your app has multiple versions, make sure you're deploying to the right one.



# App features

Apps are comprised of one or more **app features**. App features define **where your app appears** in monday.com, **how users interact with it**, and **which parts of the platform it extends**.

Select app features based on:

* Where your app should appear in the platform
* Whether users need to visualize data or perform actions
* The scope of data your app operates on (item, board, workspace, or account)

You can mix and match app features to create a complete app experience tailored to your users’ workflows.

# Quick reference

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Scope
      </th>

      <th>
        Feature type
      </th>

      <th>
        Primary use case
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        AI
      </td>

      <td>
        * [AI assistant](https://developer.monday.com/apps/docs/ai-assistant)
        * [Sidekick skill](https://developer.monday.com/apps/docs/sidekick-skill)
      </td>

      <td>
        Automation, content generation
      </td>
    </tr>

    <tr>
      <td>
        Boards
      </td>

      <td>
        * [Board column extension](https://developer.monday.com/apps/docs/board-column-extension)
        * [Board menu features](https://developer.monday.com/apps/docs/board-menu-features)
        * Board view
        * [Column view](https://developer.monday.com/apps/docs/column-views)
        * Item view
      </td>

      <td>
        Visualization, actions, configuration
      </td>
    </tr>

    <tr>
      <td>
        Dashboards
      </td>

      <td>
        * Dashboard widgets
      </td>

      <td>
        Multi-board analytics
      </td>
    </tr>

    <tr>
      <td>
        Docs
      </td>

      <td>
        * [Doc actions](https://developer.monday.com/apps/docs/doc-actions-for-workdocs)
      </td>

      <td>
        Document workflows
      </td>
    </tr>

    <tr>
      <td>
        Integrations
      </td>

      <td>
        * [monday workflows](https://developer.monday.com/apps/docs/monday-workflows)
      </td>

      <td>
        Automation, external integrations
      </td>
    </tr>

    <tr>
      <td>
        Settings and administration
      </td>

      <td>
        * [Account settings view](https://developer.monday.com/apps/docs/account-settings-view)
        * [Administration view](https://developer.monday.com/apps/docs/administration-view)
      </td>

      <td>
        Admin tools, global configuration
      </td>
    </tr>

    <tr>
      <td>
        Workspaces
      </td>

      <td>
        * [Custom objects](https://developer.monday.com/apps/docs/custom-objects)
        * [Workspace templates](https://developer.monday.com/apps/docs/workspace-templates)
      </td>

      <td>
        Standalone tools, complete solutions
      </td>
    </tr>
  </tbody>
</Table>

# Create an app feature

Ready to start building? After deciding which app feature you want to build:

1. Navigate to the [Developer Center](https://developer.monday.com/apps/docs/create-an-app#add-an-app-feature-in-the-developer-center).
2. Select your app feature type.
3. Configure your feature settings.
4. Start building!.

[Get started in the Developer Center →](https://developer.monday.com/apps/docs/create-an-app#add-an-app-feature-in-the-developer-center)



# App features

Apps are comprised of one or more **app features**. App features define **where your app appears** in monday.com, **how users interact with it**, and **which parts of the platform it extends**.

Select app features based on:

* Where your app should appear in the platform
* Whether users need to visualize data or perform actions
* The scope of data your app operates on (item, board, workspace, or account)

You can mix and match app features to create a complete app experience tailored to your users’ workflows.

# Quick reference

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Scope
      </th>

      <th>
        Feature type
      </th>

      <th>
        Primary use case
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        AI
      </td>

      <td>
        * [AI assistant](https://developer.monday.com/apps/docs/ai-assistant)
        * [Sidekick skill](https://developer.monday.com/apps/docs/sidekick-skill)
      </td>

      <td>
        Automation, content generation
      </td>
    </tr>

    <tr>
      <td>
        Boards
      </td>

      <td>
        * [Board column extension](https://developer.monday.com/apps/docs/board-column-extension)
        * [Board menu features](https://developer.monday.com/apps/docs/board-menu-features)
        * Board view
        * [Column view](https://developer.monday.com/apps/docs/column-views)
        * Item view
      </td>

      <td>
        Visualization, actions, configuration
      </td>
    </tr>

    <tr>
      <td>
        Dashboards
      </td>

      <td>
        * Dashboard widgets
      </td>

      <td>
        Multi-board analytics
      </td>
    </tr>

    <tr>
      <td>
        Docs
      </td>

      <td>
        * [Doc actions](https://developer.monday.com/apps/docs/doc-actions-for-workdocs)
      </td>

      <td>
        Document workflows
      </td>
    </tr>

    <tr>
      <td>
        Integrations
      </td>

      <td>
        * [monday workflows](https://developer.monday.com/apps/docs/monday-workflows)
      </td>

      <td>
        Automation, external integrations
      </td>
    </tr>

    <tr>
      <td>
        Settings and administration
      </td>

      <td>
        * [Account settings view](https://developer.monday.com/apps/docs/account-settings-view)
        * [Administration view](https://developer.monday.com/apps/docs/administration-view)
      </td>

      <td>
        Admin tools, global configuration
      </td>
    </tr>

    <tr>
      <td>
        Workspaces
      </td>

      <td>
        * [Custom objects](https://developer.monday.com/apps/docs/custom-objects)
        * [Workspace templates](https://developer.monday.com/apps/docs/workspace-templates)
      </td>

      <td>
        Standalone tools, complete solutions
      </td>
    </tr>
  </tbody>
</Table>

# Create an app feature

Ready to start building? After deciding which app feature you want to build:

1. Navigate to the [Developer Center](https://developer.monday.com/apps/docs/create-an-app#add-an-app-feature-in-the-developer-center).
2. Select your app feature type.
3. Configure your feature settings.
4. Start building!.

[Get started in the Developer Center →](https://developer.monday.com/apps/docs/create-an-app#add-an-app-feature-in-the-developer-center)


# Sidekick skill

Build a skill that can be invoked by monday.com's digital agent, sidekick

The **Sidekick skill** app feature lets you expose custom actions to [sidekick](https://support.monday.com/hc/en-us/articles/26701503726610-Get-started-with-monday-sidekick), monday.com’s AI-powered digital worker. Skills define the actions sidekick can take on behalf of a user in response to natural-language requests.

By building skills, you extend monday.com’s built-in AI capabilities and make your app usable through conversation without requiring users to navigate menus, configure automations, or switch tools.

# Background

## Sidekick

Sidekick is monday.com's AI-powered digital worker. It operates inside your workspace and helps users complete tasks quickly and efficiently by combining conversational understanding with live actions.

It understands the user's context, monday.com’s core data model, and integrated tools and connected apps. Using this context, it can:

* Write and summarize content
* Answer questions based on board context
* Search the web for additional information
* Take action via connected apps and tools

Think of it as a conversational interface that enables users to complete tasks in monday.com without needing to switch tabs or navigate complex workflows.

## Skills

Sidekick can perform many tasks natively, but it's limited to actions available within the monday platform. Skills extend those capabilities.

A **Sidekick skill** app feature exposes your app’s functionality to sidekick, so it can perform actions on behalf of users using natural language. From a user’s perspective, skills make your app accessible through conversation, allowing them to interact with your product naturally and in context.

<Callout icon="💡" theme="default">
  ### Designing effective sidekick skills

  How you structure your skills directly impacts how often Sidekick selects them and how accurately they run. Before building, review the [Sidekick skills best practices](https://developer.monday.com/apps/docs/sidekick-skills-best-practices) guide.
</Callout>

### What is a skill made of?

A skill is comprised of [automation blocks](https://developer.monday.com/apps/docs/monday-workflows) that run when the skill is invoked. When sidekick determines that a skill is relevant, it selects a workflow block and executes it. See the [Action Blocks Reference](https://developer.monday.com/apps/docs/workflows-actions) for the full API reference.

## How does Sidekick decide to run my skill?

Sidekick decides whether to execute a skill by comparing the user's conversation with titles and action-based descriptions of all available skills. It then parses the user's chat to extract inputs and identify relevant blocks. It passes the user's inputs to the workflow block infrastructure, which will handle the API call to your block.

To run a block, monday.com sends an HTTP request to your block's **Run URL**. Your endpoint must:

* Complete the block's action
* Return structured output synchronously
* Respond quickly so Sidekick can continue the conversation

Skills are invoked one block at a time. Long-running, asynchronous, or event-driven workflows are not supported. Before execution, Sidekick will pause to request explicit user confirmation.

# Unsupported blocks

## Not supported

To ensure a good user experience, certain blocks can't be used as skills.

| Block Type     | Reason                                                               |
| :------------- | :------------------------------------------------------------------- |
| Trigger blocks | Sidekick operates in active conversations, not event-based workflows |
| Async blocks   | Skills must return results in real-time                              |

## Temporarily unsupported

| Block Type                      | Reason                                                                                                                                                   |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Object fields with dependencies | Fields whose structure depends on external data (e.g., Jira project-specific fields) are temporarily not supported, but they will be added in the future |

# Getting started

## Prerequisites

* At least one automation action block
* Use the provided `shortLivedToken` to authenticate requests to monday.com APIs
* Third-party authentication configured using the [credentials field](https://developer.monday.com/apps/docs/credentials) (if your block accesses external services)

## Step 1: Create a Sidekick skill feature

1. [Create an app](https://developer.monday.com/apps/docs/create-an-app#creating-an-app-in-the-developer-center) or open an existing one.
2. Add a new *Sidekick skill* [app feature](https://developer.monday.com/apps/docs/create-an-app#adding-an-app-feature-in-the-developer-center).

## Step 2: Configure the feature

1. Under *Skill configuration*, provide a clear title and description. These tell Sidekick when your app should be used.
2. Under *Skill Tools*, select **Add Automation Blocks** and choose one or more blocks.

   <Image align="center" alt="Choose a workflow block to add to your AI Agent Skill" border={true} caption="Choose a block to add to your AI Agent Skill" src="https://files.readme.io/14c8947c1cc24f3dee981400665b9034c37d45381a07a17596ee2c5c4e1b39d3-Screenshot_2026-01-06_at_10.20.57_PM.png" width="500px" />

## Step 3: Create and configure blocks

1. Under *Skill Tools*, click **Add Automation Blocks**. This will open a block configuration popup.
2. Select an existing block, or click **Create New** in the bottom-left corner. This opens a new tab for configuring the block.
3. In the new tab, you can [configure the block's](https://developer.monday.com/apps/docs/create-an-automation-block#step-2-configure-the-block) basic details, deployment information, fields, and API configuration. The provided configurations directly impact how Sidekick selects and executes actions.

> 🚧 Block titles and descriptions are critical for skill execution
>
> A skill is defined by the automation blocks it contains. When Sidekick determines that a skill is relevant, it relies on each block’s title and description to understand what actions are available and which block to run.
>
> Use clear, descriptive, action-based titles and descriptions that explain:
>
> * What the block does
> * When it should be used
> * What problem it solves
>
> For fields, descriptions should clearly document accepted values, usage, constraints, and formatting requirements. This helps sidekick correctly extract inputs from the conversation and execute the block as intended.

4. Once configured, click **Save changes**.
5. Return to the original tab and connect the new block.

# Enabling your skill in sidekick

1. Open sidekick on a board or item.
2. Click the **Skills** button.

<Image align="center" alt="Toggling skills in the sidekick menu" border={true} caption="Skills button in the sidekick menu" src="https://files.readme.io/2912cc89aa6bd44e3be39d6ebee60df00ca39a426b7b22e9849cccba27b72477-Add_Sidekick_AI_Skill.png" width="500px" />

3. Find your skill and toggle it on.
4. If prompted, authenticate any third-party accounts (e.g., Google Drive or Slack).

# Example

We've built a set of examples demonstrating basic concepts of the Sidekick Skill feature:

* Basic workflow block APIs
* Storing authentication profiles
* Integration with Mailchimp and GitHub APIs

View the examples on [GitHub](https://github.com/mondaycom/ai-skills-examples).

<br />



# Sidekick skill

Build a skill that can be invoked by monday.com's digital agent, sidekick

The **Sidekick skill** app feature lets you expose custom actions to [sidekick](https://support.monday.com/hc/en-us/articles/26701503726610-Get-started-with-monday-sidekick), monday.com’s AI-powered digital worker. Skills define the actions sidekick can take on behalf of a user in response to natural-language requests.

By building skills, you extend monday.com’s built-in AI capabilities and make your app usable through conversation without requiring users to navigate menus, configure automations, or switch tools.

# Background

## Sidekick

Sidekick is monday.com's AI-powered digital worker. It operates inside your workspace and helps users complete tasks quickly and efficiently by combining conversational understanding with live actions.

It understands the user's context, monday.com’s core data model, and integrated tools and connected apps. Using this context, it can:

* Write and summarize content
* Answer questions based on board context
* Search the web for additional information
* Take action via connected apps and tools

Think of it as a conversational interface that enables users to complete tasks in monday.com without needing to switch tabs or navigate complex workflows.

## Skills

Sidekick can perform many tasks natively, but it's limited to actions available within the monday platform. Skills extend those capabilities.

A **Sidekick skill** app feature exposes your app’s functionality to sidekick, so it can perform actions on behalf of users using natural language. From a user’s perspective, skills make your app accessible through conversation, allowing them to interact with your product naturally and in context.

<Callout icon="💡" theme="default">
  ### Designing effective sidekick skills

  How you structure your skills directly impacts how often Sidekick selects them and how accurately they run. Before building, review the [Sidekick skills best practices](https://developer.monday.com/apps/docs/sidekick-skills-best-practices) guide.
</Callout>

### What is a skill made of?

A skill is comprised of [automation blocks](https://developer.monday.com/apps/docs/monday-workflows) that run when the skill is invoked. When sidekick determines that a skill is relevant, it selects a workflow block and executes it. See the [Action Blocks Reference](https://developer.monday.com/apps/docs/workflows-actions) for the full API reference.

## How does Sidekick decide to run my skill?

Sidekick decides whether to execute a skill by comparing the user's conversation with titles and action-based descriptions of all available skills. It then parses the user's chat to extract inputs and identify relevant blocks. It passes the user's inputs to the workflow block infrastructure, which will handle the API call to your block.

To run a block, monday.com sends an HTTP request to your block's **Run URL**. Your endpoint must:

* Complete the block's action
* Return structured output synchronously
* Respond quickly so Sidekick can continue the conversation

Skills are invoked one block at a time. Long-running, asynchronous, or event-driven workflows are not supported. Before execution, Sidekick will pause to request explicit user confirmation.

# Unsupported blocks

## Not supported

To ensure a good user experience, certain blocks can't be used as skills.

| Block Type     | Reason                                                               |
| :------------- | :------------------------------------------------------------------- |
| Trigger blocks | Sidekick operates in active conversations, not event-based workflows |
| Async blocks   | Skills must return results in real-time                              |

## Temporarily unsupported

| Block Type                      | Reason                                                                                                                                                   |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Object fields with dependencies | Fields whose structure depends on external data (e.g., Jira project-specific fields) are temporarily not supported, but they will be added in the future |

# Getting started

## Prerequisites

* At least one automation action block
* Use the provided `shortLivedToken` to authenticate requests to monday.com APIs
* Third-party authentication configured using the [credentials field](https://developer.monday.com/apps/docs/credentials) (if your block accesses external services)

## Step 1: Create a Sidekick skill feature

1. [Create an app](https://developer.monday.com/apps/docs/create-an-app#creating-an-app-in-the-developer-center) or open an existing one.
2. Add a new *Sidekick skill* [app feature](https://developer.monday.com/apps/docs/create-an-app#adding-an-app-feature-in-the-developer-center).

## Step 2: Configure the feature

1. Under *Skill configuration*, provide a clear title and description. These tell Sidekick when your app should be used.
2. Under *Skill Tools*, select **Add Automation Blocks** and choose one or more blocks.

   <Image align="center" alt="Choose a workflow block to add to your AI Agent Skill" border={true} caption="Choose a block to add to your AI Agent Skill" src="https://files.readme.io/14c8947c1cc24f3dee981400665b9034c37d45381a07a17596ee2c5c4e1b39d3-Screenshot_2026-01-06_at_10.20.57_PM.png" width="500px" />

## Step 3: Create and configure blocks

1. Under *Skill Tools*, click **Add Automation Blocks**. This will open a block configuration popup.
2. Select an existing block, or click **Create New** in the bottom-left corner. This opens a new tab for configuring the block.
3. In the new tab, you can [configure the block's](https://developer.monday.com/apps/docs/create-an-automation-block#step-2-configure-the-block) basic details, deployment information, fields, and API configuration. The provided configurations directly impact how Sidekick selects and executes actions.

> 🚧 Block titles and descriptions are critical for skill execution
>
> A skill is defined by the automation blocks it contains. When Sidekick determines that a skill is relevant, it relies on each block’s title and description to understand what actions are available and which block to run.
>
> Use clear, descriptive, action-based titles and descriptions that explain:
>
> * What the block does
> * When it should be used
> * What problem it solves
>
> For fields, descriptions should clearly document accepted values, usage, constraints, and formatting requirements. This helps sidekick correctly extract inputs from the conversation and execute the block as intended.

4. Once configured, click **Save changes**.
5. Return to the original tab and connect the new block.

# Enabling your skill in sidekick

1. Open sidekick on a board or item.
2. Click the **Skills** button.

<Image align="center" alt="Toggling skills in the sidekick menu" border={true} caption="Skills button in the sidekick menu" src="https://files.readme.io/2912cc89aa6bd44e3be39d6ebee60df00ca39a426b7b22e9849cccba27b72477-Add_Sidekick_AI_Skill.png" width="500px" />

3. Find your skill and toggle it on.
4. If prompted, authenticate any third-party accounts (e.g., Google Drive or Slack).

# Example

We've built a set of examples demonstrating basic concepts of the Sidekick Skill feature:

* Basic workflow block APIs
* Storing authentication profiles
* Integration with Mailchimp and GitHub APIs

View the examples on [GitHub](https://github.com/mondaycom/ai-skills-examples).

<br />



# Board menu features

monday.com <a href="https://support.monday.com/hc/en-us/articles/115005317249-The-Basics-of-a-Board" target="_blank">boards</a> and <a href="https://support.monday.com/hc/en-us/articles/115005319105-The-basics-of-items" target="_blank">items</a> play an integral role in the system and form the building blocks that allow users to create and store data. Traditional board and item views enable your app to display and update a board and its items, but it is essential to support apps that work on an item or group level.

Board menu app features do just that. These app features extend the platform by enabling developers to create apps that work on a single group, a single item, or multiple items. They live in three different locations on the platform, and each app feature serves a different purpose based on your app's logic:

1. <a href="https://developer.monday.com/apps/docs/board-menu-features#board-group-menu">Board group menu</a>
2. <a href="https://developer.monday.com/apps/docs/board-menu-features#board-item-menu">Board item menu</a>
3. <a href="https://developer.monday.com/apps/docs/board-menu-features#board-multi-item-menu">Board multi-item menu</a>

This guide walks through each of the three board menu features and teaches you how to build your own. Let's get started!

# Building a board menu feature

1. Click on your profile picture in the top right corner.
2. If you don't have *Developer mode* activated, follow these steps. Skip to **step 3** if you already activated it.
   1. Select **monday.labs**.
   2. Type *Developer mode* in the search bar.
   3. Click **Activate** and close the modal.
   4. Wait for the page to refresh.
   5. Click on your profile picture again.
3. Select **Developers**. This will open the *Developer Center* in a new tab.
4. On the new tab, click **Create app**.
5. Navigate to the *Features* tab and select **Create feature**.
6. In the search bar, type *board*. This will show you all the board app features.
7. Select the <a href="https://developer.monday.com/apps/docs/board-menu-features#selecting-a-board-menu-feature" target="_blank">board menu feature</a> you'd like to build.
8. Click **Create**.

# Selecting a board menu feature

## Board group menu

The *board group menu* feature only works on groups and enables your app to perform an action on a single group. When a user hovers over a group, three dots (**...**) appear to the left of it. Clicking the dots opens up a menu, and your app will appear under the *Apps* section.

You can use this feature for any app that works on a single group on a board, such as reordering items in the group, sending the items as text to another app, or compiling a list.

<Image align="center" className="border" border={true} src="https://files.readme.io/9650e48-Board_group_menu.png" />

## Board item menu

The *board item menu* feature only works on items and enables your app to perform an action on just one item. When a user hovers over an item, three dots (**...**) appear to the left of it. Clicking the dots opens up a menu, and your app will appear under the *Apps* section.

You can use this feature for any app that works on a single item on a board, such as populating an item's columns based on information from a third-party application or sending the item's as text to another app.

<Image align="center" className="border" border={true} src="https://files.readme.io/4a5d28a-Board_item_menu.png" />

## Board multi-item menu

The *board multi-item menu* feature only works on items and enables your app to perform an action on multiple items. When a user selects one or more items, a menu opens at the bottom of the screen and your app appears under the *Apps* section.

You can use this feature for any app that works on one or more items, such as merging multiple items into one, reordering them, or sending them as text to another app.

**Please keep in mind** that users won't be prevented from using this app feature regardless of the number of selected items!

<Image align="center" className="border" border={true} src="https://files.readme.io/e8b87d3-Board_multi_item_menu.png" />

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎



# Board menu features

monday.com <a href="https://support.monday.com/hc/en-us/articles/115005317249-The-Basics-of-a-Board" target="_blank">boards</a> and <a href="https://support.monday.com/hc/en-us/articles/115005319105-The-basics-of-items" target="_blank">items</a> play an integral role in the system and form the building blocks that allow users to create and store data. Traditional board and item views enable your app to display and update a board and its items, but it is essential to support apps that work on an item or group level.

Board menu app features do just that. These app features extend the platform by enabling developers to create apps that work on a single group, a single item, or multiple items. They live in three different locations on the platform, and each app feature serves a different purpose based on your app's logic:

1. <a href="https://developer.monday.com/apps/docs/board-menu-features#board-group-menu">Board group menu</a>
2. <a href="https://developer.monday.com/apps/docs/board-menu-features#board-item-menu">Board item menu</a>
3. <a href="https://developer.monday.com/apps/docs/board-menu-features#board-multi-item-menu">Board multi-item menu</a>

This guide walks through each of the three board menu features and teaches you how to build your own. Let's get started!

# Building a board menu feature

1. Click on your profile picture in the top right corner.
2. If you don't have *Developer mode* activated, follow these steps. Skip to **step 3** if you already activated it.
   1. Select **monday.labs**.
   2. Type *Developer mode* in the search bar.
   3. Click **Activate** and close the modal.
   4. Wait for the page to refresh.
   5. Click on your profile picture again.
3. Select **Developers**. This will open the *Developer Center* in a new tab.
4. On the new tab, click **Create app**.
5. Navigate to the *Features* tab and select **Create feature**.
6. In the search bar, type *board*. This will show you all the board app features.
7. Select the <a href="https://developer.monday.com/apps/docs/board-menu-features#selecting-a-board-menu-feature" target="_blank">board menu feature</a> you'd like to build.
8. Click **Create**.

# Selecting a board menu feature

## Board group menu

The *board group menu* feature only works on groups and enables your app to perform an action on a single group. When a user hovers over a group, three dots (**...**) appear to the left of it. Clicking the dots opens up a menu, and your app will appear under the *Apps* section.

You can use this feature for any app that works on a single group on a board, such as reordering items in the group, sending the items as text to another app, or compiling a list.

<Image align="center" className="border" border={true} src="https://files.readme.io/9650e48-Board_group_menu.png" />

## Board item menu

The *board item menu* feature only works on items and enables your app to perform an action on just one item. When a user hovers over an item, three dots (**...**) appear to the left of it. Clicking the dots opens up a menu, and your app will appear under the *Apps* section.

You can use this feature for any app that works on a single item on a board, such as populating an item's columns based on information from a third-party application or sending the item's as text to another app.

<Image align="center" className="border" border={true} src="https://files.readme.io/4a5d28a-Board_item_menu.png" />

## Board multi-item menu

The *board multi-item menu* feature only works on items and enables your app to perform an action on multiple items. When a user selects one or more items, a menu opens at the bottom of the screen and your app appears under the *Apps* section.

You can use this feature for any app that works on one or more items, such as merging multiple items into one, reordering them, or sending them as text to another app.

**Please keep in mind** that users won't be prevented from using this app feature regardless of the number of selected items!

<Image align="center" className="border" border={true} src="https://files.readme.io/e8b87d3-Board_multi_item_menu.png" />

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎



# Custom Objects

Custom objects allow you to create a view separate from a workflow while providing more real estate on the monday platform.

Traditional views and widgets must be connected to a specific dashboard, board, or item on monday. While this format works for some features, others may require a separate space to visualize data outside of a board, item, or dashboard.

That's where custom objects come in. They allow features to live independently in the left-pane menu so that users can access the view outside the context of a specific dashboard, board, or item. You can use the view as a standalone app or for a specific feature within an app.

Custom objects are rendered as iframes served from a custom URL or directly from our CDN. Aside from the title and top header, the displayed content will span the entire screen. This view gives your app more visibility to users in the account, ultimately providing a better customer experience.

# Building a custom object

You can add this feature just like you would any other <a href="https://developer.monday.com/apps/docs/quickstart-view#create-your-monday-app" target="_blank">view</a> from the developer section.

1. Click your profile picture in the top right corner of the platform.
2. Select **Developers**. This will open the *Developer Center* in another tab.
3. Select an existing app or create a new one.
4. Navigate to the *Features* tab on the left-side menu.
5. Click **Create new feature**.
6. Type *Object* in the search bar or scroll until you find the feature card.
7. Select the *Object* feature and click **Create**.
8. This will take you to the *Feature details* page where you can upload your build.

# Accessing a custom object

Users can access the feature by clicking the **Add item to workspace (+)** button at the top of the left side menu, just like they would for a doc or board. They then can select **Apps** and look for your app in the *Installed* section.

<Image align="center" className="border" border={true} src="https://files.readme.io/c3d8ebf-Custom_object_feature.png" />

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎



# Value-created event best practices

This guide will explain value-created events, the benefits of implementing the feature, and the steps you need to take to use the feature!

You can report value-created events to track the time between when a user installs the app and when they get value from it. The event represents a time when a user does something useful within your app, and you should select it based on the app's logic.

> 📘
>
> Full disclosure, after executing this method, you won't see any changes immediately. To analyze the amount of time it takes users to get value from our apps, we need your help in implementing this feature! We plan on exposing these insights to app developers and adding more telemetry about app usage in the future.

Tracking the time between installation and when the user gets the value-created event provides unique insight that will help you better understand your users and the value they get from your app. In the future, we plan on sharing insights with developers regarding their apps. This feature will ultimately help provide a better user experience, lead to more app usage, and minimize the gap between installation and app usage.

We can also use the feature to measure each app's success after installation and the overall success of all apps in the marketplace. We will use these insights to reduce the friction in the install-to-use flow, ultimately creating a better user and developer experience!

# Selecting a value-created event

You decide what you want to use as the value-created event based on your app's functionality. Events will differ from app to app based on their features, how much they interact with users, and the steps a user must take to use the app. Some example events may track when a user:

* Renders a view (especially if your app doesn't interact with users)
* Creates an item
* Defines something
* Renders a window
* Paints something on a board
* Sees an image

This is not an exhaustive list by any means, but it should give you an idea of the potential values a user could get from your application! In the future, we plan on creating a list of events that you can choose from based on the most frequently defined events.

We recommend calling this every time the user gets the value-created event so we can measure actual usage over time. You can also call this for each feature, like board views, item views, and dashboard widgets. Each of these unique features can generate a value-created event separately.

We also recommend executing this method every time the event occurs - not just the first time and not just for a specific user or account. Doing so allows us to track adoption across the account and accurately gauge the value of each app.

# Making a value-created event

Once you've selected your value-created event, you can call the `monday.execute()` method with the `valueCreatedForUser` type each time the event happens. There are no parameters for this method, and the function will return a promise which resolves when successful. There is no return value. You can find the `valueCreatedForUser` method in the <a href="https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user" target="_blank">SDK</a>.

```javascript
monday.execute('valueCreatedForUser')
```

> 📘 Join our developer community!
>
> We've created a [community](https://developer-community.monday.com/) specifically for our devs where you can search through previous topics to find solutions, ask new questions, hear about new features and updates, and learn tips and tricks from other devs. Come join in on the fun! 😎



# Gradually release new features

Learn how to gradually release a new version of your app to specific audiences

The **gradual release** feature enables you to roll out a new version of your app to a select group of accounts. This helps ensure a smoother release process for critical and breaking features. It also enables you to test new features on a smaller audience or give specific users early access before the full release.

# Eligibility

The gradual release feature is available for **all** monday.com apps with at least **one** live version. It is compatible with all app features, except for the integration of the sentence builder and workspace template features.

# Concepts

The gradual release feature allows you to control which app features are released in the version and to whom. Any app features not included in the gradual release will remain unchanged in the current live version.

You can release features to a specific set of accounts by entering individual account IDs or to a percentage of accounts within a specific region. Accounts are randomly selected based on the specified percentage.

Once a gradual release is published, the version will be in *Gradual release* status in the [Versions](https://developer.monday.com/apps/docs/the-developer-center#app-versions) tab. You can then edit the audience and features, roll it back to draft status, or promote that version to live:

* **Rolling back** to draft status immediately removes updated features from the accounts included in the gradual release.
* **Promoting to live** overrides the gradual release and publishes the selected version to all users.

Only **one** gradual release version can be published at a time.

<Image align="center" border={true} src="https://files.readme.io/9a9fbebe2ae4cc77bafd21c004b332d0595ef0f6a5a9c4ba27c989fc1c6b31bb-Gradually_Release_a_Version.png" className="border" />

# Implementation

Follow these steps to create a new gradual release. Note that you must have a draft app version before starting:

1. In the [Versions](https://developer.monday.com/apps/docs/the-developer-center#app-versions) tab, click **Gradual release** in the top right corner. The button will be greyed out if you don't have a draft version.
2. A modal will appear with a list of your app's versions. Locate the draft you want to gradually release and click **Select**.

<Image align="center" border={true} width="600px" src="https://files.readme.io/cf2b5522d399136372b257886d772cc30971b4f44a86bb0d631459dcffca3e60-image.png" className="border" />

<br />

3. Configure the version's features, audience, and accounts.
   1. **Features:** The app features included in the release. Toggle each feature on to include it.
   2. **Gradual release:** The regions included in the release. Choose a percentage of accounts in each region to release this version to.
   3. **Accounts:** The specific accounts included in the release. Enter account IDs for each account to include in the gradual release.
4. Click **Release** to push the gradual release to the selected accounts.
5. To make any changes, you can roll the release back to draft status or edit the existing audience and features.
6. When the gradual release is ready, you can [promote it to live](https://developer.monday.com/apps/docs/app-versioning#promote-a-draft-version-to-live).

<Image align="center" border={true} width="600px" src="https://files.readme.io/4278d5b72e2eba7d0eabd89258da709343e4e6df92889b61e9770c9db051e1bc-image.png" className="border" />

# Best practices

* This process is intended for relatively short preview cycles before full releases. Do not keep a gradual release permanently active.
* Include the current app version in your error logs to make troubleshooting easier. You can see the app version from the [app's context.](https://developer.monday.com/apps/docs/mondayget#requesting-context-and-settings-data)



# Gradually release new features

Learn how to gradually release a new version of your app to specific audiences

The **gradual release** feature enables you to roll out a new version of your app to a select group of accounts. This helps ensure a smoother release process for critical and breaking features. It also enables you to test new features on a smaller audience or give specific users early access before the full release.

# Eligibility

The gradual release feature is available for **all** monday.com apps with at least **one** live version. It is compatible with all app features, except for the integration of the sentence builder and workspace template features.

# Concepts

The gradual release feature allows you to control which app features are released in the version and to whom. Any app features not included in the gradual release will remain unchanged in the current live version.

You can release features to a specific set of accounts by entering individual account IDs or to a percentage of accounts within a specific region. Accounts are randomly selected based on the specified percentage.

Once a gradual release is published, the version will be in *Gradual release* status in the [Versions](https://developer.monday.com/apps/docs/the-developer-center#app-versions) tab. You can then edit the audience and features, roll it back to draft status, or promote that version to live:

* **Rolling back** to draft status immediately removes updated features from the accounts included in the gradual release.
* **Promoting to live** overrides the gradual release and publishes the selected version to all users.

Only **one** gradual release version can be published at a time.

<Image align="center" border={true} src="https://files.readme.io/9a9fbebe2ae4cc77bafd21c004b332d0595ef0f6a5a9c4ba27c989fc1c6b31bb-Gradually_Release_a_Version.png" className="border" />

# Implementation

Follow these steps to create a new gradual release. Note that you must have a draft app version before starting:

1. In the [Versions](https://developer.monday.com/apps/docs/the-developer-center#app-versions) tab, click **Gradual release** in the top right corner. The button will be greyed out if you don't have a draft version.
2. A modal will appear with a list of your app's versions. Locate the draft you want to gradually release and click **Select**.

<Image align="center" border={true} width="600px" src="https://files.readme.io/cf2b5522d399136372b257886d772cc30971b4f44a86bb0d631459dcffca3e60-image.png" className="border" />

<br />

3. Configure the version's features, audience, and accounts.
   1. **Features:** The app features included in the release. Toggle each feature on to include it.
   2. **Gradual release:** The regions included in the release. Choose a percentage of accounts in each region to release this version to.
   3. **Accounts:** The specific accounts included in the release. Enter account IDs for each account to include in the gradual release.
4. Click **Release** to push the gradual release to the selected accounts.
5. To make any changes, you can roll the release back to draft status or edit the existing audience and features.
6. When the gradual release is ready, you can [promote it to live](https://developer.monday.com/apps/docs/app-versioning#promote-a-draft-version-to-live).

<Image align="center" border={true} width="600px" src="https://files.readme.io/4278d5b72e2eba7d0eabd89258da709343e4e6df92889b61e9770c9db051e1bc-image.png" className="border" />

# Best practices

* This process is intended for relatively short preview cycles before full releases. Do not keep a gradual release permanently active.
* Include the current app version in your error logs to make troubleshooting easier. You can see the app version from the [app's context.](https://developer.monday.com/apps/docs/mondayget#requesting-context-and-settings-data)



# Gradually release new features

Learn how to gradually release a new version of your app to specific audiences

The **gradual release** feature enables you to roll out a new version of your app to a select group of accounts. This helps ensure a smoother release process for critical and breaking features. It also enables you to test new features on a smaller audience or give specific users early access before the full release.

# Eligibility

The gradual release feature is available for **all** monday.com apps with at least **one** live version. It is compatible with all app features, except for the integration of the sentence builder and workspace template features.

# Concepts

The gradual release feature allows you to control which app features are released in the version and to whom. Any app features not included in the gradual release will remain unchanged in the current live version.

You can release features to a specific set of accounts by entering individual account IDs or to a percentage of accounts within a specific region. Accounts are randomly selected based on the specified percentage.

Once a gradual release is published, the version will be in *Gradual release* status in the [Versions](https://developer.monday.com/apps/docs/the-developer-center#app-versions) tab. You can then edit the audience and features, roll it back to draft status, or promote that version to live:

* **Rolling back** to draft status immediately removes updated features from the accounts included in the gradual release.
* **Promoting to live** overrides the gradual release and publishes the selected version to all users.

Only **one** gradual release version can be published at a time.

<Image align="center" border={true} src="https://files.readme.io/9a9fbebe2ae4cc77bafd21c004b332d0595ef0f6a5a9c4ba27c989fc1c6b31bb-Gradually_Release_a_Version.png" className="border" />

# Implementation

Follow these steps to create a new gradual release. Note that you must have a draft app version before starting:

1. In the [Versions](https://developer.monday.com/apps/docs/the-developer-center#app-versions) tab, click **Gradual release** in the top right corner. The button will be greyed out if you don't have a draft version.
2. A modal will appear with a list of your app's versions. Locate the draft you want to gradually release and click **Select**.

<Image align="center" border={true} width="600px" src="https://files.readme.io/cf2b5522d399136372b257886d772cc30971b4f44a86bb0d631459dcffca3e60-image.png" className="border" />

<br />

3. Configure the version's features, audience, and accounts.
   1. **Features:** The app features included in the release. Toggle each feature on to include it.
   2. **Gradual release:** The regions included in the release. Choose a percentage of accounts in each region to release this version to.
   3. **Accounts:** The specific accounts included in the release. Enter account IDs for each account to include in the gradual release.
4. Click **Release** to push the gradual release to the selected accounts.
5. To make any changes, you can roll the release back to draft status or edit the existing audience and features.
6. When the gradual release is ready, you can [promote it to live](https://developer.monday.com/apps/docs/app-versioning#promote-a-draft-version-to-live).

<Image align="center" border={true} width="600px" src="https://files.readme.io/4278d5b72e2eba7d0eabd89258da709343e4e6df92889b61e9770c9db051e1bc-image.png" className="border" />

# Best practices

* This process is intended for relatively short preview cycles before full releases. Do not keep a gradual release permanently active.
* Include the current app version in your error logs to make troubleshooting easier. You can see the app version from the [app's context.](https://developer.monday.com/apps/docs/mondayget#requesting-context-and-settings-data)


# Gradually release new features

Learn how to gradually release a new version of your app to specific audiences

The **gradual release** feature enables you to roll out a new version of your app to a select group of accounts. This helps ensure a smoother release process for critical and breaking features. It also enables you to test new features on a smaller audience or give specific users early access before the full release.

# Eligibility

The gradual release feature is available for **all** monday.com apps with at least **one** live version. It is compatible with all app features, except for the integration of the sentence builder and workspace template features.

# Concepts

The gradual release feature allows you to control which app features are released in the version and to whom. Any app features not included in the gradual release will remain unchanged in the current live version.

You can release features to a specific set of accounts by entering individual account IDs or to a percentage of accounts within a specific region. Accounts are randomly selected based on the specified percentage.

Once a gradual release is published, the version will be in *Gradual release* status in the [Versions](https://developer.monday.com/apps/docs/the-developer-center#app-versions) tab. You can then edit the audience and features, roll it back to draft status, or promote that version to live:

* **Rolling back** to draft status immediately removes updated features from the accounts included in the gradual release.
* **Promoting to live** overrides the gradual release and publishes the selected version to all users.

Only **one** gradual release version can be published at a time.

<Image align="center" border={true} src="https://files.readme.io/9a9fbebe2ae4cc77bafd21c004b332d0595ef0f6a5a9c4ba27c989fc1c6b31bb-Gradually_Release_a_Version.png" className="border" />

# Implementation

Follow these steps to create a new gradual release. Note that you must have a draft app version before starting:

1. In the [Versions](https://developer.monday.com/apps/docs/the-developer-center#app-versions) tab, click **Gradual release** in the top right corner. The button will be greyed out if you don't have a draft version.
2. A modal will appear with a list of your app's versions. Locate the draft you want to gradually release and click **Select**.

<Image align="center" border={true} width="600px" src="https://files.readme.io/cf2b5522d399136372b257886d772cc30971b4f44a86bb0d631459dcffca3e60-image.png" className="border" />

<br />

3. Configure the version's features, audience, and accounts.
   1. **Features:** The app features included in the release. Toggle each feature on to include it.
   2. **Gradual release:** The regions included in the release. Choose a percentage of accounts in each region to release this version to.
   3. **Accounts:** The specific accounts included in the release. Enter account IDs for each account to include in the gradual release.
4. Click **Release** to push the gradual release to the selected accounts.
5. To make any changes, you can roll the release back to draft status or edit the existing audience and features.
6. When the gradual release is ready, you can [promote it to live](https://developer.monday.com/apps/docs/app-versioning#promote-a-draft-version-to-live).

<Image align="center" border={true} width="600px" src="https://files.readme.io/4278d5b72e2eba7d0eabd89258da709343e4e6df92889b61e9770c9db051e1bc-image.png" className="border" />

# Best practices

* This process is intended for relatively short preview cycles before full releases. Do not keep a gradual release permanently active.
* Include the current app version in your error logs to make troubleshooting easier. You can see the app version from the [app's context.](https://developer.monday.com/apps/docs/mondayget#requesting-context-and-settings-data)


# Gradually release new features

Learn how to gradually release a new version of your app to specific audiences

The **gradual release** feature enables you to roll out a new version of your app to a select group of accounts. This helps ensure a smoother release process for critical and breaking features. It also enables you to test new features on a smaller audience or give specific users early access before the full release.

# Eligibility

The gradual release feature is available for **all** monday.com apps with at least **one** live version. It is compatible with all app features, except for the integration of the sentence builder and workspace template features.

# Concepts

The gradual release feature allows you to control which app features are released in the version and to whom. Any app features not included in the gradual release will remain unchanged in the current live version.

You can release features to a specific set of accounts by entering individual account IDs or to a percentage of accounts within a specific region. Accounts are randomly selected based on the specified percentage.

Once a gradual release is published, the version will be in *Gradual release* status in the [Versions](https://developer.monday.com/apps/docs/the-developer-center#app-versions) tab. You can then edit the audience and features, roll it back to draft status, or promote that version to live:

* **Rolling back** to draft status immediately removes updated features from the accounts included in the gradual release.
* **Promoting to live** overrides the gradual release and publishes the selected version to all users.

Only **one** gradual release version can be published at a time.

<Image align="center" border={true} src="https://files.readme.io/9a9fbebe2ae4cc77bafd21c004b332d0595ef0f6a5a9c4ba27c989fc1c6b31bb-Gradually_Release_a_Version.png" className="border" />

# Implementation

Follow these steps to create a new gradual release. Note that you must have a draft app version before starting:

1. In the [Versions](https://developer.monday.com/apps/docs/the-developer-center#app-versions) tab, click **Gradual release** in the top right corner. The button will be greyed out if you don't have a draft version.
2. A modal will appear with a list of your app's versions. Locate the draft you want to gradually release and click **Select**.

<Image align="center" border={true} width="600px" src="https://files.readme.io/cf2b5522d399136372b257886d772cc30971b4f44a86bb0d631459dcffca3e60-image.png" className="border" />

<br />

3. Configure the version's features, audience, and accounts.
   1. **Features:** The app features included in the release. Toggle each feature on to include it.
   2. **Gradual release:** The regions included in the release. Choose a percentage of accounts in each region to release this version to.
   3. **Accounts:** The specific accounts included in the release. Enter account IDs for each account to include in the gradual release.
4. Click **Release** to push the gradual release to the selected accounts.
5. To make any changes, you can roll the release back to draft status or edit the existing audience and features.
6. When the gradual release is ready, you can [promote it to live](https://developer.monday.com/apps/docs/app-versioning#promote-a-draft-version-to-live).

<Image align="center" border={true} width="600px" src="https://files.readme.io/4278d5b72e2eba7d0eabd89258da709343e4e6df92889b61e9770c9db051e1bc-image.png" className="border" />

# Best practices

* This process is intended for relatively short preview cycles before full releases. Do not keep a gradual release permanently active.
* Include the current app version in your error logs to make troubleshooting easier. You can see the app version from the [app's context.](https://developer.monday.com/apps/docs/mondayget#requesting-context-and-settings-data)
