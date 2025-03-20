import React, { useEffect, useMemo, useRef, useState } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import AddressCardDetails from "./AddressDetails";
import ShippingDetails from "./ShippingDetails/index";
import BoxInfo from "./components/boxInfo";
import PackageDetails from "./PackageDetails";
import SummaryIcon from "../../assets/singleOrderSummary.svg";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { capitalizeFirstLetter, commaSeparator } from "../../utils/utility";
import OneButton from "../../components/Button/OneButton";
import crossIcon from "../../assets/cross.svg";
import tickIcon from "../../assets/tick.svg";
import DownloadIcon from "../../assets/download.svg";
import CustomInputBox from "../../components/Input";
import AutoGenerateIcon from "../../assets/Product/autogenerate.svg";
import { generateUniqueCode } from "../../utils/utility";
import InputBox from "../../components/Input";
import { POST } from "../../utils/webService";
import toast from "react-hot-toast";
import editIcon from "../../assets/Product/Edit.svg";
import walletIcon from "../../assets/Group.svg";
import CustomDropDown from "../../components/DropDown";
import downArrow from "../../assets/downwardArrow.svg";
import {
  FETCH_LABELS_REPORT_DOWNLOAD,
  FETCH_MANIFEST_DATA,
  FETCH_MULTI_TAX_REPORT_DOWNLOAD,
  REVERSE_ORDER,
} from "../../utils/ApiUrls";
import CenterModal from "../../components/CustomModal/customCenterModal";
import { useNavigate } from "react-router-dom";
import { tokenKey } from "../../utils/utility";
import { useSelector } from "react-redux";
import CopyTooltip from "../../components/CopyToClipboard";
import { add, forEach } from "lodash";
import { Spinner } from "../../components/Spinner";
import RightSideModal from "../../components/CustomModal/customRightModal";
import { useMediaQuery } from "react-responsive";
import generateOrderId from "../../assets/Reload.svg";
import { parse } from "date-fns";
import SelectDateModalForSinglePageOrder from "./components/scheduleTimeModale";
import Accordian from "./components/accordian";
import MyTable from "./ShippingDetails/components/customeTableForSummary";
import InternationalOrders from "./InternationalOrder";
import sessionManager from "../../utils/sessionManager";

interface IIndexProps {}

//initial State for the single page order
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

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  const columnsHelper = createColumnHelper<any>();
  const [showDownloadLebal, setDownloadLebal] = useState(false);
  const [isDownloadLoading, setDownloadLoading]: any = useState({});
  const [placeOrderLoader, setplaceOrderLoader] = useState(false);
  const [resetOtherAddressDetails, setResetOtherAddressDetails]: any =
    useState(false);
  const [paymentMode, setPaymentMode]: any = useState(() => {
    const storedValue = sessionStorage.getItem("paymentType");
    return storedValue !== null ? storedValue : "PREPAID";
  });
  const [selectedOrderType, setSelectedOrderType] = useState("");
  const [sortServiceiblity, setSortServiciblity] = useState("");
  const [order, setOrder]: any = useState(() => {
    const storedValue = sessionStorage.getItem("order");
    return storedValue !== null ? JSON.parse(storedValue) : initialState;
  });

  const [highLightField, setHighLightField]: any = useState({
    addressDetails: false,
    packageDetails: false,
    orderDetails: false,
    shippingDetails: false,
    pickupTimeDetails: false,
  });

  // let kycCheck = localStorage.getItem("kycValue") as any;
  const { sessionId, sellerInfo } = sessionManager({});
  let kycCheck = sellerInfo;
  // kycCheck = JSON.parse(kycCheck);

  const initialColumns = useMemo(
    () => [
      {
        accessorKey: "name", // accessor is the "key" in the data
        header: "Package",
      },
      {
        accessorKey: "eWayBillNo",
        header: "Eway Bill",
      },
      {
        accessorKey: "appliedWeight",
        header: "Applied Weight",
      },
    ],
    []
  );

  const [awbListForDownLoad, setAwbListForDownLoad] = useState([]);
  // State to manage columns
  const [columns, setColumns] = useState(initialColumns);
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [showDateAndTimeModal, setShowDateAndTimeModal] = useState(false);
  const [showPickupDate, setShowPickupDate]: any = useState("");

  const walletBalance = useSelector((state: any) => state?.user?.walletBalance);

  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const navigate = useNavigate();

  // State to control tooltip visibility
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const orderTypeList: any = [
    {
      id: 1,
      label: "B2C",
      value: "B2C",
      transit: "FORWARD",
    },
    { id: 2, label: "B2B", value: "B2B", transit: "FORWARD" },
    {
      id: 3,
      label: "B2C Reverse",
      value: "B2C REVERSE",
      transit: "REVERSE",
    },
    {
      id: 4,
      label: "International",
      value: "INTERNATIONAL",
      transit: "REVERSE",
      disabled: true,
    },
  ];

  // Get all variable service keys and sort them
  const variableServiceKeys = Object.keys(order?.variableServices || {}).sort();
  const baseValue = order?.base || 0;
  const addValue = order?.add || 0;
  // const codValue = order?.cod || 0;
  const variablesValue = order?.variables;
  const orderPrice = baseValue + addValue + variablesValue;

  // Round off decimal numbers to the nearest whole number
  // const roundedInvoiceValue = Math.round(+order?.invoiceValue);
  // const roundedCODValue = Math.round(codValue);
  // const codChargeValuePrice = Math.round(order?.cod);
  const roundedOrderPrice = Math.round(orderPrice);
  // const roundedInsuranceValue = Math.round(order?.insurance);
  // const roundedTaxValue = Math.round(order?.tax);
  // const roundedPrice = Math.round(order?.totalPrice);

  if (kycCheck?.businessType?.toLowerCase() === "individual") {
    const b2bIndex = orderTypeList.findIndex(
      (item: any) => item.value === "B2B"
    );
    if (b2bIndex !== -1) {
      orderTypeList[b2bIndex].disabled = true;
    }
  }

  function validateOrder(order: any) {
    const pickupDetailsValid =
      order.pickupDetails.fullAddress.trim() !== "" &&
      order.pickupDetails.pincode !== 0 &&
      order.pickupDetails.contact.name.trim() !== "" &&
      order.pickupDetails.contact.mobileNo !== 0;

    const deliveryDetailsValid =
      order.deliveryDetails.fullAddress.trim() !== "" &&
      order.deliveryDetails.pincode !== 0 &&
      order.deliveryDetails.contact.name.trim() !== "" &&
      order.deliveryDetails.contact.mobileNo !== 0;

    const boxInfoValid =
      Array.isArray(order?.boxInfo) && order?.boxInfo.length > 0;

    const courierPartnerValid = order.courierPartner.trim() !== "";

    return (
      pickupDetailsValid &&
      deliveryDetailsValid &&
      boxInfoValid &&
      courierPartnerValid
    );
  }

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
    // console.log("pickupTime", pickupTime);
    const editedPickupDateForEpoch: any = pickupTime?.substring(0, 19);
    const EpochPickupDate = convertToEpoch(editedPickupDateForEpoch);
    setOrder(() => {
      return {
        ...order,
        pickupDate: EpochPickupDate,
      };
    });
  };

  const sumInvoiceValue =
    order?.boxInfo.length > 0 &&
    order?.boxInfo.reduce(
      (sum: any, box: any) => sum + box.codInfo.invoiceValue,
      0
    );

  // Helper function to format label from camelCase to Title Case with spaces
  const formatLabel = (label: string): string => {
    // Handle special cases with parentheses
    if (label.includes("(")) {
      return (
        label
          .replace(/([A-Z])/g, " $1")
          .split("(")[0]
          .trim()
          .replace(/^\w/, (c) => c.toUpperCase()) +
        " (" +
        label.split("(")[1]
      );
    }

    // Handle cases with dots
    if (label.includes(".")) {
      const parts = label.split(".");
      return (
        parts[0].toUpperCase() +
        " " +
        parts[1].charAt(0).toUpperCase() +
        parts[1].slice(1)
      );
    }

    // Regular camelCase to Title Case
    return label
      .replace(/([A-Z])/g, " $1")
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  const Buttons = (className?: string) => {
    return (
      <>
        {isLgScreen ? (
          <div className="flex w-[100%] px-4 gap-x-4 justify-start items-center">
            <div className=" flex justify-start items-center h-fit">
              <input
                type="radio"
                name="type"
                value={order?.orderType}
                disabled={showDownloadLebal}
                className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                checked={
                  order?.orderType === "B2C" && order?.transit === "FORWARD"
                }
                onChange={(e) => {
                  setOrder({
                    ...initialState,
                    orderType: "B2C",
                    transit: "FORWARD",
                  });
                  setResetOtherAddressDetails(true);
                  setPaymentMode("PREPAID");
                }}
              />
              <div className="text-[15px]">B2C</div>
            </div>
            <div className=" flex justify-start items-center h-fit">
              <input
                type="radio"
                name="type"
                value={order?.orderType}
                className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                disabled={
                  ["individual"].includes(
                    kycCheck?.businessType?.toLowerCase()
                  ) || showDownloadLebal
                }
                checked={
                  order?.orderType === "B2B" && order?.transit === "FORWARD"
                }
                onChange={(e) => {
                  setOrder({
                    ...initialState,
                    orderType: "B2B",
                    transit: "FORWARD",
                  });
                  setResetOtherAddressDetails(true);
                  setPaymentMode("PREPAID");
                }}
              />
              <div className="text-[15px]">B2B</div>
            </div>
            <div className=" flex justify-start items-center h-fit">
              <input
                type="radio"
                name="type"
                value={order?.orderType}
                disabled={showDownloadLebal}
                className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                checked={
                  order?.orderType === "B2C" && order?.transit === "REVERSE"
                }
                onChange={(e) => {
                  setOrder({
                    ...initialState,
                    orderType: "B2C",
                    transit: "REVERSE",
                  });
                  setResetOtherAddressDetails(true);
                  setPaymentMode("PREPAID");
                }}
              />
              <div className="text-[15px]">B2C Reverse</div>
            </div>
            <div
              className=" flex justify-start items-center h-fit"
              title="coming soon"
            >
              <input
                type="radio"
                name="type"
                value={order?.orderType}
                disabled={true}
                className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                checked={order?.orderType === "INTERNATIONAL"}
                onChange={(e) => {
                  setOrder((prevState: any) => {
                    return {
                      ...prevState,
                      orderType: "INTERNATIONAL",
                      transit: "FORWARD",
                    };
                  });
                  setResetOtherAddressDetails(true);
                  setPaymentMode("PREPAID");
                }}
              />
              <div className="text-[15px]">International</div>
            </div>
          </div>
        ) : (
          <div className={`flex w-[100%] my-5 justify-end items-center`}>
            <CustomDropDown
              onChange={(e) => {
                setSelectedOrderType(e.target.value);
                const selectedOption = orderTypeList.find(
                  (item: any) => item.value === e.target.value
                );

                setOrder({
                  ...initialState,
                  orderType:
                    selectedOption?.value === "B2C REVERSE"
                      ? "B2C"
                      : selectedOption?.value,
                  transit: selectedOption?.transit,
                });
                setResetOtherAddressDetails(true);
                setPaymentMode("PREPAID");
              }}
              value={selectedOrderType}
              wrapperClass={"!w-[40%]"}
              selectClassName={"!h-[40px]"}
              options={orderTypeList}
              heading="Address Type"
            />
          </div>
        )}
      </>
    );
  };

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

  const fetchManifest = async (awbArray?: any) => {
    let payload = {
      awbs: awbArray,
    };
    setDownloadLoading({
      isLoading: true,
      identifier: "downloadManifest",
    });
    const { sellerInfo } = sessionManager({});
    const sellerId = sellerInfo?.sellerId;
    let header = {
      Accept: "/",
      // Authorization: `Bearer ${localStorage.getItem(
      //   `${sellerId}_${tokenKey}`
      // )}`,
      Authorization: `Bearer ${sellerInfo?.token}`,
      "Content-Type": "application/json",
    };
    const response = await fetch(FETCH_MANIFEST_DATA, {
      method: "POST",
      headers: header,
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message);
      setDownloadLoading({
        isLoading: false,
        identifier: "downloadManifest",
      });
      // setManifestButton(true);
      return;
    }
    const data = await response.blob();

    const blob = new Blob([data], { type: "application/pdf" });

    var url = URL.createObjectURL(blob);
    setDownloadLoading({
      isLoading: false,
      identifier: "downloadManifest",
    });

    const a = document.createElement("a");
    a.href = url;
    a.download = `Manifest_Report.pdf`;
    a.click();
  };

  const fetchLabels = async (arrLebels: string[]) => {
    if (!arrLebels?.length) {
      toast.error("Please Select One Orders For label");
      return;
    }

    setDownloadLoading({
      isLoading: true,
      identifier: "Download_Labels",
    });

    const payload: any = {
      awbs: arrLebels.filter((item: any) => item !== ""),
    };
    const { sellerInfo } = sessionManager({});
    const sellerId = sellerInfo?.sellerId;
    let header = {
      Accept: "/",
      // Authorization: `Bearer ${localStorage.getItem(
      //   `${sellerId}_${tokenKey}`
      // )}`,
      Authorization: `Bearer ${sellerInfo?.token}`,
      "Content-Type": "application/json",
    };
    const data = await fetch(FETCH_LABELS_REPORT_DOWNLOAD, {
      method: "POST",
      headers: header,
      body: JSON.stringify(payload),
    });

    setDownloadLoading({
      isLoading: false,
      identifier: "Download_Labels",
    });

    const resdata: any = await data.blob();

    const blob = new Blob([resdata], { type: resdata?.type });
    let filename: any;
    if (resdata?.type === "image/png") {
      filename = "Label_Report.png";
    } else {
      filename = "Label_Report.pdf";
    }

    var url = URL.createObjectURL(blob);

    setDownloadLoading({
      isLoading: false,
      identifier: "Download_Labels",
    });

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    return true;
  };

  const fetchMultiTax = async (arrLebels: string[]) => {
    if (!arrLebels?.length) {
      toast.error("Please Select One Orders For Tax Invoice");
      return;
    }

    setDownloadLoading({
      isLoading: true,
      identifier: "Download_Multi_Tax",
    });

    const payload: any = {
      awbs: arrLebels.filter((item: any) => item !== ""),
    };
    const { sellerInfo } = sessionManager({});
    const sellerId = sellerInfo?.sellerId;
    let header = {
      Accept: "/",
      // Authorization: `Bearer ${localStorage.getItem(
      //   `${sellerId}_${tokenKey}`
      // )}`,
      Authorization: `Bearer ${sellerInfo?.token}`,
      "Content-Type": "application/json",
    };
    const data = await fetch(FETCH_MULTI_TAX_REPORT_DOWNLOAD, {
      method: "POST",
      headers: header,
      body: JSON.stringify(payload),
    });

    setDownloadLoading({
      isLoading: false,
      identifier: "Download_Multi_Tax",
    });
    const resdata: any = await data.blob();

    const blob = new Blob([resdata], { type: "application/pdf" });

    var url = URL.createObjectURL(blob);
    setDownloadLoading({
      isLoading: false,
      identifier: "Download_Multi_Tax",
    });

    const a = document.createElement("a");
    a.href = url;
    a.download = `Multi_Tax_Invoices.pdf`;
    a.click();
    return true;
  };

  const handlePickupDetailsChange = (newPickupDetails: any) => {
    setOrder((prevOrder: any) => ({
      ...prevOrder,
      pickupDetails: newPickupDetails,
    }));
  };

  const handleDeliveryDetailsChange = (newDeliveryDetails: any) => {
    setOrder((prevOrder: any) => ({
      ...prevOrder,
      deliveryDetails: newDeliveryDetails,
    }));
  };

  const PlaceOrder = async () => {
    let payload = { ...order };
    payload.boxInfo = payload.boxInfo.map((box: any) => {
      return {
        ...box,
        products: box.products.map((product: any) => {
          return {
            ...product,
            unitPrice: product.unitPrice / product.qty,
          };
        }),
      };
    });

    if (payload?.orderType === "B2B") {
      if (
        payload?.pickupDetails?.gstNumber === undefined ||
        payload?.pickupDetails?.gstNumber.trim() === "" ||
        payload?.deliveryDetails?.gstNumber === undefined ||
        payload?.deliveryDetails?.gstNumber.trim() === ""
      ) {
        toast.error("Please Enter GST Number");
        return;
      }
      payload.gstNumber = payload?.pickupDetails?.gstNumber.trim();
    }

    if (walletBalance < order?.totalPrice) {
      setShowAlertBox(true);
      return;
    }
    try {
      setplaceOrderLoader(true);
      const { data } = await POST(REVERSE_ORDER, payload);

      if (data?.success) {
        const listOfawbs = data?.data[0]?.awbs.map(
          (awb: any) => `${awb?.tracking?.awb}`
        );

        setAwbListForDownLoad(listOfawbs);
        setplaceOrderLoader(false);
        setDownloadLebal(true);
        // sessionStorage.clear();
        toast.success(data?.message || "Successfully Placed order");
      } else {
        toast.error(data?.message);
        setplaceOrderLoader(false);
      }
    } catch (error: any) {
      toast.error(error?.message);
      setplaceOrderLoader(false);
    }
  };

  const summaryDetails = () => {
    return (
      <>
        <div className="border-[1px] rounded-md border-[#E8E8E8]">
          <Accordian
            headerChild={
              <div className="flex w-[100%] items-center justify-between">
                <div>
                  <span className="mx-2 font-bold font-Open">{"Summary"}</span>
                </div>
              </div>
            }
          >
            {/* header section  */}
            {isLgScreen && (
              <div className="flex justify-start gap-x-2 p-5 items-center">
                <img src={SummaryIcon} alt="Summary-icon" />
                <p className="font-Open font-semibold leading-5 text-base capitalize">
                  Summary
                </p>
              </div>
            )}
            <div className="px-5 text-[14px] my-2">
              <div className="flex items-center">
                <div>ORDER ID : </div>{" "}
                <div className="ml-[8px] font-Open font-bold">
                  {" "}
                  {order?.orderId}
                </div>
              </div>
            </div>
            {/* table section  */}

            {isLgScreen ? (
              <div className="px-5">
                <CustomTable
                  rowData={order?.boxInfo || []}
                  columnsData={SummaryColumns}
                  minHeight="22vh"
                />

                {/* <MyTable data={order?.boxInfo || []} columns={columns} /> */}
                <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                  {/* Title Section */}
                  {/* <div className="flex items-center justify-between">
                    <div className="font-Open text-sm text-[#000000] font-semibold leading-5">
                      Yaari Points
                    </div>
                    <span className="text-gray-400 cursor-pointer">ℹ️</span>
                  </div> */}

                  {/* Price Breakdown */}
                  <div className="mt-[15px] space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-Open text-sm text-[#000000] font-normal leading-4">
                        Billable Weight
                      </span>
                      <span className="font-Open text-sm text-[#000000] font-semibold leading-5">
                        {order?.appliedWeight || 0} Kg
                      </span>
                    </div>

                    {/* <div className="flex justify-between">
                      <span className="font-Open text-sm text-[#000000] font-normal leading-4">
                        Order Price{" "}
                        <span className="text-gray-400 ml-1 cursor-pointer">
                          ℹ️
                        </span>
                      </span>
                      <span className="font-Open text-sm text-[#000000] font-semibold leading-5">
                        ₹ 450
                      </span>
                    </div> */}
                    {/* Order Price with Tooltip */}
                    <div className="flex justify-between relative">
                      <div
                        className="flex items-center cursor-pointer"
                        onMouseEnter={() => setShowTooltip(true)}
                        onClick={() => setShowTooltip(!showTooltip)}
                      >
                        <p className="font-Open text-sm text-[#000000] font-normal leading-4">
                          Order Price
                        </p>

                        {order?.orderType === "B2B" &&
                          variableServiceKeys.length > 0 && (
                            <span className="ml-1 w-4 h-4 rounded-full bg-[#004EFF] text-white flex items-center justify-center text-xs font-bold">
                              i
                            </span>
                          )}
                      </div>
                      <p className="font-Open text-sm text-[#000000] font-semibold leading-5">
                        {`\u20B9`}{" "}
                        {commaSeparator(
                          order?.base + order?.add + order?.variables
                        ) || 0}
                      </p>

                      {/* Tooltip for Variable Services */}
                      {showTooltip && variableServiceKeys.length > 0 && (
                        <div
                          ref={tooltipRef}
                          className="absolute top-full left-0 mt-1 w-full max-w-[300px] p-3 bg-white border border-[#E0E8FF] rounded-lg shadow-lg z-10"
                        >
                          <div className="flex justify-between items-center mb-2 border-b border-[#E0E8FF] pb-2">
                            <p className="text-[14px] font-medium text-[#004EFF]">
                              Order Price Breakdown
                            </p>
                            <p className="text-[12px] font-medium text-[#004EFF]">
                              Total: {`\u20B9`}{" "}
                              {roundedOrderPrice?.toLocaleString("en-IN")}
                            </p>
                          </div>
                          <div className="max-h-[250px] overflow-y-auto pr-1">
                            {/* Base and Add charges */}
                            <div className="border-b border-[#E0E8FF] pb-2 mb-2">
                              <div className="flex justify-between py-1 text-[12px]">
                                <p className="text-[12px] font-medium">
                                  Base Charge:
                                </p>
                                <p>
                                  {`\u20B9`}{" "}
                                  {baseValue?.toLocaleString("en-IN")}
                                </p>
                              </div>
                              <div className="flex justify-between py-1 text-[12px]">
                                <p className="text-[12px] font-medium">
                                  Additional Charge:
                                </p>
                                <p>
                                  {`\u20B9`} {addValue?.toLocaleString("en-IN")}
                                </p>
                              </div>
                            </div>

                            {/* Variable services section */}
                            <div className="mb-2">
                              <div className="flex justify-between py-1 text-[12px] font-medium">
                                <p>Variable Charges:</p>
                                <p>
                                  {`\u20B9`}{" "}
                                  {/* {variablesValue?.toLocaleString("en-IN")} */}
                                </p>
                              </div>

                              {/* List all variable service charges */}
                              <div className="pl-2">
                                {variableServiceKeys.map(
                                  (key) => (
                                    console.log("key", key),
                                    (
                                      <div
                                        key={key}
                                        className="flex justify-between py-1 text-[12px] border-b border-[#F2F6FF] last:border-0"
                                      >
                                        <p className="text-[12px] font-normal">
                                          {formatLabel(key)}:
                                        </p>
                                        <p>
                                          {`\u20B9`}{" "}
                                          {(
                                            (order?.variableServices?.[
                                              key
                                            ] as number) || 0
                                          ).toLocaleString("en-IN")}
                                        </p>
                                      </div>
                                    )
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="font-Open text-sm text-[#000000] font-normal leading-4">
                        COD Charges
                      </span>
                      <span className="font-Open text-sm text-[#000000] font-semibold leading-5">
                        ₹ {order?.cod || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-Open text-sm text-[#000000] font-normal leading-4">
                        Insurance Price
                      </span>
                      <span className="font-Open text-sm text-[#000000] font-semibold leading-5">
                        ₹ {order?.insurance || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-Open text-sm text-[#000000] font-normal leading-4">
                        Tax
                      </span>
                      <span className="font-Open text-sm text-[#000000] font-semibold leading-5">
                        ₹ {order?.tax || 0}
                      </span>
                    </div>
                    {/* <div className="flex justify-between text-green-600">
                      <span className="font-Open text-sm font-semibold leading-5">
                        Yaari Cash
                      </span>
                      <span className="font-Open text-sm text-[#000000] font-semibold leading-5">
                        -₹ 50
                      </span>
                    </div> */}
                  </div>

                  {/* Divider */}
                  <hr className="my-[15px] border-gray-300" />

                  {/* Gross Total */}
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="font-Open text-sm text-[#000000] font-normal leading-4">
                      Gross Total
                    </span>
                    <span className="font-Open text-sm text-[#000000] font-semibold leading-5">
                      ₹ {order?.total || 0}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {order?.boxInfo.length > 0 && (
                  <div className="px-4 flex flex-col gap-y-3">
                    {order?.boxInfo.map((box: any) => {
                      return (
                        <div className="bg-[#F6F6F6] rounded-lg p-4">
                          {box?.awb && <div>AWB : {box?.awb}</div>}
                          {/* <div className="flex items-center justify-between font-normal "> */}
                          <div>Package : {box?.name}</div>
                          <div>Applied Weight : {box?.appliedWeight}</div>
                          <div>Products : {box?.products?.length || 0}</div>
                          {<div>Eway Bill : {box?.eWayBillNo || "--"}</div>}
                          {/* </div> */}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {!showDownloadLebal ? (
              <div className="flex justify-center items-center pt-5 pb-12">
                {placeOrderLoader ? (
                  <div className="flex justify-center items-center py-1 rounded-lg !w-[228px]">
                    <Spinner />
                  </div>
                ) : (
                  <OneButton
                    onClick={PlaceOrder}
                    text={`Place Order ₹ ${
                      order?.totalPrice ? order?.totalPrice.toFixed(2) : 0
                    }`}
                    variant="primary"
                    className="!w-[228px]"
                    disabled={!validateOrder(order)}
                  />
                )}
              </div>
            ) : (
              <div>
                <div className="px-2 py-7 mx-3">
                  <div className="flex gap-x-[6px] px-4 py-1 bg-[#A3DA91] border rounded-lg items-center">
                    <img src={tickIcon} alt="tick-icon" />
                    <p className="text-xs font-Open font-semibold leading-[22px] text-[#1C1C1C]">
                      Congratulations! Your shipment has been booked
                      successfully. Please download and paste the shipping label
                      on your package
                    </p>
                  </div>
                </div>

                <div
                  className={`flex ${
                    isLgScreen ? "justify-center" : "justify-between"
                  } items-center gap-x-3 mx-4 mb-5`}
                >
                  <OneButton
                    text={"Label"}
                    onClick={() => fetchLabels(awbListForDownLoad)}
                    variant="quad"
                    showIcon={true}
                    icon={DownloadIcon}
                    loading={
                      isDownloadLoading?.isLoading &&
                      isDownloadLoading?.identifier === "Download_Labels"
                    }
                    textTransform="capitalize"
                    className={`${
                      isLgScreen ? "!w-[120px]" : "!w-[80px] text-[14px]"
                    } !bg-transparent`}
                  />
                  <OneButton
                    text={"Invoice"}
                    onClick={() => fetchMultiTax(awbListForDownLoad)}
                    variant="quad"
                    showIcon={true}
                    icon={DownloadIcon}
                    textTransform="capitalize"
                    loading={
                      isDownloadLoading?.isLoading &&
                      isDownloadLoading?.identifier === "Download_Multi_Tax"
                    }
                    className={`${
                      isLgScreen ? "!w-[120px]" : "!w-[80px] text-[14px]"
                    } !bg-transparent`}
                  />
                  <OneButton
                    text={"Manifest"}
                    onClick={() => fetchManifest(awbListForDownLoad)}
                    variant="quad"
                    showIcon={true}
                    icon={DownloadIcon}
                    textTransform="capitalize"
                    loading={
                      isDownloadLoading?.isLoading &&
                      isDownloadLoading?.identifier === "downloadManifest"
                    }
                    className={`${
                      isLgScreen ? "!w-[120px]" : "!w-[90px] text-[14px]"
                    }  !bg-transparent`}
                  />
                </div>
              </div>
            )}
          </Accordian>
        </div>
      </>
    );
  };

  const paymentModeToggle = (e: any) => {
    setPaymentMode(e);
    let tempOrder = { ...order };
    tempOrder.boxInfo.forEach((element: any) => {
      element.codInfo.isCod = e === "COD" ? true : false;
      element.codInfo.collectableAmount =
        e !== "COD" ? 0 : element.codInfo.invoiceValue;
    });
    setOrder(tempOrder);
    setSortServiciblity("");
  };

  useEffect(() => {
    sessionStorage.setItem("order", JSON.stringify(order));
    sessionStorage.setItem("paymentType", paymentMode);
  }, [order]);

  useEffect(() => {
    const orderTypeForDropdown =
      order?.transit === "REVERSE" && order?.orderType === "B2C"
        ? "B2C REVERSE"
        : order?.orderType;

    setSelectedOrderType(orderTypeForDropdown);
  }, [order?.orderType, order?.transit]);

  return (
    <>
      <div className="mb-10">
        <Breadcrum
          label="Add New Order"
          component={Buttons()}
          componentClass="!px-0"
        />

        {order?.orderType === "INTERNATIONAL" ? (
          <>
            <InternationalOrders />
          </>
        ) : (
          <>
            <div
              className={`flex flex-col lg:flex-row ${
                !isLgScreen ? "gap-y-4" : "gap-5"
              } mx-5`}
            >
              <div className={`flex-1 ${!isLgScreen && "h-fit"}`}>
                <div
                  className={`flex flex-col gap-y-4 ${
                    isLgScreen && "!h-[calc(100vh-180px)]"
                  } customScroll`}
                >
                  <div
                    className={`!max-h-[450px] border-[1px] rounded-lg ${
                      highLightField?.addressDetails
                        ? "border-[#004EFF]"
                        : "border-[#E8E8E8]"
                    } overflow-auto scroll-smooth`}
                  >
                    <Accordian
                      headerChild={
                        <div className="flex w-[100%] items-center justify-between">
                          <div>
                            <span className="mx-2 font-bold font-Open">
                              {"Address Details"}
                            </span>
                          </div>
                        </div>
                      }
                    >
                      <AddressCardDetails
                        pickupDetails={order?.pickupDetails}
                        deliveryDetails={order?.deliveryDetails}
                        onPickupDetailsChange={handlePickupDetailsChange}
                        onDeliveryDetailsChange={handleDeliveryDetailsChange}
                        order={order}
                        setSortServiciblity={setSortServiciblity}
                        showDownloadLebal={showDownloadLebal}
                        resetOtherAddressDetails={resetOtherAddressDetails}
                        setResetOtherAddressDetails={
                          setResetOtherAddressDetails
                        }
                        setHighLightField={setHighLightField}
                      />
                    </Accordian>
                  </div>
                  <div
                    className={`border 
                  ${
                    highLightField?.packageDetails
                      ? "border-[#004EFF]"
                      : "border-[#E8E8E8]"
                  }
                  rounded-lg !max-h-[450px] w-full`}
                  >
                    <PackageDetails
                      packageDetails={order?.boxInfo}
                      order={order}
                      setOrder={setOrder}
                      setSortServiciblity={setSortServiciblity}
                      showDownloadLebal={showDownloadLebal}
                      setHighLightField={setHighLightField}
                    />
                  </div>

                  <div
                    className={`border 
                  ${
                    highLightField?.orderDetails
                      ? "border-[#004EFF]"
                      : "border-[#E8E8E8]"
                  }
                  border-[#E8E8E8]
                 rounded-lg gap-x-4 flex ${
                   order?.orderType === "B2B" &&
                   sumInvoiceValue >= 50000 &&
                   "justify-between"
                 } 
                ${
                  !isLgScreen
                    ? "flex-col overflow-auto scroll-smooth "
                    : " items-center"
                }`}
                  >
                    <Accordian
                      headerChild={
                        <div className="flex w-[100%] items-center justify-between">
                          <div>
                            <span className="mx-2 font-bold font-Open">
                              {"Order Details"}
                            </span>
                          </div>
                        </div>
                      }
                    >
                      <div
                        className={`p-4 gap-4 flex w-[100%] ${
                          !isLgScreen && "flex-col"
                        }`}
                      >
                        <div className={` flex-1`}>
                          <CustomInputBox
                            isRightIcon={true}
                            containerStyle=""
                            rightIcon={AutoGenerateIcon}
                            className={`w-full !text-base !font-semibold`}
                            imageClassName="!h-[12px] !z-0 !w-[113px] !top-[40%] "
                            value={order?.orderId || ""}
                            maxLength={12}
                            label="Order ID"
                            onChange={(e) => {
                              setOrder((prevState: any) => {
                                return {
                                  ...prevState,
                                  orderId: e.target.value,
                                };
                              });
                              setSortServiciblity("");
                              setHighLightField({
                                addressDetails: false,
                                packageDetails: false,
                                shippingDetails: false,
                                orderDetails: true,
                                pickupTimeDetails: false,
                              });
                            }}
                            isDisabled={showDownloadLebal}
                            onClick={() => {
                              const orderId = generateUniqueCode(8, 12);
                              setOrder((prevState: any) => {
                                return { ...prevState, orderId: orderId };
                              });
                              setSortServiciblity("");
                              setHighLightField({
                                addressDetails: false,
                                packageDetails: false,
                                shippingDetails: false,
                                orderDetails: true,
                                pickupTimeDetails: false,
                              });
                            }}
                            visibility={true}
                            setVisibility={() => {}}
                            name="orderId"
                            data-cy="auto-generate-order-id"
                          />
                        </div>

                        <div
                          className={`flex gap-x-4 items-center flex-1 ${
                            !isLgScreen && " overflow-auto scroll-smooth"
                          }`}
                        >
                          {order?.orderType === "B2C" &&
                            order?.transit === "FORWARD" && (
                              <div className="flex justify-center items-center">
                                <input
                                  type="radio"
                                  name="paymentMode"
                                  value="COD"
                                  disabled={
                                    (Array.isArray(order?.boxInfo) &&
                                      order?.boxInfo.length === 0) ||
                                    showDownloadLebal
                                  }
                                  className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                                  checked={paymentMode === "COD"}
                                  onChange={(e: any) => {
                                    paymentModeToggle(e.target.value);
                                    setHighLightField({
                                      addressDetails: false,
                                      packageDetails: false,
                                      shippingDetails: false,
                                      orderDetails: true,
                                      pickupTimeDetails: false,
                                    });
                                  }}
                                />
                                <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
                                  COD
                                </span>
                              </div>
                            )}

                          <div className={`flex justify-center items-center `}>
                            <input
                              type="radio"
                              name="paymentMode"
                              value="PREPAID"
                              disabled={
                                (Array.isArray(order?.boxInfo) &&
                                  order?.boxInfo.length === 0) ||
                                showDownloadLebal
                              }
                              className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                              checked={paymentMode === "PREPAID"}
                              onChange={(e: any) => {
                                paymentModeToggle(e.target.value);
                                setHighLightField({
                                  addressDetails: false,
                                  packageDetails: false,
                                  shippingDetails: false,
                                  orderDetails: true,
                                  pickupTimeDetails: false,
                                });
                              }}
                            />
                            <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
                              PREPAID
                            </span>
                          </div>
                        </div>

                        {["B2B"].includes(order?.orderType) &&
                          sumInvoiceValue >= 50000 && (
                            <div className="md:!w-[35%] flex-1">
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
                                  setHighLightField({
                                    addressDetails: false,
                                    packageDetails: false,
                                    shippingDetails: false,
                                    orderDetails: true,
                                    pickupTimeDetails: false,
                                  });
                                }}
                              />
                            </div>
                          )}
                      </div>
                    </Accordian>
                  </div>
                </div>
              </div>
              <div className={`flex-1 ${!isLgScreen && "h-fit"}`}>
                <div className={`flex flex-col gap-y-5`}>
                  <div>
                    <ShippingDetails
                      order={order}
                      setOrder={setOrder}
                      setSortServiciblity={setSortServiciblity}
                      sortServiceiblity={sortServiceiblity}
                      showDownloadLebal={showDownloadLebal}
                      setShowPickupDate={setShowPickupDate}
                      resetOtherAddressDetails={resetOtherAddressDetails}
                      setResetOtherAddressDetails={setResetOtherAddressDetails}
                      setHighLightField={setHighLightField}
                      highLightField={highLightField}
                    />
                  </div>

                  {/* {order?.courierPartner && (
                    <div
                      className={`border flex justify-between ${
                        highLightField?.pickupTimeDetails
                          ? "border-[#004EFF]"
                          : "border-[#E8E8E8]"
                      } items-center rounded-lg`}
                    >
                      <Accordian
                        headerChild={
                          <div className="flex w-[100%] items-center justify-between">
                            <div>
                              <span className="mx-2 font-bold font-Open">
                                {"Pickup Details"}
                              </span>
                            </div>
                          </div>
                        }
                      >
                        <div className="flex justify-between items-center p-4">
                          {showPickupDate && !isLgScreen ? (
                            <></>
                          ) : (
                            <div className="text-[#1C1C1C] font-Open font-semibold text-[16px] leading-[20px] ">
                              Pickup Details
                            </div>
                          )}

                          <div>
                            {showPickupDate ? (
                              <div
                                className={`flex gap-x-2 ${
                                  !isLgScreen ? "text-[13px]" : "text-[15px]"
                                }`}
                              >
                                <div>Pickup On :</div>{" "}
                                <div
                                  className={`${
                                    isLgScreen ? "" : ""
                                  } text-[#1C1C1C] flex justify-center items-center font-Open font-bold leading-[20px] `}
                                >
                                  <span>{showPickupDate}</span>
                                  <button
                                    className="ml-2 w-[20px] h-[20px] cursor-pointer"
                                    onClick={() =>
                                      setShowDateAndTimeModal(true)
                                    }
                                  >
                                    <img src={editIcon} alt="" />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <OneButton
                                onClick={() => {
                                  setShowDateAndTimeModal(true);
                                  setHighLightField({
                                    addressDetails: false,
                                    packageDetails: false,
                                    shippingDetails: false,
                                    orderDetails: false,
                                    pickupTimeDetails: true,
                                  });
                                }}
                                text={`SELECT`}
                                variant="primary"
                                className="!w-[128px] font-extrabold"
                                // disabled={}
                              />
                            )}
                          </div>
                        </div>
                      </Accordian>
                    </div>
                  )} */}

                  {order?.boxInfo?.length > 0 && order?.courierPartner && (
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
                                // sessionStorage.clear();
                              }}
                              text={`CREATE NEW ORDER`}
                              variant="primary"
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <RightSideModal
                className={`w-full md:!w-[400px]`}
                wrapperClassName="rounded-l-xl"
                isOpen={showDateAndTimeModal}
                onClose={() => setShowDateAndTimeModal(false)}
              >
                <SelectDateModalForSinglePageOrder
                  onClick={() => setShowDateAndTimeModal(false)}
                  onPickupTimeSelected={handlePickupTimeSelected}
                />
              </RightSideModal>

              <CenterModal
                isOpen={showAlertBox}
                onRequestClose={() => setShowAlertBox(false)}
                className="min-w-0 max-w-lg min-h-0 max-h-[30%]"
              >
                <>
                  <div>
                    <div className="flex justify-center items-center mb-4">
                      <img src={walletIcon} alt="" />
                    </div>
                    <div className="max-w-[400px] flex justify-center text-center">
                      {" "}
                      Your wallet balance is too low to complete this
                      transaction. Please Recharge Your Wallet
                    </div>

                    <div className="mt-5">
                      <OneButton
                        onClick={() => navigate(`/wallet/view-wallet`)}
                        text={`RECHARGE WALLET`}
                        variant="primary"
                        className="!w-[228px]"
                      />
                    </div>
                  </div>
                </>
              </CenterModal>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Index;
