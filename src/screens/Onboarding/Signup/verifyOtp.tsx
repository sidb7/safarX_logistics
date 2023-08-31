import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import MobileGif from "../../../assets/OrderCard/Gif.gif";
import CustomButton from "../../../components/Button/index";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../../styles/otpStyle.css";
import { ResponsiveState } from "../../../utils/responsiveState";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import CustomInputBox from "../../../components/Input";
import { useSelector } from "react-redux";
import { POST } from "../../../utils/webService";
import { POST_VERIFY_OTP } from "../../../utils/ApiUrls";
import { toast } from "react-toastify";
import { setLocalStorage, tokenKey } from "../../../utils/utility";

const Index = () => {
  const navigate = useNavigate();
  const { isLgScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [mobileNo, setMobileNo] = useState<any>();
  const [otp, setOtp] = useState({
    loginOtp: "",
  });

  const signUpUser = useSelector((state: any) => state.signup);

  useEffect(() => {
    setMobileNo(localStorage.getItem("mobile"));
  }, []);

  const onClickVerifyOtp = async () => {
    try {
      let payload = {
        email: signUpUser.email,
        otp: otp.loginOtp,
      };
      const { data: response } = await POST(POST_VERIFY_OTP, payload);
      if (response?.success === true) {
        setLocalStorage(tokenKey, response?.data[0]?.token);
        navigate("/onBoarding/get-started");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  const modalTitle = () => {
    return (
      <div className="product-box flex justify-between items-center w-full h-[60px] absolute top-0">
        <img
          className="my-auto ml-6  h-[25px] object-contain"
          src={CompanyLogo}
          alt="Company Logo"
        />
        {/* <img
          className="my-auto mr-6"
          src={CloseIcon}
          alt="Close"
          onClick={() => setIsModalOpen(false)}
        /> */}
      </div>
    );
  };

  const verifyOtp = () => {
    return (
      <div className="relative h-full w-full">
        {isLgScreen && modalTitle()}
        <div className="xl:mx-24 lg:mt-[84px]">
          <div className="flex flex-col">
            <div className="product-box flex items-center lg:hidden">
              <img
                className="m-4 h-[25px] object-contain"
                src={CompanyLogo}
                alt="CompanyLogo"
              />
            </div>

            <div className="flex flex-col mx-4 mt-6  lg:mt-12 gap-y-3">
              <p className="text-center text-[22px] text-[#323232] font-bold font-Lato leading-7 ">
                Mobile Verification
              </p>

              <p className="text-center text-base text-[#494949] font-Open font-light leading-[22px] ">
                Enter The OTP Sent To{" "}
                <span className="text-[#494949] font-Open text-base font-semibold leading-[22px]">
                  +91 {mobileNo}{" "}
                </span>
              </p>
            </div>

            <div className=" flex flex-col mx-4">
              <div className="flex justify-center">
                <img
                  className="h-[180px] w-[180px] object-contain "
                  src={MobileGif}
                  alt="MobileIcon"
                />
              </div>

              <div className="flex justify-center">
                <CustomInputBox
                  containerStyle="mt-[32px]"
                  label="Enter OTP"
                  onChange={(e) => {
                    setOtp({ ...otp, loginOtp: e.target.value });
                  }}
                />
              </div>
              <div className="flex justify-center">
                <p className="mt-3 text-[#494949] font-Open text-xs font-semibold leading-4 items-center">
                  00:30sec
                </p>
              </div>

              <div className="flex justify-center mt-4">
                <p className="text-[#494949] font-Open font-normal text-xs leading-4">
                  Didn't Receive Code ?
                </p>
                <button
                  type="button"
                  className="text-[#004EFF] font-Open font-semibold ml-1 text-xs leading-4"
                >
                  Resend
                </button>
              </div>

              <CustomButton
                onClick={onClickVerifyOtp}
                text="DONE"
                className="mt-4"
              />
            </div>
          </div>
        </div>
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
          {verifyOtp()}
        </CenterModal>
      )}

      {!isLgScreen && verifyOtp()}
    </>
  );
};

export default Index;
