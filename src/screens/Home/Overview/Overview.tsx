import * as React from "react";
import CompanyImage from "../../../assets/Shipyaari_full_color rgb.svg";
import { ScrollNav } from "../../../components/ScrollNav";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import CustomDropDown from "../../../components/DropDown";
import CalenderIcon from "../../../assets/calendar.svg";
import GreenEllipse from "../../../assets/greenEllipse.svg";
import RedEllipse from "../../../assets/redEllipse.svg";
import SimpleChart from "../Common/Simplechart";
import Box from "../../../assets/Delivery Icon.svg";
import InvoiceIcon from "../../../assets/invoices.svg";
import AddOrderIcon from "../../../assets/Order/AddOrder.svg";
import BarChart from "../Common/BarChart";
import BarChart2 from "../Common/BarChart2";
import PieChart from "../Common/PieChart";
import Locations from "../Common/Locations";
import Invoices from "../Common/Invoices";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/Button";
import CouponScreen from "../../../components/Coupons/index";
import OneButton from "../../../components/Button/OneButton";
import NoDataGif from "../../../assets/no data.gif";
import PlusIcon from "../../../assets/plusIcon.svg";
import AnalyticsIcon from "../../../assets/analytics.svg";

interface IOverview {
  ordersArr?: any;
  revenueDetails?: any;
  codCountOrder?: any;
  orderCount?: any;
  addressCountOrder?: any;
}

export const Overview = (props: IOverview) => {
  const navigate = useNavigate();
  const {
    ordersArr,
    revenueDetails,
    codCountOrder,
    orderCount,
    addressCountOrder,
  } = props;
  const [userData, setUserData] = React.useState<any>();
  const emptyOrdersArr = [
    {
      count: 0,
      text: "Orders need to be proceed",
      img: "",
    },
    {
      count: 0,
      text: "Orders delayed for Pickup",
      img: "",
    },
    {
      count: 0,
      text: "RTO Orders",
      img: "",
    },
    {
      count: 0,
      text: "Orders in Weight Descripancy",
      img: "",
    },
  ];

  const orderArr = [
    {
      k: "Jan",
      v: 0,
    },
    {
      k: "Feb",
      v: 0,
    },
    {
      k: "Mar",
      v: 0,
    },
    {
      k: "Apr",
      v: 0,
    },
    {
      k: "May",
      v: 0,
    },
    {
      k: "Jun",
      v: 0,
    },
    {
      k: "Jul",
      v: 0,
    },
    {
      k: "Aug",
      v: 0,
    },
    {
      k: "Sep",
      v: 0,
    },
    {
      k: "Oct",
      v: 0,
    },
    {
      k: "Nov",
      v: 0,
    },
    {
      k: "Dec",
      v: 0,
    },
  ];

  const piedata = [
    { name: "Group A", value: 1 },
    { name: "Group B", value: 1 },
    { name: "Group C", value: 1 },
    { name: "Group D", value: 1 },
  ];

  const invoices1 = [
    {
      count: 0,
      text: "Total Invoices",
    },
    {
      count: 0,
      text: "Paid Invoices",
    },
    {
      count: 0,
      text: "Unpaid Invoices",
    },
    {
      count: 0,
      text: "Overdue Invoices",
    },
  ];

  const invoices2 = [
    {
      count: 0,
      text: "Total Invoices",
    },
    {
      count: 0,
      text: "Paid Invoices",
    },
    {
      count: 0,
      text: "Dispute Rejected By Courier",
    },
    {
      count: 0,
      text: "Average Dispute Amount",
    },
  ];

  const yearArr = [
    {
      label: "Last Year",
      value: "last_year",
    },
    {
      label: "Last Quarter",
      value: "last_quarter",
    },
    {
      label: "Last Month",
      value: "last_month",
    },
    {
      label: "Last Week",
      value: "last_week",
    },
    {
      label: "Today",
      value: "today",
    },
  ];

  const dashboardForNewUser = () => {
    return (
      <>
        {/* <div className="flex flex-col justify-center items-center mt-[255px]">
          <OneButton
            className="!w-[150px]"
            text="ADD ORDER"
            onClick={() => navigate("/orders/add-order/pickup")}
            showIcon={true}
            icon={AddOrderIcon}
            variant="primary"
          />
          <p className="text-[12px] mt-1 text-[#2f3e46] text-opacity-30 font-Open">
            Let's place your first Order!
          </p>
        </div> */}
        <div className="">
          <div className="flex gap-2 mt-6 lg:mt-7">
            <img src={CalenderIcon} alt="CalenderIcon" />
            <span className="text-[1rem] font-semibold font-Open leading-[22px] lg:text-[18px] lg:leading-6">
              Important Today
            </span>
          </div>
          <div className="flex gap-x-6 flex-wrap">
            {emptyOrdersArr?.map((order: any, i: number) => (
              <div
                className="border-[#E8E8E8] border-[1px] rounded-lg shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)] mt-4 flex-1 w-[273px] p-4"
                key={i}
              >
                <div className="flex flex-col">
                  <div className="font-bold font-Lato mb-2 lg:mb-3 text-[#1C1C1C] lg:text-[#F57960] text-[22px] lg:text-[2rem] leading-7">
                    {order?.count}
                  </div>
                  <p className="lg:text-[#1C1C1C] font-normal lg:text-base font-Open text-sm text-[#494949] leading-5 lg:leading-[22px]">
                    {order?.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
              <div className="flex flex-col justify-center items-center mt-20">
                <img
                  src={NoDataGif}
                  alt="no data found"
                  width={178}
                  height={180}
                />
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
              </div>
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
                        Highest Order Value
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
                        Avg Order Value
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
                        Today’s Revenue
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
        </div>
      </>
    );
  };

  React.useEffect(() => {
    let data = localStorage.getItem("userInfo") as any;
    data = JSON.parse(data);

    if (data !== "" && data !== null) {
      setUserData(data);
    }
  }, []);

  return (
    <>
      {userData?.isReturningUser ? (
        <div className="">
          <div className="flex gap-2 mt-6 lg:mt-7">
            <img src={CalenderIcon} alt="CalenderIcon" />
            <span className="text-[1rem] font-semibold font-Open leading-[22px] lg:text-[18px] lg:leading-6">
              Important Today
            </span>
          </div>
          <div className="flex justify-between mt-6 lg:mt-[26px] gap-4 mb-10 customScroll">
            {ordersArr?.map((order: any, i: number) => (
              <div
                className="w-[17rem] rounded-lg border-2 lg:overflow-hidden"
                key={i}
              >
                <div className="p-4 flex flex-col w-[226px] lg:w-auto">
                  <div className="font-bold font-Lato mb-2 lg:mb-3 text-[#1C1C1C] lg:text-[#F57960] text-[22px] lg:text-[2rem] leading-7">
                    {order?.count}
                  </div>
                  <p className="lg:text-[#1C1C1C] font-normal lg:text-base font-Open text-sm text-[#494949] leading-5 lg:leading-[22px]">
                    {order?.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:border-2 gap-y-0 lg:gap-4  mt-4 rounded-lg">
            <SimpleChart
              yearArr={yearArr}
              revenue={true}
              revenueDetails={revenueDetails}
            />
            <div className="mt-0 lg:mt-[3.125rem] p-4 space-y-[60px] hidden lg:block">
              <div>
                <div className="flex justify-between">
                  <h1 className="text-[2rem] font-bold font-Lato">
                    &#8377;
                    {Math.round(
                      revenueDetails?.charges?.HighestOrderValue
                    )?.toLocaleString("en-IN") || 0}
                  </h1>
                  <img src={GreenEllipse} alt="GreenEllipse" />
                </div>
                <p className="text-[1rem] font-Open font-normal mt-[0.75px]">
                  Highest Order Value
                </p>
              </div>
              <div>
                <div className="flex justify-between">
                  <h1 className="text-[2rem] font-bold font-Lato">
                    &#8377;
                    {Math.round(
                      revenueDetails?.charges?.AvgOrderValue
                    )?.toLocaleString("en-IN") || 0}{" "}
                  </h1>
                  <img src={RedEllipse} alt="RedEllipse" />
                </div>
                <p className="text-[1rem] font-Open font-normal mt-[0.75px]">
                  Avg Order Value
                </p>
              </div>
              <div>
                <div className="flex justify-between">
                  <h1 className="text-[2rem] font-bold font-Lato">
                    &#8377;
                    {Math.round(
                      revenueDetails?.charges?.TodaysRevenue
                    )?.toLocaleString("en-IN") || 0}{" "}
                  </h1>
                  <img src={GreenEllipse} alt="GreenEllipse" />
                </div>
                <p className="text-[1rem] font-Open font-normal mt-[0.75px]">
                  Today's Revenue
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 rounded-lg">
            {/* <BarChart
              text="Order Details"
              img={Box}
              data={orderArr}
              yearArr={yearArr}
            /> */}
            <BarChart
              text="Order Count"
              img={Box}
              data={orderCount?.data}
              yearArr={yearArr}
            />
            <BarChart
              text="COD"
              img={Box}
              data={codCountOrder?.data}
              yearArr={yearArr}
            />
          </div>
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 rounded-lg">
            <BarChart
              text="Weight Discrenpancy"
              img={Box}
              data={orderArr}
              yearArr={yearArr}
            />
            <BarChart text="COD" img={Box} data={orderArr} yearArr={yearArr} />
          </div> */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 rounded-lg">
            <BarChart2
              text="TAT Performance"
              img={Box}
              data={orderArr}
              yearArr={yearArr}
            />
            <PieChart text="COD" img={Box} data={piedata} yearArr={yearArr} />
          </div> */}
          <div className="border-1 gap-4 mt-4 rounded-lg">
            <Locations
              text="Location"
              img={Box}
              data={orderArr}
              yearArr={yearArr}
              addressCountOrder={addressCountOrder}
            />
          </div>
          {/* <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 mt-4 rounded-lg">
            <Invoices
              text="Invoices"
              img={InvoiceIcon}
              data={invoices1}
              yearArr={yearArr}
            />
            <Invoices
              text="Invoices"
              img={InvoiceIcon}
              data={invoices2}
              yearArr={yearArr}
            />
          </div> */}
        </div>
      ) : (
        <>
          {/* <div className="mt-[100px]">
            <CouponScreen />
          </div> */}
          {dashboardForNewUser()}
        </>
      )}
    </>
  );
};

export default Overview;
