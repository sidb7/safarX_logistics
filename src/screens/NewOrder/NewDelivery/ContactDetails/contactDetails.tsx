import React, { useState } from "react";

import ContactIcon from "../../../../assets/PickUp/Contact.svg";
import WebContactIcon from "../../../../assets/PickUp/WebContact.svg";
import WarehouseIcon from "../../../../assets/PickUp/Warehouse.svg";
import OfficeIcon from "../../../../assets/PickUp/Office.svg";
import InfoCircle from "../../../../assets/info-circle.svg";

import CustomInputBox from "../../../../components/Input";

interface IContactDetailsProps {
  data: {
    deliveryAddress: any;
    setDeliveryAddress: any;
    contactLabel: string;
    inputError: boolean;
  };
}
interface ValidationErrorState {
  name: string | null;
  mobileNo: string | null;
  emailId: string | null;
  alternateMobileNo: string | null;
}

const ContactDetails: React.FunctionComponent<IContactDetailsProps> = ({
  data: { deliveryAddress, setDeliveryAddress, contactLabel, inputError },
}) => {
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrorState>({
      name: null,
      mobileNo: null,
      emailId: null,
      alternateMobileNo: null,
    });
  const address =
    contactLabel === "Billing Address Contact"
      ? deliveryAddress?.billingAddress?.contact
      : deliveryAddress?.deliveryAddress?.contact;
  const handleContactChange = (
    fieldName: keyof typeof address,
    value: string
  ) => {
    const addressName: string =
      contactLabel === "Billing Address Contact"
        ? "billingAddress"
        : "deliveryAddress";
    setDeliveryAddress((prevData: any) => ({
      ...prevData,
      [addressName]: {
        ...prevData[addressName],
        contact: {
          ...prevData[addressName].contact,
          [fieldName]: value,
        },
      },
    }));
  };

  const setValidationError = (
    fieldName: keyof ValidationErrorState,
    error: string | null
  ) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const validateName = (name: string) => {
    if (/^\D+$/.test(name) || name === "") {
      return null;
    } else {
      return "Name should not contain numbers";
    }
  };

  const validateMobileNo = (mobileNo: string) => {
    const numericValue = mobileNo.replace(/[^0-9]/g, "");
    if (numericValue.length === 10 || numericValue.length === 0) {
      return null;
    } else {
      return "Mobile number must be a 10-digit number";
    }
  };

  const validateEmailId = (emailId: string) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId) || emailId === "") {
      return null;
    } else {
      return "Invalid email address";
    }
  };

  const validateAlternateMobileNo = (alternateMobileNo: string) => {
    const numericValue = alternateMobileNo.replace(/[^0-9]/g, "");
    if (numericValue.length === 10 || numericValue.length === 0) {
      return null;
    } else {
      return "Mobile number must be a 10-digit number";
    }
  };
  return (
    <div>
      <div className="flex flex-row items-center gap-2  lg:col-span-3 mb-5 lg:mb-[23px]">
        <img src={ContactIcon} alt="Contact" className="lg:hidden" />
        <img src={WebContactIcon} alt="Contact" className="hidden lg:block" />

        <p className="text-[18px] font-Lato lg:text-[24px] lg:font-Lato lg:text-[#323232]">
          {contactLabel}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Name of the contact person"
            value={address.name}
            onChange={(e) => {
              const nameValue = e.target.value;
              handleContactChange("name", nameValue);
              setValidationError("name", validateName(nameValue));
            }}
            inputError={inputError}
          />
          {validationErrors.name && (
            <div className="flex items-center gap-x-1 mt-1">
              <img src={InfoCircle} alt="" width={10} height={10} />
              <span className="font-normal text-[#F35838] text-xs leading-3">
                {validationErrors.name}
              </span>
            </div>
          )}
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Mobile Number"
            value={address.mobileNo}
            maxLength={10}
            inputMode="numeric"
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              handleContactChange("mobileNo", numericValue);
              setValidationError("mobileNo", validateMobileNo(numericValue));
            }}
            inputError={inputError}
          />
          {validationErrors.mobileNo && (
            <div className="flex items-center gap-x-1 mt-1">
              <img src={InfoCircle} alt="" width={10} height={10} />
              <span className="font-normal text-[#F35838] text-xs leading-3">
                {validationErrors.mobileNo}
              </span>
            </div>
          )}
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            inputType="email"
            label="Email ID (optional)"
            value={address.emailId}
            onChange={(e) => {
              const emailValue = e.target.value;
              handleContactChange("emailId", emailValue);
              setValidationError("emailId", validateEmailId(emailValue));
            }}
          />
          {validationErrors.emailId && (
            <div className="flex items-center gap-x-1 mt-1">
              <img src={InfoCircle} alt="" width={10} height={10} />
              <span className="font-normal text-[#F35838] text-xs leading-3">
                {validationErrors.emailId}
              </span>
            </div>
          )}
        </div>
        <div className="mb-7 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Alternate mobile number (optional)"
            value={address.alternateMobileNo}
            maxLength={10}
            inputMode="numeric"
            onChange={(e) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              handleContactChange("alternateMobileNo", e.target.value);
              setValidationError(
                "alternateMobileNo",
                validateAlternateMobileNo(numericValue)
              );
            }}
          />
          {validationErrors.alternateMobileNo && (
            <div className="flex items-center gap-x-1 mt-1">
              <img src={InfoCircle} alt="" width={10} height={10} />
              <span className="font-normal text-[#F35838] text-xs leading-3">
                {validationErrors.alternateMobileNo}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-3  mb-3 lg:mb-[18px]">
        <p className="text-[#202427] text-[18px] font-Lato lg:font-Lato lg:text-[20px] lg:text-[#323232] ">
          Save your contact as
        </p>
      </div>

      <div className="flex flex-nowrap overflow-x-scroll space-x-4 lg:col-span-3 mb-7 ">
        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] py-2 px-4   ${
            address.type === "shopkeeper"
              ? "border-[#004EFF] text-[#004EFF] "
              : "border-gray-300 text-[#1C1C1C]"
          }`}
          onClick={(e) => {
            handleContactChange("type", "shopkeeper");
          }}
        >
          <img src={OfficeIcon} alt="ShopKeeper" />
          <p className="lg:font-semibold lg:font-Open lg:text-[14px] ">
            Shopkeeper
          </p>
        </div>

        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] py-2 px-4   whitespace-nowrap ${
            address.type === "warehouse associate"
              ? "border-[#004EFF] text-[#004EFF] "
              : "border-gray-300 text-[#1C1C1C]"
          }`}
          onClick={() => {
            handleContactChange("type", "warehouse associate");
          }}
        >
          <img src={WarehouseIcon} alt="Warehouse associate" />
          <p className="lg:font-semibold lg:font-Open  lg:text-[14px] ">
            Warehouse associate
          </p>
        </div>

        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] py-2 px-4   whitespace-nowrap ${
            address.type === "recipient"
              ? "border-[#004EFF] text-[#004EFF] "
              : "border-gray-300 text-[#1C1C1C]"
          }`}
          onClick={() => {
            handleContactChange("type", "recipient");
          }}
        >
          <img src={WarehouseIcon} alt="Warehouse associate" />
          <p className="lg:font-semibold lg:font-Open  lg:text-[14px] ">
            Recipient
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
