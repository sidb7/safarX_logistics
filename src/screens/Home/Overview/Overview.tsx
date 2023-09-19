import * as React from "react";
import CompanyImage from "../../../assets/Shipyaari_full_color rgb.svg";
import { ScrollNav } from "../../../components/ScrollNav";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import CustomDropDown from "../../../components/DropDown";
import CalenderIcon from "../../../assets/calendar.svg";
import GreenEllipse from "../../../assets/greenEllipse.svg";
import RedEllipse from "../../../assets/redEllipse.svg";
import SimpleChart from "../Common/Simplechart";
import Box from "../../../assets/Delivery Icon.svg";
import InvoiceIcon from "../../../assets/invoices.svg";
import BarChart from "../Common/BarChart";
import BarChart2 from "../Common/BarChart2";
import PieChart from "../Common/PieChart";
import Locations from "../Common/Locations";
import Invoices from "../Common/Invoices";

interface IOverview {}

export const Overview = (props: IOverview) => {
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

  const piedata = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const invoices1 = [
    {
      count: 230,
      text: "Total Invoices",
    },
    {
      count: 12,
      text: "Paid Invoices",
    },
    {
      count: 89,
      text: "Unpaid Invoices",
    },
    {
      count: 8,
      text: "Overdue Invoices",
    },
  ];

  const invoices2 = [
    {
      count: 230,
      text: "Total Invoices",
    },
    {
      count: 12,
      text: "Paid Invoices",
    },
    {
      count: 89,
      text: "Dispute Rejected By Courier",
    },
    {
      count: 8,
      text: "Average Dispute Amount",
    },
  ];

  const ordersArr = [
    {
      count: 23,
      text: "Orders need to be proceed",
    },
    {
      count: 28,
      text: "Orders delayed for Pickup",
    },
    {
      count: 78,
      text: "RTO Orders",
    },
    {
      count: 78,
      text: "Orders in Weight Descripancy",
    },
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

  return (
    <div className="m-4">
      <div className="flex gap-2 mt-4">
        <img src={CalenderIcon} alt="CalenderIcon" />
        <span className="text-[1rem] font-semibold font-Open">
          Important Today
        </span>
      </div>
      <div className="flex justify-between !mt-4 gap-4 mb-10">
        {ordersArr?.map((order: any, i: number) => (
          <div
            className="w-[17rem] h-[6.6rem] rounded-lg border-2 overflow-hidden"
            key={i}
          >
            <div className="px-6 py-4">
              <div className="font-bold font-Lato mb-2 text-[#F57960] text-[2rem]">
                {order?.count}
              </div>
              <p className="text-[#1C1C1C] font-normal text-base">
                {order?.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 border-2 rounded-lg shadow-xl">
        <SimpleChart yearArr={yearArr} />
        <div className="mt-[3.125rem] p-4 space-y-[60px]">
          <div>
            <div className="flex justify-between">
              <h1 className="text-[2rem] font-bold font-Lato">&#8377;700</h1>
              <img src={GreenEllipse} alt="GreenEllipse" />
            </div>
            <p className="text-[1rem] font-Open font-normal mt-[0.75px]">
              Highest Order Value
            </p>
          </div>
          <div>
            <div className="flex justify-between">
              <h1 className="text-[2rem] font-bold font-Lato">&#8377;28,000</h1>
              <img src={RedEllipse} alt="RedEllipse" />
            </div>
            <p className="text-[1rem] font-Open font-normal mt-[0.75px]">
              Highest Order Value
            </p>
          </div>
          <div>
            <div className="flex justify-between">
              <h1 className="text-[2rem] font-bold font-Lato">&#8377;23,876</h1>
              <img src={GreenEllipse} alt="GreenEllipse" />
            </div>
            <p className="text-[1rem] font-Open font-normal mt-[0.75px]">
              Highest Order Value
            </p>
          </div>
        </div>
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
      <div className="grid grid-cols-2 border-2 gap-4 mt-4 rounded-lg shadow-xl">
        <BarChart
          text="Weight Discrenpancy"
          img={Box}
          data={orderArr}
          yearArr={yearArr}
        />
        <BarChart text="COD" img={Box} data={orderArr} yearArr={yearArr} />
      </div>
      <div className="grid grid-cols-2 border-2 gap-4 mt-4 rounded-lg shadow-xl">
        <BarChart2
          text="TAT Performance"
          img={Box}
          data={orderArr}
          yearArr={yearArr}
        />
        <PieChart text="COD" img={Box} data={piedata} yearArr={yearArr} />
      </div>
      <div className="border-2 gap-4 mt-4 rounded-lg shadow-xl">
        <Locations
          text="TAT Performance"
          img={Box}
          data={orderArr}
          yearArr={yearArr}
        />
      </div>
      <div className="grid grid-cols-2 border-2 gap-4 mt-4 rounded-lg shadow-xl">
        <Invoices
          text="Invoices"
          img={InvoiceIcon}
          data={invoices1}
          yearArr={yearArr}
        />
        <Invoices
          text="Invoices"
          img={InvoiceIcon}
          data={invoices2}
          yearArr={yearArr}
        />
      </div>
    </div>
  );
};

export default Overview;
