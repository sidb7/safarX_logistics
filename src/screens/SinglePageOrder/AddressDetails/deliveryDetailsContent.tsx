import React, { useState, useEffect } from "react";
import CustomInputBox from "../../../components/Input";
import WebLocationIcon from "../../../assets/PickUp/WebLocation.svg";
import CrossIcon from "../../../assets/CloseIcon.svg";
import ServiceButton from "../../../components/Button/ServiceButton";
import InfoCircle from "../../../assets/info-circle.svg";
import "../../../styles/index.css";
import {
  ADD_DELIVERY_ADDRESS,
  ADD_DELIVERY_LOCATION,
  GET_PINCODE_DATA,
  RETURNING_USER_DELIVERY,
} from "../../../utils/ApiUrls";
import { v4 as uuidv4 } from "uuid";
import SearchDropDown from "../components/searchDropDown";
import { POST } from "../../../utils/webService";
import { capitalizeFirstLetter } from "../../../utils/utility";
import ErrorIcon from "../../../assets/common/info-circle.svg";
import { gstRegex } from "../../../utils/regexCheck";
import toast from "react-hot-toast";

interface IContact {
  name: string;
  mobileNo: number;
}

interface IDeliveryDetails {
  fullAddress: string;
  pincode: number;
  contact: IContact;
  gstNumber: string;
}

interface IDeliveryDetailsContentProps {
  details: IDeliveryDetails;
  landmark: string;
  setIsDeliveryRightModal: (value: boolean) => void;
  onSave: (details: IDeliveryDetails, landmark: string) => void;
  order: any;
}

interface ValidationErrors {
  name: string | null;
  mobileNo: string | null;
  pincode: string | null;
  fullAddress: string | null;
  landmark: string | null;
  gstNumber?: string | null;
  flatNo: string | null;
  sector: string | null;
}

const initialState = {
  pickupDetails: {
    fullAddress: "",
    pincode: 0,
    contact: {
      name: "",
      mobileNo: 0,
    },
  },
  otherAddressDetils: {
    landmark: "",
    country: "",
    city: "",
    state: "",
    flatNo: "",
    sector: "",
    locality: "",
  },
};

const DummyPayLoadDataToAddAddressToCatalagoue = {
  flatNo: "",
  locality: "",
  sector: "",
  landmark: "",
  pincode: "",
  city: "",
  state: "",
  country: "",
  fullAddress: "",
  addressType: "  ",
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
    type: "warehouse associate",
  },
};
const DeliveryDetailsContent: React.FunctionComponent<
  IDeliveryDetailsContentProps
> = ({ details, landmark, setIsDeliveryRightModal, onSave, order }) => {
  const [deliveryDetails, setDeliveryDetails] =
    useState<IDeliveryDetails>(details);
  const [localLandmark, setLocalLandmark] = useState<any>(landmark);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    name: null,
    mobileNo: null,
    pincode: null,
    fullAddress: null,
    landmark: null,
    gstNumber: null,
    flatNo: null,
    sector: null,
  });
  const [isnewData, setIsNewData]: any = useState(false);
  const [isAutoPopulateData, setIsAutoPopulateData]: any = useState(false);
  let kycCheck = localStorage.getItem("kycValue") as any;
  kycCheck = JSON.parse(kycCheck);

  useEffect(() => {
    setDeliveryDetails(details);
    setLocalLandmark(landmark);
  }, [details, landmark]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      contact: {
        ...prevDetails.contact,
        [name]: value,
      },
    }));
    validateField(name, value);
  };

  const handleLandmarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalLandmark({
      ...localLandmark,
      [name]: value,
    });
    validateField(name, value);
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setDeliveryDetails((prevDetails: any) => ({
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
    setDeliveryDetails((prevDetails: any) => ({
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

  const addAddressToCatalogue = async () => {
    try {
      const payload = {
        ...DummyPayLoadDataToAddAddressToCatalagoue,
        flatNo: localLandmark?.flatNo,
        locality: localLandmark?.sector,
        sector: localLandmark?.sector,
        landmark: localLandmark?.landmark,
        pincode: deliveryDetails?.pincode,
        city: localLandmark?.city,
        state: localLandmark?.state,
        country: localLandmark?.country,
        fullAddress: deliveryDetails?.fullAddress,
        addressType: "Delivery Address",
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
          name: deliveryDetails?.contact?.name,
          mobileNo: deliveryDetails?.contact?.mobileNo,
          type: "warehouse associate",
        },
      };
      const { data: response } = await POST(ADD_DELIVERY_ADDRESS, payload);
      if (response?.success) {
        toast.success(response?.message);
        return true;
      } else {
        toast.error(response?.message);
        return false;
      }
    } catch (error) {
      toast.error("An error occurred while adding the address.");
      return false;
    }
  };

  const handleSave = async () => {
    const errors: ValidationErrors = {
      name: deliveryDetails.contact.name ? null : "Name is required",
      mobileNo: deliveryDetails.contact.mobileNo
        ? null
        : "Mobile Number is required",
      pincode: deliveryDetails.pincode ? null : "Pincode is required",
      fullAddress: deliveryDetails.fullAddress
        ? null
        : "Full Address is required",
      landmark: localLandmark ? null : "Landmark is required",
      flatNo: localLandmark.flatNo ? null : "Flat No is required",
      sector: localLandmark.sector ? null : "Locality is required",
    };

    if (order?.orderType === "B2B") {
      if (
        deliveryDetails?.gstNumber == undefined ||
        deliveryDetails?.gstNumber.trim() === ""
      ) {
        errors.gstNumber = "GST Number is required";
      } else if (!gstRegex.test(deliveryDetails?.gstNumber)) {
        errors.gstNumber = "Enter Valid GST Number";
      }
    }
    setValidationErrors(errors);

    if (Object.values(errors).some((error) => error !== null)) {
      return; // Prevent saving if there are validation errors
    }

    if (isnewData) {
      const success: any = await addAddressToCatalogue();
      if (!success) {
        return;
      }
    }

    onSave(deliveryDetails, localLandmark);

    setIsDeliveryRightModal(false);
  };

  const handlePincode = async (pincode: any) => {
    if (pincode.length === 6) {
      const { data: response } = await POST(GET_PINCODE_DATA, { pincode });
      setLocalLandmark({
        ...localLandmark,
        state: capitalizeFirstLetter(response?.data?.[0]?.state),
        city: capitalizeFirstLetter(response?.data?.[0]?.city),
        country: "India",
      });
    }
  };

  const autoSetData = (pickupDetails: any, landmark: any) => {
    setDeliveryDetails(pickupDetails);
    setLocalLandmark(landmark);
  };

  const resetInputFields = (setDefaultState: any) => {
    setDeliveryDetails(setDefaultState?.pickupDetails);
    setLocalLandmark(setDefaultState?.otherAddressDetils);
  };

  useEffect(() => {
    if (
      deliveryDetails?.pincode &&
      localLandmark?.flatNo &&
      localLandmark?.landmark
    ) {
      const fullAddress = `${localLandmark?.flatNo}, ${localLandmark?.sector}, ${localLandmark?.landmark}, ${localLandmark?.city}, ${localLandmark?.state}, ${localLandmark?.country} - ${deliveryDetails?.pincode}`;
      setDeliveryDetails((prevDetails) => ({
        ...prevDetails,
        fullAddress,
      }));
    }
  }, [
    deliveryDetails?.pincode,
    localLandmark?.flatNo,
    localLandmark?.landmark,
    localLandmark?.sector,
    localLandmark?.city,
    localLandmark?.state,
    localLandmark?.country,
  ]);

  return (
    <>
      <div className="mx-5">
        <div className="flex justify-between py-5 items-center text-center">
          <div className="flex gap-x-[8px] ">
            <img src={WebLocationIcon} alt="locationIcon" />
            <p className="font-Lato font-normal text-2xl text-[#323232] leading-8 capitalize">
              Delivery Details
            </p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setIsDeliveryRightModal(false)}
          >
            <img src={CrossIcon} alt="close button" />
          </div>
        </div>
        <div className="flex flex-col gap-y-5 mt-1">
          <div>
            <SearchDropDown
              className={`border`}
              apiUrl={RETURNING_USER_DELIVERY}
              label="Search delivery address"
              setFunc={autoSetData}
              identifier="ADDRESS"
              setIsNewData={setIsNewData}
              setIsAutoPopulateData={setIsAutoPopulateData}
              newDataMessage="Create New Delivery Address"
              setInputData={resetInputFields}
              initialState={initialState}
            />
          </div>
          {(isnewData ||
            isAutoPopulateData ||
            (Object.keys(deliveryDetails).length > 0 &&
              Object.keys(localLandmark).length > 0)) && (
            <>
              <div>
                <CustomInputBox
                  label="Receiver's Name"
                  value={deliveryDetails?.contact?.name}
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
              </div>
              <div>
                <CustomInputBox
                  label="Receiver's Mobile Number"
                  value={deliveryDetails?.contact?.mobileNo.toString()}
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
              <div>
                <textarea
                  // label="Address"
                  placeholder="fullAddress"
                  value={deliveryDetails?.fullAddress}
                  className="!h-[100px] w-[100%] removePaddingPlaceHolder border border-[#999999] text-[13px] rounded-md p-2"
                  // onChange={handleInputChange}
                  disabled={true}
                  name="fullAddress"
                />
                {/* {validationErrors?.fullAddress && (
                  <div className="flex items-center gap-x-1 mt-1">
                    <img src={InfoCircle} alt="info" width={10} height={10} />
                    <span className="font-normal text-[#F35838] text-xs leading-3">
                      {validationErrors?.fullAddress}
                    </span>
                  </div>
                )} */}
              </div>

              <div className="flex gap-x-4">
                <div className="flex-1">
                  <CustomInputBox
                    label="Plot No., Floor, Building Name"
                    value={localLandmark?.flatNo}
                    name="flatNo"
                    onChange={handleLandmarkChange}
                  />

                  {validationErrors?.flatNo && (
                    <div className="flex items-center gap-x-1 mt-1">
                      <img src={InfoCircle} alt="info" width={10} height={10} />
                      <span className="font-normal text-[#F35838] text-xs leading-3">
                        {validationErrors?.flatNo}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <CustomInputBox
                    label="Locality"
                    name="sector"
                    value={localLandmark?.sector}
                    className={` ${
                      validationErrors?.sector && "!border-[#F35838]"
                    } `}
                    onChange={handleLandmarkChange}
                  />
                  {validationErrors?.sector && (
                    <div className="flex items-center gap-x-1 mt-1">
                      <img src={InfoCircle} alt="" width={16} height={16} />
                      <span className="font-normal text-[#F35838] text-xs leading-3 transition-all ease-out delay-100">
                        {validationErrors?.sector}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-x-4 justify-between">
                <div className="flex-1">
                  <CustomInputBox
                    label="Pincode"
                    value={deliveryDetails?.pincode}
                    inputMode="numeric"
                    maxLength={6}
                    onChange={(e: any) => {
                      handlePincode(e.target.value);
                      handlePincodeChange(e);
                    }}
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
                    label="Landmark"
                    value={localLandmark?.landmark}
                    onChange={handleLandmarkChange}
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
              </div>

              {["B2B"].includes(order?.orderType) && (
                <div>
                  <CustomInputBox
                    containerStyle="md:!w-auto"
                    label="GST Number"
                    value={deliveryDetails?.gstNumber}
                    id={"gstNumber"}
                    name="gstNumber"
                    maxLength={15}
                    className={`${
                      validationErrors?.gstNumber !== "" &&
                      validationErrors?.gstNumber !== null &&
                      "border-[#F35838]"
                    }  md:!w-[100%]   !font-Open`}
                    labelClassName="!font-Open"
                    onChange={(e: any) => {
                      handleInputChange(e);
                    }}
                  />
                  {validationErrors?.gstNumber !== "" &&
                    validationErrors?.gstNumber !== null && (
                      <div className="flex items-center gap-x-1 mt-1 ">
                        <img src={ErrorIcon} alt="" width={10} height={10} />
                        <span className="font-normal font-Open text-[#F35838] text-[10px]">
                          {validationErrors?.gstNumber}
                        </span>
                      </div>
                    )}
                </div>
              )}
            </>
          )}
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

export default DeliveryDetailsContent;
