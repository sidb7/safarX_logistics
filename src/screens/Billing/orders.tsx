import React, { useState, useEffect } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { ScrollNav } from "../../components/ScrollNav";
import { SearchBox } from "../../components/SearchBox";
import PaginationComponent from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import OrdersData from "./BillingData/ordersData";
import ServiceButton from "../../components/Button/ServiceButton";
import {
  DOWNLOAD_ORDER_BILLED_CSV,
  GET_BILLED_ORDERS,
} from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import { downloadCSVFromString } from "../../utils/helper";

interface IOrdersProps {}

const Orders: React.FunctionComponent<IOrdersProps> = (props) => {
  const navigate = useNavigate();
  const [totalItemCount, setTotalItemCount] = useState<any>(10);
  const [renderingComponents, setRenderingComponents] = useState(0);
  const [data, setData] = useState<any>([]);
  const arrayData = [
    { label: "Orders" },
    { label: "Invoice" },
    { label: "Credit Note" },
    { label: "Cod" },
  ];

  const render = (id: any) => {
    if (id === 0) {
      navigate("/billing/orders");
    } else if (id === 1) {
      navigate("/billing/invoices");
    } else if (id === 2) {
      navigate("/billing/credit-notes");
    } else if (id === 3) {
      navigate("/billing/cod");
    }
  };

  //on page change index
  let onPageIndexChange = (data: any) => {
    console.log("data", data);
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

    getBilledOrders(payload);
  };

  // on per page item change
  const onPerPageItemChange = () => {
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

    getBilledOrders(payload);
  };

  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);
    render(id);
  };

  const handleDownloadOrderCSV = async () => {
    try {
      const response = await POST(DOWNLOAD_ORDER_BILLED_CSV);
      downloadCSVFromString(response.data, "orderbilling_invoices.csv");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getBilledOrders = async (data?: any) => {
    try {
      const response = await POST(GET_BILLED_ORDERS);
      setData(response?.data?.data);
      setTotalItemCount(response?.data?.total);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBilledOrders();
  }, []);

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
            <div>
              <ServiceButton
                text="Download"
                className="bg-[#1C1C1C] text-[#FFFFFF] lg:w-[100px]"
                onClick={handleDownloadOrderCSV}
              />
            </div>
            <div>
              {/* <SearchBox label="Search" value="" onChange={() => {}} /> */}
            </div>
          </div>
        </div>
        {/* <p>table for orders </p> */}
        <div className="mx-4">
          <OrdersData data={data} />
        </div>

        {totalItemCount > 0 && (
          <PaginationComponent
            totalItems={totalItemCount}
            itemsPerPageOptions={[10, 20, 30, 50]}
            onPageChange={onPageIndexChange}
            onItemsPerPageChange={onPerPageItemChange}
          />
        )}
      </div>
    </>
  );
};

export default Orders;
