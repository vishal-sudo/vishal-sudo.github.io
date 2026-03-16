'use client';

import { useTheme } from '@/lib/theme';
import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card border border-border"
        aria-label="Loading theme"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card border border-border hover:border-primary hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_var(--glow-primary)] group"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun size={22} className="text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
      ) : (
        <Moon size={22} className="text-purple-600 group-hover:-rotate-180 transition-transform duration-500" />
      )}
    </button>
  );
}
