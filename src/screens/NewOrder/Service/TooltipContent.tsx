// TooltipContent.tsx
import React from "react";
import { Tooltip } from "react-tooltip";

interface ServiceTooltipProps {
  option: any;
}

const TooltipContent: React.FC<ServiceTooltipProps> = ({ option }) => {
  let totalFreight =
    option.text?.base + option.text?.add + option.text?.variables;
  // const tooltipContent = `Courier Partner: ${
  //   option.text?.partnerName
  // }\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Shipyaari Service Name: ${
  //   option.text?.companyServiceName
  // }  Mode: ${
  //   option.text?.serviceMode
  // }\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\
  //   Applied Weight: ${
  //     option.text?.appliedWeight
  //   }Kg\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0
  //   Insurance: ${
  //     option.text?.insurance
  //   }\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0
  //   Total-Freight: ${totalFreight.toFixed(
  //     2
  //   )}\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0
  //   COD Charges: ${
  //     option.text?.cod
  //   }\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0
  //   TAX: ${
  //     option.text?.gst
  //   }\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0
  //   Total: ${option.text?.total.toLocaleString("en-US", {
  //     style: "currency",
  //     currency: "INR",
  //   })}\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0
  //   EDT: ${option.text?.EDT || "N/A"}
  // `;

  const customContent = () => {
    return (
      <div>
        <p>
          Courier Partner: <span>{`${option.text?.partnerName}`}</span>
        </p>
        <p>
          Shipyaari Service Name:{" "}
          <span>{`${option.text?.companyServiceName}`}</span>
        </p>
        <p className="">
          Mode: <span>{`${option.text?.serviceMode}`}</span>
        </p>

        <p className="">
          Applied Weight: <span>{`${option.text?.appliedWeight}Kg`}</span>
        </p>

        <p className="">
          Insurance: <span>{`${option.text?.insurance}`}</span>
        </p>
        <p className="">
          Total-Freight: <span>{`${totalFreight.toFixed(2)}`}</span>
        </p>
        <p className="">
          COD Charges: <span>{`${option.text?.cod}`}</span>
        </p>
        <p className="">
          TAX: <span>{`${option.text?.gst || option.text?.tax}`}</span>
        </p>
        <p className="">
          Total:
          <span>{` ${option.text?.total.toLocaleString("en-US", {
            style: "currency",
            currency: "INR",
          })}`}</span>
        </p>
        <p className="">
          EDT: <span>{`${option.text?.EDT || "N/A"}`}</span>
        </p>
      </div>
    );
  };

  return (
    <Tooltip
      id={`my-tooltip-inline-${option.value}`}
      // style={{
      //   backgroundColor: "bg-neutral-900",
      //   // backgroundColor: "#ffffff",
      //   color: "#FFFFFF",
      //   // color: "#1c1c1c",
      //   width: "260px",
      //   fontSize: "12px",
      //   lineHeight: "22px",
      //   overflow: "auto",
      // }}
      // content={tooltipContent}
      className="!text-[#ffffff] !rounded-lg !bg-neutral-900 text-base "
      children={customContent()}
    />
  );
};

export default TooltipContent;
