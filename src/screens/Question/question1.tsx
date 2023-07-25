import Checkbox from "../../components/CheckBox";
import WarehouseTruckGif from "../../assets/AccountQuestions/WarehouseTruck.gif";
import CustomButton from "../../components/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import WelcomeHeader from "./welcomeHeader";

export const QuestionComponent1: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col ">
      <WelcomeHeader />
      <div className="w-full">
        <div className="flex justify-center">
          <img src={WarehouseTruckGif} alt="" width="180px" />
        </div>
        <div>
          <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-4">
            <div className="">
              <span className="text-xl font-semibold">
                What other services do you want?
              </span>
            </div>
            <div className="flex flex-col items-start mt-4">
              <Checkbox label="Courier" className="text-base" />
              <Checkbox label="Warehouse" className="text-base" />
              <Checkbox label="Fulfilment" className="text-base" />
            </div>
          </div>
          <div className="mt-6">
            <CustomButton
              text="NEXT"
              onClick={() => navigate("/account/question2")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
