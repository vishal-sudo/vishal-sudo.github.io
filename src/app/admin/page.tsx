'use client';

import { usePortfolioStore } from '@/lib/store';
import { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Terminal, LayoutDashboard, Code, Film, Briefcase, Settings, 
  ChevronLeft, ChevronRight, Plus, Trash2, Edit2, Save, X,
  Download, Upload, RotateCcw, User, MapPin, Award, GraduationCap, BookOpen
} from 'lucide-react';
import IconPicker from '@/components/IconPicker';
import ImageUpload from '@/components/ImageUpload';
import ThemeToggle from '@/components/ThemeToggle';

type Tab = 'dashboard' | 'profile' | 'skills' | 'projects' | 'videos' | 'experience' | 'certificates' | 'education' | 'training' | 'settings';

function AdminContent() {
  const { data, isAdmin, setAdmin, updateSite, updateSocial,
    addSkill, updateSkill, deleteSkill,
    addProject, updateProject, deleteProject,
    addVideo, updateVideo, deleteVideo,
    addExperience, updateExperience, deleteExperience,
    addCertificate, updateCertificate, deleteCertificate,
    addEducation, updateEducation, deleteEducation,
    addTraining, updateTraining, deleteTraining,
    exportData, importData, resetData } = usePortfolioStore();

  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

  useEffect(() => {
    const stored = sessionStorage.getItem('admin-auth');
    if (stored === 'authenticated') {
      setIsAuthenticated(true);
    }
    setAdmin(true);
  }, [setAdmin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin-auth', 'authenticated');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-card border border-border p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Terminal className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-muted-foreground mt-2">Enter password to access admin panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground"
              />
              {authError && <p className="text-red-500 text-sm mt-2">{authError}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'videos', label: 'Videos', icon: Film },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'training', label: 'Training', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleExport = () => {
    const json = exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    a.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        importData(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Skills', value: data.skills.length, color: 'text-red-500' },
                { label: 'Projects', value: data.projects.length, color: 'text-amber-500' },
                { label: 'Videos', value: data.videos.length, color: 'text-purple-500' },
                { label: 'Experience', value: data.experience.length, color: 'text-blue-500' },
              ].map((stat) => (
                <div key={stat.label} className=" border border-gray-800 rounded-xl p-6">
                  <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className=" border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setActiveTab('profile')} className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors">
                  Edit Profile
                </button>
                <button onClick={() => setActiveTab('skills')} className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors">
                  Add Skill
                </button>
                <button onClick={() => setActiveTab('projects')} className="px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20 transition-colors">
                  Add Project
                </button>
                <button onClick={() => setActiveTab('experience')} className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors">
                  Add Experience
                </button>
              </div>
            </div>

            <div className=" border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Data Management</h3>
              <div className="flex flex-wrap gap-3">
                <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/50 transition-colors">
                  <Download size={16} /> Export Data
                </button>
                <label className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                  <Upload size={16} /> Import Data
                  <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                </label>
                <button onClick={resetData} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors">
                  <RotateCcw size={16} /> Reset to Default
                </button>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className=" border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                <User size={20} /> Profile Information
              </h3>
              <div className="space-y-4">
                <ImageUpload
                  value={data.site.avatar}
                  onChange={(val) => updateSite({ avatar: val })}
                  label="Profile Photo"
                />
                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div>
                    <div className="text-foreground font-medium">Show Profile Image in Hero</div>
                    <div className="text-muted-foreground text-sm">Toggle to display profile image instead of terminal</div>
                  </div>
                  <button
                    onClick={() => updateSite({ showAvatar: !data.site.showAvatar })}
                    className={`w-14 h-8 rounded-full transition-colors ${data.site.showAvatar ? 'bg-green-500' : ''}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full transition-transform ${data.site.showAvatar ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={data.site.name}
                    onChange={(e) => updateSite({ name: e.target.value })}
                    className="w-full px-4 py-3  border border-border rounded-lg text-foreground"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Job Title / Role</label>
                  <input 
                    type="text" 
                    value={data.site.role}
                    onChange={(e) => updateSite({ role: e.target.value })}
                    className="w-full px-4 py-3  border border-border rounded-lg text-foreground"
                    placeholder="DevOps Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Hero Subtext (below job title)</label>
                  <textarea 
                    value={data.site.heroSubtext}
                    onChange={(e) => updateSite({ heroSubtext: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3  border border-border rounded-lg text-foreground resize-none"
                    placeholder="A brief description about yourself..."
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Bio (About Me)</label>
                  <textarea 
                    value={data.site.bio}
                    onChange={(e) => updateSite({ bio: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3  border border-border rounded-lg text-foreground resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className=" border border-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Focus Areas</h3>
                    <button
                      onClick={() => {
                        const newAreas = [...data.site.focusAreas, { icon: 'cloud', title: '', text: '' }];
                        updateSite({ focusAreas: newAreas });
                      }}
                      className="flex items-center gap-1 px-3 py-1 bg-primary text-foreground rounded-lg text-sm hover:bg-primary/80"
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>
                  <div className="space-y-4">
                    {data.site.focusAreas.map((area, index) => (
                      <div key={index} className="p-4 bg-secondary rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">Area {index + 1}</span>
                          <button
                            onClick={() => {
                              const newAreas = data.site.focusAreas.filter((_, i) => i !== index);
                              updateSite({ focusAreas: newAreas });
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <select
                          value={area.icon}
                          onChange={(e) => {
                            const newAreas = [...data.site.focusAreas];
                            newAreas[index] = { ...newAreas[index], icon: e.target.value };
                            updateSite({ focusAreas: newAreas });
                          }}
                          className="w-full px-3 py-2  border border-gray-600 rounded-lg text-foreground"
                        >
                          <option value="cloud">☁️ Cloud Architecture</option>
                          <option value="git">🌿 CI/CD Automation</option>
                          <option value="container">📦 Container Orchestration</option>
                          <option value="monitor">📊 Monitoring & Observability</option>
                          <option value="security">🔒 Security</option>
                          <option value="code">💻 Infrastructure as Code</option>
                          <option value="aws">☁️ AWS</option>
                          <option value="azure">🔷 Azure</option>
                          <option value="gcp">🔶 GCP</option>
                          <option value="kubernetes">☸️ Kubernetes</option>
                          <option value="docker">🐳 Docker</option>
                          <option value="terraform">🏗️ Terraform</option>
                        </select>
                        <input 
                          type="text" 
                          value={area.text}
                          onChange={(e) => {
                            const newAreas = [...data.site.focusAreas];
                            newAreas[index] = { ...newAreas[index], text: e.target.value };
                            updateSite({ focusAreas: newAreas });
                          }}
                          className="w-full px-3 py-2  border border-gray-600 rounded-lg text-foreground"
                          placeholder="Description"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className=" border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">About CTA Section</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Title</label>
                      <input 
                        type="text" 
                        value={data.site.aboutCTATitle}
                        onChange={(e) => updateSite({ aboutCTATitle: e.target.value })}
                        className="w-full px-4 py-3  border border-border rounded-lg text-foreground"
                        placeholder="Let's Build Together"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Description</label>
                      <textarea 
                        value={data.site.aboutCTAText}
                        onChange={(e) => updateSite({ aboutCTAText: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3  border border-border rounded-lg text-foreground resize-none"
                        placeholder="Your message..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

              <div className=" border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">About Section Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Years of Experience</label>
                  <input 
                    type="number" 
                    value={data.site.aboutStats.yearsExperience}
                    onChange={(e) => updateSite({ aboutStats: { ...data.site.aboutStats, yearsExperience: Number(e.target.value) } })}
                    className="w-full px-4 py-3  border border-border rounded-lg text-foreground"
                    placeholder="6"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Projects Delivered</label>
                  <input 
                    type="number" 
                    value={data.site.aboutStats.projectsDelivered}
                    onChange={(e) => updateSite({ aboutStats: { ...data.site.aboutStats, projectsDelivered: Number(e.target.value) } })}
                    className="w-full px-4 py-3  border border-border rounded-lg text-foreground"
                    placeholder="50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Certifications</label>
                  <input 
                    type="number" 
                    value={data.site.aboutStats.certifications}
                    onChange={(e) => updateSite({ aboutStats: { ...data.site.aboutStats, certifications: Number(e.target.value) } })}
                    className="w-full px-4 py-3  border border-border rounded-lg text-foreground"
                    placeholder="8"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Cloud Platforms</label>
                  <input 
                    type="number" 
                    value={data.site.aboutStats.cloudPlatforms}
                    onChange={(e) => updateSite({ aboutStats: { ...data.site.aboutStats, cloudPlatforms: Number(e.target.value) } })}
                    className="w-full px-4 py-3  border border-border rounded-lg text-foreground"
                    placeholder="3"
                  />
                </div>
              </div>
            </div>

            <div className=" border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Section Visibility</h3>
              <div className="space-y-3">
                {['about', 'experience', 'skills', 'projects', 'videos', 'certificates', 'education', 'training', 'contact'].map((section) => (
                  <div key={section} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div className="text-foreground font-medium capitalize">{section}</div>
                    <button
                      onClick={() => updateSite({ 
                        sections: { ...data.site.sections, [section]: !data.site.sections[section as keyof typeof data.site.sections] }
                      })}
                      className={`w-14 h-8 rounded-full transition-colors ${data.site.sections[section as keyof typeof data.site.sections] ? 'bg-green-500' : ''}`}
                    >
                      <div className={`w-6 h-6 bg-white rounded-full transition-transform ${data.site.sections[section as keyof typeof data.site.sections] ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className=" border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">CV / Resume Upload</h3>
              <div>
                <div 
                  className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                  onClick={() => document.getElementById('cv-upload')?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file && file.type === 'application/pdf') {
                      const url = URL.createObjectURL(file);
                      updateSocial({ cv: url });
                    }
                  }}
                >
                  <input 
                    id="cv-upload"
                    type="file" 
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        updateSocial({ cv: url });
                      }
                    }}
                  />
                  <Upload className="mx-auto mb-2 text-muted-foreground" size={32} />
                  <p className="text-muted-foreground">Click to upload or drag and drop PDF</p>
                  <p className="text-muted-foreground text-xs mt-2">Max file size: 10MB</p>
                </div>
                {data.social.cv && (
                  <div className="mt-4 p-3 bg-secondary rounded-lg flex items-center justify-between">
                    <span className="text-green-400 text-sm">CV uploaded successfully</span>
                    <button 
                      onClick={() => updateSocial({ cv: '' })}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                <p className="text-muted-foreground text-xs mt-2">
                  Or paste a URL: <input 
                    type="url" 
                    value={data.social.cv}
                    onChange={(e) => updateSocial({ cv: e.target.value })}
                    className="mt-2 w-full px-3 py-2  border border-border rounded-lg text-foreground text-sm"
                    placeholder="https://example.com/cv.pdf"
                  />
                </p>
              </div>
            </div>

            <div className=" border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Social Links</h3>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">GitHub Profile URL</label>
                  <input 
                    type="url" 
                    value={data.social.github}
                    onChange={(e) => updateSocial({ github: e.target.value })}
                    className="w-full px-4 py-3  border border-border rounded-lg text-foreground"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">LinkedIn Profile URL</label>
                  <input 
                    type="url" 
                    value={data.social.linkedin}
                    onChange={(e) => updateSocial({ linkedin: e.target.value })}
                    className="w-full px-4 py-3  border border-border rounded-lg text-foreground"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Twitter/X Profile URL</label>
                  <input 
                    type="url" 
                    value={data.social.twitter}
                    onChange={(e) => updateSocial({ twitter: e.target.value })}
                    className="w-full px-4 py-3  border border-border rounded-lg text-foreground"
                    placeholder="https://twitter.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={data.social.email}
                    onChange={(e) => updateSocial({ email: e.target.value })}
                    className="w-full px-4 py-3  border border-border rounded-lg text-foreground"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">CV/Resume URL (PDF)</label>
                  <input 
                    type="url" 
                    value={data.social.cv}
                    onChange={(e) => updateSocial({ cv: e.target.value })}
                    className="w-full px-4 py-3  border border-border rounded-lg text-foreground"
                    placeholder="https://example.com/cv.pdf"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Skills</h2>
              <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-foreground rounded-lg hover:bg-red-400">
                <Plus size={16} /> Add Skill
              </button>
            </div>
            
            {isAdding && <SkillForm onClose={() => setIsAdding(false)} />}
            
            {editingId && (
              <SkillForm 
                skill={data.skills.find(s => s.id === editingId)} 
                onClose={() => setEditingId(null)} 
              />
            )}
            
            <div className="grid gap-3">
              {data.skills.map((skill) => (
                <div key={skill.id} className=" border border-gray-800 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{getIconEmoji(skill.icon)}</span>
                    <div>
                      <div className="font-medium text-foreground">{skill.name}</div>
                      <div className="text-sm text-muted-foreground">{skill.category} • {skill.experience} years • {skill.proficiency}%</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingId(editingId === skill.id ? null : skill.id)} className="p-2 hover:bg-secondary/50 rounded">
                      <Edit2 size={16} className="text-muted-foreground" />
                    </button>
                    <button onClick={() => deleteSkill(skill.id)} className="p-2 hover:bg-secondary/50 rounded">
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Projects</h2>
              <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400">
                <Plus size={16} /> Add Project
              </button>
            </div>

            {isAdding && <ProjectForm onClose={() => setIsAdding(false)} />}
            
            {editingId && (
              <ProjectForm 
                project={data.projects.find(p => p.id === editingId)} 
                onClose={() => setEditingId(null)} 
              />
            )}
            
            <div className="grid md:grid-cols-2 gap-4">
              {data.projects.map((project) => (
                <div key={project.id} className=" border border-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">{project.title}</h3>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingId(editingId === project.id ? null : project.id)} className="p-1 hover:bg-secondary/50 rounded">
                        <Edit2 size={14} className="text-muted-foreground" />
                      </button>
                      <button onClick={() => deleteProject(project.id)} className="p-1 hover:bg-secondary/50 rounded">
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map(t => (
                      <span key={t} className="px-2 py-0.5  text-muted-foreground text-xs rounded">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'videos':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Videos</h2>
              <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-foreground rounded-lg hover:bg-purple-400">
                <Plus size={16} /> Add Video
              </button>
            </div>

            {isAdding && <VideoForm onClose={() => setIsAdding(false)} />}
            
            {editingId && (
              <VideoForm 
                video={data.videos.find(v => v.id === editingId)} 
                onClose={() => setEditingId(null)} 
              />
            )}
            
            <div className="grid md:grid-cols-3 gap-4">
              {data.videos.map((video) => (
                <div key={video.id} className=" border border-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">{video.title}</h3>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingId(editingId === video.id ? null : video.id)} className="p-1 hover:bg-secondary/50 rounded">
                        <Edit2 size={14} className="text-muted-foreground" />
                      </button>
                      <button onClick={() => deleteVideo(video.id)} className="p-1 hover:bg-secondary/50 rounded">
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{video.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Work Experience</h2>
              <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-foreground rounded-lg hover:bg-blue-400">
                <Plus size={16} /> Add Experience
              </button>
            </div>

            {isAdding && <ExperienceForm onClose={() => setIsAdding(false)} />}
            
            {editingId && (
              <ExperienceForm 
                experience={data.experience.find(e => e.id === editingId)} 
                onClose={() => setEditingId(null)} 
              />
            )}
            
            <div className="space-y-3">
              {data.experience.map((exp) => (
                <div key={exp.id} className=" border border-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.role}</h3>
                      <div className="text-sm text-muted-foreground">{exp.company} • {exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                        <MapPin size={12} /> {exp.location}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingId(editingId === exp.id ? null : exp.id)} className="p-1 hover:bg-secondary/50 rounded">
                        <Edit2 size={14} className="text-muted-foreground" />
                      </button>
                      <button onClick={() => deleteExperience(exp.id)} className="p-1 hover:bg-secondary/50 rounded">
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          );

      case 'certificates':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Certificates</h2>
              <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-foreground rounded-lg hover:bg-primary/90">
                <Plus size={16} /> Add Certificate
              </button>
            </div>
            
            {isAdding && <CertificateForm onClose={() => setIsAdding(false)} />}
            
            <div className="grid md:grid-cols-2 gap-4">
              {data.site.certificates.map((cert) => (
                <div key={cert.id} className=" border border-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">{cert.title}</h3>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingId(editingId === cert.id ? null : cert.id)} className="p-1 hover:bg-secondary/50 rounded">
                        <Edit2 size={14} className="text-muted-foreground" />
                      </button>
                      <button onClick={() => deleteCertificate(cert.id)} className="p-1 hover:bg-secondary/50 rounded">
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
              ))}
              {editingId && (
                <CertificateForm 
                  certificate={data.site.certificates.find(c => c.id === editingId)} 
                  onClose={() => setEditingId(null)} 
                />
              )}
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Education</h2>
              <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-foreground rounded-lg hover:bg-primary/90">
                <Plus size={16} /> Add Education
              </button>
            </div>
            
            {isAdding && <EducationForm onClose={() => setIsAdding(false)} />}
            
            <div className="space-y-3">
              {data.site.education.map((edu) => (
                <div key={edu.id} className=" border border-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                      <div className="text-sm text-muted-foreground">{edu.institution} • {edu.startDate} - {edu.current ? 'Present' : edu.endDate}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingId(editingId === edu.id ? null : edu.id)} className="p-1 hover:bg-secondary/50 rounded">
                        <Edit2 size={14} className="text-muted-foreground" />
                      </button>
                      <button onClick={() => deleteEducation(edu.id)} className="p-1 hover:bg-secondary/50 rounded">
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {editingId && (
                <EducationForm 
                  education={data.site.education.find(e => e.id === editingId)} 
                  onClose={() => setEditingId(null)} 
                />
              )}
            </div>
          </div>
        );

      case 'training':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Training & Workshops</h2>
              <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-foreground rounded-lg hover:bg-primary/90">
                <Plus size={16} /> Add Training
              </button>
            </div>
            
            {isAdding && <TrainingForm onClose={() => setIsAdding(false)} />}
            
            <div className="grid md:grid-cols-2 gap-4">
              {data.site.training.map((train) => (
                <div key={train.id} className=" border border-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">{train.title}</h3>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingId(editingId === train.id ? null : train.id)} className="p-1 hover:bg-secondary/50 rounded">
                        <Edit2 size={14} className="text-muted-foreground" />
                      </button>
                      <button onClick={() => deleteTraining(train.id)} className="p-1 hover:bg-secondary/50 rounded">
                        <Trash2 size={14} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{train.provider} • {train.date}</p>
                </div>
              ))}
              {editingId && (
                <TrainingForm 
                  training={data.site.training.find(t => t.id === editingId)} 
                  onClose={() => setEditingId(null)} 
                />
              )}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className=" border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Site Settings</h3>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Website Title</label>
                  <input 
                    type="text" 
                    value={data.site.siteTitle}
                    onChange={(e) => updateSite({ siteTitle: e.target.value })}
            className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
            required
          />
        </div>
        <div>
                  <label className="block text-sm text-muted-foreground mb-1">Upload Custom Logo Image</label>
                  <div 
                    className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file && file.type.startsWith('image/')) {
                        const url = URL.createObjectURL(file);
                        updateSite({ logoImage: url });
                      }
                    }}
                  >
                    <input 
                      id="logo-upload"
                      type="file" 
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          updateSite({ logoImage: url });
                        }
                      }}
                    />
                    {data.site.logoImage ? (
                      <div className="flex items-center justify-between">
                        <img src={data.site.logoImage} alt="Logo" className="h-8 w-auto" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); updateSite({ logoImage: '' }); }}
                          className="text-red-400 hover:text-red-300 ml-2"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">Click or drag image here</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Logo Text (shown in header)</label>
                  <input 
                    type="text" 
                    value={data.site.logo}
                    onChange={(e) => updateSite({ logo: e.target.value })}
                    className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
                    placeholder="~/portfolio"
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen admin-bg admin-text flex">
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} admin-card border-r admin-border transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b admin-border">
          {!sidebarCollapsed && (
            <Link href="/" className="flex items-center gap-2 admin-text font-mono">
              <Terminal className="text-red-500" size={20} />
              <span className="text-red-500">Admin</span>
            </Link>
          )}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1 admin-hover rounded admin-text-muted">
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="p-2 space-y-1 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as Tab); setEditingId(null); setIsAdding(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === tab.id ? 'bg-red-500/10 text-red-500' : 'admin-text-muted admin-hover'
              }`}
            >
              <tab.icon size={18} />
              {!sidebarCollapsed && <span>{tab.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-2">
          <Link href="/" onClick={() => setAdmin(false)} className="flex items-center gap-3 px-3 py-2 admin-text-muted admin-hover rounded-lg">
            <ChevronLeft size={18} />
            {!sidebarCollapsed && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="text-muted-foreground text-sm mr-2 py-2">Quick Actions:</span>
            <button onClick={() => { setActiveTab('skills'); setIsAdding(true); }} className="px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-sm hover:bg-primary/30 transition-colors">+ Skill</button>
            <button onClick={() => { setActiveTab('projects'); setIsAdding(true); }} className="px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-sm hover:bg-primary/30 transition-colors">+ Project</button>
            <button onClick={() => { setActiveTab('experience'); setIsAdding(true); }} className="px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-sm hover:bg-primary/30 transition-colors">+ Experience</button>
            <button onClick={() => { setActiveTab('certificates'); setIsAdding(true); }} className="px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-sm hover:bg-primary/30 transition-colors">+ Certificate</button>
            <button onClick={() => { setActiveTab('education'); setIsAdding(true); }} className="px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-sm hover:bg-primary/30 transition-colors">+ Education</button>
            <button onClick={() => { setActiveTab('training'); setIsAdding(true); }} className="px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-sm hover:bg-primary/30 transition-colors">+ Training</button>
            <button onClick={() => { setActiveTab('videos'); setIsAdding(true); }} className="px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-sm hover:bg-primary/30 transition-colors">+ Video</button>
            <button onClick={() => resetData()} className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors">Reset All</button>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function getIconEmoji(iconName: string): string {
  const icons: Record<string, string> = {
    aws: '☁️', docker: '🐳', kubernetes: '☸️', terraform: '🏗️', jenkins: '🔧',
    gitlab: '🦊', prometheus: '📈', grafana: '📊', python: '🐍', go: '🐹',
    linux: '🐧', ansible: '⚙️', cloud: '☁️', box: '📦', code: '💻', terminal: '🖥️',
    default: '🔧'
  };
  return icons[iconName] || icons.default;
}

function SkillForm({ skill, onClose }: { skill?: any; onClose: () => void }) {
  const { addSkill, updateSkill } = usePortfolioStore();
  const [form, setForm] = useState({
    name: skill?.name || '',
    icon: skill?.icon || 'default',
    category: skill?.category || 'other',
    experience: skill?.experience || 1,
    proficiency: skill?.proficiency || 50,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skill) {
      updateSkill(skill.id, form);
    } else {
      addSkill(form);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className=" border border-gray-800 rounded-lg p-4 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Skill Name</label>
          <input
            type="text"
            placeholder="e.g., Kubernetes, AWS, Docker"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
          >
            <option value="cloud">Cloud</option>
            <option value="containers">Containers</option>
            <option value="cicd">CI/CD</option>
            <option value="monitoring">Monitoring</option>
            <option value="languages">Languages</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <IconPicker value={form.icon} onChange={(val) => setForm({ ...form, icon: val })} />
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Years of Experience</label>
          <input
            type="number"
            placeholder="e.g., 3"
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: parseInt(e.target.value) })}
            className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Proficiency (%)</label>
          <input
            type="number"
            placeholder="e.g., 85"
            value={form.proficiency}
            onChange={(e) => setForm({ ...form, proficiency: parseInt(e.target.value) })}
            className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
            min="0"
            max="100"
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-red-500 text-foreground rounded-lg hover:bg-red-400">
          <Save size={16} /> Save
        </button>
        <button type="button" onClick={onClose} className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/50">
          <X size={16} /> Cancel
        </button>
      </div>
    </form>
  );
}

function ProjectForm({ project, onClose }: { project?: any; onClose: () => void }) {
  const { addProject, updateProject } = usePortfolioStore();
  const [form, setForm] = useState({
    title: project?.title || '',
    slug: project?.slug || '',
    description: project?.description || '',
    fullDescription: project?.fullDescription || '',
    thumbnail: project?.thumbnail || '',
    techStack: project?.techStack?.join(', ') || '',
    githubUrl: project?.githubUrl || '',
    liveUrl: project?.liveUrl || '',
    featured: project?.featured || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      techStack: form.techStack.split(',').map((t: string) => t.trim()).filter(Boolean),
      images: project?.images || [],
    };
    if (project) {
      updateProject(project.id, data);
    } else {
      addProject(data);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className=" border border-gray-800 rounded-lg p-4 space-y-4 md:col-span-2">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Project Title</label>
          <input
            type="text"
            placeholder="e.g., CI/CD Pipeline"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
            className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
            required
          />
        </div>
        <div>
          <ImageUpload
            value={form.thumbnail}
            onChange={(val) => setForm({ ...form, thumbnail: val })}
            label="Thumbnail Image"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Short Description</label>
        <textarea
          placeholder="Brief description shown in the card"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
          rows={2}
        />
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Full Description (with Markdown)</label>
        <textarea
          placeholder="## Overview&#10;Your detailed description here..."
          value={form.fullDescription}
          onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
          className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
          rows={6}
        />
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Tech Stack (comma separated)</label>
        <input
          type="text"
          placeholder="e.g., Kubernetes, Docker, AWS, Terraform"
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">GitHub URL</label>
          <input
            type="url"
            placeholder="https://github.com/username/project"
            value={form.githubUrl}
            onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Live Demo URL</label>
          <input
            type="url"
            placeholder="https://your-project.com"
            value={form.liveUrl}
            onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
            className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
          />
        </div>
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          className="w-4 h-4"
        />
        <span className="text-sm text-muted-foreground">Featured project (show on top)</span>
      </label>
      <div className="flex gap-2">
        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black rounded-lg hover:bg-amber-400">
          <Save size={16} /> Save
        </button>
        <button type="button" onClick={onClose} className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/50">
          <X size={16} /> Cancel
        </button>
      </div>
    </form>
  );
}

function VideoForm({ video, onClose }: { video?: any; onClose: () => void }) {
  const { addVideo, updateVideo } = usePortfolioStore();
  const [form, setForm] = useState({
    title: video?.title || '',
    description: video?.description || '',
    thumbnail: video?.thumbnail || '',
    videoUrl: video?.videoUrl || '',
    duration: video?.duration || 60,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (video) {
      updateVideo(video.id, form);
    } else {
      addVideo(form);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className=" border border-gray-800 rounded-lg p-4 space-y-4 md:col-span-3">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Video Title</label>
          <input
            type="text"
            placeholder="e.g., My DevOps Journey"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Duration (seconds)</label>
          <input
            type="number"
            placeholder="e.g., 300"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) })}
            className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Description</label>
        <textarea
          placeholder="What is this video about?"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
          rows={2}
        />
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Thumbnail URL</label>
        <input
          type="url"
          placeholder="https://example.com/thumbnail.jpg"
          value={form.thumbnail}
          onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
          className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
        />
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Video Embed URL (YouTube)</label>
        <input
          type="url"
          placeholder="https://www.youtube.com/embed/VIDEO_ID"
          value={form.videoUrl}
          onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
          className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-foreground rounded-lg hover:bg-purple-400">
          <Save size={16} /> Save
        </button>
        <button type="button" onClick={onClose} className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/50">
          <X size={16} /> Cancel
        </button>
      </div>
    </form>
  );
}

function ExperienceForm({ experience, onClose }: { experience?: any; onClose: () => void }) {
  const { addExperience, updateExperience } = usePortfolioStore();
  const [form, setForm] = useState({
    company: experience?.company || '',
    companyLogo: experience?.companyLogo || '',
    icon: experience?.icon || 'briefcase',
    role: experience?.role || '',
    startDate: experience?.startDate || '',
    endDate: experience?.endDate || '',
    current: experience?.current || false,
    location: experience?.location || '',
    description: experience?.description || '',
    highlights: experience?.highlights?.join('\n') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      highlights: form.highlights.split('\n').filter(Boolean),
    };
    if (experience) {
      updateExperience(experience.id, data);
    } else {
      addExperience(data);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className=" border border-gray-800 rounded-lg p-4 space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Company Name</label>
          <input
            type="text"
            placeholder="e.g., Google, Amazon"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Icon</label>
          <select
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
          >
            <option value="briefcase">💼 Briefcase</option>
            <option value="code">💻 Code</option>
            <option value="cloud">☁️ Cloud</option>
            <option value="server">🖧 Server</option>
            <option value="settings">⚙️ Settings</option>
            <option value="rocket">🚀 Rocket</option>
            <option value="terminal">🖥️ Terminal</option>
            <option value="award">🏆 Award</option>
            <option value="building">🏢 Building</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Job Title</label>
          <input
            type="text"
            placeholder="e.g., Senior DevOps Engineer"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Location</label>
        <input
          type="text"
          placeholder="e.g., San Francisco, CA"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
        />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Start Date</label>
          <input
            type="month"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">End Date</label>
          <input
            type="month"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
            disabled={form.current}
          />
        </div>
        <div className="flex items-center pt-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.current}
              onChange={(e) => setForm({ ...form, current: e.target.checked, endDate: e.target.checked ? '' : form.endDate })}
              className="w-4 h-4"
            />
            <span className="text-sm text-muted-foreground">I currently work here</span>
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Description</label>
        <textarea
          placeholder="Brief description of your role..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Key Achievements (one per line)</label>
        <textarea
          placeholder="Reduced deployment time by 70%&#10;Implemented Kubernetes cluster..."
          value={form.highlights}
          onChange={(e) => setForm({ ...form, highlights: e.target.value })}
          className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
          rows={4}
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-foreground rounded-lg hover:bg-blue-400">
          <Save size={16} /> Save
        </button>
        <button type="button" onClick={onClose} className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/50">
          <X size={16} /> Cancel
        </button>
      </div>
    </form>
  );
}

function CertificateForm({ certificate, onClose }: { certificate?: any; onClose: () => void }) {
  const { addCertificate, updateCertificate } = usePortfolioStore();
  const [form, setForm] = useState({
    title: certificate?.title || '',
    issuer: certificate?.issuer || '',
    date: certificate?.date || '',
    url: certificate?.url || '',
    icon: certificate?.icon || 'default',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (certificate) {
      updateCertificate(certificate.id, form);
    } else {
      addCertificate(form);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border-border rounded-lg p-4 space-y-4 md:col-span-2">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Certificate Title</label>
          <input
            type="text"
            placeholder="e.g., AWS Solutions Architect"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 bg-input border-border rounded-lg text-foreground"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Issuing Organization</label>
          <input
            type="text"
            placeholder="e.g., Amazon Web Services"
            value={form.issuer}
            onChange={(e) => setForm({ ...form, issuer: e.target.value })}
            className="w-full px-3 py-2 bg-input border-border rounded-lg text-foreground"
            required
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Date</label>
          <input
            type="month"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full px-3 py-2 bg-input border-border rounded-lg text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Icon</label>
          <select
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
            className="w-full px-3 py-2 bg-input border-border rounded-lg text-foreground"
          >
            <option value="default">🏆 Award (Default)</option>
            <option value="aws">☁️ AWS</option>
            <option value="azure">🔷 Azure</option>
            <option value="gcp">🔶 GCP</option>
            <option value="kubernetes">☸️ Kubernetes</option>
            <option value="docker">🐳 Docker</option>
            <option value="terraform">🏗️ Terraform</option>
            <option value="shield">🛡️ Security</option>
            <option value="check">✅ Check</option>
            <option value="star">⭐ Star</option>
            <option value="badge">🎖️ Badge</option>
            <option value="trophy">🏅 Trophy</option>
            <option value="medal">�奖 Medal</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Certificate URL</label>
        <input
          type="url"
          placeholder="https://..."
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
          className="w-full px-3 py-2 bg-input border-border rounded-lg text-foreground"
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400">
          <Save size={16} /> Save
        </button>
        <button type="button" onClick={onClose} className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/50">
          <X size={16} /> Cancel
        </button>
      </div>
    </form>
  );
}

function EducationForm({ education, onClose }: { education?: any; onClose: () => void }) {
  const { addEducation, updateEducation } = usePortfolioStore();
  const [form, setForm] = useState({
    institution: education?.institution || '',
    degree: education?.degree || '',
    field: education?.field || '',
    startDate: education?.startDate || '',
    endDate: education?.endDate || '',
    current: education?.current || false,
    description: education?.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (education) {
      updateEducation(education.id, form);
    } else {
      addEducation(form);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className=" border border-gray-800 rounded-lg p-4 space-y-4 md:col-span-2">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Institution Name"
          value={form.institution}
          onChange={(e) => setForm({ ...form, institution: e.target.value })}
          className="px-3 py-2  border border-border rounded-lg text-foreground"
          required
        />
        <input
          type="text"
          placeholder="Degree (e.g., Bachelor of Science)"
          value={form.degree}
          onChange={(e) => setForm({ ...form, degree: e.target.value })}
          className="px-3 py-2  border border-border rounded-lg text-foreground"
          required
        />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Field of Study"
          value={form.field}
          onChange={(e) => setForm({ ...form, field: e.target.value })}
          className="px-3 py-2  border border-border rounded-lg text-foreground"
        />
        <input
          type="month"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          className="px-3 py-2  border border-border rounded-lg text-foreground"
          required
        />
        <input
          type="month"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          className="px-3 py-2  border border-border rounded-lg text-foreground"
          disabled={form.current}
        />
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.current}
          onChange={(e) => setForm({ ...form, current: e.target.checked, endDate: e.target.checked ? '' : form.endDate })}
          className="w-4 h-4"
        />
        <span className="text-sm text-muted-foreground">Currently studying here</span>
      </label>
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
        rows={3}
      />
      <div className="flex gap-2">
        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-foreground rounded-lg hover:bg-blue-400">
          <Save size={16} /> Save
        </button>
        <button type="button" onClick={onClose} className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/50">
          <X size={16} /> Cancel
        </button>
      </div>
    </form>
  );
}

function TrainingForm({ training, onClose }: { training?: any; onClose: () => void }) {
  const { addTraining, updateTraining } = usePortfolioStore();
  const [form, setForm] = useState({
    title: training?.title || '',
    provider: training?.provider || '',
    date: training?.date || '',
    duration: training?.duration || '',
    description: training?.description || '',
    url: training?.url || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (training) {
      updateTraining(training.id, form);
    } else {
      addTraining(form);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className=" border border-gray-800 rounded-lg p-4 space-y-4 md:col-span-2">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Training/Workshop Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="px-3 py-2  border border-border rounded-lg text-foreground"
          required
        />
        <input
          type="text"
          placeholder="Provider/Organization"
          value={form.provider}
          onChange={(e) => setForm({ ...form, provider: e.target.value })}
          className="px-3 py-2  border border-border rounded-lg text-foreground"
          required
        />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="month"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="px-3 py-2  border border-border rounded-lg text-foreground"
        />
        <input
          type="text"
          placeholder="Duration (e.g., 2 days)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="px-3 py-2  border border-border rounded-lg text-foreground"
        />
      </div>
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full px-3 py-2  border border-border rounded-lg text-foreground"
        rows={3}
      />
      <div className="flex gap-2">
        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-green-500 text-foreground rounded-lg hover:bg-green-400">
          <Save size={16} /> Save
        </button>
        <button type="button" onClick={onClose} className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/50">
          <X size={16} /> Cancel
        </button>
      </div>
    </form>
  );
}

export default function AdminPanel() {
  return (
    <Suspense fallback={<div className="min-h-screen admin-bg admin-text flex items-center justify-center">Loading...</div>}>
      <AdminContent />
      <ThemeToggle />
    </Suspense>
  );
}
