import React, { useState } from "react";
import WebCrossIcon from "../../assets/PickUp/ModalCrossWeb.svg";
import CustomInputBox from "../../components/InputBox";
import ServiceButton from "../../components/Button/ServiceButton";

interface ITypeProps {
  titleIcon?: string;
  title?: any;
  inputLabel?: string;
  buttonText?: string;
  onClick?: () => void;
}

const DiscrepancyDetails = (props: ITypeProps) => {
  const { titleIcon, title, inputLabel, buttonText, onClick } = props;

  const [discrepancyDetails, setDiscrepancyDetails] = useState({
    skuNo: "",
    productName: "",
    productCategory: "",
    productPrice: "",
  });

  const handlediscrepancyDetailsChange = (
    fieldName: keyof typeof discrepancyDetails,
    value: string
  ) => {
    setDiscrepancyDetails((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleButtonClick = () => {
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
        value={discrepancyDetails.skuNo}
        onChange={(e) =>
          handlediscrepancyDetailsChange("skuNo", e.target.value)
        }
      />

      <CustomInputBox
        label="Enter Product Name"
        className="mb-4 lg:mb-6 px-5"
        value={discrepancyDetails.productName}
        onChange={(e) =>
          handlediscrepancyDetailsChange("productName", e.target.value)
        }
      />
      <CustomInputBox
        label="Enter Product Category"
        className="mb-4 lg:mb-6 px-5"
        value={discrepancyDetails.productCategory}
        onChange={(e) =>
          handlediscrepancyDetailsChange("productCategory", e.target.value)
        }
      />
      <CustomInputBox
        label="Enter Product Price"
        className="mb-4 lg:mb-6 px-5"
        value={discrepancyDetails.productPrice}
        onChange={(e) =>
          handlediscrepancyDetailsChange("productPrice", e.target.value)
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

export default DiscrepancyDetails;
