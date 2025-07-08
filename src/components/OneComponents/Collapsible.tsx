import { useState, useRef, useEffect } from 'react';

// Default SVG icons as components
const DefaultOpenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DefaultCloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  onToggle?: (isOpen: boolean) => void;
  hasError?: boolean; // New prop for error state
}

const Collapsible = ({
  title,
  children,
  defaultOpen = false,
  className = '',
  titleClassName = '',
  contentClassName = '',
  onToggle,
  hasError = false, // Default to false
}: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = useState(false);
  
  // Handle the toggle action
  const toggleCollapsible = () => {
    if (contentRef.current) {
      setAnimating(true);
      
      const newOpenState = !isOpen;
      
      // Call onToggle callback if provided
      if (onToggle) {
        onToggle(newOpenState);
      }
      
      // If we're currently closed and about to open
      if (!isOpen) {
        // Set height to 0 initially (if it's not already)
        contentRef.current.style.height = '0px';
        
        // Force a reflow
        void contentRef.current.offsetHeight;
        
        // Set the height to the scroll height to start the animation
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
        
        // After animation completes, set to auto
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.style.height = 'auto';
            setAnimating(false);
          }
        }, 300);
      } 
      // If we're currently open and about to close
      else {
        // First set height to scrollHeight (from auto)
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
        
        // Force a reflow
        void contentRef.current.offsetHeight;
        
        // Then set to 0 to trigger animation
        contentRef.current.style.height = '0px';
        
        // Clear animation flag when done
        setTimeout(() => {
          setAnimating(false);
        }, 300);
      }
      
      // Toggle the open state
      setIsOpen(newOpenState);
    }
  };
  
  // Set initial state
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = defaultOpen ? 'auto' : '0px';
    }
  }, [defaultOpen]);
  
  // Dynamic border color based on error state
  const borderColor = hasError ? 'border-red-500' : 'border-gray-200';
  const titleBgColor = hasError ? 'bg-red-50' : '';
  const titleTextColor = hasError ? 'text-red-700' : '';
  
  return (
    <div className={`border rounded-2xl overflow-hidden shadow-md ${borderColor} ${className}`}>
      <button
        type="button"
        className={`flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none ${titleBgColor} ${titleTextColor} ${titleClassName}`}
        onClick={toggleCollapsible}
        aria-expanded={isOpen}
        disabled={animating}
      >
        <span className="flex items-center gap-2">
          {hasError && (
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-red-500"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
              <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
            </svg>
          )}
          {title}
        </span>
        {isOpen ? (
          <DefaultOpenIcon />
        ) : (
          <DefaultCloseIcon />
        )}
      </button>
      
      <div 
        ref={contentRef}
        style={{
          transition: 'height 300ms ease-in-out',
          overflow: 'hidden'
        }}
        aria-hidden={!isOpen}
      >
        <div className={`px-2 pt-0 pb-1 ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Collapsible;