import { useState } from "react";
import shipyaari from "../../../assets/Rectangle_Shipyaari.svg";
import InputBox from "../../../components/InputBox/index";
import trackingIcon from "../../../assets/trackingShipyaariIcon.jpg";
import trackingIcon2 from "../../../assets/trackingShipyaari2.svg";
import instagramIcon from "../../../assets/instagramIcon.svg";
import facebook from "../../../assets/facebookIcon.svg";
import Star from "../../../assets/Comments.svg";
import emptyStar from "../../../assets/emptyStar.svg";
import bookedIcon from "../../../assets/Transaction/bookedIcon.svg";
import DelhiveryIcon from "../../../assets/Delhivery_Logo_(2019) 2.svg";
import telephoneIcon from "../../../assets/telephoneIcon.svg";
import TrackingMenu from "../../../assets/trackingMenu.svg";
import DownwardArrow from "../../../assets/downwardArrow.svg";
import UpwardArrow from "../../../assets/AccordionUp.svg";
import Product from "../../../assets/layer.svg";
import GalleryIcon from "../../../assets/galleryIcon.svg";
import Location from "../../../assets/other.png";

const Shipyaari = () => {
  const [openTracking, setOpenTracking] = useState(false);
  const [productDetails, setProductDetails] = useState(false);

  const items = [
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
  ];

  const products = [
    {
      galleryImage: GalleryIcon,
      heading: "Lev's V necked T-shirt",
      price: "500",
    },
    {
      galleryImage: GalleryIcon,
      heading: "Lev's V necked T-shirt",
      price: "500",
    },
    {
      galleryImage: GalleryIcon,
      heading: "Lev's V necked T-shirt",
      price: "500",
    },
  ];

  return (
    <>
      <div>
        {/*shipyaari icon */}
        <div className="flex justify-center p-3">
          <img src={shipyaari} alt="Shipyaari" className="w-[128px] h-[48px]" />
        </div>
        <div className="flex gap-x-40 pt-6 pl-[480px]">
          <div className="flex flex-col">
            {/*tracking ID Box */}
            <div>
              <InputBox label="Enter tracking ID" className="w-[605px]" />
              <p className="text-[10px] py-2 font-Open font-bold">
                For multiple ID, type GYSH23678119, GYSH23678119, GYSH23678119
              </p>
            </div>
            <div className="w-[605px] border-[0.5px] border-[#A4A4A4] rounded-lg  mt-4 ">
              <div className="border-l-[24px]  border-l-[#80A7FF] py-4 px-5 rounded-lg">
                {/*delhivery details */}
                <div className="flex justify-between">
                  <img src={DelhiveryIcon} alt="" />
                  <p className="text-sm font-semibold font-Open">
                    ETA: 18 Jun 2023
                  </p>
                </div>

                <div className="flex justify-between pt-2">
                  <div className="flex gap-x-8 items-end">
                    <p className="text-xs font-normal font-Open">
                      Tracking ID:{" "}
                      <span className="font-bold">GYSH23678119</span>
                    </p>
                    <p className="text-xs font-normal font-Open">
                      Order ID: <span className="font-bold">GYSH23678119</span>
                    </p>
                  </div>

                  <div className="inline-flex justify-center gap-x-1 bg-[#F2FAEF] rounded-sm border-[0.5px] border-[#7CCA62] px-3 py-[6px] ">
                    <img src={bookedIcon} alt="" />
                    <span className="text-xs font-semibold text-[#7CCA62] items-center ">
                      Booked
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-Open font-normal pt-2">
                    Order Placed: <span className="font-bold">14 Jun</span>
                  </p>
                </div>
                <div className="py-3">
                  <hr />
                </div>
                {/*tracking cycle details*/}
                <div className="flex justify-between">
                  <div className="flex gap-x-1 ">
                    <img src={TrackingMenu} alt="" />
                    <p className="text-sm font-Open font-semibold">
                      Tracking Cycle Details
                    </p>
                  </div>

                  {openTracking ? (
                    <img
                      src={UpwardArrow}
                      alt=""
                      onClick={() => setOpenTracking(false)}
                    />
                  ) : (
                    <img
                      src={DownwardArrow}
                      alt=""
                      onClick={() => setOpenTracking(true)}
                    />
                  )}
                </div>

                {openTracking &&
                  items.map((each: any, index: number) => {
                    return (
                      <>
                        <div className="flex gap-x-5 mt-1 h-16  relative">
                          <div className="pt-1">
                            <p className="text-xs font-Open font-normal">
                              {each.date}
                            </p>
                            <p className="text-xs font-Open font-normal">
                              {each.time}
                            </p>
                          </div>
                          <div className="border-l-4 border-l-[#80A7FF] pl-5 border-dotted pt-1">
                            <p className="text-xs font-Open  font-normal">
                              {each.heading}
                            </p>
                            <div className="flex pt-1 gap-x-2">
                              <img
                                src={each.locationImage}
                                alt=""
                                className="w-4 h- 4"
                              />
                              <p className="text-xs font-Open font-normal">
                                {each.location}
                              </p>
                            </div>
                            <div className="w-2 h-2 bg-[#80A7FF] rounded-full absolute top-5 left-[82px]"></div>
                          </div>
                        </div>
                      </>
                    );
                  })}

                <div className="py-3">
                  <hr />
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-x-1 ">
                    <img src={Product} alt="" />
                    <p className="text-sm font-Open font-semibold">
                      Product Details
                    </p>
                  </div>
                  {productDetails ? (
                    <img
                      src={UpwardArrow}
                      alt=""
                      onClick={() => setProductDetails(false)}
                    />
                  ) : (
                    <img
                      src={DownwardArrow}
                      alt=""
                      onClick={() => setProductDetails(true)}
                    />
                  )}
                </div>

                <div
                  className={
                    productDetails
                      ? "flex flex-wrap gap-x-5 mt-10 gap-y-5 mb-4"
                      : "flex flex-wrap gap-x-5 gap-y-3"
                  }
                >
                  {productDetails &&
                    products.map((each: any, index: number) => {
                      return (
                        <>
                          <div className="flex gap-x-2 border-[1.5px] border-[#E8E8E8] py-3 px-2 rounded-lg ">
                            <img src={each.galleryImage} alt="" />
                            <div>
                              <p className="text-sm font-Open font-semibold">
                                {each.heading}
                              </p>
                              <p className="text-sm font-Open font-normal">
                                ₹ {each.price}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="border-[0.5px] border-[#A4A4A4] rounded-lg mt-6 py-8 px-6">
              <div className="flex gap-x-2">
                <img src={Star} alt="" />
                <p className="font-Lato text-lg font-semibold max-w-[358px]">
                  How much would you recommend a product to your friends and
                  family?
                </p>
              </div>
              <div className="flex gap-x-5 pt-6 px-4">
                <img src={emptyStar} alt="" />
                <img src={emptyStar} alt="" />
                <img src={emptyStar} alt="" />
                <img src={emptyStar} alt="" />
                <img src={emptyStar} alt="" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-y-4">
              <img src={trackingIcon} alt="" />
              <img src={trackingIcon2} alt="" />
            </div>
          </div>
        </div>
        <div className="flex justify-between pl-[480px] px-[375px] pt-12">
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
    </>
  );
};
export default Shipyaari;
