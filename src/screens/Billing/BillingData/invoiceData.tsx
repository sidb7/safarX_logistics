import React, { useState } from "react";
import { CustomTable } from "../../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import {
  capitalizeFirstLetter,
  convertEpochToDateTime,
} from "../../../utils/utility";
import copyIcon from "../../../assets/copy.svg";
import sortIcon from "../../../assets/sort.svg";
import downloadIcon from "../../../assets/download.svg";
import exportIcon from "../../../assets/export.svg";
import infoIcon from "../../../assets/info.svg";
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

  // const [data, setData] = useState(invoiceData);

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
      data: {
        invoiceNo: invoiceId.replace(/-\d+\/\d+-/, "-"),
      },
    };

    try {
      setLoading({ ...loading, [identifier]: { isLoading: true, key: index } });
      const { data: response }: any = await POST(api, payload);

      if (response?.success && response?.data?.length > 0) {
        toast.success(response.message);
        // history.push("/finance/billed-invoice/invoice-details");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching the billed invoice data.");
    } finally {
      setLoading({ ...loading, [identifier]: { isLoading: false, key: "" } });
    }
  };

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
        return (
          <div className="py-4">
            <p className="font-Open text-sm font-normal leading-5">
              {info?.row?.original?._id}
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
              {convertEpochToDateTime(info?.row?.original?.billingDate)}
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
              {convertEpochToDateTime(info?.row?.original?.billingDate)}
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
            <p>₹{info?.row?.original?.totalShippingBillValue}</p>
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
        return (
          <div className="">
            {/* <span className=" border-[#d4b27f] border-[1px] p-2 rounded-md bg-[#f4eee5] text-[#d4b27f] font-semibold">
              PAID
            </span> */}
            {info.row.original.invoiceStatus === "Unpaid" ? (
              <span className=" border-[#d4b27f] border-[1px] p-2 rounded-md bg-[#f4eee5] text-[#d4b27f] font-semibold">
                {capitalizeFirstLetter(info.row.original.invoiceStatus)}
              </span>
            ) : info.row.original.invoiceStatus === "Paid" ? (
              <span className=" border-[#95d47f] border-[1px] p-2 rounded-md bg-[#eff8ec] text-[#95d47f] font-semibold">
                {capitalizeFirstLetter(info.row.original.invoiceStatus)}
              </span>
            ) : (
              <span className=" border-[#f35838] border-[1px] p-2 rounded-md bg-[#f9f0ee] text-[#f35838] font-semibold">
                {capitalizeFirstLetter(info.row.original.invoiceStatus)}
              </span>
            )}
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
        return (
          <div
            className="flex gap-x-5"
            onClick={() => openInvoice(info?.row?.original?.invoiceNo)}
          >
            <img className="cursor-pointer" src={exportIcon} alt="" />
            {/* {info.row.original.status === "Unpaid" ? (
              <span className="underline text-[#004EFF]">PAY NOW</span>
            ) : (
              <>
                <img className="cursor-pointer" src={downloadIcon} alt="" />
                <img className="cursor-pointer" src={exportIcon} alt="" />
              </>
            )} */}
            <div className="flex gap-x-4">
              <button
                className="flex gap-x-2 items-center"
                onClick={() =>
                  downloadInvoices(
                    info?.row?.original?._id,
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
                  <img src={downloadIcon} alt="download" />
                )}

                <p className="text-xs">MIS</p>
              </button>
              <button
                className="flex gap-x-2 items-center"
                onClick={() =>
                  downloadInvoices(
                    info?.row?.original?._id,
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

  // new column
  // const billingOrdersHeading = [
  //   columnsHelper.accessor("_id", {
  //     header: () => <div className="text-left">Invoice ID</div>,
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnsHelper.accessor("totalTrackingNumber", {
  //     header: () => <div className="text-left">Total Shipments</div>,
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnsHelper.accessor("appliedWeight", {
  //     header: () => <div className="text-left">Total Weight</div>,
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnsHelper.accessor("appliedForwardAmount", {
  //     header: () => <div className="text-left">Grand Total</div>,
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnsHelper.accessor("amountPaid", {
  //     header: () => <div className="text-left">Amount Paid</div>,
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnsHelper.accessor("amountAdjusted", {
  //     header: () => <div className="text-left">Net Due Amount</div>,
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnsHelper.accessor("amountDisputed", {
  //     header: () => <div className="text-left">Amount Assigned</div>,
  //     cell: (info) => info.getValue(),
  //   }),
  //   columnsHelper.accessor("actions", {
  //     header: () => <div className="text-left">Actions</div>,
  //     cell: (info) => {
  //       const rowData: any = info.row.original;
  //       console.log(rowData);
  //       return (
  //         <div
  //           className="cursor-pointer mb-2  text-blue-500 text-[16px]  font-semibold font-Open lg:text-[16px] mt- py-5"
  //           // onClick={() => {
  //           //   // navigate(
  //           //   //   `/finance/cod-adjustment/orders-by-report/${info.getValue()}`
  //           //   // );
  //           //   navigate(
  //           //     `/finance/billed-invoices/report-invoice/${info.getValue()}`
  //           //   );
  //           //   localStorage.setItem("dailyReportNumber", `${info.getValue()}`);
  //           // }}
  //         >
  //           <div className="flex gap-x-4">
  //             <button
  //               className="flex gap-x-2 items-center"
  //               onClick={() =>
  //                 downloadInvoices(rowData?._id, info.row.index, "invoice")
  //               }
  //             >
  //               {loading?.invoice?.isLoading &&
  //               loading?.invoice?.key === info.row.index ? (
  //                 <div className="flex justify-between items-center">
  //                   <Spinner className="!w-[14px] !h-[14px]" />
  //                 </div>
  //               ) : (
  //                 <img src={downloadIcon} alt="download" />
  //               )}

  //               <p className="text-xs">MIS</p>
  //             </button>
  //             <button
  //               className="flex gap-x-2 items-center"
  //               onClick={() =>
  //                 downloadInvoices(rowData?._id, info.row.index, "mis")
  //               }
  //             >
  //               {loading?.mis?.isLoading &&
  //               loading?.mis?.key === info.row.index ? (
  //                 <div className="flex justify-between items-center">
  //                   <Spinner className="!w-[14px] !h-[14px]" />
  //                 </div>
  //               ) : (
  //                 <img
  //                   src={downloadIcon}
  //                   alt="download"
  //                   className="text-[#004Eff]"
  //                 />
  //               )}
  //               <p className="text-xs">INVOICE</p>
  //             </button>
  //           </div>
  //         </div>
  //       );
  //     },
  //   }),
  // ];
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
