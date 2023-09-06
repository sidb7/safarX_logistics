import ContactIcon from "../../../assets/PickUp/Contact.svg";
import WebContactIcon from "../../../assets/PickUp/WebContact.svg";
import WarehouseIcon from "../../../assets/PickUp/Warehouse.svg";
import OfficeIcon from "../../../assets/PickUp/Office.svg";

import CustomInputBox from "../../../../components/Input";
import { useState } from "react";

const ContactDetails = () => {
  const [contact, setContact] = useState({
    name: "",
    mobileNo: "",
    alternateMobileNo: "",
    emailId: "",
    type: "warehouse associate",
  });

  const [returnAddressContact, setReturnAddressContacts] = useState({
    name: contact.name,
    mobileNo: contact.mobileNo,
    alternateMobileNo: contact.alternateMobileNo,
    emailId: contact.emailId,
    type: "warehouse associate",
  });

  const [saveContact, setSaveContact] = useState({
    shopkeeper: false,
    warehouse: true,
    dispatcher: false,
  });

  const handleContactChange = (
    fieldName: keyof typeof contact,
    value: string
  ) => {
    setContact((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleReturnAddressContactChange = (
    fieldName: keyof typeof contact,
    value: string
  ) => {
    setReturnAddressContacts((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-2  lg:col-span-3 mb-5 lg:mb-[23px]">
        <img src={ContactIcon} alt="Contact" className="lg:hidden" />
        <img src={WebContactIcon} alt="Contact" className="hidden lg:block" />

        <p className="text-[18px] font-Lato lg:text-[24px] lg:font-Lato lg:text-[#323232]">
          Pickup Address Contact
        </p>
      </div>

      <div className="mb-4 lg:mb-6 lg:mr-6">
        <CustomInputBox
          label="Name of the contact person"
          value={contact.name}
          onChange={(e) => {
            handleContactChange("name", e.target.value);
            handleReturnAddressContactChange("name", e.target.value);
          }}
        />
      </div>

      <div className="mb-4 lg:mb-6 lg:mr-6">
        <CustomInputBox
          label="Mobile Number"
          value={contact.mobileNo}
          onChange={(e) => {
            handleContactChange("mobileNo", e.target.value);
            handleReturnAddressContactChange("mobileNo", e.target.value);
          }}
        />
      </div>

      <div className="mb-4 lg:mb-6 lg:mr-6">
        <CustomInputBox
          label="Email ID(optional)"
          value={contact.emailId}
          onChange={(e) => {
            handleContactChange("emailId", e.target.value);
            handleReturnAddressContactChange("emailId", e.target.value);
          }}
        />
      </div>
      <div className="mb-7 lg:mb-6 lg:mr-6">
        <CustomInputBox
          label="Alternate mobile number(optional)"
          value={contact.alternateMobileNo}
          onChange={(e) => {
            handleContactChange("alternateMobileNo", e.target.value);
            handleReturnAddressContactChange(
              "alternateMobileNo",
              e.target.value
            );
          }}
        />
      </div>

      <div className="lg:col-span-3  mb-3 lg:mb-[18px]">
        <p className="text-[#202427] text-[18px] font-Lato lg:font-Lato lg:text-[20px] lg:text-[#323232] ">
          Save your contact as
        </p>
      </div>

      <div className="flex flex-nowrap overflow-x-scroll space-x-4 lg:col-span-3 mb-7 ">
        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] py-2 px-4   ${
            saveContact.shopkeeper === true
              ? "border-[#004EFF] text-[#004EFF] "
              : "border-gray-300 text-[#1C1C1C]"
          }`}
          onClick={(e) => {
            setSaveContact({
              shopkeeper: true,

              warehouse: false,
              dispatcher: false,
            });
            handleContactChange("type", "shopkeeper");
            handleReturnAddressContactChange("type", "shopkeeper");
          }}
        >
          <img src={OfficeIcon} alt="ShopKeeper" />
          <p className="lg:font-semibold lg:font-Open lg:text-[14px] ">
            Shopkeeper
          </p>
        </div>

        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] py-2 px-4   whitespace-nowrap ${
            saveContact.warehouse === true
              ? "border-[#004EFF] text-[#004EFF] "
              : "border-gray-300 text-[#1C1C1C]"
          }`}
          onClick={() => {
            setSaveContact({
              shopkeeper: false,

              warehouse: true,
              dispatcher: false,
            });
            handleContactChange("type", "warehouse associate");
            handleReturnAddressContactChange("type", "warehouse associate");

            // isItLgScreen
            //   ? setIsSaveContactRightModal(true)
            //   : setIsSaveContactModal(true);
          }}
        >
          <img src={WarehouseIcon} alt="Warehouse associate" />
          <p className="lg:font-semibold lg:font-Open  lg:text-[14px] ">
            Warehouse associate
          </p>
        </div>

        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] py-2 px-4   whitespace-nowrap ${
            saveContact.dispatcher === true
              ? "border-[#004EFF] text-[#004EFF] "
              : "border-gray-300 text-[#1C1C1C]"
          }`}
          onClick={() => {
            setSaveContact({
              shopkeeper: false,

              warehouse: false,
              dispatcher: true,
            });
            handleContactChange("type", "dispatcher");
            handleReturnAddressContactChange("type", "dispatcher");

            // isItLgScreen
            //   ? setIsSaveContactRightModal(true)
            //   : setIsSaveContactModal(true);
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
