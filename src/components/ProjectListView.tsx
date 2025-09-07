import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { ExternalLink, Calendar, Tag } from 'lucide-react';
import { type Project } from '../utils/api';

interface ProjectListViewProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectListView({ projects, onProjectClick }: ProjectListViewProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-white/5">
        <div className="col-span-4 font-['Anonymous_Pro'] text-xs text-[#323232] uppercase tracking-wider">
          Project
        </div>
        <div className="col-span-2 font-['Anonymous_Pro'] text-xs text-[#323232] uppercase tracking-wider">
          Category
        </div>
        <div className="col-span-1 font-['Anonymous_Pro'] text-xs text-[#323232] uppercase tracking-wider">
          Year
        </div>
        <div className="col-span-3 font-['Anonymous_Pro'] text-xs text-[#323232] uppercase tracking-wider">
          Tags
        </div>
        <div className="col-span-2 font-['Anonymous_Pro'] text-xs text-[#323232] uppercase tracking-wider">
          Status
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-white/10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="grid grid-cols-12 gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer group"
            onClick={() => onProjectClick(project)}
          >
            {/* Project Name & Description */}
            <div className="col-span-4 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-['Anonymous_Pro'] text-sm text-[#323232] uppercase tracking-wide group-hover:text-[#555] transition-colors">
                  {project.title}
                </h3>
                {project.is_top && (
                  <Badge variant="secondary" className="text-xs px-1 py-0">
                    TOP
                  </Badge>
                )}
                {project.link && (
                  <ExternalLink className="w-3 h-3 text-[#666] opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              <p className="font-['Anonymous_Pro'] text-xs text-[#666] line-clamp-1">
                {project.description}
              </p>
            </div>

            {/* Categories */}
            <div className="col-span-2 flex flex-wrap gap-1">
              {Array.isArray(project.category) ? (
                project.category.slice(0, 2).map((cat) => (
                  <Badge
                    key={cat}
                    variant="outline"
                    className="text-xs font-['Anonymous_Pro'] uppercase tracking-wide"
                  >
                    {cat}
                  </Badge>
                ))
              ) : (
                <Badge
                  variant="outline"
                  className="text-xs font-['Anonymous_Pro'] uppercase tracking-wide"
                >
                  {project.category}
                </Badge>
              )}
              {Array.isArray(project.category) && project.category.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{project.category.length - 2}
                </Badge>
              )}
            </div>

            {/* Year */}
            <div className="col-span-1 flex items-center">
              <div className="flex items-center gap-1 text-[#666]">
                <Calendar className="w-3 h-3" />
                <span className="font-['Anonymous_Pro'] text-xs">
                  {project.year}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="col-span-3 flex flex-wrap gap-1">
              {project.tags && project.tags.length > 0 ? (
                <>
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs font-['Anonymous_Pro'] uppercase tracking-wide opacity-70"
                    >
                      <Tag className="w-2 h-2 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs opacity-70">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </>
              ) : (
                <span className="font-['Anonymous_Pro'] text-xs text-[#666] opacity-50">
                  No tags
                </span>
              )}
            </div>

            {/* Status & Links */}
            <div className="col-span-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {project.live_url && (
                  <div className="w-2 h-2 bg-green-500 rounded-full" title="Live" />
                )}
                {project.github_url && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full" title="GitHub" />
                )}
                {project.link && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full" title="Case Study" />
                )}
              </div>
              
              <span className="font-['Anonymous_Pro'] text-xs text-[#666] uppercase">
                Click to view
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="p-8 text-center">
          <p className="font-['Anonymous_Pro'] text-sm text-[#666] uppercase tracking-wide">
            No projects match your filters
          </p>
        </div>
      )}
    </div>
  );
}