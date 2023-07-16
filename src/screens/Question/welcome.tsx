import React from "react";
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
    </div>
  );
};
