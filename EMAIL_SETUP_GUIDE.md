# Email Collection Setup Guide

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "ShipFreeAPIs Emails"
4. Add headers in Row 1:
   - A1: `Email`
   - B1: `Timestamp`
   - C1: `Source`

## Step 2: Create the Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.email,
      new Date().toISOString(),
      data.source || 'website'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Deploy → New deployment**
4. Select type: **Web app**
5. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**
7. Copy the **Web app URL** (looks like: `https://script.google.com/macros/s/xxx/exec`)

## Step 3: Add the URL to Your App

Create a `.env.local` file in your project root:

```
NEXT_PUBLIC_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Step 4: Deploy to Vercel

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# Deploy (will prompt for env vars)
vercel

# Deploy to production
vercel --prod
```

When deploying, add your environment variable:
- `NEXT_PUBLIC_GOOGLE_SHEET_URL` = your Apps Script URL

## Step 5: Add Vercel Analytics

After deploying, go to your project in the Vercel dashboard:
1. Settings → Analytics → Enable
2. That's it! You'll see pageviews, visitors, and performance data.

---

## Alternative: PostHog (More Features)

If you want user behavior tracking, session replay, and more:

```bash
npm install posthog-js
```

See `agents/analytics/SKILL.md` for full setup.
