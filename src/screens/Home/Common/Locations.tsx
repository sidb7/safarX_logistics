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
}

const Locations = (props: IBarChart) => {
  const { text, img, data, yearArr } = props;
  const [status, setStatus] = useState("state");
  const { isLgScreen } = ResponsiveState();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-[1px] border-[#E8E8E8] rounded-lg`}>
      <div
        className={`flex flex-col lg:flex-row lg:justify-between lg:items-center ${
          isOpen ? "" : "h-[40px]"
        }  lg:h-[3.125rem] px-4 py-2 lg:py-0  lg:px-2  bg-[#F6F6F6]`}
      >
        <div className="flex items-center justify-between mb-6 lg:mb-0  ">
          <div className="flex items-center">
            <img src={img} alt="AnalyticsIcon" />
            <span className="text-[1rem] font-semibold text-[#1C1C1C] ml-4">
              {text}
            </span>
          </div>
          <img 
            src={isOpen ? UpArrowIcon : DownArrowIcon}
            alt=""
            className="cursor-pointer lg:hidden"
            onClick={()=>{
              setIsOpen(!isOpen);
            }}
          />
        </div>
        <div className={`${isLgScreen ? "block" : isOpen? "block":"hidden"}`}>
          <div className="flex gap-3">
            <CustomDropDown
              onChange={(e) => {}}
              options={yearArr}
              heading="Select Filter"
              wrapperClass="!bg-white"
            />
            <CustomDropDown
              onChange={(e) => {}}
              options={yearArr}
              heading="Select Filter"
              wrapperClass="!bg-white"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* <div className= "h-[500px]" > */}
          {
            isLgScreen ? (
<div className="h-[500px]">
<BarChartComponent data={data} />

</div>
            ):(
              isOpen && 
              
              <div className="">

<BarChartComponent data={data} />

              </div>

              
            )
          }
        {/* </div> */}
        <div>
          <div className="mt-10">
            <span
              className={`cursor-pointer text-[1rem] font-semibold px-6 py-4 border ${
                status === "state" ? "bg-[#F6F6F6]" : "bg-white"
              } `}
              onClick={() => setStatus("state")}
            >
              States
            </span>
            <span
              className={`cursor-pointer text-[1rem] font-semibold px-6 py-4 border ${
                status === "cities" ? "bg-[#F6F6F6]" : "bg-white"
              } `}
              onClick={() => setStatus("cities")}
            >
              Cities
            </span>
          </div>
          <div className="mt-10">
            <table className="table-auto">
              <tbody className="text-[1.125rem] font-semibold font-Open">
                <tr>
                  <td className="border-none px-4 py-2">Maharashtra</td>
                  <td className="border-none px-4 py-2">0 Orders</td>
                  <td className="border-none px-4 py-2">
                    <img src={GreenEllipse} alt="greenEllipse" />
                  </td>
                </tr>
                <tr>
                  <td className="border-none px-4 py-2">Delhi</td>
                  <td className="border-none px-4 py-2">0 Orders</td>
                  <td className="border-none px-4 py-2">
                    <img src={RedEllipse} alt="RedEllipse" />
                  </td>
                </tr>
                <tr>
                  <td className="border-none px-4 py-2">M.P</td>
                  <td className="border-none px-4 py-2">0 Orders</td>
                  <td className="border-none px-4 py-2">
                    <img src={GreenEllipse} alt="greenEllipse" />
                  </td>
                </tr>
                <tr>
                  <td className="border-none px-4 py-2">Orissa</td>
                  <td className="border-none px-4 py-2">0 Orders</td>
                  <td className="border-none px-4 py-2">
                    <img src={GreenEllipse} alt="greenEllipse" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
