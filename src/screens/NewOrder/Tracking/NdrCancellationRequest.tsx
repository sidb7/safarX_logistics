import React, { useState, useEffect } from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import { ScrollNav } from "../../../components/ScrollNav";
import { SearchBox } from "../../../components/SearchBox";
import PaginationComponent from "../../../components/Pagination";
import ServiceButton from "../../../components/Button/ServiceButton";
import { ResponsiveState } from "../../../utils/responsiveState";
import OrderData from "./OrderData";
import { useNavigate } from "react-router-dom";

import { POST } from "../../../utils/webService";

import CancellationRequestTable from "./CancellationRequestTable";

import NewTrackingContent from "../../Order/newTrackingContent";

interface IOrdersProps {}

const NdrCancellationRequest: React.FunctionComponent<IOrdersProps> = () => {
  const navigate = useNavigate();

  // const [totalItemCount] = useState<number>(77);
  const { isLgScreen, isXlScreen } = ResponsiveState();
  const [renderingComponents, setRenderingComponents] = useState(0);
  const [currentSellerRemark, setCurrentSellerRemark] = useState<any[]>([]);
  const [totalItemsCount, setTotalItemsCount] = useState(10);
  // New state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedAWB, setSelectedAWB] = useState<string | null>(null);
  const [exceptionCount, setExceptionCount] = useState<any>([]);
  const [rtoCount, setRtoCount] = useState<any>(0);
  const [isLoadingSellerAction, setIsLoadingSellerAction] =
    useState<boolean>(false);
  const [cancelRequestData, setCancelRequestData] = useState<any>([
    {
      custContactDetail: 9959623900,
      trackingNo: "SPN81903020001",
      edd: "22-10-24",
      currentStatus: "NA",
      custRequest: "NA",
      sellerAction: "NA",
      remark: "A: Request raised to bluedart (Auto trigger)",
      requestType: "Cancel",
    },
    {
      custContactDetail: 9959623900,
      trackingNo: "SPN81903020001",
      edd: "22-10-24",
      currentStatus: "NA",
      custRequest: "NA",
      sellerAction: "NA",
      remark: "A: Request raised to bluedart (Auto trigger)",
      requestType: "Cancel",
    },
    {
      custContactDetail: 9959623900,
      trackingNo: "SPN81903020001",
      edd: "22-10-24",
      currentStatus: "In Transit",
      custRequest: "NA",
      sellerAction: "NA",
      remark: "A: Request raised to bluedart (Auto trigger)",
      requestType: "Cancel",
    },
    {
      custContactDetail: 9959623900,
      trackingNo: "SPN81903020001",
      edd: "22-10-24",
      currentStatus: "In Transit",
      custRequest: "NA",
      sellerAction: "NA",
      remark: "A: Request raised to bluedart (Auto trigger)",
    },
    {
      custContactDetail: 9959623900,
      trackingNo: "SPN81903020001",
      edd: "22-10-24",
      currentStatus: "In Transit",
      custRequest: "NA",
      sellerAction: "NA",
      remark: "A: Request raised to bluedart (Auto trigger)",
      requestType: "Cancel",
    },
    {
      custContactDetail: 9959623900,
      trackingNo: "SPN81903020001",
      edd: "22-10-24",
      currentStatus: "In Transit",
      custRequest: "NA",
      sellerAction: "NA",
      remark: "A: Request raised to bluedart (Auto trigger)",
      requestType: "Cancel",
    },
    {
      custContactDetail: 9959623900,
      trackingNo: "SPN81903020001",
      edd: "22-10-24",
      currentStatus: "In Transit",
      custRequest: "NA",
      sellerAction: "NA",
      remark: "A: Request raised to bluedart (Auto trigger)",
      requestType: "Cancel",
    },
    {
      custContactDetail: 9959623900,
      trackingNo: "SPN81903020001",
      edd: "22-10-24",
      currentStatus: "In Transit",
      custRequest: "NA",
      sellerAction: "NA",
      remark: "A: Request raised to bluedart (Auto trigger)",
    },
    {
      custContactDetail: 9959623900,
      trackingNo: "SPN81903020001",
      edd: "22-10-24",
      currentStatus: "In Transit",
      custRequest: "NA",
      sellerAction: "NA",
      remark: "A: Request raised to bluedart (Auto trigger)",
      requestType: "Cancel",
    },
    {
      custContactDetail: 9959623900,
      trackingNo: "SPN81903020001",
      edd: "22-10-24",
      currentStatus: "NA",
      custRequest: "NA",
      sellerAction: "NA",
      remark: "A: Request raised to bluedart (Auto trigger)",
      requestType: "Cancel",
    },
    {
      custContactDetail: 9959623900,
      trackingNo: "SPN81903020001",
      edd: "22-10-24",
      currentStatus: "In Transit",
      custRequest: "NA",
      sellerAction: "NA",
      remark: "A: Request raised to bluedart (Auto trigger)",
      requestType: "Cancel",
    },
    {
      custContactDetail: 9959623900,
      trackingNo: "SPN81903020001",
      edd: "22-10-24",
      currentStatus: "In Transit",
      custRequest: "NA",
      sellerAction: "NA",
      remark: "A: Request raised to bluedart (Auto trigger)",
      requestType: "Cancel",
    },
    {
      custContactDetail: 9959623900,
      trackingNo: "SPN81903020001",
      edd: "22-10-24",
      currentStatus: "NA",
      custRequest: "NA",
      sellerAction: "NA",
      remark: "A: Request raised to bluedart (Auto trigger)",
      requestType: "Cancel",
    },
  ]);
  const data = [{}];

  const handleSellerActionClick = async (sellerRemark: any[]) => {
    setCurrentSellerRemark(sellerRemark);
    setIsLoadingSellerAction(true); // Start loading
  };

  const handleInfoIconClick = (awb: string) => {
    setSelectedAWB(awb);
    console.log("awb from tabel", selectedAWB);
  };

  const arrayData = [
    { label: "Exception NDR", number: 0 },
    { label: "RTO", number: rtoCount || 0 },
    { label: "Update Tracking", number: 0 },
  ];

  const render = (id: number) => {
    if (id === 0) {
      navigate("/tracking/exception-ndr");
    } else if (id === 1) {
      navigate("/tracking/rto");
    } else if (id === 2) {
      navigate("/tracking/cancellation-request");
    }
  };

  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);
    render(id);
  };

  const handlePageChange = ({ currentPage }: { currentPage: number }) => {
    setCurrentPage(currentPage);
  };

  const handleItemsPerPageChange = ({
    itemsPerPage,
  }: {
    itemsPerPage: number;
  }) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  return (
    <>
      <div>
        <Breadcrum label="Tracking" />
        <div className="flex flex-wrap items-center justify-between mx-4 lg:mt-2 lg:mb-4">
          <div className="flex-shrink-0 mr-4 mb-2 lg:mb-0">
            <ScrollNav
              arrayData={arrayData}
              showNumber={true}
              setScrollIndex={setScrollIndex}
              defaultIndexValue={2}
            />
          </div>
        </div>

        <div className="flex flex-row-reverse items-center flex-grow">
          <div className="flex mr-4">
            <SearchBox
              label="Search"
              onChange={() => {}}
              value={""}
              customPlaceholder="Search"
            />
          </div>
        </div>

        <div className="mx-4">
          <CancellationRequestTable cancelRequestData={cancelRequestData} />
        </div>

        {isLgScreen && totalItemsCount > 0 && (
          <PaginationComponent
            totalItems={totalItemsCount}
            itemsPerPageOptions={[10, 20, 30, 50]}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            pageNo={currentPage}
            initialItemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </>
  );
};

export default NdrCancellationRequest;
