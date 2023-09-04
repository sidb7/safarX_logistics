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

const Index = () => {
  const navigate = useNavigate();
  const { isLgScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [viewPassWord, setViewPassWord] = useState(false);
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
    try {
      let payload = {
        sellerData: value,
      };
      const { data: response } = await POST(POST_SIGN_UP_URL, payload);
      dispatch(signUpUser(sellerData));
      if (response?.success === true) {
        navigate("/onboarding/sendotp");
      } else {
        toast.error(response?.message);
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

  const signUp = () => {
    return (
      <div className="relative h-full w-full pb-6 overflow-y-auto hide-scrollbar">
        {isLgScreen && modalTitle()}
        <div className="lg:mx-24 lg:mt-[84px]">
          <div className="flex flex-col xl:gap-y-9 lg:gap-y-4">
            <div className="product-box flex items-center lg:hidden">
              <img
                className="m-4 h-[25px] object-contain"
                src={CompanyLogo}
                alt="CompanyLogo"
              />
            </div>

            <div className="flex flex-col mt-7 mx-4 gap-y-3">
              <p className="text-center	leading-7 text-2xl font-bold font-Lato">
                Welcome to Shipyaari
              </p>
              <p className="text-center font-Open font-light text-sm leading-[22px]">
                Fast and Easy Shipping from your doorstep to your customer's.{" "}
              </p>
            </div>
            <div className=" flex flex-col mx-4 gap-y-7">
              <div className="grid grid-cols-2 gap-x-5">
                <div className="">
                  <CustomInputBox
                    containerStyle=""
                    // placeholder=""
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
                          firstName: "Enter Valid name",
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
                          lastName: "Enter Valid name",
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
                  label="Password"
                  isRightIcon={true}
                  visibility={viewPassWord}
                  rightIcon={viewPassWord ? EyeIcon : CrossEyeIcon}
                  setVisibility={setViewPassWord}
                  onChange={(e) => {
                    setsellerData({
                      ...sellerData,
                      password: e.target.value,
                    });
                    if (!strongpasswordRegex.test(e.target.value)) {
                      setSignUpError({
                        ...signUpError,
                        password: "Enter Valid Password",
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
                <button className="bg-[#FEFEFE] px-2 font-normal text-xs font-Open leading-4">
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
                <p className="text-[#777777] font-normal text-xs lg:text-lg leading-4 font-Open">
                  Already Have An Account ?{" "}
                </p>
                <button
                  type="button"
                  onClick={logInOnClick}
                  className="text-[#004EFF] ml-1 font-normal text-xs lg:text-lg leading-4 font-Open "
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const modalTitle = () => {
    return (
      <div className="product-box flex justify-between items-center w-full h-[60px] absolute top-0">
        <img
          className="my-auto ml-6  h-[25px] object-contain"
          src={CompanyLogo}
          alt="Company Logo"
        />
      </div>
    );
  };

  return (
    <>
      {isLgScreen && isModalOpen && (
        <CenterModal
          shouldCloseOnOverlayClick={false}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {signUp()}
        </CenterModal>
      )}

      {!isLgScreen && signUp()}
    </>
  );
};

export default Index;
