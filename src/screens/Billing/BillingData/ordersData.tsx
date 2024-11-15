import React, { useEffect, useState } from "react";
import { CustomTable } from "../../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { capitalizeFirstLetter } from "../../../utils/utility";
import copyIcon from "../../../assets/copy.svg";
import sortIcon from "../../../assets/sort.svg";
import downloadIcon from "../../../assets/download.svg";
import exportIcon from "../../../assets/export.svg";
import infoIcon from "../../../assets/info.svg";
import resolvedImage from "../../../assets/resolved.svg";
import { POST } from "../../../utils/webService";
import { COMPANY_NAME, GET_BILLED_ORDERS } from "../../../utils/ApiUrls";

interface IOrdersDataProps {
  data: any;
}

const OrdersData: React.FunctionComponent<IOrdersDataProps> = (
  props: IOrdersDataProps
) => {
  const { data } = props;

  const columnsHelper = createColumnHelper<any>();

  const billingOrdersHeading = [
    columnsHelper.accessor("id", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <h1 className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              IDs
            </h1>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        console.log("info", info?.row?.original);
        return (
          <div>
            <div className="flex flex-col text-[12px] font-normal leading-4 font-Open">
              Order:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open mb-2 ">
                {info?.row?.original?.["order id"]}{" "}
                <img src={copyIcon} alt="" />
              </p>
            </div>
            <div className="flex flex-col text-[12px] font-normal leading-4 font-Open">
              Tracking:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open mb-2  ">
                {info?.row?.original?.["Tracking Number"]}{" "}
                <img src={copyIcon} alt="" />
              </p>
            </div>
            <div className="flex flex-col text-[12px] font-normal leading-4 font-Open">
              {COMPANY_NAME}:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open mb-2  ">
                {info?.row?.original?.[`${COMPANY_NAME} ID`]}{" "}
                <img src={copyIcon} alt="" />
              </p>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("packageDetails", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <h1 className="font-Open text-sm font-semibold leading-5 text-[#1C1C1C] self-center ">
              Package Details
            </h1>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div>
            <div className="flex flex-col text-[12px] font-normal leading-4 font-Open my-3">
              {info.row.original.products}
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open  "></p>
            </div>
            <div className="flex flex-col text-[12px] font-normal leading-4 font-Open">
              SKU:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open mb-2  ">
                {info.row.original.SKU}
              </p>
            </div>
            <div className="flex flex-col text-[12px] font-normal leading-4 font-Open">
              Courier Co.:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open mb-2  ">
                {info?.row?.original?.["Customer Name"]}
              </p>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("partnerWeight", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Product Weight/ Product Cost
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div>
            <div className="flex flex-col text-[12px] font-normal leading-4 font-Open">
              Product Dimensions:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open  ">
                {info?.row?.original?.["Product Dimensions"]}
              </p>
              Volumetric Weight:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open  ">
                {info?.row?.original?.["Dimension Weight"]}
              </p>
              Dead Weight:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open  ">
                {info?.row?.original?.["Dead Weight"]}
              </p>
              Billable Weight:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open  ">
                {info?.row?.original?.["Billable Weight"]}
              </p>
            </div>
            <div className="flex flex-col text-[12px] font-normal leading-4 font-Open">
              Price:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open mb-2  ">
                ₹{info?.row?.original?.["Total Invoice Value"]}
              </p>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("status", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Status
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex gap-x-2 justify-center items-center border border-[#7CCA62] rounded-md max-w-[150px] py-2 bg-[#F2FAEF]">
            <img src={resolvedImage} alt="" className="h-4 w-4" />
            <p className=" flex items-center text-[#7CCA62] font-Open text-sm font-semibold leading-5 ">
              Delivered
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("courierAmount", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Courier Amount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex flex-col gap-7">
            <p className="text-[12px] font-semibold leading-4 font-Open flex">
              FWD:{" "}
              <span className="text-[12px] font-normal leading-4 font-Open flex gap-x-2">
                ₹{info?.row?.original?.["Applied Forward Amount"]}{" "}
                {/* <img className="cursor-pointer" src={infoIcon} alt="" />{" "} */}
              </span>
            </p>
            <p className="text-[12px] font-semibold leading-4 font-Open flex">
              RTO:{" "}
              <span className="text-[12px] font-normal leading-4 font-Open flex gap-x-2">
                ₹{info?.row?.original?.["Applied Rto Amount"]}{" "}
                {/* <img className="cursor-pointer" src={infoIcon} alt="" />{" "} */}
              </span>
            </p>
            <p className="text-[12px] font-semibold leading-4 font-Open flex">
              Applied Total Amount:{" "}
              <span className="text-[12px] font-normal leading-4 font-Open flex gap-x-2">
                ₹{info?.row?.original?.["Applied Total Amount"]}{" "}
                {/* <img className="cursor-pointer" src={infoIcon} alt="" />{" "} */}
              </span>
            </p>
            <p className="text-[12px] font-semibold leading-4 font-Open flex">
              GST:{" "}
              <span className="text-[12px] font-normal leading-4 font-Open flex gap-x-2">
                ₹{info?.row?.original?.["GST Total"]}{" "}
                {/* <img className="cursor-pointer" src={infoIcon} alt="" />{" "} */}
              </span>
            </p>
            <p className="text-[12px] font-semibold leading-4 font-Open flex">
              Total Shipped Value:{" "}
              <span className="text-[12px] font-normal leading-4 font-Open flex gap-x-2">
                ₹{info?.row?.original?.["Total Shipping Bill value"]}{" "}
                {/* <img className="cursor-pointer" src={infoIcon} alt="" />{" "} */}
              </span>
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("vasAmount", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              VAS Amount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex flex-col gap-7">
            <p className="text-[12px] font-semibold leading-4 font-Open flex">
              WA:{" "}
              <span className="text-[12px] font-normal leading-4 font-Open flex gap-x-2">
                ₹{info.row.original.wa}{" "}
                {/* <img className="cursor-pointer" src={infoIcon} alt="" />{" "} */}
              </span>
            </p>
            <p className="text-[12px] font-semibold leading-4 font-Open flex">
              SMS:{" "}
              <span className="text-[12px] font-normal leading-4 font-Open flex gap-x-2">
                ₹{info.row.original.sms}{" "}
                {/* <img className="cursor-pointer" src={infoIcon} alt="" />{" "} */}
              </span>
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("updatedAmount", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Updated Amount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex flex-col gap-7">
            <p className="text-[12px] font-semibold leading-4 font-Open flex">
              Excess Forward amount :{" "}
              <span className="text-[12px] font-normal leading-4 font-Open flex gap-x-2">
                ₹{info?.row?.original?.["Excess Forward amount"]}{" "}
              </span>
            </p>
            <p className="text-[12px] font-semibold leading-4 font-Open flex">
              Excess RTO amount:{" "}
              <span className="text-[12px] font-normal leading-4 font-Open flex gap-x-2">
                ₹{info?.row?.original?.["Excess RTO amount"]}{" "}
              </span>
            </p>
            <p className="text-[12px] font-semibold leading-4 font-Open flex">
              Excess Total amount:{" "}
              <span className="text-[12px] font-normal leading-4 font-Open flex gap-x-2">
                ₹{info?.row?.original?.["Excess Total Amount"]}{" "}
              </span>
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("actions", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Actions
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex gap-x-5 mt-[-60px]">
            <img className="cursor-pointer" src={downloadIcon} alt="" />
            <img className="cursor-pointer" src={exportIcon} alt="" />
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

export default OrdersData;
