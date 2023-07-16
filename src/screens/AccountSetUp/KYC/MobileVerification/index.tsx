import React from "react";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import MobileVerificationIcon from "../../../../assets/common/MobileVerify.gif";
import { useNavigate } from "react-router-dom";
import Otp from "./otp";

type Props = {};

const Index = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="px-5">
      <WelcomeHeader
        title="Mobile Verification"
        content="Enter the OTP sent to +91-8976500001"
      />
      <div className="mt-[35px]">
        <div className="flex flex-col items-center  mb-10">
          <img
            src={MobileVerificationIcon}
            alt=""
            width={180}
            height={180}
            className="mb-8"
          />
          <div className="mb-4">
            <Otp />
          </div>
          <p className="font-semibold text-[12px] text-[#494949] mb-4">
            00:30 sec
          </p>
          <div className="flex items-center gap-x-2 font-normal text-[12px] mb-4">
            <p className="text-[#494949] ">Don't receive code ?</p>
            <p className="text-[#004EFF]">Resend</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col   mb-12">
        <ServiceButton
          text="DONE"
          className="bg-[#1C1C1C] text-white w-full mb-5"
          onClick={() => {
            navigate("/account/kyc-terms");
          }}
        />
      </div>
    </div>
  );
};

export default Index;
