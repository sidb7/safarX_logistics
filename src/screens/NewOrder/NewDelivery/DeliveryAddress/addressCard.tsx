import React, { useRef, useState } from "react";
import CustomDropDown from "../../../../components/DropDown";
import CustomInputBox from "../../../../components/Input";
import AudioInputBox from "../../../../components/AudioInput/AudioInputBox";
import { Spinner } from "../../../../components/Spinner";
import CustomInputWithImage from "../../../../components/InputWithImage/InputWithImage";
import CustomInputWithDropDown from "../../../../components/LandmarkDropdown/LandmarkDropdown";
import Map from "../../../NewOrder/Map";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router";
import { VERIFY_ADDRESS } from "../../../../utils/ApiUrls";
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
import { titleCase } from "../../../../utils/utility";

interface IAddressCardProps {
  data: {
    deliveryAddress: any;
    setDeliveryAddress: any;
    addressLabel: string;
  };
}

const AddressCard: React.FunctionComponent<IAddressCardProps> = ({
  data: { deliveryAddress, setDeliveryAddress, addressLabel },
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
  const [isLandmarkModal, setIsLandmarkModal] = useState(false);

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
    setDeliveryAddress((prevData: any) => ({
      ...prevData,
      [addressName]: { ...prevData[addressName], [fieldName]: value },
    }));
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
          locality: parsedData.locality_name || "",
          sector: parsedData.locality_name || "",
          landmark: address.landmark,
          pincode: parsedData.pincode || "",
          city: parsedData.city_name || "",
          state: parsedData.state_name || "",
          country: parsedData.country_name || "India",
          addressType: address.addressType || "warehouse",
        },
      }));

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
            value={address.flatNo}
            onChange={(e) => {
              handlePickupAddressChange("flatNo", e.target.value);
            }}
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Locality"
            value={address.sector}
            onChange={(e) =>
              handlePickupAddressChange("sector", e.target.value)
            }
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
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Pincode"
            value={address.pincode}
            onChange={(e) =>
              handlePickupAddressChange("pincode", e.target.value)
            }
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="City"
            value={address.city}
            onChange={(e) => handlePickupAddressChange("city", e.target.value)}
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomDropDown
            value={titleCase(address.state)}
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
            value={address.country}
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

        {addressLabel === "Delivery Address" && (
          <div className="mb-4 lg:mb-6 lg:mr-6">
            <CustomInputBox
              label="GST No."
              value={deliveryAddress.gstNumber}
              onChange={(e) =>
                setDeliveryAddress((prevData: any) => ({
                  ...prevData,
                  gstNumber: e.target.value,
                }))
              }
            />
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
