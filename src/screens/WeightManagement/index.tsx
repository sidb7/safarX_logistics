import React, { useCallback, useEffect, useRef, useState } from "react";

import { toast } from "react-hot-toast";
import { Breadcrum } from "../../components/Layout/breadcrum";
import WeightFreezeBanner from "./WeightFreezeBanner";
import BottomLayout from "../../components/Layout/bottomLayout";
import WeightFreezeTable from "./WeightFreezetable";
import NewDiscrepancyTable from "./Newdiscrepancy";
import PendingDispute from "./PendingDispute";
import CompletedTable from "./CompletedTable";
import CustomButton from "../../components/Button";
import addIcon from "../../assets/Catalogue/add.svg";
import RightSideModal from "../../components/CustomModal/customRightModal";
import DiscrepancyDetails from "./DiscrepancyDetailModal";
import { useSelector } from "react-redux";
import AccessDenied from "../../components/AccessDenied";
import { checkPageAuthorized } from "../../redux/reducers/role";
import { POST } from "../../utils/webService";
import { GET_WRIGHT_DISPUTE } from "../../utils/ApiUrls";
import Pagination from "../../components/Pagination";
import { SearchBox } from "../../components/SearchBox";

const WeightFreeze: React.FunctionComponent = () => {
  const roles = useSelector((state: any) => state?.roles);
  const [renderingComponents, setRenderingComponents] = React.useState<any>(0);
  const [weightManagementData, setWeightManagementdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchedText, setSearchedText] = useState("");

  const [isActive, setIsActive] = useState<any>(false);

  const [isActiveFreezeweight, setActiveFreezeweight] = useState(true);
  const [filterId, setFilterId] = useState(0);
  const [activeTab, setActiveTab] = useState("Weight-Freeze");
  const [tabName, setTabName] = useState(
    sessionStorage.getItem("WeightTab") || "Weight-Freeze"
  );

  const [selectedRowdata, setSelectedRowData] = useState([]);

  const [filterData, setFilterData] = useState([
    { label: "Weight-Freeze", isActive: false },
    { label: "New Discrepancy", isActive: false },
    { label: "Pending Dispute", isActive: false },
    { label: "Completed", isActive: false },
  ]);
  const [showRaiseTicket, setShowRaiseTicket] = useState(false);
  const [discrepancyDetailsModal, setDiscrepancyDetailsModal] = useState(false);
  const [discrepancyDetailsRightModal, setDiscrepancyDetailsRightModal] =
    useState(false);

  const [cartStatus, setcartStatus] = useState([
    {
      count: 0,
      text: "Total Weight Descripancy",
      name: "totalWeightDisputeCount",
    },
    {
      count: 0,
      text: "Dispute accepted by Courier",
      name: "totalWeightDisputeAccepetedByPartner",
    },
    {
      count: `0`,
      text: "Dispute accepted by Seller",
      name: "totalWeightDisputeAccepetedBySeller",
    },
    {
      count: 0,
      text: "Action Required",
      name: "totalWeightDisputePending",
    },
  ]);

  const [listTab, setListTab] = useState([
    {
      key: "Weight_Freeze",
      statusName: "Weight-Freeze",
      name: "",
      count: 0,
      payload: "",
      index: 0,
    },
    {
      key: "New_Discrepancy",
      statusName: "New Discrepancy",
      name: "totalNewWeightDispute",
      count: 0,
      payload: "DISPUTE_RAISED_TO_SELLER",
      index: 1,
    },
    {
      key: "Pending_Dispute",
      statusName: "Pending Dispute",
      name: "totalWeightDisputePending",
      count: 0,
      payload: [
        { actionStatus: "PROOF_SUBMITTED_BY_SELLER" },
        { actionStatus: "PROOF_TO_BE_SUBMITTED" },
      ],
      index: 2,
    },
    {
      key: "Completed",
      statusName: "Completed",
      name: "totalWeightDisputeResolved",
      count: 0,
      payload: "",
      index: 3,
    },
  ]);

  //   {
  //     key: "Weight_Freeze",
  //     statusName: "Weight-Freeze",
  //     name: "",
  //     count: 0,
  //     payload: "",
  //     index: 0,
  //   },
  //   {
  //     key: "New_Discrepancy",
  //     statusName: "New Discrepancy",
  //     name: "totalNewWeightDispute",
  //     count: 0,
  //     payload: "DISPUTE_RAISED_TO_SELLER",
  //     index: 1,
  //   },
  //   {
  //     key: "Pending_Dispute",
  //     statusName: "Pending Dispute",
  //     name: "totalWeightDisputePending",
  //     count: 0,
  //     payload: [
  //       { actionStatus: "PROOF_SUBMITTED_BY_SELLER" },
  //       { actionStatus: "PROOF_TO_BE_SUBMITTED" },
  //     ],
  //     index: 2,
  //   },
  //   {
  //     key: "Completed",
  //     statusName: "Completed",
  //     name: "totalWeightDisputeResolved",
  //     count: 0,
  //     payload: "",
  //     index: 3,
  //   },
  // ];

  const setScrollIndex = (id: any) => {
    let filterName = listTab.filter((array) => array?.index === id);
    let filterNewUrl = filterName[0]?.statusName
      .toLocaleLowerCase()
      .replace(/ /g, "-");

    const newUrl = `/weight-management/${filterNewUrl}`;

    window.history.pushState(null, "", newUrl);
    setRenderingComponents(id);
  };

  const renderHeaderComponent = () => {
    return (
      <CustomButton
        icon={addIcon}
        showIcon={true}
        text={"RAISE TICKET"}
        className="!p-3"
        onClick={() => {
          setShowRaiseTicket(true);
        }}
      />
    );
  };

  const onPageIndexChange = (paginationData: any) => {
    setCurrentPage(paginationData.currentPage);
  };

  const onPerPageItemChange = (paginationData: any) => {
    setItemsPerPage(paginationData.itemsPerPage);
    setCurrentPage(1);
  };

  const renderComponent = () => {
    if (renderingComponents === 0) {
      return <WeightFreezeTable />;
    } else if (renderingComponents === 1) {
      return (
        <NewDiscrepancyTable
          data={weightManagementData}
          getWeightDispute={getWeightDispute}
          isLoading={isLoading}
          setRowSelectedData={setSelectedRowData}
        />
      );
    } else if (renderingComponents === 2) {
      return (
        <PendingDispute
          data={weightManagementData}
          getWeightDispute={getWeightDispute}
          isLoading={isLoading}
          setRowSelectedData={setSelectedRowData}
        />
      );
    } else if (renderingComponents === 3) {
      return (
        <CompletedTable
          data={weightManagementData}
          getWeightDispute={getWeightDispute}
          isLoading={isLoading}
          setRowSelectedData={setSelectedRowData}
        />
      );
    }
  };
  const GetCurrentPath = () => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const location = url;
    const path = location.pathname;
    const pathArray = path.split("/");
    const removedFirstPath = pathArray.slice(1);
    return removedFirstPath;
  };

  const data = GetCurrentPath();

  useEffect(() => {
    if (data[1] === "weight-freeze") {
      setIsActive(checkPageAuthorized("Weight Freeze"));

      setRenderingComponents(3);
      setScrollIndex(0);
    } else if (data[1] === "new-discrepancy") {
      setIsActive(checkPageAuthorized("New Discrepancy"));

      setRenderingComponents(0);
      setScrollIndex(1);
    } else if (data[1] === "pending-dispute") {
      setIsActive(checkPageAuthorized("Pending Dispute"));

      setRenderingComponents(1);
      setScrollIndex(2);
    } else if (data[1] === "completed") {
      setIsActive(checkPageAuthorized("Completed"));

      setRenderingComponents(2);
      setScrollIndex(3);
    }
  }, [data]);

  const getWeightDispute = async (searchText?: any) => {
    setIsLoading(true);

    const payload: any = {
      customFilter: {},
      customSkip: (currentPage - 1) * itemsPerPage,
      customLimit: itemsPerPage,
      pageNo: currentPage,
      customSelect: {},
      customSort: { _id: -1 },
    };

    if (searchText?.length > 0) {
      payload.searchText = searchText;
    }

    if (listTab[renderingComponents]?.key === "New_Discrepancy") {
      payload.customFilter.actionStatus = listTab[renderingComponents]?.payload;
      payload.customFilter.status = "DISPUTE_OPEN";
    } else if (listTab[renderingComponents]?.key === "Pending_Dispute") {
      payload.customFilter["$or"] = listTab[renderingComponents]?.payload;
      payload.customFilter.status = "DISPUTE_OPEN";
    } else if (listTab[renderingComponents]?.key === "Completed") {
      payload.customFilter.status = "DISPUTE_CLOSE";
    }

    try {
      const { data: responseData } = await POST(GET_WRIGHT_DISPUTE, payload);
      if (responseData?.status) {
        setIsLoading(false);

        const tempCartStatus = responseData?.data?.[0]?.status;
        const tempCount = responseData?.data?.[0]?.tableHeaders;

        const tempStatus: any = cartStatus.map((tab: any) => {
          return { ...tab, count: tempCartStatus[tab.name] || 0 };
        });

        setcartStatus(tempStatus);

        const tempListTab: any = listTab.map((tab: any) => {
          return { ...tab, count: tempCount[tab.name] || 0 };
        });

        setListTab(tempListTab);

        setWeightManagementdata(responseData?.data?.[0]?.tableData?.[0]);
        setTotalItemCount(responseData?.totalCount);
      } else {
        setIsLoading(false);
        toast.error(responseData?.message);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const debounce = (fn: any, delay: any) => {
    let timerId: any;
    return (...args: any) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), delay);
    };
  };

  const searchDebounce = useCallback(debounce(getWeightDispute, 1000), []);

  useEffect(() => {
    if (searchedText.length > 0) {
      searchDebounce(searchedText);
    } else {
      getWeightDispute();
    }
  }, [searchedText, currentPage, renderingComponents]);

  useEffect(() => {
    setSelectedRowData([]);
    // getWeightDispute();
  }, [renderingComponents]);

  console.log("weightManagementData", weightManagementData);

  return (
    <>
      {isActive ? (
        <div>
          <Breadcrum
            label="Weight Management"
            component={renderHeaderComponent()}
          />
          <div className="m-4">
            <div className="m-4">
              <div className="flex justify-between !mt-4 gap-4 mb-10">
                {cartStatus?.map((order: any, i: number) => (
                  <div
                    className="w-[17rem] h-[6.6rem] rounded-lg border-2 overflow-hidden"
                    key={i}
                  >
                    <div className="px-6 py-4">
                      <p className="text-[#1C1C1C] font-normal text-base">
                        {order?.text}
                      </p>
                      <div className="font-bold font-Lato mb-2  text-[2rem]">
                        {order?.count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {/* <div className="m-7">
                <WeightFreezeBanner
                  isActiveFreezeweight={isActiveFreezeweight}
                />
              </div> */}
            </div>
            <div className="lg:mb-24">
              <div className="mt-4 px-5 ">
                <div className="flex flex-row whitespace-nowrap mt-2 lg:h-[34px]">
                  {listTab?.map(({ statusName, count }, index) => {
                    return (
                      <div
                        className={`flex lg:justify-center items-center border-b-2 cursor-pointer border-[#777777] px-4
                            ${
                              renderingComponents === index &&
                              "!border-[#004EFF]"
                            }`}
                        onClick={() => {
                          sessionStorage.setItem("WeightTab", statusName);
                          // setTabName(statusName);
                          setScrollIndex(index);
                        }}
                        key={index}
                      >
                        <span
                          className={`text-[#777777] text-[14px] lg:text-[18px]
                           ${
                             renderingComponents === index &&
                             "!text-[#004EFF] lg:text-[18px]"
                           }`}
                        >
                          {statusName}
                        </span>
                        <span
                          className={`flex justify-center items-center ml-2 rounded-sm text-[12px]  text-white bg-[#777777] px-1 h-5 ${
                            renderingComponents === index ? "!bg-[#004EFF]" : ""
                          }`}
                        >
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex justify-between text-[18px] font-Open font-semibold items-center">
                  <div className="ml-2 flex">
                    <div className="mr-2">
                      {weightManagementData?.length
                        ? weightManagementData?.length
                        : 0}
                    </div>
                    Results
                  </div>
                  <div className="rounded border">
                    <SearchBox
                      className="removePaddingPlaceHolder !h-[34px] w-[245px] border-none rounded"
                      label="Search"
                      value={searchedText}
                      onChange={(e: any) => {
                        setSearchedText(e.target.value);
                      }}
                      getFullContent={() => setSearchedText("")}
                      customPlaceholder="Search By Order Id, AWB"
                    />
                  </div>
                </div>
                <div>{renderComponent()}</div>
                {totalItemCount > 0 && (
                  <div className="flex">
                    <Pagination
                      totalItems={totalItemCount}
                      itemsPerPageOptions={[10, 20, 30, 50]}
                      onPageChange={onPageIndexChange}
                      onItemsPerPageChange={onPerPageItemChange}
                      pageNo={currentPage}
                      initialItemsPerPage={itemsPerPage}
                      className="!mx-0 w-[100%]"
                      rightmodalPagination={false}
                    />
                  </div>
                )}
              </div>
              <RightSideModal
                isOpen={discrepancyDetailsRightModal}
                onClose={() => setDiscrepancyDetailsRightModal(false)}
                className="!w-[389px]"
              >
                <DiscrepancyDetails
                  title="Discrepancy Details"
                  buttonText="UPDATE"
                  inputLabel="Enter SKU no."
                  onClick={() => setDiscrepancyDetailsRightModal(false)}
                  // onCustomLandmarkSelection={handleLandmarkSelected}
                />
              </RightSideModal>
            </div>
          </div>
          {/* <BottomLayout callApi={() => {}} /> */}
        </div>
      ) : (
        <div>
          <AccessDenied />
        </div>
      )}
    </>
  );
};

export default WeightFreeze;
