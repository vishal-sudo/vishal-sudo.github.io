'use client';

import { usePortfolioStore } from '@/lib/store';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const { data } = usePortfolioStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {data.site.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            {data.social.github && (
              <a href={data.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github size={20} />
              </a>
            )}
            {data.social.linkedin && (
              <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin size={20} />
              </a>
            )}
            {data.social.twitter && (
              <a href={data.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={20} />
              </a>
            )}
            <a href={`mailto:${data.social.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail size={20} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowUp size={16} />
            <span className="font-mono text-sm">Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
