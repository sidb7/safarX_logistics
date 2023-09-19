import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import RightArrowIcon from "../../../assets/Profile/RightArrowIcon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import PassModal from "./PassModal";
import ProfileModal from "./ProfileModal";
import DeleteModal from "../../../components/CustomModal/DeleteModal";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import { DELETE_SELLER } from "../../../utils/ApiUrls";

export const SettingTab = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state?.data || {};
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigateTo = (text?: string) => {
    if (!isItLgScreen) {
      if (text === "settings")
        navigate("/profile/profile-setting-change-password");
      else navigate("/profile/profile-setting-edit-profile");
    } else {
      if (text === "settings") {
        setIsPassModalOpen(true);
      } else setIsProfileModalOpen(true);
    }
  };

  return (
    <>
      <div className="h-full">
        <Breadcrum label="Settings" />
        <div className="mx-4 mt-2">
          <div
            className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 cursor-pointer`}
            style={{
              boxShadow:
                "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
            }}
          >
            <div
              className={`flex justify-between items-center h-[44px]`}
              onClick={() => navigateTo("settings")}
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

          {/* <div
            className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4 cursor-pointer`}
            onClick={() => navigateTo()}
            style={{
              boxShadow:
                "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
            }}
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
          </div> */}

          {/* <div
            className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4 cursor-pointer`}
            onClick={() => setIsDeleteModalOpen(true)}
            style={{
              boxShadow:
                "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
            }}
          >
            <div className={`flex justify-between items-center h-[44px]`}>
              <div className="flex">
                <span className="text-base font-semibold text-[#1C1C1C] ml-2">
                  Delete account
                </span>
              </div>
              <div className="mr-4">
                <img src={RightArrowIcon} alt="" className="ml-4" />
              </div>
            </div>
          </div> */}

          <div
            className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4 cursor-pointer cursor-pointer`}
            onClick={() => navigate(`/profile/settings/role-management`)}
            style={{
              boxShadow:
                "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
            }}
          >
            <div className={`flex justify-between items-center h-[44px]`}>
              <div className="flex">
                <span className="text-base font-semibold text-[#1C1C1C] ml-2">
                  Role Management
                </span>
              </div>
              <div className="mr-4">
                <img src={RightArrowIcon} alt="" className="ml-4" />
              </div>
            </div>
          </div>

          <div
            className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4 cursor-pointer`}
            onClick={() => navigate(`/profile/settings/user-management`)}
            style={{
              boxShadow:
                "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
            }}
          >
            <div className={`flex justify-between items-center h-[44px]`}>
              <div className="flex">
                <span className="text-base font-semibold text-[#1C1C1C] ml-2">
                  User Management
                </span>
              </div>
              <div className="mr-4">
                <img src={RightArrowIcon} alt="" className="ml-4" />
              </div>
            </div>
          </div>
        </div>

        <PassModal
          isPassModalOpen={isPassModalOpen}
          setIsPassModalOpen={setIsPassModalOpen}
        />

        <ProfileModal
          state={state}
          isProfileModalOpen={isProfileModalOpen}
          setIsProfileModalOpen={setIsProfileModalOpen}
        />

        {/* <DeleteModal
          isOpen={isDeleteModalOpen}
          setModal={setIsDeleteModalOpen}
          deleteTextMessage="Are you sure you want to delete this user"
          deleteURL={DELETE_SELLER}
          payloadBody={{}}
        /> */}
        <BottomLayout callApi={() => {}} />
      </div>
    </>
  );
};
