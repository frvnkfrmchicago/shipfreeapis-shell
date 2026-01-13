'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Lightning, 
  Rocket, 
  ShieldCheck,
  TrendUp,
  Clock,
  Code,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react';
import Image from 'next/image';

// Benefits for interactive carousel - PUNCHY COPY
const benefits = [
  {
    icon: Lightning,
    title: 'Verified Monthly',
    description: 'Every API, skill, and rule gets checked. No dead links or stale docs.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    stat: 'Monthly',
    statLabel: 'Checks',
  },
  {
    icon: Rocket,
    title: 'Free Tier Clarity',
    description: 'Know limits, keys, and gotchas before you build. No surprise costs.',
    color: 'text-cyan-accent',
    bg: 'bg-cyan-accent/10',
    stat: '0',
    statLabel: 'Surprises',
  },
  {
    icon: ShieldCheck,
    title: 'Skills and Rules Included',
    description: 'Claude skills and Cursor rules ready to paste into your workflow.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    stat: '2',
    statLabel: 'Packs',
  },
  {
    icon: TrendUp,
    title: 'Curated Coverage',
    description: 'Quality over noise. Only APIs that are actually free and usable.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    stat: '52',
    statLabel: 'APIs',
  },
  {
    icon: Clock,
    title: 'Ship in Hours',
    description: 'Skip research loops. Jump straight to working endpoints.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    stat: '1',
    statLabel: 'Search',
  },
  {
    icon: Code,
    title: 'Start Free, Scale Later',
    description: 'Use the free tier. Upgrade only when you want the full library and drops.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    stat: '$0',
    statLabel: 'To Start',
  },
];

export function APIBenefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextBenefit = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % benefits.length);
  }, []);

  const prevBenefit = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + benefits.length) % benefits.length);
  }, []);

  const current = benefits[currentIndex];
  const Icon = current.icon;

  return (
    <section ref={ref} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header - SEO + DISPLAY FONT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/80 border border-card-border text-xs font-semibold tracking-[0.2em] text-muted mb-5">
            For Vibe Coders And Funded Teams
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tighter">
            Build Fast. Stay Free.
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Verified APIs, skills, and rules that cut the research time to zero — built for vibe coders and funded teams alike.
          </p>
        </motion.div>

        {/* Interactive Carousel */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Featured benefit card with IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative space-y-6"
          >
            {/* API Network Image - SMALLER */}
            <div className="relative rounded-2xl overflow-hidden border border-plum/30 shadow-lg shadow-plum/20 max-h-40">
              <Image
                src="/images/api-network-visual.png"
                alt="Interconnected API network visualization"
                width={400}
                height={180}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-transparent to-transparent" />
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-plum/20 to-cyan-accent/10 rounded-3xl blur-2xl -z-10" />
            
            <div className="relative p-8 rounded-3xl bg-card border border-card-border hover:border-plum/30 transition-all hover:-translate-y-1 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon and stat */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${current.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${current.color}`} weight="duotone" />
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${current.color}`}>{current.stat}</div>
                      <div className="text-xs tracking-wider text-muted">{current.statLabel}</div>
                    </div>
                  </div>

                  {/* Title and description */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    {current.title}
                  </h3>
                  <p className="text-lg text-muted leading-relaxed">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-card-border">
                <div className="flex gap-2">
                  {benefits.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex 
                          ? 'w-8 bg-cyan-400' 
                          : 'w-2 bg-muted/40 hover:bg-muted/60'
                      }`}
                      aria-label={`Show benefit ${idx + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prevBenefit}
                    className="p-3 rounded-xl bg-muted/10 hover:bg-muted/20 transition-colors"
                    aria-label="Previous benefit"
                  >
                    <CaretLeft className="w-5 h-5 text-muted hover:text-foreground" weight="bold" />
                  </button>
                  <button
                    onClick={nextBenefit}
                    className="p-3 rounded-xl bg-muted/10 hover:bg-muted/20 transition-colors"
                    aria-label="Next benefit"
                  >
                    <CaretRight className="w-5 h-5 text-muted hover:text-foreground" weight="bold" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Small benefit cards grid - VISUALLY DISTINCT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-3"
          >
            {benefits.map((benefit, idx) => {
              const BenefitIcon = benefit.icon;
              const isActive = idx === currentIndex;
              // Alternate layouts for visual variety
              const isEven = idx % 2 === 0;
              
              return (
                <button
                  key={benefit.title}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative overflow-hidden rounded-2xl text-left transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border-2 border-cyan-500/50 scale-[1.03] shadow-lg shadow-blue-950/20' 
                      : 'bg-card border border-card-border hover:border-cyan-400/40 hover:bg-card/80'
                  } ${isEven ? 'p-4' : 'p-3'}`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-plum to-cyan-accent" />
                  )}
                  
                  {/* Layout varies by index */}
                  {isEven ? (
                    // Layout A: Icon top, stat bottom right
                    <>
                      <div className={`inline-flex p-2 rounded-xl ${benefit.bg} mb-2`}>
                        <BenefitIcon className={`w-5 h-5 ${benefit.color}`} weight="duotone" />
                      </div>
                      <h4 className={`font-semibold text-sm ${isActive ? 'text-foreground' : 'text-muted'}`}>
                        {benefit.title}
                      </h4>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className={`text-lg font-bold ${benefit.color}`}>{benefit.stat}</span>
                        <span className="text-xs text-muted">{benefit.statLabel}</span>
                      </div>
                    </>
                  ) : (
                    // Layout B: Stat large, icon inline with title
                    <>
                      <div className={`text-2xl font-bold ${benefit.color} mb-1`}>{benefit.stat}</div>
                      <div className="flex items-center gap-2">
                        <BenefitIcon className={`w-4 h-4 ${isActive ? 'text-foreground' : 'text-muted'}`} weight="duotone" />
                        <h4 className={`font-medium text-xs ${isActive ? 'text-foreground' : 'text-muted'}`}>
                          {benefit.title}
                        </h4>
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
