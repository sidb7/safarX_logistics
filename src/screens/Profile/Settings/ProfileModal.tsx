import React from 'react'
import CrossIcon from "../../../assets/CloseIcon.svg"
import CustomInputBox from "../../../components/Input"
import RightSideModal from "../.././../components/CustomModal/customRightModal"
import ServiceButton from '../../../components/Button/ServiceButton'
import EditProfileIcon from "../../../assets/Profile/Setting/EditProfileIcon.svg"

interface PassModalProps {
    isProfileModalOpen:boolean;
    setIsProfileModalOpen:React.Dispatch<React.SetStateAction<any>>;
}

function ProfileModal(props:PassModalProps) {
    const {isProfileModalOpen, setIsProfileModalOpen} = props;
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
                width="35px"
              />{" "}
            </div>
          </div>
          <div className="flex flex-col mt-4 gap-y-4">
            <div className="flex flex-col justify-center items-center mb-4">
              <img src={EditProfileIcon} alt="Edit Profile" />
              <span className="text-[14px] font-normal text-[#494949]">
                Dimention: 68x68 Pixels | Image Size: 230 KB
              </span>
            </div>
            <CustomInputBox label="Seller ID" />
            <CustomInputBox label="Name" />
            <CustomInputBox label="Email ID" />
            <CustomInputBox label="Contact Number" />
            <CustomInputBox label="Brand Website" />
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
                onClick={() => setIsProfileModalOpen(false)}
              />

              <ServiceButton
                text="SAVE"
                className="bg-[#1C1C1C] text-[#FFFFFF] w-[80px]"
                onClick={() => {}}
              />
            </div>
          </footer>
        </div>
      </RightSideModal>
  )
}

export default ProfileModal