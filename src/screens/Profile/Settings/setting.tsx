import RightArrowIcon from "../../../assets/Profile/RightArrowIcon.svg";
import SettingIcon from "../../../assets/Profile/SettingIcon.svg";
import { useNavigate } from "react-router-dom";
export const ProfileSetting = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
      onClick={() => navigate("/profile/profile-setting")}
    >
      <div className={`flex justify-between items-center h-[44px]`}>
        <div className="flex">
          <img className="ml-4" src={SettingIcon} alt="Setting" />
          <span className="text-base font-semibold text-[#1C1C1C] ml-2">
            Settings
          </span>
        </div>
        <div className="mr-4">
          <img src={RightArrowIcon} alt="" className="ml-4" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
