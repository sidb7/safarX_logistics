import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CloseIcon from "./../../../assets/CloseIcon.svg";
import CustomButton from "../../../components/Button/index";
import MobileIcon from "../../../assets/PhoneVerificationOtp/mobileVerificationIcon.svg";
import CustomInputBox from "../../../components/Input";
import { useNavigate } from "react-router-dom";
import { ResponsiveState } from "../../../utils/responsiveState";
import { useState } from "react";
import CenterModal from "../../../components/CustomModal/customCenterModal";

const Index = () => {
  const navigate = useNavigate();
  const { isLgScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const sendOtpOnClick = () => {
    navigate("/auth/verifyOtp");
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

  const mobileVerification = () => {
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
                Please verify your phone number to proceed further.
              </p>
            </div>
            <div className=" flex flex-col mx-4 gap-y-6">
              <img className="h-[180px]" src={MobileIcon} alt="MobileIcon" />
              <CustomInputBox
                inputType="number"
                label="Enter Your Mobile Number"
              />
              <CustomButton onClick={sendOtpOnClick} text="SEND OTP" />
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
          {mobileVerification()}
        </CenterModal>
      )}

      {!isLgScreen && mobileVerification()}
    </>
  );
};

export default Index;
