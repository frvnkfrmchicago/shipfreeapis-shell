'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, X, ArrowLeft, Code, Rocket, CircleNotch, ArrowRight } from '@phosphor-icons/react';

// Price IDs from Stripe
const PRICE_IDS = {
  PRO_MONTHLY: 'price_1SobDaDnRAIw6OSiZSnkBu0o', // $24.99/month
  PRO_YEARLY: 'price_1SobRXDnRAIw6OSiQksfkl1I',  // $249/year
};

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCheckout = async (priceId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
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
      { text: 'Email newsletter', included: true },
      { text: 'Full API library (52+)', included: false },
      { text: 'API integration guides', included: false },
      { text: 'Deployment templates', included: false },
    ],
    pro: [
      { text: 'Full API library (52+ APIs)', included: true },
      { text: 'API integration guides', included: true },
      { text: 'Deployment templates', included: true },
      { text: 'Code snippets & examples', included: true },
      { text: 'Always current & up-to-date', included: true },
      { text: 'Priority support', included: true },
      { text: 'Future features included', included: true },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Tech Backdrop */}
      <div className="tech-backdrop" />
      
      {/* Gradient orbs for depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-plum/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-accent/10 rounded-full blur-[150px]" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 sm:py-20">
        {/* Back Link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" weight="bold" />
          <span>Back to ShipFreeAPIs</span>
        </Link>

        {/* Header */}
        <div className={`mb-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-tighter mb-4">
            <span className="text-foreground">Unlock </span>
            <span className="gradient-text">Full Access</span>
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Get the complete API library, guides, and templates.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className={`flex justify-center mb-12 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center p-1 rounded-full bg-card/80 border border-card-border backdrop-blur-xl">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all cursor-pointer ${
                !isYearly 
                  ? 'bg-foreground text-background' 
                  : 'text-muted hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all cursor-pointer flex items-center gap-2 ${
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
          <div className="max-w-md mx-auto mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-center backdrop-blur-xl">
            {error}
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Free Plan - Glass Card */}
          <div className={`group relative rounded-3xl transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Glass background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 transition-all duration-300 group-hover:border-cyan-accent/30 group-hover:shadow-lg group-hover:shadow-cyan-accent/5" />
            
            <div className="relative p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-cyan-accent/20 to-cyan-accent/5 border border-cyan-accent/20 mb-4">
                  <Code className="w-8 h-8 text-cyan-accent" weight="duotone" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Free</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-foreground">$0</span>
                  <span className="text-muted">forever</span>
                </div>
                <p className="text-muted mt-3 text-sm">Start exploring APIs today</p>
              </div>

              {/* Features - cyan checks */}
              <ul className="space-y-4 mb-8">
                {features.free.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-cyan-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-cyan-accent" weight="bold" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-3 h-3 text-muted/40" weight="bold" />
                      </div>
                    )}
                    <span className={feature.included ? 'text-foreground' : 'text-muted/40'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA - with cyan accent */}
              <Link
                href="/#unlock"
                className="group/btn flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-center transition-all cursor-pointer bg-cyan-accent/10 hover:bg-cyan-accent/20 border border-cyan-accent/30 hover:border-cyan-accent/50 text-cyan-accent"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" weight="bold" />
              </Link>
            </div>
          </div>

          {/* Pro Plan - Premium Card */}
          <div className={`group relative rounded-3xl transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Animated border glow */}
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-plum via-plum-light to-plum bg-[length:200%_100%] animate-gradient-x opacity-60" />
            
            {/* Solid background */}
            <div className="absolute inset-[1px] rounded-[22px] bg-card" />
            
            {/* Inner gradient overlay */}
            <div className="absolute inset-[1px] rounded-[22px] bg-gradient-to-br from-plum/10 via-transparent to-plum/5" />
            
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
              <div className="px-5 py-2 rounded-full bg-plum text-white text-xs font-bold tracking-wide shadow-lg shadow-plum/50">
                MOST POPULAR
              </div>
            </div>
            
            <div className="relative p-8 pt-10">
              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-plum/30 to-plum/10 border border-plum/30 mb-4">
                  <Rocket className="w-8 h-8 text-plum-light" weight="duotone" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Pro</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-foreground">{currentPrice}</span>
                  <span className="text-muted">{currentPeriod}</span>
                </div>
                {isYearly && (
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-muted line-through text-sm">$299.88/yr</span>
                    <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                      SAVE $50
                    </span>
                  </div>
                )}
                <p className="text-muted mt-3 text-sm">Full access to everything</p>
              </div>

              {/* Features - green checks */}
              <ul className="space-y-4 mb-8">
                {features.pro.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-400" weight="bold" />
                    </div>
                    <span className="text-foreground">{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA - Glass button with glow */}
              <button
                onClick={() => handleCheckout(currentPriceId)}
                disabled={isLoading}
                className="group/btn relative w-full py-4 rounded-xl font-bold text-center transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
              >
                {/* Button background */}
                <div className="absolute inset-0 bg-gradient-to-r from-plum via-plum-dark to-plum rounded-xl" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                
                {/* Glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 shadow-lg shadow-plum/50" />
                
                <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                  {isLoading ? (
                    <>
                      <CircleNotch className="w-5 h-5 animate-spin" />
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

        {/* FAQ Section */}
        <div className={`mt-24 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Questions?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
            {[
              {
                q: "What's included in Pro?",
                a: "Full access to 52+ verified APIs, integration guides, deployment templates, code snippets, and priority support."
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes! Cancel anytime from your account. You'll keep access until your billing period ends."
              },
              {
                q: "What payment methods?",
                a: "We accept all major credit cards, Apple Pay, and Google Pay through Stripe."
              },
              {
                q: "Is there a refund policy?",
                a: "Yes! If you're not satisfied within 14 days, we'll give you a full refund."
              }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300"
              >
                <h3 className="font-bold text-foreground mb-2 group-hover:text-plum-light transition-colors">
                  {faq.q}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Trust badges */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-8 text-muted text-sm">
            <span className="flex items-center gap-2">
              <Check weight="bold" className="text-plum-light" />
              Secure checkout
            </span>
            <span className="flex items-center gap-2">
              <Check weight="bold" className="text-plum-light" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Check weight="bold" className="text-plum-light" />
              14-day refund
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
