import { useMediaQuery } from "react-responsive";
import PersonIcon from "../../../assets/Profile/Notification/PersonIcon.svg";
import CustomInputBox from "../../../components/Input";
import { ToggleButton } from "../../../components/ToggleButton";
export const ProfileNotificationTab = () => {
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return (
    <div className="mx-4 mt-4">
      <div className="flex flex-col">
        <div className="flex items-center">
          {!isItLgScreen && <img src={PersonIcon} alt="personIcon" />}
          <span className="text-[#323232] text-[12px] font-bold lg:text-[24px] lg:font-normal">
            Operational Details
          </span>
        </div>
        <div className="grid lg:grid-cols-3 mt-7 gap-7">
          <div>
            <CustomInputBox label="Operational email" />
          </div>
          <div>
            <CustomInputBox label="Operational contact" />
          </div>
          <br/>
          <div className="flex justify-between items-center shadow-sm rounded-md px-2 h-[44px]">
            <span className="whitespace-nowrap">Notification (Email, SMS)</span>
            <ToggleButton />
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-10">
        <div className="flex items-center">
        {!isItLgScreen && <img src={PersonIcon} alt="personIcon" />}
          <span className="ml-2 text-[#323232] text-[12px] font-bold lg:text-[24px] lg:font-normal">
            Account Details
          </span>
        </div>
        <div className="grid lg:grid-cols-3 mt-7 gap-7">
          <div>
            <CustomInputBox label="Account email" />
          </div>
          <div>
            <CustomInputBox label="Account contact" />
          </div>
          <br/>
          <div className="flex justify-between items-center shadow-md rounded-md px-2 mt-4 h-[44px]">
            <span className="flex whitespace-nowrap">Notification (Email, SMS)</span>
            <ToggleButton />
          </div>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-2 gap-4 mt-10">
        <div className="flex justify-between items-center shadow-md rounded-md px-2 h-[44px]">
          <span className="flex whitespace-nowrap">Tracking notification</span>
          <ToggleButton />
        </div>

        <div className="flex justify-between items-center shadow-md rounded-md px-2 h-[44px]">
          <span className="whitespace-nowrap">Rating email</span>
          <ToggleButton />
        </div>
      </div>
    </div>
  );
};
