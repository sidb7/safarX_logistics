import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CustomButton from "../../../components/Button/index";
import MobileIcon from "../../../assets/PhoneVerificationOtp/mobileVerificationIcon.svg";
import CustomInputBox from "../../../components/Input";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import "../../../styles/otpStyle.css";

const Index = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const offersOnClick = () => {
    navigate("/auth/offers");
  };

  const contactNumber = "+91-987654321";

  return (
    <div className="flex flex-col gap-y-8">
      <div className="product-box flex items-center">
        <img className="m-4 h-[25px] object-contain" src={CompanyLogo} />
      </div>

      <div className="flex flex-col mt-7 mx-4 gap-y-6">
        <p className="text-center text-2xl font-medium">Mobile Verification</p>
        <p className="text-center font-thin">
          Enter The OTP Sent To {contactNumber}.
        </p>
      </div>

      <div className=" flex flex-col mx-4 gap-y-6">
        <img className="h-[180px] " src={MobileIcon} />

        <div className="flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <div className="flex justify-center">
          <p className="text-[#777777] font-light">Didn't Receive Code ?</p>
          <button type="button" className="text-[#004EFF]">
            Resend
          </button>
        </div>

        <CustomButton onClick={offersOnClick} text="DONE" />
      </div>
    </div>
  );
};

export default Index;
