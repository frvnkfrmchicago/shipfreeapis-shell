'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Lightning, 
  Robot, 
  Sparkle, 
  Rocket, 
  Code, 
  MagicWand 
} from '@phosphor-icons/react';
import Image from 'next/image';

// Features with punchy copy
const features = [
  {
    icon: Lightning,
    title: 'Ship While They Sleep',
    description: 'Ready-to-use endpoints so you can launch fast.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Robot,
    title: 'AI Gets It',
    description: 'Tool-ready APIs for agents and workflows.',
    color: 'text-cyan-300',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: Sparkle,
    title: 'Build by Feel',
    description: 'Prototype quickly with instant feedback loops.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Rocket,
    title: 'Free → Production',
    description: 'Start free, scale only when usage grows.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Code,
    title: 'Copy. Paste. Ship.',
    description: 'Snippets that run on the first try.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: MagicWand,
    title: 'Actually Verified',
    description: 'Monthly checks keep links alive.',
    color: 'text-amber-300',
    bg: 'bg-amber-500/10',
  },
];

export function VibeCoding() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-vibe-bg relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Split Layout: Image LEFT, Content RIGHT */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-br from-plum/30 to-cyan-accent/20 rounded-3xl blur-3xl" />
            
            {/* Image with plum border glow */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-plum/30 shadow-2xl shadow-plum/20">
              <Image
                src="/images/vibe-coding-visual.png"
                alt="Vibe Coding - Modern developer workflow with connected APIs"
                width={600}
                height={500}
                className="w-full h-auto"
              />
              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div 
              className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl bg-plum text-white font-bold text-sm shadow-lg shadow-plum/30"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              2025 Development
            </motion.div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Header - LEFT ALIGNED */}
            <div className="text-left">
              <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-500/30">
                AI-First Development
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tighter">
                Build faster with verified free APIs.
              </h2>
              <p className="text-lg text-muted max-w-lg">
                Vibe coding is the workflow: fast selection, clear limits, and snippets that run the first time.
                <span className="text-foreground font-medium"> Ship without the research spiral.</span>
              </p>
            </div>

            {/* Feature Grid - 2x3 */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.08 }}
                  className="group p-4 rounded-2xl bg-card/80 border border-card-border hover:border-plum/30 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl ${feature.bg}`}>
                      <feature.icon className={`w-5 h-5 ${feature.color}`} weight="duotone" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold mb-1 group-hover:text-cyan-200 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
