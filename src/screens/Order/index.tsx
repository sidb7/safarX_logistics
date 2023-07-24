import { OrderCard } from "./OrderCard";
import CustomButton from "../../components/Button";
import AddOrderIcon from "../../assets/Order/AddOrder.svg";
import BlukOrderIcon from "../../assets/Order/BlukOrderIcon.svg";
import SyncIcon from "../../assets/Order/SyncIcon.svg";
import BlackShipIcon from "../../assets/OrderDetails/BlackShipIcon.svg";
import Delivery from "../../assets/OrderDetails/Delivery.svg";
import CopyIcon from "../../assets/OrderDetails/CopyIcon.svg";
import BackArrowIcon from "../../assets/backArrow.svg";
import { OrderStatus } from "./OrderStatus";
import { OrderDetails } from "./OrderDetails";
import DeliveryGIF from "../../assets/OrderCard/Gif.gif";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import ErrorFile from "./OrderStatus/errorFile";
import Slider from "react-slick";
import "../../styles/silkStyle.css";

import { insufficientBalance } from "../../utils/dummyData";
import { useMediaQuery } from "react-responsive";

const ArrowNavigator = () => {
  return (
    <div className="flex items-center mb-4 lg:mb-0 lg:text-[28px] lg:font-semibold">
      <div className="inline-flex space-x-2 items-center justify-start ">
        <img src={BackArrowIcon} alt="" />
        <p className="text-lg font-semibold text-center text-gray-900 ">
          Orders
        </p>
      </div>
    </div>
  );
};

const Buttons = (className?: string) => {
  return (
    <div
      className={
        className
          ? className
          : `lg:flex lg:flex-row-reverse hidden grid-cols-4 gap-x-2 mt-4 lg:mt-0 h-[54px] items-center`
      }
    >
      <div className="grid col-span-2">
        <CustomButton
          className="lg:px-2 lg:py-4 lg:font-semibold lg:text-[14px]"
          text="ADD ORDER"
          onClick={() => {}}
          showIcon={true}
          icon={AddOrderIcon}
        />
      </div>

      <div className="flex flex-col items-center justify-center lg:px-2 lg:py-4 lg:border-[1px] lg:rounded-md lg:border-[#A4A4A4] lg:flex-row lg:space-x-2 lg:h-[36px]">
        <img src={SyncIcon} alt="" width="16px" />
        <span className="text-[#004EFF] text-[10px] whitespace-nowrap lg:font-semibold lg:text-[14px] lg:text-[#1C1C1C]">
          SYNC CHANNEL
        </span>
      </div>

      <div className="flex flex-col items-center justify-center lg:px-2 lg:py-4 lg:border-[1px] lg:rounded-md lg:border-[#A4A4A4] lg:flex-row lg:space-x-2 lg:h-[36px]">
        <img src={BlukOrderIcon} alt="" width="16px" />
        <span className="text-[#004EFF] text-[10px] whitespace-nowrap lg:font-semibold lg:text-[14px] lg:text-[#1C1C1C]">
          BLUK UPLOAD
        </span>
      </div>
    </div>
  );
};

const ProductBox = () => {
  return (
    <div className="flex flex-col gap-y-0 whitespace-nowrap text-[14px] text-[#1C1C1C] font-normal">
      <span>Mac Book Air + Air podes</span>
      <div>
        <span>Dimention: </span>
        <span className="font-semibold">15x15x15x cm</span>
      </div>
      <div>
        <span>SKU: </span>
        <span className="font-semibold">GT87YU1</span>
      </div>
    </div>
  );
};

const data = [
  {
    roleId: "c858434b-68e0-4c2c-b1a2-99fe220de887",
    roleName: "test",
    userCount: 2,
  },
  {
    roleId: "4008aa11-fc21-44a4-a056-31e359ce4d34",
    roleName: "dummy",
    userCount: 2,
  },
  {
    roleId: "1712159a-f2a4-48c0-b6a6-e5471fa1b997",
    roleName: "testRole23",
    userCount: 3,
  },
  {
    roleId: "b4bce5c3-d7a9-4708-b9ec-f05d6e09ccc8",
    roleName: "SUPERUSER",
    userCount: 3,
  },
];
const columnsHelper = createColumnHelper<any>();
const columns = [
  columnsHelper.accessor("roleId", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>Package Details</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="my-4 space-y-2">
          {ProductBox()} {ProductBox()}
        </div>
      );
    },
  }),
  columnsHelper.accessor("roleName", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>ETA</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="flex flex-col whitespace-nowrap">
          <div className="flex gap-x-2">
            <img src={BlackShipIcon} alt="" />
            <span className="text-[14px]">04 Jun 2023</span>
          </div>
          <div className="flex flex-col mt-4">
            <span className="text-[12px] font-normal">Delivery Partner</span>
            <span className="text-[14px] font-semibold">Delhivery</span>
          </div>
          <div className="flex justify-center border-[#A4A4A4] border-[1px] rounded-md px-4 py-2 mt-4">
            <span className="text-[#1C1C1C] font-semibold text-[14px]">
              SHOPIFY
            </span>
          </div>
        </div>
      );
    },
  }),
  columnsHelper.accessor("userCount", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>IDs</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col">
            <div className="flex">
              <span className="text-[12px] font-normal">Tracking:</span>
            </div>
            <div className="flex justify-between gap-x-2">
              <span className="text-[14px] font-semibold">GYSH28464JJDJSD</span>
              <img src={CopyIcon} alt="" className="mr-4" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex">
              <span className="text-[12px] font-normal">Order:</span>
            </div>
            <div className="flex justify-between gap-x-2">
              <span className="text-[14px] font-semibold">GYSH28464JJDJSD</span>
              <img src={CopyIcon} alt="" className="mr-4" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex">
              <span className="text-[12px] font-normal">Shipyaari:</span>
            </div>
            <div className="flex justify-between gap-x-2">
              <span className="text-[14px] font-semibold">GYSH28464JJDJSD</span>
              <img src={CopyIcon} alt="" className="mr-4" />
            </div>
          </div>
        </div>
      );
    },
  }),
  columnsHelper.accessor("userCount", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>Payment</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="flex flex-col">
          <div>
            <span className="text-[14px] font-semibold text-[#1C1C1C]">
              5,000
            </span>
          </div>
          <div>
            <span className="text-[16px] font-semibold text-[#777777]">
              ONLINE
            </span>
          </div>
        </div>
      );
    },
  }),
  columnsHelper.accessor("userCount", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>From</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="w-[151px]">
          <span className="text-[14px] font-normal text-[#1C1C1C]">
            Jhindal Warehouse Plot no.18, Sector 7, Link road, Andheri Satish
            Sharma +91 12345 12345
          </span>
        </div>
      );
    },
  }),
  columnsHelper.accessor("userCount", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>To</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="w-[151px]">
          <span className="text-[14px] font-normal text-[#1C1C1C]">
            Jhindal Warehouse Plot no.18, Sector 7, Link road, Andheri Satish
            Sharma +91 12345 12345
          </span>
        </div>
      );
    },
  }),
  columnsHelper.accessor("userCount", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>Status</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="flex justify-center items-center gap-x-2 p-2 bg-[#FDF6EA] rounded-md border-[1px] border-[#F0A22E] whitespace-nowrap h-[28px] w-[93px]">
          <img src={Delivery} alt="" className="w-[12px]" />
          <span className="text-[#F0A22E] text-[12px] font-semibold  ">
            In transit
          </span>
        </div>
      );
    },
  }),
  columnsHelper.accessor("userCount", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>Actions</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return <span>Actions</span>;
    },
  }),
];

const Index = () => {
  const [filterId, setFilterId] = useState(-1);
  const isMobileView = useMediaQuery({ maxWidth: 768 }); // Adjust the breakpoint as per your requirement

  //  settings for desktop view

  const desktopSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
  };

  //  settings for mobile view

  // Define settings for mobile view
  const mobileSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Adjust the number of slides shown on mobile
    centerMode: true,
    slidesToScroll: 1,
    initialSlide: 0, // Start from the second slide to hide the slide on the left side
  };

  // const mobileSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   centerMode: true,
  // };

  const currentSettings = isMobileView ? mobileSettings : desktopSettings;

  return (
    <div className="mx-4">
      <div className="flex flex-col gay-y-4">
        <div className="flex lg:justify-between">
          {ArrowNavigator()}
          {Buttons()}
        </div>
        <div className="lg:mt-[29px] lg:flex lg:gap-x-5">
          <OrderCard
            gif={DeliveryGIF}
            showGif={true}
            label="Today's delivery"
            number="23"
          />
          <OrderCard label="COD" number="2,000" />
          {/* <OrderCard
            gif={DeliveryGIF}
            showGif={true}
            label="Online Payment"
            number="23,000"
          /> */}
          <OrderCard label="Success Rate" number="5%" />
        </div>
        <div>
          <div className="">
            <h2> Single Item</h2>
            <Slider {...currentSettings} className="">
              <div className="mx-2 !w-[95%]">
                <OrderCard
                  gif={DeliveryGIF}
                  showGif={true}
                  label="Today's delivery"
                  number="23"
                />
              </div>
              <div className="mx-2 !w-[95%]">
                <OrderCard
                  gif={DeliveryGIF}
                  showGif={true}
                  label="Today's delivery"
                  number="23"
                />
              </div>
              <div className="mx-2 !w-[95%]">
                <OrderCard
                  gif={DeliveryGIF}
                  showGif={true}
                  label="Today's delivery"
                  number="23"
                />
              </div>
              <div className="mx-2 !w-[95%]">
                <OrderCard
                  gif={DeliveryGIF}
                  showGif={true}
                  label="Today's delivery"
                  number="23"
                />
              </div>
              <div className="mx-2 !w-[95%]">
                <OrderCard
                  gif={DeliveryGIF}
                  showGif={true}
                  label="Today's delivery"
                  number="23"
                />
              </div>
              <div className="mx-2 !w-[95%]">
                <OrderCard
                  gif={DeliveryGIF}
                  showGif={true}
                  label="Today's delivery"
                  number="23"
                />
              </div>
            </Slider>
          </div>
        </div>
        {Buttons(
          "lg:hidden grid grid-cols-4 gap-x-2 mt-4 h-[54px] items-center"
        )}
      </div>

      <OrderStatus filterId={filterId} setFilterId={setFilterId} />
      {filterId === -1 && (
        <>
          <OrderDetails />
          <OrderDetails />
          <OrderDetails />
          <ErrorFile props={insufficientBalance} />
        </>
      )}
      {filterId === 0 && (
        <>
          <OrderDetails />
          <OrderDetails />
          <OrderDetails />
          <ErrorFile props={insufficientBalance} />
        </>
      )}
      {filterId === 1 && (
        <>
          <OrderDetails />
          <OrderDetails />
          <OrderDetails />
        </>
      )}
      {filterId === 2 && (
        <>
          <ErrorFile props={insufficientBalance} />
        </>
      )}

      <div>
        <CustomTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default Index;
