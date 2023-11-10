import React, { useState } from "react";
interface CopyTooltipProps {}

const CustomTooltip: React.FC<CopyTooltipProps> = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isCopied, setIsCopied] = useState<any>(false);

  const showTooltip = () => {
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className="relative inline-block mx-2">
      <img
        className="cursor-pointer"
        onMouseOver={showTooltip}
        onMouseOut={hideTooltip}
      />

      {isTooltipVisible && (
        <div className="bg-gray-800 text-white text-xs rounded-md px-2 py-1 absolute bottom-full left-1/2 transform -translate-x-1/2 transition-opacity duration-300 opacity-100 pointer-events-none">
          <p>Tooltip</p>
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
