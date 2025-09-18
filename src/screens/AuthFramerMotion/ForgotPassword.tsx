import React, { useEffect, useState } from "react";
import CustomInputBox from "../../components/Input";
import OneButton from "../../components/Button/OneButton";
import { IoChevronBack } from "react-icons/io5";
import { Spinner } from "../../components/Spinner";
import InfoCircle from "../../assets/info-circle.svg";
import EyeIcon from "../../assets/Login/eye.svg";
import CrossEyeIcon from "../../assets/Login/crosseye.svg";
import InformativeIcon from "../../assets/I icon.svg";

import { POST } from "../../utils/webService";

import {
  FORGOT_PASSWORD,
  LARGE_LOGO,
  VERIFY_FORGET_PASSWORD,
} from "../../utils/ApiUrls";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { strongpasswordRegex } from "../../utils/regexCheck";

function ForgotPassword({ setForgotPasswordON }: any) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    companyName: "Drivaa.Run",
  });
  const [response, setResponse] = useState<any>(null);
  const signUpUser = useSelector((state: any) => state);
  const [otp, setOtp] = useState({
    forgotPasswordOtp: "",
  });
  const [passwordError, setPasswordError] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
  });
  const validateEmail = (value: any) => {
    if (!value) return "Please enter your email ID";
    if (!emailRegex.test(value)) return "Incorrect Email ID";
    return "";
  };
  function validatePassword(password: any) {
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
  const [viewPassword, setViewPassword] = useState<any>({
    newPassword: false,
    confirmNewPassword: false,
  });
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
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const updatePasswordData = async () => {
    try {
      if (password?.newPassword !== password?.confirmNewPassword) {
        toast.error("Your passwords don’t match. Please try again.");
        return;
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
        setForgotPasswordON(false);
        // onClick();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error in UpdatePasswordAPI", error);
      return error;
    }
  };

  const togglePasswordVisibility = (field: any) => {
    setViewPassword((prev: any) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  return (
    <div className="px-6 py-5 w-full border shadow-lg rounded-xl bg-white">
      <div className="flex items-center gap-1">
        <div className="cursor-pointer">
          <IoChevronBack size={20} onClick={() => setForgotPasswordON(false)} />
        </div>
        <div className="text-xl font-Open">RESET PASSWORD</div>
      </div>
      {/* Email Field */}
      <CustomInputBox
        containerStyle="mt-5"
        className="!h-[40px]"
        label="Email"
        id="email"
        name="email"
        inputType="email"
        fixedLabel
        value={formData.email}
        onChange={handleInputChange}
        onBlur={(e) => {
          const errorMsg = validateEmail(e.target.value);
          setLoginError((prev) => ({ ...prev, email: errorMsg }));
        }}
        errorCondition={{
          message: loginError.email,
        }}
      />

      <div>
        {disable && (
          <OneButton
            loading={loading}
            className="rounded-lg font-Open w-full hover:shadow-md transition duration-200 text-white py-2  mt-5"
            onClick={postForgotPasswordData}
            text="Send OTP"
            variant="primary"
            disabled={formData.email == "" || loginError.email != ""}
            backgroundColour="bg-[#160783]"
          />
        )}
        {emailVerified && (
          <>
            <CustomInputBox
              containerStyle="mt-5"
              className="!h-[40px]"
              value={otp.forgotPasswordOtp}
              maxLength={6}
              label="Enter OTP"
              onChange={(e: any) => {
                setOtp({
                  ...otp,
                  forgotPasswordOtp: e.target.value,
                });
              }}
            />

            <div className="flex w-full justify-end">
              <p className=" text-[#494949] ml-2 font-Open text-xs font-semibold leading-4 items-center">
                {resendOtpTimer()}
              </p>

              <p className="text-[#494949] font-Open font-normal text-[10px] ">
                Didn't Receive Code ?
                <span
                  className={`mx-1 font-normal text-[#160783] text-[10px] hover:underline ${
                    seconds > 0 || (seconds > 0 && minutes === 0)
                      ? "text-[#494949]"
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
          </>
        )}

        {emailVerified && (
          <>
            <div className=" w-full flex gap-2 mt-5">
              <div className="w-full">
                <CustomInputBox
                  label="New Password"
                  className="!h-[40px]"
                  minLength={8}
                  maxLength={16}
                  tooltipContent="Password should be 8 to 16 Character with combination of Alpha Numeric and Special Character, One Upper and Lowercase"
                  inputType={viewPassword.newPassword ? "text" : "password"}
                  isInfoIcon={true}
                  isRightIcon={true}
                  informativeIcon={InformativeIcon}
                  visibility={viewPassword.newPassword}
                  setVisibility={() => togglePasswordVisibility("newPassword")}
                  rightIcon={!viewPassword.newPassword ? CrossEyeIcon : EyeIcon}
                  onClick={() => {}}
                  onChange={(e) => {
                    setPasswordError({
                      ...passwordError,
                      newPassword: "",
                    });
                    setPassword({
                      ...password,
                      newPassword: e.target.value,
                    });
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
              </div>

              <div className="w-full">
                <CustomInputBox
                  className="!h-[40px]"
                  label="Re-enter Password"
                  inputType={
                    viewPassword.confirmNewPassword ? "text" : "password"
                  }
                  isRightIcon={true}
                  maxLength={16}
                  visibility={viewPassword.confirmNewPassword}
                  rightIcon={
                    !viewPassword.confirmNewPassword ? CrossEyeIcon : EyeIcon
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
              </div>
            </div>
            {passwordError.newPassword !== "" && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="" width={10} height={10} />
                <span className="font-normal text-[#F35838] text-xs leading-3">
                  {passwordError.newPassword}
                </span>
              </div>
            )}
            <div>
              <OneButton
                className="rounded-lg font-Open w-full hover:shadow-md transition duration-200 text-white py-2  mt-5"
                onClick={updatePasswordData}
                text="Update Password"
                variant="primary"
                disabled={formData.email == "" || loginError.email != ""}
                backgroundColour="bg-[#160783]"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
