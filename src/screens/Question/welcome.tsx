import React from "react";
import WarehouseTruckGif from "../../assets/AccountQuestions/WarehouseTruck.gif";
import Onboarding from "../../assets/AccountQuestions/Onboarding gif.svg";
import CargoRatingGif from "../../assets/AccountQuestions/CargoRating.gif";
import DroneDeliveryGif from "../../assets/AccountQuestions/DroneDelivery.gif";
interface IWelcomeQuestionProps {
  label: string
}
export const WelcomeQuestion: React.FunctionComponent<IWelcomeQuestionProps> = ({label}) => {
  return (
    <div className="flex flex-col items-center mt-11">
      <div className="text-center	text-[#323232] text-[22px] font-bold">
        Welcome to Shipyaari
      </div>
      <div className="text-center	mt-3 text-base text-[#494949] font-light">
        {label}
      </div>
      {/* 1st screen */}
      <div className="flex justify-center mt-3">
        <img src={WarehouseTruckGif} alt="" width="180px" />
      </div>
      {/* 2nd screen */}
      {/* <div className="flex justify-center mt-3">
        <img src={Onboarding} alt="" />
      </div> */}
      {/* 3rd screen */}
      {/* <div className="flex justify-center">
        <img src={CargoRatingGif} alt="" width="180px" />
      </div> */}
      {/* 4th screen */}
      {/* <div className="flex justify-center">
        <img src={DroneDeliveryGif} alt="" width="180px" />
      </div> */}
    </div>
  );
};
