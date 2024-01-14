import React, { useState } from "react";
import CrossIcon from "../../../assets/CloseIcon.svg";
import CustomInputBox from "../../../components/Input";
import RightSideModal from "../.././../components/CustomModal/customRightModal";
import ServiceButton from "../../../components/Button/ServiceButton";
import EditProfileIcon from "../../../assets/Profile/ProfileIcon.svg";
import { GET_PROFILE_URL, UPDATE_SELLER } from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import { toast } from "react-toastify";

interface PassModalProps {
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: React.Dispatch<React.SetStateAction<any>>;
  state?: any;
}

function ProfileModal(props: PassModalProps) {
  const { isProfileModalOpen, setIsProfileModalOpen, state } = props;

  const [profileData, setProfileData] = useState<any>(state);
  const [name, setName] = useState(
    `${profileData?.firstName} ${profileData?.lastName}`
  );

  const changeHandler = (key: string, event: any) => {
    setProfileData({ ...profileData, [key]: event.target.value });
  };

  const updateProfile = async () => {
    const splitName = name.split(" ");
    const lastName = splitName.pop();
    const firstName = splitName.join(" ");

    const { data } = await POST(UPDATE_SELLER, {
      data: { ...profileData, firstName: firstName, lastName: lastName },
    });
    if (data?.success) {
      setProfileData(data?.data);
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  };
  return (
    <RightSideModal
      isOpen={isProfileModalOpen}
      onClose={() => {
        setIsProfileModalOpen(false);
      }}
      wrapperClassName="!justify-start outline-none"
    >
      <div className="flex flex-col w-full p-4 mt-5 ">
        <div className="flex justify-between w-full ">
          <div className="text-[24px] font-normal">Edit Profile</div>
          <div>
            <img
              src={CrossIcon}
              onClick={() => setIsProfileModalOpen(false)}
              alt="close Icon"
              width="25px"
            />{" "}
          </div>
        </div>
        <div className="flex flex-col mt-4 gap-y-4">
          <div className="flex flex-col justify-center items-center mb-4">
            <div
              style={{
                width: "82px",
                height: "82px",
                overflow: "hidden",
                borderRadius: "50%",
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  mask: "radial-gradient(circle, transparent 50%, black 50%)",
                }}
                src={
                  profileData?.profileImageUrl &&
                  profileData?.profileImageUrl !== "N/A"
                    ? profileData?.profileImageUrl
                    : EditProfileIcon
                }
                alt="Edit Profile"
              />
            </div>
            <span className="text-[14px] font-normal text-[#494949]">
              Dimensions: 68x68 Pixels | Image Size: 230 KB
            </span>
          </div>
          <CustomInputBox
            label="Seller ID"
            value={profileData.sellerId}
            isDisabled={true}
          />
          <CustomInputBox
            label="Name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomInputBox label="Email ID" value={profileData.email} />
          <CustomInputBox
            inputType="text"
            inputMode="numeric"
            maxLength={10}
            label="Contact Number"
            value={`+91 ${profileData.contactNumber}`}
            onChange={(e) => changeHandler("contactNumber", e)}
          />
          <CustomInputBox
            label="Brand Website"
            value={profileData?.privateCompany?.brandWebsite}
            onChange={(e) =>
              setProfileData({
                ...profileData,
                privateCompany: {
                  ...profileData.privateCompany,
                  brandWebsite: e.target.value,
                },
              })
            }
          />
        </div>
      </div>

      <div style={{ width: "-webkit-fill-available" }}>
        <footer
          style={{ width: "-webkit-fill-available" }}
          className=" fixed  bottom-0	"
        >
          <div
            style={{ width: "-webkit-fill-available" }}
            className="flex justify-end shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed bottom-0"
          >
            <ServiceButton
              className="w-[80px]"
              text="BACK"
              onClick={() => {
                setIsProfileModalOpen(false);
              }}
            />

            <ServiceButton
              text="SAVE"
              className="bg-[#1C1C1C] text-[#FFFFFF] w-[80px]"
              onClick={() => {
                setIsProfileModalOpen(false);
                updateProfile();
              }}
            />
          </div>
        </footer>
      </div>
    </RightSideModal>
  );
}

export default ProfileModal;
