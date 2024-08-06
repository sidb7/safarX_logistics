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
  GET_ALL_ADDRESSS,
  UPDATE_ALL_ADDRESS,
} from "../../../utils/ApiUrls";
import CustomButton from "../../../components/Button";
import { toast } from "react-hot-toast";
import CustomDropDown from "../../../components/DropDown";
import DatePicker from "react-datepicker";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import DeleteIconForLg from "../../../assets/DeleteIconRedColor.svg";
import editIcon from "../../../assets/serv/edit.svg";
import DownloadIcon from "../../../assets/download.svg";
import { Tooltip } from "react-tooltip";
import { capitalizeFirstLetter, getQueryJson } from "../../../utils/utility";
//import * as FileSaver from "file-saver";
import { tokenKey } from "../../../utils/utility";
import FilterScreen from "../common/FilterScreen/filterScreen";
import { Spinner } from "../../../components/Spinner";
import { useSelector } from "react-redux";
import OneButton from "../../../components/Button/OneButton";
import LocationIcon from "../../../assets/PickUp/WebLocation.svg";
import WebLocationIcon from "../../../assets/PickUp/Location.svg";
import CustomInputBox from "../../../components/Input";
import InfoCircle from "../../../assets/info-circle.svg";
import BulkActionIcon from "../../../assets/Bulk_Action.svg";

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
  selectedDateRange: any;
  filterPayLoad: any;
  bulkActionObject: any;
  setBulkActionObject: any;
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
  selectedDateRange,
  filterPayLoad,
  bulkActionObject,
  setBulkActionObject,
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
  const [isBulkModalOpen, setIsBulkModalOpen] = useState<any>(false);
  const [isFilterLoading, setIsFilterLoading] = useState<any>(false);
  const [filterState, setFilterState] = useState({
    name: "",
    menu: [],
    label: "",
    isCollapse: false,
  });
  // const [filterPayLoad, setFilterPayLoad] = useState({
  //   filterArrOne: [],
  //   filterArrTwo: [],
  // });
  const [manifestButton, setManifestButton] = useState<any>(true);
  let { activeTab } = getQueryJson();
  activeTab = activeTab?.toUpperCase();
  const stateValue = useSelector((state: any) => state?.paginationSlice);
  const [pageToOpen, setPageToOpen] = useState<any>("Home");
  const getIndexFromActiveTab = (arr: any, tabName: any) => {
    let tabIndex = arr.findIndex((e: any) => e.value === tabName);
    if (tabIndex > -1) {
      return +tabIndex;
    } else {
      return 0;
    }
  };
  const tabIndex = activeTab ? getIndexFromActiveTab(statusData, activeTab) : 0;
  const [searchResult, setSearchResult]: any = useState([]);
  const [validationErrors, setValidationErrors] = useState<any>({
    pickupAddress: {
      name: null,
      mobileNo: null,
      pincode: null,
      fullAddress: null,
      landMark: null,
    },
    deliveryAddress: {
      name: null,
      mobileNo: null,
      pincode: null,
      fullAddress: null,
      landMark: null,
    },
  });
  const [allAddresses, setAllAddresses]: any = useState([]);
  const [selectedTempOrderIds, setSelectedTempOrderIds]: any = useState([]);

  const setScrollIndex = (id: number) => {
    // handleTabChange(id);
    const tabName = statusData[id].value;
    navigate(`/orders/view-orders?activeTab=${tabName?.toLowerCase()}`);
  };

  // useEffect(() => {
  //   handleTabChange(tabIndex);
  // }, []);

  const [filterData, setFilterData] = useState([
    {
      label: `All`,
      isActive: false,
      value: "all",
    },
    {
      label: `Ready To Book`,
      isActive: false,
      value: "draft",
    },
    // {
    //   label: `Failed`,
    //   isActive: false,
    //   value: "failed",
    // },
    {
      label: `Error`,
      isActive: false,
      value: "error",
    },
  ]);

  const actionsObject: any = {
    DRAFT: [
      {
        icon: BulkActionIcon,
        hovertext: "Bulk Action",
        identifier: "BulkAction",
        buttonName: "Bulk Action",
      },
      {
        icon: PlaceChannelOrder,
        hovertext: "Place Orders",
        identifier: "PlaceOrder",
        buttonName: "Place Orders",
      },
      {
        icon: DeleteIconForLg,
        hovertext: "Delete Orders",
        identifier: "Delete",
        buttonName: "Delete Orders",
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
        hovertext: "Rto Orders",
        identifier: "Rto",
        buttonName: "RTO ORDERS",
      },
    ],
    // "OUT OF DELIVERY": [
    //   {
    //     icon: CrossIcon,
    //     hovertext: "Cancel Orders",
    //     identifier: "Cancel",
    //     buttonName: "CANCEL ORDERS",
    //   },
    // ],
    // DELIVERED: [
    //   {
    //     icon: CrossIcon,
    //     hovertext: "Cancel Orders",
    //     identifier: "Cancel",
    //     buttonName: "CANCEL ORDERS",
    //   },
    // ],
    // RETURN: [
    //   {
    //     icon: CrossIcon,
    //     hovertext: "Cancel Orders",
    //     identifier: "Cancel",
    //     buttonName: "CANCEL ORDERS",
    //   },
    // ],
    EXCEPTION: [
      {
        icon: CrossIcon,
        hovertext: "Rto Orders",
        identifier: "Rto",
        buttonName: "RTO ORDERS",
      },
      {
        icon: CrossIcon,
        hovertext: "Re-Attempt Orders",
        identifier: "Re-Attempt",
        buttonName: "RE-ATTEMPT ORDERS",
      },
    ],
    "READY TO PICK": [
      // {
      //   icon: CrossIcon,
      //   hovertext: "Cancel Orders",
      //   identifier: "Cancel",
      //   buttonName: "CANCEL ORDERS",
      // },
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
        `${localStorage.getItem("sellerId")}_${tokenKey}`
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
        } else if (identifier === "BulkAction") {
          if (selectedRowdata.length === 0) {
            toast.error("Please Select Atleast One Order To Take Bulk Action.");
            return;
          }

          setIsBulkModalOpen(true);

          const { data } = await POST(GET_ALL_ADDRESSS, {});

          const tempOrderIds = selectedRowdata.map(
            (data: any, index: any) => data.original.tempOrderId
          );

          setSelectedTempOrderIds(tempOrderIds);

          setAllAddresses(data?.data?.[0]);
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
              // handleTabChange(1);
              // navigate(`/orders/view-orders?activeTab=booked`);
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
      case "PICKED UP": {
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
      case "IN TRANSIT": {
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
        } else {
          toast.error("Please select atleast one order for Download Invoice");
          return;
        }

        // } else {
        //   toast.error("Please select atleast one order for tax Invoice");
        // }
        break;
      }
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
    setIsErrorPage(index === 2 ? true : false);
    switch (index) {
      case 0: {
        getAllOrders();
        break;
      }
      case 1: {
        const subStatus = "DRAFT";
        getAllOrders(subStatus, stateValue);
        break;
      }
      // case 2: {
      //   const subStatus = "FAILED";
      //   getAllOrders(subStatus);

      //   break;
      // }
      case 2: {
        getErrors();
      }
    }
  };

  // const handleSearchOrder = async (e: any) => {
  //   try {
  //     clearTimeout(debounceTimer);
  //     debounceTimer = setTimeout(async () => {
  //       if (e.target.value.length > 0) {
  //         isOrderTableLoader(true);
  //         const { data } = await POST(GET_SELLER_ORDER, {
  //           id: e.target.value,
  //           currentStatus,
  //           filterArrOne: filterPayLoad?.filterArrOne || [],
  //           filterArrTwo: filterPayLoad?.filterArrTwo || [],
  //         });
  //         const { OrderData, orderCount } = data?.data?.[0];
  //         setStatusCount("", currentStatus, orderCount);
  //         setTotalcount(orderCount ? orderCount : 0);

  //         if (data?.status) {
  //           isOrderTableLoader(false);
  //           setOrders(OrderData);
  //           setFilterModal(false);
  //         } else {
  //           isOrderTableLoader(false);
  //           setFilterModal(false);
  //           throw new Error(data?.meesage);
  //         }
  //       }
  //     }, 800);
  //   } catch (error: any) {
  //     console.warn("Error in OrderStatus Debouncing: ", error.message);
  //   }
  // };

  const filterButton = () => {
    if (isLgScreen) {
      if (currentStatus === "BOOKED" || "PICKED UP") {
        return (
          <div className="grid grid-cols-4 lg:flex ">
            {getActionsIcon()?.length > 0 && manifestButton && (
              <div className="rounded-md flex mx-3 gap-x-3">
                {getActionsIcon()?.map((data: any, index: any) => {
                  return (
                    <>
                      <button
                        key={index}
                        className={`inline-flex px-2 py-2 justify-center items-center gap-2 bg-[#FFFFFF] text-[#1C1C1C] border border-[#A4A4A4] hover:bg-[#E8E8E8] hover:shadow-cardShadow2a hover:border-0 ${
                          index < getActionsIcon().length - 1 &&
                          "border-r border-[#A4A4A4]"
                        } rounded-l-md rounded-r-md cursor-pointer`}
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
                        <span className="md:text-[14px] font-Open font-semibold leading-5 whitespace-nowrap">
                          {capitalizeFirstLetter(data?.buttonName)}
                        </span>
                      </button>
                      {/* <button
                        key={index}
                        className={`${
                          index < getActionsIcon().length - 1 &&
                          "border-r border-[#A4A4A4] "
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
                      </button> */}
                      {/* <OneButton
                        text={capitalizeFirstLetter(data?.buttonName)}
                        icon={data.icon}
                        showIcon
                        // className={`${
                        //   index < getActionsIcon().length - 1 &&
                        //   "border-r border-[#A4A4A4]"
                        // } px-3 py-1  `}
                        onClick={() =>
                          handleActions(
                            currentStatus,
                            selectedRowdata,
                            data?.identifier
                          )
                        }
                        loading={
                          isLoadingManifest.isLoading &&
                          isLoadingManifest.identifier === data.identifier
                        }
                        variant="secondary"
                        size="medium"
                        iconClass="w-[16px]"
                      /> */}
                    </>
                  );
                })}
              </div>
            )}
            {/* <div>
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
            </div> */}
          </div>
        );
      } else if (currentStatus === "IN TRANSIT") {
        // buttons and the logic to here for "IN TRANSIT"
        return (
          <div className="grid grid-cols-4 lg:flex ">
            {getActionsIcon()?.length > 0 && manifestButton && (
              <div className="rounded-md flex mx-3 gap-x-3">
                {getActionsIcon()?.map((data: any, index: any) => {
                  return (
                    <>
                      <button
                        key={index}
                        className={`inline-flex px-2 py-2 justify-center items-center gap-2 bg-[#FFFFFF] text-[#1C1C1C] border border-[#A4A4A4] hover:bg-[#E8E8E8] hover:shadow-cardShadow2a hover:border-0 ${
                          index < getActionsIcon().length - 1 &&
                          "border-r border-[#A4A4A4]"
                        } rounded-l-md rounded-r-md cursor-pointer`}
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
                        <span className="md:text-[14px] font-Open font-semibold leading-5 whitespace-nowrap">
                          {capitalizeFirstLetter(data?.buttonName)}
                        </span>
                      </button>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        );
      } else if (currentStatus === "EXCEPTION") {
        // buttons and the logic to here for "EXCEPTION"
        return (
          <div className="grid grid-cols-4 lg:flex ">
            {getActionsIcon()?.length > 0 && manifestButton && (
              <div className="rounded-md flex mx-3 gap-x-3">
                {getActionsIcon()?.map((data: any, index: any) => {
                  return (
                    <>
                      <button
                        key={index}
                        className={`inline-flex px-2 py-2 justify-center items-center gap-2 bg-[#FFFFFF] text-[#1C1C1C] border border-[#A4A4A4] hover:bg-[#E8E8E8] hover:shadow-cardShadow2a hover:border-0 ${
                          index < getActionsIcon().length - 1 &&
                          "border-r border-[#A4A4A4]"
                        } rounded-l-md rounded-r-md cursor-pointer`}
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
                        <span className="md:text-[14px] font-Open font-semibold leading-5 whitespace-nowrap">
                          {capitalizeFirstLetter(data?.buttonName)}
                        </span>
                      </button>
                    </>
                  );
                })}
              </div>
            )}
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
            {/* 
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
            </div> */}
          </div>
        );
      }
    }
  };

  // const handleStatusChanges = (index: any) => {
  //   handleTabChange(index);
  //    setStatusId(index);
  // };

  const getAllOrders = async (subStatus?: any, stateValue?: any) => {
    let value;
    if (stateValue) {
      value = stateValue.value;
    }
    let payload: any = {
      skip: 0,
      limit: +value || 10,
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

    if (selectedDateRange?.startDate && selectedDateRange?.endDate) {
      let startEpoch = null;
      let lastendEpoch = null;

      const { startDate, endDate } = selectedDateRange;

      if (startDate instanceof Date && endDate instanceof Date) {
        startDate.setHours(0, 0, 0, 0);
        startEpoch = startDate.getTime();

        endDate.setHours(23, 59, 59, 999);
        const endEpoch = endDate.getTime();

        lastendEpoch = endEpoch;
      }

      payload.filterArrOne = [
        {
          createdAt: {
            $gte: startEpoch,
          },
        },
        {
          createdAt: {
            $lte: lastendEpoch,
          },
        },
      ];
      payload.filterArrTwo = [];
    }

    if (firstFilterData.length > 0 || secondFilterData.length > 0) {
      payload.filterArrOne = firstFilterData;
      payload.filterArrTwo = secondFilterData;
    }

    const { data } = await POST(GET_SELLER_ORDER, payload);

    const { OrderData, orderCount, draftCount } = data?.data?.[0];

    if (subStatus === "DRAFT") {
      setDraftOrderCount({
        ...draftOrderCount,
        draft: orderCount || 0,
      });
    } else {
      setDraftOrderCount({
        ...draftOrderCount,
        all: orderCount,
        draft: draftCount || 0,
      });
    }

    setOrders(OrderData);
    setTotalcount(orderCount || 0);
  };

  const handleBulkActionAddress = (
    typeOfAddress: string,
    label: string,
    value: string
  ) => {
    // mobileNo: null,
    // pincode: null,

    const regex = /^-?\d+(\.\d+)?$/;

    if (label === "mobileNo") {
      if (regex.test(value) || value == "") {
        setBulkActionObject((prevState: any) => ({
          ...prevState,
          [typeOfAddress]: {
            ...bulkActionObject[typeOfAddress],
            [label]: value,
          },
        }));
      } else
        setBulkActionObject((prevState: any) => ({
          ...prevState,
          [typeOfAddress]: {
            ...bulkActionObject[typeOfAddress],
            [label]: prevState[typeOfAddress][label],
          },
        }));

      if (value.toString().length < 10)
        setValidationErrors((prevState: any) => ({
          ...prevState,
          [typeOfAddress]: {
            ...validationErrors[typeOfAddress],
            [label]: `${label} must be a 10 digit number`,
          },
        }));
      else
        setValidationErrors((prevState: any) => ({
          ...prevState,
          [typeOfAddress]: {
            ...validationErrors[typeOfAddress],
            [label]: null,
          },
        }));
    }

    if (label === "pincode") {
      if (regex.test(value) || value == "") {
        setBulkActionObject((prevState: any) => ({
          ...prevState,
          [typeOfAddress]: {
            ...bulkActionObject[typeOfAddress],
            [label]: +value,
          },
        }));
      } else
        setBulkActionObject((prevState: any) => ({
          ...prevState,
          [typeOfAddress]: {
            ...bulkActionObject[typeOfAddress],
            [label]: +prevState[typeOfAddress][label],
          },
        }));

      if (value.toString().length < 6) {
        setValidationErrors((prevState: any) => ({
          ...prevState,
          [typeOfAddress]: {
            ...validationErrors[typeOfAddress],
            [label]: `${label} must be a 6 digit number`,
          },
        }));
      } else
        setValidationErrors((prevState: any) => ({
          ...prevState,
          [typeOfAddress]: {
            ...validationErrors[typeOfAddress],
            [label]: null,
          },
        }));
    }

    if (label === "name" || label === "fullAddress" || label === "landMark") {
      setBulkActionObject((prevState: any) => ({
        ...prevState,
        [typeOfAddress]: {
          ...bulkActionObject[typeOfAddress],
          [label]: value,
        },
      }));

      if (value.toString().length <= 0) {
        setValidationErrors((prevState: any) => ({
          ...prevState,
          [typeOfAddress]: {
            ...validationErrors[typeOfAddress],
            [label]: `${label} is required`,
          },
        }));
      } else
        setValidationErrors((prevState: any) => ({
          ...prevState,
          [typeOfAddress]: {
            ...validationErrors[typeOfAddress],
            [label]: null,
          },
        }));
    }
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

  // function getObjectWithIsActiveTrue(data: any, name: any) {
  //   const tempArrTwo = filterPayLoad?.filterArrTwo;
  //   const tempArrOne = filterPayLoad?.filterArrOne;

  //   const updateFilterArr = (arr: any, key: any, subKey: any, data: any) => {
  //     const index = arr.findIndex(
  //       (findArr: any) => Object.keys(findArr)[0] === key
  //     );

  //     if (index > -1) {
  //       arr[index][key][subKey] = data;
  //     } else {
  //       const newObj = { [key]: { [subKey]: [...data] } };
  //       arr.push(newObj);
  //     }
  //   };

  //   switch (name) {
  //     case "Delivery Pincode":
  //       updateFilterArr(tempArrTwo, "deliveryAddress.pincode", "$in", data);
  //       break;
  //     case "Pickup Pincode":
  //       updateFilterArr(tempArrTwo, "pickupAddress.pincode", "$in", data);
  //       break;
  //     case "PaymentType":
  //       updateFilterArr(tempArrTwo, "codInfo.isCod", "$in", data);
  //       break;
  //     case "Partners":
  //       updateFilterArr(tempArrTwo, "service.partnerName", "$in", data);
  //       break;
  //     case "Order Type":
  //       updateFilterArr(tempArrOne, "orderType", "$in", data);
  //       break;
  //     case "Sources":
  //       updateFilterArr(tempArrOne, "source", "$in", data);
  //       break;
  //     case "Seller Id":
  //       updateFilterArr(tempArrOne, "sellerId", "$in", data);
  //       break;
  //     default:
  //       break;
  //   }

  //   setFilterPayLoad({
  //     ...filterPayLoad,
  //     filterArrTwo: [...tempArrTwo],
  //     filterArrOne: [...tempArrOne],
  //   });
  // }

  // const applyFilterforOrders = async () => {
  //   try {
  //     setIsFilterLoading(true);
  //     let payload = {
  //       skip: 0,
  //       limit: 10,
  //       pageNo: 1,
  //       sort: { _id: -1 },
  //       currentStatus,
  //       filterArrOne: filterPayLoad?.filterArrOne || [],
  //       filterArrTwo: filterPayLoad?.filterArrTwo || [],
  //     };
  //     const { data } = await POST(GET_SELLER_ORDER, payload);
  //     const { OrderData, orderCount } = data?.data?.[0];
  //     setStatusCount("", currentStatus, orderCount);
  //     setTotalcount(orderCount ? orderCount : 0);

  //     console.log("filterState----------------1 filterApi", filterState);

  //     if (data?.status) {
  //       setIsFilterLoading(false);
  //       setOrders(OrderData);
  //       setFilterModal(false);
  //     } else {
  //       setIsFilterLoading(false);
  //       setFilterModal(false);
  //       throw new Error(data?.meesage);
  //     }
  //   } catch (error: any) {
  //     setIsFilterLoading(false);
  //     toast.error(error);
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   if (filterState?.menu?.length > 0) {
  //     getObjectWithIsActiveTrue(filterState?.menu, filterState?.name);
  //   }
  // }, [filterState]);

  const handleSearchedAddress = (index: number, typeOfAddress: string) => {
    if (index === 0)
      setBulkActionObject({
        ...bulkActionObject,
        [typeOfAddress]: {
          name: "",
          mobileNo: "",
          fullAddress: "",
          pincode: "",
          landMark: "",
        },
      });
    else {
      setBulkActionObject({
        ...bulkActionObject,
        [typeOfAddress]: {
          name: searchResult?.[index]?.contact?.name,
          mobileNo: searchResult?.[index]?.contact?.mobileNo,
          fullAddress: searchResult?.[index]?.fullAddress,
          pincode: searchResult?.[index]?.pincode,
          landMark: searchResult?.[index]?.landmark,
        },
      });

      if (searchResult?.[index]?.name?.length <= 0) {
        setValidationErrors({
          ...validationErrors,
          [typeOfAddress]: {
            ...validationErrors[typeOfAddress],
            name: "Name is required",
          },
        });
      } else
        setValidationErrors({
          ...validationErrors,
          [typeOfAddress]: {
            ...validationErrors[typeOfAddress],
            name: null,
          },
        });

      if (searchResult?.[index]?.fullAddress?.length <= 0) {
        setValidationErrors({
          ...validationErrors,
          [typeOfAddress]: {
            ...validationErrors[typeOfAddress],
            fullAddress: "Fulladdress is required",
          },
        });
      } else
        setValidationErrors({
          ...validationErrors,
          [typeOfAddress]: {
            ...validationErrors[typeOfAddress],
            fullAddress: null,
          },
        });

      if (searchResult?.[index]?.landMark?.length <= 0) {
        setValidationErrors({
          ...validationErrors,
          [typeOfAddress]: {
            ...validationErrors[typeOfAddress],
            landMark: "Landmark is required",
          },
        });
      } else
        setValidationErrors({
          ...validationErrors,
          [typeOfAddress]: {
            ...validationErrors[typeOfAddress],
            landMark: null,
          },
        });
    }

    setSearchResult([]);
  };

  const updateAddressOfMultipleOrders = async (addressType: string) => {
    try {
      let address = bulkActionObject[addressType];
      const payload = {
        addresstype: addressType,
        address,
        selectedTempOrderIds,
      };
      if (
        bulkActionObject[addressType]?.name?.length <= 0 ||
        bulkActionObject[addressType]?.fullAddress?.length <= 0 ||
        bulkActionObject[addressType]?.landMark?.length <= 0 ||
        bulkActionObject[addressType]?.mobileNo?.toString()?.length <= 9 ||
        bulkActionObject[addressType]?.pincode?.toString()?.length <= 5
      ) {
        return toast.error("Please Check You Details First");
      }
      const { data } = await POST(UPDATE_ALL_ADDRESS, payload);
      if (data?.success) {
        toast.success(data?.message);
        setIsBulkModalOpen(false);
        getAllOrders("", stateValue);
      } else {
        toast.error(data?.message || "Failed While Updating Address");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed While Updating Address");
    }
  };

  return (
    <div className="flex flex-col pt-7">
      <div className="flex font-medium customScroll whitespace-nowrap mt-2 ">
        {statusData?.map(({ statusName, orderNumber }: any, index: number) => {
          return (
            <div
              key={index}
              style={{ borderBottomWidth: "3px" }}
              className={`flex justify-center items-center border-[#777777] px-6  cursor-pointer ${
                tabIndex === index ? "!border-[#004EFF]" : ""
              }`}
              onClick={() => setScrollIndex(index)}
            >
              <span
                className={`text-[#777777] text-[15px] lg:text-[18px] ${
                  tabIndex === index ? "!text-[#004EFF] lg:text-[18px]" : ""
                }`}
              >
                {statusName}
              </span>
              <span
                className={`flex justify-center items-center ml-2 rounded-sm text-[12px]  text-white bg-[#777777] px-1 h-5 ${
                  tabIndex === index ? "!bg-[#004EFF]" : ""
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

      <RightSideModal
        isOpen={isBulkModalOpen}
        onClose={() => {
          setIsBulkModalOpen(false);
          setPageToOpen("Home");
        }}
      >
        <div className="mx-5">
          <div className="flex justify-between py-5 items-center text-center">
            <div className="flex justify-start items-start   flex-col gap-x-[8px] ">
              {/* <img src={LocationIcon} alt="locationIcon" /> */}
              <p className="font-Lato font-normal text-2xl text-[#323232] leading-8 capitalize">
                Bulk Actions
              </p>
              <p className="font-Lato font-normal text-base text-[#323232] leading-8 capitalize">
                Click On Any Of The Options Below To Trigger Bulk Action
              </p>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setIsBulkModalOpen(false)}
            >
              <img
                src={CrossIcon}
                width={30}
                className="border-2 rounded-md"
                alt="close button"
              />
            </div>
          </div>
          <hr />
          <div className="mt-5 font-Lato">
            {pageToOpen === "Home" ? (
              <>
                <div
                  onClick={() => setPageToOpen("Pickup")}
                  className={`cursor-pointer flex flex-row select-none gap-x-[0.5rem] p-3 h-[52px] border-[1px] border-[#E8E8E8]
                             " text-[black] rounded-lg "
                        `}
                >
                  <span>
                    <img src={LocationIcon} />
                  </span>{" "}
                  Pickup Address
                </div>
                <div
                  onClick={() => setPageToOpen("Delivery")}
                  className={`cursor-pointer flex mt-5 flex-row select-none gap-x-[0.5rem] p-3 h-[52px] border-[1px] border-[#E8E8E8]
                             " text-[black] rounded-lg "
                        `}
                >
                  <span>
                    <img src={WebLocationIcon} />
                  </span>{" "}
                  Delivery Address
                </div>
              </>
            ) : pageToOpen === "Pickup" ? (
              <>
                <div className="flex border-2 p-[1rem] rounded-md  flex-col gap-y-4 mt-1">
                  <div>
                    <div className="relative">
                      <SearchBox
                        // className="removePaddingPlaceHolder !h-[34px] w-[245px] border-none"
                        className="rounded removePaddingPlaceHolder !pl-[2.5rem] border-[1px] h-[48px] w-full border-[#A4A4A4] focus:border-[#004eff]  gap-[15px] font-Open text-[12px] text-[#1C1C1C] outline-none custom-input sentry-unmask"
                        label="Search"
                        value={searchedText}
                        onChange={(e: any) => {
                          setSearchedText(e.target.value);
                          let result = allAddresses?.pickupAddress?.filter(
                            (item: any) =>
                              item.contact.name
                                .toLowerCase()
                                .startsWith(e.target.value.toLowerCase())
                          );
                          if (e.target.value?.trim() === "") {
                            setSearchResult([]);
                          } else
                            setSearchResult([
                              { contact: { name: e.target.value } },
                              ...result,
                            ]);
                        }}
                        // getFullContent={getAllOrders}
                        customPlaceholder="Search By Name"
                        imgClassName="!w-[42px] "
                      />

                      <div className="absolute z-50 bg-[#fff] w-[100%] mt-[-2px]">
                        {searchResult.map((item: any, index: number) => (
                          <div
                            onClick={() =>
                              handleSearchedAddress(index, "pickupAddress")
                            }
                            className={`cursor-pointer border-[1px] hover:bg-[#f7f7f6] text-[16px] removePaddingPlaceHolder w-full border-[#edebeb] p-[10px] focus:border-[#004eff]  gap-[10px] h-[48px] font-Open text-[#1C1C1C] outline-none custom-input sentry-unmask ${
                              index === 0 ? "mt-[-2px] " : ""
                            }`}
                          >
                            {index === 0 ? (
                              <>
                                {capitalizeFirstLetter(item?.contact?.name)}
                                <span className="text-[blue]">
                                  {" "}
                                  - Create New User
                                </span>
                              </>
                            ) : (
                              capitalizeFirstLetter(item?.contact?.name)
                            )}{" "}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <CustomInputBox
                    label="Sender's Name"
                    value={bulkActionObject?.pickupAddress?.name}
                    onChange={(e: any) =>
                      handleBulkActionAddress(
                        "pickupAddress",
                        "name",
                        e.target.value
                      )
                    }
                    name="name"
                  />

                  {validationErrors.pickupAddress.name && (
                    <div className="flex items-center gap-x-1 mt-1">
                      <img src={InfoCircle} alt="info" width={10} height={10} />
                      <span className="font-normal text-[#F35838] text-xs leading-3">
                        {validationErrors.pickupAddress.name}
                      </span>
                    </div>
                  )}

                  <div>
                    <CustomInputBox
                      label="Sender's Mobile Number"
                      value={bulkActionObject?.pickupAddress?.mobileNo}
                      inputMode="numeric"
                      maxLength={10}
                      onChange={(e: any) =>
                        handleBulkActionAddress(
                          "pickupAddress",
                          "mobileNo",
                          e.target.value
                        )
                      }
                      name="mobileNo"
                    />

                    {validationErrors.pickupAddress.mobileNo && (
                      <div className="flex items-center gap-x-1 mt-1">
                        <img
                          src={InfoCircle}
                          alt="info"
                          width={10}
                          height={10}
                        />
                        <span className="font-normal text-[#F35838] text-xs leading-3">
                          {validationErrors.pickupAddress.mobileNo}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* <CustomInputBox
                    label="Address"
                    // value={pickupDetails.fullAddress}
                    className="!h-[70px]"
                    // onChange={handleInputChange}
                    name="fullAddress"
                  /> */}

                  <textarea
                    placeholder="Address"
                    value={bulkActionObject?.pickupAddress?.fullAddress}
                    // className=" w-[100%] rounded-lg p-4"
                    className="rounded border-[1px] removePaddingPlaceHolder w-full border-[#A4A4A4] p-[10px] focus:border-[#004eff]  gap-[10px] h-[80px] font-Open text-[12px] text-[#1C1C1C] outline-none custom-input sentry-unmask"
                    name="fullAddress"
                    onChange={(e: any) =>
                      handleBulkActionAddress(
                        "pickupAddress",
                        "fullAddress",
                        e.target.value
                      )
                    }
                  />

                  {validationErrors.pickupAddress.fullAddress && (
                    <div className="flex items-center gap-x-1 mt-1">
                      <img src={InfoCircle} alt="info" width={10} height={10} />
                      <span className="font-normal text-[#F35838] text-xs leading-3">
                        {validationErrors.pickupAddress.fullAddress}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-x-3">
                    <div>
                      <CustomInputBox
                        label="Pincode"
                        value={bulkActionObject?.pickupAddress?.pincode}
                        inputMode="numeric"
                        maxLength={6}
                        onChange={(e: any) =>
                          handleBulkActionAddress(
                            "pickupAddress",
                            "pincode",
                            e.target.value
                          )
                        }
                        name="pincode"
                      />

                      {validationErrors.pickupAddress.pincode && (
                        <div className="flex items-center gap-x-1 mt-1">
                          <img
                            src={InfoCircle}
                            alt="info"
                            width={10}
                            height={10}
                          />
                          <span className="font-normal text-[#F35838] text-xs leading-3">
                            {validationErrors.pickupAddress.pincode}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <CustomInputBox
                        label="Landmark"
                        value={bulkActionObject?.pickupAddress?.landMark}
                        onChange={(e: any) =>
                          handleBulkActionAddress(
                            "pickupAddress",
                            "landMark",
                            e.target.value
                          )
                        }
                        name="landMark"
                      />
                      {validationErrors.pickupAddress.landMark && (
                        <div className="flex items-center gap-x-1 mt-1">
                          <img
                            src={InfoCircle}
                            alt="info"
                            width={10}
                            height={10}
                          />
                          <span className="font-normal text-[#F35838] text-xs leading-3">
                            {validationErrors.pickupAddress.landMark}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="flex justify-end gap-x-10 shadow-lg border-[1px] h-[88px] bg-[#FFFFFF] px-6 py-7 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0"
                  style={{
                    marginLeft: "-1.25rem",
                    width: "-webkit-fill-available",
                  }}
                >
                  <OneButton
                    text={"Back"}
                    // disabled={errorsArray.length > 0 ? true : false}
                    variant="secondary"
                    onClick={() => {
                      setPageToOpen("Home");
                      setSearchResult([]);
                      setSearchedText("");
                    }}
                    //   onClick={() => handleServices(placeOrderButton)}
                    className="!w-[160px]"
                  />

                  <OneButton
                    text={"Update Order"}
                    // disabled={errorsArray.length > 0 ? true : false}
                    variant="primary"
                    onClick={() => {
                      updateAddressOfMultipleOrders("pickupAddress");
                    }}
                    //   onClick={() => handleServices(placeOrderButton)}
                    className="!w-[160px]"
                  />
                </div>
              </>
            ) : pageToOpen === "Delivery" ? (
              <>
                <div className="flex border-2 p-[1rem] rounded-md  flex-col gap-y-4 mt-1">
                  <div>
                    <div className="relative">
                      <SearchBox
                        // className="removePaddingPlaceHolder !h-[34px] w-[245px] border-none"
                        className="rounded removePaddingPlaceHolder !pl-[2.5rem] border-[1px] h-[48px] w-full border-[#A4A4A4] focus:border-[#004eff]  gap-[15px] font-Open text-[12px] text-[#1C1C1C] outline-none custom-input sentry-unmask"
                        label="Search"
                        value={searchedText}
                        onChange={(e: any) => {
                          setSearchedText(e.target.value);
                          let result = allAddresses?.deliveryAddress?.filter(
                            (item: any) =>
                              item.contact.name
                                .toLowerCase()
                                .startsWith(e.target.value.toLowerCase())
                          );
                          if (e.target.value?.trim() === "") {
                            setSearchResult([]);
                          } else
                            setSearchResult([
                              { contact: { name: e.target.value } },
                              ...result,
                            ]);
                        }}
                        // getFullContent={getAllOrders}
                        customPlaceholder="Search By Name"
                        imgClassName="!w-[42px] "
                      />

                      <div className="absolute z-50 bg-[#fff] w-[100%] mt-[-2px]">
                        {searchResult.map((item: any, index: number) => (
                          <div
                            onClick={() =>
                              handleSearchedAddress(index, "deliveryAddress")
                            }
                            className={`cursor-pointer border-[1px] hover:bg-[#f7f7f6] text-[16px] removePaddingPlaceHolder w-full border-[#edebeb] p-[10px] focus:border-[#004eff]  gap-[10px] h-[48px] font-Open text-[#1C1C1C] outline-none custom-input sentry-unmask ${
                              index === 0 ? "mt-[-2px] " : ""
                            }`}
                          >
                            {index === 0 ? (
                              <>
                                {capitalizeFirstLetter(item?.contact?.name)}
                                <span className="text-[blue]">
                                  {" "}
                                  - Create New User
                                </span>
                              </>
                            ) : (
                              capitalizeFirstLetter(item?.contact?.name)
                            )}{" "}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <CustomInputBox
                    label="Reciever's Name"
                    value={bulkActionObject?.deliveryAddress?.name}
                    onChange={(e: any) =>
                      handleBulkActionAddress(
                        "deliveryAddress",
                        "name",
                        e.target.value
                      )
                    }
                    name="name"
                  />
                  {validationErrors.deliveryAddress.name && (
                    <div className="flex items-center gap-x-1 mt-1">
                      <img src={InfoCircle} alt="info" width={10} height={10} />
                      <span className="font-normal text-[#F35838] text-xs leading-3">
                        {validationErrors.deliveryAddress.name}
                      </span>
                    </div>
                  )}
                  <div>
                    <CustomInputBox
                      label="Reciever's Mobile Number"
                      value={bulkActionObject?.deliveryAddress?.mobileNo}
                      onChange={(e: any) =>
                        handleBulkActionAddress(
                          "deliveryAddress",
                          "mobileNo",
                          e.target.value
                        )
                      }
                      inputMode="numeric"
                      maxLength={10}
                      name="mobileNo"
                    />
                    {validationErrors.deliveryAddress.mobileNo && (
                      <div className="flex items-center gap-x-1 mt-1">
                        <img
                          src={InfoCircle}
                          alt="info"
                          width={10}
                          height={10}
                        />
                        <span className="font-normal text-[#F35838] text-xs leading-3">
                          {validationErrors.deliveryAddress.mobileNo}
                        </span>
                      </div>
                    )}
                  </div>

                  <textarea
                    placeholder="Address"
                    // className=" w-[100%] rounded-lg p-4"
                    className="rounded border-[1px] removePaddingPlaceHolder w-full border-[#A4A4A4] p-[10px] focus:border-[#004eff]  gap-[10px] h-[70px] font-Open text-[12px] text-[#1C1C1C] outline-none custom-input sentry-unmask"
                    name="fullAddress"
                    value={bulkActionObject?.deliveryAddress?.fullAddress}
                    onChange={(e: any) =>
                      handleBulkActionAddress(
                        "deliveryAddress",
                        "fullAddress",
                        e.target.value
                      )
                    }
                  />

                  {/* <CustomInputBox
                    label="Address"
                    // value={pickupDetails.fullAddress}
                    className="!h-[70px]"
                    // onChange={handleInputChange}
                    name="fullAddress"
                  /> */}

                  {validationErrors.deliveryAddress.fullAddress && (
                    <div className="flex items-center gap-x-1 mt-1">
                      <img src={InfoCircle} alt="info" width={10} height={10} />
                      <span className="font-normal text-[#F35838] text-xs leading-3">
                        {validationErrors.deliveryAddress.fullAddress}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-x-3">
                    <div>
                      <CustomInputBox
                        label="Pincode"
                        value={bulkActionObject?.deliveryAddress?.pincode}
                        onChange={(e: any) =>
                          handleBulkActionAddress(
                            "deliveryAddress",
                            "pincode",
                            e.target.value
                          )
                        }
                        inputMode="numeric"
                        maxLength={6}
                        // onChange={handlePincodeChange}
                        name="pincode"
                      />

                      {validationErrors.deliveryAddress.pincode && (
                        <div className="flex items-center gap-x-1 mt-1">
                          <img
                            src={InfoCircle}
                            alt="info"
                            width={10}
                            height={10}
                          />
                          <span className="font-normal text-[#F35838] text-xs leading-3">
                            {validationErrors.deliveryAddress.pincode}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <CustomInputBox
                        label="Landmark"
                        value={bulkActionObject?.deliveryAddress?.landMark}
                        onChange={(e: any) =>
                          handleBulkActionAddress(
                            "deliveryAddress",
                            "landMark",
                            e.target.value
                          )
                        }
                        name="landMark"
                      />

                      {validationErrors.deliveryAddress.landMark && (
                        <div className="flex items-center gap-x-1 mt-1">
                          <img
                            src={InfoCircle}
                            alt="info"
                            width={10}
                            height={10}
                          />
                          <span className="font-normal text-[#F35838] text-xs leading-3">
                            {validationErrors.deliveryAddress.landMark}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="flex justify-end gap-x-10 shadow-lg border-[1px] h-[88px] bg-[#FFFFFF] px-6 py-7 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0"
                  style={{
                    marginLeft: "-1.25rem",
                    width: "-webkit-fill-available",
                  }}
                >
                  <OneButton
                    text={"Back"}
                    // disabled={errorsArray.length > 0 ? true : false}
                    variant="secondary"
                    onClick={() => {
                      setPageToOpen("Home");
                      setSearchedText("");
                      setSearchResult([]);
                    }}
                    //   onClick={() => handleServices(placeOrderButton)}
                    className="!w-[160px]"
                  />

                  <OneButton
                    text={"Update Order"}
                    // disabled={errorsArray.length > 0 ? true : false}
                    variant="primary"
                    onClick={() => {
                      updateAddressOfMultipleOrders("deliveryAddress");
                    }}
                    //   onClick={() => handleServices(placeOrderButton)}
                    className="!w-[160px]"
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </RightSideModal>

      {/* filter modal */}

      {/* {isLgScreen && (
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
      )} */}
    </div>
  );
};
