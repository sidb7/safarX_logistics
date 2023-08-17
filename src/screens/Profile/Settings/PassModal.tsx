import React from "react";
import CrossIcon from "../../../assets/CloseIcon.svg";
import CustomInputBox from "../../../components/Input";
import RightSideModal from "../.././../components/CustomModal/customRightModal";
import ServiceButton from "../../../components/Button/ServiceButton";

interface PassModalProps {
  isPassModalOpen: boolean;
  setIsPassModalOpen: React.Dispatch<React.SetStateAction<any>>;
}

function PassModal(props: PassModalProps) {
  const { isPassModalOpen, setIsPassModalOpen } = props;
  return (
    <RightSideModal
      isOpen={isPassModalOpen}
      onClose={() => {
        setIsPassModalOpen(false);
      }}
      wrapperClassName="!justify-start outline-none"
    >
      <div className="flex flex-col w-full p-4 mt-5 ">
        <div className="flex justify-between w-full ">
          <div className="text-[24px] font-normal">Change Password</div>
          <div>
            <img
              src={CrossIcon}
              onClick={() => setIsPassModalOpen(false)}
              alt="close Icon"
              width="25px"
            />{" "}
          </div>
        </div>
        <div className="flex flex-col mt-8 gap-y-4 w-ful">
          <CustomInputBox label="Email" className="" />
          <CustomInputBox label="New Password" />
          <CustomInputBox label="Re-enter New Password" />
        </div>
      </div>
      <div style={{ width: "-webkit-fill-available" }}>
        <footer
          style={{ width: "-webkit-fill-available" }}
          className=" fixed  bottom-0	"
        >
          <div
            style={{
              width: "-webkit-fill-available",
              boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.04)",
            }}
            className="flex justify-end shadow-lg border-[1px] border-white bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed bottom-0"
          >
            <ServiceButton
              className="w-[80px]"
              text="BACK"
              onClick={() => setIsPassModalOpen(false)}
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
  );
}

export default PassModal;
