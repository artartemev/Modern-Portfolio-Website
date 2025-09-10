import { useState, useEffect } from 'react';
import { projectApi } from '../utils/api';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Badge } from './ui/badge';

export function ApiDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runDebug = async () => {
      const info: any = {
        projectId,
        publicAnonKey: publicAnonKey.substring(0, 20) + '...',
        apiUrl: `https://${projectId}.supabase.co/functions/v1/make-server-32d29310`,
        timestamp: new Date().toISOString()
      };

      try {
        // Test health check
        const healthResult = await projectApi.healthCheck();
        info.healthCheck = {
          success: healthResult.success,
          fallbackMode: healthResult.fallbackMode,
          message: healthResult.message
        };
      } catch (error) {
        info.healthCheck = { 
          success: false, 
          error: error.message,
          fallbackMode: true
        };
      }

      try {
        // Test projects fetch
        const projects = await projectApi.getProjects();
        info.projects = { count: projects.length, success: true };
      } catch (error) {
        info.projects = { success: false, error: error.message };
      }

      try {
        // Test tags fetch
        const tags = await projectApi.getTags();
        info.tags = { count: tags.length, success: true };
      } catch (error) {
        info.tags = { success: false, error: error.message };
      }

      setDebugInfo(info);
      setLoading(false);
    };

    runDebug();
  }, []);

  if (loading) {
    return (
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg font-mono text-sm max-w-sm">
        <div>Running API debug tests...</div>
      </div>
    );
  }

  const isFallbackMode = debugInfo.healthCheck?.fallbackMode;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg font-mono text-sm max-w-sm max-h-96 overflow-y-auto">
      <div className="flex items-center gap-2 mb-2">
        <div className="font-bold">API Status</div>
        {isFallbackMode ? (
          <Badge className="bg-yellow-500/20 text-yellow-300 text-xs">
            Fallback Mode
          </Badge>
        ) : (
          <Badge className="bg-green-500/20 text-green-300 text-xs">
            Connected
          </Badge>
        )}
      </div>
      
      <div className="space-y-2 text-xs">
        <div>
          <span className="text-gray-400">Health:</span> 
          <span className={debugInfo.healthCheck?.success ? 'text-green-400' : 'text-red-400'}>
            {debugInfo.healthCheck?.success ? ' ✓' : ' ✗'}
          </span>
        </div>
        
        <div>
          <span className="text-gray-400">Projects:</span>
          <span className={debugInfo.projects?.success ? 'text-green-400' : 'text-red-400'}>
            {debugInfo.projects?.success ? ` ✓ (${debugInfo.projects.count})` : ' ✗'}
          </span>
        </div>
        
        <div>
          <span className="text-gray-400">Tags:</span>
          <span className={debugInfo.tags?.success ? 'text-green-400' : 'text-red-400'}>
            {debugInfo.tags?.success ? ` ✓ (${debugInfo.tags.count})` : ' ✗'}
          </span>
        </div>

        {isFallbackMode && (
          <div className="mt-2 p-2 bg-yellow-900/20 rounded text-yellow-300">
            <div className="font-medium">Fallback Mode Active</div>
            <div className="text-xs mt-1">
              {debugInfo.healthCheck?.error?.includes('SSL handshake failed') || 
               debugInfo.healthCheck?.error?.includes('Database connection unavailable') 
                ? 'SSL/Database connectivity issue detected'
                : 'Database connection unavailable'}
            </div>
          </div>
        )}
        
        {debugInfo.healthCheck?.message && (
          <div className="mt-2 text-gray-400 text-xs">
            {debugInfo.healthCheck.message}
          </div>
        )}
        
        {debugInfo.healthCheck?.error && !isFallbackMode && (
          <div className="mt-2 p-2 bg-red-900/20 rounded text-red-300">
            <details className="cursor-pointer">
              <summary className="text-xs font-medium">Error Details</summary>
              <div className="text-xs mt-1 max-h-20 overflow-y-auto">
                {debugInfo.healthCheck.error}
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}