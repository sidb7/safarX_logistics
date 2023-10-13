import React, { useState } from "react";
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

const TicketsTable = () => {
  const columnsHelper = createColumnHelper<any>();

  const navigate = useNavigate();
  const [totalItemCount, setTotalItemCount] = useState(10);

  //on page change index
  const onPageIndexChange = () => {};

  // on per page item change
  const onPerPageItemChange = () => {};

  const TicketsData = [
    {
      ticketId: "#32310",
      date: "23 May 2023",
      time: "11:02 PM",
      subject: "Problem in adding bulk order",
      priority: "Low",
      supportType: "Technical",
      status: "Pending",
    },
    {
      ticketId: "#32310",
      date: "23 May 2023",
      time: "11:02 PM",
      subject: "Problem in adding bulk order",
      priority: "Low",
      supportType: "Technical",
      status: "Processing",
    },
    {
      ticketId: "#32310",
      date: "23 May 2023",
      time: "11:02 PM",
      subject: "Problem in adding bulk order",
      priority: "Low",
      supportType: "Technical",
      status: "Resolved",
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
              onClick={() => {
                navigate("/help/ticket/view-details", {
                  state: info.row.original,
                });
              }}
            />

            <img src={BlueSend} alt="" className="cursor-pointer" />
          </div>
        );
      },
    }),
  ];
  return (
    <div>
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
  );
};

export default TicketsTable;
