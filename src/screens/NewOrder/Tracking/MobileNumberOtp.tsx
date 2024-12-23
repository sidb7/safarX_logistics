import React from "react";
import CrossIcon from "../../../assets/CloseIcon.svg";
import ShipyaaroLogo from "../../../assets/Shipyaari_full_color rgb.svg";
import CustomInputBox from "../../../components/Input/index";
import OneButton from "../../../components/Button/OneButton";

type Props = {};

const MobileNumberOtp = (props: Props) => {
  return (
    <div className="relative h-full w-full">
      {/* Header Section */}

      <div className="flex justify-between my-4 shadow-lg pb-4">
        <img
          className="my-auto ml-6 h-[30px] object-contain"
          src={ShipyaaroLogo}
          alt="Company Logo"
        />
        <img
          className="my-auto mr-6 cursor-pointer"
          src={CrossIcon}
          alt="Close"
          onClick={() => {}}
        />
      </div>

      {/* Content Section */}

      <div className="flex flex-col justify-center items-center px-32">
        <p className="font-medium text-xl text-center mt-20 mb-10">
          Please enter your phone number below to track your order.
        </p>
        <CustomInputBox label="Enter your mobile number" />
        <OneButton
          text={"SEND OTP"}
          onClick={() => {}}
          variant="primary"
          className="!w-[400px] mt-10"
          textTransform="uppercase"
        />
      </div>
    </div>
  );
};

export default MobileNumberOtp;
