import React from "react";
import LocationIcon from "../../../../assets/PickUp/Location.svg";
import TruckIcon from "../../../../assets/Menu.svg";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
interface ILocationWiseProps {}

const LocationWise: React.FunctionComponent<ILocationWiseProps> = (props) => {
  const data = [
    { city: "Mumbai", orders: 245, revenue: 5689024, trend: "up" },
    { city: "Delhi", orders: 142, revenue: 5689024, trend: "down" },
    { city: "Bangalore", orders: 102, revenue: 5689024, trend: "up" },
    { city: "Kolkata", orders: 45, revenue: 5689024, trend: "up" },
  ];

  // Data for the donut chart
  const labels = ["Delivered", "NDR", "RTO", "Lost/Damaged", "Reverse"];
  const series = [44, 55, 41, 17, 15];

  // Chart configuration
  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: labels,
    legend: {
      position: "right",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "Open Sans",
      fontWeight: 400,
      itemMargin: {
        horizontal: 5, // Horizontal spacing between items
        vertical: 10, // Vertical spacing between items
      },
      markers: {
        offsetX: -5, // Adjust marker position relative to the text
        offsetY: 0, // Adjust marker position vertically
      },
    },
    // title: {
    //   text: "Fruit Distribution",
    //   align: "center",
    // },
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
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: (w) => {
                // Safely calculate total
                if (w?.globals?.seriesTotals) {
                  return w.globals.seriesTotals
                    .reduce((a: any, b: any) => a + b, 0)
                    .toString();
                }
                return "0"; // Fallback value
              },
            },
          },
        },
      },
    },
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-x-6 ">
        <div className="flex flex-col">
          <div className="rounded-tr-xl rounded-tl-xl pl-3 pr-4 py-4 bg-[#F6F6F6] ">
            <div className="flex justify-between items-center text-center">
              <div className="flex items-center gap-x-[10px]">
                <img src={TruckIcon} alt="" />
                <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C]">
                  Overall Shipment Status
                </span>
              </div>
            </div>
          </div>
          <div className="border-[#E8E8E8] border-r-[1px] border-l-[1px] border-b-[1px] rounded-b-xl pl-6 pr-4 pt-6 pb-4 !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)] ">
            <div className="donut-chart">
              <ReactApexChart
                options={chartOptions}
                series={series}
                type="donut"
                // width="427px"
                height={427}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="rounded-tr-xl rounded-tl-xl pl-3 pr-4 py-4 bg-[#F6F6F6] ">
            <div className="flex justify-between items-center text-center">
              <div className="flex items-center gap-x-[10px]">
                <img src={LocationIcon} alt="" />
                <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C]">
                  Locations
                </span>
              </div>
            </div>
          </div>
          <div className=" border-[#E8E8E8] border-x-[1px] border-b-[1px] rounded-b-xl pl-6 pr-4 pt-6 pb-4 !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)] ">
            <div className="overflow-x-auto p-[18px]">
              <table className="min-w-full text-center border-collapse">
                <thead className="">
                  <tr>
                    <th className=" py-7 text-xl font-Lato font-semibold leading-[26px] text-[#1C1C1C]">
                      City
                    </th>
                    <th className=" py-7 text-xl font-Lato font-semibold leading-[26px] text-[#1C1C1C]">
                      Order Count
                    </th>
                    <th className="py-7 text-xl font-Lato font-semibold leading-[26px] text-[#1C1C1C] ">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className=" py-7 text-lg font-Open font-semibold leading-[22px] capitalize  border-none">
                        {row.city}
                      </td>
                      <td className=" py-7 text-lg font-Open font-semibold leading-[22px] capitalize  border-none">
                        {row.orders} Orders
                      </td>
                      <td className=" py-7 border-none">
                        <p className="text-lg font-Open font-semibold leading-[22px] capitalize">
                          ₹
                          <span className="text-lg font-Open font-normal leading-[22px] capitalize">
                            &nbsp; {row.revenue}
                          </span>
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationWise;
