import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe, isSubscriptionPrice } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { priceId, email, successUrl, cancelUrl } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
    }

    const mode: Stripe.Checkout.SessionCreateParams['mode'] = 
      isSubscriptionPrice(priceId) ? 'subscription' : 'payment';

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/pricing`,
      metadata: {
        source: 'shipfreeapis',
        priceId,
      },
      allow_promotion_codes: true,
    };

    // Pre-fill email if provided
    if (email) {
      sessionParams.customer_email = email;
    }

    const session = await getStripe().checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('[Checkout] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    );
  }
}

