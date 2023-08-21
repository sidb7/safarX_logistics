import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MagicLocationIcon from "../../../assets/Delivery/magicLocation.svg";
import ForwardArrowIcon from "../../../assets/Delivery/forwardArrow.svg";
import microphone from "../../../assets/Delivery/microphone.svg";
import OfficeIcon from "../../../assets/Delivery/Office.svg";
import Warehouse from "../../../assets/Delivery/Warehouse.svg";
import CargoRating from "../../../assets/Delivery/CargoRating.gif";
import DroneDelivery from "../../../assets/Delivery/DroneDelivery.gif";
import LocationIcon from "../../../assets/Delivery/Location.svg";
import ChooseLocationIcon from "../../../assets/Delivery/chooseLocation.svg";
import Checkbox from "../../../components/CheckBox";
import CustomInputBox from "../../../components/Input";
import CustomDropDown from "../../../components/DropDown";
import ContactIcon from "../../../assets/Delivery/Contact.svg";
import CustomInputWithImage from "../../../components/InputWithImage/InputWithImage";
import CustomDatepicker from "../../../components/Datepicker";
import weather from "../../../assets/Delivery/weather.svg";
import WebLocationIcon from "../../../assets/Delivery/WebLocation.svg";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import RightModalContent from "../../../screens/NewOrder/PickUp/RightModalContent";
import SelectDateModalContent from "../PickUp/selectDateModal";
import {
  dummyPickupDropdownData,
  pickupAddress,
} from "../../../utils/dummyData";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Map from "../../NewOrder/Map";
import Switch from "react-switch";
import MapIcon from "../../../assets/PickUp/MapIcon.svg";
import { format, parse } from "date-fns";
import { CommonBottomModal } from "../../../components/CustomModal/commonBottomModal";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state?.address || "";
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const [selectRecipient, setSelectRecipient] = useState({
    business: true,
    consumer: false,
  });

  const [saveAddress, setSaveAddress] = useState({
    office: false,
    warehouse: true,
    other: false,
  });

  const [saveContact, setSaveContact] = useState({
    shopkeeper: false,

    warehouse: true,
  });

  const [pastedData, setPastedData] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isSaveContactRightModal, setIsSaveContactRightModal] = useState(false);
  const [isDateRightModal, setIsDateRightModal] = useState(false);
  const [locateAddress, setLocateAddress] = useState("");
  const [isLandmarkModal, setIsLandmarkModal] = useState(false);
  const [isRightLandmarkModal, setIsRightLandmarkModal] = useState(false);
  const [isAudioModal, setIsAudioModal] = useState(false);
  const [directionAudio, setDirectionAudio] = useState("");
  const [isLocationRightModal, setIsLocationRightModal] = useState(false);

  const [deliveryLocation, setDeliveryLocation] = useState({
    recipientType: "",
    flatNo: "",
    address: "",
    sector: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    addressType: "",
  });

  const [contact, setContact] = useState({
    name: "",
    mobileNo: "",
    alternateMobileNo: "",
    emailId: "",
    type: "",
  });

  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    console.log("mapAddress", address);
    setLocateAddress(address);
  }, [address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPastedData(e.target.value);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData("text");
    setPastedData(pastedData);
  };

  const handledeliveryLocationChange = (
    fieldName: keyof typeof deliveryLocation,
    value: string
  ) => {
    setDeliveryLocation((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const handleContactChange = (
    fieldName: keyof typeof contact,
    value: string
  ) => {
    setContact((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleClick = () => {
    // inputRef.current?.focus();
  };

  console.log("deliveryLocation", deliveryLocation);
  console.log("contact", contact);

  const handlePickupTimeSelected = (deliveryTime: string) => {
    console.log("Selected Pickup Time:", deliveryTime);
    setDeliveryDate(deliveryTime);
  };
  console.log("deliveryDate", deliveryDate);

  const deliveryDateForEpoch = "18/08/2023 11:00 AM";

  const editeddeliveryDateForEpoch = deliveryDate.substring(0, 20);
  console.log("editedPickupDateForEpoch", editeddeliveryDateForEpoch);
  const convertToEpoch = (dateTimeString: any) => {
    const parsedDateTime = parse(
      dateTimeString,
      "dd/MM/yyyy hh:mm a",
      new Date()
    );
    return Math.floor(parsedDateTime.getTime() / 1000);
  };
  const epochDeliveryDate = convertToEpoch(editeddeliveryDateForEpoch);

  console.log("epochDeliveryDate", epochDeliveryDate);

  return (
    <div className="grid grid-cols-1   gap-y-4 ">
      <div className=" h-[54px] bg-[#F5BE6D] p-2 flex items-center  lg:mx-5 lg:mt-11 lg:mb-4 lg:col-span-3">
        <div className="text-sm mx-5 lg:mx-4 text-[#1C1C1C] lg:flex lg:items-center lg:gap-x-2 ">
          <div className="flex">
            <img src={weather} alt="" className="lg:mr-[6px]" />
            <p className="text-[14px] ml-1 font-medium lg:font-semibold lg:text-base">
              HEAVY RAIN WARNING
            </p>
          </div>
          <div className="hidden lg:block">|</div>
          <p className="text-[14px] font-normal lg:font-medium">
            Expect delay in pickup due to weather
          </p>
        </div>
      </div>
      <div className="mx-5  lg:grid lg:grid-cols-3 lg:gap-x-6">
        <div className="relative z-1 mt-5 lg:mb-5  border-[1px] h-[230px] rounded border-[#EAEAEA] bg-[#FFFFFF] drop-shadow-xl px-4 pt-[40px] pb-[8px] lg:w-1/2 lg:col-span-3 ">
          <div className="grid grid-cols-2 gap-3 ">
            <div
              className={`relative z-1  border-[1px] rounded ${
                selectRecipient.business === true
                  ? "border-[#1C1C1C]"
                  : "border-[#EAEAEA]"
              } bg-[#FEFEFE] h-[150px]  p-5 cursor-pointer`}
              onClick={() =>
                setSelectRecipient({ business: true, consumer: false })
              }
            >
              <img
                src={CargoRating}
                alt="Cargo Rating"
                className="h-[100%] w-[100%] object-contain"
              />
              <div className="flex flex-row  items-center  absolute z-2 -top-3 bg-[#FEFEFE] ">
                {selectRecipient.business && (
                  <Checkbox
                    checked={selectRecipient.business === true ? true : false}
                  />
                )}
                <p className="bg-white   lg:font-semibold lg:text-sm">
                  Business
                </p>
              </div>
            </div>
            <div
              className={`relative z-1  border-[1px] rounded  bg-[#FEFEFE] h-[150px] ${
                selectRecipient.consumer === true
                  ? "border-[#1C1C1C]"
                  : "border-[#EAEAEA]"
              }  p-5 cursor-pointer`}
              onClick={() =>
                setSelectRecipient({ business: false, consumer: true })
              }
            >
              <img
                src={DroneDelivery}
                alt="Drone Delivery"
                className="h-[100%] w-[100%] object-contain"
              />
              <div className="flex  absolute z-2 -top-3 items-center  bg-[#FEFEFE]">
                {selectRecipient.consumer && (
                  <Checkbox
                    checked={selectRecipient.consumer === true ? true : false}
                  />
                )}
                <p className="bg-white lg:font-semibold lg:text-sm">Consumer</p>
              </div>
            </div>
          </div>
          <p className="absolute z-2 -top-3 left-5 bg-[#00AEEF] rounded-lg w-[90px] px-[13px] py-[4px] text-[#FFFFFF] lg:font-bold lg:text-[12px] ">
            Recipient
          </p>
        </div>

        <div className="lg:col-span-3">
          <div className="inline-flex space-x-2 items-center justify-start mt-5  lg:mt-6">
            <img src={LocationIcon} alt="" className="lg:hidden" />
            <img src={WebLocationIcon} alt="" className="hidden lg:block" />
            <p className="text-lg font-semibold text-center text-gray-900 lg:font-normal lg:text-2xl lg:text-[#323232]">
              Delivery location
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 mb-5 lg:mb-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg relative mt-5 lg:mt-6 ">
            <div className="bg-black text-white p-4 h-1/3 flex items-center gap-x-2">
              <img
                src={MagicLocationIcon}
                alt="Magic Location Icon"
                className=""
              />
              <div className="text-white text-[12px] font-normal">
                Magic Address
              </div>
            </div>

            <div className="relative h-[75px] ">
              <div className="w-full max-w-xs ">
                <div
                  onClick={handleClick}
                  className="w-full py-2 px-3 text-gray-700 font-Open leading-tight focus:outline-none bg-transparent border-none cursor-text"
                >
                  {pastedData || "Paste Address for the Magic"}
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={pastedData}
                  onPaste={handlePaste}
                  onChange={() => {}}
                  style={{ position: "absolute", left: "-9999px" }}
                  title="inputWithImage"
                />
              </div>
              <div className="absolute right-[1%] top-[70%] transform -translate-y-1/2">
                <img src={ForwardArrowIcon} alt="Arrow" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-1"></div>

        <div className="mb-5 lg:mb-6 ">
          <CustomInputWithImage
            placeholder="Choose location (optional)"
            imgSrc={ChooseLocationIcon}
          />
        </div>

        <div className="relative mb-5 lg:mb-6">
          <CustomInputBox label="Plot no., floor, building name" />
        </div>
        <div className="mb-5 lg:mb-6">
          <CustomInputBox label="Locality" />
        </div>

        <div className="mb-5 lg:mb-6">
          <CustomDropDown
            value={selectedOption}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setSelectedOption(event.target.value);
            }}
            options={[
              {
                label: "Select/ type exact landmark",
                value: "select",
              },
              {
                label: "Option 1",
                value: "option1",
              },
            ]}
          />
        </div>
        <div className="mb-5 lg:mb-6">
          <CustomInputBox label="Pincode" />
        </div>
        <div className="mb-5 lg:mb-6">
          <CustomInputBox label="City" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5 lg:mb-6 lg:hidden">
          <div>
            <CustomInputBox label="State" />
          </div>
          <div>
            <CustomInputBox label="Country" />
          </div>
        </div>

        <div className="hidden lg:block lg:mb-6">
          <CustomInputBox label="State" />
        </div>
        <div className="hidden lg:block lg:mb-6">
          <CustomInputBox label="Country" />
        </div>

        <div className="mb-5 lg:mb-6">
          <CustomInputWithImage
            placeholder="Record the directions(optional)"
            imgSrc={microphone}
          />
        </div>

        <div className="mb-5 lg:mb-6">
          <CustomInputBox label="GST no." />
        </div>

        <div className="mb-5 lg:mb-[18px] lg:col-span-3 ">
          <p className="text-[18px] font-semibold lg:text-[20px] lg:text-[#323232] ">
            Save your address as
          </p>
        </div>
        <div className="flex items-center gap-x-2 lg:gap-x-6 mb-5 lg:mb-6 lg:col-span-3">
          <div
            className={`flex flex-row justify-center text-[16px] h-[35px] items-center gap-[8px]  border-[0.5px]  p-[8px] rounded bg-[#FEFEFE] cursor-pointer lg:px-4 lg:py-2 ${
              saveAddress.office === true
                ? "border-[#004EFF] text-[#004EFF] "
                : " border-gray-300"
            }`}
            onClick={() =>
              setSaveAddress({ office: true, warehouse: false, other: false })
            }
          >
            <img src={OfficeIcon} alt="Office" />
            <p>Office</p>
          </div>
          <div
            className={`flex flex-row justify-center items-center gap-[8px] text-[16px] h-[35px] border-[0.5px]   p-[8px] cursor-pointer rounded bg-[#FEFEFE] lg:px-4 lg:py-2 ${
              saveAddress.warehouse === true
                ? "border-[#004EFF] text-[#004EFF]"
                : "border-gray-300"
            }`}
            onClick={() =>
              setSaveAddress({ office: false, warehouse: true, other: false })
            }
          >
            <img src={Warehouse} alt="Office" />
            <p>Warehouse</p>
          </div>
          <div
            className={`flex flex-row justify-center items-center gap-[8px] h-[35px] text-[16px] border-[0.5px]  cursor-pointer p-[8px] rounded bg-[#FEFEFE] lg:px-4 lg:py-2 ${
              saveAddress.other === true
                ? "border-[#004EFF] text-[#004EFF]"
                : "border-gray-300"
            }`}
            onClick={() =>
              setSaveAddress({ office: false, warehouse: false, other: true })
            }
          >
            <img src={LocationIcon} alt="Office" />
            <p>Other</p>
          </div>
        </div>

        <div className="flex flex-row items-center  mb-5 lg:mb-6 lg:col-span-3">
          <Checkbox />
          <p className="text-[14px] font-medium uppercase text-[#004EFF] lg:font-semibold">
            BILLING DETAILS IS SAME AS DELIVERY
          </p>
        </div>

        <div className="flex flex-row mb-5 lg:mb-[36px] lg:col-span-3">
          <div className="mr-2">
            <span className="text-[14px] font-semibold text-[#004EFF] lg:text-[16px]">
              Opening Hours:
            </span>
          </div>
          <div className="mr-2">
            <span className="text-[14px] text-[#202427] lg:text-[16px] lg:text-[#323232]">
              9am-9pm
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-x-2 mb-5 lg:mb-6 lg:col-span-3">
          <img src={ContactIcon} alt="Contact" />
          <p className="text-[18px] lg:font-normal lg:text-2xl">Contact</p>
        </div>

        <div className="mb-5 lg:mb-6">
          <CustomInputBox label="Name of the contact person" />
        </div>

        <div className="mb-5 lg:mb-6">
          <CustomInputBox label="Mobile Number" />
        </div>

        <div className="mb-5 lg:mb-6">
          <CustomInputBox label="Email ID(optional)" />
        </div>
        <div className="mb-5 lg:mb-6">
          <CustomInputBox label="Alternate mobile number(optional)" />
        </div>
        <div className="mb-5 lg:mb-[18px] lg:col-span-3 ">
          <p className="text-[#202427] text-[18px] font-semibold lg:text-xl">
            Save your contact as
          </p>
        </div>
        <div className="lg:col-span-3 mb-5 lg:mb-7">
          <div className="flex flex-nowrap  overflow-x-scroll space-x-4">
            <div
              className={`flex flex-row justify-center whitespace-nowrap text-[16px] h-[35px] items-center gap-[8px]  border-[0.5px]   px-8 rounded bg-[#FEFEFE] cursor-pointer ${
                saveContact.shopkeeper === true
                  ? "border-[#004EFF] text-[#004EFF] "
                  : "border-gray-300"
              }`}
              onClick={() =>
                setSaveContact({
                  shopkeeper: true,

                  warehouse: false,
                })
              }
            >
              <img src={OfficeIcon} alt="ShopKeeper" />
              <p>Shopkeeper</p>
            </div>

            <div
              className={`flex flex-row justify-center whitespace-nowrap h-[35px] text-[16px] items-center gap-[8px]  border-[0.5px]   px-8 rounded bg-[#FEFEFE] cursor-pointer ${
                saveContact.warehouse === true
                  ? "border-[#004EFF] text-[#004EFF] "
                  : "border-gray-300"
              }`}
              onClick={() => {
                setSaveContact({
                  shopkeeper: false,

                  warehouse: true,
                });

                setIsSaveContactRightModal(true);
              }}
            >
              <img src={Warehouse} alt="Warehouse associate" />
              <p>Warehouse associate</p>
            </div>
          </div>
        </div>
        <div className="mb-5 lg:mb-6">
          <CustomDatepicker onSelect={() => setIsDateRightModal(true)} />
        </div>
      </div>

      <RightSideModal
        isOpen={isSaveContactRightModal}
        onClose={() => setIsSaveContactRightModal(false)}
      >
        <RightModalContent
          title="Save Contact as"
          titleIcon={ContactIcon}
          buttonText="SAVE"
          inputLabel="Warehouse Associate"
          onClick={() => setIsSaveContactRightModal(false)}
        />
      </RightSideModal>

      <RightSideModal
        isOpen={isDateRightModal}
        onClose={() => setIsDateRightModal(false)}
      >
        {/* <SelectDateModalContent onClick={() => setIsDateRightModal(false)} /> */}
      </RightSideModal>
    </div>
  );
};

export default Index;
