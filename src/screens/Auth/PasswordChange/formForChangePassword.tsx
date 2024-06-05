import React, { useState } from "react";
import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CustomInputBox from "../../../components/Input";
import CustomButton from "../../../components/Button";
import InformativeIcon from "../../../assets/I icon.svg";
import EyeIcon from "../../../assets/Login/eye.svg";
import CrossEyeIcon from "../../../assets/Login/crosseye.svg";
import InfoCircle from "../../../assets/info-circle.svg";
import { strongpasswordRegex } from "../../../utils/regexCheck";
import toast from "react-hot-toast";
import { POST } from "../../../utils/webService";
import { tokenKey } from "../../../utils/utility";
import axios from "axios";
import { CHANGE_PASSWORD } from "../../../utils/ApiUrls";
import { ResponsiveState } from "../../../utils/responsiveState";

interface ITypeProps {
  token?: any;
  email?: any;
}

interface PasswordVisibility {
  newPassword: boolean;
  confirmNewPassword: boolean;
}

function FormForChangePassword(props: ITypeProps) {
  const { token, email } = props;

  const [passwordError, setPasswordError] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const { isLgScreen, isMdScreen, isMobileScreen } = ResponsiveState();
  const [viewPassword, setViewPassword] = useState<PasswordVisibility>({
    newPassword: false,
    confirmNewPassword: false,
  });

  const [password, setPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const createHeader = (_URL: string, options = {}) => {
    let header = {
      Accept: "/",
      Authorization: `Bearer ${token}`,
    };
    options = { ...options, headers: header };
    return { URL: _URL, options: options };
  };

  const POST = async (_URL: string, data = {}, _options?: any) => {
    let { URL, options } = createHeader(_URL, _options);
    try {
      const response = await axios.post(URL, data, options);
      return response;
    } catch (error: any) {
      return error.response;
    }
  };

  const updatePasswordData = async () => {
    try {
      if (password?.newPassword !== password?.confirmNewPassword) {
        return toast.error("Passwords do not match.");
      }
      const updatedFormData = {
        password: password.newPassword,
      };

      const { data: response } = await POST(CHANGE_PASSWORD, updatedFormData);

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
    <div
      className={` ${
        isMdScreen ? "m-auto  !w-[500px]" : ""
      } flex flex-col relative lg:px-0 lg:gap-y-0`}
    >
      <div className={`rounded-lg ${isMdScreen ? "custom_shadow" : ""}`}>
        <img
          className="my-auto lg:ml-6  h-[25px] object-contain"
          src={CompanyLogo}
          alt="Company Logo"
        />
      </div>

      <div className="lg:mt-[50px]">
        <div className="flex flex-col mx-2  gap-y-4 lg:gap-y-8 ">
          <p className="text-center text-[22px] font-bold font-Lato leading-7 md:mt-10 lg:mt-0">
            Set Your Password
          </p>
          <p className="text-center font-Open font-light leading-[22px]">
            Enter Your Password.
          </p>
        </div>

        <div className="flex flex-col mx-4 lg:mx-24 lg:mt-[28px] gap-y-6">
          <div>
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
              rightIcon={viewPassword.newPassword ? CrossEyeIcon : EyeIcon}
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
            {passwordError.newPassword !== "" && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="" width={10} height={10} />
                <span className="font-normal text-[#F35838] text-xs leading-3">
                  {passwordError.newPassword}
                </span>
              </div>
            )}
          </div>

          <CustomInputBox
            label="Re-enter Password"
            inputType={viewPassword.confirmNewPassword ? "text" : "password"}
            isRightIcon={true}
            maxLength={16}
            visibility={viewPassword.confirmNewPassword}
            rightIcon={viewPassword.confirmNewPassword ? CrossEyeIcon : EyeIcon}
            setVisibility={() => togglePasswordVisibility("confirmNewPassword")}
            onClick={() => {}}
            onChange={(e) => {
              setPassword({
                ...password,
                confirmNewPassword: e.target.value,
              });
            }}
          />

          <CustomButton
            text="Change Password"
            onClick={updatePasswordData}
            className={`border border-white py-6`}
            // disabled={emailVerified}
          />
        </div>
      </div>
    </div>
  );
}

export default FormForChangePassword;
