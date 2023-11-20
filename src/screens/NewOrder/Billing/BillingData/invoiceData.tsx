import React, { useState } from "react";
import { CustomTable } from "../../../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import {
  capitalizeFirstLetter,
  convertEpochToDateTime,
} from "../../../../utils/utility";
import copyIcon from "../../../../assets/copy.svg";
import sortIcon from "../../../../assets/sort.svg";
import downloadIcon from "../../../../assets/download.svg";
import exportIcon from "../../../../assets/export.svg";
import infoIcon from "../../../../assets/info.svg";

interface IInvoiceDataProps {
  invoiceData?: any;
}

const InvoiceData: React.FunctionComponent<IInvoiceDataProps> = (props) => {
  const navigate = useNavigate();

  const { invoiceData } = props;
  const columnsHelper = createColumnHelper<any>();
  const [data, setData] = useState(invoiceData);

  const openInvoice = (id: any) => {
    navigate(`/billing/invoice/${id}`);
  };
  const billingOrdersHeading = [
    columnsHelper.accessor("invoiceId", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <h1 className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              Invoice Id
            </h1>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="py-4">
            <p className="font-Open text-sm font-normal leading-5">
              {info?.row?.original?.invoiceNo}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("invoiceDate", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <h1 className="font-Open text-sm font-semibold leading-5 text-[#1C1C1C] self-center ">
              Invoice Date
            </h1>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div>
            <p className="font-Open text-sm font-normal leading-5">
              {convertEpochToDateTime(info?.row?.original?.startDate)}
            </p>
          </div>
        );
      },
    }),

    columnsHelper.accessor("dueDate", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Due Date
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="">
            <p className="font-Open text-sm font-normal leading-5">
              {convertEpochToDateTime(info?.row?.original?.endDate)}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("invoiceAmount", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Invoice Amount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="">
            <p>₹{info?.row?.original?.charges?.total}</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("status", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Status
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="">
            <span className=" border-[#d4b27f] border-[1px] p-2 rounded-md bg-[#f4eee5] text-[#d4b27f] font-semibold">
              PAID
            </span>
            {/* {info.row.original.status === "Unpaid" ? (
              <span className=" border-[#d4b27f] border-[1px] p-2 rounded-md bg-[#f4eee5] text-[#d4b27f] font-semibold">
                {capitalizeFirstLetter(info.row.original.status)}
              </span>
            ) : info.row.original.status === "Paid" ? (
              <span className=" border-[#95d47f] border-[1px] p-2 rounded-md bg-[#eff8ec] text-[#95d47f] font-semibold">
                {capitalizeFirstLetter(info.row.original.status)}
              </span>
            ) : (
              <span className=" border-[#f35838] border-[1px] p-2 rounded-md bg-[#f9f0ee] text-[#f35838] font-semibold">
                {capitalizeFirstLetter(info.row.original.status)}
              </span>
            )} */}
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
          <div
            className="flex gap-x-5"
            onClick={() => openInvoice(info?.row?.original?.invoiceNo)}
          >
            <img className="cursor-pointer" src={exportIcon} alt="" />
            {/* {info.row.original.status === "Unpaid" ? (
              <span className="underline text-[#004EFF]">PAY NOW</span>
            ) : (
              <>
                <img className="cursor-pointer" src={downloadIcon} alt="" />
                <img className="cursor-pointer" src={exportIcon} alt="" />
              </>
            )} */}
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

export default InvoiceData;
