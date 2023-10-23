import React, { useState, useEffect } from "react";
import CancelIcon from "../../../assets/common/cancel.svg";
import CloseIcon from "../../../assets/CloseIcon.svg";
import InfoCircle from "../../../assets/info-circle.svg";

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
import InformativeIcon from "../../../assets/I icon.svg";
import { setLocalStorage, tokenKey } from "../../../utils/utility";
import { useNavigate, useLocation } from "react-router-dom";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import { ResponsiveState } from "../../../utils/responsiveState";
import "../../../styles/signupPages.css";
import { Spinner } from "flowbite-react";
import EyeIcon from "../../../assets/Login/eye.svg";
import CrossEyeIcon from "../../../assets/Login/crosseye.svg";
import { strongpasswordRegex } from "../../../utils/regexCheck";
interface ITypeProps {
  onClick?: any;
}
interface PasswordVisibility {
  newPassword: boolean;
  confirmNewPassword: boolean;
}

const ForgotPassword = (props: ITypeProps) => {
  const { onClick } = props;
  const navigate = useNavigate();
  const { isLgScreen } = ResponsiveState();

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

  const [passwordError, setPasswordError] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [viewPassword, setViewPassword] = useState<PasswordVisibility>({
    newPassword: false,
    confirmNewPassword: false,
  });

  const [mobileNumber, setMobileNumber] = useState({
    mobileNo: 0,
  });
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postForgotPasswordData = async () => {
    try {
      setLoading(true);
      const { data: response } = await POST(FORGOT_PASSWORD, formData);

      if (response?.success) {
        setResponse(response);
        setEmailVerified(true);
        setDisable(false);
        toast.success(response.message);
        // setFormData({ email: "", companyName: "" });
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error in ForgotPasswordAPI", error);
      return error;
    } finally {
      setLoading(false);
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
        return toast.error("Passwords do not match.");
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
        onClick();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error in UpdatePasswordAPI", error);
      return error;
    }
  };
  const modalTitle = () => {
    return (
      <div className="product-box sticky z-10 bg-white flex justify-between items-center w-full h-[60px] top-0">
        <img
          className="my-auto lg:ml-6  h-[25px] object-contain"
          src={CompanyLogo}
          alt="Company Logo"
        />
        <img
          className="my-auto lg:mr-6 cursor-pointer"
          src={CloseIcon}
          alt="Close"
          onClick={onClick}
        />
      </div>
    );
  };

  const togglePasswordVisibility = (field: keyof PasswordVisibility) => {
    setViewPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  function validatePassword(password: string) {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=;':"|,.<>/?])([A-Za-z\d!@#$%^&*()_+\-=;':"|,.<>/?]+)$/;
    if (password.length < 8) {
      return "Enter at least 8 characters.";
    }
    if (!passwordRegex.test(password)) {
      if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
      }
      if (!/[!@#$%^&*()_+\-=;':"|,.<>/?]+/.test(password)) {
        return "Password must contain at least one special character.";
      }
      if (!/[0-9]+/.test(password)) {
        return "Password must contain at least one number.";
      }
      if (/\s/.test(password)) {
        return "Password must not contain spaces.";
      }
    }

    if (password.length < 8) {
      return "Enter at least 8 characters.";
    }

    if (password.length > 16) {
      return "Password should be less than 16 characters.";
    }

    return "";
  }

  return (
    <div className="flex flex-col gap-y-14 lg:gap-y-6 lg:h-screen lg:w-full overflow-auto">
      {isLgScreen && modalTitle()}
      <div className="lg:mx-24 lg:mt-[25px]">
        <div className="flex flex-col gap-y-8 w-full">
          <div className="product-box flex justify-between items-center lg:hidden">
            <img
              className="m-4 h-[25px] object-contain"
              src={CompanyLogo}
              alt="Company Logo"
            />
            <img
              className="my-auto mr-4 cursor-pointer"
              src={CloseIcon}
              alt="Close"
              onClick={onClick}
            />
          </div>
        </div>
      </div>

      {/* <div className="product-box flex items-center lg:hidden">
        <img
          className="m-4 h-[25px] object-contain"
          src={CompanyLogo}
          alt="CompanyLogo"
        />
      </div> */}

      <div className="flex flex-col mx-2  gap-y-4 lg:gap-y-8 ">
        <p className="text-center text-[22px] font-bold font-Lato leading-7 md:mt-10 lg:mt-0">
          Reset Password
        </p>
        <p className="text-center font-Open font-light leading-[22px]">
          Enter your email ID to reset the password.
        </p>
      </div>

      <div className="flex flex-col mx-4 lg:mx-24 gap-y-4">
        <CustomInputBox
          label="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        {disable && (
          <CustomButton
            onClick={postForgotPasswordData}
            text="Send OTP"
            className={`mt-4 ${emailVerified ? "bg-gray-300" : ""}`}
            disabled={emailVerified}
          />
        )}
        {loading ? (
          <div className="fixed top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        ) : (
          emailVerified && (
            <>
              <CustomInputBox
                value={otp.forgotPasswordOtp}
                maxLength={6}
                containerStyle="mt-[12px]"
                label="Enter OTP"
                onChange={(e: any) => {
                  setOtp({ ...otp, forgotPasswordOtp: e.target.value });
                }}
              />

              <p className=" text-[#494949] ml-2 font-Open text-xs font-semibold leading-4 items-center">
                {resendOtpTimer()}
              </p>

              <p className="text-[#494949] font-Open font-normal text-xs leading-4 mb-1">
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
          )
        )}

        {emailVerified && (
          <>
            <CustomInputBox
              label="New Password"
              minLength={8}
              maxLength={16}
              tooltipContent="Password should be 8 to 16 Character with combination of Alpha Numeric and Special Character, One Upper and Lowercase"
              inputType={viewPassword.newPassword ? "text" : "password"}
              isRightIcon={true}
              isInfoIcon={true}
              informativeIcon={InformativeIcon}
              visibility={viewPassword.newPassword}
              setVisibility={() => togglePasswordVisibility("newPassword")}
              rightIcon={viewPassword.newPassword ? EyeIcon : CrossEyeIcon}
              onClick={() => {}}
              onChange={(e) => {
                setPasswordError({
                  ...passwordError,
                  newPassword: "",
                });
                setPassword({ ...password, newPassword: e.target.value });
              }}
              onBlur={(e) => {
                if (
                  !strongpasswordRegex.test(e.target.value) ||
                  password.newPassword.length < 8 ||
                  password.newPassword.length > 16
                ) {
                  const isPasswordError = validatePassword(e.target.value);

                  setPasswordError({
                    ...passwordError,
                    newPassword: isPasswordError,
                  });
                } else {
                  setPasswordError({
                    ...passwordError,
                    newPassword: "",
                  });
                }
              }}
            />
            {passwordError.newPassword !== "" && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="" width={10} height={10} />
                <span className="font-normal text-[#F35838] text-xs leading-3">
                  {passwordError.newPassword}
                </span>
              </div>
            )}
            <CustomInputBox
              label="Re-enter Password"
              inputType={viewPassword.confirmNewPassword ? "text" : "password"}
              isRightIcon={true}
              maxLength={12}
              visibility={viewPassword.confirmNewPassword}
              rightIcon={
                viewPassword.confirmNewPassword ? EyeIcon : CrossEyeIcon
              }
              setVisibility={() =>
                togglePasswordVisibility("confirmNewPassword")
              }
              onClick={() => {}}
              onChange={(e) => {
                setPassword({
                  ...password,
                  confirmNewPassword: e.target.value,
                });
              }}
            />

            <CustomButton
              onClick={updatePasswordData}
              text="Update Password"
              className="mt-1"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
