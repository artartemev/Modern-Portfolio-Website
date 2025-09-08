import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { createClient } from '@supabase/supabase-js';
import { initializeDatabase } from './initialization.tsx';
import * as routes from './routes.tsx';
import devLog from '../../../utils/devLog.ts';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(devLog));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Initialize database on startup
devLog('Server starting up...');
devLog('Environment check:');
devLog('- SUPABASE_URL:', Deno.env.get('SUPABASE_URL') ? 'Set' : 'Missing');
devLog('- SUPABASE_SERVICE_ROLE_KEY:', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ? 'Set' : 'Missing');

// Initialize database and projects (with better error handling)
const initializeApp = async () => {
  try {
    devLog('Initializing database...');
    await initializeDatabase();
    devLog('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    devLog('Server will continue in fallback mode with sample data');
  }
};

// Initialize asynchronously but don't block server startup
initializeApp().catch((error) => {
  console.error('Async initialization error:', error);
  devLog('Server continuing in fallback mode');
});

// Routes
app.get('/make-server-32d29310/projects', routes.getProjects);
app.get('/make-server-32d29310/projects/:id', routes.getProject);
app.post('/make-server-32d29310/projects', routes.createProject);
app.put('/make-server-32d29310/projects/:id', routes.updateProject);
app.delete('/make-server-32d29310/projects/:id', routes.deleteProject);
app.get('/make-server-32d29310/tags', routes.getTags);

// Hero routes
app.get('/make-server-32d29310/hero', routes.getHeroData);
app.put('/make-server-32d29310/hero', routes.updateHeroData);

app.get('/make-server-32d29310/health', routes.healthCheck);

// Root health check
app.get('/', (c) => {
  return c.json({
    message: 'Portfolio Server is running',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

devLog('Routes registered successfully');
devLog('Starting Deno server...');
Deno.serve(app.fetch);