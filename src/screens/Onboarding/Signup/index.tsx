import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CustomButton from "../../../components/Button/index";
import { GoogleLogin } from "@react-oauth/google";
import CustomInputBox from "../../../components/Input";
import EyeIcon from "../../../assets/Login/eye.svg";
import CrossEyeIcon from "../../../assets/Login/crosseye.svg";
import InfoCircle from "../../../assets/info-circle.svg";
import { useNavigate } from "react-router-dom";
import { ResponsiveState } from "../../../utils/responsiveState";
import { useState } from "react";
import CenterModal from "../../../components/CustomModal/customCenterModal";
// import CloseIcon from "../../../assets/CloseIcon.svg";
import { Spinner } from "../../../components/Spinner";

import {
  POST_SIGN_UP_URL,
  POST_SIGN_UP_WITH_GOOGLE_URL,
} from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../../redux/reducers/signUpReducer";
import {
  emailRegex,
  strongpasswordRegex,
  textRegex,
  referalRegex,
} from "../../../utils/regexCheck";
import { text } from "stream/consumers";
import { sign } from "crypto";
import { setLocalStorage, tokenKey } from "../../../utils/utility";

const Index = () => {
  const navigate = useNavigate();
  const { isLgScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [viewPassWord, setViewPassWord] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [sellerData, setsellerData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    referalCode: "",
  });

  const [signUpError, setSignUpError] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    referalCode: "",
  });
  const signUpOnClick = async (value: any) => {
    if (
      signUpError.email ||
      signUpError.firstName ||
      signUpError.lastName ||
      signUpError.password ||
      signUpError.referalCode
    ) {
      toast.error("Please complete all the fields.");
      return;
    }
    try {
      let payload = {
        sellerData: value,
      };
      setLoading(true);
      const { data: response } = await POST(POST_SIGN_UP_URL, payload);

      sessionStorage.setItem("setKycValue", response?.data[0]?.nextStep?.kyc);
      dispatch(signUpUser(sellerData));
      if (response?.success === true) {
        sessionStorage.setItem("userInfo", JSON.stringify(sellerData));
        setLoading(false);
        navigate("/onboarding/sendotp");
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    } catch (error) {
      return error;
    }
  };

  const signUpWithGoogle = async (googleData: any) => {
    try {
      const payload = {
        clientId: googleData?.clientId,
        credential: googleData?.credential,
      };
      const { data: response } = await POST(
        POST_SIGN_UP_WITH_GOOGLE_URL,
        payload
      );
      if (response?.success === true) {
        sessionStorage.setItem("userInfo", JSON.stringify(response.data[0]));
        dispatch(signUpUser(response.data[0]));
        navigate("/onboarding/sendotp");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  const logInOnClick = () => {
    navigate("/auth/login");
  };
  // {
  //   loading ? (
  //     <Spinner />
  //   ) : (
  //     <img src={AiIcon} alt="Arrow" onClick={handleButtonClick} />
  //   );
  // }

  const signUp = () => {
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
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div className="relative h-full w-full pb-6 overflow-y-auto hide-scrollbar">
            {isLgScreen && modalTitle()}
            <div className="lg:mx-24 lg:mt-[18px]">
              <div className="flex flex-col xl:gap-y-9 lg:gap-y-4">
                <div className="product-box flex items-center lg:hidden">
                  <img
                    className="m-4 h-[25px] object-contain"
                    src={CompanyLogo}
                    alt="CompanyLogo"
                  />
                </div>

                <div className="flex flex-col mt-12 mx-4 gap-y-3">
                  <p className="text-center	leading-7 text-2xl font-bold font-Lato">
                    Welcome to Shipyaari
                  </p>
                  <p className="text-center font-Open font-light text-base leading-[22px] mb-7 lg:mb-0">
                    Fast and Easy Shipping from your doorstep to your
                    customer's.{" "}
                  </p>
                </div>
                <div className=" flex flex-col mx-4 gap-y-7">
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <CustomInputBox
                        containerStyle=""
                        // placeholder=""
                        tempLabel={true}
                        label="First Name"
                        maxLength={16}
                        onChange={(e) => {
                          setsellerData({
                            ...sellerData,
                            firstName: e.target.value,
                          });
                          if (!textRegex.test(e.target.value)) {
                            setSignUpError({
                              ...signUpError,
                              firstName:
                                "Enter Valid name(numbers, special characters not allowed) ",
                            });
                          } else {
                            setSignUpError({
                              ...signUpError,
                              firstName: "",
                            });
                          }
                        }}
                      />
                      {signUpError.firstName !== "" && (
                        <div className="flex items-center gap-x-1 mt-1">
                          <img src={InfoCircle} alt="" width={10} height={10} />
                          <span className="font-normal text-[#F35838] text-xs leading-3">
                            {signUpError.firstName}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <CustomInputBox
                        containerStyle=""
                        tempLabel={true}
                        label="Last Name"
                        maxLength={16}
                        // placeholder=""
                        onChange={(e) => {
                          setsellerData({
                            ...sellerData,
                            lastName: e.target.value,
                          });
                          if (!textRegex.test(e.target.value)) {
                            setSignUpError({
                              ...signUpError,
                              lastName:
                                "Enter Valid name(numbers, special characters not allowed) ",
                            });
                          } else {
                            setSignUpError({
                              ...signUpError,
                              lastName: "",
                            });
                          }
                        }}
                      />
                      {signUpError.lastName !== "" && (
                        <div className="flex items-center gap-x-1 mt-1">
                          <img src={InfoCircle} alt="" width={10} height={10} />
                          <span className="font-normal text-[#F35838] text-xs leading-3">
                            {signUpError.lastName}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <CustomInputBox
                      label="Email"
                      // placeholder=""
                      inputClassName={` ${
                        signUpError.email !== "" && "!border-[#F35838]"
                      } `}
                      tempLabel={true}
                      onChange={(e) => {
                        setsellerData({
                          ...sellerData,
                          email: e.target.value,
                        });
                        if (!emailRegex.test(e.target.value)) {
                          setSignUpError({
                            ...signUpError,
                            email: "Enter Valid Email",
                          });
                        } else {
                          setSignUpError({
                            ...signUpError,
                            email: "",
                          });
                        }
                      }}
                    />
                    {signUpError.email !== "" && (
                      <div className="flex items-center gap-x-1 mt-1">
                        <img src={InfoCircle} alt="" width={10} height={10} />
                        <span className="font-normal text-[#F35838] text-xs leading-3">
                          {signUpError.email}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <CustomInputBox
                      inputType={viewPassWord ? "text" : "password"}
                      tempLabel={true}
                      label="Password"
                      isRightIcon={true}
                      visibility={viewPassWord}
                      onClick={() => {}}
                      rightIcon={viewPassWord ? EyeIcon : CrossEyeIcon}
                      setVisibility={setViewPassWord}
                      onChange={(e) => {
                        setsellerData({
                          ...sellerData,
                          password: e.target.value,
                        });
                        if (
                          !strongpasswordRegex.test(e.target.value) ||
                          sellerData.password.length < 8 ||
                          sellerData.password.length > 16
                        ) {
                          const passwordError = validatePassword(
                            e.target.value
                          );

                          setSignUpError({
                            ...signUpError,
                            password: passwordError,
                          });
                        } else {
                          setSignUpError({
                            ...signUpError,
                            password: "",
                          });
                        }
                      }}
                    />
                    {signUpError.password !== "" && (
                      <div className="flex items-center gap-x-1 mt-1">
                        <img src={InfoCircle} alt="" width={10} height={10} />
                        <span className="font-normal text-[#F35838] text-xs leading-3">
                          {signUpError.password}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <CustomInputBox
                      label="Referal Code"
                      maxLength={20}
                      tempLabel={true}
                      // placeholder=""
                      onChange={(e) => {
                        setsellerData({
                          ...sellerData,
                          referalCode: e.target.value,
                        });
                        if (!referalRegex.test(e.target.value)) {
                          setSignUpError({
                            ...signUpError,
                            referalCode: "Enter Valid Code",
                          });
                        } else {
                          setSignUpError({
                            ...signUpError,
                            referalCode: "",
                          });
                        }
                      }}
                    />
                    {signUpError.referalCode !== "" && (
                      <div className="flex items-center gap-x-1 mt-1">
                        <img src={InfoCircle} alt="" width={10} height={10} />
                        <span className="font-normal text-[#F35838] text-xs leading-3">
                          {signUpError.referalCode}
                        </span>
                      </div>
                    )}
                  </div>

                  <CustomButton
                    onClick={(e: any) => signUpOnClick(sellerData)}
                    text="SIGN UP"
                  />
                  <hr className="mb-[-30px] mt-2" />
                  <div className="flex justify-center my-[-7px]">
                    <button className="bg-[#FEFEFE] px-2 font-normal text-[10px] font-Open leading-4">
                      OR
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <GoogleLogin
                      text="continue_with"
                      onSuccess={(googleData) => signUpWithGoogle(googleData)}
                      onError={() => {}}
                    />
                  </div>
                  <div className="flex justify-center">
                    <p className="text-[#777777] font-normal text-xs lg:text-sm leading-4 font-Open">
                      Already Have An Account ?{" "}
                    </p>
                    <button
                      type="button"
                      onClick={logInOnClick}
                      className="text-[#004EFF] ml-1 font-normal text-xs leading-4 font-Open "
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const modalTitle = () => {
    return (
      <div className="product-box sticky z-10 bg-white flex justify-between items-center w-full h-[60px] top-0">
        <img
          className="my-auto ml-6  h-[25px] object-contain"
          src={CompanyLogo}
          alt="Company Logo"
        />
      </div>
    );
  };

  const renderSignUp = () => {
    if (isLgScreen && isModalOpen) {
      return (
        <CenterModal
          shouldCloseOnOverlayClick={false}
          isOpen={isModalOpen}
          // onRequestClose={() => setIsModalOpen(false)}
        >
          {signUp()}
        </CenterModal>
      );
    } else {
      return loading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      ) : (
        signUp()
      );
    }
  };
  return <>{renderSignUp()}</>;
};

export default Index;
