import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectModalImageViewerProps {
  selectedImage: string | null;
  onClose: () => void;
}

export function ProjectModalImageViewer({ selectedImage, onClose }: ProjectModalImageViewerProps) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={onClose}>
          <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden p-0 bg-transparent border-none">
            <DialogTitle className="sr-only">Image Viewer</DialogTitle>
            <DialogDescription className="sr-only">
              Full-size image viewer for project gallery. Press escape or click the close button to return to the project modal.
            </DialogDescription>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden"
            >
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white rounded-full w-10 h-10 p-0"
              >
                <X className="w-5 h-5" />
              </Button>
              
              <div className="p-4">
                <ImageWithFallback
                  src={selectedImage}
                  alt="Enlarged view"
                  className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                />
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}