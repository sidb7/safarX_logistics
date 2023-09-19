import React, { useState } from "react";
import Copy from "../../assets/copy.svg";
interface CopyTooltipProps {
  stringToBeCopied: string;
}

const CopyTooltip: React.FC<CopyTooltipProps> = ({ stringToBeCopied }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isCopied, setIsCopied] = useState<any>(false);

  const showTooltip = () => {
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(stringToBeCopied);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="relative inline-block mx-2">
      <img
        src={Copy}
        alt=""
        className="cursor-pointer"
        onMouseOver={showTooltip}
        onMouseOut={hideTooltip}
        onClick={copyToClipboard}
      />

      {isTooltipVisible && (
        <div className="bg-gray-800 text-white text-xs rounded-md px-2 py-1 absolute bottom-full left-1/2 transform -translate-x-1/2 transition-opacity duration-300 opacity-100 pointer-events-none">
          {`${isCopied ? "Copied to Clipboard" : "Copy to Clipboard"}`}
        </div>
      )}
    </div>
  );
};

export default CopyTooltip;
