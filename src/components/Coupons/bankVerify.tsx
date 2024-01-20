import React, { useEffect, useState } from "react";
import RightSideModal from "../../components/CustomModal/customRightModal";
import closeIcon from "../../assets/common/cancel.svg";
import CustomButton from "../Button";
import CustomDropDown from "../DropDown";
import CustomInputBox from "../Input";

interface IBankVerifyProps {
  modalStatus?: any;
  setModalStatus?: any;
}

const BankVerify: React.FunctionComponent<IBankVerifyProps> = ({
  modalStatus = false,
  setModalStatus,
}) => {
  console.log("🚀 ~ modalStatus:", modalStatus);
  // const isLgScreen = useMediaQuery({ query: "(min-width: 640px)" });
  const [isRightSideModal, setIsRightSideModal] = useState(false);
  console.log("🚀 ~ isRightSideModal:", isRightSideModal);

  const bankScreen = () => {
    return (
      <>
        <div className="p-5">
          <div className="flex justify-between">
            <h2 className="font-Lato text-2xl font-normal leading-8">
              Bank Details
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
              <CustomInputBox label="Account Holder Name" />
            </div>
            <div>
              <CustomInputBox label="Bank Name" />
            </div>
            <div>
              <CustomInputBox label="Branch Name" />
            </div>
            <div>
              <CustomInputBox label="IFSC code" />
            </div>
            <div>
              <CustomDropDown onChange={() => {}} placeHolder="Account Type" />
            </div>

            <div>
              <CustomInputBox label="Account number" />
            </div>
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
        {bankScreen()}
      </RightSideModal>
    </div>
  );
};

export default BankVerify;
