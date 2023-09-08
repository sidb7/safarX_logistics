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

const Tickets: React.FunctionComponent = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [priority, setPriority] = useState({
    high: false,
    medium: false,
    low: true,
  });

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
    <div className="grid grid-cols-1 gap-y-5 pt-5 ">
      <div className=" flex gap-2">
        <img src={SummaryIcon} alt="Summary Icon" />
        <p className="text-[18px] text-[#202427] font-semibold lg:font-normal font:lato lg:text-2xl ">
          Raise Ticket
        </p>
      </div>

      <div className="flex items-center justify-stretch	  ">
        {" "}
        <CustomDropDown
          value={selectedOption}
          options={ticketTypeOptions}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedOption(event.target.value);
          }}
          wrapperClass="  "
          heading="Select Ticket Type"
        />
        <CustomDropDown
          value={selectedOption}
          options={ticketTypeOptions}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedOption(event.target.value);
          }}
          wrapperClass="ml-10 "
          heading="Issues"
        />
        <p className="ml-20">Priority</p>
        <div className="flex  space-x-4 ml-10">
          <div
            className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] py-2 px-4  lg:w-[172px] ${
              priority.high === true
                ? "!border-[#004EFF] !text-[#004EFF] "
                : "border-gray-300 text-[#1C1C1C]"
            }`}
            onClick={(e) => {
              handlePriorityChange("high");
            }}
          >
            <p className="lg:font-semibold lg:font-Open lg:text-[14px] ">
              High
            </p>
          </div>
          <div
            className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] lg:w-[172px] px-4 py-2 ${
              priority.medium === true
                ? "border-[#004EFF] !text-[#004EFF] "
                : "border-gray-300 text-[#1C1C1C]"
            }`}
            onClick={(e) => {
              handlePriorityChange("medium");
            }}
          >
            <p className="lg:font-semibold lg:font-Open lg:text-[14px] ">
              Medium
            </p>
          </div>
          <div
            className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] lg:w-[172px] px-4 py-2 ${
              priority.low === true
                ? "border-[#004EFF] text-[#004EFF] "
                : "border-gray-300  text-[#1C1C1C]"
            }`}
            onClick={(e) => {
              handlePriorityChange("low");
            }}
          >
            <p className="lg:font-semibold lg:font-Open lg:text-[14px] ">Low</p>
          </div>
        </div>
      </div>

      <div className=" flex gap-2">
        <img src={SummaryIcon} alt="Summary Icon" />
        <p className="text-[18px] text-[#202427] font-semibold lg:font-normal font:lato lg:text-2xl ">
          Raise Ticket
        </p>
      </div>

      <div className="flex items-center justify-stretch	  ">
        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="Subject" value={""} onChange={(e) => {}} />
        </div>
        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="CC" value={""} onChange={(e) => {}} />
        </div>
        <div className="mb-4 lg:mb-6 ">
          <CustomInputBox label="Attachment" value={""} onChange={(e) => {}} />
        </div>
      </div>
      <div className=" relative border border-black w-[518px] h-[98px]">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          cols={50}
        ></textarea>
      </div>

      <div className="relative flex items-center mt-4">
        <p>Contact Support via</p>
        <label className="flex items-center space-x-2 ml-[180px] cursor-pointer">
          <input
            id="chat-radio"
            type="radio"
            value="chat"
            name="contactType"
            className="cursor-pointer"
            checked={selectedOption === "chat"}
            onChange={() => handleContactTypeChange("chat")}
          />
          <span className="cursor-pointer">Chat</span>
        </label>

        <label className=" flex items-center space-x-2  ml-[280px] cursor-pointer">
          <input
            id="email-radio"
            type="radio"
            value="email"
            name="contactType"
            className="cursor-pointer"
            checked={selectedOption === "email"}
            onChange={() => handleContactTypeChange("email")}
          />
          <span className="cursor-pointer">Email</span>
        </label>
      </div>
    </div>
  );
};

export default Tickets;
