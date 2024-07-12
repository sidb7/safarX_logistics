import React, { useState, useEffect } from "react";
import UpwardArrow from "../../../assets/AccordionUp.svg";
import DownwardArrow from "../../../assets/downwardArrow.svg";

const PaymentDetails = (completeData: any) => {
  const paymentdetails = completeData?.completeData?.codInfo;

  const [accordianOpen, setOpenAccordian] = useState<any>(false);
  const [paymentDetails, setPaymentDetails] = useState<any>({
    paymentType: "",
    collectableAmount: 0,
    invoiceValue: 0,
  });

  useEffect(() => {
    setPaymentDetails({
      ...paymentdetails,
      paymentType: paymentdetails?.isCod,
      collectableAmount: paymentdetails?.collectableAmount,
      invoiceValue: paymentdetails?.invoiceValue,
    });
  }, [completeData]);
  return (
    <div className="mx-4 mt-4">
      <div
        className="flex justify-between border p-4 rounded-lg  border-[#E8E8E8]"
        onClick={() => setOpenAccordian(!accordianOpen)}
      >
        <p className="text-base">Payment Details</p>
        {accordianOpen ? (
          <img src={UpwardArrow} alt="icon" />
        ) : (
          <img src={DownwardArrow} alt="icon" />
        )}
      </div>
      {accordianOpen && (
        <div className="mb-4 border-l border-r border-b rounded-lg border-[#E8E8E8] px-4 py-4 ">
          <div className="p-4 border border-[#E8E8E8] rounded-md bg-gray-50">
            <div className="flex justify-between mb-2">
              <p className="text-base">Payment Type</p>
              <p>{paymentDetails?.paymentType === false ? "PREPAID" : "COD"}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-base">Collectable Amount</p>
              <p>
                {paymentDetails?.collectableAmount === ""
                  ? "-"
                  : paymentDetails?.collectableAmount}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-base">Invoice Amount</p>
              <p>
                {paymentDetails?.invoiceValue === ""
                  ? "-"
                  : paymentDetails?.invoiceValue}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
