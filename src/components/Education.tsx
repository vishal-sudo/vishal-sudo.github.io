'use client';

import { usePortfolioStore } from '@/lib/store';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks';

export default function Education() {
  const { data } = usePortfolioStore();
  const { ref: eduRef, isVisible: isEduVisible } = useScrollAnimation();

  if (data.site.education.length === 0) return null;

  return (
    <section id="education" className="py-24 px-4 bg-card/30">
      <div ref={eduRef} className="max-w-6xl mx-auto">
        <div className={`flex items-center gap-3 mb-12 transition-all duration-700 animate-fadeIn`}>
          <h2 className="text-3xl font-bold text-foreground">Education</h2>
          <div className="h-px flex-1 bg-border ml-4" />
        </div>

        <div className="space-y-6">
          {data.site.education.map((edu, index) => (
            <div 
              key={edu.id}
              className={`group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-[0_0_40px_var(--glow-primary)] transition-all duration-500 hover-lift animate-fadeInUp`}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap size={32} className="text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-primary font-medium mb-2">{edu.institution}</p>
                  <p className="text-muted-foreground text-sm mb-3">{edu.field}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-accent" />
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </span>
                  </div>
                  
                  {edu.description && (
                    <p className="mt-4 text-muted-foreground">{edu.description}</p>
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
