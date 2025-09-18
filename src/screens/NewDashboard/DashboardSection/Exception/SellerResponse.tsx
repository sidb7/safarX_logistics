import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const SellerResponse = () => {
  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      fontFamily: "inherit",
      stacked: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 0,
      },
    },
    stroke: {
      width: [0, 3],
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 5,
      colors: ["#F0A22E"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    xaxis: {
      categories: [
        "10 JUL",
        "11 JUL",
        "12 JUL",
        "13 JUL",
        "14 JUL",
        "15 UL",
        "16 JUL",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: 12,
      tickAmount: 6,
      labels: {
        formatter: (value) => value.toFixed(0),
      },
    },
    grid: {
      borderColor: "#f1f1f1",
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10,
      },
    },
    colors: ["#160783", "#F0A22E"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      offsetY: 8,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const series = [
    {
      name: "NDR Raised",
      type: "column",
      data: [11, 6, 8.2, 4, 9.5, 5, 5.5],
    },
    {
      name: "Seller Response",
      type: "line",
      data: [6.5, 4.5, 8, 4, 7.5, 4, 5.5],
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="border-b p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-semibold text-sm">
              Seller Response
            </span>
          </div>
          <select className="border rounded-md px-3 py-1 text-sm bg-white">
            <option>Last Year</option>
          </select>
        </div>
      </div>
      <div className="p-4">
        <div className="h-[400px] w-full">
          <ReactApexChart
            options={options}
            series={series}
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default SellerResponse;
