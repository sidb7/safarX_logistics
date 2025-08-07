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
import OneButton from "../../../components/Button/OneButton";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import Collapsible from "../../../components/OneComponents/Collapsible";

interface IOrdersProps {}

interface FilterState {
  requestType: string[];
  courierPartner: string[];
}

const NdrCancellationRequest: React.FunctionComponent<IOrdersProps> = () => {
  const navigate = useNavigate();

  const { isLgScreen, isXlScreen } = ResponsiveState();
  const [renderingComponents, setRenderingComponents] = useState(0);
  const [currentSellerRemark, setCurrentSellerRemark] = useState<any[]>([]);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedAWB, setSelectedAWB] = useState<string | null>(null);
  const [exceptionCount, setExceptionCount] = useState<any>([]);
  const [rtoCount, setRtoCount] = useState<any>(0);
  const [isLoadingSellerAction, setIsLoadingSellerAction] = useState<boolean>(false);
  const [cancelRequestData, setCancelRequestData] = useState<any>([]);
  const [openRightSideModal, setOpenRightSideModal] = useState<any>(false);
  const [searchText, setSearchText] = useState<any>("");
  const [loading, setIsLoading] = useState<any>(false);
  const [clearSearch, setClearSearch] = useState<any>(false);

  // Filter related states
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<{
    requestType: string[];
    courierPartner: string[];
  }>({
    requestType: [],
    courierPartner: []
  });
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    requestType: [],
    courierPartner: []
  });
  const [tempFilters, setTempFilters] = useState<FilterState>({
    requestType: [],
    courierPartner: []
  });

  const data = [{}];

  const handleSellerActionClick = async (sellerRemark: any[]) => {
    setCurrentSellerRemark(sellerRemark);
    setIsLoadingSellerAction(true);
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
      navigate("/tracking/update-tracking");
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

  // Filter handlers
  const handleFilterCheckboxChange = (
    filterType: keyof FilterState,
    value: string,
    isChecked: boolean
  ) => {
    setTempFilters(prev => ({
      ...prev,
      [filterType]: isChecked 
        ? [...prev[filterType], value]
        : prev[filterType].filter(item => item !== value)
    }));
  };

  const handleApplyFilters = () => {
    setSelectedFilters(tempFilters);
    setCurrentPage(1); // Reset to first page when applying filters
    setOpenFilterModal(false);
  };

  const handleResetFilters = () => {
    const resetFilters = { requestType: [], courierPartner: [] };
    setTempFilters(resetFilters);
    setSelectedFilters(resetFilters);
    setCurrentPage(1);
    setOpenFilterModal(false);
  };

  const handleOpenFilterModal = () => {
    setTempFilters(selectedFilters); // Initialize temp filters with current selection
    setOpenFilterModal(true);
  };

  const getAllTracingBuyerRequest = async () => {
    try {
      setIsLoading(true);
      
      // Create filterArr from selected filters in the required format
      const filterArr = [];
      
      if (selectedFilters.requestType.length > 0) {
        filterArr.push({ "requestType": { "$in": selectedFilters.requestType } });
      }
      
      if (selectedFilters.courierPartner.length > 0) {
        filterArr.push({ "courierPartnerName": { "$in": selectedFilters.courierPartner } });
      }

      const payload = {
        skip: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
        sort: { _id: -1 },
        pageNo: currentPage,
        searchText: searchText,
        filterArr: filterArr // Add filter array to payload
      };
      
      const data = await POST(GETALLTRACKINGBUYERREQUEST, payload);

      if (data?.data?.success) {
        setIsLoading(false);
        setCancelRequestData(data?.data?.data);
        setTotalItemsCount(data?.data?.totalCount);
        
        // Updated: Extract filter options from uniqueRequestTypes and uniqueCourierPartners
        if (data?.data?.uniqueRequestTypes) {
          setFilterOptions(prev => ({
            ...prev,
            requestType: data.data.uniqueRequestTypes
          }));
        }
        if (data?.data?.uniqueCourierPartners) {
          setFilterOptions(prev => ({
            ...prev,
            courierPartner: data.data.uniqueCourierPartners
          }));
        }
      } else {
        setIsLoading(false);
        setCancelRequestData(data?.data?.data || []);
        setTotalItemsCount(0);
      }
    } catch (error: any) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      getAllTracingBuyerRequest();
      if (clearSearch) {
        setClearSearch(false);
      }
    })();
  }, [searchText, currentPage, itemsPerPage, clearSearch, selectedFilters]);

  const renderFilterModal = () => (
    <RightSideModal
      isOpen={openFilterModal}
      onClose={() => setOpenFilterModal(false)}
      className="w-96"
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={() => setOpenFilterModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Request Type Filter */}
          <Collapsible
            title="Request Type"
            defaultOpen={true}
            className="border border-gray-200"
          >
            <div className="space-y-2 p-2">
              {filterOptions.requestType.map((type) => (
                <div key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tempFilters.requestType.includes(type)}
                    onChange={(e) => handleFilterCheckboxChange('requestType', type, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{type}</span>
                </div>
              ))}
            </div>
          </Collapsible>

          {/* Courier Partner Filter */}
          <Collapsible
            title="Courier Partner"
            defaultOpen={true}
            className="border border-gray-200"
          >
            <div className="space-y-2 p-2">
              {filterOptions.courierPartner.map((partner) => (
                <div key={partner} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tempFilters.courierPartner.includes(partner)}
                    onChange={(e) => handleFilterCheckboxChange('courierPartner', partner, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{partner}</span>
                </div>
              ))}
            </div>
          </Collapsible>
        </div>

        {/* Footer Buttons */}
        <div className="border-t p-4 space-y-3">
          <OneButton
            text="Apply Filters"
            onClick={handleApplyFilters}
            variant="primary"
            className="w-full"
          />
          <OneButton
            text="Reset All"
            onClick={handleResetFilters}
            variant="secondary"
            className="w-full"
          />
        </div>
      </div>
    </RightSideModal>
  );

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
                setClearSearch(true);
                setSearchText("");
              }}
              customPlaceholder="Search"
            />
          </div>
          <OneButton  
            text="Filter"
            onClick={handleOpenFilterModal}
            variant="secondary"
            className="mr-4"
          />
        </div>

        <div className="mx-4">
          <>
            {loading && cancelRequestData ? (
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
            itemsPerPageOptions={[
              10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000,
            ]}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            pageNo={currentPage}
            initialItemsPerPage={itemsPerPage}
          />
        )}
      </div>

      {/* Filter Modal */}
      {renderFilterModal()}
    </>
  );
};

export default NdrCancellationRequest;