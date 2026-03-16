'use client';

import { usePortfolioStore } from '@/lib/store';
import { useState } from 'react';
import { X, ExternalLink, Github, Maximize2, Star } from 'lucide-react';
import { Project } from '@/lib/defaultData';
import { useScrollAnimation } from '@/lib/hooks';

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_40px_var(--glow-primary)] hover-lift"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 bg-primary px-3 py-1.5 rounded-lg text-xs text-white">
            <Maximize2 size={14} />
            View Details
          </div>
        </div>
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-primary px-2 py-1 rounded text-xs text-white">
            <Star size={12} fill="currentColor" />
            Featured
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span 
              key={tech}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded border border-primary/20"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 bg-secondary text-muted-foreground text-xs rounded">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectPopup({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl max-h-[95vh] bg-card border border-border rounded-2xl overflow-hidden shadow-[0_0_60px_var(--glow-primary)] animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
        >
          <X className="text-white" size={24} />
        </button>
        
        <div className="overflow-y-auto max-h-[95vh]">
          <div className="relative">
            <img 
              src={project.thumbnail} 
              alt={project.title}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
            {project.featured && (
              <div className="absolute top-4 left-4 flex items-center gap-1 bg-primary px-3 py-1.5 rounded-lg text-sm text-white">
                <Star size={14} fill="currentColor" />
                Featured Project
              </div>
            )}
          </div>
          
          <div className="p-8 -mt-20 relative">
            <h2 className="text-3xl font-bold text-foreground mb-4">{project.title}</h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1.5 bg-primary/20 text-primary text-sm rounded-lg border border-primary/30"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none mb-8">
              {project.fullDescription.split('\n\n').map((para, i) => {
                if (para.startsWith('## ')) {
                  return <h3 key={i} className="text-xl font-semibold text-foreground mt-8 mb-4">{para.replace('## ', '')}</h3>;
                }
                if (para.startsWith('- ')) {
                  return (
                    <ul key={i} className="list-disc list-inside space-y-2 text-muted-foreground">
                      {para.split('\n').map((item, j) => (
                        <li key={j}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={i} className="text-muted-foreground leading-relaxed">{para}</p>;
              })}
            </div>
            
            <div className="flex gap-4 pt-4 border-t border-border">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-[0_0_20px_var(--glow-primary)]"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-xl hover:border-primary hover:text-primary transition-all hover:shadow-[0_0_20px_var(--glow-primary)]"
                >
                  <Github size={18} />
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { data } = usePortfolioStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { ref: projRef, isVisible: isProjVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-24 px-4 bg-card/30">
      <div ref={projRef} className="max-w-6xl mx-auto">
        <div className={`flex items-center gap-3 mb-12 transition-all duration-700 ${isProjVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-foreground">Featured Projects</h2>
          <div className="h-px flex-1 bg-border ml-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {data.projects.map((project, index) => (
            <div 
              key={project.id}
              className={isProjVisible ? 'animate-fadeInUp' : 'opacity-0'}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <ProjectCard 
                project={project} 
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>

        {selectedProject && (
          <ProjectPopup 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </div>
    </section>
  );
}
