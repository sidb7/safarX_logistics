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
import { columnHelperForNewOrder } from "./columnHelpers";
import { insufficientBalance } from "../../utils/dummyData";
import { useMediaQuery } from "react-responsive";
import { ResponsiveState } from "../../utils/responsiveState";

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

const tabs = [
  {
    statusName: "New",
    value: "newOrder",
    orderNumber: "00",
  },
  {
    statusName: "Booked",
    value: "booked",
    orderNumber: "12",
  },
  {
    statusName: "Ready to Pick",
    value: "readyToPick",
    orderNumber: "12",
  },
  {
    statusName: "Picked Up",
    value: "pickedUp",
    orderNumber: "05",
  },
  {
    statusName: "In transit",
    value: "inTransit",
    orderNumber: "00",
  },
  {
    statusName: "Destination City",
    value: "destinationCity",
    orderNumber: "02",
  },
  {
    statusName: "Out of Delivery",
    value: "outOfDelivery",
    orderNumber: "08",
  },
  {
    statusName: "Delivered",
    value: "delivered",
    orderNumber: "08",
  },
  {
    statusName: "Return",
    value: "return",
    orderNumber: "08",
  },
  {
    statusName: "RTO",
    value: "rto",
    orderNumber: "08",
  },
];
const data = [
  {
    _id: {
      $oid: "64da294100ac40a9396dd3e0",
    },
    orderId: 106,
    shipyaariId: 707,
    trackingId: 999,
    sellerId: 1014,
    tempOrderId: 1692016046702,
    companyId: "9b6c92a4-9584-4cf4-a624-58d6bd245a26",
    bundleName: "",
    products: [
      {
        productId: "123",
        name: "Apple watch",
        category: "Life Style",
        price: 28000,
        currency: "INR",
        tax: 5000,
        measureUnit: "cm",
        length: 34,
        breadth: 43,
        height: 45,
        weight: "2",
        image: ["some_url"],
      },
      {
        productId: "1234",
        name: "Apple phone",
        category: "Life Style",
        price: 28000,
        currency: "INR",
        tax: 5000,
        measureUnit: "cm",
        length: 34,
        breadth: 43,
        height: 45,
        weight: "2",
        image: ["some_url"],
      },
    ],
    pickupLocation: {
      flatNo: 12,
      address:
        "A 3rd Floor, Techniplex - II, off Veer Savarkar Flyover, Malad, Liliya Nagar, Goregaon West",
      sector: "C",
      landmark: "Near by MTNL",
      pincode: 400062,
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      addressType: "warehouse",
      contact: {
        name: "Nayan",
        mobileNo: 9867406048,
        alternateMobileNo: 9876543210,
        emailId: "Nayan@shipyaari.com",
        type: "shopkeeper",
      },
      customBranding: {
        name: "Nayan Company",
        logo: "some_url",
        address: "some address info",
        contact: {
          name: "Nayan",
          mobileNo: 9867406048,
        },
      },
      pickupDate: 1692188783,
    },
    service: {
      mode: "SURFACE",
      serviceName: "ECONOMY",
      baseWeight: 0.5,
      price: 208,
      partnerServiceName: "DP MODE",
    },
    packageType: {
      packageId: "",
      weight: "",
      name: "",
      dimension: {
        length: "",
        breadth: "",
        height: "",
      },
      image: "",
    },
    insurance: {
      status: true,
      collectableAmount: 120,
      totalAmount: 220,
    },
    orderFlow: {
      pickupLocation: true,
      deliveryLocation: true,
      products: true,
      service: false,
      payment: false,
    },
    payment: {
      gatewayName: "WALLET",
      status: true,
      amount: 208,
      time: 1692019009625,
    },
    tracking: {
      currentStatus: "booked",
    },
    orderStatus: {
      isOrderPlaced: true,
    },
    boxId: "b9f094e3-5ba6-42e7-a1ce-582ed5bd04d9",
    createdBy: 1014,
    createdAt: 1692016046702,
    isActive: true,
    isDeleted: false,
    deliveryLocation: {
      recipientType: "business",
      flatNo: 1104,
      address:
        "Arkade Serene, Rani Sati Nagar, Sunder Nagar, Malad West, Mumbai, Maharashtra 400064",
      sector: "B",
      landmark: "near jhon bosco school",
      pincode: 400064,
      state: "Maharashtra",
      city: "Mumbai",
      country: "India",
      addressType: "office",
      contact: {
        name: "Pallav",
        mobileNo: 9717030919,
        alternateMobileNo: 9876543220,
        emailId: "pallav@shipyaari.com",
        type: "shopkeeper",
      },
      deliveryDate: 1692361583,
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "64da294100ac40a9396dd3e0",
    },
    orderId: 100,
    shipyaariId: 707,
    trackingId: 999,
    sellerId: 1014,
    tempOrderId: 1692016046702,
    companyId: "9b6c92a4-9584-4cf4-a624-58d6bd245a26",
    bundleName: "",
    products: [
      {
        productId: "123",
        name: "Apple watch",
        category: "Life Style",
        price: 28000,
        currency: "INR",
        tax: 5000,
        measureUnit: "cm",
        length: 34,
        breadth: 43,
        height: 45,
        weight: "2",
        image: ["some_url"],
      },
      {
        productId: "1234",
        name: "Apple phone",
        category: "Life Style",
        price: 28000,
        currency: "INR",
        tax: 5000,
        measureUnit: "cm",
        length: 34,
        breadth: 43,
        height: 45,
        weight: "2",
        image: ["some_url"],
      },
    ],
    pickupLocation: {
      flatNo: 12,
      address:
        "A 3rd Floor, Techniplex - II, off Veer Savarkar Flyover, Malad, Liliya Nagar, Goregaon West",
      sector: "C",
      landmark: "Near by MTNL",
      pincode: 400062,
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      addressType: "warehouse",
      contact: {
        name: "Nayan",
        mobileNo: 9867406048,
        alternateMobileNo: 9876543210,
        emailId: "Nayan@shipyaari.com",
        type: "shopkeeper",
      },
      customBranding: {
        name: "Nayan Company",
        logo: "some_url",
        address: "some address info",
        contact: {
          name: "Nayan",
          mobileNo: 9867406048,
        },
      },
      pickupDate: 1692188783,
    },
    service: {
      mode: "SURFACE",
      serviceName: "ECONOMY",
      baseWeight: 0.5,
      price: 208,
      partnerServiceName: "DP MODE",
    },
    packageType: {
      packageId: "",
      weight: "",
      name: "",
      dimension: {
        length: "",
        breadth: "",
        height: "",
      },
      image: "",
    },
    insurance: {
      status: true,
      collectableAmount: 120,
      totalAmount: 220,
    },
    orderFlow: {
      pickupLocation: true,
      deliveryLocation: true,
      products: true,
      service: false,
      payment: false,
    },
    payment: {
      gatewayName: "WALLET",
      status: true,
      amount: 208,
      time: 1692019009625,
    },
    tracking: {
      currentStatus: "booked",
    },
    orderStatus: {
      isOrderPlaced: true,
    },
    boxId: "b9f094e3-5ba6-42e7-a1ce-582ed5bd04d9",
    createdBy: 1014,
    createdAt: 1692016046702,
    isActive: true,
    isDeleted: false,
    deliveryLocation: {
      recipientType: "business",
      flatNo: 1104,
      address:
        "Arkade Serene, Rani Sati Nagar, Sunder Nagar, Malad West, Mumbai, Maharashtra 400064",
      sector: "B",
      landmark: "near jhon bosco school",
      pincode: 400064,
      state: "Maharashtra",
      city: "Mumbai",
      country: "India",
      addressType: "office",
      contact: {
        name: "Pallav",
        mobileNo: 9717030919,
        alternateMobileNo: 9876543220,
        emailId: "pallav@shipyaari.com",
        type: "shopkeeper",
      },
      deliveryDate: 1692361583,
    },
    __v: 0,
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
          {/* {ProductBox()} {ProductBox()} */}
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
  console.log("data===>", data);
  const [statusData, setStatusData]: any = useState(tabs);
  const isMobileView = useMediaQuery({ maxWidth: 768 }); // Adjust the breakpoint as per your requirement
  const { isLgScreen } = ResponsiveState();
  const [sellerOverview, setSellerOverview]: any = useState([
    {
      label: "Today's delivery",
      value: "todayDelivery",
      number: "23",
      gif: DeliveryGIF,
    },
    { label: "COD", value: "cod", number: "2000", gif: false },
    {
      label: "Online Payment",
      value: "onlinePayment",
      number: "13000",
      gif: DeliveryGIF,
    },
    { label: "Sucsess Rate", value: "sucsessRate", number: "5%", gif: false },
  ]);
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
      <div className="flex flex-col">
        <div className="flex lg:justify-between">
          {ArrowNavigator()}
          {Buttons()}
        </div>
        <div className="w-full flex gap-5 pt-2">
          {sellerOverview.map((e: any) => {
            return (
              <OrderCard
                gif={e.gif}
                showGif={true}
                label={e.label}
                number={e.number}
              />
            );
          })}
        </div>
        {Buttons(
          "lg:hidden grid grid-cols-4 gap-x-2 mt-4 h-[54px] items-center"
        )}
      </div>
      <OrderStatus
        filterId={filterId}
        setFilterId={setFilterId}
        statusData={statusData}
      />
      {/* for mobile view       */}
      {/* {filterId === -1 && (
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
      )} */}

      {isLgScreen && (
        <div className="overflow-x-auto">
          <CustomTable data={data} columns={columnHelperForNewOrder} />
        </div>
      )}
    </div>
  );
};

export default Index;
