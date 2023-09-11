import React from "react";
import CreateOrderIcon from "../../../assets/createdOrder.svg";
import InTransitIcon from "../../../assets/inTransit.svg";
import BarChart2 from "../Common/BarChart2";
import PieChart from "../Common/PieChart";
import Box from "../../../assets/Delivery Icon.svg";
import Profile from "../../../assets/contact.png";
import PlanIcon from "../../../assets/Delivery.svg";
import Layer from "../../../assets/layer.svg";
import TableDetails from "./tableDetails";
import PaymnetIcon from "../../../assets/payment.svg";
import VanIcon from "../../../assets/van.svg";
import RedEllipse from "../../../assets/redEllipse.svg";
import { createColumnHelper } from "@tanstack/react-table";
import StackedChart from "../Common/StackedChart";
import ComposedChart from "../Common/ComposedChart";
import VanWithoutBG from "../../../assets/vanWithoutBG.svg";
import Whatsapp from "../../../assets/whatsapp.svg";
import CustomDropDown from "../../../components/DropDown";
import GreenEllipse from "../../../assets/greenEllipse.svg";
import LocationIcon from "../../../assets/Location.svg";
import BarChart from "../Common/BarChart";

const SyPerfromance = () => {
  const columnsHelper = createColumnHelper<any>();
  const ordersArr = [
    {
      count: 23,
      text: "Total NPR",
      img: CreateOrderIcon,
    },
    {
      count: 20,
      text: "Total NDR",
      img: InTransitIcon,
    },
    {
      count: 35,
      text: "RTO Initiated",
      img: VanIcon,
    },
    {
      count: 18,
      text: "RTO Delivered",
      img: VanIcon,
    },
  ];

  const piedata = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
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

  const orderRevenue = [
    {
      orderCount: 356,
      revenue: "₹7k",
      img: GreenEllipse,
      text: "Delivery",
    },
    {
      orderCount: 288,
      revenue: "₹6.5k",
      img: GreenEllipse,
      text: "Smartz",
    },
    {
      orderCount: 260,
      revenue: "₹6k",
      img: GreenEllipse,
      text: "DTDC",
    },
    {
      orderCount: 232,
      revenue: "₹5.3k",
      img: GreenEllipse,
      text: "BlueDart",
    },
  ];

  const topCourier = [
    {
      name: "Bluedart",
      count: "54",
      amount: "₹56,89024",
      rating: 4,
    },
    {
      name: "Bluedart",
      count: "54",
      amount: "₹56,89024",
      rating: 4,
    },
    {
      name: "Dart Plus",
      count: "54",
      amount: "₹56,89024",
      rating: 3,
    },
    {
      name: "Ekart",
      count: "54",
      amount: "₹56,89024",
      rating: 2,
    },
    {
      name: "DHL",
      count: "54",
      amount: "₹56,89024",
      rating: 3,
    },
    {
      name: "DHL",
      count: "54",
      amount: "₹56,89024",
      rating: 2,
    },
    {
      name: "Bluedart",
      count: "54",
      amount: "₹56,89024",
      rating: 4,
    },
  ];

  const orderArr = [
    {
      name: "Wed",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Thu",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Fri",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Sat",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Sun",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Mon",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Tue",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const topCourierCol = [
    columnsHelper.accessor("name", {
      header: () => {
        return (
          <p
            className={`font-Open  
               text-base leading-[22px] text-[#1C1C1C]
             font-semibold   text-start  whitespace-nowrap`}
          >
            Name
          </p>
        );
      },

      cell: (info: any) => {
        return (
          <p className="flex items-center  text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.name}
          </p>
        );
      },
    }),

    columnsHelper.accessor("orderCount", {
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
            {info.row.original.count}
          </div>
        );
      },
    }),
    columnsHelper.accessor("spenamount", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            Spend Amount
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center first-letter:justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.amount}
          </div>
        );
      },
    }),
    columnsHelper.accessor("feedback", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            Customer Feedback
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center first-letter:justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.rating}
          </div>
        );
      },
    }),
  ];

  const OrdersData = [
    {
      count: "23",
      totalorders: "12",
      deliverdorders: "34",
      rtoorders: "12",
      rtopercentage: "15%",
    },
    {
      count: "23",
      totalorders: "12",
      deliverdorders: "34",
      rtoorders: "12",
      rtopercentage: "15%",
    },
    {
      count: "23",
      totalorders: "12",
      deliverdorders: "34",
      rtoorders: "12",
      rtopercentage: "15%",
    },
    {
      count: "23",
      totalorders: "12",
      deliverdorders: "34",
      rtoorders: "12",
      rtopercentage: "15%",
    },
    {
      count: "23",
      totalorders: "12",
      deliverdorders: "34",
      rtoorders: "12",
      rtopercentage: "15%",
    },
    {
      count: "23",
      totalorders: "12",
      deliverdorders: "34",
      rtoorders: "12",
      rtopercentage: "15%",
    },
  ];

  const OrdersDataCol = [
    columnsHelper.accessor("ordercount", {
      header: () => {
        return (
          <p
            className={`font-Open  
               text-base leading-[22px] text-[#1C1C1C]
             font-semibold   text-start  whitespace-nowrap`}
          >
            Order Count
          </p>
        );
      },

      cell: (info: any) => {
        return (
          <p className="flex items-center  text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.count}
          </p>
        );
      },
    }),

    columnsHelper.accessor("totalorders", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            Total Orders
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.totalorders}
          </div>
        );
      },
    }),
    columnsHelper.accessor("rtodelivered", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            RTO Delivered
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.rtodelivered}
          </div>
        );
      },
    }),
    columnsHelper.accessor("rtoorders", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            RTO Orders
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center first-letter:justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.rtoorders}
          </div>
        );
      },
    }),
    columnsHelper.accessor("rtopercentage", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            RTO Percentage
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center first-letter:justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.rtopercentage}
          </div>
        );
      },
    }),
  ];

  return (
    <div className="m-4">
      <div className="flex justify-between gap-4 !mt-4 mb-10">
        {ordersArr?.map((order: any, i: number) => (
          <div
            className="w-[17rem] h-[6.6rem] rounded-lg border-2 overflow-hidden"
            key={i}
          >
            <div className="flex justify-between px-6 py-4">
              <div>
                <div className="font-bold font-Lato mb-2 text-[#1C1C1C] text-[2rem]">
                  {order?.count}
                </div>
                <p className="text-[#1C1C1C] font-normal text-base">
                  {order?.text}
                </p>
              </div>
              <div className="self-center">
                <img src={order?.img} alt="Box" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <h1 className="text-[1.375rem] font-Lato font-semibold capitalize">
          Top Performing Partners (orders & Revenue)
        </h1>
        <div>
          <CustomDropDown
            onChange={(e) => {}}
            options={yearArr}
            heading="Top to Least"
          />
        </div>
      </div>
      <div className="flex justify-between gap-4 !mt-4 mb-10">
        {orderRevenue?.map((order: any, i: number) => (
          <div
            className="w-[17rem] h-[8.75rem] rounded-lg border-2  px-4 py-2 overflow-hidden"
            key={i}
          >
            <div className="flex justify-between">
              <div>
                <span className="text-[0.875rem] font-Open font-normal">
                  Orders
                </span>
                <div className="font-bold font-Lato mb-2 text-[#1C1C1C] text-[2rem]">
                  {order?.orderCount}
                </div>
              </div>
              <div>
                <span className="text-[0.875rem] font-Open font-normal">
                  Revenue
                </span>
                <div className="font-bold font-Lato mb-2 text-[#1C1C1C] text-[2rem]">
                  {order?.revenue}
                </div>
              </div>
              <div className="self-center">
                <img src={order?.img} alt="Box" />
              </div>
            </div>
            <div>
              <span className="text-[1rem] font-Open font-normal">
                Delivery
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 border-2 gap-4 mt-4 rounded-lg shadow-xl">
        <TableDetails
          text="Proper Order Location"
          img={LocationIcon}
          col={topCourierCol}
          data={topCourier}
          yearArr={yearArr}
        />
        <PieChart
          text="Product Categories"
          img={Layer}
          data={piedata}
          yearArr={yearArr}
        />
      </div>
      <div className="grid grid-cols-2 border-2 gap-4 mt-4 rounded-lg shadow-xl">
        <BarChart
          text="Order Details"
          img={Box}
          data={orderArr}
          yearArr={yearArr}
        />
        <BarChart
          text="Order Count"
          img={Box}
          data={orderArr}
          yearArr={yearArr}
        />
      </div>
      <div className="flex border-2 w-full mt-4 rounded-lg shadow-xl">
        <TableDetails
          text="COD"
          img={Layer}
          col={OrdersDataCol}
          data={OrdersData}
          yearArr={yearArr}
        />
      </div>
    </div>
  );
};

export default SyPerfromance;
