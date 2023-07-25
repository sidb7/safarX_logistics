import Checkbox from "../../components/CheckBox";
import DroneDeliveryGif from "../../assets/AccountQuestions/DroneDelivery.gif";
import CustomButton from "../../components/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import WelcomeHeader from "./welcomeHeader";

export const QuestionComponent4: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col ">
      <WelcomeHeader />
      <div className="w-full">
        <div className="flex justify-center">
          <img src={DroneDeliveryGif} alt="" width="180px" />
        </div>
        <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-4">
          <div className="">
            <span className="text-xl font-semibold">
              How do you sell your products?
            </span>
          </div>
          <div className="flex flex-col items-start mt-4">
            <Checkbox
              label="Online Marketplaces (Amazon, Filpkart etc.)"
              className="text-base"
            />
            <Checkbox label="Own Website" className="text-base" />
            <Checkbox
              label="Social Channels (Facebook, Instagram etc.)"
              className="text-base"
            />
            <Checkbox label="Physical Store" className="text-base" />
          </div>
        </div>
        <div className="mt-6">
          <CustomButton
            text="NEXT"
            onClick={() => navigate("/account/question5")}
          />
        </div>
      </div>
    </div>
  );
};
