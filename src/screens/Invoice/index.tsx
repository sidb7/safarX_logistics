import React, { useEffect, useState } from "react";
import DownloadIcon from "../../../src/assets/download.svg";
import { GET, POST } from "../../utils/webService";
import {
  FETCH_MANIFEST_REPORT_DATA,
  GET_ALL_INVOICES,
  GET_SINGLE_FILE,
} from "../../utils/ApiUrls";
import { toast } from "react-toastify";
import {
  capitalizeFirstLetter,
  convertEpochToDateTime,
} from "../../utils/utility";

const InvoicePdf = () => {
  const [invoicData, setInvoicData] = useState<any>();
  const downloadAsPdf = async (url: any) => {
    try {
      const { data } = await POST(GET_SINGLE_FILE, {
        fileName: `invoices/${url}.pdf`,
      });
      if (data?.status) {
        window.location.href = data?.data;
        toast.success(data?.meesage);
      } else {
        toast.error(data?.meesage);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  const downloadExcelReport = async () => {
    const data = await GET(
      `${FETCH_MANIFEST_REPORT_DATA}?invoiceNo=${invoicData?.invoiceNo}`
    );

    var blob = new Blob([data], {
      type: "application/vnd.ms-excel",
    });
    var url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice_${invoicData?.invoiceNo}.xlsx`;
    a.click();
  };

  const fetchSinglInvoice = async (id: any) => {
    const { data } = await POST(GET_ALL_INVOICES, { invoiceNo: id });
    if (data?.success) {
      setInvoicData(data?.data[0]);
    } else {
      toast.error(data?.message);
    }
  };

  useEffect(() => {
    const GetCurrentPath = () => {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      const location = url;
      const path = location.pathname;
      const pathArray = path.split("/");
      const removedFirstPath = pathArray.slice(1);
      return removedFirstPath;
    };

    const urldata = GetCurrentPath();
    fetchSinglInvoice(urldata[2]);
  }, []);
  return (
    <div
      id="rootPDF"
      className="px-[225px] py-6 h-max text-[12px] font-Arial bg-[rgba(235,235,235,1)]"
    >
      <div className="py-[2mm] rounded-lg bg-white relative">
        <div className=" px-[32px] flex justify-between mt-5">
          <div className="w-[60%]">
            <div className="mt-2">
              <img
                src="https://sy-seller.s3.ap-south-1.amazonaws.com/Shipyaari_RGB_full_color-512wpx+(8).png"
                alt="shipyaari"
                width={200}
              />
            </div>
            <p>
              <b>{capitalizeFirstLetter(invoicData?.companyInfo?.name)}</b>
            </p>
            <p>{capitalizeFirstLetter(invoicData?.companyInfo?.address)}</p>
            <p>
              <b>Phone:</b>+91-{invoicData?.companyInfo?.mobileNo}
            </p>
            <p>
              <b>Email:</b>
              {invoicData?.companyInfo?.emailId}
            </p>
          </div>
          <div className="w-[20%]">
            <p>
              <strong>TAX INVOICE</strong>
            </p>
            <p className="text-[25px] font-semibold text-[#008000] mt-2">
              PAID
            </p>
            <p
              onClick={() => downloadAsPdf(invoicData?.invoiceUrl)}
              className="flex gap-2 text-blue-500 cursor-pointer"
            >
              <img src={DownloadIcon} alt="download" />
              Download Invoice
            </p>
          </div>
          <div className="">
            <img
              src="https://s3-ap-south-1.amazonaws.com/sr-bills-mum/files/e213741da29f3dedd2a207b8278fde59.png"
              alt="qrcode"
            />
          </div>
        </div>
        <div className="px-[32px] flex justify-between mt-5">
          <div className="w-[60%]">
            <p>
              <b className="mr-1">PAN Number:</b>
              <span>{invoicData?.companyInfo?.panNo}</span>
            </p>
            <p>
              <b className="mr-1">CIN Number:</b>
              <span>{invoicData?.companyInfo?.cinNo}</span>
            </p>
            <p>
              <b className="mr-1">GSTIN:</b>
              <span>{invoicData?.companyInfo?.gstIn}</span>
            </p>
            <p>
              <b>IRN:</b>
              <span>{invoicData?.companyInfo?.irn}</span>
            </p>
          </div>
          <div>
            <p>
              <b className="mr-1">Invoice No.</b>
              <span>{invoicData?.invoiceNo}</span>
            </p>
            <p>
              <b className="mr-1">Invoice Date :</b>
              <span>{convertEpochToDateTime(invoicData?.invoiceNo)}</span>
            </p>
            <p>
              <b className="mr-1">Due Date :</b>
              <span>{convertEpochToDateTime(invoicData?.endDate)}</span>
            </p>
          </div>
          <div className="w-[115px]"></div>
        </div>
        <hr className="border-b-1 my-4 border-black" />
        <div className="px-[32px] flex justify-between mt-5">
          <div className="w-[60%]">
            <p>
              <b className="mr-1">Invoice To:</b>
            </p>
            <p className="w-[16rem]">
              {capitalizeFirstLetter(invoicData?.invoiceTo?.name)}
            </p>
            <p className="w-[16rem]">
              {capitalizeFirstLetter(invoicData?.invoiceTo?.address)}
            </p>
          </div>
          <div>
            <p>
              <b className="mr-1">State Code.</b>
              <span>{invoicData?.invoiceTo?.stateCode}</span>
            </p>
            <p>
              <b className="mr-1">Place of Supply: </b>
              <span>
                {capitalizeFirstLetter(invoicData?.invoiceTo?.placeOfSupply)}
              </span>
            </p>
            <p>
              <b className="mr-1">GSTIN:</b>
              <span>{invoicData?.invoiceTo?.gstIn}</span>
            </p>
            <p>
              <b className="mr-1">Reverse Charge:</b>
              <span>
                {invoicData?.invoiceTo?.reverseCharge === true ? "Yes" : "No"}
              </span>
            </p>
          </div>
          <div className="w-[143px]"></div>
        </div>
      </div>
      <div className="py-3 mt-3 rounded-xl bg-white">
        <table
          cellPadding={0}
          cellSpacing={0}
          border={0}
          className="fluid-table w-full"
        >
          <thead>
            <tr>
              <th className="w-[25%] text-[0.875rem] font-bold p-3 pl-[60px] text-left">
                SAC No.
              </th>
              <th className="w-[65%] text-[0.875rem] font-bold p-3 pl-[60px] text-left">
                Description
              </th>
              <th className="w-[20%] text-[0.875rem] font-bold p-3 text-right pr-[30px]">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="stripedCss">
            <tr>
              <td className="pl-[60px] text-[0.875rem] font-normal p-3 text-left">
                996812
              </td>
              <td className="pl-[60px] text-[0.875rem] font-normal p-3 text-left">
                Shiprocket V2 Freight*
              </td>
              <td className=" text-right text-[0.625rem] font-normal p-3 pr-[30px]">
                ₹{invoicData?.charges?.frieghtCharge}
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="pl-[60px] text-[0.875rem] font-normal p-3 text-left">
                18.00% IGST
              </td>
              <td className="text-right text-[0.625rem] font-normal p-3 pr-[30px]">
                ₹{invoicData?.charges?.tax}
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="pl-[60px] p-3  text-[0.875rem] font-normal text-left ">
                Grand Total Value
              </td>
              <td className="text-right text-[0.675rem] font-normal p-3 pr-[30px]">
                ₹{invoicData?.charges?.total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="py-3 mt-3 rounded-xl bg-white">
        <table
          cellPadding={0}
          cellSpacing={0}
          border={0}
          className="fluid-table w-full"
        >
          <thead>
            <tr>
              <th className="w-[20%] pl-[60px] text-[0.875rem] font-bold text-left">
                Transaction Date
              </th>
              <th className="w-[20%] pl-[60px] text-[0.875rem] font-bold text-left">
                Gateway
              </th>
              <th className="w-[20%] pl-[60px] text-[0.875rem] font-bold text-left">
                Transaction ID
              </th>
              {/* <th className="w-[20%] pl-[60px] text-left">Amount</th> */}
              <th className="w-[20%] text-right text-[0.875rem] font-bold pr-[30px]">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="stripedCss">
            <tr>
              <td className="pl-[60px] text-[0.875rem] font-normal text-left">
                30/10/2023
              </td>
              <td className="pl-[60px] text-[0.875rem] font-normal text-left">
                Credit Balance
              </td>
              <td className="pl-[60px] text-[0.875rem] font-normal text-left">
                NA
              </td>
              {/* <td className="pl-[60px] text-left"></td> */}
              <td className="text-right text-[0.625rem] font-normal pr-[30px]">
                ₹4,431.31
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="pl-[60px] text-[0.875rem] font-bold text-left">
                Amount Due
              </td>
              {/* <td></td> */}
              <td className="text-righttext-[0.875rem] font-normal pr-[30px]">
                ₹0.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="py-3 mt-3 rounded-xl bg-white">
        <p className="pl-[60px]  text-[0.875rem] font-bold mb-3">
          <b>Bank and Other Commercial Details</b>
        </p>
        <hr className="border-b-1 border-black" />
        <div className="pl-[60px]">
          <p>All Payments by transfer/check/DD should be draw in favour of</p>
          <p>
            <b className="text-[0.75rem] font-bold">Entity Name:</b>
            <span className="text-[0.75rem] font-normal">
              {invoicData?.companyInfo?.accountName}
            </span>
          </p>
          <p>
            <b className="text-[0.75rem] font-bold">Account number: </b>
            <span className="text-[0.75rem] font-normal">
              {invoicData?.companyInfo?.accountNo}
            </span>
          </p>
          <p>
            <b className="text-[0.75rem] font-bold">Bank:</b>
            <span className="text-[0.75rem] font-normal">
              {invoicData?.companyInfo?.bankName}
            </span>
          </p>
          <p>
            <b className="text-[0.75rem] font-bold">Branch:</b>
            <span className="text-[0.75rem] font-normal">
              {invoicData?.companyInfo?.branchName}
            </span>
          </p>
          <p>
            <b className="text-[0.75rem] font-bold">RTGS/NEFT/IFSC Code:</b>
            <span className="text-[0.75rem] font-normal">
              {invoicData?.companyInfo?.ifscCode}
            </span>
          </p>
        </div>
      </div>
      <div className="py-3 flex justify-between px-[60px] mt-3 rounded-xl bg-white">
        <div className="flex gap-2 items-center">
          <p className="text-[0.875rem] font-bold">
            Download Itemized Shipment Details:
          </p>
          <span
            className="bg-[#000] p-[0.625rem] text-white text-[0.875rem] font-semibold rounded-md px-1 cursor-pointer"
            onClick={() => downloadExcelReport()}
          >
            Download Now
          </span>
        </div>
      </div>
      <div className="py-3 px-[60px] mt-3 text-[0.75rem] font-normal rounded-xl bg-white">
        <p>
          If you have any kind of discrepancy on the bills, please escalate it
          with your key account manager or write to us at{" "}
          <a href="email:care@shipyaari.com" className="text-blue-500 mr-2">
            care@shipyaari.com
          </a>
          within 15 calendar days of invoice date. Post 15 calendar days,
          Shiprocket will not be able to settle any kind of dispute on the
          bills.
        </p>
        <p className="text-center">
          This is a computer generated invoice and does not require signature.
        </p>
      </div>
      <div className="mt-3 rounded-xl bg-white">
        <img
          src="https://sy-seller.s3.ap-south-1.amazonaws.com/assets/invoice_bottom.png"
          width="100%"
          alt="banner"
        />
      </div>
    </div>
  );
};

export default InvoicePdf;
