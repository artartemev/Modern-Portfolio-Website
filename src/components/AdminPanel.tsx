import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProjectAdmin } from './ProjectAdmin';
import { Folder } from 'lucide-react';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="container mx-auto px-8 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 mb-8">
          <TabsTrigger
            value="projects"
            className="flex items-center gap-2 font-['Anonymous_Pro'] uppercase tracking-wide"
          >
            <Folder className="w-4 h-4" />
            Project Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-8">
          <ProjectAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
}