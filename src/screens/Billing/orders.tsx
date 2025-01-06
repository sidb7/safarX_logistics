import React, { useState, useEffect } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { ScrollNav } from "../../components/ScrollNav";
import { SearchBox } from "../../components/SearchBox";
import PaginationComponent from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import OrdersData from "./BillingData/ordersData";
import ServiceButton from "../../components/Button/ServiceButton";
import {
  COMPANY_NAME,
  DOWNLOAD_ORDER_BILLED_CSV,
  GET_BILLED_ORDERS,
} from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import { downloadCSVFromString } from "../../utils/helper";
import { ResponsiveState } from "../../utils/responsiveState";
import BillingOrdersCard from "./BillingOrdersCard";
import { Spinner } from "../../components/Spinner";

interface IOrdersProps {}

const Orders: React.FunctionComponent<IOrdersProps> = (props) => {
  const navigate = useNavigate();
  const [totalItemCount, setTotalItemCount] = useState<any>(10);
  const [renderingComponents, setRenderingComponents] = useState(0);
  const [data, setData] = useState<any>([]);
  const { isLgScreen, isMdScreen } = ResponsiveState();
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const arrayData = [
    { label: "Orders" },
    { label: "Invoice" },
    // { label: "Credit Note" },
    { label: "Cod" },
  ];

  const render = (id: any) => {
    if (id === 0) {
      navigate("/billing/orders");
    } else if (id === 1) {
      navigate("/billing/invoices");
    }
    // else if (id === 2) {
    //   navigate("/billing/credit-notes");
    // }
    else if (id === 2) {
      navigate("/billing/cod");
    }
  };

  //on page change index
  let onPageIndexChange = (paginationData: any) => {
    setCurrentPage(paginationData.currentPage);
    // const payload: any = {
    //   skip: 0,
    //   limit: 0,
    //   pageNo: 0,
    // };

    // if (data?.currentPage === 1) {
    //   payload.skip = 0;
    //   payload.limit = data?.itemsPerPage;
    //   payload.pageNo = 1;
    // } else {
    //   payload.skip = (data?.currentPage - 1) * data?.itemsPerPage;
    //   payload.limit = data?.itemsPerPage;
    //   payload.pageNo = data?.currentPage || 0;
    // }

    // getBilledOrders(payload);
  };

  // on per page item change
  const onPerPageItemChange = (paginationData: any) => {
    setItemsPerPage(paginationData.itemsPerPage);
    setCurrentPage(1);
    // const payload: any = {
    //   skip: 0,
    //   limit: 0,
    //   pageNo: 0,
    // };

    // if (data?.currentPage === 1) {
    //   payload.skip = 0;
    //   payload.limit = data?.itemsPerPage;
    //   payload.pageNo = 1;
    // } else {
    //   payload.skip = 0;
    //   payload.limit = data?.itemsPerPage;
    //   payload.pageNo = data?.currentPage || 0;
    // }

    // getBilledOrders(payload);
  };

  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);
    render(id);
  };

  const handleDownloadOrderCSV = async () => {
    try {
      setDownloadLoading(true);
      const response = await POST(DOWNLOAD_ORDER_BILLED_CSV);
      downloadCSVFromString(response.data, "orderbilling_invoices.csv");
      setDownloadLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getBilledOrders = async (payloads?: any) => {
    try {
      setIsLoading(true);
      const payload = {
        skip: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
        pageNo: currentPage,
      };

      const { data: response } = await POST(GET_BILLED_ORDERS, { ...payload });
      if (response?.success) {
        setData(response?.data);
        setTotalItemCount(response?.total);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBilledOrders();
  }, [itemsPerPage, currentPage]);

  return (
    <>
      <div>
        <Breadcrum label="Billing" />
        <div className="lg:flex justify-between mx-4 lg:mt-2 lg:mb-4">
          <div>
            <ScrollNav
              arrayData={arrayData}
              showNumber={false}
              setScrollIndex={setScrollIndex}
              defaultIndexValue={0}
            />
          </div>
          <div>
            <div className={`${!isLgScreen ? " flex justify-end" : ""}`}>
              {downloadLoading ? (
                <div className="border py-2 w-[100px] flex items-center justify-center ">
                  <Spinner />
                </div>
              ) : (
                <ServiceButton
                  text="Download"
                  className={`bg-[#1C1C1C] text-[#FFFFFF] w-[100px] ${
                    !isLgScreen ? "mt-4" : ""
                  }`}
                  onClick={handleDownloadOrderCSV}
                />
              )}
            </div>
            <div>
              {/* <SearchBox label="Search" value="" onChange={() => {}} /> */}
            </div>
          </div>
        </div>
        {/* <p>table for orders </p> */}

        {isLoading ? (
          <div className="py-4  flex items-center justify-center ">
            <Spinner />
          </div>
        ) : isLgScreen ? (
          <>
            <div className="mx-4">
              <OrdersData data={data} />
            </div>
            {isLgScreen && totalItemCount > 0 && (
              <PaginationComponent
                totalItems={totalItemCount}
                itemsPerPageOptions={[10, 20, 30, 50]}
                onPageChange={onPageIndexChange}
                onItemsPerPageChange={onPerPageItemChange}
              />
            )}
          </>
        ) : (
          <div className="mx-4">
            {data.map((order: any) => (
              <BillingOrdersCard
                key={order.orderId}
                data={{
                  status: order.status,
                  orderId: order["order id"],
                  amount: order.totalOrders,
                  sku: order.SKU,
                  trackingId: order["Tracking Number"],
                  shipyaariId: order[`${COMPANY_NAME} ID`],
                  courierName: order["Courier Name"],
                  prodDimensions: order["Product Dimensions"],
                  VolumetricWeight: order["Dimension Weight"],
                  DeadWeight: order["Dead Weight"],
                  BillableWeight: order["Billable Weight"],
                  Price: order["Total Invoice Value"],
                  FWD: order["Applied Forward Amount"],
                  RTO: order["Applied Rto Amount"],
                  TotalAmount: order["Applied Total Amount"],
                  GST: order["GST Total"],
                  ShippedValue: order["Total Shipping Bill value"],
                  WA: order.wa,
                  SMS: order.sms,
                  ExcessForward: order["Excess Forward amount"],
                  ExcessRTO: order["Excess RTO amount"],
                  ExcessTotal: order["Excess Total Amount"],
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
