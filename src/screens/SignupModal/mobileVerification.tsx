import CompanyLogo from "../../assets/CompanyLogo/shipyaari icon.svg";
import CustomButton from "../../components/Button";
import MobileIcon from "../../assets/PhoneVerificationOtp/mobileVerificationIcon.svg";
import CustomInputBox from "../../components/Input";
import { useNavigate } from "react-router-dom";
import Cross from "../../assets/cross.svg";

const Index = (props:any) => {
  const navigate = useNavigate();

  const sendOtpOnClick = () => {
    navigate("/auth/verifyOtp");
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div className="product-box flex justify-between items-center">
        <img className="m-4 h-[25px] object-contain" src={CompanyLogo} />
        <img src={Cross} alt="" className="w-[24px] h-[24px] m-4" onClick={(e)=>props.closeModal()}/>
      </div>

      <div className="flex flex-col  mx-[100px] gap-y-6">
        <p className="text-center text-[22px] font-medium">Mobile Verification</p>
        <p className="text-center font-thin text-[16px]">
          Please verify your phone number to proceed further.
        </p>
      </div>
      <div className=" flex flex-col mx-20 mb-16 gap-y-6">
        <img className="h-[180px]" src={MobileIcon} />
        <CustomInputBox inputType="number" label="Mobile Number" />
        <CustomButton onClick={sendOtpOnClick} text="SEND OTP" className="text-[14px]"/>
      </div>
    </div>
  );
};

export default Index;