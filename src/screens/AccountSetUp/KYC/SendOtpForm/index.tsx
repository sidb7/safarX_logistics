import React from "react";
import WelcomeHeader from "../welcomeHeader";
import CustomInputBox from "../../../../components/InputBox";
import ServiceButton from "../../../../components/Button/ServiceButton";
import { useNavigate } from "react-router-dom";

type Props = {};

const Index = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className=" px-5">
      <WelcomeHeader
        title="Welcome to Shipyaari"
        content="Kindly complete your KYC"
      />

      <div className="flex flex-col items-center gap-y-5 mb-6">
        <CustomInputBox label="Enter Aadhar Number" />
        <CustomInputBox label="Enter Pan Number" />
      </div>
      <div className="flex flex-col  pb-12">
        <ServiceButton
          text="SEND OTP"
          className="bg-[#1C1C1C] text-white w-full mb-5"
          onClick={() => {
            navigate("/account/kyc-mobile-verify");
          }}
        />
      </div>
    </div>
  );
};

export default Index;
