import React, { useState } from "react";

import ContactIcon from "../../../../assets/PickUp/Contact.svg";
import WebContactIcon from "../../../../assets/PickUp/WebContact.svg";
import WarehouseIcon from "../../../../assets/PickUp/Warehouse.svg";
import OfficeIcon from "../../../../assets/PickUp/Office.svg";
import InfoCircle from "../../../../assets/info-circle.svg";

import CustomInputBox from "../../../../components/Input";

interface IContactDetailsProps {
  data: {
    pickupAddress: any;
    setPickupAddress: any;
    contactLabel: string;
  };
}

const ContactDetails: React.FunctionComponent<IContactDetailsProps> = ({
  data: { pickupAddress, setPickupAddress, contactLabel },
}) => {
  const [mobileValidationError, setMobileValidationError] = useState<
    string | null
  >(null);
  const [nameValidationError, setNameValidationError] = useState<string | null>(
    null
  );
  const [emailValidationError, setEmailValidationError] = useState<
    string | null
  >(null);

  const [alternateMobileValidationError, setAlternateMobileValidationError] =
    useState<string | null>(null);

  const address =
    contactLabel === "Return Address Contact"
      ? pickupAddress?.returnAddress?.contact
      : pickupAddress?.pickupAddress?.contact;
  const handleContactChange = (
    fieldName: keyof typeof address,
    value: string
  ) => {
    const addressName: string =
      contactLabel === "Return Address Contact"
        ? "returnAddress"
        : "pickupAddress";
    setPickupAddress((prevData: any) => ({
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
            inputType="text"
            label="Name of the contact person"
            value={address.name}
            onChange={(e) => {
              const nameValue = e.target.value;

              handleContactChange("name", nameValue);
              if (/^\D+$/.test(nameValue)) {
                setNameValidationError(null); // No validation error
              } else {
                setNameValidationError("Name should not contain numbers"); // Validation error message
              }
            }}
          />
          {nameValidationError && (
            <div className="flex items-center gap-x-1 mt-1">
              <img src={InfoCircle} alt="" width={10} height={10} />
              <span className="font-normal text-[#F35838] text-xs leading-3">
                {nameValidationError}
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
              const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Allow only numeric input
              handleContactChange("mobileNo", numericValue); // Pass the cleaned numeric value to the handler
              if (numericValue.length === 10) {
                setMobileValidationError(null); // No validation error
              } else {
                setMobileValidationError(
                  "Mobile number must be a 10-digit number"
                ); // Validation error message
              }
            }}
          />
          {mobileValidationError && (
            <div className="flex items-center gap-x-1 mt-1">
              <img src={InfoCircle} alt="" width={10} height={10} />
              <span className="font-normal text-[#F35838] text-xs leading-3">
                {mobileValidationError}
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
              if (
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue) ||
                emailValue === ""
              ) {
                setEmailValidationError(null); // No validation error
              } else {
                setEmailValidationError("Invalid email address"); // Validation error message
              }
            }}
          />
          {emailValidationError && (
            <div className="flex items-center gap-x-1 mt-1">
              <img src={InfoCircle} alt="" width={10} height={10} />
              <span className="font-normal text-[#F35838] text-xs leading-3">
                {emailValidationError}
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
              const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Allow only numeric input

              handleContactChange("alternateMobileNo", e.target.value);
              if (numericValue.length === 10) {
                setAlternateMobileValidationError(null); // No validation error
              } else {
                setAlternateMobileValidationError(
                  "Mobile number must be a 10-digit number"
                ); // Validation error message
              }
            }}
          />
          {alternateMobileValidationError && (
            <div className="flex items-center gap-x-1 mt-1">
              <img src={InfoCircle} alt="" width={10} height={10} />
              <span className="font-normal text-[#F35838] text-xs leading-3">
                {alternateMobileValidationError}
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
            address.type === "dispatcher"
              ? "border-[#004EFF] text-[#004EFF] "
              : "border-gray-300 text-[#1C1C1C]"
          }`}
          onClick={() => {
            handleContactChange("type", "dispatcher");
          }}
        >
          <img src={WarehouseIcon} alt="Warehouse associate" />
          <p className="lg:font-semibold lg:font-Open  lg:text-[14px] ">
            Dispatcher
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
