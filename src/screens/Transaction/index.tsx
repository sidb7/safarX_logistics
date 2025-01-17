import { useEffect, useState } from "react";
import SelectIcon from "../../assets/Order/SelectIcon.svg";
import FilterIcon from "../../assets/Order/FilterIcon.svg";
import { ScrollNav } from "../../components/ScrollNav";
import { PassbookHistory } from "./history/passbookHistory";
import { CashbackHistory } from "./history/cashbackHistory";
import { ResponsiveState } from "../../utils/responsiveState";
import { CustomTable } from "../../components/Table";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../../components/Pagination";
import { SearchBox } from "../../components/SearchBox";
import { PassbookColumns } from "./history/passbookHistory";
import { OnlineDetailsColumns } from "./history/onlineHistory";
import { cashbackDetailsColumns } from "./history/cashbackHistory";
import { POST } from "../../utils/webService";
import { GET_WALLET_TRANSACTION } from "../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { Spinner } from "../../components/Spinner";
import { useSelector } from "react-redux";
import AccessDenied from "../../components/AccessDenied";
import Pagination from "../../components/Pagination";
import { TransactionSearchBox } from "../../components/Transactions/TransactionSearchBox";
import { checkPageAuthorized } from "../../redux/reducers/role";
import DeleteIconForLg from "../../assets/DeleteIconRedColor.svg";
import editIcon from "../../assets/serv/edit.svg";
import CloseIcon from "../../assets/CloseIcon.svg";
import { useErrorBoundary } from "react-error-boundary";
import { capitalizeFirstLetter } from "../../utils/utility";
import { createColumnHelper } from "@tanstack/react-table";
import { Approved } from "./StatusComponents";
import CopyTooltip from "../../components/CopyToClipboard";
import {
  date_DD_MMM_YYYY_HH_MM,
  date_DD_MMM_YYYY_HH_MM_IST,
  date_DD_MMM_YYYY_HH_MM_SS,
} from "../../utils/dateFormater";
import { NewSearch } from "../../components/NewSearch/NewSearch";
import { PathFinder } from "../../utils/Helper/PathFinder";
import { inputRegexFilter } from "../../utils/Helper/Filter";
import DatePicker from "react-datepicker";
import DateButton from "../../components/Button/DateButton";
import OneButton from "../../components/Button/OneButton";
import RightSideModal from "../../components/CustomModal/customRightModal";
import TransactionFilter from "./transactionFilter";

const arrayData = [
  { label: "Passbook" },
  // { label: "Cashback" },
  { label: "NEFT/IMPS/RTGS Transaction" },
];

export const Transaction = () => {
  const [sortOrder, setSortOrder] = useState("desc");
  const { showBoundary } = useErrorBoundary() || {};

  const navigate = useNavigate();
  const roles = useSelector((state: any) => state?.roles);
  const isActive = checkPageAuthorized("Transaction History");
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [renderingComponents, setRenderingComponents] = useState(0);
  const { isLgScreen } = ResponsiveState();
  const [loading, setLoading] = useState(false);
  const [data, setData]: any = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowSelectedData, setRowSelectedData]: any = useState([]);

  const [searchValue, setSearchValue]: any = useState("");
  const currenturl = window.location.href;
  const path = PathFinder(currenturl);
  const [dateRange, setDateRange]: any = useState([null, null]);
  let thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const [startDate, setStartDate] = useState<any>(thirtyDaysAgo);
  const [endDate, setEndDate] = useState<any>(new Date());
  const [filterModal, setFilterModal] = useState(false);
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

  const [persistFilterData, setPersistFilterData]: any = useState({
    deliveryPincode: [],
    pickupPincode: [],
  });

  useEffect(() => {
    // if (renderingComponents === 0 || renderingComponents === 2) {
    setLoading(true);
    console.log("renderingComponents", renderingComponents);

    const getData = setTimeout(async () => {
      const payload: any = {
        filter: [],
        skip: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
        pageNo: currentPage,
        sort: { _id: sortOrder === "desc" ? -1 : 1 },
        searchValue: searchValue,
        apiType: renderingComponents === 1 ? "neft/rtgs/imps" : "",
      };

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

        // payload?.filter?.push({
        //   createdAt: {
        //     $gte: startEpoch,
        //     $lte: lastendEpoch,
        //   },
        // });
      }
      payload.filter = [];
      let extraFilter = filterPayLoad?.filterArrOne;
      extraFilter?.map((el: any, i: any) => {
        if (el?.status?.$in?.length > 0) {
          payload?.filter?.push(el);
        }
        if (el?.description?.$in?.length > 0) {
          payload?.filter?.push(el);
        }
      });

      if (renderingComponents === 1) {
        payload.filter.type = "WALLET_RECHARGE_USING_NEFT";
      }

      const { data: response } = await inputRegexFilter(
        searchValue,
        path,
        payload
      );

      if (response?.success) {
        setData(response?.data || []);
        setTotalItemCount(response.totalTransactions);
        setLoading(false);
        setIsFilterLoading(false);
        setFilterModal(false);
      } else {
        toast.error(response?.message);
        // showBoundary(response?.message);
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(getData);
    // }
  }, [
    itemsPerPage,
    currentPage,
    sortOrder,
    searchValue,
    isFilterLoading,
    renderingComponents,
  ]);

  // useEffect(() => {
  //   setLoading(true);

  //   const getData = setTimeout(async () => {
  //     let skip;
  //     let limit;
  //     let pageNo;
  //     if (currentPage !== 1) {
  //       skip = 0;
  //       limit = itemsPerPage;
  //       pageNo = 1;
  //     } else {
  //       skip = (currentPage - 1) * itemsPerPage;
  //       limit = itemsPerPage;
  //       pageNo = currentPage;
  //     }
  //     const payload: any = {
  //       filter: [],
  //       skip,
  //       limit,
  //       pageNo,
  //       sort: { _id: sortOrder === "desc" ? -1 : 1 },
  //       searchValue: searchValue,
  //     };

  //     if (startDate && endDate) {
  //       let startEpoch = null;
  //       let lastendEpoch = null;

  //       if (startDate instanceof Date && endDate instanceof Date) {
  //         startDate.setHours(0, 0, 0, 0);
  //         startEpoch = startDate.getTime();

  //         endDate.setHours(23, 59, 59, 999);
  //         const endEpoch = endDate.getTime();

  //         lastendEpoch = endEpoch;
  //       }
  //       payload?.filter?.push({
  //         createdAt: {
  //           $gte: startEpoch,
  //           $lte: lastendEpoch,
  //         },
  //       });
  //     }
  //     let extraFilter = filterPayLoad?.filterArrOne;
  //     extraFilter?.map((el: any, i: any) => {
  //       if (el?.status?.$in?.length > 0) {
  //         payload?.filter?.push(el);
  //       }
  //       if (el?.description?.$in?.length > 0) {
  //         payload?.filter?.push(el);
  //       }
  //     });

  //     if (renderingComponents === 2) {
  //       payload.filter.type = "WALLET_RECHARGE_USING_NEFT";
  //     }

  //     const { data: response } = await inputRegexFilter(
  //       searchValue,
  //       path,
  //       payload
  //     );

  //     if (response?.success) {
  //       setData(response?.data || []);
  //       setTotalItemCount(response.totalTransactions);
  //       setLoading(false);
  //       setIsFilterLoading(false);
  //       setFilterModal(false);
  //     } else {
  //       toast.error(response?.message);
  //       // showBoundary(response?.message);
  //       setLoading(false);
  //     }
  //   }, 500);

  //   return () => clearTimeout(getData);
  // }, [endDate]);

  const PersistFilterArr = (key: any, data: any) => {
    setPersistFilterData((prevData: any) => {
      return { ...prevData, [key]: [...data] };
    });
  };

  function getObjectWithIsActiveTrue(data: any, name: any) {
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
      case "Status":
        updateFilterArr(tempArrOne, "status", "$in", data);
        PersistFilterArr("status", data);
        break;
      case "Description":
        updateFilterArr(tempArrOne, "description", "$in", data);
        PersistFilterArr("description", data);
        break;
      default:
        break;
    }

    tempArrOne = tempArrOne.filter((obj: any) => {
      const key = Object.keys(obj)[0];
      return obj[key].$in.length > 0;
    });

    setFilterPayLoad({
      ...filterPayLoad,
      filterArrOne: [...tempArrOne],
    });
  }

  useEffect(() => {
    getObjectWithIsActiveTrue(filterState?.menu, filterState?.name);
  }, [filterState]);

  function formatDate(dateString: any) {
    const date = new Date(dateString);

    // Format date as '23 Aug 2024'
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // Format time as '04:38 pm'
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
  }

  const handleClear = () => {
    setDateRange([null, null]);
    setStartDate(null);
    setEndDate(null);
  };

  //column for wallet NEFT
  const columnsHelper = createColumnHelper<any>();
  const columns = [
    columnsHelper.accessor(" Courier Partner ID and Name", {
      header: (props: any) => {
        return (
          <div className="flex justify-start items-center min-w-[120px]">
            <h1 className="text-sm font-semibold leading-5 ">Client Id</h1>
          </div>
        );
      },
      cell: ({ row }: any) => {
        const rowData = row?.original;
        return <div className=" flex"> {rowData?.sellerId || "--"}</div>;
      },
    }),
    columnsHelper.accessor("transactionId", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-[120px] ">
            <h1 className="font-semibold leading-5 text-sm">Transaction ID</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex  items-center justify-between ">
            <div className=" w-[80px] whitespace-nowrap  overflow-hidden overflow-ellipsis font-Open font-normal leading-5 text-sm   ">
              {info.row.original.transactionId}
            </div>
            <div className="cursor-pointer">
              <CopyTooltip
                stringToBeCopied={`${info.row.original.transactionId}
               `}
              />
            </div>
          </div>
        );
      },
    }),

    columnsHelper.accessor("noOfAwb", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-[120px] ">
            <h1>Ref/UTR No.</h1>
          </div>
        );
      },
      cell: ({ row }: any) => {
        const rowData = row?.original;
        const utrNo = rowData?.description.split(" ").pop();

        return (
          <div className="flex justify-between">
            <div>{utrNo}</div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("uniqueCourierPartners", {
      header: () => {
        return (
          <div className="flex justify-between min-w-[120px]">
            <h1>Amount</h1>
          </div>
        );
      },
      cell: ({ row }) => {
        const rowData = row?.original;

        return (
          <div className="flex space-x-2 items-center">
            <div>₹ {rowData?.amount}</div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("charges", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-[120px]">
            <div className="flex flex-col">Type</div>
          </div>
        );
      },
      cell: ({ row }: any) => {
        const rowData = row?.original;

        return (
          <div className="flex justify-center flex-col p-3 gap-y-2">Credit</div>
        );
      },
    }),
    columnsHelper.accessor("finalAmount", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-[120px] ">
            <div className="flex flex-col">
              <h1>Discription</h1>
            </div>
          </div>
        );
      },
      cell: ({ row }: any) => {
        const rowData = row?.original;

        return (
          <div className="flex justify-center flex-col min-w-[120px]">
            <div>{rowData?.description}</div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("cashBackSS", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-[120px] ">
            <div className="flex flex-col">CashBack</div>
          </div>
        );
      },
      cell: ({ row }: any) => {
        return (
          <div className="flex justify-between">
            <div> 0 </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("req,Date", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-[120px] ">
            <div className="flex flex-col">Requested Date</div>
          </div>
        );
      },
      cell: ({ row }: any) => {
        const rowData = row?.original;
        const date: any = new Date(rowData?.createdAt);

        const formattedDateTime = date_DD_MMM_YYYY_HH_MM(date);

        return (
          <div className="flex justify-between">
            <div className="flex flex-col  whitespace-nowrap my-4 ">
              <span>{formattedDateTime.split(",")[0]}</span>
              <span>{formattedDateTime.split(",")[1]}</span>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("cashBack", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-[120px] ">
            <div className="flex flex-col">Approved Date</div>
          </div>
        );
      },
      cell: ({ row }: any) => {
        const timestamp = new Date(row.original.updated_At);

        // Adjust for IST (UTC+5:30)
        const istTimestamp = new Date(
          timestamp.getTime() + 5.5 * 60 * 60 * 1000
        );

        const humanReadableDate = istTimestamp.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        const hours = istTimestamp.getUTCHours();
        const minutes = istTimestamp.getUTCMinutes();
        const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const ampm = hours >= 12 ? "pm" : "am";
        const time = `${formattedHours}:${formattedMinutes} ${ampm}`;
        return (
          <div className="flex justify-between">
            <div className="flex flex-col whitespace-nowrap my-4">
              <span>{`${humanReadableDate} ${time}`}</span>
            </div>
          </div>
        );
      },
    }),
    // columnsHelper.accessor("remark", {
    //   header: () => {
    //     return (
    //       <div className="flex justify-between items-center min-w-[120px] ">
    //         <div className="flex flex-col">
    //           <h1> Action By </h1>
    //         </div>
    //       </div>
    //     );
    //   },
    //   cell: ({ row }: any) => {
    //     const rowData = row?.original;

    //     return (
    //       <div className="flex justify-between">
    //         <div> {rowData?.approvedBy || "--"}</div>
    //       </div>
    //     );
    //   },
    // }),
    columnsHelper.accessor("actions", {
      header: () => {
        return (
          <div className="flex items-center min-w-[50px] ">
            <div className="flex flex-col">
              <h1> Status </h1>
            </div>
          </div>
        );
      },
      cell: ({ row }: any) => {
        let rowData = row.original;
        return (
          <div className="flex cursor-pointer">
            <div
              className="border"
              // onClick={() =>
              //   setShowNeftModal({ isOpen: true, modalData: rowData })
              // }
            >
              {rowData?.status === "Requested" ? (
                <span className="border-[0.5px] border-[#F0A22E] bg-[#FDF6EA] text-[#F0A22E] px-3 py-[4px] rounded-sm">
                  {"Requested"}
                </span>
              ) : rowData?.status === "REJECTED" ? (
                <span className="border-[0.5px] border-[#F35838] bg-[#FEEEEB] text-[#F35838] px-3 py-[4px] rounded-sm">
                  {capitalizeFirstLetter(rowData?.status)}
                </span>
              ) : rowData?.status === "SUCCESS" ? (
                <span className="border-[0.5px] border-[#7CCA62] bg-[#F2FAEF] text-[#7CCA62] px-3 py-[4px] rounded-sm">
                  {"Approved"}
                </span>
              ) : (
                "N/A"
              )}
            </div>
          </div>
        );
      },
    }),
  ];

  const onPageIndexChange = (paginationData: any) => {
    setCurrentPage(paginationData.currentPage);
  };

  const onPerPageItemChange = (paginationData: any) => {
    setItemsPerPage(paginationData.itemsPerPage);
    setCurrentPage(1);
  };

  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);
  };

  let debounceTimer: any;
  // const handleSearch = (value: string) => {
  //   setDebouncedSearchValue(value);
  // };

  const handleSearch = async (value: string) => {
    setSearchValue(value);
  };

  let params = ["transactionId"];

  const filterButton = () => {
    const actionHandler = () => {
      console.log("rowSelectedData", rowSelectedData);
    };

    if (isLgScreen) {
      return (
        <div className="grid grid-cols-3 gap-x-2 lg:flex">
          <div>
            {/* <TransactionSearchBox
              label="Search"
              value={debouncedSearchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleSearch(e.target.value);
              }}
              customPlaceholder="Search By Transaction Id"
              getFullContent={clearSearchValue}
            /> */}
            <SearchBox
              label="Search"
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleSearch(e.target.value);
              }}
              customPlaceholder="Search By Transaction Id"
              getFullContent={() => setSearchValue("")}
            />

            {/* <NewSearch
              page="/wallet/transaction-history"
              params={params}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearch(e.target.value)
              }
              value={searchValue}
            /> */}
          </div>
          {rowSelectedData.length > 0 && (
            <div className=" flex items-center ">
              <div className="rounded-md p-1 flex border border-[#A4A4A4]">
                <div
                  className="border-r border-[#A4A4A4]  px-3 py-1 flex items-center rounded-l-md cursor-pointer"
                  onClick={actionHandler}
                >
                  <img src={DeleteIconForLg} alt="" className=" w-[17px]" />
                </div>
                <div
                  className="px-3 py-1 flex items-center rounded-r-md cursor-pointer"
                  onClick={actionHandler}
                >
                  <img src={editIcon} alt="" className=" w-[17px]" />
                </div>
              </div>
            </div>
          )}
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

  const applyFilterforTransaction = () => {
    setIsFilterLoading(true);
  };

  const render = () => {
    if (renderingComponents === 0) {
      return (
        <div>
          <CustomTable
            rowData={data || []}
            columnsData={PassbookColumns(setSortOrder)}
            setRowSelectedData={setRowSelectedData}
          />
        </div>
      );
    } else if (renderingComponents === 1) {
      return (
        <CustomTable rowData={[]} columnsData={cashbackDetailsColumns()} />
      );
    } else if (renderingComponents === 2) {
      return <CustomTable rowData={data || []} columnsData={columns} />;
    }
  };

  // const errorFun = () => {
  //   throw new Error("Hii");
  // };

  return (
    <>
      {isActive ? (
        <>
          <div>
            <Breadcrum label="Transaction History" />
          </div>

          <div className="flex flex-col">
            <div className="mx-4">
              <div className="lg:flex justify-between lg:mt-2 lg:mb-4">
                <div>
                  <ScrollNav
                    arrayData={arrayData}
                    showNumber={false}
                    setScrollIndex={setScrollIndex}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="">
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
                      // isClearable={true}
                      dateFormat="dd/MM/yyyy"
                      customInput={
                        <DateButton
                          text="Select From & To Date" // Text for the button
                          onClick={() => {}} // onClick is managed by DatePicker
                          className="h-[36px]"
                          value={
                            startDate && endDate
                              ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                              : ""
                          } // Display date range
                          onClear={handleClear} // Handle clear action
                        />
                      } // Include placeholder onClick function
                    />
                  </div>
                  <div className="hidden lg:block">{filterButton()}</div>
                  <OneButton
                    text="FILTER"
                    onClick={() => setFilterModal(true)}
                    variant="quad"
                    showIcon={true}
                    icon={FilterIcon}
                    className="ml-2 !uppercase"
                  />
                </div>
              </div>

              {/* <div className="grid grid-cols-2 justify-center mt-4 h-[36px] lg:hidden">
                  <div className="flex items-center"></div>
                  <div className="flex items-center justify-end gap-x-2">
                    <div className="flex items-center justify-center border-[1px] py-2 px-4 rounded-md border-[#A4A4A4] col-span-2">
                      <img src={SelectIcon} alt="" />
                      <span className="ml-2 text-[#1C1C1C] text-[14px] font-medium">
                        SELECT
                      </span>
                    </div>
                  </div>
                </div> */}

              {loading ? (
                <div className="flex justify-center items-center lg:!py-2 lg:!px-4">
                  <Spinner />
                </div>
              ) : (
                <>
                  <div className="lg:hidden">
                    {data &&
                      data?.length !== 0 &&
                      data.map((passbookData: any, index: any) => (
                        <div
                          className="mt-4"
                          key={`${index}_${passbookData?.transactionId}`}
                        >
                          <PassbookHistory
                            data={{
                              title: passbookData.transactionId,
                              rupee: "500",
                              date: "July 9, 2023",
                              credited:
                                passbookData?.type === "credit"
                                  ? passbookData.amount
                                  : "0",
                              debited:
                                passbookData?.type === "credit"
                                  ? "0"
                                  : passbookData.amount,
                              balance: passbookData?.balance,
                              status: passbookData?.status,
                              paymentGatewayName:
                                passbookData?.paymentGatewayName,
                              privateCompanyId: passbookData?.privateCompanyId,
                              remark: passbookData.remark,
                              discription: passbookData.description,
                              orderId: passbookData.orderId,
                              amount: passbookData.amount,
                              slabAmount: "0",
                              redeemAmount: "0",
                              redeemPoint: "0",
                              type: passbookData?.type,
                            }}
                          />
                        </div>
                      ))}
                  </div>

                  <div>
                    {isLgScreen && (
                      <div className="customScroll">{render()}</div>
                    )}
                  </div>

                  {/* {totalItemCount > 0 && ( */}

                  {/* {(renderingComponents === 0 || renderingComponents === 2) && ( */}
                  <Pagination
                    totalItems={totalItemCount}
                    itemsPerPageOptions={[
                      10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000,
                    ]}
                    onPageChange={onPageIndexChange}
                    onItemsPerPageChange={onPerPageItemChange}
                    pageNo={currentPage}
                    initialItemsPerPage={itemsPerPage}
                    className="!mx-0"
                   
                  />
                </>
              )}
            </div>
            {/* filter */}
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
                  <TransactionFilter
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
                  <OneButton
                    text="RESET ALL"
                    onClick={() => {
                      window.location.reload();
                      setFilterModal(false);
                    }}
                    className=" px-5  "
                    variant="secondary"
                  />
                  {/* <ServiceButton
                text="RESET ALL"
                onClick={() => {
                  window.location.reload();
                  setFilterModal(false);
                }}
                className="bg-[#FFFFFF] text-[#1C1C1C] text-sm font-semibold leading-5 lg:!py-2 lg:!px-4 "
              /> */}
                  {isFilterLoading ? (
                    <div className="flex justify-center items-center lg:!py-2 lg:!px-4">
                      <Spinner />
                    </div>
                  ) : (
                    <OneButton
                      text="APPLY"
                      onClick={applyFilterforTransaction}
                      className=" px-5  "
                      variant="primary"
                    />

                    // <ServiceButton
                    //   text="APPLY"
                    //   onClick={applyFilterforTransaction}
                    //   className="bg-[#1C1C1C] text-[#FFFFFF] cursor-pointer text-sm font-semibold leading-5 lg:!py-2 lg:!px-4 "
                    // />
                  )}
                </div>
              </div>
            </RightSideModal>
          </div>
        </>
      ) : (
        <div>
          <AccessDenied />
        </div>
      )}
    </>
  );
};
