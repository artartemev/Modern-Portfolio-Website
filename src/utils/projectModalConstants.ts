// Default images for different categories
export const DEFAULT_IMAGES = {
  'web': 'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ24lMjBwb3J0Zm9saW98ZW58MXx8fHwxNzU1NTI5NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'apps': 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzU1NTExMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'identity': 'https://images.unsplash.com/photo-1616205255812-c07c8102cc02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc1NTQ5OTE5MHww&ixlib=rb-4.1.0&q=80&w=1080',
  'management': 'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ24lMjBwb3J0Zm9saW98ZW58MXx8fHwxNzU1NTI5NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'other': 'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ24lMjBwb3J0Zm9saW98ZW58MXx8fHwxNzU1NTI5NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080'
};



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