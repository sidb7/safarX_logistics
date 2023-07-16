import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CustomButton from "../../../components/Button/index";
import MobileIcon from "../../../assets/PhoneVerificationOtp/mobileVerificationIcon.svg";
import CustomInputBox from "../../../components/Input";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const sendOtpOnClick = () => {
    navigate("/auth/verifyOtp");
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div className="product-box flex items-center">
        <img className="m-4 h-[25px] object-contain" src={CompanyLogo} />
      </div>

      <div className="flex flex-col mt-7 mx-4 gap-y-6">
        <p className="text-center text-2xl font-medium">Mobile Verification</p>
        <p className="text-center font-thin">
          Please verify your phone number to proceed further.
        </p>
      </div>
      <div className=" flex flex-col mx-4 gap-y-6">
        <img className="h-[180px]" src={MobileIcon} />
        <CustomInputBox inputType="number" label="Enter Your Mobile Number" />
        <CustomButton onClick={sendOtpOnClick} text="SEND OTP" />
      </div>
    </div>
  );
};

export default Index;
