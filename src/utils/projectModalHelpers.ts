import type { Project } from './projectModalConstants';
import { CATEGORIES } from './constants';

// Helper function to get safe project data
export const getSafeProjectData = (project: Project) => {
  return {
    safeTitle: project.title || 'Untitled Project',
    safeDescription: project.description || 'No description available',
    safeTags: Array.isArray(project.tags) ? project.tags : [],
    safeYear: project.year || new Date().getFullYear(),
    safeCategories: Array.isArray(project.category) ? project.category : [project.category].filter(Boolean),
    safeTechnologies: Array.isArray(project.technologies) ? project.technologies : [],
    safeGalleryImages: Array.isArray(project.gallery_images) ? project.gallery_images : [],
    safeContentBlocks: Array.isArray(project.content_blocks) ? 
      project.content_blocks.sort((a, b) => a.order - b.order) : []
  };
};

// Helper function to get category labels
export const getCategoryLabels = (categories: string[]) => {
  return categories.map(categoryId => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    return category ? category.label : categoryId;
  });
};

// Helper function to get project image
export const getProjectImage = (project: Project) => {
  return project.image_url || '';
};

// Helper function to get gallery images (only real images, no mock data)
export const getGalleryImages = (safeGalleryImages: string[]) => {
  // Only return actual gallery images from the admin panel
  return safeGalleryImages.length > 0 ? safeGalleryImages : [];
};