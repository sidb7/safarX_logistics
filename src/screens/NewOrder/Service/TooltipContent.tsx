// TooltipContent.tsx
import React from "react";
import { Tooltip } from "react-tooltip";

interface ServiceTooltipProps {
  option: any;
}

const TooltipContent: React.FC<ServiceTooltipProps> = ({ option }) => {
  let totalFreight =
    option.text?.base + option.text?.add + option.text?.variables;
  console.log("totalFreight", totalFreight.toFixed(2));
  const tooltipContent = `
    Shipyaari Service ID: ${
      option.text?.companyServiceId
    }\xa0\xa0\xa0\xa0\xa0\xa0\xa0
    Shipyaari Service Name: ${option.text?.companyServiceName}
    Courier Partner: ${
      option.text?.partnerName
    }\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0
    Service Mode: ${
      option.text?.serviceMode
    }\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0
    Applied Weight: ${option.text?.appliedWeight}Kg\xa0\xa0\xa0\xa0\xa0\xa0
    Insurance: ${option.text?.insurance}\xa0\xa0\xa0\xa0
    Total-Freight: ${totalFreight.toFixed(2)}\xa0\xa0
    COD Charges: ${option.text?.cod}\xa0
    TAX: ${option.text?.gst}\xa0\xa0\xa0
    Total: ${option.text?.total.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    })}\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0
    EDT: ${option.text?.EDT || "N/A"} 
  `;

  return (
    <Tooltip
      id={`my-tooltip-inline-${option.value}`}
      style={{
        backgroundColor: "bg-neutral-900",
        color: "#FFFFFF",
        width: "300px",
        fontSize: "14px",
        lineHeight: "22px",
        overflow: "auto",
      }}
      content={tooltipContent}
    />
  );
};

export default TooltipContent;
