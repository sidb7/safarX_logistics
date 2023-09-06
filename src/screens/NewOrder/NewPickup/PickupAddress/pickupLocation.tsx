import React, { useRef, useState } from "react";
import CustomDropDown from "../../../../components/DropDown";
import CustomInputBox from "../../../../components/Input";
import AudioInputBox from "../../../../components/AudioInput/AudioInputBox";
import { Spinner } from "../../../../components/Spinner";
import CustomInputWithImage from "../../../../components/InputWithImage/InputWithImage";
import CustomCheckbox from "../../../../components/CheckBox";
import CustomInputWithDropDown from "../../../../components/LandmarkDropdown/LandmarkDropdown";

//Icons
import ChooseLocationIcon from "../../../../assets/PickUp/chooseLocation.svg";
import LocationIcon from "../../../../assets/PickUp/Location.svg";
import ContactIcon from "../../../../assets/PickUp/Contact.svg";
import WebLocationIcon from "../../../../assets/PickUp/WebLocation.svg";
import WebContactIcon from "../../../../assets/PickUp/WebContact.svg";
import MagicLocationIcon from "../../../../assets/PickUp/magicLocation.svg";
import AiIcon from "../../../../assets/Buttons.svg";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { VERIFY_ADDRESS } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import { dummyStateDropdownData } from "../../../../utils/dummyData";

const PickupLocation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state?.address || "";
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [locateAddress, setLocateAddress] = useState("");
  const [customLandmark, setCustomLandmark] = useState("");
  const [isAudioModal, setIsAudioModal] = useState(false);
  const [directionAudio, setDirectionAudio] = useState("");
  const [isLocationRightModal, setIsLocationRightModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prevPastedData, setPrevPastedData] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [pastedData, setPastedData] = useState("");
  const [pastedDataReturnAddress, setPastedDataReturnAddress] =
    useState(pastedData);

  const [selectedOption, setSelectedOption] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  const handleReturnAddressContactChange = (
    fieldName: keyof typeof contact,
    value: string
  ) => {
    setReturnAddressContacts((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleChangeReturnAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPastedDataReturnAddress(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPastedData(e.target.value);
  };

  const handleLandmarkSelected = (landmark: string) => {
    setCustomLandmark(landmark);
  };
  const getVerifyAddressReturnAddress = async (
    verifyAddressPayloadForReturnAddress: any
  ) => {
    try {
      setLoading(true);

      const { data: verifyAddressResponse } = await POST(
        VERIFY_ADDRESS,
        verifyAddressPayloadForReturnAddress
      );

      const parsedData = verifyAddressResponse?.data?.message;

      setReturnAddress({
        flatNo:
          `${parsedData.house_number} ${parsedData.floor} ${parsedData.building_name}` ||
          "",
        fullAddress: parsedData.full_address || "",
        locality: parsedData.locality_name || "",
        sector: parsedData.locality_name || "",
        landmark: parsedData.building_name || "",
        pincode: parsedData.pincode || "",
        city: parsedData.city_name || "",
        state: parsedData.state_name || "",
        country: parsedData.country_name || "India",
        addressType: pickupAddress.addressType || "warehouse",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error;
    }
  };
  const verifyAddressPayloadForReturnAddress = {
    data: pastedDataReturnAddress,
  };

  const handleButtonClickReturnAddress = () => {
    const trimmedData = pastedDataReturnAddress.trim();

    if (!loading && trimmedData !== "" && trimmedData !== prevPastedData) {
      getVerifyAddressReturnAddress(verifyAddressPayloadForReturnAddress);
      setPrevPastedData(trimmedData);
    }
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

      const parsedData = verifyAddressResponse?.data?.message;

      setPickupAddress({
        flatNo:
          `${parsedData.house_number} ${parsedData.floor} ${parsedData.building_name}` ||
          "",
        fullAddress: parsedData.full_address || "",
        locality: parsedData.locality_name || "",
        sector: parsedData.locality_name || "",
        landmark: "",
        pincode: parsedData.pincode || "",
        city: parsedData.city_name || "",
        state: parsedData.state_name || "",
        country: parsedData.country_name || "India",
        addressType: pickupAddress.addressType || "warehouse",
      });

      setReturnAddress({
        flatNo:
          `${parsedData.house_number} ${parsedData.floor} ${parsedData.building_name}` ||
          "",
        fullAddress: parsedData.full_address || "",
        locality: parsedData.locality_name || "",
        sector: parsedData.locality_name || "",
        landmark: pickupAddress.landmark,
        pincode: parsedData.pincode || "",
        city: parsedData.city_name || "",
        state: parsedData.state_name || "",
        country: parsedData.country_name || "India",
        addressType: pickupAddress.addressType || "warehouse",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  const handleButtonClick = () => {
    const trimmedData = pastedData.trim();

    if (!loading && trimmedData !== "" && trimmedData !== prevPastedData) {
      getVerifyAddress(verifyAddressPayload);
      setPrevPastedData(trimmedData);
    }
  };

  return (
    <div>
      <div className="inline-flex space-x-2 items-center justify-start px-5 mb-5 lg:mb-[10px]">
        <img src={LocationIcon} alt="" className="lg:hidden" />

        <img src={WebLocationIcon} alt="" className="hidden lg:block" />

        <p className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C]  ">
          Pickup Address
        </p>
      </div>
      <div className="flex flex-col   lg:grid lg:grid-cols-3   px-5">
        <div className="lg:col-span-2 mb-4 lg:mb-6 lg:mr-6  ">
          <div className="bg-white rounded-lg border border-black overflow-hidden shadow-lg relative">
            <div className="bg-black text-white p-4 h-1/3 flex items-center gap-x-2">
              <img
                src={MagicLocationIcon}
                alt="Magic Location Icon"
                className=""
              />
              <div className="text-white text-[12px] font-Open">
                Magic Address
              </div>
            </div>

            <div className="relative h-[75px]  ">
              <input
                ref={inputRef}
                type="text"
                value={pastedData}
                onChange={handleChange}
                className="magicAddressInput"
                style={{
                  position: "absolute",
                  border: "none",
                }}
                placeholder="Paste Address for the Magic"
                title=""
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
            onClick={() => {
              isItLgScreen
                ? setIsLocationRightModal(true)
                : navigate("/neworder/map");
            }}
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Plot No., Floor, Building Name"
            value={pickupAddress.flatNo}
            onChange={(e) => {
              handlePickupAddressChange("flatNo", e.target.value);
            }}
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Locality"
            value={pickupAddress.sector}
            onChange={(e) =>
              handlePickupAddressChange("sector", e.target.value)
            }
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6 ">
          <CustomInputWithDropDown
            pastedData={pastedData}
            handlePickupAddressChange={handlePickupAddressChange}
            handleReturnAddressChange={handleReturnAddressChange}
            handleLandmarkSelected={handleLandmarkSelected}
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Pincode"
            value={pickupAddress.pincode}
            onChange={(e) =>
              handlePickupAddressChange("pincode", e.target.value)
            }
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="City"
            value={pickupAddress.city}
            onChange={(e) => handlePickupAddressChange("city", e.target.value)}
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomDropDown
            value={pickupAddress.state}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setSelectedOption(event.target.value);
              handlePickupAddressChange("state", event.target.value);
            }}
            options={dummyStateDropdownData}
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Country"
            value={pickupAddress.country}
            onChange={(e) =>
              handlePickupAddressChange("country", e.target.value)
            }
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

        <div className="flex flex-row items-center gap-x-[8px] mb-11 lg:col-span-3 lg:mb-5">
          <CustomCheckbox checked={isChecked} onChange={handleCheckboxChange} />
          <p className="text-[14px] font-Open uppercase text-[#004EFF] lg:font-semibold">
            RETURN ADDRESS SAME AS PICKUP
          </p>
        </div>

        {!isChecked && (
          <>
            <div className="flex flex-row items-center gap-2  lg:col-span-3 mb-5 lg:mb-[23px]">
              <img src={LocationIcon} alt="" className="lg:hidden" />

              <img src={WebLocationIcon} alt="" className="hidden lg:block" />

              <p className="text-[18px] font-Lato lg:text-[24px] lg:font-Lato lg:text-[#323232]">
                Return Address
              </p>
            </div>
            <div className="lg:col-span-2 mb-4 lg:mb-6 lg:mr-6  ">
              <div className="bg-white rounded-lg border border-black overflow-hidden shadow-lg relative">
                <div className="bg-black text-white p-4 h-1/3 flex items-center gap-x-2">
                  <img
                    src={MagicLocationIcon}
                    alt="Magic Location Icon"
                    className=""
                  />
                  <div className="text-white text-[12px] font-Open">
                    Magic Address
                  </div>
                </div>

                <div className="relative h-[75px]  ">
                  <input
                    ref={inputRef}
                    type="text"
                    value={pastedDataReturnAddress}
                    onChange={handleChangeReturnAddress}
                    className="magicAddressInput"
                    style={{
                      position: "absolute",
                      border: "none",
                    }}
                    placeholder="Paste Address for the Magic"
                    title=""
                  />
                  <div>
                    <div className="absolute right-[1%] top-[70%] transform -translate-y-1/2 cursor-pointer">
                      {loading ? (
                        <Spinner />
                      ) : (
                        <img
                          src={AiIcon}
                          alt="Arrow"
                          onClick={handleButtonClickReturnAddress}
                        />
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
                }}
                onClick={() => {
                  isItLgScreen
                    ? setIsLocationRightModal(true)
                    : navigate("/neworder/map");
                }}
              />
            </div>

            <div className="mb-4 lg:mb-6 lg:mr-6">
              <CustomInputBox
                label="Plot No., Floor, Building Name"
                value={returnAddress.flatNo}
                onChange={(e) => {
                  handleReturnAddressChange("flatNo", e.target.value);
                }}
              />
            </div>

            <div className="mb-4 lg:mb-6 lg:mr-6">
              <CustomInputBox
                label="Locality"
                value={returnAddress.sector}
                onChange={(e) =>
                  handleReturnAddressChange("sector", e.target.value)
                }
              />
            </div>

            <div className="mb-4 lg:mb-6  lg:mr-6 ">
              <CustomInputWithDropDown
                pastedData={pastedDataReturnAddress}
                handlePickupAddressChange={handleReturnAddressChange}
                handleLandmarkSelected={handleLandmarkSelected}
              />
            </div>

            <div className="mb-4 lg:mb-6 lg:mr-6">
              <CustomInputBox
                label="Pincode"
                value={returnAddress.pincode}
                onChange={(e) =>
                  handleReturnAddressChange("pincode", e.target.value)
                }
              />
            </div>

            <div className="mb-4 lg:mb-6 lg:mr-6">
              <CustomInputBox
                label="City"
                value={returnAddress.city}
                onChange={(e) =>
                  handleReturnAddressChange("city", e.target.value)
                }
              />
            </div>

            <div className="mb-4 lg:mb-6 lg:mr-6">
              <CustomDropDown
                value={returnAddress.state}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  setSelectedOption(event.target.value);
                  handleReturnAddressChange("state", event.target.value);
                }}
                options={dummyStateDropdownData}
              />
            </div>

            <div className="mb-4 lg:mb-6 lg:mr-6">
              <CustomInputBox
                label="Country"
                value={returnAddress.country}
                onChange={(e) =>
                  handleReturnAddressChange("country", e.target.value)
                }
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

            <div className="flex flex-row items-center gap-2  lg:col-span-3 mb-5 lg:mb-[23px]">
              <img src={ContactIcon} alt="Contact" className="lg:hidden" />
              <img
                src={WebContactIcon}
                alt="Contact"
                className="hidden lg:block"
              />

              <p className="text-[18px] font-Lato lg:text-[24px] lg:font-Lato lg:text-[#323232]">
                Return Address Contact
              </p>
            </div>

            <div className="mb-4 lg:mb-6 lg:mr-6">
              <CustomInputBox
                label="Name of the contact person"
                value={returnAddressContact.name}
                onChange={(e) =>
                  handleReturnAddressContactChange("name", e.target.value)
                }
              />
            </div>

            <div className="mb-4 lg:mb-6 lg:mr-6">
              <CustomInputBox
                label="Mobile Number"
                value={returnAddressContact.mobileNo}
                onChange={(e) =>
                  handleReturnAddressContactChange("mobileNo", e.target.value)
                }
              />
            </div>

            <div className="mb-4 lg:mb-6 lg:mr-6">
              <CustomInputBox
                label="Email Id(optional)"
                value={returnAddressContact.emailId}
                onChange={(e) =>
                  handleReturnAddressContactChange("emailId", e.target.value)
                }
              />
            </div>
            <div className="mb-7 lg:mb-6 lg:mr-6">
              <CustomInputBox
                label="Alternate mobile number(optional)"
                value={returnAddressContact.alternateMobileNo}
                onChange={(e) =>
                  handleReturnAddressContactChange(
                    "alternateMobileNo",
                    e.target.value
                  )
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PickupLocation;
