'use client';

import { usePortfolioStore } from '@/lib/store';
import { ExternalLink, Calendar, Award, Shield, CheckCircle, Star, Badge, Trophy, Medal } from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks';

const certIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  aws: { icon: <span className="text-2xl">☁️</span>, color: 'from-yellow-500 to-orange-500' },
  azure: { icon: <span className="text-2xl">🔷</span>, color: 'from-blue-500 to-blue-700' },
  gcp: { icon: <span className="text-2xl">🔶</span>, color: 'from-blue-400 to-red-500' },
  kubernetes: { icon: <span className="text-2xl">☸️</span>, color: 'from-blue-500 to-blue-700' },
  docker: { icon: <span className="text-2xl">🐳</span>, color: 'from-blue-400 to-blue-600' },
  terraform: { icon: <span className="text-2xl">🏗️</span>, color: 'from-purple-500 to-indigo-600' },
  default: { icon: <Award size={22} className="text-white" />, color: 'from-yellow-500 to-orange-500' },
  shield: { icon: <Shield size={22} className="text-white" />, color: 'from-green-500 to-emerald-600' },
  check: { icon: <CheckCircle size={22} className="text-white" />, color: 'from-blue-500 to-cyan-500' },
  star: { icon: <Star size={22} className="text-white" />, color: 'from-yellow-500 to-amber-500' },
  badge: { icon: <Badge size={22} className="text-white" />, color: 'from-purple-500 to-pink-500' },
  trophy: { icon: <Trophy size={22} className="text-white" />, color: 'from-amber-500 to-orange-500' },
  medal: { icon: <Medal size={22} className="text-white" />, color: 'from-rose-500 to-red-500' },
};

export default function Certificates() {
  const { data } = usePortfolioStore();
  const { ref: certRef, isVisible: isCertVisible } = useScrollAnimation();

  if (data.site.certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-24 px-4">
      <div ref={certRef} className="max-w-6xl mx-auto">
        <div className={`flex items-center gap-3 mb-12 transition-all duration-700 animate-fadeIn`}>
          <h2 className="text-3xl font-bold text-foreground">Certifications</h2>
          <div className="h-px flex-1 bg-border ml-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.site.certificates.map((cert, index) => {
            const iconData = certIcons[cert.icon] || certIcons.default;
            return (
              <div 
                key={cert.id}
                className="group bg-card border border-border rounded-2xl p-5 hover:border-primary/50 hover:shadow-[0_0_30px_var(--glow-primary)] transition-all duration-300 hover-lift animate-fadeInUp"
                style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${iconData.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {iconData.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {cert.title}
                    </h3>
                    <p className="text-primary text-sm truncate">{cert.issuer}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                  <Calendar size={12} />
                  {cert.date}
                </div>
                
                {cert.url && (
                  <a 
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View Certificate <ExternalLink size={14} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
