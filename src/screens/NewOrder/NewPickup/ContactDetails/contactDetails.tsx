import ContactIcon from "../../../../assets/PickUp/Contact.svg";
import WebContactIcon from "../../../../assets/PickUp/WebContact.svg";
import WarehouseIcon from "../../../../assets/PickUp/Warehouse.svg";
import OfficeIcon from "../../../../assets/PickUp/Office.svg";

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
            label="Name of the contact person"
            value={address.name}
            onChange={(e) => {
              handleContactChange("name", e.target.value);
            }}
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Mobile Number"
            value={address.mobileNo}
            onChange={(e) => {
              handleContactChange("mobileNo", e.target.value);
            }}
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Email ID (optional)"
            value={address.emailId}
            onChange={(e) => {
              handleContactChange("emailId", e.target.value);
            }}
          />
        </div>
        <div className="mb-7 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Alternate mobile number (optional)"
            value={address.alternateMobileNo}
            onChange={(e) => {
              handleContactChange("alternateMobileNo", e.target.value);
            }}
          />
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
