// TooltipContent.tsx
import React from "react";
import { Tooltip } from "react-tooltip";

interface ServiceTooltipProps {
  option: any;
}

const TooltipContent: React.FC<ServiceTooltipProps> = ({ option }) => {
  const tooltipContent = `
    Partner Service ID: ${option.text?.partnerServiceId}\xa0\xa0\xa0\xa0\xa0\xa0
    Partner Service Name: ${option.text?.partnerServiceName}
    Company Service ID: ${option.text?.companyServiceId}
    Company Service Name: ${option.text?.companyServiceName}
    Partner Name: ${option.text?.partnerName}
    Service Mode: ${option.text?.serviceMode}
    Applied Weight: ${option.text?.appliedWeight}
    Collectable Amount: ${option.text?.collectableAmount} \xa0\xa0\xa0\xa0
    Insurance: ${option.text?.insurance}
    Base: ${option.text?.base} \xa0
    Add: ${option.text?.add} \xa0
    Variables: ${option.text?.variables} \xa0\xa0\xa0\xa0
    COD: ${option.text?.cod} \xa0
    GST: ${option.text?.gst} \xa0
    Total: ${option.text?.total.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    })}
    EDT: ${option.text?.EDT || "N/A"} 
  `;

  return (
    <Tooltip
      id={`my-tooltip-inline-${option.value}`}
      style={{
        backgroundColor: "bg-neutral-900",
        color: "#FFFFFF",
        width: "280px",
        fontSize: "14px",
        lineHeight: "22px",
        overflow: "auto",
      }}
      content={tooltipContent}
    />
  );
};

export default TooltipContent;
