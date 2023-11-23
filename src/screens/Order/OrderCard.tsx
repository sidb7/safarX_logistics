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

function OrderCard({ data }: any) {
  const [openSection, setOpenSection] = useState<any>(false);

  console.log("data OrderCard", data);

  const [cartData, setcartData] = useState<any>({
    latestStatus: "",
    statusTimeStamp: 0,
  });

  const statusTime = {
    success: "Order Placed",
    booked: "Pick Up Expected",
    "Ready to pickup": "Pick Up Expected",
    "picked up": "",
    "in transit": "",
    "out for delivery": "",
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

  useEffect(() => {
    // const { status } = data;
    setcartData({
      latestStatus:
        data?.status?.[data?.status?.length - 1]?.currentStatus || "DRAFT",
      statusTimeStamp: data?.status?.[data?.status?.length - 1]?.timeStamp,
    });
  }, [data]);

  return (
    <div className="my-8 ">
      <div className="shadow-md border-[0.5px] border-[#e9e8e8] rounded-lg">
        <div className="relative py-4 px-3 rounded-lg">
          <div className="absolute top-[-15px] left-6 inline-flex justify-center gap-x-1 bg-[#F2FAEF] rounded-md border-[0.5px] border-[#9af17d] px-3 py-[6px]">
            <img src={bookedIcon} alt="" />
            <span className="text-xs font-semibold rounded text-[#7CCA62] items-center">
              {cartData?.latestStatus}
            </span>
          </div>

          <div className="">
            <div className="mt-3 mb-2 flex items-center justify-between">
              <div className="text-[#004EFF] text-[12px]">
                Return Initiated : 02 Jan
              </div>

              <div className="flex text-[12px] items-center">
                <div> ₹ 2300 </div>
                <div className="ml-2 text-[#004EFF]">ONLINE</div>
                <div
                  className="ml-2 cursor-pointer"
                  onClick={() => setOpenSection(!openSection)}
                >
                  <img src={openSection ? UpwardArrow : DownwardArrow} alt="" />
                </div>
              </div>
            </div>

            <div>
              <div className="text-[13px]">Mac book air + Air dropes</div>

              <div className="text-[13px] my-1 flex justify-between">
                <div>Tracking : {"765434567876"}</div>
                <div className="flex ">
                  <img src={redirectIcon} alt="" />
                  <img src={ShareIcon} alt="" className="ml-2" />
                </div>
              </div>
              {openSection && (
                <>
                  <div className="mt-4">
                    <Stepper steps={steps} />
                  </div>

                  <div className="my-4">
                    <div className=" my-1 flex text-[12px]">
                      <div className="flex w-fit">
                        <img src={DimensionIcon} alt="" className="w-[14px]" />
                        <div className="ml-2">Dimension :</div>
                      </div>
                      <div className="text-[12px] ml-2">
                        {"15cm X 15cm X 15cm"}
                      </div>
                    </div>

                    <div className=" my-1 flex text-[12px]">
                      <div className="flex w-fit">
                        <img src={SkuBoxIcon} alt="" className="w-[14px]" />
                        <div className="ml-2">SKU :</div>
                      </div>
                      <div className="text-[12px] ml-2">{"ASDFGRE3533"}</div>
                    </div>

                    <div className=" my-1 flex text-[12px]">
                      <div className="flex w-fit">
                        <img src={BoxSearchIcon} alt="" className="w-[14px]" />
                        <div className="ml-2">Shipyaari ID :</div>
                      </div>
                      <div className="text-[12px] ml-2">{"12345678765"}</div>
                    </div>

                    <div className=" my-1 flex text-[12px]">
                      <div className="flex w-fit">
                        <img src={orderBox} alt="" className="w-[14px]" />
                        <div className="ml-2">Order ID :</div>
                      </div>
                      <div className="text-[12px] ml-2">{"23456543"}</div>
                    </div>

                    <div className=" my-1 flex text-[12px]">
                      <div className="flex w-fit">
                        <img
                          src={DelivertTruckIcon}
                          alt=""
                          className="w-[14px]"
                        />
                        <div className="ml-2">Delivery Partner :</div>
                      </div>
                      <div className="text-[12px] ml-2">{"Delhivery"}</div>
                    </div>
                  </div>

                  <div className="my-4">
                    <div className="text-[13px]">From</div>
                    <div className=" my-1 flex text-[12px]">
                      <div className="flex w-fit">
                        <img src={Location} alt="" className="w-[14px]" />
                        <div className="ml-2">Dimension :</div>
                      </div>
                      <div className="text-[12px] ml-2">
                        {"15cm X 15cm X 15cm"}
                      </div>
                    </div>

                    <div className=" my-1 flex text-[12px]">
                      <div className="flex w-fit">
                        <img src={profileIcon} alt="" className="w-[14px]" />
                        <div className="ml-2">SKU :</div>
                      </div>
                      <div className="text-[12px] ml-2">{"ASDFGRE3533"}</div>
                    </div>

                    <div className=" my-1 flex text-[12px]">
                      <div className="flex w-fit">
                        <img src={TelePhoneIcon} alt="" className="w-[14px]" />
                        <div className="ml-2">Shipyaari ID :</div>
                      </div>
                      <div className="text-[12px] ml-2">{"12345678765"}</div>
                    </div>
                  </div>

                  <div className="my-4">
                    <div className="text-[13px]">To</div>
                    <div className="flex w-[150px] mt-1 text-[12px]">
                      <img src={Location} alt="" className="w-[14px]" />
                      <div className="ml-2">Warehouse Name </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <div className="flex items-center">
                      <img src={TaskSquare} alt="" className="w-[18px]" />
                      <div className="ml-2">Reason</div>
                    </div>
                    <div className="mt-2 text-[12px]">
                      <div className="my-1">Line 1</div>
                      <div>Line 2</div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-6">
              <div className="">
                <button className="border  border-[#004EFF] text-[#004EFF] text-[12px] px-3 py-2 rounded">
                  General Tag
                </button>
                <button className="border ml-4 border-[#004EFF] text-[#004EFF] text-[12px] px-3 py-2 rounded">
                  Service Tag
                </button>
              </div>

              <div
                className="flex items-center mt-4 justify-between cursor-pointer"
                onClick={() => setOpenSection(true)}
              >
                <div className="flex gap-x-1">
                  <p className="text-sm text-[#004EFF] font-Open font-semibold">
                    RESCHEDULE
                  </p>
                </div>
                <img src={MoreIcon} alt="" />
              </div>
            </div>
            <div
              className={
                openSection === "product"
                  ? "grid grid-cols-2 mt-4 gap-y-5 gap-x-4"
                  : "grid grid-cols-2 "
              }
            >
              {/*mapping product details */}
              {openSection === "product" && (
                // each?.productDetails?.map(
                //   (each: any, index: number) => {
                //     return
                <div className="flex gap-x-2 border-[1.5px] border-[#E8E8E8] px-2 py-3 h-16 rounded-lg ">
                  <img src={GalleryIcon} alt="" />
                  <div>
                    <p className="text-sm font-Open font-semibold">
                      each?.productheading
                    </p>
                    <p className="text-sm font-Open font-normal">₹ 200</p>
                  </div>
                </div>
                //   );
                // }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
