import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const NDRCommunication = () => {
  const options: ApexOptions = {
    chart: {
      type: "donut",
      background: "transparent",
      fontFamily: "Open Sans, sans-serif",
    },
    colors: ["#3371FF", "#7CCA62", "#F3B558", "#F78A74"],
    labels: ["Whatsapp", "Call", "SMS", "Email"],
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toString() + "%";
      },
      style: {
        fontSize: "12px",
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 600,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
        },
        expandOnClick: false,
      },
    },
    legend: {
      position: "right",
      fontSize: "12px",
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 600,
      offsetY: 0,
      offsetX: 0,
      markers: {
        size: 10,
        strokeWidth: 2,
        shape: "circle",
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5,
      },
      labels: {
        colors: "#000000",
      },
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
  };

  const series = [55, 15, 18, 12];

  return (
    <div className="w-full  h-full shadow-lg rounded-lg overflow-hidden">
      <div className="border-b p-4 bg-gray-50 border border-[#E8E8E8]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-semibold text-sm">
              NDR Communication{" "}
            </span>
          </div>
          <select className="border rounded-md px-3 py-1 text-sm bg-white">
            <option>Last Year</option>
          </select>
        </div>
      </div>
      {/* 491.2
      59.2  */}
      <div className="bg-white p-4   ">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          // height={800}
        />
      </div>
    </div>
  );
};

export default NDRCommunication;
