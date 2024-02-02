import React, { useEffect, useState } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { ScrollNav } from "../../components/ScrollNav";
import { SearchBox } from "../../components/SearchBox";
import PaginationComponent from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import InvoiceData from "./BillingData/invoiceData";
import CodData from "./BillingData/codData";
import RightSideModal from "../../components/CustomModal/customRightModal";
import ShipmentDetailModal from "./Modal/shipmentDetailModal";
import { POST } from "../../utils/webService";
import { DOWNLOAD_COD_REMITTED, GET_COD_REMITTED } from "../../utils/ApiUrls";
import CodRemittedAwbModal from "./Modal/codRemittedAwbsModal";
import ReactDatePicker from "react-datepicker";
import { convertXMLToXLSX } from "../../utils/helper";
import { toast } from "react-toastify";

interface IInvoiceProps {}

const Cod: React.FunctionComponent<IInvoiceProps> = (props) => {
  const navigate = useNavigate();
  const [totalItemCount, setTotalItemCount] = useState(10);
  const [codModal, setCodModal] = useState({ isOpen: false, data: {} });
  const [awbModal, setAwbModal] = useState({ isOpen: false, data: [] });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateRange, setDateRange]: any = useState([null, null]);
  const [renderingComponents, setRenderingComponents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [codRemittedData, setCodRemittedData] = useState<any>([]);
  const [isDownloading, setIsDownloading] = useState(false);

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

  const getCodRemittedDetails = async () => {
    try {
      setLoading(true);
      const payload = { sellerId: +`${sessionStorage.getItem("sellerId")}` };
      // const payload = {
      //   sellerId: 2483, //only for testing
      // };

      const { data: response } = await POST(GET_COD_REMITTED, payload);

      if (response?.success) {
        setCodRemittedData(response?.data);
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
    getCodRemittedDetails();
  }, [endDate]);

  console.log("getcodRmeittedData", codRemittedData);
  //on page change index
  const onPageIndexChange = () => {};

  // on per page item change
  const onPerPageItemChange = () => {};

  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);
    render(id);
  };

  // const fetchReport = async () => {
  //   if (!codRemittedData || codRemittedData.length === 0) {
  //     toast.error("No data available to download");
  //     return;
  //   }

  //   const formattedData = codRemittedData.map((payment: any) => {
  //     const shipmentReportDate = payment.reportNumber || "N/A";

  //     const crn = `COD${shipmentReportDate}`;

  //     return {
  //       ClientId: payment.sellerId || "",
  //       Amount: payment?.details?.codAmountRemittable || "N/A",
  //       Paid: payment?.details?.codAmountRemitted || "N/A",
  //       BeneAccountNumber: payment.bankDetails?.bankAccountNumber || "",
  //       Email: payment.sellerEmail || "",
  //       ReceiverIFSC: payment.bankDetails?.ifscCode,
  //       UTRno: payment?.details?.utrNo || "",
  //       CRN: crn,
  //     };
  //   });

  //   const date = new Date();
  //   const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
  //     .toString()
  //     .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  //   await convertXMLToXLSX(formattedData, `BankData_${formattedDate}.xlsx`);
  // };

  const downloadReport = async (reportNumber: any) => {
    setIsDownloading(true);

    // so dailyrpeortnumber, utrNO needs to given in payload too ,

    const payload = {
      sellerId: +`${sessionStorage.getItem("sellerId")}`,
      reportNumber: reportNumber,
    };
    // const payload = {
    //   sellerId: 2483, //only for testing
    // };

    // so dailyrpeortnumber, utrNO needs to given in payload too ,

    try {
      const { data: response } = await POST(DOWNLOAD_COD_REMITTED, payload);
      // console.log("fetchReportoutsideloop", response.data.data);

      if (response?.success && response?.data?.orders?.length > 0) {
        // console.log("fetchReport", response.data.data);
        const formattedData = response?.data?.orders?.map((order: any) => {
          return {
            OrderId: order.orderId,
            AWB: order.awb,
            CodAmount: order?.codInfo?.collectableAmount,
            InvoiceValue: order?.codInfo?.invoiceValue,
            SellerId: order.sellerId,
            CourierPartnerName: order.courierPartnerName,
            // PaymentRefNo:
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
      <div>
        <Breadcrum label="Billing" />
        <div className="lg:flex justify-between mx-4 lg:mt-2 lg:mb-4">
          <div>
            <ScrollNav
              arrayData={arrayData}
              showNumber={false}
              setScrollIndex={setScrollIndex}
              defaultIndexValue={3}
            />
          </div>
          <div className="flex justify-end gap-x-2  ">
            <div>
              <SearchBox label="Search" value="" onChange={() => {}} />
            </div>
            <div className="">
              <ReactDatePicker
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
                isClearable={true}
                placeholderText="Select From & To Date"
                className="cursor-pointer h-12 border-solid border-2 datepickerCss  pl-6"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
        </div>
        <div className="mx-4">
          <CodData
            setCodModal={setCodModal}
            setAwbModal={setAwbModal}
            tableData={codRemittedData}
            downloadReport={downloadReport}
          />
        </div>

        {totalItemCount > 0 && (
          <PaginationComponent
            totalItems={totalItemCount}
            itemsPerPageOptions={[10, 20, 30, 50]}
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
            setAwbModal({ isOpen: false, data: [] });
          }}
          className="md:!w-[25%]"
        >
          <CodRemittedAwbModal
            onClick={() => setAwbModal({ isOpen: false, data: [] })}
            awbs={awbModal.data}
          />
        </RightSideModal>
      </div>
    </>
  );
};

export default Cod;
