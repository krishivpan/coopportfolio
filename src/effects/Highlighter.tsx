import React, { useState, useEffect } from 'react';

interface HighlightProps {
  children: React.ReactNode;
  color?: string;
  duration?: number; // in milliseconds
  delay?: number; // delay before animation starts
}

const Highlighter: React.FC<HighlightProps> = ({ 
  children, 
  color = '#ffff00', 
  duration = 800, 
  delay = 500 
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHighlighted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

    const highlightStyle: React.CSSProperties = {
    display: 'inline',
    // Using rgba or hex with transparency looks best for full coverage
    backgroundImage: `linear-gradient(${color}, ${color})`,
    backgroundRepeat: 'no-repeat',
    
    // Start from the top-left
    backgroundPosition: '0 0', 
    
    // Set height to 100% to cover the entire text
    backgroundSize: isHighlighted ? '100% 100%' : '0% 100%',

    padding: `0 5px`,
    margin: `0`,
    
    transition: `background-size ${duration}ms ease-out`,
  };


  return <span style={highlightStyle}>{children}</span>;
};

export default Highlighter;
