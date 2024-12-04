import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../../../components/Table";
import orangeTruck from "../../../assets/orangeTruck.svg";

type Props = {
  cancelRequestData?: any;
};

const CancellationRequestTable = (props: Props) => {
  const { cancelRequestData } = props;
  const columnsHelper = createColumnHelper<any>();

  const columns = [
    columnsHelper.accessor("trackingNo", {
      header: () => <div className="text-left">Tracking No</div>,
      cell: (info) => {
        const trackingNo = info?.row?.original?.trackingNo;

        return (
          <div className="font-sans text-sm leading-5 text-black">
            <span>{trackingNo}</span>
          </div>
        );
      },
    }),
    columnsHelper.accessor("edd", {
      header: () => <div className="text-left">EDD</div>,
      cell: (info) => {
        const edd = info?.row?.original?.edd;
        return (
          <div className="font-sans  text-sm leading-5 text-black font-semibold">
            <p>{edd}</p>
            <p className="text-[#7CCA62] text-[14px] font-Open mt-1">
              {"24-Oct-2024"}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("currentStatus", {
      header: () => <div className="text-left">Current Status</div>,
      cell: (info) => {
        const currentStatus = info?.row?.original?.currentStatus;
        return (
          <div className="flex justify-center gap-x-2 items-center border border-[#F0A22E] bg-[#FDF6EA] text-[#F0A22E]">
            <img src={orangeTruck} alt="Truck" />
            {currentStatus}
          </div>
        );
      },
    }),
    columnsHelper.accessor("custRequest", {
      header: () => <div className="text-left">Cust Request D&T</div>,
      cell: (info) => {
        const custRequest = info?.row?.original?.custRequest;
        return <div className="flex flex-col items-center">{custRequest}</div>;
      },
    }),

    columnsHelper.accessor("sellerAction", {
      header: () => <div className="text-left">Admin Action D&T </div>,
      cell: (info) => {
        const sellerAction = info?.row?.original?.sellerAction;
        return <div className="space-y-1">{sellerAction}</div>;
      },
    }),
    columnsHelper.accessor("requestType", {
      header: () => <div className="text-left">Request Type</div>,
      cell: (info) => {
        const requestType = info?.row?.original?.requestType;
        return <div className="flex flex-col">{requestType}</div>;
      },
    }),
    columnsHelper.accessor("custContactDetail", {
      header: () => <div className="text-left">Cust Contact Details</div>,
      cell: (info) => {
        const custContactDetail = info?.row?.original?.custContactDetail;
        return (
          <div className="space-y-2">
            <div className="flex flex-col mt-1 items-center">
              <p className="text-[14px]">{"E" + " : " + custContactDetail}</p>
              <p className="text-[#7CCA62] text-[14px]">
                {"A" + " : " + custContactDetail}
              </p>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("remark", {
      header: () => <div className="text-left">Remark</div>,
      cell: (info) => {
        const remark = info?.row?.original?.remark;
        return (
          <div className="flex flex-col items-center my-1">
            <p>{remark}</p>
          </div>
        );
      },
    }),
  ];

  return (
    <div>
      <CustomTable columns={columns} data={cancelRequestData} />
    </div>
  );
};

export default CancellationRequestTable;
