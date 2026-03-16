'use client';

import { usePortfolioStore } from '@/lib/store';
import { useState } from 'react';
import { Play, X, Clock, Video } from 'lucide-react';
import { Video as VideoType } from '@/lib/defaultData';
import { useScrollAnimation } from '@/lib/hooks';

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function VideoCard({ video, onClick }: { video: VideoType; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_40px_var(--glow-accent)] hover-lift"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-18 h-18 bg-accent/90 rounded-full flex items-center justify-center transform transition-all group-hover:scale-125 shadow-[0_0_30px_var(--glow-accent)]">
            <Play className="text-white ml-1" size={32} fill="white" />
          </div>
        </div>
        
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur px-3 py-1.5 rounded-lg text-xs text-white font-mono flex items-center gap-1">
          <Clock size={12} />
          {formatDuration(video.duration)}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
          {video.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
}

function VideoLightbox({ video, onClose }: { video: VideoType; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
        >
          <X className="text-white" size={24} />
        </button>
        
        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_60px_var(--glow-accent)]">
          <iframe
            src={video.videoUrl}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-white">{video.title}</h3>
          <p className="text-gray-300 mt-2">{video.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function VideoSection() {
  const { data } = usePortfolioStore();
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);
  const { ref: videoRef, isVisible: isVideoVisible } = useScrollAnimation();

  if (data.videos.length === 0) return null;

  return (
    <section id="video" className="py-24 px-4">
      <div ref={videoRef} className="max-w-6xl mx-auto">
        <div className={`flex items-center gap-3 mb-12 transition-all duration-700 ${isVideoVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-foreground">Video Portfolio</h2>
          <div className="h-px flex-1 bg-border ml-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.videos.map((video, index) => (
            <div 
              key={video.id}
              className={isVideoVisible ? 'animate-fadeInUp' : 'opacity-0'}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <VideoCard 
                video={video} 
                onClick={() => setSelectedVideo(video)}
              />
            </div>
          ))}
        </div>

        {selectedVideo && (
          <VideoLightbox 
            video={selectedVideo} 
            onClose={() => setSelectedVideo(null)} 
          />
        )}
      </div>
    </section>
  );
}
