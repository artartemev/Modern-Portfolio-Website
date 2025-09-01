import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Upload, X, Image, Film } from 'lucide-react';
import { toast } from 'sonner';

interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'gif' | 'video';
  name?: string;
}

interface MediaUploaderProps {
  media: MediaItem[];
  onMediaChange: (media: MediaItem[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  className?: string;
}

export function MediaUploader({ 
  media, 
  onMediaChange, 
  maxFiles = 10,
  acceptedTypes = ['image/*', '.gif'],
  className = "" 
}: MediaUploaderProps) {
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getMediaType = (url: string): 'image' | 'gif' | 'video' => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('.gif') || lowerUrl.includes('giphy.com')) return 'gif';
    if (lowerUrl.includes('.mp4') || lowerUrl.includes('.webm') || lowerUrl.includes('.mov')) return 'video';
    return 'image';
  };

  const handleUrlAdd = () => {
    if (!urlInput.trim()) return;
    
    if (media.length >= maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newMedia: MediaItem = {
      id: Date.now().toString(),
      url: urlInput.trim(),
      type: getMediaType(urlInput),
      name: urlInput.split('/').pop()?.split('?')[0] || 'Media'
    };

    onMediaChange([...media, newMedia]);
    setUrlInput('');
    toast.success('Media added successfully');
  };

  const handleFileUpload = async (files: FileList) => {
    if (media.length + files.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real implementation, you would upload to Supabase Storage here
      // For now, we'll simulate the upload process
      const newMediaItems: MediaItem[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        const isValidType = acceptedTypes.some(type => {
          if (type === 'image/*') return file.type.startsWith('image/');
          if (type === '.gif') return file.name.toLowerCase().endsWith('.gif');
          return file.type === type;
        });

        if (!isValidType) {
          toast.error(`File type not supported: ${file.name}`);
          continue;
        }

        // Create object URL for preview (in real app, would be Supabase Storage URL)
        const objectUrl = URL.createObjectURL(file);
        
        const mediaItem: MediaItem = {
          id: Date.now().toString() + i,
          url: objectUrl,
          type: file.type === 'image/gif' ? 'gif' : 
                file.type.startsWith('video/') ? 'video' : 'image',
          name: file.name
        };
        
        newMediaItems.push(mediaItem);
      }

      onMediaChange([...media, ...newMediaItems]);
      toast.success(`${newMediaItems.length} file(s) uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload files');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleRemove = (id: string) => {
    const updatedMedia = media.filter(item => item.id !== id);
    onMediaChange(updatedMedia);
    toast.success('Media removed');
  };

  const renderMediaPreview = (item: MediaItem) => {
    const iconMap = {
      image: <Image className="w-4 h-4" />,
      gif: <Film className="w-4 h-4" />,
      video: <Film className="w-4 h-4" />
    };

    return (
      <div key={item.id} className="relative group">
        <Card className="overflow-hidden bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-2">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2">
              {item.type === 'video' ? (
                <video 
                  src={item.url} 
                  className="w-full h-full object-cover"
                  controls={false}
                  muted
                />
              ) : (
                <img 
                  src={item.url} 
                  alt={item.name || 'Media'} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 min-w-0">
                {iconMap[item.type]}
                <span className="text-xs font-['Anonymous_Pro'] text-[#323232] truncate">
                  {item.name || 'Media'}
                </span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleRemove(item.id)}
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* URL Input */}
      <div className="space-y-2">
        <Label className="font-['Anonymous_Pro'] uppercase tracking-wide">
          Add Media URL (Images, GIFs, Videos)
        </Label>
        <div className="flex gap-2">
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg or https://giphy.com/gifs/..."
            className="font-['Anonymous_Pro']"
            onKeyPress={(e) => e.key === 'Enter' && handleUrlAdd()}
          />
          <Button
            type="button"
            onClick={handleUrlAdd}
            variant="outline"
            className="font-['Anonymous_Pro'] uppercase tracking-wide"
          >
            Add
          </Button>
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <Label className="font-['Anonymous_Pro'] uppercase tracking-wide">
          Or Upload Files
        </Label>
        <div
          className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-[#323232]/60" />
          <p className="font-['Anonymous_Pro'] text-sm text-[#323232]/80 uppercase mb-2">
            Drag & drop files here
          </p>
          <p className="font-['Anonymous_Pro'] text-xs text-[#323232]/60 mb-4">
            Supports: JPG, PNG, GIF, WebP (Max {maxFiles} files)
          </p>
          <Input
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            className="hidden"
            id="media-upload"
            disabled={isLoading}
          />
          <Label
            htmlFor="media-upload"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg cursor-pointer transition-colors font-['Anonymous_Pro'] uppercase tracking-wide"
          >
            <Upload className="w-4 h-4" />
            {isLoading ? 'Uploading...' : 'Choose Files'}
          </Label>
        </div>
      </div>

      {/* Media Preview Grid */}
      {media.length > 0 && (
        <div className="space-y-2">
          <Label className="font-['Anonymous_Pro'] uppercase tracking-wide">
            Media ({media.length}/{maxFiles})
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {media.map(renderMediaPreview)}
          </div>
        </div>
      )}
    </div>
  );
}