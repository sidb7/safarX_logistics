import {
  getLocalStorage,
  loadPhonePeTransaction,
  loadRazorPayTransaction,
  removeLocalStorage,
} from "../../../utils/utility";
//import useRazorpay from "react-razorpay";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import Accountlogo from "../../../assets/Payment/Account.svg";
import rechargeIcon from "../../../assets/Payment/rechargeIcon.svg";
import Paytm from "../../../paytm/Paytm";
import {
  INITIAL_RECHARGE,
  RECHARGE_STATUS,
  SELLER_WEB_URL,
} from "../../../utils/ApiUrls";
import CustomButton from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import { ResponsiveState } from "../../../utils/responsiveState";
import NavBar from "../../../layout/Old_NavBar";
import { toast } from "react-toastify";
import CustomDropDown from "../../../components/DropDown";
import { POST } from "../../../utils/webService";
import JusPayIcon from "../../../assets/juspay.png";
import JusPay from "../../../components/JusPay/juspay";
import PaymentLoader from "../../../components/paymentLoader/paymentLoader";

const modalTitle = () => {
  return (
    <div className="product-box flex justify-between items-center w-full lg:w-[31.25rem] h-[60px] absolute top-0">
      <img
        className="my-auto ml-6  h-[25px] object-contain"
        src={CompanyLogo}
        alt="Company Logo"
      />
    </div>
  );
};

const WalletPayment = () => {
  const { isLgScreen, isMdScreen } = ResponsiveState();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  //const [Razorpay] = useRazorpay();
  // const [walletValue, setMoney] = useState<any>(100);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEdit, setIsedit] = useState<any>();

  const [walletValue, setWalletValue] = useState<any>();
  const [paymentLoader, setPaymentLoader] = useState<any>(false);

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

  const userDetails = useSelector((state: any) => state.signin);

  const convertToEdit = () => {
    setIsedit(true);
  };

  const handleRazorPayTransaction = async () => {
    let replacewalletValue = walletValue?.replace(/,/g, "");
    let redirectUrl = `${SELLER_WEB_URL}/onboarding/cash-on-delivery`;

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

    // rzp1.on("payment.failed", (response: any) => {});

    // rzp1.open();
  };

  useEffect(() => {
    if (walletValue) setIsDisabled(false);
    else setIsDisabled(true);
  }, [walletValue]);

  useEffect(() => {
    (async () => {
      try {
        const juspayOrderId = getLocalStorage("order_id");
        if (juspayOrderId) {
          setPaymentLoader(true);
          const orderStatus = await POST(RECHARGE_STATUS, {
            orderId: juspayOrderId,
            paymentGateway: "JUSPAY",
            transactionId: juspayOrderId,
          });
          console.log("orderStatus", orderStatus);

          if (orderStatus?.data?.success === false) {
            toast.error("Something Went Wrong");
          } else {
            toast.success("Wallet Recharge Successfully");
            window.location.href = `${SELLER_WEB_URL}/onboarding/cash-on-delivery`;
          }
          setPaymentLoader(false);
          removeLocalStorage("order_id");
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const WalletRechargePaymentDetails = () => {
    return (
      <div
        className={`md:h-[37.265rem] w-full md:w-[31.25rem]   ${
          isMdScreen ? "custom_shadow flex flex-col  relative  " : ""
        }`}
      >
        <div className="product-box flex justify-between items-center w-full md:w-[31.25rem] h-[60px] absolute top-0">
          <img
            className="my-auto ml-6  h-[25px] object-contain"
            src={CompanyLogo}
            alt="Company Logo"
          />
        </div>

        <div className="customScroll">
          <div className="text-center mt-20 mb-1">
            <h1 className="text-[22px] font-Lato font-bold leading-7 text-center  md:mt-0">
              Welcome to Shipyaari
            </h1>
          </div>
          <div className=" mx-5 mt-5 p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm h-auto">
            <div className="flex items-center gap-2">
              <img src={Accountlogo} alt="" />
              <p className="text-sm md:text-[18px] font-Open md:font-Lato font-semibold leading-5 md:leading-6 text-[#202427] capitalize">
                Your wallet balance
              </p>
              <p className="text-sm md:text-[18px] font-Open md:font-Lato font-semibold leading-5 md:leading-6 text-[#202427]">
                ₹ 0
              </p>
            </div>
            <p className="text-[14px] leading-4 text-[#BBBBBB] my-3 font-normal font-Open">
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
              selectClassName="text-[14px]"
            />
            {/* <p
            onClick={() => convertToEdit()}
            className="text-[1rem] my-[1rem] border-solid border-[1px] rounded pl-[1rem] w-[40%] flex items-center font-semibold lg:text-[#1C1C1C] hover:border-[blue]"
          >
            <span>₹</span>
            <input
              type={`number`}
              className="text-lg p-1 border-none"
              value={walletValue}
              onChange={(e) => setMoney(e.target.value)}
            />
          </p> */}
            <div className="grid grid-cols-4 gap-2 mt-1 ">
              {/* {moneyArr?.map((el: any, i: number) => {
              return (
                <div
                  key={i}
                  onClick={() => setMoney(el?.value)}
                  className={`${
                    walletValue === el?.value
                      ? "border-[#004EFF]"
                      : "border-[#000000]"
                  } border-[1.5px] p-2 rounded-lg items-center border-solid cursor-pointer`}
                  // className={`border-[1.5px] p-2 rounded-lg items-center border-solid cursor-pointer {walletValue ? border-[#004EFF]: border-[#000000]`}
                >
                  <p
                    className={`text-[16px] ${
                      walletValue === el?.value ? "!text-[#004EFF]" : "text-[#000000]"
                    } font-semibold lg:text-[14px] `}
                  >
                    ₹{el?.value}
                  </p>
                </div>
              );
            })} */}
            </div>
          </div>
          <div className="flex mx-5 my-3">
            <div className="w-full p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm">
              <div className="flex  gap-x-2 text-[14px]">
                <img src={rechargeIcon} alt="" className="object-contain" />
                <p className="  font-semibold text-sm  md:text-lg md:text-[#1C1C1C]">
                  Payment gateway
                </p>
              </div>

              <div className="flex mt-1 mb-6 gap-x-[1rem] md:mb-0 ml-4 mr-5">
                <JusPay
                  isDisabled={isDisabled}
                  amount={walletValue}
                  callbackUrl={`${SELLER_WEB_URL}/onboarding/wallet-payment`}
                />
                {/* <div className="flex flex-col items-center gap-y-2">
                  <img
                    src={
                      "https://sy-seller.s3.ap-south-1.amazonaws.com/logos/paytm.png"
                    }
                    alt=""
                    className="ml-0 object-contain w-20 h-20"
                  />
                  <Paytm
                    isDisabled={isDisabled}
                    text={"Paytm"}
                    amt={walletValue}
                    navigate={`${SELLER_WEB_URL}/onboarding/cash-on-delivery`}
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
                    }  flex p-2 justify-center items-center text-white bg-black rounded-md h-9 w-full`}
                    onClick={() =>
                      loadPhonePeTransaction(
                        walletValue,
                        `${SELLER_WEB_URL}/onboarding/cash-on-delivery`,
                        `${SELLER_WEB_URL}/onboarding/cash-on-delivery`
                      )
                    }
                  >
                    <p className="buttonClassName md:text-[14px] whitespace-nowrap">
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
                    className={` ${
                      !isDisabled
                        ? "!bg-opacity-50  hover:!bg-black hover:-translate-y-[2px] hover:scale-100 duration-150"
                        : "!bg-opacity-50"
                    } flex p-2 justify-center items-center text-white bg-black rounded-md h-9 w-full`}
                    onClick={handleRazorPayTransaction}
                  >
                    <p className="buttonClassName md:text-[14px] whitespace-nowrap">
                      RazorPay
                    </p>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* <div
          className="flex justify-center  cursor-pointer"
          onClick={() => navigate("/dashboard/overview")}
        >
          <p className="text-[14px] text-[#004EFF] font-semibold border-b-2 border-[#004EFF] mt-3">
            SKIP FOR NOW{" "}
          </p>
        </div> */}
      </div>
    );
  };

  return (
    <>
      {paymentLoader && <PaymentLoader />}

      {isMdScreen &&
        (isLoading ? (
          <img
            src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
            className="flex m-auto"
            alt=""
          />
        ) : (
          <div className="h-[100vh] flex justify-center items-center ">
            {WalletRechargePaymentDetails()}
          </div>
        ))}
      {!isLgScreen && !isMdScreen && WalletRechargePaymentDetails()}
    </>
  );
};
export default WalletPayment;
