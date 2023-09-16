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
  VERIFY_FORGET_PASSWORD,
} from "../../../utils/ApiUrls";
import { useSelector } from "react-redux";
import CustomButton from "../../../components/Button";
import MobileGif from "../../../assets/OrderCard/Gif.gif";
import { setLocalStorage, tokenKey } from "../../../utils/utility";
import { useNavigate, useLocation } from "react-router-dom";
import { Breadcum } from "../../../components/Layout/breadcrum";

interface ITypeProps {
  onClick?: any;
}

const ForgotPassword = (props: ITypeProps) => {
  const { onClick } = props;
  const navigate = useNavigate();

  const [response, setResponse] = useState<any>(null);
  const signUpUser = useSelector((state: any) => state);
  const [otpVerified, setOtpVerified] = useState<any>(false);
  const [otp, setOtp] = useState({
    forgotPasswordOtp: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    companyName: "SHIPYAARI",
  });
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [mobileNumber, setMobileNumber] = useState({
    mobileNo: 0,
  });
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [emailVerified, setEmailVerified] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postForgotPasswordData = async () => {
    try {
      const { data: response } = await POST(FORGOT_PASSWORD, formData);

      if (response?.success) {
        setResponse(response);
        setEmailVerified(true);
        toast.success(response.message);
        // setFormData({ email: "", companyName: "" });
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
    const { data: response } = await POST(FORGOT_PASSWORD, formData);
    if (response?.success === true) {
      toast.success("OTP resent Successfully");
      setMinutes(0);
      setSeconds(30);
      setOtp({ ...otp, forgotPasswordOtp: "" });
      setEmailVerified(true);
    } else {
      toast.error(response?.message);
    }
  };
  // const onClickVerifyOtp = async () => {
  //   try {
  //     let payload = {
  //       email: formData.email,
  //       otp: otp.forgotPasswordOtp,
  //     };
  //     const { data: response } = await POST(POST_VERIFY_OTP, payload);
  //     if (response?.success === true) {
  //       setOtpVerified(true);
  //       // setLocalStorage(tokenKey, response?.data[0]?.token);
  //     } else {
  //       toast.error(response?.message);
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // };

  // useEffect(() => {
  //   if (otp?.forgotPasswordOtp.length === 6) {
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

  const updatePasswordData = async () => {
    try {
      if (password?.newPassword !== password?.confirmNewPassword) {
        return toast.error(
          "Please enter a new password and re-enter the same password !"
        );
      }
      const updatedFormData = {
        ...formData,
        password: password.newPassword,
        otp: otp.forgotPasswordOtp,
      };

      const { data: response } = await POST(
        VERIFY_FORGET_PASSWORD,
        updatedFormData
      );

      if (response?.success) {
        toast.success(response.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error in UpdatePasswordAPI", error);
      return error;
    }
  };

  return (
    <div className="flex flex-col gap-y-8 lg:h-screen lg:w-full lg:py-5 overflow-auto">
      <div className="flex justify-between lg:mb-10 lg:px-5">
        <div className="flex gap-x-2 lg:gap-x-3 ">
          <h3 className="lg:font-Lato lg:text-2xl lg:text-[#323232] ml-[140px]">
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
      <div className="flex flex-col ml-40 mt-4 w-[70%] gap-y-4">
        <CustomInputBox
          label="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <CustomButton
          onClick={postForgotPasswordData}
          text="Send OTP"
          className="mt-4"
        />
        {emailVerified && (
          <>
            <CustomInputBox
              value={otp.forgotPasswordOtp}
              maxLength={6}
              containerStyle="mt-[32px]"
              label="Enter OTP"
              onChange={(e: any) => {
                setOtp({ ...otp, forgotPasswordOtp: e.target.value });
              }}
            />

            <p className="mt-1 text-[#494949] font-Open text-xs font-semibold leading-4 items-center">
              {resendOtpTimer()}
            </p>

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

            {/* <CustomButton
              onClick={onClickVerifyOtp}
              text="Submit Otp"
              className="mt-2"
            /> */}
          </>
        )}

        {emailVerified && (
          <>
            <CustomInputBox
              label="New Password"
              inputType="password"
              onChange={(e) =>
                setPassword({ ...password, newPassword: e.target.value })
              }
            />
            <CustomInputBox
              label="Re-enter New Password"
              inputType="password"
              onChange={(e) =>
                setPassword({ ...password, confirmNewPassword: e.target.value })
              }
            />

            <CustomButton
              onClick={updatePasswordData}
              text="Update Password"
              className="mt-4"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
