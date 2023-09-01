import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import MobileGif from "../../../assets/OrderCard/Gif.gif";
import CustomButton from "../../../components/Button/index";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../../styles/otpStyle.css";
import { ResponsiveState } from "../../../utils/responsiveState";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import CustomInputBox from "../../../components/Input";
import { useSelector } from "react-redux";
import { POST } from "../../../utils/webService";
import { POST_VERIFY_OTP, POST_SEND_OTP_URL } from "../../../utils/ApiUrls";
import { toast } from "react-toastify";
import { setLocalStorage, tokenKey } from "../../../utils/utility";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location?.state?.path || {};

  const { isLgScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [otp, setOtp] = useState({
    loginOtp: "",
  });

  const signUpUser = useSelector((state: any) => state.signup);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  const resendOtpTimer = () => {
    const minute = minutes < 10 ? `0${minutes}` : minutes;
    const second = seconds < 10 ? `0${seconds}` : seconds;

    if (seconds > 0 || minutes > 0) {
      return (
        <>
          {minute} : {second} sec
        </>
      );
    }
  };

  const resendOtp = async () => {
    const { data: response } = await POST(POST_SEND_OTP_URL, state);
    if (response?.success === true) {
      toast.success("OTP resent Successfully");
      setMinutes(0);
      setSeconds(30);
    } else {
      toast.error(response?.message);
    }
  };
  const onClickVerifyOtp = async () => {
    try {
      let payload = {
        email: signUpUser.email,
        otp: otp.loginOtp,
      };
      const { data: response } = await POST(POST_VERIFY_OTP, payload);
      if (response?.success === true) {
        setLocalStorage(tokenKey, response?.data[0]?.token);
        navigate("/onBoarding/get-started");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (otp?.loginOtp.length === 6) {
      onClickVerifyOtp();
    }
  }, [otp]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(30);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const modalTitle = () => {
    return (
      <div className="product-box flex justify-between items-center w-full h-[60px] absolute top-0">
        <img
          className="my-auto ml-6  h-[25px] object-contain"
          src={CompanyLogo}
          alt="Company Logo"
        />
        {/* <img
          className="my-auto mr-6"
          src={CloseIcon}
          alt="Close"
          onClick={() => setIsModalOpen(false)}
        /> */}
      </div>
    );
  };

  const verifyOtp = () => {
    return (
      <div className="relative h-full w-full">
        {isLgScreen && modalTitle()}
        <div className="xl:mx-24 lg:mt-[84px]">
          <div className="flex flex-col">
            <div className="product-box flex items-center lg:hidden">
              <img
                className="m-4 h-[25px] object-contain"
                src={CompanyLogo}
                alt="CompanyLogo"
              />
            </div>

            <div className="flex flex-col mx-4 mt-6  lg:mt-12 gap-y-3">
              <p className="text-center text-[22px] text-[#323232] font-bold font-Lato leading-7 ">
                Mobile Verification
              </p>

              <p className="text-center text-base text-[#494949] font-Open font-light leading-[22px] ">
                Enter The OTP Sent To{" "}
                <span className="text-[#494949] font-Open text-base font-semibold leading-[22px]">
                  +91 {state.mobileNo}{" "}
                </span>
              </p>
            </div>

            <div className=" flex flex-col mx-4">
              <div className="flex justify-center">
                <img
                  className="h-[180px] w-[180px] object-contain "
                  src={MobileGif}
                  alt="MobileIcon"
                />
              </div>

              <div className="flex justify-center">
                <CustomInputBox
                  maxLength={6}
                  containerStyle="mt-[32px]"
                  label="Enter OTP"
                  onChange={(e: any) => {
                    setOtp({ ...otp, loginOtp: e.target.value });
                  }}
                />
              </div>
              <div className="flex justify-center">
                <p className="mt-3 text-[#494949] font-Open text-xs font-semibold leading-4 items-center">
                  {resendOtpTimer()}
                </p>
              </div>

              <div className="flex justify-center mt-4">
                <p className="text-[#494949] font-Open font-normal text-xs leading-4">
                  Didn't Receive Code ?
                  <span
                    className={`mx-1 font-normal text-[#004EFF] text-[12px] cursor-pointer ${
                      (seconds > 0 || (seconds > 0 && minutes === 0)) &&
                      "text-[#494949]"
                    }`}
                    onClick={() => {
                      if (seconds === 0 && minutes === 0) {
                        resendOtp();
                      }
                    }}
                  >
                    Resend
                  </span>
                </p>
                {/* <button
                  type="button"
                  className="text-[#004EFF] font-Open font-semibold ml-1 text-xs leading-4"
                >
                  Resend
                </button> */}
              </div>

              <CustomButton
                onClick={onClickVerifyOtp}
                text="SUBMIT"
                className="mt-4"
              />
            </div>
          </div>
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
          onClose={() => setIsModalOpen(false)}
        >
          {verifyOtp()}
        </CenterModal>
      )}

      {!isLgScreen && verifyOtp()}
    </>
  );
};

export default Index;
