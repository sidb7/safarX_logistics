import React, { useState } from "react";
import BlueBill from "../../../assets/blue16.svg";
import SendButton from "../../../assets/export.svg";
import UpIcon from "../../../assets/AccordianCloseIcon.svg";
import DownIcon from "../../../assets/AccordianOpen.svg";
import OneButton from "../../../components/Button/OneButton";
import DowbloadIcon from "../../../assets/download.svg";
import {
  DOWNLOAD_INVOICE_FROM_S3,
  DOWNLOAD_MISREPORT_FROM_S3,
} from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import toast from "react-hot-toast";

interface InvoiceCardProps {
  invoiceData: any;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoiceData }) => {
  const [cardOpen, setCardOpen] = useState<any>(null);

  const handleAccordian = (index: any) => {
    if (cardOpen === index) {
      setCardOpen((prevIndex: any) => (prevIndex === index ? null : index));
    } else {
      setCardOpen(index);
    }
  };

  const handleDownload = async (value: any, identifier: any) => {
    try {
      const api =
        identifier === "Invoice"
          ? DOWNLOAD_INVOICE_FROM_S3
          : DOWNLOAD_MISREPORT_FROM_S3;
      const payload: any = {
        invoiceNo: identifier === "invoice" ? value + "_invoice" : value,
      };
      const { data: response }: any = await POST(api, payload);

      if (response?.success) {
        toast.success(response.message);
        const url = response?.url;
        window.open(url, "_blank");
      } else {
        toast.error(response?.error);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <div className="mt-2">
      <div className="mb-3 flex justify-between items-center">
        <p className="text-[14px] open-sans font-medium">
          {invoiceData?.length} Invoices
        </p>
        {/* <OneButton
          text={"DOWNLOAD ALL"}
          onClick={(e: any) => handleDownload(e)}
          showIcon={true}
          variant="secondary"
          className="w-[100px]"
          icon={DownloadIcon}
        /> */}
      </div>
      {invoiceData?.map((invoice: any, index: any) => {
        const isOpen = cardOpen === index;
        return (
          <div>
            <div className="border-b border-l border-r border-[#E8E8E8] rounded-t-lg rounded-b-lg mt-4 shadow-md">
              <div
                className="bg-opacity-30 flex items-center justify-between border border-[#E8E8E8] px-3 rounded-t-lg py-2 bg-[#E8E8E8]"
                onClick={() => handleAccordian(index)}
              >
                <div className="">
                  <p className="mt-2 text-[#1C1C1C] text-[16px] font-medium max-w-[180px] whitespace-nowrap overflow-x-scroll customScroll">
                    {invoice?.invoiceNo || 0}
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  {invoice?.status && (
                    <div
                      className={`border border-[#F0A22E] px-2 py-1
                ${
                  invoice?.status === "PAID"
                    ? "border border-green-500 bg-[#F2FAEF]"
                    : invoice?.status === "UNPAID"
                    ? "border border-[#F0A22E] bg-[#FDF6EA]"
                    : "border border-red-500 bg-[#FEEEEB]"
                }
                `}
                    >
                      <p
                        className={`text-[#F0A22E] text-[12px] font-medium w-[50px] justify-center items-center text-center ${
                          invoice?.status === "PAID"
                            ? "text-green-500"
                            : invoice?.status === "UNPAID"
                            ? "text-[#F0A22E]"
                            : "text-red-500"
                        }`}
                      >
                        {invoice?.status || "-"}
                      </p>
                    </div>
                  )}
                  <div>
                    <img
                      src={isOpen ? DownIcon : UpIcon}
                      alt=""
                      className="h-7 w-7"
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <>
                  <div className="flex justify-between px-4 py-2">
                    <div>
                      <div>
                        <p className="text-[12px] open-sans text-[#777777]">
                          Invoice Date
                        </p>
                        <p className="text-[14px] open-sans">
                          {invoice?.reportNumber || 0}
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-[12px] open-sans text-[#777777]">
                          Invoice Amount
                        </p>
                        <p className="text-[14px] open-sans">
                          ₹ {invoice?.billAmount || 0}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="border-l-2 pl-4">
                        <p className="text-[12px] open-sans text-[#777777]">
                          Due Date
                        </p>
                        <p className="text-[14px] open-sans">
                          {invoice?._id?.billingDate || "-"}
                        </p>
                      </div>
                      <div className="mt-2 border-l-2 pl-4">
                        <p className="text-[12px] open-sans text-[#777777]">
                          Payable Amount
                        </p>
                        <p className="text-[14px] open-sans"> {"-"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-x-6 px-4 my-1 mb-4">
                    {/* <div className="flex gap-x-2">
                      <img src={BlueBill} alt="" />
                      <p className="text-[#004EFF] text-[14px] font-medium cursor-pointer">
                        PAY NOW
                      </p>
                    </div> */}
                    <div
                      className="flex gap-x-2"
                      onClick={() => handleDownload(invoice?.invoiceNo, "MIS")}
                    >
                      <img src={DowbloadIcon} alt="" />
                      <p className="text-[#004EFF] text-[14px] font-medium cursor-pointer">
                        MIS
                      </p>
                    </div>
                    <div
                      className="flex gap-x-2"
                      onClick={() =>
                        handleDownload(invoice?.invoiceNo, "Invoice")
                      }
                    >
                      <img src={DowbloadIcon} alt="" />
                      <p className="text-[#004EFF] text-[14px] font-medium cursor-pointer">
                        INVOICE
                      </p>
                    </div>
                    {/* <div className="flex gap-x-2">
                      <img src={SendButton} alt="" />
                      <p className="text-[#004EFF] text-[14px] font-medium cursor-pointer">
                        SHARE
                      </p>
                    </div> */}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InvoiceCard;
