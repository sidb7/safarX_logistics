import React, { useState } from "react";
import InternationalAddressCardDetails from "./InternationalAddressDetails/index";
import PackageDetails from "../PackageDetails";
import CustomInputBox from "../../../components/Input";
import { generateUniqueCode } from "../../../utils/utility";
import AutoGenerateIcon from "../../../assets/Product/autogenerate.svg";
import SelfDeclaration from "../InternationalOrder/Declaration/index";

interface IInternationalOrdersProps {}

const InternationalOrders: React.FunctionComponent<
  IInternationalOrdersProps
> = (props) => {
  const initialState: any = {
    pickupDetails: {
      fullAddress: "",
      pincode: 0,
      contact: {
        name: "",
        mobileNo: 0,
      },
    },
    deliveryDetails: {
      fullAddress: "",
      pincode: 0,
      contact: {
        name: "",
        mobileNo: 0,
      },
      gstNumber: "",
    },
    boxInfo: [],
    orderType: "B2C",
    transit: "FORWARD",
    courierPartner: "",
    source: "WEBSITE_SINGLE_PAGE",
    pickupDate: "",
    gstNumber: "",
    orderId: "",
    eWayBillNo: 0,
    awb: "",
    brandName: "Google",
    brandLogo: "",
  };

  const [order, setOrder] = useState<any>(initialState || {});
  const [sortServiceiblity, setSortServiciblity] = useState<any>("");
  return (
    <>
      <div className="flex gap-5 mx-5">
        <div className="flex-1">
          <div className="flex flex-col gap-y-4  !h-[calc(100vh-180px)] customScroll">
            <div className="!max-h-[450px] border-[1px] rounded-lg border-[#E8E8E8] overflow-auto scroll-smooth">
              <InternationalAddressCardDetails />
            </div>
            <div className="rounded-lg !max-h-[450px] w-full">
              <PackageDetails
                packageDetails={order?.boxInfo}
                order={order}
                setOrder={setOrder}
                setSortServiciblity={setSortServiciblity}
                // showDownloadLebal={showDownloadLebal}
              />
            </div>

            <div className={`border p-3 rounded gap-x-4 flex items-center `}>
              <div
                className={`${
                  order?.orderType === "B2B" ? "md:!w-[35%]" : "md:!w-[50%]"
                }`}
              >
                <CustomInputBox
                  isRightIcon={true}
                  containerStyle=""
                  rightIcon={AutoGenerateIcon}
                  className="w-full !text-base !font-semibold"
                  imageClassName="!h-[12px] !z-0 !w-[113px] !top-[40%] "
                  value={order?.orderId || ""}
                  maxLength={12}
                  label="Order ID"
                  onChange={(e: any) => {
                    setOrder((prevState: any) => {
                      return { ...prevState, orderId: e.target.value };
                    });
                    setSortServiciblity("");
                  }}
                  // isDisabled={showDownloadLebal}
                  onClick={() => {
                    const orderId = generateUniqueCode(8, 12);
                    setOrder((prevState: any) => {
                      return { ...prevState, orderId: orderId };
                    });
                    setSortServiciblity("");
                  }}
                  visibility={true}
                  setVisibility={() => {}}
                  name="orderId"
                  data-cy="auto-generate-order-id"
                />
              </div>

              <div className="flex gap-x-4 items-center">
                {/* {order?.orderType === "B2C" && order?.transit === "FORWARD" && (
                  <div className="flex justify-center items-center">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="COD"
                      // disabled={
                      //   (Array.isArray(order?.boxInfo) &&
                      //     order?.boxInfo.length === 0) ||
                      //   showDownloadLebal
                      // }
                      className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                      checked={paymentMode === "COD"}
                      onChange={(e: any) => {
                        paymentModeToggle(e.target.value);
                      }}
                    />
                    <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
                      COD
                    </span>
                  </div>
                )} */}

                <div className="flex justify-center items-center ">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="PREPAID"
                    // disabled={
                    //   (Array.isArray(order?.boxInfo) &&
                    //     order?.boxInfo.length === 0) ||
                    //   showDownloadLebal
                    // }
                    className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                    checked={true}
                    // onChange={(e: any) => paymentModeToggle(e.target.value)}
                  />
                  <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
                    PREPAID
                  </span>
                </div>
              </div>
              {/* {["B2B"].includes(order?.orderType) &&
                sumInvoiceValue >= 50000 && (
                  <div className="md:!w-[35%]">
                    <CustomInputBox
                      inputType="text"
                      label="Enter Eway Bill No."
                      name="eWayBillNo"
                      isDisabled={showDownloadLebal}
                      value={order?.ewaybillNumber}
                      onChange={(e) => {
                        setOrder((prevState: any) => {
                          return {
                            ...prevState,
                            eWayBillNo: e.target.value,
                          };
                        });
                        setSortServiciblity("");
                      }}
                    />
                  </div>
                )} */}
              <div className="md:!w-[35%]">
                <CustomInputBox
                  inputType="text"
                  label="Enter Eway Bill No."
                  name="eWayBillNo"
                  isDisabled={true}
                  value={order?.ewaybillNumber}
                  onChange={(e) => {
                    setOrder((prevState: any) => {
                      return {
                        ...prevState,
                        eWayBillNo: e.target.value,
                      };
                    });
                    setSortServiciblity("");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-y-5">
            <div className="">
              {/* <ShippingDetails
                order={order}
                setOrder={setOrder}
                setSortServiciblity={setSortServiciblity}
                sortServiceiblity={sortServiceiblity}
                showDownloadLebal={showDownloadLebal}
                setShowPickupDate={setShowPickupDate}
                resetOtherAddressDetails={resetOtherAddressDetails}
                setResetOtherAddressDetails={setResetOtherAddressDetails}
              /> */}
              <SelfDeclaration />
            </div>

            {/* {order?.courierPartner && (
              <div className="border flex justify-between items-center p-4 rounded-lg">
                <div className="text-[#1C1C1C] font-Open font-semibold text-[16px] leading-[20px] ">
                  Pickup Details
                </div>

                <div>
                  {showPickupDate ? (
                    <div className="flex gap-x-2 text-[15px]">
                      <div>Pickup On :</div>{" "}
                      <div className="text-[#1C1C1C] flex justify-center items-center font-Open font-bold leading-[20px] ">
                        <span>{showPickupDate}</span>
                        <button
                          className="ml-2 w-[20px] h-[20px] cursor-pointer"
                          onClick={() => setShowDateAndTimeModal(true)}
                        >
                          <img src={editIcon} alt="" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <OneButton
                      onClick={() => setShowDateAndTimeModal(true)}
                      text={`SELECT`}
                      variant="primary"
                      className="!w-[128px] font-extrabold"
                      // disabled={}
                    />
                  )}
                </div>
              </div>
            )}

            {order?.boxInfo?.length > 0 &&
              order?.courierPartner &&
              order?.pickupDate && (
                <>
                  <div>{summaryDetails()}</div>
                  {showDownloadLebal && (
                    <div className="border-[1px] rounded-md border-[#E8E8E8]">
                      <div className="flex justify-between items-center px-4 py-3">
                        <span className="font-Open font-semibold leading-[22px] text-base text-[#1C1C1C]">
                          Ready to place a new order? Click here!
                        </span>
                        <OneButton
                          onClick={() => {
                            window.location.reload();
                            sessionStorage.clear();
                          }}
                          text={`CREATE NEW ORDER`}
                          variant="primary"
                        />
                      </div>
                    </div>
                  )}
                </>
              )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default InternationalOrders;
