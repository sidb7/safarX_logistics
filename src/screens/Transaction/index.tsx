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
import { toast } from "react-toastify";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { Spinner } from "../../components/Spinner";
import { useSelector } from "react-redux";
import AccessDenied from "../../components/AccessDenied";
import Pagination from "../../components/Pagination";

const arrayData = [{ label: "Passbook" }, { label: "Cashback" }];

export const Transaction = () => {
  const navigate = useNavigate();
  const roles = useSelector((state: any) => state?.roles);
  const isActive = roles.roles?.[0]?.menu?.[3]?.menu?.[1]?.pages?.[0]?.isActive;

  const [totalItemCount, setTotalItemCount] = useState(0);
  const [renderingComponents, setRenderingComponents] = useState(0);
  const { isLgScreen } = ResponsiveState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData]: any = useState([]);

  const fetchData = async (data?: any) => {
    console.log("data", data);
    setLoading(true);
    const payload = {
      filter: {
        status: "",
        from: "",
        to: "",
      },

      sort: { _id: -1 },
      skip: data?.skip || 0,
      pageNo: data?.pageNo || 1,
      limit: data?.limit || 10,
      searchValue: "",
    };
    try {
      const { data } = await POST(GET_WALLET_TRANSACTION, payload);
      let transactionCount = data?.data?.length || 0;

      if (data?.success) {
        setData(data.data || []);
        setTotalItemCount(transactionCount ? transactionCount : 0);
        setLoading(false);
      } else {
        toast.error(data?.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onPageIndexChange = (data: any) => {
    const payload: any = {
      skip: 0,
      limit: 0,
      pageNo: 0,
    };

    if (data?.currentPage === 1) {
      payload.skip = 0;
      payload.limit = data?.itemsPerPage;
      payload.pageNo = 1;
    } else {
      payload.skip = (data?.currentPage - 1) * data?.itemsPerPage;
      payload.limit = data?.itemsPerPage;
      payload.pageNo = data?.currentPage || 0;
    }

    fetchData(payload);
  };

  const onPerPageItemChange = (data: any) => {
    const payload: any = {
      skip: 0,
      limit: 0,
      pageNo: 0,
    };

    if (data?.currentPage === 1) {
      payload.skip = 0;
      payload.limit = data?.itemsPerPage;
      payload.pageNo = 1;
    } else {
      payload.skip = 0;
      payload.limit = data?.itemsPerPage;
      payload.pageNo = data?.currentPage || 0;
    }

    fetchData(payload);
  };

  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);
  };

  const filterButton = () => {
    if (isLgScreen) {
      return (
        <div className="grid grid-cols-3 gap-x-2 lg:flex">
          <div>
            <SearchBox label="Search" value="" onChange={() => {}} />
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

  const render = () => {
    if (renderingComponents === 0) {
      return <CustomTable data={data} columns={PassbookColumns()} />;
    } else if (renderingComponents === 1) {
      return <CustomTable data={data} columns={cashbackDetailsColumns()} />;
    }
  };

  console.log("totalCount", totalItemCount);

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

                <div className="grid grid-cols-2 justify-center mt-4 h-[36px] lg:hidden">
                  <div className="flex items-center"></div>
                  <div className="flex items-center justify-end gap-x-2">
                    <div className="flex items-center justify-center border-[1px] py-2 px-4 rounded-md border-[#A4A4A4] col-span-2">
                      <img src={SelectIcon} alt="" />
                      <span className="ml-2 text-[#1C1C1C] text-[14px] font-medium">
                        SELECT
                      </span>
                    </div>
                  </div>
                </div>

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
                    <div className="overflow-x-auto">{render()}</div>
                  )}
                </div>

                {totalItemCount > 0 && (
                  <Pagination
                    totalItems={totalItemCount}
                    itemsPerPageOptions={[10, 20, 30, 50]}
                    onPageChange={onPageIndexChange}
                    onItemsPerPageChange={onPerPageItemChange}
                  />
                )}
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
