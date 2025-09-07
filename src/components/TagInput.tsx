import { useState, useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TagInputProps {
  tags: string[];
  availableTags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({ tags, availableTags, onChange, placeholder = "Add tags..." }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update suggestions based on input
  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = availableTags
        .filter(tag => 
          tag.toLowerCase().includes(inputValue.toLowerCase()) &&
          !tags.includes(tag)
        )
        .slice(0, 8); // Limit to 8 suggestions
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedSuggestionIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, availableTags, tags]);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onChange([...tags, trimmedTag]);
    }
    setInputValue('');
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
        addTag(suggestions[selectedSuggestionIndex]);
      } else if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag if input is empty
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleSuggestionClick = (tag: string) => {
    addTag(tag);
    inputRef.current?.focus();
  };

  return (
    <div className="space-y-3 relative">
      {/* Selected Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {tags.map((tag) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  variant="secondary"
                  className="font-['Anonymous_Pro'] uppercase tracking-wide text-xs flex items-center gap-1 pr-1"
                >
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-red-500/20"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Input Field */}
      <div className="relative">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue && setShowSuggestions(suggestions.length > 0)}
            onBlur={() => {
              // Delay hiding suggestions to allow clicking
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            placeholder={placeholder}
            className="font-['Anonymous_Pro'] flex-1"
          />
          
          {inputValue.trim() && (
            <Button
              type="button"
              size="sm"
              onClick={() => addTag(inputValue)}
              className="font-['Anonymous_Pro'] uppercase tracking-wide text-xs"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add
            </Button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              ref={suggestionsRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 z-50 mt-1 bg-white/90 backdrop-blur-md border border-white/20 rounded-xl shadow-lg max-h-48 overflow-y-auto"
            >
              <div className="p-2">
                <div className="text-xs font-['Anonymous_Pro'] text-[#666] uppercase tracking-wide px-2 py-1 border-b border-white/20 mb-1">
                  Suggestions
                </div>
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    type="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className={`w-full text-left px-2 py-1 rounded-lg font-['Anonymous_Pro'] text-xs uppercase tracking-wide transition-colors ${
                      index === selectedSuggestionIndex
                        ? 'bg-[#323232] text-white'
                        : 'text-[#323232] hover:bg-[#323232]/10'
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  >
                    {suggestion}
                  </motion.button>
                ))}
                
                {/* Create new tag option */}
                {inputValue.trim() && !suggestions.includes(inputValue.trim()) && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`w-full text-left px-2 py-1 rounded-lg font-['Anonymous_Pro'] text-xs uppercase tracking-wide transition-colors border-t border-white/20 mt-1 pt-2 ${
                      selectedSuggestionIndex === suggestions.length
                        ? 'bg-[#323232] text-white'
                        : 'text-[#323232] hover:bg-[#323232]/10'
                    }`}
                    onClick={() => handleSuggestionClick(inputValue.trim())}
                  >
                    <Plus className="w-3 h-3 mr-1 inline" />
                    Create "{inputValue.trim()}"
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Help Text */}
      <p className="text-xs text-[#666] font-['Anonymous_Pro']">
        Type to search existing tags or create new ones. Press Enter or click Add to confirm.
      </p>
    </div>
  );
}