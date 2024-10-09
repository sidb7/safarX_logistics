import { useEffect, useState } from "react";
import TrackingMenu from "../../../assets/trackingMenu.svg";
import DownwardArrow from "../../../assets/downwardArrow.svg";
import UpwardArrow from "../../../assets/AccordionUp.svg";
import Product from "../../../assets/layer.svg";
import Location from "../../../assets/other.png";
import Stepper from "../Tracking/clientStepper";
import TickLogo from "../../../assets/common/Tick.svg";
import { Spinner } from "../../../components/Spinner";
import { LARGE_LOGO } from "../../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { convertEpochToDateTime } from "../../../utils/utility";
import { getQueryJson } from "../../../utils/utility";
import CopyTooltip from "../../../components/CopyToClipboard";
import CustomInputBox from "../../../components/Input/index";
import "./style.css";
import OneButton from "../../../components/Button/OneButton";
import TrackingIcon from "../../../assets/Track.svg";
import { ResponsiveState } from "../../../utils/responsiveState";
import { inputRegexFilter } from "../../../utils/Helper/Filter";
import { PathFinder } from "../../../utils/Helper/PathFinder";

const Tracking = () => {
  const isMobileResponsive = ResponsiveState();
  //getting the path
  const currenturl = window.location.href;
  const path = PathFinder(currenturl);
  const [trackingState, setTrackingState] = useState<any[]>([]);
  const [openOrderDetails, setOpenOrderDetails] = useState<string | null>(null);
  const { trackingNo: trackingNoParams = "" } = getQueryJson();
  const [trackingNo, setTrackingNo] = useState<any>(trackingNoParams);
  const [loading, setLoading] = useState(false);
  const [sellerId, setSellerId] = useState<any>();
  const [loggedIn, setLoggedIn] = useState<any>(false);
  const [isMasked, setIsMasked] = useState(false);

  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("userInfo") as any);
    if (temp) {
      setIsMasked(temp?.isMaskedUser);
    }
  }, []);

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

  //getting seller id

  const getJwtTokenForUser = (sellerId: any) => {
    // Construct the dynamic key based on the user ID
    const dynamicKey = `${sellerId}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`;

    // Retrieve JWT token from local storage using the dynamic key
    if (sellerId) {
      setLoggedIn(true);
    }
  };

  const handleTrackOrderClick = async () => {
    const getSellerId = localStorage.getItem("sellerId");
    setSellerId(getSellerId);
    getJwtTokenForUser(getSellerId);
    try {
      const result = await inputRegexFilter(trackingNo, path);

      setLoading(true);

      //mapping the new data
      if (result?.success) {
        const res = result?.data?.[0]?.trackingInfo?.map(
          (currentStatus: any, index: any) => {
            orderStatus(currentStatus?.currentStatus);
          }
        );

        window.history.replaceState(
          {},
          "",
          `/tracking?trackingNo=${trackingNo}`
        );

        setTrackingState(result?.data?.[0]?.trackingInfo);
        const allProcessedLogs = result?.data?.[0]?.trackingInfo?.map(
          (eachItem: any) => eachItem?.processedLog
        );

        const flattenedLogs = allProcessedLogs.flat();
      } else {
        toast.error(result);
      }
    } catch (error: any) {
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

  return (
    <>
      <div className="mx-5">
        {/*shipyaari icon */}
        <div className="flex  justify-center p-3">
          <img className="w-40 mt-10" src={LARGE_LOGO} alt="Shipyaari" />
        </div>
        <div className="flex justify-center items-center py-4">
          <div
            className={`${
              isMobileResponsive?.isMobileScreen ? "w-[340px]" : "w-[50rem]"
            }`}
          >
            <div className="flex md:justify-center w-full">
              <div className="w-full">
                <div className="flex w-full">
                  <CustomInputBox
                    label="Enter tracking ID"
                    value={trackingNo}
                    containerStyle="!mt-1"
                    onChange={(e) => setTrackingNo(e.target.value)}
                  />
                  <OneButton
                    text={`${
                      isMobileResponsive?.isMobileScreen ? "" : "Track Order"
                    }`}
                    className="ml-2 p-6 mt-1"
                    onClick={() => handleTrackOrderClick()}
                    variant="primary"
                    showIcon={isMobileResponsive?.isMobileScreen ? true : false}
                    icon={TrackingIcon}
                    iconClass="!w-8 !h-8 ml-2 mr-0"
                  />
                </div>
                <p className="text-[10px] py-2 font-Open font-bold">
                  For multiple ID, type GYSH23678119, GYSH23678119, GYSH23678119
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

                            let index = updatedSteps.findIndex((item) => {
                              //normal return
                              return (
                                item.value === each?.currentStatus ||
                                `RTO ${item.value}` === each?.currentStatus
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
                                  <div className="border-l-[12px] md:border-l-[24px]  border-l-[#80A7FF] py-4 px-2 md:px-5 rounded-lg">
                                    {/*delhivery details */}
                                    <>
                                      <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-x-4 w-full">
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
                                        <div className="flex items-center">
                                          <p className="text-xs font-bold font-Open flex gap-x-1">
                                            Tracking ID&nbsp;:&nbsp;
                                            <span className="font-bold font-Open text-[#004EFF]">
                                              {each?.awb ? each?.awb : "NA"}
                                            </span>
                                            <CopyTooltip
                                              stringToBeCopied={each?.awb}
                                            />
                                          </p>
                                        </div>
                                      </div>

                                      <div className="flex justify-between pt-2 md:pt-0">
                                        <div className="flex flex-col md:flex-row gap-y-2 md:gap-y-0 gap-x-4 md:items-end xl:pr-4">
                                          {each?.updatedAt === "" ||
                                          each?.updatedAt === undefined ? (
                                            <p className="text-xs font-Open font-bold md:pt-2">
                                              Last Update&nbsp;:&nbsp;
                                              {convertEpochToDateTime(
                                                each?.createdAt
                                              )}
                                            </p>
                                          ) : (
                                            <p className="text-xs font-Open font-bold md:pt-2 ">
                                              Last Update&nbsp;:&nbsp;
                                              {convertEpochToDateTime(
                                                each?.updatedAt
                                              )}
                                            </p>
                                          )}

                                          {each?.isRTO && (
                                            <div>
                                              <p className="text-xs font-Open font-bold md:pt-2">
                                                Order Type&nbsp;:&nbsp;
                                                <span className="text-[#004EFF] text-xs font-Open font-bold">
                                                  RTO
                                                </span>
                                              </p>
                                            </div>
                                          )}

                                          {each?.isRTO && (
                                            <div>
                                              <p className="text-xs font-Open font-bold md:pt-2">
                                                RTO AWB&nbsp;:&nbsp;
                                                <span className="text-[#004EFF] text-xs font-Open font-bold">
                                                  {each?.rtoInfo?.rtoAwb
                                                    ? each?.rtoInfo?.rtoAwb
                                                    : "NA"}
                                                </span>
                                              </p>
                                            </div>
                                          )}

                                          <p className="text-xs font-bold font-Open flex">
                                            Order ID&nbsp;:&nbsp;
                                            <span className="font-bold font-Open text-[#004EFF]">
                                              {each?.otherDetails?.orderNumber
                                                ? each?.otherDetails
                                                    ?.orderNumber
                                                : each?.orderId}
                                            </span>
                                            <CopyTooltip
                                              stringToBeCopied={each?.orderId}
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
                                              {each?.pickupAddress?.fullAddress
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

                                      {each?.currentStatus === "CANCELLED" ||
                                      each?.currentStatus ===
                                        "CANCEL REQUESTED" ||
                                      each?.currentStatus === "EXCEPTION" ? (
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
                                          each?.currentStatus === "CANCELLED" ||
                                          each?.currentStatus ===
                                            "CANCEL REQUESTED" ||
                                          each?.currentStatus === "EXCEPTION"
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
                                          toggleSectionOrderDetails("tracking")
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
                                        {each?.processedLog?.length === 0 ? (
                                          <p className="font-bold font-Open text-[14px] leading-5">
                                            No data found
                                          </p>
                                        ) : (
                                          <div>
                                            {each?.processedLog?.[0]?.Scans.map(
                                              (eachScan: any, index: any) => {
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
                                                            .slice(3) || "-"}
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
                                      <div className="py-3">
                                        <hr />
                                      </div>
                                      {/* Order Details Part */}
                                      {loggedIn && (
                                        <div
                                          className="flex justify-between cursor-pointer w-[280px] md:w-full"
                                          onClick={() =>
                                            toggleSectionOrderDetails("product")
                                          }
                                        >
                                          <div className="flex gap-x-1">
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
                                      )}
                                      <div>
                                        {openOrderDetails === "product" && (
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
                                                    ?.contact?.mobileNo ||
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
                                              (each: any, index: number) => {
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
                                          openOrderDetails === "product"
                                            ? "grid grid-cols-2 mt-4 gap-y-5 gap-x-4"
                                            : "grid grid-cols-2"
                                        }
                                      >
                                        {/*mapping product details */}

                                        {openOrderDetails === "product" && (
                                          <>
                                            {each?.boxInfo?.[0]?.products
                                              ?.length > 0 ? (
                                              each?.boxInfo?.[0]?.products?.map(
                                                (each: any, index: number) => (
                                                  <div
                                                    key={index}
                                                    className="flex gap-x-2 border-[1.5px] border-[#E8E8E8] px-2 py-3 h-18 overflow-auto rounded-lg"
                                                  >
                                                    <img
                                                      src={each?.galleryImage}
                                                      alt=""
                                                    />
                                                    <div>
                                                      <p className="text-sm font-Open font-semibold">
                                                        {each?.name || "NA"}
                                                      </p>

                                                      <p className="text-sm font-Open font-normal">
                                                        ₹
                                                        {(each?.unitPrice?.toFixed(
                                                          2
                                                        ) || 0) *
                                                          (each?.qty || 0)}
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
  );
};

export default Tracking;
