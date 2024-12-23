import { merge } from "lodash";
import React from "react";
import ReactApexChart from "react-apexcharts";
import {
  BaseOptionChart,
  selectDataByTableIds,
} from "../../../../utils/utility";
import boxIcon from "../.././../../assets/box-reverse-icon.svg";
import profileIcon from "../../../../assets/Contact.svg";
import { ApexOptions } from "apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

interface ICountAndTypeProps {}

const CountAndType: React.FunctionComponent<ICountAndTypeProps> = (props) => {
  const { loading } = useSelector((state: RootState) => state.dashboardOrder);

  // Select data for multiple table IDs
  const multipleTableData = useSelector((state: RootState) =>
    selectDataByTableIds(state, [2, 3])
  );

  // Filter data for specific table IDs directly into variables
  const dataForOrderCount = multipleTableData.filter(
    (item) => item.tableId === 2
  );
  const dataForBusiness = multipleTableData.filter(
    (item) => item.tableId === 3
  );

  const businessPercentage =
    typeof dataForBusiness[0]?.business === "number"
      ? dataForBusiness[0]?.business
      : 0;
  const consumerPercentage =
    typeof dataForBusiness[0]?.consumer === "number"
      ? dataForBusiness[0]?.consumer
      : 0;

  const donutSeries = [businessPercentage, consumerPercentage];
  const donutLabels = ["Business", "Consumer"];

  const getValidNumber = (value: any, defaultValue: number = 0) =>
    isNaN(value) || value === null || value === undefined
      ? defaultValue
      : value;

  const series = [
    {
      name: "Total Orders",
      data:
        dataForOrderCount?.[0]?.data?.map((item: any) => ({
          x: new Date(item?.created_At).getTime(),
          y: getValidNumber(item?.totalOrders),
        })) || [],
    },
    {
      name: "Delivered",
      data:
        dataForOrderCount?.[0]?.data?.map((item: any) => ({
          x: new Date(item?.created_At).getTime(),
          y: getValidNumber(item?.delivered),
        })) || [],
    },
    {
      name: "Undelivered",
      data:
        dataForOrderCount?.[0]?.data?.map((item: any) => ({
          x: new Date(item?.created_At).getTime(),
          y: getValidNumber(item?.undelivered),
        })) || [],
    },
    {
      name: "RTO",
      data:
        dataForOrderCount?.[0]?.data?.map((item: any) => ({
          x: new Date(item?.created_At).getTime(),
          y: getValidNumber(item?.rto),
        })) || [],
    },
  ];

  const chartOptions: any = merge(BaseOptionChart(), {
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
        horizontal: 15,
        vertical: 10,
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
    fill: {
      opacity: 1,
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: [
      // {
      //   title: {
      //     text: "Order Counts",
      //   },
      // },
      // {
      //   labels: {
      //     formatter: function (value: any) {
      //       return inrValueFormatter(getValidNumber(value)).split(".")[0];
      //     },
      //   },
      // },
    ],
  });

  const donutOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: donutLabels,
    colors: ["#F3B558", "#3371FF"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "Open Sans",
      fontWeight: 400,
      itemMargin: {
        horizontal: 30,
        vertical: 10,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => {
        const percentage = typeof val === "number" ? val.toFixed(0) : "0";
        return `${percentage}%`;
      },
    },
    tooltip: {
      y: {
        formatter: (val, opts) => {
          const percentage = typeof val === "number" ? val.toFixed(0) : "0";
          return `${percentage}%`;
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
      {loading ? (
        <>
          <div className="mt-6">
            <div className="flex h-16 rounded-xl space-x-4">
              <div className="flex-1 my-2 animated rounded-xl"></div>
              <div className="flex-1 my-2 animated rounded-xl"></div>
            </div>
            <div className="flex h-[350px] rounded-xl space-x-4">
              <div className="w-1/2 flex space-x-4">
                <div className="flex-1 my-2 animated rounded-xl"></div>
              </div>
              <div className="w-1/2 flex space-x-4">
                <div className="flex-1 my-2 animated rounded-xl"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
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
                  options={chartOptions}
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
                  series={donutSeries}
                  options={donutOptions}
                  height={"100%"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountAndType;
