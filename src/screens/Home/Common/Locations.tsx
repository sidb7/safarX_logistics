import React, { useState } from "react";
import SimpleLineChart from "../../../components/SimpleLineChart";
import AnalyticsIcon from "../../../assets/analytics.svg";
import CustomDropDown from "../../../components/DropDown";
import { BarChartComponent } from "../../../components/BarChart";
import RedEllipse from "../../../assets/redEllipse.svg";
import GreenEllipse from "../../../assets/greenEllipse.svg";
import { ResponsiveState } from "../../../utils/responsiveState";
import UpArrowIcon from "../../../assets/AccordionUp.svg";
import DownArrowIcon from "../../../assets/downwardArrow.svg";

interface IBarChart {
  text?: string;
  img?: string;
  data: any;
  yearArr?: any;
  addressCountOrder?: any;
}

const Locations = (props: IBarChart) => {
  const { text, img, data, yearArr, addressCountOrder } = props;
  const [status, setStatus] = useState("state");
  const { isLgScreen } = ResponsiveState();
  const [isOpen, setIsOpen] = useState(false);
  const [arrName, setArrName] = useState<any>("pickUpState");

  return (
    <div className={`border-[1px] border-[#E8E8E8] rounded-lg`}>
      <div
        className={`flex flex-col lg:flex-row lg:justify-between lg:items-center ${
          isOpen ? "" : "h-[40px]"
        }  lg:h-[3.125rem] px-4 py-2 lg:py-0  lg:px-2  bg-[#F6F6F6]`}
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
          <div className="flex justify-between gap-x-3">
            <CustomDropDown
              onChange={(e) => {}}
              options={yearArr}
              heading="Select Filter"
              wrapperClass="!bg-white"
              selectClassName="!h-9 !rounded-lg lg:!rounded !text-[#494949]"
            />
            <CustomDropDown
              onChange={(e) => {}}
              options={yearArr}
              heading="Select Filter"
              wrapperClass="!bg-white"
              selectClassName="!h-9 !rounded-lg lg:!rounded !text-[#494949]"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-[auto]">
          {isLgScreen ? (
            <div className="h-[500px]">
              <BarChartComponent data={data} />
            </div>
          ) : (
            isOpen && (
              <div className="h-[500px]">
                <BarChartComponent data={data} />
              </div>
            )
          )}
        </div>
        <div className="mt-11 flex flex-col items-center">
          <div>
            <span
              className={`cursor-pointer text-[1rem] font-semibold px-6 py-4 border ${
                status === "state" ? "bg-[#F6F6F6]" : "bg-white"
              } `}
              onClick={() => {
                setStatus("state");
                setArrName("pickUpState");
              }}
            >
              States
            </span>
            <span
              className={`cursor-pointer text-[1rem] font-semibold px-6 py-4 border ${
                status === "cities" ? "bg-[#F6F6F6]" : "bg-white"
              } `}
              onClick={() => {
                setStatus("cities");
                setArrName("pickUpCity");
              }}
            >
              Cities
            </span>
          </div>
          <div
            className={`${isLgScreen ? "mt-10" : isOpen ? "block" : "hidden"}`}
          >
            <table
              className="table-auto mt-5"
              style={{ display: "flex", overflow: "scroll", height: "300px" }}
            >
              <tbody className="text-sm lg:text-[1.125rem] font-semibold font-Open leading-5 lg:leading-[22px]">
                {addressCountOrder?.[arrName]?.map((item: any) => {
                  return (
                    <tr>
                      <td className="border-none px-4 py-2">{item?._id}</td>
                      <td className="border-none px-4 py-2">
                        {item?.orderCount} Orders
                      </td>
                      <td className="border-none px-4 py-2">
                        <img src={GreenEllipse} alt="greenEllipse" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
