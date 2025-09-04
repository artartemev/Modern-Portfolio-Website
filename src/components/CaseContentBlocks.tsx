import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MediaUploader } from './MediaUploader';
import { Plus, Trash2, MoveUp, MoveDown, Type, FileText, Image } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'gif' | 'video';
  name?: string;
}

export interface ContentBlock {
  id: string;
  title: string;
  content: string;
  media: MediaItem[];
  order: number;
}

interface CaseContentBlocksProps {
  blocks: ContentBlock[];
  onBlocksChange: (blocks: ContentBlock[]) => void;
  className?: string;
}

export function CaseContentBlocks({ 
  blocks, 
  onBlocksChange, 
  className = "" 
}: CaseContentBlocksProps) {
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set());

  const addNewBlock = () => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      title: '',
      content: '',
      media: [],
      order: blocks.length
    };
    onBlocksChange([...blocks, newBlock]);
    setExpandedBlocks(prev => new Set([...prev, newBlock.id]));
    toast.success('New content block added');
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    const updatedBlocks = blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    );
    onBlocksChange(updatedBlocks);
  };

  const removeBlock = (id: string) => {
    const updatedBlocks = blocks.filter(block => block.id !== id)
      .map((block, index) => ({ ...block, order: index }));
    onBlocksChange(updatedBlocks);
    setExpandedBlocks(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    toast.success('Content block removed');
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const currentIndex = blocks.findIndex(block => block.id === id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === blocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Swap blocks
    [newBlocks[currentIndex], newBlocks[targetIndex]] = 
    [newBlocks[targetIndex], newBlocks[currentIndex]];
    
    // Update order
    newBlocks.forEach((block, index) => {
      block.order = index;
    });

    onBlocksChange(newBlocks);
  };

  const toggleExpanded = (id: string) => {
    setExpandedBlocks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getBlockPreview = (block: ContentBlock) => {
    const hasContent = block.title.trim() || block.content.trim() || block.media.length > 0;
    const previewText = block.title.trim() || block.content.trim().substring(0, 50) + '...' || 'Empty block';
    
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1">
            {block.title.trim() && <Type className="w-4 h-4 text-blue-600" />}
            {block.content.trim() && <FileText className="w-4 h-4 text-green-600" />}
            {block.media.length > 0 && <Image className="w-4 h-4 text-purple-600" />}
          </div>
          <span className={`font-['Anonymous_Pro'] text-sm truncate ${
            hasContent ? 'text-[#323232]' : 'text-[#323232]/50'
          }`}>
            {previewText}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {blocks.length > 1 && (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  moveBlock(block.id, 'up');
                }}
                disabled={block.order === 0}
                className="h-6 w-6 p-0"
              >
                <MoveUp className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  moveBlock(block.id, 'down');
                }}
                disabled={block.order === blocks.length - 1}
                className="h-6 w-6 p-0"
              >
                <MoveDown className="w-3 h-3" />
              </Button>
            </>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              removeBlock(block.id);
            }}
            className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="font-['Anonymous_Pro'] uppercase tracking-wide text-lg">
          Case Study Content Blocks
        </Label>
        <Button
          type="button"
          onClick={addNewBlock}
          variant="outline"
          size="sm"
          className="font-['Anonymous_Pro'] uppercase tracking-wide"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Block
        </Button>
      </div>

      <div className="space-y-3">
        {blocks.length === 0 && (
          <Card className="bg-white/5 backdrop-blur-md border-white/10 border-dashed">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center gap-3 text-[#323232]/60">
                <FileText className="w-8 h-8" />
                <div>
                  <p className="font-['Anonymous_Pro'] uppercase tracking-wide mb-1">
                    No content blocks yet
                  </p>
                  <p className="font-['Anonymous_Pro'] text-sm">
                    Add structured blocks with titles, descriptions, and media
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={addNewBlock}
                  variant="outline"
                  size="sm"
                  className="font-['Anonymous_Pro'] uppercase tracking-wide"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Block
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {blocks.map((block) => {
          const isExpanded = expandedBlocks.has(block.id);
          const hasContent = block.title.trim() || block.content.trim() || block.media.length > 0;
          
          return (
            <Card 
              key={block.id} 
              className={`bg-white/10 backdrop-blur-md border-white/20 transition-all duration-200 ${
                hasContent ? 'border-blue-200' : ''
              }`}
            >
              <CardHeader 
                className="pb-3 cursor-pointer"
                onClick={() => toggleExpanded(block.id)}
              >
                <CardTitle className="font-['Anonymous_Pro'] text-base text-[#323232] uppercase tracking-wider">
                  {getBlockPreview(block)}
                </CardTitle>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="space-y-4 pt-0">
                  {/* Block Title */}
                  <div>
                    <Label htmlFor={`block-title-${block.id}`} className="font-['Anonymous_Pro'] uppercase tracking-wide text-sm">
                      Block Title
                    </Label>
                    <Input
                      id={`block-title-${block.id}`}
                      value={block.title}
                      onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                      placeholder="e.g., Project Overview, Challenge, Solution, Results..."
                      className="font-['Anonymous_Pro']"
                    />
                  </div>

                  {/* Block Content */}
                  <div>
                    <Label htmlFor={`block-content-${block.id}`} className="font-['Anonymous_Pro'] uppercase tracking-wide text-sm">
                      Block Content
                    </Label>
                    <Textarea
                      id={`block-content-${block.id}`}
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                      placeholder="Describe this section of your case study in detail..."
                      className="font-['Anonymous_Pro'] min-h-[100px]"
                      rows={4}
                    />
                  </div>

                  {/* Block Media */}
                  <div>
                    <MediaUploader
                      media={block.media}
                      onMediaChange={(media) => updateBlock(block.id, { media })}
                      maxFiles={5}
                      acceptedTypes={['image/*', '.gif']}
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="font-['Anonymous_Pro'] text-xs text-[#323232]/60 uppercase">
                      Block {block.order + 1} of {blocks.length}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleExpanded(block.id)}
                        className="font-['Anonymous_Pro'] uppercase tracking-wide text-xs"
                      >
                        Collapse
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {blocks.length > 0 && (
        <div className="text-center py-4 border-t border-white/10">
          <p className="font-['Anonymous_Pro'] text-sm text-[#323232]/70 uppercase tracking-wide">
            {blocks.filter(b => b.title.trim() || b.content.trim() || b.media.length > 0).length} of {blocks.length} blocks have content
          </p>
        </div>
      )}
    </div>
  );
}