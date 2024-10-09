import React from "react";
import { CustomTable } from "../../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import copyIcon from "../../../assets/copy.svg";
import failureIcon from "../../../assets/failure.svg";
import EditIcon from "../../../assets/Edit.svg";
import Checkbox from "../../../components/CheckBox";
import OneButton from "../../../components/Button/OneButton";
import infoIcon from "../../../assets/info.svg";
import { Tooltip } from "react-tooltip";
import CopyTooltip from "../../../components/CopyToClipboard";
import { formatDate } from '../../../utils/dateUtils';


interface IOrderDataProps {
  data: any[];
  setRightModalNdr: (value: boolean) => void;
  setRightModalEdit: (value: boolean) => void;
  setRightModalAccordian: (value: boolean) => void;

  setRightModalSellerAction: (value: boolean) => void;
  selectedPackages: Record<string, boolean>;
  onSelectAllPackages: (checked: boolean) => void;
  onSelectPackage: (packageDetails: string, checked: boolean) => void;
  setSelectedRowIds: any;
  selectedRowIds: any;
  onNdrFollowUpClick: (attemptsReasons: any[]) => void;
  onSellerActionClick: (sellerRemark: any) => void;
  onActionModalClick: (actionModalRemark: any[]) => void;
  onInfoIconClick: (awb: string) => void;
  openRightModalForTracking?: any;
  setOpenRightModalForTracking?: any;
}

const OrderData: React.FunctionComponent<IOrderDataProps> = ({
  data,
  setRightModalNdr,
  setRightModalEdit,
  setRightModalSellerAction,
  setRightModalAccordian,
  selectedPackages,
  onSelectAllPackages,
  onSelectPackage,
  selectedRowIds,
  setSelectedRowIds,
  onNdrFollowUpClick,
  onSellerActionClick,
  onActionModalClick,
  onInfoIconClick,

  openRightModalForTracking,
  setOpenRightModalForTracking,
}) => {
  const columnsHelper = createColumnHelper<any>();

  const columns = [
    // columnsHelper.accessor("packageDetails", {
    //   header: () => {
    //     const allSelected = data.length > 0 && data.every(item => selectedPackages[item.packageDetails]);
    //     const someSelected = data.some(item => selectedPackages[item.packageDetails]) && !allSelected;
    //     return (
    //       <div className="flex items-center">
    //         <input
    //           type="checkbox"
    //           checked={allSelected}
    //           ref={input => {
    //             if (input) {
    //               input.indeterminate = someSelected;
    //             }
    //           }}
    //           onChange={(e) => onSelectAllPackages(e.target.checked)}
    //           className="mr-3"
    //         />
    //         <div className="font-sans font-semibold text-sm leading-5">
    //           Package Details
    //         </div>
    //       </div>
    //     );
    //   },
    //   cell: (info) => (
    //     <div className="flex items-start">
    //       <input
    //         type="checkbox"
    //         className="mt-1 mr-3 "
    //         checked={selectedPackages[info.getValue()]}
    //         onChange={(e) => onSelectPackage(info.getValue(), e.target.checked)}
    //         onClick={(e) => e.stopPropagation()} // Prevent row selection when clicking the checkbox
    //       />
    //       <div>
    //         <div className="font-sans font-normal text-sm leading-5">
    //           {info.getValue()}
    //         </div>
    //         <div className="font-sans font-normal text-sm leading-5 text-black">
    //           Dimension:{" "}
    //           <span className="font-semibold">
    //             {info.row.original.dimension}
    //           </span>{" "}
    //         </div>
    //         <div className="font-sans font-normal text-sm leading-5 text-black">
    //           SKU:{" "}
    //           <span className="font-semibold">{info.row.original.sku}</span>
    //         </div>
    //       </div>
    //     </div>
    //   ),
    // }),
    columnsHelper.accessor("ids", {
      header: "IDs",
      cell: (info) => {
        const awb = info?.row?.original?.awb || "";
        return (
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="font-sans  text-sm leading-5 text-black font-normal mr-1">
                Order:
              </span>
              <span className=" font-sans text-sm leading-5 text-black font-semibold">
                {info.row?.original?.orderId}
              </span>
              {/* <img
                src={copyIcon}
                alt="Copy"
                className="ml-1 w-4 h-4 cursor-pointer"
              /> */}
            </div>
            {info.row?.original?.awb && (
              <div className="flex items-center">
                <span className="font-sans  text-sm leading-5 text-black font-normal mr-1">
                  Tracking:
                </span>
                <span className="font-sans  text-sm leading-5 text-black font-semibold">
                  {/* {info.row?.original?.awb} */}
                </span>
                <span
                  // className="font-sans  text-sm leading-5 text-black font-semibold"
                  className="hover:text-[#004EFF] underline-offset-4 underline  decoration-2 cursor-pointer font-sans  text-sm leading-5 text-black font-semibold"
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
                {/* <CopyTooltip stringToBeCopied={awb} /> */}
                {/* <img
                  src={copyIcon}
                  alt="Copy"
                  className="ml-1 w-4 h-4 cursor-pointer"
                /> */}

                <img
                  src={infoIcon}
                  alt="Info"
                  className="ml-3 w-4 h-4 cursor-pointer"
                  onClick={() =>{ onInfoIconClick(awb);  setRightModalAccordian(true)}}
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
              {/* <img
                src={copyIcon}
                alt="Copy"
                className="ml-1 w-4 h-4 cursor-pointer"
              /> */}
            </div>
          </div>
        );
      },
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
    columnsHelper.accessor("partner", {
      header: "Partner",
      cell: (info) => (
        <>
         

          <div className="font-sans font-normal text-sm leading-5 text-black">
            Delivery Partner:{" "}
            <span className="font-semibold">
              {info.row?.original?.courierPartnerName || "N/A"}
            </span>
          </div>
        </>
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
    columnsHelper.accessor("pickupDate", {
      header: "Pickup/NDR Date",
      cell: (info) => {
        const sellerRemarks = info?.row?.original?.sellerRemark;
        const lastRemarkTime =
          sellerRemarks && sellerRemarks?.length > 0
            ? sellerRemarks?.[sellerRemarks?.length - 1].time
            : null;

        const pickupDate = info?.row?.original?.shipmentStatus?.attemptsReasons  ;
        const pickUpDateTime = pickupDate && pickupDate?.length > 0
        ? pickupDate?.[pickupDate?.length - 1].time
        : null;

        // const formatDate = (dateInput: any) => {
        //   if (!dateInput) return "";

        //   if (typeof dateInput === "string") return dateInput;

        //   if (typeof dateInput === "number") {
        //     const date = new Date(dateInput);
        //     const day = date.getDate().toString().padStart(2, "0");
        //     const month = date.toLocaleString("default", { month: "short" });
        //     const year = date.getFullYear();
        //     return `${day} ${month} ${year}`;
        //   }

        //   return "";
        // };

        return (
          <div className="font-sans text-sm leading-5 text-black font-normal space-y-1">
            <div>
              P: {formatDate(info.row?.original?.shipmentStatus?.pickUpDate)}
            </div>
            <div>N: {formatDate(pickUpDateTime)}</div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("followUp", {
      header: "Follow-up",
      cell: (info) => {
        const hasAttemptReasons =
          info?.row?.original?.shipmentStatus?.attemptsReasons?.length;
        const sellerRemarks = info.row?.original?.sellerRemark?.length;
        const hasAttemptReasonsArr =
          info?.row?.original?.shipmentStatus?.attemptsReasons;
        const sellerRemarksArr = info?.row?.original?.sellerRemark;
        const awb = info?.row?.original?.awb;
        // console.log("awb_from_sellerremarks",awb)

        return (
          <>
            <button
              className={`bg-white text-[#004EFF] border border-[#004EFF] m-1 px-2 py-1 rounded text-sm font-normal ${
                hasAttemptReasons > 0
                  ? "hover:bg-blue-50"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => {
                setRightModalNdr(true);
                onNdrFollowUpClick(hasAttemptReasonsArr);
              }}
            >
              NDR Follow up
            </button>

            <button
              className={`bg-white text-[#004EFF] border border-[#004EFF] m-1 px-2 py-1 rounded text-sm font-normal hover:bg-blue-50 `}
              onClick={() => {
                setRightModalSellerAction(true);
                onSellerActionClick(awb);
              }}
            >
              Seller action
            </button>
          </>
        );
      },
    }),
    columnsHelper.accessor("currentStatus", {
      header: "Current Status",
      cell: (info) => (
        <div className="flex justify-center">
          <div className="flex items-center space-x-1 border border-[#F0A22E] p-1 bg-[#FDF6EA]">
            <span>
              {" "}
              <img
                src={failureIcon}
                alt="failureIcon"
                className="ml-1 w-4 h-4 cursor-pointer"
              />
            </span>
            <span className="text-[#F0A22E] font-sans  text-sm leading-5 font-normal ">
              {info?.row?.original?.currentStatus}
            </span>
          </div>
        </div>
      ),
    }),
    columnsHelper.accessor("actions", {
      header: "Actions",

      cell: (info) => {
        const dataForAction = info?.row?.original?.awb;
        // console.log("awb",dataForAction)
        return (
          <div className="">
            {/* <button className="">
              <img
                src={EditIcon}
                alt="EditIcon"
                className="ml-1 w-4 h-4 cursor-pointer"
                onClick={() => {
                  setRightModalEdit(true);
                  onActionModalClick(dataForAction);
                }}
              />
            </button> */}

            <button
              className={`bg-white text-[#004EFF] border border-[#004EFF] m-1 px-2 py-1 rounded text-sm font-normal hover:bg-blue-50 `}
              onClick={() => {
                setRightModalEdit(true);
                onActionModalClick(dataForAction);
              }}
            >
            RTO/Re-Attempt
            </button>
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

export default OrderData;
