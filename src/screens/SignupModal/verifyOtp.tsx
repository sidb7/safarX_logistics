import CompanyLogo from "../../assets/CompanyLogo/shipyaari icon.svg";
import CustomButton from "../../components/Button";
import MobileIcon from "../../assets/PhoneVerificationOtp/mobileVerificationIcon.svg";
import CustomInputBox from "../../components/Input";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import OtpInput from "react-otp-input";             
import "../../styles/otpStyle.css";
import Cross from "../../assets/cross.svg";

const Index = (props:any) => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const offersOnClick = () => {
    navigate("/auth/offers");
  };

  const contactNumber = "+91-987654321";

  return (
    <div className="flex flex-col gap-y-8">
      <div className="product-box flex justify-between items-center">
        <img className="m-4 h-[25px] object-contain" src={CompanyLogo} />
        <img src={Cross} alt="" className="w-[24px] h-[24px] m-4" onClick={(e)=>props.closeModal()}/>
      </div>

      <div className="flex flex-col  mx-[100px] gap-y-6">
        <p className="text-center text-[22px] font-medium">Mobile Verification</p>
        <p className="text-center font-thin text-[16px]">
          Enter The OTP Sent To <span className="font-normal">{contactNumber}.</span>
        </p>
      </div>

      <div className=" flex flex-col mx-20 mb-10 gap-y-6">
        <img className="h-[180px] " src={MobileIcon} />

        <div className="flex justify-center">
          {/* <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          /> */}
           <CustomInputBox label="Enter OTP" className="!w-[300px]"/>
        </div>

        <div className="flex justify-center">
            <div className="">
                <p className="text-center text-[12px]">00: 30sec</p>
                <div className="mt-2 flex">
                    <p className="text-[#777777] font-light text-[12px] text-center">Didn't Receive Code ?</p>
                    <button type="button" className="text-[#004EFF] text-[12px]">
                        Resend
                    </button>
                </div>
                
            </div>
            
        </div>

        <CustomButton onClick={offersOnClick} text="DONE" className="text-[14px]"/>
      </div>
    </div>
  );
};

export default Index;