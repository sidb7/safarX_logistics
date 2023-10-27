import React from "react";
import CreateOrderIcon from "../../../assets/createdOrder.svg";
import ShippedIcon from "../../../assets/shipped.svg";
import InTransitIcon from "../../../assets/inTransit.svg";
import BarChart2 from "../Common/BarChart2";
import PieChart from "../Common/PieChart";
import Box from "../../../assets/Delivery Icon.svg";
import Profile from "../../../assets/contact.png";
import PlanIcon from "../../../assets/Delivery.svg";
import Layer from "../../../assets/layer.svg";
import LocationIcon from "../../../assets/Location.png";
import TableDetails from "./tableDetails";
import PaymnetIcon from "../../../assets/payment.svg";
import { createColumnHelper } from "@tanstack/react-table";

const Orders = () => {
  const columnsHelper = createColumnHelper<any>();
  const ordersArr = [
    {
      count: 0,
      text: "Created Order",
      img: CreateOrderIcon,
    },
    {
      count: 0,
      text: "Shipped",
      img: ShippedIcon,
    },
    {
      count: 0,
      text: "In Transit",
      img: InTransitIcon,
    },
    {
      count: 0,
      text: "Delivered",
      img: InTransitIcon,
    },
  ];

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

  const tableData = [
    {
      state: "Uttar Pradesh",
      count: "0",
      revenue: "₹0",
    },
    {
      state: "Maharastra",
      count: "0",
      revenue: "₹0",
    },
    {
      state: "Karnataka",
      count: "0",
      revenue: "₹0",
    },
    {
      state: "Tamil nadu",
      count: "0",
      revenue: "₹0",
    },
    {
      state: "Telangana",
      count: "0",
      revenue: "₹0",
    },
  ];

  const tableDataCol = [
    columnsHelper.accessor("states", {
      header: () => {
        return (
          <p
            className={`font-Open  
               text-base leading-[22px] text-[#1C1C1C]
             font-semibold   text-start  whitespace-nowrap`}
          >
            States
          </p>
        );
      },

      cell: (info: any) => {
        return (
          <p className="flex items-center  text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.state}
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

  const tableTopProducts = [
    {
      products: "Sumsung Galaxy",
      sold: "0",
      revenue: "₹0",
    },
    {
      products: "Sumsung Galaxy",
      sold: "0",
      revenue: "₹0",
    },
    {
      products: "Sumsung Galaxy",
      sold: "0",
      revenue: "₹0",
    },
    {
      products: "Sumsung Galaxy",
      sold: "0",
      revenue: "₹0",
    },
    {
      products: "Sumsung Galaxy",
      sold: "0",
      revenue: "₹0",
    },
  ];

  const tableTopProductsCol = [
    columnsHelper.accessor("products", {
      header: () => {
        return (
          <p
            className={`font-Open  
               text-base leading-[22px] text-[#1C1C1C]
             font-semibold   text-start  whitespace-nowrap`}
          >
            Products
          </p>
        );
      },

      cell: (info: any) => {
        return (
          <p className="flex items-center  text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.products}
          </p>
        );
      },
    }),

    columnsHelper.accessor("sold", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            Sold
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

  const tableTopCustomer = [
    {
      name: "Aman Roy",
      order: "0",
      revenue: "₹0",
    },
    {
      name: "Aman Roy",
      order: "0",
      revenue: "₹0",
    },
    {
      name: "Aman Roy",
      order: "0",
      revenue: "₹0",
    },
    {
      name: "Aman Roy",
      order: "0",
      revenue: "₹0",
    },
    {
      name: "Aman Roy",
      order: "0",
      revenue: "₹0",
    },
  ];

  const tableTopCustomerCol = [
    columnsHelper.accessor("name", {
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
            {info.row.original.name}
          </p>
        );
      },
    }),

    columnsHelper.accessor("orders", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#1C1C1C] text-center ">
            Orders
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.order}
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
      <div className="grid grid-cols-2 border-2 gap-4 mt-4 rounded-lg shadow-xl">
        <BarChart2
          text="Order Count"
          img={Box}
          data={orderArr}
          yearArr={yearArr}
        />
        <PieChart
          text="Business"
          img={Profile}
          data={piedata}
          yearArr={yearArr}
        />
      </div>
      <div className="grid grid-cols-2 border-2 gap-4 mt-4 rounded-lg shadow-xl">
        <BarChart2
          text="Channels By Order Comparison"
          img={Box}
          data={orderArr}
          yearArr={yearArr}
        />
        <PieChart
          text="Orders By Channels"
          img={PlanIcon}
          data={piedata}
          yearArr={yearArr}
        />
      </div>
      <div className="grid grid-cols-2 border-2 gap-4 mt-4 rounded-lg shadow-xl">
        <PieChart
          text="Product Categories"
          img={Layer}
          data={piedata}
          yearArr={yearArr}
        />
        <TableDetails
          text="Proper Order Location"
          img={LocationIcon}
          col={tableDataCol}
          data={tableData}
          yearArr={yearArr}
        />
      </div>
      <div className="grid grid-cols-2 border-2 gap-4 mt-4 rounded-lg shadow-xl">
        <PieChart
          text="Order By Servuce"
          img={PlanIcon}
          data={piedata}
          yearArr={yearArr}
        />
        <PieChart
          text="Customer"
          img={Profile}
          data={piedata}
          yearArr={yearArr}
        />
      </div>
      <div className="grid grid-cols-2 border-2 gap-4 mt-4 rounded-lg shadow-xl">
        <PieChart
          text="Payment Mode"
          img={PaymnetIcon}
          data={piedata}
          yearArr={yearArr}
        />
        <PieChart
          text="Courier Service"
          img={Profile}
          data={piedata}
          yearArr={yearArr}
        />
      </div>
      <div className="grid grid-cols-2 border-2 gap-4 mt-4 rounded-lg shadow-xl">
        <TableDetails
          text="Top Products"
          img={Layer}
          col={tableTopProductsCol}
          data={tableTopProducts}
          yearArr={yearArr}
        />
        <TableDetails
          text="Top Customer"
          img={Profile}
          col={tableTopCustomerCol}
          data={tableTopCustomer}
          yearArr={yearArr}
        />
      </div>
    </div>
  );
};

export default Orders;
