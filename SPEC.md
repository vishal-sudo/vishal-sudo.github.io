# DevOps Portfolio - Specification

## Tech Stack
- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data**: localStorage + JSON file for persistence
- **State**: React Context for admin state

## Color Palette (DevOps/Terminal Theme)
- **Background**: #0d1117 (GitHub dark)
- **Card BG**: #161b22
- **Border**: #30363d
- **Accent Cyan**: #58a6ff
- **Accent Green**: #3fb950
- **Accent Orange**: #f0883e
- **Text Primary**: #e6edf3
- **Text Secondary**: #8b949e

## Pages

### 1. Homepage (/)
- **Hero**: Terminal-style intro with typing animation
- **About**: Bio with stats
- **Skills**: Grid of skills with icons + experience
- **Video**: Video portfolio section
- **Projects**: Project cards → popup details
- **Contact**: Form + social links

### 2. Admin Panel (/admin)
- **Dashboard**: Overview of all content
- **Skills Manager**: Add/edit/delete skills
- **Projects Manager**: CRUD for projects
- **Videos Manager**: CRUD for videos
- **Experience Manager**: Work history
- **Settings**: Site config, export/import JSON

## Data Structure (JSON/LocalStorage)
```json
{
  "site": { "title": "My Portfolio", "name": "John Doe", "role": "DevOps Engineer" },
  "skills": [{ "id": "1", "name": "Docker", "icon": "docker", "category": "containers", "experience": 5, "proficiency": 90 }],
  "projects": [{ "id": "1", "title": "Project Name", "description": "...", "fullDescription": "...", "techStack": ["Docker", "K8s"], "thumbnail": "url", "images": [], "githubUrl": "", "liveUrl": "" }],
  "videos": [{ "id": "1", "title": "Intro", "videoUrl": "youtube-url", "thumbnail": "url", "duration": 120 }],
  "experience": [{ "id": "1", "company": "Acme", "role": "DevOps Engineer", "startDate": "2020-01", "endDate": "2023-01", "current": false }],
  "social": { "github": "", "linkedin": "", "twitter": "", "email": "" }
}
```

## Features
- All content managed via admin panel
- Data saved to localStorage
- Export/Import JSON for backup
- Default dummy data included
- Responsive design
- Terminal/DevOps aesthetic
