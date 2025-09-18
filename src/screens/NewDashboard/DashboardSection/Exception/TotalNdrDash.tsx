import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const TotalNdrDash = () => {
  const data = {
    Jan: { ndr: 80, delivered: 70, rto: 40 },
    Feb: { ndr: 65, delivered: 50, rto: 55 },
    Mar: { ndr: 45, delivered: 35, rto: 45 },
    Apr: { ndr: 60, delivered: 50, rto: 28 },
    May: { ndr: 55, delivered: 45, rto: 38 },
    Jun: { ndr: 75, delivered: 45, rto: 72 },
    Jul: { ndr: 62, delivered: 50, rto: 35 },
    Aug: { ndr: 70, delivered: 52, rto: 55 },
    Sep: { ndr: 58, delivered: 50, rto: 28 },
    Oct: { ndr: 75, delivered: 65, rto: 48 },
    Nov: { ndr: 48, delivered: 35, rto: 38 },
    Dec: { ndr: 65, delivered: 55, rto: 22 },
  };

  const last7Dates = [
    "26 Nov",
    "27 Nov",
    "28 Nov",
    "29 Nov",
    "30 Nov",
    "1 Dec",
    "2 Dec",
  ];

  const ndr = [80, 65, 45, 60, 55, 75, 62];
  const delivered = [70, 50, 35, 50, 45, 45, 50];
  const rto = [40, 55, 45, 28, 38, 72, 35];

  const totalNDR = ndr.reduce((acc, curr) => acc + curr, 0);
  const totalDelivered = delivered.reduce((acc, curr) => acc + curr, 0);
  const totalRTO = rto.reduce((acc, curr) => acc + curr, 0);

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      height: 350,
      background: "transparent",
      fontFamily: "Open Sans, sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        borderRadius: 0,
        distributed: false,
      },
    },
    colors: ["#7CCA62", "#F0A22E", "#F35838"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: last7Dates,
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
          fontFamily: "Open Sans, sans-serif",
          fontWeight: 600,
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      max: 100,
      tickAmount: 5,
      title: {
        text: "Exceptions per 100 Orders",
      },
      labels: {
        formatter: function (value: number) {
          return value.toFixed(0);
        },
        style: {
          colors: "#6B7280",
          fontSize: "12px",
          fontFamily: "Open Sans, sans-serif",
          fontWeight: 600,
        },
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      fontFamily: "Open Sans, sans-serif",
      fontWeight: 600,
      offsetX: 0,
      offsetY: 8,
      labels: {
        colors: "#6B7280",
      },
      markers: {
        size: 10,
        strokeWidth: 2,
        shape: "circle",
      },
    },
    tooltip: {
      y: {
        formatter: function (value: number) {
          return value.toFixed(0) + " per 100 orders";
        },
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
  };

  const series = [
    {
      name: "Exception (NDR)",
      data: ndr,
    },
    {
      name: "Exception Delivered",
      data: delivered,
    },
    {
      name: "RTO",
      data: rto,
    },
  ];

  return (
    <div className="pt-2 w-full">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-semibold text-sm">
                Total NDR
              </span>
            </div>
            <select className="border rounded-md px-3 py-1 text-sm bg-white">
              <option>Last Year</option>
            </select>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-4 p-4 border-b">
          {/* Total NDR Metric */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Total NDR</p>
              <p className="text-2xl font-bold">{totalNDR}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-[#160783] text-xl">↑</span>
            </div>
          </div>

          {/* Delivered Metric */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Delivered</p>
              <p className="text-2xl font-bold">{totalDelivered}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 text-xl">↓</span>
            </div>
          </div>

          {/* RTO Metric */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">RTO</p>
              <p className="text-2xl font-bold">{totalRTO}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-xl">↑</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="p-4">
          <div className="h-[400px]">
            <ReactApexChart
              options={chartOptions}
              series={series}
              type="bar"
              height="100%"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalNdrDash;
