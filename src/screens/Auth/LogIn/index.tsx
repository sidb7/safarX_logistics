import { GoogleLogin } from "@react-oauth/google";
import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import "../../../styles/signupPages.css";
import CustomButton from "../../../components/Button/index";
import CustomInputBox from "../../../components/Input";
import { useNavigate } from "react-router-dom";
import { ResponsiveState } from "../../../utils/responsiveState";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import CloseIcon from "../../../assets/CloseIcon.svg";
import { useState } from "react";
import { POST_SIGN_IN_URL } from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signInUser } from "../../../redux/reducers/signInReducer";
import { setLocalStorage, tokenKey } from "../../../utils/utility";

const Index = () => {
  const navigate = useNavigate();
  const { isLgScreen } = ResponsiveState();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const logInOnClick = async (value: any) => {
    try {
      const { data: response } = await POST(POST_SIGN_IN_URL, value);
      dispatch(signInUser(loginCredentials));
      if (response?.success) {
        setLocalStorage(tokenKey, JSON.stringify(response?.data[0]?.token));
        navigate("/newOrder/pickup");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  const signUpOnClick = () => {
    navigate("/auth/signup");
  };

  const responseMessage = (response: any) => {
    console.log("GoogleLogin Response Message :", response);
  };

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
        <div className="lg:mx-24 lg:mt-[84px]">
          <div className="flex flex-col gap-y-8 w-full">
            <div className="product-box flex items-center lg:hidden">
              <img
                className="m-4 h-[25px] object-contain"
                src={CompanyLogo}
                alt="Company Logo"
              />
            </div>

            <div className="flex flex-col mt-7 mx-4 gap-y-6">
              <p className="text-center	 text-2xl font-medium">
                Welcome to Shipyaari
              </p>
              <p className="text-center	 font-thin">
                Fast and Easy Shipping from your doorstep to your customer's.{" "}
              </p>
            </div>
            <div className=" flex flex-col mx-4 gap-y-6">
              <CustomInputBox
                containerStyle="mt-[17px]"
                label="Email"
                onChange={(e) => {
                  // console.log("email",e.target.value)
                  setLoginCredentials({
                    ...loginCredentials,
                    email: e.target.value,
                  });
                }}
              />
              <CustomInputBox
                inputType="password"
                label="Password"
                onChange={(e) =>
                  setLoginCredentials({
                    ...loginCredentials,
                    password: e.target.value,
                  })
                }
              />
              <CustomButton
                onClick={(e: any) => logInOnClick(loginCredentials)}
                text="LOG IN"
              />
              <hr className="mb-[-30px]" />
              <div className="flex justify-center my-[-7px]">
                <button className="bg-[#FEFEFE] px-2 font-medium">OR</button>
              </div>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={responseMessage}
                  onError={() => {
                    console.log("Google Login Failed");
                  }}
                />
              </div>

              <div className="flex justify-center">
                <p className="text-[#777777] font-light">
                  Don't have an account ?
                </p>
                <button
                  type="button"
                  onClick={signUpOnClick}
                  className="text-[#004EFF]"
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
      {isLgScreen && isModalOpen && (
        <CenterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {loginComponent()}
        </CenterModal>
      )}

      {!isLgScreen && loginComponent()}
    </>
  );
};

export default Index;
