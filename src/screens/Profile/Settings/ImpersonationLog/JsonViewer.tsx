import React, { useState } from 'react';
import copyIcon from "../../../../assets/copy.svg";
import checkIcon from "../../../../assets/tick.svg";
import ChevronDown from "../../../../assets/downwardArrow.svg";

interface JsonViewerProps {
  jsonData: unknown;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ jsonData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

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
    <div className="font-mono text-sm">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hover:bg-gray-100 p-1 rounded"
          type="button"
        >
          <img 
            src={ChevronDown}
            alt={isExpanded ? "Collapse" : "Expand"}
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-0' : '-rotate-90'
            }`}
          />
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
        {isExpanded ? (
          <pre className="whitespace-pre-wrap break-words max-h-96 overflow-auto">
            {jsonString}
          </pre>
        ) : (
          <div 
            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={() => setIsExpanded(true)}
          >
            {preview}
          </div>
        )}
      </div>
    </div>
  );
};

export default JsonViewer;