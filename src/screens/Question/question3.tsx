import React from "react";
import Checkbox from "../../components/CheckBox";
import CargoRatingGif from "../../assets/AccountQuestions/CargoRating.gif";
import CustomButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
import WelcomeHeader from "./welcomeHeader";

export const QuestionComponent3: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col ">
      <WelcomeHeader />
      <div className="w-full">
        <div className="flex justify-center">
          <img src={CargoRatingGif} alt="" width="180px" />
        </div>
        <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-4">
          <div className="">
            <span className="text-xl font-semibold">
              What is your monthly order volume?
            </span>
          </div>
          <div className="flex flex-col items-start mt-4">
            <Checkbox label="1-100" className="text-base" />
            <Checkbox label="100-500" className="text-base" />
            <Checkbox label="500-1000" className="text-base" />
            <Checkbox label="1000-5000" className="text-base" />
            <Checkbox label="Above 5000" className="text-base" />
          </div>
        </div>
        <div className="mt-6">
          <CustomButton
            text="NEXT"
            onClick={() => navigate("/account/question4")}
          />
        </div>
      </div>
    </div>
  );
};
