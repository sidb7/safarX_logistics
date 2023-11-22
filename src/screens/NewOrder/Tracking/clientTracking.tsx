import { useEffect, useState } from "react";
import ClientIcon from "../../../assets/clientIcon.svg";
import InputBox from "../../../components/Input/index";
import instagramIcon from "../../../assets/instagramIcon.svg";
import facebook from "../../../assets/facebookIcon.svg";
import Star from "../../../assets/Comments.svg";
import DelhiveryIcon from "../../../assets/Delhivery_Logo_(2019) 2.svg";
import telephoneIcon from "../../../assets/telephoneIcon.svg";
import TrackingMenu from "../../../assets/trackingMenu.svg";
import DownwardArrow from "../../../assets/downwardArrow.svg";
import UpwardArrow from "../../../assets/AccordionUp.svg";
import Product from "../../../assets/layer.svg";
import GalleryIcon from "../../../assets/galleryIcon.svg";
import Location from "../../../assets/other.png";
import StarRating from "./starRating";
import RefreshIcon from "../../../assets/refreshIcon.svg";
import CopyIcon from "../../../assets/copy.svg";
import Stepper from "./clientStepper";
import TickLogo from "../../../assets/common/Tick.svg";
import Lock from "../../../assets/lock.svg";
import GreenTick from "../../../assets/greenTick.svg";
import { Spinner } from "../../../components/Spinner";
import { GET, POST } from "../../../utils/webService";
import { GET_CLIENTTRACKING_INFO } from "../../../utils/ApiUrls";
import CustomButton from "../../../components/Button";
import { toast } from "react-toastify";
import { convertEpochToDateTime } from "../../../utils/utility";
import { getQueryJson } from "../../../utils/utility";
import shipyaari from "../../../assets/Rectangle_Shipyaari.svg";

const Tracking = () => {
  let tracking = [
    {
      partner: {
        partnerIcon: DelhiveryIcon,
        partnerID: 0,
        etaDate: "18 Jun 2023",
        trackingID: "GYSH23678119",
        orderID: "GYSH23678119",
        status: "Booked",
        lastUpdated: "1 hr ago | 05 Jun 23 | Fri | 15:11:23",
        fromDate:
          "Vidyavihar Railway Station 19 Vidyavihar station skywalk Rajawad Colony. VidhyaVihar, Delhi, 288211",
        toDate:
          "12-A, 3rd Floor, Techniplex - II, Off Veer Savarkar Flyover, Goregaon (W), Mumbai – 400 062",
      },

      trackingDetails: [
        {
          date: "18 Jul, 2023",
          time: "11:00  am",
          heading: "Pick-up assigned",
          locationImage: Location,
          location: "Mumbai",
        },
        {
          date: "18 Jul, 2023",
          time: "15:20",
          heading: "Reached Warehouse",
          locationImage: Location,
          location: "Bhiwandi",
        },
        {
          date: "18 Jul, 2023",
          time: "15:20",
          heading: "Delivery assigned",
          locationImage: telephoneIcon,
          location: "+91 12345 12345",
        },
      ],
      productDetails: [
        {
          galleryImage: GalleryIcon,
          productheading: "Lev's V necked T-shirt",
          price: "500",
        },
        {
          galleryImage: GalleryIcon,
          productheading: "Lev's V necked T-shirt",
          price: "500",
        },
        {
          galleryImage: GalleryIcon,
          productheading: "Lev's V necked T-shirt",
          price: "500",
        },
        {
          galleryImage: GalleryIcon,
          productheading: "Lev's V necked T-shirt",
          price: "500",
        },
      ],
      orderDetails: [
        {
          buyersName: "Sandeep Kochar",
          phoneNumber: "+91 70*****90",
          invoice: "₹10,000",
          paymentMode: "Online",
        },
      ],
      isTrackingOpen: false,
      isProductItemsOpen: false,
    },
  ];

  const [trackingState, setTrackingState] = useState<any>([]);
  console.log("trackingdata1", trackingState[0]?.currentStatus);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [trackingNo, setTrackingNo] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [trackingDetails, setTrackingDetails] = useState<any>([]);

  console.log("trackingDetails", trackingDetails);

  const [cancelled, setCancelled] = useState<any>(false);
  const [timeDetails, setTimeDetails] = useState<any>({
    time: "",
    day: "",
    date: "",
    hours: "",
  });

  const params = getQueryJson();

  const trackingNoFromUrl = params?.trackingNo;

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
      isActive: true,
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
  const [tempSteps, setTempSteps] = useState<any>(steps);

  const toggleSection = (section: string) => {
    setOpenSection((prevOpenSection) =>
      prevOpenSection === section ? null : section
    );
  };

  function myStatus(status: any) {
    const statuses = {
      BOOKED: false,
      "IN TRANSIT": false,
      "OUT FOR DELIVERY": false,
      DELIVERED: false,
    };

    if (status === "BOOKED" || status === "NOT PICKED") {
      statuses.BOOKED = true;
    } else if (status === "IN TRANSIT") {
      statuses.BOOKED = true;
      statuses["IN TRANSIT"] = true;
    } else if (status === "OUT FOR DELIVERY") {
      statuses.BOOKED = true;
      statuses["IN TRANSIT"] = true;
      statuses["OUT FOR DELIVERY"] = true;
    } else if (status === "DELIVERED") {
      statuses.BOOKED = true;
      statuses["IN TRANSIT"] = true;
      statuses["OUT FOR DELIVERY"] = true;
      statuses["DELIVERED"] = true;
    } else {
      return null;
    }
    return statuses;
  }

  const getCurrentCycle = (status: any) => {
    const statuses = {
      BOOKED: false,
      "IN TRANSIT": false,
      "OUT FOR DELIVERY": false,
      DELIVERED: false,
    };

    if (status === "BOOKED" || status === "NOT PICKED") {
      statuses.BOOKED = true;

      tempSteps.map((el: any, i: number) => {
        if (el.label.toUpperCase() === status) {
          el.isActive = true;
          el.isCompleted = true;
          return el;
        }
      });
    } else if (status === "IN TRANSIT" || status === "OUT FOR DELIVERY") {
      statuses.BOOKED = true;
      statuses["IN TRANSIT"] = true;
      tempSteps.map((el: any, i: number) => {
        if (
          el.label.toUpperCase() === status ||
          "OUT FOR DELIVERY" === status
        ) {
          el.isActive = true;
          el.isCompleted = true;
          return el;
        }
      });
    } else if (status === "OUT FOR DELIVERY" || status === "DELIVERED") {
      statuses.BOOKED = true;
      statuses["IN TRANSIT"] = true;
      statuses["OUT FOR DELIVERY"] = true;
      tempSteps.map((el: any, i: number) => {
        if (el.label.toUpperCase() === status) {
          el.isActive = true;
          el.isCompleted = true;
          return el;
        }
      });
    } else if (status === "DELIVERED") {
      statuses.BOOKED = true;
      statuses["IN TRANSIT"] = true;
      statuses["OUT FOR DELIVERY"] = true;
      statuses["DELIVERED"] = true;

      tempSteps.map((el: any, i: number) => {
        if (el.label.toUpperCase() === status) {
          el.isActive = true;
          el.isCompleted = true;
          return el;
        }
      });
    } else {
      return null;
    }

    // setStatus([])

    return statuses;
  };

  const getTimeDetails = (trackingInfo: any) => {
    const dateAndTimings = JSON.parse(trackingInfo[0]?.processedLog);
    // console.log("parsedData", dateAndTimings)
    console.log("dateAndTimings12345", dateAndTimings);
    setTrackingDetails(dateAndTimings);

    let checkDate = convertEpochToDateTime(dateAndTimings.LastUpdatedAt);

    let date: any = new Date(checkDate);

    let [day, dateAndTime] = date.toUTCString().split(",");

    /**this is day */
    day = day;

    /**this is the date */
    const latestDate = dateAndTime.slice(1, 12);

    /**this is time */
    const time = dateAndTime.slice(12).trim().slice(0, -4);

    const timeAgo = (inputDate: any) => {
      const date = inputDate instanceof Date ? inputDate : new Date(inputDate);

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

    setTimeDetails({ time: time, date: latestDate, day: day, hours: hours });
  };

  const handleTrackOrderClick = async () => {
    let urlWithTrackingNo = "";

    if (!trackingNoFromUrl && !trackingNo) {
      return toast.warning("Please Enter Tracking Number");
    }

    try {
      setLoading(true);
      setTempSteps(steps);
      setCancelled(false);
      console.log("GET_CLIENTTRACKING_INFO", GET_CLIENTTRACKING_INFO);
      if (trackingNoFromUrl !== undefined && trackingNoFromUrl !== "") {
        urlWithTrackingNo = `${GET_CLIENTTRACKING_INFO}?trackingNo=${trackingNoFromUrl}`;
      } else {
        urlWithTrackingNo = `${GET_CLIENTTRACKING_INFO}?trackingNo=${trackingNo}`;
      }
      const { data: response } = await GET(urlWithTrackingNo);
      console.log(response?.data[0]?.trackingInfo[0]?.processedLog);
      if (response.success) {
        setTrackingState(response?.data[0]?.trackingInfo);
        getTimeDetails(response?.data[0]?.trackingInfo);

        const res: any = myStatus(
          response?.data[0].trackingInfo[0]?.currentStatus
        );

        let mysteps = tempSteps;

        Object.keys(res).forEach((status: any) => {
          mysteps.forEach((step: any, index: number) => {
            if (status === step?.value) {
              const stepCurrentStatus = res[status];
              mysteps[index].isCompleted = stepCurrentStatus;
            }
          });
        });

        setTempSteps([...mysteps]);
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

  // const InvalidTrackingListHover = (inValidTrackingState: any) => {
  //   return (
  //     <div className="max-w-[200px] h-fit">
  //       <div className="border-b  font-semibold py-1 my-2 ">
  //         INVALID TRACKING NUMBER
  //       </div>

  //       <div className="flex items-start max-w-[400px]">
  //         <span> The tracking IDs:</span>
  //         <div className="flex flex-wrap items-start">
  //           {inValidTrackingState?.map(
  //             (inValidTravkingNumber: any, index: any) => (
  //               <span
  //                 key={`${inValidTravkingNumber}_${index}`}
  //                 title={inValidTravkingNumber}
  //                 className="mx-1 max-w-[100px] font-semibold truncate"
  //               >
  //                 {inValidTravkingNumber}
  //               </span>
  //             )
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  console.log("trackingState", trackingState);

  const callFunction = async () => {
    await handleTrackOrderClick();
  };

  useEffect(() => {
    if (trackingNoFromUrl !== undefined && trackingNoFromUrl !== "") {
      setTrackingNo(trackingNoFromUrl);
      callFunction();
    }
  }, [trackingNoFromUrl]);

  return (
    <>
      <>
        <div className="mx-5">
          {/*shipyaari icon */}
          <div className="flex justify-center p-3">
            <img src={shipyaari} alt="Shipyaari" />
          </div>
          <div className=" flex flex-col lg:flex lg:justify-center lg:items-center gap-x-2">
            {/*tracking ID Box */}
            <div className="">
              <div className="flex items-center gap-x-5 w-full">
                <InputBox
                  label="Enter tracking ID"
                  value={trackingNo}
                  containerStyle="!mt-1"
                  onChange={(e) => setTrackingNo(e.target.value)}
                />
                <CustomButton
                  text="Track Order"
                  className="!ml-2 !w-1/2 md:!w-1/4 text-[15px] md:text-[18px] py-6 whitespace-nowrap"
                  onClick={() => handleTrackOrderClick()}
                />
              </div>

              <p className="text-[10px] py-2 font-Open font-bold">
                For multiple ID, type GYSH23678119, GYSH23678119, GYSH23678119
              </p>

              <div className="flex justify-between md:w-auto">
                {loading ? (
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Spinner />
                  </div>
                ) : (
                  <div className=" ">
                    {trackingState?.map((each: any, indexTracking: number) => {
                      return (
                        <div key={indexTracking}>
                          <div className=" border-[0.5px] border-[#A4A4A4] rounded-lg  mt-4">
                            <div className="border-l-[12px] md:border-l-[24px]  border-l-[#80A7FF] py-4 px-2 md:px-5 rounded-lg">
                              {/*delhivery details */}
                              <>
                                <div className="flex flex-col md:flex-row justify-between gap-y-1 md:gap-y-0">
                                  <img
                                    src={each?.logoUrl}
                                    alt=""
                                    className="w-20"
                                  />

                                  <div className="flex  md:flex-row gap-x-2 my-1 md:my-0">
                                    <p className="flex flex-col text-[12px] font-semibold font-Open leading-[16px] whitespace-nowrap flex md:items-center">
                                      Last Update:
                                      <div className="flex gap-x-1 md:ml-1 text-[12px] font-semibold font-Open leading-[16px] whitespace-nowrap flex items-center">
                                        <span>{timeDetails.hours + " |"}</span>
                                        <span>{timeDetails.date + " |"}</span>
                                        <span>{timeDetails.day + " |"}</span>
                                        <span>{timeDetails.time}</span>
                                      </div>
                                    </p>
                                    <img
                                      src={RefreshIcon}
                                      className="w-4 mt-3 md:mt-0"
                                    />
                                  </div>
                                </div>

                                <div className="flex justify-between pt-2">
                                  <div className="flex flex-col md:flex-row gap-y-1 md:gap-y-0 gap-x-4 md:items-end xl:pr-4">
                                    <p className="text-xs font-normal font-Open flex gap-x-1">
                                      Tracking ID:
                                      <span className="font-bold text-[#004EFF]">
                                        {each.awb}
                                      </span>
                                      <img src={CopyIcon} />
                                    </p>

                                    <p className="text-xs font-normal font-Open flex gap-x-1">
                                      Order ID:
                                      <span className="font-bold text-[#004EFF]">
                                        {each?.orderId}
                                      </span>
                                      <img src={CopyIcon} />
                                    </p>
                                    <p className="text-xs font-Open font-normal md:pt-2">
                                      ETA:
                                      <span className="font-bold">
                                        {
                                          each?.expectedDelivery
                                            ?.currentDelivery
                                        }
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-col md:flex-row">
                                  <div className="max-w-[300px] mt-2 pr-4">
                                    <p className="text-[14px] font-normal leading-[16px] ">
                                      From:
                                    </p>
                                    <p className="text-[12px] font-normal leading-[16px] mt-1">
                                      {each.pickupAddress.fullAddress}
                                    </p>
                                  </div>
                                  <div className="max-w-[300] mt-2 pl-0 md:pl-4">
                                    <p className="text-[14px] font-normal leading-[16px]">
                                      To:
                                    </p>
                                    <p className="w-[290px] md:w-[300px] text-[12px] font-normal leading-[16px] mt-1">
                                      {each.deliveryAddress.fullAddress}
                                    </p>
                                  </div>
                                </div>
                                {each?.currentStatus === "CANCELLED" ? (
                                  <div className="mt-4 flex justify-center text-white bg-[#80A7FF]  rounded-lg absoute top-10">
                                    <p>Cancelled Order</p>
                                  </div>
                                ) : (
                                  <></>
                                )}
                                <div
                                  className={`mt-6 ${
                                    each?.currentStatus === "CANCELLED"
                                      ? "blur-sm"
                                      : ""
                                  }`}
                                >
                                  <Stepper steps={tempSteps} />
                                </div>

                                {/*tracking details */}
                                <div className="py-3">
                                  <hr />
                                </div>
                                {/*tracking cycle details*/}
                                <div
                                  className="w-[280px] md:w-full flex justify-between cursor-pointer"
                                  // onClick={() => setOpenTracking(!openTracking)}
                                  onClick={() => toggleSection("tracking")}
                                >
                                  <div className="flex gap-x-1 ">
                                    <img src={TrackingMenu} alt="" />
                                    <p className="text-sm font-Open font-semibold">
                                      Tracking Cycle Details
                                    </p>
                                  </div>

                                  <img
                                    src={
                                      openSection === "tracking"
                                        ? UpwardArrow
                                        : DownwardArrow
                                    }
                                    alt=""
                                  />
                                </div>

                                <div
                                  className={`${
                                    openSection === "tracking"
                                      ? "max-h-[500px] overflow-y-scroll"
                                      : ""
                                  }`}
                                >
                                  {true &&
                                    trackingDetails.Scans?.reverse()?.map(
                                      (each: any, index: number) => {
                                        console.log("each", each);

                                        return (
                                          <div
                                            className="flex gap-x-5 mt-1 h-16 relative  overflow-y-scroll"
                                            key={index}
                                          >
                                            <div className="pt-1">
                                              <p className="text-xs font-Open font-normal">
                                                {`${each?.time.split(" ")[0]} `}
                                              </p>
                                              <p className="text-xs font-Open font-normal">
                                                {`${each?.time.split(" ")[1]} `}
                                              </p>
                                            </div>
                                            <div className="border-l-4 border-l-[#80A7FF] pl-5 border-dotted pt-1">
                                              <p className="text-xs font-Open font-normal w-[150px] md:w-full overflow-x-scroll whitespace-nowrap">
                                                {each?.message}
                                              </p>
                                              <p className="text-xs font-Open  font-normal mt-1 w-[150px] md:w-full overflow-x-scroll whitespace-nowrap">
                                                {each?.status}
                                              </p>
                                              <div className="flex pt-1 gap-x-2 mt-1">
                                                <img
                                                  src={Location}
                                                  alt=""
                                                  className="w-4 h- 4"
                                                />
                                                <p className="text-xs font-Open font-normal w-[150px] md:w-full overflow-x-scroll whitespace-nowrap">
                                                  {each?.location}
                                                </p>
                                              </div>
                                              <div className="w-2 h-2 bg-[#80A7FF] rounded-full absolute top-5 left-[86px]"></div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                </div>
                                <div className="py-3">
                                  <hr />
                                </div>
                                <div
                                  className="flex justify-between cursor-pointer w-[280px] md:w-full"
                                  onClick={() => toggleSection("product")}
                                >
                                  <div className="flex gap-x-1 ">
                                    <img src={Product} alt="" />
                                    <p className="text-sm font-Open font-semibold">
                                      Order Details
                                    </p>
                                  </div>
                                  {openSection === "product" ? (
                                    <div className="flex gap-x-1 flex items-center">
                                      <img src={GreenTick} />
                                      <p className="text-[12px] font-normal whitespace-nowrap mt-1 text-[#7CCA62]">
                                        Verified
                                      </p>

                                      <img
                                        src={
                                          openSection === "product"
                                            ? UpwardArrow
                                            : DownwardArrow
                                        }
                                        alt=""
                                      />
                                    </div>
                                  ) : (
                                    <div className="flex gap-x-1 flex items-center">
                                      <img src={Lock} />
                                      <p className="text-[12px] font-normal whitespace-nowrap mt-1 hidden md:block">
                                        To see details please verify with OTP
                                      </p>

                                      <img
                                        src={
                                          openSection === "product"
                                            ? UpwardArrow
                                            : DownwardArrow
                                        }
                                        alt=""
                                      />
                                    </div>
                                  )}
                                </div>
                                <div>
                                  {openSection === "product" && (
                                    <>
                                      <div className="flex flex-col md:flex-row w-full mt-2 gap-x-5">
                                        <div className="border-r-2 border-[#D9DBDD] pr-6">
                                          <p className="text-[#777777] text-[12px] font-normal leading-5">
                                            Buyer's Name
                                          </p>
                                          <p className="whitespace-nowrap font-normal font-sans text-[14px] leading-5">
                                            {each?.pickupAddress?.contact?.name}
                                          </p>
                                        </div>
                                        <div className="border-r-2 border-[#D9DBDD] pr-6">
                                          <p className="text-[#777777] text-[12px] font-normal leading-5">
                                            Phone Number
                                          </p>
                                          <p className="whitespace-nowrap font-normal font-sans text-[14px] leading-5">
                                            {
                                              each?.pickupAddress?.contact
                                                ?.mobileNo
                                            }
                                          </p>
                                        </div>
                                        <div className="border-r-2 border-[#D9DBDD] pr-6">
                                          <p className="text-[#777777] text-[12px] font-normal leading-5">
                                            Invoice
                                          </p>
                                          <p className="whitespace-nowrap font-normal font-sans text-[14px] leading-5">
                                            {each?.codInfo?.invoiceValue}
                                          </p>
                                        </div>
                                        <div className="">
                                          <p className="text-[#777777] text-[12px] font-normal leading-5">
                                            Payment Mode
                                          </p>
                                          <p className="whitespace-nowrap font-normal font-sans text-[14px] leading-5">
                                            {each?.codInfo?.isCod === "false"
                                              ? "COD"
                                              : "Online"}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="mt-2 ">
                                        <p className="text-[#777777] text-[12px] font-normal leading-5">
                                          Address
                                        </p>
                                        <p className=" font-normal font-sans text-[11px] md:text-[14px] leading-5 max-w-[900px] mt-1  w-[280px] md:w-full">
                                          {each?.pickupAddress?.fullAddress}
                                        </p>
                                      </div>
                                      <p className="mt-4 leading-4 font-normal text-[12px] font-medium">
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
                                    openSection === "product"
                                      ? "grid grid-cols-2 mt-4 gap-y-5 gap-x-4"
                                      : "grid grid-cols-2 "
                                  }
                                >
                                  {/*mapping product details */}

                                  {openSection === "product" &&
                                    each?.boxInfo[0]?.products?.map(
                                      (each: any, index: number) => {
                                        return (
                                          <>
                                            <div
                                              key={index}
                                              className="flex gap-x-2 border-[1.5px] border-[#E8E8E8] px-2 py-3 h-16 rounded-lg "
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
                                                  ₹ {each?.unitPrice}
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
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Tracking;
