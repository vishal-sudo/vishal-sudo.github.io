'use client';

import { usePortfolioStore } from '@/lib/store';
import { useState } from 'react';
import { useScrollAnimation } from '@/lib/hooks';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'containers', label: 'Containers' },
  { id: 'cicd', label: 'CI/CD' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'languages', label: 'Languages' },
  { id: 'other', label: 'Other' },
];

const skillIcons: Record<string, { icon: string; color: string }> = {
  aws: { icon: '☁️', color: 'from-yellow-500 to-orange-500' },
  kubernetes: { icon: '☸️', color: 'from-blue-500 to-blue-700' },
  docker: { icon: '🐳', color: 'from-blue-400 to-blue-600' },
  terraform: { icon: '🏗️', color: 'from-purple-500 to-indigo-600' },
  jenkins: { icon: '🔧', color: 'from-red-500 to-red-700' },
  gitlab: { icon: '🦊', color: 'from-orange-500 to-red-500' },
  prometheus: { icon: '📈', color: 'from-red-500 to-pink-500' },
  grafana: { icon: '📊', color: 'from-pink-500 to-red-400' },
  python: { icon: '🐍', color: 'from-blue-400 to-yellow-400' },
  go: { icon: '🐹', color: 'from-cyan-400 to-blue-500' },
  linux: { icon: '🐧', color: 'from-gray-500 to-gray-700' },
  ansible: { icon: '⚙️', color: 'from-red-400 to-red-600' },
  aws_simple: { icon: '🟠', color: 'from-yellow-500 to-orange-500' },
  cloud: { icon: '☁️', color: 'from-blue-400 to-purple-500' },
  box: { icon: '📦', color: 'from-blue-500 to-indigo-500' },
  gitBranch: { icon: '🌿', color: 'from-green-500 to-emerald-600' },
  gitMerge: { icon: '🔀', color: 'from-orange-500 to-red-500' },
  activity: { icon: '⚡', color: 'from-yellow-500 to-orange-500' },
  barChart: { icon: '📊', color: 'from-pink-500 to-rose-500' },
  code: { icon: '💻', color: 'from-blue-500 to-cyan-400' },
  terminal: { icon: '🖥️', color: 'from-gray-600 to-gray-800' },
  settings: { icon: '⚙️', color: 'from-gray-500 to-gray-700' },
  default: { icon: '🔧', color: 'from-purple-500 to-pink-500' },
};

export default function Skills() {
  const { data } = usePortfolioStore();
  const [filter, setFilter] = useState('all');
  const { ref: skillsRef, isVisible: isSkillsVisible } = useScrollAnimation();

  const filteredSkills = filter === 'all' 
    ? data.skills 
    : data.skills.filter(s => s.category === filter);

  return (
    <section id="skills" className="py-24 px-4">
      <div ref={skillsRef} className="max-w-6xl mx-auto">
        <div className={`flex items-center gap-3 mb-12 transition-all duration-700 ${isSkillsVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-foreground">Skills & Expertise</h2>
          <div className="h-px flex-1 bg-border ml-4" />
        </div>

        <div className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-200 ${isSkillsVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                filter === cat.id
                  ? 'bg-gradient-to-r from-primary to-purple-500 text-white shadow-[0_0_20px_var(--glow-primary)]'
                  : 'bg-card border border-border text-muted-foreground hover:bg-secondary hover:border-primary/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => {
            const iconData = skillIcons[skill.icon] || skillIcons.default;
            return (
              <div
                key={skill.id}
                className={`group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_var(--glow-primary)] hover-lift ${
                  isSkillsVisible ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${iconData.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-125 group-hover:rotate-6 transition-all duration-300`}>
                    {iconData.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-muted-foreground">{skill.experience}+ yrs</div>
                    <div className="text-xs text-primary font-semibold">{skill.proficiency}%</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{skill.name}</h3>
                
                <div className="space-y-2">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 group-hover:scale-x-110 origin-left"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Proficiency</span>
                    <span className="text-primary font-mono">{skill.proficiency}%</span>
                  </div>
                </div>

                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
