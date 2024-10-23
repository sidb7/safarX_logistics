import React, { useState, useEffect } from 'react';
import copyIcon from "../../../../assets/copy.svg";
import checkIcon from "../../../../assets/tick.svg";

interface JsonViewerProps {
  jsonData: unknown;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ jsonData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen]);

  // Helper function to safely stringify JSON data
  const safeStringify = (data: unknown): string => {
    try {
      return typeof data === 'string' 
        ? data 
        : JSON.stringify(data, null, 2);
    } catch (error) {
      return String(data);
    }
  };

  const jsonString = safeStringify(jsonData);

  // Get preview of JSON (first 100 characters)
  const preview = jsonString.length > 100 
    ? jsonString.slice(0, 100) + '...'
    : jsonString;

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="font-mono text-sm relative">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2"
          type="button"
        >
          <svg 
            viewBox="0 0 24 24" 
            width="16" 
            height="16" 
            stroke="currentColor" 
            fill="none" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          View
        </button>
        
        <button
          onClick={handleCopy}
          className="hover:bg-gray-100 p-1 rounded"
          title="Copy to clipboard"
          type="button"
        >
          <img 
            src={copied ? checkIcon : copyIcon}
            alt={copied ? "Copied" : "Copy"}
            className="w-4 h-4"
          />
        </button>
      </div>

      <div className="mt-1 bg-gray-50 rounded p-2">
        <div className="p-2">
          {preview}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          {/* Modal Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-x-4 top-[10vh] md:inset-x-auto md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 bg-white rounded-lg shadow-xl max-h-[80vh] w-full max-w-4xl">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-semibold">JSON View</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                type="button"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  width="24" 
                  height="24" 
                  stroke="currentColor" 
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-auto" style={{ maxHeight: 'calc(80vh - 4rem)' }}>
              <div className="flex justify-end mb-2">
                <button
                  onClick={handleCopy}
                  className="hover:bg-gray-100 p-1 rounded"
                  title="Copy to clipboard"
                  type="button"
                >
                  <img 
                    src={copied ? checkIcon : copyIcon}
                    alt={copied ? "Copied" : "Copy"}
                    className="w-4 h-4"
                  />
                </button>
              </div>
              <pre className="whitespace-pre-wrap break-words bg-gray-50 p-4 rounded">
                {jsonString}
              </pre>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JsonViewer;