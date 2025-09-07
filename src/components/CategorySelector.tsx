import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES } from '../utils/constants';

interface CategorySelectorProps {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

export function CategorySelector({ selectedCategories, onChange }: CategorySelectorProps) {
  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    onChange(newCategories);
  };

  const clearAllCategories = () => {
    onChange([]);
  };

  const removeCategory = (categoryId: string) => {
    onChange(selectedCategories.filter(id => id !== categoryId));
  };

  return (
    <div className="space-y-4">
      {/* Category Checkboxes */}
      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="flex items-center space-x-3">
            <Checkbox
              id={`category-${category.id}`}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={() => handleCategoryToggle(category.id)}
            />
            <label
              htmlFor={`category-${category.id}`}
              className="font-['Anonymous_Pro'] text-sm text-[#323232] uppercase tracking-wide cursor-pointer hover:text-[#555] transition-colors"
            >
              {category.label}
            </label>
          </div>
        ))}
      </div>

      {/* Selected Categories Display */}
      {selectedCategories.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-['Anonymous_Pro'] text-xs text-[#666] uppercase tracking-wide">
              Selected ({selectedCategories.length})
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearAllCategories}
              className="h-6 px-2 text-xs font-['Anonymous_Pro'] uppercase tracking-wide text-[#666] hover:text-[#323232]"
            >
              Clear All
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {selectedCategories.map((categoryId) => {
                const category = CATEGORIES.find(c => c.id === categoryId);
                return (
                  <motion.div
                    key={categoryId}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge
                      variant="secondary"
                      className="font-['Anonymous_Pro'] uppercase tracking-wide text-xs flex items-center gap-1 pr-1"
                    >
                      {category?.label}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-red-500/20"
                        onClick={() => removeCategory(categoryId)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Validation Message */}
      {selectedCategories.length === 0 && (
        <p className="text-xs text-orange-600 font-['Anonymous_Pro']">
          Please select at least one category
        </p>
      )}
    </div>
  );
}