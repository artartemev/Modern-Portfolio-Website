import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Checkbox } from './ui/checkbox';
import { Grid, List, Star, X } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './ui/utils';
import { CATEGORIES, YEARS } from '../utils/constants';

interface FilterControlsProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  selectedYear: string;
  onYearChange: (year: string) => void;

  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  availableTags: string[];
  showTopOnly: boolean;
  onTopToggle: () => void;
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  className?: string;
}

export function FilterControls({
  selectedCategories,
  onCategoriesChange,
  selectedYear,
  onYearChange,

  selectedTags,
  onTagToggle,
  availableTags,
  showTopOnly,
  onTopToggle,
  view,
  onViewChange,
  className,
}: FilterControlsProps) {
  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoriesChange(newCategories);
  };

  const clearAllCategories = () => {
    onCategoriesChange([]);
  };

  return (
    <div className={cn('hidden lg:block', className)}>
      <motion.div
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 space-y-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
      {/* View Toggle */}
      <div className="space-y-3">
        <h3 className="font-['Anonymous_Pro'] text-sm text-[#323232] uppercase tracking-wider">View</h3>
        <div className="flex gap-2">
          <Button
            variant={view === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('grid')}
            className="font-['Anonymous_Pro'] uppercase tracking-wide text-xs"
          >
            <Grid className="w-3 h-3 mr-2" />
            Grid
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange('list')}
            className="font-['Anonymous_Pro'] uppercase tracking-wide text-xs"
          >
            <List className="w-3 h-3 mr-2" />
            List
          </Button>
        </div>
      </div>

      <Separator className="bg-white/20" />

      {/* Top Projects Toggle */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-['Anonymous_Pro'] text-sm text-[#323232] uppercase tracking-wider">Top Projects</h3>
          <Switch checked={showTopOnly} onCheckedChange={onTopToggle} />
        </div>
        {showTopOnly && (
          <div className="flex items-center gap-2 text-yellow-600">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-['Anonymous_Pro'] text-xs uppercase tracking-wide">
              Showing top projects only
            </span>
          </div>
        )}
      </div>

      <Separator className="bg-white/20" />

      {/* Categories - Multiple Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-['Anonymous_Pro'] text-sm text-[#323232] uppercase tracking-wider">Categories</h3>
          {selectedCategories.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllCategories}
              className="h-6 px-2 text-xs font-['Anonymous_Pro'] uppercase tracking-wide text-[#323232]/60 hover:text-[#323232]"
            >
              <X className="w-3 h-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
        
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryToggle(category.id)}
              />
              <label
                htmlFor={category.id}
                className="font-['Anonymous_Pro'] text-sm text-[#323232]/80 uppercase tracking-wide cursor-pointer hover:text-[#323232] transition-colors"
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>

        {/* Selected Categories Display */}
        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {selectedCategories.map((categoryId) => {
              const category = CATEGORIES.find(c => c.id === categoryId);
              return (
                <Badge
                  key={categoryId}
                  variant="secondary"
                  className="text-xs font-['Anonymous_Pro'] uppercase tracking-wide"
                >
                  {category?.label}
                </Badge>
              );
            })}
          </div>
        )}
      </div>

      <Separator className="bg-white/20" />

      {/* Year Filter */}
      <div className="space-y-3">
        <h3 className="font-['Anonymous_Pro'] text-sm text-[#323232] uppercase tracking-wider">Year</h3>
        <div className="flex flex-wrap gap-2">
          {YEARS.map((year) => (
            <Button
              key={year}
              variant={selectedYear === year.toString() ? 'default' : 'outline'}
              size="sm"
              onClick={() => onYearChange(year.toString())}
              className="font-['Anonymous_Pro'] uppercase tracking-wide text-xs"
            >
              {year}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="bg-white/20" />

      {/* Tags Filter */}
      <div className="space-y-3">
        <h3 className="font-['Anonymous_Pro'] text-sm text-[#323232] uppercase tracking-wider">
          Tags ({selectedTags.length})
        </h3>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {availableTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              className={`cursor-pointer font-['Anonymous_Pro'] uppercase tracking-wide text-xs transition-all duration-200 ${
                selectedTags.includes(tag)
                  ? 'bg-[#323232] text-white hover:bg-[#323232]/80'
                  : 'hover:bg-[#323232]/10'
              }`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        {selectedTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => selectedTags.forEach(tag => onTagToggle(tag))}
            className="w-full font-['Anonymous_Pro'] uppercase tracking-wide text-xs text-[#323232]/60 hover:text-[#323232]"
          >
            Clear All Tags
          </Button>
        )}
      </div>
      </motion.div>
    </div>
  );
}