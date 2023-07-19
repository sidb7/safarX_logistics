import SelectIcon from "../../../assets/Order/SelectIcon.svg";
import FilterIcon from "../../../assets/Order/FilterIcon.svg";
import { useState } from "react";
import { SearchBox } from "../../../components/SearchBox";
import { ResponsiveState } from "../../../utils/responsiveState";

const statusBar = (statusName: string, orderNumber: string) => {
  return (
    <div className="flex justify-center items-center border-b-4 border-[#777777] px-4">
      <span className="text-[#777777] text-[14px]">{statusName}</span>
      <span className="flex justify-center items-center rounded-full ml-2 text-[8px] text-white bg-[#777777] h-[16px] w-[16px]">
        {orderNumber}
      </span>
    </div>
  );
};

export const OrderStatus = () => {
  const { isLgScreen } = ResponsiveState();
  const [filterId, setFilterId] = useState(-1);
  const [statusId, setStatusId] = useState(-1);

  const [filterData, setFilterData] = useState([
    { label: "All", isActive: false },
    { label: "Success", isActive: false },
    { label: "Error", isActive: false },
  ]);

  const [statusData, setStatusData] = useState([
    {
      statusName: "New Order",
      orderNumber: "00",
    },
    {
      statusName: "Ready to ship",
      orderNumber: "02",
    },
    {
      statusName: "Ready to pickup",
      orderNumber: "05",
    },
    {
      statusName: "In transit",
      orderNumber: "00",
    },
    {
      statusName: "Complete",
      orderNumber: "02",
    },
    {
      statusName: "All",
      orderNumber: "08",
    },
  ]);

  const filterComponent = (className?: string) => {
    return (
      <div
        className={`flex text-[14px] text-[#777777] font-medium mt-4 h-[44px] w-[204px] lg:hidden ${className}`}
      >
        {filterData.map((singleData, index) => {
          return (
            <span
              className={`flex items-center py-[8px] px-[16px] border-[1px] border-[#A4A4A4] ${
                filterId === index
                  ? "rounded-l-md bg-[#D2D2D2] font-medium text-[#1C1C1C]"
                  : ""
              }`}
              onClick={() => setFilterId(index)}
            >
              {singleData.label}
            </span>
          );
        })}
      </div>
    );
  };

  const filterButton = () => {
    if (isLgScreen) {
      return (
        <div className="grid grid-cols-3 gap-x-2 lg:flex ">
          <div>
            <SearchBox label="Search" value="" onChange={() => {}} />
          </div>
          <div className="flex justify-between items-center p-2 gap-x-2">
            <img src={FilterIcon} alt="" />
            <span className="text-[#004EFF] text-[14px] font-semibold">
              FILTER
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-3 gap-x-2">
          <div className="flex items-center justify-center border-[1px] rounded-md border-[#A4A4A4] col-span-2">
            <img src={SelectIcon} alt="" />
            <span className="ml-2 text-[#1C1C1C] text-[14px] font-medium">
              SELECT
            </span>
          </div>
          <div className="grid justify-center items-center border-[1px] rounded-md border-[#A4A4A4]">
            <img src={FilterIcon} alt="Filter Order" width="16px" />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-x-2 overflow-x-scroll whitespace-nowrap mt-2 h-[34px] lg:mt-9">
        {statusData.map(({ statusName, orderNumber }, index) => {
          return (
            <div
              className={`flex justify-center items-center border-b-2 border-[#777777] px-4 ${
                statusId === index ? "!border-[#004EFF]" : ""
              }`}
              onClick={() => setStatusId(index)}
            >
              <span
                className={`text-[#777777] text-[14px] lg:text-[18px] ${
                  statusId === index ? "!text-[#004EFF] lg:text-[18px]" : ""
                }`}
              >
                {statusName}
              </span>
              <span
                className={`flex justify-center items-center rounded-full ml-2 text-[8px] text-white bg-[#777777] h-[16px] w-[16px] ${
                  statusId === index ? "!bg-[#004EFF]" : ""
                }`}
              >
                {orderNumber}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 justify-center mt-4 h-[36px] lg:flex lg:justify-between">
        <div className="lg:flex lg:gap-x-4">
          <div className="flex items-center">
            <span className="text-[#494949] text-[14px] font-semibold lg:text-[22px] lg:font-semibold">
              00 Order
            </span>
          </div>
          {filterComponent("!hidden lg:!flex lg:!mt-0")}
        </div>

        {filterButton()}
      </div>

      {filterComponent("")}
    </div>
  );
};
