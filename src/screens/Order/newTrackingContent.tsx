import { Spinner } from "flowbite-react";
import React, { useEffect, useMemo, useState } from "react";
import WebCloseIcon from "../../assets/CloseIcon.svg";
import DeliveryIcon from "../../assets/Delivery Icon.svg";
import TrackingGif from "../../assets/Tracking .gif";
import Stepper from "../NewOrder/Tracking/clientStepper";
import TickLogo from "../../assets/common/Tick.svg";
import { GET_CLIENTTRACKING_INFO } from "../../utils/ApiUrls";
import { GET } from "../../utils/webService";
import toast from "react-hot-toast";
import {
  capitalizeFirstLetter,
  convertEpochToDateTime,
} from "../../utils/utility";
import NoDataFoundGif from "../../assets/NoDataFound.gif";
import Location from "../../assets/Location.svg";
import AccordianCloseIcon from "../../assets/AccordianCloseIcon.svg";
import AccordianOpenIcon from "../../assets/AccordianOpen.svg";
import RefreshIcon from "../../assets/RefreshIcon.svg";
import { isNumber } from "lodash";
interface INewTrackingContentProps {
  setOpenRightModalForTracking?: any;
  openRightModalForTracking?: any;
}

const NewTrackingContent: React.FunctionComponent<INewTrackingContentProps> = (
  props
) => {
  const { setOpenRightModalForTracking, openRightModalForTracking } = props;

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
  const [loading, setLoading] = useState<boolean>(false);
  const [trackingData, setTrackingData] = useState<any>([]);

  const [orderType, setOrderType] = useState<any>(false);
  const [rtoAwbNo, setRtoAwbNo] = useState<any>();
  const [lastUpdate, setLastUpdate] = useState<any>({
    time: "",
    day: "",
    date: "",
    hours: "",
  });
  const [trackingCycleDetails, setTrackingCycleDetails] = useState<any>([]);
  const [currentProductName, setCurrentProductName] = useState<any>("");
  const [edd, setEdd] = useState<any>();

  const [accordionOpen, setAccordionOpen] = useState<boolean[]>([]);

  // Function to toggle accordion state for a specific index
  const toggleAccordion = (index: number) => {
    setAccordionOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const shipmentStatusArr1 = [
    "Exception",
    "In Transit",
    "Not Picked",
    "Booked",
    "Out For Delivery",
    "Rto Delivered",
    "Rto In Transit",
    "Rto Out For Delivery",
    "Rto Exception",
    "Cancel Requested",
  ];
  const shipmentStatusArr2 = [
    "Hold",
    "Lost Damage",
    "Lost/damage",
    "Cancelled",
  ];
  const shipmentStatusArr3 = ["Delivered"];

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
      setTrackingCycleDetails([]);
    }
  };

  const productName = (products: any) => {
    const names = products?.map((item: any) => {
      return capitalizeFirstLetter(item?.name);
    });

    setCurrentProductName(names);
  };

  const getTrackingData = async () => {
    try {
      setLoading(true);

      const { data: response }: any = await GET(
        `${GET_CLIENTTRACKING_INFO}?trackingNo=${openRightModalForTracking?.awbNo}`
      );

      if (response?.success && response?.data[0]?.trackingInfo?.length > 0) {
        toast.success(response.message);
        setTrackingData(response?.data?.[0]?.trackingInfo?.[0]);
        //edd datatypes are different so based on data type of it
        if (isNumber(response?.data[0]?.trackingInfo[0]?.shipmentStatus?.EDD)) {
          const EDDtime = convertEpochToDateTime(
            response?.data[0]?.trackingInfo[0]?.shipmentStatus?.EDD
          );

          setEdd(EDDtime);
        } else {
          setEdd(response?.data[0]?.trackingInfo[0]?.shipmentStatus?.EDD);
        }

        getlastUpdateTime(response?.data[0]?.trackingInfo);
        productName(response?.data[0]?.trackingInfo?.[0]?.boxInfo[0]?.products);
        const { trackingInfo } = response?.data[0];
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
        setLoading(false);
      } else {
        // navigate("/weight-management/import-weight/upload-file");
        setLoading(false);
        toast.error(response?.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "-"; // Handling null or undefined timestamp

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return "-"; // Handling null or undefined timestamp

    const options: any = {
      hour: "numeric",
      minute: "numeric",
      hour12: false, // Use 24-hour format
    };

    return new Date(timestamp).toLocaleTimeString("en-US", options);
  };

  const trackingCycleInformation = useMemo(() => {
    return trackingCycleDetails.length === 0 ? (
      <div className="flex items-center text-center justify-center h-[calc(100vh-500px)]">
        <img
          src={NoDataFoundGif}
          alt="No Data Found"
          width={"100px"}
          height={"100px"}
        />
      </div>
    ) : (
      trackingCycleDetails?.Scans?.map((each: any, index: number) => {
        return (
          <div className="flex gap-x-5 gap-y-1 mb-1" key={index}>
            <div className="flex flex-col">
              <div className=" py-3 flex xl:whitespace-nowrap ">
                <p className="font-Open text-xs font-semibold leading-4">
                  {/* {new Date(each?.time).toDateString().slice(3) || "-"} */}
                  {formatDate(each?.time) || "-"} |
                  <span className="font-Open text-xs font-normal leading-4">
                    {/* {new Date(each?.time).toLocaleTimeString() || "-"} */}
                    {formatTime(each?.time) || "-"}
                  </span>
                </p>
              </div>

              <div>
                {shipmentStatusArr1.includes(
                  capitalizeFirstLetter(each?.status) || "N/A"
                ) ? (
                  <span className="border-[0.5px] border-[#F0A22E] bg-[#FDF6EA] text-[#F0A22E] text-[10px] font-normal leading-3 px-[4px] py-[6px]  xl:px-1 xl:py-[4px] rounded-sm  font-Open xl:text-xs xl:font-semibold xl:leading-4">
                    {capitalizeFirstLetter(each?.status) || "N/A"}
                  </span>
                ) : shipmentStatusArr2.includes(
                    capitalizeFirstLetter(each?.status) || "N/A"
                  ) ? (
                  <span className="border-[0.5px] border-[#F35838] bg-[#FEEEEB] text-[#F35838] text-[10px] font-normal leading-3 px-[4px] py-[6px]   xl:px-1 xl:py-[4px] rounded-sm  font-Open xl:text-xs xl:font-semibold xl:leading-4">
                    {capitalizeFirstLetter(each?.status) || "N/A"}
                  </span>
                ) : shipmentStatusArr3.includes(
                    capitalizeFirstLetter(each?.status) || "N/A"
                  ) ? (
                  <span className="border-[0.5px] border-[#7CCA62] bg-[#F2FAEF] text-[#7CCA62] text-[10px] font-normal leading-3 px-[4px] py-[6px]   xl:px-1 xl:py-[4px] rounded-sm  font-Open xl:text-xs xl:font-semibold xl:leading-4">
                    {capitalizeFirstLetter(each?.status) || "N/A"}
                  </span>
                ) : (
                  <span className="border-[0.5px] border-[#7CCA62] bg-[#F2FAEF] text-[#7CCA62] text-[10px] font-normal leading-3 px-[4px] py-[6px]   xl:px-1 xl:py-[4px] rounded-sm  font-Open xl:text-[10px] xl:font-normal">
                    {capitalizeFirstLetter(each?.status) || "N/A"}
                  </span>
                )}
              </div>
            </div>

            <div className="relative border-l-[2px] mt-[2px]  border-l-[#000000] border-dotted">
              <div
                className={`w-3 h-3 rounded-full absolute top-2 left-[-7px] ${
                  accordionOpen[index]
                    ? "bg-[#000000]"
                    : "bg-[#7CCA62] shadow-md "
                }`}
              ></div>
            </div>
            <div className="py-2 w-full">
              <div className="flex justify-between">
                <div className="">
                  <p
                    className={`${
                      accordionOpen[index] ? "text-[#004EFF]" : ""
                    } text-sm font-Open font-normal leading-5 pl-[3px]`}
                  >
                    {capitalizeFirstLetter(each?.status) || "N/A"}
                  </p>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => toggleAccordion(index)}
                >
                  <img
                    src={
                      accordionOpen[index]
                        ? AccordianOpenIcon
                        : AccordianCloseIcon
                    }
                    alt="accordion-icon"
                  />
                </div>
              </div>
              {accordionOpen[index] && (
                <div>
                  <div className="flex gap-x-1 py-[2px] items-center">
                    <img src={Location} alt="" className="w-4 h-4" />
                    <p className="text-xs font-Open font-normal leading-4 md:w-full  ">
                      {capitalizeFirstLetter(each?.location).replace(
                        /_/g,
                        " "
                      ) || "N/A"}
                    </p>
                  </div>

                  <div className=" md:w-full">
                    <p className="text-xs font-normal font-Open text-[#8D8D8D] leading-4 pl-[3px] pt-[6px]">
                      {capitalizeFirstLetter(each?.message).replace(/_/g, " ")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })
    );
  }, [trackingCycleDetails, accordionOpen]);

  useEffect(() => {
    if (
      openRightModalForTracking?.awbNo !== undefined &&
      openRightModalForTracking?.awbNo !== ""
    ) {
      getTrackingData();
    }
  }, [openRightModalForTracking?.awbNo]);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[800px]">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col ">
          <div className="flex flex-col ">
            <div className="flex items-center justify-between p-5 gap-y-5">
              <div className="flex gap-x-2">
                <p className="text-2xl font-Lato font-normal leading-8 text-[#1C1C1C]">
                  Activity Log
                </p>
              </div>
              <div>
                <img
                  src={WebCloseIcon}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => setOpenRightModalForTracking(false)}
                />
              </div>
            </div>
            <div className="bg-[#F6F6F6]">
              <div className="flex justify-between p-5">
                <div className="flex gap-x-2 ">
                  <div>
                    <img src={DeliveryIcon} alt="" />
                  </div>
                  <p className="xl:text-xl font-Lato xl:font-bold xl:leading-[26px] text-[#202427]">
                    Current Status
                  </p>
                </div>
                <div className="flex  md:flex-row gap-x-2 my-1 md:my-0">
                  <p className="flex flex-col md:flex-row text-[10px] font-normal font-Open leading-[16px] whitespace-nowrap  md:items-center">
                    Last Update:
                    {trackingCycleDetails.length === 0 ? (
                      <div className="flex gap-x-1 md:ml-1 text-[10px] font-semibold font-Open leading-[16px] whitespace-nowrap  items-center">
                        <span>
                          {formatDate(
                            convertEpochToDateTime(trackingData?.createdAt)
                          )}
                        </span>

                        <img
                          src={RefreshIcon}
                          alt=""
                          className="ml-2 cursor-pointer"
                          onClick={() => getTrackingData()}
                        />
                      </div>
                    ) : (
                      <div className="flex gap-x-1 md:ml-1 text-[10px] font-semibold font-Open leading-[16px] whitespace-nowrap  items-center">
                        <span>{lastUpdate.hours + " ,"}</span>
                        <span>{lastUpdate.date}</span>

                        <img
                          src={RefreshIcon}
                          alt=""
                          className="ml-2 cursor-pointer"
                          onClick={() => getTrackingData()}
                        />
                      </div>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex justify-between px-5">
                <div className="flex flex-col py-4 gap-y-5">
                  <div>
                    <p
                      className="text-base font-Open font-normal leading-[22px] overflow-hidden text-ellipsis whitespace-nowrap lg:w-[200px] xl:w-[350px]"
                      title={currentProductName}
                    >
                      {currentProductName || "N/A"}
                    </p>
                  </div>
                  <div className="flex lg:gap-12 xl:justify-between xl:mt-5">
                    <div>
                      <p className="font-Open text-xs font-normal leading-4">
                        Order ID:
                      </p>
                      <p className="font-Open text-sm font-semibold leading-5">
                        {trackingData?.orderId || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="font-Open text-xs font-normal leading-4">
                        Order Placed:
                      </p>
                      <p className="font-Open text-sm font-semibold leading-5">
                        {/* {lastUpdate.date || "N/A"} */}
                        {formatDate(
                          convertEpochToDateTime(trackingData?.createdAt)
                        ) || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    src={TrackingGif}
                    alt=""
                    width={"159.468px"}
                    height={"128px"}
                  />
                </div>
              </div>
              <div className="pt-4 pb-9">
                {/* {trackingData?.currentStatus === "CANCELLED" ||
                trackingData?.currentStatus === "CANCEL REQUESTED" ||
                "EXCEPTION" ? (
                  <div className=" items-center text-center border-[#F0A22E] h-[24px] bg-[#FDF6EA] text-[#F0A22E] text-[10px] font-normal leading-3s rounded-sm  font-Open xl:text-xs xl:font-semibold xl:leading-4 ">
                    <p>
                      {trackingData?.currentStatus === "CANCELLED" ||
                      trackingData?.currentStatus === "CANCEL REQUESTED"
                        ? "Cancelled Order"
                        : "Exception"}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                <div
                  className={` ${
                    trackingData?.currentStatus === "CANCELLED" ||
                    trackingData?.currentStatus === "CANCEL REQUESTED" ||
                    "EXCEPTION"
                      ? "blur-sm"
                      : ""
                  }`}
                >
                  <Stepper steps={orderSteps} />
                </div> */}
                <Stepper steps={orderSteps} />
              </div>
            </div>
          </div>
          <div className={` max-h-[500px] customScroll px-5 py-2`}>
            {trackingCycleInformation}
          </div>
        </div>
      )}
    </>
  );
};

export default NewTrackingContent;
