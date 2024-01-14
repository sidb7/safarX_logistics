import React from "react";
import CreateOrderIcon from "../../../assets/createdOrder.svg";
import InTransitIcon from "../../../assets/inTransit.svg";
import BarChart2 from "../Common/BarChart2";
import PieChart from "../Common/PieChart";
import Box from "../../../assets/Delivery Icon.svg";
import Profile from "../../../assets/contact.png";
import PlanIcon from "../../../assets/Delivery.svg";
import Layer from "../../../assets/layer.svg";
import TableDetails from "./tabelDetails";
import PaymnetIcon from "../../../assets/payment.svg";
import VanIcon from "../../../assets/van.svg";
import RedEllipse from "../../../assets/redEllipse.svg";
import GreenEllipse from "../../../assets/greenEllipse.svg";
import { createColumnHelper } from "@tanstack/react-table";
import StackedChart from "../Common/StackedChart";
import ComposedChart from "../Common/ComposedChart";
import VanWithoutBG from "../../../assets/vanWithoutBG.svg";
import Whatsapp from "../../../assets/whatsapp.svg";

const Exception = (props: any) => {
  const { ordersArr } = props;

  const columnsHelper = createColumnHelper<any>();
  const objectIcon: any = {
    CreateOrderIcon: CreateOrderIcon,

    InTransitIcon: InTransitIcon,
    VanIcon: VanIcon,
  };

  const orderArr = [
    {
      name: "10 Jul",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "11 Jul",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "12 Jul",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "13 Jul",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "14 Jul",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "15 Jul",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "16 Jul",
      uv: 0,
      pv: 0,
      amt: 0,
    },
  ];

  const piedata = [
    { name: "Group A", value: 1 },
    { name: "Group B", value: 1 },
  ];

  const yearArr = [
    {
      label: "Last Year",
      value: "last_year",
    },
    {
      label: "Last Quarter",
      value: "last_quarter",
    },
    {
      label: "Last Month",
      value: "last_month",
    },
    {
      label: "Last Week",
      value: "last_week",
    },
    {
      label: "Today",
      value: "today",
    },
  ];

  const tableTopRTOCustomer = [
    {
      customer: "Aman Roy",
      product: "MAc Book Pro",
      sold: "0",
      revenue: "₹0",
    },
    {
      customer: "Aman Roy",
      product: "MAc Book Pro",
      sold: "0",
      revenue: "₹0",
    },
    {
      customer: "Aman Roy",
      sold: "0",
      revenue: "₹0",
    },
    {
      customer: "Aman Roy",
      product: "MAc Book Pro",
      sold: "0",
      revenue: "₹0",
    },
    {
      customer: "Aman Roy",
      product: "MAc Book Pro",
      sold: "0",
      revenue: "₹0",
    },
  ];

  const tableTopRTOCustomerCol = [
    columnsHelper.accessor("customer", {
      header: () => {
        return (
          <p
            className={`font-Open  
               text-base leading-[22px] text-[#1C1C1C]
             font-semibold   text-start  whitespace-nowrap`}
          >
            Customer
          </p>
        );
      },

      cell: (info: any) => {
        return (
          <p className="flex items-center  text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.customer}
          </p>
        );
      },
    }),

    columnsHelper.accessor("product", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            Product
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.product}
          </div>
        );
      },
    }),
    columnsHelper.accessor("count", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            Order Count
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.sold}
          </div>
        );
      },
    }),
    columnsHelper.accessor("revenue", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            Revenue
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center first-letter:justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.revenue}
          </div>
        );
      },
    }),
  ];

  const tableRTOInCities = [
    {
      city: "Kolkata",
      pincode: "0",
      rtoCount: "0",
      percentage: "0%",
      product: "Mac Book Pro",
    },
    {
      city: "Kolkata",
      pincode: "0",
      rtoCount: "0",
      percentage: "0%",
      product: "Mac Book Pro",
    },
    {
      city: "Kolkata",
      pincode: "0",
      rtoCount: "0",
      percentage: "0%",
      product: "Mac Book Pro",
    },
    {
      city: "Kolkata",
      pincode: "0",
      rtoCount: "0",
      percentage: "0%",
      product: "Mac Book Pro",
    },
    {
      city: "Kolkata",
      pincode: "0",
      rtoCount: "0",
      percentage: "0%",
      product: "Mac Book Pro",
    },
  ];

  const tableRTOInCitiesCol = [
    columnsHelper.accessor("city", {
      header: () => {
        return (
          <p
            className={`font-Open  
               text-base leading-[22px] text-[#1C1C1C]
             font-semibold   text-start  whitespace-nowrap`}
          >
            City
          </p>
        );
      },

      cell: (info: any) => {
        return (
          <p className="flex items-center  text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.city}
          </p>
        );
      },
    }),

    columnsHelper.accessor("pincode", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            Pincode
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.pincode}
          </div>
        );
      },
    }),
    columnsHelper.accessor("rtoCount", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            RTO Count
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center first-letter:justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.rtoCount}
          </div>
        );
      },
    }),
    columnsHelper.accessor("percentage", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            Percentage
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center first-letter:justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.percentage}
          </div>
        );
      },
    }),
    columnsHelper.accessor("product", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            Product
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center first-letter:justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.product}
          </div>
        );
      },
    }),
  ];

  const ndrDeliveryData = [
    {
      name: "Page A",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Page B",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Page C",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Page D",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Page E",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Page F",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Page G",
      uv: 0,
      pv: 0,
      amt: 0,
    },
  ];

  const sellerResponseData = [
    {
      name: "Page A",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Page B",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Page C",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Page D",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Page E",
      uv: 0,
      pv: 0,
      amt: 0,
    },
    {
      name: "Page F",
      uv: 0,
      pv: 0,
      amt: 0,
    },
  ];

  const CODData = [
    {
      product: "Product 1 | Product 2",
      category: "Electronics",
      priceRange: "₹0 - ₹0",
      count: "₹0",
    },
    {
      product: "Product 1 | Product 2",
      category: "Electronics",
      priceRange: "₹0 - ₹0",
      count: "₹0",
    },
    {
      product: "Product 1 | Product 2",
      category: "Electronics",
      priceRange: "₹0 - ₹0",
      count: "₹0",
    },
    {
      product: "Product 1 | Product 2",
      category: "Electronics",
      priceRange: "₹0 - ₹0",
      count: "₹0",
    },
    {
      product: "Product 1 | Product 2",
      category: "Electronics",
      priceRange: "₹0 - ₹0",
      count: "₹0",
    },
  ];

  const CODDataCol = [
    columnsHelper.accessor("productName", {
      header: () => {
        return (
          <p
            className={`font-Open  
               text-base leading-[22px] text-[#1C1C1C]
             font-semibold   text-start  whitespace-nowrap`}
          >
            Product Name
          </p>
        );
      },

      cell: (info: any) => {
        return (
          <p className="flex items-center  text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.product}
          </p>
        );
      },
    }),

    columnsHelper.accessor("category", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            Product Category
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.category}
          </div>
        );
      },
    }),
    columnsHelper.accessor("priceRange", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            Price Range
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center first-letter:justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.priceRange}
          </div>
        );
      },
    }),
    columnsHelper.accessor("count", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            Count
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center first-letter:justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.count}
          </div>
        );
      },
    }),
  ];

  return (
    <div className="m-4">
      <div className="flex justify-between gap-4 mt-6 mb-10 customScroll">
        {ordersArr?.map((order: any, i: number) => (
          <div
            className="w-[17rem] lg:h-[6.6rem] rounded-lg border-2 lg:overflow-hidden"
            key={i}
          >
            <div className="flex justify-between min-w-[226px] p-3 lg:px-6 lg:py-4">
              <div>
                <div className="font-bold font-Lato mb-2 text-[#1C1C1C] text-[22px] lg:text-[2rem]">
                  {order?.count}
                </div>
                <p className="text-[#1C1C1C] font-normal font-Open text-sm lg:text-base">
                  {order?.text}
                </p>
              </div>
              <div className="self-center  hidden lg:block">
                <img src={objectIcon[order?.img]} alt="Box" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:border-2 gap-y-6 mb-6 lg:mb-4  lg:gap-4 rounded-lg lg:shadow-xl">
        <BarChart2
          text="Total NDR"
          img={Box}
          data={orderArr}
          yearArr={yearArr}
          ndr={true}
        />
        <div className="lg:mt-[3.125rem] p-4 gap-6 lg:space-y-[60px] lg:grid grid-cols-2 lg:grid-cols-1 hidden ">
          <div>
            <div className="flex justify-between">
              <h1 className="text-[2rem] font-bold font-Lato">0</h1>
              <img src={GreenEllipse} alt="GreenEllipse" />
            </div>
            <p className="text-[1rem] font-Open font-normal mt-[0.75px]">
              Total NDR
            </p>
          </div>
          <div>
            <div className="flex justify-between">
              <h1 className="text-[2rem] font-bold font-Lato">0</h1>
              <img src={RedEllipse} alt="RedEllipse" />
            </div>
            <p className="text-[1rem] font-Open font-normal mt-[0.75px]">
              Delivered
            </p>
          </div>
          <div>
            <div className="flex justify-between">
              <h1 className="text-[2rem] font-bold font-Lato">0</h1>
              <img src={GreenEllipse} alt="GreenEllipse" />
            </div>
            <p className="text-[1rem] font-Open font-normal mt-[0.75px]">RTO</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-y-6 mb-6 lg:mb-4 lg:gap-4  rounded-lg lg:shadow-xl">
        <PieChart
          text="NDR Communication"
          img={Whatsapp}
          data={piedata}
          yearArr={yearArr}
        />
        <StackedChart
          text="NDR and Delivery Attempt"
          img={Box}
          data={ndrDeliveryData}
          yearArr={yearArr}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2  gap-y-6  mb-6 lg:mb-4 lg:gap-4  rounded-lg lg:shadow-xl">
        <ComposedChart
          text="Seller Reponse"
          img={Profile}
          data={sellerResponseData}
          yearArr={yearArr}
        />
        <ComposedChart
          text="Buyer Reponse"
          img={Profile}
          data={sellerResponseData}
          yearArr={yearArr}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-y-6  mb-6 lg:mb-4 rounded-lg lg:shadow-xl">
        <BarChart2
          text="Partner Wise RTO Ratio"
          img={PlanIcon}
          data={orderArr}
          yearArr={yearArr}
        />
        <BarChart2
          text="Customer"
          img={Profile}
          data={orderArr}
          yearArr={yearArr}
        />
      </div>
      <div className="grid  grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-y-6 mb-6 lg:mb-4 rounded-lg lg:shadow-xl">
        <BarChart2
          text="Courier And Attempts"
          img={PaymnetIcon}
          data={orderArr}
          yearArr={yearArr}
        />
        <BarChart2
          text="Courier Service"
          img={Profile}
          data={orderArr}
          yearArr={yearArr}
        />
      </div>
      <div className="grid grid-cols-1  lg:grid-cols-2 lg:gap-4  gap-y-6 mb-6 lg:mb-4 rounded-lg lg:shadow-xl">
        <BarChart2
          text="RTO Initiated"
          img={VanWithoutBG}
          data={orderArr}
          yearArr={yearArr}
        />
        <PieChart
          text="RTO Reason"
          img={VanWithoutBG}
          data={piedata}
          yearArr={yearArr}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2  lg:gap-4 gap-y-6 mb-6 lg:mb-4 rounded-lg lg:shadow-xl">
        <TableDetails
          text="Top RTO Customer"
          img={Layer}
          col={tableTopRTOCustomerCol}
          data={tableTopRTOCustomer}
          yearArr={yearArr}
        />
        <TableDetails
          text="RTO In Cities and Pin Codes"
          img={Profile}
          col={tableRTOInCitiesCol}
          data={tableRTOInCities}
          yearArr={yearArr}
        />
      </div>
      <div className="flex w-full mb-6 lg:mb-4 rounded-lg lg:shadow-xl">
        <TableDetails
          text="COD"
          img={Layer}
          col={CODDataCol}
          data={CODData}
          yearArr={yearArr}
        />
      </div>
    </div>
  );
};

export default Exception;
