import { useState, useEffect } from "react";
import AccountIcon from "../../../assets/Insurance/Account.svg";
import CloseButtonIcon from "../../../assets/Insurance/CloseButton.svg";
import CheckedIcon from "../../../assets/Insurance/Checked.svg";
import UnCheckedIcon from "../../../assets/Insurance/UnChecked.svg";
import Input from "../../../components/Input/index";
import CustomButton from "../../../components/Button/index";
import CheckBox from "../../../components/CheckBox/index";

import PopupModal from "../../../components/CustomModal/popupModal";
const Index = () => {
  const [showInsuranceModal, setShowInsuranceModal] = useState<boolean>(true);

  const submitHandler = () => {};
  return (
    // <PopupModal
    //   title="Are you sure?"
    //   modalPositionStyle="top"
    //   // modalClass="lg:w-4/12 md:w-6/12 sm:w-8/12 w-10/12 "
    //   isModalOpen={showInsuranceModal}
    //   closeModal={() => {
    //     setShowInsuranceModal(false);
    //   }}
    //   setShowDeleteModal={setShowInsuranceModal}
    //   onClick={() => submitHandler()}
    // >
    //   <div></div>
    // </PopupModal>
    // <div className="grid grid-rows-5 border-2 rounded-md h-[454px]">
    //   <div className="rows-span-1">
    //     <div className="cols-span-3">
    //       <img src={AccountIcon} alt="Add Insurance" />
    //       <span>Add insurance</span>
    //     </div>
    //     <div className="cols-span-1">
    //       <img src={CloseButtonIcon} alt="Close Insurance Tab" />
    //     </div>
    //   </div>
    //   <div className="rows-span-2"></div>
    //   <div className="rows-span-2"></div>
    // </div>

    <div className="border-2 rounded-md py-4 px-4">
      <div className="flex flex-col gap-y-4">
        <div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <img src={AccountIcon} alt="Add Insurance" width="24px" />
              <h1 className="text-sm font-semibold ml-2">Add insurance</h1>
            </div>
            <div className="flex">
              <img
                src={CloseButtonIcon}
                alt="Close Insurance Tab"
                width="24px"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mt-4">
            <div className="relative grid grid-cols-2 border-2 rounded-md gap-x-2 p-4 h-[123px]">
              <div className="flex justify-center items-center border-2 rounded-md h-[88px]">
                <div className="absolute top-[10px] bg-white text-[10px] font-semibold">
                  I want insurance
                </div>
                <img src={CheckedIcon} alt="I want insurance" />
              </div>
              <div className="flex justify-center items-center border-2 rounded-md h-[88px]">
                <div className="absolute top-[10px] bg-white text-[10px] font-semibold">
                  I'll take risk
                </div>
                <img src={UnCheckedIcon} alt="I'll take risk" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <CheckBox label="ADD COD TO ORDER" checked={true} />

            <Input label="Collectable amount" />
            <Input label="Total amount" />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <CustomButton text="Continue" onClick={() => {}} />
      </div>
    </div>
  );
};

export default Index;
