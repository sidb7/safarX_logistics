import React from "react";
import WelcomeGif from "../../../assets/WelcomePage.gif";
import { capitalizeFirstLetter } from "../../../utils/utility";
import { ResponsiveState } from "../../../utils/responsiveState";

interface IWelcomeHeaderProps {
  userName?: any;
  completedStatus?: any;
}

const WelcomeHeader: React.FunctionComponent<IWelcomeHeaderProps> = ({
  userName,
  completedStatus,
}) => {
  const { isLgScreen } = ResponsiveState();
  return (
    <>
      <div className="px-4 py-[10px] border-1 border-[#E8E8E8] rounded-2xl shadow-md bg-[#EBFCFF] mt-5 lg:mt-0">
        <div className="flex justify-between items-center">
          <div className="flex flex-col p-3 lg:p-5 gap-y-3 lg:gap-y-[14px]">
            <p className="font-Lato text-lg lg:text-[22px] xl:text-[26px] text-[#1C1C1C] font-semibold lg:leading-6 xl:leading-9 tracking-wider capitalize">
              {completedStatus?.returningUser ? "Welome Back, " : "Hi, "}
              <span>{capitalizeFirstLetter(userName)}!</span>
            </p>
            <p className="font-Open text-[13px] lg:text-base xl:text-lg text-[#606060] font-normal lg:font-semibold  leading-5 xl:leading-6 tracking-wide">
              {completedStatus?.returningUser
                ? "We're glad to see you again and are committed to helping you achieve greater goals."
                : " We are excited to have you aboard and look forward to supporting your Success!"}
            </p>
          </div>
          {isLgScreen && (
            <div>
              <img
                src={WelcomeGif}
                loading="lazy"
                alt="welcome-gif"
                height={134}
                width={134}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WelcomeHeader;
