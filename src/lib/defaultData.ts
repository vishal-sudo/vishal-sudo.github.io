export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: 'cloud' | 'containers' | 'cicd' | 'monitoring' | 'languages' | 'other';
  experience: number;
  proficiency: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url: string;
  icon: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Training {
  id: string;
  title: string;
  provider: string;
  date: string;
  duration: string;
  description: string;
  url: string;
}

export interface AboutStats {
  yearsExperience: number;
  projectsDelivered: number;
  certifications: number;
  cloudPlatforms: number;
}

export interface FocusArea {
  icon: string;
  text: string;
}

export interface SectionVisibility {
  videos: boolean;
  skills: boolean;
  projects: boolean;
  experience: boolean;
  certificates: boolean;
  education: boolean;
  training: boolean;
  about: boolean;
  contact: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  thumbnail: string;
  images: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: number;
}

export interface Experience {
  id: string;
  company: string;
  companyLogo: string;
  icon: string;
  role: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  location: string;
  description: string;
  highlights: string[];
}

export interface Social {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
  cv: string;
}

export interface SiteConfig {
  siteTitle: string;
  logo: string;
  logoIcon: string;
  logoImage: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  heroSubtext: string;
  showAvatar: boolean;
  aboutStats: AboutStats;
  focusAreas: FocusArea[];
  aboutCTATitle: string;
  aboutCTAText: string;
  certificates: Certificate[];
  education: Education[];
  training: Training[];
  sections: SectionVisibility;
}

export interface PortfolioData {
  site: SiteConfig;
  skills: Skill[];
  projects: Project[];
  videos: Video[];
  experience: Experience[];
  social: Social;
  certificates: Certificate[];
  education: Education[];
  training: Training[];
}

export const defaultData: PortfolioData = {
  site: {
    siteTitle: 'DevOps Portfolio',
    logo: '~/portfolio',
    logoIcon: 'terminal',
    logoImage: '',
    name: 'Alex Chen',
    role: 'DevOps Engineer',
    heroSubtext: 'Building scalable infrastructure & automating everything',
    showAvatar: true,
    bio: `Passionate DevOps Engineer with 6+ years of experience in building and maintaining scalable infrastructure. Specialized in cloud-native technologies, CI/CD pipelines, and automation.

I help teams ship faster by bridging the gap between development and operations. My approach combines technical excellence with a deep understanding of developer experience.

Let's collaborate to build something amazing!`,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    aboutStats: { yearsExperience: 6, projectsDelivered: 50, certifications: 8, cloudPlatforms: 3 },
    focusAreas: [
      { icon: 'cloud', text: 'Designing scalable, resilient cloud infrastructure' },
      { icon: 'git', text: 'Building efficient deployment pipelines' },
      { icon: 'container', text: 'Managing containerized applications at scale' },
    ],
    aboutCTATitle: "Let's Build Together",
    aboutCTAText: "I'm passionate about building scalable systems and helping teams deliver faster. Whether it's infrastructure automation or cloud architecture, I'm ready to help!",
    certificates: [],
    education: [],
    training: [],
    sections: {
      videos: true,
      skills: true,
      projects: true,
      experience: true,
      certificates: true,
      education: true,
      training: true,
      about: true,
      contact: true,
    },
  },
  certificates: [],
  education: [],
  training: [],
  skills: [
    { id: '1', name: 'AWS', icon: 'aws', category: 'cloud', experience: 6, proficiency: 95 },
    { id: '2', name: 'Kubernetes', icon: 'box', category: 'containers', experience: 5, proficiency: 90 },
    { id: '3', name: 'Docker', icon: 'docker', category: 'containers', experience: 6, proficiency: 95 },
    { id: '4', name: 'Terraform', icon: 'cloud', category: 'cicd', experience: 4, proficiency: 85 },
    { id: '5', name: 'Jenkins', icon: 'gitBranch', category: 'cicd', experience: 5, proficiency: 88 },
    { id: '6', name: 'GitLab CI', icon: 'gitMerge', category: 'cicd', experience: 4, proficiency: 85 },
    { id: '7', name: 'Prometheus', icon: 'activity', category: 'monitoring', experience: 4, proficiency: 82 },
    { id: '8', name: 'Grafana', icon: 'barChart', category: 'monitoring', experience: 4, proficiency: 80 },
    { id: '9', name: 'Python', icon: 'code', category: 'languages', experience: 5, proficiency: 90 },
    { id: '10', name: 'Go', icon: 'code', category: 'languages', experience: 3, proficiency: 75 },
    { id: '11', name: 'Linux', icon: 'terminal', category: 'other', experience: 7, proficiency: 95 },
    { id: '12', name: 'Ansible', icon: 'settings', category: 'cicd', experience: 4, proficiency: 80 },
  ],
  projects: [
    {
      id: '1',
      title: 'Cloud-Native CI/CD Pipeline',
      slug: 'cloud-native-cicd',
      description: 'Built a scalable CI/CD pipeline handling 500+ deployments daily',
      fullDescription: `## Overview
Built a comprehensive CI/CD pipeline from scratch that reduced deployment time by 70% and increased deployment frequency from weekly to multiple times daily.

## Key Features
- Multi-stage build process with caching
- Automated testing integration
- Blue-green deployment strategy
- Rollback automation
- GitOps workflow with ArgoCD

## Impact
- Deployment time: 45 min → 12 min
- Failed deployments reduced by 85%
- Team velocity increased by 40%`,
      thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop',
      images: [],
      techStack: ['GitLab CI', 'Kubernetes', 'Docker', 'ArgoCD', 'Prometheus'],
      githubUrl: 'https://github.com',
      liveUrl: '',
      featured: true,
    },
    {
      id: '2',
      title: 'Infrastructure as Code Suite',
      slug: 'iac-suite',
      description: 'Terraform modules for reusable cloud infrastructure',
      fullDescription: `## Overview
Created a library of reusable Terraform modules for rapid infrastructure provisioning across multiple environments.

## Key Features
- Modular VPC design
- EKS cluster templates
- RDS managed databases
- ElastiCache clusters
- Security best practices baked in

## Impact
- New environment provisioning: 2 days → 30 minutes
- 100% infrastructure reproducibility
- Reduced configuration drift`,
      thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
      images: [],
      techStack: ['Terraform', 'AWS', 'Python', 'Bash'],
      githubUrl: 'https://github.com',
      liveUrl: '',
      featured: true,
    },
    {
      id: '3',
      title: 'Observability Dashboard',
      slug: 'observability-dashboard',
      description: 'Unified monitoring across microservices',
      fullDescription: `## Overview
Implemented a comprehensive observability stack providing real-time insights into system health and performance.

## Key Features
- Centralized logging with ELK
- Custom metrics collection
- Distributed tracing
- Alert management
- SLA dashboards

## Impact
- MTTR reduced by 60%
- 99.9% uptime achieved
- Proactive incident detection`,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      images: [],
      techStack: ['Prometheus', 'Grafana', 'ELK', 'Jaeger'],
      githubUrl: 'https://github.com',
      liveUrl: '',
      featured: true,
    },
    {
      id: '4',
      title: 'Self-Healing K8s Cluster',
      slug: 'self-healing-k8s',
      description: 'Auto-remediation system for Kubernetes workloads',
      fullDescription: `## Overview
Designed and implemented a self-healing infrastructure that automatically detects and resolves common issues without human intervention.

## Key Features
- Pod health monitoring
- Auto-scaling policies
- Circuit breaker patterns
- Automated failover
- Disaster recovery automation

## Impact
- 95% of issues resolved automatically
- 50% reduction in on-call pages
- Zero downtime deployments`,
      thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop',
      images: [],
      techStack: ['Kubernetes', 'Prometheus', 'Go', 'Redis'],
      githubUrl: 'https://github.com',
      liveUrl: '',
      featured: false,
    },
  ],
  videos: [
    {
      id: '1',
      title: 'My DevOps Journey - Career Story',
      description: 'How I started in DevOps and what I learned along the way',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: 480,
    },
    {
      id: '2',
      title: 'Kubernetes Deep Dive',
      description: 'Understanding Kubernetes architecture and core concepts',
      thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: 1200,
    },
    {
      id: '3',
      title: 'Building CI/CD Pipelines',
      description: 'Step-by-step guide to building robust CI/CD pipelines',
      thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: 900,
    },
  ],
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      companyLogo: '',
      icon: 'briefcase',
      role: 'Senior DevOps Engineer',
      startDate: '2021-01',
      endDate: null,
      current: true,
      location: 'San Francisco, CA',
      description: 'Leading infrastructure modernization initiatives, implementing GitOps, and mentoring junior engineers.',
      highlights: [
        'Architected and implemented Kubernetes clusters serving 500+ microservices',
        'Reduced deployment time by 70% through CI/CD optimization',
        'Implemented GitOps workflow using ArgoCD',
        'Mentored team of 5 junior DevOps engineers',
        'Achieved 99.99% uptime for critical services',
      ],
    },
    {
      id: '2',
      company: 'StartupXYZ',
      companyLogo: '',
      icon: 'rocket',
      role: 'DevOps Engineer',
      startDate: '2018-06',
      endDate: '2020-12',
      current: false,
      location: 'New York, NY',
      description: 'Built CI/CD pipelines from scratch, migrated to AWS, implemented containerization.',
      highlights: [
        'Designed and built CI/CD pipelines using Jenkins and GitLab CI',
        'Migrated on-premise infrastructure to AWS',
        'Implemented Docker and Kubernetes for container orchestration',
        'Reduced infrastructure costs by 40%',
        'Built monitoring and alerting system using Prometheus and Grafana',
      ],
    },
    {
      id: '3',
      company: 'IT Solutions Ltd.',
      companyLogo: '',
      icon: 'server',
      role: 'Systems Administrator',
      startDate: '2016-01',
      endDate: '2018-05',
      current: false,
      location: 'Boston, MA',
      description: 'Managed infrastructure, automation with Ansible, monitoring with Nagios.',
      highlights: [
        'Managed 200+ Linux servers across multiple data centers',
        'Implemented infrastructure automation using Ansible',
        'Built backup and disaster recovery solutions',
        'Maintained 99.9% uptime for production systems',
        'Automated routine maintenance tasks with shell scripts',
      ],
    },
  ],
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    email: 'alex@example.com',
    cv: '',
  },
};

export const iconMap: Record<string, string> = {
  aws: '☁️',
  docker: '🐳',
  kubernetes: '☸️',
  terraform: '🏗️',
  jenkins: '🔧',
  gitlab: '🦊',
  prometheus: '📊',
  grafana: '📈',
  python: '🐍',
  go: '🐹',
  linux: '🐧',
  ansible: '🤖',
  aws_simple: 'AWS',
  cloud: '☁️',
  box: '📦',
  gitBranch: '🌿',
  gitMerge: '🔀',
  activity: '⚡',
  barChart: '📊',
  code: '💻',
  terminal: '🖥️',
  settings: '⚙️',
  default: '🔧',
};
