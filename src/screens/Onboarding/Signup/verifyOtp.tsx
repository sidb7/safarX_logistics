import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CloseIcon from "./../../../assets/CloseIcon.svg";
import CustomButton from "../../../components/Button/index";
import MobileIcon from "../../../assets/PhoneVerificationOtp/mobileVerificationIcon.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import OtpInput from "react-otp-input";
import "../../../styles/otpStyle.css";
import { ResponsiveState } from "../../../utils/responsiveState";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import CustomInputBox from "../../../components/Input";

const Index = () => {
  const navigate = useNavigate();
  const { isLgScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [otp, setOtp] = useState({
    loginOtp: "",
  });
  // console.log("otp", otp);
  const offersOnClick = () => {
    navigate("/onboarding/offers");
  };

  const contactNumber = "+91-987654321";

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

  const verifyOtp = () => {
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
              <p className="text-center text-2xl font-medium">
                Mobile Verification
              </p>
              <p className="text-center font-thin">
                Enter The OTP Sent To {contactNumber}.
              </p>
            </div>

            <div className=" flex flex-col mx-4 gap-y-6">
              <img className="h-[180px] " src={MobileIcon} alt="MobileIcon" />

              <div className="flex justify-center">
                <CustomInputBox
                  containerStyle="mt-[17px]"
                  label="Enter OTP"
                  onChange={(e) => {
                    setOtp({ ...otp, loginOtp: e.target.value });
                  }}
                />
              </div>

              <div className="flex justify-center">
                <p className="text-[#777777] font-light">
                  Didn't Receive Code ?
                </p>
                <button type="button" className="text-[#004EFF]">
                  Resend
                </button>
              </div>

              <CustomButton onClick={offersOnClick} text="DONE" />
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
          {verifyOtp()}
        </CenterModal>
      )}

      {!isLgScreen && verifyOtp()}
    </>
  );
};

export default Index;
