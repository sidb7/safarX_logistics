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
import { CustomTable } from "../../../components/Table";
import ClockErrorIcon from "../../../assets/clock.svg";
import ProcessingIcon from "../../../assets/processing.svg";
import ResolvedIcon from "../../../assets/resolved.svg";
import BlueEye from "../../../assets/blueEye.svg";
import BlueSend from "../../../assets/blueSend.svg";
import { createColumnHelper } from "@tanstack/react-table";
import { capitalizeFirstLetter } from "../../../utils/utility";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/Pagination";

interface ITypeProps {
  onClick?: any;
}

const ViewAllTickets = (props: ITypeProps) => {
  const { onClick } = props;

  const columnsHelper = createColumnHelper<any>();

  const [totalItemCount, setTotalItemCount] = useState(10);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
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

  const TicketsHeading = [
    columnsHelper.accessor("ticketId", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center whitespace-nowrap">
              Ticket Id
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-normal leading-5 ">
            {info.row.original.ticketId}
          </p>
        );
      },
    }),
    columnsHelper.accessor("date", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center whitespace-nowrap">
              Date
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-normal leading-5 ">
            {info.row.original.date}
          </p>
        );
      },
    }),
    columnsHelper.accessor("time", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center whitespace-nowrap">
              Time
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-normal leading-5 ">
            {info.row.original.time}
          </p>
        );
      },
    }),
    columnsHelper.accessor("subject", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center whitespace-nowrap">
              Subject
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-normal leading-5 whitespace-nowrap ">
            {capitalizeFirstLetter(info.row.original.subject)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("priority", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center whitespace-nowrap">
              Priority
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-normal leading-5 ">
            {capitalizeFirstLetter(info.row.original.priority)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("supportType", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center whitespace-nowrap">
              Support Type
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-normal leading-5 ">
            {capitalizeFirstLetter(info.row.original.supportType)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("status", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center whitespace-nowrap">
              Status
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p
            className={`flex items-center justify-center  ${
              info.row.original.status === "Pending"
                ? "text-[#F35838] bg-[#FEEEEB]  border-[#F35838]"
                : info.row.original.status === "Resolved"
                ? "text-[#7CCA62] bg-[#F2FAEF] border-[#7CCA62]"
                : "text-[#F0A22E] bg-[#FDF6EA] border-[#F0A22E]"
            } font-Open text-sm border-[0.5px] font-normal leading-5 py-2 px-3 mx-2 rounded`}
          >
            <img
              src={
                info.row.original.status === "Pending"
                  ? ClockErrorIcon
                  : info.row.original.status === "Resolved"
                  ? ResolvedIcon
                  : ProcessingIcon
              }
              alt=""
              className="mr-2"
            />
            &nbsp;
            {capitalizeFirstLetter(info.row.original.status)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("actions", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center whitespace-nowrap">
              Actions
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex items-center">
            <img
              src={BlueEye}
              alt=""
              className="cursor-pointer"
              onClick={
                () => onClick(info.row.original)
                // navigate("/help/ticket/view-details", {
                //   state: info.row.original,
                // });
              }
            />

            <img src={BlueSend} alt="" className="cursor-pointer" />
          </div>
        );
      },
    }),
  ];

  //on page change index
  const onPageIndexChange = () => {};

  // on per page item change
  const onPerPageItemChange = () => {};

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
    <div>
      <div className="lg:hidden mb-24">
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
      <div className="hidden lg:block">
        <div>
          <CustomTable columns={TicketsHeading} data={TicketsData} />
        </div>
        {totalItemCount > 0 && (
          <Pagination
            totalItems={totalItemCount}
            itemsPerPageOptions={[10, 20, 30, 50]}
            onPageChange={onPageIndexChange}
            onItemsPerPageChange={onPerPageItemChange}
          />
        )}
      </div>
    </div>
  );
};

export default ViewAllTickets;
