import { createClient } from '@supabase/supabase-js';
import * as kv from './kv_store.tsx';
import { SAMPLE_PROJECTS } from './constants.tsx';

// Initialize database table and sample data
export const initializeDatabase = async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    console.log('Checking KV store table...');
    
    // Check if table exists and is accessible
    const tableExists = await kv.ensureTable();
    
    if (!tableExists) {
      console.log('KV table is not available. Server will work with fallback data.');
      return;
    }

    // Test basic KV operations
    console.log('Testing KV store operations...');
    const testResult = await kv.testConnection();
    
    if (!testResult) {
      console.log('KV store test failed. Server will work with fallback data.');
      return;
    }
    
    console.log('KV store test passed');

    // Initialize projects if needed
    await initializeProjects();

  } catch (error) {
    console.error('Database initialization error:', error);
    console.log('Server will continue with fallback data mode');
    // Don't throw error - let server continue with fallback
  }
};

// Initialize with sample projects
const initializeProjects = async () => {
  try {
    console.log('Checking if projects are already initialized...');
    const existingProjects = await kv.get('projects:initialized');
    if (existingProjects) {
      console.log('Projects already initialized, skipping...');
      return;
    }

    console.log('Initializing sample projects...');

    // Store each project
    console.log(`Storing ${SAMPLE_PROJECTS.length} projects...`);
    for (const project of SAMPLE_PROJECTS) {
      await kv.set(`project:${project.id}`, project);
      console.log(`Stored project: ${project.name}`);
    }

    // Store project IDs for easy retrieval
    const projectIds = SAMPLE_PROJECTS.map(p => p.id);
    await kv.set('project:ids', projectIds);
    await kv.set('projects:initialized', true);

    console.log(`Sample projects initialized successfully. Stored ${projectIds.length} project IDs:`, projectIds);
  } catch (error) {
    console.error('Error initializing projects:', error);
    // Don't throw - let the application continue
    console.log('Continuing without sample data initialization');
  }
};