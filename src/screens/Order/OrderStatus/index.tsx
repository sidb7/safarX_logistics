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
import CrossIcon from "../../../assets/cross.svg";
import {
  FETCH_ALL_PARTNER,
  FETCH_MANIFEST_DATA,
  GET_ORDER_BY_ID,
  GET_SELLER_ORDER,
} from "../../../utils/ApiUrls";
import CustomButton from "../../../components/Button";
import { toast } from "react-toastify";
import CustomDropDown from "../../../components/DropDown";
import DatePicker from "react-datepicker";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import DeleteIconForLg from "../../../assets/DeleteIconRedColor.svg";
import editIcon from "../../../assets/serv/edit.svg";
import DownloadIcon from "../../../assets/download.svg";
import { Tooltip } from "react-tooltip";

interface IOrderstatusProps {
  filterId: any;
  setFilterId: any;
  statusData: any;
  handleTabChange: Function;
  setOrders: any;
  currentStatus: string;
  orders: any;
  allOrders: any;
  selectedRowdata?: any;
  setDeleteModalDraftOrder?: any;
  setCancellationModal?: any;
  tabStatusId?: any;
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
  selectedRowdata,
  setDeleteModalDraftOrder,
  setCancellationModal,
  tabStatusId,
}) => {
  const navigate = useNavigate();
  let debounceTimer: any;
  const { isLgScreen } = ResponsiveState();
  const [statusId, setStatusId] = useState(0);
  const [filterModal, setFilterModal] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [partnerMenu, setPartnerMenu] = useState<any>([]);
  const [partnerValue, setPartnerValue] = useState<any>();
  const [manifestModal, setManifestModal]: any = useState({
    isOpen: false,
  });

  useEffect(() => {
    setStatusId(tabStatusId || statusId);
  }, [tabStatusId]);

  const [filterData, setFilterData] = useState([
    { label: "All", isActive: false, value: "all" },
    { label: "Draft", isActive: false, value: "" },
    { label: "Failed", isActive: false, value: "failed" },
  ]);

  const actionsObject: any = {
    DRAFT: [
      {
        icon: DeleteIconForLg,
        hovertext: "Delete Orders",
        identifier: "Delete",
      },
    ],
    BOOKED: [
      { icon: CrossIcon, hovertext: "Cancel Orders", identifier: "Cancel" },
      {
        icon: DownloadIcon,
        hovertext: "Download Manifest Reports",
        identifier: "Download_menifest_report",
      },
    ],
  };

  const getActionsIcon = () => {
    return actionsObject[currentStatus];
  };

  const fetchManifest = async () => {
    let varstartDate: any = startDate;
    let varendDate: any = endDate;

    let epochStartDate: any = new Date(varstartDate);
    epochStartDate = epochStartDate.getTime() / 1000;
    let epochEndDate: any = new Date(varendDate);
    epochEndDate = epochEndDate.getTime() / 1000;

    let payload = {
      startDate: epochStartDate,
      endDate: epochEndDate,
      partnerName: partnerValue,
    };
    const data = await POST(FETCH_MANIFEST_DATA, payload, {
      responseType: "blob", // Pass option data for pdf
    });

    var blob = new Blob([data?.data], { type: "application/pdf" });
    var url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Manifest_Report.pdf`;
    a.click();
  };

  const fetchPartnerList = async () => {
    try {
      const { data } = await POST(FETCH_ALL_PARTNER, {});

      if (data?.success) {
        let temp: any = [];
        data?.data.map((partner: any, index: number) => {
          let newData = {
            label: partner.partnerName,
            value: partner.partnerName,
          };
          temp.push(newData);
        });
        setPartnerMenu(temp);
      } else {
        throw new Error(data?.meesage);
      }
    } catch (error: any) {
      toast.error(error);
      return false;
    }
  };

  const handleActions = (
    actionName: any,
    selectedRowdata: any,
    identifier?: any
  ) => {
    switch (actionName) {
      case "DRAFT": {
        const tempOrderIds = selectedRowdata.map(
          (data: any, index: any) => data.original.tempOrderId
        );

        let payload = {
          tempOrderIdArray: tempOrderIds,
        };

        setDeleteModalDraftOrder &&
          setDeleteModalDraftOrder({ isOpen: true, payload });
        break;
      }
      case "BOOKED": {
        if (identifier === "Cancel") {
          if (selectedRowdata.length > 0) {
            const awbNo = selectedRowdata.map((data: any, index: any) => {
              return data.original.awb;
            });
            setCancellationModal &&
              setCancellationModal({ isOpen: true, payload: awbNo });
          } else {
            toast.error(
              "Please select atleast one for cancel your booked order"
            );
          }
        } else if (identifier === "Download_menifest_report") {
          setManifestModal({ ...manifestModal, isOpen: true });
        }

        break;
      }
    }
  };

  useEffect(() => {
    fetchPartnerList();
  }, []);

  const filterComponent = (className?: string) => {
    return (
      <div
        className={`w-[100%] flex text-[14px] text-[#777777] font-medium mt-1 md:mt-4 h-[44px] sm:w-[204px] lg:hidden ${className}`}
      >
        {filterData?.map((singleData, index) => {
          return (
            <span
              key={index}
              className={`flex flex-1 items-center py-[8px] px-[16px] border-[1px] ${
                index === 0 && "rounded-l-md"
              } ${
                index === filterData.length - 1 && "rounded-r-md"
              } cursor-pointer border-[#A4A4A4] ${
                filterId === index
                  ? ` bg-[#D2D2D2] font-medium text-[#1C1C1C]`
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
      if (currentStatus === "BOOKED") {
        return (
          <div className="grid grid-cols-3 gap-x-2 lg:flex ">
            {getActionsIcon()?.length > 0 && (
              <div className="rounded-md p-1 flex border border-[#A4A4A4] ">
                {getActionsIcon()?.map((data: any, index: any) => {
                  return (
                    <>
                      <div
                        key={index}
                        className={`${
                          index < getActionsIcon().length - 1 &&
                          "border-r border-[#A4A4A4]"
                        } px-3 py-1 w-[40px] flex items-center justify-center rounded-l-md cursor-pointer`}
                        onClick={() =>
                          handleActions(
                            currentStatus,
                            selectedRowdata,
                            data.identifier
                          )
                        }
                        data-tooltip-id="my-tooltip-inline"
                        data-tooltip-content={data.hovertext}
                      >
                        <img src={data.icon} alt="" className="w-[17px]" />
                      </div>
                      <Tooltip
                        id="my-tooltip-inline"
                        style={{
                          backgroundColor: "bg-neutral-900",
                          color: "#FFFFFF",
                          width: "fit-content",
                          fontSize: "14px",
                          lineHeight: "16px",
                        }}
                      />
                    </>
                  );
                })}
              </div>
            )}

            {/* {currentStatus === "BOOKED" && (
            <>
              <CustomButton
                className="px-1 py-1 font-semibold text-[14px]"
                text="Manifest Report"
                onClick={() =>
                  setManifestModal({ ...manifestModal, isOpen: true })
                }
                showIcon={true}
                icon={""}
              />
            </>
          )} */}
            <div>
              <SearchBox
                className="removePaddingPlaceHolder"
                label="Search"
                value={searchedText}
                onChange={(e: any) => {
                  handleSearchOrder(e);
                }}
                getFullContent={getAllOrders}
                customPlaceholder="Search By Order Id, AWB"
              />
            </div>
            {/* <div
              className="flex justify-between items-center p-2 gap-x-2"
              onClick={() => setFilterModal(true)}
            >
              <img src={FilterIcon} alt="" />
              <span className="text-[#004EFF] text-[14px] font-semibold">
                FILTER
              </span>
            </div> */}
          </div>
        );
      } else {
        return (
          <div className="grid grid-cols-3 gap-x-2 lg:flex ">
            {selectedRowdata?.length > 0 && getActionsIcon()?.length > 0 && (
              <div className="rounded-md p-1 flex border border-[#A4A4A4] ">
                {getActionsIcon()?.map((data: any, index: any) => {
                  return (
                    <>
                      <div
                        key={index}
                        className={`${
                          index < getActionsIcon().length - 1 &&
                          "border-r border-[#A4A4A4]"
                        } px-3 py-1 w-[40px] flex items-center justify-center rounded-l-md cursor-pointer`}
                        onClick={() =>
                          handleActions(currentStatus, selectedRowdata)
                        }
                        data-tooltip-id="my-tooltip-inline"
                        data-tooltip-content={data.hovertext}
                      >
                        <img src={data.icon} alt="" className="w-[17px]" />
                      </div>
                      <Tooltip
                        id="my-tooltip-inline"
                        style={{
                          backgroundColor: "bg-neutral-900",
                          color: "#FFFFFF",
                          width: "fit-content",
                          fontSize: "14px",
                          lineHeight: "16px",
                        }}
                      />
                    </>
                  );
                })}
              </div>
            )}

            {/* {currentStatus === "BOOKED" && (
            <>
              <CustomButton
                className="px-1 py-1 font-semibold text-[14px]"
                text="Manifest Report"
                onClick={() =>
                  setManifestModal({ ...manifestModal, isOpen: true })
                }
                showIcon={true}
                icon={""}
              />
            </>
          )} */}
            <div>
              <SearchBox
                className="removePaddingPlaceHolder"
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
      }
    } else {
      return (
        <div className="flex items-center justify-between w-[100%]">
          <div className="text-[14px] text-[#272727]">34 Orders</div>
          <div className="flex gap-4">
            <div className="flex items-center justify-center py-2 w-[110px] border-[1px] rounded-md border-[#A4A4A4] col-span-2">
              <img src={SelectIcon} alt="" />
              <span className="ml-2 text-[#1C1C1C] text-[12px] font-medium">
                SELECT
              </span>
            </div>
            <div
              className="flex justify-center items-center w-[40px] border-[1px] rounded-md border-[#A4A4A4]"
              onClick={() => {
                navigate("/neworder/filter");
              }}
            >
              <img src={FilterIcon} alt="Filter Order" width="16px" />
            </div>
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

      <div className="grid my-6 h-[46px] lg:flex lg:justify-between">
        <div className="lg:flex lg:gap-x-4">
          <div className="flex items-center">
            {/* <span className="text-[#494949] text-[14px] font-semibold lg:text-[22px] lg:font-semibold">
              00 Order
            </span> */}
          </div>
          {currentStatus === "DRAFT" &&
            filterComponent("!hidden lg:!flex lg:!mt-0")}
        </div>
        <div className="">{filterButton()}</div>
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

      <CenterModal
        isOpen={manifestModal.isOpen}
        onRequestClose={() =>
          setManifestModal({ ...manifestModal, isOpen: false })
        }
        className="w-[50%] lg:w-[30%] h-[40%]"
      >
        <div className="h-full w-full">
          <div
            onClick={() =>
              setManifestModal({ ...manifestModal, isOpen: false })
            }
            className="flex justify-end p-5 cursor-pointer"
          >
            <img
              src="/static/media/CloseIcon.9de23f841ff625663fc738c4125c4fda.svg"
              alt=""
            />
          </div>

          <div className="px-4">
            <div className="flex gap-4">
              <div className="w-[250px] md:w-[250px]">
                <CustomDropDown
                  heading="Select Courier Partner"
                  value={partnerValue}
                  options={partnerMenu}
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    setPartnerValue(event.target.value);
                  }}
                />
              </div>
              <div className="w-[350px] md:w-[250px]">
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update: any) => {
                    setDateRange(update);
                  }}
                  isClearable={true}
                  placeholderText="Select From & To Date"
                  className="cursor-pointer border-solid border-2 datepickerCss border-sky-500"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="mt-10">
              <ServiceButton
                text={"MANIFEST REPORT"}
                className={`bg-[#1C1C1C] text-[#FFFFFF] py-3 w-[200px]`}
                onClick={() => fetchManifest()}
              />
            </div>
          </div>
        </div>
      </CenterModal>
    </div>
  );
};
