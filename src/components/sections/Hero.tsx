'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, TerminalWindow } from '@phosphor-icons/react';
import Image from 'next/image';

// Cycling images - Lifestyle x Code (Diverse Engineering)
const heroImages = [
  { src: '/images/hero-diverse-1.png', alt: 'Black developer coding at beach golden hour' },
  { src: '/images/hero-diverse-2.png', alt: 'Black female engineer in high-end office' },
  { src: '/images/hero-diverse-3.png', alt: 'Engineering leader demoing at tech summit' },
];

// Short, punchy lines
const taglines = [
  "APIs. Skills. Rules.",
  "Ship In Hours.",
  "Real Free Tiers.",
  "No Dead Links.",
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tagIndex, setTagIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), springConfig);

  useEffect(() => {
    const interval = setInterval(() => setTagIndex((p) => (p + 1) % taglines.length), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setImageIndex((p) => (p + 1) % heroImages.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center pt-24 pb-12 px-4 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      {/* BACKGROUND - Linear glow only (no circles) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(59,130,246,0.08),transparent_55%),linear-gradient(320deg,rgba(155,45,93,0.08),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Text Content - Span 6 (order-2 on mobile so image comes first) */}
          <div className="lg:col-span-6 space-y-8 relative z-30 pt-6 sm:pt-0 order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 shadow-lg backdrop-blur-md">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-semibold text-emerald-400 tracking-wide">
                  52 Free APIs Ready
                </span>
              </div>
            </motion.div>

            {/* HEADLINE */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight navy-shimmer">
                ShipFreeAPIs
              </h1>
              
              <div className="h-14 sm:h-16 lg:h-20 overflow-hidden mt-3">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={tagIndex}
                    initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -18, filter: 'blur(4px)' }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight"
                  >
                    {taglines[tagIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative p-8 -mx-4 sm:mx-0 rounded-3xl bg-card/90 border border-card-border shadow-2xl shadow-black/40 group hover:border-blue-700/30 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
              <div className="relative z-10 flex gap-4">
                <TerminalWindow className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" weight="duotone" />
                <div>
                  <p className="text-xl sm:text-2xl text-foreground font-bold mb-2">
                    Stop hunting for free tiers. Start shipping.
                  </p>
                  <p className="text-base sm:text-lg text-muted leading-relaxed">
                    A curated library of free APIs, Claude skills, and Cursor rules. Verified monthly so you can build fast without surprise costs.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a 
                href="#unlock"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-plum-dark to-plum text-white font-bold text-lg shadow-[0_18px_40px_rgba(155,45,93,0.45)] hover:shadow-[0_24px_60px_rgba(155,45,93,0.6)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] ring-1 ring-plum-light/40"
              >
                <span>Start Building</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" weight="bold" />
              </a>
              
              <a 
                href="/glossary"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-card/70 border border-card-border text-foreground font-medium text-lg hover:bg-card/95 hover:border-plum/50 hover:shadow-[0_16px_40px_rgba(59,130,246,0.25)] transition-all duration-300 backdrop-blur-sm"
              >
                <Play className="w-5 h-5" weight="fill" />
                <span>Learn Keywords</span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Image - Span 6 - Visible on All Screens (order-1 on mobile so it appears first) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
            className="lg:col-span-6 lg:pl-10 relative z-20 pb-8 lg:pb-0 order-1 lg:order-2" 
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
          >
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-card-border shadow-2xl shadow-black/80 bg-slate-900">
              {/* Images */}
              {heroImages.map((image, idx) => (
                <motion.div
                  key={image.src}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: idx === imageIndex ? 1 : 0, scale: idx === imageIndex ? 1 : 1.05 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                    sizes="50vw"
                  />
                  {/* Navy overlay to blend */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/50 via-transparent to-transparent" />
                </motion.div>
              ))}
              
              {/* Cycling Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-card-border">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-500 ${idx === imageIndex ? 'bg-white w-8' : 'bg-white/30 w-2 hover:bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
