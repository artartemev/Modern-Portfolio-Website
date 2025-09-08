import { createClient } from '@supabase/supabase-js';
import * as kv from './kv_store.tsx';
import { SAMPLE_PROJECTS } from './constants.tsx';
import devLog from '../../../utils/devLog.ts';

// Initialize database table and sample data
export const initializeDatabase = async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    devLog('Checking KV store table...');
    
    // Check if table exists and is accessible
    const tableExists = await kv.ensureTable();
    
    if (!tableExists) {
      devLog('KV table is not available. Server will work with fallback data.');
      return;
    }

    // Test basic KV operations
    devLog('Testing KV store operations...');
    const testResult = await kv.testConnection();
    
    if (!testResult) {
      devLog('KV store test failed. Server will work with fallback data.');
      return;
    }
    
    devLog('KV store test passed');

    // Initialize projects if needed
    await initializeProjects();

  } catch (error) {
    console.error('Database initialization error:', error);
    devLog('Server will continue with fallback data mode');
    // Don't throw error - let server continue with fallback
  }
};

// Initialize with sample projects
const initializeProjects = async () => {
  try {
    devLog('Checking if projects are already initialized...');
    const existingProjects = await kv.get('projects:initialized');
    if (existingProjects) {
      devLog('Projects already initialized, skipping...');
      return;
    }

    devLog('Initializing sample projects...');

    // Store each project
    devLog(`Storing ${SAMPLE_PROJECTS.length} projects...`);
    for (const project of SAMPLE_PROJECTS) {
      await kv.set(`project:${project.id}`, project);
      devLog(`Stored project: ${project.name}`);
    }

    // Store project IDs for easy retrieval
    const projectIds = SAMPLE_PROJECTS.map(p => p.id);
    await kv.set('project:ids', projectIds);
    await kv.set('projects:initialized', true);

    devLog(`Sample projects initialized successfully. Stored ${projectIds.length} project IDs:`, projectIds);
  } catch (error) {
    console.error('Error initializing projects:', error);
    // Don't throw - let the application continue
    devLog('Continuing without sample data initialization');
  }
};