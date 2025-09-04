import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Project } from '../utils/projectModalConstants';

interface ProjectModalHeroProps {
  project: Project;
  safeTitle: string;
  safeDescription: string;
  categoryLabels: string[];
  projectImage: string;
}

export function ProjectModalHero({ 
  project, 
  safeTitle, 
  safeDescription, 
  categoryLabels, 
  projectImage 
}: ProjectModalHeroProps) {
  return (
    <div className="relative h-[50vh] min-h-[400px] bg-gradient-to-br from-black/40 to-black/60">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={projectImage}
          alt={safeTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            {categoryLabels.map((label, index) => (
              <Badge
                key={index}
                className="bg-white/20 backdrop-blur-sm text-white border-white/30 font-['Anonymous_Pro'] uppercase tracking-wide px-4 py-2"
              >
                {label}
              </Badge>
            ))}
            {project.is_top && (
              <Badge className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm text-yellow-100 border-yellow-400/30 font-['Anonymous_Pro'] uppercase tracking-wide px-4 py-2">
                ⭐ Top Project
              </Badge>
            )}
          </div>
          
          <h1 className="text-5xl md:text-6xl font-['Feature_Mono'] text-white mb-6 uppercase tracking-wider leading-tight">
            {safeTitle}
          </h1>
          
          <p className="text-white/90 text-xl max-w-4xl leading-relaxed mb-8">
            {safeDescription}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap">
            {project.link && (
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 backdrop-blur-md border border-blue-400/40 text-white hover:from-blue-500/40 hover:to-purple-500/40 font-['Anonymous_Pro'] uppercase tracking-wide px-8 py-3"
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-3" />
                  View Case Study
                </a>
              </Button>
            )}
            
            {project.live_url && (
              <Button
                asChild
                size="lg"
                className="bg-white/20 backdrop-blur-md border border-white/40 text-white hover:bg-white/30 hover:text-white font-['Anonymous_Pro'] uppercase tracking-wide px-8 py-3"
              >
                <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-3" />
                  Live Site
                </a>
              </Button>
            )}
            
            {project.github_url && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent backdrop-blur-md border border-white/40 text-white hover:bg-white/10 hover:text-white font-['Anonymous_Pro'] uppercase tracking-wide px-8 py-3"
              >
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-3" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}