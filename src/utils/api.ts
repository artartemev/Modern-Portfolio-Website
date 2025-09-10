import { projectId, publicAnonKey } from './supabase/info';
import { FALLBACK_PROJECTS } from './constants';

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
  category: string[]; // Changed from string to string[] for multiple categories
  year: number;
  tags: string[];
  theme: 'light' | 'dark' | 'mixed';
  is_top: boolean;
  image_url?: string;
  link?: string; // External link to case study or project page
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
  created_at?: string;
  updated_at?: string;
}

// API Response interfaces (what the server actually returns)
interface ApiProject {
  id: string;
  name: string;
  description: string;
  detailContent?: string;
  category: string;
  year: string | number;
  tags: string[];
  theme: string;
  isTop: boolean;
  image: string;
  link?: string; // External link to case study
  status?: string;
  createdAt?: string;
  updatedAt?: string;
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

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-32d29310`;

// Transform API response to our expected interface
const transformApiProject = (apiProject: ApiProject): Project => {
  // Normalize theme values
  const normalizeTheme = (theme: string): 'light' | 'dark' | 'mixed' => {
    const lowerTheme = theme.toLowerCase();
    if (lowerTheme.includes('dark')) return 'dark';
    if (lowerTheme.includes('light') || lowerTheme.includes('minimalist')) return 'light';
    if (lowerTheme.includes('corporate') || lowerTheme.includes('e-commerce')) return 'light';
    if (lowerTheme.includes('creative')) return 'mixed';
    return 'mixed'; // default
  };

  // Handle category - convert single category to array for now
  // In the future, the API should be updated to support multiple categories
  const categories = Array.isArray(apiProject.category) 
    ? apiProject.category 
    : [apiProject.category];

  return {
    id: apiProject.id,
    title: apiProject.name || 'Untitled Project',
    description: apiProject.description || 'No description available',
    category: categories,
    year: typeof apiProject.year === 'string' ? parseInt(apiProject.year) : apiProject.year || new Date().getFullYear(),
    tags: Array.isArray(apiProject.tags) ? apiProject.tags : [],
    theme: normalizeTheme(apiProject.theme || 'mixed'),
    is_top: apiProject.isTop || false,
    image_url: apiProject.image || undefined,
    link: apiProject.link || undefined,
    live_url: apiProject.live_url || undefined,
    github_url: apiProject.github_url || undefined,
    client: apiProject.client || undefined,
    duration: apiProject.duration || undefined,
    role: apiProject.role || undefined,
    overview: apiProject.overview || apiProject.detailContent || undefined,
    challenge: apiProject.challenge || undefined,
    solution: apiProject.solution || undefined,
    results: apiProject.results || undefined,
    technologies: Array.isArray(apiProject.technologies) ? apiProject.technologies : [],
    gallery_images: Array.isArray(apiProject.gallery_images) ? apiProject.gallery_images : [],
    content_blocks: Array.isArray(apiProject.content_blocks) ? apiProject.content_blocks : [],
    created_at: apiProject.createdAt || undefined,
    updated_at: apiProject.updatedAt || undefined,
  };
};

const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData: any = {};
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        console.error('Could not parse error response as JSON');
      }

      // Check for specific connectivity issues
      if (response.status === 503 && errorData.fallbackMode) {
        throw new Error(`Database connectivity issue: ${errorData.message || 'Database unavailable'}`);
      }
      
      throw new Error(`API Error: ${response.status} - ${errorData.error || response.statusText || errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`API Call failed for ${url}:`, error);
    
    // Check for network connectivity issues
    if (error.message?.includes('fetch') || 
        error.message?.includes('network') ||
        error.message?.includes('NetworkError') ||
        error.message?.includes('Failed to fetch')) {
      console.error('Network connectivity issue detected');
      throw new Error('Network connectivity issue - please check your internet connection');
    }
    
    throw error;
  }
};

export const projectApi = {
  // Get all projects
  async getProjects(): Promise<Project[]> {
    try {
      const result = await apiCall('/projects');
      const apiProjects = result.projects || [];

      // If we got fallback data, it might already be in the correct format
      if (result.message && result.message.includes('fallback')) {
        try {
          const transformedProjects = apiProjects
            .filter((project: any) => project && typeof project === 'object')
            .map((project: any) => {
              // If it's already in the right format, use it directly
              if (project.title && project.category && Array.isArray(project.category)) {
                return project as Project;
              }
              // Otherwise try to transform
              return transformApiProject(project);
            });

          return transformedProjects;
        } catch (transformError) {
          return FALLBACK_PROJECTS;
        }
      }

      // Transform each API project to our expected format
      const transformedProjects = apiProjects
        .filter((project: any) => project && typeof project === 'object')
        .map((apiProject: ApiProject) => {
          try {
            return transformApiProject(apiProject);
          } catch (transformError) {
            return null;
          }
        })
        .filter((project: Project | null): project is Project => project !== null);

      return transformedProjects;
    } catch (error) {
      console.error('Error fetching projects, using fallback data:', error);
      return FALLBACK_PROJECTS;
    }
  },

  // Get project by ID
  async getProject(id: string): Promise<Project> {
    try {
      const result = await apiCall(`/projects/${id}`);
      return transformApiProject(result.project);
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      throw error;
    }
  },

  // Create new project - transform our interface back to API format
  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    try {
      // Transform back to API format
      const apiProject = {
        name: project.title,
        description: project.description,
        category: project.category.length > 0 ? project.category[0] : 'other', // API only supports single category for now
        year: project.year,
        tags: project.tags,
        theme: project.theme,
        isTop: project.is_top,
        image: project.image_url,
        link: project.link,
        live_url: project.live_url,
        github_url: project.github_url,
        client: project.client,
        duration: project.duration,
        role: project.role,
        detailContent: project.overview,
        challenge: project.challenge,
        solution: project.solution,
        results: project.results,
        technologies: project.technologies,
        gallery_images: project.gallery_images,
        content_blocks: project.content_blocks,
      };

      const result = await apiCall('/projects', {
        method: 'POST',
        body: JSON.stringify(apiProject),
      });
      return transformApiProject(result.project);
    } catch (error) {
      console.error('Error creating project:', error);
      
      // Provide helpful error messages for common issues
      if (error.message?.includes('Database connectivity issue')) {
        throw new Error('Cannot create project: Database is currently unavailable. Please try again later.');
      } else if (error.message?.includes('Network connectivity issue')) {
        throw new Error('Cannot create project: Please check your internet connection and try again.');
      }
      
      throw error;
    }
  },

  // Update project
  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    try {
      // Transform updates back to API format
      const apiUpdates: Partial<ApiProject> = {};
      if (updates.title !== undefined) apiUpdates.name = updates.title;
      if (updates.description !== undefined) apiUpdates.description = updates.description;
      if (updates.category !== undefined) apiUpdates.category = updates.category.length > 0 ? updates.category[0] : 'other';
      if (updates.year !== undefined) apiUpdates.year = updates.year;
      if (updates.tags !== undefined) apiUpdates.tags = updates.tags;
      if (updates.theme !== undefined) apiUpdates.theme = updates.theme;
      if (updates.is_top !== undefined) apiUpdates.isTop = updates.is_top;
      if (updates.image_url !== undefined) apiUpdates.image = updates.image_url;
      if (updates.link !== undefined) apiUpdates.link = updates.link;
      if (updates.live_url !== undefined) apiUpdates.live_url = updates.live_url;
      if (updates.github_url !== undefined) apiUpdates.github_url = updates.github_url;
      if (updates.client !== undefined) apiUpdates.client = updates.client;
      if (updates.duration !== undefined) apiUpdates.duration = updates.duration;
      if (updates.role !== undefined) apiUpdates.role = updates.role;
      if (updates.overview !== undefined) apiUpdates.detailContent = updates.overview;
      if (updates.challenge !== undefined) apiUpdates.challenge = updates.challenge;
      if (updates.solution !== undefined) apiUpdates.solution = updates.solution;
      if (updates.results !== undefined) apiUpdates.results = updates.results;
      if (updates.technologies !== undefined) apiUpdates.technologies = updates.technologies;
      if (updates.gallery_images !== undefined) apiUpdates.gallery_images = updates.gallery_images;
      if (updates.content_blocks !== undefined) apiUpdates.content_blocks = updates.content_blocks;

      const result = await apiCall(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(apiUpdates),
      });
      return transformApiProject(result.project);
    } catch (error) {
      console.error(`Error updating project ${id}:`, error);
      
      // Provide helpful error messages for common issues
      if (error.message?.includes('Database connectivity issue')) {
        throw new Error('Cannot update project: Database is currently unavailable. Please try again later.');
      } else if (error.message?.includes('Network connectivity issue')) {
        throw new Error('Cannot update project: Please check your internet connection and try again.');
      }
      
      throw error;
    }
  },

  // Delete project
  async deleteProject(id: string): Promise<void> {
    try {
      await apiCall(`/projects/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      throw error;
    }
  },

  // Get available tags
  async getTags(): Promise<string[]> {
    try {
      const result = await apiCall('/tags');
      return result.tags || [];
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  },

  // Health check
  async healthCheck(): Promise<{ success: boolean; fallbackMode?: boolean; message?: string }> {
    try {
      const result = await apiCall('/health');
      return {
        success: result.success,
        fallbackMode: result.fallbackMode || false,
        message: result.message
      };
    } catch (error) {
      console.error('Health check failed:', error);
      return {
        success: false,
        fallbackMode: true,
        message: 'Health check failed, using fallback mode'
      };
    }
  },
};
