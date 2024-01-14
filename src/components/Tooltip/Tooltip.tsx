import PropTypes from "prop-types";
import { useState } from "react";
import { classNames } from "./classNames";

interface TooltipPropTypes {
  position: any;
  content: React.ReactNode;
  children?: React.ReactNode;
  showOnHover?: boolean;
  showOnClick?: boolean;
  className?: any;
  bgColor?: any;
  textColor?: any;
}

export const Tooltip = (props: TooltipPropTypes) => {
  const {
    position,
    content,
    children,
    showOnHover = false,
    showOnClick = false,
    className,
    bgColor = "bg-neutral-900",
    textColor = "white",
  } = props;

  const [showTooltip, setShowTooltip] = useState(false);

  const handleHover = () => {
    if (showOnHover) {
      setShowTooltip(true);
    }
  };

  const handleHoverExit = () => {
    if (showOnHover) {
      setShowTooltip(false);
    }
  };

  const handleClick = () => {
    if (showOnClick) {
      setShowTooltip(!showTooltip);
    }
  };

  return (
    <div
      id="tooltip"
      className={`${className} relative cursor-pointer group  my-2 w-fit h-fit`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverExit}
      onClick={handleClick}
    >
      <div className="my-1">{children}</div>
      <span
        className={classNames(
          "absolute rounded-md shadow-lg z-50",
          showTooltip ? "inline-block" : "hidden",
          `${bgColor} ${textColor} text-xs whitespace-nowrap rounded`,
          position === "top"
            ? "left-1/2 -translate-x-1/2 bottom-[calc(100%+5px)]"
            : "",
          position === "bottom"
            ? "left-1/2 -translate-x-1/2 top-[calc(100%+5px)]"
            : "",
          position === "left"
            ? "top-1/2 -translate-y-1/2 right-[calc(100%+5px)]"
            : "",
          position === "right"
            ? "top-1/2 -translate-y-1/2 left-[calc(100%+5px)]"
            : ""
        )}
      >
        {content}
      </span>
      <span
        className={classNames(
          "absolute",
          showTooltip ? "inline-block" : "hidden",
          "border-[6px]",
          position === "top"
            ? `left-1/2 -translate-x-1/2 bottom-full border-l-transparent border-r-transparent border-b-0 border-t-${bgColor}`
            : "",
          position === "bottom"
            ? `left-1/2 -translate-x-1/2 top-full border-l-transparent border-r-transparent border-t-0 border-b-${bgColor}`
            : "",
          position === "left"
            ? `top-1/2 -translate-y-1/2 right-full border-t-transparent border-b-transparent border-r-0 border-l-${bgColor}`
            : "",
          position === "right"
            ? `top-1/2 -translate-y-1/2 left-full border-t-transparent border-b-transparent border-l-0 border-r-${bgColor}`
            : ""
        )}
      ></span>
    </div>
  );
};

Tooltip.propTypes = {
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]).isRequired,
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  showOnHover: PropTypes.bool, // Prop to conditionally show on hover
  showOnClick: PropTypes.bool, // Prop to conditionally show on click
};
