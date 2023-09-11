import React, { useState } from "react";
import deliveryIcon from "../../../assets/serv/delivery.svg";
import editIcon from "../../../assets/serv/edit.svg";
import { useNavigate } from "react-router-dom";

interface ISummaryData {
  key?: any;
  productName?: any;
  productWeight?: any;
  productWeightUnit?: any;
  productDimensionLength?: any;
  productDimensionBreadth?: any;
  productDimensionHeight?: any;
  productDimensionUnit?: any;
  boxInfo?: any[];
}

const BoxDetails = ({ boxInfo = [] }: ISummaryData) => {
  const navigate = useNavigate();
  const [expandedBox, setExpandedBox] = useState<number | null>(null);

  const toggleBox = (index: number) => {
    setExpandedBox(expandedBox === index ? null : index);
  };

  return (
    <div className="p-[12px] gap-[8px] rounded-lg border-[1px] shadow-lg border-[#E8E8E8] bg-[#FFFFFF] lg:w-[385px]">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-row items-center gap-x-2">
            <img src={deliveryIcon} alt="Location Icon" />
            <p className="text-[14px] font-medium font-Open font-semibold lg:text-[18px]">
              Box Details
            </p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate("/orders/add-order/add-product");
            }}
          >
            <div style={{ width: "20px", height: "20px" }}>
              {" "}
              <img src={editIcon} alt="editIcon" className="w-full h-full" />
            </div>
          </div>
        </div>
        <div className="ml-[25px] mb-[10px]">
          <p className="text-[12px] font-medium  font-Open lg:text-[16px] lg:font-semibold">
            Box Count: {boxInfo.length}
          </p>
        </div>

        {boxInfo?.map((box, index) => (
          <div key={index}>
            <div
              className={`flex flex-row justify-between items-center cursor-pointer ${
                expandedBox === index ? "bg-[#E8E8E8]" : "bg-white"
              } rounded-lg border-r-0 border-b-2 border-t-1 border-l-0 border-[#E8E8E8] gap-2 p-4 ${
                expandedBox === index ? "border-r-1 border-[#E8E8E8]" : ""
              }`}
              onClick={() => toggleBox(index)}
            >
              <p className="text-[12px] font-medium ml-[5px] font-Open lg:text-[16px] lg:font-semibold">
                Box Name: {box?.name}
              </p>
              <svg
                className={`w-6 h-6 ${
                  expandedBox === index ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {expandedBox === index && (
              <div className="flex flex-col gap-y-2 mb-10">
                <p className="text-[12px] font-medium ml-[25px] mt-[15px] font-Open lg:text-[16px] ">
                  Box Weight: {box?.deadWeight} {box?.weightUnit}
                </p>
                <hr></hr>
                {box?.products?.map((product: any, productIndex: any) => (
                  <div key={productIndex}>
                    <p className="text-[12px] font-medium ml-[25px] font-Open lg:text-[16px] ">
                      Product Name: {product?.name}
                    </p>
                    <p className="text-[12px] font-medium font-Open ml-[25px] lg:text-[16px] ">
                      Product Weight: {product?.deadWeight}{" "}
                      {product?.weightUnit}
                    </p>
                    <p className="text-[12px] font-medium font-Open ml-[25px] lg:text-[16px] ">
                      Product Dimensions: {product?.length} x {product?.breadth}{" "}
                      x {product?.height} {product?.measureUnit}
                    </p>
                    <hr></hr>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoxDetails;
