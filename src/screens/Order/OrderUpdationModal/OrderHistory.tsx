import React, { useState, useEffect } from "react";
import UpwardArrow from "../../../assets/AccordionUp.svg";
import DownwardArrow from "../../../assets/downwardArrow.svg";
import { login } from "../../../redux/reducers/userReducer";
import { COMPANY_NAME } from "../../../utils/ApiUrls";

const OrderHistory = (completeData: any) => {
  const [accordianOpen, setOpenAccordian] = useState<any>(false);
  const [orderHistory, setOrderHistory] = useState<any>({
    shipyaariID: "",
    orderID: "",
    orderType: "",
    source: "",
    zone: "",
    trackingNo: "",
    ewayBillNo: "",
  });

  useEffect(() => {
    setOrderHistory({
      ...orderHistory,
      shipyaariID: completeData?.completeData?.tempOrderId,
      orderID: completeData?.completeData?.orderId,
      orderType: completeData?.completeData?.orderType,
      source: completeData?.completeData?.source,
      zone: completeData?.completeData?.zone,
      ewayBillNo: completeData?.completeData?.boxInfo?.[0]?.eWayBillNo,
      trackingNo: completeData?.completeData?.boxInfo?.[0]?.tracking?.awb,
    });
  }, [completeData]);
  return (
    <div className="m-4">
      <div
        className="flex justify-between border p-4 rounded-lg  border-[#E8E8E8]"
        onClick={() => setOpenAccordian(!accordianOpen)}
      >
        <p className="text-base">Order History</p>
        {accordianOpen ? (
          <img src={UpwardArrow} alt="icon" />
        ) : (
          <img src={DownwardArrow} alt="icon" />
        )}
      </div>
      {accordianOpen && (
        <div className="mb-4 border-l border-r border-b rounded-lg border-[#E8E8E8] px-4 py-4 ">
          <div className="flex flex-col gap-y-3 border border-black-200 px-4 rounded-lg bg-gray-50 py-4">
            <div className="flex justify-between">
              <p>{COMPANY_NAME} ID</p>
              <p>
                {orderHistory?.shipyaariID === ""
                  ? "-"
                  : orderHistory?.shipyaariID}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Order ID</p>
              <p>
                {orderHistory?.orderID === "" ? "-" : orderHistory?.orderID}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Tracking ID</p>
              <p>
                {orderHistory?.trackingNo === ""
                  ? "-"
                  : orderHistory?.trackingNo}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Eway Bill No</p>
              <p>
                {orderHistory?.ewayBillNo === ""
                  ? "-"
                  : orderHistory?.ewayBillNo}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Source</p>
              <p>{orderHistory?.source === "" ? "-" : orderHistory?.source}</p>
            </div>
            <div className="flex justify-between">
              <p>Order Type</p>
              <p>
                {orderHistory?.orderType === "" ? "-" : orderHistory?.orderType}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Zone</p>
              <p>{orderHistory?.zone === "" ? "-" : orderHistory?.zone}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
