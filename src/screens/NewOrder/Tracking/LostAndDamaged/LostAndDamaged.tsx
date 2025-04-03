import React, { useState, useEffect, useRef } from "react";
import { Breadcrum } from "../../../../components/Layout/breadcrum";
import centerIcon from "../../../../assets/LostAndDamged/Group 1000006836 (1).svg";
import CenterModal from "../../../../components/CustomModal/customCenterModal";
import CustomInputBox from "../../../../components/Input";
import OneRadioButton from "../../../../components/OneRadioButton/OneRadioButton";
import {
  FETCH_LD_ORDERS,
  UPDATE_LD_ORDERS,
  FETCH_LD_ORDERS_FOR_SEARCH,
} from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import toast from "react-hot-toast";
import LostAndFoundTable from "./LostAndFoundTable";
import OneButton from "../../../../components/Button/OneButton";

import DateButton from "../../../../components/Button/DateButton";
import DatePicker from "react-datepicker";
import { SearchBox } from "../../../../components/SearchBox";
import LostDamagedFilter from "./LostDamagedFilter";
import RightSideModal from "../../../../components/CustomModal/customRightModal";
import FilterIcon from "../../../../assets/Order/FilterIcon.svg";
import CloseIcon from "../../../../assets/CloseIcon.svg";
import { Spinner } from "../../../../components/Spinner";
import PaginationComponent from "../../../../components/Pagination";
import { set } from "lodash";

interface FilterCondition {
  $in: any[];
}

interface FilterObject {
  ldStatus?: { $in: string[] };
  isClaimed?: { $in: boolean[] };
  [key: string]: any;
}

// Define payload structure
interface OrderPayload {
  searchValue?: string;
  filterArr: FilterObject[];
  startDate?: number | null;
  endDate?: number | null;
  skip?: number;
  limit?: number;
}

interface FilterMenuItem {
  name: string;
  value: string | boolean;
  isActive: boolean;
}

interface FilterState {
  name: string;
  menu: FilterMenuItem[];
  label: string;
  isCollapse: boolean;
}

const LostAndDamaged: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [awbNo, setAwbNo] = useState("");
  const [remark, setRemark] = useState("");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [orderDetailsTable, setOrderDetailsTable] = useState<any>(null);

  const [selectedOption, setSelectedOption] = useState("LOST");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [dateRange, setDateRange]: any = useState([null, null]);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);

  const [searchValue, setSearchValue] = useState("");

  const [filterModal, setFilterModal] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState<boolean>(false);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [fallback, setFallback] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const itemsPerPageOptions = [5, 10, 20, 50,100,200,500,1000,2000,5000,10000];
  const [totalCount, setTotalCount] = useState<number>(0);
  const isInitialRender = useRef(true);
  const [formSubmitted, setFormSubmitted] = useState(false);



  const [filterState, setFilterState] = useState<FilterState>({
    name: "",
    menu: [], // Now typed as FilterMenuItem[]
    label: "",
    isCollapse: false,
  });

  const [filterPayLoad, setFilterPayLoad] = useState<any>({
    filterArrOne: [],
  });

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handlePageChange = (data: {
    currentPage: number;
    itemsPerPage: number;
  }) => {
    setCurrentPage(data.currentPage);
    setItemsPerPage(data.itemsPerPage);
  };

  const handleItemsPerPageChange = (data: {
    currentPage: number;
    itemsPerPage: number;
  }) => {
    setCurrentPage(1); // Reset to first page when changing items per page
    setItemsPerPage(data.itemsPerPage);
  };

  const fetchOrderDetails = async (awb?: string) => {
    try {
      const payload = {
        awb: awb,
      };

      const response = await POST(FETCH_LD_ORDERS_FOR_SEARCH, payload);
      if (response?.data?.success) {
        setOrderDetails(response?.data?.data[0]);
      }
    } catch (error) {
      setOrderDetails(null);

      console.error("Error fetching order details:", error);
    }
  };

  const fetchOrderDetailsTable = async (awb?: string) => {
    try {
      setIsFilterLoading(true);
      setIsTableLoading(true);
      const payload: OrderPayload = {
        searchValue: searchValue || awb,
        filterArr: [],
        skip: (currentPage - 1) * itemsPerPage, // Convert page number to skip value
        limit: itemsPerPage,
      };

      // Add date range if present
      if (startDate && endDate) {
        let startEpoch: number | null = null;
        let lastendEpoch: number | null = null;

        if (startDate instanceof Date && endDate instanceof Date) {
          startDate.setHours(0, 0, 0, 0);
          startEpoch = startDate.getTime();

          endDate.setHours(23, 59, 59, 999);
          lastendEpoch = endDate.getTime();
        }
        payload.startDate = startEpoch;
        payload.endDate = lastendEpoch;
      }

      // Add filters if present
      if (filterPayLoad?.filterArrOne?.length > 0) {
        payload.filterArr = [...filterPayLoad.filterArrOne];
        // console.log("Applied filters:", payload.filterArr); // Debug line
      }

      // console.log("API Payload:", payload); // Debug line to check payload

      const response = await POST(FETCH_LD_ORDERS, payload);
      if (response?.data?.success) {
        setOrderDetailsTable(response.data?.data?.[0]?.data);
        setTotalCount(response.data?.data?.[0]?.totalCount || 0);
      } else {
        setOrderDetailsTable(response.data?.data?.[0]?.data || []);
        setTotalCount(response.data?.data?.[0]?.totalCount || 0);
        setFallback(response?.fallback);
        toast.error(response?.data?.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("An error occurred while fetching orders");
    } finally {
      setIsFilterLoading(false);
      setIsTableLoading(false);
    }
  };

  const handleFilterReset = () => {
    setFilterState({
      name: "",
      menu: [] as FilterMenuItem[], // Explicitly cast as FilterMenuItem[]
      label: "",
      isCollapse: false,
    });
    setFilterPayLoad({
      filterArrOne: [],
    });
    setCurrentPage(1); // Reset to page 1
    // fetchOrderDetailsTable();
  };

  // const fetchOrderDetailsTable = async (awb?: string) => {
  //   try {
  //     const payload: any = {
  //       searchValue: awb,
  //       filterArr: [],
  //     };

  //     // Handle date range
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
  //       payload.startDate = startEpoch;
  //       payload.endDate = lastendEpoch;
  //     }

  //     // Handle filters
  //     if (filterPayLoad?.filterArrOne?.length > 0) {
  //       filterPayLoad.filterArrOne.forEach((filter: any) => {
  //         if (filter.ldStatus?.$in?.length > 0) {
  //           payload.filterArr.push({
  //             ldStatus: { $in: filter.ldStatus.$in },
  //           });
  //         }
  //         if (filter.isClaimed?.$in?.length > 0) {
  //           payload.filterArr.push({
  //             isClaimed: { $in: filter.isClaimed.$in },
  //           });
  //         }
  //       });
  //     }

  //     const response = await POST(FETCH_LD_ORDERS, payload);
  //     if (response?.data?.success) {
  //       setOrderDetailsTable(response.data.data?.[0]?.data);
  //     }
  //   } catch (error) {
  //     setOrderDetails(null);
  //     console.error("Error fetching order details:", error);
  //   }
  // };

  // const fetchOrderDetailsTable = async (awb?: string) => {
  //   try {
  //     const payload: any = {
  //       searchValue: awb,
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
  //       payload.startDate = startEpoch;
  //       payload.endDate = lastendEpoch;
  //     }

  //     const response = await POST(FETCH_LD_ORDERS, payload);
  //     if (response?.data?.success) {
  //       setOrderDetailsTable(response.data.data?.[0]?.data);
  //     }
  //   } catch (error) {
  //     setOrderDetails(null);
  //     console.error("Error fetching order details:", error);
  //   }
  // };

  const handleAwbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const awbValue = e.target.value;
    setAwbNo(awbValue);
    if (awbValue?.length >= 8) {
      fetchOrderDetails(awbValue);
    }
  };

  // const handleSubmit = async () => {
  //   if (isSubmitting) return;

  //   // Validation
  //   if (!awbNo) {
  //     toast.error("Please enter AWB number");
  //     return;
  //   }
  //   if (!remark) {
  //     toast.error("Please enter a remark");
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   try {
  //     const formData = new FormData();

  //     // Add the request data as a JSON string
  //     const requestData = {
  //       awb: awbNo,
  //       ldStatus: selectedOption,
  //       remark: remark
  //     };
  //     formData.append('request', JSON.stringify(requestData));

  //     // If you need to handle file uploads, you can add them like this:
  //     // if (files) {
  //     //   files.forEach(file => {
  //     //     formData.append('files', file);
  //     //   });
  //     // }

  //     const response = await POST(UPDATE_LD_ORDERS, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });

  //     if (response?.data?.success) {
  //       toast.success("Successfully updated!");
  //       handleModalClose();
  //     } else {
  //       toast.error(response?.data?.message || "Failed to update order");
  //     }
  //   } catch (error) {
  //     console.error("Error updating order:", error);
  //     toast.error("An error occurred while updating the order");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    // Validation
    if (!awbNo) {
      toast.error("Please enter AWB number");
      return;
    }
    if (!remark) {
      toast.error("Please enter a remark");
      return;
    }
    if (selectedOption === "DAMAGE" && imageFiles?.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      const requestData = {
        awb: awbNo,
        status: selectedOption,
        remark: remark,
      };
      formData.append("request", JSON.stringify(requestData));

      // if (selectedOption === "DAMAGE") {
      //   imageFiles.forEach((file, index) => {
      //     formData.append(`image${index + 1}`, file);
      //   });
      //   if (videoFile) formData.append("video", videoFile);
      // }
      if (selectedOption === "DAMAGE") {
        imageFiles.forEach((file) => {
          formData.append("files", file);
        });
        if (videoFile) formData.append("files", videoFile);
      }

      const response = await POST(UPDATE_LD_ORDERS, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        toast.success("Successfully updated!");
        handleModalClose();
        setFormSubmitted(true); // Add this line
      } else {
        toast.error(response?.data?.message || "Failed to update order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("An error occurred while updating the order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalFiles = [...imageFiles, ...newFiles];

      if (totalFiles?.length > 3) {
        toast.error("You can only upload up to 3 images");
        return;
      }

      setImageFiles(totalFiles);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImageFiles(imageFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setAwbNo("");
    setRemark("");
    setOrderDetails(null);
    setSelectedOption("LOST");
    setImageFiles([]);
    setVideoFile(null);
  };

  const handleClear = () => {
    setDateRange([null, null]);
    setStartDate(null);
    setEndDate(null);
  };

  function getObjectWithIsActiveTrue(data: FilterMenuItem[], name: string) {
    // Create a deep copy of the current filter array
    let tempArrOne = [...(filterPayLoad?.filterArrOne || [])];

    // Extract active filter values
    const filterValues = data
      .filter((item) => item.isActive)
      .map((item) => item.value);

    // Find index of existing filter if present
    let filterKey = "";
    if (name === "Current Tag") filterKey = "ldStatus";
    if (name === "Actions") filterKey = "isClaimed";

    // If no key matches, exit early
    if (!filterKey) return;

    const existingIndex = tempArrOne.findIndex(
      (filter) => Object.keys(filter)[0] === filterKey
    );

    // If no active values, remove filter entirely
    if (filterValues.length === 0) {
      if (existingIndex > -1) {
        tempArrOne.splice(existingIndex, 1);
      }
    } else {
      // If filter already exists, update it
      if (existingIndex > -1) {
        tempArrOne[existingIndex] = { [filterKey]: { $in: filterValues } };
      } else {
        // Otherwise add new filter
        tempArrOne.push({ [filterKey]: { $in: filterValues } });
      }
    }

    // Update the filter payload state
    setFilterPayLoad({
      ...filterPayLoad,
      filterArrOne: tempArrOne,
    });

    // console.log("Updated filter payload:", tempArrOne); // Debug line
  }
  console.log(
    "Order details ",
    // orderDetails?.codInfo?.isCod
    //   ? orderDetails?.codInfo?.collectableAmount
    //   : orderDetails?.codInfo?.invoiceValue
    orderDetails,
    orderDetails?.[0]?.orderInfo?.boxInfo?.[0]?.products?.[0]?.name
  );

  useEffect(() => {
    fetchOrderDetailsTable();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    // Only call API when both dates are selected or both are null
    if ((startDate && endDate) || (startDate === null && endDate === null)) {
      fetchOrderDetailsTable();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on new search
      fetchOrderDetailsTable(searchValue);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchValue]);

  useEffect(() => {
    if (filterState?.name && filterState?.menu) {
      getObjectWithIsActiveTrue(filterState.menu, filterState.name);
    }
  }, [filterState]);

  useEffect(() => {
    if (filterPayLoad.filterArrOne.length === 0) {
      fetchOrderDetailsTable();
    }
  }, [filterPayLoad]);

  useEffect(() => {
    if (formSubmitted) {
      fetchOrderDetailsTable(); // Refresh the data
      setFormSubmitted(false); // Reset the flag
    }
  }, [formSubmitted]);

  useEffect(() => {
    fetchOrderDetailsTable();
  }, []);

  return (
    <div>
      <div className=" flex justify-between w-full">
        <div>
          <Breadcrum label="Lost and Damaged" />
        </div>
        <div className="flex gap-2 items-center mb-4 mr-4">
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update: any) => {
              setDateRange(update);
              if (update[0] === null && update[1] === null) {
                setStartDate(null);
                setEndDate(null);
                // fetchOrderDetailsTable();
              } else {
                setStartDate(update[0]);
                setEndDate(update[1]);
              }
            }}
            dateFormat="dd/MM/yyyy"
            customInput={
              <DateButton
                text="Select From & To Date"
                onClick={() => {}}
                className="h-[36px] !rounded-full"
                value={
                  startDate && endDate
                    ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                    : ""
                }
                onClear={handleClear}
              />
            }
          />

          <SearchBox
            label="Search"
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValue(e.target.value);
            }}
            customPlaceholder="Search by AWB number"
            getFullContent={() => setSearchValue("")}
            className="!rounded-full"
          />

          <div className="relative">
            <OneButton
              text="FILTER"
              onClick={() => setFilterModal(true)}
              variant="quad"
              showIcon={true}
              icon={FilterIcon}
              className="ml-2 !uppercase"
            />
            {filterPayLoad.filterArrOne.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                {filterPayLoad.filterArrOne.reduce(
                  (total: any, filter: any) => {
                    const key = Object.keys(filter)[0];
                    return total + filter[key].$in.length;
                  },
                  0
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {orderDetailsTable?.length != 0 && (
        <div className="flex flex-col items-end justify-end pr-4 ">
          <OneButton
            text="ADD SHIPMENT"
            onClick={handleClick}
            className="max-w-[200px] !rounded-full"
            variant="primary"
          />
        </div>
      )}

      {isTableLoading ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)]">
          <div className="flex flex-col items-center">
            <Spinner />
            <p className="mt-4 text-gray-600">Loading shipment data...</p>
          </div>
        </div>
      ) : !fallback ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)]">
          <img src={centerIcon} alt="Lost and Damaged Icon" className="mb-4" />

          <p className="font-Open text-[28px] leading-[36px] tracking-[0%] text-center font-normal">
            Missing Or Damaged Shipment?
            <br />
            <span
              className="text-blue-500 cursor-pointer hover:underline font-Lato text-[28px] leading-[36px] tracking-[0%] text-center font-semibold"
              onClick={handleClick}
            >
              Click Here
            </span>{" "}
            To Report.
          </p>
        </div>
      ) : (
        <LostAndFoundTable orders={orderDetailsTable} />
      )}

      {/* Pagination Component */}
      {totalCount > 0 && (
        <PaginationComponent
          totalItems={totalCount}
          itemsPerPageOptions={itemsPerPageOptions}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          pageNo={currentPage}
          initialItemsPerPage={itemsPerPage}
          className="mt-4"
        />
      )}

      <CenterModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        className="!h-[calc(100vh-50px)] w-[500px]"
      >
        <div className="flex justify-between items-center p-4 mb-2 border-b bg-white w-full">
          <h2 className="text-xl font-medium relative">Lost and Damaged</h2>
          <button
            onClick={handleModalClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="h-full w-full p-6 flex flex-col">
          <div className="w-full mb-6">
            <p className="text-sm mb-3">Select</p>
            <div className="flex gap-x-3">
              <div className="flex gap-x-2 items-center">
                <input
                  type="radio"
                  name="option"
                  value="LOST"
                  onChange={handleOptionChange}
                  checked={selectedOption === "LOST"}
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
                <span
                  className="font-Open text-sm font-semibold leading-5"
                  onClick={() => setSelectedOption("LOST")}
                >
                  Lost
                </span>
              </div>
              <div className="flex gap-x-2 items-center">
                <input
                  type="radio"
                  name="option"
                  value="DAMAGE"
                  onChange={handleOptionChange}
                  checked={selectedOption === "DAMAGE"}
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
                <span
                  className="font-Open text-sm font-semibold leading-5"
                  onClick={() => setSelectedOption("DAMAGE")}
                >
                  Damaged
                </span>
              </div>
            </div>
          </div>

          <div className="w-full">
            <CustomInputBox
              label="Enter AWB No."
              value={awbNo}
              onChange={handleAwbChange}
              className="mb-4 !rounded-full"
            />

            {orderDetails && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-sm">
                <div className="border-b pb-4 mb-4">
                  <h3 className="font-semibold text-lg mb-2">
                    Package Details
                  </h3>
                  <p className="text-gray-700">
                    {orderDetails?.orderInfo?.boxInfo?.[0]?.products?.[0]
                      ?.name || "Package info not available"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Weight</p>
                      <p className="font-medium">
                        {orderDetails?.service?.appliedWeight
                          ? `${orderDetails?.service?.appliedWeight} kg`
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Insurance Status
                      </p>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          orderDetails?.trackingInfo?.service.insurance === 0
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {orderDetails?.trackingInfo?.service.insurance === 0
                          ? "Not Insured"
                          : "Insured"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Invoice Value
                      </p>
                      <p className="font-medium">
                        ₹{" "}
                        {orderDetails?.orderInfo?.boxInfo?.[0]?.codInfo?.isCod
                          ? orderDetails?.orderInfo?.boxInfo?.[0]?.codInfo?.collectableAmount?.toLocaleString(
                              "en-IN"
                            )
                          : orderDetails?.orderInfo?.boxInfo?.[0]?.codInfo?.invoiceValue?.toLocaleString(
                              "en-IN"
                            ) || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Booking Date</p>
                      <p className="font-medium">
                        {orderDetails?.createdAt
                          ? new Date(
                              orderDetails?.createdAt
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <CustomInputBox
              label="Remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="mb-6 !rounded-full"
            />

            {selectedOption === "DAMAGE" && (
              <div className="space-y-4 mt-4 mb-4">
                <div>
                  
                  <div className="relative w-full h-12 border border-gray-300 !rounded-full overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      required
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <span className="text-gray-500 text-[12px]   leading-4 font-Open">
                        Upload Image (Up to 3 files)
                      </span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-blue-600"
                      >
                        <path
                          d="M12 16V8M8 12l4-4 4 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  {imageFiles?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {imageFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                        >
                          <span className="text-sm">{file.name}</span>
                          <button
                            onClick={() => removeImage(index)}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                            type="button"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <div className="relative w-full h-12 border border-gray-300 !rounded-full overflow-hidden">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <span className="text-gray-500 text-[12px]   leading-4 font-Open">
                        Upload Video (Optional)
                      </span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-blue-600"
                      >
                        <path
                          d="M12 16V8M8 12l4-4 4 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  {videoFile && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                        <span className="text-sm">{videoFile.name}</span>
                        <button
                          onClick={() => setVideoFile(null)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              className="w-full bg-black text-white py-3 hover:bg-gray-800 text-sm font-medium disabled:bg-gray-400 rounded-full"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </CenterModal>

      <RightSideModal
        isOpen={filterModal}
        onClose={() => setFilterModal(false)}
        className="w-[500px] !justify-between !items-stretch"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b">
            <h2 className="text-2xl font-normal">Filter</h2>
            <img
              src={CloseIcon}
              alt="close"
              className="cursor-pointer"
              onClick={() => setFilterModal(false)}
            />
          </div>

          {/* Content - with scrolling */}
          <div className="flex-1 overflow-y-auto p-4">
            <LostDamagedFilter
              filterState={filterState}
              setFilterState={setFilterState}
              isLoading={isFilterLoading}
            />
          </div>

          {/* Footer - fixed at bottom of modal */}
          <div className="mt-auto border-t bg-white px-6 py-4">
            <div className="flex justify-end gap-5">
              <OneButton
                text="RESET ALL"
                onClick={() => {
                  setFilterState({
                    name: "",
                    menu: [],
                    label: "",
                    isCollapse: false,
                  });
                  setFilterPayLoad({
                    filterArrOne: [],
                  });
                  setIsFilterLoading(false);
                  setCurrentPage(1); // Reset to page 1
                  // fetchOrderDetailsTable();
                  setFilterModal(false);
                }}
                variant="secondary"
                className="px-5 !rounded-full"
              />
              {isFilterLoading ? (
                <div className="flex justify-center items-center px-5">
                  <Spinner />
                </div>
              ) : (
                <OneButton
                  text="APPLY"
                  onClick={() => {
                    setIsFilterLoading(true);
                    setCurrentPage(1); // Reset to first page when applying filters
                    fetchOrderDetailsTable();
                    setFilterModal(false);
                  }}
                  variant="primary"
                  className="px-5 !rounded-full"
                />
              )}
            </div>
          </div>
        </div>
      </RightSideModal>
    </div>
  );
};

export default LostAndDamaged;
