'use client';

import { usePortfolioStore } from '@/lib/store';
import { MapPin, Calendar, Award, Briefcase, Code, Server, Cloud, GraduationCap, Sparkles, Terminal, Box, Activity, Lock, GitBranch } from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  server: Server,
  cloud: Cloud,
  code: Code,
  graduationcap: GraduationCap,
  sparkles: Sparkles,
  terminal: Terminal,
  container: Box,
  monitor: Activity,
  security: Lock,
  git: GitBranch,
  aws: Cloud,
  kubernetes: Server,
  docker: Box,
  default: Server,
};

export default function About() {
  const { data } = usePortfolioStore();
  const { ref: aboutRef, isVisible: isAboutVisible } = useScrollAnimation();
  
  const stats = [
    { label: 'Years Experience', value: data.site.aboutStats.yearsExperience, icon: Calendar },
    { label: 'Projects Delivered', value: data.site.aboutStats.projectsDelivered, icon: Briefcase },
    { label: 'Certifications', value: data.site.aboutStats.certifications, icon: Award },
    { label: 'Cloud Platforms', value: data.site.aboutStats.cloudPlatforms, icon: Cloud },
  ];

  return (
    <section id="about" className="py-24 px-4 bg-card/30">
      <div ref={aboutRef} className="max-w-6xl mx-auto">
        <div className={`flex items-center gap-3 mb-12 transition-all duration-700 ${isAboutVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-foreground">About Me</h2>
          <div className="h-px flex-1 bg-border ml-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className={`space-y-6 transition-all duration-700 delay-200 ${isAboutVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <div className="prose prose-invert prose-zinc max-w-none">
                {data.site.bio.split('\n\n').map((para, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed text-lg">{para}</p>
                ))}
              </div>
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 transition-all duration-700 delay-300 ${isAboutVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="group bg-card border border-border rounded-xl p-4 text-center hover-lift hover:border-primary/50 hover:shadow-[0_0_30px_var(--glow-primary)] transition-all duration-300"
                >
                  <stat.icon className="mx-auto mb-2 text-primary group-hover:scale-125 transition-transform duration-300" size={24} />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`space-y-6 transition-all duration-700 delay-400 ${isAboutVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h3 className="text-lg font-semibold text-foreground">What I Focus On</h3>
            <div className="space-y-4">
              {data.site.focusAreas.map((area, index) => {
                const IconComponent = iconMap[area.icon] || iconMap.default;
                return (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-[0_0_20px_var(--glow-primary)] transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <span className="text-foreground font-medium">{area.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-xl">
              <p className="text-foreground font-medium mb-2">{data.site.aboutCTATitle}</p>
              <p className="text-muted-foreground text-sm">
                {data.site.aboutCTAText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
