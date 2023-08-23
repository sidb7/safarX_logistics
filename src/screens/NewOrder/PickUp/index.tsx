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
import EditIcon from "../../../assets/PickUp/Edit.svg";
import CustomDropDown from "../../../components/DropDown";
// import CustomDatePicker from "../../../components/Datepicker/customDatePicker";
import CustomDatePicker from "../../../components/Datepicker";
import CustomInputBox from "../../../components/Input";
import CustomInputWithImage from "../../../components/InputWithImage/InputWithImage";
import Switch from "react-switch";
import { useAppSelector } from "../../../redux/hooks";
import { CommonBottomModal } from "../../../components/CustomModal/commonBottomModal";
import AudioInputBox from "../../../components/AudioInput/AudioInputBox";
import CustomBottomModal from "../../../components/CustomModal/customBottomModal";
import SelectDateModalContent from "./selectDateModal";
import WebLocationIcon from "../../../assets/PickUp/WebLocation.svg";
import WebContactIcon from "../../../assets/PickUp/WebContact.svg";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import { MdOutlineCancel } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import Map from "../../NewOrder/Map";
import TickLogo from "../../../assets/common/Tick.svg";
import { ADD_PICKUP_LOCATION } from "../../../utils/ApiUrls";

import {
  dummyPickupDropdownData,
  pickupAddress,
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
import { Breadcum } from "../../../components/Layout/breadcum";
import BottomLayout from "../../../components/Layout/bottomLayout";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state?.address || "";
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const [pastedData, setPastedData] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [saveAddress, setSaveAddress] = useState({
    office: false,
    warehouse: true,
    other: false,
  });

  const [saveContact, setSaveContact] = useState({
    shopkeeper: false,

    warehouse: true,
  });

  const [toggleStatus, setToggleStatus] = useState(false);
  const [locateAddress, setLocateAddress] = useState("");
  // const [pickupDate, setPickupDate] = useState("");

  const [isLandmarkModal, setIsLandmarkModal] = useState(false);
  const [isRightLandmarkModal, setIsRightLandmarkModal] = useState(false);

  const [isSaveContactModal, setIsSaveContactModal] = useState(false);
  const [isSaveContactRightModal, setIsSaveContactRightModal] = useState(false);
  const [footer, setFooter] = useState(true);

  const [isAudioModal, setIsAudioModal] = useState(false);
  const [directionAudio, setDirectionAudio] = useState("");
  // const { address } = useAppSelector((state) => state.map);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isDateRightModal, setIsDateRightModal] = useState(false);
  const [isLocationModal, setIsLocationModal] = useState(false);
  const [isLocationRightModal, setIsLocationRightModal] = useState(false);

  const [pickupLocation, setPickupLocation] = useState({
    flatNo: "",
    address: "",
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
    type: "",
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

  const handlePickupLocationChange = (
    fieldName: keyof typeof pickupLocation,
    value: string
  ) => {
    setPickupLocation((prevData) => ({
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
  //   console.log("addressLine", addressLine);
  //   const sector = addressParts[7];
  //   const landmark = addressParts[5];
  //   console.log("landmark", landmark);
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
  //   setPickupLocation((prevData) => ({
  //     ...prevData,
  //     ...parsedAddress,
  //   }));
  // }, [locateAddress]);

  // const parsedLandmarks = pickupLocation.landmark?.split(", ");
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

  console.log("pickupLocation", pickupLocation);
  console.log("pickupAddress", pickupAddress);
  console.log("contact", contact);
  console.log("customBranding", customBranding);

  console.log("locateAddress", locateAddress);

  const handlePickupTimeSelected = (pickupTime: string) => {
    console.log("Selected Pickup Time:", pickupTime);
    setPickupDate(pickupTime);
  };
  console.log("pickupdate", pickupDate);

  // const pickupDateForEpoch = "18/08/2023 11:00 AM";

  const editedPickupDateForEpoch = pickupDate.substring(0, 19);
  console.log("editedPickupDateForEpoch", editedPickupDateForEpoch);
  const convertToEpoch = (dateTimeString: any) => {
    const parsedDateTime = parse(
      dateTimeString,
      "dd/MM/yyyy hh:mm a",
      new Date()
    );
    return Math.floor(parsedDateTime.getTime() / 1000);
  };
  const epochPickupDate = convertToEpoch(editedPickupDateForEpoch);

  console.log("epochPickupDate", epochPickupDate);

  const payload = {
    pickupLocation: {
      flatNo: pickupLocation.flatNo,
      address: locateAddress,
      sector: pickupLocation.sector,
      landmark: pickupLocation.landmark,
      pincode: pickupLocation.pincode,
      city: pickupLocation.city,
      state: pickupLocation.state,
      country: pickupLocation.country,
      addressType: pickupLocation.addressType,
      contact: {
        name: contact.name,
        mobileNo: contact.mobileNo,
        alternateMobileNo: contact.alternateMobileNo,
        emailId: contact.emailId,
        type: contact.type,
      },
      customBranding: {
        name: customBranding.name,
        logo: customBranding.logo,
        address: customBranding.address,
        contact: {
          name: customBranding.contact.name,
          mobileNo: customBranding.contact.mobileNo,
        },
      },
      pickupDate: epochPickupDate,
    },
  };
  console.log("payload", payload);

  const postPickupOrderDetails = async (payload: any) => {
    try {
      const { data: response } = await POST(ADD_PICKUP_LOCATION, payload);

      if (response?.success) {
        toast.success(response?.message);
        navigate("/neworder/delivery");
      } else {
        console.error("PickupDataerror");
        toast.error(response?.message);
      }
    } catch (error) {
      console.log("Error in  ADD_PICKUP_LOCATION_API", error);
      return error;
    }
  };

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
      label: "Payment",
      isCompleted: false,
      isActive: false,
      imgSrc: TickLogo,
    },
  ];

  return (
    <div className="h-full">
      {/* <header className="fixed top-0 z-50 w-full ">
        <NavBar />
      </header> */}
      {/* <div>
        <div className="hidden lg:flex lg:items-center px-5 ml-6 mb-1 mt-20">
          <p className="font-normal text-[14px] text-[#777777] mr-1">Home</p>
          <span className="font-normal text-[14px] text-[#777777] mr-1">/</span>
          <span className="font-semibold text-[14px] text-[#1C1C1C]">
            Order
          </span>
        </div>

        <div className="inline-flex space-x-2 items-center justify-start px-5 lg:mb-8 ">
          <img src={BackArrowIcon} alt="" className="lg:hidden" />
          <img src={WebBackArrowIcon} alt="" className="hidden lg:block" />

          <p className="text-lg font-semibold text-center text-gray-900 lg:text-[28px]">
            Add new order
          </p>
        </div>
      </div> */}
      <div className="hidden lg:flex lg:items-center px-5 ml-6 mb-1 mt-20">
        <p className="font-Open text-[14px] text-[#777777] mr-1">Home</p>
        <span className="font-Open text-[14px] text-[#777777] mr-1">/</span>
        <span className="font-Open font-semibold text-[14px] text-[#1C1C1C]">
          Order
        </span>
      </div>
      <Breadcum label="Add New Order" />
      <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div>
      <div className="inline-flex space-x-2 items-center justify-start px-5 mb-5 lg:mb-[10px]">
        <img src={LocationIcon} alt="" className="lg:hidden" />

        <img src={WebLocationIcon} alt="" className="hidden lg:block" />

        <p className="text-lg font-semibold font-Lato text-center text-gray-900 lg:font-normal lg:text-[28px] lg:text-[#1C1C1C]  ">
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

            {/* <div className="relative h-[75px]">
              <div className="w-full max-w-xs">
                <div onClick={handleClick}>
                  <div
                    style={{
                      position: "absolute",
                      left: "1px",
                      height: "75px",
                      zIndex: 1, // Ensure the text is displayed above the input
                    }}
                  >
                    {pastedData || "Paste Address for the Magic"}
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={pastedData}
                    onPaste={handlePaste}
                    onChange={() => {}}
                    style={{
                      position: "absolute",
                      left: "1px",
                      height: "75px",
                      zIndex: 2, // Ensure the input is displayed above the text
                    }}
                    title="inputBox"
                  />
                </div>
              </div>
              <div className="absolute right-[1%] top-[70%] transform -translate-y-1/2">
                <img src={ForwardArrowIcon} alt="Arrow" />
              </div>
            </div> */}

            <div className="relative h-[75px]  ">
              <input
                ref={inputRef}
                type="text"
                value={pastedData}
                onPaste={handlePaste}
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

              <div className="absolute right-[1%] top-[70%] transform -translate-y-1/2">
                <img src={ForwardArrowIcon} alt="Arrow" />
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
              handlePickupLocationChange("address", e.target.value);
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
            label="Plot no., floor, building name"
            value={pickupLocation.flatNo}
            onChange={(e) =>
              handlePickupLocationChange("flatNo", e.target.value)
            }
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Locality"
            value={pickupLocation.sector}
            onChange={(e) =>
              handlePickupLocationChange("sector", e.target.value)
            }
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomDropDown
            value={selectedOption}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setSelectedOption(event.target.value);
              handlePickupLocationChange("landmark", event.target.value);
              if (event.target.value === "other") {
                isItLgScreen
                  ? setIsRightLandmarkModal(true)
                  : setIsLandmarkModal(true);
              }
            }}
            options={dummyPickupDropdownData}
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Pincode"
            value={pickupLocation.pincode}
            // onChange={(e) =>
            //   setPickupLocation({ ...pickupLocation, pincode: e.target.value })
            // }
            onChange={(e) =>
              handlePickupLocationChange("pincode", e.target.value)
            }
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="City"
            value={pickupLocation.city}
            onChange={(e) => handlePickupLocationChange("city", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-5 lg:hidden mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="State"
            value={pickupLocation.state}
            onChange={(e) =>
              handlePickupLocationChange("state", e.target.value)
            }
          />
          <div>
            <CustomInputBox
              label="Country"
              value={pickupLocation.country}
              onChange={(e) =>
                handlePickupLocationChange("country", e.target.value)
              }
            />
          </div>
        </div>

        <div className=" hidden lg:block mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="State" />
        </div>

        <div className="hidden lg:block mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="Country" />
        </div>

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
              handlePickupLocationChange("addressType", "office");
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
              handlePickupLocationChange("addressType", "warehouse");
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
              handlePickupLocationChange("addressType", "other");
            }}
          >
            <img src={Warehouse} alt="Warehouse associate" />
            <p className="lg:font-semibold lg:font-Open lg:text-[14px] ">
              Other
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-x-[8px] mb-11 lg:col-span-3 lg:mb-5">
          <CustomCheckbox />
          <p className="text-[14px] font-Open uppercase text-[#004EFF] lg:font-semibold">
            RETURN ADDRESS SAME AS PICKUP
          </p>
        </div>

        <div className="flex flex-row items-center gap-2  lg:col-span-3 mb-5 lg:mb-[23px]">
          <img src={ContactIcon} alt="Contact" className="lg:hidden" />
          <img src={WebContactIcon} alt="Contact" className="hidden lg:block" />

          <p className="text-[18px] font-Lato lg:text-[24px] lg:font-Lato lg:text-[#323232]">
            Contact
          </p>
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox
            label="Name of the contact person"
            value={contact.name}
            onChange={(e) => handleContactChange("name", e.target.value)}
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

        <div className="hidden lg:block mb-7"></div>

        <div className="mb-7  flex justify-end ">
          <div className="flex flex-col  w-[392px] h-[140px] ">
            <div
              className={`grid grid-cols-2 p-2 ${
                toggleStatus
                  ? "bg-[#E8E8E8] rounded-tr-lg rounded-tl-lg border-[1px]"
                  : "shadow-md rounded "
              }`}
            >
              <h1 className="self-center justify-start text-[14px] font-semibold text-[#1C1C1C] lg:text-base ">
                Custom Branding
              </h1>

              <div className="flex justify-end items-center gap-x-1 ">
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
                {/* <p
                  className={`${
                    toggleStatus ? "text-[#7CCA62]" : "text-[#F35838]"
                  } font-semibold text-[14px] `}
                >
                  {toggleStatus ? "ACTIVE" : "DEACTIVE"}
                </p> */}
              </div>
            </div>
            {toggleStatus && (
              <div className="grid grid-cols-2 grid-rows-2 gap-2 border-[1px] border-[#E8E8E8] rounded-bl-lg rounded-br-lg p-2">
                <div className="flex flex-col border-r-[2px] border-r-[#E8E8E8] ">
                  <p className="text-[10px] text-[#777777] font-Open">
                    Brand Name and Logo
                  </p>
                  <h1 className="font-semibold font-Open text-[12px] text-[#1C1C1C] ">
                    User Detail
                  </h1>
                </div>

                <div className="flex flex-col">
                  <p className="text-[10px] text-[#777777] font-Open">
                    Contact Name
                  </p>
                  <h1 className="font-semibold font-Open text-[12px] text-[#1C1C1C]">
                    User Detail
                  </h1>
                </div>

                <div className="flex flex-col border-r-[2px] border-r-[#E8E8E8]">
                  <p className="text-[10px] text-[#777777] font-Open">
                    Brand Address
                  </p>
                  <h1 className="font-semibold font-Open text-[12px] text-[#1C1C1C]">
                    User Detail
                  </h1>
                </div>

                <div className="flex flex-col">
                  <p className="text-[10px] text-[#777777] font-Open">
                    Contact Number
                  </p>
                  <h1 className="font-semibold font-Open text-[12px] text-[#1C1C1C]">
                    User Detail
                  </h1>
                </div>
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
        <RightModalContent
          title="Save Landmark as"
          titleIcon={MapIcon}
          buttonText="CONFIRM"
          inputLabel="Type landmark"
          onClick={() => setIsRightLandmarkModal(false)}
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
