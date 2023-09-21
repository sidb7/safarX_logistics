import React, { useState } from "react";

import WebCrossIcon from "../../../assets/PickUp/ModalCrossWeb.svg";
import CustomInputBox from "../../../../components/Input";
import ServiceButton from "../../../../components/Button/ServiceButton";

interface ITypeProps {
  titleIcon?: string;
  title?: any;
  inputLabel?: string;
  buttonText?: string;
  onClick?: () => void;
  onCustomLandmarkSelection: (customLandmark: string) => void;
}

const ModalContent = (props: ITypeProps) => {
  const {
    titleIcon,
    title,
    inputLabel,
    buttonText,
    onClick,
    onCustomLandmarkSelection,
  } = props;

  const [customLandmark, setCustomLandmark] = useState("");

  const handleLandmarkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomLandmark(event.target.value);
  };

  const handleButtonClick = () => {
    onCustomLandmarkSelection(customLandmark);

    setCustomLandmark("");

    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full relative pt-5">
      <div className="flex items-center justify-between mb-5 px-5">
        <div className="flex items-center gap-x-3">
          <img src={titleIcon} alt="" />
          <p className="font-normal text-2xl">{title}</p>
        </div>
        <div>
          <img
            src={WebCrossIcon}
            alt=""
            onClick={onClick}
            className="cursor-pointer"
          />
        </div>
      </div>
      <CustomInputBox
        label={inputLabel}
        className="px-5"
        value={customLandmark}
        onChange={handleLandmarkChange}
      />
      <div
        className="hidden lg:flex justify-end shadow-lg border-[1px] bg-[#FFFFFF] p-6 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0"
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={buttonText}
          onClick={handleButtonClick}
          className="bg-[#1C1C1C] text-[#FFFFFF] lg:!py-2 lg:!px-4"
        />
      </div>
    </div>
  );
};

export default ModalContent;
