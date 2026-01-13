'use client';

import { Search, Grid, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export function MobileNav({ isUnlocked }: { isUnlocked: boolean }) {
  if (!isUnlocked) return null;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 left-6 right-6 z-50 md:hidden"
    >
      <div className="flex justify-around items-center bg-card/85 backdrop-blur-xl border border-card-border rounded-full p-4 shadow-2xl">
        <button className="p-3 text-muted hover:text-foreground rounded-full active:bg-card/80 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
          <Home size={24} />
        </button>
        <button className="p-3 text-purple-400 bg-purple-500/10 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center">
          <Grid size={24} />
        </button>
        <button className="p-3 text-muted hover:text-foreground rounded-full active:bg-card/80 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
          <Search size={24} />
        </button>
      </div>
    </motion.div>
  );
}
