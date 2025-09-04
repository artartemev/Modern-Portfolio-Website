import React from 'react';
import { parseTextWithLinks, containsLinks, type TextPart } from '../utils/linkProcessor';
import { ExternalLink } from 'lucide-react';

interface LinkifiedTextProps {
  children: string;
  className?: string;
  linkClassName?: string;
  showExternalIcon?: boolean;
}

/**
 * Component that automatically converts URLs in text to clickable links
 */
export function LinkifiedText({ 
  children, 
  className = '', 
  linkClassName = '',
  showExternalIcon = true 
}: LinkifiedTextProps) {
  // If no text provided, return empty span
  if (!children || typeof children !== 'string') {
    return <span className={className}></span>;
  }

  // If no links detected, return plain text
  if (!containsLinks(children)) {
    return (
      <span className={className}>
        {children}
      </span>
    );
  }

  // Parse text and render with clickable links
  const parts = parseTextWithLinks(children);

  return (
    <span className={className}>
      {parts.map((part: TextPart, index: number) => {
        if (part.type === 'link' && part.url) {
          return (
            <a
              key={index}
              href={part.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-blue-300 hover:text-blue-200 underline decoration-blue-300/50 
                hover:decoration-blue-200 underline-offset-2 transition-colors duration-200
                inline-flex items-center gap-1 break-all
                ${linkClassName}
              `}
            >
              {part.content}
              {showExternalIcon && (
                <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-70" />
              )}
            </a>
          );
        }
        
        return (
          <span key={index}>
            {part.content}
          </span>
        );
      })}
    </span>
  );
}

/**
 * Hook for components that need to process text with links
 */
export function useLinkifiedText(text: string) {
  return React.useMemo(() => {
    return {
      hasLinks: containsLinks(text),
      parts: parseTextWithLinks(text)
    };
  }, [text]);
}