import UpArrowIcon from "../../../assets/Filter/upArrow.svg";
import DownArrowIcon from "../../../assets/Filter/downArrow.svg";
import SettingIcon from "../../../assets/Profile/SettingIcon.svg";
export const ProfileSetting = () => {
  return (
    <div
      className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
    >
      <div className={`flex justify-between items-center h-[44px]`}>
        <div className="flex">
          <img className="ml-4" src={SettingIcon} alt="Setting" />
          <span className="text-base font-semibold text-[#1C1C1C] ml-2">
            Settings
          </span>
        </div>
        <div className="mr-4">
          <img src={DownArrowIcon} alt="" className="ml-4" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
