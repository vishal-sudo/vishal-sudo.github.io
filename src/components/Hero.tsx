'use client';

import { usePortfolioStore } from '@/lib/store';
import { Terminal, ChevronRight, Github, Linkedin, Mail, Twitter, Check, Download } from 'lucide-react';
import { useState } from 'react';
import { useScrollAnimation, useTypingEffect } from '@/lib/hooks';

export default function Hero() {
  const { data } = usePortfolioStore();
  const [showCopied, setShowCopied] = useState(false);
  const { ref: heroRef, isVisible: isHeroVisible } = useScrollAnimation();
  
  const commands = [
    '> kubectl get pods',
    '> docker-compose up -d',
    '> terraform apply --auto-approve',
    '> ./deploy.sh production',
  ];

  const typedName = useTypingEffect(data.site.name, 80);
  const typedRole = useTypingEffect(data.site.role, 60);

  const copyEmail = () => {
    navigator.clipboard.writeText(data.social.email);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-20">
      <div className="absolute inset-0 bg-grid bg-radial" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className={`space-y-6 transition-all duration-1000 ${isHeroVisible ? 'animate-fadeInLeft' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 text-primary font-mono text-sm">
            <Terminal size={16} />
            <span>~/portfolio</span>
            <span className="text-muted-foreground">$</span>
            <span className="text-accent">echo $ROLE</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold min-h-[1.2em]">
            <span className="text-foreground">Hi, I'm </span>
            <span className="gradient-text">
              {typedName}
              <span className="animate-blink-caret">&nbsp;</span>
            </span>
          </h1>
          
          <p className="text-2xl lg:text-3xl text-muted-foreground font-light min-h-[1.5em]">
            {typedRole}
            {typedRole !== data.site.role && <span className="animate-blink-caret">|</span>}
          </p>
          
          <p className="text-muted-foreground max-w-lg leading-relaxed">
            {data.site.heroSubtext}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 animate-pulse-glow"
            >
              View Projects
              <ChevronRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg hover:border-primary hover:text-primary transition-all hover-lift"
            >
              Contact Me
            </a>
            {data.social.cv && (
              <button
                onClick={() => window.open(data.social.cv, '_blank')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-accent/50 text-accent rounded-lg hover:bg-accent/10 transition-all hover-lift"
              >
                <Download size={18} />
                Download CV
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 pt-4">
            {data.social.github && (
              <a href={data.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-125 hover:rotate-6">
                <Github size={24} />
              </a>
            )}
            {data.social.linkedin && (
              <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-125 hover:-rotate-6">
                <Linkedin size={24} />
              </a>
            )}
            {data.social.twitter && (
              <a href={data.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:scale-125">
                <Twitter size={24} />
              </a>
            )}
            <button onClick={copyEmail} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 hover:scale-110">
              {showCopied ? <Check size={24} className="text-green-500" /> : <Mail size={24} />}
              <span className="text-sm font-mono">{data.social.email}</span>
            </button>
          </div>
        </div>

        {data.site.showAvatar && data.site.avatar && (
          <div className={`transition-all duration-1000 delay-300 ${isHeroVisible ? 'animate-fadeInRight' : 'opacity-0'}`}>
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-primary to-purple-600 p-1 animate-float">
                <img 
                  src={data.site.avatar} 
                  alt={data.site.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-purple-600 blur-xl opacity-30 animate-pulse" />
            </div>
          </div>
        )}

        {!data.site.showAvatar && (
          <div className={`transition-all duration-1000 delay-300 ${isHeroVisible ? 'animate-fadeInRight' : 'opacity-0'}`}>
            <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden shadow-2xl shadow-primary/10 hover-glow">
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-xs text-muted-foreground font-mono">terminal</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-3">
                {commands.map((cmd, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-muted-foreground/50">{(i + 1).toString().padStart(3, ' ')}</span>
                    <div className="flex-1">
                      <div className="text-accent">{cmd}</div>
                      {i === 0 && (
                        <div className="text-muted-foreground mt-1 ml-4">
                          pod/webapp Running<br/>
                          pod/api Running<br/>
                          pod/worker Running
                        </div>
                      )}
                      {i === 1 && (
                        <div className="text-muted-foreground mt-1 ml-4">
                          Starting services... Done!
                        </div>
                      )}
                      {i === 2 && (
                        <div className="text-muted-foreground mt-1 ml-4">
                          Apply complete! Resources: 5 created
                        </div>
                      )}
                      {i === 3 && (
                        <div className="text-primary mt-1 ml-4 flex items-center gap-2">
                          ✓ Deployed successfully!
                          <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
