import React from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import PaymentsIcon from "../../../../assets/payment.svg";

interface ICodAndPaymentsProps {}

const CodAndPayments: React.FunctionComponent<ICodAndPaymentsProps> = (
  props
) => {
  // const barOptions: ApexOptions = {
  //   chart: {
  //     type: "bar",
  //     height: 350,
  //     toolbar: {
  //       show: false,
  //     },
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: true,
  //       columnWidth: "55%",
  //       borderRadius: 5,
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   stroke: {
  //     show: true,
  //     width: 2,
  //     colors: ["transparent"],
  //   },
  //   xaxis: {
  //     categories: ["#bar"],
  //   },
  // };

  const chartOptions: any = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      margin: {
        left: -20, // Reduces the left padding
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "60%",
        borderRadius: 5,
        dataLabels: {
          position: "end", // Positions labels at the end of the bars
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "10px",
        fontFamily: "Open Sans",
        lineHieght: "12px",
        colors: ["#adb5bd"],
      },
      formatter: (val: any) => `${val.toLocaleString()}`,
      textAnchor: "start", // Ensures text aligns properly
      offsetX: 30, // Moves labels further outside to prevent overlap
    },
    xaxis: {
      categories: [
        "Available COD",
        "COD remitted",
        "Total Payable COD",
        "Total COD Paid (Till date)",
      ],
      labels: {
        formatter: (val: any) => `${val}K`,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          lineHeight: "14px",
          fontFamily: "Open Sans",
          fontWeight: 400,
          color: "#6c757d",
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: any) => `${val.toLocaleString()}`,
      },
    },
    grid: {
      borderColor: "#e7e7e7",
    },
    colors: ["#0066FF"],
  };

  const chartSeries = [
    {
      name: "COD Values",
      data: [39779, 19027, 43887, 8142],
    },
  ];

  // Options for the Donut Chart
  const donutOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Consumer", "Business"],
    colors: ["#3371FF", "#F3B558"], // Blue for Consumer, Yellow for Business
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      markers: {
        shape: "circle", // Circular markers for the legend
        offsetX: -5, // Space between marker and text
      },
      itemMargin: {
        horizontal: 25, // Adjusts horizontal space between legend items
        vertical: 5, // Adjusts vertical space between legend items
      },
      // formatter: function (label: string, opts: any) {
      //   const seriesValue = opts?.w?.config?.series[opts.seriesIndex];
      //   if (seriesValue === undefined) return label; // Default to label if seriesValue is undefined
      //   const total =
      //     opts?.w?.config?.series?.reduce((a: number, b: number) => a + b, 0) ||
      //     1;
      //   const percentage = ((seriesValue / total) * 100).toFixed(0); // Calculate percentage
      //   return `${label} (${percentage}%)`;
      // },
    },
    dataLabels: {
      enabled: true,
      // formatter: function (val: string | number | number[]) {
      //   if (typeof val === "number") {
      //     // If val is a number, format it to a percentage
      //     return `${val.toFixed(0)}%`;
      //   } else if (Array.isArray(val)) {
      //     // If val is an array, join it (this case is unlikely for donut charts)
      //     return val.join(", ");
      //   } else {
      //     // If val is a string (fallback case)
      //     return val;
      //   }
      // },
    },

    // tooltip: {
    //   y: {
    //     formatter: function (val: number | undefined) {
    //       if (val === undefined) return ""; // Default to empty string if val is undefined
    //       return `${val.toFixed(0)}%`; // Tooltip shows percentage
    //     },
    //   },
    // },
    stroke: {
      width: 0, // No border for slices
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          legend: {
            fontSize: "12px",
          },
        },
      },
    ],
  };
  // Data for the Donut Chart
  const donutseries = [70, 30]; // Values for each slice
  return (
    <>
      <div className="grid grid-cols-2 gap-x-6 ">
        <div className="flex flex-col">
          <div className="rounded-tr-xl rounded-tl-xl pl-3 pr-4 py-4 bg-[#F6F6F6] ">
            <div className="flex justify-between items-center text-center">
              <div className="flex items-center gap-x-[10px]">
                {/* <img src={ChannelIcon} alt="" /> */}
                <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C]">
                  COD
                </span>
              </div>
            </div>
          </div>
          <div className="border-[#E8E8E8] border-r-[1px] border-l-[1px] border-b-[1px] rounded-b-xl pl-6 pr-4 pt-6 pb-4 !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)] ">
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={350}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="rounded-tr-xl rounded-tl-xl pl-3 pr-4 py-4 bg-[#F6F6F6] ">
            <div className="flex justify-between items-center text-center">
              <div className="flex items-center gap-x-[10px]">
                <img src={PaymentsIcon} alt="" />
                <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C]">
                  Payments
                </span>
              </div>
            </div>
          </div>
          <div className=" border-[#E8E8E8] border-x-[1px] border-b-[1px] rounded-b-xl pl-6 pr-4 pt-6 pb-4 !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)] ">
            <ReactApexChart
              type="donut"
              series={donutseries}
              options={donutOptions}
              height={360}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CodAndPayments;
