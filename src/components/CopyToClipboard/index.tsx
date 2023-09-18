import React, { useState } from "react";
import CopyIcon from "../../assets/OrderDetails/CopyIcon.svg";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
interface CopyTooltipProps {
  stringToBeCopied: string;
}

const CopyTooltip: React.FC<CopyTooltipProps> = ({ stringToBeCopied }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    console.log("copying");
    setIsCopied(true);

    navigator.clipboard.writeText(stringToBeCopied);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="relative inline-block w-6 mx-2 ">
      <img
        src={CopyIcon}
        alt=""
        className="cursor-pointer "
        data-tooltip-id="my-tooltip-inline"
        data-tooltip-content={`${
          isCopied ? "Copied to Clipboard ✅" : "Copy to Clipboard"
        }`}
        onClick={copyToClipboard}
      />

      <Tooltip
        id="my-tooltip-inline"
        className={`text-base bg-white text-[black]`}
        style={{ borderRadius: "10px" }}
      />
    </div>
  );
};

export default CopyTooltip;
