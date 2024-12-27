import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import CustomInputBox from "../../../components/Input/index";
import TrackingJson from "./tracking.json";
import CrossIcon from "../../../assets/CloseIcon.svg";
import ShipyaaroLogo from "../../../assets/Shipyaari_full_color rgb.svg";
import OneButton from "../../../components/Button/OneButton";
import { setOTPNumber } from "../../../redux/reducers/onboarding";
import { POST } from "../../../utils/webService";
import { TRACKING_SEND_VERIFY_OTP } from "../../../utils/ApiUrls";
import toast from "react-hot-toast";

const LoginModal = ({
  awb,
  mobileNo,
  logginModal,
  setLogginModal,
  loggedIn,
  setLoggedIn,
  setLoginSuccess,
}: any) => {
  const navigate = useNavigate();

  const [sendOtp, setSendOtp] = useState<any>(false);
  const [otp, setOtp] = useState<any>();
  const [inputError, setInputError] = useState<any>();
  const [timerActive, setTimerActive] = useState<any>(false);
  const [seconds, setSeconds] = useState<any>(59);
  const [minutes, setMinutes] = useState<any>(9);
  const [isButtonDisabled, setIsButtonDisabled] = useState<any>(true);
  const [isClickedResend, setClickedResend] = useState<any>(false);

  const maskMobileNumber = (mobileNo: any) => {
    if (!mobileNo) return "";
    const mobileStr = String(mobileNo);
    if (mobileStr.length < 4) return mobileStr;

    const firstTwo = mobileStr.slice(0, 2);
    const lastTwo = mobileStr.slice(-2);
    const maskedSection = "*".repeat(mobileStr.length - 4);
    return `${firstTwo}${maskedSection}${lastTwo}`;
  };

  const handleSendOtp = async (data?: any) => {
    if (data === "resend") {
      setClickedResend(true);
    }
    try {
      const payload = {
        otp: "",
        awb: awb,
        isVerified: false,
      };
      const data = await POST(TRACKING_SEND_VERIFY_OTP, payload);

      if (data?.data?.success === false) {
        toast.error(data?.data?.message);
      }
      if (data?.data?.success) {
        toast.success(data?.data?.message);
        setSendOtp(!sendOtp);

        setTimerActive(true);
        setMinutes(9);
        setSeconds(59);
        setIsButtonDisabled(true);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleSubmitLogin = async () => {
    if (sendOtp === false) {
      handleSendOtp();
    } else {
      try {
        const payload = {
          otp: otp,
          awb: awb,
          isVerified: true,
        };
        const data = await POST(TRACKING_SEND_VERIFY_OTP, payload);

        // localStorage.setItem(awb, data?.data?.data?.[0]?.tempAccessToken);
        sessionStorage.setItem(awb, data?.data?.data?.[0]?.tempAccessToken);
        if (data?.data?.success) {
          toast.success(data?.data?.message);
          setLogginModal(false);
          setOtp("");
          setSendOtp(false);
          setLoggedIn(true);
          setLoginSuccess(true);
        } else {
          toast.error(data?.data?.message);
          if (otp === undefined || otp?.length === 0) {
            setInputError("Please Enter OTP");
          } else {
            setInputError("");
          }
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

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
    return null;
  };

  const resendOtp = async () => {
    setSendOtp(true);
    setIsButtonDisabled(true);
    setOtp("");
    try {
      const payload = {
        otp: "",
        awb: awb,
        isVerified: false,
      };
      const { data: response } = await POST(TRACKING_SEND_VERIFY_OTP, payload);
      if (response?.success === true) {
        toast.success("OTP resent Successfully");
        setMinutes(9);
        setSeconds(59);
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          console.log("isClickedResend", isClickedResend);
          clearInterval(interval);
          setIsButtonDisabled(false);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes, timerActive, isClickedResend]);

  return (
    <div>
      <CenterModal
        isOpen={logginModal}
        onRequestClose={() => {
          setLogginModal(false);
        }}
        className="h-[540px] md:h-[550px] lg:h-[550px]  w-[340px] md:w-[420px] lg:w-[650px] "
      >
        {/* <MobileNumberOtp /> */}
        <div className="relative h-full w-full">
          {/* Header Section */}
          <div className="flex justify-between my-4 shadow-md pb-4">
            <img
              className="my-auto ml-6 h-[30px] object-contain"
              src={ShipyaaroLogo}
              alt="Company Logo"
            />
            <img
              className="my-auto mr-6 cursor-pointer"
              src={CrossIcon}
              alt="Close"
              onClick={() => {
                setLogginModal(false);
              }}
            />
          </div>

          {/*Body Section */}
          <div className="flex flex-col items-center justify-center mt-20">
            <p className="text-[16px] lg:text-[22px] font-Lato  mx-28 text-center font-semibold">
              {`${
                sendOtp
                  ? TrackingJson?.trackingJson?.login?.otp
                  : TrackingJson?.trackingJson?.login?.mobileNo
              }`}
            </p>
          </div>
          {/* {!sendOtp && ( */}
          <div className="mx-24 my-10">
            <CustomInputBox
              label="Enter your mobile number"
              // value={`+91 ${mobileNo}`}
              value={`+91 ${maskMobileNumber(mobileNo)}`}
              isDisabled={true}
            />
          </div>
          {/* )} */}
          {sendOtp && (
            <div className="mx-24 mt-8">
              <CustomInputBox
                label="OTP"
                inputType="number"
                value={otp}
                onChange={(e: any) => {
                  const newOtp = e.target.value;

                  if (newOtp.length <= 6) {
                    setOtp(newOtp);

                    if (newOtp.trim().length === 0) {
                      setInputError("Please enter OTP");
                    } else {
                      setInputError("");
                    }
                  }
                }}
              />

              {
                <p className="text-[14px] text-red-600 font-Open">
                  {inputError}
                </p>
              }
            </div>
          )}

          {sendOtp && (
            <div className="flex justify-end mx-28 mt-3 mb-10">
              <p className=" text-[#494949] font-Open text-xs font-semibold leading-4 items-center">
                {resendOtpTimer()}
              </p>
            </div>
          )}

          <div className={`${sendOtp ? "my-4" : "my-0"}flex justify-center`}>
            {sendOtp ? (
              <div className="flex justify-center mb-4">
                <p className="text-[#494949] font-Open text-[12px] font-medium">
                  {TrackingJson?.trackingJson?.login?.receive}
                </p>

                <p
                  className={`ml-1 font-Open text-[12px] font-bold cursor-pointer ${
                    isButtonDisabled
                      ? "text-[#A4A4A4] cursor-not-allowed"
                      : "text-[#004EFF] cursor-pointer"
                  }`}
                  onClick={() => {
                    if (!isButtonDisabled) {
                      resendOtp();
                    }
                  }}
                >
                  {TrackingJson?.trackingJson?.login?.resend}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mx-24">
            <OneButton
              text={sendOtp ? "SUBMIT" : "SEND OTP"}
              variant="primary"
              onClick={() => handleSubmitLogin()}
              textTransform="uppercase"
            />
          </div>
        </div>
      </CenterModal>
    </div>
  );
};

export default LoginModal;
