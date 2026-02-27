# ApproveIt STG — Sandbox Testing Guide

**App:** ApproveIt STG | **App ID:** `10939966` | **Client ID:** `56d7eeff37552c16de1cd7a7e473d931`  
**Worker URL:** `https://approveit-api.ananth-c-jayan.workers.dev`

---

## Step 1: Set Worker Secrets

From **General settings** in the Developer Center, copy the **Client Secret** and **Signing Secret**, then run:

```bash
npx wrangler secret put MONDAY_CLIENT_SECRET
# Paste the Client Secret when prompted

npx wrangler secret put MONDAY_SIGNING_SECRET
# Paste the Signing Secret when prompted
```

Verify the worker is alive:
```bash
curl https://approveit-api.ananth-c-jayan.workers.dev/health
# Expected: {"ok":true}
```

---

## Step 2: Configure OAuth & Permissions

Go to **Build → OAuth & permissions**.

### Scopes tab
Check these boxes:
- `me:read`
- `boards:read`
- `boards:write`
- `users:read`

### Redirect URLs tab
**Leave blank.** Your app uses `monday-sdk-js` seamless auth — no OAuth callback is needed.

Click **"Everything is up to date"**.

---

## Step 3: Add Features

Go to **Build → Features** and click **"Create feature"**.

You need to add **3 features** one at a time:

### 3a. Item View

1. In the feature picker, click **Item** in the left sidebar.
2. Select **Item View** (not Item Menu Action).
3. Click **Next** / **Create**.
4. You will land on the **Feature Details** page. Fill in:
   - **Name:** `ApproveIt Item View`
   - **Description:** `Request and manage approvals on individual items`
5. Under **View Setup → Source**, select **Custom URL** and enter:
   ```
   https://approveit-development.pages.dev/item
   ```
   *(Replace with your actual Cloudflare Pages domain if different.)*
6. Click **Save**.

### 3b. Board View

1. Click **"Create feature"** again.
2. Click **Board** in the left sidebar.
3. Select **Board View** (not Board Menu Action).
4. Click **Next** / **Create**.
5. Fill in the **Feature Details**:
   - **Name:** `ApproveIt Board View`
   - **Description:** `Dashboard view of all approval requests on this board`
6. Under **View Setup → Source**, select **Custom URL** and enter:
   ```
   https://approveit-development.pages.dev/board
   ```
7. Click **Save**.

### 3c. Integration (Recipe Sentence)

This is the one you're stuck on. Here's exactly what to do:

1. Click **"Create feature"** again.
2. Click **Integration** in the left sidebar.
3. You will see 4 cards. Select **"Integration for sentence builder"** → click **Next**.
4. You will be asked to choose a template or start from scratch. Pick **"Start from scratch"** (or any blank/custom template).
5. Click **Create**.

Now you're on the **Integration Feature Details page**. Configure it as follows:

#### Feature Details tab
- **Name:** `ApproveIt Integration`
- **Description:** `Automatically trigger approval workflows on your boards`
- **Base URL:** `https://approveit-api.ananth-c-jayan.workers.dev`
  *(This is the root URL of your Cloudflare Worker. Monday will append block-specific paths to this.)*

#### Workflow Blocks section
You need to create an **Action block** (your integration's "do this" step):

1. Click **"Create new block"** (or **"Add block"**).
2. Choose **Action** as the block type.
3. Fill in:
   - **Name:** `Request Approval`
   - **Description:** `Create a new approval request for an item`
   - **Run URL:** `/api/integrations/request-approval`
     *(Monday will combine your Base URL + this path = `https://approveit-api.ananth-c-jayan.workers.dev/api/integrations/request-approval`)*
4. Click **Save**.

#### Recipe Sentence
After creating the action block, you'll configure a recipe sentence. This is the readable sentence users see in the Integrations Center. For example:

> **When** *status changes to something* **,** *request approval via ApproveIt*

- The **trigger** is a built-in monday trigger (like "When status changes").
- The **action** is your custom `Request Approval` block you just created.

Configure the sentence by dragging the trigger and action blocks together and saving.

---

## Step 4: Webhooks

Go to **Build → Webhooks**.

**Leave the App Events Webhook URL blank.** Your backend has no `/app-events` handler yet.

---

## Step 5: Install the Draft App

1. In the left sidebar, go to **App onboarding** (or expand **Manage**).
2. Click **"Install App"**.
3. This installs the `v1 Draft` into your developer sandbox workspace. It's private and invisible to others.

---

## Step 6: Create the Test Board

Switch to your **monday workspace** (click "Back" or open monday.com).

1. Create a new board named **ApproveIt Sandbox**.
2. Add these columns:

   | Column Type | Column Name    |
   | ----------- | -------------- |
   | Status      | `status`       |
   | People      | `approver`     |
   | Text        | `request_note` |

3. Create 5 test items:
   - Q2 Marketing Budget
   - New Hire: Sarah Chen
   - Vendor Contract #412
   - Product Roadmap v3
   - Travel Request #89

---

## Step 7: Test — Scenario A (Request Approval)

1. Open *Q2 Marketing Budget* item.
2. Add the **ApproveIt Item View** → click "+" on the item view tabs → select your app.
3. Select an approver and add an optional note.
4. Click **Submit**.

**Expected result:**
- Status column → `Pending Approval`
- Approver gets a monday notification
- Monitor worker logs: `npx wrangler tail`
