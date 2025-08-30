import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { projectApi, type Project } from '../utils/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { CaseContentBlocks, type ContentBlock, type MediaItem } from './CaseContentBlocks';
import { Plus, Edit2, Trash2, Save, X, FileText, Layout } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProjectFormData {
  name: string;
  year: string;
  category: 'web' | 'apps' | 'identity' | 'management' | 'other';
  tags: string[];
  description: string;
  status: 'good' | 'norm' | 'miss';
  theme: string;
  isTop: boolean;
  image: string;
  link: string;
  detailContent: string;
  // Basic project info fields
  client: string;
  duration: string;
  role: string;
  technologies: string[];
  // Content blocks for detailed case study
  contentBlocks: ContentBlock[];
}

const initialFormData: ProjectFormData = {
  name: '',
  year: new Date().getFullYear().toString(),
  category: 'web',
  tags: [],
  description: '',
  status: 'norm',
  theme: 'Minimalist',
  isTop: false,
  image: '',
  link: '',
  detailContent: '',
  client: '',
  duration: '',
  role: '',
  technologies: [],
  contentBlocks: []
};

export function ProjectAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [techInput, setTechInput] = useState('');

  // Load projects
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const projectsData = await projectApi.getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Submitting project with content blocks:', formData.contentBlocks);
    
    try {
      if (editingProject) {
        // Update existing project - transform formData to Project format
        const updateData: Partial<Project> = {
          title: formData.name,
          description: formData.description,
          category: [formData.category], // Convert to array
          year: parseInt(formData.year),
          tags: formData.tags,
          theme: formData.theme.toLowerCase().includes('light') || formData.theme.toLowerCase().includes('minimalist') ? 'light' : 
                formData.theme.toLowerCase().includes('dark') ? 'dark' : 'mixed',
          is_top: formData.isTop,
          image_url: formData.image || undefined,
          link: formData.link || undefined,
          client: formData.client || undefined,
          duration: formData.duration || undefined,
          role: formData.role || undefined,
          overview: formData.detailContent || undefined,
          technologies: formData.technologies,
          gallery_images: [], // Gallery images now handled via content blocks
          content_blocks: formData.contentBlocks
        };
        await projectApi.updateProject(editingProject.id, updateData);
        toast.success('Project updated successfully');
      } else {
        // Create new project - transform formData to Project format
        const projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'> = {
          title: formData.name,
          description: formData.description,
          category: [formData.category], // Convert to array
          year: parseInt(formData.year),
          tags: formData.tags,
          theme: formData.theme.toLowerCase().includes('light') || formData.theme.toLowerCase().includes('minimalist') ? 'light' : 
                formData.theme.toLowerCase().includes('dark') ? 'dark' : 'mixed',
          is_top: formData.isTop,
          image_url: formData.image || undefined,
          link: formData.link || undefined,
          client: formData.client || undefined,
          duration: formData.duration || undefined,
          role: formData.role || undefined,
          overview: formData.detailContent || undefined,
          technologies: formData.technologies,
          gallery_images: [], // Gallery images now handled via content blocks
          content_blocks: formData.contentBlocks
        };
        await projectApi.createProject(projectData);
        toast.success('Project created successfully');
      }
      
      await loadProjects();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await projectApi.deleteProject(id);
      toast.success('Project deleted successfully');
      await loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.title,
      year: project.year.toString(),
      category: Array.isArray(project.category) ? project.category[0] : project.category,
      tags: project.tags,
      description: project.description,
      status: 'norm', // Default status as API doesn't have this field
      theme: project.theme || 'Corporate',
      isTop: project.is_top,
      image: project.image_url || '',
      link: project.link || '',
      detailContent: project.overview || '',
      client: project.client || '',
      duration: project.duration || '',
      role: project.role || '',
      technologies: project.technologies || [],
      contentBlocks: (project.content_blocks || []).map(block => ({
        ...block,
        media: (block.media || []).map((mediaItem, index) => ({
          ...mediaItem,
          id: mediaItem.id || `media-${index}`,
          type: mediaItem.type || (mediaItem.url.toLowerCase().includes('.gif') ? 'gif' as const : 'image' as const),
          name: mediaItem.name || mediaItem.url.split('/').pop()?.split('?')[0] || 'Media'
        }))
      }))
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
    setFormData(initialFormData);
    setTagInput('');
    setTechInput('');
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(tech => tech !== techToRemove)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffded] via-[#f8f6e8] to-[#f0ede1] py-20">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-['Inter'] text-4xl text-[#323232] uppercase tracking-wider">
            Project Management
          </h1>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-[#323232] hover:bg-[#454545] text-white font-['Anonymous_Pro'] uppercase tracking-wider"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-md">
              <DialogHeader>
                <DialogTitle className="font-['Anonymous_Pro'] text-2xl text-[#323232] uppercase tracking-wider">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </DialogTitle>
                <DialogDescription className="font-['Anonymous_Pro'] text-[#323232]/70 uppercase tracking-wide text-sm">
                  {editingProject 
                    ? 'Update the project details below and save your changes to modify the existing project in your portfolio'
                    : 'Fill in the project details below to add a new project to your portfolio. You can specify basic information and create content blocks for detailed case studies.'
                  }
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit}>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic" className="font-['Anonymous_Pro'] uppercase">
                      <Layout className="w-4 h-4 mr-2" />
                      Basic Info
                    </TabsTrigger>
                    <TabsTrigger value="content" className="font-['Anonymous_Pro'] uppercase">
                      <FileText className="w-4 h-4 mr-2" />
                      Content Blocks
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-6 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                          Project Name
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="font-['Anonymous_Pro']"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="year" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                          Year
                        </Label>
                        <Input
                          id="year"
                          value={formData.year}
                          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                          className="font-['Anonymous_Pro']"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                          Category
                        </Label>
                        <Select value={formData.category} onValueChange={(value: any) => setFormData({ ...formData, category: value })}>
                          <SelectTrigger className="font-['Anonymous_Pro']">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="web">Web</SelectItem>
                            <SelectItem value="apps">Apps</SelectItem>
                            <SelectItem value="identity">Identity</SelectItem>
                            <SelectItem value="management">Management</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="theme" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                          Theme
                        </Label>
                        <Select value={formData.theme} onValueChange={(value) => setFormData({ ...formData, theme: value })}>
                          <SelectTrigger className="font-['Anonymous_Pro']">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Minimalist">Minimalist</SelectItem>
                            <SelectItem value="Corporate">Corporate</SelectItem>
                            <SelectItem value="Creative">Creative</SelectItem>
                            <SelectItem value="E-commerce">E-commerce</SelectItem>
                            <SelectItem value="Portfolio">Portfolio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="font-['Anonymous_Pro']"
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="detailContent" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                        Project Overview
                      </Label>
                      <Textarea
                        id="detailContent"
                        value={formData.detailContent}
                        onChange={(e) => setFormData({ ...formData, detailContent: e.target.value })}
                        className="font-['Anonymous_Pro'] min-h-[100px]"
                        rows={4}
                        placeholder="Brief overview of the project, goals, and context..."
                      />
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="client" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                          Client
                        </Label>
                        <Input
                          id="client"
                          value={formData.client}
                          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                          className="font-['Anonymous_Pro']"
                          placeholder="Client name or company"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="duration" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                          Duration
                        </Label>
                        <Input
                          id="duration"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className="font-['Anonymous_Pro']"
                          placeholder="e.g., 3 months, 2 weeks"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="role" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                        Your Role
                      </Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="font-['Anonymous_Pro']"
                        placeholder="e.g., UI/UX Designer, Frontend Developer"
                      />
                    </div>

                    <div>
                      <Label className="font-['Anonymous_Pro'] uppercase tracking-wide">
                        Technologies Used
                      </Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="font-['Anonymous_Pro'] cursor-pointer"
                            onClick={() => handleRemoveTech(tech)}
                          >
                            {tech} <X className="w-3 h-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={techInput}
                          onChange={(e) => setTechInput(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, handleAddTech)}
                          placeholder="Add technology and press Enter"
                          className="font-['Anonymous_Pro']"
                        />
                        <Button type="button" onClick={handleAddTech} variant="outline">
                          Add
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label htmlFor="image" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                        Cover Image URL
                      </Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="font-['Anonymous_Pro']"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="link" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                        External Case Study Link
                      </Label>
                      <Input
                        id="link"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        className="font-['Anonymous_Pro']"
                        placeholder="https://behance.net/gallery/project-case-study"
                      />
                    </div>

                    <div>
                      <Label className="font-['Anonymous_Pro'] uppercase tracking-wide">
                        Tags
                      </Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="font-['Anonymous_Pro'] cursor-pointer"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            {tag} <X className="w-3 h-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, handleAddTag)}
                          placeholder="Add tag and press Enter"
                          className="font-['Anonymous_Pro']"
                        />
                        <Button type="button" onClick={handleAddTag} variant="outline">
                          Add
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isTop"
                        checked={formData.isTop}
                        onCheckedChange={(checked) => setFormData({ ...formData, isTop: checked })}
                      />
                      <Label htmlFor="isTop" className="font-['Anonymous_Pro'] uppercase tracking-wide">
                        Top Project
                      </Label>
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-6 mt-6">
                    <div>
                      <h3 className="font-['Anonymous_Pro'] text-lg text-[#323232] uppercase tracking-wide mb-4">
                        Content Blocks
                      </h3>
                      <p className="font-['Anonymous_Pro'] text-sm text-[#323232]/70 mb-6">
                        Create structured content blocks with text, images, and media for your case study. Each block can include titles, descriptions, and multiple media items.
                      </p>
                      <CaseContentBlocks
                        blocks={formData.contentBlocks}
                        onBlocksChange={(blocks) => {
                          console.log('Content blocks changed:', blocks);
                          setFormData({ ...formData, contentBlocks: blocks });
                        }}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-4 pt-6 border-t border-white/10 mt-6">
                  <Button
                    type="submit"
                    className="bg-[#323232] hover:bg-[#454545] text-white font-['Anonymous_Pro'] uppercase tracking-wider"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Project
                  </Button>
                  <Button
                    type="button"
                    onClick={handleCloseDialog}
                    variant="outline"
                    className="font-['Anonymous_Pro'] uppercase tracking-wider"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-[#323232] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="font-['Anonymous_Pro'] text-[#323232] uppercase">Loading projects...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-['Anonymous_Pro'] text-lg text-[#323232] uppercase tracking-wide">
                      {project.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(project)}
                        variant="ghost"
                        size="sm"
                        className="text-[#323232] hover:bg-white/20"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(project.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-[#323232]/70 text-sm font-['Anonymous_Pro']">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(project.category) ? project.category.map((cat) => (
                        <Badge key={cat} variant="outline" className="text-xs font-['Anonymous_Pro'] uppercase">
                          {cat}
                        </Badge>
                      )) : (
                        <Badge variant="outline" className="text-xs font-['Anonymous_Pro'] uppercase">
                          {project.category}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-[#323232]/60 font-['Anonymous_Pro'] uppercase">
                      <span>{project.year}</span>
                      {project.is_top && (
                        <Badge variant="secondary" className="text-xs">Top</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}