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
import DeltaOnBlaze from "../../Order/deltaOnBlaze";
import CustomRightModal from "../../../components/CustomModal/customRightModal";
import { ResponsiveState } from "../../../utils/responsiveState";
import sessionManager from "../../../utils/sessionManager";

export const SettingTab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roles = useSelector((state: any) => state?.roles);
  const { isLgScreen, isXlScreen } = ResponsiveState();
  const { sellerInfo } = sessionManager({});
  let kycValue = sellerInfo;
  // const isActive = roles.roles?.[0]?.menu?.[8]?.menu?.[0]?.pages?.[0]?.isActive;
  const isActive = checkPageAuthorized("Settings");

  const state = location.state?.data || {};
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openRightModalForDelta, setOpenRightModalForDelta] =
    useState<any>(false);
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
        <div className="min-h-screen bg-gradient-to-br  px-0 md:px-8">
          <Breadcrum label="Settings" />
          <div className="max-w-4xl mx-auto mt-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Settings options as modern square tiles */}
            <div
              className="aspect-square rounded-3xl shadow-lg bg-white border border-[#E8E8E8] transition-all duration-200 hover:shadow-2xl hover:border-[#9082FF] cursor-pointer flex flex-col items-center justify-center group"
              onClick={() => navigateTo("settings")}
            >
              <span className="font-Open text-lg font-semibold text-[#160783] group-hover:text-[#9082FF] text-center">
                Change Password
              </span>
              <img
                src={RightArrowIcon}
                alt=""
                className="mt-4 w-8 h-8 opacity-70 group-hover:opacity-100"
              />
            </div>
            <div
              className="aspect-square rounded-2xl shadow-lg bg-white border border-[#E8E8E8] transition-all duration-200 hover:shadow-2xl hover:border-[#9082FF] cursor-pointer flex flex-col items-center justify-center group"
              onClick={() => navigate(`/settings/role-management`)}
            >
              <span className="font-Open text-lg font-semibold text-[#160783] group-hover:text-[#9082FF] text-center">
                Role Management
              </span>
              <img
                src={RightArrowIcon}
                alt=""
                className="mt-4 w-8 h-8 opacity-70 group-hover:opacity-100"
              />
            </div>
            <div
              className="aspect-square rounded-2xl shadow-lg bg-white border border-[#E8E8E8] transition-all duration-200 hover:shadow-2xl hover:border-[#9082FF] cursor-pointer flex flex-col items-center justify-center group"
              onClick={() => navigate(`/settings/user-management`)}
            >
              <span className="font-Open text-lg font-semibold text-[#160783] group-hover:text-[#9082FF] text-center">
                User Management
              </span>
              <img
                src={RightArrowIcon}
                alt=""
                className="mt-4 w-8 h-8 opacity-70 group-hover:opacity-100"
              />
            </div>
            <div
              className="aspect-square rounded-2xl shadow-lg bg-white border border-[#E8E8E8] transition-all duration-200 hover:shadow-2xl hover:border-[#9082FF] cursor-pointer flex flex-col items-center justify-center group"
              onClick={() => navigate(`/settings/label-settings`)}
            >
              <span className="font-Open text-lg font-semibold text-[#160783] group-hover:text-[#9082FF] text-center">
                Label Settings
              </span>
              <img
                src={RightArrowIcon}
                alt=""
                className="mt-4 w-8 h-8 opacity-70 group-hover:opacity-100"
              />
            </div>
            <div
              className="aspect-square rounded-2xl shadow-lg bg-white border border-[#E8E8E8] transition-all duration-200 hover:shadow-2xl hover:border-[#9082FF] cursor-pointer flex flex-col items-center justify-center group"
              onClick={() => navigate(`/settings/bulk-label-list`)}
            >
              <span className="font-Open text-lg font-semibold text-[#160783] group-hover:text-[#9082FF] text-center">
                Bulk Label List
              </span>
              <img
                src={RightArrowIcon}
                alt=""
                className="mt-4 w-8 h-8 opacity-70 group-hover:opacity-100"
              />
            </div>
            {kycValue?.communicationRateCardExists && (
              <div
                className="aspect-square rounded-2xl shadow-lg bg-white border border-[#E8E8E8] transition-all duration-200 hover:shadow-2xl hover:border-[#9082FF] cursor-pointer flex flex-col items-center justify-center group"
                onClick={() => setOpenRightModalForDelta(true)}
              >
                <span className="font-Open text-lg font-semibold text-[#160783] group-hover:text-[#9082FF] text-center">
                  Delivery Max
                </span>
                <img
                  src={RightArrowIcon}
                  alt=""
                  className="mt-4 w-8 h-8 opacity-70 group-hover:opacity-100"
                />
              </div>
            )}
          </div>

          <CustomRightModal
            isOpen={openRightModalForDelta}
            onClose={() => setOpenRightModalForDelta(false)}
            className={`${isXlScreen ? "!w-1/2" : isLgScreen ? "!w-2/3" : ""}`}
          >
            <>
              <DeltaOnBlaze
                setOpenRightModalForDelta={setOpenRightModalForDelta}
              />
            </>
          </CustomRightModal>

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
