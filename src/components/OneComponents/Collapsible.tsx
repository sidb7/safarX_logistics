// import { useState, useRef, useEffect } from 'react';

// // Default SVG icons as components
// const DefaultOpenIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

// const DefaultCloseIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

// interface CollapsibleProps {
//   title: string;
//   children: React.ReactNode;
//   defaultOpen?: boolean;
//   className?: string;
//   titleClassName?: string;
//   contentClassName?: string;
// }

// const Collapsible = ({
//   title,
//   children,
//   defaultOpen = false,
//   className = '',
//   titleClassName = '',
//   contentClassName = '',
// }: CollapsibleProps) => {
//   const [isOpen, setIsOpen] = useState(defaultOpen);
//   const [height, setHeight] = useState<number | string>(defaultOpen ? 'auto' : 0);
//   const contentRef = useRef<HTMLDivElement>(null);

//   // Set initial height based on defaultOpen
//   useEffect(() => {
//     if (defaultOpen && contentRef.current) {
//       setHeight('auto');
//     }
//   }, [defaultOpen]);

//   const toggleCollapsible = () => {
//     if (!isOpen && contentRef.current) {
//       // Before opening, set height to scroll height to enable animation
//       setHeight(contentRef.current.scrollHeight);
//     }
    
//     setIsOpen(!isOpen);
//   };

//   // Handle height changes when content changes or isOpen changes
//   useEffect(() => {
//     if (!contentRef.current) return;

//     if (isOpen) {
//       // Get current scroll height for animation
//       const scrollHeight = contentRef.current.scrollHeight;
      
//       // First set to specific height for animation
//       setHeight(scrollHeight);
      
//       // After animation completes, set to auto to handle content changes
//       const timer = setTimeout(() => {
//         setHeight('auto');
//       }, 300); // Match this with the CSS transition duration
      
//       return () => clearTimeout(timer);
//     } else {
//       // When closing, first set to scroll height
//       if (height !== 0) {
//         setHeight(contentRef.current.scrollHeight);
        
//         // Force a reflow before setting to 0
//         // Use void operator to tell ESLint this expression is intentional
//         void contentRef.current.offsetHeight;
        
//         // Then immediately set to 0 to trigger animation
//         setTimeout(() => {
//           setHeight(0);
//         }, 0);
//       }
//     }
//   }, [isOpen, children]);

//   return (
//     <div className={`border rounded-2xl overflow-hidden shadow-md ${className}`}>
//       <button
//         type="button"
//         className={`flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none ${titleClassName}`}
//         onClick={toggleCollapsible}
//         aria-expanded={isOpen}
//       >
//         <span>{title}</span>
//         {isOpen ? (
//           <DefaultOpenIcon />
//         ) : (
//           <DefaultCloseIcon />
//         )}
//       </button>
      
//       <div 
//         ref={contentRef}
//         style={{
//           height: typeof height === 'number' ? `${height}px` : height,
//           transition: 'height 300ms ease-in-out',
//           overflow: 'hidden'
//         }}
//         aria-hidden={!isOpen}
//       >
//         <div className={`p-4 ${contentClassName}`}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Collapsible;

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
}

const Collapsible = ({
  title,
  children,
  defaultOpen = false,
  className = '',
  titleClassName = '',
  contentClassName = '',
}: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = useState(false);
  
  // Handle the toggle action
  const toggleCollapsible = () => {
    if (contentRef.current) {
      setAnimating(true);
      
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
      setIsOpen(!isOpen);
    }
  };
  
  // Set initial state
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = defaultOpen ? 'auto' : '0px';
    }
  }, [defaultOpen]);
  
  return (
    <div className={`border rounded-2xl overflow-hidden shadow-md ${className}`}>
      <button
        type="button"
        className={`flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none ${titleClassName}`}
        onClick={toggleCollapsible}
        aria-expanded={isOpen}
        disabled={animating}
      >
        <span>{title}</span>
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
        <div className={`px-4 pt-0 pb-2 ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Collapsible;