

// import React, { useState, useRef, useEffect } from "react";
// import FloatingLabelInput from "./FloatingLabelInput"; // Updated path

// interface PaymentInformationProps {
//   paymentMethod: string;
//   setPaymentMethod: (method: string) => void;
//   collectibleAmount: string;
//   setCollectibleAmount: (amount: string) => void;
//   insuranceOption: string;
//   setInsuranceOption: (option: string) => void;
// }

// const PaymentInformation: React.FC<PaymentInformationProps> = ({
//   paymentMethod,
//   setPaymentMethod,
//   collectibleAmount,
//   setCollectibleAmount,
//   insuranceOption,
//   setInsuranceOption,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col md:flex-row md:gap-16">
//       {/* Left Column - Payment Methods */}
//       <div className="md:w-1/3 space-y-4 mb-6 md:mb-0">
//         {/* Custom Dropdown */}
//         <div ref={dropdownRef} className="relative">
//           {/* Selected Value Display */}
//           <div 
//             className="w-full pl-4 pr-10 py-4 border border-gray-300 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-Open text-sm cursor-pointer flex justify-between"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <span>{paymentMethod}</span>
//             <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </div>
//           </div>
          
//           {/* Dropdown Options */}
//           {isOpen && (
//             <div className="absolute z-20 mt-1 w-full bg-white shadow-lg border border-gray-200  overflow-hidden rounded-2xl">
//               <div className="bg-white">
//                 <div 
//                   className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-2xl  bg-white font-Open text-sm"
//                   onClick={() => {
//                     setPaymentMethod("Prepaid");
//                     setIsOpen(false);
//                   }}
//                 >
//                   Prepaid
//                 </div>
//                 <div 
//                   className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-2xl  bg-white font-Open text-sm"
//                   onClick={() => {
//                     setPaymentMethod("Cash on Delivery");
//                     setIsOpen(false);
//                   }}
//                 >
//                   Cash on Delivery
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Collectible Amount */}
//         {paymentMethod === "Cash on Delivery" && (
//           <div>
//             <FloatingLabelInput
//               placeholder="Collectible Amount"
//               type="number"
//               value={collectibleAmount}
//               onChangeCallback={setCollectibleAmount}
//               readOnly={true}
//             />
//           </div>
//         )}
//       </div>

//       {/* Right Column - Insurance Options */}
//       <div className="md:w-2/3">
//         <h3 className="text-lg font-medium mb-4">Insure your Shipment?</h3>
        
//         <div className="space-y-3">
//           {/* Option 1: With Insurance */}
//           <span className="flex items-start gap-3 cursor-pointer">
//             <div className="flex h-6 items-center">
//               <input
//                 type="radio"
//                 name="insurance"
//                 value="withInsurance"
//                 checked={insuranceOption === "withInsurance"}
//                 onChange={() => setInsuranceOption("withInsurance")}
//                 className="h-5 w-5 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
//                 disabled={true} // Disable this option for now
//               />
//             </div>
//             <div className="text-sm">
//               <p className="font-medium text-gray-900">Protect with Insurance (coming soon)</p>
//               <p className="text-gray-500">Covers loss, theft, and damage during transit. Charges are subject to applicable terms.</p>
//             </div>
//           </span>

//           {/* Option 2: No Insurance */}
//           <span className="flex items-start gap-3 cursor-pointer">
//             <div className="flex h-6 items-center">
//               <input
//                 type="radio"
//                 name="insurance"
//                 value="noInsurance"
//                 checked={insuranceOption === "noInsurance"}
//                 onChange={() => setInsuranceOption("noInsurance")}
//                 className="h-5 w-5 rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
//               />
//             </div>
//             <div className="text-sm">
//               <p className="font-medium text-gray-900">I'll take the risk (No extra cost)</p>
//               <p className="text-gray-500">You'll bear full liability for any loss or damage.</p>
//             </div>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentInformation;


import React,{useEffect} from "react";
import FloatingLabelInput from "./FloatingLabelInput";

interface PaymentInformationProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  collectibleAmount: string;
  setCollectibleAmount: (amount: string) => void;
  insuranceOption: string;
  setInsuranceOption: (option: string) => void;
  reverseState: string; // Add this prop
}

const PaymentInformation: React.FC<PaymentInformationProps> = ({
  paymentMethod,
  setPaymentMethod,
  collectibleAmount,
  setCollectibleAmount,
  insuranceOption,
  setInsuranceOption,
  reverseState,
}) => {
   // Check if COD should be disabled (when reverse is true)
  const isCODDisabled = reverseState === "REVERSE";

  // Effect to automatically switch to Prepaid if COD was selected and reverse becomes true
  useEffect(() => {
    if (isCODDisabled && paymentMethod === "Cash on Delivery") {
      setPaymentMethod("Prepaid");
    }
  }, [isCODDisabled, paymentMethod, setPaymentMethod]);

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8 w-full">
      {/* Left Section - Payment Methods */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 mb-6 lg:mb-0">
        {/* Payment Method Radio Buttons */}
        <div className="flex gap-6 mb-4 lg:mb-0">
          <span className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input
                type="radio"
                name="paymentMethod"
                value="Prepaid"
                checked={paymentMethod === "Prepaid"}
                onChange={() => setPaymentMethod("Prepaid")}
                className="h-5 w-5 rounded-full border-2 border-gray-300 text-blue-600 focus:ring-blue-500 "
              />
            </div>
            <span className="text-sm font-medium text-gray-900">Prepaid</span>
          </span>

          <span className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                disabled={isCODDisabled} // Add this line
                checked={paymentMethod === "Cash on Delivery"}
                onChange={() => setPaymentMethod("Cash on Delivery")}
                className="h-5 w-5 rounded-full border-2 border-gray-300 text-blue-600 focus:ring-blue-500 "
              />
            </div>
            {/* <span className="text-sm font-medium text-gray-900">COD</span> */}
             <span className={`text-sm font-medium ${isCODDisabled ? 'text-gray-400' : 'text-gray-900'}`}>
    COD {isCODDisabled && '(Not available for reverse orders)'}
  </span>
          </span>
        </div>

        {/* Collectible Amount Input - Reserve space to prevent layout shifts */}
        <div className="w-48 pt-2">
          {paymentMethod === "Cash on Delivery" ? (
            <FloatingLabelInput
              placeholder="Collectible Amount"
              type="number"
              value={collectibleAmount}
              onChangeCallback={setCollectibleAmount}
              readOnly={true}
            />
          ) : (
            <div className="h-12"></div> // Reserve space when hidden
          )}
        </div>
      </div>

      {/* Right Section - Insurance Options */}
      <div className="flex-1 lg:ml-8">
        <h3 className="text-lg font-medium mb-4 text-gray-900">Insure your Shipment?</h3>
        
        <div className="flex flex-col lg:flex-row lg:gap-8 gap-4">
          {/* Option 1: With Insurance - Disabled as in original */}
          <span className="flex items-start gap-3 cursor-pointer">
            <div className="flex h-6 items-center">
              <input
                type="radio"
                name="insurance"
                value="withInsurance"
                checked={insuranceOption === "withInsurance"}
                onChange={() => setInsuranceOption("withInsurance")}
                className="h-5 w-5 rounded-full border-2 border-gray-300 text-blue-600 focus:ring-blue-500 "
                disabled={true} // Keep original disabled state
              />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-400">Protect with Insurance (Coming Soon)</p>
              <p className="text-gray-400 mt-1">Covers loss, theft, and damage during transit. Charges are subject to applicable terms.</p>
            </div>
          </span>

          {/* Option 2: No Insurance */}
          <span className="flex items-start gap-3 cursor-pointer pb-3">
            <div className="flex h-6 items-center">
              <input
                type="radio"
                name="insurance"
                value="noInsurance"
                checked={insuranceOption === "noInsurance"}
                onChange={() => setInsuranceOption("noInsurance")}
                className="h-5 w-5 rounded-full border-2 border-gray-300 text-blue-600 focus:ring-blue-500 "
              />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">I'll take the risk (No extra cost)</p>
              <p className="text-gray-500 mt-1">You'll bear full liability for any loss or damage.</p>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation;