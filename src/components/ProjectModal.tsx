import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { ProjectModalHero } from './ProjectModalHero';
import { ProjectModalSidebar } from './ProjectModalSidebar';
import { ProjectModalContent } from './ProjectModalContent';
import { ProjectModalImageViewer } from './ProjectModalImageViewer';
import { getSafeProjectData, getCategoryLabels, getProjectImage, getGalleryImages } from '../utils/projectModalHelpers';
import type { ProjectModalProps } from '../utils/projectModalConstants';

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);

  if (!project) return null;

  const {
    safeTitle,
    safeDescription,
    safeYear,
    safeCategories,
    safeTechnologies,
    safeGalleryImages,
    safeContentBlocks
  } = getSafeProjectData(project);

  const categoryLabels = getCategoryLabels(safeCategories);
  const projectImage = getProjectImage(project);
  const galleryImages = getGalleryImages(safeGalleryImages);
  
  // Collect all images from content blocks for gallery navigation
  const allGalleryImages = [...galleryImages];
  safeContentBlocks.forEach(block => {
    block.media.forEach(mediaItem => {
      if (mediaItem.type === 'image' || mediaItem.type === 'gif') {
        allGalleryImages.push(mediaItem.url);
      }
    });
  });
  
  const handleImageClick = (imageUrl: string) => {
    const index = allGalleryImages.findIndex(url => url === imageUrl);
    if (index !== -1) {
      setSelectedImageIndex(index);
    }
  };

  return (
    <>
      {/* Main Project Modal */}
      <Dialog open={isOpen && selectedImageIndex === -1} onOpenChange={onClose}>
        <DialogContent className="max-w-full sm:max-w-7xl max-h-[95vh] overflow-hidden p-0 bg-transparent border-none">
          <DialogTitle className="sr-only">{safeTitle}</DialogTitle>
          <DialogDescription className="sr-only">
            {safeDescription} - Detailed project case study including overview, challenge, solution, and results.
          </DialogDescription>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="absolute top-6 right-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full w-12 h-12 p-0 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Scrollable Content */}
            <div className="max-h-[95vh] overflow-y-auto">
              {/* Hero Section */}
              <ProjectModalHero
                project={project}
                safeTitle={safeTitle}
                safeDescription={safeDescription}
                categoryLabels={categoryLabels}
                projectImage={projectImage}
              />

              {/* Content Sections */}
              <div className="p-4 sm:p-8 md:p-12">
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
                  {/* Main Content */}
                  <div className="xl:col-span-3 space-y-12">
                    <ProjectModalContent
                      project={project}
                      safeDescription={safeDescription}
                      safeContentBlocks={safeContentBlocks}
                      galleryImages={galleryImages}
                      safeTitle={safeTitle}
                      onImageClick={handleImageClick}
                    />
                  </div>

                  {/* Sidebar */}
                  <ProjectModalSidebar
                    project={project}
                    safeYear={safeYear}
                    safeTechnologies={safeTechnologies}
                    categoryLabels={categoryLabels}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Image Viewer Modal */}
      <ProjectModalImageViewer
        images={allGalleryImages}
        currentIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(-1)}
        onNavigate={setSelectedImageIndex}
      />
    </>
  );
}