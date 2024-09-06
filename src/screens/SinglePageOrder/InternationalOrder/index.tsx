import React, { useState } from "react";
import InternationalAddressCardDetails from "./InternationalAddressDetails/index";
import PackageDetails from "../PackageDetails";
import CustomInputBox from "../../../components/Input";
import {
  capitalizeFirstLetter,
  generateUniqueCode,
} from "../../../utils/utility";
import AutoGenerateIcon from "../../../assets/Product/autogenerate.svg";
import SelfDeclaration from "../InternationalOrder/Declaration/index";
import { Tooltip } from "react-tooltip";
import InfoIcon from "../../../assets/info.svg";
import editIcon from "../../../assets/Product/Edit.svg";
import { parse } from "date-fns";
import OneButton from "../../../components/Button/OneButton";
import { CustomTable } from "../../../components/Table";
import { Spinner } from "flowbite-react";
import SummaryIcon from "../../../assets/singleOrderSummary.svg";
import tickIcon from "../../../assets/tick.svg";
import DownloadIcon from "../../../assets/download.svg";
import { createColumnHelper } from "@tanstack/react-table";

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
  const columnsHelper = createColumnHelper<any>();
  const [order, setOrder] = useState<any>(initialState || {});
  const [sortServiceiblity, setSortServiciblity] = useState<any>("");
  const [showPickupDate, setShowPickupDate]: any = useState("");
  const [showDateAndTimeModal, setShowDateAndTimeModal] = useState(false);
  const [showDownloadLabel, setShowDownloadLabel] = useState(false);
  const [placeOrderLoader, setplaceOrderLoader] = useState(false);

  const SummaryColumns = [
    columnsHelper.accessor("serialNo", {
      header: () => {
        return (
          <p className="font-Open text-[10px] font-semibold leading-[16px] text-[#000000] text-center">
            Sr.No.
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="font-Open text-xs font-normal leading-[16px] text-[#000000] text-center p-[6px] ">
            {info.row?.index + 1 || "-"}
          </div>
        );
      },
    }),
    // columnsHelper.accessor("orderId", {
    //   header: () => {
    //     return (
    //       <p className="font-Open text-[10px] font-semibold leading-[16px] text-[#000000] text-center">
    //         Order ID
    //       </p>
    //     );
    //   },
    //   cell: (info: any) => {
    //     return (
    //       <div className="font-Open text-xs font-normal leading-[16px] text-[#000000] text-center p-[6px]">
    //         {info.row.original.orderId || "-"}
    //       </div>
    //     );
    //   },
    // }),
    columnsHelper.accessor("package", {
      header: () => {
        return (
          <p className="font-Open text-[10px] font-semibold leading-[16px] text-[#000000] text-center">
            Package
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="font-Open text-xs font-normal leading-[16px] text-[#000000] text-center p-[6px]">
            {capitalizeFirstLetter(info.row.original?.name) || "-"}
          </div>
        );
      },
    }),
    columnsHelper.accessor(" EwayBill", {
      header: () => {
        return (
          <p className="font-Open text-[10px] font-semibold leading-[16px] text-[#000000] text-center">
            Eway Bill
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="font-Open text-xs font-normal leading-[16px] text-[#000000] text-center p-[6px]">
            {info.row.original?.eWayBillNo || "-"}
          </div>
        );
      },
    }),
    columnsHelper.accessor("appliedWeight", {
      header: () => {
        return (
          <p className="font-Open text-[10px] font-semibold leading-[16px] text-[#000000] text-center">
            Applied Weight
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="font-Open text-xs font-normal leading-[16px] text-[#000000] text-center p-[6px]">
            {info.row.original.appliedWeight || "-"} Kg
          </div>
        );
      },
    }),

    // columnsHelper.accessor("charge", {
    //   header: () => {
    //     return (
    //       <p className="font-Open text-[10px] font-semibold leading-[16px] text-[#000000] text-center">
    //         Charge
    //       </p>
    //     );
    //   },
    //   cell: (info: any) => {
    //
    //     return (
    //       <div className="font-Open text-xs font-normal leading-[16px] text-[#000000] text-center p-[6px]">
    //         {info.row.original?.codInfo?.invoiceValue || "-"}
    //       </div>
    //     );
    //   },
    // }),
  ];

  function convertToEpoch(dateTimeString: any) {
    const parsedDateTime = parse(
      dateTimeString,
      "dd/MM/yyyy hh:mm a",
      new Date()
    );
    return Math.floor(parsedDateTime.getTime());
  }

  const handlePickupTimeSelected = (pickupTime: string) => {
    setShowPickupDate(pickupTime);
    const editedPickupDateForEpoch: any = pickupTime?.substring(0, 19);
    const EpochPickupDate = convertToEpoch(editedPickupDateForEpoch);
    setOrder(() => {
      return {
        ...order,
        pickupDate: EpochPickupDate,
      };
    });
  };
  const summaryDetails = () => {
    return (
      <>
        <div className="border-[1px] rounded-md border-[#E8E8E8]">
          {/* header section  */}
          <div className="flex justify-start gap-x-2 p-5 items-center">
            <img src={SummaryIcon} alt="Summary-icon" />
            <p className="font-Open font-semibold leading-5 text-base capitalize">
              Summary
            </p>
          </div>
          <div className="px-5 text-[14px]">
            <div className="flex items-center">
              <div>ORDER ID : </div>{" "}
              <div className="ml-[8px] font-Open font-bold">
                {" "}
                {order?.orderId}
              </div>
            </div>
          </div>
          {/* table section  */}
          <div className="px-5">
            <CustomTable
              data={order?.boxInfo || []}
              columns={SummaryColumns}
              thclassName={"!w-auto"}
              tdclassName={"!w-auto"}
            />
          </div>

          {!showDownloadLabel ? (
            <div className="flex justify-center items-center pt-5 pb-12">
              {placeOrderLoader ? (
                <div className="flex justify-center items-center py-1 rounded-lg !w-[228px]">
                  <Spinner />
                </div>
              ) : (
                <OneButton
                  // onClick={PlaceOrder}
                  onClick={() => {}}
                  text={`Place Order ₹ ${
                    order?.totalPrice ? order?.totalPrice.toFixed(2) : 0
                  }`}
                  variant="primary"
                  className="!w-[228px]"
                  // disabled={!validateOrder(order)}
                />
              )}
            </div>
          ) : (
            <div>
              <div className="px-2 py-7 mx-3">
                <div className="flex gap-x-[6px] px-4 py-1 bg-[#A3DA91] border rounded-lg items-center">
                  <img src={tickIcon} alt="tick-icon" />
                  <p className="text-xs font-Open font-semibold leading-[22px] text-[#1C1C1C]">
                    Congratulations! Your shipment has been booked successfully.
                    Please download and paste the shipping label on your package
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center gap-x-3 mb-5">
                <OneButton
                  text={"Label"}
                  // onClick={() => fetchLabels(awbListForDownLoad)}
                  onClick={() => {}}
                  variant="quad"
                  showIcon={true}
                  icon={DownloadIcon}
                  // loading={
                  //   isDownloadLoading?.isLoading &&
                  //   isDownloadLoading?.identifier === "Download_Labels"
                  // }
                  textTransform="capitalize"
                  className={`!w-[120px] !bg-transparent`}
                />
                <OneButton
                  text={"Invoice"}
                  // onClick={() => fetchMultiTax(awbListForDownLoad)}
                  onClick={() => {}}
                  variant="quad"
                  showIcon={true}
                  icon={DownloadIcon}
                  textTransform="capitalize"
                  // loading={
                  //   isDownloadLoading?.isLoading &&
                  //   isDownloadLoading?.identifier === "Download_Multi_Tax"
                  // }
                  className={`!w-[120px] !bg-transparent`}
                />
                <OneButton
                  text={"Manifest"}
                  // onClick={() => fetchManifest(awbListForDownLoad)}
                  onClick={() => {}}
                  variant="quad"
                  showIcon={true}
                  icon={DownloadIcon}
                  textTransform="capitalize"
                  // loading={
                  //   isDownloadLoading?.isLoading &&
                  //   isDownloadLoading?.identifier === "downloadManifest"
                  // }
                  className={`!w-[120px] !bg-transparent`}
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  };
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
                // showDownloadLabel={showDownloadLabel}
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
                  // isDisabled={showDownloadLabel}
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
                      //   showDownloadLabel
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

                <div className="flex justify-center items-center gap-x-1 ">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="PREPAID"
                    // disabled={
                    //   (Array.isArray(order?.boxInfo) &&
                    //     order?.boxInfo.length === 0) ||
                    //   showDownloadLabel
                    // }
                    className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                    checked={true}
                    // onChange={(e: any) => paymentModeToggle(e.target.value)}
                  />
                  <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
                    PREPAID
                  </span>
                  <img
                    src={InfoIcon}
                    alt="tooltip-icon"
                    className={`${"cursor-pointer"}`}
                    data-tooltip-id="my-tooltip-prepaid-content"
                    data-tooltip-content={`${"Please note that the payment method for international orders is prepaid."}`}
                  />
                  <Tooltip
                    id="my-tooltip-prepaid-content"
                    style={{
                      zIndex: 10,
                      backgroundColor: "#004EFF",
                      borderRadius: "2px",
                      position: "absolute",
                      color: "#FFFFFF",
                      width: "270px",
                      fontSize: "12px",
                      lineHeight: "16px",
                      fontFamily: "Open Sans",
                      fontWeight: "600",
                      letterSpacing: "1px",
                      textTransform: "capitalize",
                    }}
                  />
                </div>
              </div>
              {/* {["B2B"].includes(order?.orderType) &&
                sumInvoiceValue >= 50000 && (
                  <div className="md:!w-[35%]">
                    <CustomInputBox
                      inputType="text"
                      label="Enter Eway Bill No."
                      name="eWayBillNo"
                      isDisabled={showDownloadLabel}
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
                  label="Invoice Value"
                  name="invoiceValue"
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
                showDownloadLabel={showDownloadLabel}
                setShowPickupDate={setShowPickupDate}
                resetOtherAddressDetails={resetOtherAddressDetails}
                setResetOtherAddressDetails={setResetOtherAddressDetails}
              /> */}
              <SelfDeclaration />
            </div>
            {/* 
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

            <>
              <div>{summaryDetails()}</div>
              {showDownloadLabel && (
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
            </> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default InternationalOrders;
