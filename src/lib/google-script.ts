/**
 * Google Apps Script Interface
 * Handles communication with the deployed GAS Web App for purchase data sync.
 */

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || 
  'https://script.google.com/macros/s/AKfycbxsZ8WuIVYR3vxNt23FQPheWMGjsR8U5OmjBqt0WYQSgnEFr7Lbrg6IqvUIryvozZlpKA/exec';

export interface PurchaseData {
  eventId: string; // Stripe event ID for idempotency
  email: string;
  customerId: string;
  subscriptionId?: string;
  priceId: string;
  amount: number; // In cents
  currency: string;
  status: 'completed' | 'renewed' | 'canceled' | 'failed';
  timestamp: string;
  source: 'stripe-webhook';
}

export interface SubscriptionUpdate {
  eventId: string;
  subscriptionId: string;
  customerId: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid';
  timestamp: string;
  source: 'stripe-webhook';
}

/**
 * Sync purchase data to Google Sheet via Apps Script
 * The GAS should check for duplicate eventId before inserting
 */
export async function syncPurchaseToSheet(data: PurchaseData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('[GAS] HTTP error:', response.status);
      return { success: false, error: `HTTP ${response.status}` };
    }

    const result = await response.json();
    return { success: result.success || false, error: result.error };
  } catch (error) {
    console.error('[GAS] Sync failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update subscription status in Google Sheet
 */
export async function updateSubscriptionStatus(data: SubscriptionUpdate): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('[GAS] HTTP error:', response.status);
      return { success: false, error: `HTTP ${response.status}` };
    }

    const result = await response.json();
    return { success: result.success || false, error: result.error };
  } catch (error) {
    console.error('[GAS] Update failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
