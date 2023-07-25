import Checkbox from "../../components/CheckBox";
import CustomButton from "../../components/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import WelcomeHeader from "./welcomeHeader";
import Onboarding from "../../assets/AccountQuestions/Onboarding.gif"
export const QuestionComponent2: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col ">
      <WelcomeHeader />
      <div className="w-full">
        <div className="flex justify-center">
          <img src={Onboarding} alt="" width="180px" />
        </div>
        <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-4 lg:mt-[18px]">
          <div className="">
            <span className="text-xl font-semibold">Describe yourself</span>
          </div>
          <div className="flex flex-col items-start mt-4">
            <Checkbox
              label="Trader / wholesaler / Reseller"
              className="text-base"
            />
            <Checkbox label="D2C Brand" className="text-base" />
            <Checkbox
              label="Individual selling on marketplace"
              className="text-base"
            />
            <Checkbox label="Social seller" className="text-base" />
            <Checkbox label="Other" className="text-base" />
          </div>
        </div>
        <div className="mt-6">
          <CustomButton
            text="NEXT"
            onClick={() => navigate("/account/question3")}
          />
        </div>
      </div>
    </div>
  );
};
