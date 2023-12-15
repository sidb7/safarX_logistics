import React, { useState } from "react";
import SimpleLineChart from "../../../components/SimpleLineChart";
import AnalyticsIcon from "../../../assets/analytics.svg";
import CustomDropDown from "../../../components/DropDown";
import UpArrowIcon from "../../../assets/AccordionUp.svg";
import DownArrowIcon from "../../../assets/downwardArrow.svg";
import GreenEllipse from "../../../assets/greenEllipse.svg";
import RedEllipse from "../../../assets/redEllipse.svg";
import { ResponsiveState } from "../../../utils/responsiveState";

interface ISimplechart {
  yearArr?: any;
  revenue?: boolean;
  revenueDetails?: any;
}

const SimpleChart = (props: ISimplechart) => {
  const { yearArr, revenue, revenueDetails } = props;
  const { isLgScreen } = ResponsiveState();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`${
          isOpen
            ? "border-t-[1px] border-r-[1px] border-b-[0px] border-l-[1px] border-[#E8E8E8] rounded-t-lg"
            : "border-[1px] border-[#E8E8E8] rounded-lg"
        }`}
      >
        <div
          className={`flex flex-col lg:flex-row lg:justify-between lg:items-center lg:h-[3.125rem] ${
            isOpen ? "" : "h-[40px]"
          }  px-4 py-2 lg:px-2 lg:py-0  bg-[#F6F6F6]`}
        >
          <div
            className="flex items-center justify-between mb-6 lg:mb-0"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <div className="flex items-center">
              <img src={AnalyticsIcon} alt="AnalyticsIcon" />
              <span className="text-[1rem] font-semibold font-Open leading-[22px] text-[#1C1C1C] ml-2">
                Revenue
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
          <SimpleLineChart data={revenueDetails?.revenue} />
        ) : (
          isOpen && <SimpleLineChart data={revenueDetails?.revenue} />
        )}
      </div>
      {revenue === true && (
        <div
          className={`${isLgScreen ? "hidden" : isOpen ? "block" : "hidden"}`}
        >
          <div className=" p-4 border-t-[0px] border-r-[1px] border-b-[1px] border-l-[1px] border-[#E8E8E8] rounded-b-lg ">
            <div className="grid grid-cols-2 gap-5 ">
              <div>
                <div className="flex justify-between">
                  <h1 className="font-Lato text-xl font-bold leading-[26px]">
                    &#8377;
                    {Math.round(
                      revenueDetails?.charges?.HighestOrderValue
                    )?.toLocaleString("en-IN") || 0}
                  </h1>
                  <img src={GreenEllipse} alt="GreenEllipse" />
                </div>
                <p className="font-Open text-sm font-normal leading-5 mt-2">
                  Highest Order Value
                </p>
              </div>
              <div>
                <div className="flex justify-between">
                  <h1 className="font-Lato text-xl font-bold leading-[26px]">
                    &#8377;
                    {Math.round(
                      revenueDetails?.charges?.AvgOrderValue
                    )?.toLocaleString("en-IN") || 0}{" "}
                  </h1>
                  <img src={RedEllipse} alt="RedEllipse" />
                </div>
                <p className="font-Open text-sm font-normal leading-5 mt-2">
                  Avg Order Value
                </p>
              </div>
              <div>
                <div className="flex justify-between">
                  <h1 className="font-Lato text-xl font-bold leading-[26px]">
                    &#8377;
                    {Math.round(
                      revenueDetails?.charges?.TodaysRevenue
                    )?.toLocaleString("en-IN") || 0}{" "}
                  </h1>
                  <img src={GreenEllipse} alt="GreenEllipse" />
                </div>
                <p className="font-Open text-sm font-normal leading-5 mt-2">
                  Today's Revenue
                </p>
              </div>
            </div>
            {/* <div>
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
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleChart;
