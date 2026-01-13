'use client';

import { useState, useMemo, useEffect } from 'react';
import apis from '@/data/apis.json';
import { APICard } from '@/components/APICard';
import { CategoryTabs } from '@/components/CategoryTabs';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { LogoParade } from '@/components/sections/LogoParade';
import { VibeCoding } from '@/components/sections/VibeCoding';
import { FeaturedAPISpotlight } from '@/components/sections/FeaturedAPISpotlight';
import { APIBenefits } from '@/components/sections/APIBenefits';
import { MarketValue } from '@/components/sections/MarketValue';
import { UnlockCTA } from '@/components/sections/UnlockCTA';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Search, Layers, CheckCircle2, Flame, LayoutGrid } from 'lucide-react';

// Type for API items
interface APIItem {
  name: string;
  freeTier: string;
  useCase: string;
  url: string;
  tier?: 'free' | 'generous' | 'credit';
}

const pageSections = [
  { id: 'hero', label: 'Intro' },
  { id: 'logos', label: 'Validation' },
  { id: 'snippets', label: 'CODE' },
  { id: 'vibe', label: 'ai-first dev' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'market', label: 'Market' },
  { id: 'unlock', label: 'Access' },
];

export default function Home() {
  // Always initialize to null to match server render, then hydrate from localStorage
  const [tier, setTier] = useState<'free' | 'pro' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTier, setSelectedTier] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Hydrate tier from localStorage after mount (client-side only)
  useEffect(() => {
    const savedTier = localStorage.getItem('shipfreeapis-tier');
    if (savedTier === 'free' || savedTier === 'pro') {
      setTier(savedTier);
    }
  }, []);

  // Extract unique categories
  const categories = apis.map(group => ({ category: group.category, icon: group.icon }));

  // Calculate stats
  const stats = useMemo(() => {
    const allAPIs = apis.flatMap(group => group.items) as APIItem[];
    return {
      total: allAPIs.length,
      trulyFree: allAPIs.filter(api => api.tier === 'free').length,
      generous: allAPIs.filter(api => api.tier === 'generous' || !api.tier).length,
      credit: allAPIs.filter(api => api.tier === 'credit').length,
      categories: apis.length
    };
  }, []);

  // Filter Logic
  const filteredAPIs = useMemo(() => {
    let result = apis.flatMap(group => 
      group.items.map(item => ({ ...item, category: group.category, icon: group.icon }))
    );

    // Filter by tier
    if (selectedTier !== 'all') {
      result = result.filter(item => (item as APIItem & { category: string; icon: string }).tier === selectedTier);
    }

    // Filter by category  
    if (selectedCategory !== 'All') {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.useCase.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedCategory, selectedTier, searchQuery]);

  return (
    <SmoothScroll>
      <main className="min-h-screen text-foreground selection:bg-plum/30 overflow-x-hidden">
        <ScrollProgress sections={pageSections} hidden={tier !== null} />
        
        {/* Navigation Header */}
        <Navigation />

        {/* LANDING PAGE SECTIONS */}
        <div className="relative z-10">
          {/* Section 1: Hero */}
          <section id="hero" className="scroll-mt-28">
            <Hero />
          </section>
          
          {/* Section 2: Logo Parade */}
          <section id="logos" className="scroll-mt-28">
            <LogoParade />
          </section>
          
          {/* Section 3: Featured API Samples (NEW LEAD MAGNET) */}
          <section id="snippets" className="scroll-mt-28">
            <FeaturedAPISpotlight />
          </section>
          
          {/* Section 4: AI-first development */}
          <section id="vibe" className="scroll-mt-28">
            <VibeCoding />
          </section>

          {/* Section 5: API Benefits */}
          <section id="benefits" className="scroll-mt-28">
            <APIBenefits />
          </section>
          
          {/* Section 6: Market Value Stats */}
          <section id="market" className="scroll-mt-28">
            <MarketValue />
          </section>
          
          {/* Section 7: Unlock CTA */}
          <UnlockCTA isUnlocked={tier !== null} onUnlock={(selectedTier) => setTier(selectedTier)} />
        </div>

        {/* API LIBRARY - Only render when unlocked (fixes blank space) */}
        {tier !== null && (
          <div className="relative z-10 w-full overflow-hidden">
            {/* Moving Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Light Mode: Subtle, flowing aurora-like gradient */}
              <div className="absolute -inset-[50%] opacity-40 animate-[spin_60s_linear_infinite] dark:hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(56,189,248,0.2)_120deg,rgba(168,85,247,0.2)_240deg,transparent_360deg)] blur-3xl" />
              </div>
              
              {/* Dark Mode: Deep, techy glow */}
              <div className="hidden dark:block absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.08),transparent_70%)] animate-pulse" />
              <div className="hidden dark:block absolute inset-0 bg-[url('/images/grid.svg')] opacity-[0.05]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12">
              
              {/* Interactive Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="stats-card group p-6 rounded-2xl bg-card/80 border border-card-border backdrop-blur-xl hover:border-plum/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-plum/20">
                      <Layers className="w-5 h-5 text-plum-light" />
                    </div>
                    <span className="text-xs font-bold tracking-wider text-muted">Total APIs</span>
                  </div>
                  <p className="text-4xl font-bold text-foreground">
                    {stats.total}
                  </p>
                </div>
                
                <div className="stats-card group p-6 rounded-2xl bg-card/80 border border-card-border backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-emerald-500/20">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-xs font-bold tracking-wider text-muted">Truly Free</span>
                  </div>
                  <p className="text-4xl font-bold text-emerald-400">
                    {stats.trulyFree}
                  </p>
                </div>
                
                <div className="stats-card group p-6 rounded-2xl bg-card/80 border border-card-border backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-cyan-500/20">
                      <Flame className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-xs font-bold tracking-wider text-muted">Generous</span>
                  </div>
                  <p className="text-4xl font-bold text-cyan-400">
                    {stats.generous}
                  </p>
                </div>
                
                <div className="stats-card group p-6 rounded-2xl bg-card/80 border border-card-border backdrop-blur-xl hover:border-plum/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-plum/20">
                      <LayoutGrid className="w-5 h-5 text-plum-light" />
                    </div>
                    <span className="text-xs font-bold tracking-wider text-muted">Categories</span>
                  </div>
                  <p className="text-4xl font-bold text-plum-light">
                    {stats.categories}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="sticky top-4 z-40 mb-12 space-y-4">
                <div className="backdrop-blur-2xl bg-card/85 p-4 rounded-2xl border border-card-border shadow-2xl">
                   {/* Search */}
                  <div className="relative w-full md:w-96 group mb-4">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-plum-light transition-colors" size={20} />
                    <input 
                      type="text"
                      placeholder="Search APIs by name, use case..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-card/70 border border-card-border rounded-xl py-3 pl-12 pr-4 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-plum/50 transition-all font-medium min-h-[44px]"
                    />
                  </div>

                  {/* Categories & Tier Filters */}
                  <CategoryTabs 
                    categories={categories} 
                    selectedCategory={selectedCategory} 
                    onSelect={setSelectedCategory}
                    selectedTier={selectedTier}
                    onTierSelect={setSelectedTier}
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-6 flex items-center gap-2 text-muted">
                <span className="text-sm font-medium">
                  Showing <span className="text-plum-light font-bold">{filteredAPIs.length}</span> APIs
                  {selectedTier !== 'all' && (
                    <span> in <span className="text-foreground">{selectedTier === 'free' ? 'Truly Free' : selectedTier === 'generous' ? 'Generous Free' : 'Credit-Based'}</span> tier</span>
                  )}
                  {selectedCategory !== 'All' && (
                    <span> under <span className="text-foreground">{selectedCategory}</span></span>
                  )}
                </span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAPIs.map((api, idx) => (
                  <APICard 
                    key={`${api.name}-${idx}`} 
                    api={api as APIItem & { category: string; icon: string }} 
                    category={api.category} 
                    icon={api.icon} 
                  />
                ))}
              </div>

              {/* Empty State */}
              {filteredAPIs.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                  <div className="mb-4">
                    <Search className="w-16 h-16 mx-auto text-muted/50" />
                  </div>
                  <p className="text-xl mb-2">No APIs found</p>
                  <p className="text-muted">Try adjusting your filters or search query</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setSelectedCategory('All'); setSelectedTier('all')}}
                    className="mt-6 px-6 py-3 bg-plum/20 hover:bg-plum/30 text-plum-light rounded-xl transition-all font-medium min-h-[44px]"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer />
      </main>
    </SmoothScroll>
  );
}
