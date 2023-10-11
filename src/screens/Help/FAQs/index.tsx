import React, { useState, useEffect, SetStateAction } from "react";

import { toast } from "react-toastify";
import FAQContent from "./faqContent";

import Carousel from "./carousel";

interface IFAQs {
  setFAQType: React.Dispatch<SetStateAction<string>>;
}

const FAQ: React.FunctionComponent<IFAQs> = ({ setFAQType }) => {
  const [filterId, setFilterId] = useState(0);
  const [activeTab, setActiveTab] = useState("All");

  const [filterData, setFilterData] = useState([
    { label: "All", isActive: false },
    { label: "Order", isActive: false },
    { label: "Billing", isActive: false },
    { label: "Plan", isActive: false },
    { label: "Help", isActive: false },
  ]);

  const filterComponent = (className?: string) => {
    return (
      <div className="flex  mt-6">
        <div
          className={`flex text-sm lg:text-base font-Open font-semibold text-[#777777] leading-[18px] lg:leading-[22px]  h-[44px] cursor-pointer`}
        >
          {filterData?.map((singleData, index) => {
            return (
              <span
                key={index}
                className={`flex items-center  py-[8px] px-[16px] border-[1px] border-[#A4A4A4]  ${
                  filterId === index
                    ? `${
                        index === filterData.length - 1
                          ? "rounded-r-md"
                          : "rounded-l-md"
                      } bg-[#D2D2D2] font-Open font-semibold text-sm leading-[18px] lg:leading-[22px] lg:text-base text-[#1C1C1C]`
                    : ""
                }`}
                onClick={() => {
                  setFilterId(index);
                  if (index === 0) {
                    setFAQType("All");
                    setActiveTab("All");
                  } else if (index === 1) {
                    setFAQType("Order");
                    setActiveTab("Order");
                  } else if (index === 2) {
                    setFAQType("Billing");
                    setActiveTab("Billing");
                  } else if (index === 3) {
                    setFAQType("Plan");
                    setActiveTab("Plan");
                  } else if (index === 4) {
                    setFAQType("Help");
                    setActiveTab("Help");
                  }
                }}
              >
                {singleData.label}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6 lg:mb-[26px]">{filterComponent()}</div>
      <div className="lg:hidden mb-[46px] rounded-lg border-[0.5px]  border-[#A4A4A4] h-[120px]">
        <Carousel />
      </div>
      <div>
        <FAQContent faqType={activeTab} />
      </div>
    </div>
  );
};

export default FAQ;
