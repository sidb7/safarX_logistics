import React, { useState } from "react";
import SimpleLineChart from "../../../components/SimpleLineChart";
import AnalyticsIcon from "../../../assets/analytics.svg";
import CustomDropDown from "../../../components/DropDown";
import UpArrowIcon from "../../../assets/AccordionUp.svg";
import DownArrowIcon from "../../../assets/downwardArrow.svg";
import { ResponsiveState } from "../../../utils/responsiveState";

interface ISimplechart {
  yearArr?: any;
}

const SimpleChart = (props: ISimplechart) => {
  const { yearArr } = props;
  const { isLgScreen } = ResponsiveState();
  const [isOpen, setIsOpen] = useState(false);
  const data = [
    {
      name: "Jan",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Feb",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Mar",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Apr",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "May",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Jun",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Jul",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Aug",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Sep",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Oct",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Nov",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Dec",
      uv: 0,
      pv: 0,
      amt: 0,
    },
  ];

  return (
    <div className={`border-[1px] border-[#E8E8E8] rounded-lg`}>
      <div
        className={`flex flex-col lg:flex-row lg:justify-between lg:items-center lg:h-[3.125rem] ${
          isOpen ? "" : "h-[40px]"
        }  px-4 py-2 lg:px-2 lg:py-0  bg-[#F6F6F6]`}
      >
        <div className="flex items-center justify-between mb-6 lg:mb-0">
          <div className="flex items-center">
            <img src={AnalyticsIcon} alt="AnalyticsIcon" />
            <span className="text-[1rem] font-semibold text-[#1C1C1C] ml-4">
              Revenue
            </span>
          </div>

          <img
            src={isOpen ? UpArrowIcon : DownArrowIcon}
            alt=""
            className="cursor-pointer lg:hidden"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
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
          />
        </div>
      </div>

      {isLgScreen ? (
        <SimpleLineChart data={data} />
      ) : (
        isOpen && <SimpleLineChart data={data} />
      )}
    </div>
  );
};

export default SimpleChart;
