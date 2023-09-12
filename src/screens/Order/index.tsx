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
  columnHelperForNewOrder,
  columnHelperForBookedAndReadyToPicked,
  columnHelpersForRest,
} from "./columnHelpers";
import { insufficientBalance } from "../../utils/dummyData";
import { useMediaQuery } from "react-responsive";
import { ResponsiveState } from "../../utils/responsiveState";
import { POST } from "../../utils/webService";
import { GET_SELLER_ORDER } from "../../utils/ApiUrls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Breadcum } from "../../components/Layout/breadcrum";
import CenterModal from "../../components/CustomModal/customCenterModal";
import BulkUpload from "./BulkUpload";

const ArrowNavigator = () => {
  return (
    <div className="flex items-center mb-4 lg:mb-0 lg:text-[28px] lg:font-semibold">
      <div className="inline-flex space-x-2 items-center justify-start ">
        <img src={BackArrowIcon} alt="" />
        <p className="text-lg font-semibold text-center text-gray-900 ">
          Orders
        </p>
      </div>
    </div>
  );
};

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
        onClick={() => setIsModalOpen(true)}
      >
        <img src={BlukOrderIcon} alt="" width="16px" />
        <span className="text-[#004EFF] text-[10px] whitespace-nowrap lg:font-semibold lg:text-[14px] lg:text-[#1C1C1C]">
          BULK UPLOAD
        </span>
      </div>
      {isModalOpen && (
        <CenterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
    statusName: "New",
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
    statusName: "In transit",
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
  const [statusData, setStatusData]: any = useState(tabs);
  const isMobileView = useMediaQuery({ maxWidth: 768 }); // Adjust the breakpoint as per your requirement
  const { isLgScreen } = ResponsiveState();
  const [orders, setOrders]: any = useState([]);

  const [tempOrders, setTempOrders]: any = useState([]);
  const [columnHelper, setColumnhelper]: any = useState(columnHelpersForRest);
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

  // const mobileSettings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   centerMode: true,
  // };

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
      const { data } = await POST(GET_SELLER_ORDER, {
        pageNo,
        select,
        sort,
        skip,
        limit,
        orderStatus,
      });

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

  const handleFilter = (index: any) => {
    // setTempOrders(JSON.parse(JSON.stringify(orders)));
    //
    // switch (+index) {
    //   case 1:
    //
    //     setOrders(
    //       tempOrders.filter((e: any) => e.orderStatus?.isOrderPlaced) || []
    //     );
    //     break;
    //   case 2:
    //     setOrders(
    //       tempOrders.filter((e: any) => !e.orderStatus?.isOrderPlaced) || []
    //     );
    //     break;

    //   default:
    //     setOrders(tempOrders);
    //     break;
    // }
    setFilterId(index);
  };

  useEffect(() => {
    handleTabChanges();
  }, []);

  const handleTabChanges = async (index: any = 0) => {
    const { orderList, statusList } = await getSellerOrderByStatus(
      statusData[index].value
    );

    if (!orderList) return;
    if (statusList && !statusList.length) return;

    statusData?.forEach((e: any) => {
      statusList?.forEach((e1: any) => {
        if (e.orderNumber === e1.count) return;
        if (e.value === e1._id) {
          e.orderNumber = e1.count.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          });
        }
      });
    });

    switch (tabs[index].value) {
      case "newOrder":
        setColumnhelper(columnHelperForNewOrder);
        break;
      case "booked":
        setColumnhelper(columnHelperForBookedAndReadyToPicked);
        break;
      case "readyToPick":
        setColumnhelper(columnHelperForBookedAndReadyToPicked);
        break;
      default:
        setColumnhelper(columnHelpersForRest);
        break;
    }

    setOrders(orderList ?? []);
  };

  return (
    <div>
      <Breadcum label="Orders" component={Buttons()} />
      {isLgScreen && (
        <div className="overflow-x-auto pl-5">
          <OrderStatus
            filterId={filterId}
            setFilterId={handleFilter}
            handleTabChange={handleTabChanges}
            statusData={statusData}
          />
          <CustomTable data={orders} columns={columnHelper || []} />
        </div>
      )}
    </div>
  );
};

export default Index;
