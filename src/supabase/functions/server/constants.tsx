// Project interface - updated to match frontend interface
export interface Project {
  id: string;
  name: string;
  year: string | number;
  category: string; // Single category for backend compatibility
  tags: string[];
  description: string;
  status?: 'good' | 'norm' | 'miss';
  theme: string;
  isTop: boolean;
  image?: string;
  link?: string; // External link to case study or project
  live_url?: string;
  github_url?: string;
  client?: string;
  duration?: string;
  role?: string;
  detailContent?: string; // Maps to overview
  overview?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  technologies?: string[];
  gallery_images?: string[];
  content_blocks?: ContentBlock[]; // New field for structured content blocks
  createdAt: string;
  updatedAt: string;
}

// Content block interface for structured case studies
export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'gif' | 'video';
  name?: string;
}

export interface ContentBlock {
  id: string;
  title: string;
  content: string;
  media: MediaItem[];
  order: number;
}

// Placeholder for sample projects
export const SAMPLE_PROJECTS: Project[] = [];

