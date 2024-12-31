import { merge } from "lodash";
import React from "react";
import {
  BaseOptionChart,
  commaSeparator,
  inrValueFormatter,
  selectDataByTableIdsRevenue,
} from "../../../../utils/utility";
import ReactApexChart from "react-apexcharts";
import { Spinner } from "../../../../components/Spinner";
import RedEllipse from "../../../../assets/redEllipse.svg";
import GreenEllipse from "../../../../assets/greenEllipse.svg";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";

interface ITotalRevenueCountProps {}

const TotalRevenueCount: React.FunctionComponent<ITotalRevenueCountProps> = (
  props
) => {
  const { revenueLoading } = useSelector(
    (state: RootState) => state.dashboardRevenue
  );

  // Select data for multiple table IDs
  const multipleTableDataTotalRevenue = useSelector(
    (state: RootState) => selectDataByTableIdsRevenue(state, [8, 9]) || []
  );

  const dataForRevenueTotals = multipleTableDataTotalRevenue.filter(
    (item) => item.tableId === 8
  );

  const dataForRevenueAndCount = multipleTableDataTotalRevenue.filter(
    (item) => item.tableId === 9
  );

  const getValidNumber = (value: any, defaultValue: number = 0) =>
    isNaN(value) || value === null || value === undefined
      ? defaultValue
      : value;

  const chartSeries = [
    {
      name: "Order's Count",
      data:
        dataForRevenueAndCount[0]?.data?.map((item: any) => ({
          x: new Date(item?.date).getTime(),
          y: getValidNumber(item?.count),
        })) || [],
    },
    {
      name: "Revenue's Count",
      data:
        dataForRevenueAndCount[0]?.data?.map((item: any) => ({
          x: new Date(item?.date).getTime(),
          y: getValidNumber(item?.revenue)?.toFixed(0),
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
      {revenueLoading ? (
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
      ) : dataForRevenueAndCount?.length === 0 &&
        dataForRevenueTotals?.length === 0 ? (
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
              {dataForRevenueAndCount?.length > 0 ? (
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
                    {/* {commaSeparator(
                      getValidNumber(
                        multipleTableDataTotalRevenue?.[0]?.totalRevenue
                      )
                    ) || "-"} */}
                    {inrValueFormatter(
                      getValidNumber(
                        parseFloat(
                          multipleTableDataTotalRevenue?.[0]?.totalRevenue || 0
                        )
                      )
                    )}

                    <div className="py-1">
                      <img
                        src={
                          multipleTableDataTotalRevenue?.[0]?.revenueTrend ===
                          "down"
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
                        multipleTableDataTotalRevenue?.[0]?.revenueChange
                      ) !== 0
                        ? `(${commaSeparator(
                            getValidNumber(
                              multipleTableDataTotalRevenue?.[0]?.revenueChange
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
                          multipleTableDataTotalRevenue?.[0]
                            ?.averageOrderValue || 0
                        )
                      )
                    )}
                    <div className="py-1">
                      <img
                        src={
                          multipleTableDataTotalRevenue?.[0]
                            ?.averageOrderValueTrend === "down"
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
                        multipleTableDataTotalRevenue?.[0]
                          ?.averageOrderValueChange
                      ) !== 0
                        ? `(${commaSeparator(
                            getValidNumber(
                              multipleTableDataTotalRevenue?.[0]
                                ?.averageOrderValueChange
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
                    {/* {commaSeparator(
                      getValidNumber(
                        multipleTableDataTotalRevenue?.[0]?.highestOrderValue?.toFixed(
                          0
                        ) || 0
                      )
                    )} */}

                    {inrValueFormatter(
                      getValidNumber(
                        parseFloat(
                          multipleTableDataTotalRevenue?.[0]
                            ?.highestOrderValue || 0
                        )
                      )
                    )}
                    <div className="py-1">
                      <img
                        src={
                          multipleTableDataTotalRevenue?.[0]
                            ?.highestOrderValueTrend === "down"
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
                        multipleTableDataTotalRevenue?.[0]
                          ?.highestOrderValueChange
                      ) !== 0
                        ? `(${getValidNumber(
                            multipleTableDataTotalRevenue?.[0]
                              ?.highestOrderValueChange
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
                        multipleTableDataTotalRevenue?.[0]?.orderCount?.toFixed(
                          0
                        ) || 0
                      )
                    )}
                    <div className="py-1">
                      <img
                        src={
                          multipleTableDataTotalRevenue?.[0]
                            ?.orderCountTrend === "down"
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
                        multipleTableDataTotalRevenue?.[0]?.orderCountChange
                      ) !== 0
                        ? `(${getValidNumber(
                            multipleTableDataTotalRevenue?.[0]?.orderCountChange
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
