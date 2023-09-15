import React, { useState, useEffect } from "react";
import CancelIcon from "../../../assets/common/cancel.svg";
import CustomInputBox from "../../../components/Input";
import AddButton from "../../../components/Button/addButton";
import { POST } from "../../../utils/webService";
import { toast } from "react-toastify";
import {
  FORGOT_PASSWORD,
  POST_SEND_OTP_URL,
  POST_VERIFY_OTP,
} from "../../../utils/ApiUrls";
import { useSelector } from "react-redux";
import CustomButton from "../../../components/Button";
import MobileGif from "../../../assets/OrderCard/Gif.gif";
import { setLocalStorage, tokenKey } from "../../../utils/utility";
import { useNavigate, useLocation } from "react-router-dom";

interface ITypeProps {
  onClick?: any;
}

const ForgotPassword = (props: ITypeProps) => {
  const { onClick } = props;
  const navigate = useNavigate();

  const [response, setResponse] = useState<any>(null);
  const signUpUser = useSelector((state: any) => state);
  const [otp, setOtp] = useState({
    loginOtp: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
  });

  const [mobileNumber, setMobileNumber] = useState({
    mobileNo: 0,
  });
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   let body = {
  //     email: signUpUser.email,
  //     firstName: signUpUser.firstName,
  //     mobileNo: mobileNumber.mobileNo,
  //   };

  //   const sendOtpOnClick = async (value: any) => {
  //     try {
  //       const { data: response } = await POST(POST_SEND_OTP_URL, value);
  //       if (response?.success === true) {
  //         navigate("/onboarding/verifyOtp", { state: { path: body } });
  //       } else {
  //         toast.error(response?.message);
  //       }
  //     } catch (error) {
  //       return error;
  //     }
  //   };

  //   const handleSaveClick = () => {
  //     const { email, companyName } = formData;

  //     console.log("Email:", email);
  //     console.log("companyName:", companyName);

  //     setFormData({ email: "", companyName: "" });
  //   };

  const postForgotPasswordData = async () => {
    const { email, companyName } = formData;

    try {
      const { data: response } = await POST(FORGOT_PASSWORD, formData);

      if (response?.success) {
        setResponse(response);
        setFormData({ email: "", companyName: "" });
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error in ForgotPasswordAPI", error);
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
  };

  const resendOtp = async () => {
    const { data: response } = await POST(POST_SEND_OTP_URL, "");
    if (response?.success === true) {
      toast.success("OTP resent Successfully");
      setMinutes(0);
      setSeconds(30);
      setOtp({ ...otp, loginOtp: "" });
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

  return (
    <div className="flex flex-col gap-y-8 lg:h-screen lg:w-full lg:py-5">
      <div className="flex justify-between lg:mb-10 lg:px-5">
        <div className="flex gap-x-2 lg:gap-x-3 ">
          <h3 className="lg:font-Lato lg:text-2xl lg:text-[#323232] ml-4">
            Forgot Password
          </h3>
        </div>
        <div>
          <img
            src={CancelIcon}
            alt=""
            onClick={onClick}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="mb-4 lg:mb-6 lg:mr-10 ml-10 w-[20%]">
        <CustomInputBox
          label="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4 lg:mb-6 lg:mr-10 ml-10 w-[20%]">
        <CustomInputBox
          label="Enter Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col mx-4 mt-6  lg:mt-12 gap-y-3">
        <p className="text-center text-[22px] text-[#323232] font-bold font-Lato leading-7 ">
          Mobile Verification
        </p>

        <p className="text-center text-base text-[#494949] font-Open font-light leading-[22px] ">
          Enter The OTP Sent To{" "}
          <span className="text-[#494949] font-Open text-base font-semibold leading-[22px]">
            {/* +91 {state.mobileNo}{" "} */}
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
            value={otp.loginOtp}
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

      <div className="w-[20%] ml-10">
        <AddButton text="Save" onClick={postForgotPasswordData} />
      </div>
    </div>
  );
};

export default ForgotPassword;
