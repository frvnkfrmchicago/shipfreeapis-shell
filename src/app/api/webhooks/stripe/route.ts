import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { syncPurchaseToSheet, updateSubscriptionStatus, type PurchaseData, type SubscriptionUpdate } from '@/lib/google-script';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  if (!webhookSecret) {
    console.error('[Webhook] Missing STRIPE_WEBHOOK_SECRET');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    console.error('[Webhook] Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  // 1. SIGNATURE VERIFICATION
  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('[Webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Signature verification failed' }, { status: 400 });
  }

  console.log(`[Webhook] Received event: ${event.type} (${event.id})`);

  // 2. HANDLE EVENTS
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(event.id, session);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        // Only handle subscription renewals (not initial payment)
        if (invoice.billing_reason === 'subscription_cycle') {
          await handleSubscriptionRenewal(event.id, invoice);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(event.id, invoice);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(event.id, subscription);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(event.id, subscription);
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`[Webhook] Error processing ${event.type}:`, error);
    // Return 500 so Stripe will retry
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }

  // 3. ACKNOWLEDGE SUCCESS
  return NextResponse.json({ received: true }, { status: 200 });
}

/**
 * Handle successful checkout - provision access
 */
async function handleCheckoutComplete(eventId: string, session: Stripe.Checkout.Session) {
  console.log('[Webhook] Checkout completed:', session.id);

  const purchaseData: PurchaseData = {
    eventId,
    email: session.customer_email || session.customer_details?.email || 'unknown',
    customerId: typeof session.customer === 'string' ? session.customer : session.customer?.id || 'unknown',
    subscriptionId: typeof session.subscription === 'string' ? session.subscription : session.subscription?.id,
    priceId: session.metadata?.priceId || 'unknown',
    amount: session.amount_total || 0,
    currency: session.currency || 'usd',
    status: 'completed',
    timestamp: new Date().toISOString(),
    source: 'stripe-webhook',
  };

  const result = await syncPurchaseToSheet(purchaseData);
  
  if (!result.success) {
    console.error('[Webhook] Failed to sync purchase:', result.error);
    throw new Error(`Sync failed: ${result.error}`);
  }

  console.log('[Webhook] Purchase synced successfully');
}

/**
 * Handle subscription renewal
 */
async function handleSubscriptionRenewal(eventId: string, invoice: Stripe.Invoice) {
  // Extract subscription ID from line items or metadata
  const subscriptionId = invoice.lines.data[0]?.parent?.subscription_item_details?.subscription || 
    (invoice.metadata?.subscription_id as string | undefined);
  console.log('[Webhook] Subscription renewed:', subscriptionId);

  const purchaseData: PurchaseData = {
    eventId,
    email: invoice.customer_email || 'unknown',
    customerId: typeof invoice.customer === 'string' ? invoice.customer : 'unknown',
    subscriptionId,
    priceId: (() => {
      const price = invoice.lines.data[0]?.pricing?.price_details?.price;
      if (typeof price === 'string') return price;
      if (price && typeof price === 'object' && 'id' in price) return price.id;
      return 'unknown';
    })(),
    amount: invoice.amount_paid || 0,
    currency: invoice.currency || 'usd',
    status: 'renewed',
    timestamp: new Date().toISOString(),
    source: 'stripe-webhook',
  };

  await syncPurchaseToSheet(purchaseData);
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(eventId: string, invoice: Stripe.Invoice) {
  console.log('[Webhook] Payment failed:', invoice.id);

  const subscriptionId = invoice.lines.data[0]?.parent?.subscription_item_details?.subscription || 
    (invoice.metadata?.subscription_id as string | undefined);

  const purchaseData: PurchaseData = {
    eventId,
    email: invoice.customer_email || 'unknown',
    customerId: typeof invoice.customer === 'string' ? invoice.customer : 'unknown',
    subscriptionId,
    priceId: (() => {
      const price = invoice.lines.data[0]?.pricing?.price_details?.price;
      if (typeof price === 'string') return price;
      if (price && typeof price === 'object' && 'id' in price) return price.id;
      return 'unknown';
    })(),
    amount: invoice.amount_due || 0,
    currency: invoice.currency || 'usd',
    status: 'failed',
    timestamp: new Date().toISOString(),
    source: 'stripe-webhook',
  };

  await syncPurchaseToSheet(purchaseData);
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionCanceled(eventId: string, subscription: Stripe.Subscription) {
  console.log('[Webhook] Subscription canceled:', subscription.id);

  const updateData: SubscriptionUpdate = {
    eventId,
    subscriptionId: subscription.id,
    customerId: typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id,
    status: 'canceled',
    timestamp: new Date().toISOString(),
    source: 'stripe-webhook',
  };

  await updateSubscriptionStatus(updateData);
}

/**
 * Handle subscription status change
 */
async function handleSubscriptionUpdated(eventId: string, subscription: Stripe.Subscription) {
  console.log('[Webhook] Subscription updated:', subscription.id, subscription.status);

  const status = subscription.status as 'active' | 'canceled' | 'past_due' | 'unpaid';
  
  const updateData: SubscriptionUpdate = {
    eventId,
    subscriptionId: subscription.id,
    customerId: typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id,
    status,
    timestamp: new Date().toISOString(),
    source: 'stripe-webhook',
  };

  await updateSubscriptionStatus(updateData);
}
