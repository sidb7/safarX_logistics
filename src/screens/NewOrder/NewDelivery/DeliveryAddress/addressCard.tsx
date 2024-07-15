import React, { useEffect, useRef, useState } from "react";
import CustomDropDown from "../../../../components/DropDown";
import CustomInputBox from "../../../../components/Input";
import AudioInputBox from "../../../../components/AudioInput/AudioInputBox";
import { Spinner } from "../../../../components/Spinner";
import CustomInputWithImage from "../../../../components/InputWithImage/InputWithImage";
import CustomInputWithDropDown from "../../../../components/LandmarkDropdown/LandmarkDropdown";
import Map from "../../../NewOrder/Map";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router";
import { GET_PINCODE_DATA, VERIFY_ADDRESS } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import { dummyStateDropdownData } from "../../../../utils/dummyData";
import { CommonBottomModal } from "../../../../components/CustomModal/commonBottomModal";

//Icons
import ChooseLocationIcon from "../../../../assets/PickUp/chooseLocation.svg";
import LocationIcon from "../../../../assets/PickUp/Location.svg";
import WebLocationIcon from "../../../../assets/PickUp/WebLocation.svg";
import MagicLocationIcon from "../../../../assets/PickUp/magicLocation.svg";
import AiIcon from "../../../../assets/Buttons.svg";
import MapIcon from "../../../../assets/PickUp/MapIcon.svg";
import RightSideModal from "../../../../components/CustomModal/customRightModal";
import { capitalizeFirstLetter, titleCase } from "../../../../utils/utility";
import InfoCircle from "../../../../assets/info-circle.svg";

//GST Json Data
import gstJsonData from "../../../../data/gstStateCode.json";

interface IAddressCardProps {
  data: {
    orderType: any;
    setOrderType: any;
    deliveryAddress: any;
    setDeliveryAddress: any;
    addressLabel: string;
    inputError: boolean;
    setInputError?: any;
  };
}

const AddressCard: React.FunctionComponent<IAddressCardProps> = ({
  data: {
    orderType,
    setOrderType,
    deliveryAddress,
    setDeliveryAddress,
    addressLabel,
    inputError,
    setInputError,
  },
}) => {
  const address =
    addressLabel === "Billing Address"
      ? deliveryAddress.billingAddress
      : deliveryAddress.deliveryAddress;

  const navigate = useNavigate();
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [locateAddress, setLocateAddress] = useState("");
  const [customLandmark, setCustomLandmark] = useState("");
  const [validGstStateCode, setValidGstStateCode] = useState("");
  const [isLandmarkModal, setIsLandmarkModal] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validationErrorGST, setValidationErrorGST] = useState<string | null>(
    null
  );

  const [isAudioModal, setIsAudioModal] = useState(false);
  const [directionAudio, setDirectionAudio] = useState("");
  const [isLocationRightModal, setIsLocationRightModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [prevPastedData, setPrevPastedData] = useState("");
  const [pastedData, setPastedData] = useState("");

  const [selectedOption, setSelectedOption] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePickupAddressChange = (
    fieldName: keyof typeof address,
    value: string
  ) => {
    const addressName: string =
      addressLabel === "Billing Address" ? "billingAddress" : "deliveryAddress";
    setDeliveryAddress((prevData: any) => {
      const updatedData = {
        ...prevData,
        [addressName]: { ...prevData[addressName], [fieldName]: value },
      };

      if (
        fieldName === "flatNo" ||
        fieldName === "locality" ||
        fieldName === "landmark" ||
        fieldName === "city" ||
        fieldName === "pincode" ||
        fieldName === "state" ||
        fieldName === "country"
      ) {
        const { flatNo, locality, landmark, city, pincode, state, country } =
          updatedData[addressName];
        updatedData[addressName].fullAddress = [
          flatNo,
          locality,
          landmark,
          city,
          pincode,
          state,
          country,
        ]
          .filter(Boolean)
          .join(", ");
      }

      return updatedData;
    });

    if (fieldName === "pincode" && value.length === 6) {
      const payload = {
        pincode: value,
      };

      postServicablePincode(payload);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleButtonClick();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPastedData(e.target.value);
  };

  const handleLandmarkSelected = (landmark: string) => {
    setCustomLandmark(landmark);
  };

  const verifyAddressPayload = {
    data: pastedData,
  };

  const getVerifyAddress = async (verifyAddressPayload: any) => {
    try {
      setLoading(true);

      const { data: verifyAddressResponse } = await POST(
        VERIFY_ADDRESS,
        verifyAddressPayload
      );

      if (verifyAddressResponse?.success) {
        const parsedData = verifyAddressResponse?.data?.message;

        const addressName: any =
          addressLabel === "Billing Address"
            ? "billingAddress"
            : "deliveryAddress";
        setDeliveryAddress((prevData: any) => ({
          ...prevData,
          [addressName]: {
            ...prevData[addressName],
            flatNo:
              `${parsedData.house_number} ${parsedData.floor} ${parsedData.building_name}` ||
              "",
            fullAddress: parsedData.full_address || "",
            locality: parsedData.locality_name || parsedData.landmark || "",
            sector: parsedData.locality_name || parsedData.landmark || "",
            landmark: parsedData.landmark || "",
            pincode: parsedData.pincode || "",
            city: parsedData.city_name || "",
            state: capitalizeFirstLetter(parsedData.state_name) || "",
            country: parsedData.country_name || "India",
            addressType: address.addressType || "warehouse",
          },
        }));
      } else {
        console.error("ChatGpt api error");
      }
    } catch (error) {
      console.error("An error occurred during API request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    const trimmedData = pastedData.trim();

    if (!loading && trimmedData !== "" && trimmedData !== prevPastedData) {
      getVerifyAddress(verifyAddressPayload);
      setPrevPastedData(trimmedData);
    }
  };

  useEffect(() => {
    if (!deliveryAddress.gstNumber) {
      let gstObject = gstJsonData.find(
        (elem) => elem.States === deliveryAddress.deliveryAddress.state
      );

      if (gstObject && deliveryAddress.orderType === "B2B") {
        setDeliveryAddress((prevData: any) => ({
          ...prevData,
          gstNumber: gstObject?.["GST State Code"],
        }));
        setValidGstStateCode(gstObject?.["GST State Code"]);
      }
    }
  }, [deliveryAddress.deliveryAddress.state]);

  const toPascalCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const postServicablePincode = async (payload: any) => {
    try {
      const { data: response } = await POST(GET_PINCODE_DATA, payload);

      if (response?.success) {
        const pincodeData = response.data[0];

        const addressName: any =
          addressLabel === "Billing Address"
            ? "billingAddress"
            : "deliveryAddress";
        setDeliveryAddress((prevData: any) => ({
          ...prevData,
          [addressName]: {
            ...prevData[addressName],
            city: toPascalCase(pincodeData.city) || "",
            state: toPascalCase(pincodeData.state) || "",
            country: "India",
          },
        }));
      }
    } catch (error) {
      console.error("Error in ServicablePincode API", error);
      return error;
    }
  };

  const validateGST = (gstNumber: string): boolean => {
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[0-9A-Z]{1}[0-9A-Z]{1}$/;
    return gstRegex.test(gstNumber);
  };

  console.log("deliveryAddress", deliveryAddress);
  console.log("orderType>>>", orderType);

  console.log("inputError", inputError);
  return (
    <div>
      <div className="inline-flex space-x-2 items-center justify-start mb-5 lg:mb-[10px]">
        <img src={LocationIcon} alt="" className="lg:hidden" />

        <img src={WebLocationIcon} alt="" className="hidden lg:block" />

        <p className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C]  ">
          {addressLabel}
        </p>
      </div>
      <div className="flex flex-col   lg:grid lg:grid-cols-3 ">
        <div className="lg:col-span-2 mb-4 lg:mb-6 lg:mr-6  ">
          <div className="bg-white rounded-lg border border-black overflow-hidden shadow-lg relative">
            <div className="bg-black text-white p-4 h-1/3 flex items-center gap-x-2">
              <img src={MagicLocationIcon} alt="Magic Location Icon" />
              <div className="text-white text-[12px] font-Open">
                Magic Address
              </div>
            </div>

            <div className="relative h-[75px]  ">
              <input
                ref={inputRef}
                type="text"
                value={pastedData}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                className="magicAddressInput w-full"
                style={{
                  position: "absolute",
                  border: "none",
                }}
                placeholder="Paste Address for the Magic"
                title=""
                id="magicAddressInput"
              />
              <div>
                <div className="absolute right-[1%] top-[70%] transform -translate-y-1/2 cursor-pointer">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <img src={AiIcon} alt="Arrow" onClick={handleButtonClick} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block col-span-1 "></div>

        <div className=" mb-4 lg:mb-6 lg:mr-6">
          <CustomInputWithImage
            placeholder="Choose location (optional)"
            imgSrc={ChooseLocationIcon}
            value={locateAddress}
            onChange={(e) => {
              setLocateAddress(e.target.value);
              handlePickupAddressChange("fullAddress", e.target.value);
            }}
            // onClick={() => {
            //   isItLgScreen
            //     ? setIsLocationRightModal(true)
            //     : navigate("/neworder/map");
            // }}
            onClick={() => {
              setIsLocationRightModal(true);
            }}
            name="choose-location"
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Plot No., Floor, Building Name"
            value={address.flatNo}
            onChange={(e) => {
              handlePickupAddressChange("flatNo", e.target.value);
            }}
            inputError={inputError}
            name="flat-no"
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Locality"
            value={address.locality}
            onChange={(e) =>
              handlePickupAddressChange("locality", e.target.value)
            }
            inputError={inputError}
            name="locality"
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6 ">
          <CustomInputWithDropDown
            pastedData={
              address?.fullAddress ? address?.fullAddress : pastedData
            }
            value={address.landmark}
            handlePickupAddressChange={handlePickupAddressChange}
            handleLandmarkSelected={handleLandmarkSelected}
            inputError={inputError}
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Pincode"
            value={address.pincode}
            inputMode="numeric"
            maxLength={6}
            inputError={inputError}
            onChange={(e: any) => {
              const numericValue = e.target.value.replace(/[^0-9]/g, "");
              handlePickupAddressChange("pincode", numericValue);
              if (numericValue.length === 6 || numericValue.length === 0) {
                setValidationError(null);
              } else {
                setValidationError("PIN code must be a 6-digit number");
              }
            }}
            name="pincode"
          />
          {validationError && (
            <div className="flex items-center gap-x-1 mt-1">
              <img src={InfoCircle} alt="" width={10} height={10} />
              <span className="font-normal text-[#F35838] text-xs leading-3">
                {validationError}
              </span>
            </div>
          )}
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="City"
            value={address.city}
            inputError={inputError}
            onChange={(e) => handlePickupAddressChange("city", e.target.value)}
            name="city"
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomDropDown
            value={address.state}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setSelectedOption(event.target.value);
              handlePickupAddressChange("state", event.target.value);
            }}
            options={dummyStateDropdownData}
            placeHolder="Select State"
            inputError={inputError}
            name="state"
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Country"
            value={address.country}
            onChange={(e) =>
              handlePickupAddressChange("country", e.target.value)
            }
            inputError={inputError}
            name="country"
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <AudioInputBox
            label="Add directions(optional)"
            audio={directionAudio}
            setAudio={setDirectionAudio}
            onClick={() => !directionAudio && setIsAudioModal(true)}
          />
        </div>

        {orderType === "B2B" && addressLabel === "Delivery Address" && (
          <div className="mb-4 lg:mb-6 lg:mr-6">
            {/* {console.log("inputError sdsd", inputError) as any} */}
            <CustomInputBox
              label="GST No."
              maxLength={15}
              inputError={inputError}
              value={deliveryAddress.gstNumber}
              onChange={(e: any) => {
                if (validateGST(e.target.value)) {
                  setValidationErrorGST(null);
                  setInputError(false);
                } else {
                  setValidationErrorGST("Invalid GST number");
                  setInputError(true);
                }
                setDeliveryAddress((prevData: any) => {
                  let updatedGSTValue = e.target.value;

                  if (
                    validGstStateCode.length > 0 &&
                    !deliveryAddress.gstNumber.includes(validGstStateCode)
                  ) {
                    updatedGSTValue = "";
                  }

                  return {
                    ...prevData,
                    gstNumber: updatedGSTValue,
                  };
                });
              }}
              // onChange={(e) => {
              //   const gstValue = e.target.value;

              //   const isValidGST = validateGST(gstValue);
              //   console.log("isvalid", isValidGST);
              //   setValidationErrorGST(isValidGST ? null : "Invalid GST number");

              //   // if (setInputError) {
              //   //   setInputError(false);
              //   // }
              // }}
            />

            {(inputError || validationErrorGST) && (
              <div className="flex items-center gap-x-1 mt-1">
                <img src={InfoCircle} alt="" width={10} height={10} />
                <span className="font-normal text-[#F35838] text-xs leading-3">
                  {validationErrorGST || "Invalid GST number"}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <CommonBottomModal
        icon={MapIcon}
        label="Enter Landmark as"
        buttonLabel="CONFIRM"
        inputLabel="Type landmark"
        imgAlt="Landmark Icon"
        isModalOpen={isLandmarkModal}
        setIsModalOpen={setIsLandmarkModal}
        onClick={() => {}}
      />

      <CommonBottomModal
        icon={MapIcon}
        label="Directions to reach"
        inputLabel="Tap to add directions"
        imgAlt="mic"
        showBtn={false}
        audioInput={true}
        isModalOpen={isAudioModal}
        setIsModalOpen={setIsAudioModal}
        onClick={() => {}}
        setAudio={setDirectionAudio}
        audio={directionAudio}
      />

      <RightSideModal
        isOpen={isLocationRightModal}
        onClose={() => setIsLocationRightModal(false)}
        className="!w-[389px]"
      >
        <Map onClick={() => setIsLocationRightModal(false)} />
      </RightSideModal>
    </div>
  );
};

export default AddressCard;

// import React, { useEffect, useRef, useState } from "react";
// import CustomDropDown from "../../../../components/DropDown";
// import CustomInputBox from "../../../../components/Input";
// import AudioInputBox from "../../../../components/AudioInput/AudioInputBox";
// import { Spinner } from "../../../../components/Spinner";
// import CustomInputWithImage from "../../../../components/InputWithImage/InputWithImage";
// import CustomInputWithDropDown from "../../../../components/LandmarkDropdown/LandmarkDropdown";
// import Map from "../../../NewOrder/Map";
// import { useMediaQuery } from "react-responsive";
// import { useNavigate } from "react-router";
// import { GET_PINCODE_DATA, VERIFY_ADDRESS } from "../../../../utils/ApiUrls";
// import { POST } from "../../../../utils/webService";
// import { dummyStateDropdownData } from "../../../../utils/dummyData";
// import { CommonBottomModal } from "../../../../components/CustomModal/commonBottomModal";

// //Icons
// import ChooseLocationIcon from "../../../../assets/PickUp/chooseLocation.svg";
// import LocationIcon from "../../../../assets/PickUp/Location.svg";
// import WebLocationIcon from "../../../../assets/PickUp/WebLocation.svg";
// import MagicLocationIcon from "../../../../assets/PickUp/magicLocation.svg";
// import AiIcon from "../../../../assets/Buttons.svg";
// import MapIcon from "../../../../assets/PickUp/MapIcon.svg";
// import RightSideModal from "../../../../components/CustomModal/customRightModal";
// import { capitalizeFirstLetter, titleCase } from "../../../../utils/utility";
// import InfoCircle from "../../../../assets/info-circle.svg";

// //GST Json Data
// import gstJsonData from "../../../../data/gstStateCode.json";

// interface IAddressCardProps {
//   data: {
//     deliveryAddress: any;
//     setDeliveryAddress: any;
//     addressLabel: string;
//     inputError: boolean;
//     setInputError?: React.Dispatch<React.SetStateAction<boolean>>;
//   };
// }

// const AddressCard: React.FunctionComponent<IAddressCardProps> = ({
//   data: {
//     deliveryAddress,
//     setDeliveryAddress,
//     addressLabel,
//     inputError,
//     setInputError,
//   },
// }) => {
//   const address =
//     addressLabel === "Billing Address"
//       ? deliveryAddress.billingAddress
//       : deliveryAddress.deliveryAddress;

//   const navigate = useNavigate();
//   const isItLgScreen = useMediaQuery({
//     query: "(min-width: 1024px)",
//   });

//   const [locateAddress, setLocateAddress] = useState("");
//   const [customLandmark, setCustomLandmark] = useState("");
//   const [validGstStateCode, setValidGstStateCode] = useState("");
//   const [isLandmarkModal, setIsLandmarkModal] = useState(false);
//   const [validationError, setValidationError] = useState<string | null>(null);
//   const [validationErrorGST, setValidationErrorGST] = useState<string | null>(
//     null
//   );

//   const [isAudioModal, setIsAudioModal] = useState(false);
//   const [directionAudio, setDirectionAudio] = useState("");
//   const [isLocationRightModal, setIsLocationRightModal] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [prevPastedData, setPrevPastedData] = useState("");
//   const [pastedData, setPastedData] = useState("");

//   const [selectedOption, setSelectedOption] = useState("");
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const handlePickupAddressChange = (
//     fieldName: keyof typeof address,
//     value: string
//   ) => {
//     const addressName: string =
//       addressLabel === "Billing Address" ? "billingAddress" : "deliveryAddress";
//     setDeliveryAddress((prevData: any) => {
//       const updatedData = {
//         ...prevData,
//         [addressName]: { ...prevData[addressName], [fieldName]: value },
//       };

//       if (
//         fieldName === "flatNo" ||
//         fieldName === "locality" ||
//         fieldName === "landmark" ||
//         fieldName === "city" ||
//         fieldName === "pincode" ||
//         fieldName === "state" ||
//         fieldName === "country"
//       ) {
//         const { flatNo, locality, landmark, city, pincode, state, country } =
//           updatedData[addressName];
//         updatedData[addressName].fullAddress = [
//           flatNo,
//           locality,
//           landmark,
//           city,
//           pincode,
//           state,
//           country,
//         ]
//           .filter(Boolean)
//           .join(", ");
//       }

//       return updatedData;
//     });

//     if (fieldName === "pincode" && value.length === 6) {
//       const payload = {
//         pincode: value,
//       };

//       postServicablePincode(payload);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleButtonClick();
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPastedData(e.target.value);
//   };

//   const handleLandmarkSelected = (landmark: string) => {
//     setCustomLandmark(landmark);
//   };

//   const verifyAddressPayload = {
//     data: pastedData,
//   };

//   const getVerifyAddress = async (verifyAddressPayload: any) => {
//     try {
//       setLoading(true);

//       const { data: verifyAddressResponse } = await POST(
//         VERIFY_ADDRESS,
//         verifyAddressPayload
//       );

//       if (verifyAddressResponse?.success) {
//         const parsedData = verifyAddressResponse?.data?.message;

//         const addressName: any =
//           addressLabel === "Billing Address"
//             ? "billingAddress"
//             : "deliveryAddress";
//         setDeliveryAddress((prevData: any) => ({
//           ...prevData,
//           [addressName]: {
//             ...prevData[addressName],
//             flatNo:
//               `${parsedData.house_number} ${parsedData.floor} ${parsedData.building_name}` ||
//               "",
//             fullAddress: parsedData.full_address || "",
//             locality: parsedData.locality_name || parsedData.landmark || "",
//             sector: parsedData.locality_name || parsedData.landmark || "",
//             landmark: parsedData.landmark || "",
//             pincode: parsedData.pincode || "",
//             city: parsedData.city_name || "",
//             state: capitalizeFirstLetter(parsedData.state_name) || "",
//             country: parsedData.country_name || "India",
//             addressType: address.addressType || "warehouse",
//           },
//         }));
//       } else {
//         console.error("ChatGpt api error");
//       }
//     } catch (error) {
//       console.error("An error occurred during API request:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleButtonClick = () => {
//     const trimmedData = pastedData.trim();

//     if (!loading && trimmedData !== "" && trimmedData !== prevPastedData) {
//       getVerifyAddress(verifyAddressPayload);
//       setPrevPastedData(trimmedData);
//     }
//   };

//   useEffect(() => {
//     if (!deliveryAddress.gstNumber) {
//       let gstObject = gstJsonData.find(
//         (elem) => elem.States === deliveryAddress.deliveryAddress.state
//       );

//       if (gstObject && deliveryAddress.orderType === "B2B") {
//         setDeliveryAddress((prevData: any) => ({
//           ...prevData,
//           gstNumber: gstObject?.["GST State Code"],
//         }));
//         setValidGstStateCode(gstObject?.["GST State Code"]);
//       }
//     }
//   }, [deliveryAddress.deliveryAddress.state]);

//   const toPascalCase = (str: string) => {
//     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
//   };
//   const postServicablePincode = async (payload: any) => {
//     try {
//       const { data: response } = await POST(GET_PINCODE_DATA, payload);

//       if (response?.success) {
//         const pincodeData = response.data[0];

//         const addressName: any =
//           addressLabel === "Billing Address"
//             ? "billingAddress"
//             : "deliveryAddress";
//         setDeliveryAddress((prevData: any) => ({
//           ...prevData,
//           [addressName]: {
//             ...prevData[addressName],
//             city: toPascalCase(pincodeData.city) || "",
//             state: toPascalCase(pincodeData.state) || "",
//             country: "India",
//           },
//         }));
//       }
//     } catch (error) {
//       console.error("Error in ServicablePincode API", error);
//       return error;
//     }
//   };

//   const validateGST = (gstNumber: string): boolean => {
//     // const gstRegex =
//     //   /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[0-9A-Z]{1}[0-9A-Z]{1}$/;
//     const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z\d{1}$/;

//     return gstRegex.test(gstNumber);
//   };

//   console.log("deliveryAddress", deliveryAddress);

//   console.log("inputError", inputError);
//   return (
//     <div>
//       <div className="inline-flex space-x-2 items-center justify-start mb-5 lg:mb-[10px]">
//         <img src={LocationIcon} alt="" className="lg:hidden" />

//         <img src={WebLocationIcon} alt="" className="hidden lg:block" />

//         <p className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C]  ">
//           {addressLabel}
//         </p>
//       </div>
//       <div className="flex flex-col   lg:grid lg:grid-cols-3 ">
//         <div className="lg:col-span-2 mb-4 lg:mb-6 lg:mr-6  ">
//           <div className="bg-white rounded-lg border border-black overflow-hidden shadow-lg relative">
//             <div className="bg-black text-white p-4 h-1/3 flex items-center gap-x-2">
//               <img src={MagicLocationIcon} alt="Magic Location Icon" />
//               <div className="text-white text-[12px] font-Open">
//                 Magic Address
//               </div>
//             </div>

//             <div className="relative h-[75px]  ">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={pastedData}
//                 onKeyDown={handleKeyDown}
//                 onChange={handleChange}
//                 className="magicAddressInput w-full"
//                 style={{
//                   position: "absolute",
//                   border: "none",
//                 }}
//                 placeholder="Paste Address for the Magic"
//                 title=""
//                 id="magicAddressInput"
//               />
//               <div>
//                 <div className="absolute right-[1%] top-[70%] transform -translate-y-1/2 cursor-pointer">
//                   {loading ? (
//                     <Spinner />
//                   ) : (
//                     <img src={AiIcon} alt="Arrow" onClick={handleButtonClick} />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="hidden lg:block col-span-1 "></div>

//         <div className=" mb-4 lg:mb-6 lg:mr-6">
//           <CustomInputWithImage
//             placeholder="Choose location (optional)"
//             imgSrc={ChooseLocationIcon}
//             value={locateAddress}
//             onChange={(e) => {
//               setLocateAddress(e.target.value);
//               handlePickupAddressChange("fullAddress", e.target.value);
//             }}
//             // onClick={() => {
//             //   isItLgScreen
//             //     ? setIsLocationRightModal(true)
//             //     : navigate("/neworder/map");
//             // }}
//             onClick={() => {
//               setIsLocationRightModal(true);
//             }}
//             name="choose-location"
//           />
//         </div>

//         <div className="mb-4 lg:mb-6 lg:mr-6">
//           <CustomInputBox
//             label="Plot No., Floor, Building Name"
//             value={address.flatNo}
//             onChange={(e) => {
//               handlePickupAddressChange("flatNo", e.target.value);
//             }}
//             inputError={inputError}
//             name="flat-no"
//           />
//         </div>

//         <div className="mb-4 lg:mb-6 lg:mr-6">
//           <CustomInputBox
//             label="Locality"
//             value={address.locality}
//             onChange={(e) =>
//               handlePickupAddressChange("locality", e.target.value)
//             }
//             inputError={inputError}
//             name="locality"
//           />
//         </div>

//         <div className="mb-4 lg:mb-6 lg:mr-6 ">
//           <CustomInputWithDropDown
//             pastedData={
//               address?.fullAddress ? address?.fullAddress : pastedData
//             }
//             value={address.landmark}
//             handlePickupAddressChange={handlePickupAddressChange}
//             handleLandmarkSelected={handleLandmarkSelected}
//             inputError={inputError}
//           />
//         </div>

//         <div className="mb-4 lg:mb-6 lg:mr-6">
//           <CustomInputBox
//             label="Pincode"
//             value={address.pincode}
//             inputMode="numeric"
//             maxLength={6}
//             inputError={inputError}
//             onChange={(e: any) => {
//               const numericValue = e.target.value.replace(/[^0-9]/g, "");
//               handlePickupAddressChange("pincode", numericValue);
//               if (numericValue.length === 6 || numericValue.length === 0) {
//                 setValidationError(null);
//               } else {
//                 setValidationError("PIN code must be a 6-digit number");
//               }
//             }}
//             name="pincode"
//           />
//           {validationError && (
//             <div className="flex items-center gap-x-1 mt-1">
//               <img src={InfoCircle} alt="" width={10} height={10} />
//               <span className="font-normal text-[#F35838] text-xs leading-3">
//                 {validationError}
//               </span>
//             </div>
//           )}
//         </div>

//         <div className="mb-4 lg:mb-6 lg:mr-6">
//           <CustomInputBox
//             label="City"
//             value={address.city}
//             inputError={inputError}
//             onChange={(e) => handlePickupAddressChange("city", e.target.value)}
//             name="city"
//           />
//         </div>

//         <div className="mb-4 lg:mb-6 lg:mr-6">
//           <CustomDropDown
//             value={address.state}
//             onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
//               setSelectedOption(event.target.value);
//               handlePickupAddressChange("state", event.target.value);
//             }}
//             options={dummyStateDropdownData}
//             placeHolder="Select State"
//             inputError={inputError}
//             name="state"
//           />
//         </div>

//         <div className="mb-4 lg:mb-6 lg:mr-6">
//           <CustomInputBox
//             label="Country"
//             value={address.country}
//             onChange={(e) =>
//               handlePickupAddressChange("country", e.target.value)
//             }
//             inputError={inputError}
//             name="country"
//           />
//         </div>

//         <div className="mb-4 lg:mb-6 lg:mr-6">
//           <AudioInputBox
//             label="Add directions(optional)"
//             audio={directionAudio}
//             setAudio={setDirectionAudio}
//             onClick={() => !directionAudio && setIsAudioModal(true)}
//           />
//         </div>

//         {deliveryAddress.orderType === "B2B" &&
//           addressLabel === "Delivery Address" && (
//             <div className="mb-4 lg:mb-6 lg:mr-6">
//               <CustomInputBox
//                 label="GST No."
//                 maxLength={15}
//                 inputError={inputError}
//                 value={deliveryAddress.gstNumber}
//                 onChange={(e) => {
//                   const gstValue = e.target.value;

//                   const isValidGST = validateGST(gstValue);
//                   console.log("isvalid", isValidGST);
//                   setValidationErrorGST(
//                     isValidGST ? null : "Invalid GST number"
//                   );

//                   setDeliveryAddress((prevData: any) => {
//                     let updatedGSTValue = gstValue;

//                     // if (
//                     //   validGstStateCode.length > 0 &&
//                     //   !deliveryAddress.gstNumber.includes(validGstStateCode)
//                     // ) {
//                     //   updatedGSTValue = "";
//                     // }

//                     return {
//                       ...prevData,
//                       gstNumber: updatedGSTValue,
//                     };
//                   });

//                   if (setInputError) {
//                     setInputError(false);
//                   }
//                 }}
//               />
//               {(inputError || validationErrorGST) && (
//                 <div className="flex items-center gap-x-1 mt-1">
//                   <img src={InfoCircle} alt="" width={10} height={10} />
//                   <span className="font-normal text-[#F35838] text-xs leading-3">
//                     {validationErrorGST || "Invalid GST number"}
//                   </span>
//                 </div>
//               )}
//             </div>
//           )}
//       </div>
//       <CommonBottomModal
//         icon={MapIcon}
//         label="Enter Landmark as"
//         buttonLabel="CONFIRM"
//         inputLabel="Type landmark"
//         imgAlt="Landmark Icon"
//         isModalOpen={isLandmarkModal}
//         setIsModalOpen={setIsLandmarkModal}
//         onClick={() => {}}
//       />

//       <CommonBottomModal
//         icon={MapIcon}
//         label="Directions to reach"
//         inputLabel="Tap to add directions"
//         imgAlt="mic"
//         showBtn={false}
//         audioInput={true}
//         isModalOpen={isAudioModal}
//         setIsModalOpen={setIsAudioModal}
//         onClick={() => {}}
//         setAudio={setDirectionAudio}
//         audio={directionAudio}
//       />

//       <RightSideModal
//         isOpen={isLocationRightModal}
//         onClose={() => setIsLocationRightModal(false)}
//         className="!w-[389px]"
//       >
//         <Map onClick={() => setIsLocationRightModal(false)} />
//       </RightSideModal>
//     </div>
//   );
// };

// export default AddressCard;
