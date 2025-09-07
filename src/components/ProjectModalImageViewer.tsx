import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect } from 'react';

interface ProjectModalImageViewerProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ProjectModalImageViewer({ images, currentIndex, onClose, onNavigate }: ProjectModalImageViewerProps) {
  const isOpen = currentIndex >= 0 && currentIndex < images.length;
  const currentImage = isOpen ? images[currentIndex] : null;
  const hasMultipleImages = images.length > 1;
  
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);
  
  const goToPrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else if (hasMultipleImages) {
      onNavigate(images.length - 1); // Loop to last image
    }
  };
  
  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
    } else if (hasMultipleImages) {
      onNavigate(0); // Loop to first image
    }
  };

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden p-0 bg-transparent border-none">
            <DialogTitle className="sr-only">
              Image Viewer - {currentIndex + 1} of {images.length}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Full-size image viewer for project gallery. Use arrow keys or navigation buttons to browse images. Press escape or click the close button to return to the project modal.
            </DialogDescription>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Header with controls */}
              <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent p-4">
                <div className="flex items-center justify-between">
                  {/* Image counter */}
                  {hasMultipleImages && (
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full">
                      <span className="font-['Anonymous_Pro'] text-sm">
                        {currentIndex + 1} / {images.length}
                      </span>
                    </div>
                  )}
                  
                  {/* Close button */}
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full w-10 h-10 p-0 ml-auto"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              {/* Navigation arrows */}
              {hasMultipleImages && (
                <>
                  {/* Previous button */}
                  <Button
                    onClick={goToPrevious}
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full w-12 h-12 p-0 transition-all duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  
                  {/* Next button */}
                  <Button
                    onClick={goToNext}
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full w-12 h-12 p-0 transition-all duration-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
              
              {/* Image container */}
              <div className="p-4 pt-16">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <ImageWithFallback
                    src={currentImage}
                    alt={`Gallery image ${currentIndex + 1}`}
                    className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                  />
                </motion.div>
              </div>
              
              {/* Bottom navigation dots */}
              {hasMultipleImages && images.length <= 10 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
                  <div className="flex gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => onNavigate(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}