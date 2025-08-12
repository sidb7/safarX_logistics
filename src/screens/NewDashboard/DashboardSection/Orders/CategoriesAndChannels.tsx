import React from "react";
import ReactApexChart from "react-apexcharts";
import categoriesIcon from "../../../../assets/layer.svg";
import ChannelIcon from "../../../../assets/Flight.svg";
import { ApexOptions } from "apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  selectDataByTableIds,
  capitalizeFirstLetter,
} from "../../../../utils/utility";

interface ICategoriesAndChannelsProps {}

const CategoriesAndChannels: React.FunctionComponent<
  ICategoriesAndChannelsProps
> = (props) => {
  const { loading } = useSelector((state: RootState) => state.dashboardOrder);

  // Select data for multiple table IDs
  const multipleTableData = useSelector(
    (state: RootState) => selectDataByTableIds(state, [6, 7]) || []
  );

  // Filter data for specific table IDs directly into variables
  const dataForOrdersByChannels = multipleTableData.filter(
    (item) => item.tableId === 6
  );
  // console.log("🚀 ~ dataForOrdersByChannels:", dataForOrdersByChannels);
  const dataForSellersCategories = multipleTableData.filter(
    (item) => item.tableId === 7
  );
  // console.log("🚀 ~ dataForSellersCategories:", dataForSellersCategories);

  const donutSeries =
    dataForOrdersByChannels[0]?.data.map((item: any) =>
      Number(item.percentage)
    ) || [];

  const donutLabels =
    dataForOrdersByChannels[0]?.data.map((item: any) =>
      capitalizeFirstLetter(item.source)
    ) || [];

  const donutSeriesCategory =
    dataForSellersCategories[0]?.data?.map((item: any) =>
      Number(item.percentage)
    ) || [];

  const donutLabelsCategory =
    dataForSellersCategories[0]?.data?.map((item: any) =>
      capitalizeFirstLetter(item.category)
    ) || [];

  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: donutLabels,
    legend: {
      position: "right",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "Open Sans",
      fontWeight: 400,
      itemMargin: {
        horizontal: 5,
        vertical: 10,
      },
      markers: {
        offsetX: -5,
        offsetY: 0,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: any) => `${Number(val).toFixed(0)}%`,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Quantity",
              formatter: () =>
                `${dataForOrdersByChannels[0]?.data.reduce(
                  (acc: any, item: any) => acc + (item.totalCount || 0),
                  0
                )}`,
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val: any) => `${Number(val).toFixed(0)}%`,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const donutOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: donutLabelsCategory,
    legend: {
      position: "right",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "Open Sans",
      fontWeight: 400,
      itemMargin: {
        horizontal: 5,
        vertical: 10,
      },
      markers: {
        offsetX: -5,
        offsetY: 0,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${Number(val).toFixed(0)}%`,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Quantity",
              formatter: () =>
                `${dataForSellersCategories[0]?.data.reduce(
                  (acc: any, item: any) => acc + (item.quantity || 0),
                  0
                )}`,
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${Number(val).toFixed(0)}%`,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <>
      {loading ? (
        <>
        </>
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 gap-x-6 ">
            <div className="flex flex-col">
              <div className="rounded-tr-xl rounded-tl-xl pl-3 pr-4 py-4 bg-[#F6F6F6] ">
                <div className="flex justify-between items-center text-center">
                  <div className="flex items-center gap-x-[10px]">
                    <img src={ChannelIcon} alt="" />
                    <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C]">
                      Orders By Channels
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-[#E8E8E8] border-r-[1px] border-l-[1px] border-b-[1px] rounded-b-xl pl-6 pr-4 pt-6 pb-4 !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)] ">
                <ReactApexChart
                  type="donut"
                  series={donutSeries}
                  options={chartOptions}
                  height={427}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="rounded-tr-xl rounded-tl-xl pl-3 pr-4 py-4 bg-[#F6F6F6] ">
                <div className="flex justify-between items-center text-center">
                  <div className="flex items-center gap-x-[10px]">
                    <img src={categoriesIcon} alt="" />
                    <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C]">
                      Product Categories
                    </span>
                  </div>
                </div>
              </div>
              <div className=" border-[#E8E8E8] border-x-[1px] border-b-[1px] rounded-b-xl pl-6 pr-4 pt-6 pb-4 !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)] ">
                <ReactApexChart
                  type="donut"
                  series={donutSeriesCategory}
                  options={donutOptions}
                  height={427}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CategoriesAndChannels;
