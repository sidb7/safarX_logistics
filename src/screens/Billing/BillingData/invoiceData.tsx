import React, { useState } from "react";
import { CustomTable } from "../../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { convertEpochToDateTime } from "../../../utils/utility";
import sortIcon from "../../../assets/sort.svg";
import downloadIcon from "../../../assets/download.svg";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../components/Spinner";
import {
  DOWNLOAD_INVOICE_FROM_S3,
  DOWNLOAD_MISREPORT_FROM_S3,
} from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import toast from "react-hot-toast";

interface IInvoiceDataProps {
  invoiceData: any;
}

const InvoiceData: React.FunctionComponent<IInvoiceDataProps> = ({
  invoiceData,
}) => {
  const columnsHelper = createColumnHelper<any>();
  const navigate = useNavigate();
  const [loading, setLoading]: any = useState({
    invoice: { isLoading: false, key: "" },
    mis: { isLoading: false, key: "" },
  });

  const openInvoice = (id: any) => {
    navigate(`/billing/invoice/${id}`);
  };

  const downloadInvoices = async (
    invoiceId: string,
    index: number,
    identifier: any
  ) => {
    const api =
      identifier === "invoice"
        ? DOWNLOAD_INVOICE_FROM_S3
        : DOWNLOAD_MISREPORT_FROM_S3;

    const payload: any = {
      invoiceNo: identifier === "invoice" ? invoiceId + "_invoice" : invoiceId,
    };

    try {
      console.log("identifier", identifier, index);
      setLoading({ ...loading, [identifier]: { isLoading: true, key: index } });

      const { data: response }: any = await POST(api, payload);

      if (response?.success) {
        console.log("true");
        toast.success(response.message);
        const url = response?.url;
        window.open(url, "_blank");
        setLoading(false);
        // history.push("/finance/billed-invoice/invoice-details");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching the billed invoice data.");
      setLoading(false);
    } finally {
      setLoading({ ...loading, [identifier]: { isLoading: false, key: "" } });
    }
  };

  console.log("loading", loading);

  // old data
  const billingOrdersHeading = [
    columnsHelper.accessor("invoiceId", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <h1 className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] self-center ">
              Invoice Id
            </h1>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        const invoiceId = info?.row?.original?.invoiceNo;
        console.log("invoiceId", invoiceId);
        return (
          <div className="py-4">
            <p className="font-Open text-sm font-normal leading-5">
              {/* {info?.row?.original?._id?.billingDate}
               */}
              {invoiceId}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("invoiceDate", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <h1 className="font-Open text-sm font-semibold leading-5 text-[#1C1C1C] self-center ">
              Invoice Date
            </h1>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div>
            <p className="font-Open text-sm font-normal leading-5">
              {convertEpochToDateTime(info?.row?.original?.reportNumber)}
            </p>
          </div>
        );
      },
    }),

    columnsHelper.accessor("dueDate", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Due Date
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="">
            <p className="font-Open text-sm font-normal leading-5">
              {convertEpochToDateTime(info?.row?.original?.reportNumber)}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("invoiceAmount", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Invoice Amount
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="">
            <p>₹{info?.row?.original?.billAmount}</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("status", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Status
            </p>
            <img className="cursor-pointer" src={sortIcon} alt="" />
          </div>
        );
      },

      cell: (info: any) => {
        const status = info?.row?.original?.status;
        return (
          <div className="">
            <span className=" border-[#d4b27f] border-[1px] p-2 rounded-md bg-[#f4eee5] text-[#d4b27f] font-semibold">
              {status || "Unpaid"}
            </span>
          </div>
        );
      },
    }),
    columnsHelper.accessor("actions", {
      header: () => {
        return (
          <div className="flex justify-between ">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center ">
              Actions
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        console.log(
          "loading?.invoice?.isLoading",
          loading?.invoice?.isLoading &&
            loading?.invoice?.key === info.row.index
        );
        console.log(
          "loading?.mis?.isLoading",
          loading?.mis?.isLoading && loading?.mis?.key === info.row.index
        );
        return (
          <div
            className="flex gap-x-5"
            // onClick={() => openInvoice(info?.row?.original?.invoiceNo)}
          >
            <div className="flex gap-x-4">
              <button
                className="flex gap-x-2 items-center"
                onClick={() =>
                  downloadInvoices(
                    info?.row?.original?.invoiceNo,
                    info.row.index,
                    "mis"
                  )
                }
              >
                {loading?.mis?.isLoading &&
                loading?.mis?.key === info.row.index ? (
                  <div className="flex justify-between items-center">
                    <Spinner className="!w-[14px] !h-[14px]" />
                  </div>
                ) : (
                  <img src={downloadIcon} alt="download" />
                )}

                <p className="text-xs">MIS</p>
              </button>
              <button
                className="flex gap-x-2 items-center"
                onClick={() =>
                  downloadInvoices(
                    info?.row?.original?.invoiceNo,
                    info.row.index,
                    "invoice"
                  )
                }
              >
                {loading?.invoice?.isLoading &&
                loading?.invoice?.key === info.row.index ? (
                  <div className="flex justify-between items-center">
                    <Spinner className="!w-[14px] !h-[14px]" />
                  </div>
                ) : (
                  <img
                    src={downloadIcon}
                    alt="download"
                    className="text-[#004Eff]"
                  />
                )}
                <p className="text-xs">INVOICE</p>
              </button>
            </div>
          </div>
        );
      },
    }),
  ];

  return (
    <div>
      <CustomTable
        columns={billingOrdersHeading}
        data={invoiceData}
        thclassName={" bg-white"}
      />
    </div>
  );
};

export default InvoiceData;
