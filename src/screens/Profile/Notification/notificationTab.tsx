import PersonIcon from "../../../assets/Profile/Notification/PersonIcon.svg"
import CustomInputBox from "../../../components/Input";
import { ToggleButton } from "../../../components/ToggleButton";
export const ProfileNotificationTab = () => {
  return (
    <div className="mx-4 mt-4">
      <div className="flex flex-col">
        <div className="flex items-center">
          <img src={PersonIcon} alt="" />
          <span className="ml-2 text-[#323232] text-[12px] font-bold">
            Operational Details
          </span>
        </div>
        <div className="mt-7">
          <CustomInputBox label="Operational email" />
        </div>
        <div className="mt-4">
          <CustomInputBox label="Operational contact" />
        </div>
        <div className="flex justify-between items-center shadow-md rounded-md px-2 mt-4 h-[36px]">
          <span className="whitespace-nowrap">Notification (Email, SMS)</span>
          <ToggleButton />
        </div>
      </div>

      <div className="flex flex-col mt-10">
        <div className="flex items-center">
          <img src={PersonIcon} alt="" />
          <span className="ml-2 text-[#323232] text-[12px] font-bold">
            Account Details
          </span>
        </div>
        <div className="mt-7">
          <CustomInputBox label="Account email" />
        </div>
        <div className="mt-4">
          <CustomInputBox label="Account contact" />
        </div>
        <div className="flex justify-between items-center shadow-md rounded-md px-2 mt-4 h-[36px]">
          <span className="flex whitespace-nowrap">Notification (Email, SMS)</span>
          <ToggleButton />
        </div>
      </div>

      <div className="flex justify-between items-center shadow-md rounded-md px-2 mt-10 h-[36px]">
        <span className="flex whitespace-nowrap">Tracking notification</span>
        <ToggleButton />
      </div>

      <div className="flex justify-between items-center shadow-md rounded-md px-2 mt-4 h-[36px]">
        <span className="whitespace-nowrap">Rating email</span>
        <ToggleButton />
      </div>
    </div>
  );
};
