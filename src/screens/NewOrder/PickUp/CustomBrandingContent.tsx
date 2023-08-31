import React, { useState } from "react";
import WebCrossIcon from "../../../assets/PickUp/ModalCrossWeb.svg";
import CustomInputBox from "../../../components/InputBox";
import ServiceButton from "../../../components/Button/ServiceButton";

interface ITypeProps {
  titleIcon?: string;
  title?: any;
  inputLabel?: string;
  buttonText?: string;
  onClick?: () => void;
  //   onCustomLandmarkSelection: (customLandmark: string) => void;
}

const CustomBrandingContent = (props: ITypeProps) => {
  const {
    titleIcon,
    title,
    inputLabel,
    buttonText,
    onClick,
    // onCustomLandmarkSelection,
  } = props;

  const [customBranding, setCustomBranding] = useState({
    brandName: "",
    brandAddress: "",
    brandLogo: "",
    brandContact: "",
  });

  //   const handleCustomBrandingChange = (
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     setCustomBranding(event.target.value);
  //   };

  const handleCustomBrandingChange = (
    fieldName: keyof typeof customBranding,
    value: string
  ) => {
    setCustomBranding((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  console.log("customBranding", customBranding);
  const handleButtonClick = () => {
    // onCustomLandmarkSelection(customBranding);

    // setCustomBranding("");

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
        className="mb-4 lg:mb-6 px-5"
        value={customBranding.brandName}
        onChange={(e) =>
          handleCustomBrandingChange("brandName", e.target.value)
        }
      />

      <CustomInputBox
        label="Brand Address"
        className="mb-4 lg:mb-6 px-5"
        value={customBranding.brandAddress}
        onChange={(e) =>
          handleCustomBrandingChange("brandAddress", e.target.value)
        }
      />
      <CustomInputBox
        label="Brand Logo"
        className="mb-4 lg:mb-6 px-5"
        value={customBranding.brandLogo}
        onChange={(e) =>
          handleCustomBrandingChange("brandLogo", e.target.value)
        }
      />
      <CustomInputBox
        label="Brand Contact"
        className="mb-4 lg:mb-6 px-5"
        value={customBranding.brandContact}
        onChange={(e) =>
          handleCustomBrandingChange("brandContact", e.target.value)
        }
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

export default CustomBrandingContent;
