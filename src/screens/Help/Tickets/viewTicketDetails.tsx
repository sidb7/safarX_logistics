import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import CustomAccordianTickets from "./customAccordianTickets";
import ReplyIcon from "../../../assets/Reply.svg";
import CustomInputBox from "../../../components/Input";

import { BottomNavBar } from "../../../components/BottomNavBar";

import ServiceButton from "../../../components/Button/ServiceButton";

interface ITypesProps {}

const ViewTicketDetails = (props: ITypesProps) => {
  const location = useLocation();
  const ticketData = location.state;
  const [onReply, setOnReply] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleContactTypeChange = (value: string) => {
    setSelectedOption(value);
  };

  const replyComponent = () => {
    return (
      <div className="flex flex-col gap-y-3 mx-5">
        <CustomInputBox label="CC" onChange={() => {}} />
        <div className="w-full lg:w-auto mb-4 lg:mb-6 ">
          <CustomInputBox label="Attachment" value={""} onChange={(e) => {}} />
        </div>
        <div className=" relative border-[1px] border-[#A4A4A4] lg:w-[518px] h-[98px]">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            cols={10}
          ></textarea>
        </div>
        <div className="relative flex items-center mt-4 mb-6 lg:mb-0">
          <p className="font-Open font-normal text-sm leading-4">
            Contact Support via
          </p>
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
            <span className="cursor-pointer font-Open font-normal text-sm leading-[18px] text-[#1C1C1C]">
              Chat
            </span>
          </label>

          <label className=" flex items-center space-x-2  ml-[260px] cursor-pointer">
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
      </div>
    );
  };

  return (
    <div>
      <div className="mb-4">
        <Breadcrum label="View Details" />
      </div>
      <div className="mx-5">
        <CustomAccordianTickets datas={[ticketData]} isTicketDetails={true} />
      </div>
      <div className="mb-3">
        <div className="rounded-lg border-[1px] p-4 border-[#E8E8E8] font-Open font-normal italic text-sm bg-[#F6F6F6] leading-[14px] text-[#323232] mx-4 ">
          <p className="mb-2">{`On Fri 20 May 10:00AM, Ritu Sen <abcd@gmail.com>
wrote:`}</p>
          <div className="mb-12">
            <p>Hi Shipyaari Team,</p>
            <p>Noted.</p>
          </div>
          <p className="mb-2">{`On Fri 20 May 10:00AM, Shipyaari Support Team
<technicalsupport@shipyaari.com> wrote:`}</p>
          <p className="mb-3">Hi Ritu Sen,</p>
          <p className="mb-3">Thankyou for contacting us.</p>
          <p className="mb-2">{`We have opened your ticket issue ${"#323412"}`}</p>
          <p className="mb-3">
            You need to first select the products from the catalogue to add them
            in bulk order. Also system will automatically suggest your bulk
            packages formed in the past order.
          </p>
          <p>Sincerely,</p>
          <p>Team Shipyaari</p>
        </div>
      </div>
      {!onReply && (
        <div
          onClick={() => {
            setOnReply(true);
          }}
          className="mx-5"
        >
          <img alt="" src={ReplyIcon} />
        </div>
      )}
      {onReply && replyComponent()}
      {onReply ? (
        <div className="mt-24">
          <footer className="w-full fixed lg:-ml-2 bottom-0">
            <div className="grid grid-cols-2 shadow-lg border-[1px] bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0 lg:flex lg:justify-end lg:!w-[calc(100%-64px)]">
              <ServiceButton
                text={"REPLY"}
                className={"!text-white !bg-black"}
                onClick={() => {}}
              />
              <ServiceButton
                text={"CANCEL"}
                className={""}
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
