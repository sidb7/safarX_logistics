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
import { GETALLTRACKINGBUYERREQUEST } from "../../../utils/ApiUrls";
import { Spinner } from "flowbite-react";

interface IOrdersProps {}

const NdrCancellationRequest: React.FunctionComponent<IOrdersProps> = () => {
  const navigate = useNavigate();

  // const [totalItemCount] = useState<number>(77);
  const { isLgScreen, isXlScreen } = ResponsiveState();
  const [renderingComponents, setRenderingComponents] = useState(0);
  const [currentSellerRemark, setCurrentSellerRemark] = useState<any[]>([]);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  // New state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedAWB, setSelectedAWB] = useState<string | null>(null);
  const [exceptionCount, setExceptionCount] = useState<any>([]);
  const [rtoCount, setRtoCount] = useState<any>(0);
  const [isLoadingSellerAction, setIsLoadingSellerAction] =
    useState<boolean>(false);
  const [cancelRequestData, setCancelRequestData] = useState<any>([]);
  const [openRightSideModal, setOpenRightSideModal] = useState<any>(false);
  const [searchText, setSearchText] = useState<any>("");
  const [loading, setIsLoading] = useState<any>(false);
  const [clearSearch, setClearSearch] = useState<any>(false);

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
    { label: "Buyer Request", number: totalItemsCount },
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
    console.log("id12345678", id);
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

  const getAllTracingBuyerRequest = async () => {
    try {
      setIsLoading(true);
      const payload = {
        skip: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
        sort: { _id: -1 },
        pageNo: currentPage,
        searchText: searchText,
      };
      const data = await POST(GETALLTRACKINGBUYERREQUEST, payload);

      if (data?.data?.success) {
        setIsLoading(false);
        setCancelRequestData(data?.data?.data);
        setTotalItemsCount(data?.data?.totalCount);
      } else {
        setIsLoading(false);
        setCancelRequestData(data?.data?.data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      getAllTracingBuyerRequest();
      if (clearSearch) {
        setClearSearch(false); // Reset the state after the API call
      }
    })();
  }, [searchText, currentPage, itemsPerPage, clearSearch]);

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
              onChange={(e: any) => {
                setSearchText(e.target.value);
              }}
              value={searchText}
              getFullContent={() => {
                setClearSearch(true); // Trigger full data fetch

                setSearchText(""); // Clear search text
              }}
              customPlaceholder="Search"
            />
          </div>
        </div>

        <div className="mx-4">
          <>
            {loading ? (
              <div className="flex w-full justify-center items-center h-[600px]">
                <Spinner />
              </div>
            ) : (
              <CancellationRequestTable
                cancelRequestData={cancelRequestData}
                openRightSideModal={openRightSideModal}
                setOpenRightSideModal={setOpenRightSideModal}
                getAllTracingBuyerRequest={getAllTracingBuyerRequest}
              />
            )}
          </>
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
