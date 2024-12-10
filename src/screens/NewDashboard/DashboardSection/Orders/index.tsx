import React, { useState } from "react";
import { Spinner } from "../../../../components/Spinner";
import ReactApexChart from "react-apexcharts";
import { merge } from "lodash";
import { BaseOptionChart } from "../../../../utils/utility";
import { ApexOptions } from "apexcharts"; // Import ApexOptions
import boxIcon from "../.././../../assets/box-reverse-icon.svg";
import CountAndType from "./CountAndType";
import LocationWise from "./LocationWise";
import CategoriesAndChannels from "./CategoriesAndChannels";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  // const {
  //   trendImage,
  //   title,
  //   colors,
  //   width,
  //   barColor,
  //   dropdown_one = true,
  //   categories = ["Mon", "Tue", "Web", "Thurs", "Fri", "Sat", "Sun"],
  //   chart_data = [
  //     { name: "Net Profit", data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
  //     { name: "Revenue", data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
  //   ],
  // } = props;

  // const [chartData, setChartData]: any = useState([]);

  const business_options = {
    labels: ["Delivered", "NDR", "RTO", "Lost/Damaged", "Reverse"],
  };

  const series = [70, 30];

  const rtoReason = {
    labels: ["business", "consumer"],
  };

  const chart_data = [
    { name: "Delivered", data: [15, 20, 41, 35, 76, 88, 98] },
    { name: "Rto", data: [55, 12, 24, 39, 69, 8, 50] },
    { name: "Pending", data: [23, 42, 12, 5, 61, 56, 34] },
    { name: "Lost/Damaged", data: [51, 20, 20, 11, 77, 47, 18] },
  ];

  const chartOptions: any = merge(BaseOptionChart(), {
    legend: {
      position: "bottom" as const,
      horizontalAlign: "center",
    },
    stroke: {
      // colors: colors,
      width: 4,
    },
    // stroke: { show: true },
    plotOptions: {
      bar: { vertical: true, barHeight: "30%" },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Web", "Thurs", "Fri", "Sat", "Sun"],
    },
    colors: ["#7CCA62", "#F0A22E", "#F78A74", "#6695FF"],
  });

  return (
    <div className="!h-[calc(100vh-75px)] mt-5">
      {isLoading ? (
        <div className="flex justify-center w-[100%] h-[40vh] items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-y-10">
            <CountAndType />
            <LocationWise />
            <CategoriesAndChannels />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
