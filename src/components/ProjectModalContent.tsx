import { motion } from 'motion/react';
import { Target, Lightbulb, Wrench, TrendingUp, FileText, Image, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import type { Project, ContentBlock, MediaItem } from '../utils/projectModalConstants';

interface ProjectModalContentProps {
  project: Project;
  safeDescription: string;
  safeContentBlocks: ContentBlock[];
  galleryImages: string[];
  safeTitle: string;
  onImageClick: (url: string) => void;
}

export function ProjectModalContent({
  project,
  safeDescription,
  safeContentBlocks,
  galleryImages,
  safeTitle,
  onImageClick
}: ProjectModalContentProps) {
  // Function to render media item
  const renderMediaItem = (mediaItem: MediaItem, index: number) => {
    return (
      <motion.div
        key={mediaItem.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
        className="cursor-pointer rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-300 group"
        onClick={() => onImageClick(mediaItem.url)}
      >
        <div className="relative">
          {mediaItem.type === 'video' ? (
            <video 
              src={mediaItem.url} 
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              controls={false}
              muted
              loop
              onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
              onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
            />
          ) : (
            <ImageWithFallback
              src={mediaItem.url}
              alt={mediaItem.name || 'Media content'}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-md rounded-full p-3">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
          </div>
          {mediaItem.type === 'gif' && (
            <div className="absolute top-2 right-2 bg-purple-500/80 text-white text-xs px-2 py-1 rounded-full font-['Anonymous_Pro'] uppercase">
              GIF
            </div>
          )}
          {mediaItem.type === 'video' && (
            <div className="absolute top-2 right-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded-full font-['Anonymous_Pro'] uppercase">
              VIDEO
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  // Function to render content block
  const renderContentBlock = (block: ContentBlock, index: number) => {
    const hasTitle = block.title && block.title.trim();
    const hasContent = block.content && block.content.trim();
    const hasMedia = block.media && block.media.length > 0;
    
    // Don't render empty blocks
    if (!hasTitle && !hasContent && !hasMedia) return null;

    return (
      <motion.section
        key={block.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
      >
        {hasTitle && (
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-300" />
            </div>
            <h2 className="text-3xl font-['Anonymous_Pro'] text-white uppercase tracking-wider">
              {block.title}
            </h2>
          </div>
        )}
        
        {hasContent && (
          <div className="mb-8">
            <p className="text-white/80 text-lg leading-relaxed whitespace-pre-line">
              {block.content}
            </p>
          </div>
        )}
        
        {hasMedia && (
          <div className="space-y-4">
            {hasTitle || hasContent ? (
              <div className="flex items-center gap-2 mb-4">
                <Image className="w-5 h-5 text-purple-300" />
                <span className="text-white/60 font-['Anonymous_Pro'] uppercase tracking-wide text-sm">
                  Media ({block.media.length})
                </span>
              </div>
            ) : null}
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="16px">
                {block.media.map((mediaItem, mediaIndex) => renderMediaItem(mediaItem, mediaIndex))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        )}
      </motion.section>
    );
  };

  return (
    <>
      {/* Structured Content Blocks */}
      {safeContentBlocks.length > 0 ? (
        // Render structured content blocks if available
        safeContentBlocks.map((block, index) => renderContentBlock(block, index))
      ) : (
        // Fallback to traditional sections if no content blocks
        <>
          {/* Project Overview */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-blue-300" />
              </div>
              <h2 className="text-3xl font-['Anonymous_Pro'] text-white uppercase tracking-wider">
                Project Overview
              </h2>
            </div>
            <p className="text-white/80 text-lg leading-relaxed">
              {project.overview || safeDescription}
            </p>
          </motion.section>

          {/* Challenge Section */}
          {project.challenge && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-red-300" />
                </div>
                <h2 className="text-3xl font-['Anonymous_Pro'] text-white uppercase tracking-wider">
                  The Challenge
                </h2>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                {project.challenge}
              </p>
            </motion.section>
          )}

          {/* Solution Section */}
          {project.solution && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-green-300" />
                </div>
                <h2 className="text-3xl font-['Anonymous_Pro'] text-white uppercase tracking-wider">
                  The Solution
                </h2>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                {project.solution}
              </p>
            </motion.section>
          )}

          {/* Results Section */}
          {project.results && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-300" />
                </div>
                <h2 className="text-3xl font-['Anonymous_Pro'] text-white uppercase tracking-wider">
                  Results & Impact
                </h2>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                {project.results}
              </p>
            </motion.section>
          )}
        </>
      )}

      {/* Image Gallery - Only show if no content blocks or if content blocks don't have enough media */}
      {galleryImages.length > 1 && safeContentBlocks.length === 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8"
        >
          <h2 className="text-3xl font-['Anonymous_Pro'] text-white mb-8 uppercase tracking-wider">
            Project Gallery
          </h2>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
          >
            <Masonry gutter="16px">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  className="cursor-pointer rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-300 group"
                  onClick={() => onImageClick(image)}
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={image}
                      alt={`${safeTitle} gallery ${index + 1}`}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-md rounded-full p-3">
                        <ArrowRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </motion.section>
      )}
    </>
  );
}