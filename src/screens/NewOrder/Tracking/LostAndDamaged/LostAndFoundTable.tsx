// import React from 'react';
// import { CustomTable } from "../../../../components/Table";
// import { createColumnHelper } from "@tanstack/react-table";

// interface LostAndFoundTableProps {
//   orders: any[];
// }

// const LostAndFoundTable: React.FC<LostAndFoundTableProps> = ({ orders }) => {

//   const safeOrders = orders || [];

//   const columnsHelper = createColumnHelper<any>();

//   const columns = [
//     columnsHelper.accessor("requestId", {
//       header: "Request ID",
//       cell: (info) => (
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             className="mr-2"
//           />
//           <span>{info.getValue()}</span>
//         </div>
//       ),
//     }),
//     columnsHelper.accessor("tracking", {
//       header: "Tracking Details",
//       cell: (info) => (
//         <div className="space-y-1">
//           <div>AWB No: {info.row.original.awb}</div>
//           <div>EDD: {info.row.original.edd}</div>
//         </div>
//       ),
//     }),
//     columnsHelper.accessor("packageDetails", {
//       header: "Package Details & Partner",
//       cell: (info) => (
//         <div className="space-y-2">
//           <div>{info.row.original.productName}</div>
//           <div>Dimension: {info.row.original.dimension}</div>
//           <div>Courier Partner: {info.row.original.courierPartner}</div>
//         </div>
//       ),
//     }),
//     columnsHelper.accessor("invValue", {
//       header: "Inv Value, Wt & Insurance",
//       cell: (info) => (
//         <div className="space-y-1">
//           <div>₹{info.row.original.invoiceValue}</div>
//           <div>{info.row.original.weight}Kg</div>
//           <div>{info.row.original.insurance ? "Yes" : "No"}</div>
//         </div>
//       ),
//     }),
//     columnsHelper.accessor("bookedDate", {
//       header: "Booked Date & Last Status",
//       cell: (info) => (
//         <div className="space-y-2">
//           <div>{info.row.original.bookedDate}</div>
//           <div className="px-3 py-1 bg-orange-100 text-orange-600 rounded-md inline-block">
//             {info.row.original.lastStatus}
//           </div>
//         </div>
//       ),
//     }),
//     columnsHelper.accessor("requestSource", {
//       header: "Request Source",
//       cell: (info) => (
//         <div className="space-y-2">
//           <div>
//             Image ({info.row.original.imageCount})
//             <a href={info.row.original.imageUrl} className="text-blue-600 ml-1">View</a>
//           </div>
//           <div>
//             Video {info.row.original.videoUrl ? (
//               <a href={info.row.original.videoUrl} className="text-blue-600 ml-1">View</a>
//             ) : "NA"}
//           </div>
//         </div>
//       ),
//     }),
//     columnsHelper.accessor("currentStatus", {
//       header: "Current Tag & Remark",
//       cell: (info) => (
//         <div className="space-y-2">
//           <div>
//             Seller: <span className="text-red-500">Lost/Damaged</span>
//           </div>
//           <div>Admin: {info.row.original.adminStatus}</div>
//         </div>
//       ),
//     }),
//     columnsHelper.accessor("action", {
//       header: "Action",
//       cell: (info) => (
//         <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md">
//           Claim
//         </button>
//       ),
//     }),
//   ];

//   console.log("Safe Orders",safeOrders)

//   return (
//     <div className="overflow-x-auto">
//       <CustomTable columnsData={columns} rowData={safeOrders} />
//     </div>
//   );
// };

// export default LostAndFoundTable;

import React, { useState } from "react";
import { CustomTable } from "../../../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import Checkbox from "../../../../components/CheckBox";
import {
  TrackingStatusLabel,
  StatusType,
} from "../../../../components/TrackingStatusLabel/TrackingStatusLabel";

import OneButton from "../../../../components/Button/OneButton";

interface LostAndFoundTableProps {
  orders: any[];
}

const LostAndFoundTable: React.FC<LostAndFoundTableProps> = ({ orders }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const safeOrders = orders || [];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(safeOrders.map((item) => item._id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const columnsHelper = createColumnHelper<any>();

  const columns = [
    columnsHelper.accessor("clientInfo", {
      header: () => (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={selectedRows?.length === safeOrders?.length}
            onChange={handleSelectAll}
            className="h-5 w-5"
          />
          <span>Client Info</span>
        </div>
      ),
      cell: (info) => {
        const clientData = info?.row?.original;
        return (
          <div className="flex flex-col">
            <div className="flex items-center space-x-3 mt-3 mb-2">
              <Checkbox
                checked={selectedRows?.includes(clientData._id)}
                onChange={() => handleSelectRow(clientData._id)}
                className="h-5 w-5"
              />
              <span className="font-Open text-sm font-semibold leading-5">
                {clientData?.sellerId}
              </span>
            </div>
            <div className="ml-8 mb-3">
              <span className="font-Open text-xs font-normal leading-4 block">
                Name
              </span>
              <span className="font-Open text-sm font-semibold leading-5 block">
                {clientData?.sellerInfo?.firstName}{" "}
                {clientData?.sellerInfo?.lastName}
              </span>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("trackingDetails", {
      header: "Tracking Details",
      cell: (info) => {
        const data = info?.row?.original;
        const eddDate = data?.shipmentStatus?.EDD;
        const formattedDate = eddDate
          ? new Date(eddDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          : "N/A";
        return (
          <div>
            <div className="mb-4">
              <p className="font-Open text-xs font-normal leading-4 block mt-3">
                AWB No:
              </p>
              <h2 className="font-Open text-sm font-semibold leading-5 block">
                {data?.awb}
              </h2>
            </div>
            <div className="mb-4">
              <p className="font-Open text-xs font-normal leading-4 block">
                Order ID:
              </p>
              <h2 className="font-Open text-sm font-semibold leading-5 block">
                {data?.orderId}
              </h2>
            </div>
            <div>
              <p className="font-Open text-xs font-normal leading-4 block">
                EDD:
              </p>
              <p className="font-Open text-sm font-semibold leading-5 block mb-3">
                {/* {data?.shipmentStatus?.EDD || "N/A"} */}
                {formattedDate}
              </p>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("packageDetails", {
      header: "Package Details & Partner",
      cell: (info) => {
        const data = info?.row?.original;
        const partnerInfo = data?.orderInfo?.boxInfo?.[0]?.products?.[0];
        return (
          <div>
            <div className="mb-4">
            <h2 className="font-Open text-xs font-normal leading-4 block">
                {partnerInfo?.name || "N/A"}
              </h2>
            </div>
          
            <div className="mb-4">
              <p className="font-Open text-xs font-normal leading-4 block">
                Dimension
              </p>
              <p className="font-Open text-sm font-semibold leading-5 block mb-3">
                {partnerInfo
                  ? `${partnerInfo?.length} x ${partnerInfo?.breadth} x ${partnerInfo?.height}`
                  : "N/A"}
              </p>
            </div>
            <div className="">
              <p className="font-Open text-xs font-normal leading-4 block mt-3">
                Partner
              </p>
              <h2 className="font-Open text-sm font-semibold leading-5 block">
                {data.courierPartnerName || "N/A"}
              </h2>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("invValue", {
      header: "Inv Value, Wt & Insurance",
      cell: (info) => {
        const data = info?.row?.original;
        const codInfo = data?.codInfo;
        const service = data?.service;
        const value = codInfo?.isCod
          ? codInfo?.collectableAmount
          : codInfo?.invoiceValue;
        const weight = service?.appliedWeight;
        const hasInsurance = service?.insurance > 0;

        return (
          <div>
            <div className="mb-4">
              <p className="font-Open text-xs font-normal leading-4 block mt-3">
                Value
              </p>
              <h2 className="font-Open text-sm font-semibold leading-5 block">
                ₹{value || "N/A"}
              </h2>
            </div>
            <div className="mb-4">
              <p className="font-Open text-xs font-normal leading-4 block">
                Weight
              </p>
              <p className="font-Open text-sm font-semibold leading-5 block">
                {weight || "N/A"} kg
              </p>
            </div>
            <div>
              <p className="font-Open text-xs font-normal leading-4 block">
                Insurance
              </p>
              <p className="font-Open text-sm font-semibold leading-5 block mb-3">
                {hasInsurance ? "Yes" : "No"}
              </p>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("bookingDate", {
      header: "Booked Date & Last Status",
      cell: (info) => {
        const data = info?.row?.original;
        const createdAt = data?.createdAt;
        const status = data?.currentStatus as StatusType;

        const formattedDate = createdAt
          ? new Date(createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "N/A";

        return (
          <div className="mt-3">
            <span className="font-Open text-sm font-semibold leading-5">
              {formattedDate}
            </span>
            <div className="mt-2">
              <TrackingStatusLabel status={status || "NULL"} />
              {/* {status} */}
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("requestSource", {
      header: "Request Source",
      cell: (info) => {
        const data = info.row.original;
        return (
          <div className="mt-3">
            <div className="space-y-2">
              <p className="font-Open text-sm font-semibold">
                {data?.ldStatusHistory?.[0]?.reason}
              </p>
              {data?.imageUrl && (
                <div>
                  <a href={data.imageUrl} className="text-blue-600">
                    View Images
                  </a>
                </div>
              )}
              {data?.videoUrl && (
                <div>
                  <a href={data.videoUrl} className="text-blue-600">
                    View Video
                  </a>
                </div>
              )}
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("currentTag", {
      header: "Current Tag & Remark",
      cell: (info) => {
        const data = info?.row?.original;
        return (
          <div>
            <div className="mt-3">
              <span className="font-Open text-xs font-normal leading-4">
                System:{" "}
                <span className="font-Open text-sm font-semibold leading-5 text-[#F35838]">
                  {data?.ldStatus}
                </span>
              </span>
            </div>
            <div className="mt-2 mb-4">
              <span className="font-Open text-xs font-normal leading-4">
                Remark:{" "}
                <div className="font-Open text-sm font-semibold leading-5">
                  {data?.remark || "N/A"}
                </div>
              </span>
            </div>
            <OneButton
              text="Claim"
              variant="primary"
              onClick={() => {
                /* Add claim handling */
              }}
            />
          </div>
        );
      },
    }),
  ];

  return (
    <div className="overflow-x-auto">
      <CustomTable columnsData={columns} rowData={safeOrders} />
    </div>
  );
};

export default LostAndFoundTable;
