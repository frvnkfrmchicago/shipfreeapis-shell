'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// --- ICONS ---

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.053-1.147 8.16-2.933 2.16-1.787 3.387-4.427 3.387-7.387 0-.587-.053-1.147-.16-1.68H12.48z"/></svg>
);
const AwsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-6" fill="currentColor"><path d="M10.29 15.345c.82 0 1.543-.615 1.543-1.42 0-.806-.724-1.42-1.544-1.42-.885.015-1.554.63-1.554 1.42 0 .79.67 1.42 1.555 1.42zm4.81-2.992l-.995 2.894h1.968l-1.02-2.894h.047zm-8.23-1.874h-1.63L2.738 16h1.758l.343-1.08h2.09l.344 1.08h1.802l-2.203-5.522zm-3.52 3.553l.72-2.28.72 2.28H3.35zm15.178-.29c0-.98-.69-1.693-1.492-1.693-.53 0-.967.245-1.22.686h-.06v-.522h-1.565v5.267h1.624v-1.89c0-.42.23-.9.76-.9.46 0 .612.35.612.795v1.995h1.623v-2.18c0-.79-.43-1.557-1.336-1.557h.053zm-5.023.755c0-.662.59-1.096 1.492-1.192l1.107-.123v-.26c0-.49-.336-.7-1.01-.7-.613 0-.99.28-1.082.72l-1.446-.176c.216-.946 1.13-1.645 2.504-1.645 1.635 0 2.65.805 2.65 2.224v3.132h-1.54v-.56h-.06c-.337.438-.854.7-1.445.7-1.082 0-1.865-.664-1.865-1.664v-.016c.01-.75.54-1.21 1.694-1.34l.001-.002z"/></svg>
);
const MicrosoftIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M0 0h11v11H0V0zm13 0h11v11H13V0zM0 13h11v11H0V13zm13 0h11v11H13V13z"/></svg>
);
const NetflixIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M16 2v20h-4V8.5L8 20H4V2h4v13.5L12 2h4z"/></svg>
);
const SpotifyIcon = () => (
   <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.42c-.18.3-.56.41-.86.23-2.36-1.44-5.32-1.76-8.81-.96-.34.08-.68-.13-.76-.47s.13-.68.47-.76c3.85-.88 7.15-.51 9.8 1.11.3.18.39.56.22.85zm1.22-2.71c-.22.37-.7.49-1.07.27-2.7-1.66-6.82-2.14-10.01-1.17-.42.13-.86-.11-.98-.53-.13-.42.11-.86.53-.98 3.73-1.13 8.35-.59 11.43 1.3.36.22.48.69.26 1.07zm.11-2.83c-3.23-1.92-8.56-2.1-11.64-1.16-.49.15-1.01-.13-1.16-.62s.13-1.01.62-1.16c3.55-1.08 9.42-.87 13.15 1.34.45.26.6 1.54.34 1.99-.27.45-.85.6-1.31.34z"/></svg>
);
const MetaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12 5.5c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/></svg> // Simplified
);
const TeslaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M22.023 6.643a1.5 1.5 0 00-1.284-.455C18.337 6.4 15.174 6.5 12 6.5s-6.337-.1-8.739-.312a1.5 1.5 0 00-1.284.455 1.5 1.5 0 00-.455 1.284C1.9 10.337 2 13.4 burnout 12s.1 6.337.312 8.739a1.5 1.5 0 00.455 1.284 1.5 1.5 0 00 1.284.455c2.402.212 5.5s.312 8.739.312 12s.1 12 12s-.1-6.337-.312-8.739a1.5 1.5 0 00-.455-1.284z"/></svg> // Simplified
);
const OpenAIIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M22.281 9.356a6.384 6.384 0 00-1.086-4.082 6.431 6.431 0 00-4.082-2.512 6.402 6.402 0 00-2.228-.051A6.383 6.383 0 0011.64 1.534a6.431 6.431 0 00-2.512 4.082 6.402 6.402 0 00-.051 2.228A6.384 6.384 0 001.534 11.64a6.431 6.431 0 004.082 2.512 6.286 6.286 0 00.672.072 6.382 6.382 0 00.414 4.01 6.43 6.43 0 004.082 2.512 6.402 6.402 0 002.228.051 6.383 6.383 0 003.245 1.251 6.43 6.43 0 002.512-4.082 6.402 6.402 0 00.051-2.228 6.384 6.384 0 007.544-3.754 6.432 6.432 0 00-4.082-2.512zM12 13.52c-.838 0-1.517-.679-1.517-1.517s.679-1.517 1.517-1.517 1.517.679 1.517 1.517-.679 1.517-1.517 1.517z"/></svg>
);
const AnthropicIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12 2L2 19h20L12 2zm0 4.5L18.5 17H5.5L12 6.5z"/></svg>
);

// --- DATA ---
const LOGOS = [
  { name: 'Google', Icon: GoogleIcon },
  { name: 'AWS', Icon: AwsIcon },
  { name: 'Microsoft', Icon: MicrosoftIcon },
  { name: 'OpenAI', Icon: OpenAIIcon },
  { name: 'Anthropic', Icon: AnthropicIcon },
  { name: 'Tesla', Icon: TeslaIcon },
  { name: 'Netflix', Icon: NetflixIcon },
  { name: 'Spotify', Icon: SpotifyIcon },
  { name: 'Meta', Icon: MetaIcon },
];

const PROJECTS = [
  "AI Trading Bots",
  "Voice Assistants",
  "SaaS Analytics",
  "Crypto Dashboards",
  "Supply Chain AI",
  "Smart Home Hubs",
  "Portfolio Trackers",
  "Health Monitor Apps",
  "Real-time News",
];

function LogoItem({ name, Icon }: { name: string, Icon?: React.FC }) {
  return (
    <div 
      className="flex items-center gap-3 px-6 py-4 mx-4 min-w-[170px] rounded-xl bg-card/80 border border-card-border shadow-[0_8px_16px_rgba(0,0,0,0.25)] hover:scale-105 hover:border-blue-400/40 hover:bg-card/90 hover:shadow-blue-500/10 transition-all duration-300 group cursor-default backdrop-blur-md relative z-10"
    >
      {Icon && <div className="text-muted group-hover:text-foreground transition-colors"><Icon /></div>}
      <span className="font-bold text-lg text-muted group-hover:text-foreground transition-colors">
        {name}
      </span>
    </div>
  );
}

export function LogoParade() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-24 overflow-hidden relative z-20">
      <style jsx global>{`
        @keyframes logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: logo-scroll 50s linear infinite;
        }
        .logo-container:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10 pointer-events-none" /> 

      <div className="max-w-7xl mx-auto px-4 relative z-30">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-foreground tracking-[0.2em] mb-4">
            Proof In The Wild
          </h2>
          <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto">
            Trusted platforms plus real projects you can ship fast.
          </p>
        </motion.div>
      </div>

      <div className="relative flex flex-col gap-8 logo-container">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-40 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-40 pointer-events-none" />

        {/* ROW 1: COMPANIES */}
        <div className="flex overflow-visible w-full relative">
          <div className="flex min-w-max animate-scroll">
            <div className="flex">
              {LOGOS.map((logo, idx) => (
                <LogoItem key={`r1-${idx}`} {...logo} />
              ))}
            </div>
             <div className="flex">
              {LOGOS.map((logo, idx) => (
                <LogoItem key={`r1-dup-${idx}`} {...logo} />
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: WHAT YOU CAN BUILD */}
        <div className="flex overflow-visible w-full relative">
          <div className="flex min-w-max animate-scroll" style={{ animationDirection: 'reverse', animationDuration: '60s' }}>
            <div className="flex">
              {PROJECTS.map((project, idx) => (
                <div key={`p1-${idx}`} className="flex items-center px-6 py-3 mx-4 min-w-[200px] rounded-xl bg-cyan-500/10 border border-cyan-500/20 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-mono text-sm backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:text-cyan-900 dark:hover:text-cyan-100 font-semibold shadow-sm">
                   <span className="mr-2 opacity-70 dark:opacity-50">{'>'}</span> {project}
                </div>
              ))}
            </div>
            <div className="flex">
              {PROJECTS.map((project, idx) => (
                <div key={`p1-dup-${idx}`} className="flex items-center px-6 py-3 mx-4 min-w-[200px] rounded-xl bg-cyan-500/10 border border-cyan-500/20 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-mono text-sm backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:text-cyan-900 dark:hover:text-cyan-100 font-semibold shadow-sm">
                   <span className="mr-2 opacity-70 dark:opacity-50">{'>'}</span> {project}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
