import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CustomButton from "../../../components/Button/index";
import { GoogleLogin } from "@react-oauth/google";
import CustomInputBox from "../../../components/Input";
import { useNavigate } from "react-router-dom";
import { ResponsiveState } from "../../../utils/responsiveState";
import { useState } from "react";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import CloseIcon from "../../../assets/CloseIcon.svg";
import { POST_SIGN_UP_URL } from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../../redux/reducers/signUpReducer";

const Index = () => {
  const navigate = useNavigate();
  const { isLgScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const dispatch = useDispatch();

  const [sellerData, setsellerData] = useState({
    emailId: "",
    firstName: "",
    lastName: "",
    password: "",
    referalCode: "",
    mobileNo: 0,
  });

  const signUpOnClick = async (value: any) => {
    try {
      let payload = {
        sellerData: value,
      };
      const { data: response } = await POST(POST_SIGN_UP_URL, payload);
      dispatch(signUpUser(sellerData));
      if (response?.success === true) {
        navigate("/auth/sendOtp");
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

  const responseMessage = (response: any) => {
    console.log("response data", response);
  };

  const signUp = () => {
    return (
      <div className="relative h-full w-full">
        {isLgScreen && modalTitle()}
        <div className="lg:mx-24 lg:mt-[84px]">
          <div className="flex flex-col gap-y-8">
            <div className="product-box flex items-center lg:hidden">
              <img
                className="m-4 h-[25px] object-contain"
                src={CompanyLogo}
                alt="CompanyLogo"
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
            <div className=" flex flex-col mx-4  gap-y-6">
              <div className="flex gap-x-6">
                <CustomInputBox
                  containerStyle=""
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
                onChange={(e) => {
                  setsellerData({
                    ...sellerData,
                    emailId: e.target.value,
                  });
                }}
              />
              <CustomInputBox
                inputType="password"
                label="Password"
                onChange={(e) => {
                  setsellerData({
                    ...sellerData,
                    password: e.target.value,
                  });
                }}
              />
              <CustomInputBox
                label="Referal Code"
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
              <hr className="mb-[-30px]" />
              <div className="flex justify-center my-[-7px]">
                <button className="bg-[#FEFEFE] px-2 font-medium">OR</button>
              </div>
              <div className="flex justify-center">
                <GoogleLogin
                  text="signup_with"
                  onSuccess={responseMessage}
                  onError={() => {
                    console.log("Google Signup Failed");
                  }}
                />
              </div>
              <div className="flex justify-center">
                <p className="text-[#777777] font-light">
                  Already Have An Account ?{" "}
                </p>
                <button
                  type="button"
                  onClick={logInOnClick}
                  className="text-[#004EFF]"
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
        <img
          className="my-auto mr-6"
          src={CloseIcon}
          alt="Close"
          onClick={() => setIsModalOpen(false)}
        />
      </div>
    );
  };

  return (
    <>
      {isLgScreen && isModalOpen && (
        <CenterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {signUp()}
        </CenterModal>
      )}

      {!isLgScreen && signUp()}
    </>
  );
};

export default Index;
