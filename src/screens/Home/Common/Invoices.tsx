import React, { useState } from "react";
import CustomDropDown from "../../../components/DropDown";
import { ResponsiveState } from "../../../utils/responsiveState";
import UpArrowIcon from "../../../assets/AccordionUp.svg";
import DownArrowIcon from "../../../assets/downwardArrow.svg";

interface IInvoices {
  text?: string;
  img?: string;
  data: any;
  yearArr?: any;
}

const Invoices = (props: IInvoices) => {
  const { text, img, data, yearArr } = props;
  const { isLgScreen } = ResponsiveState();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border-[1px] border-[#E8E8E8] h-auto rounded-lg overflow-hidden`}
    >
      <div
        className={`flex flex-col lg:flex-row lg:justify-between lg:items-center ${
          isOpen ? "" : "h-[40px]"
        }  lg:h-[3.125rem] px-4 py-2 lg:py-0 lg:px-2  bg-[#F6F6F6]`}
      >
        <div
          className="flex items-center justify-between mb-6 lg:mb-0"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div className="flex">
            <img src={img} alt="AnalyticsIcon" />
            <span className="text-[1rem] font-Open font-semibold text-[#1C1C1C] leading-[22px] ml-2">
              {text}
            </span>
          </div>
          <img
            src={isOpen ? UpArrowIcon : DownArrowIcon}
            alt=""
            className="cursor-pointer lg:hidden"
          />
        </div>

        <div
          className={`${isLgScreen ? "block" : isOpen ? "block" : "hidden"}`}
        >
          <CustomDropDown
            onChange={(e) => {}}
            options={yearArr}
            heading="Select Filter"
            wrapperClass="!bg-white"
            selectClassName="!h-9 !rounded-lg lg:!rounded"
          />
        </div>
      </div>
      {
        <div
          className={`${
            isLgScreen ? "block" : isOpen ? "block" : "hidden"
          } grid grid-cols-4 gap-3 px-4 py-4 `}
        >
          {data?.map((ele: any, i: number) => {
            return (
              <div
                className="h-full flex-col flex items-center text-center"
                key={i}
              >
                <div className=" rounded-md aspect-square	 w-full lg:w-2/4 flex justify-center items-center bg-[#F6F6F6] text-[#004EFF] text-[1.37rem] font-Lato font-semibold ">
                  {ele?.count}
                </div>
                <div>
                  <p className="text-[#494949] font-Open text-xs lg:text-sm font-normal leading-4 mt-6">
                    {ele?.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
};

export default Invoices;
