'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Zap, 
  CreditCard,
  Brain,
  Search,
  TrendingUp,
  Users,
  Building2,
  Map,
  CloudSun,
  Music,
  Mic,
  Palette,
  Bell,
  Rocket,
  Gamepad2,
  Video,
  UtensilsCrossed,
  PawPrint,
  Briefcase,
  DollarSign,
  Activity,
  Smile,
  Car,
  Plane,
  Sparkles,
  type LucideIcon
} from 'lucide-react';

export interface APIItem {
  name: string;
  freeTier: string;
  useCase: string;
  url: string;
  tier?: 'free' | 'generous' | 'credit';
}

interface APICardProps {
  api: APIItem;
  category: string;
  icon: string;
}

// Category to icon mapping (replaces emojis) with unique colors
const categoryIcons: Record<string, { icon: LucideIcon; color: string }> = {
  'AI / Intelligence': { icon: Brain, color: 'text-fuchsia-400' },
  'Search & Web Data': { icon: Search, color: 'text-sky-400' },
  'Trends & Social': { icon: TrendingUp, color: 'text-rose-400' },
  'Social Profiles': { icon: Users, color: 'text-pink-400' },
  'City & Location': { icon: Building2, color: 'text-orange-400' },
  'Maps & Geocoding': { icon: Map, color: 'text-teal-400' },
  'Weather': { icon: CloudSun, color: 'text-blue-400' },
  'Music & Audio': { icon: Music, color: 'text-purple-400' },
  'Speech (TTS/STT)': { icon: Mic, color: 'text-indigo-400' },
  'Image Gen': { icon: Palette, color: 'text-lime-400' },
  'Notifications': { icon: Bell, color: 'text-red-400' },
  'Deployment': { icon: Rocket, color: 'text-emerald-400' },
  'Gaming': { icon: Gamepad2, color: 'text-yellow-400' },
  'Creators': { icon: Video, color: 'text-cyan-400' },
  'Food': { icon: UtensilsCrossed, color: 'text-amber-400' },
  'Pets': { icon: PawPrint, color: 'text-orange-300' },
  'Business / CRM': { icon: Briefcase, color: 'text-slate-400' },
  'Finance': { icon: DollarSign, color: 'text-green-400' },
  'Sports': { icon: Activity, color: 'text-yellow-500' },
  'Fun / Engagement': { icon: Smile, color: 'text-pink-500' },
  'Cars & Vehicles': { icon: Car, color: 'text-zinc-400' },
  'Aviation': { icon: Plane, color: 'text-sky-300' },
  'Zodiac': { icon: Sparkles, color: 'text-violet-400' },
};

// Tier badge configuration with better icons
const tierConfig = {
  free: {
    label: 'Truly Free',
    icon: CheckCircle2,
    className: 'tier-badge-free',
    gradient: 'from-emerald-500/20 to-green-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400'
  },
  generous: {
    label: 'Generous Free',
    icon: Zap,
    className: 'tier-badge-generous',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400'
  },
  credit: {
    label: 'Credit-Based',
    icon: CreditCard,
    className: 'tier-badge-credit',
    gradient: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400'
  }
};

export function APICard({ api, category }: APICardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
  }

  const tier = api.tier || 'generous';
  const tierInfo = tierConfig[tier];
  const TierIcon = tierInfo.icon;
  const categoryConfig = categoryIcons[category] || { icon: Brain, color: 'text-plum-light' };
  const CategoryIcon = categoryConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative h-full"
      onMouseMove={onMouseMove}
      style={{ perspective: 1000 }}
    >
      <Link href={api.url} target="_blank">
        <motion.div
           className="relative h-full overflow-hidden rounded-2xl border border-card-border bg-card/90 p-6 backdrop-blur-xl transition-all duration-300"
           whileHover={{ 
             scale: 1.02,
             borderColor: 'rgba(142, 69, 133, 0.5)',
           }}
           style={{
             rotateX: useTransform(mouseY, [0, 400], [2, -2]),
             rotateY: useTransform(mouseX, [0, 400], [-2, 2]),
           }}
        >
          {/* Spotlight Effect - Plum themed */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([newX, newY]) => `radial-gradient(600px circle at ${newX}px ${newY}px, rgba(142, 69, 133, 0.12), transparent 40%)`
              ),
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-4 h-full">
            {/* Header with Icon, Name, and Tier Badge */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-card shadow-inner border border-card-border">
                  <CategoryIcon size={24} className={categoryConfig.color} />
                </span>
                <div>
                  <h3 className="font-bold text-foreground text-lg group-hover:text-plum-light transition-colors">
                    {api.name}
                  </h3>
                  <span className="text-[10px] font-bold text-muted uppercase tracking-widest border border-card-border px-2 py-0.5 rounded-full">
                    {category}
                  </span>
                </div>
              </div>
              <div className="p-2 rounded-full bg-card/80 text-muted group-hover:text-white group-hover:bg-plum transition-all">
                 <ArrowUpRight size={16} />
              </div>
            </div>

            {/* Tier Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full w-fit ${tierInfo.className} bg-gradient-to-r ${tierInfo.gradient} border ${tierInfo.border}`}>
              <TierIcon size={12} className={tierInfo.text} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${tierInfo.text}`}>
                {tierInfo.label}
              </span>
            </div>

            <div className="mt-auto space-y-3">
              {/* Free Tier Info */}
              <div className={`rounded-xl bg-gradient-to-br ${tierInfo.gradient} px-4 py-3 border ${tierInfo.border}`}>
                <span className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${tierInfo.text}`}>FREE TIER</span>
                <p className="text-sm font-medium text-foreground">{api.freeTier}</p>
              </div>
              
              {/* Use Case */}
              <p className="text-sm text-muted leading-relaxed pl-1">{api.useCase}</p>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
