'use client';

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Terminal } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import { usePortfolioStore } from '@/lib/store';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#resume', label: 'Resume' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { setAdmin } = usePortfolioStore();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0f172a]/95 backdrop-blur shadow-lg shadow-black/20' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
              <Terminal className="text-blue-500" size={24} />
              <span>Vishal</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-blue-500 transition-colors text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
              
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-300 hover:text-blue-500 transition-colors"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <button
                onClick={() => setAdmin(true)}
                className="text-xs text-gray-500 hover:text-gray-300"
              >
                admin
              </button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-300"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-300"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-[#0f172a] border-b border-gray-800">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-gray-300 hover:text-blue-500"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => { setAdmin(true); setIsOpen(false); }}
                className="block py-2 text-gray-500 text-sm"
              >
                admin
              </button>
            </div>
          </div>
        )}
      </nav>

      <main>
        {children}
      </main>
    </div>
  );
}
