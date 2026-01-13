'use client';

import { useEffect, useState } from 'react';

type Section = {
  id: string;
  label: string;
};

interface ScrollProgressProps {
  sections: Section[];
  hidden?: boolean;
}

export function ScrollProgress({ sections, hidden = false }: ScrollProgressProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!sections.length) return;

    const handleScroll = () => {
      let current = sections[0].id;
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.35) {
          current = section.id;
        }
      });

      setActiveId(current);
      const currentIndex = Math.max(
        sections.findIndex((section) => section.id === current),
        0
      );
      const maxIndex = Math.max(sections.length - 1, 1);
      setProgress(currentIndex / maxIndex);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sections]);

  // Don't render if hidden
  if (hidden) return null;

  return (
    <aside className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
      <div className="relative pl-6 group">
        <div className="absolute left-2 top-1 bottom-1 w-px bg-card-border" />
        <div
          className="absolute left-2 top-1 w-px bg-emerald-400/80 transition-all duration-200"
          style={{ height: `${progress * 100}%` }}
        />
        <ul className="space-y-4">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id} className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full transition-colors ${
                    isActive ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'bg-muted'
                  }`}
                />
                <a
                  href={`#${section.id}`}
                  className={`text-xs uppercase tracking-[0.2em] transition-colors opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto ${
                    isActive ? 'text-foreground' : 'text-muted group-hover:text-foreground'
                  }`}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
