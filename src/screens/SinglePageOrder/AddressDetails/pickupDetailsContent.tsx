import React, { useState, useEffect } from "react";
import CustomInputBox from "../../../components/Input";
import WebLocationIcon from "../../../assets/PickUp/WebLocation.svg";
import CrossIcon from "../../../assets/CloseIcon.svg";
import ServiceButton from "../../../components/Button/ServiceButton";
import InfoCircle from "../../../assets/info-circle.svg";
import SearchDropDown from "../components/searchDropDown";
import {
  GET_PINCODE_DATA,
  RETURNING_USER_PICKUP,
} from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import { capitalizeFirstLetter } from "../../../utils/utility";

interface IContact {
  name: string;
  mobileNo: number;
}

interface IPickupDetails {
  fullAddress: string;
  pincode: number;
  contact: IContact;
}

interface IPickupDetailsContentProps {
  details: IPickupDetails;
  landmark: string;
  setIsPickupRightModal: (value: boolean) => void;
  onSave: (details: IPickupDetails, landmark: string) => void;
}

interface ValidationErrors {
  name: string | null;
  mobileNo: string | null;
  pincode: string | null;
  fullAddress: string | null;
  landmark: string | null;
}

const PickupDetailsContent: React.FunctionComponent<
  IPickupDetailsContentProps
> = ({ details, landmark, setIsPickupRightModal, onSave }) => {
  const [pickupDetails, setPickupDetails] = useState<IPickupDetails>(details);
  const [localLandmark, setLocalLandmark] = useState<any>(landmark);

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    name: null,
    mobileNo: null,
    pincode: null,
    fullAddress: null,
    landmark: null,
  });

  useEffect(() => {
    setPickupDetails(details);
    setLocalLandmark(landmark);
  }, [details, landmark]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPickupDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPickupDetails((prevDetails) => ({
      ...prevDetails,
      contact: {
        ...prevDetails.contact,
        [name]: value,
      },
    }));
    validateField(name, value);
  };

  const handleLandmarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalLandmark({
      ...localLandmark,
      landmark: value,
    });
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setPickupDetails((prevDetails: any) => ({
      ...prevDetails,
      pincode: numericValue,
    }));
    if (numericValue.length === 6 || numericValue.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, pincode: null }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        pincode: "PIN code must be a 6-digit number",
      }));
    }
  };

  const handleMobileNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setPickupDetails((prevDetails: any) => ({
      ...prevDetails,
      contact: {
        ...prevDetails.contact,
        mobileNo: numericValue,
      },
    }));
    if (numericValue.length === 10 || numericValue.length === 0) {
      setValidationErrors((prevErrors) => ({ ...prevErrors, mobileNo: null }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        mobileNo: "Mobile number must be a 10-digit number",
      }));
    }
  };

  const validateField = (name: string, value: string) => {
    if (!value) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      }));
    } else {
      setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const handleSave = () => {
    const errors: ValidationErrors = {
      name: pickupDetails.contact.name ? null : "Name is required",
      mobileNo: pickupDetails.contact.mobileNo
        ? null
        : "Mobile Number is required",
      pincode: pickupDetails.pincode ? null : "Pincode is required",
      fullAddress: pickupDetails.fullAddress
        ? null
        : "Full Address is required",
      landmark: localLandmark ? null : "Landmark is required",
    };

    setValidationErrors(errors);

    if (Object.values(errors).some((error) => error !== null)) {
      return; // Prevent saving if there are validation errors
    }

    onSave(pickupDetails, localLandmark);
    setIsPickupRightModal(false); // Close the modal after saving
  };

  const handlePincode = async (pincode: any) => {
    if (pincode.length === 6) {
      const { data: response } = await POST(GET_PINCODE_DATA, { pincode });

      console.log("pincode handler is working");

      setLocalLandmark({
        ...localLandmark,
        state: capitalizeFirstLetter(response?.data?.[0]?.state),
        city: capitalizeFirstLetter(response?.data?.[0]?.city),
        country: "India",
      });
    }
  };

  const autoSetData = (pickupDetails: any, landmark: any) => {
    setPickupDetails(pickupDetails);
    setLocalLandmark(landmark);
  };

  // RETURNING_USER_PICKUP;

  useEffect(() => {
    console.log("localLandmark", localLandmark);
  }, [localLandmark]);

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
        <div className="flex flex-col gap-y-5 mt-1">
          <div>
            <SearchDropDown
              className={`border`}
              apiUrl={RETURNING_USER_PICKUP}
              label="Search Pickup Address"
              setFunc={autoSetData}
              identifier="ADDRESS"
            />
          </div>

          <CustomInputBox
            label="Sender Name"
            value={pickupDetails.contact.name}
            onChange={handleContactChange}
            name="name"
          />
          {validationErrors.name && (
            <div className="flex items-center gap-x-1 mt-1">
              <img src={InfoCircle} alt="info" width={10} height={10} />
              <span className="font-normal text-[#F35838] text-xs leading-3">
                {validationErrors.name}
              </span>
            </div>
          )}
          <div>
            <CustomInputBox
              label="Sender Mobile Number"
              value={pickupDetails.contact.mobileNo.toString()}
              inputMode="numeric"
              maxLength={10}
              onChange={handleMobileNoChange}
              name="mobileNo"
            />
            {validationErrors.mobileNo && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="info" width={10} height={10} />
                <span className="font-normal text-[#F35838] text-xs leading-3">
                  {validationErrors.mobileNo}
                </span>
              </div>
            )}
          </div>
          <CustomInputBox
            label="Address"
            value={pickupDetails.fullAddress}
            className="!h-[70px]"
            onChange={handleInputChange}
            name="fullAddress"
          />
          {validationErrors.fullAddress && (
            <div className="flex items-center gap-x-1 mt-1">
              <img src={InfoCircle} alt="info" width={10} height={10} />
              <span className="font-normal text-[#F35838] text-xs leading-3">
                {validationErrors.fullAddress}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <div>
              <CustomInputBox
                label="Pincode"
                value={pickupDetails.pincode}
                inputMode="numeric"
                maxLength={6}
                onChange={(e: any) => {
                  handlePincode(e.target.value);
                  handlePincodeChange(e);
                }}
                name="pincode"
              />
              {validationErrors.pincode && (
                <div className="flex items-center gap-x-1 mt-1">
                  <img src={InfoCircle} alt="info" width={10} height={10} />
                  <span className="font-normal text-[#F35838] text-xs leading-3">
                    {validationErrors.pincode}
                  </span>
                </div>
              )}
            </div>
            <div>
              <CustomInputBox
                label="Landmark"
                value={localLandmark?.landmark}
                onChange={handleLandmarkChange}
                name="landmark"
              />
              {validationErrors.landmark && (
                <div className="flex items-center gap-x-1 mt-1">
                  <img src={InfoCircle} alt="info" width={10} height={10} />
                  <span className="font-normal text-[#F35838] text-xs leading-3">
                    {validationErrors.landmark}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex justify-end gap-x-5 shadow-lg border-[1px] h-[68px] bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0"
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={"SAVE"}
          onClick={handleSave}
          className={`bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
        />
      </div>
    </>
  );
};

export default PickupDetailsContent;
