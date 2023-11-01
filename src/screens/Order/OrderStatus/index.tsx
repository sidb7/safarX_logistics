import SelectIcon from "../../../assets/Order/SelectIcon.svg";
import FilterIcon from "../../../assets/Order/FilterIcon.svg";
import CloseIcon from "../../../assets/CloseIcon.svg";
import { SetStateAction, useEffect, useState } from "react";
import { SearchBox } from "../../../components/SearchBox";
import { ResponsiveState } from "../../../utils/responsiveState";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import FilterScreen from "../../../screens/NewOrder/Filter/index";
import ServiceButton from "../../../components/Button/ServiceButton";
import { useNavigate } from "react-router-dom";
import { POST } from "../../../utils/webService";
import { GET_ORDER_BY_ID, GET_SELLER_ORDER } from "../../../utils/ApiUrls";

interface IOrderstatusProps {
  filterId: any;
  setFilterId: any;
  statusData: any;
  handleTabChange: Function;
  setOrders: any;
  currentStatus: string;
  orders: any;
  allOrders: any;
}

const statusBar = (statusName: string, orderNumber: string) => {
  interface Itype {
    filterId: any;
    setFilterId: any;
    statusData: any;
  }

  return (
    <div className="flex justify-center items-center border-b-4 border-[#777777] px-4">
      <span className="text-[#777777] text-[14px]">{statusName}</span>
      <span className="flex justify-center items-center rounded-full ml-2 text-[8px] text-white bg-[#777777] h-[16px] w-[16px]">
        {orderNumber}
      </span>
    </div>
  );
};

let insertFirst = true;

export const OrderStatus: React.FunctionComponent<IOrderstatusProps> = ({
  filterId = 0,
  setFilterId,
  statusData,
  handleTabChange,
  setOrders,
  currentStatus,
  orders,
  allOrders,
}) => {
  const navigate = useNavigate();
  let debounceTimer: any;
  const { isLgScreen } = ResponsiveState();
  const [statusId, setStatusId] = useState(0);
  const [filterModal, setFilterModal] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const [filterData, setFilterData] = useState([
    { label: "All", isActive: false, value: "all" },
    { label: "Draft", isActive: false, value: "" },
    { label: "Failed", isActive: false, value: "failed" },
  ]);

  const filterComponent = (className?: string) => {
    return (
      <div
        className={`flex text-[14px] text-[#777777] font-medium mt-4 h-[44px] w-[204px] lg:hidden ${className}`}
      >
        {filterData?.map((singleData, index) => {
          return (
            <span
              key={index}
              className={`flex items-center py-[8px] px-[16px] border-[1px] cursor-pointer border-[#A4A4A4] ${
                filterId === index
                  ? "rounded-l-md bg-[#D2D2D2] font-medium text-[#1C1C1C]"
                  : ""
              }`}
              onClick={() => handleFilterOrders(index)}
            >
              {singleData.label}
            </span>
          );
        })}
      </div>
    );
  };

  const handleFilterOrders = (index: any) => {
    setFilterId(index);
    switch (index) {
      case 0: {
        setOrders(allOrders);
        break;
      }
      case 1: {
        const filteredOrder = allOrders.filter(
          (elem: any) => elem?.status?.length === 0
        );
        setOrders(filteredOrder);
        break;
      }
      case 2: {
        const filteredOrder = allOrders.filter(
          (elem: any) =>
            elem?.status?.[elem.status.length - 1]?.currentStatus ===
            filterData?.[index]?.label?.toUpperCase()
        );
        setOrders(filteredOrder);
        break;
      }
    }
  };

  const handleSearchOrder = (e: any) => {
    try {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        if (e.target.value.length > 0) {
          const { data } = await POST(GET_ORDER_BY_ID, {
            id: e.target.value,
            currentStatus,
          });
          setOrders(data.data);
        } else {
          let payload = {
            skip: 0,
            limit: 10,
            pageNo: 1,
            sort: { _id: -1 },
            currentStatus,
          };
          const { data } = await POST(GET_SELLER_ORDER, payload);

          const { OrderData } = data?.data?.[0];
          setOrders(OrderData);

          clearTimeout(debounceTimer);
        }
      }, 800);
    } catch (error: any) {
      console.warn("Error in OrderStatus Debouncing: ", error.message);
    }
  };

  const filterButton = () => {
    if (isLgScreen) {
      return (
        <div className="grid grid-cols-3 gap-x-2 lg:flex ">
          <div>
            <SearchBox
              label="Search"
              value={searchedText}
              onChange={(e: any) => {
                handleSearchOrder(e);
              }}
              getFullContent={getAllOrders}
              customPlaceholder="Search By Order Id, AWB"
            />
          </div>
          <div
            className="flex justify-between items-center p-2 gap-x-2"
            onClick={() => setFilterModal(true)}
          >
            <img src={FilterIcon} alt="" />
            <span className="text-[#004EFF] text-[14px] font-semibold">
              FILTER
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-3 gap-x-2">
          <div className="flex items-center justify-center border-[1px] rounded-md border-[#A4A4A4] col-span-2">
            <img src={SelectIcon} alt="" />
            <span className="ml-2 text-[#1C1C1C] text-[14px] font-medium">
              SELECT
            </span>
          </div>
          <div
            className="grid justify-center items-center border-[1px] rounded-md border-[#A4A4A4] "
            onClick={() => {
              navigate("/neworder/filter");
            }}
          >
            <img src={FilterIcon} alt="Filter Order" width="16px" />
          </div>
        </div>
      );
    }
  };

  const handleStatusChanges = (index: any) => {
    handleTabChange(index);
    setStatusId(index);
  };

  const getAllOrders = async () => {
    let payload = {
      skip: 0,
      limit: 10,
      pageNo: 1,
      sort: { _id: -1 },
      currentStatus,
    };
    const { data } = await POST(GET_SELLER_ORDER, payload);

    const { OrderData } = data?.data?.[0];

    setOrders(OrderData);
  };

  return (
    <div className="flex flex-col pt-7 ">
      <div className="flex font-medium overflow-x-scroll whitespace-nowrap mt-2 h-[34px] ">
        {statusData?.map(({ statusName, orderNumber }: any, index: number) => {
          return (
            <div
              key={index}
              style={{ borderBottomWidth: "3px" }}
              className={`flex justify-center items-center border-[#777777] px-6  cursor-pointer ${
                statusId === index ? "!border-[#004EFF]" : ""
              }`}
              onClick={() => handleStatusChanges(index)}
            >
              <span
                className={`text-[#777777] text-[15px] lg:text-[18px] ${
                  statusId === index ? "!text-[#004EFF] lg:text-[18px]" : ""
                }`}
              >
                {statusName}
              </span>
              <span
                className={`flex justify-center items-center ml-2 rounded-sm text-[12px]  text-white bg-[#777777] w-5 h-5 ${
                  statusId === index ? "!bg-[#004EFF]" : ""
                }`}
              >
                {orderNumber}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 items-center justify-center my-8 h-[46px] lg:flex lg:justify-between">
        <div className="lg:flex lg:gap-x-4">
          <div className="flex items-center">
            {/* <span className="text-[#494949] text-[14px] font-semibold lg:text-[22px] lg:font-semibold">
              00 Order
            </span> */}
          </div>
          {currentStatus === "DRAFT" &&
            filterComponent("!hidden lg:!flex lg:!mt-0")}
        </div>

        {filterButton()}
      </div>

      {currentStatus === "DRAFT" && filterComponent("")}

      {/* filter modal */}

      {isLgScreen && (
        <RightSideModal
          isOpen={filterModal}
          onClose={() => {
            setFilterModal(false);
          }}
          className="!justify-between !items-stretch !hidden lg:!block"
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
              <FilterScreen />
            </div>

            <div
              className="hidden lg:flex justify-end  shadow-lg border-[1px]  bg-[#FFFFFF] px-6 py-4  rounded-tr-[32px] rounded-tl-[32px]  gap-x-5  fixed bottom-0 "
              style={{ width: "-webkit-fill-available" }}
            >
              <ServiceButton
                text="RESET ALL"
                onClick={() => {}}
                className="bg-[#FFFFFF] text-[#1C1C1C] text-sm font-semibold leading-5 lg:!py-2 lg:!px-4 "
              />
              <ServiceButton
                text="APPLY"
                onClick={() => {}}
                className="bg-[#1C1C1C] text-[#FFFFFF] text-sm font-semibold leading-5 lg:!py-2 lg:!px-4 "
              />
            </div>
          </div>
        </RightSideModal>
      )}
    </div>
  );
};
