// import editIcon from "../../../assets/serv/edit.svg";
// import serviceIcon from "../../../assets/serv/service.svg";
// import { useNavigate } from "react-router-dom";
// interface PricingData {
//   appliedWeight?: any;
//   appliedWeightUnit?: any;
//   add?: string | number;
//   base?: string | number;
//   cod?: string | number;
//   codCharge?: string | number;
//   variables?: string | number;
//   tax?: number;
//   invoiceValue?: number;
//   insurance?: number;
//   baseWeight?: number;
//   price?: number;
// }

// const PricingDetails: React.FunctionComponent<PricingData> = ({
//   baseWeight = "",
//   price = "",
//   add = "",
//   base = "",
//   cod = "",
//   variables = "",
//   tax = "",
//   codCharge = "",
//   invoiceValue = "",
//   insurance = "",
//   appliedWeight = "",
//   appliedWeightUnit = "",
// }) => {
//   // Parse numbers from string inputs
//   const baseValue = +base;
//   const addValue = +add;
//   const codValue = +cod;
//   const variablesValue = +variables;
//   const orderPrice = baseValue + addValue + variablesValue;
//   const codChargeValue = +codCharge;

//   // Round off decimal numbers to the nearest whole number
//   const roundedInvoiceValue = Math.round(+invoiceValue);
//   const roundedCODValue = Math.round(codValue);
//   const codChargeValuePrice = Math.round(codChargeValue);
//   const roundedOrderPrice = Math.round(orderPrice);
//   const roundedInsuranceValue = Math.round(+insurance);
//   const roundedTaxValue = Math.round(+tax);
//   const roundedPrice = Math.round(+price);

//   return (
//     <div className="p-[24px] rounded-lg border-[1px] shadow-lg border-[#E8E8E8] bg-[#F2F6FF] lg:w-[338px] lg:h-[505px]">
//       <div className="flex flex-col ">
//         <div className="flex flex-col gap-y-4  ">
//           <div className="flex justify-between">
//             <p className="text-[12px] font-normal font-Open lg:text-[16px]">
//               Invoice Value:
//             </p>
//             {`\u20B9`} {roundedInvoiceValue?.toLocaleString("en-IN")}
//           </div>
//           <div className="flex justify-between">
//             <p className="text-[12px] font-normal font-Open lg:text-[16px]">
//               Collectible Amount:
//             </p>
//             {`\u20B9`} {roundedCODValue?.toLocaleString("en-IN")}
//           </div>
//           <div className="flex justify-between">
//             <p className="text-[12px] font-normal font-Open lg:text-[16px]">
//               Billable Weight:
//             </p>
//             <p> {appliedWeight} kg</p>
//           </div>
//           <div className="flex justify-between">
//             <p className="text-[12px] font-normal font-Open lg:text-[16px]">
//               Order Price:
//             </p>
//             <p>
//               {`\u20B9`} {roundedOrderPrice?.toLocaleString("en-IN")}
//             </p>
//           </div>
//           <div className="flex justify-between">
//             <p className="text-[12px] font-normal font-Open lg:text-[16px]">
//               COD:
//             </p>
//             <p>
//               {`\u20B9`} {codChargeValuePrice?.toLocaleString("en-IN")}
//             </p>
//           </div>
//           <div className="flex justify-between">
//             <p className="text-[12px] font-normal font-Open lg:text-[16px]">
//               Insurance Price:
//             </p>
//             <p>
//               {`\u20B9`} {roundedInsuranceValue?.toLocaleString("en-IN")}
//             </p>
//           </div>
//           {/* Additional sections... */}
//           <div className="flex justify-between">
//             <p className="text-[12px] font-normal font-Open lg:text-[16px]">
//               Tax:
//             </p>
//             <p>
//               {`\u20B9`} {roundedTaxValue?.toLocaleString("en-IN")}
//             </p>
//           </div>
//           <hr className="mt-[100px]"></hr>
//           <div className="flex justify-between mt-[5px] ">
//             <p className="text-[12px] font-medium font-Open text-[#160783] lg:text-[16px] lg:font-semibold ">
//               Gross Total:
//             </p>
//             <p className="text-[#160783]">
//               {`\u20B9`} {roundedPrice?.toLocaleString("en-IN")}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PricingDetails;
import React, { useState, useRef } from "react";
import editIcon from "../../../assets/serv/edit.svg";
import serviceIcon from "../../../assets/serv/service.svg";
import { useNavigate } from "react-router-dom";

interface PricingData {
  appliedWeight?: any;
  appliedWeightUnit?: any;
  add?: string | number;
  base?: string | number;
  cod?: string | number;
  codCharge?: string | number;
  variables?: string | number;
  variableServices?: {
    fuelSurcharges?: number;
    currencyAdjustmentCharges?: number;
    criticalPickupLocation?: number;
    criticalDeliveryLocation?: number;
    remoteAreaSurcharges?: number;
    outOfDeliveryArea?: number;
    reversePickUpSurcharges?: number;
    dieselMechanism?: number;
    docketCharges?: number;
    rov?: number;
    fovCharges?: number;
    additionalCharges?: number;
    "handlingCharges(heavyShipment)"?: number;
    appoitmentBaseDeliveryCharges?: number;
    "podCharge(hardCopies)"?: number;
    toPayCharges?: number;
    oda?: number;
    peakSurcharges?: number;
    baseCharge?: number;
    pincodeCharge?: number;
    allWeight?: number;
    "sp.deliverycharge"?: number;
    multistory?: number;
    freestoragefacility?: number;
    [key: string]: number | undefined;
  };
  tax?: number;
  invoiceValue?: number;
  insurance?: number;
  baseWeight?: number;
  price?: number;
  yaariCash?: number;
}

const PricingDetails: React.FunctionComponent<PricingData> = ({
  baseWeight = "",
  price = "",
  add = "",
  base = "",
  cod = "",
  variables = "",
  variableServices = {},
  tax = "",
  codCharge = "",
  invoiceValue = "",
  insurance = "",
  appliedWeight = "",
  appliedWeightUnit = "",
  yaariCash = 0,
}) => {
  // State to control tooltip visibility
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Parse numbers from string inputs
  const baseValue = +base;
  const addValue = +add;
  const codValue = +cod;
  const variablesValue = +variables;
  const orderPrice = baseValue + addValue + variablesValue;
  const codChargeValue = +codCharge;
  const yaariPrice = +yaariCash;

  // Round off decimal numbers to the nearest whole number
  const roundedInvoiceValue = Math.round(+invoiceValue);
  const roundedCODValue = Math.round(codValue);
  const codChargeValuePrice = Math.round(codChargeValue);
  const roundedOrderPrice = Math.round(orderPrice);
  const roundedInsuranceValue = Math.round(+insurance);
  const roundedTaxValue = Math.round(+tax);
  const roundedYaariCash = Math.round(yaariPrice);
  let roundedPrice = Math.round(+price);

  if (roundedYaariCash > 0) {
    // Adjust roundedPrice after Yaari Cash deduction
    roundedPrice = roundedPrice - roundedYaariCash;
  }

  // Helper function to format label from camelCase to Title Case with spaces
  const formatLabel = (label: string): string => {
    // Handle special cases with parentheses
    if (label.includes("(")) {
      return (
        label
          .replace(/([A-Z])/g, " $1")
          .split("(")[0]
          .trim()
          .replace(/^\w/, (c) => c.toUpperCase()) +
        " (" +
        label.split("(")[1]
      );
    }

    // Handle cases with dots
    if (label.includes(".")) {
      const parts = label.split(".");
      return (
        parts[0].toUpperCase() +
        " " +
        parts[1].charAt(0).toUpperCase() +
        parts[1].slice(1)
      );
    }

    // Regular camelCase to Title Case
    return label
      .replace(/([A-Z])/g, " $1")
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  // Get all variable service keys and sort them
  const variableServiceKeys = Object.keys(variableServices || {}).sort();

  // Close tooltip when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-[24px] rounded-lg border-[1px] shadow-lg border-[#E8E8E8] bg-[#F2F6FF] lg:w-[338px] lg:h-[505px]">
      <div className="flex flex-col ">
        <div className="flex flex-col gap-y-4">
          {/* <div className="flex justify-between">
            <p className="text-[12px] font-normal font-Open lg:text-[16px]">
              Invoice Value:
            </p>
            <p>
              {`\u20B9`} {roundedInvoiceValue?.toLocaleString("en-IN")}
            </p>
          </div> */}
          {/* <div className="flex justify-between">
            <p className="text-[12px] font-normal font-Open lg:text-[16px]">
              Collectible Amount:
            </p>
            <p>
              {`\u20B9`} {roundedCODValue?.toLocaleString("en-IN")}
            </p>
          </div> */}
          <div className="flex justify-between">
            <p className="text-[12px] font-normal font-Open lg:text-[16px]">
              Billable Weight:
            </p>
            <p> {appliedWeight} kg</p>
          </div>

          {/* Order Price with Tooltip */}
          <div className="flex justify-between relative">
            <div
              className="flex items-center cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <p className="text-[12px] font-normal font-Open lg:text-[16px]">
                Order Price:
              </p>
              {variableServiceKeys.length > 0 && (
                <span className="ml-1 w-4 h-4 rounded-full bg-[#160783] text-white flex items-center justify-center text-xs font-bold">
                  i
                </span>
              )}
            </div>
            <p>
              {`\u20B9`} {roundedOrderPrice?.toLocaleString("en-IN")}
            </p>

            {/* Tooltip for Variable Services */}
            {showTooltip && variableServiceKeys.length > 0 && (
              <div
                ref={tooltipRef}
                className="absolute top-full left-0 mt-1 w-full max-w-[300px] p-3 bg-white border border-[#E0E8FF] rounded-lg shadow-lg z-10"
              >
                <div className="flex justify-between items-center mb-2 border-b border-[#E0E8FF] pb-2">
                  <p className="text-[14px] font-medium text-[#160783]">
                    Order Price Breakdown
                  </p>
                  <p className="text-[12px] font-medium text-[#160783]">
                    Total: {`\u20B9`}{" "}
                    {roundedOrderPrice?.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="max-h-[250px] overflow-y-auto pr-1">
                  {/* Base and Add charges */}
                  <div className="border-b border-[#E0E8FF] pb-2 mb-2">
                    <div className="flex justify-between py-1 text-[12px]">
                      <p className="text-[12px] font-medium">Base Charge:</p>
                      <p>
                        {`\u20B9`} {baseValue?.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex justify-between py-1 text-[12px]">
                      <p className="text-[12px] font-medium">
                        Additional Charge:
                      </p>
                      <p>
                        {`\u20B9`} {addValue?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* Variable services section */}
                  <div className="mb-2">
                    <div className="flex justify-between py-1 text-[12px] font-medium">
                      <p>Variable Charges:</p>
                      <p>
                        {`\u20B9`} {variablesValue?.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* List all variable service charges */}
                    <div className="pl-2">
                      {variableServiceKeys.map((key) => (
                        <div
                          key={key}
                          className="flex justify-between py-1 text-[12px] border-b border-[#F2F6FF] last:border-0"
                        >
                          <p className="text-[12px] font-normal">
                            {formatLabel(key)}:
                          </p>
                          <p>
                            {`\u20B9`}{" "}
                            {(
                              (variableServices?.[key] as number) || 0
                            ).toLocaleString("en-IN")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <p className="text-[12px] font-normal font-Open lg:text-[16px]">
              COD:
            </p>
            <p>
              {`\u20B9`} {codChargeValuePrice?.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[12px] font-normal font-Open lg:text-[16px]">
              Insurance Price:
            </p>
            <p>
              {`\u20B9`} {roundedInsuranceValue?.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[12px] font-normal font-Open lg:text-[16px]">
              Tax:
            </p>
            <p>
              {`\u20B9`} {roundedTaxValue?.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-[12px] font-normal font-Open lg:text-[16px]">
              Yaari Cash:
            </p>
            <p>
              {`\u20B9`} -{roundedYaariCash?.toLocaleString("en-IN")}
            </p>
          </div>
          <hr className="mt-[100px]"></hr>
          <div className="flex justify-between mt-[5px] ">
            <p className="text-[12px] font-medium font-Open text-[#160783] lg:text-[16px] lg:font-semibold ">
              Gross Total:
            </p>
            <p className="text-[#160783]">
              {`\u20B9`} {roundedPrice?.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDetails;
