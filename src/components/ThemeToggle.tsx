'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  
  // Use resolvedTheme which handles initial hydration correctly
  const currentTheme = resolvedTheme;
  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-card/80 border border-card-border hover:bg-card hover:border-plum/30 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      {currentTheme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-plum" />
      )}
    </button>
  );
}
