import React, { useEffect, useState } from "react";
import OfficeIcon from "../../../../assets/PickUp/Office.svg";
import LocationIcon from "../../../../assets/PickUp/Location.svg";
import WarehouseIcon from "../../../../assets/PickUp/Warehouse.svg";
import RightSideModal from "../../../../components/CustomModal/customRightModal";
import ModalContent from "../RightModal/ModalContent";

interface ISaveAddressProps {
  data: {
    pickupAddress: any;
    setPickupAddress: any;
    addressLabel: string;
  };
}

const SaveAddress: React.FunctionComponent<ISaveAddressProps> = ({
  data: { pickupAddress, setPickupAddress, addressLabel },
}) => {
  const [isRightAddressTypeModal, setIsRightAddressTypeModal] = useState(false);
  const address =
    addressLabel === "Return Address"
      ? pickupAddress.returnAddress
      : pickupAddress.pickupAddress;
  const [customAddressType, setCustomAddressType] = useState("Other");

  const handlePickupAddressChange = (
    fieldName: keyof typeof pickupAddress,
    value: string
  ) => {
    const addressName: string =
      addressLabel === "Return Address" ? "returnAddress" : "pickupAddress";
    setPickupAddress((prevData: any) => ({
      ...prevData,
      [addressName]: { ...prevData[addressName], [fieldName]: value },
    }));
  };

  const handleAddressTypeSelected = (addressName: string) => {
    setCustomAddressType(addressName);
  };
  useEffect(() => {
    if (
      address?.addressType &&
      address?.addressType !== "office" &&
      address?.addressType !== "warehouse"
    ) {
      setCustomAddressType(address?.addressType);
    }
  }, [address?.addressType]);

  return (
    <div>
      <div className="lg:col-span-3 mb-[12px] lg:mb-[18px] ">
        <p className="text-[18px] font-semibold font-Lato lg:text-[20px] lg:text-[#323232] ">
          Save your address as
        </p>
      </div>

      <div className="flex flex-nowrap customScroll space-x-4  mb-[28px] lg:mb-[18px] lg:col-span-3">
        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] py-2 px-4  lg:w-[172px] ${
            address.addressType === "office"
              ? "!border-[#004EFF] !text-[#004EFF] "
              : "border-gray-300 text-[#1C1C1C]"
          }`}
          onClick={(e) => {
            handlePickupAddressChange("addressType", "office");
            // if (
            //   address?.addressName !== "warehouse" &&
            //   address?.addressName !== "office"
            // ) {
            //   setCustomAddressType(address?.addressType);
            // }
          }}
        >
          <img src={OfficeIcon} alt="ShopKeeper" />
          <p className="lg:font-semibold lg:font-Open lg:text-[14px] ">
            Office
          </p>
        </div>
        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] lg:w-[172px] px-4 py-2 ${
            address.addressType === "warehouse"
              ? "border-[#004EFF] !text-[#004EFF] "
              : "border-gray-300 text-[#1C1C1C]"
          }`}
          onClick={(e) => {
            handlePickupAddressChange("addressType", "warehouse");
            // if (
            //   address?.addressName !== "warehouse" &&
            //   address?.addressName !== "office"
            // ) {
            //   setCustomAddressType(address?.addressType);
            // }
          }}
        >
          <img src={LocationIcon} alt="Other" />
          <p className="lg:font-semibold lg:font-Open lg:text-[14px] ">
            Warehouse
          </p>
        </div>
        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px] rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] ${
            address.addressType === ""
              ? "lg:w-[auto] min-w-[172px]"
              : "lg:w-auto"
          } px-4 py-2 ${
            address?.addressType !== "office" &&
            address?.addressType !== "warehouse"
              ? "border-[#004EFF] text-[#004EFF] "
              : "border-gray-300  text-[#1C1C1C]"
          }`}
          onClick={(e) => {
            handlePickupAddressChange("addressType", customAddressType);
            setIsRightAddressTypeModal(true);
          }}
        >
          <img src={WarehouseIcon} alt="Warehouse associate" />
          <p className="lg:font-semibold lg:font-Open lg:text-[14px] whitespace-nowrap">
            {customAddressType}
          </p>
        </div>
      </div>

      <RightSideModal
        isOpen={isRightAddressTypeModal}
        onClose={() => setIsRightAddressTypeModal(false)}
        className="top-[70%] w-full md:!w-[389px] md:top-0"
      >
        <ModalContent
          title="Save Address Type as"
          // stitleIcon={MapIcon}
          buttonText="CONFIRM"
          inputLabel="Address type"
          onClick={() => setIsRightAddressTypeModal(false)}
          onCustomAddressTypeSelection={handleAddressTypeSelected}
          handlePickupAddressChange={handlePickupAddressChange}
        />
      </RightSideModal>
    </div>
  );
};

export default SaveAddress;
