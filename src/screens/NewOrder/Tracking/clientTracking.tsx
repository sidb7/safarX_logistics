import { useEffect, useMemo, useState } from "react";
import TrackingMenu from "../../../assets/trackingMenu.svg";
import DownwardArrow from "../../../assets/downwardArrow.svg";
import UpwardArrow from "../../../assets/AccordionUp.svg";
import Product from "../../../assets/layer.svg";
import Location from "../../../assets/other.png";
import Stepper from "./clientStepper";
import TickLogo from "../../../assets/common/Tick.svg";
import { Spinner } from "../../../components/Spinner";
import { GET, POST } from "../../../utils/webService";
import { GET_CLIENTTRACKING_INFO } from "../../../utils/ApiUrls";
import CustomButton from "../../../components/Button";
import { toast } from "react-hot-toast";
import { convertEpochToDateTime } from "../../../utils/utility";
import { getQueryJson } from "../../../utils/utility";
import shipyaari from "../../../assets/Rectangle_Shipyaari.svg";
import CopyTooltip from "../../../components/CopyToClipboard";
import CustomInputBox from "../../../components/Input/index";
import "./style.css";

const Tracking = () => {
  const [trackingState, setTrackingState] = useState<any>([]);

  const [openOrderDetails, setOpenOrderDetails] = useState<string | null>(null);

  const { trackingNo: trackingNoParams = "" } = getQueryJson();

  const [trackingNo, setTrackingNo] = useState<any>(trackingNoParams);
  const [loading, setLoading] = useState(false);
  const [trackingCycleDetails, setTrackingCycleDetails] = useState<any>([]);
  const [orderType, setOrderType] = useState<any>(false);
  const [rtoAwbNo, setRtoAwbNo] = useState<any>();
  const [cancelledOrder, setCancelledOrder] = useState<any>(false);
  const [lastUpdate, setLastUpdate] = useState<any>({
    time: "",
    day: "",
    date: "",
    hours: "",
  });

  const steps = [
    {
      label: "Order Created",
      isCompleted: true,
      value: "BOOKED",
      isActive: false,
      imgSrc: TickLogo,
      timeStatus: "01 Jun | 16:32:46",
    },
    {
      label: "In Transit",
      isCompleted: false,
      value: "IN TRANSIT",
      isActive: false,
      imgSrc: TickLogo,
      timeStatus: "01 Jun | 16:32:46",
    },
    {
      label: "Out For Delivery",
      value: "OUT FOR DELIVERY",

      isCompleted: false,
      isActive: false,
      imgSrc: TickLogo,
      timeStatus: "",
    },
    {
      label: "Delivered",
      isCompleted: false,
      isActive: false,
      value: "DELIVERED",
      imgSrc: TickLogo,
      timeStatus: "",
    },
  ];
  const [orderSteps, setOrderSteps] = useState<any>(steps);

  const toggleSectionOrderDetails = (section: string) => {
    setOpenOrderDetails((prevopenOrderDetails) =>
      prevopenOrderDetails === section ? null : section
    );
  };

  function orderStatus(status: any) {
    const statuses = {
      BOOKED: false,
      "IN TRANSIT": false,
      "OUT FOR DELIVERY": false,
      DELIVERED: false,
    };

    if (status === "BOOKED" || status === "NOT PICKED") {
      statuses.BOOKED = true;
    } else if (status === "IN TRANSIT" || status === "RTO IN TRANSIT") {
      statuses.BOOKED = true;
      statuses["IN TRANSIT"] = true;
    } else if (
      status === "OUT FOR DELIVERY" ||
      status === "RTO OUT FOR DELIVERY"
    ) {
      statuses.BOOKED = true;
      statuses["IN TRANSIT"] = true;
      statuses["OUT FOR DELIVERY"] = true;
    } else if (status === "DELIVERED" || status === "RTO DELIVERED") {
      statuses.BOOKED = true;
      statuses["IN TRANSIT"] = true;
      statuses["OUT FOR DELIVERY"] = true;
      statuses["DELIVERED"] = true;
    }
    return statuses;
  }

  const getlastUpdateTime = (trackingInfo: any) => {
    const { processedLog } = trackingInfo[0];
    if (processedLog.length > 0) {
      const processedLogFromAPI = processedLog?.[0];

      //setting to the state
      setTrackingCycleDetails(processedLogFromAPI);

      let checkDate = convertEpochToDateTime(
        processedLogFromAPI?.LastUpdatedAt
      );

      let date: any = new Date(checkDate);
      let [day, dateAndTime] = date.toUTCString().split(",");

      /**this is day */
      day = day;

      /**this is the date */
      const latestDate = dateAndTime.slice(1, 12);

      /**this is time */
      const time = dateAndTime.slice(12).trim().slice(0, -4);

      const timeAgo = (inputDate: any) => {
        const date =
          inputDate instanceof Date ? inputDate : new Date(inputDate);

        const FORMATTER: any = new Intl.RelativeTimeFormat("en");
        const RANGES: any = {
          years: 3600 * 24 * 365,
          months: 3600 * 24 * 30,
          weeks: 3600 * 24 * 7,
          days: 3600 * 24,
          hours: 3600,
          minutes: 60,
          seconds: 1,
        };

        const secondsElapsed = (date.getTime() - Date.now()) / 1000;

        for (let key in RANGES) {
          if (RANGES[key] < Math.abs(secondsElapsed)) {
            const delta = secondsElapsed / RANGES[key];
            return FORMATTER.format(Math.round(delta), key);
          }
        }
      };
      /**this is difference of time */
      const hours = timeAgo(date);

      setLastUpdate({ time: time, date: latestDate, day: day, hours: hours });
    } else {
      setLastUpdate({ time: "", date: "", day: "", hours: "" });
    }
  };

  const handleTrackOrderClick = async () => {
    try {
      if (trackingNo === "" || !trackingNo || !trackingNo.length) {
        setTrackingState([]);
        return toast.error("Please Enter Tracking Number");
      }
      setTrackingState([]);
      setLoading(true);
      setOrderSteps(steps);
      setCancelledOrder(false);
      const { data: response } = await GET(
        `${GET_CLIENTTRACKING_INFO}?trackingNo=${trackingNo}`
      );

      if (response.success) {
        window.history.replaceState(
          {},
          "",
          `/tracking?trackingNo=${trackingNo}`
        );

        const { trackingInfo } = response?.data[0];

        setTrackingState(response?.data[0]?.trackingInfo);
        getlastUpdateTime(response?.data[0]?.trackingInfo);
        const res: any = orderStatus(
          response?.data[0]?.trackingInfo[0]?.currentStatus
        );

        if (
          trackingInfo[0].hasOwnProperty("isRTO") &&
          trackingInfo[0]?.isRTO === true
        ) {
          setOrderType(true);
          setRtoAwbNo(trackingInfo[0]?.rtoInfo?.rtoAwb);
        } else {
          setOrderType(false);
          setRtoAwbNo("");
        }

        let trackingOrderSteps = orderSteps;

        Object.keys(res).forEach((status: any) => {
          trackingOrderSteps.forEach((step: any, index: number) => {
            if (status === step?.value) {
              const stepCurrentStatus = res[status];

              trackingOrderSteps[index].isCompleted =
                stepCurrentStatus || false;
            }
          });
        });
        setOrderSteps([...trackingOrderSteps]);
      } else {
        toast.error(response?.message);
        setTrackingState([]);
      }
    } catch (error: any) {
      console.error("Error in API call:", error);
    } finally {
      setLoading(false);
    }
  };

  const callTrackOrderFunction = async () => {
    await handleTrackOrderClick();
  };

  useEffect(() => {
    if (trackingNo) {
      callTrackOrderFunction();
    }
  }, []);

  const trackingCycleInformation = useMemo(() => {
    return trackingCycleDetails?.Scans?.map((each: any, index: number) => {
      return (
        <div className="flex gap-x-4  w-full " key={index}>
          <div className="font-bold pr-2 py-2 ">
            <p className="text-xs font-Open w-full ">
              {new Date(each?.time).toDateString().slice(3) || "-"}
            </p>
            <p className="text-xs font-Open">
              {new Date(each?.time).toLocaleTimeString() || "-"}
            </p>
          </div>
          <div className="relative border-l-[2px] mt-[2px]  border-l-[#80A7FF] border-dotted">
            <div className="w-3 h-3 bg-[#80A7FF] rounded-full absolute top-2 left-[-7px]"></div>
          </div>
          <div className="py-2">
            <div className="text-xs font-Open font-medium  md:w-full ">
              <p className="capitalize">{each?.message.toLowerCase()}</p>
            </div>
            <p className="text-xs py-1 font-Open  capitalize font-semibold   md:w-full  ">
              {each?.status.toLowerCase()}
            </p>
            <div className="flex gap-x-1">
              <img src={Location} alt="" className="w-4 h-4" />
              <p className="text-xs font-Open font-normal capitalize md:w-full  ">
                {each?.location.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      );
    });
  }, [trackingCycleDetails]);

  return (
    <>
      <>
        <div className="mx-5">
          {/*shipyaari icon */}
          <div className="flex  justify-center p-3">
            <img src={shipyaari} alt="Shipyaari" />
          </div>
          <div className="flex justify-center items-center py-4">
            <div className="w-[50rem]">
              <div className="flex md:justify-center w-full">
                <div className="w-full">
                  <div className="flex w-full">
                    <CustomInputBox
                      label="Enter tracking ID"
                      value={trackingNo}
                      containerStyle="!mt-1"
                      onChange={(e) => setTrackingNo(e.target.value)}
                    />
                    <CustomButton
                      text="Track Order"
                      className="!ml-2 !w-1/2 md:!w-1/4 text-[15px] md:text-[18px] py-6 whitespace-nowrap mt-1"
                      onClick={() => handleTrackOrderClick()}
                    />
                  </div>
                  <p className="text-[10px] py-2 font-Open font-bold">
                    For multiple ID, type GYSH23678119, GYSH23678119,
                    GYSH23678119
                  </p>
                </div>
              </div>

              <div className=" flex flex-col justify-center md:flex-row md:justify-center gap-x-2 w-full">
                {/*tracking ID Box */}
                <div className="w-full">
                  <div className="flex w-full">
                    {loading ? (
                      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Spinner />{" "}
                      </div>
                    ) : (
                      <div className="flex justify-center w-full">
                        <div className="w-full">
                          {trackingState?.map(
                            (each: any, indexTracking: number) => {
                              return (
                                <div key={indexTracking}>
                                  <div className="border-[0.5px] border-[#A4A4A4] rounded-lg  mt-4">
                                    <div className="border-l-[12px] md:border-l-[24px]  border-l-[#80A7FF] py-4 px-2 md:px-5 rounded-lg">
                                      {/*delhivery details */}
                                      <>
                                        <div className="flex flex-col md:flex-row justify-between gap-y-1 md:gap-y-0">
                                          <img
                                            src={each?.logoUrl}
                                            alt=""
                                            className="w-20"
                                          />
                                          {lastUpdate?.time === "" &&
                                          lastUpdate?.day === "" &&
                                          lastUpdate?.date === "" &&
                                          lastUpdate?.hours === "" ? (
                                            ""
                                          ) : (
                                            <div className="flex  md:flex-row gap-x-2 my-1 md:my-0">
                                              <p className="flex flex-col md:flex-row text-[12px] font-semibold font-Open leading-[16px] whitespace-nowrap  md:items-center">
                                                Last Update:
                                                <div className="flex gap-x-1 md:ml-1 text-[12px] font-semibold font-Open leading-[16px] whitespace-nowrap  items-center">
                                                  <span>
                                                    {lastUpdate.hours + " |"}
                                                  </span>
                                                  <span>{lastUpdate.date}</span>
                                                </div>
                                              </p>
                                            </div>
                                          )}
                                        </div>

                                        <div className="flex justify-between pt-2">
                                          <div className="flex flex-col md:flex-row gap-y-1 md:gap-y-0 gap-x-4 md:items-end xl:pr-4">
                                            <p className="text-xs font-normal font-Open flex gap-x-1">
                                              Tracking ID:
                                              <span className="font-bold text-[#004EFF]">
                                                {each?.awb}
                                              </span>
                                              <CopyTooltip
                                                stringToBeCopied={each?.awb}
                                              />
                                            </p>

                                            {orderType && (
                                              <div>
                                                <p className="text-xs font-Open font-normal md:pt-2">
                                                  RTO AWB:
                                                  <span className="text-[#004EFF] text-xs font-Open font-bold ml-1">
                                                    {rtoAwbNo}
                                                  </span>
                                                </p>
                                              </div>
                                            )}

                                            <p className="text-xs font-normal font-Open flex gap-x-1">
                                              Order ID:
                                              <span className="font-bold text-[#004EFF]">
                                                {each?.otherDetails?.orderNumber
                                                  ? each?.otherDetails
                                                      ?.orderNumber
                                                  : each?.orderId}
                                              </span>
                                              <CopyTooltip
                                                stringToBeCopied={each?.orderId}
                                              />
                                            </p>
                                            {each?.expectedDelivery
                                              ?.currentDelivery === "" ||
                                            each?.expectedDelivery
                                              ?.currentDelivery ===
                                              undefined ? (
                                              ""
                                            ) : (
                                              <p className="text-xs font-Open font-normal md:pt-2">
                                                ETA:
                                                <span className="font-bold pl-1">
                                                  {
                                                    each?.expectedDelivery
                                                      ?.currentDelivery
                                                  }
                                                </span>
                                              </p>
                                            )}
                                            {orderType && (
                                              <div>
                                                <p className="text-xs font-Open font-normal md:pt-2">
                                                  Order Type:
                                                  <span className="text-[#004EFF] text-xs font-Open font-bold ml-1">
                                                    RTO
                                                  </span>
                                                </p>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <div className="flex  flex-col md:flex-row md:gap-x-2 w-full">
                                          <div className="md:flex-1 mt-2">
                                            <p className="text-[14px] font-normal leading-[16px] ">
                                              From:
                                            </p>
                                            <p className="text-[12px] font-normal leading-[16px] mt-1  h-[50px] customScroll">
                                              {each?.pickupAddress?.fullAddress}
                                            </p>
                                          </div>
                                          <div className="md:flex-1 mt-2 ]">
                                            <p className="text-[14px] font-normal leading-[16px]">
                                              To:
                                            </p>
                                            <p className="text-[12px] font-normal leading-[16px] mt-1 h-[50px] customScroll">
                                              {
                                                each?.deliveryAddress
                                                  ?.fullAddress
                                              }
                                            </p>
                                          </div>
                                        </div>
                                        {each?.currentStatus ===
                                        "cancelledOrder" ? (
                                          <div className="mt-4 flex justify-center text-white bg-[#80A7FF]  rounded-lg absoute top-10">
                                            <p>cancelledOrder Order</p>
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                        <div
                                          className={`mt-6 ${
                                            each?.currentStatus ===
                                            "cancelledOrder"
                                              ? "blur-sm"
                                              : ""
                                          }`}
                                        >
                                          <Stepper steps={orderSteps} />
                                        </div>

                                        {/*tracking details */}
                                        <div className="py-3">
                                          <hr />
                                        </div>
                                        {/*tracking cycle details*/}
                                        <div
                                          className="w-[280px] md:w-full flex justify-between cursor-pointer"
                                          onClick={() =>
                                            toggleSectionOrderDetails(
                                              "tracking"
                                            )
                                          }
                                        >
                                          <div className="flex gap-x-1 ">
                                            <img src={TrackingMenu} alt="" />
                                            <p className="text-sm font-Open font-semibold">
                                              Tracking Cycle Details
                                            </p>
                                          </div>
                                        </div>

                                        <div
                                          className={`hover:bg-[#d2d2d225] transition-all shadow-none hover:shadow-inner max-h-[200px] customScroll my-2 py-2 px-4 rounded-lg`}
                                        >
                                          {trackingCycleInformation}
                                        </div>
                                        <div className="py-3">
                                          <hr />
                                        </div>
                                        <div
                                          className="flex justify-between cursor-pointer w-[280px] md:w-full"
                                          onClick={() =>
                                            toggleSectionOrderDetails("product")
                                          }
                                        >
                                          <div className="flex gap-x-1 ">
                                            <img src={Product} alt="" />
                                            <p className="text-sm font-Open font-semibold">
                                              Order Details
                                            </p>
                                          </div>
                                          {openOrderDetails === "product" ? (
                                            <div className="flex gap-x-1  items-center">
                                              <img
                                                src={
                                                  openOrderDetails === "product"
                                                    ? UpwardArrow
                                                    : DownwardArrow
                                                }
                                                alt=""
                                              />
                                            </div>
                                          ) : (
                                            <div className="flex gap-x-1  items-center">
                                              <img
                                                src={
                                                  openOrderDetails === "product"
                                                    ? UpwardArrow
                                                    : DownwardArrow
                                                }
                                                alt=""
                                              />
                                            </div>
                                          )}
                                        </div>
                                        <div>
                                          {openOrderDetails === "product" && (
                                            <>
                                              <div className="flex flex-col md:flex-row w-full mt-2 gap-x-5">
                                                <div className="border-r-2 border-[#D9DBDD] pr-6">
                                                  <p className="text-[#777777] text-[12px] font-normal leading-5">
                                                    Buyer's Name
                                                  </p>
                                                  <p className="whitespace-nowrap font-normal font-sans text-[14px] leading-5">
                                                    {
                                                      each?.pickupAddress
                                                        ?.contact?.name
                                                    }
                                                  </p>
                                                </div>
                                                <div className="border-r-2 border-[#D9DBDD] pr-6">
                                                  <p className="text-[#777777] text-[12px] font-normal leading-5">
                                                    Phone Number
                                                  </p>
                                                  <p className="whitespace-nowrap font-normal font-sans text-[14px] leading-5">
                                                    {
                                                      each?.pickupAddress
                                                        ?.contact?.mobileNo
                                                    }
                                                  </p>
                                                </div>
                                                <div className="border-r-2 border-[#D9DBDD] pr-6">
                                                  <p className="text-[#777777] text-[12px] font-normal leading-5">
                                                    Invoice
                                                  </p>
                                                  <p className="whitespace-nowrap font-normal font-sans text-[14px] leading-5">
                                                    {
                                                      each?.codInfo
                                                        ?.invoiceValue
                                                    }
                                                  </p>
                                                </div>
                                                <div className="">
                                                  <p className="text-[#777777] text-[12px] font-normal leading-5">
                                                    Payment Mode
                                                  </p>
                                                  <p className="whitespace-nowrap font-normal font-sans text-[14px] leading-5">
                                                    {each?.codInfo?.isCod
                                                      ? "COD"
                                                      : "Prepaid"}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="mt-2 ">
                                                <p className="text-[#777777] text-[12px] font-normal leading-5">
                                                  Address
                                                </p>
                                                <p className=" font-normal font-sans text-[11px] md:text-[14px] leading-5 w-[300px] md:w-[500px] lg:w-[600px] mt-1  ">
                                                  {
                                                    each?.pickupAddress
                                                      ?.fullAddress
                                                  }
                                                </p>
                                              </div>
                                              <p className="mt-4 leading-4  text-[12px] font-medium">
                                                Product Details
                                              </p>

                                              {each?.products?.map(
                                                (each: any, index: number) => {
                                                  return <>{each?.breadth}</>;
                                                }
                                              )}
                                            </>
                                          )}
                                        </div>
                                        <div
                                          className={
                                            openOrderDetails === "product"
                                              ? "grid grid-cols-2 mt-4 gap-y-5 gap-x-4"
                                              : "grid grid-cols-2 "
                                          }
                                        >
                                          {/*mapping product details */}

                                          {openOrderDetails === "product" &&
                                            each?.boxInfo?.[0]?.products?.map(
                                              (each: any, index: number) => {
                                                return (
                                                  <>
                                                    <div
                                                      key={index}
                                                      className="flex gap-x-2 border-[1.5px] border-[#E8E8E8] px-2 py-3 h-16 overflow-auto rounded-lg"
                                                    >
                                                      <img
                                                        src={each?.galleryImage}
                                                        alt=""
                                                      />
                                                      <div>
                                                        <p className="text-sm font-Open font-semibold">
                                                          {each?.name}
                                                        </p>

                                                        <p className="text-sm font-Open font-normal">
                                                          ₹{" "}
                                                          {(+each?.unitPrice.toFixed(
                                                            2
                                                          ) || 0) *
                                                            (+each?.qty || 0)}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </>
                                                );
                                              }
                                            )}
                                        </div>
                                      </>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Tracking;
