# Stripe Production Setup Guide

## Environment Variables

Add these to your `.env.local` (development) and Vercel dashboard (production):

```bash
# Stripe Keys (from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_live_...          # Live secret key
STRIPE_WEBHOOK_SECRET=whsec_...        # Webhook signing secret

# Optional: Price IDs (from Stripe Products dashboard)
STRIPE_PRO_YEARLY_PRICE_ID=price_...   # Your Pro plan price ID

# App URL
NEXT_PUBLIC_URL=https://shipfreeapis.com
```

## Step 1: Create Products in Stripe

1. Go to [Stripe Dashboard → Products](https://dashboard.stripe.com/products)
2. Create a product called "ShipFreeAPIs Pro"
3. Add a price: **$249/year** (recurring, yearly)
4. Copy the Price ID (starts with `price_`)
5. Add it to your env as `STRIPE_PRO_YEARLY_PRICE_ID`

## Step 2: Set Up Webhook in Stripe

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your endpoint URL: `https://shipfreeapis.com/api/webhooks/stripe`
4. Select these events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
5. Click "Add endpoint"
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add it to your env as `STRIPE_WEBHOOK_SECRET`

## Step 3: Update Google Apps Script

Your Google Apps Script needs to handle Stripe webhook data. Update it to:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Check for duplicate eventId (idempotency)
    const eventIds = sheet.getRange('A:A').getValues().flat();
    if (data.eventId && eventIds.includes(data.eventId)) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, duplicate: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add row based on source
    if (data.source === 'stripe-webhook') {
      sheet.appendRow([
        data.eventId,
        data.email,
        data.customerId,
        data.subscriptionId || '',
        data.priceId,
        data.amount / 100, // Convert cents to dollars
        data.currency,
        data.status,
        data.timestamp
      ]);
    } else {
      // Existing email signup logic
      sheet.appendRow([
        data.email,
        new Date().toISOString(),
        data.source || 'website'
      ]);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 4: Test Locally

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# In another terminal, trigger a test event
stripe trigger checkout.session.completed
```

## Step 5: Deploy to Vercel

```bash
vercel --prod
```

Add environment variables in Vercel Dashboard → Settings → Environment Variables.

## Security Checklist

- [x] Signature verification in webhook handler
- [x] Idempotency via eventId
- [x] Lazy-load Stripe to avoid build errors
- [x] Error handling with proper status codes
- [x] HTTPS enforced (Vercel default)
- [ ] Monitor webhook delivery in Stripe Dashboard
- [ ] Set up Stripe Radar for fraud protection
