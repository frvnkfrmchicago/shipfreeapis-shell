import Stripe from 'stripe';

// Lazy-load Stripe to avoid build-time errors when env vars aren't set
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Missing STRIPE_SECRET_KEY environment variable');
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    });
  }
  return stripeInstance;
}

// For backwards compatibility - use getStripe() in API routes
export const stripe = {
  get checkout() { return getStripe().checkout; },
  get customers() { return getStripe().customers; },
  get subscriptions() { return getStripe().subscriptions; },
  get webhooks() { return getStripe().webhooks; },
  get billingPortal() { return getStripe().billingPortal; },
};

// Price IDs - Update these with your actual Stripe Price IDs
export const PRICE_IDS = {
  PRO_MONTHLY: 'price_1SobDaDnRAIw6OSiZSnkBu0o', // $24.99/month
  PRO_YEARLY: process.env.STRIPE_PRO_YEARLY_PRICE_ID || 'price_1SobRXDnRAIw6OSiQksfkl1I', // $249/year
} as const;

// Both prices are subscriptions
export function isSubscriptionPrice(priceId: string): boolean {
  return priceId === PRICE_IDS.PRO_YEARLY || priceId === PRICE_IDS.PRO_MONTHLY;
}

