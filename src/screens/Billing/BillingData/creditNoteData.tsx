import React, { useState } from "react";
import { CustomTable } from "../../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { capitalizeFirstLetter } from "../../../utils/utility";
import copyIcon from "../../../assets/copy.svg";
import sortIcon from "../../../assets/sort.svg";
import downloadIcon from "../../../assets/download.svg";
import exportIcon from "../../../assets/export.svg";
import infoIcon from "../../../assets/info.svg";

interface ICreditNoteDataProps {}

const CreditNoteData: React.FunctionComponent<ICreditNoteDataProps> = (
  props
) => {
  const columnsHelper = createColumnHelper<any>();
  const [data, setData] = useState([
    {
      date: "23 May 2023",
      recieved: "COUPON",
      amount: "50",
      description:
        "Rs. 50 has been credited on 2023-05-30 19:39:04 during wallet recharge through coupon ASDTS.",
    },
    {
      date: "23 May 2023",
      recieved: "COUPON",
      amount: "50",
      description: "NEFT- INWARD-SBIN323032121145- FROM SRC TECH SOLUTION LTD.",
    },
    {
      date: "23 May 2023",
      recieved: "NEFT/IMPS/RTGS",
      amount: "300",
      description:
        "Rs. 300 has been credited on 2023-06-04 19:39:04 through NEFT SBIN323032121145- SRC TECH SOLUTION LTD.",
    },
  ]);
  const billingOrdersHeading = [
    columnsHelper.accessor("date", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <h1 className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              Date
            </h1>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="pb-16">
            <p className="font-Open text-sm font-normal leading-5">
              {info.row.original.date}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("recievedVia", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <h1 className="font-Open text-sm font-semibold leading-5 text-[#1C1C1C] self-center ">
              Recieved Via
            </h1>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="pb-16">
            <p className="font-Open text-sm font-normal leading-5">
              {info.row.original.recieved}
            </p>
          </div>
        );
      },
    }),

    columnsHelper.accessor("amount", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Amount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="pb-16">
            <p className="font-Open text-sm font-normal leading-5">
              ₹{info.row.original.amount}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("description", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Description
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex-wrap pb-16">
            <p>{info.row.original.description}</p>
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
          <div className="flex gap-x-5 mt-[-50px] ">
            <img className="cursor-pointer" src={downloadIcon} alt="" />
            <img className="cursor-pointer" src={exportIcon} alt="" />
          </div>
        );
      },
    }),
  ];
  return (
    // <div>
    //   <CustomTable
    //     columns={billingOrdersHeading}
    //     data={data}
    //     thclassName={" bg-white"}
    //   />
    // </div>
    <div className="flex flex-col justify-center items-center mt-[255px] text-[12px]  text-opacity-30 font-Open">
      coming soon!
    </div>
  );
};

export default CreditNoteData;
