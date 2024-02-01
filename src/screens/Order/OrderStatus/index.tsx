import SelectIcon from "../../../assets/Order/SelectIcon.svg";
import FilterIcon from "../../../assets/Order/FilterIcon.svg";
import PlaceChannelOrder from "../../../assets/placeChannelOrder.svg";
import CloseIcon from "../../../assets/CloseIcon.svg";
import { SetStateAction, useEffect, useState } from "react";
import { SearchBox } from "../../../components/SearchBox";
import { ResponsiveState } from "../../../utils/responsiveState";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import ServiceButton from "../../../components/Button/ServiceButton";
import { useNavigate } from "react-router-dom";
import { POST } from "../../../utils/webService";
import CrossIcon from "../../../assets/cross.svg";
import {
  FETCH_ALL_PARTNER,
  FETCH_MANIFEST_DATA,
  GET_ORDER_BY_ID,
  GET_ORDER_ERRORS,
  GET_SELLER_ORDER,
  POST_PLACE_ALL_ORDERS,
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
import { capitalizeFirstLetter } from "../../../utils/utility";
//import * as FileSaver from "file-saver";
import { tokenKey } from "../../../utils/utility";
import FilterScreen from "../common/FilterScreen/filterScreen";
import { Spinner } from "../../../components/Spinner";

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
  setSelectedRowData?: any;
  fetchLabels?: any;
  setDeleteModalDraftOrder?: any;
  setCancellationModal?: any;
  tabStatusId?: any;
  setTotalcount?: any;
  setStatusCount?: any;
  isOrderTableLoader: any;
  fetchMultiTax?: any;
  totalOrders?: any;
  draftOrderCount?: any;
  setDraftOrderCount?: any;
  setIsErrorPage?: any;
  setErrorData?: any;
  setIsErrorListLoading: any;
  getErrors: any;
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
  totalOrders,
  currentStatus,
  orders,
  allOrders,
  selectedRowdata,
  setSelectedRowData,
  fetchLabels,
  setDeleteModalDraftOrder,
  setCancellationModal,
  tabStatusId,
  setTotalcount,
  setStatusCount,
  isOrderTableLoader,
  fetchMultiTax,
  draftOrderCount,
  setDraftOrderCount,
  setIsErrorPage,
  setErrorData,
  setIsErrorListLoading,
  getErrors,
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
  const [isLoadingManifest, setIsLoadingManifest] = useState({
    isLoading: false,
    identifier: "",
  });

  const [isFilterLoading, setIsFilterLoading] = useState<any>(false);
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
  const [manifestButton, setManifestButton] = useState<any>(true);

  useEffect(() => {
    setStatusId(tabStatusId || statusId);
  }, [tabStatusId]);

  const [filterData, setFilterData] = useState([
    {
      label: `All`,
      isActive: false,
      value: "all",
    },
    {
      label: `Draft`,
      isActive: false,
      value: "draft",
    },
    {
      label: `Failed`,
      isActive: false,
      value: "failed",
    },
    {
      label: `Error`,
      isActive: false,
      value: "error",
    },
  ]);

  const actionsObject: any = {
    DRAFT: [
      {
        icon: DeleteIconForLg,
        hovertext: "Delete Orders",
        identifier: "Delete",
        buttonName: "Delete Orders",
      },
      {
        icon: PlaceChannelOrder,
        hovertext: "Place Orders",
        identifier: "PlaceOrder",
        buttonName: "Place Orders",
      },
    ],
    BOOKED: [
      {
        icon: CrossIcon,
        hovertext: "Cancel Orders",
        identifier: "Cancel",
        buttonName: "CANCEL ORDERS",
      },
      {
        icon: DownloadIcon,
        hovertext: "Download Manifest Reports",
        identifier: "Download_menifest_report",
        buttonName: "Download MANIFEST",
      },
      {
        icon: DownloadIcon,
        hovertext: "Download Lebels",
        identifier: "Download_Labels",
        buttonName: "Download LABEL",
      },
      {
        icon: DownloadIcon,
        hovertext: "Download Invoice",
        identifier: "Download_Multi_Tax",
        buttonName: "Download Invoice",
      },
    ],
    "IN TRANSIT": [
      {
        icon: CrossIcon,
        hovertext: "Cancel Orders",
        identifier: "Cancel",
        buttonName: "CANCEL ORDERS",
      },
    ],
    "OUT OF DELIVERY": [
      {
        icon: CrossIcon,
        hovertext: "Cancel Orders",
        identifier: "Cancel",
        buttonName: "CANCEL ORDERS",
      },
    ],
    DELIVERED: [
      {
        icon: CrossIcon,
        hovertext: "Cancel Orders",
        identifier: "Cancel",
        buttonName: "CANCEL ORDERS",
      },
    ],
    RETURN: [
      {
        icon: CrossIcon,
        hovertext: "Cancel Orders",
        identifier: "Cancel",
        buttonName: "CANCEL ORDERS",
      },
    ],
    EXCEPTION: [
      {
        icon: CrossIcon,
        hovertext: "Cancel Orders",
        identifier: "Cancel",
        buttonName: "CANCEL ORDERS",
      },
    ],
    "READY TO PICK": [
      {
        icon: CrossIcon,
        hovertext: "Cancel Orders",
        identifier: "Cancel",
        buttonName: "CANCEL ORDERS",
      },
      {
        icon: DownloadIcon,
        hovertext: "Download Manifest Reports",
        identifier: "Download_menifest_report",
        buttonName: "Download MANIFEST",
      },
      {
        icon: DownloadIcon,
        hovertext: "Download Lebels",
        identifier: "Download_Labels",
        buttonName: "Download LABEL",
      },
      {
        icon: DownloadIcon,
        hovertext: "Download Invoice",
        identifier: "Download_Multi_Tax",
        buttonName: "Download Invoice",
      },
    ],
  };

  const getActionsIcon = () => {
    return actionsObject[currentStatus];
  };

  const fetchManifest = async (awbArray?: any) => {
    let payload = {
      awbs: awbArray,
    };
    setIsLoadingManifest({
      isLoading: true,
      identifier: "Download_menifest_report",
    });
    let header = {
      Accept: "/",
      Authorization: `Bearer ${localStorage.getItem(
        `${sessionStorage.getItem("sellerId")}_${tokenKey}`
      )}`,
      "Content-Type": "application/json",
    };
    const response = await fetch(FETCH_MANIFEST_DATA, {
      method: "POST",
      headers: header,
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message);
      setIsLoadingManifest({
        isLoading: false,
        identifier: "",
      });
      // setManifestButton(true);
      return;
    }
    const data = await response.blob();

    const blob = new Blob([data], { type: "application/pdf" });

    var url = URL.createObjectURL(blob);
    setIsLoadingManifest({
      isLoading: false,
      identifier: "",
    });

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
            label: capitalizeFirstLetter(partner.partnerName),
            value: partner.partnerName,
          };
          temp.push(newData);
        });
        temp.sort((elem: any, i: any) => elem.label.localeCompare(i.label));
        setPartnerMenu(temp);
      } else {
        throw new Error(data?.meesage);
      }
    } catch (error: any) {
      toast.error(error);
      return false;
    }
  };

  const handleActions = async (
    actionName: any,
    selectedRowdata: any,
    identifier?: any
  ) => {
    switch (actionName) {
      case "DRAFT": {
        if (identifier === "Delete") {
          const tempOrderIds = selectedRowdata.map(
            (data: any, index: any) => data.original.tempOrderId
          );

          let payload = {
            tempOrderIdArray: tempOrderIds,
          };
          if (payload?.tempOrderIdArray.length === 0) {
            toast.error("Please Select Atleast One Order To Delete.");
            return;
          }
          setDeleteModalDraftOrder &&
            setDeleteModalDraftOrder({ isOpen: true, payload });
        } else {
          if (selectedRowdata.length === 0) {
            toast.error("Please Select Atleast One Order To Place.");
            return;
          }
          const orderDetails = selectedRowdata?.map((order: any) => {
            return {
              tempOrderId: order?.original?.tempOrderId,
              source: order?.original?.source,
              orderId: order?.original?.orderId,
            };
          });
          const placeOrderPayload = {
            orders: orderDetails,
          };

          try {
            setIsLoadingManifest({
              isLoading: true,
              identifier: "PlaceOrder",
            });

            const { data } = await POST(POST_PLACE_ALL_ORDERS, {
              orders: orderDetails,
            });
            if (data?.success) {
              setIsLoadingManifest({
                isLoading: false,
                identifier: "",
              });
              toast.success(
                data?.message || "Successfully Placed Channel Orders"
              );
            } else {
              setIsLoadingManifest({
                isLoading: false,
                identifier: "",
              });
            }
          } catch (error: any) {
            toast.error(error?.message || "Failed to Place Channel Orders");

            setIsLoadingManifest({
              isLoading: false,
              identifier: "",
            });
          }
        }
        // handleTabChange(1);
        break;
      }
      case "BOOKED":
      case "READY TO PICK": {
        // if (selectedRowdata.length > 0) {
        if (identifier === "Cancel") {
          if (selectedRowdata.length > 0) {
            const awbNo = selectedRowdata.map((data: any, index: any) => {
              return data.original.awb;
            });
            setCancellationModal &&
              setCancellationModal({ isOpen: true, payload: awbNo });
          } else {
            toast.error("Please select atleast one order for Cancellation");
            return;
          }
        } else if (identifier === "Download_menifest_report") {
          if (selectedRowdata.length > 0) {
            const awbsNo = selectedRowdata.map((data: any, index: any) => {
              return data.original.awb;
            });

            fetchManifest(awbsNo);
          } else {
            toast.error(
              "Please select atleast one order for Download Manifest"
            );
            return;
          }
        } else if (identifier === "Download_Labels") {
          if (selectedRowdata.length > 0) {
            let awbs: any = [];
            const lebelsArr: string[] = selectedRowdata.map(
              (data: any, index: any) => {
                if (data?.original?.awb) {
                  awbs.push(data?.original?.awb);
                } else {
                  return "";
                }
              }
            );
            const data = await fetchLabels(awbs, setIsLoadingManifest);
          } else {
            toast.error("Please select atleast one order for Download Labels");
            return;
          }
        } else if (identifier === "Download_Multi_Tax") {
          if (selectedRowdata.length > 0) {
            let awbs: any = [];
            const lebelsArr: string[] = selectedRowdata.map(
              (data: any, index: any) => {
                if (data?.original?.awb) {
                  awbs.push(data?.original?.awb);
                } else {
                  return "";
                }
              }
            );
            const data = await fetchMultiTax(awbs, setIsLoadingManifest);
          } else {
            toast.error("Please select atleast one order for Download Invoice");
            return;
          }
        }
        // } else {
        //   toast.error("Please select atleast one order for tax Invoice");
        // }
        break;
      }
      case "IN TRANSIT":
      case "OUT OF DELIVERY":
      case "DELIVERED":
      case "RETURN":
      case "EXCEPTION": {
        if (selectedRowdata.length > 0) {
          if (identifier === "Cancel") {
            const awbNo = selectedRowdata.map((data: any, index: any) => {
              return data.original.awb;
            });
            setCancellationModal &&
              setCancellationModal({ isOpen: true, payload: awbNo });
          }
        } else {
          toast.error("Please select atleast one order");
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
          let data = singleData?.label;
          data =
            data +
            " (" +
            draftOrderCount?.[singleData?.value]?.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            }) +
            ")";
          return (
            <span
              key={index}
              className={`flex flex-1 min-w-fit items-center py-[8px] px-[16px] border-[1px] ${
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
              {data}
            </span>
          );
        })}
      </div>
    );
  };

  const handleFilterOrders = (index: any) => {
    setFilterId(index);
    setIsErrorPage(index === 3 ? true : false);
    switch (index) {
      case 0: {
        getAllOrders();
        break;
      }
      case 1: {
        const subStatus = "DRAFT";
        getAllOrders(subStatus);
        break;
      }
      case 2: {
        const subStatus = "FAILED";
        getAllOrders(subStatus);

        break;
      }
      case 3: {
        getErrors();
      }
    }
  };

  const handleSearchOrder = async (e: any) => {
    try {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        if (e.target.value.length > 0) {
          isOrderTableLoader(true);
          const { data } = await POST(GET_SELLER_ORDER, {
            id: e.target.value,
            currentStatus,
            filterArrOne: filterPayLoad?.filterArrOne || [],
            filterArrTwo: filterPayLoad?.filterArrTwo || [],
          });
          const { OrderData, orderCount } = data?.data?.[0];
          setStatusCount("", currentStatus, orderCount);
          setTotalcount(orderCount ? orderCount : 0);

          if (data?.status) {
            isOrderTableLoader(false);
            setOrders(OrderData);
            setFilterModal(false);
          } else {
            isOrderTableLoader(false);
            setFilterModal(false);
            throw new Error(data?.meesage);
          }
        }
      }, 800);
    } catch (error: any) {
      console.warn("Error in OrderStatus Debouncing: ", error.message);
    }
  };

  const filterButton = () => {
    if (isLgScreen) {
      if (currentStatus === "BOOKED" || "READY TO PICK") {
        return (
          <div className="grid grid-cols-4 lg:flex ">
            {getActionsIcon()?.length > 0 && manifestButton && (
              <div className="rounded-md flex mx-3 gap-x-3">
                {getActionsIcon()?.map((data: any, index: any) => {
                  return (
                    <>
                      <div
                        key={index}
                        className={`${
                          index < getActionsIcon().length - 1 &&
                          "border-r border-[#A4A4A4]"
                        }
                          px-3 py-1  h-[100%] border border-[#A4A4A4] gap-x-2 flex items-center justify-between rounded-l-md rounded-r-md cursor-pointer`}
                        onClick={() =>
                          handleActions(
                            currentStatus,
                            selectedRowdata,
                            data?.identifier
                          )
                        }
                      >
                        {isLoadingManifest.isLoading &&
                        isLoadingManifest.identifier === data.identifier ? (
                          <div className="flex justify-center items-center">
                            <Spinner
                              className={"!w-[15px] !h-[15px] !border-2"}
                            />
                          </div>
                        ) : (
                          <img src={data.icon} alt="" className="w-[16px]" />
                        )}

                        <span className="font-open-sans text-[14px] leading-20 whitespace-no-wrap">
                          {capitalizeFirstLetter(data?.buttonName)}
                        </span>
                      </div>
                    </>
                  );
                })}
              </div>
            )}
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
              className="flex justify-between cursor-pointer items-center p-2 gap-x-2"
              onClick={() => setFilterModal(true)}
            >
              <img src={FilterIcon} alt="" />
              <span className="text-[#004EFF] text-[14px] font-semibold">
                Filter
              </span>
            </div>
          </div>
        );
      } else {
        return (
          <div className="grid grid-cols-3 gap-x-3 lg:flex ">
            {selectedRowdata?.length > 0 && (
              <div className="rounded-md gap-x-3 flex border-[#A4A4A4] ">
                {getActionsIcon()?.map((data: any, index: any) => {
                  return (
                    <>
                      <div
                        key={index}
                        className={`${
                          index < getActionsIcon().length - 1 &&
                          "border-r border-[#A4A4A4]"
                        }
                          px-3 py-1  h-[100%] border border-[#A4A4A4] gap-x-2 flex items-center justify-between rounded-l-md rounded-r-md cursor-pointer`}
                        onClick={() =>
                          handleActions(
                            currentStatus,
                            selectedRowdata,
                            data?.identifier
                          )
                        }
                      >
                        {isLoadingManifest.isLoading &&
                        isLoadingManifest.identifier === data.identifier ? (
                          <div className="flex justify-center items-center">
                            <Spinner
                              className={"!w-[15px] !h-[15px] !border-2"}
                            />
                          </div>
                        ) : (
                          <img src={data.icon} alt="" className="w-[16px]" />
                        )}

                        <span className="font-open-sans text-[14px] leading-20 whitespace-no-wrap">
                          {capitalizeFirstLetter(data?.buttonName)}
                        </span>
                      </div>
                    </>
                  );
                })}
              </div>
            )}

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
              className="flex justify-between items-center p-2 gap-x-2 cursor-pointer"
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
    }
  };

  const handleStatusChanges = (index: any) => {
    handleTabChange(index);
    setStatusId(index);
  };

  const getAllOrders = async (subStatus?: any) => {
    let payload = {
      skip: 0,
      limit: 10,
      pageNo: 1,
      sort: { _id: -1 },
      currentStatus,
      subStatus,
    };
    const { data } = await POST(GET_SELLER_ORDER, payload);

    const { OrderData, orderCount } = data?.data?.[0];

    setOrders(OrderData);
    setTotalcount(orderCount || 0);
  };

  // const getErrors = async () => {
  //   setIsErrorListLoading(true);
  //   const { data } = await POST(GET_ORDER_ERRORS);
  //   if (data?.status) {
  //     const result = [];

  //     for (const [key, value] of Object.entries(data?.data?.[0])) {
  //       const currentObject = {
  //         errorName: key,
  //         value: value,
  //       };
  //       result.push(currentObject);
  //     }
  //     setErrorData(result);
  //     setIsErrorListLoading(false);
  //   } else {
  //     setIsErrorListLoading(false);
  //   }
  // };

  function getObjectWithIsActiveTrue(data: any, name: any) {
    const tempArrTwo = filterPayLoad?.filterArrTwo;
    const tempArrOne = filterPayLoad?.filterArrOne;

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
        break;
      case "Pickup Pincode":
        updateFilterArr(tempArrTwo, "pickupAddress.pincode", "$in", data);
        break;
      case "PaymentType":
        updateFilterArr(tempArrTwo, "codInfo.isCod", "$in", data);
        break;
      case "Partners":
        updateFilterArr(tempArrTwo, "service.partnerName", "$in", data);
        break;
      case "Order Type":
        updateFilterArr(tempArrOne, "orderType", "$in", data);
        break;
      case "Sources":
        updateFilterArr(tempArrOne, "source", "$in", data);
        break;
      case "Seller Id":
        updateFilterArr(tempArrOne, "sellerId", "$in", data);
        break;
      default:
        break;
    }

    setFilterPayLoad({
      ...filterPayLoad,
      filterArrTwo: [...tempArrTwo],
      filterArrOne: [...tempArrOne],
    });
  }

  const applyFilterforOrders = async () => {
    try {
      setIsFilterLoading(true);
      let payload = {
        skip: 0,
        limit: 10,
        pageNo: 1,
        sort: { _id: -1 },
        currentStatus,
        filterArrOne: filterPayLoad?.filterArrOne || [],
        filterArrTwo: filterPayLoad?.filterArrTwo || [],
      };
      const { data } = await POST(GET_SELLER_ORDER, payload);
      const { OrderData, orderCount } = data?.data?.[0];
      setStatusCount("", currentStatus, orderCount);
      setTotalcount(orderCount ? orderCount : 0);

      if (data?.status) {
        setIsFilterLoading(false);
        setOrders(OrderData);
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
    if (filterState?.menu?.length > 0) {
      getObjectWithIsActiveTrue(filterState?.menu, filterState?.name);
    }
  }, [filterState]);

  return (
    <div className="flex flex-col pt-7">
      <div className="flex font-medium customScroll whitespace-nowrap mt-2 ">
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
                className={`flex justify-center items-center ml-2 rounded-sm text-[12px]  text-white bg-[#777777] px-1 h-5 ${
                  statusId === index ? "!bg-[#004EFF]" : ""
                }`}
              >
                {orderNumber}
              </span>
            </div>
          );
        })}
      </div>

      {isLgScreen && (
        <>
          <div
            className={`grid lg:flex lg:justify-between mt-6 static h-[46px] `}
          >
            <div className="lg:flex lg:gap-x-4">
              <div className="flex items-center text-[22px] ">
                {currentStatus === "DRAFT" && `${draftOrderCount.all} Orders`}
                {/* <span className="text-[#494949] text-[14px] font-semibold lg:text-[22px] lg:font-semibold">
              00 Order
              </span> */}
              </div>
              {currentStatus === "DRAFT" &&
                filterComponent("!hidden lg:!flex lg:!mt-0")}
            </div>

            <div>{filterButton()}</div>
          </div>

          {currentStatus === "DRAFT" && filterComponent("")}
        </>
      )}

      {/* filter modal */}

      {isLgScreen && (
        <RightSideModal
          isOpen={filterModal}
          onClose={() => {
            setFilterModal(false);
          }}
          className="w-[30%] !justify-between !items-stretch !hidden lg:!block"
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
            <div className="mx-5 ">
              <FilterScreen
                filterState={filterState}
                setFilterState={setFilterState}
                setFilterPayLoad={setFilterPayLoad}
                filterPayLoad={filterPayLoad}
                filterModal={filterModal}
              />
            </div>

            <div
              className="hidden lg:flex justify-end  shadow-lg border-[1px]  bg-[#FFFFFF] px-6 py-4  rounded-tr-[32px] rounded-tl-[32px]  gap-x-5  fixed bottom-0 "
              style={{ width: "-webkit-fill-available" }}
            >
              <ServiceButton
                text="RESET ALL"
                onClick={() => {
                  setFilterModal(false);
                  handleTabChange(statusId);
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
    </div>
  );
};
