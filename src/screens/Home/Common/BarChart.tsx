import React, { useState } from "react";
// import SimpleLineChart from "../../../components/SimpleLineChart";
// import AnalyticsIcon from "../../../assets/analytics.svg";
import CustomDropDown from "../../../components/DropDown";
import { BarChartComponent } from "../../../components/BarChart";
import { ResponsiveState } from "../../../utils/responsiveState";
import UpArrowIcon from "../../../assets/AccordionUp.svg";
import DownArrowIcon from "../../../assets/downwardArrow.svg";

interface IBarChart {
  text?: string;
  img?: string;
  data: any;
  yearArr?: any;
}

const BarChart = (props: IBarChart) => {
  const { text, img, data, yearArr } = props;
  const { isLgScreen } = ResponsiveState();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border-[1px] border-[#E8E8E8] rounded-lg`}>
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
          <div className="flex items-center">
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
        </div>{" "}
      </div>
      {isLgScreen ? (
        <BarChartComponent data={data} />
      ) : (
        isOpen && <BarChartComponent data={data} />
      )}
    </div>
  );
};

export default BarChart;
