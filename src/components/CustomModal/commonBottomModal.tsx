import React, { useState } from "react";
import CustomReactModal from "./popupModal";
import CloseIcon from "../../assets/CloseIcon.svg";
import CustomInputBox from "../Input";
import CustomButton from "../Button";
import { AudioInput } from "../AudioInput";

interface IModalProps {
  icon: any;
  imgAlt?: string;
  label: string;
  inputLabel: string;
  buttonLabel?: string;
  onClick: () => void;
  showBtn?: boolean;
  audioInput?: boolean;
  setAudio?: any;
  audio?: string
  isModalOpen: boolean;
  setIsModalOpen: any;
}

export const CommonBottomModal: React.FunctionComponent<IModalProps> = ({
  icon,
  label,
  inputLabel,
  buttonLabel,
  onClick,
  imgAlt,
  showBtn = true,
  audioInput = false,
  setAudio,
  audio = "",
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <CustomReactModal
      isModalOpen={isModalOpen}
      closeModal={() => setIsModalOpen(false)}
      showBtn={false}
      showTitle={false}
    >
      <div className="flex flex-col">
        <div className="flex justify-between mt-6">
          <div className="flex">
            <img src={icon} alt={imgAlt} />
            <span className="ml-2 text-lg font-medium">{label}</span>
          </div>
          <div className="flex">
            <img
              src={CloseIcon}
              alt="Close Buttom"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </div>
        <div className=" mt-6">
          {audioInput ? (
            <AudioInput setAudio={setAudio} audio={audio} label={inputLabel} />
          ) : (
            <CustomInputBox label={inputLabel} />
          )}
        </div>
        {showBtn ? (
          <div className=" mt-6">
            <CustomButton text={buttonLabel} onClick={() => onClick()} />
          </div>
        ) : (
          <div className=" mt-6"></div>
        )}
      </div>
    </CustomReactModal>
  );
};
