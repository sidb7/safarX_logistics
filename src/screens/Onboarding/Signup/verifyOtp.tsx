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
import { toast } from "react-hot-toast";
import {
  constructNavigationObject,
  setLocalStorage,
  tokenKey,
} from "../../../utils/utility";
import { Spinner } from "../../../components/Spinner";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location?.state?.path || {};

  const updatedNumber =
    state?.mobileNo?.toString()?.replace(/(?<=\d)\d(?=\d{2})/g, "*") || "";

  const { isLgScreen, isMdScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState<any>({
    mobileOtp: "",
    // emailOtp: "",
  });
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();

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
      setOtp({ ...otp, mobileOtp: "" });
    } else {
      toast.error(response?.message);
    }
  };
  const onClickVerifyOtp = async () => {
    try {
      let payload = {
        email,
        mobileOtp: otp.mobileOtp,
        // emailOtp: otp.emailOtp,
      };
      setLoading(true);
      const { data: response } = await POST(POST_VERIFY_OTP, payload);

      sessionStorage.setItem("setKycValue", response?.data[0]?.nextStep?.kyc);

      if (response?.success === true) {
        localStorage.setItem(
          `${response?.data[0]?.sellerId}_${tokenKey}`,
          response?.data[0]?.token
        );
        sessionStorage.setItem("userName", response?.data[0]?.name);
        sessionStorage.setItem("sellerId", response?.data[0]?.sellerId);
        sessionStorage.setItem("setKycValue", response?.data[0]?.nextStep?.kyc);
        // setLocalStorage(tokenKey, response?.data[0]?.token);

        const navigationObject = constructNavigationObject(
          "/onBoarding/get-started",
          window.location.search
        );

        navigate(navigationObject);
      } else {
        toast.error(response?.message);
      }
      setLoading(false);
    } catch (error) {
      return error;
    }
  };

  // useEffect(() => {
  //   if (otp?.mobileOtp.toString().length === 6) {
  //     onClickVerifyOtp();
  //   }
  // }, [otp]);

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

  useEffect(() => {
    let temp: any = sessionStorage.getItem("userInfo");
    temp = JSON.parse(temp);
    setEmail(temp?.email);
  }, []);

  const modalTitle = () => {
    return (
      <div className="product-box sticky z-10 bg-white flex justify-between items-center w-full h-[60px] top-0">
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
      <div
        className={` ${
          isMdScreen ? "custom_shadow m-auto  !w-[500px]" : ""
        } flex flex-col relative lg:px-0 lg:gap-y-0 rounded-lg`}
      >
        {/* {isLgScreen && modalTitle()} */}
        <div className="product-box flex items-center ">
          <img
            className="m-4 h-[25px] object-contain"
            src={CompanyLogo}
            alt="CompanyLogo"
          />
        </div>
        <div className="md:mx-[90px]">
          <div className="flex flex-col">
            <div className="flex flex-col mx-4 mt-11 md:mt-6 gap-y-3">
              <p className="text-center text-[22px] text-[#323232] font-bold font-Lato leading-7 ">
                Mobile Verification
              </p>

              <p className="text-center text-base text-[#494949] font-Open font-light leading-[22px] whitespace-nowrap">
                Enter the OTP sent to{" "}
                <span className="text-[#494949] font-Open text-base font-semibold leading-[22px]">
                  +91 {updatedNumber}{" "}
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

              <div className="flex flex-col justify-center">
                <CustomInputBox
                  inputType="text"
                  inputMode="numeric"
                  value={otp.mobileOtp || ""}
                  maxLength={6}
                  containerStyle="mt-[32px]"
                  label="Enter Mobile OTP "
                  onChange={(e: any) => {
                    if (isNaN(e.target.value)) {
                    } else {
                      setOtp({ ...otp, mobileOtp: +e.target.value });
                    }
                  }}
                />
                {/* <CustomInputBox
                  inputType="text"
                  inputMode="numeric"
                  value={otp.emailOtp || ""}
                  maxLength={6}
                  containerStyle="mt-[32px]"
                  label="Enter Email OTP"
                  onChange={(e: any) => {
                    if (isNaN(e.target.value)) {
                    } else {
                      setOtp({ ...otp, emailOtp: +e.target.value });
                    }
                  }}
                /> */}
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
                    className={`mx-1 font-extrabold text-[#004EFF] text-[12px] leading-5 ${
                      seconds > 0 || (seconds > 0 && minutes === 0)
                        ? "cursor-not-allowed  text-[#494949]"
                        : "cursor-pointer"
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

              <div className="md:mb-11">
                <CustomButton
                  onClick={onClickVerifyOtp}
                  text="SUBMIT"
                  className="mt-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderVerifyOtp = () => {
    if (isMdScreen) {
      return (
        // <CenterModal
        //   shouldCloseOnOverlayClick={false}
        //   isOpen={isModalOpen}
        //   // onRequestClose={() => setIsModalOpen(false)}
        // >
        loading ? (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            {verifyOtp()}
          </div>
        )
        // </CenterModal>
      );
    } else {
      return loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        verifyOtp()
      );
    }
  };

  return <>{renderVerifyOtp()}</>;
};

export default Index;
