import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import CustomAccordianTickets from "./customAccordianTickets";
import ReplyIcon from "../../../assets/Reply.svg";
import CustomInputBox from "../../../components/Input";

import { BottomNavBar } from "../../../components/BottomNavBar";

import ServiceButton from "../../../components/Button/ServiceButton";
import { ResponsiveState } from "../../../utils/responsiveState";

interface ITypesProps {
  ticketData?: any;
}

const ViewTicketDetails = (props: ITypesProps) => {
  const location = useLocation();
  let ticketData = location?.state || props?.ticketData;

  const [onReply, setOnReply] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const { isLgScreen } = ResponsiveState();

  const handleContactTypeChange = (value: string) => {
    setSelectedOption(value);
  };

  const replyComponent = () => {
    return (
      <div className="flex flex-col gap-y-3 mx-5 lg:mx-0">
        <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-4 lg:gap-y-0 lg:mb-6 lg:items-center lg:justify-between lg:w-1/2">
          <CustomInputBox label="CC" onChange={() => {}} />
          <div className="w-full  lg:mb-0 ">
            <CustomInputBox
              label="Attachment"
              value={""}
              onChange={(e) => {}}
            />
          </div>
        </div>

        <div className=" relative border-[1px] rounded-lg lg:mb-6 border-[#A4A4A4] lg:w-1/2 h-[120px]">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            cols={10}
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
      </div>
    );
  };

  return (
    <div>
      <div className="mb-4 lg:hidden">
        <Breadcrum label="View Details" />
      </div>
      <div className="mx-5 lg:mx-0">
        <CustomAccordianTickets datas={[ticketData]} isTicketDetails={true} />
      </div>
      <div className="mb-3">
        <div className="rounded-lg lg:h-[460px] border-[1px] p-4 border-[#E8E8E8] font-Open font-normal italic text-sm bg-[#F6F6F6] leading-[14px] text-[#323232] mx-5 lg:mx-0 ">
          <p className="mb-2 lg:mb-8">{`On Fri 20 May 10:00AM, Ritu Sen <abcd@gmail.com>
wrote:`}</p>
          <div className="mb-12">
            <p className="lg:mb-4 font-semibold">Hi Shipyaari Team,</p>
            <p className="lg:mb-4">Noted.</p>
          </div>
          <p className="mb-2 lg:mb-6 ">{`On Fri 20 May 10:00AM, Shipyaari Support Team
<technicalsupport@shipyaari.com> wrote:`}</p>
          <p className="mb-3 lg:mb-5 font-semibold">Hi Ritu Sen,</p>
          <p className="mb-3 lg:mb-5">Thankyou for contacting us.</p>
          <p className="mb-2 lg:mb-5">{`We have opened your ticket issue ${"#323412"}`}</p>
          <p className="mb-3 lg:mb-5">
            You need to first select the products from the catalogue to add them
            in bulk order. Also system will automatically suggest your bulk
            packages formed in the past order.
          </p>
          <p className="lg:mb-3">Sincerely,</p>
          <p>Team Shipyaari</p>
        </div>
      </div>
      <div className=" flex-col hidden lg:flex">
        <p className="font-Lato font-semibold text-xl text-[#323232] mx-5 mb-7 lg:mx-0">
          Reply
        </p>
        {replyComponent()}
      </div>

      {!onReply && (
        <div
          onClick={() => {
            setOnReply(true);
          }}
          className="mx-5 lg:mx-0 cursor-pointer lg:hidden"
        >
          <img alt="" src={ReplyIcon} />
        </div>
      )}
      {onReply && replyComponent()}
      {onReply || isLgScreen ? (
        <div className="mt-24">
          <footer className="w-full fixed lg:-ml-8 bottom-0">
            <div className="grid grid-cols-2 shadow-lg border-[1px] bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0 lg:flex lg:justify-end lg:!w-[calc(100%-64px)]">
              <ServiceButton
                text={"REPLY"}
                className={"!text-white !bg-black lg:px-4 lg:py-2"}
                onClick={() => {}}
              />
              <ServiceButton
                text={"CANCEL"}
                className={"lg:px-4 lg:py-2"}
                onClick={() => {
                  setOnReply(false);
                }}
              />
            </div>
          </footer>
        </div>
      ) : (
        <div className="mt-24">
          <BottomNavBar />
        </div>
      )}
    </div>
  );
};

export default ViewTicketDetails;
