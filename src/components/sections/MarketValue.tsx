'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightning, Globe } from '@phosphor-icons/react';

const chartData = [
  { 
    year: '2025', 
    value: 12.5, 
    label: 'Base Adoption', 
    desc: 'Early majority integration of LLM agents.',
    driver: 'RAG Pipelines', 
    stat: '15%' 
  },
  { 
    year: '2026', 
    value: 24.2, 
    label: 'Acceleration', 
    desc: 'Automated code generation becomes standard.',
    driver: 'Auto-GPTs',
    stat: '32%'
  },
  { 
    year: '2027', 
    value: 42.8, 
    label: 'Expansion', 
    desc: 'Voice & Multimodal interfaces dominate.',
    driver: 'IoT Mesh',
    stat: '55%'
  },
  { 
    year: '2028', 
    value: 68.5, 
    label: 'Ubiquity', 
    desc: 'API-first becomes the only architecture.',
    driver: 'Edge AI',
    stat: '72%'
  },
  { 
    year: '2029', 
    value: 92.2, 
    label: 'Saturation', 
    desc: 'AIs consuming 90% of global API traffic.',
    driver: 'Swarm Logic',
    stat: '88%'
  },
  { 
    year: '2030', 
    value: 120.0, 
    label: 'Singularity', 
    desc: 'Autonomous economic agents at scale.',
    driver: 'AGI Systems',
    stat: '99%'
  },
];

export function MarketValue() {
  const [activeIndex, setActiveIndex] = useState(0);
  const maxValue = Math.max(...chartData.map(d => d.value)) * 1.1;
  const activeData = chartData[activeIndex];

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Text Info (4 cols) */}
          <div className="lg:col-span-5 space-y-8 pt-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/80 border border-card-border text-muted text-sm font-medium">
              <span>Market Forecast</span>
              <span className="text-foreground/70">•</span>
              <span>Click Bars</span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              The $120T Wealth Transfer. <span className="ice-shimmer">APIs are the leverage layer.</span>
            </h2>
            
            <p className="text-lg text-muted leading-relaxed">
              By 2030, raw logic is commoditized and distribution wins. The value shifts to the <em>Connectors</em>—the people and teams who can wire APIs fast. That includes vibe coders shipping quick wins and capital-backed teams scaling real products.
            </p>

             <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="p-4 rounded-xl bg-card/80 border border-card-border">
                <Lightning className="w-8 h-8 text-yellow-400 mb-3" weight="duotone" />
                <h3 className="font-bold text-foreground text-lg">Instant Logic</h3>
                <p className="text-sm text-muted mt-1">Pre-built functions replace custom code.</p>
              </div>
              <div className="p-4 rounded-xl bg-card/80 border border-card-border">
                <Globe className="w-8 h-8 text-blue-400 mb-3" weight="duotone" />
                <h3 className="font-bold text-foreground text-lg">Global Mesh</h3>
                <p className="text-sm text-muted mt-1">Universal interoperability standard.</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Interactive Graph & Detail Panel (8 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* 1. Detail Panel - Changes on Click */}
            <div className="p-6 sm:p-8 rounded-3xl bg-card/85 border border-card-border shadow-2xl relative overflow-hidden min-h-[180px]">
               {/* Icon Removed - Blocking issue fixed */}
               
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeIndex}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.3 }}
                   className="relative z-10 grid sm:grid-cols-2 gap-8"
                 >
                    <div>
                      <p className="text-sm font-mono text-cyan-300 mb-2 tracking-widest">{activeData.year} Projection</p>
                      <h3 className="text-3xl font-bold text-foreground mb-2">{activeData.label}</h3>
                      <p className="text-muted text-sm leading-relaxed">{activeData.desc}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-muted/10 rounded-xl p-3 border border-card-border">
                          <p className="text-xs text-muted mb-1">Market Cap</p>
                          <p className="text-xl font-bold text-foreground">${activeData.value}T</p>
                       </div>
                       <div className="bg-cyan-500/10 rounded-xl p-3 border border-cyan-500/20">
                          <p className="text-xs text-cyan-300 mb-1">Key Driver</p>
                          <p className="text-lg font-bold text-foreground">{activeData.driver}</p>
                       </div>
                       <div className="col-span-2 bg-muted/5 rounded-xl p-3 border border-card-border flex items-center justify-between">
                          <p className="text-xs text-muted">AI Traffic Share</p>
                          <p className="text-xl font-bold text-green-500">{activeData.stat}</p>
                       </div>
                    </div>
                 </motion.div>
               </AnimatePresence>
            </div>

            {/* 2. The Chart */}
            <div className="p-8 rounded-3xl bg-card/85 border border-card-border shadow-lg h-[320px] flex flex-col justify-end relative">
               <p className="absolute top-6 left-6 text-sm text-muted font-mono">
                 Click Bars To Reveal Detail. Hover For Values.
               </p>
               
              <div className="flex items-end justify-between gap-2 sm:gap-4 h-full pt-12">
                {chartData.map((item, index) => {
                  const height = (item.value / maxValue) * 100;
                  const isActive = index === activeIndex;
                  
                  return (
                    <button
                      key={item.year}
                      onClick={() => setActiveIndex(index)}
                      className="flex-1 flex flex-col items-center group relative focus:outline-none transition-all duration-300 hover:-translate-y-1 h-full"
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="px-3 py-2 rounded-lg bg-card/95 border border-card-border shadow-lg text-xs text-foreground whitespace-nowrap">
                          <span className="font-semibold">${item.value}T</span>
                          <span className="text-muted"> · </span>
                          <span className="text-muted">{item.stat} AI Traffic</span>
                        </div>
                      </div>
                      {/* Bar */}
                      <div className="w-full relative px-1 sm:px-2 h-full flex items-end">
                        <motion.div 
                          className={`w-full rounded-t-lg transition-all duration-300 relative overflow-hidden cursor-pointer ${
                            isActive 
                              ? 'bg-gradient-to-t from-blue-600 via-blue-500 to-[#9E1B4C] shadow-[0_0_20px_rgba(158,27,76,0.5)]' 
                              : 'bg-blue-900/20 group-hover:bg-blue-800/50 border-t border-blue-500/30'
                          }`}
                          style={{ height: `${height}%` }}
                        >
                           {/* Tech Scanline effect inside active bar */}
                           {isActive && <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] w-full h-[200%] animate-[scan_2s_linear_infinite]" />}
                        </motion.div>
                      </div>
                      
                      {/* Year Label */}
                      <span className={`mt-4 text-xs font-mono font-medium transition-colors ${isActive ? 'text-foreground scale-110' : 'text-muted group-hover:text-foreground'}`}>
                        {item.year}
                      </span>
                      
                      {/* Active Indicator Dot */}
                      {isActive && <div className="w-1 h-1 rounded-full bg-[#9E1B4C] mt-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <style jsx>{`
              @keyframes scan {
                0% { transform: translateY(-50%); }
                100% { transform: translateY(0%); }
              }
            `}</style>
    </section>
  );
}
