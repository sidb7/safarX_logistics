import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import DashboardNewUserIcon from "../../../assets/dashboardNewUser.svg";
import ComingSoonIcon from "../../../assets/Coming Soon.svg";
import OneButton from "../../../components/Button/OneButton";
import { useNavigate } from "react-router-dom";
import { retrieveLocalStorageData } from "../../../utils/utility";
import DatePicker from "react-datepicker";
import CustomDateRangeDropDown from "../../../components/DateRangeDropdown/CustomDateRangeDropdown";

interface KycData {
  isReturningUser: boolean;
}

interface DateRange {
  period: string;
  start: string;
  end: string;
  prevStart: string;
  prevEnd: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isReturningUser, setIsReturningUser] = useState<boolean | null>(null);
  const [filterId, setFilterId] = useState(0);
  const [activeTab, setActiveTab] = useState("order");
  const [loading, setLoading] = useState(false);
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
  // const [searchQuery, setSearchQuery] = useState<string>("");

  // const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // search function
  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value;

  //   // Clear the previous timer
  //   if (debounceTimer.current) {
  //     clearTimeout(debounceTimer.current);
  //   }

  //   // Set a new timer
  //   debounceTimer.current = setTimeout(() => {
  //     setSearchQuery(query);
  //     // Set loading states to true when search starts
  //     setIsLoadingTopCard(true);
  //     setIsLoadingOperationalMetrics(true);
  //     setIsLoadingTopPerformingClients(true);
  //     setIsLoadingDecliningClients(true);
  //     setIsLoadingOrdersPer7Days(true);
  //     // Fetch the data with the new search query
  //     fetchData(
  //       start || "",
  //       end || "",
  //       prevStart || "",
  //       prevEnd || "",
  //       query ? query : "?"
  //     );
  //   }, 800);
  // };

  // // format the date in "yyyy-mm-dd" format
  const formatDate = (
    date: Date | null,
    includeTime: boolean = false
  ): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return includeTime
      ? `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      : `${year}-${month}-${day}`;
  };

  // function to change the date range according to the filter selection
  const handleDateRangeChange = (update: [Date | null, Date | null]) => {
    setDateRange(update);
    const [start, end] = update;

    let formattedStart = start ? formatDate(start) : "";
    let formattedEnd = end ? formatDate(end) : "";

    if (start && end && start.toDateString() === end.toDateString()) {
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      formattedStart = formatDate(start, true);
      formattedEnd = formatDate(end, true);
    }

    setStartDate(start);
    setEndDate(end);

    // Clear the states when the date selection process begins
    // setRedashTopFourPerformingData([]);
    // setRedashOperationalMetricsData([]);
    // setRedashTopPerformingClientsData([]);
    // setRedashDecliningClientsData([]);
    // setOrdersPer7DaysGraphDataRedash([]);

    // setIsLoadingTopCard(true);
    // setIsLoadingOperationalMetrics(true);
    // setIsLoadingTopPerformingClients(true);
    // setIsLoadingDecliningClients(true);
    // setIsLoadingOrdersPer7Days(true);

    if (start && end) {
      const days =
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1;
      const prevPeriod = getPreviousPeriod(start, days);

      let formattedPrevStart = prevPeriod.prevStart;
      let formattedPrevEnd = prevPeriod.prevEnd;

      const prevStartDate = new Date(prevPeriod.prevStart);
      const prevEndDate = new Date(prevPeriod.prevEnd);

      if (prevStartDate.toDateString() === prevEndDate.toDateString()) {
        prevStartDate.setHours(0, 0, 0, 0);
        prevEndDate.setHours(23, 59, 59, 999);
        formattedPrevStart = formatDate(prevStartDate, true);
        formattedPrevEnd = formatDate(prevEndDate, true);
      }

      setDateRanges((prev) => ({
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

    let formattedPrevStart = formatDate(periodStart);
    let formattedPrevEnd = formatDate(periodEnd);

    if (periodStart.toDateString() === periodEnd.toDateString()) {
      periodStart.setHours(0, 0, 0, 0);
      periodEnd.setHours(23, 59, 59, 999);
      formattedPrevStart = formatDate(periodStart, true);
      formattedPrevEnd = formatDate(periodEnd, true);
    }

    return {
      prevStart: formattedPrevStart,
      prevEnd: formattedPrevEnd,
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

    let formattedStart = formatDate(periodStart);
    let formattedEnd = formatDate(periodEnd);
    let formattedPrevStart = formatDate(prevPeriodStart);
    let formattedPrevEnd = formatDate(prevPeriodEnd);

    if (periodStart.toDateString() === periodEnd.toDateString()) {
      periodStart.setHours(0, 0, 0, 0);
      periodEnd.setHours(23, 59, 59, 999);
      formattedStart = formatDate(periodStart, true);
      formattedEnd = formatDate(periodEnd, true);
    }

    if (prevPeriodStart.toDateString() === prevPeriodEnd.toDateString()) {
      prevPeriodStart.setHours(0, 0, 0, 0);
      prevPeriodEnd.setHours(23, 59, 59, 999);
      formattedPrevStart = formatDate(prevPeriodStart, true);
      formattedPrevEnd = formatDate(prevPeriodEnd, true);
    }

    return {
      period: `Last ${days} Days`,
      start: formattedStart,
      end: formattedEnd,
      prevStart: formattedPrevStart,
      prevEnd: formattedPrevEnd,
    };
  };

  const getYesterdayDateRange = (): DateRange => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const yesterdayEnd = new Date(yesterday);
    yesterdayEnd.setHours(23, 59, 59, 999);

    const dayBeforeYesterday = new Date(yesterday);
    dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 1);

    const formattedYesterdayStart = formatDate(yesterday, true);
    const formattedYesterdayEnd = formatDate(yesterdayEnd, true);
    const formattedDayBeforeYesterdayStart = formatDate(
      dayBeforeYesterday,
      true
    );
    const formattedDayBeforeYesterdayEnd = formatDate(
      new Date(
        dayBeforeYesterday.getTime() +
          23 * 60 * 60 * 1000 +
          59 * 60 * 1000 +
          59 * 1000
      ),
      true
    );

    return {
      period: "Yesterday",
      start: formattedYesterdayStart,
      end: formattedYesterdayEnd,
      prevStart: formattedDayBeforeYesterdayStart,
      prevEnd: formattedDayBeforeYesterdayEnd,
    };
  };

  // initial dates for dropdown values based on the number of days
  const initialDateRanges: Record<string, DateRange> = useMemo(
    () => ({
      yesterday: getYesterdayDateRange(),
      lastSevenDays: getDateRanges(7),
      lastThirtyDays: getDateRanges(30),
      lastSixtyDays: getDateRanges(60),
      lastNinetyDays: getDateRanges(90),
      customDate: {
        period: "Custom Date",
        start: "",
        end: "",
        prevStart: "",
        prevEnd: "",
      },
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

  useEffect(() => {
    const kycData = retrieveLocalStorageData("kycValue") as KycData | null;

    if (kycData?.isReturningUser !== undefined) {
      setIsReturningUser(kycData.isReturningUser);
    }
  }, []);

  const handleAddOrder = () => {
    navigate("/orders/quick-order-place");
  };

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
          {filterData?.map((singleData, index) => {
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
                  setFilterId(index);
                  if (index === 0) {
                    setActiveTab("order");
                  } else if (index === 1) {
                    setActiveTab("revenue");
                  } else if (index === 2) {
                    setActiveTab("exception");
                  }
                }}
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
    </>
  );

  // Render null while loading
  if (isReturningUser === null) {
    return null;
  }

  return isReturningUser ? renderComingSoonContent() : renderNewUserContent();
};

export default Dashboard;
