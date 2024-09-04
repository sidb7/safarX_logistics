import React, { useState } from "react";

import CustomInputBox from "../../../../components/Input";
import WebLocationIcon from "../../../../assets/PickUp/WebLocation.svg";
import CrossIcon from "../../../../assets/CloseIcon.svg";
import ServiceButton from "../../../../components/Button/ServiceButton";
import InfoCircle from "../../../../assets/info-circle.svg";
import OfficeIcon from "../../../../assets/PickUp/Office.svg";
import LocationIcon from "../../../../assets/PickUp/Location.svg";
import WarehouseIcon from "../../../../assets/PickUp/Warehouse.svg";
import SearchDropDown from "../../components/searchDropDown";
import { gstRegex } from "../../../../utils/regexCheck";
import ErrorIcon from "../../../../assets/common/info-circle.svg";
import "../../../../styles/index.css";
import { v4 as uuidv4 } from "uuid";
import {
  ADD_PICKUP_ADDRESS_CATALOGUE,
  ADD_PICKUP_LOCATION,
  GET_PINCODE_DATA,
  RETURNING_USER_PICKUP,
} from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import { capitalizeFirstLetter } from "../../../../utils/utility";
import toast from "react-hot-toast";
import CustomDropDown from "../../../../components/DropDown";

interface IPickupDetailsContentInternationalProps {
  setIsPickupRightModal?: any;
}

const PickupDetailsContentInternational: React.FunctionComponent<
  IPickupDetailsContentInternationalProps
> = ({ setIsPickupRightModal }) => {
  const [pickupAddress, setPickupAddress] = useState<any>({
    pickupAddress: {
      fullAddress: "",
      flatNo: "",
      locality: "",
      sector: "",
      landmark: "",
      pincode: 0,
      city: "",
      state: "",
      country: "",
      countryCode: "",
      addressType: "",
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      workingHours: "09:00",
      contact: {
        name: "",
        mobileNo: 0,
        alternateMobileNo: 0,
        emailId: "",
        type: "",
        mobileNoCode: "",
        alternateMobileNoCode: "",
      },
      pickupDate: 1723185000000,
      companyId: "00a8dd6f-9a70-497e-b7bd-2c149521fdad",
      isActive: true,
      pickupAddressId: "c34348c0-ba8f-4043-82bf-4cdbd2f5b76c",
      isDeleted: false,
      privateCompanyId: 130278,
      createdAt: 1722925257408,
      createdBy: 131622,
      created_At: "2024-07-25T11:49:02.049Z",
      sellerId: 131622,
      updatedAt: 1722925257408,
      updatedBy: 131622,
      updated_At: "2024-07-25T11:49:02.049Z",
    },
    transit: "FORWARD",
    orderType: "INTERNATIONAL_B2B",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [customAddressType, setCustomAddressType] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<any>({
    name: null,
    mobileNo: null,
    alternateMobileNo: null,
    emailId: null,
    landmark: null,
    fullAddress: null,
    pincode: null,
    country: null,
    city: null,
    state: null,
    addressType: null,
  });

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "mobileNo" || name === "alternateMobileNo"
        ? Number(value)
        : value;

    setPickupAddress((prevState: any) => ({
      ...prevState,
      pickupAddress: {
        ...prevState.pickupAddress,
        [name]: updatedValue,
      },
    }));
  };

  // const handlePickupAddressChange = (type: string) => {
  //   setPickupAddress((prevState: any) => ({
  //     ...prevState,
  //     pickupAddress: {
  //       ...prevState.pickupAddress,
  //       addressType: type,
  //       customAddressType:
  //         type === "other"
  //           ? prevState.pickupAddress.customAddressType
  //           : prevState.pickupAddress.customAddressType,
  //     },
  //   }));
  //   setIsVisible(type === "other");
  // };

  // const handleCustomAddressTypeChange = (value: string) => {
  //   setPickupAddress((prevState: any) => ({
  //     ...prevState,
  //     pickupAddress: {
  //       ...prevState.pickupAddress,
  //       customAddressType: value,
  //     },
  //   }));
  // };

  const handlePickupAddressChange = (type: string) => {
    setPickupAddress((prev: any) => ({
      ...prev,
      pickupAddress: {
        ...prev.pickupAddress,
        addressType: type,
        customAddressType:
          type === "other" ? prev.pickupAddress.customAddressType : "", // Clear custom address if not "other"
      },
    }));
    setIsVisible(type === "other");
  };

  const handleCustomAddressTypeChange = (value: string) => {
    setPickupAddress((prev: any) => ({
      ...prev,
      pickupAddress: {
        ...prev.pickupAddress,
        customAddressType: value,
      },
    }));
  };

  const handleDropdownChange = (
    name: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setPickupAddress((prevState: any) => ({
      ...prevState,
      pickupAddress: {
        ...prevState.pickupAddress,
        [name]: value,
      },
    }));
  };

  return (
    <>
      <div className="mx-5">
        <div className="flex justify-between py-5 items-center text-center">
          <div className="flex gap-x-[8px] ">
            <img src={WebLocationIcon} alt="locationIcon" />
            <p className="font-Lato font-normal text-2xl text-[#323232] leading-8 capitalize">
              Pickup Details
            </p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setIsPickupRightModal(false)}
          >
            <img src={CrossIcon} alt="close button" />
          </div>
        </div>
        <div className="flex flex-col gap-y-5 mt-1 customScroll">
          {/* the search with slect drop down  */}
          {/* <div>
            <SearchDropDown
              className={`border`}
              apiUrl={RETURNING_USER_PICKUP}
              label="Search Pickup Address"
              setFunc={autoSetData}
              identifier="ADDRESS"
              setIsNewData={setIsNewData}
              setIsAutoPopulateData={setIsAutoPopulateData}
              newDataMessage="Create New Pickup Address"
              setInputData={resetInputFields}
              initialState={initialState}
            /> */}
          {/* </div> */}

          <div>
            <CustomInputBox
              label="Name"
              value={pickupAddress?.contact?.name}
              // onChange={() => {}}
              onChange={handleTextInputChange}
              name="name"
            />
            {validationErrors?.name && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="info" width={10} height={10} />
                <span className="font-normal text-[#F35838] text-xs leading-3">
                  {validationErrors?.name}
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-x-4 mt-1">
            <div className="flex-3">
              <CustomDropDown
                value={pickupAddress?.contact?.mobileNoCode}
                onChange={(value: any) =>
                  handleDropdownChange("mobileNoCode", value)
                }
                options={[
                  {
                    value: "IN",
                    label: "+91",
                  },
                  {
                    value: "CA",
                    label: "+1",
                  },
                  {
                    value: "AE",
                    label: "+971",
                  },
                  {
                    value: "GB",
                    label: "+44",
                  },
                  {
                    value: "US",
                    label: "+1",
                  },
                ]}
                heading="country code"
              />
            </div>
            <div className="flex-1">
              <CustomInputBox
                label="Mobile Number"
                value={pickupAddress?.contact?.mobileNo.toString()}
                inputMode="numeric"
                maxLength={10}
                // onChange={() => {}}
                onChange={handleTextInputChange}
                name="mobileNo"
              />
              {validationErrors?.mobileNo && (
                <div className="flex items-center gap-x-1 mt-1">
                  <img src={InfoCircle} alt="info" width={10} height={10} />
                  <span className="font-normal text-[#F35838] text-xs leading-3">
                    {validationErrors?.mobileNo}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-x-4 mt-1">
            <div className="flex-3">
              <CustomDropDown
                value={pickupAddress?.contact?.alternateMobileNoCode}
                onChange={(value: any) =>
                  handleDropdownChange("alternateMobileNoCode", value)
                }
                options={[
                  {
                    value: "IN",
                    label: "+91",
                  },
                  {
                    value: "CA",
                    label: "+1",
                  },
                  {
                    value: "AE",
                    label: "+971",
                  },
                  {
                    value: "GB",
                    label: "+44",
                  },
                  {
                    value: "US",
                    label: "+1",
                  },
                ]}
                heading="country code"
              />
            </div>
            <div className="flex-1">
              <CustomInputBox
                label="Alternate Mobile Number"
                value={pickupAddress?.contact?.alternateMobileNo.toString()}
                inputMode="numeric"
                maxLength={10}
                // onChange={() => {}}
                onChange={handleTextInputChange}
                name="alternateMobileNo"
              />
              {validationErrors?.alternateMobileNo && (
                <div className="flex items-center gap-x-1 mt-1">
                  <img src={InfoCircle} alt="info" width={10} height={10} />
                  <span className="font-normal text-[#F35838] text-xs leading-3">
                    {validationErrors?.alternateMobileNo}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            <CustomInputBox
              label="Email ID"
              value={pickupAddress?.contact?.emailId}
              onChange={handleTextInputChange}
              name="emailId"
            />
            {validationErrors?.emailId && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="info" width={10} height={10} />
                <span className="font-normal text-[#F35838] text-xs leading-3">
                  {validationErrors?.emailId}
                </span>
              </div>
            )}
          </div>
          <div>
            <CustomInputBox
              label="Landmark"
              value={pickupAddress?.pickupAddress?.landmark}
              onChange={handleTextInputChange}
              name="landmark"
            />
            {validationErrors?.landmark && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="info" width={10} height={10} />
                <span className="font-normal text-[#F35838] text-xs leading-3">
                  {validationErrors?.landmark}
                </span>
              </div>
            )}
          </div>
          <div>
            <textarea
              // label="Address"
              value={pickupAddress?.pickupAddress?.fullAddress}
              placeholder="fullAddress"
              className="!h-[100px] w-[100%] removePaddingPlaceHolder border border-[#999999] text-[13px] rounded-md p-2"
              name="fullAddress"
              onChange={(e: any) => {
                handleTextInputChange(e);
              }}
            />
            {validationErrors?.fullAddress && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="info" width={10} height={10} />
                <span className="font-normal text-[#F35838] text-xs leading-3">
                  {validationErrors?.fullAddress}
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-x-4">
            <div className="flex-1">
              <CustomInputBox
                label="Pincode"
                value={pickupAddress?.pickupAddress?.pincode}
                // value={""}
                inputMode="numeric"
                maxLength={6}
                // onChange={(e: any) => {
                //   handlePincode(e.target.value);
                //   handlePincodeChange(e);
                // }}
                onChange={handleTextInputChange}
                name="pincode"
              />
              {validationErrors?.pincode && (
                <div className="flex items-center gap-x-1 mt-1">
                  <img src={InfoCircle} alt="info" width={10} height={10} />
                  <span className="font-normal text-[#F35838] text-xs leading-3">
                    {validationErrors?.pincode}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <CustomInputBox
                label="Country"
                name="country"
                value={pickupAddress?.pickupAddress?.country}
                // value={""}
                className={` ${
                  validationErrors?.sector && "!border-[#F35838]"
                } `}
                onChange={() => {}}
              />
              {validationErrors?.country && (
                <div className="flex items-center gap-x-1 mt-1">
                  <img src={InfoCircle} alt="" width={16} height={16} />
                  <span className="font-normal text-[#F35838] text-xs leading-3 transition-all ease-out delay-100">
                    {validationErrors?.country}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-x-4 justify-between">
            <div className="flex-1">
              <CustomInputBox
                label="city"
                value={pickupAddress?.pickupAddress?.city}
                // value={""}
                // inputMode="numeric"
                // maxLength={6}
                // onChange={(e: any) => {
                //   handlePincode(e.target.value);
                //   handlePincodeChange(e);
                // }}
                onChange={() => {}}
                name="city"
              />
              {validationErrors?.pincode && (
                <div className="flex items-center gap-x-1 mt-1">
                  <img src={InfoCircle} alt="info" width={10} height={10} />
                  <span className="font-normal text-[#F35838] text-xs leading-3">
                    {validationErrors?.pincode}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <CustomInputBox
                label="state"
                value={pickupAddress?.pickupAddress?.state}
                // onChange={handlestateChange}
                onChange={() => {}}
                name="state"
              />
              {validationErrors?.landmark && (
                <div className="flex items-center gap-x-1 mt-1">
                  <img src={InfoCircle} alt="info" width={10} height={10} />
                  <span className="font-normal text-[#F35838] text-xs leading-3">
                    {validationErrors?.landmark}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex flex-nowrap space-x-4">
              <div className="flex-1">
                <div
                  className={`flex justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer py-2 px-4  ${
                    pickupAddress?.pickupAddress?.addressType === "office"
                      ? "!border-[#004EFF] !text-[#004EFF] "
                      : "border-gray-300 text-[#1C1C1C]"
                  }`}
                  onClick={() => handlePickupAddressChange("office")}
                  id="shopkeeper"
                >
                  <img src={OfficeIcon} alt="ShopKeeper" />
                  <p className="lg:font-semibold lg:font-Open lg:text-[14px] ">
                    Office
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div
                  className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px] rounded bg-[#FEFEFE] cursor-pointer px-4 py-2 ${
                    pickupAddress?.pickupAddress?.addressType === "warehouse"
                      ? "border-[#004EFF] !text-[#004EFF] "
                      : "border-gray-300 text-[#1C1C1C]"
                  }`}
                  // onClick={(e) => {
                  //   handlePickupAddressChange("addressType", "warehouse");
                  //   // if (
                  //   //   address?.addressName !== "warehouse" &&
                  //   //   address?.addressName !== "office"
                  //   // ) {
                  //   //   setCustomAddressType(address?.addressType);
                  //   // }
                  // }}
                  onClick={() => handlePickupAddressChange("warehouse")}
                  id="warehouse-assistant"
                  // data-testid="warehouse-assistant"
                >
                  <img src={LocationIcon} alt="Other" />
                  <p className="lg:font-semibold lg:font-Open lg:text-[14px] ">
                    Warehouse
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div
                  className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px] rounded bg-[#FEFEFE] cursor-pointer ${
                    pickupAddress?.pickupAddress?.addressType === ""
                      ? "lg:w-[auto]"
                      : "lg:w-auto"
                  } px-4 py-2 ${
                    pickupAddress?.pickupAddress?.addressType !== "office" &&
                    pickupAddress?.pickupAddress?.addressType !== "warehouse"
                      ? "border-[#004EFF] text-[#004EFF] "
                      : "border-gray-300  text-[#1C1C1C]"
                  }`}
                  // onClick={(e) => {
                  //   handlePickupAddressChange("addressType", customAddressType);
                  //   setIsRightAddressTypeModal(true);
                  // }}
                  // onClick={() => {
                  //   setIsVisible(!isVisible);
                  // }}
                  onClick={() => handlePickupAddressChange("other")}
                  id="other"
                  // data-testid="dispatcher"
                >
                  <img src={WarehouseIcon} alt="Warehouse associate" />
                  <p className="lg:font-semibold lg:font-Open lg:text-[14px] whitespace-nowrap">
                    {"Other"}
                  </p>
                </div>
              </div>
              {/* input box to be rendered here on conditon of other address type */}
            </div>
          </div>
          {isVisible ? (
            <div className="">
              <CustomInputBox
                name="address type"
                value={pickupAddress.pickupAddress.customAddressType || ""}
                onChange={(e) => handleCustomAddressTypeChange(e.target.value)}
                // name="customAddressType"
                label="Enter custom address type"
              />
              {/* {validationErrors?.landmark && (
                <div className="flex items-center gap-x-1 mt-1">
                  <img src={InfoCircle} alt="info" width={10} height={10} />
                  <span className="font-normal text-[#F35838] text-xs leading-3">
                    {validationErrors?.landmark}
                  </span>
                </div>
              )} */}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        className="flex justify-end gap-x-5 shadow-lg border-[1px] h-[68px] bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0"
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={"SAVE"}
          // onClick={handleSave}
          onClick={() => {}}
          className={`bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
        />
      </div>
    </>
  );
};

export default PickupDetailsContentInternational;
