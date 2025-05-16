import React, { useEffect, useState } from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import WalletBalanaceicon from "../../../assets/walletBalance.svg";
import WallerMoneyIcon from "../../../assets/walletMoney.svg";
import transactionHistoryIcon from "../../../assets/Reload_black.svg";
import transactionHistoryIconForMob from "../../../assets/Reload.svg";
import WalletIcon from "../../../assets/Navbar/wallet.svg";
import CustomInputBox from "../../../components/Input";
import PhonePe from "../../../assets/Payment/PhonePe_Logo.svg.png";
import RazorPayIcon from "../../../assets/Payment/Razorpay_logo.png";
import PaytmIcon from "../../../assets/Payment/paytmLogoPNG.png";
import JusPayIcon from "../../../assets/Payment/juspaylogo.svg";
import leftArrow from "../../../assets/leftArrow.svg";
import SuccessTickGif from "../../../assets/tick.gif";
import CrossIcon from "../../../assets/CloseIcon.svg";
import toast from "react-hot-toast";
import {
  getLocalStorage,
  loadPhonePeTransaction,
  loadRazorPayTransaction,
  removeLocalStorage,
} from "../../../utils/utility";
import { POST } from "../../../utils/webService";
import {
  COMPANY_NAME,
  GET_WALLET_RECHARGE_COUPONS,
  INITIAL_RECHARGE,
  POST_VERIFY_COUPON_CODE_ON_WALLET_RECHARGE,
  RECHARGE_STATUS,
  SELLER_WEB_URL,
  WALLET_RECHARGE_USING_NEFT,
  GET_WALLET_BALANCES_DATA,
  POST_UPDATE_WALLETBALANCE,
} from "../../../utils/ApiUrls";
import sessionManager from "../../../utils/sessionManager";
import { Spinner } from "../../../components/Spinner";
import OneButton from "../../../components/Button/OneButton";
import { useDispatch, useSelector } from "react-redux";
import { useRazorpay } from "react-razorpay";
import { PaymentSlice } from "../../../redux/reducers/paymentReducer";
import { useNavigate } from "react-router-dom";
import Paytm from "../../../paytm/Paytm";
import successStatus from "../../../assets/success.svg";
import CenterModal from "../../../components/CustomModal/customCenterModal";
interface IViewWalletProps {}

const ViewWallet: React.FunctionComponent<IViewWalletProps> = (props) => {
  const dispatch = useDispatch();
  const { Razorpay } = useRazorpay();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let myInterval: number | any;
  const [isDisabled, setIsDisabled] = useState(false);
  const [amount, setAmount] = useState("100");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [couponCode, setCouponCode] = useState("");
  const [showCoupons, setShowCoupons] = useState(false);
  const [paymentGatewayArr, setPaymentGatewayArr] = useState<any>([]);
  const [paymentGateway, setPaymentGateway] = useState<any>("");
  const [paymentLoader, setPaymentLoader] = useState<any>(false);
  const [dataFromSession, setDataFromSession] = useState<any>();
  const [companydetails, setcompanydetails] = useState<any>(
    JSON.parse(sessionStorage.getItem("companydetails") as string)
  );
  const [loaderForFetchBankDetails, setLoaderForFetchBankDetails] =
    useState<any>(false);
  const [loaderForRechargeWalletNeft, setLoaderForRechargeWalletNeft] =
    useState<any>(false);
  // const [showNeftSuccessFullMsg, setShowNeftSuccessFullMsg] = useState(false);
  const [paymentGatewaySuccess, setPaymentGatewaySuccess] = useState(false);
  const [triggerSuccessMessage, setTriggerSuccessMessage] =
    useState<boolean>(false);
  const [utrNo, setUtrNo] = useState<any>("");
  const [loadingForCoupon, setLoadingForCoupon] = useState(false);
  const [couponDetails, setCouponDetails] = useState<any>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<{
    couponCode: string;
    couponStatus: string;
    expiryDate: string;
    minRechargeAmount: number;
    maxAmount: number;
  } | null>(null);
  const [verifiedCouponData, setVerifiedCouponData] = useState<any>(null);
  const [isCouponVerified, setIsCouponVerified] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isActives, setIsActives] = useState(false);
  const rechargeAmountFromRedux = useSelector(
    (state: any) => state?.payment?.amount
  );
  const [codAmount, setCodAmount] = useState("");
  const [walletData, setWalletData] = useState({
    totalPayableAmount: 0,
    walletBalance: 0,
    yaariCash: 0,
    maxUsableAmount: 0,
  });
  const userDetails = useSelector((state: any) => state.signin);

  //getting the sellerID
  const { sellerInfo } = sessionManager({});
  const sellerId = sellerInfo?.sellerId;

  const userDetailsFromSession = () => {
    const { sellerInfo } = sessionManager({});
    let temp = sellerInfo;
    setDataFromSession(temp);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setAmount(e.target.value);
    const value = e.target.value;
    // Allow only digits (optionally with decimal if you need)
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const rechargeStatusCheck = async (orderId: number) => {
    const payload = {
      // walletId: "932defa2-2bfa-40b5-8f5c-275ac834ce94",
      orderId: orderId,
    };
    const datas = await POST(RECHARGE_STATUS, payload);

    if (datas?.data?.success) {
      setIsLoading(false);
      toast.success("Payment success");
      clearInterval(myInterval);
      navigate("/order");
    } else if (
      datas?.data?.message ===
      "Looks like the payment is not complete. Please wait while we confirm the status with your bank."
    ) {
      setIsLoading(false);
      toast.error("Decline Payment By User!!");
      clearInterval(myInterval);
    }
  };

  const JusPayHandler = async (
    amountFromRedux?: any,
    callbackUrlRedux?: any
  ) => {
    const callbackUrl = `${SELLER_WEB_URL}/wallet/view-wallet`;
    if (amountFromRedux || amount) {
      setLoading(true);
      let initialObject = {
        amount: amountFromRedux ? amountFromRedux.toString() : amount,
        callbackUrl: callbackUrlRedux ? callbackUrlRedux : callbackUrl,
      };

      const { data: response } = await POST(INITIAL_RECHARGE, {
        paymentObject: initialObject,
        paymentGateway: "JUSPAY",
        couponCode:
          couponCode !== ""
            ? couponCode
            : selectedCoupon &&
              selectedCoupon.couponStatus !== "Expired" &&
              Number(initialObject?.amount.replace(/,/g, "")) >=
                selectedCoupon.minRechargeAmount
            ? selectedCoupon.couponCode
            : "",
      });
      if (response?.success === true) {
        if (response?.data?.status === "NEW") {
          localStorage.setItem("order_id", response?.data?.order_id);
          window.location.replace(response?.data?.payment_links?.web);
          myInterval = setInterval(function () {
            rechargeStatusCheck(response?.data?.order_id);
            window.location.reload();
          }, 500);

          // setLoading(false);
        }
      } else {
        setLoading(false);
      }
      dispatch(PaymentSlice.actions.paymentAmount(0));
    } else {
      toast.error("Please select amount for recharge");
    }
  };

  const handleQuickAmount = (value: string) => {
    setAmount(value);
  };

  // payment method change functionality
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  // toggle functionality
  const toggleCoupons = () => {
    setShowCoupons(!showCoupons);
  };

  // payment icons to render
  const paymentIcons: any = {
    RAZORPE: { src: RazorPayIcon, width: 80, height: 30 },
    PHONEPE: { src: PhonePe, width: 80, height: 30 },
    PAYTM: { src: PaytmIcon, width: 55, height: 30 },
    JUSPAY: { src: JusPayIcon, width: 80, height: 30 },
  };

  // date formatter for coupon expiry
  const formatDate = (dateStr: any) => {
    // Create a new Date object from the ISO string
    const dateObj = new Date(dateStr);

    // Get the day of the month
    const day = dateObj.getUTCDate();

    // Function to get the day suffix (e.g., 'st', 'nd', 'rd', 'th')
    const getDaySuffix = (day: any) => {
      if (day > 3 && day < 21) return "th"; // special case for 11th, 12th, 13th, etc.
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    // Get the abbreviated month name (e.g., 'Jan', 'Feb', etc.)
    const month = dateObj.toLocaleString("default", { month: "short" });

    // Return the formatted string
    return `${day}${getDaySuffix(day)} ${month}`;
  };

  // get coupons function
  const getWalletRechargeCoupons = async () => {
    try {
      const { data: response } = await POST(GET_WALLET_RECHARGE_COUPONS, {});

      if (response?.success) {
        setCouponDetails([response?.data]);
      } else {
        console.log(response?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getWalletBalanceData = async () => {
    try {
      const { data: response } = await POST(GET_WALLET_BALANCES_DATA, {});
      if (response?.success) {
        setWalletData(response?.data);
        setCodAmount(response?.data?.maxUsableAmount);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // coupon verification
  const handleVerifyCoupon = async () => {
    try {
      setLoadingForCoupon(true);
      let payload = {
        couponCode: couponCode,
        minRechargeAmount: amount,
      };
      const { data: response } = await POST(
        POST_VERIFY_COUPON_CODE_ON_WALLET_RECHARGE,
        payload
      );
      if (response?.success === true) {
        toast.success(response?.message);
        setLoadingForCoupon(false);
        setIsCouponVerified(true);
        setVerifiedCouponData(response);
      } else {
        toast.error(response?.message);
        setLoadingForCoupon(false);
        setCouponCode("");
        setVerifiedCouponData(null);
      }
    } catch (error) {
      return error;
    }
  };

  // phonePe transaction
  const handlePhonePeTransaction = async () => {
    setLoading(true);

    await loadPhonePeTransaction(
      amount,
      `${SELLER_WEB_URL}/wallet/view-wallet`,
      `${SELLER_WEB_URL}/wallet/view-wallet`,
      couponDetails,
      couponCode,
      selectedCoupon
    );
    setLoading(false);
  };

  // razorpay transaction
  const handleRazorPayTransaction = async () => {
    let replacewalletValue: any = amount;
    let redirectUrl = `${SELLER_WEB_URL}/wallet/view-wallet`;

    const options: any = await loadRazorPayTransaction(
      replacewalletValue,
      COMPANY_NAME?.toUpperCase(),
      userDetails.name,
      userDetails.email,
      redirectUrl,
      couponDetails,
      couponCode,
      selectedCoupon
    );

    if (!options?.success && !options?.amount) {
      toast.error(options?.message);
      return;
    }

    const rzp1: any = new Razorpay(options);

    rzp1.on("payment.failed", (response: any) => {});

    rzp1.open();
  };

  // neft transaction
  const SubmitHandler = async () => {
    if (Number(amount) < 1000) {
      toast.error("Amount should be equal or greater than 1000");
      return;
    }

    const payLoad = {
      utrNo: utrNo,
      amount: +amount,
    };

    setLoaderForRechargeWalletNeft(true);

    const { data } = await POST(WALLET_RECHARGE_USING_NEFT, payLoad);
    if (data?.success) {
      setLoaderForRechargeWalletNeft(false);
      setTriggerSuccessMessage(true);
      setPaymentGatewaySuccess(true);
    } else {
      toast.error(data?.message);
      setLoaderForRechargeWalletNeft(false);
      setTriggerSuccessMessage(false);
      setPaymentGatewaySuccess(false);
    }
  };

  // handle cod recharge
  const handleUpdateWallet = async () => {
    try {
      if (Number(codAmount) > walletData?.maxUsableAmount) {
        toast.error(
          `Amount cannot be greater than Eligible Amount ₹ ${walletData?.maxUsableAmount}`
        );
        return;
        // setCongratulationsModal(false);
      } else {
        const payload = {
          amount: Number(codAmount),
        };
        try {
          // setUpdateWalletLoader(true);

          if (payload?.amount <= 0 || !payload?.amount) {
            toast.error("Please enter a Amount Greater Than Zero");
          } else {
            // setCongratulationsModalAmount(payload?.amount);
            const data = await POST(POST_UPDATE_WALLETBALANCE, payload);
            // console.log("🚀 ~ handleUpdateWal ~ data:", data);
            if (data?.data?.success) {
              console.log(data);
              setTriggerSuccessMessage(true);
              setPaymentGatewaySuccess(true);
              setCodAmount("");
            } else {
              // setUpdateWalletLoader(false);
              setTriggerSuccessMessage(false);
              setPaymentGatewaySuccess(false);
            }
          }
        } catch (error: any) {
          console.log(error.message);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // handle payment for Pay Now
  const handlePayment = () => {
    if (!amount) {
      return toast.error("Please enter amount");
    }

    if (Number(amount) <= 0) {
      return toast.error("Minimum recharge amount should be greater than Zero");
    }

    if (paymentMethod === "cod") {
      console.log("COD payment method selected");
      // TODO: Add COD payment logic here
      handleUpdateWallet();
      return;
    }

    if (paymentMethod === "neft") {
      // console.log("NEFT payment method selected");

      if (!utrNo) {
        return toast.error("Please enter UTR No");
      }

      return SubmitHandler();
    }

    // Default case: "online"
    if (!paymentGateway) {
      return toast.error("Please select a payment option first");
    }

    switch (paymentGateway) {
      case "JUSPAY":
        return JusPayHandler(rechargeAmountFromRedux);
      case "RAZORPE":
        return handleRazorPayTransaction();
      case "PHONEPE":
        return handlePhonePeTransaction();
      default:
        // return toast.error("Unsupported payment gateway selected");
        break;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (localStorage.getItem("showToastPaytm")) {
          toast.success("Transaction Successfull");

          // Remove the flag to prevent repeated toasts
          localStorage.removeItem("showToastPaytm");
        }
        const juspayOrderId = getLocalStorage("order_id");
        if (juspayOrderId) {
          setPaymentLoader(true);
          const orderStatus = await POST(RECHARGE_STATUS, {
            orderId: juspayOrderId,
            paymentGateway: "JUSPAY",
            transactionId: juspayOrderId,
          });
          if (orderStatus?.data?.success === false) {
            toast.error("Something Went Wrong");
          } else {
            //gtm
            window?.dataLayer?.push({
              event: "seller_wallet_recharge",
              sellerId: sellerId,
              wallet_recharge: true,
            });
            toast.success("Wallet Recharge Successfully");

            // navigate(`${SELLER_WEB_URL}/wallet/view-wallet`);
          }
          setPaymentLoader(false);
          removeLocalStorage("order_id");
        }
      } catch (error) {
        console.error(error);
      }
    })();
    userDetailsFromSession();
    let tempPaymentArr: any = sessionStorage.getItem("paymentGateway");
    tempPaymentArr = JSON.parse(tempPaymentArr);
    setPaymentGatewayArr(tempPaymentArr);
  }, []);

  useEffect(() => {
    if (amount) {
      setIsDisabled(false);
    } else setIsDisabled(true);
  }, [amount]);

  useEffect(() => {
    getWalletRechargeCoupons();
    getWalletBalanceData();
  }, []);

  // useEffect(() => {
  //   if (couponDetails.length > 0) {
  //     if (
  //       Number(amount.replace(/,/g, "")) >= +couponDetails[0]?.minRechargeAmount
  //     ) {
  //       setIsActives(true);
  //     } else {
  //       setIsActives(false);
  //     }
  //   }
  // }, [amount, couponDetails]);

  useEffect(() => {
    if (couponDetails.length > 0) {
      const currentAmount = Number(amount.replace(/,/g, ""));
      const minRechargeAmount = couponDetails[0]?.minRechargeAmount;

      // Check if the amount satisfies the coupon limit
      if (currentAmount >= minRechargeAmount) {
        setIsActives(true);
      } else {
        setIsActives(false);

        // Deselect the coupon if the amount is below the limit
        if (selectedCoupon) {
          toast.error(
            `Amount is below the minimum recharge limit for the selected coupon. Deselecting the coupon.`
          );
          setSelectedCoupon(null);
          setCouponCode("");
          setIsCouponVerified(false);
        }
        // Check if the amount satisfies the coupon limit for verifiedCouponData
        if (verifiedCouponData) {
          const minRechargeAmount = verifiedCouponData?.reuiredAmount || 0;
          if (currentAmount >= minRechargeAmount) {
            setIsActives(true);
          } else {
            setIsActives(false);
            toast.error(
              `Amount is below the minimum recharge limit for the verified coupon. Resetting the coupon verification.`
            );
            setVerifiedCouponData(null);
            setCouponCode("");
            setIsCouponVerified(false);
          }
        }
      }
    }
  }, [amount, couponDetails, selectedCoupon, verifiedCouponData]);

  return (
    <>
      <div>
        <Breadcrum
          label="Wallet Recharge"
          component={
            <>
              <OneButton
                type="button"
                onClick={() => navigate("/wallet/transaction-history")}
                variant="secondary"
                text={`${"Transaction History"}`}
                className="!bg-[#ffffff] !border !border-[#eef1f4] !shadow-sm !rounded-xl !px-4 !py-2 !h-10  hover:!bg-[#F4F7FE] hover:!text-[#1C1C1C] hover:!shadow-md text-![#1C1C1C] !text-lg !font-medium !hover:font-semibold !leading-5 "
                icon={transactionHistoryIcon}
                showIcon={true}
              />
            </>
          }
          componentClass={"mt-4 md:mt-0 hidden md:block"}
        />

        <div className="w-full mx-auto px-4 sm:px-6 lg:px-5 overflow-hidden mt-5 lg:mt-0">
          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] mb-6 lg:mb-12">
            <div
              className="bg-white rounded-[20px] shadow-md p-4 block md:hidden"
              onClick={() => navigate("/wallet/transaction-history")}
            >
              <div className="flex items-center gap-y-2 gap-x-[18px] mb-2">
                <div className="w-8 h-8 lg:w-14 lg:h-14 bg-[#F4F7FE] rounded-full flex items-center justify-center">
                  <img
                    src={transactionHistoryIconForMob}
                    alt="transaction-history-icon"
                  />
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="font-DMOpen text-sm text-[#A3AED0] font-medium leading-6 tracking-wider">
                    Transaction History
                  </p>
                  <img src={leftArrow} alt="arrow" height={20} width={20} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[20px] shadow-md p-4">
              <div className="flex items-center gap-y-2 gap-x-[18px] mb-2">
                <div className="w-8 h-8 lg:w-14 lg:h-14 bg-[#F4F7FE] rounded-full flex items-center justify-center">
                  <img src={WalletBalanaceicon} alt="wallet-balance-icon" />
                </div>
                <div>
                  <p className="font-DMOpen text-sm text-[#A3AED0] font-medium leading-6 tracking-wider">
                    Wallet Balance
                  </p>
                  <p className="font-DMOpen text-xl lg:text-2xl text-[#2B3674] font-bold leading-8 tracking-wide">
                    ₹&nbsp;
                    {Number(walletData.walletBalance ?? 0).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] shadow-md p-4">
              <div className="flex items-center gap-y-2 gap-x-[18px] mb-2">
                <div className="w-8 h-8 lg:w-14 lg:h-14 bg-[#F4F7FE] rounded-full flex items-center justify-center">
                  <img src={WallerMoneyIcon} alt="Cod-icon" />
                </div>
                <div>
                  <p className="font-DMOpen text-sm text-[#A3AED0] font-medium leading-6 tracking-wider">
                    COD Balance
                  </p>
                  <p className="font-DMOpen text-xl lg:text-2xl text-[#2B3674] font-bold leading-8 tracking-wide">
                    ₹&nbsp;
                    {Number(walletData.totalPayableAmount ?? 0).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] shadow-md p-4">
              <div className="flex items-center gap-y-2 gap-x-[18px] mb-2">
                <div className="w-8 h-8 lg:w-14 lg:h-14 bg-[#F4F7FE] rounded-full flex items-center justify-center">
                  <img src={WallerMoneyIcon} alt="Cod-icon" />
                </div>
                <div>
                  <p className="font-DMOpen text-sm text-[#A3AED0] font-medium leading-6 tracking-wider">
                    Yaari Cash
                  </p>
                  <p className="font-DMOpen text-xl lg:text-2xl text-[#2B3674] font-bold leading-8 tracking-wide">
                    ₹&nbsp;
                    {Number(walletData.yaariCash ?? 0).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
            {/* Left Section - Recharge Form */}
            <div className="lg:col-span-1">
              <div className="bg-[#F1F3FF] rounded-[20px] shadow-xl p-4">
                <div className="flex items-center gap-2">
                  <img
                    src={WalletIcon}
                    alt="wallet-icon"
                    width={20}
                    height={20}
                  />

                  <h2 className="font-Lato text-[#1C1C1C] text-lg font-semibold leading-6 tracking-wide">
                    Recharge Your Wallet
                  </h2>
                </div>
                <div className="px-5 pt-4 pb-1">
                  <p className="font-Lato text-[16px] text-[#606060] font-normal leading-4 mb-4 tracking-wide">
                    Enter The Amount
                  </p>
                  {/* Amount Input */}
                  <div className="mb-[18px]">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        ₹
                      </span>
                      <input
                        type="text"
                        value={amount}
                        inputMode="numeric"
                        onChange={handleAmountChange}
                        onKeyDown={(e) => {
                          // Allow: Backspace, Delete, Tab, Escape, Enter
                          if (
                            [
                              "Backspace",
                              "Delete",
                              "Tab",
                              "Escape",
                              "Enter",
                              "ArrowLeft",
                              "ArrowRight",
                            ].includes(e.key)
                          ) {
                            return;
                          }

                          // Prevent anything that's not a digit
                          if (!/^\d$/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        className="w-[270px] md:w-[320px] border border-gray-300 rounded-md py-2 px-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength={7}
                      />
                    </div>
                  </div>
                </div>
                {/* Quick Amount Buttons */}
                <div className="flex flex-wrap gap-x-[30px] gap-y-[24px] md:gap-y-0">
                  <button
                    onClick={() => handleQuickAmount("2000")}
                    className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
                  >
                    ₹2000
                  </button>
                  <button
                    onClick={() => handleQuickAmount("3000")}
                    className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
                  >
                    ₹3000
                  </button>
                  <button
                    onClick={() => handleQuickAmount("4000")}
                    className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
                  >
                    ₹4000
                  </button>
                  <button
                    onClick={() => handleQuickAmount("5000")}
                    className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
                  >
                    ₹5000
                  </button>
                </div>
              </div>

              {/* Payment Method Options */}
              <div className="space-y-4 my-2">
                <div
                  className="flex flex-col"
                  // onClick={() => handlePaymentMethodChange("cod")}
                >
                  <div className="flex gap-x-2">
                    <div>
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        checked={paymentMethod === "cod"}
                        onChange={() => handlePaymentMethodChange("cod")}
                        className="mt-[6px] cursor-not-allowed"
                        disabled={true}
                      />
                    </div>
                    <div className="space-y-2 mt-5">
                      <p className="font-Open text-base text-[#004EFF] font-normal leading-5 opacity-[0.4]">
                        Recharge using COD Balance
                      </p>
                      <p className="font-Open text-xs text-[#777777] font-normal leading-4 opacity-[0.4]">
                        Add money to wallet with COD. Max 75% of COD Balance can
                        be used.
                      </p>

                      {paymentMethod === "cod" && (
                        <>
                          <p className="font-Open font-normal text-xs text-[#323232] leading-4 pt-[6px]">
                            Enter COD Amount
                          </p>

                          <CustomInputBox
                            label="COD Amount"
                            inputType="text"
                            id={"codAmount"}
                            inputMode="numeric"
                            containerStyle={`lg:!w-auto`}
                            labelClassName="!font-Open"
                            value={codAmount || ""}
                            onChange={(e: any) => {
                              if (isNaN(e.target.value)) {
                              } else {
                                setCodAmount(e.target.value);
                              }
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="flex flex-col"
                  onClick={() => handlePaymentMethodChange("online")}
                >
                  <div className="flex gap-x-2">
                    <div>
                      <input
                        type="radio"
                        id="online"
                        name="paymentMethod"
                        checked={paymentMethod === "online"}
                        onChange={() => handlePaymentMethodChange("online")}
                        className="mt-[6px] cursor-pointer"
                      />
                    </div>
                    <div className="space-y-2 mt-5">
                      <p
                        className={`font-Open text-base text-[#1C1C1C] font-normal leading-5 ${
                          paymentMethod !== "online" && "cursor-pointer"
                        }`}
                      >
                        Online (UPI/Debit/Credit/Net Banking)
                      </p>
                      <p
                        className={`font-Open text-xs text-[#777777] font-normal leading-4 ${
                          paymentMethod !== "online" && "cursor-pointer"
                        }`}
                      >
                        Select a payment gateway to proceed securely.
                      </p>

                      {paymentMethod === "online" && (
                        <>
                          <div className="flex flex-wrap gap-x-3 gap-y-3 sm:grid sm:grid-cols-2 md:flex">
                            {paymentGatewayArr?.map((el: any, i: number) => (
                              <div
                                key={i}
                                onClick={() => setPaymentGateway(el?.paymentId)}
                                className={`border cursor-pointer text-sm min-w-[6rem] py-[10px] text-center flex justify-center items-center  px-[10px] rounded-[9px] transition-transform ${
                                  el?.paymentId === paymentGateway
                                    ? "border-[#004EFF] border-[0.5px] text-white scale-105"
                                    : "hover:bg-[#f4f0f0] hover:shadow-cardShadow2a"
                                }`}
                              >
                                {paymentIcons[el?.paymentId] ? (
                                  <img
                                    {...paymentIcons[el?.paymentId]}
                                    alt=""
                                  />
                                ) : (
                                  el?.paymentId
                                )}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className="flex flex-col"
                  onClick={() => handlePaymentMethodChange("neft")}
                >
                  <div className="flex gap-x-2">
                    <div>
                      <input
                        type="radio"
                        id="neft"
                        name="paymentMethod"
                        checked={paymentMethod === "neft"}
                        onChange={() => handlePaymentMethodChange("neft")}
                        className="mt-[6px] cursor-pointer"
                      />
                    </div>
                    <div className="space-y-2 mt-5">
                      <p
                        className={`font-Open text-base text-[#1C1C1C] font-normal leading-5 ${
                          paymentMethod !== "neft" && "cursor-pointer"
                        }`}
                      >
                        NEFT/IMPS/RTGS
                      </p>
                      <p
                        className={`font-Open text-xs text-[#8D8D8D] font-normal leading-4 ${
                          paymentMethod !== "neft" && "cursor-pointer"
                        }`}
                      >
                        (For ₹1,000 or above ₹1,000 only)
                      </p>
                      <p
                        className={`font-Open text-xs text-[#8D8D8D] font-normal leading-4 ${
                          paymentMethod !== "neft" && "cursor-pointer"
                        }`}
                      >
                        (Note: NEFT/INPS transactions gets approved in maximum
                        24-48 hrs after review)
                      </p>

                      {paymentMethod === "neft" && (
                        <>
                          <div className="flex flex-col md:flex-row md:justify-between py-2 gap-x-6 gap-y-6 md:gap-y-0">
                            <div
                              className={`flex-1 ${
                                loaderForFetchBankDetails &&
                                "flex flex-col items-center justify-center "
                              } py-4 pl-4 pr-2 rounded-[20px] bg-[#FDF6EA] shadow-md`}
                            >
                              {loaderForFetchBankDetails ? (
                                <div className="flex justify-center items-center">
                                  <Spinner />
                                </div>
                              ) : (
                                <>
                                  <div className="font-bold font-Open text-base leading-[22px] text-[#202427]">
                                    {
                                      companydetails?.companyDetails
                                        ?.bankDetails?.accountName
                                    }
                                  </div>
                                  <div>
                                    <div className="flex gap-x-2">
                                      <p className="font-Open text-[14px] text-[#323232] font-semibold leading-[18px]">
                                        <span className="font-Open text-[14px] text-[#323232] font-normal leading-5 ">
                                          Bank :{" "}
                                        </span>
                                        {
                                          companydetails?.companyDetails
                                            ?.bankDetails?.bankName
                                        }{" "}
                                      </p>
                                    </div>
                                    <div className="flex gap-x-2">
                                      <p className="font-Open text-[14px] text-[#323232] font-semibold leading-[18px]">
                                        <span className="font-Open text-[14px] text-[#323232] font-normal leading-5 ">
                                          A/C No :{" "}
                                        </span>
                                        {
                                          companydetails?.companyDetails
                                            ?.bankDetails?.accountNo
                                        }
                                      </p>{" "}
                                    </div>
                                    <div className="flex gap-x-2">
                                      <p className="font-Open text-[14px] text-[#323232] font-semibold leading-[18px]">
                                        <span className="font-Open text-[14px] text-[#323232] font-normal leading-5 ">
                                          Branch :{" "}
                                        </span>
                                        {
                                          companydetails?.companyDetails
                                            ?.bankDetails?.branchName
                                        }
                                      </p>
                                    </div>
                                    <div className="flex gap-x-2">
                                      <p className="font-Open text-[14px] text-[#323232] font-semibold leading-[18px]">
                                        <span className="font-Open text-[14px] text-[#323232] font-normal leading-5 ">
                                          IFSC Code :{" "}
                                        </span>
                                        {
                                          companydetails?.companyDetails
                                            ?.bankDetails?.ifscCode
                                        }
                                      </p>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>

                            <div className="flex-1 flex items-center justify-center w-[100%]">
                              <div className="flex w-[100%] flex-col gap-y-6">
                                <div className="flex-1">
                                  <CustomInputBox
                                    label="Enter Ref/UTR No"
                                    name=""
                                    value={utrNo}
                                    onChange={(e: any) => {
                                      setUtrNo(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col md:flex-row items-center justify-between gap-2">
                <p
                  className={`text-sm text-[#323232] font-Open font-normal leading-4 mb-3 md:mb-0 ${
                    isCouponVerified ? "pb-7" : ""
                  }`}
                >
                  Have a Coupon Code?
                </p>
                <div className="flex items-center gap-x-2 w-full md:w-auto">
                  <div className="relative flex-1">
                    <CustomInputBox
                      label="Enter your Coupon Code "
                      name=""
                      value={couponCode}
                      onChange={(e: any) => {
                        const noSpacesValue = e.target.value
                          .replace(/\s+/g, "")
                          .toUpperCase();
                        setCouponCode(noSpacesValue);
                        setPaymentGateway("");
                      }}
                      className="w-full md:w-[250px]"
                      isDisabled={
                        selectedCoupon !== null || isCouponVerified
                          ? true
                          : false
                      }
                    />
                    {isCouponVerified && (
                      <div className=" font-Open text-[12px] font-normal leading-4 my-1 pt-1 text-start flex flex-wrap text-green-600">
                        Get upto &nbsp;
                        <b>₹{verifiedCouponData?.maxAmount}</b>
                        &nbsp; cashback on a minimum recharge of&nbsp;₹
                        {verifiedCouponData?.reuiredAmount}
                      </div>
                    )}
                  </div>

                  {isCouponVerified ? (
                    <div
                      className={`flex flex-wrap gap-x-1 items-center text-center ${
                        isCouponVerified ? "pb-10 lg:pb-6" : ""
                      }`}
                    >
                      <img src={successStatus} alt="successStatus" />
                      <span
                        className={`text-[14px] font-normal font-Open leading-5 text-[#7CCA62] tracking-wide`}
                      >
                        VERIFIED
                      </span>
                    </div>
                  ) : (
                    <OneButton
                      type="button"
                      onClick={handleVerifyCoupon}
                      variant="primary"
                      text={`${loadingForCoupon ? "Verifying..." : "Verify"}`}
                      className="!rounded-[20px] !py-2 !px-4"
                      disabled={loadingForCoupon || selectedCoupon !== null}
                    />
                  )}
                  <div
                    className={`flex gap-x-2 items-center bg-[#FFFFFF] text-[#004EFF] underline underline-offset-4 hover:bg-[#F2F6FF] hover:shadow-cardShadow2a focus:bg-[#F2F6FF] focus:border focus:border-[#CCDCFF] hover:rounded-md px-2 py-4 ${
                      isCouponVerified ? "pb-14 lg:pb-10" : ""
                    } ${couponDetails?.length === 0 ? "hidden" : ""}`}
                    onClick={toggleCoupons}
                  >
                    <button
                      type="button"
                      onClick={toggleCoupons}
                      className="buttonClassName md:text-[14px] font-Open font-semibold leading-5 whitespace-nowrap"
                      disabled={loadingForCoupon}
                    >
                      Available Coupons
                    </button>

                    <svg
                      className={`w-4 h-4 transform ${
                        showCoupons ? "rotate-180" : ""
                      }`}
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
                </div>
              </div>

              {/* Available Coupons */}
              <div className="flex flex-row flex-wrap gap-x-4 gap-y-4 mb-4 ml-[17px]">
                {showCoupons &&
                  couponDetails.map((coupon: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`relative overflow-hidden rounded-2xl border shadow-md transition-all duration-300 md:w-[380px] mt-4 ${
                          isActives && coupon.couponStatus !== "Expired"
                            ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50"
                            : "border-gray-200 bg-gradient-to-br from-gray-50 to-slate-50"
                        } ${
                          selectedCoupon?.couponCode === coupon.couponCode
                            ? "ring-2 ring-blue-500"
                            : ""
                        }hover:scale-[1.03] hover:shadow-lg cursor-${
                          isActives && coupon.couponStatus !== "Expired"
                            ? "pointer"
                            : "not-allowed"
                        }`}
                        style={{
                          animation: "fadeIn 0.5s ease-out forwards",
                          opacity: 1, // Ensure visibility
                          transform: "translateY(0px)",
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => {
                          if (isActives && coupon.couponStatus !== "Expired") {
                            if (
                              selectedCoupon?.couponCode === coupon.couponCode
                            ) {
                              setSelectedCoupon(null); // Deselect
                            } else {
                              setIsCouponVerified(false);
                              setCouponCode("");
                              setSelectedCoupon({
                                couponCode: coupon.couponCode,
                                couponStatus: coupon.couponStatus,
                                expiryDate: coupon.expiryDate,
                                minRechargeAmount: coupon.minRechargeAmount,
                                maxAmount:
                                  coupon?.cashbackValue?.maxAmount ?? 0,
                              });
                            }
                          } else {
                            toast.error(
                              "This coupon is not available for selection."
                            );
                          }
                        }}
                      >
                        <div className="relative z-10 px-4 py-3">
                          <div className="mb-1 flex justify-between items-center">
                            <p
                              className={`font-Lato text-lg font-bold tracking-wider leading-6 ${
                                isActives && coupon.couponStatus !== "Expired"
                                  ? "text-blue-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {coupon.couponCode}
                            </p>
                            <p
                              className={`flex px-5 py-1 rounded-xl whitespace-nowrap font-Open text-[14px] font-semibold  ${
                                isActives && coupon.couponStatus !== "Expired"
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {formatDate(coupon.expiryDate)}{" "}
                            </p>
                          </div>

                          <p className="mt-2 font-Noto text-sm text-gray-600 leading-5">
                            Get up to ₹{coupon?.cashbackValue?.maxAmount}
                            &nbsp; cashback on a minimum recharge of&nbsp;
                            <span className="font-medium">
                              ₹{coupon.minRechargeAmount.toLocaleString()}
                            </span>
                          </p>

                          <div
                            className={`mt-3 rounded-full px-3 py-1 font-Open text-xs font-medium leading-5 ${
                              isActives && coupon.couponStatus !== "Expired"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                            style={{ width: "fit-content" }}
                          >
                            {isActives && coupon.couponStatus !== "Expired"
                              ? "Available to use"
                              : coupon.couponStatus === "Expired"
                              ? "Your coupon has Expired!"
                              : "Unlock with higher balance"}
                          </div>
                        </div>

                        {hoveredIndex === index && (
                          <div
                            className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"
                            style={{
                              animation: "sweep 1s infinite linear",
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Right Section - Payment Summary */}
            <div className="lg:col-span-1 ">
              <div className="bg-[#F1F3FF] rounded-[20px] shadow-xl px-4 pt-10 pb-4">
                <div className="flex flex-col gap-y-3">
                  <h3 className="font-Lato text-xl text-[#575757] font-normal leading-6">
                    You're paying,
                  </h3>
                  <h2 className="font-Lato text-lg text-[#000000] font-bold leading-9">
                    ₹ {Number(amount).toLocaleString("en-IN")}
                  </h2>
                </div>

                <div className="space-y-[30px] mb-6 mt-5">
                  <div
                    className={`flex justify-between items-center ${
                      paymentMethod !== "neft" && "opacity-[0.4]"
                    }`}
                  >
                    <div>
                      <p className="font-Lato text-lg text-[#575757] font-semibold leading-6">
                        NEFT/IMPS/RTGS Amount
                      </p>
                      <p className="font-Open text-sm text-[#575757] font-normal leading-7">
                        Top-up your wallet directly
                      </p>
                    </div>
                    <p className="font-Lato text-lg text-[#575757] font-semibold leading-6">
                      {paymentMethod === "neft"
                        ? `₹ ${Number(amount).toLocaleString("en-IN")}`
                        : "₹ 0"}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-Lato text-lg text-[#575757] font-semibold leading-6 opacity-[0.4]">
                        COD Utilisation
                      </p>
                      <p className="font-Open text-sm text-[#575757] font-normal leading-5 opacity-[0.4]">
                        Amount deducted from available COD
                      </p>
                    </div>
                    <p className="font-Lato text-lg text-[#575757] font-semibold leading-6 opacity-[0.4]">
                      {paymentMethod === "cod"
                        ? `₹ ${Number(codAmount).toLocaleString("en-IN")}`
                        : "₹ 0"}
                    </p>
                  </div>

                  <div
                    className={`flex justify-between items-center ${
                      verifiedCouponData !== null || selectedCoupon !== null
                        ? ""
                        : "opacity-[0.4]"
                    }`}
                  >
                    <div>
                      <p
                        className={`font-Lato text-lg text-[#575757] font-semibold leading-6 `}
                      >
                        Yaari Cash & Offers
                      </p>
                    </div>
                    <p className="font-Lato text-lg text-[#575757] font-semibold leading-6">
                      {/* ₹ 0 */}
                      {/* {verifiedCouponData !== null || selectedCoupon !== null ? verifiedCouponData?.maxAmount || selectedCoupon?.maxAmount : ""}
                        ? `₹ ${Number(codAmount).toLocaleString("en-IN")}`
                        : "₹ 0"} */}
                      {verifiedCouponData || selectedCoupon
                        ? `₹ ${Number(
                            verifiedCouponData?.maxAmount ||
                              selectedCoupon?.maxAmount
                          ).toLocaleString("en-IN")}`
                        : "₹ 0"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-[30px] mb-6">
                  <div className="flex justify-between items-center">
                    <p className="font-Lato text-lg text-[#575757] font-semibold leading-6">
                      Total
                    </p>
                    <p className="font-Lato text-lg text-[#575757] font-semibold leading-6">
                      ₹ {Number(amount).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <p className="font-Lato text-lg text-[#7CCA62] font-semibold leading-6 items-end flex justify-end mt-[2px]">
                    {verifiedCouponData || selectedCoupon
                      ? ` + ${Number(
                          verifiedCouponData?.maxAmount ||
                            selectedCoupon?.maxAmount
                        ).toLocaleString("en-IN")}`
                      : ""}
                  </p>
                </div>
                <div
                  className={`flex justify-center items-center text-center `}
                  onClick={handlePayment}
                >
                  {paymentGateway === "PAYTM" ? (
                    <div
                      className={`md:min-w-[270px] bg-black text-white rounded-[20px] py-2 px-4 font-semibold hover:bg-gray-800 transition-colors font-Open text-base leading-5 ${
                        (!amount || !paymentGateway) &&
                        "!cursor-not-allowed bg-[#717277] hover:bg-[#A4A4A4]"
                      }`}
                    >
                      <Paytm
                        isDisabled={isDisabled}
                        text={`Pay Now: ₹ ${Number(amount).toLocaleString(
                          "en-IN"
                        )}`}
                        amt={amount}
                        navigate={`${SELLER_WEB_URL}/wallet/view-wallet`}
                        couponDetails={couponDetails}
                        couponCode={couponCode}
                        selectedCoupon={selectedCoupon}
                      />
                    </div>
                  ) : (
                    <button
                      className={`md:min-w-[270px] bg-black text-white rounded-[20px] py-2 px-4 font-semibold hover:bg-gray-800 transition-colors font-Open text-base leading-5 ${
                        !amount &&
                        "!bg-[#E8E8E8] !text-[#BBBBBB] !border-0 cursor-not-allowed"
                      }`}
                    >
                      {/* Pay Now: &nbsp; ₹{Number(amount).toLocaleString("en-IN")} */}
                      {paymentMethod === "neft"
                        ? "Submit"
                        : `Pay Now: ₹${Number(amount).toLocaleString("en-IN")}`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {triggerSuccessMessage && (
          <CenterModal
            isOpen={triggerSuccessMessage}
            onRequestClose={() => setTriggerSuccessMessage(false)}
            className="min-w-0 max-w-[500px] min-h-0 max-h-[35%]"
          >
            <div className="w-full">
              <div className="w-full flex justify-end mt-3 lg:mt-0 cursor-pointer">
                <img
                  src={CrossIcon}
                  alt="close"
                  className="mr-4"
                  onClick={() => setTriggerSuccessMessage(false)}
                />
              </div>

              <div className="flex justify-center items-center">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={SuccessTickGif}
                    alt="tick"
                    height={120}
                    width={120}
                  />
                  <div className="flex flex-col items-center mb-6">
                    {paymentGatewaySuccess || paymentMethod === "neft" ? (
                      <p className="text-center font-bold text-[12px] md:text-[16px] text-[#1C1C1C] font-Open leading-[22px] my-1">
                        Payment initiated successfully! Your recharge request is
                        being processed.
                      </p>
                    ) : paymentGatewaySuccess || paymentMethod === "cod" ? (
                      <>
                        <p className="font-bold text-[12px] md:text-[16px] text-[#1C1C1C] font-Open leading-[22px]">
                          Congratulations!
                        </p>
                        <p className="text-center font-bold text-[12px] md:text-[16px] text-[#1C1C1C] font-Open leading-[22px] my-1">
                          We have processed your payment for&nbsp;
                          {`₹ ${Number(codAmount).toLocaleString("en-IN")}`}
                        </p>
                      </>
                    ) : (
                      <></>
                    )}
                    {/* {verifiedCouponData ||
                      (selectedCoupon ? (
                        <p className="text-center font-semibold text-[12px] md:text-[14px] text-[#1C1C1C] font-Open leading-[20px] mt-1">
                          You've also earned{" "}
                          <span className="font-bold">Rs {}Yaaricash</span> with
                          this recharge.
                        </p>
                      ) : (
                        <></>
                      ))} */}
                  </div>

                  <OneButton
                    text="Close"
                    onClick={() => {
                      setTriggerSuccessMessage(false);
                      setPaymentGateway("");
                      setPaymentMethod("online");
                      setAmount("100");
                      setCodAmount("100");
                      setUtrNo("");
                      setCouponCode("");
                      setSelectedCoupon(null);
                      setIsCouponVerified(false);
                      setIsActives(false);
                      setShowCoupons(false);

                      // navigate(`/orders/view-orders?activeTab=draft`);
                    }}
                    className="bg-[#1C1C1C] text-white text-[12px] md:text-[16px] py-2 px-4 !rounded-[20px] font-Open  font-semibold leading-5"
                  />
                </div>
              </div>
            </div>
          </CenterModal>
        )}
      </div>
    </>
  );
};

export default ViewWallet;
