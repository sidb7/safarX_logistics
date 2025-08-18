import React, { useEffect, useState } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { ScrollNav } from "../../components/ScrollNav";
import { SearchBox } from "../../components/SearchBox";
import PaginationComponent from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import AccessDenied from "../../components/AccessDenied";
import InvoiceData from "./BillingData/invoiceData";
import CodData from "./BillingData/codData";
import RightSideModal from "../../components/CustomModal/customRightModal";
import ShipmentDetailModal from "./Modal/shipmentDetailModal";
import { POST } from "../../utils/webService";
import downloadIcon from "../../assets/download.svg";
import {
  COD_DETAILS_FINANCE,
  COD_PAYABLE_FINANCE,
  COD_REMITTANCE_FINANCE,
  DOWNLOAD_COD_REMITTED,
  GET_COD_REMITTED,
} from "../../utils/ApiUrls";
import CodRemittedAwbModal from "./Modal/codRemittedAwbsModal";
import ReactDatePicker from "react-datepicker";
import { convertXMLToXLSX, formatCount, formatCurrency } from "../../utils/helper";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import DateButton from "../../components/Button/DateButton";
import ServiceButton from "../../components/Button/ServiceButton";
import { checkPageAuthorized } from "../../redux/reducers/role";
import sessionManager from "../../utils/sessionManager";
import { Spinner } from "flowbite-react";
import OneButton from "../../components/Button/OneButton";

interface IInvoiceProps {}

const Cod: React.FunctionComponent<IInvoiceProps> = (props) => {
  const navigate = useNavigate();
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [codModal, setCodModal] = useState({ isOpen: false, data: {} });
  const [awbModal, setAwbModal] = useState({
    isOpen: false,
    data: [],
    recovery: false,
    isAWB:false,
    isOrderId:false,
    isOrderNum:false,
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateRange, setDateRange]: any = useState([null, null]);
  const [renderingComponents, setRenderingComponents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [codRemittedData, setCodRemittedData] = useState<any>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [sortReportByDate, setSortReportByDate] = useState(-1);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const arrayData = [
    { label: "Orders" },
    { label: "Invoice" },
    // { label: "Credit Note" },
    { label: "COD" },
  ];
  const [codReportData, setCodReportData] = useState<any>([]);
  const [isActive, setIsActive] = useState<any>(false);
  const [searchValue, setSearchValue] = useState("");
  const getCurrentPath = () => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const location = url;
    const path = location.pathname;
    const pathArray = path.split("/");
    const removedFirstPath = pathArray.slice(1);
    return removedFirstPath;
  };

  const dataCurrentPath = getCurrentPath() as string[];

  const getCodPayableData = async () => {
    try {
      const { data } = await POST(COD_DETAILS_FINANCE, {});

      if (data?.success) {
        const codPayableData = data?.data;
        const {
          deliveredCod = {},
          rtoCod = {},
          pickupCod = {},
          intransitCod = {},
          paidCod = {},
          lostOrDamagedCod={},
          payableAmount = [],
          recovery = {},
          codRechargeAmount = 0,
          payableAmountWithDate = [],
        } = codPayableData || {};

        const totalUpcomingCount = Array.isArray(payableAmountWithDate)
          ? payableAmountWithDate.reduce(
              (sum, ele) => sum + (ele?.count || 0),
              0
            )
          : 0;

        const totalPayableAmount = Array.isArray(payableAmountWithDate)
          ? payableAmountWithDate.reduce(
              (sum, ele) => sum + (ele?.remitableAmount || 0),
              0
            )
          : 0;


        const codDashboardData = [
          {
            title: "Picked Up",
            amount: pickupCod.amount,
            count: pickupCod.count,
          },
          {
            title: "In Transit",
            amount: intransitCod.amount || 0,
            count: intransitCod.count || 0,
          },
          {
            title: "Delivered",
            amount: deliveredCod.amount || 0,
            count: deliveredCod.count || 0,
          },

          {
            title: "RTO",
            amount: rtoCod.amount || 0,
            count: rtoCod.count || 0,
          },
          {
            title: "Amount Paid",
            amount: paidCod.amount || 0,
            count: paidCod.count || 0,
          },

          {
            title: "COD Payable *",
            payableAmountWithDate,
            totalPayableAmount,
            totalUpcomingCount,
          },

          {
            title: "To Recover",
            amount: recovery.amount || 0,
            count: recovery.count || 0,
          },
          {
            title: "Wallet Recharge",
            amount: codRechargeAmount,
          },
          {
            title: "Lost/damage",
            amount: lostOrDamagedCod.amount || 0,
            count: lostOrDamagedCod.count || 0,
          },
        ];

        setCodReportData(codDashboardData);
      } else {
        // throw "Failed to fetch COD data";
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (dataCurrentPath[1] === "cod") {
      setIsActive(checkPageAuthorized("Cod"));
    }
  }, []);

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

  const getCodRemittedDetails = async () => {
    try {
      const { sellerInfo } = sessionManager({});
      setLoading(true);

      const payload = {
        startDate: startDate ? new Date(startDate).getTime() : null,
        endDate: endDate ? new Date(endDate).getTime() : null,
        sellerId: +`${sellerInfo?.sellerId}`,
        sort: { reportDate: sortReportByDate },
        skip: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage,
        search: searchValue,
      };
      // const payload = {
      //   sellerId: 2483, //only for testing
      // };

      const { data: response } = await POST(COD_REMITTANCE_FINANCE, payload);

      if (response?.success) {
        setCodRemittedData(response?.data);
        setTotalItemCount(response?.totalCount);
      } else {
        setCodRemittedData([]);
      }
    } catch (error) {
      console.error("Error in API call:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCodPayableData();
  }, []);
  useEffect(() => {
    getCodRemittedDetails();
  }, [endDate, sortReportByDate, currentPage, itemsPerPage]);

  useEffect(() => {
    const handler = setTimeout(() => {
      getCodRemittedDetails();
    }, 800); // debounce delay in ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  //on page change index
  const onPageIndexChange = (data: any) => {
    // console.log(data);
    setCurrentPage(data?.currentPage);
  };

  // on per page item change
  const onPerPageItemChange = (data: any) => {
    // console.log(data);
    setItemPerPage(data?.itemsPerPage);
    setCurrentPage(1);
  };

  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);
    render(id);
  };

  const handleClear = () => {
    setDateRange([null, null]);
    setStartDate(null);
    setEndDate(null);
  };
  

  const handleDownloadCodPayable = async (date: number) => {
    try {
      const { data } = await POST(
        COD_PAYABLE_FINANCE,
        { date },
        { Accept:"application/json", responseType: 'blob' }
      );
  
      const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `payable_awbs_${date}.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch {
      toast.error("Error downloading COD Payable");
    }
  };

  const downloadReport = async (reportNumber?: any) => {
    setIsDownloading(true);

    // so dailyrpeortnumber, utrNO needs to given in payload too ,

    try {
      const report = {
        reportNumber: reportNumber || "",
      };
      const { data: response } = await POST(DOWNLOAD_COD_REMITTED, report);

      if (response?.success && response?.data?.orders?.length > 0) {
        const formattedData = response?.data?.orders?.map((order: any) => {
          return {
            OrderId: order.orderId,
            OrderNumber: order?.orderNumber || "NA",
            AWB: order.awb,
            InvoiceValue: order?.invoiceValue,
            SellerId: order.sellerId,
            PartnerName: order.partnerName,
            CodRemittedAmount: order?.codRemittedAmount,
            DeliveryDate: order?.deliveryDate,
            PrivateCompanyId: order?.privateCompanyId,
            Status: order?.status,
            DueDate: order?.dueDate,
            ReportNumber: order?.reportNumber,
            UtrNo: order?.utrNo,
          };
        });

        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

        await convertXMLToXLSX(formattedData, `Data_${formattedDate}.xlsx`);
      } else {
        toast.error("No data available to download");
      }
    } catch (error) {
      console.error("Error in downloading report:", error);
      toast.error("Error in downloading report");
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <>
      {isActive || isActive === undefined ? (
        <div>
          <Breadcrum label="Billing" />
          <div className="">
            <div className="flex justify-between mx-4 mb-2">
              <div>
                <ScrollNav
                  arrayData={arrayData}
                  showNumber={false}
                  setScrollIndex={setScrollIndex}
                  defaultIndexValue={2}
                />
              </div>
              <div className="flex justify-end gap-x-2  ">
                <div className="w-full">
                  <SearchBox
                    customPlaceholder="Search by AWB / Report No. "
                    label="Search"
                    value={searchValue}
                    onChange={(e: any) => {
                      setSearchValue(e.target.value);
                      setCurrentPage(1);
                    }}
                    getFullContent={() => {
                      setSearchValue("");
                    }}
                  />
                </div>
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
                <div>
                  
                  <div className="relative">
  <OneButton
    text={isDownloading ? "Downloading..." : "Download"}
    variant="primary"
    disabled={isDownloading}
    onClick={() => downloadReport()}
    className={`lg:w-[120px] min-w-[120px] ${
      isDownloading ? 'opacity-75' : ''
    }`}
  />
  {isDownloading && (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <Spinner size="sm" color="gray" />
    </div>
  )}
</div>
                </div>
              </div>
            </div>
            <div className="mx-4  justify-start">
            
<div className="flex mb-2 justify-start flex-wrap gap-3 w-full item rounded-md">
  {codReportData?.map((ele: any) => {
    const isCodPayable = ele?.payableAmountWithDate !== undefined;

    return (
      <div className="border min-w-[160px] min-h-[75px] shadow-md flex rounded-md px-3 py-1 relative">
        {isCodPayable ? (
          ele?.payableAmountWithDate.length > 0 ? (
            <div className="w-full">
              <div className="flex justify-between items-center text-sm text-[#878787]">
                <span>{ele?.title ?? "--"}</span>
                {/* Download Icon */}
                <img
                  src={downloadIcon}
                  alt="Download"
                  className="cursor-pointer w-[16px] h-[16px]"
                  onClick={() => {
                    const date = ele?.payableAmountWithDate.at(-1)?.date; 
                    handleDownloadCodPayable(date);
                  }}
                />
              </div>

              <div>
                {ele?.payableAmountWithDate.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex text-xs min-w-[140px] font-semibold mt-0.5 justify-between"
                  >
                    <div>
                      {item?.date
                        ? new Date(item.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "2-digit",
                          })
                        : "--"}
                    </div>
                    <div>
                      ₹{" "}
                      {item?.remitableAmount != null
                        ? formatCurrency(item.remitableAmount)
                        : "--"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-300 mt-2 pt-1 flex text-xs font-semibold justify-between">
                <div>Total :</div>
                <div>
                  ₹{" "}
                  {ele?.totalPayableAmount != null
                    ? formatCurrency(ele.totalPayableAmount)
                    : "--"}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-[#878787]">
              {ele?.title ?? "--"}
              <div className="text-red-500 text-xs mt-1">
                No upcoming payables
              </div>
            </div>
          )
        ) : (
          <div className="relative">
            <div className="text-sm text-[#878787]">{ele?.title ?? "--"}</div>
            <div className="flex items-center min-h-[60px]">
              <div>
                <div className="font-bold">
                  ₹{" "}
                  {ele?.amount != null
                    ? formatCurrency(ele.amount)
                    : "--"}
                </div>
                {(ele?.count != undefined || ele?.count != null) && (
                  <div className="text-sm text-[#878787]">
                     No. of Awbs: <b>{formatCount(ele?.count)}</b>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  })}
</div>

              {loading ? (
                <div className="w-full h-96 flex items-center justify-center">
                  <Spinner />{" "}
                </div>
              ) : (
                <CodData
                  setCodModal={setCodModal}
                  setAwbModal={setAwbModal}
                  tableData={codRemittedData}
                  downloadReport={downloadReport}
                  setSortReportByDate={setSortReportByDate}
                />
              )}
            </div>
          </div>

          {totalItemCount > 0 && (
            <PaginationComponent
              totalItems={totalItemCount}
              itemsPerPageOptions={[
                10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000,
              ]}
              onPageChange={onPageIndexChange}
              onItemsPerPageChange={onPerPageItemChange}
            />
          )}

          <RightSideModal
            isOpen={codModal?.isOpen}
            onClose={() => {
              setCodModal({ isOpen: false, data: {} });
            }}
            className="md:!w-[50%]"
          >
            <ShipmentDetailModal
              onClick={() => setCodModal({ isOpen: false, data: {} })}
            />
          </RightSideModal>

          <RightSideModal
            isOpen={awbModal?.isOpen}
            onClose={() => {
              setAwbModal({ isOpen: false, data: [], recovery: false, isAWB: false, isOrderId: false, isOrderNum: false });
            }}
            className="md:!w-[40%]"
          >
            <CodRemittedAwbModal
              onClick={() =>
                setAwbModal({ isOpen: false, data: [], recovery: false, isAWB: false, isOrderId: false, isOrderNum: false })
              }
              awbs={awbModal?.data}
              isRecovery={awbModal?.recovery}
              isAWB={awbModal?.isAWB}
              isOrderId={awbModal?.isOrderId}
              isOrderNum={awbModal?.isOrderNum}
            />
          </RightSideModal>
        </div>
      ) : (
        <div>
          <AccessDenied />
        </div>
      )}
    </>
  );
};

export default Cod;
