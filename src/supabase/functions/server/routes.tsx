import { Context } from 'hono';
import * as kv from './kv_store.tsx';
import { Project, SAMPLE_PROJECTS, ContentBlock, MediaItem } from './constants.tsx';

// Helper function to handle database errors
const handleDatabaseError = (error: any, operation: string, c: Context) => {
  console.error(`Database error during ${operation}:`, error);
  
  // Check for SSL/connection errors
  if (error.message?.includes('SSL handshake failed') || 
      error.message?.includes('Error code 525') ||
      error.message?.includes('<!DOCTYPE html>') ||
      error.message?.includes('Cloudflare') ||
      error.message?.includes('Database connection unavailable')) {
    console.log(`SSL/Connection error during ${operation}, returning fallback data`);
    return c.json({ 
      success: true, // Return success but use fallback mode
      error: 'Database connection unavailable (SSL/connection issue)',
      message: 'Using fallback data due to database connectivity issues',
      useFallback: true,
      fallbackMode: true
    }, 200);
  }
  
  if (error.message?.includes('does not exist')) {
    return c.json({ 
      success: false, 
      error: 'Database not properly initialized',
      message: 'Please set up the database table or use fallback mode',
      details: error.message,
      useFallback: true
    }, 503); // Service Unavailable
  }
  
  return c.json({ 
    success: false, 
    error: `Failed to ${operation}`,
    message: error.message || 'Unknown database error',
    useFallback: true
  }, 500);
};

// Get all projects
export const getProjects = async (c: Context) => {
  try {
    console.log('Fetching all projects...');
    
    const projectIds = await kv.get('project:ids') || [];
    console.log(`Found ${projectIds.length} project IDs:`, projectIds);
    
    if (projectIds.length === 0) {
      console.log('No project IDs found, returning sample data');
      return c.json({
        success: true,
        projects: SAMPLE_PROJECTS,
        message: 'Using fallback sample data',
        fallbackMode: true
      });
    }
    
    const projects = await kv.mget(projectIds.map((id: string) => `project:${id}`));
    const validProjects = projects.filter(Boolean);
    console.log(`Retrieved ${validProjects.length} valid projects`);
    
    return c.json({
      success: true,
      projects: validProjects
    });
  } catch (error) {
    console.log('Database error during getProjects:', error.message);
    
    // Return fallback data with appropriate message
    const fallbackResponse = {
      success: true,
      projects: SAMPLE_PROJECTS,
      fallbackMode: true
    };
    
    if (error.message?.includes('SSL handshake failed') || 
        error.message?.includes('Database connection unavailable')) {
      fallbackResponse.message = 'Using fallback sample data due to database connectivity issues';
    } else {
      fallbackResponse.message = 'Using fallback sample data due to database error';
    }
    
    return c.json(fallbackResponse);
  }
};

// Get project by ID
export const getProject = async (c: Context) => {
  try {
    const id = c.req.param('id');
    console.log(`Fetching project with ID: ${id}`);
    
    const project = await kv.get(`project:${id}`);
    
    if (!project) {
      // Try to find in sample data
      const sampleProject = SAMPLE_PROJECTS.find(p => p.id === id);
      if (sampleProject) {
        return c.json({
          success: true,
          project: sampleProject,
          message: 'Retrieved from fallback data'
        });
      }
      
      return c.json({ 
        success: false, 
        error: 'Project not found',
        message: `No project found with ID: ${id}`
      }, 404);
    }
    
    return c.json({
      success: true,
      project
    });
  } catch (error) {
    // Try to find in sample data
    const id = c.req.param('id');
    const sampleProject = SAMPLE_PROJECTS.find(p => p.id === id);
    if (sampleProject) {
      return c.json({
        success: true,
        project: sampleProject,
        message: 'Retrieved from fallback data due to database error'
      });
    }
    
    return handleDatabaseError(error, 'fetch project', c);
  }
};

// Create new project
export const createProject = async (c: Context) => {
  try {
    const projectData = await c.req.json();
    console.log('Creating new project:', projectData);
    
    // Validate required fields
    if (!projectData.name) {
      return c.json({
        success: false,
        error: 'Validation error',
        message: 'Project name is required'
      }, 400);
    }
    
    const project: Project = {
      id: crypto.randomUUID(),
      name: projectData.name,
      year: projectData.year || new Date().getFullYear(),
      category: projectData.category || 'other',
      tags: Array.isArray(projectData.tags) ? projectData.tags : [],
      description: projectData.description || '',
      status: projectData.status || 'norm',
      theme: projectData.theme || 'Corporate',
      isTop: Boolean(projectData.isTop),
      image: projectData.image || '',
      link: projectData.link || '',
      live_url: projectData.live_url || '',
      github_url: projectData.github_url || '',
      client: projectData.client || '',
      duration: projectData.duration || '',
      role: projectData.role || '',
      detailContent: projectData.detailContent || '',
      overview: projectData.overview || projectData.detailContent || '',
      challenge: projectData.challenge || '',
      solution: projectData.solution || '',
      results: projectData.results || '',
      technologies: Array.isArray(projectData.technologies) ? projectData.technologies : [],
      gallery_images: Array.isArray(projectData.gallery_images) ? projectData.gallery_images : [],
      content_blocks: Array.isArray(projectData.content_blocks) ? projectData.content_blocks : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Store the project
    await kv.set(`project:${project.id}`, project);
    
    // Update project IDs list
    const projectIds = await kv.get('project:ids') || [];
    await kv.set('project:ids', [...projectIds, project.id]);
    
    console.log(`Project created successfully with ID: ${project.id}`);
    
    return c.json({
      success: true,
      project,
      message: 'Project created successfully'
    });
  } catch (error) {
    // Special handling for SSL/connection errors
    if (error.message?.includes('SSL handshake failed') || 
        error.message?.includes('Database connection unavailable')) {
      console.log('Cannot create project due to database connectivity issues');
      return c.json({
        success: false,
        error: 'Database connectivity issue',
        message: 'Cannot create projects when database is unavailable. Please try again later or check database connectivity.',
        fallbackMode: true,
        canRetry: true
      }, 503);
    }
    
    return handleDatabaseError(error, 'create project', c);
  }
};

// Update project
export const updateProject = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const updateData = await c.req.json();
    console.log(`Updating project ${id}:`, updateData);
    
    const existingProject = await kv.get(`project:${id}`);
    if (!existingProject) {
      return c.json({ 
        success: false, 
        error: 'Project not found',
        message: `No project found with ID: ${id}`
      }, 404);
    }
    
    const updatedProject: Project = {
      ...existingProject,
      ...updateData,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`project:${id}`, updatedProject);
    
    console.log(`Project ${id} updated successfully`);
    
    return c.json({
      success: true,
      project: updatedProject,
      message: 'Project updated successfully'
    });
  } catch (error) {
    // Special handling for SSL/connection errors
    if (error.message?.includes('SSL handshake failed') || 
        error.message?.includes('Database connection unavailable')) {
      console.log('Cannot update project due to database connectivity issues');
      return c.json({
        success: false,
        error: 'Database connectivity issue',
        message: 'Cannot update projects when database is unavailable. Please try again later or check database connectivity.',
        fallbackMode: true,
        canRetry: true
      }, 503);
    }
    
    return handleDatabaseError(error, 'update project', c);
  }
};

// Delete project
export const deleteProject = async (c: Context) => {
  try {
    const id = c.req.param('id');
    console.log(`Deleting project with ID: ${id}`);
    
    const existingProject = await kv.get(`project:${id}`);
    if (!existingProject) {
      return c.json({ 
        success: false, 
        error: 'Project not found',
        message: `No project found with ID: ${id}`
      }, 404);
    }
    
    // Delete the project
    await kv.del(`project:${id}`);
    
    // Update project IDs list
    const projectIds = await kv.get('project:ids') || [];
    await kv.set('project:ids', projectIds.filter((projectId: string) => projectId !== id));
    
    console.log(`Project ${id} deleted successfully`);
    
    return c.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    return handleDatabaseError(error, 'delete project', c);
  }
};

// Get available tags
export const getTags = async (c: Context) => {
  try {
    console.log('Fetching available tags...');
    
    const projectIds = await kv.get('project:ids') || [];
    
    if (projectIds.length === 0) {
      // Return tags from sample data
      const sampleTags = new Set<string>();
      SAMPLE_PROJECTS.forEach((project: Project) => {
        if (project && Array.isArray(project.tags)) {
          project.tags.forEach(tag => {
            if (typeof tag === 'string' && tag.trim()) {
              sampleTags.add(tag.trim());
            }
          });
        }
      });
      
      return c.json({
        success: true,
        tags: Array.from(sampleTags).sort(),
        message: 'Tags from fallback data'
      });
    }
    
    const projects = await kv.mget(projectIds.map((id: string) => `project:${id}`));
    
    const tags = new Set<string>();
    projects.forEach((project: Project) => {
      if (project && Array.isArray(project.tags)) {
        project.tags.forEach(tag => {
          if (typeof tag === 'string' && tag.trim()) {
            tags.add(tag.trim());
          }
        });
      }
    });
    
    const sortedTags = Array.from(tags).sort();
    console.log(`Found ${sortedTags.length} unique tags`);
    
    return c.json({
      success: true,
      tags: sortedTags
    });
  } catch (error) {
    // Return tags from sample data
    const sampleTags = new Set<string>();
    SAMPLE_PROJECTS.forEach((project: Project) => {
      if (project && Array.isArray(project.tags)) {
        project.tags.forEach(tag => {
          if (typeof tag === 'string' && tag.trim()) {
            sampleTags.add(tag.trim());
          }
        });
      }
    });
    
    return c.json({
      success: true,
      tags: Array.from(sampleTags).sort(),
      message: 'Tags from fallback data due to database error'
    });
  }
};

// Health check
export const healthCheck = async (c: Context) => {
  try {
    console.log('Health check requested');
    
    // Test KV store connection
    const connectionOk = await kv.testConnection();
    
    if (!connectionOk) {
      console.log('Database connection test failed, running in fallback mode');
      return c.json({ 
        success: true, // Still return success but indicate fallback mode
        message: 'Server is healthy (fallback mode - database connectivity issues)',
        timestamp: new Date().toISOString(),
        dbStatus: 'unavailable',
        fallbackMode: true,
        note: 'Application is working with sample data due to database connectivity issues'
      }, 200);
    }
    
    // Check if basic data exists
    const projectIds = await kv.get('project:ids') || [];
    const initialized = await kv.get('projects:initialized') || false;
    
    console.log('Health check passed - all systems operational');
    return c.json({ 
      success: true, 
      message: 'Server is healthy (database connected)',
      timestamp: new Date().toISOString(),
      dbStatus: 'connected',
      projectsCount: projectIds.length,
      initialized: Boolean(initialized),
      fallbackMode: false
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    let message = 'Server is healthy (fallback mode)';
    let note = 'Application is working with sample data';
    
    if (error.message?.includes('SSL handshake failed') || 
        error.message?.includes('Database connection unavailable')) {
      message = 'Server is healthy (fallback mode - SSL/connection issues)';
      note = 'Application is working with sample data due to SSL/connection issues';
    }
    
    return c.json({ 
      success: true, // Still return success but indicate fallback mode
      message,
      error: error.message,
      timestamp: new Date().toISOString(),
      dbStatus: 'error',
      fallbackMode: true,
      note
    }, 200);
  }
};