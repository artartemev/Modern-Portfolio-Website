import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Calendar, User } from 'lucide-react';
import type { Project } from '../utils/projectModalConstants';

interface ProjectModalSidebarProps {
  project: Project;
  safeYear: number;
  safeTechnologies: string[];
  categoryLabels: string[];
}

export function ProjectModalSidebar({ 
  project, 
  safeYear, 
  safeTechnologies, 
  categoryLabels 
}: ProjectModalSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Project Details */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6"
      >
        <h3 className="text-xl font-['Anonymous_Pro'] text-white mb-6 uppercase tracking-wider">
          Project Details
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Calendar className="w-6 h-6 text-blue-300" />
            <div>
              <p className="text-sm text-white/60 uppercase tracking-wide font-['Anonymous_Pro'] mb-1">Year</p>
              <p className="text-white text-lg font-medium">{safeYear}</p>
            </div>
          </div>

          {project.client && (
            <div className="flex items-center gap-4">
              <User className="w-6 h-6 text-green-300" />
              <div>
                <p className="text-sm text-white/60 uppercase tracking-wide font-['Anonymous_Pro'] mb-1">Client</p>
                <p className="text-white text-lg font-medium">{project.client}</p>
              </div>
            </div>
          )}

          {project.duration && (
            <div>
              <p className="text-sm text-white/60 uppercase tracking-wide font-['Anonymous_Pro'] mb-2">Duration</p>
              <p className="text-white text-lg font-medium">{project.duration}</p>
            </div>
          )}

          {project.role && (
            <div>
              <p className="text-sm text-white/60 uppercase tracking-wide font-['Anonymous_Pro'] mb-2">My Role</p>
              <p className="text-white text-lg font-medium">{project.role}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Technologies */}
      {safeTechnologies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6"
        >
          <h3 className="text-xl font-['Anonymous_Pro'] text-white mb-6 uppercase tracking-wider">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-3">
            {safeTechnologies.map((tech, index) => (
              <Badge
                key={index}
                className="bg-white/10 border-white/20 text-white font-['Anonymous_Pro'] text-sm uppercase tracking-wide px-3 py-1"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6"
      >
        <h3 className="text-xl font-['Anonymous_Pro'] text-white mb-6 uppercase tracking-wider">
          Categories
        </h3>
        <div className="flex flex-wrap gap-3">
          {categoryLabels.map((label, index) => (
            <Badge
              key={index}
              className="bg-blue-500/20 border-blue-400/30 text-blue-100 font-['Anonymous_Pro'] text-sm uppercase tracking-wide px-3 py-1"
            >
              {label}
            </Badge>
          ))}
        </div>
      </motion.div>
    </div>
  );
}