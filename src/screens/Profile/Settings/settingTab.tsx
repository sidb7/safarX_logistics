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
import { useSelector } from "react-redux";
import AccessDenied from "../../../components/AccessDenied";
import { checkPageAuthorized } from "../../../redux/reducers/role";

export const SettingTab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roles = useSelector((state: any) => state?.roles);

  // const isActive = roles.roles?.[0]?.menu?.[8]?.menu?.[0]?.pages?.[0]?.isActive;
  const isActive = checkPageAuthorized("Settings");

  const state = location.state?.data || {};
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const navigateTo = (text?: string) => {
  //   if (!isItLgScreen) {
  //     if (text === "settings")
  //       navigate("/profile/profile-setting-change-password");
  //     else navigate("/profile/profile-setting-edit-profile");
  //   } else {
  //     if (text === "settings") {
  //       setIsPassModalOpen(true);
  //     } else setIsProfileModalOpen(true);
  //   }
  // };

  const navigateTo = (text?: string) => {
    if (text === "settings") {
      setIsPassModalOpen(true);
    }
  };

  return (
    <>
      {isActive ? (
        <div className="h-full">
          <Breadcrum label="Settings" />
          <div className="mx-4 mt-2">
            <div
              className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 cursor-pointer hover:bg-gray-100 `}
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
                  <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C] ml-2">
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
              className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4 cursor-pointer hover:bg-gray-100`}
              onClick={() => navigate(`/settings/role-management`)}
              style={{
                boxShadow:
                  "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
              }}
            >
              <div className={`flex justify-between items-center h-[44px]`}>
                <div className="flex">
                  <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C] ml-2">
                    Role Management
                  </span>
                </div>
                <div className="mr-4">
                  <img src={RightArrowIcon} alt="" className="ml-4" />
                </div>
              </div>
            </div>

            <div
              className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4 cursor-pointer hover:bg-gray-100`}
              onClick={() => navigate(`/settings/user-management`)}
              style={{
                boxShadow:
                  "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
              }}
            >
              <div className={`flex justify-between items-center h-[44px]`}>
                <div className="flex">
                  <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C] ml-2">
                    User Management
                  </span>
                </div>
                <div className="mr-4">
                  <img src={RightArrowIcon} alt="" className="ml-4" />
                </div>
              </div>
            </div>

            <div
              className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4 cursor-pointer hover:bg-gray-100`}
              onClick={() => navigate(`/settings/system-logs`)}
              style={{
                boxShadow:
                  "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
              }}
            >
              <div className={`flex justify-between items-center h-[44px]`}>
                <div className="flex">
                  <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C] ml-2">
                    System Logs
                  </span>
                </div>
                <div className="mr-4">
                  <img src={RightArrowIcon} alt="" className="ml-4" />
                </div>
              </div>
            </div>

            {/* /////////// ---- Impersonation Logs ----- */}

            <div
              className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4 cursor-pointer hover:bg-gray-100`}
              onClick={() => navigate(`impersonation-logs`)}
              style={{
                boxShadow:
                  "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
              }}
            >
              <div className={`flex justify-between items-center h-[44px]`}>
                <div className="flex">
                  <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C] ml-2">
                    Impersonation Logs
                  </span>
                </div>
                <div className="mr-4">
                  <img src={RightArrowIcon} alt="" className="ml-4" />
                </div>
              </div>
            </div>

            {/* ///////////// */}

            <div
              className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4 cursor-pointer hover:bg-gray-100`}
              onClick={() => navigate(`/settings/label-settings`)}
              style={{
                boxShadow:
                  "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
              }}
            >
              <div className={`flex justify-between items-center h-[44px]`}>
                <div className="flex">
                  <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C] ml-2">
                    Label Settings
                  </span>
                </div>
                <div className="mr-4">
                  <img src={RightArrowIcon} alt="" className="ml-4" />
                </div>
              </div>
            </div>

            <div
              className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4 cursor-pointer hover:bg-gray-100`}
              onClick={() => navigate(`/settings/bulk-label-list`)}
              style={{
                boxShadow:
                  "0px 0px 0px 0px rgba(133, 133, 133, 0.05), 0px 6px 13px 0px rgba(133, 133, 133, 0.05)",
              }}
            >
              <div className={`flex justify-between items-center h-[44px]`}>
                <div className="flex">
                  <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C] ml-2">
                    Bulk Label List
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
          {/* <BottomLayout callApi={() => {}} /> */}
        </div>
      ) : (
        <div>
          <AccessDenied />
        </div>
      )}
    </>
  );
};
