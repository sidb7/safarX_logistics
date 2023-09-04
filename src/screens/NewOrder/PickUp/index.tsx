import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MagicLocationIcon from "../../../assets/PickUp/magicLocation.svg";
import ForwardArrowIcon from "../../../assets/PickUp/forwardArrow.svg";
import ChooseLocationIcon from "../../../assets/PickUp/chooseLocation.svg";
import Warehouse from "../../../assets/PickUp/Warehouse.svg";
import OfficeIcon from "../../../assets/PickUp/Office.svg";
import LocationIcon from "../../../assets/PickUp/Location.svg";
import CalenderIcon from "../../../assets/calendar.svg";
import ContactIcon from "../../../assets/PickUp/Contact.svg";
import PersonIcon from "../../../assets/PickUp/PersonIcon.svg";
import CustomCheckbox from "../../../components/CheckBox";
import AiIcon from "../../../assets/Buttons.svg";
import CustomDatePicker from "../../../components/Datepicker";
import CustomInputBox from "../../../components/Input";
import CustomInputWithImage from "../../../components/InputWithImage/InputWithImage";
import Switch from "react-switch";
import { CommonBottomModal } from "../../../components/CustomModal/commonBottomModal";
import AudioInputBox from "../../../components/AudioInput/AudioInputBox";
import { Spinner } from "../../../components/Spinner";
import SelectDateModalContent from "./selectDateModal";
import WebLocationIcon from "../../../assets/PickUp/WebLocation.svg";
import WebContactIcon from "../../../assets/PickUp/WebContact.svg";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import { useMediaQuery } from "react-responsive";
import Map from "../../NewOrder/Map";
import TickLogo from "../../../assets/common/Tick.svg";
import { ADD_PICKUP_LOCATION, VERIFY_ADDRESS } from "../../../utils/ApiUrls";
import editIcon from "../../../assets/serv/edit.svg";
import AccordionUp from "../../../assets/AccordionUp.svg";

import {
  dummyPickupDropdownData,
  dummyStateDropdownData,
} from "../../../utils/dummyData";
import RightModalContent from "./RightModalContent";
import MapIcon from "../../../assets/PickUp/MapIcon.svg";
import "../../../styles/switch.css";
import { getLocalStorage } from "../../../utils/utility";
import { useLocation } from "react-router-dom";
import { POST } from "../../../utils/webService";
import { POST_SIGN_IN_URL } from "../../../utils/ApiUrls";
import { format, parse } from "date-fns";
import Stepper from "../../../components/Stepper";
import BackArrowIcon from "../../../assets/backArrow.svg";
import WebBackArrowIcon from "../../../assets/PickUp/EssentialWeb.svg";
import NavBar from "../../../layout/Old_NavBar";
import ServiceButton from "../../../components/Button/ServiceButton";
import { toast } from "react-toastify";
import { Breadcum } from "../../../components/Layout/breadcrum";
import BottomLayout from "../../../components/Layout/bottomLayout";
import LandmarkContent from "./landmarkContent";
import CustomBrandingContent from "./CustomBrandingContent";
import CustomDropDown from "../../../components/DropDown";
import CustomInputWithDropDown from "../../../components/LandmarkDropdown/LandmarkDropdown";
import Checkbox from "../../../components/CheckBox";

type TimingState = {
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
  Sunday: boolean;
};

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state?.address || "";
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const [pastedData, setPastedData] = useState("");
  const [pastedDataReturnAddress, setPastedDataReturnAddress] =
    useState(pastedData);

  const [selectedOption, setSelectedOption] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [saveAddress, setSaveAddress] = useState({
    office: false,
    warehouse: true,
    other: false,
  });
  const [timing, setTiming] = useState<TimingState>({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true,
  });

  const [saveContact, setSaveContact] = useState({
    shopkeeper: false,

    warehouse: true,
    dispatcher: false,
  });

  const [toggleStatus, setToggleStatus] = useState(false);
  const [locateAddress, setLocateAddress] = useState("");
  const [isLandmarkModal, setIsLandmarkModal] = useState(false);
  const [isRightLandmarkModal, setIsRightLandmarkModal] = useState(false);
  const [customBrandingModal, setCustomBrandingModal] = useState(false);
  const [customBrandingRightModal, setCustomBrandingRightModal] =
    useState(false);

  const [isSaveContactModal, setIsSaveContactModal] = useState(false);
  const [isSaveContactRightModal, setIsSaveContactRightModal] = useState(false);
  const [customLandmark, setCustomLandmark] = useState("");
  const [isAudioModal, setIsAudioModal] = useState(false);
  const [directionAudio, setDirectionAudio] = useState("");
  // const { address } = useAppSelector((state) => state.map);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isDateRightModal, setIsDateRightModal] = useState(false);
  const [isLocationModal, setIsLocationModal] = useState(false);
  const [isLocationRightModal, setIsLocationRightModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prevPastedData, setPrevPastedData] = useState("");
  const [isChecked, setIsChecked] = useState(true);

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

  const [customBranding, setCustomBranding] = useState({
    name: "",
    logo: "",
    address: "",
    contact: {
      name: "",
      mobileNo: "",
    },
  });

  const [pickupDate, setPickupDate] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPastedData(e.target.value);
  };

  const handleChangeReturnAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPastedDataReturnAddress(e.target.value);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData("text");
    setPastedData(pastedData);
  };

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

  const handleContactChange = (
    fieldName: keyof typeof contact,
    value: string
  ) => {
    setContact((prevData) => ({
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

  const handleTimingChange = (fieldName: keyof TimingState) => {
    setTiming((prevData) => ({
      ...prevData,
      [fieldName]: !prevData[fieldName],
    }));
  };
  const handleCustomBrandingChange = (
    fieldName: keyof typeof customBranding,
    value: string
  ) => {
    setCustomBranding((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  // const handleClick = () => {
  //   // inputRef.current?.focus();
  // };

  /* parsing code for prefilling address input fields  */
  // const parseAddress = (address: any) => {
  //   const addressParts = address.split(", ");
  //   const [flatNo, addressLine] = addressParts[0].split(", ");
  //   const sector = addressParts[7];
  //   const landmark = addressParts[5];
  //   const [city, state, pincode] = addressParts.slice(-3);
  //   return {
  //     flatNo,
  //     address: address,
  //     sector,
  //     landmark,
  //     pincode,
  //     city,
  //     state,
  //     country: "India",
  //   };
  // };

  // useEffect(() => {
  //   const parsedAddress = parseAddress(locateAddress);
  //   setPickupAddress((prevData) => ({
  //     ...prevData,
  //     ...parsedAddress,
  //   }));
  // }, [locateAddress]);

  // const parsedLandmarks = pickupAddress.landmark?.split(", ");
  // const addressDropdownOptions = [
  //   {
  //     label: "Select/ type exact landmark",
  //     value: "select",
  //   },
  //   ...parsedLandmarks?.map((item) => ({
  //     label: item,
  //     value: item,
  //   })),
  //   {
  //     label: "Other",
  //     value: "other",
  //   },
  // ];

  const handlePickupTimeSelected = (pickupTime: string) => {
    setPickupDate(pickupTime);
  };

  const handleLandmarkSelected = (landmark: string) => {
    setCustomLandmark(landmark);
  };
  // const pickupDateForEpoch = "18/08/2023 11:00 AM";

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setReturnAddress({
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
    setReturnAddressContacts({
      name: "",
      mobileNo: "",
      alternateMobileNo: "",
      emailId: "",
      type: "warehouse associate",
    });
  };

  const editedPickupDateForEpoch = pickupDate.substring(0, 19);
  const convertToEpoch = (dateTimeString: any) => {
    const parsedDateTime = parse(
      dateTimeString,
      "dd/MM/yyyy hh:mm a",
      new Date()
    );
    return Math.floor(parsedDateTime.getTime() / 1000);
  };
  const epochPickupDate = convertToEpoch(editedPickupDateForEpoch);

  const payload = {
    pickupAddress: {
      flatNo: pickupAddress.flatNo,
      fullAddress: pickupAddress.fullAddress,
      sector: pickupAddress.sector,
      locality: pickupAddress.locality,
      landmark: pickupAddress.landmark,
      pincode: pickupAddress.pincode,
      city: pickupAddress.city,
      state: pickupAddress.state,
      country: pickupAddress.country,
      addressType: pickupAddress.addressType,
      workingDays: {
        monday: timing.Monday,
        tuesday: timing.Tuesday,
        wednesday: timing.Wednesday,
        thursday: timing.Thursday,
        friday: timing.Friday,
        saturday: timing.Saturday,
        sunday: timing.Sunday,
      },
      workingHours: "0900-1900",
      contact: {
        name: contact.name,
        mobileNo: contact.mobileNo,
        alternateMobileNo: contact.alternateMobileNo,
        emailId: contact.emailId,
        type: contact.type,
      },
      pickupDate: epochPickupDate,
    },
    returnAddress: {
      flatNo: returnAddress.flatNo,
      fullAddress: returnAddress.fullAddress,
      sector: returnAddress.sector,
      landmark: returnAddress.landmark,
      pincode: returnAddress.pincode,
      city: returnAddress.city,
      state: returnAddress.state,
      country: returnAddress.country,
      addressType: returnAddress.addressType,
      contact: {
        name: returnAddressContact.name,
        mobileNo: returnAddressContact.mobileNo,
        alternateMobileNo: returnAddressContact.alternateMobileNo,
        emailId: returnAddressContact.emailId,
        type: returnAddressContact.type,
      },
      // customBranding: {
      //   name: customBranding.name,
      //   logo: customBranding.logo,
      //   address: customBranding.address,
      //   contact: {
      //     name: customBranding.contact.name,
      //     mobileNo: customBranding.contact.mobileNo,
      //   },
      // },
      // pickupDate: epochPickupDate,
    },
    branding: {
      name: customBranding.name,
      logo: customBranding.logo,
      address: customBranding.address,
      contact: {
        name: customBranding.contact.name,
        mobileNo: customBranding.contact.mobileNo,
      },
    },
  };

  console.log("payload", payload);

  const postPickupOrderDetails = async (payload: any) => {
    try {
      const { data: response } = await POST(ADD_PICKUP_LOCATION, payload);

      if (response?.success) {
        toast.success(response?.message);
        navigate("/orders/add-order/delivery");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      return error;
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

  const verifyAddressPayloadForReturnAddress = {
    data: pastedDataReturnAddress,
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

      // setPickupAddress({
      //   flatNo:
      //     `${parsedData.house_number} ${parsedData.floor} ${parsedData.building_name}` ||
      //     "",
      //   fullAddress: parsedData.full_address || "",
      //   locality: parsedData.locality_name || "",
      //   sector: parsedData.locality_name || "",
      //   landmark: parsedData.building_name || "",
      //   pincode: parsedData.pincode || "",
      //   city: parsedData.city_name || "",
      //   state: parsedData.state_name || "",
      //   country: parsedData.country_name || "India",
      //   addressType: pickupAddress.addressType || "warehouse",
      // });

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

  const handleButtonClickReturnAddress = () => {
    const trimmedData = pastedDataReturnAddress.trim();

    if (!loading && trimmedData !== "" && trimmedData !== prevPastedData) {
      getVerifyAddressReturnAddress(verifyAddressPayloadForReturnAddress);
      setPrevPastedData(trimmedData);
    }
  };

  // useEffect(() => {
  //   // const verifyAddressMapPayload = {
  //   //   data: address,
  //   // };
  //   setLocateAddress(address);
  //   // return () => {
  //   //   setLocateAddress("");
  //   // };
  // }, [address]);

  const steps = [
    {
      label: "Pickup",
      isCompleted: false,
      isActive: true,
      imgSrc: TickLogo,
    },
    {
      label: "Delivery",
      isCompleted: false,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Product",
      isCompleted: false,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Service",
      isCompleted: false,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Summary",
      isCompleted: false,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Payment",
      isCompleted: false,
      isActive: false,
      imgSrc: TickLogo,
    },
  ];

  return (
    <div className="w-full">
      <Breadcum label="Add New Order" />
      <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div>
      <div className="inline-flex space-x-2 items-center justify-start px-5 mb-5 lg:mb-[10px]">
        <img src={LocationIcon} alt="" className="lg:hidden" />

        <img src={WebLocationIcon} alt="" className="hidden lg:block" />

        <p className="font-semibold font-Lato text-center text-gray-900 lg:font-normal text-[1.5rem] lg:text-[#1C1C1C]  ">
          Pickup location
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
                // onPaste={handlePaste}
                onChange={handleChange}
                className="magicAddressInput"
                // className="custom-input"
                style={{
                  position: "absolute",
                  border: "none",
                  // left: "10px",
                  // background: "black",
                  // width: "10px",
                  // height: "25px",

                  // top: "-10px",
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

        {/* <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Landmark"
            value={pickupAddress.landmark}
            onChange={(e) =>
              handlePickupAddressChange("landmark", e.target.value)
            }
          />
        </div> */}

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Pincode"
            value={pickupAddress.pincode}
            // onChange={(e) =>
            //   setPickupAddress({ ...pickupAddress, pincode: e.target.value })
            // }
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
          {/* <CustomInputBox
            label="State"
            value={pickupAddress.state}
            onChange={(e) =>
              handlePickupAddressChange("state", e.target.value)
            }
          /> */}

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

        {/* <div className="grid grid-cols-2 gap-x-5 lg:hidden mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="State"
            value={pickupAddress.state}
            onChange={(e) =>
              handlePickupAddressChange("state", e.target.value)
            }
          />
          <div>
            <CustomInputBox
              label="Country"
              value={pickupAddress.country}
              onChange={(e) =>
                handlePickupAddressChange("country", e.target.value)
              }
            />
          </div>
        </div> */}

        {/* <div className=" hidden lg:block mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="State" />
        </div>

        <div className="hidden lg:block mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="Country" />
        </div> */}

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <AudioInputBox
            label="Add directions(optional)"
            audio={directionAudio}
            setAudio={setDirectionAudio}
            onClick={() => !directionAudio && setIsAudioModal(true)}
          />
        </div>

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
            }}
          >
            <img src={Warehouse} alt="Warehouse associate" />
            <p className="lg:font-semibold lg:font-Open lg:text-[14px] ">
              Other
            </p>
          </div>
        </div>

        <div className="lg:col-span-3 mb-[12px] lg:mb-[18px] ">
          <p className="text-[18px] font-semibold font-Lato lg:text-[20px] lg:text-[#323232] ">
            Timing
          </p>
        </div>

        <div className="relative z-1  flex flex-nowrap overflow-x-scroll space-x-4  mb-[28px] lg:mb-[18px] lg:col-span-3">
          {Object.keys(timing).map((day) => (
            <div
              key={day}
              className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] py-2 px-4  lg:w-[172px] `}
              onClick={() => handleTimingChange(day as keyof TimingState)}
            >
              <div className="flex flex-row  items-center  absolute z-2 -top--1 bg-[#FEFEFE] ">
                <Checkbox checked={timing[day as keyof TimingState]} />
                <p className="bg-white   lg:font-semibold lg:font-Open lg:text-sm">
                  {day}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-row mb-5 lg:mb-[36px] lg:col-span-3">
          <div className="mr-2">
            <span className="text-[14px] font-semibold font-Open text-[#004EFF] lg:text-[16px]">
              Opening Hours:
            </span>
          </div>
          <div className="mr-2">
            <span className="text-[14px] text-[#202427] lg:text-[16px] lg:text-[#323232]">
              9am - 9pm
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-x-[8px] mb-11 lg:col-span-3 lg:mb-5">
          <CustomCheckbox checked={isChecked} onChange={handleCheckboxChange} />
          <p className="text-[14px] font-Open uppercase text-[#004EFF] lg:font-semibold">
            RETURN ADDRESS SAME AS PICKUP
          </p>
        </div>

        {!isChecked ? (
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
                    // onPaste={handlePaste}
                    onChange={handleChangeReturnAddress}
                    className="magicAddressInput"
                    // className="custom-input"
                    style={{
                      position: "absolute",
                      border: "none",
                      // left: "10px",
                      // background: "black",
                      // width: "10px",
                      // height: "25px",

                      // top: "-10px",
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
                  // handlePickupAddressChange("address", e.target.value);
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

            {/* <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Landmark"
            value={pickupAddress.landmark}
            onChange={(e) =>
              handlePickupAddressChange("landmark", e.target.value)
            }
          />
        </div> */}

            <div className="mb-4 lg:mb-6 lg:mr-6">
              <CustomInputBox
                label="Pincode"
                value={returnAddress.pincode}
                // onChange={(e) =>
                //   setPickupAddress({ ...pickupAddress, pincode: e.target.value })
                // }
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
              {/* <CustomInputBox
            label="State"
            value={pickupAddress.state}
            onChange={(e) =>
              handlePickupAddressChange("state", e.target.value)
            }
          /> */}

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

            {/* <div className="grid grid-cols-2 gap-x-5 lg:hidden mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="State"
            value={pickupAddress.state}
            onChange={(e) =>
              handlePickupAddressChange("state", e.target.value)
            }
          />
          <div>
            <CustomInputBox
              label="Country"
              value={pickupAddress.country}
              onChange={(e) =>
                handlePickupAddressChange("country", e.target.value)
              }
            />
          </div>
        </div> */}

            {/* <div className=" hidden lg:block mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="State" />
        </div>

        <div className="hidden lg:block mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="Country" />
        </div> */}

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
                label="Email ID(optional)"
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

            <div className="lg:col-span-3  mb-3 lg:mb-[18px]">
              <p className="text-[#202427] text-[18px] font-Lato lg:font-Lato lg:text-[20px] lg:text-[#323232] ">
                Save your contact as
              </p>
            </div>

            <div className="flex flex-nowrap overflow-x-scroll space-x-4 lg:col-span-3 mb-7 ">
              <div
                className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] py-2 px-4   ${
                  saveContact.shopkeeper === true
                    ? "border-[#004EFF] text-[#004EFF] "
                    : "border-gray-300 text-[#1C1C1C]"
                }`}
                onClick={(e) => {
                  setSaveContact({
                    shopkeeper: true,

                    warehouse: false,
                    dispatcher: false,
                  });
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
                  saveContact.warehouse === true
                    ? "border-[#004EFF] text-[#004EFF] "
                    : "border-gray-300 text-[#1C1C1C]"
                }`}
                onClick={() => {
                  setSaveContact({
                    shopkeeper: false,

                    warehouse: true,
                    dispatcher: false,
                  });
                  handleContactChange("type", "warehouse associate");

                  // isItLgScreen
                  //   ? setIsSaveContactRightModal(true)
                  //   : setIsSaveContactModal(true);
                }}
              >
                <img src={Warehouse} alt="Warehouse associate" />
                <p className="lg:font-semibold lg:font-Open  lg:text-[14px] ">
                  Warehouse associate
                </p>
              </div>

              <div
                className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] py-2 px-4   whitespace-nowrap ${
                  saveContact.dispatcher === true
                    ? "border-[#004EFF] text-[#004EFF] "
                    : "border-gray-300 text-[#1C1C1C]"
                }`}
                onClick={() => {
                  setSaveContact({
                    shopkeeper: false,

                    warehouse: false,
                    dispatcher: true,
                  });
                  handleContactChange("type", "dispatcher");

                  // isItLgScreen
                  //   ? setIsSaveContactRightModal(true)
                  //   : setIsSaveContactModal(true);
                }}
              >
                <img src={Warehouse} alt="Warehouse associate" />
                <p className="lg:font-semibold lg:font-Open  lg:text-[14px] ">
                  Dispatcher
                </p>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* <div className="flex flex-row items-center gap-2 lg:col-span-3 mb-5 lg:mb-[23px]">
          <p className="text-[18px] font-Lato lg:text-[24px] lg:font-Lato lg:text-[#323232]">
            Timing
          </p>
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6 flex">
          <p>Monday</p>
          <p>Monday</p>
        </div> */}

        <div className="flex flex-row items-center gap-2  lg:col-span-3 mb-5 lg:mb-[23px]">
          <img src={ContactIcon} alt="Contact" className="lg:hidden" />
          <img src={WebContactIcon} alt="Contact" className="hidden lg:block" />

          <p className="text-[18px] font-Lato lg:text-[24px] lg:font-Lato lg:text-[#323232]">
            Pickup Address Contact
          </p>
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Name of the contact person"
            value={contact.name}
            onChange={(e) => {
              handleContactChange("name", e.target.value);
              handleReturnAddressContactChange("name", e.target.value);
            }}
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Mobile Number"
            value={contact.mobileNo}
            onChange={(e) => handleContactChange("mobileNo", e.target.value)}
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Email ID(optional)"
            value={contact.emailId}
            onChange={(e) => handleContactChange("emailId", e.target.value)}
          />
        </div>
        <div className="mb-7 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Alternate mobile number(optional)"
            value={contact.alternateMobileNo}
            onChange={(e) =>
              handleContactChange("alternateMobileNo", e.target.value)
            }
          />
        </div>

        <div className="lg:col-span-3  mb-3 lg:mb-[18px]">
          <p className="text-[#202427] text-[18px] font-Lato lg:font-Lato lg:text-[20px] lg:text-[#323232] ">
            Save your contact as
          </p>
        </div>

        <div className="flex flex-nowrap overflow-x-scroll space-x-4 lg:col-span-3 mb-7 ">
          <div
            className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] py-2 px-4   ${
              saveContact.shopkeeper === true
                ? "border-[#004EFF] text-[#004EFF] "
                : "border-gray-300 text-[#1C1C1C]"
            }`}
            onClick={(e) => {
              setSaveContact({
                shopkeeper: true,

                warehouse: false,
                dispatcher: false,
              });
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
              saveContact.warehouse === true
                ? "border-[#004EFF] text-[#004EFF] "
                : "border-gray-300 text-[#1C1C1C]"
            }`}
            onClick={() => {
              setSaveContact({
                shopkeeper: false,

                warehouse: true,
                dispatcher: false,
              });
              handleContactChange("type", "warehouse associate");

              // isItLgScreen
              //   ? setIsSaveContactRightModal(true)
              //   : setIsSaveContactModal(true);
            }}
          >
            <img src={Warehouse} alt="Warehouse associate" />
            <p className="lg:font-semibold lg:font-Open  lg:text-[14px] ">
              Warehouse associate
            </p>
          </div>

          <div
            className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] py-2 px-4   whitespace-nowrap ${
              saveContact.dispatcher === true
                ? "border-[#004EFF] text-[#004EFF] "
                : "border-gray-300 text-[#1C1C1C]"
            }`}
            onClick={() => {
              setSaveContact({
                shopkeeper: false,

                warehouse: false,
                dispatcher: true,
              });
              handleContactChange("type", "dispatcher");

              // isItLgScreen
              //   ? setIsSaveContactRightModal(true)
              //   : setIsSaveContactModal(true);
            }}
          >
            <img src={Warehouse} alt="Warehouse associate" />
            <p className="lg:font-semibold lg:font-Open  lg:text-[14px] ">
              Dispatcher
            </p>
          </div>
        </div>

        {/* <div className="mb-7 lg:hidden">
          <CustomDatePicker onClick={openModal} />
        </div> */}

        {/* <div className="hidden lg:block mb-7">
          <CustomDatePicker onClick={() => setIsDateRightModal(true)} />
        </div> */}

        <div className="hidden lg:block mb-7">
          <CustomInputWithImage
            placeholder="Pickup Date"
            imgSrc={CalenderIcon}
            value={pickupDate}
            onClick={() => setIsDateRightModal(true)}
            onChange={(e) => setPickupDate(e.target.value)}
          />
        </div>

        {/* <div className="hidden lg:block mb-7"></div> */}

        <div className="mb-7 lg:col-span-3 pb-16  ">
          <div className="flex flex-col  w-[372px] h-[134px] ">
            <div
              className={`grid grid-cols-2 p-2 ${
                toggleStatus
                  ? "bg-[#E8E8E8] rounded-tr-lg w-[372px] h-[44px] rounded-tl-lg border-[1px]"
                  : "shadow-md rounded "
              }`}
            >
              <h1 className="self-center justify-start text-[14px] font-semibold font-Open text-[#1C1C1C] lg:text-base ">
                Custom Branding
              </h1>

              <div
                className={`flex ${
                  toggleStatus ? "justify-start" : "justify-end"
                } items-center gap-x-1`}
              >
                <button
                  className={`${
                    toggleStatus ? "bg-[#7CCA62]" : "bg-[#F35838]"
                  } flex justify-end items-center gap-x-1 rounded w-[123px] h-[30px] px-[12px] py-[8px]`}
                  onClick={() => {
                    setToggleStatus(!toggleStatus);
                  }}
                >
                  <Switch
                    onChange={() => {
                      setToggleStatus(!toggleStatus);
                    }}
                    checked={toggleStatus}
                    onColor="#FFFFF"
                    onHandleColor="#7CCA62"
                    offColor="#FFFFF"
                    offHandleColor="#F35838"
                    handleDiameter={4}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={8}
                    width={14}
                  />

                  <p className="text-[#FFFFFF] font-semibold font-Open text-[14px] px-[8px] pb-[2px] ">
                    {toggleStatus ? "ACTIVE" : "DEACTIVE"}
                  </p>
                </button>
                {toggleStatus && <img src={editIcon} alt="" className="ml-2" />}
                {toggleStatus && (
                  <img src={AccordionUp} alt="" className="ml-2" />
                )}
              </div>
            </div>
            {toggleStatus && (
              <div className=" border-[1px] border-[#E8E8E8] rounded-bl-lg rounded-br-lg p-2 pb-8">
                <div
                  className="flex cursor-pointer "
                  onClick={() => {
                    isItLgScreen
                      ? setCustomBrandingRightModal(true)
                      : setCustomBrandingModal(true);
                  }}
                >
                  <img src={editIcon} alt="" className="ml-2 mr-2" />
                  <p> Add Branding</p>
                </div>
                {/* <div className="flex flex-col border-r-[2px] border-r-[#E8E8E8] ">
                  <p className="text-[10px] text-[#777777] font-Open">
                    Brand Name
                  </p>
                  <h1 className="font-semibold font-Open text-[12px] text-[#1C1C1C] ">
                    User Detail
                  </h1>
                </div>

                <div className="flex flex-col">
                  <p className="text-[10px] text-[#777777] font-Open">
                    Brand Address
                  </p>
                  <h1 className="font-semibold font-Open text-[12px] text-[#1C1C1C]">
                    User Detail
                  </h1>
                </div>

                <div className="flex flex-col border-r-[2px] border-r-[#E8E8E8]">
                  <p className="text-[10px] text-[#777777] font-Open">
                    Brand Logo
                  </p>
                  <h1 className="font-semibold font-Open text-[12px] text-[#1C1C1C]">
                    User Detail
                  </h1>
                </div>

                <div className="flex flex-col">
                  <p className="text-[10px] text-[#777777] font-Open">
                    Brand Contact
                  </p>
                  <h1 className="font-semibold font-Open text-[12px] text-[#1C1C1C]">
                    User Detail
                  </h1>
                </div> */}
              </div>
            )}
          </div>
        </div>
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
        icon={PersonIcon}
        label="Save contact as"
        buttonLabel="SAVE"
        inputLabel="Enter name"
        imgAlt="Save Contact"
        isModalOpen={isSaveContactModal}
        setIsModalOpen={setIsSaveContactModal}
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

      {/* <CustomBottomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <SelectDateModalContent />
      </CustomBottomModal> */}

      <RightSideModal
        isOpen={isDateRightModal}
        onClose={() => setIsDateRightModal(false)}
        className="!w-[389px]"
      >
        <SelectDateModalContent
          onClick={() => setIsDateRightModal(false)}
          onPickupTimeSelected={handlePickupTimeSelected}
        />
      </RightSideModal>

      {/* <div className="suresh"> */}
      <RightSideModal
        isOpen={isLocationRightModal}
        onClose={() => setIsLocationRightModal(false)}
        className="!w-[389px]"
      >
        <Map onClick={() => setIsLocationRightModal(false)} />
      </RightSideModal>
      {/* </div> */}

      <RightSideModal
        isOpen={isRightLandmarkModal}
        onClose={() => setIsRightLandmarkModal(false)}
        className="!w-[389px]"
      >
        <LandmarkContent
          title="Save Landmark as"
          titleIcon={MapIcon}
          buttonText="CONFIRM"
          inputLabel="Type landmark"
          onClick={() => setIsRightLandmarkModal(false)}
          onCustomLandmarkSelection={handleLandmarkSelected}
        />
      </RightSideModal>

      <RightSideModal
        isOpen={isSaveContactRightModal}
        onClose={() => setIsSaveContactRightModal(false)}
        className="!w-[389px]"
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
        isOpen={customBrandingRightModal}
        onClose={() => setCustomBrandingRightModal(false)}
        className="!w-[389px]"
      >
        <CustomBrandingContent
          title="Custom Branding"
          titleIcon={MapIcon}
          buttonText="UPDATE"
          inputLabel="Brand Name"
          onClick={() => setCustomBrandingRightModal(false)}
          // onCustomLandmarkSelection={handleLandmarkSelected}
        />
      </RightSideModal>

      {/* <div
        className={`  ${
          isItLgScreen ? "flex justify-end " : " grid grid-cols-2"
        }   shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0`}
      >
        <ServiceButton
          text="NEXT"
          className="bg-[#1C1C1C] text-[#FFFFFF] lg:!py-2 lg:!px-16"
          onClick={() => {
            postPickupOrderDetails(payload);
          }}
        />
      </div> */}

      <BottomLayout
        callApi={() => postPickupOrderDetails(payload)}
        Button2Name={true}
      />

      {/* <footer className="w-full fixed  bottom-0 z-[10]">
        <div
          className={`  ${
            isItLgScreen ? "flex justify-end " : " grid grid-cols-2"
          }   shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0`}
        >
          <ServiceButton
            text="NEXT"
            className="bg-[#1C1C1C] text-[#FFFFFF] lg:!py-2 lg:!px-4"
            onClick={() => {
              navigate("/neworder/delivery");
            }}
          />
        </div>
      </footer> */}
    </div>
  );
};

export default Index;
