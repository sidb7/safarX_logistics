import React, { useEffect, useState } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import AddressCardDetails from "./AddressDetails";
import ShippingDetails from "./ShippingDetails/index";
import BoxInfo from "./components/boxInfo";
import PackageDetails from "./PackageDetails.tsx";
import SummaryIcon from "../../assets/singleOrderSummary.svg";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { capitalizeFirstLetter } from "../../utils/utility";
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
import walletIcon from "../../assets/Group.svg";
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
import { forEach } from "lodash";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  const columnsHelper = createColumnHelper<any>();
  const [showDownloadLebal, setDownloadLebal] = useState(false);
  const [isDownloadLoading, setDownloadLoading]: any = useState({});
  const [paymentMode, setPaymentMode] = useState("PREPAID");
  const [order, setOrder]: any = useState({
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
    source: "WEBSITE",
    pickupDate: "",
    gstNumber: "",
    // orderId: "",
    // eWayBillNo: 0,
    awb: "",
    brandName: "Google",
    brandLogo: "",
  });
  const [awbListForDownLoad, setAwbListForDownLoad] = useState([]);

  const [showAlertBox, setShowAlertBox] = useState(false);

  const walletBalance = useSelector((state: any) => state?.user?.walletBalance);

  const navigate = useNavigate();

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

  const Buttons = (className?: string) => {
    return (
      <div className="flex w-[100%] px-4 gap-x-4 justify-start items-center">
        <div className=" flex justify-start items-center h-fit">
          <input
            type="radio"
            name="type"
            value={order?.orderType}
            className=" mr-2 w-[15px] cursor-pointer h-[15px]"
            checked={order?.orderType === "B2C"}
            onChange={(e) => {
              setOrder((prevState: any) => {
                return {
                  ...prevState,
                  orderType: "B2C",
                };
              });
            }}
          />
          <div className="text-[15px]">B2C</div>
        </div>
        <div className=" flex justify-start items-center h-fit">
          <input
            type="radio"
            name="type"
            value={order?.orderType}
            title="coming soon"
            className=" mr-2 w-[15px] cursor-pointer h-[15px]"
            disabled={true}
            checked={order?.orderType === "B2B"}
            onChange={(e) => {
              setOrder((prevState: any) => {
                return {
                  ...prevState,
                  orderType: "B2B",
                };
              });
            }}
          />
          <div className="text-[15px]">B2B</div>
        </div>
        <div
          className=" flex justify-start items-center h-fit"
          title="coming soon"
        >
          <input
            type="radio"
            name="type"
            disabled={true}
            value={order?.orderType}
            className=" mr-2 w-[15px] cursor-pointer h-[15px]"
            checked={order?.orderType === "REVERSE"}
            onChange={(e) => {
              setOrder((prevState: any) => {
                return {
                  ...prevState,
                  orderType: "REVERSE",
                };
              });
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
            disabled={true}
            value={order?.orderType}
            className=" mr-2 w-[15px] cursor-pointer h-[15px]"
            checked={order?.orderType === "INTERNATIONAL"}
            onChange={(e) => {
              setOrder((prevState: any) => {
                return {
                  ...prevState,
                  orderType: "INTERNATIONAL",
                };
              });
            }}
          />
          <div className="text-[15px]">International</div>
        </div>
      </div>
    );
  };

  // const sumInvoiceValue =
  //   order?.boxInfo.length > 0 &&
  //   order?.boxInfo.reduce(
  //     (sum: any, box: any) => sum + box.codInfo.invoiceValue,
  //     0
  //   );

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
    columnsHelper.accessor("orderId", {
      header: () => {
        return (
          <p className="font-Open text-[10px] font-semibold leading-[16px] text-[#000000] text-center">
            Order ID
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="font-Open text-xs font-normal leading-[16px] text-[#000000] text-center p-[6px]">
            {info.row.original.orderId || "-"}
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
    columnsHelper.accessor("package", {
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
            {info.row.original?.ewaybillNumber || "-"}
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
    //     console.log("rowData", info.row.original?.codInfo?.invoiceValue);
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
    let header = {
      Accept: "/",
      Authorization: `Bearer ${localStorage.getItem(
        `${localStorage.getItem("sellerId")}_${tokenKey}`
      )}`,
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

    let header = {
      Accept: "/",
      Authorization: `Bearer ${localStorage.getItem(
        `${localStorage.getItem("sellerId")}_${tokenKey}`
      )}`,
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

    let header = {
      Accept: "/",
      Authorization: `Bearer ${localStorage.getItem(
        `${localStorage.getItem("sellerId")}_${tokenKey}`
      )}`,
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

    if (walletBalance < order?.totalPrice) {
      setShowAlertBox(true);
      return;
    }

    try {
      const { data } = await POST(REVERSE_ORDER, payload);

      if (data?.success) {
        const listOfawbs = data?.data[0]?.awbs.map(
          (awb: any) => awb?.tracking?.awb
        );
        setAwbListForDownLoad(listOfawbs);

        setDownloadLebal(true);
        toast.success(data?.message || "Successfully Placed order");
      } else {
        toast.error(data?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
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
          {/* table section  */}
          <div className="px-5">
            <CustomTable
              data={order?.boxInfo || []}
              columns={SummaryColumns}
              thclassName={"!w-auto "}
              tdclassName={"!w-auto"}
            />
          </div>

          {!showDownloadLebal ? (
            <div className="flex justify-center items-center pt-5 pb-12">
              <OneButton
                onClick={PlaceOrder}
                text={`Place Order ₹ ${
                  order?.totalPrice ? order?.totalPrice : 0
                } `}
                variant="primary"
                className="!w-[228px]"
                disabled={!validateOrder(order)}
              />
            </div>
          ) : (
            <div>
              <div className=" px-2 py-7 mx-3">
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
                  onClick={() => fetchLabels(awbListForDownLoad)}
                  variant="quad"
                  showIcon={true}
                  icon={DownloadIcon}
                  loading={
                    isDownloadLoading?.isLoading &&
                    isDownloadLoading?.identifier === "Download_Labels"
                  }
                  textTransform="capitalize"
                  className={`!w-[120px] !bg-transparent`}
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
                  className={`!w-[120px] !bg-transparent`}
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
                  className={`!w-[120px] !bg-transparent`}
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  const paymentModeToggle = (e: any) => {
    setPaymentMode(e);
    let tempOrder = { ...order };
    tempOrder.boxInfo.forEach((element: any) => {
      element.codInfo.isCod = e === "COD" ? true : false;
    });
    setOrder(tempOrder);
  };

  console.log("order", order);

  return (
    <>
      <div>
        <Breadcrum label="Add New Order" component={Buttons()} />
        <div className="flex gap-5 mx-5">
          <div className="flex-1 ">
            <div className="flex flex-col gap-y-4  !h-[calc(100vh-180px)] customScroll">
              <div className="!max-h-[450px] overflow-hidden">
                <AddressCardDetails
                  pickupDetails={order?.pickupDetails}
                  deliveryDetails={order?.deliveryDetails}
                  onPickupDetailsChange={handlePickupDetailsChange}
                  onDeliveryDetailsChange={handleDeliveryDetailsChange}
                />
              </div>
              <div className=" rounded !max-h-[450px] overflow-hidden">
                <PackageDetails
                  packageDetails={order?.boxInfo}
                  order={order}
                  setOrder={setOrder}
                />
              </div>

              <div className="border p-3 rounded gap-x-4 flex items-center">
                <div className="md:!w-[50%] ">
                  <CustomInputBox
                    isRightIcon={true}
                    containerStyle=""
                    rightIcon={AutoGenerateIcon}
                    className="w-full !text-base !font-semibold"
                    imageClassName="!h-[12px] !w-[113px] !top-[40%] "
                    value={order?.orderId}
                    maxLength={12}
                    label="Order ID"
                    onChange={(e) => {
                      setOrder((prevState: any) => {
                        return { ...prevState, orderId: e.target.value };
                      });
                    }}
                    onClick={() => {
                      const orderId = generateUniqueCode(8, 12);
                      setOrder((prevState: any) => {
                        return { ...prevState, orderId: orderId };
                      });
                    }}
                    visibility={true}
                    setVisibility={() => {}}
                    name="orderId"
                    data-cy="auto-generate-order-id"
                  />
                </div>

                <div className="flex gap-x-4 items-center">
                  <div className="flex justify-center items-center">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="COD"
                      disabled={
                        Array.isArray(order?.boxInfo) &&
                        order?.boxInfo.length === 0
                      }
                      className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                      checked={paymentMode === "COD"}
                      onChange={(e: any) => paymentModeToggle(e.target.value)}
                    />
                    <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
                      COD
                    </span>
                  </div>
                  <div
                    className="flex justify-center items-center "
                    title="comming soon"
                  >
                    <input
                      type="radio"
                      name="paymentMode"
                      value="PREPAID"
                      disabled={
                        Array.isArray(order?.boxInfo) &&
                        order?.boxInfo.length === 0
                      }
                      className=" mr-2 w-[15px] cursor-pointer h-[15px]"
                      checked={paymentMode === "PREPAID"}
                      onChange={(e: any) => paymentModeToggle(e.target.value)}
                    />
                    <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
                      PREPAID
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-y-5">
              <div>
                <ShippingDetails order={order} setOrder={setOrder} />
              </div>
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
                          onClick={() => window.location.reload()}
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
        </div>

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
                Your wallet balance is too low to complete this transaction.
                Please Recharge Your Wallet
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
  );
};

export default Index;
