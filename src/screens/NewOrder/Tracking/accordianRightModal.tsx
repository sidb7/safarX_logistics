import React, { useState, useEffect } from "react";
import OneAccordion from "../../../components/OneAccordion/OneAccordion";
import {
  GET_COURIER_PARTNER_SERVICE,
  GET_SELLER_ORDER_COMPLETE_DATA,
} from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import CustomInputBox from "../../../components/Input";
import {
  capitalizeFirstLetter,
  convertEpochToDateTime,
} from "../../../utils/utility";
import { convertEpochToDateTimeV2 } from "../../../utils/utility";
import { date_DD_MMM_YYYY_HH_MM_SS } from "../../../utils/dateFormater";

interface AccordianRightModalProps {
  awb: string | null;
  onClose: () => void;
}

const AccordianRightModal: React.FC<AccordianRightModalProps> = ({
  awb,
  onClose,
}) => {
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSellerOrderCompleteData = async () => {
    setIsLoading(true);
    try {
      const requestBody = {
        awb: awb,
      };

      const response = await POST(GET_SELLER_ORDER_COMPLETE_DATA, requestBody);
      setOrderData(response?.data?.data?.[0]?.data?.[0] || []);
      console.log(
        "Seller Order Complete Data:",
        response?.data?.data?.[0]?.data?.[0]
      );
    } catch (error: any) {
      console.log("Error fetching seller order complete data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (awb) {
      getSellerOrderCompleteData();
    }
  }, [awb]);

  const boxOrders = [
    {
      title: `Box  (${orderData?.boxInfo?.[0]?.name})`,
      content: (
        <div>
          <div className="my-3">
            <CustomInputBox
              label="Box Name)"
              value={orderData?.boxInfo?.[0]?.name || "N/A"}
              isDisabled={true}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <CustomInputBox
              label="Dead Weight (Kg)"
              value={orderData?.boxInfo?.[0]?.deadWeight || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="Volumetric Weight"
              value={orderData?.boxInfo?.[0]?.volumetricWeight || "N/A"}
              isDisabled={true}
            />
            <div className="col-span-1">
              <CustomInputBox
                label="Measure Unit"
                value={orderData?.boxInfo?.[0]?.measureUnit || "N/A"}
                isDisabled={true}
              />
            </div>
            <div className="col-span-1 grid grid-cols-3 gap-2">
              <CustomInputBox
                label="L"
                value={orderData?.boxInfo?.[0]?.length || "N/A"}
                isDisabled={true}
              />
              <CustomInputBox
                label="B"
                value={orderData?.boxInfo?.[0]?.breadth || "N/A"}
                isDisabled={true}
              />
              <CustomInputBox
                label="H"
                value={orderData?.boxInfo?.[0]?.height || "N/A"}
                isDisabled={true}
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const productItems =
    orderData?.boxInfo?.[0]?.products?.map((data: any, index: number) => ({
      title: `Product (${data.title})`,
      content: (
        <div className="grid grid-cols-2 gap-4">
          <CustomInputBox
            label="Dead Weight (Kg)"
            value={data?.deadWeight || "N/A"}
            isDisabled={true}
          />
          <CustomInputBox
            label="Volumetric Weight"
            value={data?.volumetricWeight || "N/A"}
            isDisabled={true}
          />
          <div className="col-span-1">
            <CustomInputBox
              label="Measure Unit"
              value={data?.weightUnit || "N/A"}
              isDisabled={true}
            />
          </div>
          <div className="col-span-1 grid grid-cols-3 gap-2">
            <CustomInputBox
              label="L"
              value={data?.length || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="B"
              value={data?.breadth || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="H"
              value={data?.height || "N/A"}
              isDisabled={true}
            />
          </div>
        </div>
      ),
    })) || [];

  // console.log("product Items",orderData?.boxInfo?.[0]?.products?.[0]?.unitPrice)
  console.log("product Items", productItems);

  const accordionItems = [
    {
      title: "Pickup Address",
      content: (
        <div className="max-w-4xl mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInputBox
              label="Contact Name"
              value={orderData?.pickupAddress?.contact?.name || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="Mobile No"
              value={orderData?.pickupAddress?.contact?.mobileNo || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="Email Id"
              value={orderData?.pickupAddress?.contact?.emailId || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="FlatNo"
              value={orderData?.pickupAddress?.flatNo || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="Locality"
              value={orderData?.pickupAddress?.locality || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="LandMark"
              value={orderData?.pickupAddress?.landmark || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="City"
              value={orderData?.pickupAddress?.city || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="State"
              value={orderData?.pickupAddress?.state || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="Country"
              value={orderData?.pickupAddress?.country || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="Pincode"
              value={orderData?.pickupAddress?.pincode || "N/A"}
              isDisabled={true}
            />
          </div>

          <div className="mt-4">
            <CustomInputBox
              label="Pick-Up Date"
              value={
                date_DD_MMM_YYYY_HH_MM_SS(
                  orderData?.pickupAddress?.pickupDate
                ) || "N/A"
              }
              isDisabled={true}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Delivery Address",
      content: (
        <div className="max-w-4xl mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInputBox
              label="Contact Name"
              value={orderData?.deliveryAddress?.contact?.name || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="Mobile No"
              value={orderData?.deliveryAddress?.contact?.mobileNo || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="Email Id"
              value={orderData?.deliveryAddress?.contact?.emailId || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="FlatNo"
              value={orderData?.deliveryAddress?.flatNo || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="Locality"
              value={orderData?.deliveryAddress?.locality || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="LandMark"
              value={orderData?.deliveryAddress?.landmark || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="City"
              value={orderData?.deliveryAddress?.city || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="State"
              value={orderData?.deliveryAddress?.state || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="Country"
              value={orderData?.deliveryAddress?.country || "N/A"}
              isDisabled={true}
            />
            <CustomInputBox
              label="Pincode"
              value={orderData?.deliveryAddress?.pincode || "N/A"}
              isDisabled={true}
            />
          </div>

          <div className="mt-4">
            <CustomInputBox
              label="Pick-Up Date"
              value={
                date_DD_MMM_YYYY_HH_MM_SS(
                  orderData?.pickupAddress?.pickupDate
                ) || "N/A"
              }
              isDisabled={true}
            />
          </div>
        </div>
      ),
    },
    {
      title: `Box and Product`,
      content: (
        <div>
          {productItems?.length > 0 ? (
            <OneAccordion items={productItems || []} />
          ) : (
            <p>No product information available</p>
          )}

          <OneAccordion items={boxOrders || []} />
        </div>
      ),
    },
    {
      title: "Payment Details",
      content: (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm mx-auto">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Payment Type</span>
              <span className="text-gray-900">
                {orderData?.codInfo?.isCod ? "COD" : "PREPAID"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">
                Collectable Amount
              </span>
              <span className="text-gray-900">
                {orderData?.codInfo?.collectableAmount || "0"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Invoice Value</span>
              <span className="text-gray-900">
                {orderData?.codInfo?.invoiceValue || "N/A"}
              </span>
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Services",
      content: (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Partner Name</span>
              <span className="font-medium">
                {orderData?.service?.partnerName}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Service Mode</span>
              <span className="font-medium">
                {orderData?.service?.serviceMode}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Applied Weight</span>
              <span className="font-medium">
                {orderData?.service?.appliedWeight} Kg
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Freight Charges</span>
              <span className="font-medium">
                ₹{" "}
                {` ${Math.round(
                  orderData?.service?.add + orderData?.service?.base
                )?.toLocaleString("en-IN")}`}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Other Charges</span>
              <span className="font-medium">
                ₹ {orderData?.service?.variables}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">COD Charges</span>
              <span className="font-medium">₹ {orderData?.service?.cod}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Insurance</span>
              <span className="font-medium">
                ₹ {orderData?.service?.insurance}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">₹ {orderData?.service?.tax}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span>Total</span>
              <span>₹ {orderData?.service?.total}</span>
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Event Logs",
      content: (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          {/* <h2 className="text-xl font-bold mb-4">Status Timeline</h2> */}
          <div className="space-y-4">
            {orderData?.status?.map((status: any, index: any) => (
              <div
                key={status.logId}
                className="border-b border-gray-200 pb-4 last:border-b-0"
              >
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-600 font-medium">AWB:</span>
                  <span>{status.awb}</span>
                  <span className="text-gray-600 font-medium">Status:</span>
                  <span>{status.currentStatus}</span>
                  <span className="text-gray-600 font-medium">
                    Description:
                  </span>
                  <span>{status.description}</span>
                  <span className="text-gray-600 font-medium">Time:</span>
                  <span>{convertEpochToDateTimeV2(status.timeStamp)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Order History",
      content: (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Shipyaari ID</span>
              <span>{orderData?.tempOrderId || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Order Id</span>
              <input
                type="text"
                value={orderData?.orderId || "N/A"}
                readOnly
                className="border border-gray-300 rounded px-2 py-1 w-32 text-right"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Tracking Id</span>
              <span>{orderData?.awb || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Eway Bill NO</span>
              <span>{orderData?.boxInfo?.[0]?.eWayBillNo || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Source</span>
              <span>{orderData?.source || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Order Type</span>
              <span>{orderData?.orderType || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Zone</span>
              <span>{orderData?.zone || "N/A"}</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  console.log("Order Data:", orderData);
  // console.log("box data>>>>>>",boxOrders)

  return (
    <div className=" h-full  overflow-y-scroll">
      <div className="w-full p-4">
        <div className="bg-blue-50 p-4 text-blue-800 font-medium text-md shadow-sm rounded flex justify-between items-center">
          <span>Shipyard ID: {awb}</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 ml-4"
            aria-label="Close"
          >
            x
          </button>
        </div>
      </div>
      <div className="p-4">
      {isLoading ? <p>Loading...</p> : <OneAccordion items={accordionItems} />}
      </div>
    </div>
  );
};

export default AccordianRightModal;
