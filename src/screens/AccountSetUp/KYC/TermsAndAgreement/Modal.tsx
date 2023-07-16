import React, { useState } from "react";
import PopUpModal from "../../../../components/CustomModal/customBottomModal";
import TickIcon from "../../../../assets/Payment/Done.gif";
import ServiceButton from "../../../../components/Button/ServiceButton";
import { useNavigate } from "react-router-dom";

interface ITypesProps {}

const Modal = (props: ITypesProps) => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="">
      <PopUpModal
        isOpen={showModal}
        contentLabel="hello"
        onRequestClose={() => {
          setShowModal(false);
        }}
        overlayClassName=" px-4 flex items-center "
        className="!rounded !border-none w-[320px] h-[298px]"
      >
        <div className="flex flex-col items-center ">
          <div className="flex flex-col items-center mb-6">
            <img src={TickIcon} alt="" width={124} height={124} />
            <p className="font-bold text-[16px] text-[#1C1C1C]">
              Congratulations!
            </p>
            <p className="font-bold text-[16px] text-[#1C1C1C] text-center">
              Your KYC details have been successfully verified!
            </p>
          </div>

          <ServiceButton
            text="NEXT"
            onClick={() => {
              navigate("/account/kyc-company");
            }}
            className="bg-[#1C1C1C] text-white p-2 mb-6"
          />
        </div>
      </PopUpModal>
    </div>
  );
};

export default Modal;
