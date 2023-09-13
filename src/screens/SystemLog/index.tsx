import React from "react";
import { Breadcum } from "../../components/Layout/breadcrum";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import {
  capitalizeFirstLetter,
  convertEpochToDateTime,
} from "../../utils/utility";

const SystemLog = () => {
  const columnsHelper = createColumnHelper<any>();

  let systemLogData = [
    {
      companyId: "00a8dd6f-9a70-497e-b7bd-2c149521fdad",
      privateCompanyId: "100009",
      eventName: "Seller_Login",
      userId: 1009,
      userName: "tanmay mungekar",
      ipAddress: "::1",
      status: true,
      logType: "SUCCESS",
      createdAt: 1694500565220,
      userType: "SELLER",
    },
  ];

  const systemLogColumns = [
    columnsHelper.accessor("companyId", {
      header: () => {
        return (
          <p
            className={`font-Open  
               text-base leading-[22px] text-[#004EFF]
             font-semibold   text-start  whitespace-nowrap `}
          >
            CompanyId
          </p>
        );
      },

      cell: (info: any) => {
        return (
          <p className="flex items-center  text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.companyId}
          </p>
        );
      },
    }),

    columnsHelper.accessor("eventName", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center ">
            Event Name
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {capitalizeFirstLetter(info.row.original.eventName)}
          </div>
        );
      },
    }),
    columnsHelper.accessor("userId", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
            User Id
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center first-letter:justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.userId}
          </div>
        );
      },
    }),
    columnsHelper.accessor("userName", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
            User Name
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {capitalizeFirstLetter(info.row.original.userName)}
          </div>
        );
      },
    }),
    columnsHelper.accessor("ipAddress", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
            Ip Address
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.ipAddress}
          </div>
        );
      },
    }),
    columnsHelper.accessor("status", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
            Status
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.status === true ? "True" : "False"}
          </div>
        );
      },
    }),
    columnsHelper.accessor("logType", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
            Log Type
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {capitalizeFirstLetter(info.row.original.logType)}
          </div>
        );
      },
    }),
    columnsHelper.accessor("userType", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
            User Type
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {capitalizeFirstLetter(info.row.original.userType)}
          </div>
        );
      },
    }),
    columnsHelper.accessor("createdAt", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
            Created At
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-semibold text-sm leading-5 text-[#1C1C1C] ">
            {convertEpochToDateTime(info.row.original.createdAt)}
          </div>
        );
      },
    }),
  ];

  return (
    <>
      <div>
        <Breadcum label="System Log" />
      </div>
      <div className="mx-4">
        <CustomTable data={systemLogData} columns={systemLogColumns} />
      </div>
    </>
  );
};

export default SystemLog;
