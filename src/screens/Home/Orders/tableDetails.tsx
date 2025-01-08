import React, { useState } from "react";
import CustomDropDown from "../../../components/DropDown";
import { CustomTable } from "../../../components/Table";
import { ResponsiveState } from "../../../utils/responsiveState";
import UpArrowIcon from "../../../assets/AccordionUp.svg";
import DownArrowIcon from "../../../assets/downwardArrow.svg";

interface ITable {
  text?: string;
  img?: string;
  col?: any;
  data?: any;
  yearArr?: any;
}

const TableDetails = (props: ITable) => {
  const { text, img, col, data, yearArr } = props;
  const { isLgScreen } = ResponsiveState();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border-[1px] border-[#E8E8E8] rounded-lg`}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div
        className={`flex flex-col lg:flex-row  lg:justify-between lg:items-center ${
          isOpen ? "" : "h-[40px]"
        }  lg:h-[3.125rem] px-4 py-2 lg:px-2 lg:py-0  bg-[#F6F6F6]`}
      >
        <div className="flex items-center justify-between mb-6 lg:mb-0">
          <div className="flex items-center ">
            <img src={img} alt="AnalyticsIcon" />
            <span className="text-sm md:text-[1rem] font-Open font-semibold text-[#1C1C1C] ml-2 lg:ml-4">
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
            selectClassName="!h-9 !rounded-lg lg:!rounded !text-[#494949]"
          />
        </div>
      </div>

      {isLgScreen ? (
        <CustomTable columnsData={col} rowData={data} />
      ) : (
        isOpen && (
          <div className="">
            <CustomTable columnsData={col} rowData={data} />
          </div>
        )
      )}
    </div>
  );
};

export default TableDetails;
