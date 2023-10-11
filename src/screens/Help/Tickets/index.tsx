import React, { useState } from "react";
import SummaryIcon from "../../../assets/serv/Summary.svg";
import { toast } from "react-toastify";
import CustomDropDown from "../../../components/DropDown";
import { ticketTypeOptions } from "../../../utils/dummyData";
import CustomInputBox from "../../../components/Input";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../../../components/Table";
import { capitalizeFirstLetter } from "../../../utils/utility";
import Table from "./table";
import { ResponsiveState } from "../../../utils/responsiveState";
import ServiceButton from "../../../components/Button/ServiceButton";

const Tickets: React.FunctionComponent = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [priority, setPriority] = useState({
    high: false,
    medium: false,
    low: true,
  });

  const { isLgScreen } = ResponsiveState();

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
    <div className="grid grid-cols-1  lg:gap-y-5 pt-5 ">
      <div className="lg:hidden flex flex-col items-center mb-9 ">
        <span className="font-Lato font-bold text-[22px] leading-7 text-[#323232] mb-3 ">
          Need Assistance?
        </span>
        <span className="font-Open font-light text-base leading-[22px] text-[#1C1C1C]">
          Raise a ticket & we will answer
        </span>
      </div>

      <div className=" gap-2 hidden lg:flex">
        <img src={SummaryIcon} alt="Summary Icon" />
        <p className="text-[18px] text-[#202427] font-semibold lg:font-normal font:lato lg:text-2xl ">
          Raise Ticket
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-stretch	mb-9 lg:mb-0  ">
        <CustomDropDown
          value={selectedOption}
          options={ticketTypeOptions}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedOption(event.target.value);
          }}
          wrapperClass="w-full mb-4 lg:mb-0 lg:w-auto"
          heading="Select Ticket Type"
        />
        <CustomDropDown
          value={selectedOption}
          options={ticketTypeOptions}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedOption(event.target.value);
          }}
          wrapperClass="ml-0 lg:ml-10 w-full lg:w-auto mb-4 lg:mb-0 "
          heading="Issues"
        />
        <div className="flex items-center">
          <p className="ml-2 lg:ml-20  font-Open font-normal text-sm leading-4 text-[#777777] ">
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
              <p className="font-Open font-normal text-sm leading-[18px] text-[#1C1C1C] lg:font-semibold  ">
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
              <p className=" font-normal text-sm leading-[18px] lg:font-semibold font-Open text-[#1C1C1C]">
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
              <p className="font-normal text-sm leading-[18px] lg:font-semibold font-Open text-[#1C1C1C]">
                Low
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex gap-2 mb-6 lg:mb-0">
        <img src={SummaryIcon} alt="Summary Icon" />
        <p className="text-[18px] text-[#202427] font-semibold lg:font-normal font:lato lg:text-2xl ">
          Ticket Details
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-stretch  ">
        <div className="w-full lg:w-auto mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="Subject" value={""} onChange={(e) => {}} />
        </div>
        <div className="w-full lg:w-auto  mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="CC" value={""} onChange={(e) => {}} />
        </div>
        <div className="w-full lg:w-auto mb-4 lg:mb-6 ">
          <CustomInputBox label="Attachment" value={""} onChange={(e) => {}} />
        </div>
      </div>
      <div className=" relative border-[1px] border-[#A4A4A4] lg:w-[518px] h-[98px]">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          cols={isLgScreen ? 50 : 10}
        ></textarea>
      </div>

      <div className="relative flex items-center  mt-4 mb-6 lg:mb-0">
        <p className="font-Open font-normal text-sm leading-4 ">
          Contact Support via
        </p>
        <label className="flex items-center space-x-2 ml-[180px] lg:ml-[180px] cursor-pointer">
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
        </label>

        <label className=" flex items-center space-x-2 ml-[260px] lg:ml-[280px] cursor-pointer">
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
        </label>
      </div>
      <div className="lg:hidden">
        <ServiceButton
          text="SUBMIT"
          className="bg-[#1c1c1c] !w-full px-4 py-2 text-[#ffffff] font-semibold text-sm"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default Tickets;
