import { merge } from "lodash";
import React from "react";
import { BaseOptionChart } from "../../../../utils/utility";
import ReactApexChart from "react-apexcharts";
import BoxReverseIcon from "../../../../assets/box-reverse-icon.svg";
import ComingSoonGif from "../../../../assets/Coming Soon.gif";

interface ITatPerformanceProps {
  DeliveryImage?: any;
  colors?: any;
  width?: any;
  barColor?: any;
}

const TatPerformance: React.FunctionComponent<ITatPerformanceProps> = (
  props
) => {
  const { DeliveryImage, colors, width, barColor } = props;
  const categories = ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5"];
  const chart_data = [
    { name: "Achieved", data: [44, 55, 57, 56, 61] },
    { name: "Missing", data: [76, 85, 101, 98, 87] },
  ];
  const chartOptions: any = merge(BaseOptionChart(), {
    stroke: {
      colors: ["transparent"],
      width: 4,
    },
    // stroke: { show: true },
    plotOptions: {
      bar: { vertical: true, columnWidth: "35%" },
    },
    xaxis: {
      categories: categories,
    },
    colors: ["#7CCA62", "#F35838"],
  });
  return (
    <>
      <div>
        <div className="flex flex-col">
          <div className="rounded-tr-xl rounded-tl-xl px-4  h-[50px] bg-[#F6F6F6] ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src={BoxReverseIcon} className="px-2" alt="" />
                <span className="flex font-Open text-base font-semibold leading-[22px]">
                  {"TAT Performance"}
                </span>
              </div>
              <div className="flex items-center gap-x-2 pt-2 ">
                <div className="!h-9"></div>
              </div>
            </div>
          </div>
          <div className="border-[#E8E8E8] border-r-[1px] border-l-[1px] border-b-[1px] rounded-b-xl pr-2 !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)] ">
            {/* <ReactApexChart
              type="bar"
              series={chart_data}
              options={chartOptions}
              height={450}
            /> */}
            <div className="flex flex-col justify-center items-center">
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
    </>
  );
};

export default TatPerformance;
