import React from "react";
import SimpleLineChart from "../../../components/SimpleLineChart";
import AnalyticsIcon from "../../../assets/analytics.svg";
import CustomDropDown from "../../../components/DropDown";

interface ISimplechart {
  yearArr?: any;
}

const SimpleChart = (props: ISimplechart) => {
  const { yearArr } = props;
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
        className={`flex justify-between items-center h-[3.125rem] px-2  bg-[#F6F6F6]`}
      >
        <div className="flex">
          <img src={AnalyticsIcon} alt="AnalyticsIcon" />
          <span className="text-[1rem] font-semibold text-[#1C1C1C] ml-4">
            Revenue
          </span>
        </div>
        <div>
          <CustomDropDown
            onChange={(e) => {}}
            options={yearArr}
            heading="Select Filter"
            wrapperClass="!bg-white"
          />
        </div>
      </div>
      <SimpleLineChart data={data} />
    </div>
  );
};

export default SimpleChart;
