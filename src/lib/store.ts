'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PortfolioData, Skill, Project, Video, Experience, SiteConfig, Social, Certificate, Education, Training, defaultData } from '@/lib/defaultData';
import userData from '@/lib/userData.json' assert { type: 'json' };

interface PortfolioStore {
  data: PortfolioData;
  isAdmin: boolean;
  setAdmin: (value: boolean) => void;
  updateSite: (site: Partial<SiteConfig>) => void;
  updateSocial: (social: Partial<Social>) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addVideo: (video: Omit<Video, 'id'>) => void;
  updateVideo: (id: string, video: Partial<Video>) => void;
  deleteVideo: (id: string) => void;
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  addCertificate: (cert: Omit<Certificate, 'id'>) => void;
  updateCertificate: (id: string, cert: Partial<Certificate>) => void;
  deleteCertificate: (id: string) => void;
  addEducation: (edu: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  addTraining: (train: Omit<Training, 'id'>) => void;
  updateTraining: (id: string, train: Partial<Training>) => void;
  deleteTraining: (id: string) => void;
  exportData: () => string;
  importData: (json: string) => void;
  resetData: () => void;
}

const data = userData as PortfolioData;

const generateId = () => Math.random().toString(36).substring(2, 15);

const mergeWithDefaults = (stored: Partial<PortfolioData> | undefined): PortfolioData => {
  if (!stored || !stored.site) {
    return defaultData;
  }
  return {
    ...defaultData,
    ...stored,
    site: {
      ...defaultData.site,
      ...stored.site,
      siteTitle: stored.site?.siteTitle || defaultData.site.siteTitle,
      logo: stored.site?.logo || defaultData.site.logo,
      logoIcon: stored.site?.logoIcon || defaultData.site.logoIcon,
      logoImage: stored.site?.logoImage || defaultData.site.logoImage,
      aboutStats: stored.site?.aboutStats ? { ...defaultData.site.aboutStats, ...stored.site.aboutStats } : defaultData.site.aboutStats,
      focusAreas: stored.site?.focusAreas ? stored.site.focusAreas.map(f => ({ icon: f.icon, text: f.text })) : defaultData.site.focusAreas,
      aboutCTATitle: stored.site?.aboutCTATitle || defaultData.site.aboutCTATitle,
      aboutCTAText: stored.site?.aboutCTAText || defaultData.site.aboutCTAText,
      certificates: stored.site?.certificates || defaultData.site.certificates,
      education: stored.site?.education || defaultData.site.education,
      training: stored.site?.training || defaultData.site.training,
      sections: stored.site?.sections ? { ...defaultData.site.sections, ...stored.site.sections } : defaultData.site.sections,
    },
    certificates: stored.certificates || defaultData.certificates,
    education: stored.education || defaultData.education,
    training: stored.training || defaultData.training,
  };
};

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      data: mergeWithDefaults(undefined),
      isAdmin: false,
      setAdmin: (value) => set({ isAdmin: value }),
      
      updateSite: (site) =>
        set((state) => ({
          data: { ...state.data, site: { ...state.data.site, ...site } },
        })),
      
      updateSocial: (social) =>
        set((state) => ({
          data: { ...state.data, social: { ...state.data.social, ...social } },
        })),
      
      addSkill: (skill) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: [...state.data.skills, { ...skill, id: generateId() }],
          },
        })),
      
      updateSkill: (id, skill) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
          },
        })),
      
      deleteSkill: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((s) => s.id !== id),
          },
        })),
      
      addProject: (project) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: [...state.data.projects, { ...project, id: generateId() }],
          },
        })),
      
      updateProject: (id, project) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
          },
        })),
      
      deleteProject: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter((p) => p.id !== id),
          },
        })),
      
      addVideo: (video) =>
        set((state) => ({
          data: {
            ...state.data,
            videos: [...state.data.videos, { ...video, id: generateId() }],
          },
        })),
      
      updateVideo: (id, video) =>
        set((state) => ({
          data: {
            ...state.data,
            videos: state.data.videos.map((v) => (v.id === id ? { ...v, ...video } : v)),
          },
        })),
      
      deleteVideo: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            videos: state.data.videos.filter((v) => v.id !== id),
          },
        })),
      
      addExperience: (exp) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: [...state.data.experience, { ...exp, id: generateId() }],
          },
        })),
      
      updateExperience: (id, exp) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((e) => (e.id === id ? { ...e, ...exp } : e)),
          },
        })),
      
      deleteExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.filter((e) => e.id !== id),
          },
        })),
      
      addCertificate: (cert) =>
        set((state) => ({
          data: {
            ...state.data,
            site: {
              ...state.data.site,
              certificates: [...state.data.site.certificates, { ...cert, id: generateId() }],
            },
          },
        })),
      
      updateCertificate: (id, cert) =>
        set((state) => ({
          data: {
            ...state.data,
            site: {
              ...state.data.site,
              certificates: state.data.site.certificates.map((c) => (c.id === id ? { ...c, ...cert } : c)),
            },
          },
        })),
      
      deleteCertificate: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            site: {
              ...state.data.site,
              certificates: state.data.site.certificates.filter((c) => c.id !== id),
            },
          },
        })),
      
      addEducation: (edu) =>
        set((state) => ({
          data: {
            ...state.data,
            site: {
              ...state.data.site,
              education: [...state.data.site.education, { ...edu, id: generateId() }],
            },
          },
        })),
      
      updateEducation: (id, edu) =>
        set((state) => ({
          data: {
            ...state.data,
            site: {
              ...state.data.site,
              education: state.data.site.education.map((e) => (e.id === id ? { ...e, ...edu } : e)),
            },
          },
        })),
      
      deleteEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            site: {
              ...state.data.site,
              education: state.data.site.education.filter((e) => e.id !== id),
            },
          },
        })),
      
      addTraining: (train) =>
        set((state) => ({
          data: {
            ...state.data,
            site: {
              ...state.data.site,
              training: [...state.data.site.training, { ...train, id: generateId() }],
            },
          },
        })),
      
      updateTraining: (id, train) =>
        set((state) => ({
          data: {
            ...state.data,
            site: {
              ...state.data.site,
              training: state.data.site.training.map((t) => (t.id === id ? { ...t, ...train } : t)),
            },
          },
        })),
      
      deleteTraining: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            site: {
              ...state.data.site,
              training: state.data.site.training.filter((t) => t.id !== id),
            },
          },
        })),
      

  
      exportData: () => JSON.stringify(get().data, null, 2),
      
      importData: (json) => {
        try {
          const data = JSON.parse(json) as PortfolioData;
          set({ data });
        } catch (e) {
          console.error('Failed to import data:', e);
        }
      },
      
      resetData: () => set({ data: defaultData }),
    }),
    {
      name: 'portfolio-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.data = mergeWithDefaults(state.data as Partial<PortfolioData>);
        }
      },
    }
  )
);
