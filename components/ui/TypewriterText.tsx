import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  trigger: boolean;
  delay?: number;
  speed?: number;
  className?: string;
  as?: React.ElementType;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  trigger,
  delay = 0,
  speed = 35,
  className = '',
  as: Component = 'span',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!trigger) {
      setDisplayedText('');
      setIsTyping(false);
      setIsFinished(false);
      return;
    }

    setIsFinished(false);
    
    // Initial delay
    timeoutId = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      
      const typeNextChar = () => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
          timeoutId = setTimeout(typeNextChar, speed + (Math.random() * 10 - 5)); // add slight organic randomness
        } else {
          setIsTyping(false);
          setIsFinished(true);
        }
      };

      typeNextChar();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [trigger, text, delay, speed]);

  return (
    <Component className={`relative inline-block ${className}`}>
      {displayedText}
      {/* Blinking cursor */}
      {trigger && !isFinished && (
        <span
          className={`inline-block w-[0.1em] h-[1em] bg-current ml-[1px] translate-y-[0.1em] ${
            isTyping ? 'animate-none opacity-100' : 'animate-pulse'
          }`}
          aria-hidden="true"
        />
      )}
    </Component>
  );
};
