import { OrderCard } from "./OrderCard";
import CustomButton from "../../components/Button";
import AddOrderIcon from "../../assets/Order/AddOrder.svg";
import BlukOrderIcon from "../../assets/Order/BlukOrderIcon.svg";
import SyncIcon from "../../assets/Order/SyncIcon.svg";
import BlackShipIcon from "../../assets/OrderDetails/BlackShipIcon.svg";
import Delivery from "../../assets/OrderDetails/Delivery.svg";
import CopyIcon from "../../assets/OrderDetails/CopyIcon.svg";
import BackArrowIcon from "../../assets/backArrow.svg";
import { OrderStatus } from "./OrderStatus";
import { OrderDetails } from "./OrderDetails";
import DeliveryGIF from "../../assets/OrderCard/Gif.gif";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import ErrorFile from "./OrderStatus/errorFile";
import Slider from "react-slick";
import "../../styles/silkStyle.css";
import {
  columnHelperForPendingOrder,
  columnHelperForNewOrder,
  ColumnHelperForBookedAndReadyToPicked,
  columnHelpersForRest,
} from "./ColumnHelpers";
import { insufficientBalance } from "../../utils/dummyData";
import { useMediaQuery } from "react-responsive";
import { ResponsiveState } from "../../utils/responsiveState";
import { POST } from "../../utils/webService";
import { GET_SELLER_ORDER } from "../../utils/ApiUrls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Breadcrum } from "../../components/Layout/breadcrum";
import CenterModal from "../../components/CustomModal/customCenterModal";
import BulkUpload from "./BulkUpload/BulkUpload";

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

      <div className="flex flex-col items-center justify-center lg:px-2 lg:py-4 lg:border-[1px] lg:rounded-md lg:border-[#A4A4A4] lg:flex-row lg:space-x-2 lg:h-[36px]">
        <img src={SyncIcon} alt="" width="16px" />
        <span className="text-[#004EFF] text-[10px] whitespace-nowrap lg:font-semibold lg:text-[14px] lg:text-[#1C1C1C]">
          SYNC CHANNEL
        </span>
      </div>

      <div
        className="flex flex-col items-center justify-center lg:px-2 lg:py-4 lg:border-[1px] lg:rounded-md lg:border-[#A4A4A4] lg:flex-row lg:space-x-2 lg:h-[36px] cursor-pointer"
        // onClick={() => setIsModalOpen(true)}
        onClick={() => navigate("/orders/bulk-upload")}
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

const tabs = [
  {
    statusName: "Draft",
    value: "newOrder",
    orderNumber: 0,
  },
  {
    statusName: "Booked",
    value: "booked",
    orderNumber: 0,
  },
  {
    statusName: "Ready to Pick",
    value: "readyToPick",
    orderNumber: 0,
  },
  {
    statusName: "Picked Up",
    value: "pickedUp",
    orderNumber: 0,
  },
  {
    statusName: "In Transit",
    value: "inTransit",
    orderNumber: 0,
  },
  {
    statusName: "Destination City",
    value: "destinationCity",
    orderNumber: 0,
  },
  {
    statusName: "Out of Delivery",
    value: "outOfDelivery",
    orderNumber: 0,
  },
  {
    statusName: "Delivered",
    value: "delivered",
    orderNumber: 0,
  },
  {
    statusName: "Return",
    value: "return",
    orderNumber: 0,
  },
];

const Index = () => {
  const [filterId, setFilterId] = useState(0);
  const navigate = useNavigate();
  const [statusData, setStatusData]: any = useState(tabs);
  const isMobileView = useMediaQuery({ maxWidth: 768 }); // Adjust the breakpoint as per your requirement
  const { isLgScreen } = ResponsiveState();
  const [orders, setOrders]: any = useState([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [columnHelper, setColumnhelper]: any = useState([]);
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
    orderStatus = "newOrder",
    pageNo?: 1,
    select?: {},
    sort?: { _id: -1 },
    skip?: 0,
    limit?: 100
  ) => {
    try {
      setIsLoading(true);
      const { data } = await POST(GET_SELLER_ORDER, {
        pageNo,
        select,
        sort,
        skip,
        limit,
        orderStatus,
      });

      if (data?.status) {
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

  useEffect(() => {
    handleTabChanges();
  }, []);

  const handleTabChanges = async (index: any = 0) => {
    try {
      const { pendingOrder, successFullOrder, statusList } =
        await getSellerOrderByStatus(statusData[index].value);

      const { data = [] } = successFullOrder;
      let orderListTobeSet: any = [];
      orderListTobeSet = data;

      statusList.forEach((e1: any) => {
        const matchingStatus = statusData.find((e: any) => e.value === e1._id);
        if (matchingStatus) {
          matchingStatus.orderNumber = e1.count.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          });
        }
      });

      switch (tabs[index].value) {
        case "newOrder":
          setColumnhelper(columnHelperForNewOrder(navigate));
          orderListTobeSet = pendingOrder;
          break;
        case "booked":
          setColumnhelper(ColumnHelperForBookedAndReadyToPicked());
          break;
        case "readyToPick":
          setColumnhelper(ColumnHelperForBookedAndReadyToPicked());
          orderListTobeSet = [];
          break;
        default:
          setColumnhelper(columnHelpersForRest);
          orderListTobeSet = [];
          break;
      }

      setOrders(orderListTobeSet);
    } catch (error) {
      console.error("An error occurred in handleTabChanges function:", error);
    }
  };

  return (
    <div>
      <Breadcrum label="Orders" component={Buttons()} />
      {isLgScreen && (
        <div className="pl-5 pr-6">
          <OrderStatus
            filterId={filterId}
            setFilterId={setFilterId}
            handleTabChange={handleTabChanges}
            statusData={statusData}
          />
          {isLoading ? (
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
            <CustomTable data={orders} columns={columnHelper || []} />
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
