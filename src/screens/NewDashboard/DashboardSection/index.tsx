import React, { useCallback, useEffect, useMemo, useState } from "react";
import DashboardNewUserIcon from "../../../assets/dashboardNewUser.svg";
import ComingSoonIcon from "../../../assets/Coming Soon.svg";
import OneButton from "../../../components/Button/OneButton";
import { useNavigate } from "react-router-dom";
import {
  getPayloadForTab,
  retrieveLocalStorageData,
} from "../../../utils/utility";
import DatePicker from "react-datepicker";
import CustomDateRangeDropDown from "../../../components/DateRangeDropdown/CustomDateRangeDropdown";
import Orders from "./Orders/index";
import toast from "react-hot-toast";
import { POST } from "../../../utils/webService";
import { GET_TODAY_DATA_FOR_DASHBOARD } from "../../../utils/ApiUrls";
import { useDispatch } from "react-redux";
import {
  setLoading,
  setData,
  setError,
} from "../../../redux/reducers/dashboardOrderReducer";
import {
  setRevenueData,
  setRevenueLoading,
} from "../../../redux/reducers/dashboardRevenueReducer";
import {
  setExceptionData,
  setExceptionLoading,
} from "../../../redux/reducers/dashboardExceptionReducer";

import Revenue from "./Revenue/index";
import sessionManager from "../../../utils/sessionManager";

interface KycData {
  isReturningUser: boolean;
}

interface DateRange {
  period: string;
  start: number | null; // Change to accept numbers
  end: number | null;
  prevStart: number | null;
  prevEnd: number | null;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isReturningUser, setIsReturningUser] = useState<boolean | null>(null);
  const [filterId, setFilterId] = useState<any>(0);
  const [activeTab, setActiveTab] = useState<any>("");
  const [filterData, setFilterData] = useState([
    { label: "Order", isActive: false },
    { label: "Revenue", isActive: false },
    { label: "Exception", isActive: false },
  ]);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [dateRange, setDateRange]: any = useState([null, null]);
  const [customDateSelected, setCustomDateSelected] = useState<boolean>(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("lastSevenDays");
  const [isStateSelected, setIsStateSelected] = useState<boolean>(false);

  const dispatch = useDispatch();

  const formatDateToEpoch = (date: Date | null): number | null => {
    if (!date) return null;

    // Convert to seconds, then back to milliseconds
    const seconds = Math.floor(date.getTime() / 1000);
    return seconds * 1000 + (date.getTime() % 1000);
  };

  const handleDateRangeChange = (update: [Date | null, Date | null]) => {
    setDateRange(update);
    const [start, end] = update;

    const formattedStart = start ? formatDateToEpoch(start) : null;
    const formattedEnd = end ? formatDateToEpoch(end) : null;

    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const days =
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
      const prevPeriod = getPreviousPeriod(start, days);

      const formattedPrevStart = prevPeriod.prevStart
        ? formatDateToEpoch(new Date(prevPeriod.prevStart))
        : null;
      const formattedPrevEnd = prevPeriod.prevEnd
        ? formatDateToEpoch(new Date(prevPeriod.prevEnd))
        : null;

      setDateRanges((prev: any) => ({
        ...prev,
        customDate: {
          period: "Custom Date",
          start: formattedStart,
          end: formattedEnd,
          prevStart: formattedPrevStart,
          prevEnd: formattedPrevEnd,
        },
      }));
      setCustomDateSelected(true);
    } else {
      setCustomDateSelected(false);
    }
  };

  // Function to calculate the previous period given the start date and number of days

  const getPreviousPeriod = (startDate: Date, days: number) => {
    const periodStart = new Date(
      startDate.getTime() - days * 24 * 60 * 60 * 1000
    );
    const periodEnd = new Date(startDate.getTime() - 24 * 60 * 60 * 1000);

    return {
      prevStart: formatDateToEpoch(periodStart),
      prevEnd: formatDateToEpoch(periodEnd),
    };
  };

  // get current and previous date ranges based on the number of days

  const getDateRanges = (days: number): DateRange => {
    const today = new Date();
    const periodStart = new Date(
      today.getTime() - (days - 1) * 24 * 60 * 60 * 1000
    );
    const periodEnd = today;
    const prevPeriodStart = new Date(
      periodStart.getTime() - days * 24 * 60 * 60 * 1000
    );
    const prevPeriodEnd = new Date(periodStart.getTime() - 24 * 60 * 60 * 1000);

    return {
      period: `Last ${days} Days`,
      start: formatDateToEpoch(periodStart),
      end: formatDateToEpoch(periodEnd),
      prevStart: formatDateToEpoch(prevPeriodStart),
      prevEnd: formatDateToEpoch(prevPeriodEnd),
    };
  };

  // initial dates for dropdown values based on the number of days

  const getYesterdayDateRange = (): DateRange => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const yesterdayEnd = new Date(yesterday);
    yesterdayEnd.setHours(23, 59, 59, 999);

    const dayBeforeYesterday = new Date(yesterday);
    dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 1);

    return {
      period: "Yesterday",
      start: formatDateToEpoch(yesterday),
      end: formatDateToEpoch(yesterdayEnd),
      prevStart: formatDateToEpoch(dayBeforeYesterday),
      prevEnd: formatDateToEpoch(
        new Date(dayBeforeYesterday.getTime() + 86400000 - 1)
      ),
    };
  };

  const initialDateRanges: Record<number, DateRange> = useMemo(
    () => ({
      yesterday: getYesterdayDateRange(),
      lastSevenDays: getDateRanges(7),
      lastThirtyDays: getDateRanges(30),
      lastSixtyDays: getDateRanges(60),
      lastNinetyDays: getDateRanges(90),
      // customDate: {
      //   period: "Custom Date",
      //   start: "",
      //   end: "",
      //   prevStart: "",
      //   prevEnd: "",
      // },
    }),
    []
  );

  const [dateRanges, setDateRanges] =
    useState<Record<string, DateRange>>(initialDateRanges);

  // event handler for period change dropdown
  const handlePeriodChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedPeriod = event.target.value;

    setSelectedPeriod(selectedPeriod);

    // setIsLoadingTopCard(true);
    // setIsLoadingOperationalMetrics(true);
    // setIsLoadingTopPerformingClients(true);
    // setIsLoadingDecliningClients(true);
    // setIsLoadingOrdersPer7Days(true);

    if (selectedPeriod !== "customDate") {
      // setRedashTopFourPerformingData([]);
      // setRedashOperationalMetricsData([]);
      // setRedashTopPerformingClientsData([]);
      // setRedashDecliningClientsData([]);
      // setOrdersPer7DaysGraphDataRedash([]);
      setStartDate(null);
      setEndDate(null);
      setCustomDateSelected(false);
      setDateRange([null, null]);
    } else {
      setStartDate(null);
      setEndDate(null);
      setDateRange([null, null]);
    }
  };

  const getPeriodData = useCallback((): DateRange => {
    return (
      dateRanges[selectedPeriod] || {
        period: "",
        start: "",
        end: "",
        prevStart: "",
        prevEnd: "",
      }
    );
  }, [selectedPeriod, dateRanges]);

  const { period, start, end, prevStart, prevEnd } = getPeriodData();

  const fetchData = async (
    start: number | null,
    end: number | null,
    prevStart: number | null,
    prevEnd: number | null
  ) => {
    const payload = getPayloadForTab(
      activeTab,
      start,
      end,
      prevStart,
      prevEnd,
      isStateSelected
    );

    // Ensure the payload is valid before proceeding
    if (!payload || Object.keys(payload).length === 0) {
      // console.log("🚀 ~ Payload is not ready yet. Skipping API call.");
      return;
    }
    try {
      if (activeTab === "Order") {
        dispatch(setLoading(true));
      } else if (activeTab === "Revenue") {
        dispatch(setRevenueLoading(true));
      } else if (activeTab === "Exception") {
        dispatch(setExceptionLoading(true));
      }
      // dispatch(setLoading(true));

      const everydayShippingData = await POST(
        GET_TODAY_DATA_FOR_DASHBOARD,
        payload
      );

      if (everydayShippingData?.data?.success) {
        const quickResponse = everydayShippingData?.data;
        toast.success(everydayShippingData?.data?.message);
        if (activeTab === "Order") {
          // Dispatch data to Redux store
          dispatch(setData(quickResponse.data));
        } else if (activeTab === "Revenue") {
          dispatch(setRevenueData(quickResponse.data));
        } else if (activeTab === "Exception") {
          dispatch(setExceptionData(quickResponse.data));
        }

        // const filteredData = quickResponse.data.filter(
        //   (item: any) => item.tableId === 1 && item.tableName === "home"
        // );

        // if (filteredData.length > 0) {
        //   const relevantData = filteredData.map((item: any) => ({
        //     statusCounts: item.statusCounts,
        //     totalOrders: item.totalOrders,
        //     tableId: item.tableId,
        //     tableName: item.tableName,
        //   }));

        //   // setTodaysImportantData(relevantData);
        //   // toast.success(everydayShippingData?.data?.message);
        // } else {
        //   toast.error("No data matching the criteria found.");
        // }
      } else {
        // toast.error(
        //   everydayShippingData?.data?.message || "Failed to fetch data"
        // );
        // dispatch(setError("Failed to fetch data"));
      }
    } catch (error) {
      console.error("Error fetching shipping details:", error);
      // toast.error("An error occurred while fetching data");
      // dispatch(setError("An error occurred while fetching data"));
    } finally {
      dispatch(setLoading(false));
      dispatch(setRevenueLoading(false));
      dispatch(setExceptionLoading(false));
    }
  };

  useEffect(() => {
    // Only fetch data if it's a returning user and we have an active tab
    if (isReturningUser === false) {
      return;
    }

    const fetchAndSetData = async () => {
      const { start, end, prevStart, prevEnd } = dateRanges[selectedPeriod];

      try {
        await fetchData(start, end, prevStart, prevEnd);
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
        dispatch(setRevenueLoading(false));
        dispatch(setExceptionLoading(false));
      }
    };

    fetchAndSetData();
  }, [
    selectedPeriod,
    dateRanges,
    customDateSelected,
    activeTab,
    isStateSelected,
  ]);

  useEffect(() => {
    // const kycData = retrieveLocalStorageData("kycValue") as KycData | null;
    const { sessionId, sellerInfo } = sessionManager({});
    const kycData = sellerInfo as KycData | null;
    if (kycData?.isReturningUser !== undefined) {
      setIsReturningUser(kycData.isReturningUser);
    }
  }, []);

  useEffect(() => {
    // Retrieve the saved tab from localStorage on page load
    const savedTab = localStorage.getItem("DashboardDataTab");
    if (savedTab) {
      setActiveTab(savedTab || "Order");
      const filterIndex = filterData.findIndex(
        (item) => item.label === savedTab
      );
      setFilterId(filterIndex);
    } else {
      setActiveTab("Order"); // Default active tab
    }
  }, [filterData]);

  const handleTabClick = (index: any, label: any) => {
    // Store the selected tab in localStorage
    localStorage.setItem("DashboardDataTab", label);
    setFilterId(index);
    setActiveTab(label);
  };

  const handleAddOrder = () => {
    navigate("/orders/place-order");
  };

  // URL change function
  // const changeUrl = (statusName: string) => {
  //   let replaceUrl = statusName.toLowerCase().replace(/ /g, "-");
  //   window.history.pushState("", "", `${replaceUrl}`);
  // };

  const renderNewUserContent = () => (
    <div className="h-[calc(100vh-220px)] flex flex-col items-center justify-center gap-y-[35px]">
      <img
        src={DashboardNewUserIcon}
        alt="New user dashboard"
        width={370}
        height={370}
        className="object-contain"
      />

      <p className="font-Lato font-bold text-2xl leading-8 text-center">
        Place your first order to unlock access to your analytics
      </p>

      <OneButton
        onClick={handleAddOrder}
        text="Add Order"
        variant="primary"
        className="!text-[14px] !font-Open !font-semibold !leading-5 !px-4 !py-2"
      />
    </div>
  );

  const renderComingSoonContent = () => (
    <div className="h-[calc(100vh-360px)] flex flex-col items-center justify-center">
      <img
        src={ComingSoonIcon}
        alt="Coming soon"
        width={320}
        height={320}
        className="object-contain"
      />
    </div>
  );

  const dashboard = () => (
    <>
      <div className="flex mt-6 justify-between w-full items-center">
        <div
          className={`flex text-sm xl:text-[15px] font-Open text-[#777777] font-semibold leading-[22px] h-[44px] cursor-pointer`}
        >
          {/* {filterData?.map((singleData, index) => {
            return (
              <span
                key={index}
                className={`flex items-center py-[8px] px-[16px] border-[1px] border-[#D2D2D2] text-center ${
                  filterId === index
                    ? `${
                        index === 0
                          ? "rounded-l-md"
                          : index === filterData.length - 1
                          ? "rounded-r-md"
                          : ""
                      } bg-[#F6F6F6] font-Open font-semibold  text-sm xl:text-[15px] leading-[22px] text-[#1C1C1C]`
                    : ""
                }`}
                onClick={() => {
                  // Store in localStorage
                  localStorage.setItem("DashboardDataTab", singleData.label);
                  setFilterId(index);
                  if (index === 0) {
                    setActiveTab("Order");
                  } else if (index === 1) {
                    setActiveTab("Revenue");
                  } else if (index === 2) {
                    setActiveTab("Exception");
                  }
                }}
              >
                {singleData.label}
              </span>
            );
          })} */}
          {filterData?.map((singleData: any, index: any) => {
            return (
              <span
                key={index}
                className={`flex items-center py-[8px] px-[16px] border-[1px] border-[#D2D2D2] text-center ${
                  filterId === index
                    ? `${
                        index === 0
                          ? "rounded-l-md"
                          : index === filterData.length - 1
                          ? "rounded-r-md"
                          : ""
                      } bg-[#F6F6F6] font-Open font-semibold  text-sm xl:text-[15px] leading-[22px] text-[#1C1C1C]`
                    : ""
                }`}
                onClick={() => handleTabClick(index, singleData.label)}
              >
                {singleData.label}
              </span>
            );
          })}
        </div>
        <div className="flex gap-x-3">
          {/* search bar functionality */}
          <div>
            {/* <SearchBox
              label="Search"
              from="report"
              customPlaceholder="Search by Seller ID, Email, or Name..."
              value={searchQuery}
              onChange={handleSearch}
              getFullContent={() =>
                fetchData(start, end, prevStart, prevEnd, "?")
              }
              className="!h-[36px] !min-w-[260px]"
              cancelIconClassName="!top-[27%]"
              searchBoxIconClassName="!top-[27%]"
            /> */}
          </div>

          {/* date picker optionally rendered  */}
          {selectedPeriod === "customDate" && (
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              maxDate={new Date()}
              onChange={handleDateRangeChange}
              isClearable={true}
              placeholderText="Select From & To Date"
              className="cursor-pointer h-9 border-solid border-[#AFAFAF] text-[12px] font-normal flex items-center datepickerCss pl-6 min-w-[244px]"
              dateFormat="dd/MM/yyyy"
              showPreviousMonths
              monthsShown={2}
            />
          )}

          {/* date range dropdown  */}
          <div>
            <CustomDateRangeDropDown
              dateRanges={dateRanges}
              onChange={handlePeriodChange}
              value={selectedPeriod}
              wrapperClass="!bg-white"
              selectClassName="!h-9 !rounded-lg lg:!rounded"
              placeHolder="Select from below"
              name={"dateRange"}
            />
          </div>
        </div>
      </div>
      {activeTab === "Order" ? (
        <Orders
          isStateSelected={isStateSelected}
          setIsStateSelected={setIsStateSelected}
        />
      ) : activeTab === "Revenue" ? (
        <Revenue />
      ) : (
        renderComingSoonContent()
      )}
    </>
  );

  // Render null while loading
  if (isReturningUser === null) {
    return null;
  }

  return isReturningUser ? dashboard() : renderNewUserContent();
};

export default Dashboard;
