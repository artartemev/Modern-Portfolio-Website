/**
 * Utility for processing text and making URLs clickable
 */

// Enhanced URL regex that matches common URL patterns
const URL_REGEX = /(https?:\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?)?)/gi;

export interface TextPart {
  type: 'text' | 'link';
  content: string;
  url?: string;
}

/**
 * Parse text and identify URLs to make them clickable
 * @param text - The text to process
 * @returns Array of text parts with type and content
 */
export function parseTextWithLinks(text: string): TextPart[] {
  if (!text || typeof text !== 'string') {
    return [{ type: 'text', content: '' }];
  }

  const parts: TextPart[] = [];
  let lastIndex = 0;
  let match;

  // Reset regex state
  URL_REGEX.lastIndex = 0;

  while ((match = URL_REGEX.exec(text)) !== null) {
    // Add text before the URL
    if (match.index > lastIndex) {
      const textBefore = text.slice(lastIndex, match.index);
      if (textBefore) {
        parts.push({ type: 'text', content: textBefore });
      }
    }

    // Add the URL
    parts.push({ 
      type: 'link', 
      content: match[0],
      url: match[0]
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after the last URL
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    if (remainingText) {
      parts.push({ type: 'text', content: remainingText });
    }
  }

  // If no URLs were found, return the original text
  if (parts.length === 0) {
    parts.push({ type: 'text', content: text });
  }

  return parts;
}

/**
 * Check if a string contains any URLs
 * @param text - The text to check
 * @returns True if text contains URLs
 */
export function containsLinks(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }
  
  URL_REGEX.lastIndex = 0;
  return URL_REGEX.test(text);
}