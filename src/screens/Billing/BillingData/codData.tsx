import React, { useState } from "react";
import { CustomTable } from "../../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { capitalizeFirstLetter } from "../../../utils/utility";
import copyIcon from "../../../assets/copy.svg";
import sortIcon from "../../../assets/sort.svg";
import downloadIcon from "../../../assets/download.svg";
import exportIcon from "../../../assets/export.svg";
import infoIcon from "../../../assets/info.svg";

interface IInvoiceDataProps {}

const CodData: React.FunctionComponent<IInvoiceDataProps> = (props) => {
  const columnsHelper = createColumnHelper<any>();
  const [data, setData] = useState([
    {
      reportDate: "24 Jul 2023",
      reportRefNo: "COD456787Shipyaari",
      CodAmount: "373,757.0",
      addonCharges: "0.00",
      settlementAmount: "0.00",
      outStandingAmount: "0.00",
      holdAmount: "0.00",
      recoveryAmount: "0.00",
      codRecharge: "0.00",
    },
    {
      reportDate: "24 Jul 2023",
      reportRefNo: "COD456787Shipyaari",
      CodAmount: "373,757.0",
      addonCharges: "0.00",
      settlementAmount: "0.00",
      outStandingAmount: "0.00",
      holdAmount: "0.00",
      recoveryAmount: "0.00",
      codRecharge: "0.00",
    },
    {
      reportDate: "24 Jul 2023",
      reportRefNo: "COD456787Shipyaari",
      CodAmount: "373,757.0",
      addonCharges: "0.00",
      settlementAmount: "0.00",
      outStandingAmount: "0.00",
      holdAmount: "0.00",
      recoveryAmount: "0.00",
      codRecharge: "0.00",
    },
  ]);
  const billingOrdersHeading = [
    columnsHelper.accessor("reportDate", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <h1 className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              Report Date
            </h1>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="py-4">
            <p className="font-Open text-sm font-normal leading-5">
              {info.row.original.reportDate}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("reportRefNo", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <h1 className="font-Open text-sm font-semibold leading-5 text-[#1C1C1C] self-center ">
              Report Ref No
            </h1>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div>
            <p className="font-Open text-sm font-normal leading-5">
              {info.row.original.reportRefNo}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("CodAmount", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              CodAmount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="">
            <p className="font-Open text-sm font-normal leading-5">
              {info.row.original?.CodAmount}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("addonCharges", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Addon Charges
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="">
            <p>₹{info.row?.original?.addonCharges}</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("settlementAmount", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Settlement Amount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="">
            <p>₹{info.row.original?.settlementAmount}</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("outStandingAmount", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              OutStanding Amount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="">
            <p>₹{info.row.original?.outStandingAmount}</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("holdAmount", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Hold Amount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="">
            <p>₹{info.row.original?.holdAmount}</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("recoveryAmount", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Recovery Amount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="">
            <p>₹{info.row.original?.recoveryAmount}</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("codRecharge", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Cod Recharge
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="">
            <p>₹{info.row.original?.codRecharge}</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("actions", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Actions
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex justify-center gap-x-5 max-w-[50px] ">
            <img className="cursor-pointer" src={downloadIcon} alt="" />
          </div>
        );
      },
    }),
  ];
  return (
    <div>
      <CustomTable
        columns={billingOrdersHeading}
        data={data}
        thclassName={" bg-white"}
      />
    </div>
  );
};

export default CodData;
