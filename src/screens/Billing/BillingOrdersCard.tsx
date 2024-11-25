import React, { useState } from "react";
import shareIcon from "../../assets/ShareIcon.svg";
import exporticon from "../../assets/export.svg";
import moreicon from "../../assets/more.svg";
import infoRedCircleIcon from "../../assets/info-circle-outline.svg";
import bookedIcon from "../../assets/Transaction/bookedIcon.svg";
import downloadIcon from "../../assets/download.svg";
import downArrowIcon from "../../assets/downwardArrow.svg";
import { capitalizeFirstLetter } from "../../utils/utility";
import { COMPANY_NAME } from "../../utils/ApiUrls";

interface BillingOrdersCardProps {
  data: {
    status: string;
    orderId: string;
    amount: number;
    shipyaariId: string;
    trackingId: string;
    sku: string;
    courierName: string;
    prodDimensions: string;
    VolumetricWeight: string;
    DeadWeight: string;
    BillableWeight: string;
    Price: String;
    FWD: String;
    RTO: string;
    TotalAmount: string;
    GST: String;
    ShippedValue: String;
    WA: String;
    SMS: String;
    ExcessForward: String;
    ExcessRTO: String;
    ExcessTotal: String;
  };
}

const BillingOrdersCard: React.FC<BillingOrdersCardProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className=" font-Open shadow-md border-[0.5px] border-[#e9e8e8] rounded-lg my-8">
      <div className="relative py-4 px-3 rounded-lg">
        {/* status */}
        <div
          className={`absolute top-[-15px] left-6 inline-flex items-center justify-center gap-x-1 rounded-md ${
            data.status === "FAILED"
              ? " bg-[#FEEEEB] border-[0.5px] border-[#F35838]"
              : " bg-[#F2FAEF] border-[0.5px] border-[#9af17d]"
          }  px-3 py-[6px]`}
        >
          <img
            src={data.status === "FAILED" ? infoRedCircleIcon : bookedIcon}
            alt=""
            className="w-4"
          />
          <div
            className={`text-xs font-semibold rounded ${
              data.status === "FAILED" ? "text-[#F35838]" : "text-[#7CCA62]"
            } text-[#7CCA62] items-center`}
          >
            {capitalizeFirstLetter(data.status)}
          </div>
        </div>
        <div className="flex justify-end">
          <img
            src={downArrowIcon}
            alt=""
            className={`cursor-pointer transform ${
              isExpanded ? "rotate-180" : ""
            } transition-transform duration-300`}
            onClick={toggleExpand}
          />
        </div>
        <div className="ml-8">
          <div className="flex flex-wrap gap-4 mb-4 mt-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#777]">Tracking ID:</p>
              <p className="font-semibold text-[#1C1C1C]">{data.trackingId}</p>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#777]">
                {COMPANY_NAME} ID:
              </p>
              <p className="font-semibold text-[#1C1C1C]">{data.shipyaariId}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#777]">Order ID:</p>
              <p className="font-semibold text-[#1C1C1C]">{data.orderId}</p>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#777]">Courier Co.:</p>
              <p className=" font-semibold text-[#1C1C1C]">
                {data.courierName}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1">
                <p className="text-sm text-[#777] font-semibold">
                  Total Amount:
                </p>
                <p className="font-semibold  text-[#1C1C1C]">
                  ₹{data.ShippedValue}
                </p>
              </div>
              {/* <div className="mr-8 mt-6">
                <div className="flex gap-2">
                  <div className="">
                    <img src={downloadIcon} alt="" />
                  </div>
                  <div className="">
                    <img src={exporticon} alt="" />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {isExpanded && (
          <div className="ml-8 mt-4 border-t pt-4">
            <h3 className="font-semibold text-lg mb-3">Package Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-[#777]">SKU:</p>
                <p className="font-semibold text-[#1C1C1C]">{data.sku}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#777]">
                  Courier Co.:
                </p>
                <p className="font-semibold text-[#1C1C1C]">
                  {data.courierName}
                </p>
              </div>
            </div>
            <h3 className="font-semibold text-lg mt-4 mb-3">
              Product Weight/ Product Cost
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-[#777]">
                  Product Dimensions:
                </p>
                <p className="font-semibold text-[#1C1C1C]">
                  {data.prodDimensions}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#777]">
                  Volumetric Weight:
                </p>
                <p className="font-semibold text-[#1C1C1C]">
                  {data.VolumetricWeight}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#777]">
                  Dead Weight:
                </p>
                <p className="font-semibold text-[#1C1C1C]">
                  {data.DeadWeight}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#777]">
                  Billable Weight:
                </p>
                <p className="font-semibold text-[#1C1C1C]">
                  {data.BillableWeight}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#777]">Price:</p>
                <p className="font-semibold text-[#1C1C1C]">₹{data.Price}</p>
              </div>
            </div>
            <h3 className="font-semibold text-lg mt-4 mb-3">Courier Amount</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-[#777]">FWD:</p>
                <p className="font-semibold text-[#1C1C1C]">₹{data.FWD}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#777]">RTO:</p>
                <p className="font-semibold text-[#1C1C1C]">₹{data.RTO}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#777]">
                  Applied Total Amount:
                </p>
                <p className="font-semibold text-[#1C1C1C]">
                  ₹{data.TotalAmount}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#777]">GST:</p>
                <p className="font-semibold text-[#1C1C1C]">₹{data.GST}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#777]">
                  Total Shipped Value:
                </p>
                <p className="font-semibold text-[#1C1C1C]">
                  ₹{data.ShippedValue}
                </p>
              </div>
            </div>

            <h3 className="font-semibold text-lg mt-4 mb-3">VAS Amount</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-[#777]">WA:</p>
                <p className="font-semibold text-[#1C1C1C]">₹{data?.WA}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#777]">SMS:</p>
                <p className="font-semibold text-[#1C1C1C]">₹{data?.SMS}</p>
              </div>
            </div>

            <h3 className="font-semibold text-lg mt-4 mb-3">Updated Amount</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-[#777]">
                  Excess Forward amount:
                </p>
                <p className="font-semibold text-[#1C1C1C]">
                  ₹{data.ExcessForward}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#777]">
                  Excess RTO amount:
                </p>
                <p className="font-semibold text-[#1C1C1C]">
                  ₹{data.ExcessRTO}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#777]">
                  Excess Total amount:
                </p>
                <p className="font-semibold text-[#1C1C1C]">
                  ₹{data.ExcessTotal}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingOrdersCard;

// import React from "react";
// // import {  ArrowUpRight, Send, MoreHorizontal } from 'lucide-react';
// import shareIcon from "../../assets/ShareIcon.svg";
// import exporticon from "../../assets/export.svg";
// import moreicon from "../../assets/more.svg";
// import infoRedCircleIcon from "../../assets/info-circle-outline.svg";
// import bookedIcon from "../../assets/Transaction/bookedIcon.svg";
// import { capitalizeFirstLetter } from "../../utils/utility";

// interface BillingOrdersCardProps {
//   data: {
//     status: string;
//     eta: string;
//     amount: number;
//     shipyaariId: string;
//     trackingId: string;
//   };
// }

// const BillingOrdersCard: React.FC<BillingOrdersCardProps> = ({ data }) => {
//   return (
//     <div className="shadow-md border-[0.5px] border-[#e9e8e8] rounded-lg my-8">
//       <div className="relative py-4 px-3 rounded-lg">
//         {/* status */}
//         <div
//           className={`absolute top-[-15px] left-6 inline-flex items-center justify-center gap-x-1 rounded-md ${
//             data.status === "FAILED"
//               ? " bg-[#FEEEEB] border-[0.5px] border-[#F35838]"
//               : " bg-[#F2FAEF] border-[0.5px] border-[#9af17d]"
//           }  px-3 py-[6px]`}
//         >
//           <img
//             src={data.status === "FAILED" ? infoRedCircleIcon : bookedIcon}
//             alt=""
//             className="w-4"
//           />
//           <div
//             className={`text-xs font-semibold rounded ${
//               data.status === "FAILED" ? "text-[#F35838]" : "text-[#7CCA62]"
//             } text-[#7CCA62] items-center`}
//           >
//             {capitalizeFirstLetter(data.status)}
//           </div>
//         </div>

//         {/* <div className="flex justify-between items-center mb-2">
//           <div className="bg-green-100 text-green-600 py-1 px-2 rounded-md text-sm font-semibold flex items-center">
//             <div className="mr-1">✓</div> {data.status}
//           </div>
//           <div className="text-gray-500">₹ {data.amount} ONLINE</div>
//         </div> */}

//         <div className="grid grid-cols-2 gap-4 mb-4 mt-4">
//           <div>
//             <p className="text-sm font-semibold text-[#777]">Tracking ID:</p>
//             <p className="font-semibold text-[#1C1C1C]">{data.trackingId}</p>
//           </div>
//           <div>
//             <p className="text-sm font-semibold text-[#777]">Shipyaari ID:</p>
//             <p className="font-semibold text-[#1C1C1C]">SYH23678119</p>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <p className="text-sm text-[#777]">SKU:</p>
//             <p className="font-semibold text-[#1C1C1C]">GYSH2364</p>
//           </div>
//           <div>
//             <p className="text-sm font-semibold text-[#777]">Courier Co.:</p>
//             <p className=" font-semibold text-[#1C1C1C]">Xpress Bees</p>
//           </div>
//         </div>
//         <div className="mb-4">
//           <div className="flex justify-normal items-center mb-4 gap">
//             <div>
//               <p className="text-sm text-[#777]">Total Amount:</p>
//               <p className="font-semibold text-lg text-[#1C1C1C]">₹ 6,200</p>
//             </div>
//             <div className="flex space-x-2">
//               <img src={shareIcon} alt="" />
//               <img src={exporticon} alt="" />
//             </div>
//           </div>
//         </div>

//         {/* remaining */}

//         {/* <div className="flex space-x-2">
//           <button className="flex-1 py-2 px-4 bg-blue-50 text-blue-600 rounded-md text-sm font-semibold">
//             General Tag
//           </button>
//           <button className="flex-1 py-2 px-4 bg-blue-50 text-blue-600 rounded-md text-sm font-semibold">
//             Service Tag
//           </button>

//           <img src={moreicon} alt="" />
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default BillingOrdersCard;
