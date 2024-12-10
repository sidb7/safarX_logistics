import * as React from "react";
import ReactApexChart from "react-apexcharts";

interface IWeightDiscrepancyProps {}

const WeightDiscrepancy: React.FunctionComponent<IWeightDiscrepancyProps> = (
  props
) => {
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
  return (
    <>
      <div className="flex flex-col mb-5">
        <div className="rounded-tr-xl rounded-tl-xl pl-3 pr-4 py-4 bg-[#F6F6F6] ">
          <div className="flex justify-between items-center text-center">
            <div className="flex items-center gap-x-[10px]">
              {/* <img src={ChannelIcon} alt="" /> */}
              <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C]">
                Weight Discrepancy
              </span>
            </div>
          </div>
        </div>
        <div className="border-[#E8E8E8] border-r-[1px] border-l-[1px] border-b-[1px] rounded-b-xl pl-6 pr-4 pt-6 pb-4 !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)] ">
          <div>
            <p className="font-Open font-normal leading-5 text-sm">
              Average Dispute Amount
            </p>
            <p className="font-Open font-normal leading-9 text-2xl">
              ₹ {"90, 876"}
            </p>
          </div>
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </>
  );
};

export default WeightDiscrepancy;
