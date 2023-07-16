import React from "react";
import WelcomeHeader from "../welcomeHeader";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomInputBox from "../../../../components/InputBox";
import CustomInputWithFileUpload from "../../../../components/InputBox/InputWithFileUpload";

type Props = {};

const Index = (props: Props) => {
  return (
    <div className="px-5">
      <WelcomeHeader
        title="Welcome to Shipyaari"
        content="Tell us more about your company"
      />
      <div className="flex flex-col gap-y-5 mb-5">
        <CustomInputBox label="Full Address" />
        <CustomInputBox label="Pin code" />
        <CustomInputBox label="City" />
        <CustomInputBox label="State" />
        <CustomInputBox label="Brand Name" />

        <CustomInputWithFileUpload label="Upload Logo" />
      </div>
      <div className="flex flex-col   pb-12">
        <ServiceButton
          text="SUBMIT"
          className="bg-[#1C1C1C] text-white w-full mb-5"
        />
      </div>
    </div>
  );
};

export default Index;
