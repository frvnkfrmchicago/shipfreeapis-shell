'use client';

import { useState, useRef, type CSSProperties } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  Check, 
  ArrowRight,
  Cloud,
  Brain,
  Image as ImageIcon,
  CurrencyDollar,
  GameController
} from '@phosphor-icons/react';
import Image from 'next/image';

// Featured APIs to showcase as lead magnets
const featuredAPIs = [
  {
    name: 'OpenAI Compatible',
    category: 'AI',
    icon: Brain,
    gradient: 'from-blue-500 to-indigo-600',
    accent: '#60a5fa',
    accentSoft: 'rgba(96, 165, 250, 0.18)',
    accentStrong: 'rgba(96, 165, 250, 0.35)',
    headline: 'OpenAI-Compatible Chat In One Call.',
    subline: 'Free Inference With Groq — Up To 7,000 Req/Min.',
    tags: ['OpenAI Compatible', 'No Lock-In', 'Free Tier', 'Fast Throughput'],
    why: 'Ship A Working LLM Chat Without Changing Your Stack.',
    benefits: ['Drop-in OpenAI compatibility', 'Fast throughput for demos', 'Zero friction to start'],
    code: `fetch('https://api.groq.com/v1/chat/completions', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_KEY' },
  body: JSON.stringify({
    model: 'llama3-8b-8192',
    messages: [{ role: 'user', content: 'Hello!' }]
  })
})`,
    description: 'Free AI inference with Groq - up to 7000 req/min',
    image: '/images/spotlight-ai.png',
  },
  {
    name: 'Weather Data',
    category: 'Data',
    icon: Cloud,
    gradient: 'from-sky-500 to-blue-600',
    accent: '#38bdf8',
    accentSoft: 'rgba(56, 189, 248, 0.18)',
    accentStrong: 'rgba(56, 189, 248, 0.35)',
    headline: 'OpenAI-Compatible Weather Data. No API Key.',
    subline: 'Current Conditions In One Call — 10,000/Day Free.',
    tags: ['No API Key', 'Weather JSON', 'Real-Time', 'High Limits'],
    why: 'Perfect For Demos, Dashboards, And Location-Aware Apps.',
    benefits: ['No auth required', 'Readable JSON payloads', 'High free-tier limits'],
    code: `fetch('https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true')
  .then(res => res.json())
  .then(data => console.log(data.current_weather))`,
    description: 'No API key needed - up to 10,000 calls/day',
    image: '/images/spotlight-weather.png',
  },
  {
    name: 'Image Generation',
    category: 'Media',
    icon: ImageIcon,
    gradient: 'from-emerald-500 to-teal-600',
    accent: '#34d399',
    accentSoft: 'rgba(52, 211, 153, 0.18)',
    accentStrong: 'rgba(52, 211, 153, 0.35)',
    headline: 'Generate Images Without A Billing Wall.',
    subline: 'Free AI Image Generation — No Limits.',
    tags: ['Images', 'No Limits', 'Fast Render', 'Free Generation'],
    why: 'Instant Visuals For Landing Pages, Mockups, And Prompts.',
    benefits: ['No rate caps to start', 'Instant image URLs', 'Great for rapid mockups'],
    code: `fetch('https://image.pollinations.ai/prompt/futuristic%20city')
  .then(res => res.blob())
  .then(blob => URL.createObjectURL(blob))`,
    description: 'Free AI image generation - no limits',
    image: '/images/spotlight-image.png',
  },
  {
    name: 'Crypto Prices',
    category: 'Finance',
    icon: CurrencyDollar,
    gradient: 'from-emerald-500 to-green-600',
    accent: '#10b981',
    accentSoft: 'rgba(16, 185, 129, 0.18)',
    accentStrong: 'rgba(16, 185, 129, 0.35)',
    headline: 'Live Crypto Pricing In One Request.',
    subline: 'Free Market Data — 10–30 Req/Min.',
    tags: ['Market Data', 'Free Tier', 'Fast Refresh', 'Simple Endpoint'],
    why: 'Build Trackers, Alerts, And Dashboards Fast.',
    benefits: ['Low-latency data', 'Simple pricing endpoint', 'Great for dashboards'],
    code: `fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd')
  .then(res => res.json())
  .then(data => console.log(data))`,
    description: 'Free crypto data - 10-30 req/min',
    image: '/images/spotlight-crypto.png',
  },
  {
    name: 'Game Database',
    category: 'Gaming',
    icon: GameController,
    gradient: 'from-amber-500 to-orange-600',
    accent: '#f59e0b',
    accentSoft: 'rgba(245, 158, 11, 0.18)',
    accentStrong: 'rgba(245, 158, 11, 0.35)',
    headline: 'A Full Game Catalog In One Call.',
    subline: '500k Games — 20,000 Req/Month Free.',
    tags: ['Gaming', 'Large Catalog', 'Free Tier', 'Search-Ready'],
    why: 'Ship Discovery, Search, And Recommendations Fast.',
    benefits: ['Massive catalog', 'Search-ready metadata', 'Generous free tier'],
    code: `fetch('https://api.rawg.io/api/games?key=YOUR_KEY&page_size=5')
  .then(res => res.json())
  .then(data => console.log(data.results))`,
    description: '500k games - 20,000 req/month free',
    image: '/images/spotlight-gaming.png',
  },
];

function CodeBlock({ code, onCopy, copied }: { code: string; onCopy: () => void; copied: boolean }) {
  return (
    <div className="relative group">
      <pre className="p-5 rounded-xl bg-slate-950/60 border border-[color:var(--accent-soft)] shadow-[0_0_0_1px_var(--accent-soft)] overflow-x-auto text-sm text-white/90 font-mono">
        <code>{code}</code>
      </pre>
      <button
        onClick={onCopy}
        className="absolute top-3 right-3 p-2 rounded-lg bg-card/70 hover:bg-card/90 border border-card-border transition-all opacity-0 group-hover:opacity-100"
      >
        {copied ? (
          <Check className="w-4 h-4 text-cyan-300" />
        ) : (
          <Copy className="w-4 h-4 text-muted" />
        )}
      </button>
    </div>
  );
}

export function FeaturedAPISpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const activeAPI = featuredAPIs[activeIndex];
  const ActiveIcon = activeAPI.icon;
  const activeStyle = {
    '--accent': activeAPI.accent,
    '--accent-soft': activeAPI.accentSoft,
    '--accent-strong': activeAPI.accentStrong,
  } as CSSProperties;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeAPI.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={ref} className="section-spotlight-bg py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-plum/20 text-plum-light text-sm font-bold border border-plum/30">
            CODE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tighter">
            Code Snippets. Zero Friction.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Paste The Snippet. Ship In Minutes. These Are The Fastest Wins In The Stack.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)] gap-10 items-start">
          {/* API Selector Pills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 lg:sticky lg:top-24 lg:self-start lg:h-fit"
          >
            {featuredAPIs.map((api, idx) => {
              const Icon = api.icon;
              const isActive = idx === activeIndex;
              const itemStyle = {
                '--accent': api.accent,
                '--accent-soft': api.accentSoft,
                '--accent-strong': api.accentStrong,
              } as CSSProperties;
              return (
                <button
                  key={api.name}
                  onClick={() => setActiveIndex(idx)}
                  style={itemStyle}
                  className={`group relative w-full min-h-[76px] flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 overflow-hidden border ${
                    isActive
                      ? 'bg-[linear-gradient(120deg,var(--accent-soft),transparent_60%)] border-[color:var(--accent)] shadow-[0_18px_50px_var(--accent-soft)]'
                      : 'bg-card border-card-border hover:border-[color:var(--accent)] hover:bg-card/80'
                  }`}
                >
                  {/* Accent rail */}
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-[color:var(--accent)] transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`}
                  />
                  {/* Animated border beam for active */}
                  {isActive && (
                    <span className="absolute inset-0 pointer-events-none">
                      <span className="absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    </span>
                  )}
                  
                  <div className="relative z-10 p-3 rounded-xl bg-[color:var(--accent-soft)] border border-[color:var(--accent-soft)]">
                    <Icon className="w-6 h-6 text-[color:var(--accent)]" weight="duotone" />
                  </div>
                  <div className="relative z-10 flex-1">
                    <h3 className={`font-semibold truncate ${isActive ? 'text-[color:var(--accent)]' : 'text-foreground'}`}>
                      {api.name}
                    </h3>
                    <p className="text-sm text-[color:var(--accent)] font-medium truncate">
                      {api.category}
                    </p>
                  </div>
                  <span className="relative z-10 w-5 h-5 flex items-center justify-center">
                    <ArrowRight className={`w-5 h-5 text-[color:var(--accent)] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} weight="bold" />
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Code Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="sticky top-24 lg:pl-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                style={activeStyle}
                className="relative p-6 rounded-3xl bg-card/90 border border-[color:var(--accent-soft)] backdrop-blur-xl overflow-hidden shadow-[0_24px_80px_var(--accent-soft)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(520px_circle_at_85%_15%,var(--accent-soft),transparent_60%)] opacity-70" />
                <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(15,23,42,0.5),transparent_45%)]" />

                {/* Title */}
                <div className="relative z-10 flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[color:var(--accent-soft)] border border-[color:var(--accent-strong)]">
                    <ActiveIcon className="w-6 h-6 text-[color:var(--accent)]" weight="duotone" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-[color:var(--accent)]">
                      {activeAPI.name}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mt-2">
                      {activeAPI.headline}
                    </h3>
                    <p className="text-base text-muted mt-2">{activeAPI.subline}</p>
                    <p className="text-sm text-[color:var(--accent)] opacity-80 mt-3">{activeAPI.why}</p>
                  </div>
                </div>

                {/* Tags + Code */}
                <div className="relative z-10 mt-6">
                  <div className="grid grid-cols-2 gap-2">
                    {activeAPI.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold tracking-wide px-3 py-1 rounded-full bg-[color:var(--accent-soft)] border border-[color:var(--accent-strong)] text-[color:var(--accent)] text-center"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted">
                    <span className="font-bold uppercase tracking-[0.3em] text-[color:var(--accent)]">CODE</span>
                    <span>JavaScript Fetch</span>
                  </div>
                  <div className="mt-3 relative overflow-hidden rounded-2xl border border-[color:var(--accent-strong)] bg-[linear-gradient(135deg,var(--accent-soft),transparent_60%)]">
                    <Image 
                      src={activeAPI.image} 
                      alt={activeAPI.name} 
                      fill 
                      className="absolute inset-0 object-cover opacity-55 blur-[1px]"
                      sizes="(min-width: 1024px) 560px, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/35 via-black/20 to-transparent" />
                    <div className="relative z-10 p-4">
                      <CodeBlock code={activeAPI.code} onCopy={handleCopy} copied={copied} />
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="relative z-10 mt-5">
                  <p className="text-xs font-semibold tracking-[0.2em] text-muted mb-2">Benefits</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                  {activeAPI.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="rounded-xl border border-[color:var(--accent-soft)] bg-card/70 px-3 py-2 text-xs text-muted"
                    >
                      <span className="text-[color:var(--accent)]">•</span> {benefit}
                    </div>
                  ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="relative z-10 mt-6 flex justify-between items-center">
                  <span className="text-sm text-muted">
                    {copied ? 'Copied to clipboard!' : 'Click the icon to copy'}
                  </span>
                  <a
                    href="#unlock"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[color:var(--accent-soft)] text-[color:var(--accent)] font-medium border border-[color:var(--accent-strong)] hover:brightness-110 transition-colors"
                  >
                    <span>See all <span className="text-emerald-300 font-semibold">52</span> APIs</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
