'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Unlock, Zap, Database, DollarSign } from 'lucide-react';
import { Magnetic } from './Magnetic';

interface LeadMagnetProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

export function LeadMagnet({ onUnlock, isUnlocked }: LeadMagnetProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onUnlock();
    }, 1500);
  };

  const stats = [
    { icon: Database, value: '52', label: 'Free APIs' },
    { icon: Zap, value: 'Monthly', label: 'Drops' },
    { icon: DollarSign, value: '$0', label: 'To Start' },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-16">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="lock-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            className="relative z-20 flex flex-col items-center text-center"
          >
            {/* Hero Section */}
            <div className="w-full space-y-8">
              {/* Badge */}
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-plum/10 border border-plum/20 text-plum-light text-xs font-bold uppercase tracking-widest backdrop-blur-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Lock size={12} /> Premium Access
              </motion.span>
              
              {/* Main Headline */}
              <motion.h1 
                className="text-5xl md:text-7xl font-black tracking-tighter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-foreground">Stop guessing.</span>
                <br />
                <span className="text-cyan-300">Start Shipping.</span>
              </motion.h1>
              
              {/* Sub-headline */}
              <motion.p 
                className="max-w-xl mx-auto text-lg text-muted font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Unlock the curated stack of verified free APIs, Claude skills, and Cursor rules. Build fast for <span className="text-cyan-300 font-bold text-glow-cyan">$0</span> to start.
              </motion.p>
            </div>

            {/* Email Form */}
            <motion.form 
              onSubmit={handleSubmit} 
              className="relative w-full max-w-md mt-10 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-plum/30 to-cyan-accent/30 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative flex gap-2 p-2 bg-white/5 border border-plum/20 rounded-2xl backdrop-blur-xl">
                <input 
                  type="email" 
                  placeholder="Enter your email to unlock..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none px-4 text-foreground placeholder-gray-500 min-h-[44px]"
                  required
                />
                <Magnetic>
                  <button 
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-plum to-cyan-accent text-white rounded-xl font-bold hover:from-plum-dark hover:to-cyan-light transition-all disabled:opacity-50 min-h-[44px] shadow-lg glow-plum"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Unlock <ArrowRight size={18} /></>
                    )}
                  </button>
                </Magnetic>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Join early builders shipping free-tier products.
              </p>
            </motion.form>
          </motion.div>
        ) : (
          <motion.div
            key="unlock-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            {/* Unlocked Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-plum/10 border border-plum/20 text-plum-light font-bold mb-6 glow-plum"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Unlock size={16} /> Stack Unlocked
            </motion.div>
            
            {/* Welcome Message */}
            <motion.h2 
              className="text-4xl md:text-5xl font-black mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-cyan-300">Welcome to the Elite</span>
            </motion.h2>
            
            <motion.p 
              className="text-muted max-w-md mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              You now have access to the full free-tier stack. Build something legendary.
            </motion.p>
            
            {/* Stat Cards */}
            <div className="flex flex-wrap justify-center gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-card/80 border border-card-border backdrop-blur-xl hover:border-plum/30 transition-all group"
                >
                  <stat.icon className="w-5 h-5 text-plum-light" />
                  <div className="text-left">
                    <p className="text-2xl font-black text-foreground">{stat.value}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
