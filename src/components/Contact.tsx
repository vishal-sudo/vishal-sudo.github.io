'use client';

import { usePortfolioStore } from '@/lib/store';
import { useState } from 'react';
import { Send, Github, Linkedin, Twitter, Mail, Check } from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks';

export default function Contact() {
  const { data } = usePortfolioStore();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { ref: contactRef, isVisible: isContactVisible } = useScrollAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(data.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 px-4 bg-card/30">
      <div ref={contactRef} className="max-w-6xl mx-auto">
        <div className={`flex items-center gap-3 mb-12 transition-all duration-700 ${isContactVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-foreground">Get In Touch</h2>
          <div className="h-px flex-1 bg-border ml-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className={`transition-all duration-700 delay-200 ${isContactVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <h3 className="text-xl font-semibold text-foreground mb-4">Let's Talk</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
              Feel free to reach out if you have a project that needs some creative touch.
            </p>

            <div className="space-y-4">
              <button 
                onClick={copyEmail}
                className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-[0_0_20px_var(--glow-primary)] transition-all w-full text-left group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  {copied ? <Check className="text-white" size={24} /> : <Mail className="text-white" size={24} />}
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Email</div>
                  <div className="text-foreground font-mono">{data.social.email}</div>
                </div>
              </button>

              <div className="flex gap-4">
                {data.social.github && (
                  <a 
                    href={data.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-[0_0_20px_var(--glow-primary)] transition-all group"
                  >
                    <Github className="text-muted-foreground group-hover:text-primary transition-colors" size={24} />
                    <span className="text-foreground">GitHub</span>
                  </a>
                )}
                {data.social.linkedin && (
                  <a 
                    href={data.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-[0_0_20px_var(--glow-primary)] transition-all group"
                  >
                    <Linkedin className="text-muted-foreground group-hover:text-primary transition-colors" size={24} />
                    <span className="text-foreground">LinkedIn</span>
                  </a>
                )}
                {data.social.twitter && (
                  <a 
                    href={data.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-[0_0_20px_var(--glow-primary)] transition-all group"
                  >
                    <Twitter className="text-muted-foreground group-hover:text-primary transition-colors" size={24} />
                    <span className="text-foreground">Twitter</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className={`bg-card border border-border rounded-2xl p-8 transition-all duration-700 delay-300 ${isContactVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div className="flex items-center gap-2 mb-6 font-mono text-sm">
              <span className="text-accent">$</span>
              <span className="text-muted-foreground">./send_message.sh</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-muted-foreground text-sm mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:border-primary focus:outline-none transition-all focus:shadow-[0_0_10px_var(--glow-primary)]"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-muted-foreground text-sm mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:border-primary focus:outline-none transition-all focus:shadow-[0_0_10px_var(--glow-primary)]"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-muted-foreground text-sm mb-2">Your Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:border-primary focus:outline-none transition-all focus:shadow-[0_0_10px_var(--glow-primary)] resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>
              
              <button
                type="submit"
                disabled={submitted || isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-purple-500 text-white font-semibold rounded-xl hover:shadow-[0_0_30px_var(--glow-primary)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Send size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : submitted ? (
                  <>
                    <Check size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
