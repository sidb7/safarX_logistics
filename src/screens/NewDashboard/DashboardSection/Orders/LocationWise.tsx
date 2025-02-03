import React from "react";
import LocationIcon from "../../../../assets/PickUp/Location.svg";
import TruckIcon from "../../../../assets/Menu.svg";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  commaSeparator,
  inrValueFormatter,
  selectDataByTableIds,
  // capitalizeFirstLetter,
} from "../../../../utils/utility";
import CustomDropDown from "../../../../components/DropDown";
interface ILocationWiseProps {
  isStateSelected: boolean;
  setIsStateSelected: any;
}

const LocationWise: React.FunctionComponent<ILocationWiseProps> = ({
  isStateSelected,
  setIsStateSelected,
}) => {
  const handleSelection = (value: string) => {
    setIsStateSelected(value === "true");
  };
  const { loading } = useSelector((state: RootState) => state.dashboardOrder);

  // Select data for multiple table IDs
  const multipleTableData = useSelector((state: RootState) =>
    selectDataByTableIds(state, [4, 5])
  );

  // Filter data for specific table IDs directly into variables
  const dataForOverallShipmentReports = multipleTableData.filter(
    (item) => item.tableId === 4
  );

  const dataForTopLocations = multipleTableData.filter(
    (item) => item.tableId === 5
  );
  // console.log("🚀 ~ dataForTopLocations:", dataForTopLocations);

  let series = dataForOverallShipmentReports[0]?.series ?? [];
  let labels = dataForOverallShipmentReports[0]?.label ?? [];
  const donutSeries = series;
  const donutLabels = labels;

  // const delivered = dataForOverallShipmentReports[0]?.delivered ?? 0;
  // const ndr = dataForOverallShipmentReports[0]?.ndr ?? 0;
  // const rto = dataForOverallShipmentReports[0]?.rto ?? 0;
  // const lostDamaged = dataForOverallShipmentReports[0]?.lostDamaged ?? 0;
  // const reverse = dataForOverallShipmentReports[0]?.reverse ?? 0;
  // const donutSeries = [delivered, ndr, rto, lostDamaged, reverse];
  // const donutLabels = ["Delivered", "NDR", "RTO", "Lost/Damaged", "Reverse"];
  // const donutLabels = dataForOverallShipmentReports[0]?.label ?? [];
  const totalOrders = dataForOverallShipmentReports[0]?.totalOrders ?? 0;

  const getValidNumber = (value: any, defaultValue: number = 0) =>
    isNaN(value) || value === null || value === undefined
      ? defaultValue
      : value;

  const donutOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: donutLabels,
    colors: [
      "#FFB74D",
      "#FFA726",
      "#FF9800",
      "#FB8C00",
      "#AED581",
      "#9CCC65",
      "#8BC34A",
      "#7CB342",
      "#E57373",
      "#EF5350",
      "#F44336",
      "#E53935",
      "#4FC3F7",
      "#7986CB",
      "#BA68C8",
    ],
    legend: {
      position: "right",
      horizontalAlign: "center",
      fontSize: "14px",
      fontFamily: "Open Sans",
      fontWeight: 400,
      itemMargin: {
        horizontal: 5,
        vertical: 15,
      },
      markers: {
        offsetX: -5,
        offsetY: 0,
      },
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Orders",
              formatter: () => `${totalOrders}`,
            },
          },
        },
      },
    },
  };
  return (
    <>
      {loading ? (
        <>
          <div className="">
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
                    options={donutOptions}
                    series={donutSeries}
                    type="donut"
                    height={505}
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
                  <div>
                    <CustomDropDown
                      onChange={(e) => handleSelection(e.target.value)}
                      value={isStateSelected.toString()}
                      options={[
                        {
                          value: "false",
                          label: "city",
                        },
                        {
                          value: "true",
                          label: "state",
                        },
                      ]}
                      selectClassName="!text-xs !bg-white !font-Open !h-9 !rounded min-w-[120px]"
                    />
                  </div>
                </div>
              </div>
              <div className=" border-[#E8E8E8] border-x-[1px] border-b-[1px] rounded-b-xl pl-6 pr-4 pt-6 pb-4 !shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)] ">
                <div className="overflow-x-auto p-[18px]">
                  <table className="min-w-full text-center border-collapse">
                    <thead className="">
                      <tr>
                        <th className=" py-7 text-xl font-Lato font-semibold leading-[26px] text-[#1C1C1C]">
                          {isStateSelected ? "State" : "City"}
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
                      {dataForTopLocations?.[0]?.data?.map(
                        (row: any, index: any) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className=" py-7 text-lg font-Open font-semibold leading-[22px] capitalize  border-none">
                              {isStateSelected ? row.state : row.city}
                            </td>
                            <td className=" py-7 text-lg font-Open font-semibold leading-[22px] capitalize  border-none">
                              {/* {row.orderCount} Orders */}
                              {commaSeparator(
                                `${getValidNumber(row?.orderCount) || 0}`
                              )}{" "}
                              {/* Orders */}
                            </td>
                            <td className=" py-7 border-none">
                              <p className="text-lg font-Open font-semibold leading-[22px] capitalize">
                                ₹
                                <span className="text-lg font-Open font-normal leading-[22px] capitalize">
                                  &nbsp;
                                  {/* {row.totalRevenue} */}
                                  {inrValueFormatter(
                                    getValidNumber(
                                      parseFloat(row?.totalRevenue || 0)
                                    )
                                  )}
                                </span>
                              </p>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LocationWise;
