import React, { useState } from "react";
import SimpleLineChart from "../../../components/SimpleLineChart";
import AnalyticsIcon from "../../../assets/analytics.svg";
import CustomDropDown from "../../../components/DropDown";
import { BarChartComponent2 } from "../../../components/BarChart2";
import UpArrowIcon from "../../../assets/AccordionUp.svg";
import DownArrowIcon from "../../../assets/downwardArrow.svg";
import { ResponsiveState } from "../../../utils/responsiveState";
import GreenEllipse from "../../../assets/greenEllipse.svg";
import RedEllipse from "../../../assets/redEllipse.svg";

interface IBarChart {
  text?: string;
  img?: string;
  data: any;
  yearArr?: any;
  ndr?: any; // For only total NDR card -only for mobile view
}

const BarChart2 = (props: IBarChart) => {
  const { text, img, data, yearArr, ndr } = props;

  const { isLgScreen } = ResponsiveState();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`border-[1px] border-[#E8E8E8] rounded-lg `}>
        <div
          className={`flex flex-col lg:flex-row lg:justify-between lg:items-center ${
            isOpen ? "" : "h-[40px]"
          }  lg:h-[3.125rem] px-4 py-2 lg:py-0  lg:px-2  bg-[#F6F6F6]`}
        >
          <div className="flex items-center justify-between mb-6 lg:mb-0  ">
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
              selectClassName="!h-9 !rounded-lg lg:!rounded !text-[#494949]"
            />
          </div>
        </div>

        {isLgScreen ? (
          <BarChartComponent2 data={data} />
        ) : (
          isOpen && <BarChartComponent2 data={data} />
        )}
      </div>
      {ndr === true && (
        <div
          className={`${isLgScreen ? "hidden" : isOpen ? "block" : "hidden"}`}
        >
          <div className=" p-4 gap-6  grid grid-cols-2  border-[1px] border-[#E8E8E8] rounded-lg ">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-bold font-Lato">0</h1>
                <img
                  src={GreenEllipse}
                  alt="GreenEllipse"
                  height={20}
                  width={20}
                />
              </div>
              <p className="text-sm font-Open font-normal mt-[0.75px]">
                Total NDR
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-bold font-Lato">0</h1>
                <img src={RedEllipse} alt="RedEllipse" height={20} width={20} />
              </div>
              <p className="text-sm font-Open font-normal mt-[0.75px]">
                Delivered
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-bold font-Lato">0</h1>
                <img
                  src={GreenEllipse}
                  alt="GreenEllipse"
                  height={20}
                  width={20}
                />
              </div>
              <p className="text-sm font-Open font-normal mt-[0.75px]">RTO</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BarChart2;
