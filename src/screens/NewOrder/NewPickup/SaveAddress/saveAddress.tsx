import React, { useState } from "react";
import OfficeIcon from "../../../../assets/PickUp/Office.svg";
import LocationIcon from "../../../../assets/PickUp/Location.svg";
import WarehouseIcon from "../../../../assets/PickUp/Warehouse.svg";

const SaveAddress = () => {
  const [saveAddress, setSaveAddress] = useState({
    office: false,
    warehouse: true,
    other: false,
  });

  const [pickupAddress, setPickupAddress] = useState({
    flatNo: "",
    locality: "",
    fullAddress: "",
    sector: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    addressType: "warehouse",
  });

  const [returnAddress, setReturnAddress] = useState({
    flatNo: "",
    locality: "",
    fullAddress: "",
    sector: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    addressType: "warehouse",
  });

  const handlePickupAddressChange = (
    fieldName: keyof typeof pickupAddress,
    value: string
  ) => {
    setPickupAddress((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleReturnAddressChange = (
    fieldName: keyof typeof returnAddress,
    value: string
  ) => {
    setReturnAddress((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <div>
      <div className="lg:col-span-3 mb-[12px] lg:mb-[18px] ">
        <p className="text-[18px] font-semibold font-Lato lg:text-[20px] lg:text-[#323232] ">
          Save your address as
        </p>
      </div>

      <div className="flex flex-nowrap overflow-x-scroll space-x-4  mb-[28px] lg:mb-[18px] lg:col-span-3">
        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] py-2 px-4  lg:w-[172px] ${
            saveAddress.office === true
              ? "!border-[#004EFF] !text-[#004EFF] "
              : "border-gray-300 text-[#1C1C1C]"
          }`}
          onClick={(e) => {
            setSaveAddress({
              office: true,
              warehouse: false,
              other: false,
            });
            handlePickupAddressChange("addressType", "office");
            handleReturnAddressChange("addressType", "office");
          }}
        >
          <img src={OfficeIcon} alt="ShopKeeper" />
          <p className="lg:font-semibold lg:font-Open lg:text-[14px] ">
            Office
          </p>
        </div>
        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] lg:w-[172px] px-4 py-2 ${
            saveAddress.warehouse === true
              ? "border-[#004EFF] !text-[#004EFF] "
              : "border-gray-300 text-[#1C1C1C]"
          }`}
          onClick={(e) => {
            setSaveAddress({
              office: false,
              warehouse: true,
              other: false,
            });
            handlePickupAddressChange("addressType", "warehouse");
            handleReturnAddressChange("addressType", "warehouse");
          }}
        >
          <img src={LocationIcon} alt="Other" />
          <p className="lg:font-semibold lg:font-Open lg:text-[14px] ">
            Warehouse
          </p>
        </div>
        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] lg:w-[172px] px-4 py-2 ${
            saveAddress.other === true
              ? "border-[#004EFF] text-[#004EFF] "
              : "border-gray-300  text-[#1C1C1C]"
          }`}
          onClick={(e) => {
            setSaveAddress({
              office: false,
              warehouse: false,
              other: true,
            });
            handlePickupAddressChange("addressType", "other");
            handleReturnAddressChange("addressType", "other");
          }}
        >
          <img src={WarehouseIcon} alt="Warehouse associate" />
          <p className="lg:font-semibold lg:font-Open lg:text-[14px] ">Other</p>
        </div>
      </div>
    </div>
  );
};

export default SaveAddress;
