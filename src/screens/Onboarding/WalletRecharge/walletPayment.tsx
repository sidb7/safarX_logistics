import {
  loadPhonePeTransaction,
  loadRazorPayTransaction,
} from "../../../utils/utility";
import useRazorpay from "react-razorpay";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import Accountlogo from "../../../assets/Payment/Account.svg";
import rechargeIcon from "../../../assets/Payment/rechargeIcon.svg";
import Paytm from "../../../paytm/Paytm";
import { SELLER_WEB_URL } from "../../../utils/ApiUrls";
import CustomButton from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import { ResponsiveState } from "../../../utils/responsiveState";
import NavBar from "../../../layout/Old_NavBar";

const modalTitle = () => {
  return (
    <div className="product-box flex justify-between items-center w-full h-[60px] absolute top-0">
      <img
        className="my-auto ml-6  h-[25px] object-contain"
        src={CompanyLogo}
        alt="Company Logo"
      />
    </div>
  );
};

const WalletPayment = () => {
  const { isLgScreen } = ResponsiveState();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const [Razorpay] = useRazorpay();
  const [money, setMoney] = useState<any>(2000);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEdit, setIsedit] = useState<any>();

  const userDetails = useSelector((state: any) => state.signin);
  const WalletRechargePaymentDetails = () => {
    const convertToEdit = () => {
      setIsedit(true);
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

    const handleRazorPayTransaction = async () => {
      const options: any = await loadRazorPayTransaction(
        money,
        "SHIPYAARI",
        userDetails.name,
        userDetails.email
      );

      const rzp1: any = new Razorpay(options);

      rzp1.on("payment.failed", (response: any) => {});

      rzp1.open();
    };

    return (
      <div className="h-full w-full">
        {!isLgScreen ? (
          <header className="fixed top-0 z-50 w-full ">
            <NavBar />
          </header>
        ) : (
          modalTitle()
        )}
        <div className="text-center mt-20 mb-1">
          <h1 className="text-[22px] font-Lato font-bold leading-7 text-center mt-[148px] lg:mt-0">
            Welcome to Shipyaari
          </h1>
        </div>
        <div className=" mx-5 mt-5 p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm h-[210px]">
          <div className="flex items-center gap-2">
            <img src={Accountlogo} alt="" />
            <p className="text-sm lg:text-[18px] font-semibold lg:text-[#1C1C1C]">
              Your wallet balance
            </p>
            <p className="lg:text-[18px] font-semibold lg:text-[#1C1C1C]">
              ₹ 0
            </p>
          </div>
          <p className="text-[12px] leading-4 text-[#BBBBBB] my-1 lg:font-normal">
            Endless wallet balance with automatic add money
          </p>
          <p
            onClick={() => convertToEdit()}
            className="text-[1rem] my-[1rem] border-solid border-[1px] rounded pl-[1rem] w-[40%] flex items-center font-semibold lg:text-[#1C1C1C] hover:border-[blue]"
          >
            <span>₹</span>
            <input
              type={`number`}
              className="text-lg p-1 border-none"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
            />
          </p>
          <div className="grid grid-cols-4 gap-2 mt-1 ">
            {moneyArr?.map((el: any, i: number) => {
              return (
                <div
                  key={i}
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
                    } font-semibold lg:text-[14px] `}
                  >
                    ₹{el?.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex mx-5 my-3">
          <div className="w-full p-3 rounded-lg border-2 border-solid border-[#E8E8E8] shadow-sm">
            <div className="flex  gap-x-2 text-[14px]">
              <img src={rechargeIcon} alt="" className="object-contain" />
              <p className="  font-semibold text-sm  lg:text-lg lg:text-[#1C1C1C]">
                Payment gateway
              </p>
            </div>

            <div className="flex mt-1 mb-6 gap-x-[1rem] lg:mb-0 ml-4 mr-5">
              <div className="flex flex-col items-center gap-y-2">
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
                  amt={money}
                  navigate="/dashboard/overview"
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
                      money,
                      `${SELLER_WEB_URL}/dashboard/overview`,
                      `${SELLER_WEB_URL}/dashboard/overview`
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
                  className={` ${
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
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex justify-center  cursor-pointer"
          onClick={() => navigate("/dashboard/overview")}
        >
          <p className="text-[14px] text-[#004EFF] font-semibold border-b-2 border-[#004EFF] mt-3">
            SKIP FOR NOW{" "}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLgScreen && isModalOpen && (
        <CenterModal
          shouldCloseOnOverlayClick={false}
          isOpen={isModalOpen}
          // onRequestClose={() => setWalletRechargeModalOpen(false)}
          className="!h-[37.265rem] !w-[21rem] md:!w-[28] lg:!w-[31.25rem]"
        >
          {isLoading ? (
            <img
              src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
              className="flex m-auto"
              alt=""
            />
          ) : (
            WalletRechargePaymentDetails()
          )}
        </CenterModal>
      )}
      {!isLgScreen && WalletRechargePaymentDetails()}
    </>
  );
};
export default WalletPayment;
