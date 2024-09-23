import React from "react";
import OneButton from "../../../../components/Button/OneButton";
import { useNavigate } from "react-router-dom";
import NoDataGif from "../../../assets/no data.gif";
import PlusIcon from "../../../assets/plusIcon.svg";
import AnalyticsIcon from "../../../../assets/analytics.svg";
import ReactApexChart from "react-apexcharts";
import { merge } from "lodash";
import { BaseOptionChart } from "../../../../utils/utility";

interface IRevenueSectionProps {}

const RevenueSection: React.FunctionComponent<IRevenueSectionProps> = (
  props
) => {
  const navigate = useNavigate();
  const options = {
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  };
  const series = [
    {
      name: "highest invoice value",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "total cod earnings",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "total prepaid earnings",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  return (
    <>
      <div className="border border-[#E8E8E8] mt-6 h-[550px] flex  rounded-xl !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)]">
        <div className="w-full h-full pr-2">
          <div className="rounded-tr-xl rounded-tl-xl px-4  h-[50px] bg-[#F6F6F6]">
            <div className="flex justify-between">
              <div className="flex pt-3">
                <img src={AnalyticsIcon} className="px-2" alt="" />
                <span className="text-lg flex  font-Lato leading-6 font-medium">
                  Revenue
                </span>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col justify-center items-center mt-20">
            <img src={NoDataGif} alt="no data found" width={178} height={180} />
          </div>
          <div className="flex flex-col justify-center items-center ml-10">
            <OneButton
              text={"ADD ORDER"}
              className="!w-[120px]"
              onClick={() => navigate("/orders/add-order/pickup")}
              variant="quad"
              showIcon={true}
              icon={PlusIcon}
            />
          </div> */}
          <ReactApexChart
            type="area"
            series={series}
            options={options}
            height={480}
          />
        </div>
        <div className="border-r-[#E8E8E8] w-[500px] flex flex-col  h-full p-4">
          <div className="flex-1 w-full">
            <div className="h-full flex items-center w-full">
              <div className="w-full">
                <div className="text-2xl font-bold leading-7 text-[#1C1C1C] font-Lato flex w-full justify-between ">
                  {/* {commaSeparator(
                        getValidNumber(
                          redashOperationalMetricsData?.[0]?.current_totalOrders
                        )
                      ) || "-"} */}
                  ₹0
                  {/* <div className="py-1">
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
                      </div> */}
                </div>
                <div className="flex justify-between">
                  <span className=" py-3 text-base font-normal leading-[22px] font-Open text-[#1C1C1C]">
                    Highest Invoice Value
                  </span>
                  <span className="py-3 text-sm font-normal leading-[22px] font-Open text-[#1C1C1C]">
                    {/* {getValidNumber(
                          redashOperationalMetricsData?.[0]
                            ?.percentageDifference_totalOrders
                        ) !== 0
                          ? `(${commaSeparator(
                              getValidNumber(
                                redashOperationalMetricsData?.[0]
                                  ?.percentageDifference_totalOrders
                              ).toFixed(0)
                            )}%)`
                          : "-"} */}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 ">
            <div className="h-full flex items-center w-full">
              <div className="w-full">
                <div className="text-2xl font-bold leading-7 text-[#1C1C1C] font-Lato flex justify-between w-full">
                  {/* {inrValueFormatter(
                        getValidNumber(
                          parseFloat(
                            redashOperationalMetricsData?.[0]
                              ?.current_totalRevenue || 0
                          )
                        )
                      )} */}
                  ₹0
                  {/* <div className="py-1">
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
                      </div> */}
                </div>
                <div className="flex justify-between">
                  <span className=" py-3 text-base font-normal leading-[22px] font-Open text-[#1C1C1C]">
                    Total COD Value Earning
                  </span>
                  <span className="py-3 text-sm font-normal leading-[22px] font-Open text-[#1C1C1C]">
                    {/* {getValidNumber(
                          redashOperationalMetricsData?.[0]
                            ?.percentageDifference_totalRevenue
                        ) !== 0
                          ? `(${commaSeparator(
                              getValidNumber(
                                redashOperationalMetricsData?.[0]
                                  ?.percentageDifference_totalRevenue
                              ).toFixed(0)
                            )}%)`
                          : "-"} */}
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
                          redashOperationalMetricsData?.[0]?.current_totalWeight?.toFixed(
                            0
                          ) || 0
                        )
                      )} */}
                  ₹0
                  {/* <div className="py-1">
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
                      </div> */}
                </div>
                <div className="flex justify-between">
                  <span className=" py-3 text-base font-normal leading-[22px] font-Open text-[#1C1C1C]">
                    Total Prepaid Earning
                  </span>
                  <span className="py-3 text-sm font-normal leading-[22px] font-Open text-[#1C1C1C]">
                    {/* {getValidNumber(
                          redashOperationalMetricsData?.[0]
                            ?.percentageDifference_totalWeight
                        ) !== 0
                          ? `(${getValidNumber(
                              redashOperationalMetricsData?.[0]
                                ?.percentageDifference_totalWeight
                            ).toFixed(0)}%)`
                          : "-"} */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RevenueSection;
