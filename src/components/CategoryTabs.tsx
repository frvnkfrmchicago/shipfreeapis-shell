'use client';

import { 
  Sparkles, 
  Zap, 
  Coins, 
  Layers,
  Globe,
  Cpu,
  Radar,
  BarChart3,
  UsersRound,
  MapPin,
  Navigation,
  Cloud,
  AudioLines,
  MessageCircle,
  ImagePlus,
  BellRing,
  Server,
  Joystick,
  Clapperboard,
  ChefHat,
  Cat,
  Building,
  Wallet,
  Medal,
  PartyPopper,
  CarFront,
  PlaneTakeoff,
  Moon,
  type LucideIcon
} from 'lucide-react';

interface CategoryTabsProps {
  categories: { category: string; icon: string }[];
  selectedCategory: string;
  onSelect: (category: string) => void;
  selectedTier?: string;
  onTierSelect?: (tier: string) => void;
}

// Tier filter configuration
const tierFilters = [
  { id: 'all', label: 'All Tiers', icon: Layers, color: 'text-sky-300' },
  { id: 'free', label: 'Truly Free', icon: Sparkles, color: 'text-emerald-400' },
  { id: 'generous', label: 'Generous', icon: Zap, color: 'text-cyan-400' },
  { id: 'credit', label: 'Credit-Based', icon: Coins, color: 'text-amber-400' },
];

// Category icons for FILTER TABS (different from API cards!)
const filterCategoryIcons: Record<string, { icon: LucideIcon; color: string }> = {
  'All': { icon: Globe, color: 'text-sky-300' },
  'AI / Intelligence': { icon: Cpu, color: 'text-fuchsia-400' },
  'Search & Web Data': { icon: Radar, color: 'text-sky-400' },
  'Trends & Social': { icon: BarChart3, color: 'text-rose-400' },
  'Social Profiles': { icon: UsersRound, color: 'text-pink-400' },
  'City & Location': { icon: MapPin, color: 'text-orange-400' },
  'Maps & Geocoding': { icon: Navigation, color: 'text-teal-400' },
  'Weather': { icon: Cloud, color: 'text-blue-400' },
  'Music & Audio': { icon: AudioLines, color: 'text-purple-400' },
  'Speech (TTS/STT)': { icon: MessageCircle, color: 'text-indigo-400' },
  'Image Gen': { icon: ImagePlus, color: 'text-lime-400' },
  'Notifications': { icon: BellRing, color: 'text-red-400' },
  'Deployment': { icon: Server, color: 'text-emerald-400' },
  'Gaming': { icon: Joystick, color: 'text-yellow-400' },
  'Creators': { icon: Clapperboard, color: 'text-cyan-400' },
  'Food': { icon: ChefHat, color: 'text-amber-400' },
  'Pets': { icon: Cat, color: 'text-orange-300' },
  'Business / CRM': { icon: Building, color: 'text-slate-400' },
  'Finance': { icon: Wallet, color: 'text-green-400' },
  'Sports': { icon: Medal, color: 'text-yellow-500' },
  'Fun / Engagement': { icon: PartyPopper, color: 'text-pink-500' },
  'Cars & Vehicles': { icon: CarFront, color: 'text-zinc-400' },
  'Aviation': { icon: PlaneTakeoff, color: 'text-sky-300' },
  'Zodiac': { icon: Moon, color: 'text-violet-300' },
};

export function CategoryTabs({ categories, selectedCategory, onSelect, selectedTier = 'all', onTierSelect }: CategoryTabsProps) {
  const allCategories = [{ category: 'All', icon: '' }, ...categories];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Tier Filters - Glass Blue Style */}
      {onTierSelect && (
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {tierFilters.map((tier) => {
            const Icon = tier.icon;
            const isSelected = selectedTier === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => onTierSelect(tier.id)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300
                  ${isSelected 
                    ? 'bg-gradient-to-br from-sky-500/90 to-cyan-600/90 text-white shadow-lg shadow-cyan-500/30 ring-1 ring-cyan-400/50 backdrop-blur-sm' 
                    : 'bg-sky-950/40 text-sky-200 hover:bg-sky-900/50 hover:text-white border border-sky-700/30 backdrop-blur-md hover:shadow-lg hover:shadow-sky-900/20'}
                `}
              >
                <Icon size={16} className={isSelected ? 'text-white' : tier.color} />
                {tier.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Category Tabs - Glass Blue Style */}
      <div className="flex w-full overflow-x-auto pb-2 no-scrollbar gap-2">
        {allCategories.map((c) => {
          const categoryConfig = filterCategoryIcons[c.category] || { icon: Globe, color: 'text-sky-300' };
          const CategoryIcon = categoryConfig.icon;
          const isSelected = selectedCategory === c.category;
          
          return (
            <button
              key={c.category}
              onClick={() => onSelect(c.category)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 min-h-[44px]
                ${isSelected 
                  ? 'bg-gradient-to-br from-cyan-500/80 to-sky-600/80 text-white shadow-lg shadow-sky-500/25 ring-1 ring-sky-400/40 backdrop-blur-sm' 
                  : 'bg-sky-950/30 text-sky-200/80 hover:bg-sky-900/40 hover:text-sky-100 border border-sky-800/20 backdrop-blur-md hover:border-sky-600/30'}
              `}
            >
              <CategoryIcon size={16} className={isSelected ? 'text-white' : categoryConfig.color} />
              {c.category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
