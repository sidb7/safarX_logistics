import React, { useEffect, useState } from "react";
import DownloadIcon from "../../../src/assets/download.svg";
import { POST } from "../../utils/webService";
import { GET_ALL_INVOICES, GET_SINGLE_FILE } from "../../utils/ApiUrls";
import { toast } from "react-toastify";
import { convertEpochToDateTime } from "../../utils/utility";

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
        <div className="px-[25px] mt-2">
          <img
            src="https://sy-seller.s3.ap-south-1.amazonaws.com/Shipyaari_RGB_full_color-512wpx+(8).png"
            alt="shipyaari"
            width={200}
          />
        </div>
        <div className="absolute right-10 top-5">
          <img
            src="https://s3-ap-south-1.amazonaws.com/sr-bills-mum/files/e213741da29f3dedd2a207b8278fde59.png"
            alt="qrcode"
          />
        </div>
        <div className=" px-[32px] grid grid-cols-2 mt-5">
          <div className="w-[60%]">
            <p>
              <b>{invoicData?.companyInfo?.name}</b>
            </p>
            <p>{invoicData?.companyInfo?.address}</p>
            <p>
              <b>Phone:</b>+91-{invoicData?.companyInfo?.mobileNo}
            </p>
            <p>
              <b>Email:</b>
              {invoicData?.companyInfo?.emailId}
            </p>
          </div>
          <div>
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
        </div>
        <div className="px-[32px] grid grid-cols-2 mt-5">
          <div>
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
        </div>
        <hr className="border-b-1 border-black" />
        <div className=" px-[32px] grid grid-cols-2 mt-5">
          <div>
            <p>
              <b className="mr-1">Invoice To:</b>
            </p>
            <p className="w-[16rem]">{invoicData?.invoiceTo?.name}</p>
            <p className="w-[16rem]">{invoicData?.invoiceTo?.address}</p>
          </div>
          <div>
            <p>
              <b className="mr-1">State Code.</b>
              <span>{invoicData?.invoiceTo?.stateCode}</span>
            </p>
            <p>
              <b className="mr-1">Place of Supply: </b>
              <span>{invoicData?.invoiceTo?.placeOfSupply}</span>
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
              <th className="w-[25%] pl-[60px] text-left">SAC No.</th>
              <th className="w-[65%] pl-[60px] text-left">Description</th>
              <th className="w-[20%] text-right pr-[30px]">Total</th>
            </tr>
          </thead>
          <tbody className="stripedCss">
            <tr>
              <td className="pl-[60px] text-left">996812</td>
              <td className="pl-[60px] text-left">Shiprocket V2 Freight*</td>
              <td className=" text-right pr-[30px]">
                ₹{invoicData?.charges?.frieghtCharge}
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="pl-[60px] text-left">18.00% IGST</td>
              <td className="text-right pr-[30px]">
                ₹{invoicData?.charges?.tax}
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="pl-[60px] text-left font-bold">
                Grand Total Value
              </td>
              <td className="text-right pr-[30px]">
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
              <th className="w-[20%] pl-[60px] text-left">Transaction Date</th>
              <th className="w-[20%] pl-[60px] text-left">Gateway</th>
              <th className="w-[20%] pl-[60px] text-left">Transaction ID</th>
              {/* <th className="w-[20%] pl-[60px] text-left">Amount</th> */}
              <th className="w-[20%] text-right pr-[30px]">Amount</th>
            </tr>
          </thead>
          <tbody className="stripedCss">
            <tr>
              <td className="pl-[60px] text-left">30/10/2023</td>
              <td className="pl-[60px] text-left">Credit Balance</td>
              <td className="pl-[60px] text-left">NA</td>
              {/* <td className="pl-[60px] text-left"></td> */}
              <td className="text-right pr-[30px]">₹4,431.31</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="pl-[60px] font-bold text-left">Amount Due</td>
              {/* <td></td> */}
              <td className="text-right pr-[30px]">₹0.00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="py-3 mt-3 rounded-xl bg-white">
        <p className="pl-[60px] mb-3">
          <b>Bank and Other Commercial Details</b>
        </p>
        <hr className="border-b-1 border-black" />
        <div className="pl-[60px]">
          <p>All Payments by transfer/check/DD should be draw in favour of</p>
          <p>
            <b>Entity Name:</b>
            <span>{invoicData?.companyInfo?.accountName}</span>
          </p>
          <p>
            <b>Account number: </b>
            <span>{invoicData?.companyInfo?.accountNo}</span>
          </p>
          <p>
            <b>Bank:</b>
            <span>{invoicData?.companyInfo?.bankName}</span>
          </p>
          <p>
            <b>Branch:</b>
            <span>{invoicData?.companyInfo?.branchName}</span>
          </p>
          <p>
            <b>RTGS/NEFT/IFSC Code:</b>
            <span>{invoicData?.companyInfo?.ifscCode}</span>
          </p>
        </div>
      </div>
      <div className="py-3 flex justify-between px-[60px] mt-3 rounded-xl bg-white">
        <div className="flex gap-2 items-center">
          <p>Download Itemized Shipment Details:</p>
          <a
            href="#"
            className="bg-[#285eda] text-white p-[2px] rounded-sm border-1"
          >
            Download Now
          </a>
        </div>
        <div>
          <p>* Indicates taxable item</p>
        </div>
      </div>
      <div className="py-3 px-[60px] mt-3 rounded-xl bg-white">
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
          src="https://sr-cdn-mum.s3.ap-south-1.amazonaws.com/img/SRE+Seller+Invoice.png"
          width="100%"
          alt="banner"
        />
      </div>
    </div>
  );
};

export default InvoicePdf;
