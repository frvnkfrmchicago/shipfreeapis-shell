'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, LockKeyOpen, Check, Confetti, Sparkle } from '@phosphor-icons/react';
import { PricingCards } from '@/components/PricingCards';

interface UnlockCTAProps {
  isUnlocked: boolean;
  onUnlock: (tier: 'free' | 'pro') => void;
}

export function UnlockCTA({ isUnlocked, onUnlock }: UnlockCTAProps) {
  // Always initialize to empty string to match server render
  const [email, setEmail] = useState('');
  const [showPricing, setShowPricing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'working' | 'pricing'>('idle');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing...');

  // Hydrate email from localStorage after mount (client-side only)
  useEffect(() => {
    const savedEmail = localStorage.getItem('shipfreeapis-email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || isUnlocked || status !== 'idle') return;
    
    setStatus('working');
    
    // Sequence 1: Connecting
    setStatusText('Validating email...');
    setProgress(20);
    
    try {
      const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
      if (sheetUrl) {
        fetch(sheetUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'shipfreeapis-unlock' }),
        }).catch(err => console.error(err));
      }
    } catch (e) { console.error(e) }

    // Sequence 2: Processing
    setTimeout(() => {
      setStatusText('Preparing your access...');
      setProgress(60);
    }, 500);

    // Sequence 3: Show pricing
    setTimeout(() => {
      setProgress(100);
      setStatusText('Choose your plan');
      setStatus('pricing');
      setShowPricing(true);
      // Save email for checkout
      localStorage.setItem('shipfreeapis-email', email);
    }, 1000);
  };

  const handleSelectFree = () => {
    localStorage.setItem('shipfreeapis-tier', 'free');
    onUnlock('free');
  };

  return (
    <section id="unlock" className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* Icon with Status Ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 shadow-2xl transition-all duration-500 ${
            status === 'working' ? 'bg-black border border-green-500 shadow-green-500/20' :
            status === 'pricing' ? 'bg-gradient-to-br from-plum to-plum-dark shadow-plum/40' :
            isUnlocked ? 'bg-emerald-500 shadow-emerald-500/40' :
            'bg-gradient-to-br from-[#9E1B4C] to-blue-600 shadow-blue-900/40'
          }`}
        >
          {status === 'working' ? (
            <span className="w-8 h-8 relative">
              <span className="absolute inset-0 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
            </span>
          ) : status === 'pricing' ? (
            <Sparkle weight="fill" className="w-8 h-8 text-white" />
          ) : isUnlocked ? (
            <Check weight="bold" className="w-8 h-8 text-white" />
          ) : (
            <LockKeyOpen className="w-8 h-8 text-white" weight="fill" />
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {showPricing && !isUnlocked ? (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Choose Your Access
              </h2>
              <p className="text-muted mb-8 max-w-md mx-auto">
                Start free or unlock the full library with Pro
              </p>
              
              <div className="max-w-2xl mx-auto">
                <PricingCards 
                  email={email} 
                  onSelectFree={handleSelectFree}
                  compact
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6"
              >
                {isUnlocked ? (
                  <span className="inline-flex items-center gap-3 text-emerald-500">
                    <Confetti weight="fill" className="w-10 h-10" />
                    View Your Free APIs
                  </span>
                ) : (
                  status === 'working' ? (
                    <span className="font-mono text-green-500 tracking-wider text-3xl animate-pulse">
                      {statusText}
                    </span>
                  ) : 'Unlock the full library.'
                )}
              </motion.h2>
              
              {/* Input Form or Progress */}
              {!isUnlocked && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-md mx-auto"
                >
                  {status === 'working' ? (
                    <div className="w-full bg-card/50 border border-green-500/30 rounded-xl p-4 backdrop-blur-md">
                      <div className="flex justify-between text-xs font-mono text-green-500 mb-2">
                        <span>PROGRESS</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-green-900/20 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <div className="mt-2 text-xs font-mono text-green-500/60 text-left">
                        {`> ${statusText}`}
                      </div>
                    </div>
                  ) : (
                    <form
                      className="relative group"
                      onSubmit={handleSubmit}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-plum via-blue-600 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                      <div className="relative flex items-center bg-card rounded-xl border border-card-border p-2 shadow-2xl">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="flex-1 bg-transparent px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:ring-0 text-lg w-full"
                          required
                        />
                        <button
                          type="submit"
                          className="px-8 py-3 rounded-xl bg-foreground text-background font-bold hover:shadow-[0_0_20px_rgba(14,165,233,0.35)] transition-all duration-300 relative overflow-hidden group flex items-center gap-2 border border-transparent disabled:opacity-60"
                        >
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-[-20deg] group-hover:animate-[shimmer_1.5s_infinite]" />
                          <span className="relative z-10 flex items-center gap-2">
                            <>Get Started <ArrowRight weight="bold" /></>
                          </span>
                        </button>
                      </div>
                    </form>
                  )}
                  
                  {status === 'idle' && (
                    <p className="mt-4 text-sm text-muted">
                      Start free. Upgrade for full access anytime.
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
