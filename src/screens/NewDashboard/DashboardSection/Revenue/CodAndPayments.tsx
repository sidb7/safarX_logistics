import React from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import PaymentsIcon from "../../../../assets/payment.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  commaSeparator,
  selectDataByTableIdsRevenue,
} from "../../../../utils/utility";

interface ICodAndPaymentsProps {}

const CodAndPayments: React.FunctionComponent<ICodAndPaymentsProps> = (
  props
) => {
  const { revenueLoading } = useSelector(
    (state: RootState) => state.dashboardRevenue
  );
  // console.log("🚀 ~ revenueLoading:", revenueLoading);

  // Select data for multiple table IDs
  const multipleTableDataCODAndPayments = useSelector(
    (state: RootState) => selectDataByTableIdsRevenue(state, [10, 11]) || []
  );
  // console.log(
  //   "🚀 ~ multipleTableDataCODAndPayments:",
  //   multipleTableDataCODAndPayments
  // );

  const dataForPayments: any = multipleTableDataCODAndPayments.filter(
    (item) => item.tableId === 10
  );
  // console.log("🚀 ~ dataForRevenueTotals:", dataForRevenueTotals);

  const dataForRevenueAndCount = multipleTableDataCODAndPayments.filter(
    (item) => item.tableId === 11
  );
  // console.log("🚀 ~ dataForRevenueAndCount:", dataForRevenueAndCount);

  const donutSeries: any = dataForPayments[0]?.data?.map(
    (item: any) => +item?.percentage.toFixed(2) || 0
  ) || [0];
  // console.log("🚀 ~ donutSeries:", donutSeries);
  const donutLabels: any = dataForPayments[0]?.data?.map(
    (item: any) => item?.paymentType || "Unknown"
  ) || ["Unknown"];
  // console.log("🚀 ~ donutLabels:", donutLabels);

  const seriesData = [
    dataForRevenueAndCount[0]?.eligibleAmount || 0,
    dataForRevenueAndCount[0]?.remittedAmount || 0,
    dataForRevenueAndCount[0]?.payableAmount || 0,
    dataForRevenueAndCount[0]?.totalPaidTillDate || 0,
  ];

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

        borderRadius: 3,
        dataLabels: {
          position: "end", // Positions labels at the end of the bars
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "14px",
        fontFamily: "Open Sans",
        lineHieght: "20px",
        colors: ["#adb5bd"],
      },
      formatter: (val: any) => `${val.toLocaleString()}`,
      textAnchor: "start", // Ensures text aligns properly
      offsetX: 10, // Moves labels further outside to prevent overlap
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
      data: seriesData,
    },
  ];

  // Options for the Donut Chart
  const donutOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: donutLabels,
    colors: ["#3371FF", "#F3B558"], // Default colors
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "Open Sans",
      fontWeight: 400,
      itemMargin: {
        horizontal: 25,
        vertical: 10,
      },
      markers: {
        offsetX: -5,
        offsetY: 0,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => {
        const dataIndex = opts?.dataPointIndex ?? 0;
        const count = dataForPayments[0]?.data?.[dataIndex]?.count || 0;
        const percentage = typeof val === "number" ? val.toFixed(2) : "0.00";
        return `${percentage}%`;
      },
    },
    tooltip: {
      y: {
        formatter: (val, opts) => {
          const dataIndex = opts?.dataPointIndex ?? 0;
          const count = dataForPayments[0]?.data?.[dataIndex]?.count || 0;
          const percentage = typeof val === "number" ? val.toFixed(2) : "0.00";
          return `${percentage}% (${commaSeparator(count)} orders)`;
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
          },
        },
      },
    },
  };

  return (
    <>
      {revenueLoading ? (
        <>
        </>
      ) : (
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
                  series={donutSeries}
                  options={donutOptions}
                  height={360}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CodAndPayments;
