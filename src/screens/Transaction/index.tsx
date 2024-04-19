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

import { useErrorBoundary } from "react-error-boundary";

const arrayData = [{ label: "Passbook" }, { label: "Cashback" }];

export const Transaction = () => {
  const [sortOrder, setSortOrder] = useState("desc");
  const { showBoundary } = useErrorBoundary() || {};

  const navigate = useNavigate();
  const roles = useSelector((state: any) => state?.roles);
  // const isActive = roles.roles?.[0]?.menu?.[3]?.menu?.[1]?.pages?.[0]?.isActive;
  const isActive = checkPageAuthorized("Transaction History");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [renderingComponents, setRenderingComponents] = useState(0);
  const { isLgScreen } = ResponsiveState();
  const [loading, setLoading] = useState(false);
  const [data, setData]: any = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowSelectedData, setRowSelectedData]: any = useState([]);

  useEffect(() => {
    if (renderingComponents === 0) {
      // setLoading(true);
      (async () => {
        const { data } = await POST(GET_WALLET_TRANSACTION, {
          filter: {
            status: "",
            from: "",
            to: "",
          },
          skip: (currentPage - 1) * itemsPerPage,
          limit: itemsPerPage,
          pageNo: currentPage,
          sort: { _id: sortOrder === "desc" ? -1 : 1 },
          searchValue: debouncedSearchValue,
        });

        if (data?.success) {
          setData(data.data || []);
          setTotalItemCount(data.totalTransactions);
          // throw new Error("Some Issue");
          // setLoading(false);
        } else {
          toast.error(data?.message);
          showBoundary(data?.message);
          // throw new Error("Some Issue");
          // setLoading(false);
        }
      })();
    }
  }, [
    renderingComponents,
    itemsPerPage,
    currentPage,
    sortOrder,
    debouncedSearchValue,
  ]);

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
  const handleSearch = (value: string) => {
    setDebouncedSearchValue(value);
  };
  const clearSearchValue = () => {
    setDebouncedSearchValue("");
  };

  const filterButton = () => {
    const actionHandler = () => {
      console.log("rowSelectedData", rowSelectedData);
    };

    if (isLgScreen) {
      return (
        <div className="grid grid-cols-3 gap-x-2 lg:flex">
          <div>
            <TransactionSearchBox
              label="Search"
              value={debouncedSearchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleSearch(e.target.value);
              }}
              customPlaceholder="Search By Transaction Id"
              getFullContent={clearSearchValue}
            />
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

  const render = () => {
    if (renderingComponents === 0) {
      return (
        <CustomTable
          data={data || []}
          columns={PassbookColumns(setSortOrder)}
          setRowSelectedData={setRowSelectedData}
          thclassName={"!w-auto "}
          tdclassName={"!w-auto"}
        />
      );
    } else if (renderingComponents === 1) {
      return <CustomTable data={[]} columns={cashbackDetailsColumns()} />;
    }
  };

  // const errorFun = () => {
  //   throw new Error("Hii");
  // };

  return (
    <>
      {isActive ? (
        loading ? (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        ) : (
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
                  <div className="hidden lg:block">{filterButton()}</div>
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
                  {isLgScreen && <div className="customScroll">{render()}</div>}
                </div>

                {/* {totalItemCount > 0 && ( */}

                {renderingComponents === 0 && (
                  <Pagination
                    totalItems={totalItemCount}
                    itemsPerPageOptions={[10, 20, 30, 50]}
                    onPageChange={onPageIndexChange}
                    onItemsPerPageChange={onPerPageItemChange}
                    pageNo={currentPage}
                    initialItemsPerPage={itemsPerPage}
                    className="!mx-0"
                    rightmodalPagination={true}
                  />
                )}

                {/* )} */}
              </div>
            </div>
          </>
        )
      ) : (
        <div>
          <AccessDenied />
        </div>
      )}
    </>
  );
};
