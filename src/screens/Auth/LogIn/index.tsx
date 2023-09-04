import { GoogleLogin } from "@react-oauth/google";
import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import "../../../styles/signupPages.css";
import EyeIcon from "../../../assets/Login/eye.svg";
import CrossEyeIcon from "../../../assets/Login/crosseye.svg";
import CustomButton from "../../../components/Button/index";
import CustomInputBox from "../../../components/Input";
import { useNavigate } from "react-router-dom";
import { ResponsiveState } from "../../../utils/responsiveState";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import CloseIcon from "../../../assets/CloseIcon.svg";
import InputBox from "../../../components/InputBox/index";
import { useEffect, useState } from "react";
import {
  POST_SIGN_IN_URL,
  POST_SIGN_IN_WITH_GOOGLE_URL,
  VALIDATE_USER_TOKEN,
} from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signInUser } from "../../../redux/reducers/signInReducer";
import InfoCircle from "../../../assets/info-circle.svg";
import {
  getLocalStorage,
  setLocalStorage,
  tokenKey,
} from "../../../utils/utility";
import { emailRegex, strongpasswordRegex } from "../../../utils/regexCheck";

const Index = () => {
  const navigate = useNavigate();
  const { isLgScreen } = ResponsiveState();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showBootScreen, setShowBootScreen] = useState(true);
  const [viewPassWord, setViewPassWord] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
  });

  const logInOnClick = async (value: any) => {
    const { data: response } = await POST(POST_SIGN_IN_URL, value);
    dispatch(signInUser(loginCredentials));
    if (response?.success) {
      setLocalStorage(tokenKey, response?.data[0]?.token);

      // redirect based on qna and kyc done or not
      if (response?.data?.[0]?.nextStep?.qna === false) {
        navigate("/onboarding/questionnaire/question1");
      } else if (response?.data?.[0]?.nextStep?.kyc === false) {
        navigate("/onboarding/kyc-type");
      } else {
        navigate("/home/overview");
      }
    } else {
      toast.error(response?.message);
    }
  };

  const signUpOnClick = () => {
    navigate("/onboarding/signup");
  };

  const signInWithGoogle = async (googleData: any) => {
    const payload = {
      clientId: googleData?.clientId,
      credential: googleData?.credential,
    };
    const { data: response } = await POST(
      POST_SIGN_IN_WITH_GOOGLE_URL,
      payload
    );
    dispatch(signInUser(loginCredentials));
    if (response?.success) {
      setLocalStorage(tokenKey, response?.data[0]?.token);
      navigate("/home/overview");
    } else {
      toast.error(response?.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowBootScreen(false);
    }, 2000);
    (async () => {
      const { data } = await POST(VALIDATE_USER_TOKEN);
      if (data?.success) {
        navigate("/home/overview");
      }
    })();
  }, []);

  const modalTitle = () => {
    return (
      <div className="product-box flex justify-between items-center w-full h-[60px] absolute top-0">
        <img
          className="my-auto ml-6  h-[25px] object-contain"
          src={CompanyLogo}
          alt="Company Logo"
        />
        <img
          className="my-auto mr-6"
          src={CloseIcon}
          alt="Close"
          onClick={() => setIsModalOpen(false)}
        />
      </div>
    );
  };

  const loginComponent = () => {
    return (
      <div className="relative h-full w-full">
        {isLgScreen && modalTitle()}
        <div className="lg:mx-24 lg:mt-[110px]">
          <div className="flex flex-col gap-y-8 w-full">
            <div className="product-box flex items-center lg:hidden">
              <img
                className="m-4 h-[25px] object-contain"
                src={CompanyLogo}
                alt="Company Logo"
              />
            </div>

            <div className="flex flex-col mt-7 mx-4 gap-y-6">
              <p className="text-center	 leading-7 text-2xl font-bold font-Lato">
                Welcome to Shipyaari
              </p>
              <p className="text-center font-Open font-light text-sm leading-[22px]">
                Fast and Easy Shipping from your doorstep to your customer's.{" "}
              </p>
            </div>
            <div className=" flex flex-col mx-4 gap-y-6">
              <div>
                <CustomInputBox
                  containerStyle="mt-[17px]"
                  label="Email"
                  onChange={(e) => {
                    // console.log("email",e.target.value)
                    setLoginCredentials({
                      ...loginCredentials,
                      email: e.target.value,
                    });
                    if (!emailRegex.test(e.target.value)) {
                      setLoginError({
                        ...loginError,
                        email: "Incorrect Email",
                      });
                    } else {
                      setLoginError({
                        ...loginError,
                        email: "",
                      });
                    }
                  }}
                />
                {loginError.email !== "" && (
                  <div className="flex items-center gap-x-1 mt-1">
                    <img src={InfoCircle} alt="" width={10} height={10} />
                    <span className="font-normal text-[#F35838] text-xs leading-3">
                      {loginError.email}
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
                    setLoginCredentials({
                      ...loginCredentials,
                      password: e.target.value,
                    });
                    if (!strongpasswordRegex.test(e.target.value)) {
                      setLoginError({
                        ...loginError,
                        password: "Incorrect Password",
                      });
                    } else {
                      setLoginError({
                        ...loginError,
                        password: "",
                      });
                    }
                  }}
                />
                {loginError.password !== "" && (
                  <div className="flex items-center gap-x-1 mt-1">
                    <img src={InfoCircle} alt="" width={10} height={10} />
                    <span className="font-normal text-[#F35838] text-xs leading-3">
                      {loginError.password}
                    </span>
                  </div>
                )}
              </div>

              <CustomButton
                onClick={(e: any) => logInOnClick(loginCredentials)}
                text="LOG IN"
              />
              <hr className="mb-[-30px] mt-2" />
              <div className="flex justify-center my-[-4px]">
                <button className="bg-[#FEFEFE]  px-2 font-normal text-xs font-Open leading-4">
                  OR
                </button>
              </div>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={(googleData) => signInWithGoogle(googleData)}
                  onError={() => {
                    console.log("Google Login Failed");
                  }}
                />
              </div>

              <div className="flex justify-center">
                <p className="text-[#777777] font-normal text-xs lg:text-lg leading-4 font-Open">
                  Don't have an account ?
                </p>
                <button
                  type="button"
                  onClick={signUpOnClick}
                  className="text-[#004EFF] ml-1 font-normal text-xs lg:text-lg leading-4 font-Open"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {showBootScreen ? (
        <div className="flex items-center justify-center h-screen">
          <img
            className="animate-bounce object-contain"
            src={CompanyLogo}
            alt=""
          />
        </div>
      ) : (
        <>
          {isLgScreen && isModalOpen && (
            <CenterModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            >
              {loginComponent()}
            </CenterModal>
          )}

          {!isLgScreen && loginComponent()}
        </>
      )}
    </>
  );
};

export default Index;
