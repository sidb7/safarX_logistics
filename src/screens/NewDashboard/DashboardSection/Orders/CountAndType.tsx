import { merge } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  BaseOptionChart,
  selectDataByTableIds,
} from "../../../../utils/utility";
import boxIcon from "../.././../../assets/box-reverse-icon.svg";
import profileIcon from "../../../../assets/Contact.svg";
import { ApexOptions } from "apexcharts";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

interface ICountAndTypeProps {}

const CountAndType: React.FunctionComponent<ICountAndTypeProps> = (props) => {
  const [countAndTypeData, setCountAndTypeData] = useState<any[]>([]);
  console.log("🚀 ~ countAndTypeData1:", countAndTypeData);
  // const dashboardData = useSelector((state: RootState) => state.dashboard.data);
  // console.log("🚀 ~ dashboardData:", dashboardData);

  // Select data for multiple table IDs
  const multipleTableData = useSelector((state: RootState) =>
    selectDataByTableIds(state, [2, 3])
  );
  console.log("🚀 ~ multipleTableData:", multipleTableData);

  const memoizedTableData = useMemo(
    () => multipleTableData,
    [multipleTableData]
  );

  console.log("🚀 ~ multipleTableData:", memoizedTableData);

  // Update local state only when data changes
  useEffect(() => {
    if (
      memoizedTableData &&
      Array.isArray(memoizedTableData) &&
      JSON.stringify(memoizedTableData) !== JSON.stringify(countAndTypeData)
    ) {
      setCountAndTypeData(memoizedTableData);
    }
  }, [memoizedTableData]);
  console.log("🚀 ~ countAndTypeData2:", countAndTypeData);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      fontFamily: "inherit",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Exceptions per 100 Orders",
      },
      min: 0,
      max: 10,
      tickAmount: 5,
    },
    fill: {
      opacity: 1,
    },
    colors: ["#004EFF", "#7CCA62", "#F57960", "#F3B558"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "Open Sans",
      fontWeight: 400,
      offsetX: 0,
      offsetY: 8,
      markers: {
        shape: "circle", // Makes the markers circular
        offsetX: -5,
      },
      itemMargin: {
        horizontal: 15, // Adjusts horizontal space between legend items
        vertical: 0, // Adjusts vertical space between legend items
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
    // tooltip: {
    //   y: {
    //     formatter: function (val: number) {
    //       return val + " per 100 orders";
    //     },
    //   },
    // },
  };

  const series = [
    {
      name: "Total Orders",
      data: [8.7, 6.3, 5.0, 6.4, 5.0, 6.4, 4.8],
    },
    {
      name: "Delivered",
      data: [5.2, 3.8, 3.3, 7.1, 6.2, 3.8, 7.1],
    },
    {
      name: "Undelivered",
      data: [6.5, 4.7, 8.2, 4.7, 6.9, 4.7, 3.5],
    },
    {
      name: "RTO",
      data: [6.5, 4.7, 8.2, 4.7, 6.9, 4.7, 3.5],
    },
  ];

  // Options for the Donut Chart
  // const donutOptions: ApexOptions = {
  //   chart: {
  //     type: "donut",
  //   },
  //   labels: ["Consumer", "Business"],
  //   colors: ["#3371FF", "#F3B558"], // Blue for Consumer, Yellow for Business
  //   legend: {
  //     position: "bottom",
  //     horizontalAlign: "center",
  //     markers: {
  //       shape: "circle", // Circular markers for the legend
  //       offsetX: -5, // Space between marker and text
  //     },
  //     itemMargin: {
  //       horizontal: 25, // Adjusts horizontal space between legend items
  //       vertical: 5, // Adjusts vertical space between legend items
  //     },
  //     // formatter: function (label: string, opts: any) {
  //     //   const seriesValue = opts?.w?.config?.series[opts.seriesIndex];
  //     //   if (seriesValue === undefined) return label; // Default to label if seriesValue is undefined
  //     //   const total =
  //     //     opts?.w?.config?.series?.reduce((a: number, b: number) => a + b, 0) ||
  //     //     1;
  //     //   const percentage = ((seriesValue / total) * 100).toFixed(0); // Calculate percentage
  //     //   return `${label} (${percentage}%)`;
  //     // },
  //   },
  //   dataLabels: {
  //     enabled: true,
  //     // formatter: function (val: string | number | number[]) {
  //     //   if (typeof val === "number") {
  //     //     // If val is a number, format it to a percentage
  //     //     return `${val.toFixed(0)}%`;
  //     //   } else if (Array.isArray(val)) {
  //     //     // If val is an array, join it (this case is unlikely for donut charts)
  //     //     return val.join(", ");
  //     //   } else {
  //     //     // If val is a string (fallback case)
  //     //     return val;
  //     //   }
  //     // },
  //   },

  //   // tooltip: {
  //   //   y: {
  //   //     formatter: function (val: number | undefined) {
  //   //       if (val === undefined) return ""; // Default to empty string if val is undefined
  //   //       return `${val.toFixed(0)}%`; // Tooltip shows percentage
  //   //     },
  //   //   },
  //   // },
  //   stroke: {
  //     width: 0, // No border for slices
  //   },
  //   responsive: [
  //     {
  //       breakpoint: 600,
  //       options: {
  //         legend: {
  //           fontSize: "12px",
  //         },
  //       },
  //     },
  //   ],
  // };

  // Type-safe formatter function
  const safePercentageFormatter = (
    val: number | string | number[] | undefined
  ): string => {
    // Handle different possible input types
    if (typeof val === "number") {
      return `${val.toFixed(0)}%`;
    } else if (Array.isArray(val)) {
      // If it's an array, take the first number
      return val.length > 0 && typeof val[0] === "number"
        ? `${val[0].toFixed(0)}%`
        : "0%";
    }
    return "0%";
  };
  // Options for the Donut Chart
  const donutOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Consumer", "Business"],
    colors: ["#3371FF", "#F3B558"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    dataLabels: {
      enabled: true,
      formatter: safePercentageFormatter,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: () => "100%",
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: safePercentageFormatter,
      },
    },
  };

  // Data for the Donut Chart
  const donutseries = [70, 30]; // Values for each slice

  return (
    <>
      <div className="flex gap-x-6 mt-4 h-[500px]">
        <div className="flex-1 h-full">
          <div className="flex flex-col h-full">
            <div className="rounded-tr-xl rounded-tl-xl pl-3 pr-4 py-4 bg-[#F6F6F6] ">
              <div className="flex justify-between items-center text-center">
                <div className="flex items-center gap-x-[10px]">
                  <img src={boxIcon} alt="" />
                  <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C]">
                    Order Count
                  </span>
                </div>
              </div>
            </div>
            <div className=" h-full border-[#E8E8E8] border-r-[1px] border-l-[1px] border-b-[1px] rounded-b-xl pl-6 pr-4 pt-6 pb-4 !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)] ">
              <ReactApexChart
                type="bar"
                series={series}
                options={options}
                height={"100%"}
              />
            </div>
          </div>
        </div>
        <div className=" flex-2 aspect-square h-full ">
          <div className="flex flex-col h-full ">
            <div className="rounded-tr-xl rounded-tl-xl pl-3 pr-4 py-4 bg-[#F6F6F6] ">
              <div className="flex justify-between items-center text-center">
                <div className="flex items-center gap-x-[10px]">
                  <img src={profileIcon} alt="" />
                  <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C]">
                    Business
                  </span>
                </div>
              </div>
            </div>
            <div className="h-full py-4  border-[#E8E8E8] border-x-[1px] border-b-[1px] rounded-b-xl  !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)]">
              <ReactApexChart
                type="donut"
                series={donutseries}
                options={donutOptions}
                height={"100%"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountAndType;
