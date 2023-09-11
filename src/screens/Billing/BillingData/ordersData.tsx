import React, { useState } from "react";
import { CustomTable } from "../../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { capitalizeFirstLetter } from "../../../utils/utility";
import copyIcon from "../../../assets/copy.svg";
import sortIcon from "../../../assets/sort.svg";
import downloadIcon from "../../../assets/download.svg";
import exportIcon from "../../../assets/export.svg";
import infoIcon from "../../../assets/info.svg";

interface IOrdersDataProps {}

const OrdersData: React.FunctionComponent<IOrdersDataProps> = (props) => {
  const columnsHelper = createColumnHelper<any>();
  const [data, setData] = useState([
    {
      order: "GYSM23698789",
      tracking: "GYSH23678119",
      shipyaari: "SY23678119",
      products: "product 1 + product 2",
      sku: "GYSH2364",
      courierCo: "Xpress Bees",
      dimensions: "15 x 15 x 15",
      weight: "1",
      price: "1000",
      fwd: "200",
      rto: "50",
      wa: "20",
      sms: "5",
    },
    {
      order: "GYSM23698789",
      tracking: "GYSH23678119",
      shipyaari: "SY23678119",
      products: "product 1 + product 2",
      sku: "GYSH2364",
      courierCo: "Xpress Bees",
      dimensions: "15 x 15 x 15",
      weight: "1",
      price: "1000",
      fwd: "200",
      rto: "50",
      wa: "20",
      sms: "5",
    },
    {
      order: "GYSM23698789",
      tracking: "GYSH23678119",
      shipyaari: "SY23678119",
      products: "product 1 + product 2",
      sku: "GYSH2364",
      courierCo: "Xpress Bees",
      dimensions: "15 x 15 x 15",
      weight: "1",
      price: "1000",
      fwd: "200",
      rto: "50",
      wa: "20",
      sms: "5",
    },
  ]);
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
        return (
          <div>
            <div className="flex flex-col text-[12px] font-normal leading-4 font-Open">
              Order:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open mb-2 ">
                {info.row.original.order} <img src={copyIcon} alt="" />
              </p>
            </div>
            <div className="flex flex-col text-[12px] font-normal leading-4 font-Open">
              Tracking:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open mb-2  ">
                {info.row.original.tracking} <img src={copyIcon} alt="" />
              </p>
            </div>
            <div className="flex flex-col text-[12px] font-normal leading-4 font-Open">
              Shipyaari:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open mb-2  ">
                {info.row.original.shipyaari} <img src={copyIcon} alt="" />
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
                {info.row.original.sku}
              </p>
            </div>
            <div className="flex flex-col text-[12px] font-normal leading-4 font-Open">
              Courier Co.:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open mb-2  ">
                {info.row.original.courierCo}
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
              Volumetric Weight:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open  ">
                {info.row.original.dimensions}cm
              </p>
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open  mb-2">
                {info.row.original.weight}Kg
              </p>
            </div>
            <div className="flex flex-col text-[12px] font-normal leading-4 font-Open">
              Price:
              <p className="flex gap-x-1 text-sm font-semibold leading-5 font-Open mb-2  ">
                ₹{info.row.original.price}
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
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 "></p>
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
                ₹{info.row.original.fwd}{" "}
                <img className="cursor-pointer" src={infoIcon} alt="" />{" "}
              </span>
            </p>
            <p className="text-[12px] font-semibold leading-4 font-Open flex">
              RTO:{" "}
              <span className="text-[12px] font-normal leading-4 font-Open flex gap-x-2">
                ₹{info.row.original.rto}{" "}
                <img className="cursor-pointer" src={infoIcon} alt="" />{" "}
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
                <img className="cursor-pointer" src={infoIcon} alt="" />{" "}
              </span>
            </p>
            <p className="text-[12px] font-semibold leading-4 font-Open flex">
              SMS:{" "}
              <span className="text-[12px] font-normal leading-4 font-Open flex gap-x-2">
                ₹{info.row.original.sms}{" "}
                <img className="cursor-pointer" src={infoIcon} alt="" />{" "}
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
