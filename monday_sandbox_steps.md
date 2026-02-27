# Running Your Deployed App in a Monday.com Sandbox

Since you have already deployed your app to Dev and Prod environments, your next step is to connect Monday.com to your deployed URLs and test the draft app in a safe sandbox environment. Monday.com provides a Free Developer Account specifically for this purpose.

Here are the exact steps to test your live endpoints in a Monday.com sandbox:

## Step 1: Set Up Your Sandbox (Developer Account)
If you haven't already, you need a safe environment where you won't affect live production data.
1. Sign up for a **Free Monday.com Developer Account** if you don't have one (this acts as your Sandbox).
2. Log in to your developer account.
3. Enable **Developer Mode**:
   - Click your profile picture in the top-right corner.
   - Select **monday.labs**.
   - Search for **"Developer mode"** and click **Activate**. (This will expose hidden IDs like Board IDs, Item IDs, and Column IDs which are crucial for debugging).

## Step 2: Configure Your App to Point to Your Deployed URLs
You need to tell Monday.com where your app is hosted so it can communicate with your Dev/Prod servers.
1. Click your profile picture and select **Developers** to open the Developer Center.
2. Select your app from the list (or create a new one if you haven't yet).
3. **Configure OAuth & Redirects**:
   - Go to **OAuth & Permissions**.
   - Enter your deployed backend URL in the **Redirect URL** field (e.g., `https://dev-api.yourdomain.com/auth/monday/callback`).
4. **Configure App Features**:
   - Go to the **Features** tab. 
   - Select the respective feature you built (e.g., Board View, Integration, Dashboard Widget).
   - *For UI Views/Widgets*: Under the "View Setup" or "Source", select **Custom URL** (or External Hosting) and paste the deployed URL of your frontend (e.g., `https://dev-app.yourdomain.com`).
   - *For Integrations/Webhooks*: In your recipe configurations, ensure your Base URLs point to your deployed backend endpoints.

## Step 3: Install the "Draft" App in Your Sandbox
You do **not** need to publish ("Live" marketplace status) to test your app. You can install the draft version directly into your sandbox workspace.
1. In the Developer Center, navigate to your app's settings.
2. Click on the **Install** tab (or "App Versions" tab).
3. Click the **Install App** button.
   - *Note: This will safely install the draft version into your current developer account (sandbox). It remains invisible to the public.*
4. Select the specific Workspace or Board where you'd like to install it.

## Step 4: Test and Debug
1. Go back to your Monday.com workspace / board where you installed the app.
2. Open your Board View / Widget / Integration.
   - *Tip*: You can append `?_apps_sandbox=v1` or `?_apps_sandbox=v2` to your Monday.com board URL in the browser to force the app to run in an explicit sandbox preview context if needed.
3. Because your Monday app configuration points to your Dev/Prod URLs, any actions taken in the Monday workspace will now hit your live servers. You can monitor your Dev/Prod server logs to debug interactions.

## Step 5: Iterating
Whenever you push changes to your App's code via your deployment pipeline (e.g., Vercel, Heroku, AWS), your Monday sandbox will automatically reflect those changes the next time you refresh the board or trigger the webhook, since the underlying URLs remain the same!
