import React from "react";
import CustomDropDown from "../../../components/DropDown";
import { SameDataComposedChart } from "../../../components/SameDataComposedChart";

interface IComposedChart {
  text?: string;
  img?: string;
  data: any;
  yearArr?: any;
}

const ComposedChart = (props: IComposedChart) => {
  const { text, img, data, yearArr } = props;

  return (
    <div className={`border-[1px] border-[#E8E8E8] rounded-lg`}>
      <div
        className={`flex justify-between items-center h-[3.125rem] px-2  bg-[#F6F6F6]`}
      >
        <div className="flex">
          <img src={img} alt="AnalyticsIcon" />
          <span className="text-[1rem] font-semibold text-[#1C1C1C] ml-4">
            {text}
          </span>
        </div>
        <div>
          <CustomDropDown
            onChange={(e) => {
              console.log("e year :", e.target.value);
            }}
            options={yearArr}
            heading="Select Filter"
            wrapperClass="!bg-white"
          />
        </div>
      </div>
      <SameDataComposedChart data={data} />
    </div>
  );
};

export default ComposedChart;
