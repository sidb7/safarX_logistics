import React, { useEffect, useState } from "react";
import crossIcon from "../../../assets/cross.svg";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../../../components/Table";
import PaginationComponent from "../../../components/Pagination";

function CodRemittedAwbModal({
  onClick,
  awbs,
  isRecovery,
}: {
  onClick: any;
  awbs: string[];
  isRecovery: any;
}) {
  console.log("onClickawbModal", onClick);
  const columnsHelper = createColumnHelper<any>();
  const [totalItemCount, setTotalItemCount] = useState(awbs.length);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const tableData = awbs?.map((trackingId, index) => ({
      trackingId,
    }));
    setData(tableData);
  }, []);

  console.log("tableDataAWBmodal", data);

  const billingOrdersHeading = [
    // columnsHelper.accessor("shipyaariId", {
    //   header: () => {
    //     return (
    //       <div className="flex justify-between ">
    //         <h1 className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
    //           Shipyaari Id
    //         </h1>
    //       </div>
    //     );
    //   },
    //   cell: (info: any) => {
    //     return (
    //       <div className="py-4">
    //         <p className="font-Open text-sm font-normal leading-5">
    //           {info.row.original?.tempOrderId}
    //         </p>
    //       </div>
    //     );
    //   },
    // }),
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
        console.log("info>>awbModal", info.row.original);
        return (
          <div>
            <p className="font-Open text-sm font-normal leading-5">
              {info.row.original?.trackingId || "No Tracking ID"}
            </p>
          </div>
        );
      },
    }),
    // columnsHelper.accessor("Status", {
    //   header: () => {
    //     return (
    //       <div className="flex justify-between">
    //         <h1 className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
    //           Status
    //         </h1>
    //       </div>
    //     );
    //   },

    //   cell: (info: any) => {
    //     return (
    //       <div className="">
    //         <p className="font-Open text-sm font-normal leading-5">
    //           {info.row.original?.Status}
    //         </p>
    //       </div>
    //     );
    //   },
    // }),
    // columnsHelper.accessor("invoiceValue", {
    //   header: () => {
    //     return (
    //       <div className="flex justify-between ">
    //         <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
    //           Invoice Value
    //         </p>
    //         <img className="cursor-pointer" alt="" />
    //       </div>
    //     );
    //   },

    //   cell: (info: any) => {
    //     return (
    //       <div className="">
    //         <p>₹ {info.row?.original?.invoiceValue}</p>
    //       </div>
    //     );
    //   },
    // }),
  ];

  return (
    <div className="">
      <div className="flex items-center w-[100%] justify-between p-5">
        <div className="flex items-center gap-x-3">
          <p className="font-semibold text-2xl">
            {isRecovery ? "Cod Recovery AWBs" : "Cod Remitted AWBs"}
          </p>
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
            <CustomTable
              rowData={data || []}
              columnsData={billingOrdersHeading}
            />
          </div>
        </div>

        {/* {totalItemCount > 0 && (
          <PaginationComponent
            totalItems={totalItemCount}
            itemsPerPageOptions={[
              10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000,
            ]}
            onPageChange={onPageIndexChange}
            onItemsPerPageChange={onPerPageItemChange}
          />
        )} */}
      </div>
    </div>
  );
}

export default CodRemittedAwbModal;
