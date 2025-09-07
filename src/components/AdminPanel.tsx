import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProjectAdmin } from './ProjectAdmin';
import { HeroAdmin } from './HeroAdmin';
import { Folder, User } from 'lucide-react';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="container mx-auto px-8 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger 
            value="projects" 
            className="flex items-center gap-2 font-['Anonymous_Pro'] uppercase tracking-wide"
          >
            <Folder className="w-4 h-4" />
            Project Management
          </TabsTrigger>
          <TabsTrigger 
            value="hero" 
            className="flex items-center gap-2 font-['Anonymous_Pro'] uppercase tracking-wide"
          >
            <User className="w-4 h-4" />
            Hero Management
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-8">
          <ProjectAdmin />
        </TabsContent>
        
        <TabsContent value="hero" className="space-y-8">
          <HeroAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
}