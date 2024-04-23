import CustomButton from "../../components/Button";
import AddOrderIcon from "../../assets/Order/AddOrder.svg";
import BlukOrderIcon from "../../assets/Order/BlukOrderIcon.svg";
import SyncIcon from "../../assets/Order/SyncIcon.svg";
import { OrderStatus } from "./OrderStatus";
import FilterIcon from "../../assets/Order/FilterIcon.svg";
import DeliveryGIF from "../../assets/OrderCard/Gif.png";
import { CustomTable } from "../../components/Table";
import { useCallback, useEffect, useRef, useState } from "react";
import Stepper from "./Stepper";
import "../../styles/silkStyle.css";
import DeliveryIcon from "../../assets/Delivery.svg";
import {
  columnHelperForNewOrder,
  ColumnHelperForBookedAndReadyToPicked,
  columnHelpersForRest,
} from "./ColumnHelpers";
import "./common/FilterScreen/OrderInput.css";
import { useMediaQuery } from "react-responsive";
import { ResponsiveState } from "../../utils/responsiveState";
import { POST } from "../../utils/webService";
import {
  CANCEL_MULTIPLE_WAYBILLS,
  CANCEL_TEMP_SELLER_ORDER,
  GET_SELLER_ORDER,
  GET_SINGLE_FILE,
  LEBEL_DOWNLOAD,
  GET_STATUS_COUNT,
  POST_SYNC_ORDER,
  FETCH_LABELS_REPORT_DOWNLOAD,
  FETCH_MULTI_TAX_REPORT_DOWNLOAD,
  GET_SELLER_ORDER_COMPLETE_DATA,
  GET_ORDER_ERRORS,
  RECHARGE_STATUS,
  PAYMENT_ERRORS,
} from "../../utils/ApiUrls";
import OrderCard from "./OrderCard";
import "../../styles/index.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Breadcrum } from "../../components/Layout/breadcrum";
import CenterModal from "../../components/CustomModal/customCenterModal";
import BulkUpload from "./BulkUpload/BulkUpload";
import { useSelector } from "react-redux";
import AccessDenied from "../../components/AccessDenied";
import Pagination from "../../components/Pagination";
import DeleteModal from "../../components/CustomModal/DeleteModal";
import { DeleteModal as DeleteModalDraftOrder } from "../../components/DeleteModal";
import CustomTableAccordian from "../../components/CustomAccordian/CustomTableAccordian";
import { checkPageAuthorized } from "../../redux/reducers/role";
import CustomRightModal from "../../components/CustomModal/customRightModal";
import orderCardImg from "../../assets/OrderCard/Gif.gif";
import CloseIcon from "../../assets/CloseIcon.svg";
import CopyTooltip from "../../components/CopyToClipboard";
import { BottomNavBar } from "../../components/BottomNavBar";
import {
  capitalizeFirstLetter,
  getLocalStorage,
  getQueryJson,
  removeLocalStorage,
  tokenKey,
} from "../../utils/utility";
import "../../styles/hideScroll.css";
import Errors from "./Errors";
import ErrorModal from "./ErrorModal";
import PartnerJumperModal from "./PartnerJumberModal";
import DatePicker from "react-datepicker";
import { debounce } from "lodash";
import RightSideModal from "../../components/CustomModal/customRightModal";

import { io, Socket } from "socket.io-client";
import { SearchBox } from "../../components/SearchBox";
import FilterScreen from "./common/FilterScreen/filterScreen";
import ServiceButton from "../../components/Button/ServiceButton";
import { Spinner } from "../../components/Spinner";
import "../../styles/progressBar.css";
import NewTrackingContent from "./newTrackingContent";

const Buttons = (className?: string) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className={
        className
          ? className
          : `lg:flex lg:flex-row-reverse hidden grid-cols-4 gap-x-2 mt-4 lg:mt-0 h-[54px] items-center`
      }
    >
      <div className="grid col-span-2">
        <CustomButton
          className="lg:px-2 lg:py-4 lg:font-semibold lg:text-[14px]"
          text="ADD ORDER"
          onClick={() => navigate("/orders/add-order/pickup")}
          showIcon={true}
          icon={AddOrderIcon}
        />
      </div>

      {/* <div className="flex flex-col items-center justify-center lg:px-2 lg:py-4 lg:border-[1px] lg:rounded-md lg:border-[#A4A4A4] lg:flex-row lg:space-x-2 lg:h-[36px]">
        <img src={SyncIcon} alt="" width="16px" />
        <span className="text-[#004EFF] text-[10px] whitespace-nowrap lg:font-semibold lg:text-[14px] lg:text-[#1C1C1C]">
          SYNC CHANNEL
        </span>
      </div> */}

      <div
        className="flex flex-col items-center justify-center lg:px-2 lg:py-4 lg:border-[1px] lg:rounded-md lg:border-[#A4A4A4] lg:flex-row lg:space-x-2 lg:h-[36px] cursor-pointer"
        // onClick={() => setIsModalOpen(true)}
        onClick={() => navigate("/orders/add-bulk")}
      >
        <img src={BlukOrderIcon} alt="" width="16px" />
        <span className="text-[#004EFF] text-[10px] whitespace-nowrap lg:font-semibold lg:text-[14px] lg:text-[#1C1C1C]">
          BULK UPLOAD
        </span>
      </div>
      {isModalOpen && (
        <CenterModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        >
          <BulkUpload
            onClick={() => {
              setIsModalOpen(false);
            }}
          />
        </CenterModal>
      )}
    </div>
  );
};
// [
//   "BOOKED",
//   "NOT PICKED",
//   "CANCELLED",
//   "DRAFT",
//   "READY TO PICK",
//   "PICKED UP",
//   "IN TRANSIT",
//   "DESTINATION CITY",
//   "OUT OF DELIVERY",
//   "DELIVERED",
//   "RETURN",
//   "RTO",
//   "FAILED",
// ];

const ordersArr = [
  {
    count: 23,
    text: "Today's delivery",
    img: "CreateOrderIcon",
  },
  {
    count: 34,
    text: "Today's delivery",
    img: "ShippedIcon",
  },
  {
    count: 12,
    text: "Today's delivery",
    img: "InTransitIcon",
  },
  {
    count: 17,
    text: "Today's delivery",
    img: "InTransitIcon",
  },
];

const tabs = [
  {
    statusName: "Draft",
    value: "DRAFT",
    orderNumber: 0,
  },
  {
    statusName: "Booked",
    value: "BOOKED",
    orderNumber: 0,
  },
  {
    statusName: "Ready to Pick",
    value: "READY TO PICK",
    orderNumber: 0,
  },
  // {
  //   statusName: "Picked Up",
  //   value: "PICKED UP",
  //   orderNumber: 0,
  // },
  {
    statusName: "In Transit",
    value: "IN TRANSIT",
    orderNumber: 0,
  },
  // {
  //   statusName: "Destination City",
  //   value: "DESTINATION CITY",
  //   orderNumber: 0,
  // },
  {
    statusName: "Out For Delivery",
    value: "OUT OF DELIVERY",
    orderNumber: 0,
  },
  {
    statusName: "Delivered",
    value: "DELIVERED",
    orderNumber: 0,
  },
  {
    statusName: "Return",
    value: "RETURN",
    orderNumber: 0,
  },
  {
    statusName: "Exception",
    value: "EXCEPTION",
    orderNumber: 0,
  },
  {
    statusName: "Cancelled",
    value: "CANCELLED",
    orderNumber: 0,
  },
];

const Index = () => {
  const [filterId, setFilterId]: any = useState(0);
  const [statusData, setStatusData]: any = useState(tabs);
  const [orders, setOrders]: any = useState([]);
  const [allOrders, setAllOrders]: any = useState([]);
  const [totalOrders, setTotalOrders]: any = useState([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [columnHelper, setColumnhelper]: any = useState([]);
  const [totalCount, setTotalcount]: any = useState(0);
  const [globalIndex, setGlobalIndex] = useState(0);
  const [tabStatusId, setTabStatusId] = useState(0);
  const syncRef: any = useRef(null);
  const [currentTap, setCurrentTap] = useState<any>("DRAFT");
  const [cancellationModal, setCancellationModal]: any = useState({
    isOpen: false,
    awbNo: "",
    orderId: "",
  });

  let thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [deleteModalDraftOrder, setDeleteModalDraftOrder]: any = useState({
    isOpen: false,
    payload: "",
  });
  const [partnerModalData, setPartnerModalData]: any = useState({
    isOpen: false,
    data: [],
  });
  const [sellerOverview, setSellerOverview]: any = useState([
    {
      label: "Today's delivery",
      value: "todayDelivery",
      number: "23",
      gif: DeliveryGIF,
    },
    { label: "COD", value: "cod", number: "2000", gif: false },
    {
      label: "Online Payment",
      value: "onlinePayment",
      number: "13000",
      gif: DeliveryGIF,
    },
    { label: "Sucsess Rate", value: "sucsessRate", number: "5%", gif: false },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infoModalContent, setInfoModalContent]: any = useState({
    isOpen: false,
    data: {},
    orderId: "",
  });
  const [isSyncModalOpen, setIsSyncModalOpen]: any = useState(false);
  const [isSyncModalLoading, setIsSyncModalLoading] = useState(true);

  const roles = useSelector((state: any) => state?.roles);
  const channelReduxData = useSelector((state: any) => state?.channel?.channel);

  const isMobileView = useMediaQuery({ maxWidth: 768 }); // Adjust the breakpoint as per your requirement
  const { isLgScreen } = ResponsiveState();
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);

  const [openSection, setOpenSection] = useState<any>(false);
  const [selectedRowdata, setSelectedRowData] = useState([]);

  const isActive = checkPageAuthorized("View Orders");
  const [isSticky, setIsSticky] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState<any>(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [draftOrderCount, setDraftOrderCount] = useState({
    all: 0,
    draft: 0,
    failed: 0,
    error: 0,
  });
  const [filterModal, setFilterModal] = useState(false);
  const [filterState, setFilterState] = useState({
    name: "",
    menu: [],
    label: "",
    isCollapse: false,
  });
  const [filterPayLoad, setFilterPayLoad] = useState({
    filterArrOne: [],
    filterArrTwo: [],
  });

  const [persistFilterData, setPersistFilterData]: any = useState({
    deliveryPincode: [],
    pickupPincode: [],
  });

  const [isErrorPage, setIsErrorPage] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorData, setErrorData]: any = useState();
  const [isErrorListLoading, setIsErrorListLoading] = useState(false);
  const [errorModalData, setErrorModalData]: any = useState();
  const [dateRange, setDateRange]: any = useState([null, null]);
  const [endDate, setEndDate] = useState<any>(new Date());
  const [openRightModalForTracking, setOpenRightModalForTracking] =
    useState<any>({
      isOpen: false,
      awbNo: "",
    });

  const [startDate, setStartDate] = useState<any>(thirtyDaysAgo);
  const [searchedText, setSearchedText] = useState("");
  let debounceTimer: any;
  let { activeTab } = getQueryJson();
  activeTab = activeTab?.toUpperCase();

  let syncChannelTextObj: any = sessionStorage.getItem("userInfo");
  syncChannelTextObj = JSON.parse(syncChannelTextObj);

  let syncChannelText = syncChannelTextObj?.nextStep?.isChannelIntegrated
    ? "Sync Channel"
    : "Add Channel";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Check if the user has scrolled past the threshold
      setIsSticky(scrollTop > 263);
    };

    // Attach the event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const setInfoModalContentFunction = async (data: any) => {
    setInfoModalContent({
      isOpen: true,
      data: data,
      orderId: "",
    });
  };

  const handleSearchOrder = async (e: any) => {
    try {
      let currentStatus = tabs[globalIndex]?.value;
      const payload: any = {
        currentStatus,
        filterArrOne: filterPayLoad?.filterArrOne || [],
        filterArrTwo: filterPayLoad?.filterArrTwo || [],
      };

      if (e.target.value.length > 0) {
        payload.id = e.target.value;
      }

      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        setIsLoading(true);
        const { data } = await POST(GET_SELLER_ORDER, {
          id: e.target.value,
          currentStatus,
        });
        const { OrderData, orderCount } = data?.data?.[0];
        setStatusCount("", currentStatus, orderCount);
        setTotalcount(orderCount ? orderCount : 0);
        if (data?.status) {
          setIsLoading(false);
          setOrders(OrderData);
          setFilterModal(false);
        } else {
          setIsLoading(false);
          setFilterModal(false);
          throw new Error(data?.meesage);
        }
      }, 800);
    } catch (error: any) {
      console.warn("Error in OrderStatus Debouncing: ", error.message);
    }
  };

  const getAllOrders = async (subStatus?: any) => {
    let currentStatus = tabs[globalIndex]?.value;

    let payload: any = {
      skip: 0,
      limit: 10,
      pageNo: 1,
      sort: { _id: -1 },
      currentStatus,
      subStatus,
    };

    let firstFilterData: any = [];
    let secondFilterData: any = [];

    if (
      filterPayLoad?.filterArrOne.length > 0 ||
      filterPayLoad?.filterArrTwo.length > 0
    ) {
      const newFilterArrOne = filterPayLoad?.filterArrOne.filter(
        (obj: any) => !Object.keys(obj).includes("createdAt")
      );

      firstFilterData = newFilterArrOne;
      secondFilterData = filterPayLoad?.filterArrTwo;
    }

    if (startDate && endDate) {
      let startEpoch = null;
      let lastendEpoch = null;

      if (startDate instanceof Date && endDate instanceof Date) {
        startDate.setHours(0, 0, 0, 0);
        startEpoch = startDate.getTime();

        endDate.setHours(23, 59, 59, 999);
        const endEpoch = endDate.getTime();

        lastendEpoch = endEpoch;
      }

      firstFilterData.unshift(
        {
          createdAt: {
            $gte: startEpoch,
          },
        },
        {
          createdAt: {
            $lte: lastendEpoch,
          },
        }
      );
    }

    if (firstFilterData.length > 0 || secondFilterData.length > 0) {
      payload.filterArrOne = firstFilterData;
      payload.filterArrTwo = secondFilterData;
    }

    const { data } = await POST(GET_SELLER_ORDER, payload);

    if (data?.status) {
      const { OrderData, orderCount } = data?.data?.[0];
      setSearchedText("");
      setOrders(OrderData);
      setTotalcount(orderCount || 0);
      getStatusCount(currentStatus, true, "", startDate, endDate);
    }
  };

  const Buttons = (className?: string) => {
    return (
      <div>
        <div className="flex justify-end mb-4">
          <div className="border border-[#AFAFAF] w-[230px]  !h-[36px] rounded-md">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update: any) => {
                setDateRange(update);
                if (update[0] === null && update[1] === null) {
                  // Explicitly set startDate and endDate to null when cleared
                  setStartDate(null);
                  setEndDate(null);
                  // fetchCodRemittanceData();
                } else {
                  // Update startDate and endDate based on the selected range
                  setStartDate(update[0]);
                  setEndDate(update[1]);
                }
              }}
              isClearable={true}
              placeholderText="Select From & To Date"
              className="cursor-pointer removePaddingPlaceHolder !w-[225px] !h-[31px] border-[#AFAFAF] rounded-md text-[12px] font-normal flex items-center datepickerCss pl-6"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="ml-2 flex items-center rounded-md border-[#AFAFAF] border w-[250px]">
            <SearchBox
              className="removePaddingPlaceHolder !h-[34px] w-[245px] border-none"
              label="Search"
              value={searchedText}
              onChange={(e: any) => {
                // handleSearchOrder(e);
                setSearchedText(e.target.value);
              }}
              getFullContent={getAllOrders}
              customPlaceholder="Search By Order Id, AWB"
            />
          </div>
          <div
            className="flex ml-2 rounded-md py-2 px-4 bg-[#E5EDFF] justify-between cursor-pointer items-center  gap-x-2"
            onClick={() => setFilterModal(true)}
          >
            <img src={FilterIcon} alt="" />
            <span className="text-[#004EFF] text-[14px] font-semibold">
              FILTER
            </span>
          </div>
        </div>
        <div
          className={
            className
              ? className
              : `lg:flex lg:flex-row-reverse hidden grid-cols-4 gap-x-2 mt-6 lg:mt-0 h-[54px] items-center`
          }
        >
          <div className="grid col-span-2">
            <CustomButton
              className="lg:px-2 lg:py-4 lg:font-semibold lg:text-[14px]"
              text="ADD ORDER"
              onClick={() => navigate("/orders/add-order/pickup")}
              showIcon={true}
              icon={AddOrderIcon}
            />
          </div>

          <div
            ref={syncRef}
            onClick={handleSyncOrder}
            className="flex flex-col items-center justify-center lg:px-2 lg:py-4 lg:border-[1px] lg:rounded-md lg:border-[#A4A4A4] lg:flex-row lg:space-x-2 lg:h-[36px] cursor-pointer"
          >
            <img src={SyncIcon} alt="" width="16px" />
            <span className="text-[#004EFF] text-[10px] whitespace-nowrap lg:font-semibold lg:text-[14px] lg:text-[#1C1C1C]">
              {syncChannelText}
            </span>
          </div>

          <div
            className="flex flex-col items-center justify-center lg:px-2 lg:py-4 lg:border-[1px] lg:rounded-md lg:border-[#A4A4A4] lg:flex-row lg:space-x-2 lg:h-[36px] cursor-pointer"
            // onClick={() => setIsModalOpen(true)}
            onClick={() => navigate("/orders/add-bulk")}
          >
            <img src={BlukOrderIcon} alt="" width="16px" />
            <span className="text-[#004EFF] text-[10px] whitespace-nowrap lg:font-semibold lg:text-[14px] lg:text-[#1C1C1C] capitalize">
              Bulk Upload
            </span>
          </div>
          {isModalOpen && (
            <CenterModal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
            >
              <BulkUpload
                onClick={() => {
                  setIsModalOpen(false);
                }}
              />
            </CenterModal>
          )}
        </div>
      </div>
    );
  };

  const handleSyncOrder = async () => {
    try {
      if (syncChannelText.includes("Sync Channel")) {
        setIsSyncModalOpen(true);
        syncRef.current.childNodes[1].textContent = "Sync In Progress...";
        syncRef.current.style.backgroundColor = "#F8F8F8";
        syncRef.current.style.pointerEvents = "none";
        syncRef.current.childNodes[0].classList.add("infinite-rotate");
      }

      // const { data: response } = await POST(GET_ALL_STORES, {});
      // if (response.data.length === 0) {
      //   toast.error("Please Integrate A Channel First");
      //   return navigate("/catalogues/channel-integration");
      // }

      let payload: any = {};

      if (startDate && endDate) {
        let startEpoch = null;
        let lastendEpoch = null;

        if (startDate instanceof Date && endDate instanceof Date) {
          startDate.setHours(0, 0, 0, 0);
          startEpoch = startDate.getTime();

          endDate.setHours(23, 59, 59, 999);
          const endEpoch = endDate.getTime();

          lastendEpoch = endEpoch;
        }

        payload.dateFilter = {
          createdAtMin: {
            $gte: startEpoch,
          },

          createdAtMax: {
            $lte: lastendEpoch,
          },
        };
      }

      const { data } = await POST(POST_SYNC_ORDER, payload);
      if (data?.success) {
        toast.success("Sync In Progress", {
          className: "custom-toast-success",
        });
        setTimeout(() => {
          window.location.href = "/orders/view-orders?activeTab=draft";
          window.onload = () => {
            window.location.reload();
          };
        }, 18000);
      } else {
        // toast.error(data?.message || "Please Integrate A Channel First");
        return navigate("/catalogues/channel-integration");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed To Sync Channel");
    }
    if (syncRef.current) {
      syncRef.current.childNodes[1].textContent = "Sync Channel";
      syncRef.current.style.backgroundColor = "white";
      syncRef.current.style.pointerEvents = "auto";
      syncRef.current.childNodes[0].classList.remove("infinite-rotate");
    }
  };

  const warningMessageForDelete = (data?: any) => {
    const tempOrderIdArray = data?.tempOrderIdArray?.map(
      (tempOrderIdObj?: any) => tempOrderIdObj
    );
    return (
      <div>
        <div>
          <span>
            {" "}
            Are You Sure You Want To Delete this
            {tempOrderIdArray?.length > 1 ? " Orders" : " Order"}
          </span>
          <div className="w-[450px] text-[16px]  truncate">
            {tempOrderIdArray?.join(", ")}
          </div>
        </div>
      </div>
    );
  };

  const warningMessageForCancel = (data?: any) => {
    return (
      <div>
        <div>
          <span>
            {" "}
            Are You Sure You Want To Cancel This
            {data > 1 ? " Orders" : " Order"}
          </span>
          <div className="w-[450px] text-[16px]  truncate">
            {data?.join(", ")}
          </div>
        </div>
      </div>
    );
  };

  const MobileButtons = (className?: string) => {
    return (
      <div
        className={
          className ? className : `flex items-center mx-5 mt-2 justify-between`
        }
      >
        <div>
          <CustomButton
            className="text-[12px] lg:px-2 lg:py-4 lg:font-semibold lg:text-[14px]"
            text="ADD ORDER"
            onClick={() => navigate("/orders/add-order/pickup")}
            showIcon={true}
            icon={AddOrderIcon}
          />
        </div>

        <div
          ref={syncRef}
          onClick={handleSyncOrder} // Function Added
          className="flex flex-col items-center justify-center lg:px-2 lg:py-4 lg:border-[1px] lg:rounded-md lg:border-[#A4A4A4] lg:flex-row lg:space-x-2 lg:h-[36px] cursor-pointer"
        >
          <img src={SyncIcon} alt="" width="16px" />
          <span className="text-[#004EFF] text-[10px] whitespace-nowrap lg:font-semibold lg:text-[14px] lg:text-[#1C1C1C]">
            Sync Channel
          </span>
        </div>

        <div
          className="flex flex-col items-center "
          onClick={() => navigate("/orders/add-bulk")}
        >
          <img src={BlukOrderIcon} alt="" />
          <div className="text-[#004EFF] text-[12px]">BULK ORDER</div>
        </div>
      </div>
    );
  };

  //  settings for desktop view
  const desktopSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
  };

  //  settings for mobile view

  // Define settings for mobile view
  const mobileSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Adjust the number of slides shown on mobile
    centerMode: true,
    slidesToScroll: 1,
    initialSlide: 0, // Start from the second slide to hide the slide on the left side
  };

  const currentSettings = isMobileView ? mobileSettings : desktopSettings;

  const getSellerOrderByStatus = async (
    currentStatus = "DRAFT",
    pageNo: number = 1,
    sort: object = { _id: -1 },
    skip: number = 0,
    limit: number = 10,
    dateFilter: any = false,
    searchText?: any,
    startDate?: any,
    endDate?: any,
    filterPayLoadData?: any
  ) => {
    try {
      setIsLoading(true);

      let firstFilterData = [];
      let secondFilterData = [];

      let payload: any = {
        pageNo: 1, //temp
        sort: { _id: -1 }, //temp
        skip: 0, //temp
        limit: limit, //temp
        currentStatus,
      };

      if (searchText?.length > 0) {
        payload.id = searchText;
      }

      if (
        filterPayLoadData?.filterArrOne.length > 0 ||
        filterPayLoadData?.filterArrTwo.length > 0
      ) {
        const newFilterArrOne = filterPayLoadData?.filterArrOne.filter(
          (obj: any) => !Object.keys(obj).includes("createdAt")
        );

        firstFilterData = newFilterArrOne;
        secondFilterData = filterPayLoadData?.filterArrTwo;
      }

      if (startDate && endDate) {
        let startEpoch = null;
        let lastendEpoch = null;

        if (startDate instanceof Date && endDate instanceof Date) {
          startDate.setHours(0, 0, 0, 0);
          startEpoch = startDate.getTime();

          endDate.setHours(23, 59, 59, 999);
          const endEpoch = endDate.getTime();

          lastendEpoch = endEpoch;
        }

        firstFilterData.unshift(
          {
            createdAt: {
              $gte: startEpoch,
            },
          },
          {
            createdAt: {
              $lte: lastendEpoch,
            },
          }
        );
      }

      if (firstFilterData.length > 0 || secondFilterData.length > 0) {
        payload.filterArrOne = firstFilterData;
        payload.filterArrTwo = secondFilterData;
      }

      const { data } = await POST(GET_SELLER_ORDER, payload);

      const { orderCount, draftCount, failedCount, errorCount } = data?.data[0];

      if (dateFilter === true) {
        getStatusCount(
          currentStatus,
          dateFilter,
          searchText,
          startDate,
          endDate,
          firstFilterData,
          secondFilterData
        );
      } else {
        setStatusCount("", currentStatus, orderCount);
      }
      setTotalcount(orderCount ? orderCount : 0);

      setDraftOrderCount({
        ...draftOrderCount,
        all: orderCount,
        draft: draftCount || 0,
        // failed: failedCount || 0,
        error: errorCount || 0,
      });

      setSelectedRowData([]);
      if (data?.status || data?.success) {
        setIsLoading(false);
        return data?.data[0];
      } else {
        setIsLoading(false);
        throw new Error(data?.meesage);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error);
      return false;
    }
  };

  const getSingleFile = async (payload: any, actionType?: any) => {
    // let fileName = "";
    let awbs = {
      awbs: payload?.awbs,
    };

    let header = {
      Accept: "/",
      Authorization: `Bearer ${localStorage.getItem(
        `${sessionStorage.getItem("sellerId")}_${tokenKey}`
      )}`,
      "Content-Type": "application/json",
    };

    if (actionType === "download_label") {
      const data = await fetch(FETCH_LABELS_REPORT_DOWNLOAD, {
        method: "POST",
        headers: header,
        body: JSON.stringify(awbs),
      });

      const resdata: any = await data?.blob();

      const blob = new Blob([resdata], { type: "application/pdf" });

      var url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Label_Report.pdf`;
      a.click();
      return true;
    } else {
      const data = await fetch(FETCH_MULTI_TAX_REPORT_DOWNLOAD, {
        method: "POST",
        headers: header,
        body: JSON.stringify(awbs),
      });

      const resdata: any = await data?.blob();

      const blob = new Blob([resdata], { type: "application/pdf" });

      var url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Tax_Report.pdf`;
      a.click();
      return true;
    }
  };

  const orderActions = (payLoad: any, actionType: any, currentStatus?: any) => {
    switch (currentStatus) {
      case "DRAFT":
        if (actionType === "edit") {
          setPartnerModalData({
            isOpen: true,
            data: {
              tempOrderId: payLoad?.tempOrderIdArray?.[0],
              awb: "0",
            },
          });
          // setIsPartnerModal(true);
        } else {
          setDeleteModalDraftOrder({ isOpen: true, payload: payLoad });
        }
        break;
      case "BOOKED":
      case "CANCELLED":
      case "READY TO PICK":
      case "IN TRANSIT":
      case "OUT OF DELIVERY":
      case "DELIVERED":
      case "RETURN":
        if (actionType === "cancel_order") {
          setCancellationModal({
            isOpen: true,
            payload: payLoad?.awbs,
          });
        } else if (actionType === "download_label") {
          getSingleFile(payLoad, actionType);
        } else if (actionType === "download_invoice") {
          getSingleFile(payLoad, actionType);
        }
        break;
      default:
        break;
    }
  };

  const setStatusCount = (
    statusListFromApi: any,
    currentStatus: any,
    updatedCount: any = undefined,
    dateFilter = false
  ) => {
    try {
      let tempArr = statusData;

      if (updatedCount === undefined) {
        statusListFromApi.length > 0 &&
          statusListFromApi?.forEach((e1: any) => {
            const matchingIndex = tempArr.findIndex(
              (e: any) => e.value === e1._id?.toUpperCase()
            );

            for (let index = 0; index < tempArr.length; index++) {
              const element1 = tempArr[index];

              if (element1.value === e1._id?.toUpperCase()) {
                element1.orderNumber = e1?.count?.toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                });
              } else {
                if (dateFilter === true) {
                  const num: any = 0;
                  element1.orderNumber = num.toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  });
                }
              }
            }
          });
      } else {
        // const index = tempArr.findIndex(
        //   (statusData: any) => statusData?.value === currentStatus
        // );

        // if (index > -1) {
        //   tempArr[index].orderNumber = updatedCount.toLocaleString("en-US", {
        //     minimumIntegerDigits: 2,
        //     useGrouping: false,
        //   });
        // }

        for (let index = 0; index < tempArr.length; index++) {
          const element = tempArr[index];

          const { value } = element;
          if (value === currentStatus) {
            element.orderNumber = updatedCount.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            });
          } else {
            // const num: any = 0;
            //   element.orderNumber = num.toLocaleString("en-US", {
            //     minimumIntegerDigits: 2,
            //     useGrouping: false,
            //   });
          }
        }
      }

      setStatusData([...tempArr]);
    } catch (error) {
      console.error(
        "🚀 ~ file: index.tsx:537 ~ setStatusCount ~ error:",
        error
      );
    }
  };

  const handleTabChanges = async (
    index?: any,
    dateFilter = false,
    searchedText?: any,
    startDate?: any,
    endDate?: any,
    filterPayLoad?: any,
    itemsPerPage?: any
  ) => {
    try {
      const data = await getSellerOrderByStatus(
        statusData[index].value,
        1,
        { _id: -1 },
        0,
        itemsPerPage,
        dateFilter,
        searchedText,
        startDate,
        endDate,
        filterPayLoad
      );
      const { OrderData } = data;
      setOrders(OrderData);
      setAllOrders(OrderData);
      setTotalOrders(OrderData);
      setGlobalIndex(index);

      setTabStatusId(index);

      let currentStatus = tabs[index].value;
      setCurrentTap(currentStatus);
      setIsErrorPage(index > 0 && false);
      index > 0 && setFilterId(0);

      switch (tabs[index].value) {
        case "DRAFT":
          setColumnhelper(
            columnHelperForNewOrder(
              navigate,
              setDeleteModalDraftOrder,
              setInfoModalContent,
              currentStatus,
              orderActions,
              setInfoModalContentFunction
            )
          );
          break;
        case "BOOKED":
          setColumnhelper(
            ColumnHelperForBookedAndReadyToPicked(
              navigate,
              setCancellationModal,
              setInfoModalContent,
              setInfoModalContentFunction,
              currentStatus,
              orderActions,
              setOpenRightModalForTracking,
              openRightModalForTracking
            )
          );
          break;
        case "READYTOPICK":
          setColumnhelper(
            ColumnHelperForBookedAndReadyToPicked(
              navigate,
              setInfoModalContent,
              setInfoModalContentFunction,
              currentStatus,
              orderActions,
              setOpenRightModalForTracking,
              openRightModalForTracking
            )
          );
          break;
        default:
          setColumnhelper(
            columnHelpersForRest(
              navigate,
              setInfoModalContent,
              currentStatus,
              orderActions,
              setInfoModalContentFunction,
              setOpenRightModalForTracking,
              openRightModalForTracking
            )
          );
          break;
      }
    } catch (error) {
      console.error("An error occurred in handleTabChanges function:", error);
    }
  };
  const PersistFilterArr = (key: any, data: any) => {
    setPersistFilterData((prevData: any) => {
      return { ...prevData, [key]: [...data] };
    });
  };

  function getObjectWithIsActiveTrue(data: any, name: any) {
    let tempArrTwo = filterPayLoad?.filterArrTwo;
    let tempArrOne = filterPayLoad?.filterArrOne;

    const updateFilterArr = (arr: any, key: any, subKey: any, data: any) => {
      const index = arr.findIndex(
        (findArr: any) => Object.keys(findArr)[0] === key
      );
      if (index > -1) {
        arr[index][key][subKey] = data;
      } else {
        const newObj = { [key]: { [subKey]: [...data] } };
        arr.push(newObj);
      }
    };

    switch (name) {
      case "Delivery Pincode":
        updateFilterArr(tempArrTwo, "deliveryAddress.pincode", "$in", data);
        PersistFilterArr("deliveryPincode", data);
        break;
      case "Pickup Pincode":
        updateFilterArr(tempArrTwo, "pickupAddress.pincode", "$in", data);
        PersistFilterArr("pickupPincode", data);
        break;
      case "Payment Type":
        const tempArr = [...data];

        for (let i = 0; i < tempArr.length; i++) {
          if (tempArr[i] === "Prepaid") {
            tempArr[i] = false;
          } else if (tempArr[i] === "Cod") {
            tempArr[i] = true;
          }
        }

        updateFilterArr(tempArrTwo, "codInfo.isCod", "$in", tempArr);
        PersistFilterArr("paymentType", data);
        break;
      case "Partners":
        updateFilterArr(tempArrTwo, "service.partnerName", "$in", data);
        PersistFilterArr("partners", data);
        break;
      case "Order Type":
        updateFilterArr(tempArrOne, "orderType", "$in", data);
        PersistFilterArr("orderType", data);
        break;
      case "Sources":
        updateFilterArr(tempArrOne, "source", "$in", data);
        PersistFilterArr("sources", data);
        break;
      case "Seller Id":
        updateFilterArr(tempArrOne, "sellerId", "$in", data);
        PersistFilterArr("sellerId", data);
        break;
      default:
        break;
    }

    tempArrOne = tempArrOne.filter((obj: any) => {
      const key = Object.keys(obj)[0];
      return obj[key].$in.length > 0;
    });

    tempArrTwo = tempArrTwo.filter((obj: any) => {
      const key = Object.keys(obj)[0];
      return obj[key].$in.length > 0;
    });

    setFilterPayLoad({
      ...filterPayLoad,
      filterArrTwo: [...tempArrTwo],
      filterArrOne: [...tempArrOne],
    });
  }

  const getStatusCount = async (
    currentStatus: any = "DARFT",
    dateFilter = false,
    searchText?: any,
    selectedStartDate?: any,
    selectedEndDate?: any,
    firstFilterData?: any,
    secondFilterData?: any
    // filterPayLoad?: any,
  ) => {
    let payload: any = {};

    const newArray = filterPayLoad?.filterArrOne.filter(
      (obj) => !Object.keys(obj).includes("createdAt")
    );

    if (newArray?.length > 0 || secondFilterData?.length > 0) {
      payload.filterArrOne = newArray || [];
      payload.filterArrTwo = secondFilterData || [];
    }

    if (selectedStartDate && selectedEndDate) {
      let startEpoch = null;
      let lastendEpoch = null;

      if (
        selectedStartDate instanceof Date &&
        selectedEndDate instanceof Date
      ) {
        selectedStartDate.setHours(0, 0, 0, 0);
        startEpoch = selectedStartDate.getTime();

        selectedEndDate.setHours(23, 59, 59, 999);
        const endEpoch = selectedEndDate.getTime();

        lastendEpoch = endEpoch;
      }

      payload.startDate = startEpoch;
      payload.endDate = lastendEpoch;
    }

    if (searchText?.length > 0) {
      payload.id = searchText;
    }

    try {
      const { data } = await POST(GET_STATUS_COUNT, payload);
      const { status: isStatus, data: statusList } = data;
      if (isStatus) {
        // return data?.data;

        if (dateFilter) {
          setStatusCount(statusList, currentStatus, undefined, dateFilter);
        }

        setStatusCount(statusList, currentStatus);
      }
    } catch (error) {
      console.error(
        "🚀 ~ file: index.tsx:609 ~ getStatusCount ~ error:",
        error
      );
    }
  };

  const getIndexFromActiveTab = (arr: any, tabName: any) => {
    let tabIndex = arr.findIndex((e: any) => e.value === tabName);
    if (tabIndex > -1) {
      return +tabIndex;
    } else {
      return 0;
    }
  };

  const debounce = (fn: any, delay: any) => {
    let timerId: any;
    return (...args: any) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), delay);
    };
  };

  const searchDebounce = useCallback(debounce(handleTabChanges, 1000), []);

  useEffect(() => {
    if (endDate === undefined) return;

    const tabIndex = activeTab
      ? getIndexFromActiveTab(statusData, activeTab)
      : 0;

    if (searchedText.length > 0) {
      searchDebounce(
        tabIndex,
        true,
        searchedText,
        startDate,
        endDate,
        filterPayLoad,
        itemsPerPage
      );
    } else {
      handleTabChanges(
        tabIndex,
        true,
        "",
        startDate,
        endDate,
        filterPayLoad,
        itemsPerPage
      );
    }
  }, [endDate, activeTab, searchedText]);

  const onPageIndexChange = async (data: any) => {
    let skip: any = 0;
    let limit: any = 0;
    let pageNo: any = 0;

    if (data?.currentPage === 1) {
      skip = 0;
      limit = data?.itemsPerPage;
      pageNo = 1;
    } else {
      skip = (data?.currentPage - 1) * data?.itemsPerPage;
      limit = data?.itemsPerPage;
      pageNo = data?.currentPage || 0;
    }

    const { OrderData } = await getSellerOrder(
      tabs[globalIndex].value,
      pageNo,
      { _id: -1 },
      skip,
      limit,
      true,
      searchedText,
      startDate,
      endDate,
      filterPayLoad
    );
    setOrders(OrderData);
    setAllOrders(OrderData);
    setTotalOrders(OrderData);
  };

  const onPerPageItemChange = async (data: any) => {
    let skip: any = 0;
    let limit: any = 0;
    let pageNo: any = 0;

    setItemsPerPage(data?.itemsPerPage);

    if (data?.currentPage === 1) {
      skip = 0;
      limit = data?.itemsPerPage;
      pageNo = 1;
    } else {
      skip = 0;
      limit = data?.itemsPerPage;
      pageNo = data?.currentPage || 0;
    }

    setIsLoading(true);

    const { OrderData } = await getSellerOrder(
      tabs[globalIndex].value,
      pageNo,
      { _id: -1 },
      skip,
      limit,
      true,
      searchedText,
      startDate,
      endDate,
      filterPayLoad
    );

    setOrders([...OrderData]);
    setAllOrders([...OrderData]);
    setTotalOrders([...OrderData]);
    setIsLoading(false);
  };

  const getSellerOrder = async (
    currentStatus = "DRAFT",
    pageNo: number = 1,
    sort: object = { _id: -1 },
    skip: number = 0,
    limit: number = 10,
    dateFilter: any = false,
    searchText?: any,
    startDate?: any,
    endDate?: any,
    filterPayLoadData?: any
  ) => {
    try {
      const payload: any = {
        skip,
        limit,
        pageNo,
        sort,
        currentStatus,
      };

      let firstFilterData = [];
      let secondFilterData = [];

      if (searchText?.length > 0) {
        payload.id = searchText;
      }

      if (
        filterPayLoadData?.filterArrOne.length > 0 ||
        filterPayLoadData?.filterArrTwo.length > 0
      ) {
        const newFilterArrOne = filterPayLoadData?.filterArrOne.filter(
          (obj: any) => !Object.keys(obj).includes("createdAt")
        );

        firstFilterData = newFilterArrOne;
        secondFilterData = filterPayLoadData?.filterArrTwo;
      }

      if (startDate && endDate) {
        let startEpoch = null;
        let lastendEpoch = null;

        if (startDate instanceof Date && endDate instanceof Date) {
          startDate.setHours(0, 0, 0, 0);
          startEpoch = startDate.getTime();

          endDate.setHours(23, 59, 59, 999);
          const endEpoch = endDate.getTime();

          lastendEpoch = endEpoch;
        }

        firstFilterData.unshift(
          {
            createdAt: {
              $gte: startEpoch,
            },
          },
          {
            createdAt: {
              $lte: lastendEpoch,
            },
          }
        );
      }

      if (firstFilterData.length > 0 || secondFilterData.length > 0) {
        payload.filterArrOne = firstFilterData;
        payload.filterArrTwo = secondFilterData;
      }

      const { data } = await POST(GET_SELLER_ORDER, payload);

      const { orderCount } = data?.data[0];
      setTotalcount(orderCount ? orderCount : 0);

      setDraftOrderCount({ ...draftOrderCount, all: orderCount });

      setSelectedRowData([]);

      if (data?.status) {
        return data?.data[0];
      } else {
        throw new Error(data?.meesage);
      }
    } catch (error: any) {
      toast.error(error);
      return false;
    }
  };
  const fetchLabels = async (
    arrLebels: string[],
    setIsLoadingManifest: any
  ) => {
    if (!arrLebels.length) {
      toast.error("Please Select One Orders For label");
      return;
    }

    setIsLoadingManifest({
      isLoading: true,
      identifier: "Download_Labels",
    });

    const payload: any = {
      awbs: arrLebels.filter((item: any) => item !== ""),
    };
    // const { data } = await POST(
    //   FETCH_LABELS_REPORT_DOWNLOAD,
    //   payload
    //   // responseType: "blob",
    // );
    let header = {
      Accept: "/",
      Authorization: `Bearer ${localStorage.getItem(
        `${sessionStorage.getItem("sellerId")}_${tokenKey}`
      )}`,
      "Content-Type": "application/json",
    };
    const data = await fetch(FETCH_LABELS_REPORT_DOWNLOAD, {
      method: "POST",
      headers: header,
      body: JSON.stringify(payload),
    });
    // const data1 = await response.json();
    // if (!data?.status) {
    //   toast.error(data.msg);
    //   setIsLoadingManifest({
    //     isLoading: false,
    //     identifier: "",
    //   });
    //   return;
    // }
    setIsLoadingManifest({
      isLoading: false,
      identifier: "",
    });

    const resdata: any = await data.blob();

    const blob = new Blob([resdata], { type: "application/pdf" });

    var url = URL.createObjectURL(blob);
    setIsLoadingManifest({
      isLoading: false,
      identifier: "",
    });

    const a = document.createElement("a");
    a.href = url;
    a.download = `Label_Report.pdf`;
    a.click();
    return true;
  };

  const fetchMultiTax = async (
    arrLebels: string[],
    setIsLoadingManifest: any
  ) => {
    if (!arrLebels.length) {
      toast.error("Please Select One Orders For Tax Invoice");
      return;
    }

    setIsLoadingManifest({
      isLoading: true,
      identifier: "Download_Multi_Tax",
    });

    const payload: any = {
      awbs: arrLebels.filter((item: any) => item !== ""),
    };

    let header = {
      Accept: "/",
      Authorization: `Bearer ${localStorage.getItem(
        `${sessionStorage.getItem("sellerId")}_${tokenKey}`
      )}`,
      "Content-Type": "application/json",
    };
    const data = await fetch(FETCH_MULTI_TAX_REPORT_DOWNLOAD, {
      method: "POST",
      headers: header,
      body: JSON.stringify(payload),
    });

    setIsLoadingManifest({
      isLoading: false,
      identifier: "",
    });

    const resdata: any = await data.blob();

    const blob = new Blob([resdata], { type: "application/pdf" });

    var url = URL.createObjectURL(blob);
    setIsLoadingManifest({
      isLoading: false,
      identifier: "",
    });

    const a = document.createElement("a");
    a.href = url;
    a.download = `Multi_Tax_Invoices.pdf`;
    a.click();
    return true;
  };

  if (isDeleted) {
    const newOrders = orders.filter(
      (elem: any) => elem?.status?.[0]?.AWB !== cancellationModal.awbNo
    );
    setOrders(newOrders);
    setAllOrders(newOrders);
    setTotalOrders(newOrders);
    setIsDeleted(false);
  }

  const getErrors = async () => {
    let payload: any = {};

    const newArray = filterPayLoad?.filterArrOne.filter(
      (obj) => !Object.keys(obj).includes("createdAt")
    );

    if (newArray?.length > 0 || filterPayLoad?.filterArrTwo?.length > 0) {
      payload.filterArrOne = newArray || [];
      payload.filterArrTwo = filterPayLoad?.filterArrTwo || [];
    }

    if (startDate && endDate) {
      let startEpoch = null;
      let lastendEpoch = null;

      if (startDate instanceof Date && endDate instanceof Date) {
        startDate.setHours(0, 0, 0, 0);
        startEpoch = startDate.getTime();

        endDate.setHours(23, 59, 59, 999);
        const endEpoch = endDate.getTime();

        lastendEpoch = endEpoch;
      }

      payload.startDate = startEpoch;
      payload.endDate = lastendEpoch;
    }

    if (searchedText?.length > 0) {
      payload.id = searchedText;
    }

    setIsErrorListLoading(true);
    const { data } = await POST(GET_ORDER_ERRORS, payload);
    if (data?.status) {
      const result: any = [];
      let errorListCount = 0;

      for (const [key, value] of Object.entries(data?.data?.[0])) {
        const currentObject = {
          errorName: key,
          value: value,
        };
        result.push(currentObject);
      }

      result.forEach((item: any) => {
        if (item.value) {
          item.value.forEach((order: any) => {
            errorListCount += order.ordersCount || 0;
          });
        }
      });

      // setDraftOrderCount((prev: any) => {
      //   return { ...prev, error: errorListCount };
      // });

      setErrorData(result);
      setIsErrorListLoading(false);
    } else {
      setIsErrorListLoading(false);
    }
  };

  const applyFilterforOrders = async () => {
    try {
      setIsFilterLoading(true);

      const filterArrOneList: any = filterPayLoad?.filterArrOne;

      let currentStatus = tabs[globalIndex]?.value;
      let payload: any = {
        skip: 0,
        limit: 10,
        pageNo: 1,
        sort: { _id: -1 },
        currentStatus,
        filterArrOne: filterArrOneList || [],
        filterArrTwo: filterPayLoad?.filterArrTwo || [],
      };

      if (searchedText?.length > 0) {
        payload.id = searchedText;
      }

      if (startDate && endDate) {
        let startEpoch = null;
        let lastendEpoch = null;

        if (startDate instanceof Date && endDate instanceof Date) {
          startDate.setHours(0, 0, 0, 0);
          startEpoch = startDate.getTime();

          endDate.setHours(23, 59, 59, 999);
          const endEpoch = endDate.getTime();

          lastendEpoch = endEpoch;
        }

        filterArrOneList.unshift(
          {
            createdAt: {
              $gte: startEpoch,
            },
          },
          {
            createdAt: {
              $lte: lastendEpoch,
            },
          }
        );
      }

      const { data } = await POST(GET_SELLER_ORDER, payload);
      const { OrderData, orderCount } = data?.data?.[0];
      setStatusCount("", currentStatus, orderCount);
      setTotalcount(orderCount ? orderCount : 0);

      if (data?.status) {
        setIsFilterLoading(false);

        const newArray = filterPayLoad?.filterArrOne.filter(
          (obj) => !Object.keys(obj).includes("createdAt")
        );

        setFilterPayLoad((prevState: any) => {
          return {
            ...prevState,
            filterArrOne: newArray,
          };
        });

        setOrders(OrderData);
        getStatusCount(
          currentStatus,
          true,
          searchedText,
          startDate,
          endDate,
          filterPayLoad?.filterArrOne,
          filterPayLoad?.filterArrTwo
        );
        setFilterModal(false);
      } else {
        setIsFilterLoading(false);
        setFilterModal(false);
        throw new Error(data?.meesage);
      }
    } catch (error: any) {
      setIsFilterLoading(false);
      toast.error(error);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      if (!infoModalContent.isOpen && currentTap == "DRAFT") {
        const data: any = await getSellerOrderByStatus(
          activeTab,
          1,
          { _id: -1 },
          0,
          itemsPerPage,
          true,
          searchedText,
          startDate,
          endDate,
          filterPayLoad
        );
        const { OrderData } = data;
        setOrders(OrderData);
      }
    })();
  }, [infoModalContent]);

  useEffect(() => {
    // if (filterState?.menu?.length === 0) return;
    getObjectWithIsActiveTrue(filterState?.menu, filterState?.name);
    // if (filterState?.menu?.length > 0) {
    // }
  }, [filterState]);

  // useEffect(() => {
  //   (async () => {
  //     //   if (!infoModalContent.isOpen) {
  //     const data = await getSellerOrderByStatus();
  //     const { OrderData } = data;
  //     setOrders(OrderData);
  //     //   }
  //   })();
  // }, []);

  // useEffect(() => {
  //   console.log(
  //     "filterPayLoad-----------------%$##$%^----------->",
  //     filterPayLoad
  //   );
  // }, [filterPayLoad]);

  useEffect(() => {
    if (channelReduxData.length > 0) {
      setIsSyncModalLoading(false);
    }
  }, [channelReduxData]);

  useEffect(() => {
    (async () => {
      try {
        // fetchCurrentWallet();
        const juspayOrderId = getLocalStorage("order_id");
        if (juspayOrderId) {
          // setPaymentLoader(true);
          const orderStatus = await POST(RECHARGE_STATUS, {
            orderId: juspayOrderId,
            paymentGateway: "JUSPAY",
            transactionId: juspayOrderId,
          });
          if (orderStatus?.data?.success === false) {
            toast.error("Something Went Wrong");
          } else {
            toast.success("Wallet Recharge Successfully");
            // navigate(`${SELLER_WEB_URL}/wallet/view-wallet`);
            // ------------------------------------------------------------------------------------------
            let paymentPayload: any = getLocalStorage("paymentErrorObject");
            if (paymentPayload) {
              paymentPayload = JSON.parse(paymentPayload);
              await POST(PAYMENT_ERRORS, paymentPayload);
            }
            removeLocalStorage("paymentErrorObject");
          }
          removeLocalStorage("order_id");
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      {isActive ? (
        <div>
          <Breadcrum label="Orders" component={Buttons()} />
          <div className="flex md:hidden justify-between gap-4 customScroll py-4 mx-5 ">
            {ordersArr?.map((order: any, i: number) => (
              <div
                className="shadow-md w-[30rem] lg:w-[24rem] h-[6.2rem] lg:h-[6.6rem] relative rounded-lg border"
                key={i}
              >
                <div className="flex items-center justify-between min-w-[310px] p-3   lg:px-6 lg:py-4  ">
                  <div>
                    <div className="font-bold font-Lato mb-2 text-[#1C1C1C] text-[22px] lg:text-[2rem]">
                      {order?.count}
                    </div>
                    <p className="text-[#494949] font-normal lg:text-base font-Open text-sm">
                      {order?.text}
                    </p>
                  </div>
                  <div className="self-center  absolute top-[-35px] right-[10px] w-[120px] h-[120px]">
                    <img src={orderCardImg} alt="Box" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!isLgScreen && MobileButtons()}

          <div className="px-4 md:pl-5 md:pr-6 h-[calc(100vh-80px)]">
            <div className=" bg-white">
              <OrderStatus
                filterId={filterId}
                orders={orders}
                setFilterId={setFilterId}
                handleTabChange={handleTabChanges}
                statusData={statusData}
                setOrders={setOrders}
                allOrders={allOrders}
                currentStatus={tabs[globalIndex].value}
                selectedRowdata={selectedRowdata}
                setSelectedRowData={setSelectedRowData}
                fetchLabels={fetchLabels}
                fetchMultiTax={fetchMultiTax}
                setDeleteModalDraftOrder={setDeleteModalDraftOrder}
                setCancellationModal={setCancellationModal}
                tabStatusId={tabStatusId}
                setTotalcount={setTotalcount}
                draftOrderCount={draftOrderCount}
                setStatusCount={setStatusCount}
                isOrderTableLoader={setIsLoading}
                totalOrders={totalOrders}
                setDraftOrderCount={setDraftOrderCount}
                setIsErrorPage={setIsErrorPage}
                setErrorData={setErrorData}
                setIsErrorListLoading={setIsErrorListLoading}
                getErrors={getErrors}
                selectedDateRange={{ startDate, endDate }}
                filterPayLoad={filterPayLoad}
              />
            </div>
            <div
              // h-[calc(100%-150px)]
              className="overflow-y-auto my-6 h-[calc(100%-180px)]"
              // style={{ border: "2px solid yellow" }}
            >
              {isLoading ? (
                <>
                  {isLgScreen ? (
                    <div>
                      <div className="flex items-stretch h-16 rounded-xl">
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                      </div>
                      <div className="flex items-stretch h-44 rounded-xl">
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                      </div>
                      <div className="flex items-stretch h-44 rounded-xl">
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                        <div className="flex-1 m-2 animated rounded-xl"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <div className="flex items-stretch h-44 rounded-xl">
                        <div className="flex-1 my-2 animated rounded-xl"></div>
                      </div>
                      <div className="flex items-stretch h-44 rounded-xl">
                        <div className="flex-1 my-2 animated rounded-xl"></div>
                      </div>
                      <div className="flex items-stretch h-44 rounded-xl">
                        <div className="flex-1 my-2 animated rounded-xl"></div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  {isLgScreen ? (
                    isErrorPage ? (
                      <Errors
                        errorData={errorData}
                        setIsErrorModalOpen={setIsErrorModalOpen}
                        isErrorModalOpen={isErrorModalOpen}
                        setErrorModalData={setErrorModalData}
                        isLoading={isErrorListLoading}
                        getErrors={getErrors}
                      />
                    ) : (
                      <>
                        <CustomTable
                          data={orders || []}
                          columns={columnHelper || []}
                          setRowSelectedData={setSelectedRowData}
                          sticky={isSticky}
                        />

                        {totalCount > 0 && (
                          <Pagination
                            totalItems={totalCount}
                            itemsPerPageOptions={[10, 50, 100, 500, 1000]}
                            onPageChange={onPageIndexChange}
                            onItemsPerPageChange={onPerPageItemChange}
                            initialItemsPerPage={itemsPerPage}
                          />
                        )}
                      </>
                    )
                  ) : (
                    <div className="border border-white my-5">
                      {orders.length > 0 ? (
                        <>
                          {orders?.map((data: any, i: any) => (
                            <OrderCard
                              data={data}
                              currentStatus={tabs[tabStatusId].value}
                              orderActions={orderActions}
                            />
                          ))}
                        </>
                      ) : (
                        <div className="w-[100%] h-52 bg-[#f7f7f7] hover:bg-[#e9e9e9] flex rounded-lg justify-center items-center">
                          No Data Found
                        </div>
                      )}
                    </div>
                  )}
                  {/* <div className="mt-24 lg:hidden">
                  <BottomNavBar />
                </div> */}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <AccessDenied />
      )}
      <DeleteModal
        isOpen={cancellationModal?.isOpen}
        setModalClose={() =>
          setCancellationModal({ ...cancellationModal, isOpen: false })
        }
        deleteTextMessage={warningMessageForCancel(cancellationModal?.payload)}
        payloadBody={cancellationModal.payload}
        deleteURL={CANCEL_MULTIPLE_WAYBILLS}
        setIsDeleted={setIsDeleted}
        reloadData={handleTabChanges}
      />

      <DeleteModalDraftOrder
        url={CANCEL_TEMP_SELLER_ORDER}
        postData={deleteModalDraftOrder?.payload}
        isOpen={deleteModalDraftOrder?.isOpen}
        reloadData={handleTabChanges}
        closeModal={() => {
          setDeleteModalDraftOrder({ ...deleteModalDraftOrder, isOpen: false });
        }}
        title={warningMessageForDelete(deleteModalDraftOrder?.payload)}
      />
      <CustomRightModal
        isOpen={infoModalContent.isOpen}
        onClose={() => setInfoModalContent({ isOpen: false, data: {} })}
        className="!justify-start !w-[400px] xl:!w-[650px]"
      >
        <div className="flex justify-between mt-[1rem] rounded-lg mx-[1rem] h-[3rem] items-center bg-[#E5EDFF] border-b-2 w-[95%] px-[1rem] text-[16px]  py-8 ">
          <div className="">
            {infoModalContent?.data?.orderNumber && (
              <p>
                <span>Order Number:</span>
                {infoModalContent?.data?.orderNumber || ""}{" "}
              </p>
            )}
            <hr />
            <p className="mt-1">
              <span>Shipyaari ID:</span>
              {infoModalContent?.data?.orderId?.split("T")?.[1] ||
                infoModalContent?.data?.orderId ||
                ""}
              {/* {!infoModalContent?.data?.orderNumber
                ? `Shipyaari Id: (${
                    infoModalContent?.data?.orderId?.split("T")?.[1] ||
                    infoModalContent?.data?.orderId
                  })`
                : `${
                    infoModalContent?.data?.orderNumber || ""
                  } - Order Details`} */}
            </p>
          </div>
        </div>
        <CustomTableAccordian getAllSellerData={infoModalContent} />
      </CustomRightModal>

      <CustomRightModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        className="!justify-start "
      >
        <ErrorModal
          errorModalData={errorModalData}
          setIsErrorModalOpen={setIsErrorModalOpen}
        />
      </CustomRightModal>

      <CustomRightModal
        isOpen={partnerModalData.isOpen}
        onClose={() => setPartnerModalData({ isOpen: false })}
        className="!justify-start"
      >
        <PartnerJumperModal
          partnerModalData={partnerModalData}
          closeModal={() => setPartnerModalData({ isOpen: false })}
        />
      </CustomRightModal>
      {isLgScreen && (
        <RightSideModal
          isOpen={filterModal}
          onClose={() => {
            setFilterModal(false);
          }}
          className="w-[500px] !justify-between !items-stretch !hidden lg:!block"
        >
          <div>
            <div className="flex justify-between mt-5 mx-5">
              <div>
                <p className="text-2xl font-normal">Filter</p>
              </div>
              <div>
                <img
                  src={CloseIcon}
                  alt="close button"
                  onClick={() => {
                    setFilterModal(false);
                  }}
                />
              </div>
            </div>
            <div className="mx-5">
              <FilterScreen
                filterState={filterState}
                setFilterState={setFilterState}
                setFilterPayLoad={setFilterPayLoad}
                filterPayLoad={filterPayLoad}
                filterModal={filterModal}
                setPersistFilterData={setPersistFilterData}
                persistFilterData={persistFilterData}
              />
            </div>

            <div
              className="hidden lg:flex justify-end  shadow-lg border-[1px]  bg-[#FFFFFF] px-6 py-4  rounded-tr-[32px] rounded-tl-[32px]  gap-x-5  fixed bottom-0 "
              style={{ width: "-webkit-fill-available" }}
            >
              <ServiceButton
                text="RESET ALL"
                onClick={() => {
                  window.location.reload();
                  setFilterModal(false);
                }}
                className="bg-[#FFFFFF] text-[#1C1C1C] text-sm font-semibold leading-5 lg:!py-2 lg:!px-4 "
              />
              {isFilterLoading ? (
                <div className="flex justify-center items-center lg:!py-2 lg:!px-4">
                  <Spinner />
                </div>
              ) : (
                <ServiceButton
                  text="APPLY"
                  onClick={applyFilterforOrders}
                  className="bg-[#1C1C1C] text-[#FFFFFF] cursor-pointer text-sm font-semibold leading-5 lg:!py-2 lg:!px-4 "
                />
              )}
            </div>
          </div>
        </RightSideModal>
      )}

      <CustomRightModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        className="!justify-start"
      >
        <div className="mt-[2rem]">
          {isSyncModalLoading ? (
            <div className="flex justify-center h-[90vh] items-center lg:!py-2 lg:!px-4">
              <Spinner />
            </div>
          ) : (
            channelReduxData.map((elem: any) => (
              <div className="mt-[1rem] mx-[1rem] p-[1rem] items-center flex flex-col border-4 rounded-md">
                <div className="my-[2rem] text-[18px] w-full flex flex-wrap items-center ">
                  <div className="w-[85%] flex gap-x-1">
                    <div>
                      <b>{`${capitalizeFirstLetter(elem?.channel)}`} </b>
                    </div>
                    <div>-</div>
                    <div
                      className="w-[55%]"
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: "1",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {elem.storeName}
                    </div>
                  </div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <div className={`relative progress-bar mb-[1rem] `}>
                  <div
                    className={` h-full bg-[#06981d] transition-all duration-700 ease-in-out !rounded-2xl`}
                    style={{
                      width: `${
                        (elem?.syncedOrder / elem?.TotalOrderCount) * 100
                      }%`,
                    }}
                  ></div>
                  <div className="absolute left-0">
                    {elem?.syncedOrder || 0}
                  </div>
                  <div className="absolute right-0">
                    {elem?.TotalOrderCount || 0}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CustomRightModal>

      {/* new Tracking Screen with right modal  */}
      <CustomRightModal
        isOpen={openRightModalForTracking?.isOpen}
        onClose={() =>
          setOpenRightModalForTracking({
            ...openRightModalForTracking,
            isOpen: false,
          })
        }
      >
        <NewTrackingContent
          setOpenRightModalForTracking={setOpenRightModalForTracking}
          openRightModalForTracking={openRightModalForTracking}
        />
      </CustomRightModal>
    </>
  );
};

export default Index;
