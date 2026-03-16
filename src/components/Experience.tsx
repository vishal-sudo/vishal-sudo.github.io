'use client';

import { usePortfolioStore } from '@/lib/store';
import { Calendar, MapPin, Briefcase, ChevronRight, Award, Code, Cloud, Server, Settings, Rocket, Terminal, Building } from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks';

const iconMap: Record<string, React.ReactNode> = {
  briefcase: <Briefcase size={28} className="text-white" />,
  code: <Code size={28} className="text-white" />,
  cloud: <Cloud size={28} className="text-white" />,
  server: <Server size={28} className="text-white" />,
  settings: <Settings size={28} className="text-white" />,
  rocket: <Rocket size={28} className="text-white" />,
  terminal: <Terminal size={28} className="text-white" />,
  award: <Award size={28} className="text-white" />,
  building: <Building size={28} className="text-white" />,
};

export default function Experience() {
  const { data } = usePortfolioStore();
  const { ref: expRef, isVisible: isExpVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-24 px-4 bg-card/30">
      <div ref={expRef} className="max-w-6xl mx-auto">
        <div className={`flex items-center gap-3 mb-12 transition-all duration-700 ${isExpVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-foreground">Experience</h2>
          <div className="h-px flex-1 bg-border ml-4" />
        </div>

        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div 
              key={exp.id}
              className={`group relative bg-card/50 border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover-lift hover:shadow-[0_0_40px_var(--glow-primary)] ${
                isExpVisible ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex items-start gap-4 min-w-[200px]">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {iconMap[exp.icon] || iconMap.briefcase}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{exp.role}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-accent" />
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-accent" />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-2">
                      {exp.highlights.map((highlight, i) => (
                        <div 
                          key={i} 
                          className="flex items-start gap-2 text-sm text-muted-foreground bg-secondary/30 rounded-lg p-2"
                        >
                          <Award size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
