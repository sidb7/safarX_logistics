import { createColumnHelper } from "@tanstack/react-table";
import CopyTooltip from "../../components/CopyToClipboard";
import Copy from "../../assets/copy.svg";
import { LiaPenSolid } from "react-icons/lia";
import {
  date_DD_MMM_YYYY_HH_MM,
  date_DD_MMM_YYYY_HH_MM_SS,
} from "../../utils/dateFormater";
import ShowLabel from "./ShowLabel";

import trackingIcon from "../../assets/trackingMenu.svg";
import frameIcon from "../../assets/frame.svg";
import CrossIcon from "../../assets/cross.svg";
import DeleteIconForLg from "../../assets/DeleteIconRedColor.svg";
import InformativeIcon from "../../assets/I icon.svg";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import {
  capitalizeFirstLetter,
  capitalizeFirstLetterWithExclude,
} from "../../utils/utility";
import editIcon from "../../assets/serv/edit.svg";
import ShreIcon from "../../assets/ShareIcon.svg";
import ReverseIcon from "../../assets/reverseIcon.png";
import {
  COMPANY_NAME,
  SELLER_WEB_URL,
  UPDATE_ORDER_CONFIRMATION_STATUS,
} from "../../utils/ApiUrls";
import { Key, useEffect, useRef, useState } from "react";
import { Tooltip as CustomToolTip } from "../../components/Tooltip/Tooltip";
import moreIcon from "../../assets/more.svg";
import tickcircle from "../../assets/Order/tickcircle.svg";
import { update } from "lodash";
import toast from "react-hot-toast";
import { POST } from "../../utils/webService";

const ColumnsHelper = createColumnHelper<any>();
const excludeWords = ["B2B", "B2C"];

const PartialChecked = ({ checked, onChange, intermediate }: any) => {
  const ref: any = useRef(null);
  useEffect(() => {
    if (typeof intermediate === "boolean") {
      ref.current.indeterminate = intermediate;
    }
  }, [ref, intermediate]);
  return (
    <input
      type="checkbox"
      className="mr-3 !w-[16px] cursor-pointer"
      ref={ref}
      checked={checked}
      onChange={onChange}
    />
  );
};

const moreDropDown = (currentStatus?: any, orderActions?: any, data?: any) => {
  let payLoad: any;
  let fileUrl: any;

  if (currentStatus === "DRAFT") {
    const { orderId, tempOrderId, sellerId } = data;
    payLoad = {
      tempOrderIdArray: [tempOrderId],
    };
  } else if (
    currentStatus === "BOOKED" ||
    "CANCELLED" ||
    "PICKED UP" ||
    "IN TRANSIT" ||
    "OUT OF DELIVERY" ||
    "DELIVERED" ||
    "RETURN"
  ) {
    const labelUrl = data?.boxInfo?.[0]?.tracking?.label;
    const taxInvoiceUrl = data?.boxInfo?.[0]?.tracking?.taxInvoice;

    fileUrl = labelUrl || "";
    payLoad = {
      awbs: [data?.awb],
      fileUrl: labelUrl,
      taxInvoiceUrl: taxInvoiceUrl,
    };
  }

  const actionsObject: any = {
    DRAFT: [
      //commneted as it is not needed at this time
      // { title: "Edit Order", actionType: "edit" },
      { title: "Delete Order", actionType: "delete", icon: CrossIcon },
      { title: "Duplicate Order", actionType: "duplicate_order", icon: Copy },
    ],
    BOOKED: [
      {
        title: "Download Label",
        actionType: "download_label",
        icon: frameIcon,
      },
      {
        title: "Download Invoice",
        actionType: "download_invoice",
        icon: frameIcon,
      },
      { title: "Track Order", actionType: "track_order", icon: trackingIcon },
      { title: "Cancel Order", actionType: "cancel_order", icon: CrossIcon },
      { title: "Duplicate Order", actionType: "duplicate_order", icon: Copy },
    ],
    CANCELLED: [
      { title: "Track Order", actionType: "track_order", icon: trackingIcon },
      { title: "Duplicate Order", actionType: "duplicate_order", icon: Copy },
    ],
    "READY TO PICK": [
      {
        title: "Download Label",
        actionType: "download_label",
        icon: frameIcon,
      },
      {
        title: "Download Invoice",
        actionType: "download_invoice",
        icon: frameIcon,
      },
      { title: "Track Order", actionType: "track_order", icon: trackingIcon },
      { title: "Duplicate Order", actionType: "duplicate_order", icon: Copy },
    ],
    "IN TRANSIT": [
      // { title: "Download Label", actionType: "download_label" },
      {
        title: "Download Invoice",
        actionType: "download_invoice",
        icon: frameIcon,
      },
      { title: "Track Order", actionType: "track_order", icon: trackingIcon },
      { title: "Duplicate Order", actionType: "duplicate_order", icon: Copy },
    ],
    EXCEPTION: [
      // { title: "Download Label", actionType: "download_label" },
      {
        title: "Download Invoice",
        actionType: "download_invoice",
        icon: frameIcon,
      },
      {
        title: "Track Order",
        actionType: "track_order",
        icon: trackingIcon,
      },
      { title: "Duplicate Order", actionType: "duplicate_order", icon: Copy },
    ],
    "OUT OF DELIVERY": [
      // { title: "Download Label", actionType: "download_label" },
      {
        title: "Download Invoice",
        actionType: "download_invoice",
        icon: frameIcon,
      },
      { title: "Track Order", actionType: "track_order", icon: trackingIcon },
      { title: "Duplicate Order", actionType: "duplicate_order", icon: Copy },
    ],
    DELIVERED: [
      // { title: "Download Label", actionType: "download_label" },
      {
        title: "Download Invoice",
        actionType: "download_invoice",
        icon: frameIcon,
      },
      { title: "Track Order", actionType: "track_order", icon: trackingIcon },
      { title: "Duplicate Order", actionType: "duplicate_order", icon: Copy },
    ],
    RETURN: [
      // { title: "Download Label", actionType: "download_label" },
      {
        title: "Download Invoice",
        actionType: "download_invoice",
        icon: frameIcon,
      },
      { title: "Track Order", actionType: "track_order", icon: trackingIcon },
      { title: "Duplicate Order", actionType: "duplicate_order", icon: Copy },
    ],
  };

  const actionClickHandler = (
    payLoad?: any,
    actionType?: any,
    currentStatus?: any,
    data?: any
  ) => {
    if (actionType === "track_order") {
      window.open(
        `${SELLER_WEB_URL}/tracking?trackingNo=${data?.awb}`,
        "_blank"
      );
    } else {
      orderActions(payLoad, actionType, currentStatus, data);
    }
  };

  return (
    <div className=" min-w-[150px] rounded-md border">
      {actionsObject[currentStatus]?.map((action: any, index: any) => (
        <>
          {action?.actionType === "download_label" ? (
            <div
              className="hover:bg-[#E5E7EB] flex justify-start items-center px-3 py-2"
              onClick={() =>
                actionClickHandler(
                  payLoad,
                  action.actionType,
                  currentStatus,
                  data
                )
              }
            >
              <div className="w-[20px]">
                <img src={action.icon} alt="" />
              </div>

              <div className="ml-1" key={`${index}_${action}`}>
                {fileUrl !== "" ? action?.title : "Download Label"}
              </div>
            </div>
          ) : (
            <div
              className="flex hover:bg-[#E5E7EB] justify-start items-center py-2 px-3"
              onClick={() =>
                actionClickHandler(
                  payLoad,
                  action.actionType,
                  currentStatus,
                  data
                )
              }
            >
              <div className=" w-[20px]">
                <img src={action.icon} alt="" />
              </div>
              <div className="ml-1" key={`${index}_${action}`}>
                {action?.title}
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

const ProductBox = ({ name = "", dimension = "" }: any) => {
  return (
    <div className="flex flex-col gap-y-0 whitespace-nowrap text-[14px] text-[#1C1C1C] font-normal">
      <span>{name}</span>
      <div>
        <span>Dimention: </span>
        <span className="font-semibold">
          {`${dimension?.length}x${dimension.breadth}x${dimension.height}`} cm
        </span>
      </div>
      <div>
        <span>SKU: </span>
        <span className="font-semibold">GT87YU1</span>
      </div>
    </div>
  );
};
const MainCommonHelper = (navigate: any = "") => {
  return [
    ColumnsHelper.accessor("Pickup Adreess", {
      header: () => {
        return (
          <div className="flex justify-between font-Open font-semibold leading-5 text-sm">
            <h1>Pickup Address</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="font-Open font-normal leading-5 text-sm py-3">
            {capitalizeFirstLetter(
              info?.row?.original?.pickupAddress?.fullAddress
            ) ? (
              <>
                <div className=" font-Open font-normal leading-5 text-sm">
                  {capitalizeFirstLetter(
                    info?.row?.original?.pickupAddress?.contact?.name
                  )}
                </div>
                <span>
                  {capitalizeFirstLetter(
                    info?.row?.original?.pickupAddress?.fullAddress
                  )}
                </span>
                <div className="font-Open font-normal leading-5 text-sm">
                  {info?.row?.original?.pickupAddress?.contact?.mobileNo}
                </div>
                <div className="font-Open font-normal leading-5 text-sm">
                  Pincode : <b>{info?.row?.original?.pickupAddress?.pincode}</b>
                </div>
              </>
            ) : (
              <div
                // onClick={() => navigate("/orders/add-order/delivery")}
                className="decoration-2 text-[black]"
              >
                No Pickup Address Found
              </div>
            )}
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("Delivery Adreess", {
      header: () => {
        return (
          <div className="flex justify-between font-Open font-semibold leading-5 text-sm">
            <h1>Delivery Address</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="font-Open font-normal leading-5 text-sm py-3">
            {info?.row?.original?.routes &&
            info?.row?.original?.routes?.length >= 1 ? (
              <>
                <div className="font-Open font-normal leading-5 text-sm">
                  {capitalizeFirstLetter(
                    info?.row?.original?.routes?.[0]?.contact?.name
                  )}
                </div>
                <span>
                  {capitalizeFirstLetter(
                    info?.row?.original?.routes?.[0]?.fullAddress
                  )}
                </span>

                <div className="font-Open font-normal leading-5 text-sm">
                  {info?.row?.original?.routes?.[0]?.contact?.mobileNo}
                </div>
                <div className="font-Open font-normal leading-5 text-sm">
                  Pincode :{" "}
                  <b>
                    {info?.row?.original?.routes?.[0]?.pickupAddress?.pincode}
                  </b>
                </div>
              </>
            ) : info?.row?.original?.deliveryAddress?.fullAddress ? (
              <>
                <div className="font-Open font-normal leading-5 text-sm">
                  {capitalizeFirstLetter(
                    info?.row?.original?.deliveryAddress?.contact?.name
                  )}
                </div>
                <span>
                  {capitalizeFirstLetter(
                    info?.row?.original?.deliveryAddress?.fullAddress
                  )}
                </span>
                <div className="font-Open font-normal leading-5 text-sm">
                  {info?.row?.original?.deliveryAddress?.contact?.emailId}
                </div>

                <div className="font-Open font-normal leading-5 text-sm">
                  {info?.row?.original?.deliveryAddress?.contact?.mobileNo}
                </div>
                <div className="font-Open font-normal leading-5 text-sm">
                  Pincode :{" "}
                  <b>{info?.row?.original?.deliveryAddress?.pincode}</b>
                </div>
              </>
            ) : (
              <div
                // onClick={() => navigate("/orders/add-order/delivery")}
                className="decoration-2 text-[black]"
              >
                No Delivery Address Found
              </div>
            )}
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("Payment", {
      header: () => {
        return (
          <div className="flex justify-between font-Open font-semibold leading-5 text-sm">
            <h1>Payment Mode</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { service, codInfo } = info?.row?.original;
        return (
          <>
            <div className="flex flex-col gap-y-1 font-Open font-normal leading-5 text-sm py-3">
              <p>
                <span>Invoice Value : </span>₹{" "}
                {Math.round(codInfo?.invoiceValue)?.toLocaleString("en-IN")}
              </p>
              {codInfo?.isCod && (
                <p>
                  <span>COD Amount : </span>₹{" "}
                  {Math.round(codInfo?.collectableAmount)?.toLocaleString(
                    "en-IN"
                  )}{" "}
                </p>
              )}

              <span>
                {codInfo
                  ? codInfo?.isCod
                    ? "Payment Type : COD"
                    : "Payment Type : Prepaid"
                  : "-"}
              </span>
            </div>
          </>
        );
      },
    }),
  ];
};
const commonColumnHelper = [
  ColumnsHelper.accessor("packageType", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>Package Details</h1>
        </div>
      );
    },
    cell: (info: any) => {
      const { service } = info?.row?.original;
      return (
        <div className=" ">
          <div className="py-2 flex flex-col">
            <span className="text-sm font-light">Delivery Partner</span>
            <div className="font-semibold">{service?.partnerName}</div>
          </div>
        </div>
      );
    },
  }),
];

const idHelper = (
  navigate: any = "",
  setInfoModalContent?: any,
  setInfoModalContentFunction: any = () => {},
  setOpenRightModalForTracking?: any,
  openRightModalForTracking?: any,
  buyerConfirmationStatus?: any,
  setBuyerConfirmationStatus?: any
) => [
  ColumnsHelper.accessor("IDs", {
    header: () => {
      return (
        <div className="flex justify-between font-Open font-semibold leading-5 text-sm ">
          <h1>IDs</h1>
        </div>
      );
    },
    cell: (info: any) => {
      const {
        tempOrderId,
        status = [],
        updatedAt,
        createdAt,
        orderType,
        orderId,
        source,
        otherDetails,
        awb,
      } = info?.row?.original;
      // const AWB = otherDetails?.awbNo;

      // const statusOnlyForBooked = status?.find(
      //   (item: any) => item?.currentStatus === "BOOKED"
      // );

      // const timeStamp = statusOnlyForBooked?.timeStamp;
      const time = createdAt && date_DD_MMM_YYYY_HH_MM_SS(createdAt);

      return (
        <div className="py-3 w-[200px]">
          {tempOrderId && (
            <div className="">
              <span className="font-Open font-normal leading-4 text-xs">
                {COMPANY_NAME || "Shipyaari"} ID :
              </span>
              <div className="flex  items-center font-Open font-semibold leading-5 text-sm">
                <span
                  className=""
                  data-tooltip-id="my-tooltip-inline"
                  data-tooltip-content="Complete Order"
                >
                  {tempOrderId}
                </span>

                <CopyTooltip stringToBeCopied={tempOrderId} />
              </div>
            </div>
          )}
          {/* {orderId && (
            <div className="">
              <span className=" font-Open font-normal leading-4 text-xs ">
                Order ID :
              </span>
              <div className=" flex items-center font-Open font-semibold leading-5 text-sm">
                <span className="">
                  {source === "SHOPIFY" ||
                  source === "ZOHO" ||
                  source === "WOOCOMMERCE"
                    ? otherDetails?.orderNumber
                      ? `${otherDetails?.orderNumber}`
                      : orderId
                    : orderId}
                </span>
                <CopyTooltip
                  stringToBeCopied={
                    source === "SHOPIFY" ||
                    source === "ZOHO" ||
                    source === "WOOCOMMERCE"
                      ? otherDetails?.orderNumber
                        ? `${otherDetails?.orderNumber}`
                        : orderId
                      : orderId
                  }
                />
              </div>
            </div>
          )} */}
          {time && (
            <div className="">
              <span className=" text-sm font-light">Booked Time :</span>
              <div className=" flex text-base items-center font-medium">
                {time}
              </div>
            </div>
          )}

          <div className="flex items-center mt-[0.5rem]">
            <span className="font-Open font-normal leading-4 text-xs">
              Source :
            </span>
            <div className=" pl-2 items-center font-Open font-semibold leading-5 text-sm">
              <span className="">
                {capitalizeFirstLetterWithExclude(source, excludeWords)}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <span className=" font-Open font-normal leading-4 text-xs">
              Order Type :
            </span>
            <div className=" pl-2 flex  items-center font-Open font-semibold leading-5 text-sm">
              <span className="">{orderType}</span>
            </div>
          </div>
        </div>
      );
    },
  }),
  //STATUS
  ColumnsHelper.accessor("Status", {
    header: () => {
      return (
        <div className="flex justify-between font-Open font-semibold leading-5 text-sm">
          <h1>Status</h1>
        </div>
      );
    },
    cell: (info: any) => {
      const { status, awb, source, otherDetails, isBuyerConfirmed } =
        info?.row?.original;
      const rowsData = info?.row?.original;
      // console.log("rowsData", rowsData);
      // const timeStamp = status?.[0]?.timeStamp;
      const timeStamp =
        rowsData?.status?.[rowsData?.status?.length - 1]?.timeStamp;
      const time = timeStamp && date_DD_MMM_YYYY_HH_MM_SS(timeStamp);
      // const renderStatus = status?.[0]?.currentStatus || "Draft";
      let renderStatus = rowsData?.currentStatus || "";
      const rows: any = [
        {
          title: "Pickup Address",
          FlatNo: rowsData?.pickupAddress?.flatNo,
          LandkMark: capitalizeFirstLetter(rowsData?.pickupAddress?.landmark),
          Locality: capitalizeFirstLetter(rowsData?.pickupAddress?.locality),
          City: capitalizeFirstLetter(rowsData?.pickupAddress?.city),
          State: capitalizeFirstLetter(rowsData?.pickupAddress?.state),
          Pincode: rowsData?.pickupAddress?.pincode,
          Country: capitalizeFirstLetter(rowsData?.pickupAddress?.country),
          "Address Type": capitalizeFirstLetter(
            rowsData?.pickupAddress?.addressType
          ),
          Name: capitalizeFirstLetter(rowsData?.pickupAddress?.contact?.name),
          MobileNo: rowsData?.pickupAddress?.contact?.mobileNo,

          "Email Id": capitalizeFirstLetter(
            rowsData?.pickupAddress?.contact?.emailId
          ),
          Type: capitalizeFirstLetter(rowsData?.pickupAddress?.contact?.type),
        },
        {
          title: rowsData?.deliveryAddress?.flatNo && "Delivery Address",
          FlatNo: rowsData?.deliveryAddress?.flatNo,
          Landmark: capitalizeFirstLetter(rowsData?.deliveryAddress?.landmark),
          Locality: capitalizeFirstLetter(rowsData?.deliveryAddress?.locality),
          City: capitalizeFirstLetter(rowsData?.deliveryAddress?.city),
          State: capitalizeFirstLetter(rowsData?.deliveryAddress?.state),
          Pincode: rowsData?.deliveryAddress?.pincode,
          Country: capitalizeFirstLetter(rowsData?.deliveryAddress?.country),
          "Address Type": rowsData?.deliveryAddress?.addressType,
          Name: capitalizeFirstLetter(rowsData?.deliveryAddress?.contact?.name),
          MobileNo: rowsData?.deliveryAddress?.contact?.mobileNo,

          "Email Id": capitalizeFirstLetter(
            rowsData?.deliveryAddress?.contact?.emailId
          ),
          Type: capitalizeFirstLetter(rowsData?.deliveryAddress?.contact?.type),
        },
        {
          title:
            rowsData?.boxInfo?.[0]?.service?.companyServiceId && "Services",
          "Partner Name": capitalizeFirstLetter(
            rowsData?.boxInfo?.[0]?.service?.partnerName
          ),
          "AVN Service": capitalizeFirstLetter(
            rowsData?.boxInfo?.[0]?.service?.companyServiceName
          ),
          "Service Mode": capitalizeFirstLetter(
            rowsData?.boxInfo?.[0]?.service?.serviceMode
          ),
          "Applied Weight": `${rowsData?.boxInfo?.[0]?.service?.appliedWeight} Kg`,
          "Freight Charges": `₹ ${Math.round(
            rowsData?.boxInfo?.[0]?.service?.add +
              rowsData?.boxInfo?.[0]?.service?.base
          )?.toLocaleString("en-IN")}`,
          "COD Charges": `₹ ${Math.round(
            rowsData?.boxInfo?.[0]?.service?.cod
          )?.toLocaleString("en-IN")}`,
          Insurance: `₹ ${Math.round(
            rowsData?.boxInfo?.[0]?.service?.insurance
          )?.toLocaleString("en-IN")}`,
          "Other Charges": `₹ ${Math.round(
            rowsData?.boxInfo?.[0]?.service?.variables
          )?.toLocaleString("en-IN")}`,
          Tax: `₹ ${Math.round(
            rowsData?.boxInfo?.[0]?.service?.tax
          )?.toLocaleString("en-IN")}`,
          Total: `₹ ${Math.round(
            rowsData?.boxInfo?.[0]?.service?.total
          )?.toLocaleString("en-IN")}`,
        },
      ];
      let boxObj: any = { title: "" };
      rowsData?.boxInfo?.map((item: any, index: any) => {
        let title = `Box Info ${
          rowsData?.boxInfo?.length > 1 ? `${index + 1}` : ""
        }`;
        let qty = 0;
        item?.products?.map((elem: any, num: any) => {
          boxObj = {
            ...boxObj,
            [`Name ${num + 1}`]: elem?.name,
            [`QTY ${num + 1}`]: elem?.qty,
            [`Dead Weight ${num + 1}`]: `${elem?.deadWeight} Kg`,
            [`Applied Weight ${num + 1}`]: `${elem?.appliedWeight} Kg`,
            [`Dimensions ${
              num + 1
            }`]: `${elem?.length} x ${elem?.breadth} x ${elem?.height}`,
            [`Price ${num + 1}`]: `₹ ${Math.round(
              elem?.unitPrice
            )?.toLocaleString("en-IN")}`,
            [`Tax ${num + 1}`]: `₹ ${Math.round(elem?.unitTax)?.toLocaleString(
              "en-IN"
            )}`,

            [`SKU ${num + 1}`]: elem?.sku,
          };
          qty += elem?.qty;
        });
        title += ` Product(s) x ${qty}`;
        boxObj.title = title;
        rows.push(boxObj);
      });

      let statusObj: any = { title: "" };
      rowsData?.status?.map((elem: any, index: any) => {
        statusObj = {
          ...statusObj,
          [`AWB No ${index + 1}`]: awb,
          [`Current Status ${index + 1}`]: capitalizeFirstLetter(
            elem?.currentStatus
          ),
          // [`Description ${index + 1}`]: capitalizeFirstLetter(
          //   elem?.description
          // ),
          [`Description ${index + 1}`]: elem?.description,
          [`LogId ${index + 1}`]: elem.logId,
          [`Notes ${index + 1}`]: elem.notes,
          [`Time ${index + 1}`]: date_DD_MMM_YYYY_HH_MM_SS(elem.timeStamp),
        };
        statusObj.title = "Status";
      });
      rows.push(statusObj);

      rows.push({
        title: "Other Details",
        [`${COMPANY_NAME} ID`]: rowsData?.tempOrderId,
        "Order Id": rowsData?.orderId,
        "Tracking Id": awb,
        Source: capitalizeFirstLetter(rowsData?.source),
        "Order Type": rowsData?.orderType,
        Zone: capitalizeFirstLetter(rowsData?.zone),
      });

      const handleInformativeModal = () => {
        setInfoModalContentFunction({
          awb,
          orderId:
            (source === "SHOPIFY" || source === "ZOHO") &&
            otherDetails?.orderNumber
              ? otherDetails?.orderNumber
              : rowsData.orderId
              ? rowsData.orderId
              : `T${rowsData.tempOrderId}`,
        });
        // setInfoModalContent({
        //   isOpen: true,
        //   data: rows,
        //   orderId:
        //     (source === "SHOPIFY" || source === "ZOHO") &&
        //     otherDetails?.orderNumber
        //       ? otherDetails?.orderNumber
        //       : rowsData.orderId
        //       ? rowsData.orderId
        //       : `T${rowsData.tempOrderId}`,
        // });
      };
      const buyerConfirmation = rowsData?.isBuyerConfirmed;
      const { tags } = info?.row?.original?.otherDetails || [];
      const tagsString = tags?.join(", ");
      const tagsLength = tagsString?.length;

      const showAllTags = tagsLength > 0;
      // const buyerConfirmation = rowsData?.isBuyerConfirmed;
      const buyerConfirmationStatus = [
        {
          value: "PENDING",
          class: "bg-[#FDF6EA] text-[#F0A22E] border-[#F0A22E] border",
        },
        {
          value: "BUYER VERIFIED",
          class: "bg-[#F2FAEF] text-[#7CCA62] border-[#7CCA62] border",
        },
        {
          value: "BUYER CANCELLED",
          class: "bg-[#FEEEEB] text-[#F35838] border-[#F35838] border",
        },
      ];
      const updateBuyerConfirmation = async (buyerConfirmationStatus: any) => {
        const payload = {
          orderId: rowsData?.orderId,
          currentOrderStatus: renderStatus,
          isBuyerConfirmed: buyerConfirmationStatus,
        };
        const response = await POST(UPDATE_ORDER_CONFIRMATION_STATUS, payload);
        console.log("response", response);
        if (response?.data?.success) {
          toast.success("Order confirmation status updated successfully");
          setBuyerConfirmationStatus(
            rowsData?.orderId + buyerConfirmationStatus
          );
          // console.log(rowsData?.orderId + buyerConfirmationStatus, "STRING");
          // console.log("updateBuyerConfirmation", payload);
        } else {
          toast.error(response?.data?.message);
        }
      };
      return (
        <div className="py-3 w-[200px]">
          {
            <>
              <div className="flex flex-col gap-y-1">
                <div className="flex text-base items-center font-medium">
                  <div
                    className="flex gap-x-1 items-center cursor-pointer underline hover:text-[#004EFF] transition duration-300"
                    onClick={handleInformativeModal}
                  >
                    <div>
                      <p className="font-Open font-semibold leading-5 text-sm ">
                        {capitalizeFirstLetter(renderStatus)}
                      </p>
                    </div>
                    {setInfoModalContent && (
                      <div
                        className="cursor-pointer  text-[#004EFF] hover:text-blue-700 transition duration-300"
                        onClick={handleInformativeModal}
                      >
                        <img
                          src={InformativeIcon}
                          alt="Info Icon"
                          width="18px"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="font-Open font-normal leading-5 text-sm ">
                  {time}
                </div>

                {showAllTags && (
                  <div className="flex ">
                    <div className="flex  w-fit px-1 text-xs py-0 m-0 text-center bg-white  items-center text-[#004EFF] border-[#004EFF] border rounded-md line-clamp-2">
                      {capitalizeFirstLetter(tags[0])}
                    </div>
                    {/* <img src={InformativeIcon} alt="Info Icon" width="18px" /> */}
                    {tags.length > 1 && (
                      <CustomToolTip
                        position="bottom"
                        content={
                          <div className="absolute flex gap-1 flex-wrap left-0 line-clamp-3 top-full mt-1 w-[150px] p-2 bg-white text-xs  shadow-md rounded-md">
                            {tags.map(
                              (tag: string, index: Key | null | undefined) => (
                                <p className="bg-white text-[#004EFF] rounded-md px-2 border-[#004EFF] border shadow-inner-sm">
                                  {" "}
                                  {capitalizeFirstLetter(tag)}{" "}
                                </p>
                              )
                            )}
                          </div>
                        }
                        showOnHover={true}
                        bgColor="bg-white"
                        textColor="black"
                        left={-26}
                        top={-8}
                      >
                        <img
                          src={moreIcon}
                          alt="editIcon"
                          className="hover:-translate-y-[0.1rem] hover:scale-110 duration-100 cursor-pointer mx-2"
                        />
                      </CustomToolTip>
                    )}
                  </div>
                )}
              </div>

              {buyerConfirmation && (
                <div className="py-1 flex items-center">
                  {buyerConfirmationStatus.map((e) => {
                    return (
                      e.value === buyerConfirmation && (
                        <p
                          className={`px-2 py-1 w-fit  text-xs font-medium text-center rounded-md ${e.class}`}
                        >
                          {e.value}
                        </p>
                      )
                    );
                  })}

                  <CustomToolTip
                    position="bottom"
                    content={
                      <div className="p-0.5 rounded-md bg-white shadow-md">
                        {buyerConfirmationStatus.map((e) => {
                          return (
                            e.value !== buyerConfirmation && (
                              <p
                                key={e.value}
                                className={`px-2 py-1 w-fit m-2 text-xs text-center rounded-md cursor-pointer hover:scale-105 ${e.class}`}
                                onClick={() => updateBuyerConfirmation(e.value)}
                              >
                                {e.value}
                              </p>
                            )
                          );
                        })}
                      </div>
                    }
                    showOnHover={true}
                    bgColor="bg-white"
                    textColor="black"
                    left={-26}
                  >
                    <img
                      src={editIcon}
                      alt="editIcon"
                      className="hover:-translate-y-[0.1rem] hover:scale-110 duration-100 cursor-pointer mx-2"
                    />
                  </CustomToolTip>
                </div>
              )}
            </>

            // <div className="flex flex-col gap-y-1">
            //   <div className="flex">
            //     {/* <img src={forwardShareIcon} alt="" /> <img src={downloadIcon} alt="" /> */}
            //     <div className="flex justify-between items-center">
            //       <div className="flex gap-x-2 items-center border border-[#F0A22E] py-2 px-4 bg-[#FDF6EA]">
            //         <img src={tickcircle} alt="box" className="h-4 w-4" />
            //         <p className="font-Open font-semibold leading-5 text-sm  ">
            //           {capitalizeFirstLetter(renderStatus)}
            //         </p>
            //         {setInfoModalContent && (
            //           <div
            //             className="cursor-pointer text-[#004EFF] hover:text-blue-700 transition duration-300"
            //             onClick={handleInformativeModal}
            //           >
            //             <img
            //               src={InformativeIcon}
            //               alt="Info Icon"
            //               width="28px"
            //             />
            //           </div>
            //         )}
            //       </div>
            //     </div>
            //   </div>
            //   <div>{time}</div>
            // </div>
          }
        </div>
      );
    },
  }),
];

// table for draft/pending order
export const columnHelperForPendingOrder = [];

export const columnHelperForNewOrder = (
  navigate: any,
  setDeleteModalDraftOrder: any,
  setInfoModalContent?: any,
  currentStatus?: any,
  orderActions?: any,
  setInfoModalContentFunction?: any,
  buyerConfirmationStatus?: any,
  setBuyerConfirmationStatus?: any
) => {
  // const handleDeleteModalDraftOrder = (payload: any) => {
  //   setDeleteModalDraftOrder({ isOpen: true, payload });
  // };

  return [
    ColumnsHelper.accessor("IDs", {
      header: (props: any) => {
        return (
          <div
            className="flex items-center font-Open font-semibold leading-5 text-sm"
            id="selectAll"
          >
            <PartialChecked
              checked={props.table?.getIsAllRowsSelected()}
              onChange={props?.table?.getToggleAllRowsSelectedHandler()}
              intermediate={props?.table?.getIsSomeRowsSelected()}
            />
            <h1>IDs</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const {
          tempOrderId,
          orderId,
          status,
          source,
          updatedAt,
          orderType,
          otherDetails,
          awb,
          createdAt,
          isBuyerConfirmed,
        } = info?.row?.original;
        // const AWB = otherDetails?.awbNo
        let updatedAtStatus = 0;

        // console.log("Get Created AT: ", date_DD_MMM_YYYY_HH_MM_SS(createdAt));

        if (status?.length > 0) {
          updatedAtStatus = status[status.length - 1]?.timeStamp;
        }

        return (
          <div className="flex py-3 w-[200px]">
            <div className="flex justify-center mr-3 !my-[-10px] cursor-pointer">
              <input
                type="checkbox"
                checked={info?.row?.getIsSelected()}
                onChange={info?.row?.getToggleSelectedHandler()}
                className="!w-[16px]"
              />
            </div>
            <div>
              {tempOrderId && (
                <div className="">
                  <span className="text-xs font-normal mr-1 leading-4 font-Open">
                    {COMPANY_NAME} ID :
                  </span>
                  <div className="flex  text-sm items-center font-semibold leading-5 font-Open">
                    {source == "SHOPIFY" ||
                    source == "WOOCOMMERCE" ||
                    source == "AMAZON" ||
                    source == "ZOHO" ? (
                      <div>
                        {" "}
                        <span
                          className=""
                          data-tooltip-id="my-tooltip-inline"
                          data-tooltip-content="Complete Order"
                        >
                          {tempOrderId}
                        </span>
                      </div>
                    ) : (
                      <Link
                        to={`/orders/add-order/pickup?shipyaari_id=${tempOrderId}&source=${source}&orderId=${orderId}`}
                        className="underline text-blue-500 cursor-pointer"
                      >
                        <span
                          className=""
                          data-tooltip-id="my-tooltip-inline"
                          data-tooltip-content="Complete Order"
                        >
                          {tempOrderId}
                        </span>
                      </Link>
                    )}
                    <CopyTooltip stringToBeCopied={tempOrderId} />
                  </div>
                </div>
              )}
              {orderId && (
                <div className="">
                  <span className=" text-xs font-normal font-Open leading-4 ">
                    Order ID :
                  </span>
                  <div className=" flex text-sm font-Open items-center font-semibold leading-5">
                    <span className="">{orderId}</span>
                    <CopyTooltip stringToBeCopied={orderId} />
                  </div>
                </div>
              )}

              {(source === "UNICOMMERCE" ||
                source === "SHOPIFY" ||
                source === "WOOCOMMERCE") &&
                otherDetails?.orderNumber && (
                  <div className="">
                    <span className=" text-xs font-normal font-Open leading-4 ">
                      Order Number :
                    </span>
                    <div className=" flex text-sm font-Open items-center font-semibold leading-5">
                      {otherDetails?.orderNumber}
                    </div>
                  </div>
                )}

              {awb && (
                <div className="">
                  <span className=" text-sm font-light">Tracking :</span>
                  <div className="flex text-base items-center font-medium">
                    <span
                      onClick={
                        () =>
                          window.open(`/tracking?trackingNo=${awb}`, "_blank")
                        // navigate({
                        //   pathname: "/tracking",
                        //   search: `?trackingNo=${awb}`,
                        // })
                      }
                      className="hover:text-[#004EFF] underline-offset-4 underline  decoration-2 cursor-pointer"
                      data-tooltip-id="my-tooltip-inline"
                      data-tooltip-content="Track"
                    >
                      {awb}
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
                    <CopyTooltip stringToBeCopied={awb} />
                  </div>
                </div>
              )}
              <div className="  mt-1">
                <span className=" font-Open text-xs font-normal leading-4 mr-1">
                  Order Updated At :
                </span>
                <div className=" ">
                  <p className=" font-Open text-sm font-semibold leading-5">
                    {date_DD_MMM_YYYY_HH_MM_SS(
                      updatedAtStatus || updatedAt
                    )}
                  </p>
                </div>
              </div>

              {(source === "SHOPIFY" ||
                source === "WOOCOMMERCE" ||
                source === "ZOHO" ||
                source === "AMAZON" ||
                source === "UNICOMMERCE") &&
                otherDetails?.channelOrderCreatedAt && (
                  <div className="mt-1">
                    <span className="font-Open text-xs font-normal leading-4 mr-1">
                      Order Created From Channel:
                    </span>
                    <div>
                      <p className="font-Open text-sm font-semibold leading-5">
                        {date_DD_MMM_YYYY_HH_MM_SS(
                          otherDetails?.channelOrderCreatedAt
                        )}
                      </p>
                    </div>
                  </div>
                )}

              <div className="flex items-center mt-1">
                <span className=" font-Open  text-xs leading-4 font-normal">
                  Source :
                </span>
                <div className=" pl-2 font-Open text-sm items-center font-semibold leading-5">
                  <span className="">
                    {capitalizeFirstLetterWithExclude(source, excludeWords)}
                  </span>
                </div>
              </div>
              <div className="flex items-center mt-1">
                <span className=" font-Open  text-xs leading-4 font-normal">
                  Order Type :
                </span>
                <div className="pl-2 font-Open text-sm items-center font-semibold leading-5 ">
                  <span className="">{orderType}</span>
                </div>
              </div>
            </div>
          </div>
        );
      },
    }),
    //STATUS
    ColumnsHelper.accessor("Status", {
      header: () => {
        return (
          <div className="flex justify-between font-Open font-semibold leading-5 text-sm">
            <h1>Status </h1>
          </div>
        );
      },
      cell: (info: any) => {
        let rowData = info?.row?.original;
        console.log("🚀 ~ info:", rowData);
        const latestStatus =
          rowData?.status?.[rowData?.status?.length - 1]?.currentStatus;
        const { status, tempOrderId, source, otherDetails, awb, createdAt } =
          info?.row?.original;
        const rowsData = info?.row?.original;
        // const timeStamp = status?.[0]?.timeStamp;
        const timeStamp =
          rowData?.status?.[rowData?.status?.length - 1]?.timeStamp;
        const time = timeStamp && date_DD_MMM_YYYY_HH_MM_SS(timeStamp);
        const renderStatus = status?.[0]?.currentStatus || "Draft";
        const { tags } = info?.row?.original?.otherDetails || [];
        const tagsString = tags?.join(", ");
        const tagsLength = tagsString?.length;

        const showAllTags = tagsLength > 0;

        const rows: any = [
          {
            title: "Pickup Address",
            FlatNo: rowsData?.pickupAddress?.flatNo,
            LandkMark: capitalizeFirstLetter(rowsData?.pickupAddress?.landmark),
            Locality: capitalizeFirstLetter(rowsData?.pickupAddress?.locality),
            City: capitalizeFirstLetter(rowsData?.pickupAddress?.city),
            State: capitalizeFirstLetter(rowsData?.pickupAddress?.state),
            Pincode: rowsData?.pickupAddress?.pincode,
            Country: capitalizeFirstLetter(rowsData?.pickupAddress?.country),
            "Address Type": capitalizeFirstLetter(
              rowsData?.pickupAddress?.addressType
            ),
            Name: capitalizeFirstLetter(rowsData?.pickupAddress?.contact?.name),
            MobileNo: rowsData?.pickupAddress?.contact?.mobileNo,

            "Email Id": capitalizeFirstLetter(
              rowsData?.pickupAddress?.contact?.emailId
            ),
            Type: capitalizeFirstLetter(rowsData?.pickupAddress?.contact?.type),
          },
          {
            title: rowsData?.deliveryAddress?.flatNo && "Delivery Address",
            FlatNo: rowsData?.deliveryAddress?.flatNo,
            Landmark: capitalizeFirstLetter(
              rowsData?.deliveryAddress?.landmark
            ),
            Locality: capitalizeFirstLetter(
              rowsData?.deliveryAddress?.locality
            ),
            City: capitalizeFirstLetter(rowsData?.deliveryAddress?.city),
            State: capitalizeFirstLetter(rowsData?.deliveryAddress?.state),
            Pincode: rowsData?.deliveryAddress?.pincode,
            Country: capitalizeFirstLetter(rowsData?.deliveryAddress?.country),
            "Address Type": capitalizeFirstLetter(
              rowsData?.deliveryAddress?.addressType
            ),
            Name: capitalizeFirstLetter(
              rowsData?.deliveryAddress?.contact?.name
            ),
            MobileNo: rowsData?.deliveryAddress?.contact?.mobileNo,

            "Email Id": capitalizeFirstLetter(
              rowsData?.deliveryAddress?.contact?.emailId
            ),
            Type: capitalizeFirstLetter(
              rowsData?.deliveryAddress?.contact?.type
            ),
          },
          {
            title: rowsData?.service?.companyServiceId && "Services",
            "Partner Name": capitalizeFirstLetter(
              rowsData?.service?.partnerName
            ),
            "AVN Service": capitalizeFirstLetter(
              rowsData?.service?.companyServiceName
            ),
            "Service Mode": capitalizeFirstLetter(
              rowsData?.service?.serviceMode
            ),
            "Applied Weight": `${rowsData?.service?.appliedWeight} Kg`,
            "Freight Charges": `₹ ${Math.round(
              rowsData?.service?.add + rowsData?.service?.base
            )?.toLocaleString("en-IN")}`,
            "COD Charges": `₹ ${Math.round(
              rowsData?.service?.cod
            )?.toLocaleString("en-IN")}`,
            Insurance: `₹ ${Math.round(
              rowsData?.service?.insurance
            )?.toLocaleString("en-IN")}`,
            "Other Charges": `₹ ${Math.round(
              rowsData?.service?.variables
            )?.toLocaleString("en-IN")}`,
            Tax: `₹ ${Math.round(rowsData?.service?.tax)?.toLocaleString(
              "en-IN"
            )}`,
            Total: `₹ ${Math.round(rowsData?.service?.total)?.toLocaleString(
              "en-IN"
            )}`,
          },
        ];
        let boxObj: any = { title: "" };
        rowsData?.boxInfo?.map((item: any, index: any) => {
          let title = `Box Info ${
            rowsData?.boxInfo?.length > 1 ? `${index + 1}` : ""
          }`;
          let qty = 0;
          item?.products?.map((elem: any, num: any) => {
            boxObj = {
              ...boxObj,
              [`Name ${num + 1}`]: elem?.name,
              [`QTY ${num + 1}`]: elem?.qty,
              [`Dead Weight ${num + 1}`]: `${elem?.deadWeight} Kg`,
              [`Applied Weight ${num + 1}`]: `${elem?.appliedWeight} Kg`,
              [`Dimensions ${
                num + 1
              }`]: `${elem?.length} x ${elem?.breadth} x ${elem?.height}`,
              [`Price ${num + 1}`]: `₹ ${Math.round(
                elem?.unitPrice
              )?.toLocaleString("en-IN")}`,
              [`Tax ${num + 1}`]: `₹ ${Math.round(
                elem?.unitTax
              )?.toLocaleString("en-IN")}`,
              [`SKU ${num + 1}`]: elem?.sku,
            };
            qty += elem?.qty;
          });
          title += ` Product(s) x ${qty}`;
          boxObj.title = title;
          rows.push(boxObj);
        });

        const buyerConfirmation = rowData?.isBuyerConfirmed;
        // const buyerConfirmationStatus = (buyerConfirmation: any) => {
        //   let className = "";
        //   let text = buyerConfirmation;
        //   console.log("buyerConfirmation", buyerConfirmation);
        //   switch (buyerConfirmation) {
        //     case "BUYER CANCELLED":
        //       className = " bg-[#FEEEEB] text-[#F35838]";
        //       break;
        //     case "PENDING":
        //       className = " bg-[#FDF6EA] text-[#F0A22E]";
        //       break;

        //     case "BUYER VERIFIED":
        //       className = " bg-[#F2FAEF] text-[#7CCA62]";
        //       break;
        //     default:
        //       text = "";
        //       className = "";
        //       break;
        //   }
        //   return { className, text };
        // };

        const buyerConfirmationStatus = [
          {
            value: "PENDING",
            class: "bg-[#FDF6EA] text-[#F0A22E] border-[#F0A22E] border",
          },
          {
            value: "BUYER VERIFIED",
            class: "bg-[#F2FAEF] text-[#7CCA62] border-[#7CCA62] border",
          },
          {
            value: "BUYER CANCELLED",
            class: "bg-[#FEEEEB] text-[#F35838] border-[#F35838] border",
          },
        ];

        let statusObj: any = { title: "" };

        rowsData?.status?.map((elem: any, index: any) => {
          statusObj = {
            ...statusObj,
            [`AWB No ${index + 1}`]: rowsData.awb,
            [`Current Status ${index + 1}`]: capitalizeFirstLetter(
              elem?.currentStatus
            ),
            [`Description ${index + 1}`]: elem?.description,
            [`LogId ${index + 1}`]: elem.logId,
            [`Notes ${index + 1}`]: elem.notes,
            [`Time ${index + 1}`]: date_DD_MMM_YYYY_HH_MM_SS(elem.timeStamp),
          };
          statusObj.title = "Status";
        });
        rows.push(statusObj);

        rows.push({
          title: "Other Details",
          [`${COMPANY_NAME} ID`]: rowsData?.tempOrderId,
          "Order Id": rowsData?.orderId,
          "Tracking Id": rowsData?.awb,
          Source: capitalizeFirstLetter(rowsData?.source),
          "Order Type": rowsData?.orderType,
          Zone: capitalizeFirstLetter(rowsData?.zone),
        });

        const handleInformativeModal = () => {
          console.log("awb", awb);

          setInfoModalContentFunction({
            awb: "0",
            orderId: `T${rowsData?.tempOrderId}`,
            orderNumber: otherDetails?.orderNumber,
          });
        };
        const updateBuyerConfirmation = async (
          buyerConfirmationStatus: any
        ) => {
          try {
            const payload = {
              orderId: rowsData?.tempOrderId,
              currentOrderStatus: latestStatus
                ? capitalizeFirstLetter(latestStatus)
                : "Draft",
              isBuyerConfirmed: buyerConfirmationStatus,
            };
            const response = await POST(
              UPDATE_ORDER_CONFIRMATION_STATUS,
              payload
            );
            if (response?.data?.success) {
              toast.success("Order confirmation status updated successfully");
              setBuyerConfirmationStatus(
                rowsData?.orderId + buyerConfirmationStatus
              );
              // console.log(rowsData?.orderId + buyerConfirmationStatus, "STRING");
              // console.log("updateBuyerConfirmation", payload);
            } else {
              toast.error(response?.data?.message);
            }
          } catch (error) {
            toast.error("Failed to update order confirmation status");
          }
        };
        // const { text, className } = buyerConfirmationStatus("BUYER VERIFIED");
        return (
          <div className="py-3">
            {
              <div className="flex flex-col gap-y-1">
                <div className="flex text-base items-center font-medium">
                  <div
                    className="flex gap-x-1 items-center cursor-pointer underline hover:text-[#004EFF] transition duration-300"
                    onClick={handleInformativeModal}
                  >
                    <div>
                      <p className=" font-Open font-semibold leading-5 text-sm">
                        {latestStatus
                          ? capitalizeFirstLetter(latestStatus)
                          : "Draft"}{" "}
                      </p>
                    </div>

                    {setInfoModalContent && (
                      <div
                        className="cursor-pointer text-blue-500 hover:text-blue-700 transition duration-300"
                        onClick={handleInformativeModal}
                      >
                        <img
                          src={InformativeIcon}
                          alt="Info Icon"
                          width="18px"
                        />
                      </div>
                    )}
                  </div>
                  {source !== "SHOPIFY" ||
                    source !== "WOOCOMMERCE" ||
                    (source !== "ZOHO" && (
                      <div
                        className="lg:block cursor-pointer pl-1"
                        onClick={() => {
                          navigate(
                            `/orders/add-order/pickup?shipyaari_id=${tempOrderId}&source=${source}`
                          );
                        }}
                      >
                        <div style={{ width: "20px", height: "20px" }}>
                          {" "}
                          <img
                            src={editIcon}
                            alt="editIcon"
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                    ))}
                </div>
                <div className="font-Open font-semibold leading-5 text-sm">
                  {source === "SHOPIFY" ||
                  source === "WOOCOMMERCE" ||
                  source === "ZOHO"
                    ?  
                    <div>
                      Order created on Channel: 
                      <div>
                    {date_DD_MMM_YYYY_HH_MM_SS(createdAt)}
                      </div>
                    </div> 
                    : time}
                </div>

                {showAllTags && (
                  <div className="flex ">
                    <div className="flex  w-fit px-2  text-xs py-0 text-center bg-white  items-center text-[#004EFF] border-[#004EFF] border rounded-md line-clamp-2">
                      {capitalizeFirstLetter(tags[0])}
                    </div>
                    {/* <img src={InformativeIcon} alt="Info Icon" width="18px" /> */}
                    {tags.length > 1 && (
                      <CustomToolTip
                        position="bottom"
                        content={
                          <div className="absolute flex gap-1 flex-wrap left-0 line-clamp-3 top-full mt-1 w-[150px] p-2 bg-white text-xs  shadow-md rounded-md">
                            {tags.map(
                              (tag: string, index: Key | null | undefined) => (
                                <p className="bg-white text-[#004EFF] rounded-md px-2 border-[#004EFF] border shadow-inner-sm">
                                  {" "}
                                  {capitalizeFirstLetter(tag)}{" "}
                                </p>
                              )
                            )}
                          </div>
                        }
                        showOnHover={true}
                        bgColor="bg-white"
                        textColor="black"
                        left={-26}
                        top={-8}
                      >
                        <img
                          src={moreIcon}
                          alt="editIcon"
                          className="hover:-translate-y-[0.1rem] hover:scale-110 duration-100 cursor-pointer mx-2"
                        />
                      </CustomToolTip>
                    )}
                  </div>
                )}

                {buyerConfirmation && (
                  <div className="py-1 flex items-center">
                    {buyerConfirmationStatus.map((e) => {
                      return (
                        e.value === buyerConfirmation && (
                          <p
                            className={`px-2 py-1 w-fit  text-xs font-medium text-center  rounded-full ${e.class}`}
                          >
                            {e.value}
                          </p>
                        )
                      );
                    })}

                    <CustomToolTip
                      position="bottom"
                      content={
                        <div className="p-0.5 rounded-md bg-white shadow-md">
                          {buyerConfirmationStatus.map((e) => {
                            return (
                              e.value !== buyerConfirmation && (
                                <p
                                  key={e.value}
                                  className={`px-2 py-1 w-fit m-2 text-xs text-center rounded-md cursor-pointer hover:scale-105 ${e.class}`}
                                  onClick={() =>
                                    updateBuyerConfirmation(e.value)
                                  }
                                >
                                  {e.value}
                                </p>
                              )
                            );
                          })}
                        </div>
                      }
                      showOnHover={true}
                      bgColor="bg-white"
                      textColor="black"
                      left={-26}
                    >
                      <img
                        src={editIcon}
                        alt="editIcon"
                        className="hover:-translate-y-[0.1rem] hover:scale-110 duration-100 cursor-pointer mx-2"
                      />
                    </CustomToolTip>
                  </div>
                )}
              </div>
            }
          </div>
        );
      },
    }),
    // ColumnsHelper.accessor(".", {
    //   header: () => {
    //     return (
    //       <div className="flex justify-between">
    //         <h1>Package Details</h1>
    //       </div>
    //     );
    //   },
    //   cell: (info: any) => {
    //     const { boxInfo = [] } = info?.row?.original;
    //     return (
    //       <div className="my-4 space-y-2 ">
    //         {boxInfo?.length > 0 ? (
    //           <div>
    //             <span>
    //               {boxInfo[0].name} {boxInfo[1]?.boxInfo ?? ""}
    //             </span>
    //           </div>
    //         ) : (
    //           <div
    //             // onClick={() => navigate("/orders/add-order/product-package")}
    //             className="  decoration-2 "
    //           >
    //             No Package Details Found
    //           </div>
    //         )}
    //       </div>
    //     );
    //   },
    // }),
    ColumnsHelper.accessor("Pickup Adreess", {
      header: () => {
        return (
          <div className="flex justify-between marker: font-Open font-semibold leading-5 text-sm">
            <h1>Pickup Address</h1>
          </div>
        );
      },
      cell: (info: any) => {
        // console.log(
        //   "info?.row?.original?.pickupAddress",
        //   info?.row?.original?.pickupAddress
        // );
        return (
          <div className=" font-Open font-normal leading-5 text-sm  py-3">
            {capitalizeFirstLetter(
              info?.row?.original?.pickupAddress?.fullAddress
            ) ? (
              <>
                <div className="font-Open font-normal leading-5 text-sm ">
                  {capitalizeFirstLetter(
                    info?.row?.original?.pickupAddress?.contact?.name
                  )}
                </div>
                <span>
                  {capitalizeFirstLetter(
                    info?.row?.original?.pickupAddress?.fullAddress
                  )}
                </span>
                <div className="font-Open font-normal leading-5 text-sm ">
                  {info?.row?.original?.pickupAddress?.contact?.mobileNo}
                </div>
                <div className="font-Open font-normal leading-5 text-sm ">
                  Pincode : <b>{info?.row?.original?.pickupAddress?.pincode}</b>
                </div>
              </>
            ) : (
              <div
                // onClick={() => navigate("/orders/add-order/delivery")}
                className="decoration-2 font-Open font-normal leading-5 text-sm  text-[black]"
              >
                No Pickup Address Found
              </div>
            )}
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("Delivery Adreess", {
      header: () => {
        return (
          <div className="flex justify-between font-Open font-semibold leading-5 text-sm">
            <h1>Delivery Address</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="font-Open font-normal leading-5 text-sm py-3">
            {info?.row?.original?.routes &&
            info?.row?.original?.routes?.length >= 1 ? (
              <>
                <div className="font-Open font-normal leading-5 text-sm">
                  {capitalizeFirstLetter(
                    info?.row?.original?.routes?.[0]?.contact?.name
                  )}
                </div>
                <span>
                  {capitalizeFirstLetter(
                    info?.row?.original?.routes?.[0]?.fullAddress
                  )}
                </span>

                <div className="font-Open font-normal leading-5 text-sm">
                  {info?.row?.original?.routes?.[0]?.contact?.mobileNo}
                </div>
                <div className="font-Open font-normal leading-5 text-sm ">
                  Pincode :{" "}
                  <b>{info?.row?.original?.deliveryAddress?.pincode}</b>
                </div>
              </>
            ) : info?.row?.original?.deliveryAddress?.fullAddress ? (
              <>
                <div className="font-Open font-normal leading-5 text-sm">
                  {capitalizeFirstLetter(
                    info?.row?.original?.deliveryAddress?.contact?.name
                  )}
                </div>
                <span>
                  {capitalizeFirstLetter(
                    info?.row?.original?.deliveryAddress?.fullAddress
                  )}
                </span>
                <div className="font-Open font-normal leading-5 text-sm">
                  {info?.row?.original?.deliveryAddress?.contact?.emailId}
                </div>
                <div className="font-Open font-normal leading-5 text-sm">
                  {info?.row?.original?.deliveryAddress?.contact?.mobileNo}
                </div>
                <div className="font-Open font-normal leading-5 text-sm ">
                  Pincode :{" "}
                  <b>{info?.row?.original?.deliveryAddress?.pincode}</b>
                </div>
              </>
            ) : (
              <div
                // onClick={() => navigate("/orders/add-order/delivery")}
                className="decoration-2 text-[black]"
              >
                No Delivery Address Found
              </div>
            )}
          </div>
        );
      },
    }),
    // ColumnsHelper.accessor("orderStatus", {
    //   header: () => {
    //     return (
    //       <div className="flex justify-between">
    //         <h1>Status</h1>
    //       </div>
    //     );
    //   },
    //   cell: (info: any) => {
    //     return (
    //       <div className="flex justify-center items-center gap-x-2 p-2 bg-[#f6eddf] rounded-md border-[1px] border-[#e5a235] whitespace-nowrap h-[28px] w-[93px]">
    //         <img src={Delivery} alt="" className="w-[12px]" />
    //         <span className="text-[#F0AE47] text-[12px] font-semibold  ">
    //           Success
    //         </span>
    //       </div>
    //     );
    //   },
    // }),
    ColumnsHelper.accessor("Payment", {
      header: () => {
        return (
          <div className="flex justify-between font-Open font-semibold leading-5 text-sm">
            <h1>Payment Mode</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { service, codInfo } = info?.row?.original;
        return (
          <>
            <div className="flex flex-col gap-y-1 font-Open font-normal leading-5 text-sm  py-3">
              <p>
                <span>Invoice Value : </span>₹{" "}
                {Number(codInfo?.invoiceValue?.toFixed(2))?.toLocaleString(
                  "en-IN"
                )}
              </p>
              {codInfo?.isCod && (
                <p>
                  <span>COD Amount : </span>₹{" "}
                  {Number(
                    codInfo?.collectableAmount?.toFixed(2)
                  )?.toLocaleString("en-IN")}
                </p>
              )}

              <span>
                {codInfo
                  ? codInfo?.isCod
                    ? "Payment Type : COD"
                    : "Payment Type : Prepaid"
                  : "-"}
              </span>
            </div>
          </>
        );
      },
    }),
    ColumnsHelper.accessor("asda", {
      header: () => {
        return (
          <div className="flex justify-between font-Open font-semibold leading-5 text-sm">
            <h1>Actions</h1>
          </div>
        );
      },
      cell: (info: any) => {
        //Status is hardcode now
        const {
          payment,
          boxInfo,
          codInfo,
          tempOrderId = "-",
          sellerId = "-",
          status,
          orderId,
          source,
        } = info?.row?.original;
        const { AWB } = status[0] ?? "";
        const copyString = `
          Order Id: ${orderId} 
          ${COMPANY_NAME} ID: ${tempOrderId}
          Package Details: ${boxInfo?.length > 0 && boxInfo[0].name} ${
          (boxInfo?.length > 0 && boxInfo[1]?.boxInfo) || ""
        }
          Pickup Address: ${info?.row?.original?.pickupAddress?.fullAddress}
          Delivery Address: ${info?.row?.original?.deliveryAddress?.fullAddress}
          Status: Success
          Payment: ${
            payment?.amount?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            }) ?? "0"
          } ${codInfo ? (codInfo?.isCod ? "COD" : "ONLINE") : "-"}

        `;
        let draftOrderPayload = [tempOrderId];

        return (
          <div className="flex items-center">
            {/* <CopyTooltip stringToBeCopied={copyString} /> */}

            {/* <img
              src={DeleteIconForLg}
              alt="Delete "
              onClick={() => {
                handleDeleteModalDraftOrder(draftOrderPayload);
              }}
              className="w-5 h-5 cursor-pointer "
              data-tooltip-id="my-tooltip-inline"
              data-tooltip-content="Delete Order"
            />
            <Tooltip
              id="my-tooltip-inline"
              style={{
                backgroundColor: "bg-neutral-900",
                color: "#FFFFFF",
                width: "fit-content",
                fontSize: "14px",
                lineHeight: "16px",
              }}
            /> */}

            <CustomToolTip
              position="bottom"
              content={moreDropDown(
                currentStatus,
                orderActions,
                info?.row?.original
              )}
              showOnHover={true}
              bgColor="bg-white"
              textColor="black"
            >
              <div className="mx-2 cursor-pointer">
                <img
                  src={moreIcon}
                  alt="moreIcon"
                  className="hover:-translate-y-[0.1rem] hover:scale-110 duration-300"
                />
              </div>
            </CustomToolTip>
          </div>
        );
      },
    }),
  ];
};

export const ColumnHelperForBookedAndReadyToPicked = (
  navigate: any,
  setCancellationModal?: any,
  setInfoModalContent?: any,
  setInfoModalContentFunction?: any,
  currentStatus?: any,
  orderActions?: any,
  setOpenRightModalForTracking?: any,
  openRightModalForTracking?: any,
  isMasked?: boolean,
  buyerConfirmationStatus?: any,
  setBuyerConfirmationStatus?: any
) => {
  // const handleCancellationModal = (awbNo: any, orderId: any) => {
  //   setCancellationModal({ isOpen: true, awbNo, orderId });
  // };
  return [
    // ...commonColumnHelper,
    ColumnsHelper.accessor("Pick up Expected", {
      header: (props: any) => {
        return (
          <div className="flex items-center">
            <div
              className="flex justify-between mr-3 !my-[-10px] cursor-pointer"
              id="selectAll"
            >
              <PartialChecked
                checked={props.table?.getIsAllRowsSelected()}
                onChange={props?.table?.getToggleAllRowsSelectedHandler()}
                intermediate={props?.table?.getIsSomeRowsSelected()}
              />
            </div>
            <h1 className="font-Open font-semibold leading-5 text-sm">
              Pickup Expected
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { pickupAddress, service, source, orderId, otherDetails, awb } =
          info?.row?.original;

        return (
          <div className="flex">
            <div className="flex justify-center mr-4 !my-[-12px] cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={info?.row?.getIsSelected()}
                onChange={info?.row?.getToggleSelectedHandler()}
                className="!w-[16px]"
              />
            </div>
            <div className=" ">
              {orderId && (
                <div className="">
                  <span className=" text-sm font-light">Order ID :</span>
                  <div className=" flex text-base items-center font-medium">
                    <span className="">{orderId}</span>
                    <CopyTooltip stringToBeCopied={orderId} />
                  </div>
                </div>
              )}

              {(source === "UNICOMMERCE" ||
                source === "SHOPIFY" ||
                source === "WOOCOMMERCE") &&
                otherDetails?.orderNumber && (
                  <div className="">
                    <span className=" text-sm font-light">Order Number :</span>
                    <div className=" flex text-base items-center font-medium">
                      {otherDetails?.orderNumber}
                    </div>
                  </div>
                )}

              <p className="">
                {pickupAddress?.pickupDate
                  ? date_DD_MMM_YYYY_HH_MM_SS(pickupAddress?.pickupDate)
                  : null}
              </p>
              <div className="pt-2 pb-1 flex flex-col">
                <span className="text-sm font-light">Delivery Partner</span>
                <div className="font-semibold">
                  {isMasked
                    ? COMPANY_NAME
                    : capitalizeFirstLetter(service?.partnerName)}
                </div>
              </div>

              {awb && (
                <div className="">
                  <span className=" text-sm font-light">Tracking :</span>
                  <div className="flex text-base items-center font-medium">
                    {/* console.log("log 1 where it is commented") */}
                    <span
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
                      className="hover:text-[#004EFF] underline-offset-4 underline  decoration-2 cursor-pointer"
                      data-tooltip-id="my-tooltip-inline"
                      data-tooltip-content="Track"
                    >
                      {awb}
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
                    <CopyTooltip stringToBeCopied={awb} />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      },
    }),
    ...idHelper(
      navigate,
      setInfoModalContent,
      setInfoModalContentFunction,
      setOpenRightModalForTracking,
      openRightModalForTracking,
      buyerConfirmationStatus,
      setBuyerConfirmationStatus
    ),
    ...MainCommonHelper(),
    ColumnsHelper.accessor("asd", {
      header: () => {
        return (
          <div className="flex justify-between font-Open font-semibold leading-5 text-sm">
            <h1>Actions</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { original } = info.cell.row;
        const data = original;

        const { otherDetails = {}, awb } = info?.row?.original;
        const { label = [] } = otherDetails;
        const labelUrl = data?.boxInfo?.[0]?.tracking?.label;
        const fileUrl = labelUrl || "";

        const {
          payment,
          boxInfo,
          codInfo,
          tempOrderId = "-",
          orderId,
          sellerId = "-",
          status,

          source,
        } = info?.row?.original;

        const copyString = `
          Order Id: ${orderId} 
        ${COMPANY_NAME} Id: ${tempOrderId}
          Tracking Id: ${awb}
          Package Details: ${boxInfo?.length > 0 && boxInfo[0].name} ${
          (boxInfo?.length > 0 && boxInfo[1]?.boxInfo) || ""
        }
          Pickup Address: ${info?.row?.original?.pickupAddress?.fullAddress}
          Delivery Address: ${info?.row?.original?.deliveryAddress?.fullAddress}
          Status: Success
          Payment: ${
            payment?.amount?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            }) ?? "0"
          } ${codInfo ? (codInfo?.isCod ? "COD" : "ONLINE") : "-"}

        `;

        return (
          <>
            <div className="flex items-center gap-x-1 ">
              <CopyTooltip stringToBeCopied={copyString} />
              {/* {fileUrl !== "" ? (
                <ShowLabel fileUrl={fileUrl} />
              ) : (
                <div className="text-[grey]">No Label Found</div>
              )} */}
              {/* {setCancellationModal && (
                <div>
                  <img
                    src={CrossIcon}
                    width={"35px"}
                    // alt="Cancel Order"
                    className=" group-hover:flex cursor-pointer p-[6px] hover:-translate-y-[0.1rem] hover:scale-110 duration-300"
                    onClick={() => handleCancellationModal(awb, data?.orderId)}
                    data-tooltip-id="my-tooltip-inline"
                    data-tooltip-content="Cancel Order"
                  />
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
                </div>
              )}
              <div className="w-[35px]">
                <img
                  src={ShreIcon}
                  className="w-[20px] group-hover:flex cursor-pointer hover:-translate-y-[0.1rem] hover:scale-110 duration-300"
                  data-tooltip-id="tracking"
                  data-tooltip-content="Open Tracking URL"
                  onClick={() =>
                    window.open(
                      `/shipyaari-tracking?trackingNo=${awb}`,
                      "_blank"
                    )
                  }
                />
                <Tooltip
                  id="tracking"
                  style={{
                    backgroundColor: "bg-neutral-900",
                    color: "#FFFFFF",
                    width: "fit-content",
                    fontSize: "14px",
                    lineHeight: "16px",
                  }}
                />
              </div> */}

              <CustomToolTip
                position="bottom"
                content={moreDropDown(
                  currentStatus,
                  orderActions,
                  info?.row?.original
                )}
                showOnHover={true}
                bgColor="bg-white"
                textColor="black"
                left={-100}
              >
                <div className="mx-2 cursor-pointer">
                  <img
                    src={moreIcon}
                    alt="moreIcon"
                    className="hover:-translate-y-[0.1rem] hover:scale-110 duration-300"
                  />
                </div>
              </CustomToolTip>
            </div>
          </>
        );
      },
    }),
  ];
};
export const columnHelpersForRest = (
  navigate: any,
  setInfoModalContent: any,
  currentStatus?: any,
  orderActions?: any,
  setInfoModalContentFunction?: any,
  setInfoReverseModalFunction?: any,
  setOpenRightModalForTracking?: any,
  openRightModalForTracking?: any,
  isMasked?: any,
  buyerConfirmationStatus?: any,
  setBuyerConfirmationStatus?: any
) => {
  return [
    // ...commonColumnHelper,
    ColumnsHelper.accessor("packageType", {
      header: (props: any) => {
        return (
          <div
            className="flex items-center font-Open font-semibold leading-5 text-sm"
            id="selectAll"
          >
            <PartialChecked
              checked={props.table?.getIsAllRowsSelected()}
              onChange={props?.table?.getToggleAllRowsSelectedHandler()}
              intermediate={props?.table?.getIsSomeRowsSelected()}
            />
            <h1>Courier Details</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { pickupAddress, service, source, orderId, otherDetails, awb } =
          info?.row?.original;
        return (
          <div className="flex w-[300px]">
            <div className="flex justify-center mr-4 !my-[-6px] cursor-pointer">
              <input
                type="checkbox"
                checked={info?.row?.getIsSelected()}
                onChange={info?.row?.getToggleSelectedHandler()}
                className="!w-[16px]"
              />
            </div>
            <div>
              {orderId && (
                <div className="">
                  <span className=" text-sm font-light">Order ID :</span>
                  <div className=" flex text-base items-center font-medium">
                    <span className="">{orderId}</span>
                    <CopyTooltip stringToBeCopied={orderId} />
                  </div>
                </div>
              )}

              {(source === "UNICOMMERCE" ||
                source === "SHOPIFY" ||
                source === "WOOCOMMERCE") &&
                otherDetails?.orderNumber && (
                  <div className="">
                    <span className=" text-sm font-light">Order Number :</span>
                    <div className=" flex text-base items-center font-medium">
                      {otherDetails?.orderNumber}
                    </div>
                  </div>
                )}

              <div className="py-2 flex flex-col">
                <span className="text-sm font-light">Delivery Partner</span>
                <div className="font-semibold">
                  {isMasked
                    ? COMPANY_NAME
                    : capitalizeFirstLetter(service?.partnerName)}
                </div>
              </div>

              {awb && (
                <div className="">
                  <span className=" text-sm font-light">Tracking :</span>
                  <div className="flex text-base items-center font-medium">
                    {/* console.log("log 1 where it is commented") */}
                    <span
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
                      className="hover:text-[#004EFF] underline-offset-4 underline  decoration-2 cursor-pointer"
                      data-tooltip-id="my-tooltip-inline"
                      data-tooltip-content="Track"
                    >
                      {awb}
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
                    <CopyTooltip stringToBeCopied={awb} />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      },
    }),
    ...idHelper(
      navigate,
      setInfoModalContent,
      setInfoModalContentFunction,
      setOpenRightModalForTracking,
      openRightModalForTracking,
      buyerConfirmationStatus,
      setBuyerConfirmationStatus
    ),
    // ColumnsHelper.accessor("createdAt", {
    //   header: () => {
    //     return (
    //       <div className="flex justify-between">
    //         <h1>ETA</h1>
    //       </div>
    //     );
    //   },
    //   cell: (info: any) => {
    //     const { original } = info.cell.row;

    //     return (
    //       <div className="flex flex-col whitespace-nowrap">
    //         <div className="flex gap-x-2">
    //           <img src={BlackShipIcon} alt="" />
    //           <span className="text-[14px]">04 Jun 2023</span>
    //         </div>
    //       </div>
    //     );
    //   },
    // }),
    // ColumnsHelper.accessor("createdAt", {
    //   header: () => {
    //     return (
    //       <div className="flex justify-between">
    //         <h1>Remark</h1>
    //       </div>
    //     );
    //   },
    //   cell: (info: any) => {
    //     return (
    //       <div className="flex flex-col whitespace-nowrap">
    //         <div className="flex gap-x-2">
    //           <span className="text-[14px]">Remarks</span>
    //         </div>
    //       </div>
    //     );
    //   },
    // }),
    ...MainCommonHelper(),

    ColumnsHelper.accessor("asda", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Actions</h1>
          </div>
        );
      },
      cell: (info: any) => {
        //Status is hardcode now
        const {
          payment,
          boxInfo,
          codInfo,
          tempOrderId = "-",
          sellerId = "-",
          status,
          source,
          orderType,
          transit,
        } = info?.row?.original;
        let individualData: any = info?.row?.original;
        const { AWB } = status[0] ?? "";
        const copyString = `
          Order Id: ${tempOrderId} 
          ${COMPANY_NAME} Id: ${sellerId}
          Tracking Id: ${AWB}
          Package Details: ${boxInfo?.length > 0 && boxInfo[0].name} ${
          (boxInfo?.length > 0 && boxInfo[1]?.boxInfo) || ""
        }
          Pickup Address: ${info?.row?.original?.pickupAddress?.fullAddress}
          Delivery Address: ${info?.row?.original?.deliveryAddress?.fullAddress}
          Status: Success
          Payment: ${
            payment?.amount?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            }) ?? "0"
          } ${codInfo ? (codInfo?.isCod ? "COD" : "ONLINE") : "-"}

        `;
        let draftOrderPayload = {
          tempOrderId: tempOrderId,
          source: source,
        };

        return (
          <div className="flex items-center">
            <CopyTooltip stringToBeCopied={copyString} />

            {/* <img
              src={DeleteIconForLg}
              alt="Delete "
              // onClick={() => {
              //   handleDeleteModalDraftOrder(draftOrderPayload);
              // }}
              className="w-5 h-5 cursor-pointer "
              data-tooltip-id="my-tooltip-inline"
              data-tooltip-content="Delete Order"
            />
            <Tooltip
              id="my-tooltip-inline"
              style={{
                backgroundColor: "bg-neutral-900",
                color: "#FFFFFF",
                width: "fit-content",
                fontSize: "14px",
                lineHeight: "16px",
              }}
            /> */}

            {currentStatus === "DELIVERED" &&
              orderType !== "B2B" &&
              transit === "FORWARD" && (
                <div>
                  <img
                    src={ReverseIcon}
                    className="w-[18px] group-hover:flex cursor-pointer hover:-translate-y-[0.1rem] hover:scale-110 duration-300"
                    onClick={() =>
                      setInfoReverseModalFunction(individualData?.awb)
                    }
                  />
                </div>
              )}

            <CustomToolTip
              position="bottom"
              content={moreDropDown(
                currentStatus,
                orderActions,
                info?.row?.original
              )}
              showOnHover={true}
              bgColor="bg-white"
              textColor="black"
              left={-80}
            >
              <div className="mx-2 cursor-pointer">
                <img
                  src={moreIcon}
                  alt="moreIcon"
                  className="hover:-translate-y-[0.1rem] hover:scale-110 duration-300"
                />
              </div>
            </CustomToolTip>
          </div>
        );
      },
    }),
  ];
};
