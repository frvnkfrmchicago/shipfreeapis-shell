'use client';

import { useState } from 'react';
import { Check, X, Code, Rocket, CircleNotch, ArrowRight } from '@phosphor-icons/react';

// Price IDs from Stripe
const PRICE_IDS = {
  PRO_MONTHLY: 'price_1SobDaDnRAIw6OSiZSnkBu0o', // $24.99/month
  PRO_YEARLY: 'price_1SobRXDnRAIw6OSiQksfkl1I',  // $249/year
};

interface PricingCardsProps {
  email?: string;
  onSelectFree: () => void;
  compact?: boolean;
}

export function PricingCards({ email, onSelectFree, compact = false }: PricingCardsProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (priceId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  const isYearly = billingPeriod === 'yearly';
  const currentPrice = isYearly ? '$249' : '$24.99';
  const currentPeriod = isYearly ? '/year' : '/month';
  const currentPriceId = isYearly ? PRICE_IDS.PRO_YEARLY : PRICE_IDS.PRO_MONTHLY;

  const features = {
    free: [
      { text: 'API Glossary (10 terms)', included: true },
      { text: '20 Curated Free APIs', included: true },
      { text: 'Basic search & filter', included: true },
      { text: 'Full API library (52+)', included: false },
      { text: 'Integration guides', included: false },
    ],
    pro: [
      { text: 'Full API library (52+ APIs)', included: true },
      { text: 'API integration guides', included: true },
      { text: 'Deployment templates', included: true },
      { text: 'Code snippets & examples', included: true },
      { text: 'Priority support', included: true },
    ],
  };

  return (
    <div className="w-full">
      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center p-1 rounded-full bg-card/80 border border-card-border backdrop-blur-xl">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-5 py-2 rounded-full font-medium transition-all cursor-pointer text-sm ${
              !isYearly 
                ? 'bg-foreground text-background' 
                : 'text-muted hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-5 py-2 rounded-full font-medium transition-all cursor-pointer flex items-center gap-2 text-sm ${
              isYearly 
                ? 'bg-foreground text-background' 
                : 'text-muted hover:text-foreground'
            }`}
          >
            Yearly
            <span className="px-2 py-0.5 rounded-full bg-plum text-white text-xs font-bold">
              -17%
            </span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-center text-sm backdrop-blur-xl">
          {error}
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div className={`grid grid-cols-1 ${compact ? 'sm:grid-cols-2' : 'lg:grid-cols-2'} gap-6`}>
        
        {/* Free Plan */}
        <div className="group relative rounded-2xl transition-all">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl border border-white/10 transition-all duration-300 group-hover:border-cyan-accent/30" />
          
          <div className={`relative ${compact ? 'p-5' : 'p-6'}`}>
            <div className="mb-5">
              <div className="inline-flex p-2.5 rounded-xl bg-gradient-to-br from-cyan-accent/20 to-cyan-accent/5 border border-cyan-accent/20 mb-3">
                <Code className="w-6 h-6 text-cyan-accent" weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">Free</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">$0</span>
                <span className="text-muted text-sm">forever</span>
              </div>
              <p className="text-muted mt-2 text-xs">Preview the library</p>
            </div>

            <ul className="space-y-3 mb-6">
              {features.free.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm">
                  {feature.included ? (
                    <div className="w-4 h-4 rounded-full bg-cyan-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-cyan-accent" weight="bold" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-2.5 h-2.5 text-muted/40" weight="bold" />
                    </div>
                  )}
                  <span className={feature.included ? 'text-foreground' : 'text-muted/40'}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={onSelectFree}
              className="group/btn flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-center transition-all cursor-pointer bg-cyan-accent/10 hover:bg-cyan-accent/20 border border-cyan-accent/30 hover:border-cyan-accent/50 text-cyan-accent text-sm"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" weight="bold" />
            </button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="group relative rounded-2xl transition-all">
          {/* Animated border glow */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-plum via-plum-light to-plum bg-[length:200%_100%] animate-gradient-x opacity-60" />
          
          {/* Solid background */}
          <div className="absolute inset-[1px] rounded-[14px] bg-card" />
          
          {/* Inner gradient overlay */}
          <div className="absolute inset-[1px] rounded-[14px] bg-gradient-to-br from-plum/10 via-transparent to-plum/5" />
          
          {/* Popular Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <div className="px-4 py-1.5 rounded-full bg-plum text-white text-xs font-bold tracking-wide shadow-lg shadow-plum/50">
              MOST POPULAR
            </div>
          </div>
          
          <div className={`relative ${compact ? 'p-5 pt-7' : 'p-6 pt-8'}`}>
            <div className="mb-5">
              <div className="inline-flex p-2.5 rounded-xl bg-gradient-to-br from-plum/30 to-plum/10 border border-plum/30 mb-3">
                <Rocket className="w-6 h-6 text-plum-light" weight="duotone" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">Pro</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">{currentPrice}</span>
                <span className="text-muted text-sm">{currentPeriod}</span>
              </div>
              {isYearly && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-muted line-through text-xs">$299.88/yr</span>
                  <span className="px-1.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                    SAVE $50
                  </span>
                </div>
              )}
              <p className="text-muted mt-2 text-xs">Full access to everything</p>
            </div>

            <ul className="space-y-3 mb-6">
              {features.pro.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-emerald-400" weight="bold" />
                  </div>
                  <span className="text-foreground">{feature.text}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(currentPriceId)}
              disabled={isLoading}
              className="group/btn relative w-full py-3.5 rounded-xl font-bold text-center transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden text-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-plum via-plum-dark to-plum rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 shadow-lg shadow-plum/50" />
              
              <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                {isLoading ? (
                  <>
                    <CircleNotch className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Get Pro Access
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" weight="bold" />
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mt-6 text-center">
        <div className="inline-flex flex-wrap justify-center items-center gap-6 text-muted text-xs">
          <span className="flex items-center gap-1.5">
            <Check weight="bold" className="text-plum-light w-3 h-3" />
            Secure checkout
          </span>
          <span className="flex items-center gap-1.5">
            <Check weight="bold" className="text-plum-light w-3 h-3" />
            Cancel anytime
          </span>
          <span className="flex items-center gap-1.5">
            <Check weight="bold" className="text-plum-light w-3 h-3" />
            14-day refund
          </span>
        </div>
      </div>
    </div>
  );
}
