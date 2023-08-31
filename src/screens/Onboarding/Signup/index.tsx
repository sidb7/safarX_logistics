import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CustomButton from "../../../components/Button/index";
import { GoogleLogin } from "@react-oauth/google";
import CustomInputBox from "../../../components/Input";
import EyeIcon from "../../../assets/Login/eye.svg";
import CrossEyeIcon from "../../../assets/Login/crosseye.svg";
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
              <div className="flex gap-x-5">
                <CustomInputBox
                  containerStyle=""
                  // placeholder=""
                  label="First Name"
                  onChange={(e) => {
                    setsellerData({
                      ...sellerData,
                      firstName: e.target.value,
                    });
                  }}
                />
                <CustomInputBox
                  containerStyle=""
                  label="Last Name"
                  // placeholder=""
                  onChange={(e) => {
                    setsellerData({
                      ...sellerData,
                      lastName: e.target.value,
                    });
                  }}
                />
              </div>
              <CustomInputBox
                label="Email"
                // placeholder=""
                onChange={(e) => {
                  setsellerData({
                    ...sellerData,
                    email: e.target.value,
                  });
                }}
              />
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
                }}
              />
              <CustomInputBox
                label="Referal Code"
                // placeholder=""
                onChange={(e) => {
                  setsellerData({
                    ...sellerData,
                    referalCode: e.target.value,
                  });
                }}
              />
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
                <p className="text-[#777777] font-normal text-xs leading-4 font-Open">
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
