import RightArrowIcon from "../../../assets/Profile/RightArrowIcon.svg";
import { useNavigate } from "react-router-dom";

export const SettingTab = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-4 mt-8">
      <div
        className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
      >
        <div
          className={`flex justify-between items-center h-[44px]`}
          onClick={() => navigate("/profile/profile-setting-change-password")}
        >
          <div className="flex">
            <span className="text-base font-semibold text-[#1C1C1C] ml-2">
              Change Password
            </span>
          </div>
          <div className="mr-4">
            <img
              src={RightArrowIcon}
              alt=""
              className="ml-4"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>

      <div
        className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
        onClick={() => navigate("/profile/profile-setting-edit-profile")}
      >
        <div className={`flex justify-between items-center h-[44px]`}>
          <div className="flex">
            <span className="text-base font-semibold text-[#1C1C1C] ml-2">
              Edit Profile
            </span>
          </div>
          <div className="mr-4">
            <img
              src={RightArrowIcon}
              alt=""
              className="ml-4"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>

      <div
        className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
        onClick={() => navigate("/profile/")}
      >
        <div className={`flex justify-between items-center h-[44px]`}>
          <div className="flex">
            <span className="text-base font-semibold text-[#1C1C1C] ml-2">
              Delete account
            </span>
          </div>
          <div className="mr-4">
            <img
              src={RightArrowIcon}
              alt=""
              className="ml-4"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
