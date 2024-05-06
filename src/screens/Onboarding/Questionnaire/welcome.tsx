import React from "react";
import { WHITE_COMPANYNAME } from "../../../utils/ApiUrls";
interface IWelcomeQuestionProps {
  label: string;
  className?: string;
}
export const WelcomeQuestion: React.FunctionComponent<
  IWelcomeQuestionProps
> = ({ label, className }) => {
  return (
    <div className={`${className} flex flex-col items-center mt-11`}>
      <div className="text-center	text-[#323232] text-[22px] font-bold font-Lato leading-7">
        Welcome to {WHITE_COMPANYNAME}
      </div>
      <div className="text-center	mt-3 text-base text-[#494949] font-light">
        {label}
      </div>
    </div>
  );
};
