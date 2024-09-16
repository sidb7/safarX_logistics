import React from "react";
import { CustomTable } from "../../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import copyIcon from "../../../assets/copy.svg";
import failureIcon from "../../../assets/failure.svg"
import EditIcon from "../../../assets/Edit.svg"

interface IOrderDataProps {
  data: any[];
  setRightModalNdr: (value: boolean) => void;
  setRightModalEdit: (value: boolean) => void;
}

const RtoData: React.FunctionComponent<IOrderDataProps> = ({ data,setRightModalNdr,setRightModalEdit }) => {
  const columnsHelper = createColumnHelper<any>();

  const columns = [
    columnsHelper.accessor("packageDetails", {
      header: () => {
        return (
          <div className="font-sans font-semibold text-sm leading-5">
            Package Details
          </div>
        );
      },
      cell: (info) => (
        <div className="flex items-start">
          <input type="checkbox" className="mt-1 mr-3 " />
          <div>
            <div className="font-sans font-normal text-sm leading-5">
              {info.getValue()}
            </div>
            <div className="font-sans font-normal text-sm leading-5 text-black">
              Dimension:{" "}
              <span className="font-semibold">
                {info.row.original.dimension}
              </span>{" "}
            </div>
            <div className="font-sans font-normal text-sm leading-5 text-black">
              SKU:{" "}
              <span className="font-semibold">{info.row.original.sku}</span>
            </div>
          </div>
        </div>
      ),
    }),
    columnsHelper.accessor("rtoInitiated", {
        header: "RTO Initiated",
        cell: (info) => (
            <>
            <div className="font-sans font-normal text-sm leading-5 mb-4">
              {info.row.original.rtoDate}
            </div>
            
            <div className="font-sans font-normal text-sm leading-5 text-black">
        Delivery Partner:{" "}
            <span className="font-semibold">{info.row.original.deliveryPartner}</span>
          </div>
          </>
        ),
      }),
    columnsHelper.accessor("ids", {
      header: "IDs",
      cell: (info) => (
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="font-sans  text-sm leading-5 text-black font-normal mr-1">
              Order:
            </span>
            <span className=" font-sans text-sm leading-5 text-black font-semibold">
              {info.row.original.order}
            </span>
            <img
              src={copyIcon}
              alt="Copy"
              className="ml-1 w-4 h-4 cursor-pointer"
            />
          </div>
          {info.row.original.tracking && (
            <div className="flex items-center">
              <span className="font-sans  text-sm leading-5 text-black font-normal mr-1">
                Tracking:
              </span>
              <span className="font-sans  text-sm leading-5 text-black font-semibold">
                {info.row.original.tracking}
              </span>
              <img
                src={copyIcon}
                alt="Copy"
                className="ml-1 w-4 h-4 cursor-pointer"
              />
            </div>
          )}
          <div className="flex items-center">
            <span className="font-sans  text-sm leading-5 text-black font-normal mr-1">
              Shipyaari:
            </span>
            <span className="font-sans  text-sm leading-5 text-black  font-semibold">
              {info.row.original.shipyaari}
            </span>
            <img
              src={copyIcon}
              alt="Copy"
              className="ml-1 w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      ),
    }),
    columnsHelper.accessor("payment", {
      header: "Payment",
      cell: (info) => (
        <div className="font-sans  text-sm leading-5 text-black font-semibold">
          {info.getValue()}
        </div>
      ),
    }),
    columnsHelper.accessor("customerDetails", {
      header: "Customer Details",
      cell: (info) => (
        <div className="space-y-1">
          <div className="font-sans  text-sm leading-5 text-black font-semibold">
            {info.getValue().name}
          </div>
          <div className="font-sans  text-sm leading-5 text-black font-normal">
            {info.getValue().address}
          </div>
          <div className="font-sans  text-sm leading-5 text-black font-normal">
            {info.getValue().contact}
          </div>
        </div>
      ),
    }),
    // columnsHelper.accessor("pickupDate", {
    //   header: "Pickup/NDR Date",
    //   cell: (info) => (
    //     <div className="font-sans  text-sm leading-5 text-black font-normal space-y-1">
    //       <div>{info.getValue()}</div>
    //       <div>{info.row.original.ndrDate}</div>
    //     </div>
    //   ),
    // }),
    // columnsHelper.accessor("followUp", {
    //   header: "Follow-up",
    //   cell: (info) => (
    //     <div className="space-x-2">
    //       {info.getValue()?.map((action: string, index: number) => (
    //         <button
    //           key={index}
    //           className="bg-white text-[#004EFF] border border-[#004EFF] m-1  px-2 py-1 rounded text-sm font-normal"
    //           onClick={() => setRightModalNdr(true)}
    //         >
    //           {action}
    //         </button>
    //       ))}
    //     </div>
    //   ),
    // }),
    columnsHelper.accessor("currentStatus", {
      header: "Current Status",
      cell: (info) => (
        <div className="flex justify-center">
          <div className="flex items-center space-x-1 border border-[#F0A22E] p-1 bg-[#FDF6EA]">
            <span > <img
                src={failureIcon}
                alt="failureIcon"
                className="ml-1 w-4 h-4 cursor-pointer"
              /></span>
            <span className="text-[#F0A22E] font-sans  text-sm leading-5 font-normal ">
              {info.getValue()}
            </span>
          </div>
        </div>
      ),
    }),
    columnsHelper.accessor("rtoReason", {
        header: "RTO Reason",
        cell: (info) => (
          <div className="space-y-1">
            <div className="font-sans text-sm leading-5 text-black font-normal">
              {info.row.original.clientRemark}
            </div>
            <div className="font-sans text-sm leading-5 text-black font-normal">
              {info.row.original.courierRemark}
            </div>
          </div>
        ),
      }),
  ];

  return (
    <div className="overflow-x-auto">
      <CustomTable columns={columns} data={data} />
    </div>
  );
};

export default RtoData;
