import React from "react";
import { CustomTable } from "../../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import copyIcon from "../../../assets/copy.svg";
import failureIcon from "../../../assets/failure.svg";
import EditIcon from "../../../assets/Edit.svg";
import infoIcon from "../../../assets/info.svg";
import { Tooltip } from "react-tooltip";
import { formatDate } from '../../../utils/dateUtils';


interface IOrderDataProps {
  data: any[];
  setRightModalNdr: (value: boolean) => void;
  setRightModalEdit: (value: boolean) => void;
  onNdrFollowUpClick: (attemptsReasons: any[]) => void;
  setRightModalSellerAction: (value: boolean) => void;
  onSellerActionClick: (sellerRemark: any) => void;
  setRightModalAccordian: (value: boolean) => void;
  onInfoIconClick: (awb: string) => void;
  openRightModalForTracking?: any;
  setOpenRightModalForTracking?: any;
}

const RtoData: React.FunctionComponent<IOrderDataProps> = ({
  data,
  setRightModalNdr,
  setRightModalEdit,
  onNdrFollowUpClick,
  setRightModalSellerAction,
  onSellerActionClick,
  setRightModalAccordian,
  onInfoIconClick,
  openRightModalForTracking,
  setOpenRightModalForTracking,
}) => {
  const getOrdinalSuffix = (number: any) => {
    const j = number % 10;
    const k = number % 100;
    if (j === 1 && k !== 11) {
      return "st";
    }
    if (j === 2 && k !== 12) {
      return "nd";
    }
    if (j === 3 && k !== 13) {
      return "rd";
    }
    return "th";
  };

  const columnsHelper = createColumnHelper<any>();

  const columns = [
    columnsHelper.accessor("ids", {
      header: "IDs",
      cell: (info) => {
        const awb = info?.row?.original?.awb;

        return (
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="font-sans  text-sm leading-5 text-black font-normal mr-1">
                Order:
              </span>
              <span className=" font-sans text-sm leading-5 text-black font-semibold">
                {info.row?.original?.orderId}
              </span>
              <img
                src={copyIcon}
                alt="Copy"
                className="ml-1 w-4 h-4 cursor-pointer"
              />
            </div>
            {info.row?.original?.awb && (
              <div className="flex items-center">
                <span className="font-sans  text-sm leading-5 text-black font-normal mr-1">
                  Tracking:
                </span>
                <span className="font-sans  text-sm leading-5 text-black font-semibold">
                  {info.row?.original?.awb}
                </span>
                <span
                  // className="font-sans  text-sm leading-5 text-black font-semibold"
                  className="hover:text-[#004EFF] underline-offset-4 underline  decoration-2 cursor-pointer"
                  data-tooltip-id="my-tooltip-inline"
                  data-tooltip-content="Track"
                  onClick={
                    // on going work temporary currently commented

                    () => {
                      setOpenRightModalForTracking({
                        ...openRightModalForTracking,
                        isOpen: true,
                        awbNo: awb,
                      });
                    }

                    // () => window.open(`/tracking?trackingNo=${awb}`, "_blank")
                    // navigate({
                    //   pathname: "/tracking",
                    //   search: `?trackingNo=${awb}`,
                    // })
                  }
                >
                  {info.row?.original?.awb}
                </span>
                <Tooltip
                  id="my-tooltip-inline"
                  style={{
                    backgroundColor: "bg-neutral-900",
                    color: "#FFFFFF",
                    width: "fit-content",
                    fontSize: "14px",
                    lineHeight: "16px",
                  }}
                />
                <img
                  src={copyIcon}
                  alt="Copy"
                  className="ml-1 w-4 h-4 cursor-pointer"
                />

                <img
                  src={infoIcon}
                  alt="Info"
                  className="ml-3 w-4 h-4 cursor-pointer"
                  onClick={() => {
                    onInfoIconClick(awb);
                    setRightModalAccordian(true);
                  }}
                />
              </div>
            )}
            <div className="flex items-center">
              <span className="font-sans  text-sm leading-5 text-black font-normal mr-1">
                Shipyaari:
              </span>
              <span className="font-sans  text-sm leading-5 text-black  font-semibold">
                {info.row?.original?.tempOrderId}
              </span>
              <img
                src={copyIcon}
                alt="Copy"
                className="ml-1 w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("rtoInitiated", {
      header: "RTO Initiated",
      cell: (info) => (
        <>
          <div className="font-sans font-normal text-sm leading-5 mb-4">
            {formatDate(info.row.original.shipmentStatus.rtoInitiDate)}
          </div>

          <div className="font-sans font-normal text-sm leading-5 text-black">
            Delivery Partner:{" "}
            <span className="font-semibold">
              {info.row.original.courierPartnerName}
            </span>
          </div>
        </>
      ),
    }),
    columnsHelper.accessor("payment", {
      header: "Payment",
      cell: (info) => (
        <div className="font-sans  text-sm leading-5 text-black font-semibold">
          ₹{info.row?.original?.codInfo?.invoiceValue}
          <br />
          {info.row?.original?.codInfo?.isCod ? "COD" : "Prepaid"}
        </div>
      ),
    }),
    columnsHelper.accessor("customerDetails", {
      header: "Customer Details",
      cell: (info) => (
        <div className="space-y-1">
          <div className="font-sans  text-sm leading-5 text-black font-normal">
            {info.row?.original?.deliveryAddress?.fullAddress}
          </div>
          <div className="font-sans  text-sm leading-5 text-black font-normal">
            {info.row?.original?.deliveryAddress?.contact?.mobileNo}
          </div>
          <div className="font-sans  text-sm leading-5 text-black font-normal">
            {info.row?.original?.deliveryAddress?.contact?.name}
          </div>
        </div>
      ),
    }),
    columnsHelper.accessor("currentStatus", {
      header: "Current Status",
      cell: (info) => {
        const attemptCount =
          info.row.original.shipmentStatus.attemptsReasons.length;
        const ordinalSuffix = getOrdinalSuffix(attemptCount);

        return (
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1 border border-[#F0A22E] p-1 bg-[#FDF6EA]">
              <span>
                <img
                  src={failureIcon}
                  alt="failureIcon"
                  className="ml-1 w-4 h-4 cursor-pointer"
                />
              </span>
              <span className="text-[#F0A22E] font-sans text-xs leading-5 font-normal">
                {info.row.original.currentStatus}
              </span>
            </div>

            <div className=" font-sans text-xs leading-4 text-black font-normal mt-3">
              {attemptCount}
              <sup>{ordinalSuffix}</sup> Attempt
            </div>
          </div>
        );
      },
    }),

    // columnsHelper.accessor("ids", {
    //   header: "IDs",
    //   cell: (info) => (
    //     <div className="space-y-2">
    //       <div className="flex items-center">
    //         <span className="font-sans  text-sm leading-5 text-black font-normal mr-1">
    //           Order:
    //         </span>
    //         <span className=" font-sans text-sm leading-5 text-black font-semibold">
    //           {info.row.original.order}
    //         </span>
    //         <img
    //           src={copyIcon}
    //           alt="Copy"
    //           className="ml-1 w-4 h-4 cursor-pointer"
    //         />
    //       </div>
    //       {info.row.original.tracking && (
    //         <div className="flex items-center">
    //           <span className="font-sans  text-sm leading-5 text-black font-normal mr-1">
    //             Tracking:
    //           </span>
    //           <span className="font-sans  text-sm leading-5 text-black font-semibold">
    //             {info.row.original.tracking}
    //           </span>
    //           <img
    //             src={copyIcon}
    //             alt="Copy"
    //             className="ml-1 w-4 h-4 cursor-pointer"
    //           />
    //         </div>
    //       )}
    //       <div className="flex items-center">
    //         <span className="font-sans  text-sm leading-5 text-black font-normal mr-1">
    //           Shipyaari:
    //         </span>
    //         <span className="font-sans  text-sm leading-5 text-black  font-semibold">
    //           {info.row.original.shipyaari}
    //         </span>
    //         <img
    //           src={copyIcon}
    //           alt="Copy"
    //           className="ml-1 w-4 h-4 cursor-pointer"
    //         />
    //       </div>
    //     </div>
    //   ),
    // }),
    // columnsHelper.accessor("payment", {
    //   header: "Payment",
    //   cell: (info) => (
    //     <div className="font-sans  text-sm leading-5 text-black font-semibold">
    //       {info.getValue()}
    //     </div>
    //   ),
    // }),
    // columnsHelper.accessor("customerDetails", {
    //   header: "Customer Details",
    //   cell: (info) => (
    //     <div className="space-y-1">
    //       <div className="font-sans  text-sm leading-5 text-black font-semibold">
    //         {info.getValue().name}
    //       </div>
    //       <div className="font-sans  text-sm leading-5 text-black font-normal">
    //         {info.getValue().address}
    //       </div>
    //       <div className="font-sans  text-sm leading-5 text-black font-normal">
    //         {info.getValue().contact}
    //       </div>
    //     </div>
    //   ),
    // }),
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
    // columnsHelper.accessor("currentStatus", {
    //   header: "Current Status",
    //   cell: (info) => (
    //     <div className="flex justify-center">
    //       <div className="flex items-center space-x-1 border border-[#F0A22E] p-1 bg-[#FDF6EA]">
    //         <span > <img
    //             src={failureIcon}
    //             alt="failureIcon"
    //             className="ml-1 w-4 h-4 cursor-pointer"
    //           /></span>
    //         <span className="text-[#F0A22E] font-sans  text-sm leading-5 font-normal ">
    //           {info.getValue()}
    //         </span>
    //       </div>
    //     </div>
    //   ),
    // }),
    columnsHelper.accessor("rtoReason", {
      header: "RTO Reason",
      cell: (info) => {
        const hasAttemptReasons =
          info.row.original?.shipmentStatus?.attemptsReasons?.length;
        const sellerRemarks = info.row.original?.sellerRemarkActionCount;
        const hasAttemptReasonsArr =
          info.row.original?.shipmentStatus?.attemptsReasons;
        const sellerRemarksArr = info.row.original?.sellerRemark;
        // console.log("partner",hasAttemptReasons)
        // console.log("seller remarks count ",sellerRemarks)
        const awb = info?.row?.original?.awb; 
        return (
          <div className="space-y-1">
            <div
              className="font-sans text-sm leading-5 text-[#004EFF] font-Open cursor-pointer hover:underline"
              onClick={() => {
                setRightModalNdr(true);
                onNdrFollowUpClick(hasAttemptReasonsArr);
              }}
            >
              Partner Remarks ({hasAttemptReasons || 0})
            </div>
            <div
              className="font-sans text-sm   leading-5 text-[#004EFF] font-Open cursor-pointer hover:underline"
              onClick={() => {
                setRightModalSellerAction(true);
                onSellerActionClick(awb);
              }}
            >
              Seller Remarks ({sellerRemarks || 0})
            </div>
          </div>
        );
      },
    }),
  ];

  return (
    <div className="overflow-x-auto">
      <CustomTable columns={columns} data={data} />
    </div>
  );
};

export default RtoData;
