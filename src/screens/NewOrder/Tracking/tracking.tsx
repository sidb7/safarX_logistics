import { useState } from "react";
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
        orderPlaced: "14 Jun",
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
      isTrackingOpen: false,
      isProductItemsOpen: false,
    },
    {
      partner: {
        partnerIcon: DelhiveryIcon,
        partnerID: 1,
        etaDate: "18 Jun 2023",
        trackingID: "GYSH23678119",
        orderID: "GYSH23678119",
        status: "Booked",
        orderPlaced: "14 Jun",
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
      isTrackingOpen: false,
      isProductItemsOpen: false,
    },
    {
      partner: {
        partnerIcon: DelhiveryIcon,
        partnerID: 2,
        etaDate: "18 Jun 2023",
        trackingID: "GYSH23678119",
        orderID: "GYSH23678119",
        status: "Booked",
        orderPlaced: "14 Jun",
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
      isTrackingOpen: false,
      isProductItemsOpen: false,
    },
  ];

  const [trackingState, setTrackingState] = useState<any>([...tracking]);

  const handleDropdown = (key: any, index: any) => {
    let tempArr = trackingState;
    tempArr[index][`${key}`] = !tempArr[index][`${key}`];
    setTrackingState([...tempArr]);
  };

  return (
    <>
      <div className="mx-5">
        {/*shipyaari icon */}
        <div className="flex justify-center p-3">
          <img src={shipyaari} alt="Shipyaari" />
        </div>
        <div className="flex gap-x-5  justify-center ">
          <div className="flex ">
            {/*tracking ID Box */}
            <div className="flex flex-col">
              <div>
                <InputBox label="Enter tracking ID" />
                <p className="text-[10px] py-2 font-Open font-bold">
                  For multiple ID, type GYSH23678119, GYSH23678119, GYSH23678119
                </p>
              </div>

              {trackingState?.map((each: any, indexTracking: number) => {
                return (
                  <div key={indexTracking}>
                    <div className=" border-[0.5px] border-[#A4A4A4] rounded-lg  mt-4 ">
                      <div className="border-l-[24px]  border-l-[#80A7FF] py-4 px-5 rounded-lg">
                        {/*delhivery details */}
                        <>
                          <div className="flex justify-between">
                            <img src={each?.partner?.partnerIcon} alt="" />
                            <p className="text-sm font-semibold font-Open">
                              {each?.partner?.etaDate}
                            </p>
                          </div>

                          <div className="flex justify-between pt-2">
                            <div className="flex gap-x-8 items-end xl:pr-4">
                              <p className="text-xs font-normal font-Open">
                                Tracking ID:
                                <span className="font-bold">
                                  {each?.partner?.trackingID}
                                </span>
                              </p>
                              <p className="text-xs font-normal font-Open">
                                Order ID:
                                <span className="font-bold">
                                  {each?.partner?.orderID}
                                </span>
                              </p>
                            </div>

                            <div className="inline-flex justify-center gap-x-1 bg-[#F2FAEF] rounded-sm border-[0.5px] border-[#7CCA62] px-3 py-[6px]">
                              <img src={bookedIcon} alt="" />
                              <span className="text-xs font-semibold text-[#7CCA62] items-center ">
                                {each?.partner?.status}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-Open font-normal pt-2">
                              Order Placed:
                              <span className="font-bold">
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
                            onClick={() =>
                              handleDropdown("isTrackingOpen", indexTracking)
                            }
                          >
                            <div className="flex gap-x-1 ">
                              <img src={TrackingMenu} alt="" />
                              <p className="text-sm font-Open font-semibold">
                                Tracking Cycle Details
                              </p>
                            </div>

                            <img
                              src={
                                each?.isTrackingOpen
                                  ? UpwardArrow
                                  : DownwardArrow
                              }
                              alt=""
                            />
                          </div>
                          {each?.isTrackingOpen &&
                            each?.trackingDetails?.map(
                              (each: any, index: number) => {
                                return (
                                  <div
                                    className="flex gap-x-5 mt-1 h-16 relative  overflow-y-scroll"
                                    key={index}
                                  >
                                    <div className="pt-1">
                                      <p className="text-xs font-Open font-normal">
                                        {each?.date}
                                      </p>
                                      <p className="text-xs font-Open font-normal">
                                        {each?.time}
                                      </p>
                                    </div>
                                    <div className="border-l-4 border-l-[#80A7FF] pl-5 border-dotted pt-1">
                                      <p className="text-xs font-Open  font-normal">
                                        {each?.heading}
                                      </p>
                                      <div className="flex pt-1 gap-x-2">
                                        <img
                                          src={each?.locationImage}
                                          alt=""
                                          className="w-4 h- 4"
                                        />
                                        <p className="text-xs font-Open font-normal">
                                          {each?.location}
                                        </p>
                                      </div>
                                      <div className="w-2 h-2 bg-[#80A7FF] rounded-full absolute top-5 left-[83px]"></div>
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
                            onClick={() =>
                              handleDropdown(
                                "isProductItemsOpen",
                                indexTracking
                              )
                            }
                          >
                            <div className="flex gap-x-1 ">
                              <img src={Product} alt="" />
                              <p className="text-sm font-Open font-semibold">
                                Product Details
                              </p>
                            </div>
                            <img
                              src={
                                each?.isProductItemsOpen
                                  ? UpwardArrow
                                  : DownwardArrow
                              }
                              alt=""
                            />
                          </div>
                          <div
                            className={
                              each?.isProductItemsOpen
                                ? "grid grid-cols-2 mt-4 gap-y-5 gap-x-4"
                                : "grid grid-cols-2 "
                            }
                          >
                            {/*mapping product details */}
                            {each?.isProductItemsOpen &&
                              each?.productDetails?.map(
                                (each: any, index: number) => {
                                  return (
                                    <div
                                      key={index}
                                      className="flex gap-x-2 border-[1.5px] border-[#E8E8E8] px-2 py-3 h-16 rounded-lg "
                                    >
                                      <img src={each?.galleryImage} alt="" />
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
                    <div className="border-[0.5px] border-[#A4A4A4] rounded-lg mt-6 py-2 lg:py-4 xl:py-8">
                      <div className="flex gap-x-2 px-2 ml-9">
                        <img src={Star} alt="" />
                        <p className="font-Lato text-lg font-semibold xl:max-w-[358px]">
                          How much would you recommend a product to your friends
                          and family?
                        </p>
                      </div>
                      <div className="px-3  pt-2 ml-16 mt-2">
                        <StarRating />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-y-4 pl-10">
              <img src={trackingIcon} alt="" />
              <img src={trackingIcon2} alt="" />
            </div>
          </div>
        </div>
        <div className="pt-12">
          <div className="flex justify-evenly lg:gap-x-96 xl:justify-center xl:gap-x-[306px]">
            <div className="flex gap-x-2">
              <img src={telephoneIcon} alt="" />
              <p className="text-base font-semibold font-Open whitespace-nowrap">
                Call at 9989245464, if have some issue
              </p>
            </div>
            <div className="flex gap-x-4">
              <p className="text-[#004EFF] text-lg font-semibold">
                Follow us on{" "}
              </p>
              <img src={instagramIcon} alt="" />
              <img src={facebook} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Tracking;
