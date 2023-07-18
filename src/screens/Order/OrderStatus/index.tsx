import SelectIcon from "../../../assets/Order/SelectIcon.svg";
import FilterIcon from "../../../assets/Order/FilterIcon.svg";
import { useState } from "react";

const statusBar = (statusName: string, orderNumber: string) => {

 interface Itype {
  filterId: any,
  setFilterId: any
 } 

  return (
    <div className="flex justify-center items-center border-b-4 border-[#777777] px-4">
      <span className="text-[#777777] text-[14px]">{statusName}</span>
      <span className="flex justify-center items-center rounded-full ml-2 text-[8px] text-white bg-[#777777] h-[16px] w-[16px]">
        {orderNumber}
      </span>
    </div>
  );
};

export const OrderStatus = ({setIndex, filterId, setFilterId}: any) => {
 
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
      statusName: "Ready to ship",
      orderNumber: "05",
    },
  ]);

  

  return (
    <div>
      <div className="flex gap-x-2 overflow-x-scroll whitespace-nowrap mt-2 h-[34px]">
        {statusData.map(({ statusName, orderNumber }, index) => {
          return (
            <div
              className={`flex justify-center items-center border-b-2 border-[#777777] px-4 ${
                statusId === index ? "!border-[#004EFF]" : ""
              }`}
              onClick={() => setStatusId(index)}
            >
              <span
                className={`text-[#777777] text-[14px] ${
                  statusId === index ? "!text-[#004EFF]" : ""
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

      <div className="grid grid-cols-2  justify-center mt-4 h-[36px]">
        <div className="flex items-center">
          <span className="text-[#494949] text-[14px] font-semibold">
            00 Order
          </span>
        </div>
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
      </div>

      <div className="flex text-[14px] text-[#777777] font-medium mt-4 h-[44px] w-[204px]">
        {filterData.map((singleData, index) => {
          return (
            <span
              className={`flex items-center py-[8px] px-[16px] border-[1px] border-[#A4A4A4] ${
                filterId === index
                  ? "rounded-l-md bg-[#D2D2D2] font-medium text-[#1C1C1C]"
                  : ""
              }`}
              
              onClick={()=>(setFilterId(index))  }
            >
              {singleData.label}
            </span>
          );
        })}
        
      </div>
     
    </div>
  );
};
