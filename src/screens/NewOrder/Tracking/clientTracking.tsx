import { useEffect, useRef, useState } from "react";
import TrackingMenu from "../../../assets/trackingMenu.svg";
import DownwardArrow from "../../../assets/downwardArrow.svg";
import UpwardArrow from "../../../assets/AccordionUp.svg";
import Product from "../../../assets/layer.svg";
import Location from "../../../assets/other.png";
import Stepper from "../Tracking/clientStepper";
import TickLogo from "../../../assets/common/Tick.svg";
import { Spinner } from "../../../components/Spinner";
import {
  COMPANY_NAME,
  GET_TRACKING_FOR_SYSTEM,
  LARGE_LOGO,
} from "../../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { convertEpochToDateTime } from "../../../utils/utility";
import { getQueryJson } from "../../../utils/utility";
import CopyTooltip from "../../../components/CopyToClipboard";
import CustomInputBox from "../../../components/Input/index";
import "./style.css";
import OneButton from "../../../components/Button/OneButton";
import TrackingIcon from "../../../assets/Track.svg";
import { ResponsiveState } from "../../../utils/responsiveState";
import { decryptData, inputRegexFilter } from "../../../utils/Helper/Filter";
import { PathFinder } from "../../../utils/Helper/PathFinder";
import RefreshIcon from "../../../assets/refreshIconNew.svg";
import "react-datepicker/dist/react-datepicker.css";
import "./datePicker.css";
import LoginModal from "./LoginModal";
import CancellationModal from "./CancellationModal";
import Rescheduling from "./ReschedulingModal";
import Powerbooster from "../../../assets/powerbooster.svg";
import { UPDATETRACKINGBYBUYER } from "../../../utils/ApiUrls";
// import { POST } from "../../../utils/webService";
import { GET, POST, POSTHEADER } from "../../../utils/webService";
import sessionManager from "../../../utils/sessionManager";
import { useParams, useSearchParams } from "react-router-dom";
import TrackOrderIdInput from "./ClientTracking/TrackOrderIdInput";

const Tracking = () => {
  const isMobileResponsive = ResponsiveState();
  //getting the path
  const currenturl = window.location.href;

  const [searchParams] = useSearchParams();
  const trackingNoParam: any = searchParams.get("trackingNo");
  const orderIdParam: any = searchParams.get("orderId");

  const [trackingState, setTrackingState] = useState<any[]>([]);
  const [openOrderDetails, setOpenOrderDetails] = useState<string | null>(null);

  const [trackingNo, setTrackingNo] = useState<any>(
    trackingNoParam || orderIdParam || ""
  );
  const [loading, setLoading] = useState(false);
  const [sellerId, setSellerId] = useState<any>();
  const [loggedIn, setLoggedIn] = useState<any>(false);
  const [buyerLoggedIn, setBuyerLoggedIn] = useState<any>(false);

  const [isMasked, setIsMasked] = useState<any>(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [cancellationModalOpen, setCancellationModalOpen] =
    useState<any>(false);
  const [reschedulingModal, setReschedulingModal] = useState<any>(false);
  const [selectedDate, setSelectedDate] = useState<any>();

  const [mobileNo, setMobileNo] = useState<any>();

  const [logginModal, setLogginModal] = useState<any>(false);
  const [altContactNo, setAltContactNo] = useState<any>(false);
  const [loginSuccess, setLoginSuccess] = useState<any>(false);
  const [viewProductAwbs, setViewProductAwbs] = useState<any>([]);

  const [mobileNumber, setMobileNumber] = useState({
    mobileNo: "",
  });
  const [mobileNoError, setMobileNoError] = useState<any>();
  const [verifyOtpState, setVerifyOtpState] = useState<any>(false);
  const [allAwbs, setAllAwbs]: any = useState([]);
  const [tab, setTab] = useState("TrackingId");
  const [token, setToken] = useState("");
  const [buyerMobileNo, setBuyerMobileNo] = useState("");
  const [awb, setAwb] = useState(trackingState?.[0]?.awb || "");

  const statusAliasMap: Record<string, string> = {
    "REACHED DESTINATION": "IN TRANSIT",
    // Add more if needed
  };
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (trackingNo != "") {
        if (e.key === "Enter" && buyerLoggedIn && tab == "OrderId") {
          handleTrackOrderByOrderId();
        }
        if (e.key === "Enter" && tab == "TrackingId") {
          handleTrackOrderClick();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [tab, buyerLoggedIn, trackingNo]);
  useEffect(() => {
    // let temp = JSON.parse(localStorage.getItem("userInfo") as any);
    const { sellerInfo } = sessionManager({});
    const buyerObj: any = sessionStorage.getItem("buyerJwt");
    const buyerJwt: any = JSON.parse(buyerObj);
    let sellerIdVar = sellerInfo?.sellerId;
    let temp = sellerInfo;
    // let privateCompanyId = JSON.parse(localStorage.getItem("userInfo") as any);
    const jwtToken =
      sellerInfo?.jwt || sellerInfo?.token || buyerJwt?.token || null;
    setToken(jwtToken);
    setBuyerMobileNo(buyerJwt?.mobileNo);

    if (temp) {
      setSellerId(sellerIdVar);
      setIsMasked(temp?.isMaskedUser);
    }
  }, []);
  useEffect(() => {
    if (token && sellerId) {
      setBuyerLoggedIn(true);
      setLoggedIn(true);
    }
    if (token && !sellerId) {
      setBuyerLoggedIn(true);
      setLoginSuccess(true);
    }
  }, [token, sellerId]);
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

  const handleOnchangeError = (value: any) => {
    if (value?.length === 10) {
      setMobileNoError("");
    } else {
      setMobileNoError("Invalid Mobile No");
    }
  };
  useEffect(() => {
    if (trackingNoParam) {
      handleTrackOrderClick();
    }
  }, trackingNoParam);
  useEffect(() => {
    if (orderIdParam) {
      setTab("OrderId");
      handleTrackOrderByOrderId();
    }
  }, orderIdParam);

  const handleTrackOrderClick = async () => {
    // if (!allAwbs.includes(trackingNo)) {
    //   checkAndRemoveToken(trackingNo);
    // }

    // const { sellerInfo } = sessionManager({});
    // const sellerId = sellerInfo?.sellerId;
    // setSellerId(sellerId);
    // getJwtTokenForUser(sellerId);

    setLoading(true);
    try {
      const response = await GET(
        `${GET_TRACKING_FOR_SYSTEM}?trackingNo=${trackingNo}`
      );
      if (!response?.data?.encryptedData) {
        throw new Error(response?.data?.message);
      }
      const data = decryptData(response?.data?.encryptedData);

      const trackingData = data?.data?.[0];
      const trackingInfo = trackingData?.trackingInfo ?? [];

      if (trackingInfo.length === 0) {
        setTrackingState([]);
        setAllAwbs([]);
        toast.error("No tracking data found");
        return;
      }

      // Call orderStatus for each currentStatus
      trackingInfo.forEach((item: any) => orderStatus(item?.currentStatus));

      // // Extract and set mobile number
      // const mobileNo = trackingInfo?.[0]?.deliveryAddress?.contact?.mobileNo;
      // if (mobileNo) setMobileNo(mobileNo);

      // Update URL without reloading
      window.history.replaceState({}, "", `/tracking?trackingNo=${trackingNo}`);

      // Update states
      setTrackingState(trackingInfo);
      setAwb(trackingInfo?.[0]?.awb);
      setVerifyOtpState(false);
      setAllAwbs((prev: any) => [...prev, trackingNo]);

      // Flatten logs if you need them later
      const flattenedLogs = trackingInfo.flatMap(
        (item: any) => item?.processedLog || []
      );
      // You can use flattenedLogs here if required
    } catch (error: any) {
      console.error("Tracking fetch error:", error);
      toast.error(error?.message || "Something went wrong");
      setTrackingNo([]);
      setTrackingState([]);
      setAllAwbs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrderByOrderId = async () => {
    setLoading(true);

    try {
      const { sellerInfo } = sessionManager({});
      const buyerObj: any = sessionStorage.getItem("buyerJwt");
      const buyerJwt: any = JSON.parse(buyerObj);

      const jwtToken =
        sellerInfo?.jwt || sellerInfo?.token || buyerJwt?.token || null;
      setBuyerMobileNo(buyerJwt?.mobileNo);
      const buyerJwtMobileNo = buyerMobileNo || buyerJwt?.mobileNo || "";
      const buyerToken = token || jwtToken || "";
      if (!buyerToken) {
        throw new Error("Authorization Token missing");
      }
      let headers = {
        Accept: "/",

        Authorization: `Bearer ${buyerToken}`,
      };
      const response = await GET(
        `${GET_TRACKING_FOR_SYSTEM}?orderId=${trackingNo}&mobileNo=${buyerJwtMobileNo}`,
        { headers }
      );
      if (!response?.data?.encryptedData) {
        throw new Error(response?.data?.message);
      }
      const data = decryptData(response?.data?.encryptedData);

      const trackingData = data?.data?.[0];
      const trackingInfo = trackingData?.trackingInfo ?? [];

      if (trackingInfo.length === 0) {
        setTrackingState([]);
        setAllAwbs([]);
        toast.error("No tracking data found");
        return;
      }

      // Call orderStatus for each currentStatus
      trackingInfo.forEach((item: any) => orderStatus(item?.currentStatus));

      // Update URL without reloading
      window.history.replaceState({}, "", `/tracking?orderId=${trackingNo}`);

      // Update states
      setTrackingState(trackingInfo);
      setVerifyOtpState(false);
      setAllAwbs((prev: any) => [...prev, trackingNo]);

      // You can use flattenedLogs here if required
    } catch (error: any) {
      console.error("Tracking fetch error:", error);
      toast.error(error?.message || "Something went wrong");
      sessionStorage.removeItem("buyerJwt");
      setTrackingNo([]);
      setTrackingState([]);
      setAllAwbs([]);
      setBuyerMobileNo("");

      setBuyerLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAccordionToggle = (indexTracking: number) => {
    // If the clicked accordion is already open, close it. Otherwise, open it.
    setOpenIndex((prevIndex) =>
      prevIndex === indexTracking ? null : indexTracking
    );
  };

  const handleUpdateAlternateNumber = async (awbParam: any) => {
    console.log("qwetyuio");
    const token1 = sessionStorage.getItem(`${awbParam}`);
    console.log("AWB:", awbParam);
    setAwb(awbParam);
    console.log("Retrieved Token:", token1);
    const buyerToken = token1 || token;
    if (!buyerToken) {
      console.error("Token not found in sessionStorage!");
      return;
    }

    try {
      const payload = {
        altno: mobileNumber?.mobileNo,
        rescheduleTime: "",
        buyerRemark: "Alternate Number Updation",
        requestType: "ALTMOBILENUMBER",
        awb: awbParam,
        mobileNo: buyerMobileNo || "",
      };

      setAltContactNo(true);

      console.log("payload", payload);

      const data = await POSTHEADER(UPDATETRACKINGBYBUYER, payload, {
        token: buyerToken,
      });
      console.log("asdghj", data);
      if (data?.data?.success) {
        toast.success(data?.data?.message);
      } else {
        console.log("datatrutyuty", data?.data?.message);
        toast.error(data?.data?.message);
        // if (data?.data?.message === "Please Provide Your Token") {
        //   window.location.reload();
        // }
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  const handleTab = (tab: any) => {
    setTab(tab);
    setTrackingNo([]);
    setTrackingState([]);
    setAllAwbs([]);
  };

  return (
    <>
      <div className="mx-5">
        {/*shipyaari icon */}
        <div className="flex  justify-center p-3">
          <img
            className="w-40 mt-10"
            src={LARGE_LOGO}
            alt={COMPANY_NAME || "Drivaa.Run"}
          />
        </div>
        <div className="flex justify-center items-center py-4">
          <div
            className={`${
              isMobileResponsive?.isMobileScreen ? "w-[340px]" : "w-[50rem]"
            }`}
          >
            {/* INPUT BOX*/}
            <div className=" w-full shadow-lg rounded-lg p-5 justify-center text-[14px] ">
              <div>
                <div className="flex justify-between font-Open  p-1 bg-slate-100 rounded-lg">
                  <div
                    className={`w-full text-center p-0.5 hover:cursor-pointer hover:shadow-sm ${
                      tab == "TrackingId" && "bg-white rounded-lg"
                    }`}
                    onClick={() => handleTab("TrackingId")}
                  >
                    Tracking ID
                  </div>
                  <div
                    className={`w-full text-center p-0.5 hover:cursor-pointer hover:shadow-sm  ${
                      tab == "OrderId" && "bg-white rounded-lg"
                    }`}
                    onClick={() => handleTab("OrderId")}
                  >
                    Order ID
                  </div>
                </div>
                <div className="my-3 text-[14px] font-semibold ">
                  Track Your Shipments
                </div>
              </div>
              <div className="w-full flex flex-col my-5 items-center">
                {tab == "TrackingId" ? (
                  <div className="flex flex-col w-full gap-4 md:flex-row md:items-center md:gap-5">
                    {/* Tracking ID Input */}
                    <div className="w-full">
                      <CustomInputBox
                        label="Tracking ID (e.g., GYSH23678119)"
                        value={trackingNo}
                        containerStyle="!rounded-lg"
                        className="!rounded-xl !h-10"
                        onChange={(e) => setTrackingNo(e.target.value)}
                      />
                    </div>

                    {/* Track Order Button */}

                    <div className="flex w-32 justify-center items-center">
                      {loading ? (
                        <Spinner className="!h-6 !w-6" />
                      ) : (
                        <div className="w-full md:w-auto z-10">
                          <OneButton
                            text={"Track Order"}
                            className={`w-full !rounded-xl border-2 py-2 px-2 md:w-auto
    ${
      trackingNo.length === 0
        ? "border-gray-300 !text-gray-400 bg-gray-100 cursor-not-allowed"
        : "border-[#160783] !text-[#160783] bg-transparent hover:bg-[#160783] hover:!text-white"
    }`}
                            onClick={() => handleTrackOrderClick()}
                            variant="primary"
                            showIcon={!!isMobileResponsive?.isMobileScreen}
                            icon={TrackingIcon}
                            disabled={trackingNo.length == 0}
                            iconClass="!w-5 !h-5 ml-2 mr-0"
                            backgroundColour="bg-transparent"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <TrackOrderIdInput
                    handleTrackOrderByOrderId={handleTrackOrderByOrderId}
                    setTrackingNo={setTrackingNo}
                    trackingNo={trackingNo}
                    buyerLoggedIn={buyerLoggedIn}
                    loading={loading}
                    token={token}
                    setToken={setToken}
                    buyerMobileNo={buyerMobileNo}
                    setBuyerMobileNo={setBuyerMobileNo}
                  />
                )}
              </div>
              <div className="py-2 text-[10px] text-gray-600 font-Open  lg:px-0">
                You can track multiple IDs at once by separating them with
                commas. Example: GYSH23678119, GYSH23678119, GYSH23678119
              </div>
            </div>

            <div className=" flex flex-col justify-center md:flex-row md:justify-center gap-x-2 w-full">
              {/*tracking ID Box */}
              <div className="w-full">
                <div className="flex w-full">
                  {
                    <div className="flex justify-center w-full">
                      <div className="w-full">
                        {trackingState?.map(
                          (each: any, indexTracking: number) => {
                            const edd =
                              each?.shipmentStatus?.EDD === "N/A" ||
                              each?.shipmentStatus?.EDD === "" ||
                              each?.shipmentStatus?.EDD === undefined ||
                              each?.shipmentStatus?.EDD === null
                                ? "NA"
                                : convertEpochToDateTime(
                                    each?.shipmentStatus?.EDD
                                  );
                            const dateOnly = edd.split(" ")[0];

                            let steps = [
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

                            let updatedSteps = steps.map((step) => {
                              if (
                                each?.currentStatus === "RTO DELIVERED" ||
                                each?.currentStatus === "RTO IN TRANSIT" ||
                                each?.currentStatus ===
                                  "RTO OUT FOR DELIVERY" ||
                                each?.currentStatus === "RTO ORDER CREATED"
                              ) {
                                return {
                                  ...step,
                                  label: `RTO ${step.label}`,
                                };
                              }

                              return step;
                            });

                            const effectiveStatus =
                              statusAliasMap[each?.currentStatus] ||
                              each?.currentStatus;

                            // let index = updatedSteps.findIndex((item) => {
                            //   //normal return
                            //   return (
                            //     item.value === each?.currentStatus ||
                            //     `RTO ${item.value}` === each?.currentStatus
                            //   );
                            // });

                            let index = updatedSteps.findIndex((item) => {
                              return (
                                item.value === effectiveStatus ||
                                `RTO ${item.value}` === effectiveStatus
                              );
                            });

                            for (let i = 0; i < updatedSteps?.length; i++) {
                              if (i <= index) {
                                updatedSteps[i].isCompleted = true;
                              }
                            }

                            return (
                              <div key={indexTracking}>
                                <div className="border-[0.5px] border-[#A4A4A4] rounded-lg  mt-4">
                                  <div className="border-l-[12px] md:border-l-[24px]  border-l-[#80A7FF]  rounded-lg">
                                    {/*delhivery details */}
                                    <>
                                      <div
                                        className="py-4  px-2"
                                        onClick={() =>
                                          handleAccordionToggle(indexTracking)
                                        }
                                      >
                                        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-x-4 w-full cursor-pointer">
                                          {/* logo */}
                                          <div className="flex items-center">
                                            <img
                                              src={
                                                isMasked
                                                  ? LARGE_LOGO
                                                  : each?.logoUrl
                                              }
                                              alt=""
                                              className="w-20"
                                            />
                                          </div>

                                          {/* status */}
                                          <div className="flex items-center">
                                            <p className="text-[12px] font-Open leading-[16px] font-extrabold">
                                              Status&nbsp;:&nbsp;
                                              {each?.currentStatus
                                                ? each?.currentStatus
                                                : "NA"}
                                            </p>
                                          </div>

                                          {/* EDD */}
                                          <div className="flex items-center gap-x-1 text-[12px] font-semibold font-Open leading-[16px] whitespace-nowrap">
                                            <p>
                                              EDD&nbsp;:&nbsp;
                                              {dateOnly}
                                            </p>
                                          </div>

                                          {/* TrackingID */}
                                          <div
                                            className="flex items-center"
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <p className="text-xs font-bold font-Open flex gap-x-1">
                                              Tracking ID&nbsp;:&nbsp;
                                              <span className="font-bold font-Open text-[#160783]">
                                                {each?.awb ? each?.awb : "NA"}
                                              </span>
                                              <CopyTooltip
                                                stringToBeCopied={each?.awb}
                                              />
                                            </p>
                                          </div>
                                          <div className="flex items-center">
                                            <img
                                              src={
                                                openIndex === indexTracking
                                                  ? UpwardArrow
                                                  : DownwardArrow
                                              }
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="px-2">
                                        {true && (
                                          <div className="py-4">
                                            <div className="flex justify-between pt-2 md:pt-0">
                                              <div className="flex flex-col md:flex-row gap-y-2 md:gap-y-0 gap-x-4 md:items-end xl:pr-4">
                                                {each?.updatedAt === "" ||
                                                each?.updatedAt === undefined ||
                                                each?.updatedAt === 0 ? (
                                                  <>
                                                    <div className="flex gap-x-2 md:pt-2">
                                                      <p className="text-xs font-Open font-bold">
                                                        Last Update&nbsp;:&nbsp;
                                                        {convertEpochToDateTime(
                                                          each?.createdAt
                                                        )}
                                                      </p>
                                                    </div>
                                                  </>
                                                ) : (
                                                  <>
                                                    <div className="flex gap-x-2 md:pt-2 ">
                                                      <p className="text-xs font-Open font-bold ">
                                                        Last Update&nbsp;:&nbsp;
                                                        {convertEpochToDateTime(
                                                          each?.updatedAt
                                                        )}
                                                      </p>
                                                    </div>
                                                  </>
                                                )}

                                                {each?.isRTO && (
                                                  <div>
                                                    <p className="text-xs font-Open font-bold md:pt-2">
                                                      Order Type&nbsp;:&nbsp;
                                                      <span className="text-[#160783] text-xs font-Open font-bold">
                                                        RTO
                                                      </span>
                                                    </p>
                                                  </div>
                                                )}

                                                {each?.isRTO && (
                                                  <div>
                                                    <p className="text-xs font-Open font-bold md:pt-2">
                                                      RTO AWB&nbsp;:&nbsp;
                                                      <span className="text-[#160783] text-xs font-Open font-bold">
                                                        {each?.rtoInfo?.rtoAwb
                                                          ? each?.rtoInfo
                                                              ?.rtoAwb
                                                          : "NA"}
                                                      </span>
                                                    </p>
                                                  </div>
                                                )}

                                                <p className="text-xs font-bold font-Open flex">
                                                  Order ID&nbsp;:&nbsp;
                                                  <span className="font-bold font-Open text-[#160783]">
                                                    {each?.otherDetails
                                                      ?.orderNumber
                                                      ? each?.otherDetails
                                                          ?.orderNumber
                                                      : each?.orderId}
                                                  </span>
                                                  <CopyTooltip
                                                    stringToBeCopied={
                                                      each?.otherDetails
                                                        ?.orderNumber
                                                        ? each?.otherDetails
                                                            ?.orderNumber
                                                        : each?.orderId
                                                    }
                                                  />
                                                </p>
                                              </div>
                                            </div>
                                            {/* commented for now */}
                                            {loggedIn && (
                                              <div className="flex  flex-col md:flex-row md:gap-x-2 w-full mt-1">
                                                <div className="md:flex-1 mt-2">
                                                  <p className="text-[14px] font-bold font-Open leading-[16px] ">
                                                    From:
                                                  </p>
                                                  <p className="text-[12px] font-normal font-Open leading-[16px] mt-1  h-[50px] customScroll">
                                                    {each?.pickupAddress
                                                      ?.fullAddress
                                                      ? each?.pickupAddress
                                                          ?.fullAddress
                                                      : "NA"}
                                                  </p>
                                                </div>
                                                <div className="md:flex-1 mt-2 ]">
                                                  <p className="text-[14px] font-bold font-Open leading-[16px]">
                                                    To:
                                                  </p>
                                                  <p className="text-[12px] font-normal font-Open leading-[16px] mt-1 h-[50px] customScroll">
                                                    {each?.deliveryAddress
                                                      ?.fullAddress
                                                      ? each?.deliveryAddress
                                                          ?.fullAddress
                                                      : "NA"}
                                                  </p>
                                                </div>
                                              </div>
                                            )}

                                            {each?.currentStatus ===
                                              "CANCELLED" ||
                                            each?.currentStatus ===
                                              "CANCEL REQUESTED" ||
                                            each?.currentStatus ===
                                              "EXCEPTION" ? (
                                              <div className="mt-4 flex justify-center text-white bg-[#80A7FF]  rounded-lg absoute top-10">
                                                <p>
                                                  {each?.currentStatus ===
                                                    "CANCELLED" ||
                                                  each?.currentStatus ===
                                                    "CANCEL REQUESTED"
                                                    ? "Cancelled Order"
                                                    : "Exception"}
                                                </p>
                                              </div>
                                            ) : (
                                              <></>
                                            )}
                                            <div
                                              className={`flex justify-center mt-4 ${
                                                each?.currentStatus ===
                                                  "CANCELLED" ||
                                                each?.currentStatus ===
                                                  "CANCEL REQUESTED" ||
                                                each?.currentStatus ===
                                                  "EXCEPTION"
                                                  ? "blur-sm"
                                                  : ""
                                              }`}
                                            >
                                              <Stepper steps={updatedSteps} />
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
                                                <img
                                                  src={TrackingMenu}
                                                  alt=""
                                                />
                                                <p className="text-sm font-Open font-semibold">
                                                  Tracking Cycle Details
                                                </p>
                                              </div>
                                            </div>

                                            <div
                                              className={`hover:bg-[#d2d2d225] transition-all shadow-none hover:shadow-inner max-h-[200px] customScroll my-2 py-2 px-4 rounded-lg`}
                                            >
                                              {each?.processedLog?.length ===
                                              0 ? (
                                                <p className="font-bold font-Open text-[14px] leading-5">
                                                  No data found
                                                </p>
                                              ) : (
                                                <div>
                                                  {each?.processedLog?.[0]?.Scans.map(
                                                    (
                                                      eachScan: any,
                                                      index: any
                                                    ) => {
                                                      return (
                                                        <div>
                                                          <div
                                                            key={index}
                                                            className="flex gap-x-4 w-full"
                                                          >
                                                            <div className="font-bold pr-2 py-2 min-w-[24%] md:min-w-[14%] lg:min-w-[12%]">
                                                              <p className="text-xs font-Open w-full">
                                                                {new Date(
                                                                  eachScan?.time
                                                                )
                                                                  .toDateString()
                                                                  .slice(3) ||
                                                                  "-"}
                                                              </p>
                                                              <p className="text-xs font-Open">
                                                                {new Date(
                                                                  eachScan?.time
                                                                ).toLocaleTimeString() ||
                                                                  "-"}
                                                              </p>
                                                            </div>
                                                            <div className="relative border-l-[2px] mt-[2px] border-l-[#80A7FF] border-dotted">
                                                              <div className="w-3 h-3 bg-[#80A7FF] rounded-full absolute top-2 left-[-7px]"></div>
                                                            </div>
                                                            <div className="py-2 w-[240px]">
                                                              <div className="text-xs font-Open font-medium md:w-full">
                                                                <p className="capitalize text-xs font-Open">
                                                                  {eachScan?.message?.toLowerCase()}
                                                                </p>
                                                              </div>
                                                              <p className="text-xs py-1 font-Open capitalize font-semibold md:w-full">
                                                                {eachScan?.status?.toLowerCase()}
                                                              </p>
                                                              <div className="flex gap-x-1">
                                                                <img
                                                                  src={Location}
                                                                  alt=""
                                                                  className="w-4 h-4"
                                                                />
                                                                <p className="text-xs font-Open font-normal capitalize md:w-full">
                                                                  {eachScan?.location?.toLowerCase()}
                                                                </p>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      );
                                                    }
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                            <div>
                                              <div className="py-3">
                                                <hr />
                                              </div>
                                              {/* Order Details Part */}

                                              <>
                                                <div
                                                  className="flex justify-between cursor-pointer w-[280px] md:w-full"
                                                  onClick={() => {
                                                    if (
                                                      loggedIn ||
                                                      viewProductAwbs?.includes(
                                                        each?.awb
                                                      )
                                                    ) {
                                                      toggleSectionOrderDetails(
                                                        `${each?.awb}`
                                                      );
                                                    }
                                                  }}
                                                >
                                                  <div className="flex gap-x-1 items-center">
                                                    <img src={Product} alt="" />
                                                    <p className="text-sm font-Open font-semibold whitespace-nowrap w-full">
                                                      Order Details
                                                    </p>
                                                  </div>

                                                  {openOrderDetails ==
                                                  each?.awb ? (
                                                    <>
                                                      <div className="flex  items-center">
                                                        <img
                                                          src={
                                                            openOrderDetails ==
                                                            each?.awb
                                                              ? UpwardArrow
                                                              : DownwardArrow
                                                          }
                                                          alt=""
                                                          className="!w-4 !h-4"
                                                        />
                                                      </div>
                                                    </>
                                                  ) : (
                                                    <div className="flex gap-x-6  items-center">
                                                      {!loggedIn &&
                                                        !viewProductAwbs?.includes(
                                                          each?.awb
                                                        ) && (
                                                          <p
                                                            className="text-sm font-Open font-semibold text-[#160783] underline underline-offset-3 cursor-pointer"
                                                            onClick={() => {
                                                              setLogginModal(
                                                                true
                                                              );
                                                              setMobileNo(
                                                                each
                                                                  ?.deliveryAddress
                                                                  ?.contact
                                                                  ?.mobileNo
                                                              );
                                                              setAwb(each?.awb);
                                                            }}
                                                          >
                                                            Verify OTP
                                                          </p>
                                                        )}
                                                      <img
                                                        src={
                                                          openOrderDetails ==
                                                          each?.awb
                                                            ? UpwardArrow
                                                            : DownwardArrow
                                                        }
                                                        alt=""
                                                      />
                                                    </div>
                                                  )}
                                                </div>
                                              </>

                                              <div>
                                                {openOrderDetails ==
                                                  each?.awb && (
                                                  <>
                                                    <div className="flex flex-col md:flex-row w-full mt-2 gap-x-5">
                                                      <div
                                                        className={`${
                                                          isMobileResponsive?.isMobileScreen
                                                            ? ""
                                                            : "border-r-2 border-[#D9DBDD] pr-6"
                                                        } `}
                                                      >
                                                        <p className="text-[#777777] text-[12px] font-Open font-normal leading-5">
                                                          Buyer's Name
                                                        </p>
                                                        <p className="whitespace-nowrap font-normal font-Open text-[14px] leading-5">
                                                          {each?.deliveryAddress
                                                            ?.contact?.name ||
                                                            "No Data Found"}
                                                        </p>
                                                      </div>
                                                      <div
                                                        className={`${
                                                          isMobileResponsive?.isMobileScreen
                                                            ? ""
                                                            : "border-r-2 border-[#D9DBDD] pr-6"
                                                        } `}
                                                      >
                                                        <p className="text-[#777777] text-[12px] font-Open font-normal leading-5">
                                                          Phone Number
                                                        </p>
                                                        <p className="whitespace-nowrap font-normal font-Open text-[14px] leading-5">
                                                          {each?.deliveryAddress
                                                            ?.contact
                                                            ?.mobileNo ||
                                                            "No Data Found"}
                                                        </p>
                                                      </div>
                                                      <div
                                                        className={`${
                                                          isMobileResponsive?.isMobileScreen
                                                            ? ""
                                                            : "border-r-2 border-[#D9DBDD] pr-6"
                                                        } `}
                                                      >
                                                        <p className="text-[#777777] text-[12px] font-Open font-normal leading-5">
                                                          Invoice
                                                        </p>
                                                        <p className="whitespace-nowrap font-normal font-Open text-[14px] leading-5">
                                                          {each?.codInfo
                                                            ?.invoiceValue || 0}
                                                        </p>
                                                      </div>
                                                      <div
                                                        className={`${
                                                          isMobileResponsive?.isMobileScreen
                                                            ? ""
                                                            : "border-r-2 border-[#D9DBDD] pr-6"
                                                        } `}
                                                      >
                                                        <p className="text-[#777777] text-[12px] font-Open font-normal leading-5">
                                                          Payment Mode
                                                        </p>
                                                        <p className="whitespace-nowrap font-normal font-Open text-[14px] leading-5">
                                                          {each?.codInfo?.isCod
                                                            ? "COD"
                                                            : "Prepaid"}
                                                        </p>
                                                      </div>
                                                    </div>
                                                    <div className="mt-2 ">
                                                      <p className="text-[#777777] text-[12px] font-Open font-normal leading-5">
                                                        Address
                                                      </p>
                                                      <p className=" font-normal font-Open text-[12px]  leading-5 w-[300px] md:w-[500px] lg:w-[600px] mt-1  ">
                                                        {each?.deliveryAddress
                                                          ?.fullAddress || "NA"}
                                                      </p>
                                                    </div>
                                                    <p className="mt-4 leading-4 font-Open text-[12px] font-bold">
                                                      Product Details
                                                    </p>

                                                    {each?.products?.map(
                                                      (
                                                        each: any,
                                                        index: number
                                                      ) => {
                                                        return (
                                                          <p className="font-Open text-[12px] font-medium">
                                                            {each?.breadth}
                                                          </p>
                                                        );
                                                      }
                                                    )}
                                                  </>
                                                )}
                                              </div>

                                              <div
                                                className={
                                                  openOrderDetails == each?.awb
                                                    ? "grid grid-cols-2 mt-4 gap-y-5 gap-x-4"
                                                    : "grid grid-cols-2"
                                                }
                                              >
                                                {/*mapping product details */}

                                                {openOrderDetails ==
                                                  each?.awb && (
                                                  <>
                                                    {each?.boxInfo?.[0]
                                                      ?.products?.length > 0 ? (
                                                      each?.boxInfo?.[0]?.products?.map(
                                                        (
                                                          each: any,
                                                          index: number
                                                        ) => (
                                                          <div
                                                            key={index}
                                                            className="flex gap-x-2 border-[1.5px] border-[#E8E8E8] px-2 py-3 h-18 overflow-auto rounded-lg"
                                                          >
                                                            <img
                                                              src={
                                                                each?.galleryImage
                                                              }
                                                              alt=""
                                                            />
                                                            <div>
                                                              <p className="text-sm font-Open font-semibold">
                                                                {each?.name ||
                                                                  "NA"}
                                                              </p>

                                                              <p className="text-sm font-Open font-normal">
                                                                ₹
                                                                {(each?.unitPrice?.toFixed(
                                                                  2
                                                                ) || 0) *
                                                                  (each?.qty ||
                                                                    0)}
                                                              </p>
                                                            </div>
                                                          </div>
                                                        )
                                                      )
                                                    ) : (
                                                      <p className="font-bold font-Open text-[14px] leading-5">
                                                        No Products found
                                                      </p>
                                                    )}
                                                  </>
                                                )}
                                              </div>

                                              {/* rescheduling  and cancel and upadte alternate number */}
                                              {openOrderDetails == each?.awb &&
                                                loginSuccess && (
                                                  <div className="mt-3">
                                                    <hr />
                                                    <div className="flex gap-x-1 mt-3 mb-3 font-open text-[14px] font-medium">
                                                      <img
                                                        src={Powerbooster}
                                                        alt=""
                                                      />
                                                      <p>
                                                        Quick Actions for Your
                                                        Order
                                                      </p>
                                                    </div>

                                                    <div className="flex mt-4">
                                                      <div className="flex gap-x-2 items-center">
                                                        {/* alternate number */}
                                                        <div>
                                                          <div>
                                                            <CustomInputBox
                                                              value={
                                                                mobileNumber?.mobileNo ||
                                                                ""
                                                              }
                                                              inputMode="numeric"
                                                              label="Enter Mobile Number"
                                                              maxLength={10}
                                                              onChange={(
                                                                e: any
                                                              ) => {
                                                                if (
                                                                  !isNaN(
                                                                    e.target
                                                                      .value
                                                                  )
                                                                ) {
                                                                  setMobileNumber(
                                                                    {
                                                                      ...mobileNumber,
                                                                      mobileNo:
                                                                        e.target
                                                                          .value,
                                                                    }
                                                                  );
                                                                }
                                                                handleOnchangeError(
                                                                  e.target.value
                                                                );
                                                              }}
                                                            />
                                                            <p className="text-[12px] text-red-600 font-Open">
                                                              {mobileNoError}
                                                            </p>
                                                          </div>
                                                        </div>
                                                        <div>
                                                          <OneButton
                                                            text={"Submit"}
                                                            onClick={() => {
                                                              handleUpdateAlternateNumber(
                                                                each?.awb
                                                              );
                                                            }}
                                                            variant="primary"
                                                            className={`${
                                                              mobileNoError
                                                                ? ""
                                                                : ""
                                                            } !w-20 !h-12 !rounded-lg`}
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="flex  items-center my-3">
                                                      <p
                                                        className="cursor-pointer text-[#160783] underline underline-offset-4 font-Open text-[14px] font-semibold"
                                                        onClick={() => {
                                                          setAwb(each?.awb);
                                                          setReschedulingModal(
                                                            true
                                                          );
                                                        }}
                                                      >
                                                        RESCHEDULE DELIVERY
                                                      </p>
                                                    </div>
                                                    <div className="flex  items-center my-3">
                                                      <p
                                                        className="cursor-pointer text-[#160783] underline underline-offset-4 font-Open text-[14px] font-semibold"
                                                        onClick={() => {
                                                          setAwb(each?.awb);
                                                          setCancellationModalOpen(
                                                            true
                                                          );
                                                        }}
                                                      >
                                                        CANCEL ORDER
                                                      </p>
                                                    </div>
                                                  </div>
                                                )}
                                            </div>
                                          </div>
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
                  }
                </div>
              </div>
            </div>
          </div>

          {/* This is for the centehhjkjr  modal  */}

          {/* login part  */}
          <LoginModal
            mobileNo={mobileNo}
            awb={awb}
            logginModal={logginModal}
            setLogginModal={setLogginModal}
            viewProductAwbs={viewProductAwbs}
            setViewProductAwbs={setViewProductAwbs}
            loginSuccess={loginSuccess}
            setLoginSuccess={setLoginSuccess}
          />

          {/* cancellation part  */}
          <CancellationModal
            cancellationModalOpen={cancellationModalOpen}
            setCancellationModalOpen={() => setCancellationModalOpen(false)}
            awb={awb}
            buyerToken={token}
            buyerMobileNo={buyerMobileNo}
          />
          {/*rescheduling part */}
          <Rescheduling
            reschedulingModal={reschedulingModal}
            setReschedulingModal={() => setReschedulingModal(false)}
            awb={awb}
            buyerToken={token}
            buyerMobileNo={buyerMobileNo}
          />
        </div>
      </div>
    </>
  );
};

export default Tracking;
