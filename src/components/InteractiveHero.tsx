'use client';

import { motion } from 'framer-motion';

export default function InteractiveHero() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      {/* Dark base layer with subtle grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
      
      {/* Holographic grid - subtle */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-16 px-6">
        <motion.p 
          className="text-xs uppercase tracking-[0.4em] text-matrix-green/80 mb-6 font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Free-Tier Command Center
        </motion.p>
        
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ 
            background: 'linear-gradient(90deg, #00ff41 0%, #00ffff 50%, #00ff41 100%)',
            backgroundSize: '200% auto',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Welcome to the Elite
        </motion.h1>
        
        <motion.p 
          className="mt-6 text-gray-400 max-w-lg mx-auto text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          52 verified free APIs. Zero cost to start.
        </motion.p>
      </div>
      
      {/* Bottom glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-matrix-green/50 to-transparent" />
    </div>
  );
}
