// import React from "react";
// import OneButton from "../../components/Button/OneButton";
// import CustomInputBox from "../../components/Input";
// import AutoGenerateIcon from "../../assets/Product/autogenerate.svg";

// interface OrderInformationProps {
//   order: {
//     orderId: string;
//     orderType: string;
//     reverseState: string; // Add this new property
//   };
//   setOrder: React.Dispatch<
//     React.SetStateAction<{
//       orderId: string;
//       orderType: string;
//       reverseState: string; // Add this new property
//     }>
//   >;
//   showDownloadLebal: boolean;
//   visibility: boolean;
//   setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
//   setSortServiciblity: React.Dispatch<React.SetStateAction<string>>;
//   setHighLightField: React.Dispatch<
//     React.SetStateAction<{
//       addressDetails: boolean;
//       packageDetails: boolean;
//       shippingDetails: boolean;
//       orderDetails: boolean;
//       pickupTimeDetails: boolean;
//     }>
//   >;
// }

// const OrderInformation: React.FC<OrderInformationProps> = ({
//   order,
//   setOrder,
//   showDownloadLebal,
//   visibility,
//   setVisibility,
//   setSortServiciblity,
//   setHighLightField,
// }) => {
//   // Function to generate a unique code
//   const generateUniqueCode = (minLength: number, maxLength: number) => {
//     const charset =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     const length =
//       Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
//     let code = "";

//     while (code.length < length) {
//       const randomIndex = Math.random() * charset.length;
//       const randomIndexOnFloor = Math.floor(randomIndex);
//       code += charset.charAt(randomIndexOnFloor);
//     }

//     return code;
//   };

//   const handleReverseToggle = (isReverse: boolean) => {
//     setOrder((prevState) => ({
//       ...prevState,
//       reverseState: isReverse ? "REVERSE" : "FORWARD",
//     }));
//   };

//   // Function to handle order type change
//   const handleOrderTypeChange = (type: string) => {
//     setOrder((prevState) => ({
//       ...prevState,
//       orderType: type,
//     }));
//   };

//   return (
//     <>
//       <div className="flex items-center justify-between mb-4">
//         <OneButton
//           text={"Parcel"}
//           onClick={() => console.log("Parcel clicked")}
//           variant="primary"
//           className="!rounded-full !w-[100px]"
//         />

//         {/* Reduced width input container */}
//         <div className="w-80">
//           <CustomInputBox
//             isRightIcon={true}
//             containerStyle=""
//             rightIcon={AutoGenerateIcon}
//             className={`!text-base !font-semibold !pr-36 !rounded-2xl`}
//             imageClassName="!h-[12px] !z-0 !w-[113px] !top-[40%] "
//             value={order?.orderId || ""}
//             maxLength={50}
//             label="Order ID"
//             onChange={(e) => {
//               setOrder((prevState) => {
//                 return {
//                   ...prevState,
//                   orderId: e.target.value,
//                 };
//               });
//               setSortServiciblity("");
//               setHighLightField({
//                 addressDetails: false,
//                 packageDetails: false,
//                 shippingDetails: false,
//                 orderDetails: true,
//                 pickupTimeDetails: false,
//               });
//             }}
//             isDisabled={showDownloadLebal}
//             onClick={() => {
//               const orderId = generateUniqueCode(8, 12);
//               setOrder((prevState) => {
//                 return { ...prevState, orderId: orderId };
//               });
//               setSortServiciblity("");
//               setHighLightField({
//                 addressDetails: false,
//                 packageDetails: false,
//                 shippingDetails: false,
//                 orderDetails: true,
//                 pickupTimeDetails: false,
//               });
//             }}
//             visibility={visibility}
//             setVisibility={setVisibility}
//             name="orderId"
//             data-cy="auto-generate-order-id"
//           />
//         </div>
//       </div>

//       {/* Order Type Radio Buttons */}
//       <div className="mt-4 mb-4">
//         <div className="flex gap-5">
//           <div className="flex items-center">
//             <input
//               type="radio"
//               id="b2c"
//               name="orderType"
//               value="B2C"
//               className="mr-2 w-[15px] cursor-pointer h-[15px]"
//               checked={order.orderType === "B2C"}
//               onChange={() => handleOrderTypeChange("B2C")}
//             />
//             <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
//               B2C
//             </span>
//           </div>

//           <div className="flex items-center">
//             <input
//               type="radio"
//               id="b2b"
//               name="orderType"
//               value="B2B"
//               className="mr-2 w-[15px] cursor-pointer h-[15px]"
//               checked={order.orderType === "B2B"}
//               onChange={() => handleOrderTypeChange("B2B")}
//             />
//             <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
//               B2B
//             </span>
//           </div>

//           <div className="flex items-center">
//             <input
//               type="radio"
//               id="sprint"
//               name="orderType"
//               value="SPRINT"
//               className="mr-2 w-[15px] cursor-pointer h-[15px]"
//               checked={order.orderType === "SPRINT"}
//               onChange={() => handleOrderTypeChange("SPRINT")}
//               disabled={true}
//             />
//             <div className="text-sm font-Open leading-[18px] mt-5">
//               <span className="font-semibold text-gray-500">
//                 SPRINT (Coming Soon)
//               </span>
//               <div className="text-gray-500">
//                 (For same day and next day delivery)
//               </div>
//             </div>
//           </div>

//           {order.orderType !== "B2B" &&(<div className="ml-auto flex items-center">
//             <div className="flex items-center">
//               <span className="mr-3 font-semibold text-sm font-Open leading-[18px] text-[#323232]">
//                 Reverse
//               </span>
//               {/* This div will handle the click events instead of using a label */}
//               <div
//                 className="inline-flex relative items-center cursor-pointer"
//                 onClick={() =>
//                   handleReverseToggle(order.reverseState !== "REVERSE")
//                 }
//                 data-cy="reverse-toggle-container"
//               >
//                 <input
//                   type="checkbox"
//                   className="sr-only"
//                   checked={order.reverseState === "REVERSE"}
//                   readOnly
//                   data-cy="reverse-toggle"
//                 />
//                 <div
//                   className={`w-11 h-6 rounded-full transition-colors duration-200 ${
//                     order.reverseState === "REVERSE"
//                       ? "bg-blue-600"
//                       : "bg-gray-200"
//                   }`}
//                 >
//                   <div
//                     className={`absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform duration-200 transform ${
//                       order.reverseState === "REVERSE" ? "translate-x-5" : ""
//                     }`}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           </div>)}

//         </div>
//       </div>
//     </>
//   );
// };

// export default OrderInformation;

import React, { useEffect } from "react";
import OneButton from "../../components/Button/OneButton";
import CustomInputBox from "../../components/Input";
import AutoGenerateIcon from "../../assets/Product/autogenerate.svg";

interface OrderInformationProps {
  order: {
    orderId: string;
    orderType: string;
    reverseState: string;
  };
  setOrder: React.Dispatch<
    React.SetStateAction<{
      orderId: string;
      orderType: string;
      reverseState: string;
    }>
  >;
  showDownloadLebal: boolean;
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setSortServiciblity: React.Dispatch<React.SetStateAction<string>>;
  setHighLightField: React.Dispatch<
    React.SetStateAction<{
      addressDetails: boolean;
      packageDetails: boolean;
      shippingDetails: boolean;
      orderDetails: boolean;
      pickupTimeDetails: boolean;
    }>
  >;
}

const OrderInformation: React.FC<OrderInformationProps> = ({
  order,
  setOrder,
  showDownloadLebal,
  visibility,
  setVisibility,
  setSortServiciblity,
  setHighLightField,
}) => {
  // Function to generate a unique code
  const generateUniqueCode = (minLength: number, maxLength: number) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let code = "";

    while (code.length < length) {
      const randomIndex = Math.random() * charset.length;
      const randomIndexOnFloor = Math.floor(randomIndex);
      code += charset.charAt(randomIndexOnFloor);
    }

    return code;
  };

  const handleReverseToggle = (isReverse: boolean) => {
    setOrder((prevState) => ({
      ...prevState,
      reverseState: isReverse ? "REVERSE" : "FORWARD",
    }));
  };

  // Function to handle order type change
  const handleOrderTypeChange = (type: string) => {
    setOrder((prevState) => ({
      ...prevState,
      orderType: type,
      // If B2B is selected, force reverseState to "FORWARD"
      reverseState: type === "B2B" ? "FORWARD" : prevState.reverseState,
    }));
  };

  // Effect to reset reverseState when B2B is selected
  useEffect(() => {
    if (order.orderType === "B2B" && order.reverseState === "REVERSE") {
      // Force the reverseState to "FORWARD" when B2B is selected
      setOrder((prevState) => ({
        ...prevState,
        reverseState: "FORWARD"
      }));
      
      // Update localStorage to match
      localStorage.setItem("order-creation-reverse-state", "FORWARD");
    }
  }, [order.orderType, order.reverseState, setOrder]);

  return (
    <div>
      <div className="flex items-center justify-between ">
        <OneButton
          text={"Parcel"}
          onClick={() => console.log("Parcel clicked")}
          variant="primary"
          className="!rounded-full !w-[100px]"
        />

        {/* Reduced width input container */}
        <div className="w-80 p-3">
          <CustomInputBox
            isRightIcon={true}
            containerStyle=""
            rightIcon={AutoGenerateIcon}
            className={`!text-base !font-semibold !pr-36 !rounded-2xl`}
            imageClassName="!h-[12px] !z-0 !w-[113px] !top-[40%] "
            value={order?.orderId || ""}
            maxLength={50}
            label="Order ID"
            onChange={(e) => {
              setOrder((prevState) => {
                return {
                  ...prevState,
                  orderId: e.target.value,
                };
              });
              setSortServiciblity("");
              setHighLightField({
                addressDetails: false,
                packageDetails: false,
                shippingDetails: false,
                orderDetails: true,
                pickupTimeDetails: false,
              });
            }}
            isDisabled={showDownloadLebal}
            onClick={() => {
              const orderId = generateUniqueCode(8, 12);
              setOrder((prevState) => {
                return { ...prevState, orderId: orderId };
              });
              setSortServiciblity("");
              setHighLightField({
                addressDetails: false,
                packageDetails: false,
                shippingDetails: false,
                orderDetails: true,
                pickupTimeDetails: false,
              });
            }}
            visibility={visibility}
            setVisibility={setVisibility}
            name="orderId"
            data-cy="auto-generate-order-id"
          />
        </div>
      </div>

      {/* Order Type Radio Buttons */}
      <div className=" mb-2">
        <div className="flex gap-5">
          <div className="flex items-center">
            <input
              type="radio"
              id="b2c"
              name="orderType"
              value="B2C"
              className="mr-2 w-[15px] cursor-pointer h-[15px]"
              checked={order.orderType === "B2C"}
              onChange={() => handleOrderTypeChange("B2C")}
            />
            <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
              B2C
            </span>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="b2b"
              name="orderType"
              value="B2B"
              className="mr-2 w-[15px] cursor-pointer h-[15px]"
              checked={order.orderType === "B2B"}
              onChange={() => handleOrderTypeChange("B2B")}
            />
            <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
              B2B
            </span>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="sprint"
              name="orderType"
              value="SPRINT"
              className="mr-2 w-[15px] cursor-pointer h-[15px]"
              checked={order.orderType === "SPRINT"}
              onChange={() => handleOrderTypeChange("SPRINT")}
              disabled={true}
            />
            <div className="text-sm font-Open leading-[18px] mt-5">
              <span className="font-semibold text-gray-500">
                Sprint (Coming Soon)
              </span>
              <div className="text-gray-500 italic">
                (For same day and next day deliveries)
              </div>
            </div>
          </div>

          {order.orderType !== "B2B" && (
            <div className="ml-auto flex items-center">
              <div className="flex items-center">
                <span className="mr-3 font-semibold text-sm font-Open leading-[18px] text-[#323232]">
                  Reverse
                </span>
                {/* This div will handle the click events instead of using a label */}
                <div
                  className="inline-flex relative items-center cursor-pointer"
                  onClick={() =>
                    handleReverseToggle(order.reverseState !== "REVERSE")
                  }
                  data-cy="reverse-toggle-container"
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={order.reverseState === "REVERSE"}
                    readOnly
                    data-cy="reverse-toggle"
                  />
                  <div
                    className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                      order.reverseState === "REVERSE"
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`absolute top-[2px] left-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform duration-200 transform ${
                        order.reverseState === "REVERSE" ? "translate-x-5" : ""
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderInformation;
