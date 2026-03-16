'use client';

import { usePortfolioStore } from '@/lib/store';
import { Clock, Calendar, BookOpen } from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks';

export default function Training() {
  const { data } = usePortfolioStore();
  const { ref: trainRef, isVisible: isTrainVisible } = useScrollAnimation();

  if (data.site.training.length === 0) return null;

  return (
    <section id="training" className="py-24 px-4">
      <div ref={trainRef} className="max-w-6xl mx-auto">
        <div className={`flex items-center gap-3 mb-12 transition-all duration-700 animate-fadeIn`}>
          <h2 className="text-3xl font-bold text-foreground">Training & Workshops</h2>
          <div className="h-px flex-1 bg-border ml-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {data.site.training.map((train, index) => (
            <div 
              key={train.id}
              className={`group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-[0_0_40px_var(--glow-primary)] transition-all duration-500 hover-lift animate-fadeInUp`}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen size={28} className="text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {train.title}
                  </h3>
                  <p className="text-primary text-sm mb-2">{train.provider}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-accent" />
                      {train.date}
                    </span>
                    {train.duration && (
                      <span className="flex items-center gap-1">
                        <Clock size={14} className="text-accent" />
                        {train.duration}
                      </span>
                    )}
                  </div>
                  
                  {train.description && (
                    <p className="mt-3 text-muted-foreground text-sm">{train.description}</p>
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
