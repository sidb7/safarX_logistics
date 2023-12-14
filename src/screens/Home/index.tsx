import * as React from "react";
import CompanyImage from "../../../assets/Shipyaari_full_color rgb.svg";
import { ScrollNav } from "../../components/ScrollNav";
import Overview from "./Overview/Overview";
import CalenderIcon from "../../../assets/calendar.svg";
import GreenEllipse from "../../../assets/greenEllipse.svg";
import RedEllipse from "../../../assets/redEllipse.svg";
import Box from "../../../assets/Delivery Icon.svg";
import InvoiceIcon from "../../../assets/invoices.svg";
import { Breadcrum } from "../../components/Layout/breadcrum";
import CustomDropDown from "../../components/DropDown";
import Orders from "./Orders";
import Exception from "./Exception";
import SyPerfromance from "./SyPerformance";
import { useSelector } from "react-redux";
import {
  GetCurrentPath,
  getLocalStorage,
  removeLocalStorage,
} from "../../utils/utility";
import { POST } from "../../utils/webService";
import { PHONEPE_TRANSACTION_STATUS } from "../../utils/ApiUrls";
import AccessDenied from "../../components/AccessDenied";
import { useNavigate } from "react-router-dom";
import { checkPageAuthorized } from "../../redux/reducers/role";
import { BottomNavBar } from "../../components/BottomNavBar";
import {
  GET_DASHBOARD_INFO,
  GET_DASHBOARD_INFO_REVENUE,
} from "../../utils/ApiUrls";
import { ResponsiveState } from "../../utils/responsiveState";
import { tokenKey } from "../../utils/utility";

interface IOverview {}
const BarchartData = [
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
export const Home = (props: IOverview) => {
  const navigate = useNavigate();
  const { isLgScreen } = ResponsiveState();
  const roles = useSelector((state: any) => state?.roles);

  const [renderingComponents, setRenderingComponents] = React.useState<any>(0);
  // const isActive =
  //   roles?.roles?.[0]?.menu?.[0]?.menu?.[renderingComponents]?.pages?.[0]
  //     ?.isActive;

  const [isActive, setIsActive] = React.useState<any>(false);

  const [dashboardInfo, setDashboardInfo] = React.useState<any>({
    overview: [
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
    ],
    orders: [
      {
        count: 0,
        text: "Created Order",
        img: "CreateOrderIcon",
      },
      {
        count: 0,
        text: "Shipped",
        img: "ShippedIcon",
      },
      {
        count: 0,
        text: "In Transit",
        img: "InTransitIcon",
      },
      {
        count: 0,
        text: "Delivered",
        img: "InTransitIcon",
      },
    ],
    exception: [
      {
        count: 0,
        text: "Total NPR",
        img: "CreateOrderIcon",
      },
      {
        count: 0,
        text: "Total NDR",
        img: "InTransitIcon",
      },
      {
        count: 0,
        text: "RTO Initiated",
        img: "VanIcon",
      },
      {
        count: 0,
        text: "RTO Delivered",
        img: "VanIcon",
      },
    ],
    syPerformance: [
      {
        count: 0,
        text: "Total NPR",
        img: "CreateOrderIcon",
      },
      {
        count: 0,
        text: "Total NDR",
        img: "InTransitIcon",
      },
      {
        count: 0,
        text: "RTO Initiated",
        img: "VanIcon",
      },
      {
        count: 0,
        text: "RTO Delivered",
        img: "VanIcon",
      },
    ],
  });
  const [revenueAndOrderDetails, SetRevenueAndOrderDetails] =
    React.useState<any>({
      charges: {
        HighestOrderValue: 0,
        AvgOrderValue: 0,
        TodaysRevenue: 0,
      },
      revenue: BarchartData,
    });
  const [codCountOrder, setCodCountOrder] = React.useState<any>({
    data: BarchartData,
  });
  const [orderCount, setOrderCount] = React.useState<any>({
    data: BarchartData,
  });
  const [addressCountOrder, setAddressCountOrder] = React.useState<any>([]);

  const arrayData = [
    { index: 0, label: "Overview" },
    { index: 1, label: "Orders" },
    { index: 2, label: "Exception" },
    { index: 3, label: "SY Performance" },
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

  const setScrollIndex = (id: number) => {
    let filterName = arrayData.filter((array) => array?.index === id);
    let filterNewUrl = filterName[0]?.label
      .toLocaleLowerCase()
      .replace(/ /g, "-");

    const newUrl = `/dashboard/${filterNewUrl}`; // Specify the new URL here

    window.history.pushState(null, "", newUrl);
    setRenderingComponents(id);
  };

  React.useEffect(() => {
    const GetCurrentPath = () => {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      const location = url;
      const path = location.pathname;
      const pathArray = path.split("/");
      const removedFirstPath = pathArray.slice(1);
      return removedFirstPath;
    };

    const data = GetCurrentPath() as any;

    if (data[1] === "overview") {
      setRenderingComponents(0);
      setIsActive(checkPageAuthorized("Overview"));
    } else if (data[1] === "orders") {
      setRenderingComponents(1);
      setIsActive(checkPageAuthorized("Orders"));
    } else if (data[1] === "exception") {
      setRenderingComponents(2);
      setIsActive(checkPageAuthorized("Exception"));
    } else if (data[1] === "sy-performance") {
      setRenderingComponents(3);
      setIsActive(checkPageAuthorized("SY Performance"));
    }
  });

  React.useEffect(() => {
    (async () => {
      try {
        const phonePeTransactionId = getLocalStorage("phonePeTransactionId");
        if (phonePeTransactionId) {
          await POST(PHONEPE_TRANSACTION_STATUS, {
            orderId: phonePeTransactionId,
            transactionId: phonePeTransactionId,
            paymentGateway: "PHONEPE",
          });
          removeLocalStorage("phonePeTransactionId");
        }
      } catch (error) {}
    })();
  }, []);

  const getDashDetails = async () => {
    try {
      const { data: response }: any = await POST(GET_DASHBOARD_INFO);

      if (response?.success) {
        setDashboardInfo(response?.data[0]);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const getRevenueAndOrderDetails = async (
    payload: any,
    setStateFunction: (data: any) => void
  ) => {
    //  const { startDate, endDate, apiStatus, addressType } = req.body;
    try {
      const { data: response }: any = await POST(
        GET_DASHBOARD_INFO_REVENUE,
        payload
      );

      if (response?.success) {
        setStateFunction(response?.data?.[0]);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  React.useMemo(async () => {
    let sellerId = sessionStorage.getItem("sellerId");
    if (localStorage.getItem(`${sellerId}_${tokenKey}`)) {
      await Promise.all([
        getDashDetails(),
        getRevenueAndOrderDetails(
          {
            apiStatus: "REVENUE",
          },
          SetRevenueAndOrderDetails
        ),
        getRevenueAndOrderDetails(
          {
            apiStatus: "ORDERCOUNT",
          },
          setOrderCount
        ),
        getRevenueAndOrderDetails(
          {
            apiStatus: "CODORDERCOUNT",
          },
          setCodCountOrder
        ),
        getRevenueAndOrderDetails(
          {
            apiStatus: "ADDRESSORDERCOUNT",
          },
          setAddressCountOrder
        ),
      ]);
    }
  }, []);

  return (
    <>
      {isActive ? (
        <div>
          <div>
            <Breadcrum label="Home" />
          </div>
          <div className="mx-4 mb-4 ">
            <div className="flex justify-between">
              {/* <img className="h-[400px]" src={CompanyImage} alt="logo" /> */}

              {/* scrollable nav temp commented  */}

              {/* <div className="overflow-x-scroll">
                <ScrollNav
                  arrayData={arrayData}
                  showNumber={false}
                  setScrollIndex={setScrollIndex}
                />
              </div> */}
              {/* {renderingComponents === 0 && (
                <div className={`${isLgScreen ? "block" : "hidden"}`}>
                  <CustomDropDown
                    onChange={(e) => {}}
                    options={yearArr}
                    heading="Select Filter"
                    selectClassName="lg:!w-[120px] lg:!h-[34px] mt-1 !rounded-md !text-[#494949]"
                  />
                </div>
              )} */}
            </div>
            {/* {renderingComponents === 0 && (
              <Overview ordersArr={dashboardInfo.overview} />
            )}
            {renderingComponents === 1 && (
              <Orders ordersArr={dashboardInfo.orders} />
            )}
            {renderingComponents === 2 && (
              <Exception ordersArr={dashboardInfo.exception} />
            )}
            {renderingComponents === 3 && (
              <SyPerfromance ordersArr={dashboardInfo.syPerformance} />
            )} */}
            <Overview
              ordersArr={dashboardInfo.overview}
              revenueDetails={revenueAndOrderDetails}
              orderCount={orderCount}
              codCountOrder={codCountOrder}
              addressCountOrder={addressCountOrder}
            />
          </div>

          {/* <div className="mt-24 lg:hidden">
            <BottomNavBar />
          </div> */}
        </div>
      ) : (
        <div>
          <AccessDenied />
        </div>
      )}
    </>
  );
};

export default Overview;
