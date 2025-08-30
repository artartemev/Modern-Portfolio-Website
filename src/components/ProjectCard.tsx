import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CATEGORIES } from '../utils/constants';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string[];
  year: number;
  tags: string[];
  theme: string;
  is_top: boolean;
  image_url?: string;
  live_url?: string;
  github_url?: string;
  client?: string;
  duration?: string;
  role?: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  technologies?: string[];
  gallery_images?: string[];
}

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  // Safety checks for required fields
  if (!project || !project.title || !project.tags) {
    console.warn('ProjectCard received invalid project data:', project);
    return null;
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent opening modal when clicking on external links
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    onClick(project);
  };

  const safeTitle = project.title || 'Untitled Project';
  const safeDescription = project.description || 'No description available';
  const safeTags = Array.isArray(project.tags) ? project.tags : [];
  const safeYear = project.year || new Date().getFullYear();
  const safeCategories = Array.isArray(project.category) ? project.category : [project.category].filter(Boolean);

  // Get category labels from constants
  const categoryLabels = safeCategories.map(categoryId => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    return category ? category.label : categoryId;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer"
      onClick={handleCardClick}
    >
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden group">
        <div className="relative">
          {/* Project Image */}
          <div className="aspect-[16/10] bg-gray-100/5 overflow-hidden">
            {project.image_url ? (
              <ImageWithFallback
                src={project.image_url}
                alt={safeTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                <div className="text-white/40 text-4xl font-['Anonymous_Pro']">
                  {safeTitle.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Overlay Actions */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Top Badge */}
          {project.is_top && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-yellow-500/20 backdrop-blur-sm text-yellow-300 border-yellow-500/30 font-['Anonymous_Pro'] text-xs uppercase tracking-wide">
                Top
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-['Anonymous_Pro'] text-lg text-[#323232] uppercase tracking-wider mb-2 group-hover:text-[#323232]/80 transition-colors">
                {safeTitle}
              </h3>
              <p className="text-[#323232]/60 text-sm line-clamp-2 leading-relaxed">
                {safeDescription}
              </p>
            </div>
            <div className="flex items-center gap-1 text-[#323232]/40 text-xs font-['Anonymous_Pro'] uppercase tracking-wider">
              <Calendar className="w-3 h-3" />
              {safeYear}
            </div>
          </div>

          {/* Categories - Show all categories */}
          {categoryLabels.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {categoryLabels.map((label, index) => (
                <Badge
                  key={index}
                  className="bg-blue-100/20 backdrop-blur-sm text-blue-600 border-blue-400/30 text-xs font-['Anonymous_Pro'] uppercase tracking-wide px-2 py-1"
                >
                  {label}
                </Badge>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {safeTags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-white/5 border-white/20 text-[#323232]/70 text-xs font-['Anonymous_Pro'] uppercase tracking-wide px-2 py-1"
              >
                {tag}
              </Badge>
            ))}
            {safeTags.length > 3 && (
              <Badge
                variant="outline"
                className="bg-white/5 border-white/20 text-[#323232]/70 text-xs font-['Anonymous_Pro'] uppercase tracking-wide px-2 py-1"
              >
                +{safeTags.length - 3}
              </Badge>
            )}
          </div>

          {/* Theme indicator */}
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1 text-xs font-['Anonymous_Pro'] text-[#323232]/40 uppercase tracking-wider">
                {categoryLabels.length > 0 ? categoryLabels.join(' • ') : 'uncategorized'}
              </div>
              <div className={`w-3 h-3 rounded-full ${
                project.theme === 'dark' ? 'bg-gray-600' :
                project.theme === 'light' ? 'bg-gray-200' :
                'bg-gradient-to-r from-gray-200 to-gray-600'
              }`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}