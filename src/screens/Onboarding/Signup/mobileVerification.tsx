import React from "react";
import MobileGif from "../../../assets/OrderCard/MobileNumberScreen.gif";
import CustomInputBox from "../../../components/Input";
import { useNavigate } from "react-router-dom";
import { ResponsiveState } from "../../../utils/responsiveState";
import { useEffect, useState } from "react";
import {
  POST_SEND_OTP_URL,
  LARGE_LOGO,
  POST_VERIFY_OTP,
  REACT_APP_GTM_ID,
} from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { constructNavigationObject, tokenKey } from "../../../utils/utility";
import OneButton from "../../../components/Button/OneButton";
import { Spinner } from "../../../components/Spinner";

const Index = () => {
  const navigate = useNavigate();
  const { isLgScreen, isMdScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [mobileNumber, setMobileNumber] = useState({
    mobileNo: "",
  });
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Button disable state
  // console.log("🚀 ~ Index ~ isButtonDisabled:", isButtonDisabled);
  const [isOtpSent, setIsOtpSent] = useState(false);
  // console.log("🚀 ~ Index ~ isOtpSent:", isOtpSent);
  const updatedNumber =
    mobileNumber?.mobileNo?.toString()?.replace(/(?<=\d)\d(?=\d{2})/g, "*") ||
    "";

  //getting the info from where user signed up, from site or google
  const UserCameFrom = localStorage.getItem("key");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<any>({
    mobileOtp: "",
    // emailOtp: "",
  });
  const signUpUser = useSelector((state: any) => state.signup);
  const [timerActive, setTimerActive] = useState(false); // State to control timer
  // console.log("🚀 ~ Index ~ timerActive:", timerActive);
  const [minutes, setMinutes] = useState(0);
  // console.log("🚀 ~ Index ~ minutes:", minutes);
  const [seconds, setSeconds] = useState(30);
  // console.log("🚀 ~ Index ~ seconds:", seconds);

  useEffect(() => {
    let temp: any = localStorage.getItem("userInfo");
    temp = JSON.parse(temp);
    setFirstName(temp?.firstName);
    setEmail(temp?.email);
  }, []);

  let body = {
    email,
    firstName,
    mobileNo: mobileNumber?.mobileNo,
  };

  const sendOtpOnClick = async (value: any) => {
    setLoading(true);
    try {
      const { data: response } = await POST(POST_SEND_OTP_URL, value);
      if (response?.success === true) {
        setIsOtpSent(true); // Update state to indicate OTP has been sent successfully
        if (!timerActive) {
          setTimerActive(true); // Start the timer
        }
        toast.success(response?.message);
        setLoading(false);
        window?.dataLayer?.push({
          event: "reg_2_Mobile_Verified",
          seller_email: email,
          seller_name: firstName,
          // seller_kyc: nextStep?.kyc,
          // seller_bank_verification_done: nextStep?.bank,
          // isReturningUser: isReturningUser,
        });
        // const navigationObject = constructNavigationObject(
        //   "/onboarding/verifyOtp",
        //   window.location.search
        // );
        // navigate(navigationObject, { state: { path: body } });
        // navigate("/onboarding/verifyOtp", { state: { path: body } });
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send OTP!");
      return error;
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
    return null; // return null if timer isnt active
  };

  const resendOtp = async () => {
    const { data: response } = await POST(POST_SEND_OTP_URL, body);

    if (response?.success === true) {
      toast.success("OTP resent Successfully");
      setIsButtonDisabled(false);
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

      localStorage.setItem("setKycValue", response?.data[0]?.nextStep?.kyc);

      if (response?.success === true) {
        localStorage.setItem(
          `${response?.data[0]?.sellerId}_${tokenKey}`,
          response?.data[0]?.token
        );
        localStorage.setItem("userName", response?.data[0]?.name);
        localStorage.setItem("sellerId", response?.data[0]?.sellerId);
        localStorage.setItem("setKycValue", response?.data[0]?.nextStep?.kyc);
        // setLocalStorage(tokenKey, response?.data[0]?.token);

        window?.dataLayer?.push({
          event: "sign_up",
          seller_email: email,
          seller_name: response?.data[0]?.name,
          seller_kyc: response?.data[0]?.nextStep?.kyc,
          sellerId: response?.data[0]?.sellerId,
          seller_bank_verification_done: response?.data[0]?.nextStep?.bank,
          sign_up_method: UserCameFrom,
          // isReturningUser: isReturningUser,
        });

        window.gtag("config", REACT_APP_GTM_ID, {
          user_id: response?.data[0]?.sellerId,
        });

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

  const modalTitle = () => {
    return (
      <div className="product-box sticky z-10 bg-white flex justify-between items-center w-full h-[60px] top-0">
        <img
          className="my-auto ml-6  h-[25px] object-contain"
          src={LARGE_LOGO}
          alt="Company Logo"
        />
      </div>
    );
  };

  const mobileVerification = () => {
    return (
      <div
        className={` ${
          isMdScreen ? "custom_shadow m-auto !w-[500px]" : ""
        } flex flex-col relative lg:px-0 lg:gap-y-0 rounded-lg`}
      >
        <div className="product-box flex items-center ">
          <img
            className="m-4 h-[25px] object-contain"
            src={LARGE_LOGO}
            alt="CompanyLogo"
          />
        </div>

        <div className="flex flex-col  mx-4 md:mx-[90px] gap-y-8">
          <div className="flex flex-col mt-11 md:mt-6 gap-y-6">
            <p className="text-center text-[22px] font-bold font-Lato leading-7 ">
              Mobile Verification
            </p>
            {isOtpSent ? (
              <p className="text-center text-base text-[#494949] font-Open font-light leading-[22px] whitespace-nowrap">
                Enter the OTP sent to{" "}
                <span className="text-[#494949] font-Open text-base font-semibold leading-[22px]">
                  +91 {updatedNumber}{" "}
                </span>
              </p>
            ) : (
              <p className="text-center font-Open font-light text-[#494949] leading-[22px]">
                Please verify your phone number to proceed further.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-6 md:mb-11">
            <div className="flex justify-center">
              <img
                className="h-[180px] w-[180px] object-contain"
                src={MobileGif}
                alt="MobileIcon"
              />
            </div>

            <CustomInputBox
              value={mobileNumber?.mobileNo || ""}
              inputMode="numeric"
              label="Enter Your 10 Digit Mobile Number"
              maxLength={10}
              onChange={(e: any) => {
                if (!isNaN(e.target.value)) {
                  setMobileNumber({
                    ...mobileNumber,
                    mobileNo: e.target.value,
                  });
                }
              }}
              // isDisabled={seconds === 0 && minutes === 0 ? false : true}
              isDisabled={isOtpSent}
            />

            {isOtpSent ? (
              <>
                <div className="flex flex-col justify-center">
                  <CustomInputBox
                    inputType="text"
                    inputMode="numeric"
                    value={otp.mobileOtp || ""}
                    maxLength={6}
                    // containerStyle="mt-[32px]"
                    label="Enter Mobile OTP "
                    onChange={(e: any) => {
                      if (isNaN(e.target.value)) {
                      } else {
                        setOtp({
                          ...otp,
                          mobileOtp: e.target.value,
                        });
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
                  <p className=" text-[#494949] font-Open text-xs font-semibold leading-4 items-center">
                    {resendOtpTimer()}
                  </p>
                </div>

                <div className="flex justify-center">
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
                </div>

                <div className="">
                  <OneButton
                    variant="primary"
                    onClick={onClickVerifyOtp}
                    text="SUBMIT OTP"
                    disabled={otp?.mobileOtp.length !== 6}
                    // className="my-4"
                  />
                </div>
              </>
            ) : (
              <OneButton
                variant="primary"
                onClick={(e: any) => sendOtpOnClick(body)}
                text="Verify Number"
                disabled={isButtonDisabled}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  // useEffect to handle API call after mobileNo is 10 digits
  useEffect(() => {
    if (mobileNumber?.mobileNo.length === 10) {
      sendOtpOnClick(body); // Automatically send OTP when there are 10 digits
      setIsButtonDisabled(false); // Enable button when exactly 10 digits
    } else {
      setIsButtonDisabled(true); // Disable button if not 10 digits
    }
  }, [mobileNumber]); // Listen for changes in mobile number

  // useEffect to handle API call after mobileNo is 10 digits
  useEffect(() => {
    if (otp?.mobileOtp?.length === 6) {
      onClickVerifyOtp(); // Automatically verify OTP when there are 6 digits
      // setIsButtonDisabled(false); // Enable button when exactly 6 digits
    }
  }, [otp]); // Listen for changes in otp

  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          setIsButtonDisabled(false); // Enable input when timer expires
        } else {
          setSeconds(30);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes, timerActive]);

  return (
    <>
      {loading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      ) : (
        <>
          {isMdScreen && (
            <div className="flex justify-center items-center h-screen">
              {mobileVerification()}
            </div>
          )}
          {!isLgScreen && mobileVerification()}
        </>
      )}
    </>
  );
};

export default Index;
