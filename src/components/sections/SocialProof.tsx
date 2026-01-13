'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, TwitterLogo, GithubLogo } from '@phosphor-icons/react';

// Early builder feedback
const testimonials = [
  {
    quote: "Saved me 3 weeks of research. Every API actually works.",
    author: "Early Builder",
    role: "Indie Hacker",
    avatar: "EB",
    platform: "twitter",
    color: "from-violet-500 to-purple-600",
  },
  {
    quote: "Finally, an API list that doesn't lie about 'free' tiers.",
    author: "Beta User",
    role: "Full-Stack Dev",
    avatar: "BU",
    platform: "github",
    color: "from-cyan-500 to-blue-600",
  },
  {
    quote: "Shipped my MVP in a weekend. These APIs just work.",
    author: "Founding Builder",
    role: "Startup Founder",
    avatar: "FB",
    platform: "twitter",
    color: "from-blue-500 to-cyan-600",
  },
  {
    quote: "Best resource for hackathons. Period.",
    author: "Community Member",
    role: "CS Student",
    avatar: "CM",
    platform: "github",
    color: "from-emerald-500 to-green-600",
  },
];

// Stats for social proof
const stats = [
  { value: '52', label: 'Free APIs' },
  { value: 'Monthly', label: 'Verification' },
  { value: 'Skills', label: 'Claude Packs' },
  { value: 'Rules', label: 'Cursor Packs' },
];

export function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="text-center p-6 rounded-2xl bg-card/80 border border-card-border"
            >
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400" weight="fill" />
            ))}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tighter">
            Developers Ship Faster
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Built for builders who want clarity, not noise.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className="group relative p-6 rounded-2xl bg-card/80 border border-card-border hover:border-plum/30 transition-all duration-300"
            >
              {/* Quote */}
              <p className="text-lg text-foreground mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted">{testimonial.role}</div>
                  </div>
                </div>
                
                {/* Platform icon */}
                <div className="p-2 rounded-lg bg-card/70 group-hover:bg-card transition-colors">
                  {testimonial.platform === 'twitter' ? (
                    <TwitterLogo className="w-5 h-5 text-muted" weight="fill" />
                  ) : (
                    <GithubLogo className="w-5 h-5 text-muted" weight="fill" />
                  )}
                </div>
              </div>

              {/* Decorative gradient on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-plum/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
