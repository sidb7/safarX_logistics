import React, { useEffect, useState } from "react";
import Checkbox from "../../../components/CheckBox";
import Moneylogo from "../../../assets/Payment/money.svg";
import Accountlogo from "../../../assets/Payment/Account.svg";
import rechargeIcon from "../../../assets/Payment/rechargeIcon.svg";
import upiIcon from "../../../assets/Payment/upiIcon.svg";
import cardPayment from "../../../assets/Payment/cardPaymentIcon.svg";
import bankTransfer from "../../../assets/Payment/bankTransferIcon.svg";
import netBanking from "../../../assets/Payment/netBankingIcon.svg";
import customerReward from "../../../assets/Payment/Customer Reward 1.svg";
import CustomInputBox from "../../../components/Input";
import discountIcon from "../../../assets/Payment/discount-shape.svg";
import WebBackArrowIcon from "../../../assets/PickUp/EssentialWeb.svg";
import UpiPayment from "./upiPayment";
import ServiceButton from "../../../components/Button/ServiceButton";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import CustomBottomModal from "../../../components/CustomModal/customBottomModal";
import { paymentState } from "../../../redux/reducers/paymentReducer";
import YaariPointsIcon from "../../../assets/Transaction/YaariPoints.svg";
import { useMediaQuery } from "react-responsive";
import Label from "./label";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import CustomCenterModal from "../../../components/CustomModal/customCenterModal";
import { Link } from "react-router-dom";
import DoneIcon from "../../../assets/Payment/Done.gif";
import WebCrossIcon from "../../../assets/PickUp/ModalCrossWeb.svg";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import Stepper from "../../../components/Stepper";
import TickLogo from "../../../assets/common/Tick.svg";
import GiftIcon from "../../../assets/Gift.svg";
import CustomInputWithImage from "../../../components/InputWithImage/InputWithImage";
import CustomButton from "../../../components/Button";
import { POST } from "../../../utils/webService";
import {
  ADD_PICKUP_LOCATION,
  GET_CURRENT_WALLET,
  INITIAL_RECHARGE,
  PLACE_ORDER,
  RECHARGE_STATUS,
  POST_PLACE_ORDER,
  PHONEPE_TRANSACTION_STATUS,
  SELLER_WEB_URL,
} from "../../../utils/ApiUrls";
import BottomLayout from "../../../components/Layout/bottomLayout";
import Paytm from "../../../paytm/Paytm";
import {
  getLocalStorage,
  getQueryJson,
  loadPhonePeTransaction,
  loadRazorPayTransaction,
  removeLocalStorage,
} from "../../../utils/utility";
//import useRazorpay from "react-razorpay";
import CustomDropDown from "../../../components/DropDown";
import JusPayIcon from "../../../assets/juspay.png";
import JusPay from "../../../components/JusPay/juspay";
import PaymentLoader from "../../../components/paymentLoader/paymentLoader";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [payment, setPayment] = useState(false);
  const [modal, setModal] = useState(false);
  // const [toast, setToast] = useState(false);
  const [placeOrder, setPlaceOrder] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  // const [footer, setFooter] = useState(true);
  const [isLabelRightModal, setIsLabelRightModal] = useState(false);
  const [isPostPaymentModal, setIsPostPaymentModal] = useState(false);
  const [walletValue, setWalletValue] = useState<any>(2000);
  const [isEdit, setIsedit] = useState<any>();
  const [upiValue, setUpiValue] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [upiText, setUpiText] = useState<boolean>();
  const [currentWalletValue, setCurrentWalletValue] = useState<any>();
  const requiredBalance = location?.state?.requiredBalance;
  //const [Razorpay] = useRazorpay();
  const [isDisabled, setIsDisabled] = useState(false);
  const [paymentLoader, setPaymentLoader] = useState<any>(false);

  let myInterval: number | any;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const params = getQueryJson();

  const fetchCurrentWallet = async () => {
    const { data } = await POST(GET_CURRENT_WALLET, {});
    if (data?.status) {
      setCurrentWalletValue(data.data[0][0]?.balance);
    }
  };

  const shipyaari_id = params?.shipyaari_id || "";
  let orderSource = params?.source || "";
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       fetchCurrentWallet();
  //       setWalletValue(requiredBalance);
  //       const phonePeTransactionId = getLocalStorage("phonePeTransactionId");
  //       if (phonePeTransactionId) {
  //         await POST(PHONEPE_TRANSACTION_STATUS, {
  //           orderId: phonePeTransactionId,
  //           transactionId: phonePeTransactionId,
  //           paymentGateway: "PHONEPE",
  //         });
  //         removeLocalStorage("phonePeTransactionId");
  //         window.location.reload();
  //       }
  //     } catch (error: any) {
  //       console.error(error.message);
  //     }
  //   })();
  // }, []);

  const steps = [
    {
      label: "Pickup",
      isCompleted: true,
      isActive: true,
      imgSrc: TickLogo,
    },
    {
      label: "Delivery",
      isCompleted: true,
      isActive: true,
      imgSrc: TickLogo,
    },
    {
      label: "Product",
      isCompleted: true,
      isActive: true,
      imgSrc: TickLogo,
    },
    {
      label: "Service",
      isCompleted: true,
      isActive: true,
      imgSrc: TickLogo,
    },
    {
      label: "Summary",
      isCompleted: true,
      isActive: true,
      imgSrc: TickLogo,
    },
    {
      label: "Payment",
      isCompleted: false,
      isActive: true,
      imgSrc: TickLogo,
    },
  ];

  const handleUpiPayment: any = () => {
    if (payment === true) {
      setPayment(false);
    }
  };

  const checkBoolean = useSelector((state: any) => state.payment.payNow);
  const checkYaariPoints = useSelector(
    (state: any) => state.payment.yaariPointsAvail
  );
  const userDetails = useSelector((state: any) => state.signin);

  const walletMenu = [
    {
      label: "100",
      value: "100",
    },
    {
      label: "200",
      value: "200",
    },
    {
      label: "500",
      value: "500",
    },
    {
      label: "1,000",
      value: "1,000",
    },
    {
      label: "2,000",
      value: "2,000",
    },
    {
      label: "3,000",
      value: "3,000",
    },
    {
      label: "5,000",
      value: "5,000",
    },
    {
      label: "10,000",
      value: "10,000",
    },
    {
      label: "15,000",
      value: "15,000",
    },
    {
      label: "20,000",
      value: "20,000",
    },
    {
      label: "25,000",
      value: "25,000",
    },
    {
      label: "30,000",
      value: "30,000",
    },
    {
      label: "50,000",
      value: "50,000",
    },
    {
      label: "1,00,000",
      value: "1,00,000",
    },
    {
      label: "2,00,000",
      value: "2,00,000",
    },
    {
      label: "3,00,000",
      value: "3,00,000",
    },
  ];

  // const convertToEdit = () => {
  //   setIsedit(true);
  // };

  const ModalContent = () => {
    return (
      <div className="flex flex-col  w-full h-full p-5">
        <div className="flex justify-end">
          <img
            src={WebCrossIcon}
            alt=""
            className="cursor-pointer"
            onClick={() => setIsPostPaymentModal(false)}
          />
        </div>
        <div className="flex flex-col  mt-4">
          <div className="flex justify-center items-center mt-7   ">
            <img src={DoneIcon} alt="Done Gif" width={124} height={125} />
          </div>
          <div className="flex flex-col items-center mt-4 font-semibold text-[18px]  ">
            <p>Thank you!</p>
            <p>Your order has been placed.</p>
            <p>You can find your orders in order section</p>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <ServiceButton
            text="GO TO ORDER"
            onClick={() => navigate("/orders/view-orders")}
            className="bg-[#1C1C1C] px-4 py-2 text-white font-semibold text-sm"
          />
        </div>
      </div>
    );
  };

  const rechargeStatusCheck = async (orderId: number) => {
    const payload = {
      // walletId: "932defa2-2bfa-40b5-8f5c-275ac834ce94",
      orderId: orderId,
    };
    const datas = await POST(RECHARGE_STATUS, payload);

    if (datas?.data?.success) {
      setIsLoading(false);
      toast.success(datas?.data?.message);
      clearInterval(myInterval);
      navigate("/order");
    } else if (
      datas?.data?.message ===
      "Looks like the payment is not complete. Please wait while we confirm the status with your bank."
    ) {
      setIsLoading(false);
      toast.error(datas?.data?.message);
      clearInterval(myInterval);
    }
  };

  const placeOrderApi = async () => {
    try {
      const payload = { tempOrderId: shipyaari_id, source: orderSource };
      const { data } = await POST(POST_PLACE_ORDER, payload);

      if (data?.success) {
        toast.success(data?.message);
        // setIsLabelRightModal(true);
        navigate("/orders/view-orders");
      } else {
        toast.error(data?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const paynow = async () => {
    const payload = {
      // walletId: "932defa2-2bfa-40b5-8f5c-275ac834ce94",
      paymentObject: {
        upiId: upiValue,
        amount: String(walletValue),
        callbackUrl: "/orders/add-order/payment",
      },
    };
    const { data } = await POST(INITIAL_RECHARGE, payload);

    if (data?.success) {
      setIsLoading(true);
      const payload = {
        walletId: "932defa2-2bfa-40b5-8f5c-275ac834ce94",
        orderId: data?.data?.orderId,
      };
      const datas = await POST(RECHARGE_STATUS, payload);

      myInterval = setInterval(function () {
        rechargeStatusCheck(data?.data?.orderId);
      }, 500);
    } else {
      toast.error(data?.message);
    }
  };

  const postPickupOrderDetails = async () => {
    try {
      const payload = {};
      const { data: response } = await POST(ADD_PICKUP_LOCATION, payload);

      if (response?.success) {
        toast.success(response?.message);
        navigate("/neworder/delivery");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  const handleRazorPayTransaction = async () => {
    let replacewalletValue = walletValue?.replace(/,/g, "");
    let redirectUrl = `${SELLER_WEB_URL}/orders/add-order/payment`;

    const options: any = await loadRazorPayTransaction(
      replacewalletValue,
      "SHIPYAARI",
      userDetails.name,
      userDetails.email,
      redirectUrl
    );
    if (!options?.success && !options?.amount) {
      toast.error(options.message);
      return;
    }

    // const rzp1: any = new Razorpay(options);

    // rzp1.on("payment.failed", (response: any) => {
    //   console.log("response: ", response);
    // });

    // rzp1.open();
  };

  useEffect(() => {
    if (walletValue) setIsDisabled(false);
    else setIsDisabled(true);
  }, [walletValue]);

  useEffect(() => {
    (async () => {
      try {
        fetchCurrentWallet();
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
            fetchCurrentWallet();
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
  }, []);

  return (
    <>
      {paymentLoader && <PaymentLoader />}
      <div className="w-full">
        <Breadcrum label="Add New Order" />
        <div className=" mb-4 lg:mb-8">
          <Stepper steps={steps} />
        </div>
        <div className="inline-flex space-x-2 items-center px-5 max-sm:mt-4">
          <img src={Moneylogo} alt="" />
          <p className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C]  ">
            Payment
          </p>
        </div>
        <div className=" lg:mb-8 h-[49.667px] bg-[#4D83FF] rounded-[4px] flex justify-center max-sm:rounded-none items-center mt-5 lg:mx-5  lg:justify-start">
          <div className="flex text-center  lg:w-full text-sm font-semibold text-[#FFFFFF] leading-5">
            <p
              className={`${
                isItLgScreen
                  ? "px-[16px] py-[13px] text-[16px] font-semibold"
                  : ""
              }`}
            >
              Get welcome gift of 100 bonus point with wallet payments
            </p>
          </div>
        </div>

        {isLoading ? (
          <img
            src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
            className="flex m-auto"
            alt=""
          />
        ) : (
          <div className="mx-5 ">
            <div className="grid lg:grid-cols-2 gap-x-[27px]">
              <div className="w-full  my-5 p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm h-[200px]">
                <div className="flex items-center gap-2 text-[#1C1C1C] font-Lato text-lg font-semibold leading-6 capitalize">
                  <img src={Accountlogo} alt="" />
                  <p className="text-[#1C1C1C]">Your wallet balance</p>
                  <p className="text-[#1C1C1C]">
                    ₹ {currentWalletValue?.toLocaleString("en-IN")}
                  </p>
                </div>
                <p className="text-[0.75rem] font-Open leading-4 text-[#BBBBBB] my-3 lg:font-normal">
                  Endless wallet balance with automatic add money
                </p>
                <CustomDropDown
                  heading="Select Amount"
                  value={walletValue}
                  options={walletMenu}
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    setWalletValue(event.target.value);
                  }}
                  wrapperClass="w-[200px]"
                  selectClassName="text-[18px]"
                />
                {/* <p
                onClick={() => convertToEdit()}
                className="text-[1rem] my-[1rem] border-solid border-[1px] rounded pl-[1rem] w-[40%] flex items-center lg:font-semibold lg:text-[#1C1C1C] hover:border-[blue]"
              >
                <span>₹</span>
                <input
                  type={`number`}
                  className="text-lg p-1 border-none"
                  value={walletValue}
                  onChange={(e) => setWalletValue(e.target.value)}
                />
              </p>
              <div className="grid grid-cols-4 gap-8 max-sm:gap-3 text-center">
                {moneyArr?.map((el: any, i: number) => {
                  return (
                    <div
                      key={i}
                      onClick={() => setWalletValue(el?.value)}
                      className={`${
                        walletValue === el?.value
                          ? "border-[#004EFF]"
                          : "border-[#000000]"
                      } border-[1.5px] p-2 rounded-lg items-center border-solid max-sm:text-[14px] cursor-pointer`}
                      // className={`border-[1.5px] p-2 rounded-lg items-center border-solid cursor-pointer {money ? border-[#004EFF]: border-[#000000]`}
                    >
                      <p
                        className={`text-[12px] ${
                          walletValue === el?.value
                            ? "!text-[#004EFF]"
                            : "text-[#000000]"
                        } lg:font-semibold lg:text-[14px] `}
                      >
                        ₹{el?.value}
                      </p>
                    </div>
                  );
                })}
              </div> */}
              </div>
              {/*Second */}

              <div className="hidden lg:block">
                <div className="flex items-center justify-between mt-5   p-4 rounded-lg border-2 border-solid  border-[#E8E8E8]   shadow-sm h-[200px]  ">
                  {/* {checkYaariPoints ? (
                  <div className="w-[200px] flex flex-col justify-between">
                    <div>
                      <div className="flex ">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-2 mt-4">
                          <span
                            className="font-medium"
                            data-tooltip-id="my-tooltip-inline"
                            data-tooltip-content="Welcome 100 yaari points has been added"
                          >
                            Yaari Points
                          </span>
                          <span className="text-center text-[16px] font-bold">
                            100
                          </span>
                        </div>
                        <Tooltip
                          id="my-tooltip-inline"
                          style={{
                            backgroundColor: "#4D83FF",
                            color: "#FFFFFF",
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center items-center mt-12">
                      <Checkbox />
                      <p className="text-[14px] font-medium lg:whitespace-nowrap uppercase text-[#004EFF]">
                        REDEEM ON EVERY ORDER
                      </p>
                    </div>

                    <Tooltip
                      id="my-tooltip"
                      style={{
                        backgroundColor: "rgb(0, 255, 30)",
                        color: "#222",
                      }}
                    />
                  </div>
                ) : ( */}
                  <div className="flex flex-col h-full ">
                    <div className="flex flex-col mb-12">
                      <p className="text-[1rem] font-semibold text-[#1C1C1C]">
                        Yaari points are availed after first
                      </p>
                      <p className="text-[1rem] font-semibold text-[#1C1C1C]">
                        order is placed
                      </p>
                    </div>

                    <p className="text-[1rem] text-[#004EFF] font-semibold ">
                      Tap to know how it works
                    </p>
                  </div>
                  {/* )} */}
                  <div>
                    <img
                      src={YaariPointsIcon}
                      alt=""
                      className="object-contain"
                      height={170}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center lg:mb-2">
              <Checkbox />
              <p className="text-[14px] font-medium lg:font-semibold uppercase text-[#CCDCFF]">
                INSTANT RECHARGE WITH COD
              </p>
            </div>

            <p className="mt-3 text-[12px] text-[#BBBBBB] mb-10 lg:font-normal lg:mb-5">
              Add money to wallet with COD
            </p>

            {/* Available Offers Mobile */}
            <div className="flex  gap-2 lg:hidden">
              <img src={discountIcon} alt="" />
              <p className="text-lg font-semibold">Available offers</p>
            </div>
            <div className="flex flex-nowwrap overflow-x-scroll space-x-4 mb-7 lg:hidden">
              <div className="bg-[#f0faf6] p-3 border-2 border-solid border-[#E8E8E8]  my-3 rounded-lg">
                <p className="text-[1rem] font-semibold">
                  10% EXTRA up to ₹1000
                </p>
                <p className="mt-[7px] text-[0.875rem] text-[#606060]">
                  Use standard charter Digismart credit card
                </p>
                <div className="w-[245px] flex flex-row justify-between my-3">
                  <p className="text-[12px] text-[#004EFF] mt-1">
                    Save up to ₹500 with this code
                  </p>
                  <p className="text-[16px]">Apply</p>
                </div>
              </div>
              <div className="bg-[#FDF6EA] p-3 border-2 border-solid border-[#E8E8E8]  my-3 rounded-lg">
                <p className="text-[1rem] font-semibold">
                  10% EXTRA up to ₹1000
                </p>
                <p className="mt-[7px] text-[0.875rem] text-[#606060]">
                  Use standard charter Digismart credit card
                </p>
                <div className="w-[245px] flex flex-row justify-between my-3">
                  <p className="text-[0.875rem] text-[#004EFF] mt-1">
                    Save up to ₹500 with this code
                  </p>
                  <p className="text-[16px]">Apply</p>
                </div>
              </div>
            </div>

            {/* Available Offers Web */}
            <div className=" gap-2 hidden lg:flex ">
              <img src={discountIcon} alt="" />
              <p className="text-lg font-semibold  lg:font-normal lg:text-2xl lg:text-[#323232]">
                Available offers
              </p>
            </div>
            <div className="lg:flex flex-nowrap w-full overflow-x-scroll gap-x-4 hidden lg:mb-5">
              <div className="bg-[#f0faf6] p-3 lg:p-4 border-2 border-solid border-[#E8E8E8]  my-3 rounded-lg lg:min-w-[33.33%]">
                <p className="text-[1rem] font-semibold">
                  10% EXTRA up to ₹1000
                </p>
                <p className="mt-[7px] text-[0.875rem] text-[#606060]">
                  Use standard charter Digismart credit card
                </p>
                <div className="flex flex-row justify-between my-3">
                  <p className="text-[0.875rem] text-[#004EFF] mt-1">
                    Save up to ₹500 with this code
                  </p>
                  <p className="text-[16px]">Apply</p>
                </div>
              </div>
              <div className="bg-[#FDF6EA] p-3 lg:p-4  border-2 border-solid border-[#E8E8E8]  my-3 rounded-lg  lg:min-w-[33.33%]">
                <p className="text-[1rem] font-semibold">
                  10% EXTRA up to ₹1000
                </p>
                <p className="mt-[7px] text-[0.875rem] text-[#606060]">
                  Use standard charter Digismart credit card
                </p>
                <div className="flex flex-row justify-between my-3">
                  <p className="text-[0.875rem] text-[#004EFF] mt-1">
                    Save up to ₹500 with this code
                  </p>
                  <p className="text-[16px]">Apply</p>
                </div>
              </div>

              <div className="bg-[#FDEDEA] p-3 lg:p-4  border-2 border-solid border-[#E8E8E8]  my-3 rounded-lg  lg:min-w-[33.33%]">
                <p className="text-[1rem] font-semibold">
                  10% EXTRA up to ₹1000
                </p>
                <p className="mt-[7px] text-[0.875rem] text-[#606060]">
                  Use standard charter Digismart credit card
                </p>
                <div className="flex flex-row justify-between my-3">
                  <p className="text-[0.875rem] text-[#004EFF] mt-1">
                    Save up to ₹500 with this code
                  </p>
                  <p className="text-[16px]">Apply</p>
                </div>
              </div>
            </div>

            <div className=" mb-7 lg:mb-6 lg:w-1/3">
              <CustomInputWithImage
                placeholder="Have a gift card?"
                imgSrc={GiftIcon}

                // value={locateAddress}
              />
            </div>
            {/* Yaari Points Mobile */}
            <div className=" lg:hidden  grid grid-cols-2 w-100%  mb-7 p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm">
              {checkYaariPoints ? (
                <div className="w-[200px] flex flex-col justify-between">
                  <div>
                    <div className="flex ">
                      <div className="flex flex-col mt-4">
                        <span
                          className="font-medium"
                          data-tooltip-id="my-tooltip-inline"
                          data-tooltip-content="Welcome 100 yaari points has been added"
                        >
                          Yaari Points
                        </span>
                        <span className="text-center text-[16px] font-bold">
                          100
                        </span>
                      </div>
                      <Tooltip
                        id="my-tooltip-inline"
                        style={{ backgroundColor: "#4D83FF", color: "#FFFFFF" }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center mt-12">
                    <Checkbox />
                    <p className="text-[14px] font-medium uppercase text-[#004EFF]">
                      REDEEM ON EVERY ORDER
                    </p>
                  </div>

                  <Tooltip
                    id="my-tooltip"
                    style={{
                      backgroundColor: "rgb(0, 255, 30)",
                      color: "#222",
                    }}
                  />
                </div>
              ) : (
                <div className="w-[200px] flex flex-col justify-between gap-y-5">
                  <p className="text-[12px]">
                    Yaari points are availed after first order is placed
                  </p>
                  <p className="text-[12px] text-[#004EFF]">
                    Tap to know how it works
                  </p>
                </div>
              )}
              <div className="col-end-7">
                <img src={customerReward} alt="" className="object-contain" />
              </div>
            </div>
            {/* Payment Gateway */}
            <div className="lg:grid grid-cols-2 mb-[130px]">
              <div className="w-full   my-5 p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm lg:p-4">
                <div className="flex  gap-x-2 text-[14px]">
                  <img src={rechargeIcon} alt="" className="object-contain" />
                  <p className="  font-semibold text-sm lg:text-lg lg:text-[#1C1C1C]">
                    {isItLgScreen
                      ? "Payment gateway"
                      : "Recharge with payment gateway"}
                  </p>
                </div>
                <div className="flex mt-4 mb-6 gap-x-[1rem] lg:mb-0 ml-4 mr-5">
                  {/* <div className="flex flex-col items-center gap-y-2">
                  <img
                    src="https://sy-seller.s3.ap-south-1.amazonaws.com/logos/paytm.png"
                    alt=""
                    className="ml-0 object-contain w-20 h-20"
                  />
                  <Paytm
                    isDisabled={isDisabled}
                    text={"Paytm"}
                    amt={walletValue}
                    navigate={`${SELLER_WEB_URL}/orders/add-order/payment`}
                  />
                </div>
                <div className="flex flex-col items-center gap-y-2">
                  <img
                    src={
                      "https://sy-seller.s3.ap-south-1.amazonaws.com/logos/phonepe.png"
                    }
                    alt=""
                    className="ml-0 object-contain w-20 h-20"
                  />
                  <button
                    disabled={isDisabled}
                    type="button"
                    className={`${
                      !isDisabled
                        ? "!bg-opacity-50  hover:!bg-black hover:-translate-y-[2px] hover:scale-100 duration-150"
                        : "!bg-opacity-50"
                    } flex p-2 justify-center items-center text-white bg-black rounded-md h-9 w-full`}
                    onClick={() =>
                      loadPhonePeTransaction(
                        walletValue,
                        `${SELLER_WEB_URL}/orders/add-order/payment`,
                        `${SELLER_WEB_URL}/orders/add-order/payment`
                      )
                    }
                  >
                    <p className="buttonClassName lg:text-[14px] whitespace-nowrap">
                      PhonePe
                    </p>
                  </button>
                </div>
                <div className="flex flex-col items-center gap-y-2">
                  <div className="w-20 h-20 flex justify-center items-center">
                    <img
                      src="https://sy-seller.s3.ap-south-1.amazonaws.com/logos/razorpay_logo.png"
                      alt=""
                      className="ml-0 object-contain"
                    />
                  </div>
                  <button
                    disabled={isDisabled}
                    type="button"
                    className={`${
                      !isDisabled
                        ? "!bg-opacity-50  hover:!bg-black hover:-translate-y-[2px] hover:scale-100 duration-150"
                        : "!bg-opacity-50"
                    } flex p-2 justify-center items-center text-white bg-black rounded-md h-9 w-full`}
                    onClick={handleRazorPayTransaction}
                  >
                    <p className="buttonClassName lg:text-[14px] whitespace-nowrap">
                      RazorPay
                    </p>
                  </button>
                </div> */}
                  <JusPay
                    isDisabled={isDisabled}
                    amount={walletValue}
                    callbackUrl={`${SELLER_WEB_URL}/orders/add-order/payment`}
                  />
                  {/* <div className="flex flex-col items-center gap-y-2">
                  <img
                    src="https://sy-seller.s3.ap-south-1.amazonaws.com/logos/phonepe.png"
                    alt=""
                    className="ml-0 object-contain w-20 h-20"
                  />
                  <Paytm
                    text={"Phonepe"}
                    amt={walletValue}
                    navigate="/orders/add-order/payment"
                  />
                </div> */}
                  {/* <div className="flex flex-col items-center gap-y-2">
                  <img src={cardPayment} alt="" className="object-contain" />
                  <p className="text-[12px]">Cardpayment</p>
                </div>
                <div className="flex flex-col items-center gap-y-2">
                  <img src={bankTransfer} alt="" className="object-contain" />
                  <p className="text-[12px]">Bank transfer</p>
                </div>
                <div className="flex flex-col items-center gap-y-2">
                  <img src={netBanking} alt="" className="object-contain" />
                  <p className="text-[12px]">Netbanking</p>
                </div> */}
                </div>
                {/* {upiText && (
                <div className="flex items-center mt-4">
                  <div>
                    <CustomInputBox
                      containerStyle={`lg:!w-auto`}
                      inputType="text"
                      label="Enter UPI"
                      className="!w-[16rem]  lg:!w-[20rem] !h-[36px]"
                      value={upiValue}
                      onChange={(e) => setUpiValue(e.target.value)}
                    />
                  </div>

                  <div className="ml-2">
                    <CustomButton text={"PAY NOW"} onClick={() => paynow()} />
                  </div>
                </div>
              )} */}
              </div>
            </div>
          </div>
        )}

        {/* <CustomBottomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <UpiPayment closeModal={closeModal} />
      </CustomBottomModal> */}

        <footer className="w-full fixed bottom-0">
          <div className="flex items-center justify-end shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0 lg:flex lg:justify-end lg:!w-[calc(100%-64px)]">
            <div className="flex">
              <button
                onClick={() => navigate(-1)}
                className="  flex items-center font-Open justify-center leading-5 border-[1px] border-[#A4A4A4] rounded  py-[8px] text-sm font-semibold text-[#1C1C1C] text-center w-[100px] lg:w-[110px]"
              >
                BACK
              </button>
              <button
                onClick={() => placeOrderApi()}
                className="mx-4 flex items-center font-Open justify-center leading-5 border-[1px] border-[#A4A4A4] rounded py-[8px] text-sm font-semibold text-center bg-[#1C1C1C] text-[#FFFFFF] w-[110px]"
              >
                {" "}
                PLACE ORDER
              </button>
            </div>
          </div>
        </footer>

        {/* <BottomLayout
        callApi={() => postPickupOrderDetails()}
        Button2Name={false}
        // newButtonName={"Place Order"}
      /> */}

        <RightSideModal
          isOpen={isLabelRightModal}
          onClose={() => setIsLabelRightModal(false)}
        >
          <Label
            onClick={setIsLabelRightModal}
            setIsPostPaymentModal={setIsPostPaymentModal}
          />
        </RightSideModal>

        <CustomCenterModal
          isOpen={isPostPaymentModal}
          onRequestClose={() => setIsPostPaymentModal(false)}
          className="!h-[450px] !w-[580px]"
        >
          <ModalContent />
        </CustomCenterModal>
      </div>
    </>
  );
};

export default Payment;
