import { merge } from "lodash";
import React, { useState } from "react";
import {
  BaseOptionChart,
  commaSeparator,
  inrValueFormatter,
} from "../../../../utils/utility";
import ReactApexChart from "react-apexcharts";
import { Spinner } from "../../../../components/Spinner";
import RedEllipse from "../../../../assets/redEllipse.svg";
import GreenEllipse from "../../../../assets/greenEllipse.svg";

interface ITotalRevenueCountProps {}

const TotalRevenueCount: React.FunctionComponent<ITotalRevenueCountProps> = (
  props
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let ordersPer7DaysgraphDataRedash: any = [
    {
      count: 21,
      dayOfWeek: "Mon",
      date: "2024-11-18",
      revenue: 4742.42,
    },
    {
      count: 36,
      dayOfWeek: "Tue",
      date: "2024-11-19",
      revenue: 9417.58,
    },
    {
      count: 44,
      dayOfWeek: "Wed",
      date: "2024-11-20",
      revenue: 11566.36,
    },
    {
      count: 30,
      dayOfWeek: "Thu",
      date: "2024-11-21",
      revenue: 8496,
    },
    {
      count: 34,
      dayOfWeek: "Fri",
      date: "2024-11-22",
      revenue: 10585.78,
    },
    {
      count: 33,
      dayOfWeek: "Sat",
      date: "2024-11-23",
      revenue: 10058.32,
    },
    {
      count: 17,
      dayOfWeek: "Sun",
      date: "2024-11-24",
      revenue: 4564.24,
    },
  ];
  let redashOperationalMetricsData: any = [
    {
      totalRevenue: 59430.7,
      averageOrderValue: 276.42,
      highestOrderValue: 820.1,
      orderCount: 215,
      previousTotalRevenue: 60791.83,
      previousAverageOrderValue: 258.69,
      previousHighestOrderValue: 783.52,
      previousOrderCount: 235,
      revenueChange: -2.24,
      averageOrderValueChange: 6.86,
      highestOrderValueChange: 4.67,
      orderCountChange: -8.51,
      revenueTrend: "down",
      averageOrderValueTrend: "up",
      highestOrderValueTrend: "up",
      orderCountTrend: "down",
      tableId: 8,
      tableName: "Revenue Data",
    },
  ];
  const getValidNumber = (value: any, defaultValue: number = 0) =>
    isNaN(value) || value === null || value === undefined
      ? defaultValue
      : value;

  const chartSeries = [
    {
      name: "Order's Count",
      data:
        ordersPer7DaysgraphDataRedash?.map((item: any) => ({
          x: new Date(item?.created_At).getTime(),
          y: getValidNumber(item?.count),
        })) || [],
    },
    {
      name: "Revenue's Count",
      data:
        ordersPer7DaysgraphDataRedash?.map((item: any) => ({
          x: new Date(item?.created_At).getTime(),
          y: getValidNumber(item?.sum)?.toFixed(0),
        })) || [],
    },
  ];

  const chartOptions: any = merge(BaseOptionChart(), {
    legend: {
      position: "bottom" as const,
      horizontalAlign: "center",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: {
          text: "Order Counts",
        },
      },
      {
        opposite: true,
        title: {
          text: "Revenue",
        },
        labels: {
          formatter: function (value: any) {
            return inrValueFormatter(getValidNumber(value)).split(".")[0];
          },
        },
      },
    ],

    // colors: ["#F0A22E", "#F5BE6D", "#FBE3C0", "#FDF6EA"],
  });
  return (
    <>
      {isLoading ? (
        <div className="mt-6 h-[410px]">
          <div className="flex items-stretch h-16 rounded-xl">
            <div className="flex-3 my-2 animated rounded-xl"></div>
            <div className="flex-1 my-2 animated rounded-xl"></div>
            <div className="flex-1 m-2 animated rounded-xl"></div>
          </div>
          <div className="flex items-stretch h-[350px] rounded-xl">
            <div className="flex-3 my-2 animated rounded-xl"></div>
            <div className="flex-2 my-2 animated rounded-xl"></div>
            <div className="flex-1 my-2 animated rounded-xl"></div>
          </div>
        </div>
      ) : ordersPer7DaysgraphDataRedash?.length === 0 &&
        redashOperationalMetricsData?.length === 0 ? (
        <div className="flex justify-center w-[100%] h-[10vh] items-center">
          <p>No Data Found</p>
        </div>
      ) : (
        <div className="border border-[#E8E8E8] mt-6 h-[450px] flex  rounded-xl !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)]">
          <div className="w-full h-full pr-2">
            <div className="rounded-tr-xl rounded-tl-xl px-4  h-[50px] bg-[#F6F6F6]">
              <div className="flex justify-between">
                <div className="flex pt-3">
                  {/* <img src={TrendDown} className="px-2" alt="" /> */}
                  <span className="text-lg flex  font-Lato leading-6 font-medium">
                    Revenue
                  </span>
                </div>
              </div>
            </div>
            <div className="border-[#E8E8E8] border-r-[1px] pr-2 !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)] ">
              {ordersPer7DaysgraphDataRedash?.length > 0 ? (
                <>
                  <ReactApexChart
                    type="area"
                    series={chartSeries}
                    options={chartOptions}
                    height={384}
                  />
                </>
              ) : (
                <div className="flex justify-center w-[100%] h-[45vh] items-center">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
          <div className="border-r-[#E8E8E8] w-[500px] flex flex-col  h-full p-4">
            <div className="flex-1 w-full">
              <div className="h-full flex items-center w-full">
                <div className="w-full">
                  <div className="text-2xl font-bold leading-7 text-[#1C1C1C] font-Lato flex w-full justify-between ">
                    {commaSeparator(
                      getValidNumber(
                        redashOperationalMetricsData?.[0]?.current_totalOrders
                      )
                    ) || "-"}

                    <div className="py-1">
                      <img
                        src={
                          getValidNumber(
                            redashOperationalMetricsData?.[0]
                              ?.percentageDifference_totalOrders
                          ) < 0
                            ? RedEllipse
                            : GreenEllipse
                        }
                        alt="orders growth for profit or loss"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className=" py-3 text-base font-normal leading-[22px] font-Open text-[#1C1C1C]">
                      Total Revenue
                    </span>
                    <span className="py-3 text-sm font-normal leading-[22px] font-Open text-[#1C1C1C]">
                      {getValidNumber(
                        redashOperationalMetricsData?.[0]
                          ?.percentageDifference_totalOrders
                      ) !== 0
                        ? `(${commaSeparator(
                            getValidNumber(
                              redashOperationalMetricsData?.[0]
                                ?.percentageDifference_totalOrders
                            ).toFixed(0)
                          )}%)`
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 ">
              <div className="h-full flex items-center w-full">
                <div className="w-full">
                  <div className="text-2xl font-bold leading-7 text-[#1C1C1C] font-Lato flex justify-between w-full">
                    {inrValueFormatter(
                      getValidNumber(
                        parseFloat(
                          redashOperationalMetricsData?.[0]
                            ?.current_totalRevenue || 0
                        )
                      )
                    )}
                    <div className="py-1">
                      <img
                        src={
                          getValidNumber(
                            redashOperationalMetricsData?.[0]
                              ?.percentageDifference_totalRevenue
                          ) < 0
                            ? RedEllipse
                            : GreenEllipse
                        }
                        alt="revenue growth for profit or loss"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className=" py-3 text-base font-normal leading-[22px] font-Open text-[#1C1C1C]">
                      Avg Order Value
                    </span>
                    <span className="py-3 text-sm font-normal leading-[22px] font-Open text-[#1C1C1C]">
                      {getValidNumber(
                        redashOperationalMetricsData?.[0]
                          ?.percentageDifference_totalRevenue
                      ) !== 0
                        ? `(${commaSeparator(
                            getValidNumber(
                              redashOperationalMetricsData?.[0]
                                ?.percentageDifference_totalRevenue
                            ).toFixed(0)
                          )}%)`
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 ">
              <div className="h-full flex items-center w-full">
                <div className="w-full">
                  <div className="text-2xl font-bold leading-7 text-[#1C1C1C] font-Lato flex justify-between w-full">
                    {commaSeparator(
                      getValidNumber(
                        redashOperationalMetricsData?.[0]?.current_totalWeight?.toFixed(
                          0
                        ) || 0
                      )
                    )}
                    <div className="py-1">
                      <img
                        src={
                          getValidNumber(
                            redashOperationalMetricsData?.[0]
                              ?.percentageDifference_totalWeight
                          ) < 0
                            ? RedEllipse
                            : GreenEllipse
                        }
                        alt="total weight growth for profit or loss"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className=" py-3 text-base font-normal leading-[22px] font-Open text-[#1C1C1C]">
                      Heighest Order Value
                    </span>
                    <span className="py-3 text-sm font-normal leading-[22px] font-Open text-[#1C1C1C]">
                      {getValidNumber(
                        redashOperationalMetricsData?.[0]
                          ?.percentageDifference_totalWeight
                      ) !== 0
                        ? `(${getValidNumber(
                            redashOperationalMetricsData?.[0]
                              ?.percentageDifference_totalWeight
                          ).toFixed(0)}%)`
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 ">
              <div className="h-full flex items-center w-full">
                <div className="w-full">
                  <div className="text-2xl font-bold leading-7 text-[#1C1C1C] font-Lato flex justify-between w-full">
                    {commaSeparator(
                      getValidNumber(
                        redashOperationalMetricsData?.[0]?.current_totalWeight?.toFixed(
                          0
                        ) || 0
                      )
                    )}
                    <div className="py-1">
                      <img
                        src={
                          getValidNumber(
                            redashOperationalMetricsData?.[0]
                              ?.percentageDifference_totalWeight
                          ) < 0
                            ? RedEllipse
                            : GreenEllipse
                        }
                        alt="total weight growth for profit or loss"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className=" py-3 text-base font-normal leading-[22px] font-Open text-[#1C1C1C]">
                      Orders Delivered Count
                    </span>
                    <span className="py-3 text-sm font-normal leading-[22px] font-Open text-[#1C1C1C]">
                      {getValidNumber(
                        redashOperationalMetricsData?.[0]
                          ?.percentageDifference_totalWeight
                      ) !== 0
                        ? `(${getValidNumber(
                            redashOperationalMetricsData?.[0]
                              ?.percentageDifference_totalWeight
                          ).toFixed(0)}%)`
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TotalRevenueCount;
