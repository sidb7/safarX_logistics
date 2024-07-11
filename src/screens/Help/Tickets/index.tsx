import React, { useState } from "react";
import SummaryIcon from "../../../assets/serv/summary.svg";

import CustomDropDown from "../../../components/DropDown";
import { ticketTypeOptions } from "../../../utils/dummyData";
import CustomInputBox from "../../../components/Input";
import { ResponsiveState } from "../../../utils/responsiveState";
import ServiceButton from "../../../components/Button/ServiceButton";
import ViewAllTicketsIcon from "../../../assets/viewAllTickets.svg";
import { useNavigate } from "react-router-dom";
import CustomAccordianTickets from "./customAccordianTickets";

const Tickets: React.FunctionComponent = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  const [priority, setPriority] = useState({
    high: false,
    medium: false,
    low: true,
  });

  const { isLgScreen } = ResponsiveState();

  const TicketsData = [
    {
      ticketId: "#32310",
      date: "23 May 2023",
      time: "11:02 PM",
      subject: "Problem in adding bulk order",
      priority: "Low",
      supportType: "Technical",
      status: "Pending",
      isOpen: false,
    },
    {
      ticketId: "#32310",
      date: "23 May 2023",
      time: "11:02 PM",
      subject: "Problem in adding bulk order",
      priority: "Low",
      supportType: "Technical",
      status: "Processing",
      isOpen: false,
    },
    {
      ticketId: "#32310",
      date: "23 May 2023",
      time: "11:02 PM",
      subject: "Problem in adding bulk order",
      priority: "Low",
      supportType: "Technical",
      status: "Resolved",
      isOpen: false,
    },
  ];

  const handlePriorityChange = (value: string) => {
    setPriority({
      high: value === "high",
      medium: value === "medium",
      low: value === "low",
    });
  };

  const handleContactTypeChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="grid grid-cols-1   pt-5 ">
      <div className="lg:hidden flex flex-col items-center mb-9 ">
        <span className="font-Lato font-bold text-[22px] leading-7 text-[#323232] mb-3 ">
          Need Assistance?
        </span>
        <span className="font-Open font-light text-base leading-[22px] text-[#1C1C1C]">
          Raise a ticket & we will answer
        </span>
      </div>

      <div className=" gap-x-2 hidden lg:flex mb-5 ">
        <img src={SummaryIcon} alt="Summary Icon" />
        <p className="text-[18px] text-[#202427] font-Lato leading-8  font-semibold lg:font-normal  lg:text-2xl ">
          Raise Ticket
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:justify-between	mb-9 lg:mb-8  ">
        <CustomDropDown
          value={selectedOption}
          options={ticketTypeOptions}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedOption(event.target.value);
          }}
          wrapperClass="w-full mb-4 lg:mb-0 "
          heading="Select Ticket Type"
        />
        <CustomDropDown
          value={selectedOption}
          options={ticketTypeOptions}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedOption(event.target.value);
          }}
          wrapperClass="ml-0 lg:ml-8 w-full mb-4 lg:mb-0 "
          heading="Issues"
        />
        <div className="flex items-center lg:ml-8">
          <p className=" font-Open font-normal text-sm leading-4 text-[#777777] lg:text-[#323232] ">
            Priority
          </p>
          <div className="flex space-x-3  lg:space-x-5 ml-5 lg:ml-10">
            <div
              className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer h-[35px] py-2 px-4  lg:w-[172px] ${
                priority.high === true
                  ? "!border-[#004EFF] !text-[#004EFF] "
                  : "border-gray-300 text-[#1C1C1C]"
              }`}
              onClick={(e) => {
                handlePriorityChange("high");
              }}
            >
              <p
                className={`font-Open font-normal text-sm leading-[18px] ${
                  priority.high === true ? "!text-[#004EFF]" : "!text-[#1C1C1C]"
                }`}
              >
                High
              </p>
            </div>
            <div
              className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer h-[35px] lg:w-[172px] px-4 py-2 ${
                priority.medium === true
                  ? "border-[#004EFF] !text-[#004EFF] "
                  : "border-gray-300 text-[#1C1C1C]"
              }`}
              onClick={(e) => {
                handlePriorityChange("medium");
              }}
            >
              <p
                className={`font-normal text-sm leading-[18px]  font-Open text-[#1C1C1C] ${
                  priority.medium === true
                    ? "!text-[#004EFF]"
                    : "!text-[#1C1C1C]"
                }`}
              >
                Medium
              </p>
            </div>
            <div
              className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer h-[35px] lg:w-[172px] px-4 py-2 ${
                priority.low === true
                  ? "border-[#004EFF] text-[#004EFF] "
                  : "border-gray-300  text-[#1C1C1C]"
              }`}
              onClick={(e) => {
                handlePriorityChange("low");
              }}
            >
              <p
                className={`font-normal text-sm leading-[18px]  font-Open text-[#1C1C1C] ${
                  priority.low === true ? "!text-[#004EFF]" : "!text-[#1C1C1C]"
                } `}
              >
                Low
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="  mb-6 lg:mb-5">
        <p className="text-[18px] text-[#202427] font-Lato leading-8  font-semibold lg:font-normal  lg:text-2xl">
          Ticket Details
        </p>
      </div>

      <div className="flex flex-col lg:space-x-4 lg:mb-6 lg:flex-row items-center lg:justify-between  ">
        <div className="w-full mb-4 lg:mb-0 ">
          <CustomInputBox label="Subject" value={""} onChange={(e) => {}} />
        </div>
        <div className="w-full  mb-4 lg:mb-0 ">
          <CustomInputBox label="CC" value={""} onChange={(e) => {}} />
        </div>
        <div className="w-full mb-4 lg:mb-0 ">
          <CustomInputBox label="Attachment" value={""} onChange={(e) => {}} />
        </div>
      </div>
      <div className=" relative border-[1px] border-[#A4A4A4] rounded-lg mb-4 lg:mb-6 lg:w-2/3 h-[120px]">
        <label
          htmlFor="description"
          className="font-Open font-normal text-sm text-[#1C1C1C]"
        >
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          cols={isLgScreen ? 50 : 10}
        ></textarea>
      </div>

      <div className="flex items-center justify-between w-full mb-6 lg:mb-0 lg:w-[400px]">
        <p className="font-Open font-normal text-sm leading-4 text-[#323232] ">
          Contact Support via
        </p>
        <div className="flex items-center space-x-4  ">
          <div className=" flex items-center space-x-2 cursor-pointer">
            <input
              id="email-radio"
              type="radio"
              value="email"
              name="contactType"
              className="cursor-pointer"
              checked={selectedOption === "email"}
              onChange={() => handleContactTypeChange("email")}
            />
            <span className="cursor-pointer font-Open font-normal text-sm leading-[18px] text-[#1C1C1C] ">
              Email
            </span>
          </div>

          <div className="flex items-center space-x-2 cursor-pointer">
            <input
              id="chat-radio"
              type="radio"
              value="chat"
              name="contactType"
              className="cursor-pointer"
              checked={selectedOption === "chat"}
              onChange={() => handleContactTypeChange("chat")}
            />
            <span className="cursor-pointer font-Open font-normal text-sm leading-[18px] text-[#1C1C1C]">
              Chat
            </span>
          </div>
        </div>
      </div>

      <div className="lg:hidden mb-9">
        <ServiceButton
          text="SUBMIT"
          className="bg-[#1c1c1c] !w-full px-4 py-2 text-[#ffffff] font-semibold text-sm"
          onClick={() => {}}
        />
      </div>
      <div className="lg:hidden ">
        <div className="flex items-center justify-between mb-5">
          <p>Recent Tickets</p>
          <div
            onClick={() => navigate("/help/ticket/view-all")}
            className="cursor-pointer"
          >
            <img src={ViewAllTicketsIcon} alt="" />
          </div>
        </div>
        <CustomAccordianTickets datas={TicketsData} isTicketDetails={true} />
      </div>
      <div className="mt-24">
        <footer className="w-full fixed lg:-ml-8 bottom-0">
          <div className="grid grid-cols-2 shadow-lg border-[1px] bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0 lg:flex lg:justify-end lg:!w-[calc(100%-64px)]">
            <ServiceButton
              text={"BACK"}
              className={"!text-white !bg-black lg:px-4 lg:py-2"}
              onClick={() => {}}
            />
            <ServiceButton
              text={"SUBMIT"}
              className={"lg:px-4 lg:py-2"}
              onClick={() => {}}
            />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Tickets;
