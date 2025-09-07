import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Upload, X, Image as ImageIcon, Link, Monitor } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface CoverImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export function CoverImageUploader({ 
  value, 
  onChange, 
  className = "" 
}: CoverImageUploaderProps) {
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlAdd = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    setUrlInput('');
    toast.success('Cover image URL added');
  };

  const handleFileUpload = async (files: FileList) => {
    if (files.length === 0) return;
    
    const file = files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real implementation, you would upload to Supabase Storage here
      // For now, we'll create an object URL for preview
      const objectUrl = URL.createObjectURL(file);
      onChange(objectUrl);
      toast.success('Cover image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
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

  const handleRemove = () => {
    onChange('');
    toast.success('Cover image removed');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Label className="font-['Anonymous_Pro'] uppercase tracking-wide">
        Cover Image
      </Label>

      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid grid-cols-2 w-full bg-white/10 backdrop-blur-md">
          <TabsTrigger 
            value="url" 
            className="font-['Anonymous_Pro'] uppercase tracking-wide data-[state=active]:bg-white/20"
          >
            <Link className="w-4 h-4 mr-2" />
            URL
          </TabsTrigger>
          <TabsTrigger 
            value="upload" 
            className="font-['Anonymous_Pro'] uppercase tracking-wide data-[state=active]:bg-white/20"
          >
            <Monitor className="w-4 h-4 mr-2" />
            Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/cover-image.jpg"
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
        </TabsContent>

        <TabsContent value="upload" className="space-y-3">
          <div
            className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-[#323232]/60" />
            <p className="font-['Anonymous_Pro'] text-sm text-[#323232]/80 uppercase mb-2">
              Drag & drop image here
            </p>
            <p className="font-['Anonymous_Pro'] text-xs text-[#323232]/60 mb-4">
              Supports: JPG, PNG, WebP (Max 5MB)
            </p>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              className="hidden"
              id="cover-upload"
              disabled={isLoading}
            />
            <Label
              htmlFor="cover-upload"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg cursor-pointer transition-colors font-['Anonymous_Pro'] uppercase tracking-wide"
            >
              <Upload className="w-4 h-4" />
              {isLoading ? 'Uploading...' : 'Choose Image'}
            </Label>
          </div>
        </TabsContent>
      </Tabs>

      {/* Image Preview */}
      {value && (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2 max-w-xs">
                  <img 
                    src={value} 
                    alt="Cover preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                  <span className="font-['Anonymous_Pro'] text-sm text-[#323232] truncate">
                    {value.startsWith('blob:') ? 'Uploaded image' : value}
                  </span>
                </div>
              </div>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={handleRemove}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}