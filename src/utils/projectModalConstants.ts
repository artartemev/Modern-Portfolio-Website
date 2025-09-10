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

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string[];
  year: number;
  tags: string[];
  theme: string;
  is_top: boolean;
  image_url?: string;
  link?: string;
  live_url?: string;
  github_url?: string;
  client?: string;
  duration?: string;
  role?: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  technologies?: string[];
  gallery_images?: string[];
  content_blocks?: ContentBlock[];
}

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}