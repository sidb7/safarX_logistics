import React, { useState } from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import FilterIcon from "../../../assets/Order/FilterIcon.svg";
import CustomAccordianTickets from "./customAccordianTickets";

import CustomCenterModal from "../../../components/CustomModal/customCenterModal";
import CrossIcon from "../../../assets/PickUp/ModalCrossWeb.svg";
import { ticketFilterData } from "../../../utils/dummyData";

import CustomAccordian from "../../../components/CustomAccordian";

import { BottomNavBar } from "../../../components/BottomNavBar";

import ServiceButton from "../../../components/Button/ServiceButton";
import BackArrowIcon from "../../../assets/backArrow.svg";

interface ITypeProps {}

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

const ViewAllTickets = (props: ITypeProps) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const FilterComponent = () => {
    return (
      <div className="flex flex-col w-full h-full relative   ">
        <div className="flex items-center justify-between  mb-5 mt-5 mx-5 ">
          <div className="flex items-center space-x-2">
            <img
              src={BackArrowIcon}
              alt=""
              className="cursor-pointer"
              onClick={() => {}}
            />

            <p className=" text-base font-bold  text-[#1C1C1C] ">{"Filter"}</p>
          </div>
          <img
            src={CrossIcon}
            alt=""
            className="cursor-pointer"
            onClick={() => {
              setIsFilterModalOpen(false);
            }}
          />
        </div>
        <div className="h-[60%] overflow-y-scroll">
          <CustomAccordian dummyDatas={ticketFilterData} />
        </div>

        <div className="grid grid-cols-2 absolute bottom-0 shadow-lg border-[1px] bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px]  w-full lg:flex lg:justify-end lg:!w-[calc(100%-64px)]">
          <ServiceButton
            text="CANCEL"
            className={""}
            onClick={() => {
              setIsFilterModalOpen(false);
            }}
          />
          <ServiceButton
            text="APPLY"
            className={"!text-[#ffffff] !bg-[#1c1c1c]"}
            onClick={() => {}}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="lg:hidden">
      <div className="mb-4">
        <Breadcrum label="View all" />
      </div>
      <div className="flex items-center justify-between mx-5 mb-6">
        <p className="font-Open font-semibold text-sm leading-[18px] text-[#494949]">
          All Tickets
        </p>
        <div
          className="rounded border-[1px] p-2 border-[#A4A4A4] cursor-pointer"
          onClick={() => {
            setIsFilterModalOpen(true);
          }}
        >
          <img alt="" src={FilterIcon} />
        </div>
      </div>
      <div className="mx-5">
        <CustomAccordianTickets datas={TicketsData} isTicketDetails={false} />
      </div>
      <BottomNavBar />
      <CustomCenterModal
        isOpen={isFilterModalOpen}
        onRequestClose={() => {
          setIsFilterModalOpen(false);
        }}
        shouldCloseOnOverlayClick={true}
        className="!flex !justify-center !items-center !w-[80%] !h-[60%]"
      >
        <FilterComponent />
      </CustomCenterModal>
    </div>
  );
};

export default ViewAllTickets;
