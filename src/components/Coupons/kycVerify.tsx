import React, { useEffect, useState } from "react";
import RightSideModal from "../../components/CustomModal/customRightModal";
import closeIcon from "../../assets/common/cancel.svg";
import CustomButton from "../Button";
import CustomDropDown from "../DropDown";
import CustomInputBox from "../Input";

interface IKycVerifyProps {
  modalStatus?: any;
  setModalStatus?: any;
}

const KycVerify: React.FunctionComponent<IKycVerifyProps> = ({
  modalStatus = false,
  setModalStatus,
}) => {
  console.log("🚀 ~ modalStatus:", modalStatus);
  // const isLgScreen = useMediaQuery({ query: "(min-width: 640px)" });
  const [isRightSideModal, setIsRightSideModal] = useState(false);
  console.log("🚀 ~ isRightSideModal:", isRightSideModal);

  const inputFieldToType = (businessType: string) => {
    if (businessType === "individual") {
      return (
        <>
          <div>
            <CustomInputBox label="Aadhar Number" />
          </div>
          <div>
            <CustomInputBox label="PAN Number" />
          </div>
        </>
      );
    } else if (businessType === "business") {
      return (
        <>
          <div>
            <CustomInputBox label="GST Number" />
          </div>
          <div>
            <CustomInputBox label="PAN Number" />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div>
            <CustomInputBox label="GST Number" />
          </div>
          <div>
            <CustomInputBox label="PAN Number" />
          </div>
          <div>
            <CustomInputBox label="Aadhar Number" />
          </div>
        </>
      );
    }
  };

  const kycScreen = () => {
    return (
      <>
        <div className="p-5">
          <div className="flex justify-between">
            <h2 className="font-Lato text-2xl font-normal leading-8">
              KYC Details
            </h2>
            <img
              src={closeIcon}
              alt="closeModalIcon"
              className="cursor-pointer"
              onClick={() => {
                setModalStatus(isRightSideModal);
              }}
            />
          </div>
          <div className="flex flex-col gap-y-4 pt-5">
            <div>
              <CustomDropDown onChange={() => {}} placeHolder="Business Type" />
            </div>
            <div>
              <CustomInputBox label="First Name" />
            </div>
            <div>
              <CustomInputBox label="Last Name" />
            </div>
            {inputFieldToType("company")}
          </div>
        </div>
        <div
          className="hidden lg:flex justify-end shadow-lg border-[1px]  bg-[#FFFFFF] p-5 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0 "
          style={{ width: "-webkit-fill-available" }}
        >
          <div className="flex h-full w-full justify-between">
            <CustomButton
              text="cancel"
              onClick={() => {
                setModalStatus(isRightSideModal);
              }}
              className="!w-[88px] !bg-[#FFFFFF] !border-2 !border-[#FABCAF] !text-[#F35838] !rounded-[4px]"
            />
            <CustomButton
              text="confirm"
              onClick={() => {}}
              className="!w-[88px] !rounded-[4px]"
            />
          </div>
        </div>
      </>
    );
  };
  useEffect(() => {
    const currentModalStatus = () => {
      setIsRightSideModal(modalStatus);
    };
    currentModalStatus();
  }, [modalStatus]);

  return (
    <div>
      <RightSideModal
        isOpen={isRightSideModal}
        onClose={() => {
          setIsRightSideModal(false);
          setModalStatus(isRightSideModal);
        }}
      >
        {kycScreen()}
      </RightSideModal>
    </div>
  );
};

export default KycVerify;
