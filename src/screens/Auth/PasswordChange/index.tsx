import React, { useEffect, useState } from "react";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import FormForChangePassword from "./formForChangePassword";
import {
  constructNavigationObject,
  getQueryJson,
} from "../../../utils/utility";
import { CHANGE_PASSWORD, REACT_APP_GTM_ID } from "../../../utils/ApiUrls";
import { ResponsiveState } from "../../../utils/responsiveState";
import InformativeIcon from "../../../assets/I icon.svg";
import EyeIcon from "../../../assets/Login/eye.svg";
import CrossEyeIcon from "../../../assets/Login/crosseye.svg";
import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import InfoCircle from "../../../assets/info-circle.svg";
import CustomInputBox from "../../../components/Input";
import { socketCallbacks } from "../../../Socket";
import { strongpasswordRegex } from "../../../utils/regexCheck";
import CustomButton from "../../../components/Button";
import { setLocalStorage, tokenKey } from "../../../utils/utility";
import axios from "axios";
import toast from "react-hot-toast";
import { signInUser } from "../../../redux/reducers/signInReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface PasswordVisibility {
  newPassword: boolean;
  confirmNewPassword: boolean;
}

function ChangePasswordv2() {
  const [forgotPasswordModal, setForgotPasswordModal] = useState(true);
  const { email, token } = getQueryJson();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      localStorage.setItem("setKycValue", response?.data[0]?.nextStep?.kyc);

      let signInUserReducerDetails = {
        email: email,
        name: response?.data[0]?.name,
      };
      //commented as passing the name at signin time
      // dispatch(signInUser(loginCredentials));
      dispatch(signInUser(signInUserReducerDetails));

      if (response?.success) {
        localStorage.setItem("sellerId", response?.data[0]?.sellerId);
        localStorage.setItem("userName", response?.data[0]?.name);
        console.log("userInfo", JSON.stringify(response.data[0]));
        localStorage.setItem("userInfo", JSON.stringify(response.data[0]));
        setLocalStorage(`${response?.data[0]?.sellerId}_${tokenKey}`, token);

        // console.log(
        //   "🚀 ~ file: index.tsx:87 ~ logInOnClick ~ response?.data[0]?.sellerId:",
        //   response?.data[0]
        // );

        window?.dataLayer?.push({
          event: "login",
          seller_email: response?.data[0]?.email,
          sellerId: response?.data[0]?.sellerId,
          seller_name: response?.data[0]?.name,
          seller_kyc: response?.data[0]?.nextStep.kyc,
          seller_bank_verification_done: response?.data[0]?.nextStep.bank,
          isReturningUser: response?.data[0]?.isReturningUser,
        });

        window.gtag("config", REACT_APP_GTM_ID, {
          user_id: response?.data[0]?.sellerId,
        });

        const tokenV1 = localStorage.getItem("sellerId")
          ? `${localStorage.getItem(
              "sellerId"
            )}_891f5e6d-b3b3-4c16-929d-b06c3895e38d`
          : "";

        if (tokenV1 !== "") {
          console.log("socketConnectedAfterlogin");
          socketCallbacks.connectSocket(dispatch);
        }

        // redirect based on qna and kyc done or not
        if (response?.data?.[0]?.nextStep?.qna === false) {
          const navigationObject = constructNavigationObject(
            "/onboarding/questionnaire/question1",
            window.location.search
          );
          navigate(navigationObject);
        } else if (response?.data?.[0]?.nextStep?.kyc === false) {
          const navigationObject = constructNavigationObject(
            "/onboarding/kyc-type",
            window.location.search
          );
          navigate(navigationObject);
        } else {
          const navigationObject = constructNavigationObject(
            "/dashboard/overview",
            window.location.search
          );
          navigate(navigationObject);
        }
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

  useEffect(() => {
    if (token !== undefined) {
      setForgotPasswordModal(true);
    }
  }, [token]);

  const ChangePassword = () => {
    return (
      <div
        className={` ${
          isMdScreen ? "m-auto  !w-[500px]" : ""
        } flex flex-col relative lg:px-0 lg:gap-y-0`}
      >
        <div className={`rounded-lg ${isMdScreen ? "custom_shadow" : ""}`}>
          <div className="flex flex-col gap-y-8 w-full">
            <div className="product-box  z-10 bg-white flex justify-between w-full h-[60px] top-0">
              <img
                className="my-auto lg:ml-6  h-[25px] object-contain"
                src={CompanyLogo}
                alt="Company Logo"
              />
            </div>

            <div className="flex flex-col mx-2  gap-y-4 lg:gap-y-2 ">
              <p className="text-center text-[22px] font-bold font-Lato leading-7 md:mt-10 lg:mt-0">
                Set Your Password
              </p>
              <p className="text-center font-Open font-light leading-[22px]">
                Enter New Password.
              </p>
            </div>

            {/* <div className="lg:mt-[50px]"> */}
            <div className="flex flex-col mx-4 lg:mx-16 lg:mt-[28px] gap-y-6">
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
                inputType={
                  viewPassword.confirmNewPassword ? "text" : "password"
                }
                isRightIcon={true}
                maxLength={16}
                visibility={viewPassword.confirmNewPassword}
                rightIcon={
                  viewPassword.confirmNewPassword ? CrossEyeIcon : EyeIcon
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
                text="Save"
                onClick={updatePasswordData}
                className={`border border-white py-6 md:mb-[50px]`}
                // disabled={emailVerified}
              />
            </div>
          </div>

          {/* </div> */}
        </div>
      </div>
    );
  };

  return (
    <div className="border">
      {isMdScreen && (
        <div className="flex justify-center items-center h-screen">
          {ChangePassword()}
        </div>
      )}
      {!isMdScreen && ChangePassword()}
    </div>
  );
}

export default ChangePasswordv2;
