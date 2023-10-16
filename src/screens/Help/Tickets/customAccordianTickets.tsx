import React, { useState } from "react";
import upArrowIcon from "../../../assets/Filter/upArrow.svg";
import downArrowIcon from "../../../assets/Filter/downArrow.svg";
import ClockErrorIcon from "../../../assets/clock.svg";
import ProcessingIcon from "../../../assets/processing.svg";
import ResolvedIcon from "../../../assets/resolved.svg";
import { capitalizeFirstLetter } from "../../../utils/utility";

import CloseTicketIcon from "../../../assets/CancelTicket.svg";
import ViewDetailsIcon from "../../../assets/ViewDetails.svg";
import ShareIcon from "../../../assets/Share.svg";
import { useNavigate } from "react-router-dom";

interface ITypeProps {
  datas: any;
  isTicketDetails: boolean;
}

const CustomAccordianTickets = (props: ITypeProps) => {
  const { datas, isTicketDetails } = props;

  const [data, setData] = useState(datas);
  const navigate = useNavigate();

  return (
    <>
      {data.map((eachData: any, index: any) => {
        return (
          <div className={`flex flex-col   mb-3   cursor-pointer `}>
            <div
              className={`flex items-center justify-between p-3 h-[56px] border-[1px] border-[#E8E8E8] ${
                data[index]?.isOpen
                  ? "bg-[#E8E8E8] rounded-tr-lg rounded-tl-lg rounded-b-none "
                  : "bg-[#FFFFFF] rounded-lg "
              }`}
              onClick={() => {
                let temp = [...data];

                if (data[index].isOpen === true) {
                  temp[index].isOpen = false;

                  setData(temp);
                } else {
                  temp[index].isOpen = true;
                  setData(temp);
                }
              }}
            >
              <div className="flex items-center justify-between w-[94%] lg:w-[98%] ">
                <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
                  {eachData.subject}
                </span>
                <div
                  className={`flex items-center ${
                    eachData.status === "Pending"
                      ? "text-[#F35838] bg-[#FEEEEB]  border-[#FEEEEB]"
                      : eachData.status === "Resolved"
                      ? "text-[#7CCA62] bg-[#F2FAEF] border-[#7CCA62]"
                      : "text-[#F0A22E] bg-[#FDF6EA] border-[#FDF6EA]"
                  } font-Open text-sm font-semibold leading-5 px-4 py-2 rounded-lg`}
                >
                  <img
                    src={
                      eachData.status === "Pending"
                        ? ClockErrorIcon
                        : eachData.status === "Resolved"
                        ? ResolvedIcon
                        : ProcessingIcon
                    }
                    alt=""
                  />
                  &nbsp;
                  {capitalizeFirstLetter(eachData.status)}
                </div>
              </div>
              <img
                src={eachData.isOpen ? upArrowIcon : downArrowIcon}
                alt="downArrowIcon"
                className=""
              />
            </div>
            {data[index].isOpen && (
              <div
                className={`flex flex-col border-[1px] border-[#E8E8E8] rounded-bl-lg rounded-br-lg  `}
              >
                <div className="grid  gap-y-2 lg:gap-y-4 grid-cols-2 lg:grid-cols-4  py-4  ">
                  {/* Date */}
                  <div className=" flex flex-col  lg:col-span-1  border-[1px] px-4 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                    <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px] whitespace-nowrap">
                      {"Date"}
                    </span>
                    <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                      {eachData.date}
                    </span>
                  </div>
                  {/* Time */}
                  <div className="flex flex-col border-[1px] px-4 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                    <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px] whitespace-nowrap">
                      {"Time"}
                    </span>
                    <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                      {eachData.time}
                    </span>
                  </div>
                  {/* Support Type*/}
                  <div className="flex flex-col border-[1px] px-4 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                    <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px] whitespace-nowrap">
                      {"Support Type"}
                    </span>
                    <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                      {eachData.supportType}
                    </span>
                  </div>
                  {/* Priority*/}
                  <div className="flex flex-col border-[1px] px-4 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                    <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px] whitespace-nowrap">
                      {"Priority"}
                    </span>
                    <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                      {eachData.priority}
                    </span>
                  </div>
                  {/* Subject*/}
                  <div className="flex flex-col border-[1px] px-4 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                    <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px] whitespace-nowrap">
                      {"Subject"}
                    </span>
                    <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                      {eachData.subject}
                    </span>
                  </div>
                </div>

                {isTicketDetails ? (
                  <div className="mx-4 lg:hidden">
                    <img alt="" src={CloseTicketIcon} />
                  </div>
                ) : (
                  <div className="flex items-center px-4 gap-x-3">
                    <img
                      alt=""
                      src={ViewDetailsIcon}
                      onClick={() => {
                        navigate("/help/ticket/view-details", {
                          state: eachData,
                        });
                      }}
                    />
                    <img alt="" src={ShareIcon} />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default CustomAccordianTickets;
