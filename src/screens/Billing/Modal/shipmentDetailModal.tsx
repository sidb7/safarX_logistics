import React, { useState } from "react";
import crossIcon from "../../../assets/cross.svg";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../../../components/Table";
import PaginationComponent from "../../../components/Pagination";
import { COMPANY_NAME } from "../../../utils/ApiUrls";

function ShipmentDetailModal({ onClick }: any) {
  const columnsHelper = createColumnHelper<any>();
  const [totalItemCount, setTotalItemCount] = useState(10);
  const [data, setData] = useState([
    {
      tempOrderId: "SYCO09876543",
      trackingId: "GYSH1234543219",
      Status: "RTO Delivered",
      invoiceValue: 790,
    },
    {
      tempOrderId: "SYCO09876543",
      trackingId: "GYSH1234543219",
      Status: "RTO Delivered",
      invoiceValue: 590,
    },
  ]);
  const billingOrdersHeading = [
    columnsHelper.accessor("shipyaariId", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <h1 className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              {COMPANY_NAME} Id
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="py-4">
            <p className="font-Open text-sm font-normal leading-5">
              {info.row.original?.tempOrderId}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("trackingId", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <h1 className="font-Open text-sm font-semibold leading-5 text-[#1C1C1C] self-center ">
              Tracking ID
            </h1>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div>
            <p className="font-Open text-sm font-normal leading-5">
              {info.row.original?.trackingId}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("Status", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1 className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Status
            </h1>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="">
            <p className="font-Open text-sm font-normal leading-5">
              {info.row.original?.Status}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("invoiceValue", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Invoice Value
            </p>
            <img className="cursor-pointer" alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="">
            <p>₹ {info.row?.original?.invoiceValue}</p>
          </div>
        );
      },
    }),
  ];

  //on page change index
  const onPageIndexChange = () => {};

  // on per page item change
  const onPerPageItemChange = () => {};

  return (
    <div className="">
      <div className="flex items-center w-[100%] justify-between p-5">
        <div className="flex items-center gap-x-3">
          <p className="font-normal text-2xl">Shipment Details</p>
        </div>
        <div className="">
          <img
            src={crossIcon}
            alt=""
            onClick={onClick}
            className="cursor-pointer w-[24px]"
          />
        </div>
      </div>
      <div>
        <div>
          {/* {isLoading ? (
            <div className="h-[450px] flex justify-center items-center">
              <Spinner />
            </div>
          ) : ( */}
          <div className="overflow-x-auto mt-5 mx-6">
            <CustomTable data={data || []} columns={billingOrdersHeading} />
          </div>
        </div>

        {totalItemCount > 0 && (
          <PaginationComponent
            totalItems={totalItemCount}
            itemsPerPageOptions={[10, 20, 30, 50]}
            onPageChange={onPageIndexChange}
            onItemsPerPageChange={onPerPageItemChange}
          />
        )}
      </div>
    </div>
  );
}

export default ShipmentDetailModal;
