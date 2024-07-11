import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/Button";
import LocationIcon from "../../../assets/Map/Location.svg";
import BuildingIcon from "../../../assets/shopkeeper.png";
import { POST } from "../../../utils/webService";
import { REVERSE_ORDER } from "../../../utils/ApiUrls";
import toast from "react-hot-toast";

interface Iprops {
  summaryData: any;
  setState: any;
  bookOrder: any;
  reverseModal: any;
}
const ReverseSummary = (props: Iprops) => {
  const { summaryData, setState, bookOrder, reverseModal } = props;
  const [isSummayOpen, setIsSummaryOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const backHandler = () => {
    setState({ isOpen: false, data: {} }); // close the current reverse summary modal
  };

  const bookReverseOrder = async () => {
    let codObj = summaryData?.boxArray?.[0]?.codInfo;
    codObj.isCod = false;
    setIsloading(true);
    // console.log("summaryData", summaryData);
    let productTemp = [];
    for (let i = 0; i < summaryData?.boxArray?.[0]?.products?.length; i++) {
      if (summaryData?.boxArray?.[0]?.products?.[i]?.qty !== 0) {
        let obj = {
          name: summaryData?.boxArray?.[0]?.products?.[i]?.name,
          category: summaryData?.boxArray?.[0]?.products?.[i]?.category,
          sku: summaryData?.boxArray?.[0]?.products?.[i]?.sku,
          qty: summaryData?.boxArray?.[0]?.products?.[i]?.qty,
          unitPrice: summaryData?.boxArray?.[0]?.products?.[i]?.unitPrice,
          unitTax: summaryData?.boxArray?.[0]?.products?.[i]?.unitTax,
          weightUnit: summaryData?.boxArray?.[0]?.products?.[i]?.weightUnit,
          deadWeight: summaryData?.boxArray?.[0]?.products?.[i]?.deadWeight,
          length: summaryData?.boxArray?.[0]?.products?.[i]?.length,
          breadth: summaryData?.boxArray?.[0]?.products?.[i]?.breadth,
          height: summaryData?.boxArray?.[0]?.products?.[i]?.height,
          measureUnit: summaryData?.boxArray?.[0]?.products?.[i]?.measureUnit,
        };
        productTemp.push(obj);
      }
    }

    try {
      const payload = {
        pickupDetails: {
          fullAddress: summaryData["pickupAddress"]?.buildingName,
          pincode: summaryData["pickupAddress"]?.pincode,
          contact: {
            name: summaryData["pickupAddress"]?.contactPerson,
            mobileNo: summaryData["pickupAddress"]?.contactNo,
          },
        },
        deliveryDetails: {
          fullAddress: summaryData["deliveryAddress"]?.buildingName,
          pincode: summaryData["deliveryAddress"]?.pincode,
          contact: {
            name: summaryData["deliveryAddress"]?.contactPerson,
            mobileNo: summaryData["deliveryAddress"]?.contactNo,
          },
          gstNumber: "",
        },
        boxInfo: [
          {
            name: summaryData?.boxArray?.[0]?.name,
            weightUnit: summaryData?.boxArray?.[0]?.weightUnit,
            deadWeight: summaryData?.boxArray?.[0]?.deadWeight,
            length: summaryData?.boxArray?.[0]?.length,
            breadth: summaryData?.boxArray?.[0]?.breadth,
            height: summaryData?.boxArray?.[0]?.height,
            measureUnit: summaryData?.boxArray?.[0]?.measureUnit,
            products: productTemp,
            codInfo: codObj,
            podInfo: summaryData?.boxArray?.[0]?.podInfo,
            insurance: summaryData?.boxArray?.[0]?.insurance?.isInsured
              ? true
              : false,
          },
        ],
        orderType: "B2C",
        transit: "REVERSE",
        courierPartner: summaryData?.reverseSeviceArray?.[0]?.partnerName,
        pickupDate: summaryData?.pickupTime,
        gstNumber: "",
        orderId: "",
        eWayBillNo: 0,
        brandName: summaryData?.restInfo?.name || "",
        brandLogo: summaryData?.restInfo?.logo || "",
      };

      const response = await POST(REVERSE_ORDER, payload);
      if (response?.data?.success) {
        bookOrder(true);
        setState({ isOpen: false, data: {} }); // close the current reverse summary modal
        reverseModal({ isOpen: false, data: {} }); // close the reverse first modal
        toast.success(response?.data?.message);
        setIsloading(false);
        sessionStorage.removeItem("reverseProductArray");
      } else {
        toast.error(response?.data?.message);
        setIsloading(false);
      }
    } catch (error) {}
  };

  let date = new Date(summaryData?.pickupTime);

  // Define options for toLocaleString to get 12-hour format with AM/PM
  let options: any = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  // Get the human-readable date and time in 12-hour format with AM/PM
  let humanReadableDate = date.toLocaleString("en-US", options);

  return (
    <div className="relative h-[90vh] px-4">
      <div className="flex flex-col gap-2">
        <div className="accordionContainerBoxStyle">
          <div
            className={`cursor-pointer px-4 py-3 flex justify-between items-center
            
                ${
                  isSummayOpen
                    ? "bg-[#F6F6F6] rounded-none rounded-t-lg"
                    : "bg-white"
                }
                
            `}
            onClick={() => setIsSummaryOpen(!isSummayOpen)}
            key={1}
          >
            <div className="flex basis-[90%] items-center gap-x-2">
              <div className="text-[16px] font-semibold font-Open text-[#1C1C1C] leading-tight">
                Summary
              </div>
            </div>
            <svg
              className={`w-5 h-5 transform 
                    ${isSummayOpen ? "rotate-180" : ""} 
                  `}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {isSummayOpen && (
            <div className="max-h-[76vh] overflow-auto m-[5px]">
              <div
                className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
              >
                <div
                  className={`flex justify-between items-center h-[44px] bg-[#F6F6F6]`}
                >
                  <div>
                    <span className="text-base flex text-[16px] gap-2 font-semibold font-Open text-[#1C1C1C] ml-4">
                      <img
                        className="self-center"
                        src={LocationIcon}
                        style={{ height: "16px", width: "16px" }}
                      />
                      Pickup Details
                    </span>
                  </div>
                  <div>
                    <span className="text-base flex gap-2 font-semibold font-Open text-[#1C1C1C] mr-6">
                      <img
                        className="self-center"
                        src={BuildingIcon}
                        style={{ height: "16px", width: "16px" }}
                      />
                      Office
                    </span>
                  </div>
                </div>
                <div className="px-4 font-Open text-[14px] m-4 text-[#323232]">
                  {summaryData?.pickupAddress?.buildingName}
                </div>
              </div>
              <div
                className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
              >
                <div
                  className={`flex justify-between items-center h-[44px] bg-[#F6F6F6]`}
                >
                  <div>
                    <span className="text-base flex text-[16px] gap-2 font-semibold font-Open text-[#1C1C1C] ml-4">
                      <img
                        className="self-center"
                        src={LocationIcon}
                        style={{ height: "16px", width: "16px" }}
                      />
                      Delivery Details
                    </span>
                  </div>
                  <div>
                    <span className="text-base flex gap-2 font-semibold font-Open text-[#1C1C1C] mr-6">
                      <img
                        className="self-center"
                        src={BuildingIcon}
                        style={{ height: "16px", width: "16px" }}
                      />
                      Warehouse
                    </span>
                  </div>
                </div>
                <div className="px-4 font-Open text-[14px] m-4 text-[#323232]">
                  {summaryData?.deliveryAddress?.buildingName}
                </div>
              </div>
              <div
                className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
              >
                <div
                  className={`flex justify-between items-center h-[44px] bg-[#F6F6F6]`}
                >
                  <div>
                    <span className="text-base flex text-[16px] gap-2 font-semibold font-Open text-[#1C1C1C] ml-4">
                      <img
                        className="self-center"
                        src={LocationIcon}
                        style={{ height: "16px", width: "16px" }}
                      />
                      Product Details
                    </span>
                  </div>
                </div>
                <div className="px-4 font-Open text-[14px] m-4 text-[#323232]">
                  {summaryData?.productArray?.map((el: any, item: number) => {
                    return (
                      <>
                        <div className="flex flex-col mb-4">
                          <span className="text-[14px] font-semibold font-Open">
                            Package {item + 1} : {el?.name}
                          </span>
                          <span className="text-[14px] font-normal font-Open">
                            {el?.length} X {el?.breadth} X {el?.height}{" "}
                            {el?.sku} | {el?.appliedWeight} {el?.weightUnit}
                          </span>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div
                className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
              >
                <div
                  className={`flex justify-between items-center h-[44px] bg-[#F6F6F6]`}
                >
                  <div>
                    <span className="text-base flex text-[16px] gap-2 font-semibold font-Open text-[#1C1C1C] ml-4">
                      <img
                        className="self-center"
                        src={LocationIcon}
                        style={{ height: "16px", width: "16px" }}
                      />
                      Box Details
                    </span>
                  </div>
                </div>
                <div className="px-4 font-Open text-[14px] m-4 text-[#323232]">
                  {summaryData?.boxArray?.map((el: any, item: number) => {
                    return (
                      <>
                        <div className="flex flex-col mb-4">
                          <span className="text-[14px] font-semibold font-Open">
                            Econamy 1kg
                          </span>
                          <span className="text-[14px] font-normal font-Open">
                            Delhivery
                          </span>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div
                className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
              >
                <div
                  className={`flex justify-between items-center h-[44px] bg-[#F6F6F6]`}
                >
                  <div>
                    <span className="text-base flex text-[16px] gap-2 font-semibold font-Open text-[#1C1C1C] ml-4">
                      <img
                        className="self-center"
                        src={LocationIcon}
                        style={{ height: "16px", width: "16px" }}
                      />
                      Pickup Date & Time
                    </span>
                  </div>
                </div>
                <div className="px-4 font-Open text-[14px] m-4 text-[#323232]">
                  <div className="flex flex-col mb-4">
                    <span className="text-[14px] font-semibold font-Open">
                      Pickup Time : {humanReadableDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="absolute w-[93%] bottom-6">
        <div className="flex gap-2">
          <CustomButton
            className="bg-white border border-black"
            textClassName="text-black"
            text={"Back"}
            onClick={() => backHandler()}
          />
          <CustomButton
            text={"Book Reverse Order"}
            onClick={() => bookReverseOrder()}
            loading={isLoading}
            className={`${isLoading ? "!bg-white" : "!bg-black"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ReverseSummary;
