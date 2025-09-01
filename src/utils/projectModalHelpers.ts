import { DEFAULT_IMAGES, MOCK_GALLERY_IMAGES, type Project } from './projectModalConstants';
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
    safeContentBlocks: Array.isArray(project.content_blocks)
      ? [...project.content_blocks].sort((a, b) => a.order - b.order)
      : []
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
export const getProjectImage = (project: Project, safeCategories: string[]) => {
  if (project.image_url) return project.image_url;
  
  const primaryCategory = safeCategories[0];
  return DEFAULT_IMAGES[primaryCategory as keyof typeof DEFAULT_IMAGES] || DEFAULT_IMAGES.web;
};

// Helper function to get gallery images with fallback
export const getGalleryImages = (safeGalleryImages: string[], projectImage: string) => {
  if (safeGalleryImages.length > 0) return safeGalleryImages;
  
  // Return mock gallery images for better masonry demonstration
  return [
    projectImage,
    DEFAULT_IMAGES.web,
    DEFAULT_IMAGES.apps,
    DEFAULT_IMAGES.identity,
    ...MOCK_GALLERY_IMAGES,
    DEFAULT_IMAGES.management
  ].filter((img, index, arr) => arr.indexOf(img) === index).slice(0, 8);
};