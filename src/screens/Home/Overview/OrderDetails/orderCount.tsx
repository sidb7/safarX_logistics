import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import BoxIcon from "../../../../assets/Delivery Icon.svg";
import ComingSoonGif from "../../../../assets/Coming Soon.gif";

interface IOrderCountProps {}

const OrderCount: React.FunctionComponent<IOrderCountProps> = (props) => {
  const [chartData] = useState<{
    series: ApexOptions["series"];
    options: ApexOptions;
  }>({
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      //   {
      //     name: "Revenue",
      //     data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      //   },
      //   {
      //     name: "Free Cash Flow",
      //     data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      //   },
    ],
    options: {
      chart: {
        type: "bar", // Type is now properly recognized
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "35%",
          //   endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val: any) => `$ ${val} thousands`,
        },
      },
    },
  });
  return (
    <>
      <div className="h-full">
        <div className="h-full flex flex-col ">
          <div className="rounded-tr-xl rounded-tl-xl px-4  h-[50px] bg-[#F6F6F6] ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src={BoxIcon} className="px-2" alt="" />
                <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C]">
                  {"Order Count"}
                </span>
              </div>
              <div className="pt-2">
                <div className="!h-9"></div>
              </div>
            </div>
          </div>
          <div className=" h-full flex-1  border-[#E8E8E8] border-x-[1px] border-b-[1px] rounded-b-xl pr-2 !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)] ">
            {/* <div id="chart">
              <ReactApexChart
                series={chartData?.series}
                options={chartData?.options}
                type="bar"
                height={470}
              />
            </div> */}
            <div className="flex flex-col justify-center items-center ">
              <img
                src={ComingSoonGif}
                alt="Feature Coming Soon"
                width={250}
                height={250}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div id="html-dist"></div> */}
    </>
  );
};

export default OrderCount;
