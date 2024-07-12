import React, { useState } from "react";
import { CustomTable } from "../../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { capitalizeFirstLetter } from "../../../utils/utility";
import copyIcon from "../../../assets/copy.svg";
import sortIcon from "../../../assets/sort.svg";
import downloadIcon from "../../../assets/download.svg";
import exportIcon from "../../../assets/export.svg";
import infoIcon from "../../../assets/info.svg";
import CustomTableWithScroll from "../../../components/CustomTableWithScroll";

interface IInvoiceDataProps {
  setCodModal?: any;
  setAwbModal?: any;
  tableData?: any[];
  downloadReport?: (reportNumber: any) => Promise<void>;
}

const CodData: React.FunctionComponent<IInvoiceDataProps> = ({
  setCodModal,
  setAwbModal,
  tableData,
  downloadReport,
}) => {
  console.log("tableDatacodData", tableData);
  const columnsHelper = createColumnHelper<any>();
  // const [data, setData] = useState([
  //   {
  //     reportDate: "24 Jul 2023",
  //     reportRefNo: "COD456787Shipyaari",
  //     CodAmount: "373,757.0",
  //     addonCharges: "0.00",
  //     settlementAmount: "0.00",
  //     outStandingAmount: "0.00",
  //     holdAmount: "0.00",
  //     recoveryAmount: "0.00",
  //     codRecharge: "0.00",
  //   },
  //   {
  //     reportDate: "24 Jul 2023",
  //     reportRefNo: "COD456787Shipyaari",
  //     CodAmount: "373,757.0",
  //     addonCharges: "0.00",
  //     settlementAmount: "0.00",
  //     outStandingAmount: "0.00",
  //     holdAmount: "0.00",
  //     recoveryAmount: "0.00",
  //     codRecharge: "0.00",
  //   },
  //   {
  //     reportDate: "24 Jul 2023",
  //     reportRefNo: "COD456787Shipyaari",
  //     CodAmount: "373,757.0",
  //     addonCharges: "0.00",
  //     settlementAmount: "0.00",
  //     outStandingAmount: "0.00",
  //     holdAmount: "0.00",
  //     recoveryAmount: "0.00",
  //     codRecharge: "0.00",
  //   },
  // ]);
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
            <p className="font-Open text-xs font-normal leading-4">
              {info.row.original.reportNumber}
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
            <p className="font-Open text-xs font-normal leading-4">
              {info.row.original.reportNumber}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("CodAmount", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              CodAmount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="">
            <p className="font-Open text-xs font-normal leading-4">
              ₹ {info?.row?.original?.details?.codAmountRemittable}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("addonCharges", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              Addon Charges
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="font-Open font-normal leading-4 text-xs">
            <p>₹{info.row?.original?.addonCharges || 0}</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("settlementAmount", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              Settlement Amount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="font-Open font-normal leading-4 text-xs ">
            <p>₹{info.row.original?.settlementAmount || 0}</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("outStandingAmount", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              OutStanding Amount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="font-Open font-normal leading-4 text-xs ">
            <p>₹{info.row.original?.outStandingAmount || 0}</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("holdAmount", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              Hold Amount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="font-Open font-normal leading-4 text-xs ">
            <p>₹{info.row.original?.holdAmount || 0}</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("recoveryAmount", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              Recovery Amount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div
            className="font-Open font-normal leading-4 text-xs "
            onClick={() =>
              setCodModal({ isOpen: true, data: info?.row?.original })
            }
          >
            <p>₹{info.row.original?.recoveryAmount || 0}</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("codRecharge", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              Cod Recharge
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="font-Open font-normal leading-4 text-xs ">
            <p>₹{info.row.original?.codRecharge || 0}</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("netPaid", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              Net Paid
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        //   info.row.original?.netPaid;

        return (
          <div className="font-Open font-normal leading-4 text-xs ">
            <p className="text-[#5958FF] cursor-pointer">
              ₹ {info?.row?.original?.details?.codAmountRemitted}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("paymentRefNo", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              Payment Ref No
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        //   ₹ info.row.original?.netPaid;

        return (
          <div className="font-Open font-normal leading-4 text-xs ">
            {info?.row?.original?.details?.utrNo}
          </div>
        );
      },
    }),
    columnsHelper.accessor("awb", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              AWB
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        const awbNumbers = info?.row?.original?.details?.awbNos;
        // Calculate the count of AWBs
        const awbCount = Array.isArray(awbNumbers) ? awbNumbers.length : 0;

        return (
          <div
            className=""
            onClick={() =>
              setAwbModal({
                isOpen: true,
                data: info?.row?.original?.details?.awbNos,
              })
            }
          >
            {/* <p>₹{info.row.original?.recoveryAmount}</p> */}
            <p className="text-[#5958FF] cursor-pointer">{awbCount}Awbs</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("actions", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              Actions
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div
            className="flex justify-center gap-x-5 max-w-[50px]"
            onClick={() =>
              downloadReport && downloadReport(info.row.original.reportNumber)
            }
          >
            <img className="cursor-pointer" src={downloadIcon} alt="" />
          </div>
        );
      },
    }),
  ];

  const fixedCol = ["reportDate", "actions"];
  return (
    <div>
      <CustomTableWithScroll
        columns={billingOrdersHeading}
        data={tableData}
        fixedData={fixedCol}
      />
    </div>
  );
};

export default CodData;
