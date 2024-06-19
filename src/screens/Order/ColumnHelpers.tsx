import { createColumnHelper } from "@tanstack/react-table";
import CopyTooltip from "../../components/CopyToClipboard";
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
import { SELLER_WEB_URL } from "../../utils/ApiUrls";
import { useEffect, useRef } from "react";
import { Tooltip as CustomToolTip } from "../../components/Tooltip/Tooltip";
import moreIcon from "../../assets/more.svg";

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
    "READY TO PICK" ||
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
    ],
    CANCELLED: [
      { title: "Track Order", actionType: "track_order", icon: trackingIcon },
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
    ],
    "IN TRANSIT": [
      // { title: "Download Label", actionType: "download_label" },
      {
        title: "Download Invoice",
        actionType: "download_invoice",
        icon: frameIcon,
      },
      { title: "Track Order", actionType: "track_order", icon: trackingIcon },
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
    ],
    "OUT OF DELIVERY": [
      // { title: "Download Label", actionType: "download_label" },
      {
        title: "Download Invoice",
        actionType: "download_invoice",
        icon: frameIcon,
      },
      { title: "Track Order", actionType: "track_order", icon: trackingIcon },
    ],
    DELIVERED: [
      // { title: "Download Label", actionType: "download_label" },
      {
        title: "Download Invoice",
        actionType: "download_invoice",
        icon: frameIcon,
      },
      { title: "Track Order", actionType: "track_order", icon: trackingIcon },
    ],
    RETURN: [
      // { title: "Download Label", actionType: "download_label" },
      {
        title: "Download Invoice",
        actionType: "download_invoice",
        icon: frameIcon,
      },
      { title: "Track Order", actionType: "track_order", icon: trackingIcon },
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
        `${SELLER_WEB_URL}/shipyaari-tracking?trackingNo=${data?.awb}`,
        "_blank"
      );
    } else {
      orderActions(payLoad, actionType, currentStatus);
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
          <div className="flex justify-between">
            <h1>Pickup Address</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="text-base py-3">
            {capitalizeFirstLetter(
              info?.row?.original?.pickupAddress?.fullAddress
            ) ? (
              <>
                <div className="text-base">
                  {capitalizeFirstLetter(
                    info?.row?.original?.pickupAddress?.contact?.name
                  )}
                </div>
                <span>
                  {capitalizeFirstLetter(
                    info?.row?.original?.pickupAddress?.fullAddress
                  )}
                </span>
                <div className="text-base">
                  {info?.row?.original?.pickupAddress?.contact?.mobileNo}
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
          <div className="flex justify-between">
            <h1>Delivery Address</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="text-base py-3">
            {info?.row?.original?.deliveryAddress?.fullAddress ? (
              <>
                <div className="text-base ">
                  {capitalizeFirstLetter(
                    info?.row?.original?.deliveryAddress?.contact?.name
                  )}
                </div>
                <span>
                  {capitalizeFirstLetter(
                    info?.row?.original?.deliveryAddress?.fullAddress
                  )}
                </span>

                <div className="text-base">
                  {info?.row?.original?.deliveryAddress?.contact?.mobileNo}
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
          <div className="flex justify-between">
            <h1>Payment Mode</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { service, codInfo } = info?.row?.original;
        return (
          <>
            <div className="flex flex-col gap-y-1 text-base py-3">
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
  openRightModalForTracking?: any
) => [
  ColumnsHelper.accessor("IDs", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>IDs</h1>
        </div>
      );
    },
    cell: (info: any) => {
      const {
        tempOrderId,
        status = [],
        updatedAt,
        orderType,
        orderId,
        source,
        otherDetails,
        awb,
      } = info?.row?.original;
      // const AWB = otherDetails?.awbNo;

      const statusOnlyForBooked = status?.find(
        (item: any) => item.currentStatus === "BOOKED"
      );

      const timeStamp = statusOnlyForBooked.timeStamp;
      const time = timeStamp && date_DD_MMM_YYYY_HH_MM_SS(timeStamp);

      return (
        <div className="py-3">
          {tempOrderId && (
            <div className="">
              <span className="text-sm font-light">Shipyaari ID :</span>
              <div className="flex text-base items-center font-medium">
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
              <span className=" text-sm font-light">Order ID :</span>
              <div className=" flex text-base items-center font-medium">
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
            <span className=" text-sm font-light">Source :</span>
            <div className=" pl-2 text-base items-center font-medium capitalize">
              <span className="">
                {capitalizeFirstLetterWithExclude(source, excludeWords)}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <span className=" text-sm font-light">Order Type :</span>
            <div className=" pl-2 flex text-base items-center font-medium">
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
        <div className="flex justify-between">
          <h1>Status</h1>
        </div>
      );
    },
    cell: (info: any) => {
      const { status, awb, source, otherDetails } = info?.row?.original;
      const rowsData = info?.row?.original;
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
        "Shipyaari ID": rowsData?.tempOrderId,
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

      return (
        <div className="py-3">
          {
            <div className="flex flex-col gap-y-1">
              <div className="flex text-base items-center font-medium">
                <div
                  className="flex gap-x-1 items-center cursor-pointer hover:text-[#004EFF] transition duration-300"
                  onClick={handleInformativeModal}
                >
                  <div>
                    <p className="text-lg font-semibold ">
                      {capitalizeFirstLetter(renderStatus)}
                    </p>
                  </div>
                  {setInfoModalContent && (
                    <div
                      className="cursor-pointer  text-[#004EFF] hover:text-blue-700 transition duration-300"
                      onClick={handleInformativeModal}
                    >
                      <img src={InformativeIcon} alt="Info Icon" width="28px" />
                    </div>
                  )}
                </div>
              </div>
              <div>{time}</div>
            </div>
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
  setInfoModalContentFunction?: any
) => {
  // const handleDeleteModalDraftOrder = (payload: any) => {
  //   setDeleteModalDraftOrder({ isOpen: true, payload });
  // };

  return [
    ColumnsHelper.accessor("IDs", {
      header: (props) => {
        return (
          <div className="flex items-center">
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
        } = info?.row?.original;
        // const AWB = otherDetails?.awbNo
        let updatedAtStatus = 0;

        // console.log("Get Created AT: ", date_DD_MMM_YYYY_HH_MM_SS(createdAt));

        if (status?.length > 0) {
          updatedAtStatus = status[status.length - 1]?.timeStamp;
        }

        return (
          <div className="flex py-3">
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
                  <span className="text-sm font-light mr-1">
                    Shipyaari ID :
                  </span>
                  <div className="flex text-base items-center font-medium">
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
                  <span className=" text-sm font-light">Order ID :</span>
                  <div className=" flex text-base items-center font-medium">
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
                <span className="text-sm font-light mr-1">
                  Order Updated At :
                </span>
                <div className=" ">
                  <p className="text-sm font-medium">
                    {date_DD_MMM_YYYY_HH_MM_SS(
                      source === "SHOPIFY" ||
                        source === "WOOCOMMERCE" ||
                        source === "ZOHO"
                        ? createdAt
                        : updatedAtStatus || updatedAt
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center mt-1">
                <span className=" text-sm font-light">Source :</span>
                <div className=" pl-2 text-base items-center font-medium">
                  <span className="">
                    {capitalizeFirstLetterWithExclude(source, excludeWords)}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <span className=" text-sm font-light">Order Type :</span>
                <div className=" pl-2 flex text-base items-center font-medium">
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
          <div className="flex justify-between">
            <h1>Status</h1>
          </div>
        );
      },
      cell: (info: any) => {
        let rowData = info?.row?.original;
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
          "Shipyaari ID": rowsData?.tempOrderId,
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
        return (
          <div className="py-3">
            {
              <div className="flex flex-col gap-y-1">
                <div className="flex text-base items-center font-medium">
                  <div
                    className="flex gap-x-1 items-center cursor-pointer hover:text-[#004EFF] transition duration-300"
                    onClick={handleInformativeModal}
                  >
                    <div>
                      <p className="text-lg font-semibold ">
                        {latestStatus
                          ? capitalizeFirstLetter(latestStatus)
                          : "Draft"}
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
                          width="28px"
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
                <div>
                  {source === "SHOPIFY" ||
                  source === "WOOCOMMERCE" ||
                  source === "ZOHO"
                    ? date_DD_MMM_YYYY_HH_MM_SS(createdAt)
                    : time}
                </div>
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
          <div className="flex justify-between">
            <h1>Pickup Address</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="text-base py-3">
            {capitalizeFirstLetter(
              info?.row?.original?.pickupAddress?.fullAddress
            ) ? (
              <>
                <div className="text-base">
                  {capitalizeFirstLetter(
                    info?.row?.original?.pickupAddress?.contact?.name
                  )}
                </div>
                <span>
                  {capitalizeFirstLetter(
                    info?.row?.original?.pickupAddress?.fullAddress
                  )}
                </span>
                <div className="text-base">
                  {info?.row?.original?.pickupAddress?.contact?.mobileNo}
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
          <div className="flex justify-between">
            <h1>Delivery Address</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="text-base py-3">
            {info?.row?.original?.deliveryAddress?.fullAddress ? (
              <>
                <div className="text-base">
                  {capitalizeFirstLetter(
                    info?.row?.original?.deliveryAddress?.contact?.name
                  )}
                </div>
                <span>
                  {capitalizeFirstLetter(
                    info?.row?.original?.deliveryAddress?.fullAddress
                  )}
                </span>

                <div className="text-base">
                  {info?.row?.original?.deliveryAddress?.contact?.mobileNo}
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
          <div className="flex justify-between">
            <h1>Payment Mode</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { service, codInfo } = info?.row?.original;
        return (
          <>
            <div className="flex flex-col gap-y-1 text-base py-3">
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
          orderId,
          source,
        } = info?.row?.original;
        const { AWB } = status[0] ?? "";
        const copyString = `
          Order Id: ${orderId} 
          Shipyaari Id: ${tempOrderId}
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
  openRightModalForTracking?: any
) => {
  // const handleCancellationModal = (awbNo: any, orderId: any) => {
  //   setCancellationModal({ isOpen: true, awbNo, orderId });
  // };
  return [
    // ...commonColumnHelper,
    ColumnsHelper.accessor("Pick up Expected", {
      header: (props) => {
        return (
          <div className="flex items-center">
            <div className="flex justify-between mr-3 !my-[-10px] cursor-pointer">
              <PartialChecked
                checked={props.table?.getIsAllRowsSelected()}
                onChange={props?.table?.getToggleAllRowsSelectedHandler()}
                intermediate={props?.table?.getIsSomeRowsSelected()}
              />
            </div>
            <h1>Pickup Expected</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { pickupAddress, service, source, orderId, otherDetails, awb } =
          info?.row?.original;

        return (
          <div className="flex">
            <div className="flex justify-center mr-4 !my-[-12px] cursor-pointer">
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
              )}

              {source === "UNICOMMERCE" && (
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
                  {capitalizeFirstLetter(service?.partnerName)}
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
      openRightModalForTracking
    ),
    ...MainCommonHelper(),
    ColumnsHelper.accessor("asd", {
      header: () => {
        return (
          <div className="flex justify-between">
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
          Shipyaari Id: ${tempOrderId}
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
  openRightModalForTracking?: any
) => {
  return [
    // ...commonColumnHelper,
    ColumnsHelper.accessor("packageType", {
      header: (props) => {
        return (
          <div className="flex items-center">
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
          <div className="flex">
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
              )}

              {source === "UNICOMMERCE" && (
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
                  {capitalizeFirstLetter(service?.partnerName)}
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
      openRightModalForTracking
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
        } = info?.row?.original;
        let individualData: any = info?.row?.original;
        const { AWB } = status[0] ?? "";
        const copyString = `
          Order Id: ${tempOrderId} 
          Shipyaari Id: ${sellerId}
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

            <div>
              <img
                src={ReverseIcon}
                className="w-[18px] group-hover:flex cursor-pointer hover:-translate-y-[0.1rem] hover:scale-110 duration-300"
                onClick={() => setInfoReverseModalFunction(individualData?.awb)}
              />
            </div>

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
