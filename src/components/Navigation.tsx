'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Terminal } from 'lucide-react';
import { usePortfolioStore } from '@/lib/store';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data } = usePortfolioStore();
  const sections = data.site.sections;

  const navItems = [
    { href: '#about', label: 'About', show: sections.about !== false && sections.about !== undefined },
    { href: '#experience', label: 'Experience', show: sections.experience !== false && sections.experience !== undefined },
    { href: '#skills', label: 'Skills', show: sections.skills !== false && sections.skills !== undefined },
    { href: '#projects', label: 'Projects', show: sections.projects !== false && sections.projects !== undefined },
    { href: '#video', label: 'Videos', show: sections.videos !== false && sections.videos !== undefined },
    { href: '#certificates', label: 'Certifications', show: sections.certificates !== false && sections.certificates !== undefined },
    { href: '#education', label: 'Education', show: sections.education !== false && sections.education !== undefined },
    { href: '#training', label: 'Training', show: sections.training !== false && sections.training !== undefined },
    { href: '#contact', label: 'Contact', show: sections.contact !== false && sections.contact !== undefined },
  ].filter(item => item.show);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLogoIcon = () => {
    if (data.site.logoImage) {
      return <img src={data.site.logoImage} alt="Logo" className="w-8 h-8 rounded object-cover" />;
    }
    const icons: Record<string, React.ReactNode> = {
      terminal: <Terminal className="text-white" size={20} />,
      code: <span className="text-white font-bold text-lg">{'</>'}</span>,
      cloud: <span className="text-white text-xl">☁️</span>,
      server: <span className="text-white text-xl">🖧</span>,
      cog: <span className="text-white text-xl">⚙️</span>,
      rocket: <span className="text-white text-xl">🚀</span>,
      box: <span className="text-white text-xl">📦</span>,
      cpu: <span className="text-white text-xl">💾</span>,
    };
    return icons[data.site.logoIcon] || icons.terminal;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      scrolled ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-[0_0_30px_rgba(124,58,237,0.1)]' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 text-foreground font-mono group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${data.site.logoImage ? '' : 'bg-gradient-to-br from-primary to-purple-600 group-hover:scale-110 group-hover:shadow-[0_0_20px_var(--glow-primary)]'}`}>
              {getLogoIcon()}
            </div>
            <span className="hidden sm:block text-primary font-semibold">{data.site.logo}</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
