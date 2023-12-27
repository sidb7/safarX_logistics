import React from "react";
import ClockErrorIcon from "../../assets/clock.svg";
import ProcessingIcon from "../../assets/processing.svg";
import ResolvedIcon from "../../assets/resolved.svg";
import actionIcon from "../../assets/WeightManagement/actioniconweightfreeze.svg";
import LockIcon from "../../assets/WeightManagement/lockicon.svg";
import { createColumnHelper } from "@tanstack/react-table";
import { capitalizeFirstLetter } from "../../utils/utility";
import { CustomTable } from "../../components/Table";

const NewDiscrepancyTable = () => {
  const columnsHelper = createColumnHelper<any>();

  const NewDiscrepancyData = [
    {
      packageDetails: "Product1+Product2",
      orderDetails: "Delhivery Partner, Tracking Id",
      status: "Pending",
      appliedWeightAndPrice: "15x15x15 cm 120kg Price:1200",
      sellerPhoto: "15x15x15 cm 120kg",
      chargedWeightAndPrice: "20% discrepancy chance",
      dispute: "Weight Difference, Price Difference",
      courierPhotos: "images",
    },
    {
      packageDetails: "Product1+Product2",
      orderDetails: "Delhivery Partner, Tracking Id",
      status: "Processing",
      appliedWeightAndPrice: "15x15x15 cm 120kg Price:1200",
      sellerPhoto: "15x15x15 cm 120kg",
      chargedWeightAndPrice: "20% discrepancy chance",
      dispute: "Weight Difference, Price Difference",
      courierPhotos: "images",
    },
    {
      packageDetails: "Product1+Product2",
      orderDetails: "Delhivery Partner, Tracking Id",
      status: "Resolved",
      appliedWeightAndPrice: "15x15x15 cm 120kg Price:1200",
      sellerPhoto: "15x15x15 cm 120kg",
      chargedWeightAndPrice: "20% discrepancy chance",
      dispute: "Weight Difference, Price Difference",
      courierPhotos: "images",
    },
  ];
  const NewDiscrepancyHeading = [
    columnsHelper.accessor("packageDetails", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Package Details
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.packageDetails}
          </p>
        );
      },
    }),
    columnsHelper.accessor("orderDetails", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Order Details
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.orderDetails}
          </p>
        );
      },
    }),
    columnsHelper.accessor("status", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Status
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p
            className={`flex items-center ${
              info.row.original.status === "Pending"
                ? "text-[#F35838] bg-[#FEEEEB]  border-[#FEEEEB]"
                : info.row.original.status === "Resolved"
                ? "text-[#7CCA62] bg-[#F2FAEF] border-[#7CCA62]"
                : "text-[#F0A22E] bg-[#FDF6EA] border-[#FDF6EA]"
            } font-Open text-sm font-semibold leading-5 px-4 py-2 rounded-lg`}
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
            />
            &nbsp;
            {capitalizeFirstLetter(info.row.original.status)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("appliedWeightAndPrice", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Applied Weight And Price
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.appliedWeightAndPrice)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("sellerPhoto", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Seller Photo
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.sellerPhoto)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("chargedWeightAndPrice", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Charged Weight And Price
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.chargedWeightAndPrice)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("dispute", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Dispute
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.dispute)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("courierPhotos", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Courier Photos
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.courierPhotos)}
          </p>
        );
      },
    }),

    columnsHelper.accessor("actions", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Actions
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex justify-evenly">
            <p className="font-Open text-[#004EFF] font-semibold">ACCEPT</p>
            <p className="font-Open text-[#004EFF] text-lg font-semibold">
              ...
            </p>
            {/* <img src={LockIcon} alt="lockIcon" /> */}
          </div>
        );
      },
    }),
  ];
  return <CustomTable columns={NewDiscrepancyHeading} data={[]} />;
};

export default NewDiscrepancyTable;
