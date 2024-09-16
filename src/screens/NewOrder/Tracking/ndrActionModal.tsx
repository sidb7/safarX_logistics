import React from "react";
import crossIcon from "../../../assets/cross.svg"
import CustomDropDown from "../../../components/DropDown";
import CustomInputBox from "../../../components/Input";

interface NdrFollowUpProps {
  followUpData: {
    [key: string]: string;
  }[];
  onClose: () => void;
}

const ndrActionModal: React.FC<NdrFollowUpProps> = ({ followUpData,onClose }) => {
  return (
    <>
     <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-Lato  text-2xl leading-5 text-black font-normal">NDR Follow-up</h2>
        <img
              src={crossIcon}
              alt="EditIcon"
              className="ml-1 w-6 h-6 cursor-pointer"
              onClick={onClose}
            />
       
      </div>
      <div className="p-4">
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
    </>
  );
};

export default ndrActionModal;
