import NavBar from "../../../layout/Old_NavBar";
import Checkbox from "../../../components/CheckBox";
import CustomButton from "../../../components/Button";
import BannerPagination from "../../../assets/Banner pagination.svg";
import { useNavigate } from "react-router-dom";
import { ResponsiveState } from "../../../utils/responsiveState";
import { useEffect, useRef, useState } from "react";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CloseIcon from "../../../assets/CloseIcon.svg";
import CustomInputBox from "../../../components/Input";
import CustomDropDown from "../../../components/DropDown";
import Accountlogo from "../../../assets/Payment/Account.svg";
import rechargeIcon from "../../../assets/Payment/rechargeIcon.svg";
import upiIcon from "../../../assets/Payment/upiIcon.svg";
import cardPayment from "../../../assets/Payment/cardPaymentIcon.svg";
import bankTransfer from "../../../assets/Payment/bankTransferIcon.svg";
import netBanking from "../../../assets/Payment/netBankingIcon.svg";
import {
  GET_CURRENT_WALLET,
  INITIAL_RECHARGE,
  POST_ADD_BANK_DETAILS,
  RECHARGE_STATUS,
} from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import { toast } from "react-toastify";
// import { PaytmButton } from "../../../utils/payPaytm";

const OnBoundingWalletRecharge = () => {
  const navigate = useNavigate();
  const { isLgScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [walletRechargeModalOpen, setWalletRechargeModalOpen] = useState(false);
  const [money, setMoney] = useState<any>(2000);
  const [isEdit, setIsedit] = useState<any>();
  const [upiValue, setUpiValue] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [upiText, setUpiText] = useState<boolean>();
  const [accountName, setAccountName] = useState<any>();
  const [bankName, setBankName] = useState<any>();
  const [branchName, setBranchName] = useState<any>();
  const [ifscCode, setIfscCode] = useState<any>();
  const [accountType, setAccountType] = useState<any>();
  const [currentWalletValue, setCurrentWalletValue] = useState<any>();

  let myInterval: number | any;

  const modalTitle = () => {
    return (
      <div className="product-box flex justify-between items-center w-full h-[60px] absolute top-0">
        <img
          className="my-auto ml-6  h-[25px] object-contain"
          src={CompanyLogo}
          alt="Company Logo"
        />
        <img
          className="my-auto mr-6"
          src={CloseIcon}
          alt="Close"
          onClick={() => setIsModalOpen(false)}
        />
      </div>
    );
  };

  const handleRechargeNow = () => {
    setIsRechargeModalOpen(true);
    setIsModalOpen(false);
  };

  const dropdownArr = [
    {
      label: "Choose Account Type",
      value: "",
    },
    {
      label: "Saving",
      value: "Saving",
    },
    {
      label: "Current",
      value: "Current",
    },
  ];

  const fetchCurrentWallet = async () => {
    const { data } = await POST(GET_CURRENT_WALLET, {});
    if (data?.status) {
      setCurrentWalletValue(data.data[0][0]?.balance);
    }
  };

  useEffect(() => {
    fetchCurrentWallet();
  }, []);

  const postAccountDetails = async () => {
    const payload = {
      bankName: bankName,
      branchName: branchName,
      bankAccountHolderName: "",
      ifscCode: ifscCode,
      accountType: accountType,
      bankAccountNumber: accountName,
    };
    const datas = await POST(POST_ADD_BANK_DETAILS, payload);
    console.log("response", datas);
    if (datas?.data?.success) {
      setWalletRechargeModalOpen(true);
    } else {
      toast.error(datas?.data?.message);
    }
  };

  const walletRecharge = () => {
    return (
      <div className="relative h-full">
        {!isLgScreen ? (
          <header className="fixed top-0 z-50 w-full ">
            <NavBar />
          </header>
        ) : (
          modalTitle()
        )}
        <div className="lg:grid lg:grid-cols-2">
          <div className="lg:grid">
            <div className="mx-5  mt-[148px] lg:mt-[110px]">
              <h1 className="text-[22px] font-semibold leading-7 text-center">
                Welcome to Shipyaari
              </h1>
              <p className="mt-3 text-[#494949] text-[16px] font-light text-center">
                Recharge your wallet with minimum of
                <span className="text-[#323232] font-medium lg:block">
                  {" "}
                  ₹100
                </span>
              </p>
              {isLgScreen && note("text-left")}
            </div>
          </div>
          <div className="lg:grid">
            <div className="mx-5 mt-24 rounded-lg border-[1.5px] border-[#E8E8E8] py-6 px-3 drop-shadow-sm">
              <div className="lg:space-y-4">
                <h1 className="ml-2 text-[20px] font-medium">
                  Benefits of shipyaari wallet
                </h1>
                <div className="flex mt-[26px]">
                  <Checkbox checked={true} checkboxClassName="text-black" />
                  <p className="ml-2 mt-[2px] text-[16px]">
                    Get Discounts/Offers on Recharge
                  </p>
                </div>
                <div className="flex">
                  <Checkbox checked={true} checkboxClassName="text-black" />
                  <p className="ml-2 mt-[2px] text-[16px]">
                    Fater order processing
                  </p>
                </div>
                <div className="flex">
                  <Checkbox checked={true} checkboxClassName="text-black" />
                  <p className="ml-2 mt-[2px] text-[16px]">
                    Instant Payment Processing
                  </p>
                </div>
                <div className="flex">
                  <Checkbox checked={true} checkboxClassName="text-black" />
                  <p className="ml-2 mt-[2px] text-[16px]">
                    Simplified Accounting
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-5 mt-[84px] lg:mt-4">
              <CustomButton
                text={"RECHARGE NOW"}
                // onClick={() => navigate("/order/payment")}
                onClick={() => handleRechargeNow()}
              />
            </div>

            <div
              className="flex justify-center mt-4 cursor-pointer"
              onClick={() => navigate("/home/overview")}
            >
              <p className="text-[14px] text-[#004EFF] font-semibold border-b-2 border-[#004EFF]">
                SKIP FOR NOW{" "}
              </p>
            </div>
          </div>
          {!isLgScreen && note()}
        </div>
      </div>
    );
  };

  const walletDetails = () => {
    return (
      <div className="h-full w-full">
        <div className="product-box flex justify-between items-center w-full h-[60px] top-0">
          <img
            className="my-auto ml-6  h-[25px] object-contain"
            src={CompanyLogo}
            alt="Company Logo"
          />
          <img
            className="my-auto mr-6"
            src={CloseIcon}
            alt="Close"
            onClick={() => setIsRechargeModalOpen(false)}
          />
        </div>
        <div className="text-center mt-3 mb-4">
          <h1 className="text-[1.375rem] font-bold leading-7 text-center">
            Welcome to Shipyaari
          </h1>
          <p className="mt-3 text-[16px] font-light">
            Please fill your bank details
          </p>
        </div>
        <div className="flex flex-col p-10">
          <div>
            <CustomInputBox
              containerStyle={`lg:!w-auto`}
              inputType="text"
              label="Account Number"
              className="!w-[20rem]"
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
          <div>
            <CustomInputBox
              label="Bank Name"
              containerStyle={`lg:!w-auto mt-4`}
              inputType="text"
              className="!w-[20rem]"
              onChange={(e) => setBankName(e.target.value)}
            />
          </div>
          <div>
            <CustomInputBox
              label="Branch Name"
              containerStyle={`lg:!w-auto mt-4`}
              inputType="text"
              className="!w-[20rem]"
              onChange={(e) => setBranchName(e.target.value)}
            />
          </div>
          <div>
            <CustomInputBox
              label="IFSC Code"
              containerStyle={`lg:!w-auto mt-4`}
              inputType="text"
              className="!w-[20rem]"
              onChange={(e) => setIfscCode(e.target.value)}
            />
          </div>
          <div>
            <CustomDropDown
              value={accountType}
              options={dropdownArr}
              onChange={(e) => setAccountType(e.target.value)}
              wrapperClass="!w-[20rem] mt-4 m-auto"
            />
          </div>
          <div className="!w-[20rem] m-auto mt-[84px] lg:mt-4">
            <CustomButton
              text={"RECHARGE NOW"}
              onClick={() => postAccountDetails()}
            />
          </div>
        </div>
      </div>
    );
  };

  const moneyArr = [
    {
      value: 2000,
    },
    {
      value: 3000,
    },
    {
      value: 4000,
    },
    {
      value: 5000,
    },
  ];

  const convertToEdit = () => {
    setIsedit(true);
  };

  const rechargeStatusCheck = async (orderId: number) => {
    const payload = {
      // walletId: "932defa2-2bfa-40b5-8f5c-275ac834ce94",
      orderId: orderId,
    };
    const datas = await POST(RECHARGE_STATUS, payload);
    console.log("response", datas);
    if (datas?.data?.success) {
      setIsLoading(false);
      toast.success("Payment success");
      clearInterval(myInterval);
      navigate("/home/overview");
    } else if (
      datas?.data?.message ===
      "Looks like the payment is not complete. Please wait while we confirm the status with your bank."
    ) {
      setIsLoading(false);
      toast.error("Decline Payment By User!!");
      clearInterval(myInterval);
    }
  };

  const paynow = async () => {
    const payload = {
      // walletId: "932defa2-2bfa-40b5-8f5c-275ac834ce94",
      paymentObject: {
        upiId: upiValue,
        amount: String(money),
        callbackUrl: "http://helloWorld",
      },
    };
    const { data } = await POST(INITIAL_RECHARGE, payload);
    console.log("data", data);

    if (data.success) {
      setIsLoading(true);
      const payload = {
        walletId: "932defa2-2bfa-40b5-8f5c-275ac834ce94",
        orderId: data?.data?.orderId,
      };
      const datas = await POST(RECHARGE_STATUS, payload);
      console.log("response", datas);
      myInterval = setInterval(function () {
        rechargeStatusCheck(data?.data?.orderId);
      }, 500);
    } else {
      toast.error(data?.message);
    }
  };

  const walletRechargeDetails = () => {
    return (
      <div className="h-full w-full">
        <div className="product-box flex justify-between items-center w-full h-[60px] top-0">
          <img
            className="my-auto ml-6  h-[25px] object-contain"
            src={CompanyLogo}
            alt="Company Logo"
          />
          <img
            className="my-auto mr-6"
            src={CloseIcon}
            alt="Close"
            onClick={() => setWalletRechargeModalOpen(false)}
          />
        </div>
        <div className="text-center mt-3 mb-4">
          <h1 className="text-[1.375rem] font-bold leading-7 text-center">
            Welcome to Shipyaari
          </h1>
        </div>
        <div className=" mx-5 my-5 p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm h-[174px]">
          <div className="flex items-center gap-2">
            <img src={Accountlogo} alt="" />
            <p className="text-sm lg:text-[18px] lg:font-semibold lg:text-[#1C1C1C]">
              Your wallet balance
            </p>
            <p className="lg:text-[18px] lg:font-semibold lg:text-[#1C1C1C]">
              ₹{currentWalletValue}
            </p>
          </div>
          <p className="text-[12px] leading-4 text-[#BBBBBB] my-1 lg:font-normal">
            Endless wallet balance with automatic add money
          </p>
          <p
            onClick={() => convertToEdit()}
            className="text-[16px] flex items-center my-2 lg:font-semibold cursor-pointer lg:text-[#1C1C1C]"
          >
            <span>₹</span>
            <input
              type={`${isEdit ? "text" : ""}`}
              className="text-lg p-1 border-none"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
            />
          </p>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {moneyArr?.map((el: any, i: number) => {
              return (
                <div
                  onClick={() => setMoney(el?.value)}
                  className={`${
                    money === el?.value
                      ? "border-[#004EFF]"
                      : "border-[#000000]"
                  } border-[1.5px] p-2 rounded-lg items-center border-solid cursor-pointer`}
                  // className={`border-[1.5px] p-2 rounded-lg items-center border-solid cursor-pointer {money ? border-[#004EFF]: border-[#000000]`}
                >
                  <p
                    className={`text-[16px] ${
                      money === el?.value ? "!text-[#004EFF]" : "text-[#000000]"
                    } lg:font-semibold lg:text-[14px] `}
                  >
                    ₹{el?.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex m-5">
          <div className="w-full   my-5 p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm lg:p-4">
            <div className="flex  gap-x-2 text-[14px]">
              <img src={rechargeIcon} alt="" className="object-contain" />
              <p className="  font-semibold text-sm lg:text-lg lg:text-[#1C1C1C]">
                Payment gateway
              </p>
            </div>

            <div className="flex mt-4 mb-6  justify-between lg:mb-0 ml-4 mr-5">
              {/* <PaytmButton /> */}

              <div
                className="flex flex-col items-center gap-y-2"
                onClick={() => {}}
              >
                <img
                  src={upiIcon}
                  onClick={() => setUpiText(true)}
                  alt=""
                  className="ml-0 object-contain"
                />
                <p className="text-[12px]">UPI</p>
              </div>
              <div className="flex flex-col items-center gap-y-2">
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
              </div>
            </div>
            {upiText && (
              <div className="flex items-center mt-4">
                <div>
                  <CustomInputBox
                    containerStyle={`lg:!w-auto`}
                    inputType="text"
                    label="Enter UPI"
                    className="!w-[20rem] !h-[36px]"
                    value={upiValue}
                    onChange={(e) => setUpiValue(e.target.value)}
                  />
                </div>

                <div className="ml-2">
                  <CustomButton text={"PAY NOW"} onClick={() => paynow()} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const note = (className = "") => {
    return (
      <>
        <p className={`${className} mx-5 mt-[26px] text-[#494949] text-[12px]`}>
          NOTE: Recharge is mandatory for shipping orders.
        </p>
        {/* <div className="mt-[26px] flex justify-center">
          <img src={BannerPagination} alt="" />
        </div> */}
      </>
    );
  };
  return (
    <>
      {isLgScreen && isModalOpen && (
        <CenterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="!h-[490px] !w-[688px]"
        >
          {walletRecharge()}
        </CenterModal>
      )}

      {isRechargeModalOpen && (
        <CenterModal
          isOpen={isRechargeModalOpen}
          onClose={() => setIsRechargeModalOpen(false)}
          className="!h-[37.265rem] !w-[31.25rem]"
        >
          {walletDetails()}
        </CenterModal>
      )}

      {walletRechargeModalOpen && (
        <CenterModal
          isOpen={walletRechargeModalOpen}
          onClose={() => setWalletRechargeModalOpen(false)}
          className="!h-[37.265rem] !w-[31.25rem]"
        >
          {isLoading ? (
            <img
              src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
              className="flex m-auto"
              alt=""
            />
          ) : (
            walletRechargeDetails()
          )}
        </CenterModal>
      )}

      {!isLgScreen && walletRecharge()}
    </>
  );
};
export default OnBoundingWalletRecharge;
