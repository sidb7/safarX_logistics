import CustomButton from "../../components/Button";
import AddOrderIcon from "../../assets/Order/AddOrder.svg";
import BlukOrderIcon from "../../assets/Order/BlukOrderIcon.svg";
import { OrderStatus } from "./OrderStatus";
import DeliveryGIF from "../../assets/OrderCard/Gif.png";
import { CustomTable } from "../../components/Table";
import { useEffect, useState } from "react";
import Stepper from "./Stepper";
import "../../styles/silkStyle.css";
import DeliveryIcon from "../../assets/Delivery.svg";
import {
  columnHelperForNewOrder,
  ColumnHelperForBookedAndReadyToPicked,
  columnHelpersForRest,
} from "./ColumnHelpers";
import { useMediaQuery } from "react-responsive";
import { ResponsiveState } from "../../utils/responsiveState";
import { POST } from "../../utils/webService";
import {
  CANCEL_TEMP_SELLER_ORDER,
  CANCEL_WAY_BILL,
  GET_SELLER_ORDER,
  SELLER_WEB_URL,
} from "../../utils/ApiUrls";

import trackingIcon from "../../assets/trackingShipyaariIcon.jpg";
import trackingIcon2 from "../../assets/trackingShipyaari2.svg";
import instagramIcon from "../../assets/instagramIcon.svg";
import facebook from "../../assets/facebookIcon.svg";
import Star from "../../assets/Comments.svg";
import bookedIcon from "../../assets/Transaction/bookedIcon.svg";
import DelhiveryIcon from "../../assets/Delhivery_Logo_(2019) 2.svg";
import telephoneIcon from "../../assets/telephoneIcon.svg";
import TrackingMenu from "../../assets/trackingMenu.svg";
import DownwardArrow from "../../assets/downwardArrow.svg";
import UpwardArrow from "../../assets/AccordionUp.svg";
import Product from "../../assets/layer.svg";
import GalleryIcon from "../../assets/galleryIcon.svg";

import redirectIcon from "../../assets/redirect.svg";
import MoreIcon from "../../assets/more.svg";
import DimensionIcon from "../../assets/3d-cube-scan.svg";
import SkuBoxIcon from "../../assets/DeliveryOder.svg";
import BoxSearchIcon from "../../assets/box-search.svg";
import orderBox from "../../assets/Delivery Icon.svg";
import DelivertTruckIcon from "../../assets/group.svg";
import Location from "../../assets/Location.svg";
import TaskSquare from "../../assets/task-square.svg";
import profileIcon from "../../assets/Contact.svg";
import TelePhoneIcon from "../../assets/telephoneIcon.svg";
import ShareIcon from "../../assets/16.svg";
import TickLogo from "../../assets/tick.gif";
import { Tooltip } from "react-tooltip";
import { capitalizeFirstLetter } from "../../utils/utility";
import { date_DD_MMM } from "../../utils/dateFormater";
import { Tooltip as CustomToolTip } from "../../components/Tooltip/Tooltip";
import blueCar from "../../assets/blueCar.svg";
import infoRedCircleIcon from "../../assets/info-circle-outline.svg";

function OrderCard({ data, currentStatus, orderActions }: any) {
  const { status, codInfo, boxInfo, service, pickupAddress, deliveryAddress } =
    data;

  const [openSection, setOpenSection] = useState<any>(false);
  const [cartData, setcartData] = useState<any>({
    latestStatus: "",
    statusTimeStamp: 0,
  });

  const statusTime: any = {
    DRAFT: { title: "Order Placed :" },
    BOOKED: { title: "Pick Up Expected :" },
    "READY TO PICKUP": { title: "Pick Up Expected :" },
    "PICKED UP": { title: "ETA" },
    "IN TRANSIT": { title: "ETA" },
    "OUT FOR DELIVERY": { title: "ETA" },
    DELIVERED: { title: "ETA" },
    CANCELLED: { title: "ETA", icon: "blueCar" },
  };

  const getStatusTimeStampTitle = () => {};

  const steps = [
    {
      label: "Picked",
      isCompleted: true,
      isActive: false,
      imgSrc: TickLogo,
      timeStatus: "03 Jun ",
    },
    {
      label: "In Transit",
      isCompleted: false,
      isActive: true,
      imgSrc: TickLogo,
      timeStatus: "01 Jun | 16:32:46",
    },
    {
      label: "Out For Delivery",
      isCompleted: false,
      isActive: false,
      imgSrc: TickLogo,
      timeStatus: "",
    },
    {
      label: "Delivered",
      isCompleted: false,
      isActive: false,
      imgSrc: TickLogo,
      timeStatus: "",
    },
  ];

  const moreDropDown = (
    currentStatus?: any,
    orderActions?: any,
    data?: any
  ) => {
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
        awb: [data?.awb],
        fileUrl: labelUrl,
        taxInvoiceUrl: taxInvoiceUrl,
      };
    }

    const actionsObject: any = {
      DRAFT: [{ title: "Delete Order", actionType: "delete" }],
      BOOKED: [
        { title: "Track Order", actionType: "track_order" },
        { title: "Download Label", actionType: "download_label" },
        { title: "Download Invoice", actionType: "download_invoice" },
        { title: "Cancel Order", actionType: "cancel_order" },
      ],
      CANCELLED: [
        { title: "Track Order", actionType: "track_order" },
        { title: "Download Label", actionType: "download_label" },
        { title: "Download Invoice", actionType: "download_invoice" },
      ],
      "READY TO PICK": [
        { title: "Track Order", actionType: "track_order" },
        { title: "Download Label", actionType: "download_label" },
        { title: "Download Invoice", actionType: "download_invoice" },
      ],
      "IN TRANSIT": [
        { title: "Track Order", actionType: "track_order" },
        { title: "Download Label", actionType: "download_label" },
        { title: "Download Invoice", actionType: "download_invoice" },
      ],
      "OUT OF DELIVERY": [
        { title: "Track Order", actionType: "track_order" },
        { title: "Download Label", actionType: "download_label" },
        { title: "Download Invoice", actionType: "download_invoice" },
      ],
      DELIVERED: [
        { title: "Track Order", actionType: "track_order" },
        { title: "Download Label", actionType: "download_label" },
        { title: "Download Invoice", actionType: "download_invoice" },
      ],
      RETURN: [
        { title: "Track Order", actionType: "track_order" },
        { title: "Download Label", actionType: "download_label" },
        { title: "Download Invoice", actionType: "download_invoice" },
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

    //bg-[#E5E7EB]

    return (
      <div className=" min-w-[150px] rounded-md ">
        {actionsObject[currentStatus]?.map((action: any, index: any) => (
          <>
            {action?.actionType === "download_label" ? (
              <div
                className=" text-[14px] flex p-3 items-center"
                key={`${index}_${action}`}
                onClick={() =>
                  actionClickHandler(
                    payLoad,
                    action.actionType,
                    currentStatus,
                    data
                  )
                }
              >
                {fileUrl !== "" ? action?.title : "No Label Found"}
              </div>
            ) : (
              <div
                className="text-[14px] flex p-3 items-center"
                key={`${index}_${action}`}
                onClick={() =>
                  actionClickHandler(
                    payLoad,
                    action.actionType,
                    currentStatus,
                    data
                  )
                }
              >
                {action?.title}
              </div>
            )}
          </>
        ))}
      </div>
    );
  };

  useEffect(() => {
    setcartData({
      status: {
        latestStatus: status?.[status?.length - 1]?.currentStatus || "DRAFT",
        statusTimeStamp: status?.[data?.status?.length - 1]?.timeStamp,
        note: status?.[data?.status?.length - 1]?.notes,
      },
      invoiceValue: codInfo?.invoiceValue,
      productName: boxInfo?.[0]?.products.map((data: any) => data.name),
      awb: data?.awb,
      dimensions: `${boxInfo?.[0]?.length}cm  X  ${boxInfo?.[0]?.breadth}cm  X  ${boxInfo?.[0]?.height}cm`,
      shipyaariId: data?.tempOrderId,
      orderId: data?.orderId,
      partnerName: service?.partnerName,
      pickupAddress: pickupAddress?.fullAddress,
      deliveryAddress: deliveryAddress?.fullAddress,
    });
  }, [data]);

  return (
    <div className="my-8 ">
      <div className="shadow-md border-[0.5px] border-[#e9e8e8] rounded-lg">
        <div className="relative py-4 px-3 rounded-lg">
          <div
            className={`absolute top-[-15px] left-6 inline-flex items-center justify-center gap-x-1 rounded-md ${
              cartData?.status?.latestStatus === "FAILED"
                ? " bg-[#FEEEEB] border-[0.5px] border-[#F35838]"
                : " bg-[#F2FAEF] border-[0.5px] border-[#9af17d]"
            }  px-3 py-[6px]`}
          >
            <img
              src={
                cartData?.status?.latestStatus === "FAILED"
                  ? infoRedCircleIcon
                  : bookedIcon
              }
              alt=""
              className="w-4"
            />
            <span
              className={`text-xs font-semibold rounded ${
                cartData?.status?.latestStatus === "FAILED"
                  ? "text-[#F35838]"
                  : "text-[#7CCA62]"
              } text-[#7CCA62] items-center`}
            >
              {capitalizeFirstLetter(cartData?.status?.latestStatus)}
            </span>
          </div>

          <div className="">
            <div className="mt-3 mb-2 flex items-center justify-between">
              <div className="text-[#004EFF] flex items-center justify-center  text-[12px]">
                {cartData?.status?.latestStatus === "CANCELLED" && (
                  <img src={blueCar} alt="" className="mr-2 w-[22px]" />
                )}
                <div className="flex items-center text-[14px]">
                  <div className="mr-1 ">
                    {statusTime[cartData?.status?.latestStatus]?.title}{" "}
                  </div>
                  <div>
                    {date_DD_MMM(
                      cartData?.status?.statusTimeStamp
                        ? cartData?.status?.statusTimeStamp
                        : 1700830030191
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center text-[14px]">
                <div> ₹ {cartData?.invoiceValue} </div>
                <div className="ml-2 text-[#004EFF]">
                  <span>
                    {codInfo ? (codInfo?.isCod ? "COD" : "PREPAID") : "-"}
                  </span>
                </div>
                <div
                  className="ml-2 cursor-pointer"
                  onClick={() => setOpenSection(!openSection)}
                >
                  <img
                    src={openSection ? UpwardArrow : DownwardArrow}
                    alt=""
                    data-tooltip-id="my-order-inline"
                    data-tooltip-content={
                      openSection
                        ? "Expand the order to view details of the order"
                        : ""
                    }
                  />

                  <Tooltip
                    id="my-order-inline"
                    style={{
                      backgroundColor: "bg-neutral-900",
                      color: "#FFFFFF",
                      // width: "fit-content",
                      fontSize: "14px",
                      lineHeight: "16px",
                      border: "1px solid white",
                      width: "max-w-[100%]",
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className={`${!cartData?.awb && "flex justify-between"} `}>
                <div className="text-[13px] font-medium">
                  {cartData?.productName?.join(" + ").toUpperCase()}
                </div>

                {cartData?.awb && (
                  <div
                    className={`text-[14px] my-1 flex ${
                      cartData?.awb && "flex justify-between"
                    } `}
                  >
                    <div>Tracking : {cartData?.awb}</div>
                    <div
                      className={`flex`}
                      onClick={() =>
                        window.open(
                          `${SELLER_WEB_URL}/shipyaari-tracking?trackingNo=${cartData?.awb}`,
                          "_blank"
                        )
                      }
                    >
                      <img src={redirectIcon} alt="" />
                    </div>
                  </div>
                )}

                {!cartData?.awb && !openSection && (
                  <div>
                    <CustomToolTip
                      position="left"
                      content={moreDropDown(
                        currentStatus,
                        orderActions,
                        data
                        // info?.row?.original
                      )}
                      showOnClick={true}
                      bgColor="bg-white"
                      textColor="black"
                    >
                      <div className="cursor-pointer">
                        <img
                          src={MoreIcon}
                          alt="moreIcon"
                          className="hover:-translate-y-[0.1rem] hover:scale-110 duration-300"
                        />
                      </div>
                    </CustomToolTip>
                  </div>
                )}
              </div>
              {openSection && (
                <>
                  {/* {(cartData?.latestStatus === "BOOKED" ||
                    "IN TRANSIT" ||
                    "DELIVERED") && (
                    <div className="mt-4">
                      <Stepper steps={steps} />
                    </div>
                  )} */}

                  <div className="my-4">
                    <div className=" my-1 flex text-[14px]">
                      <div className="flex w-fit">
                        <img src={DimensionIcon} alt="" className="w-[14px]" />
                        <div className="ml-2">Dimension :</div>
                      </div>
                      <div className="text-[14px] ml-2">
                        {cartData?.dimensions}
                      </div>
                    </div>

                    {/* <div className=" my-1 flex text-[12px]">
                      <div className="flex w-fit">
                        <img src={SkuBoxIcon} alt="" className="w-[14px]" />
                        <div className="ml-2">SKU :</div>
                      </div>
                      <div className="text-[12px] ml-2">{"ASDFGRE3533"}</div>
                    </div> */}

                    <div className=" my-1 flex text-[14px]">
                      <div className="flex w-fit">
                        <img src={BoxSearchIcon} alt="" className="w-[14px]" />
                        <div className="ml-2">Shipyaari ID :</div>
                      </div>
                      <div className="text-[14px] ml-2">
                        {cartData?.shipyaariId}
                      </div>
                    </div>

                    <div className=" my-1 flex text-[14px]">
                      <div className="flex w-fit">
                        <img src={orderBox} alt="" className="w-[14px]" />
                        <div className="ml-2">Order ID :</div>
                      </div>
                      <div className="text-[14px] ml-2">
                        {cartData?.orderId}
                      </div>
                    </div>

                    <div className=" my-1 flex text-[14px]">
                      <div className="flex w-fit">
                        <img
                          src={DelivertTruckIcon}
                          alt=""
                          className="w-[14px]"
                        />
                        <div className="ml-2">Delivery Partner :</div>
                      </div>
                      <div className="text-[14px] ml-2">
                        {cartData?.partnerName}
                      </div>
                    </div>
                  </div>

                  <div className="my-4">
                    <div className="text-[15px]">From</div>
                    <div className="flex flex-1 mt-1 text-[13px] ">
                      <img src={Location} alt="" className="w-[14px] h-4" />
                      <div className="ml-2 !w-[100%]">
                        {cartData?.pickupAddress}
                      </div>
                    </div>
                  </div>

                  <div className="my-4">
                    <div className="text-[15px]">To</div>
                    <div className="flex flex-1 mt-1 text-[13px] ">
                      <img src={Location} alt="" className="w-[14px] h-4" />
                      <div className="ml-2 !w-[100%]">
                        {cartData?.deliveryAddress}
                      </div>
                    </div>
                  </div>

                  {cartData?.status?.latestStatus === "FAILED" && (
                    <div className="mt-2">
                      <div className="flex items-center text-[16px]">
                        <img src={TaskSquare} alt="" className="w-[18px]" />
                        <div className="ml-2">Reason</div>
                      </div>
                      <div className="mt-2 text-[13px]">
                        <div className="ml-6">{cartData?.status?.note}</div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            {/* {currentStatus === "DRAFT" &&  &&  ( */}
            <div
              className={`mt-2 ${
                currentStatus === "DRAFT" && !openSection
                  ? "hidden"
                  : "flex justify-end"
              }`}
            >
              {/* <div className="">
                <button className="border  border-[#004EFF] text-[#004EFF] text-[12px] px-3 py-2 rounded">
                  General Tag
                </button>
                <button className="border ml-4 border-[#004EFF] text-[#004EFF] text-[12px] px-3 py-2 rounded">
                  Service Tag
                </button>
              </div> */}

              <div className="cursor-pointer">
                {/* <div className="flex gap-x-1">
                  <p className="text-sm text-[#004EFF] font-Open font-semibold">
                    RESCHEDULE
                  </p>
                </div> */}
                <CustomToolTip
                  position="left"
                  content={moreDropDown(
                    currentStatus,
                    orderActions,
                    data
                    // info?.row?.original
                  )}
                  showOnClick={true}
                  bgColor="bg-white"
                  textColor="black"
                >
                  <div className="cursor-pointer">
                    <img
                      src={MoreIcon}
                      alt="moreIcon"
                      className="hover:-translate-y-[0.1rem] hover:scale-110 duration-300"
                    />
                  </div>
                </CustomToolTip>
              </div>
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
