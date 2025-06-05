import React, { ReactNode } from 'react';

interface HorizontalScrollerProps {
  children: ReactNode;
  className?: string;
}

const HorizontalScroller: React.FC<HorizontalScrollerProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Container with no bottom padding */}
      <div className="relative">
        {/* Scrollable content area */}
        <div className="overflow-x-auto ultra-thin-scrollbar">
          <div className="flex">
            {children}
          </div>
        </div>
      </div>
      
      <style>{`
        /* Ultra thin modern scrollbar - always present but nearly invisible until hover */
        .ultra-thin-scrollbar::-webkit-scrollbar {
          height: 1px; /* Ultra thin */
          background-color: transparent;
          position: absolute;
          bottom: 0;
        }
        
        .ultra-thin-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .ultra-thin-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(136, 136, 136, 0.1); /* Always visible but very subtle */
          border-radius: 1px;
          transition: background-color 0.2s ease;
          /* Remove visibility property to prevent shifting */
        }
        
        /* Only change opacity/color on hover, not visibility */
        .ultra-thin-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(136, 136, 136, 0.5);
        }
        
        /* Firefox support - always reserve space for scrollbar */
        .ultra-thin-scrollbar {
          scrollbar-width: thin; /* Always present */
          scrollbar-color: rgba(136, 136, 136, 0.1) transparent;
        }
        
        /* Only change color on hover for Firefox */
        .ultra-thin-scrollbar:hover {
          scrollbar-color: rgba(136, 136, 136, 0.5) transparent;
        }
        
        /* IE support */
        .ultra-thin-scrollbar {
          -ms-overflow-style: -ms-autohiding-scrollbar;
        }
      `}</style>
    </div>
  );
};

export default HorizontalScroller;