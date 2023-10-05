import { useState, useEffect } from "react";
import shipyaari from "../../../assets/Rectangle_Shipyaari.svg";
import InputBox from "../../../components/Input/index";
import trackingIcon from "../../../assets/trackingShipyaariIcon.jpg";
import trackingIcon2 from "../../../assets/trackingShipyaari2.svg";
import instagramIcon from "../../../assets/instagramIcon.svg";
import facebook from "../../../assets/facebookIcon.svg";
import Star from "../../../assets/Comments.svg";
import bookedIcon from "../../../assets/Transaction/bookedIcon.svg";
import DelhiveryIcon from "../../../assets/Delhivery_Logo_(2019) 2.svg";
import telephoneIcon from "../../../assets/telephoneIcon.svg";
import TrackingMenu from "../../../assets/trackingMenu.svg";
import DownwardArrow from "../../../assets/downwardArrow.svg";
import UpwardArrow from "../../../assets/AccordionUp.svg";
import Product from "../../../assets/layer.svg";
import GalleryIcon from "../../../assets/galleryIcon.svg";
import Location from "../../../assets/other.png";
import StarRating from "./starRating";
import { GET, POST } from "../../../utils/webService";
import { Spinner } from "../../../components/Spinner";
import CustomButton from "../../../components/Button";
import { TRACKING } from "../../../utils/ApiUrls";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import { getQueryJson } from "../../../utils/utility";
import CopyTooltip from "../../../components/CopyToClipboard";
import { useSelector } from "react-redux";
import AccessDenied from "../../../components/AccessDenied";

const Tracking = () => {
  // let tracking = [
  //   {
  //     partner: {
  //       partnerIcon: DelhiveryIcon,
  //       partnerID: 0,
  //       etaDate: "18 Jun 2023",
  //       trackingNo: "GYSH23678119",
  //       orderID: "GYSH23678119",
  //       status: "Booked",
  //       orderPlaced: "14 Jun",
  //     },

  //     trackingDetails: [
  //       {
  //         date: "18 Jul, 2023",
  //         time: "11:00  am",
  //         heading: "Pick-up assigned",
  //         locationImage: Location,
  //         location: "Mumbai",
  //       },
  //       {
  //         date: "18 Jul, 2023",
  //         time: "15:20",
  //         heading: "Reached Warehouse",
  //         locationImage: Location,
  //         location: "Bhiwandi",
  //       },
  //       {
  //         date: "18 Jul, 2023",
  //         time: "15:20",
  //         heading: "Delivery assigned",
  //         locationImage: telephoneIcon,
  //         location: "+91 12345 12345",
  //       },
  //     ],
  //     productDetails: [
  //       {
  //         galleryImage: GalleryIcon,
  //         productheading: "Lev's V necked T-shirt",
  //         price: "500",
  //       },
  //       {
  //         galleryImage: GalleryIcon,
  //         productheading: "Lev's V necked T-shirt",
  //         price: "500",
  //       },
  //       {
  //         galleryImage: GalleryIcon,
  //         productheading: "Lev's V necked T-shirt",
  //         price: "500",
  //       },
  //       {
  //         galleryImage: GalleryIcon,
  //         productheading: "Lev's V necked T-shirt",
  //         price: "500",
  //       },
  //     ],
  //   },
  // ];

  // const [trackingState, setTrackingState] = useState<any>([...tracking]);
  const roles = useSelector((state: any) => state?.roles);
  const isActive = roles.roles?.[0]?.menu?.[2]?.menu?.[0]?.pages?.[0]?.isActive;

  const [trackingState, setTrackingState] = useState<any>(null);
  const [openSection, setOpenSection] = useState<string | null>("tracking");
  const [trackingNo, setTrackingNo] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const params = getQueryJson();
  const trackingNoFromUrl = params?.trackingNo;
  const toggleSection = (section: string) => {
    setOpenSection((prevOpenSection) =>
      prevOpenSection === section ? null : section
    );
  };
  const handletrackingNoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTrackingNo(event.target.value);
  };

  const handleTrackOrderClick = async (trackingNoFromUrl?: any) => {

    if (trackingNo?.trim() === "") {
      return;
    }

    let urlWithTrackingNo;
    try {
      setLoading(true);
      if (trackingNoFromUrl !== undefined && trackingNoFromUrl !== "") {
        // setTrackingNo(trackingNoFromUrl)
        urlWithTrackingNo = `${TRACKING}?trackingNo=${trackingNoFromUrl}`
      } else {
        urlWithTrackingNo = `${TRACKING}?trackingNo=${trackingNo}`
      }

      const { data: response } = await GET(urlWithTrackingNo);

      if (response?.success) {
        setTrackingState(response?.data);
        setTrackingNo("")
      } else {
        setTrackingState([]);
      }
    } catch (error) {
      console.error("Error in API call:", error);
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    if (trackingNoFromUrl !== undefined && trackingNoFromUrl !== "") {
      handleTrackOrderClick(trackingNoFromUrl);
      // setTrackingNo(trackingNoFromUrl);
    }
  }, []);

  // useEffect(() => {
  //   handleTrackOrderClick();
  // }, [trackingNo]);

  return (
    <>
      {isActive ? (
        <div className=" w-full">
          <Breadcrum label="Tracking" />
          {/*shipyaari icon */}
          {/* <div className="flex justify-center p-3">
          <img src={shipyaari} alt="Shipyaari" />
        </div> */}
          <div className="flex mx-5 md:my-5 ">
            <div className="flex w-[100%] max-w-[1300px] gap-5 max-md:flex-col">
              {/*tracking ID Box */}
              <div className="flex flex-col basis-3/4">
                <div className="flex items-center">
                  <InputBox
                    label="Enter tracking ID"
                    value={trackingNo}
                    onChange={(event) => handletrackingNoChange(event)}
                    className=""
                  />
                  <CustomButton
                    text="Track Order"
                    className="!ml-2 !w-1/2 md:!w-1/4 text-[15px] md:text-[18px]  h-full "
                    onClick={() => handleTrackOrderClick()}
                  />
                </div>
                {/* <p className="text-[10px] py-2 font-Open font-bold">
                  For multiple ID, type GYSH23678119, GYSH23678119, GYSH23678119
                </p> */}

                {!loading &&
                  trackingState?.map((each: any, indexTracking: number) => {
                    return (
                      <div key={indexTracking}>
                        {/* <div className="border min-h-[454px]"> */}
                        <div className=" border-[0.5px] border-[#A4A4A4] rounded-lg  mt-4 ">
                          <div className="border-l-[24px]  border-l-[#80A7FF] py-4 px-5 rounded-lg">
                            {/*delhivery details */}
                            <>
                              <div className="flex justify-between w-[100%] max-w-[150px]">
                                <img src={each?.partner?.partnerIcon} alt="" />
                                {/* <p className="text-sm font-semibold font-Open">
                                {each?.partner?.etaDate}
                              </p> */}
                              </div>

                              <div className="flex items-center justify-between pt-2 mt-4">
                                <div className="flex flex-col md:flex-row gap-x-8 items-start md:items-center xl:pr-4">
                                  <p className=" flex flex-col sm:flex-row text-xs font-normal font-Open">
                                    <span>  Tracking ID: </span>
                                    <div className="flex font-bold pl-1">
                                      <span className="mt-1 sm:mt-0">
                                        {each?.partner?.trackingID}
                                      </span>
                                      <CopyTooltip
                                        stringToBeCopied={
                                          each?.partner?.trackingID
                                        }
                                      />
                                    </div>
                                  </p>
                                  <p className="flex items-center  text-xs mt-2 md:mt-0 font-normal font-Open">
                                    <span> Order ID: </span>
                                    <div className="flex items-center">
                                      <span className="font-bold pl-1">
                                        {each?.partner?.orderID}
                                      </span>
                                      <CopyTooltip
                                        stringToBeCopied={each?.partner?.orderID}
                                      />
                                    </div>
                                  </p>
                                </div>

                                <div className="inline-flex justify-center gap-x-1 bg-[#F2FAEF] rounded-sm border-[0.5px] border-[#7CCA62] px-3 py-[6px]">
                                  <img src={bookedIcon} alt="" />
                                  <span className="text-xs font-semibold text-[#7CCA62] items-center">
                                    {each?.partner?.status}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs font-Open font-normal pt-2">
                                  Order Placed:
                                  <span className="font-bold pl-1">
                                    {each?.partner?.orderPlaced}
                                  </span>
                                </p>
                              </div>

                              {/*tracking details */}
                              <div className="py-3">
                                <hr />
                              </div>
                              {/*tracking cycle details*/}
                              <div
                                className="flex justify-between cursor-pointer"
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
                              {openSection === "tracking" &&
                                each?.trackingDetails?.map(
                                  (each: any, index: number) => {
                                    return (
                                      <div
                                        className="flex  gap-x-5 mt-1 h-16 relative  overflow-y-scroll"
                                        key={index}
                                      >
                                        <div className="pt-1 flex-initial w-20  ">
                                          <p className="text-xs font-Open font-normal ">
                                            {each?.date}
                                          </p>
                                          <p className="text-xs font-Open font-normal 	">
                                            {each?.time}
                                          </p>
                                        </div>
                                        <div className=" pt-1 flex-initial w-80	border-l-4 border-l-[#80A7FF] pl-5 border-dotted ">
                                          <p className="text-xs font-Open  font-normal">
                                            {each?.heading}
                                          </p>
                                          <div className="flex pt-1 gap-x-2">
                                            <img
                                              src={Location}
                                              alt=""
                                              className="w-4 h-4"
                                            />
                                            <p className="text-xs font-Open font-normal">
                                              {each?.location}
                                            </p>
                                          </div>
                                          <div className="w-2 h-2 bg-[#80A7FF] rounded-full absolute top-5 left-[98px]"></div>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              <div className="py-3">
                                <hr />
                              </div>
                              <div
                                className="flex justify-between cursor-pointer"
                                onClick={() => toggleSection("product")}
                              >
                                <div className="flex gap-x-1 ">
                                  <img src={Product} alt="" />
                                  <p className="text-sm font-Open font-semibold">
                                    Product Details
                                  </p>
                                </div>
                                <img
                                  src={
                                    openSection === "product"
                                      ? UpwardArrow
                                      : DownwardArrow
                                  }
                                  alt=""
                                />
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
                                  each?.productDetails?.map(
                                    (each: any, index: number) => {
                                      return (
                                        <div
                                          key={index}
                                          className="flex gap-x-2 border-[1.5px] border-[#E8E8E8] px-2 py-3 h-16 rounded-lg "
                                        >
                                          <img src={GalleryIcon} alt="" />
                                          <div>
                                            <p className="text-sm font-Open font-semibold">
                                              {each?.productheading}
                                            </p>
                                            <p className="text-sm font-Open font-normal">
                                              ₹ {each?.price}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                              </div>
                            </>
                          </div>
                        </div>
                        {/* </div> */}
                        {/* <div className="border-[0.5px] border-[#A4A4A4] rounded-lg mt-6 py-2 lg:py-4 xl:py-8">
                          <div className="flex gap-x-2 px-2 ml-9">
                            <img src={Star} alt="" />
                            <p className="font-Lato text-lg font-semibold xl:max-w-[358px]">
                              How much would you recommend a product to your
                              friends and family?
                            </p>
                          </div>
                          <div className="px-3  pt-2 ml-16 mt-2">
                            <StarRating />
                          </div>
                        </div> */}
                      </div>
                    );
                  })}

                {loading && (
                  <div className="w-[100%] flex justify-center items-center h-[200px]  md:h-[100%]">
                    <Spinner />
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-x-4 pl-10 md:flex-col md:gap-y-4 max-lg:pl-0 max-lg:justify-between">
                <img
                  src={trackingIcon}
                  alt=""
                  style={{ minWidth: "30%", height: "auto" }}
                />
                <img
                  src={trackingIcon2}
                  alt=""
                  style={{ minWidth: "30%", height: "auto" }}
                />
              </div>
            </div>
          </div>
          <div className="my-4 md:my-0 ml-5">
            <div className="flex flex-col md:flex-row md:gap-x-5">
              <div className="flex gap-x-2 my-3">
                <img src={telephoneIcon} alt="" />
                <p className="text-base font-semibold font-Open whitespace-nowrap">
                  Call at 9989245464, if have some issue
                </p>
              </div>
              <div className="flex gap-x-4 my-3">
                <p className="text-[#004EFF] text-lg font-semibold">
                  Follow us on{" "}
                </p>
                <img src={instagramIcon} alt="" />
                <img src={facebook} alt="" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <AccessDenied />
        </div>
      )}
    </>
  );
};
export default Tracking;
