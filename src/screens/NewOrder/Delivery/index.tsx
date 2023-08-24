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
import CalenderIcon from "../../../assets/calendar.svg";
import RightSideModalPickup from "../../../components/CustomModal/customRightModalPickup";
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
import { POST } from "../../../utils/webService";

import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Map from "../../NewOrder/Map";
import Switch from "react-switch";
import MapIcon from "../../../assets/PickUp/MapIcon.svg";
import { format, parse } from "date-fns";
import { CommonBottomModal } from "../../../components/CustomModal/commonBottomModal";
import AudioInputBox from "../../../components/AudioInput/AudioInputBox";
import PersonIcon from "../../../assets/PickUp/PersonIcon.svg";
import DeliveryMap from "./DeliveryMap";
import TickLogo from "../../../assets/common/Tick.svg";
import Stepper from "../../../components/Stepper";
import BackArrowIcon from "../../../assets/backArrow.svg";
import WebBackArrowIcon from "../../../assets/PickUp/EssentialWeb.svg";
import { ADD_DELIVERY_LOCATION } from "../../../utils/ApiUrls";
import { toast } from "react-toastify";
import ServiceButton from "../../../components/Button/ServiceButton";
import { Breadcum } from "../../../components/Layout/breadcum";
import BottomLayout from "../../../components/Layout/bottomLayout";

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

  const [isSaveContactModal, setIsSaveContactModal] = useState(false);

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
    recipientType: "business",
    flatNo: "",
    address: "",
    sector: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    addressType: "warehouse",
    gstNo: "",
    orderType: "B2B",
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

  const handleDeliveryLocationChange = (
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
  console.log("editedDeliveryDateForEpoch", editeddeliveryDateForEpoch);
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

  const payload = {
    deliveryLocation: {
      recipientType: deliveryLocation.recipientType,
      flatNo: deliveryLocation.flatNo,
      address: locateAddress,
      sector: deliveryLocation.sector,
      landmark: deliveryLocation.landmark,
      pincode: deliveryLocation.pincode,
      city: deliveryLocation.city,
      state: deliveryLocation.state,
      country: deliveryLocation.country,
      gstNumber: deliveryLocation.gstNo,
      addressType: deliveryLocation.addressType,
      contact: {
        name: contact.name,
        mobileNo: contact.mobileNo,
        alternateMobileNo: contact.alternateMobileNo,
        emailId: contact.emailId,
        type: contact.type,
      },

      deliveryDate: epochDeliveryDate,
    },
    orderType: deliveryLocation.orderType,
  };
  console.log("payload", payload);
  const postDeliveryOrderDetails = async (payload: any) => {
    try {
      const { data: response } = await POST(ADD_DELIVERY_LOCATION, payload);

      if (response?.success) {
        toast.success(response?.message);
        navigate("/neworder/product");
      } else {
        console.error("DeliveryDataerror");
        toast.error(response?.message);
      }
    } catch (error) {
      console.log("Error in ADD_PICKUP_LOCATION_API", error);
    }
  };

  const steps = [
    {
      label: "Pickup",
      isCompleted: true,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Delivery",
      isCompleted: false,
      isActive: true,
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
    <div>
      {/* <div>
        <div className="hidden lg:flex lg:items-center px-5 ml-6 mb-1 mt-20">
          <p className="font-Open text-[14px] text-[#777777] mr-1">Home</p>
          <span className="font-Open text-[14px] text-[#777777] mr-1">/</span>
          <span className="font-Open text-[14px] text-[#1C1C1C]">Order</span>
        </div>

        <div className="inline-flex space-x-2 items-center justify-start px-5 lg:mb-8 ">
          <img src={BackArrowIcon} alt="" className="lg:hidden" />
          <img src={WebBackArrowIcon} alt="" className="hidden lg:block" />

          <p className="text-lg font-semibold font-Lato text-center text-gray-900 lg:text-[28px]">
            Add new order
          </p>
        </div>
      </div> */}

      <div className="hidden lg:flex lg:items-center px-5 ml-6 mb-1">
        <p className="font-Open text-[14px] text-[#777777] mr-1">Home</p>
        <span className="font-Open text-[14px] text-[#777777] mr-1">/</span>
        <span className="font-Open text-[14px] text-[#1C1C1C]">Order</span>
      </div>

      <Breadcum label="Add New Order" />
      <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div>
      <div className="grid grid-cols-1 gap-y-4 ">
        <div className=" h-[54px] bg-[#F5BE6D] p-2 flex items-center  lg:mx-5 lg:mt-11 lg:mb-4 lg:col-span-3">
          <div className="text-sm mx-5 lg:mx-4 text-[#1C1C1C] lg:flex lg:items-center lg:gap-x-2 ">
            <div className="flex">
              <img src={weather} alt="" className="lg:mr-[6px]" />
              <p className="text-[14px] ml-1 font-Open lg:font-semibold lg:text-base">
                HEAVY RAIN WARNING
              </p>
            </div>
            <div className="hidden lg:block">|</div>
            <p className="text-[14px] font-Open lg:font-Open lg:font-semibold">
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
                onClick={() => {
                  setSelectRecipient({ business: true, consumer: false });
                  handleDeliveryLocationChange("recipientType", "business");
                  handleDeliveryLocationChange("orderType", "B2B");
                }}
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
                  <p className="bg-white   lg:font-semibold lg:font-Open lg:text-sm">
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
                onClick={() => {
                  setSelectRecipient({ business: false, consumer: true });
                  handleDeliveryLocationChange("recipientType", "consumer");
                  handleDeliveryLocationChange("orderType", "B2C");
                }}
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
                  <p className="bg-white lg:font-semibold lg:font-Open lg:text-sm">
                    Consumer
                  </p>
                </div>
              </div>
            </div>
            <p className="absolute z-2 -top-3 left-5 bg-[#00AEEF] rounded-lg w-[90px] px-[13px] py-[4px] text-[#FFFFFF] lg:font-bold lg:font-lato lg:text-[12px] ">
              Recipient
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="inline-flex space-x-2 items-center justify-start mt-5  lg:mt-6">
              <img src={LocationIcon} alt="" className="lg:hidden" />
              <img src={WebLocationIcon} alt="" className="hidden lg:block" />
              <p className="text-lg font-semibold text-center text-gray-900 lg:font-Lato lg:text-2xl lg:text-[#323232]">
                Delivery location
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 mb-5 lg:mb-6">
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
                  onPaste={handlePaste}
                  onChange={handleChange}
                  className="magicAddressInput"
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
          <div className="hidden lg:block lg:col-span-1"></div>

          <div className="mb-5 lg:mb-6 ">
            <CustomInputWithImage
              placeholder="Choose location (optional)"
              imgSrc={ChooseLocationIcon}
              value={locateAddress}
              onChange={(e) => setLocateAddress(e.target.value)}
              onClick={() => {
                isItLgScreen
                  ? setIsLocationRightModal(true)
                  : navigate("newrder/map", {
                      state: { fromDeliveryPage: true },
                    });
              }}
            />
          </div>

          <div className="relative mb-5 lg:mb-6">
            <CustomInputBox
              label="Plot no., floor, building name"
              value={deliveryLocation.flatNo}
              onChange={(e) =>
                handleDeliveryLocationChange("flatNo", e.target.value)
              }
            />
          </div>
          <div className="mb-5 lg:mb-6">
            <CustomInputBox
              label="Locality"
              value={deliveryLocation.sector}
              onChange={(e) =>
                handleDeliveryLocationChange("sector", e.target.value)
              }
            />
          </div>

          {/* Landmark with dropdown commented */}
          {/* <div className="mb-5 lg:mb-6">
            <CustomDropDown
              value={selectedOption}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedOption(event.target.value);
                handleDeliveryLocationChange("landmark", event.target.value);
                if (event.target.value === "other") {
                  isItLgScreen
                    ? setIsRightLandmarkModal(true)
                    : setIsLandmarkModal(true);
                }
              }}
              options={dummyPickupDropdownData}
            />
          </div> */}

          <div className="mb-4 lg:mb-6 ">
            <CustomInputBox
              label="Landmark"
              value={deliveryLocation.landmark}
              onChange={(e) =>
                handleDeliveryLocationChange("landmark", e.target.value)
              }
            />
          </div>

          <div className="mb-5 lg:mb-6">
            <CustomInputBox
              label="Pincode"
              value={deliveryLocation.pincode}
              // onChange={(e) =>
              //   setPickupLocation({ ...pickupLocation, pincode: e.target.value })
              // }
              onChange={(e) =>
                handleDeliveryLocationChange("pincode", e.target.value)
              }
            />
          </div>
          <div className="mb-5 lg:mb-6">
            <CustomInputBox
              label="City"
              value={deliveryLocation.city}
              onChange={(e) =>
                handleDeliveryLocationChange("city", e.target.value)
              }
            />
          </div>

          <div className="mb-4 lg:mb-6 ">
            <CustomInputBox
              label="State"
              value={deliveryLocation.state}
              onChange={(e) =>
                handleDeliveryLocationChange("state", e.target.value)
              }
            />
          </div>

          <div className="mb-4 lg:mb-6">
            <CustomInputBox
              label="Country"
              value={deliveryLocation.country}
              onChange={(e) =>
                handleDeliveryLocationChange("country", e.target.value)
              }
            />
          </div>

          {/* <div className="grid grid-cols-2 gap-3 mb-5 lg:mb-6 lg:hidden">
            <div>
              <CustomInputBox
                label="State"
                value={deliveryLocation.state}
                onChange={(e) =>
                  handleDeliveryLocationChange("state", e.target.value)
                }
              />
            </div>
            <div>
              <CustomInputBox
                label="Country"
                value={deliveryLocation.country}
                onChange={(e) =>
                  handleDeliveryLocationChange("country", e.target.value)
                }
              />
            </div>
          </div> */}

          {/* <div className="hidden lg:block lg:mb-6">
            <CustomInputBox label="State" />
          </div>
          <div className="hidden lg:block lg:mb-6">
            <CustomInputBox label="Country" />
          </div> */}

          <div className="mb-5 lg:mb-6">
            <AudioInputBox
              label="Add directions(optional)"
              audio={directionAudio}
              setAudio={setDirectionAudio}
              onClick={() => !directionAudio && setIsAudioModal(true)}
            />
          </div>

          <div className="mb-5 lg:mb-6">
            <CustomInputBox
              label="GST no."
              value={deliveryLocation.gstNo}
              onChange={(e) =>
                handleDeliveryLocationChange("gstNo", e.target.value)
              }
            />
          </div>

          <div className="mb-5 lg:mb-[18px] lg:col-span-3 ">
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
                handleDeliveryLocationChange("addressType", "office");
              }}
            >
              <img src={OfficeIcon} alt="Office" />
              <p className="lg:font-semibold lg:font-Open lg:text-[14px]">
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
                handleDeliveryLocationChange("addressType", "warehouse");
              }}
            >
              <img src={Warehouse} alt="Office" />
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
                handleDeliveryLocationChange("addressType", "other");
              }}
            >
              <img src={LocationIcon} alt="Office" />
              <p>Other</p>
            </div>
          </div>

          <div className="flex flex-row items-center  mb-5 lg:mb-6 lg:col-span-3">
            <Checkbox />
            <p className="text-[14px] font-medium uppercase text-[#004EFF] lg:font-semibold lg:font-Open">
              BILLING DETAILS IS SAME AS DELIVERY
            </p>
          </div>

          <div className="flex flex-row mb-5 lg:mb-[36px] lg:col-span-3">
            <div className="mr-2">
              <span className="text-[14px] font-semibold font-Open text-[#004EFF] lg:text-[16px]">
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
            <p className="text-[18px] lg:font-Lato lg:text-2xl">Contact</p>
          </div>

          <div className="mb-5 lg:mb-6">
            <CustomInputBox
              label="Name of the contact person"
              value={contact.name}
              onChange={(e) => handleContactChange("name", e.target.value)}
            />
          </div>

          <div className="mb-5 lg:mb-6">
            <CustomInputBox
              label="Mobile Number"
              value={contact.mobileNo}
              onChange={(e) => handleContactChange("mobileNo", e.target.value)}
            />
          </div>

          <div className="mb-5 lg:mb-6">
            <CustomInputBox
              label="Email ID(optional)"
              value={contact.emailId}
              onChange={(e) => handleContactChange("emailId", e.target.value)}
            />
          </div>
          <div className="mb-5 lg:mb-6">
            <CustomInputBox
              label="Alternate mobile number(optional)"
              value={contact.alternateMobileNo}
              onChange={(e) =>
                handleContactChange("alternateMobileNo", e.target.value)
              }
            />
          </div>
          <div className="mb-5 lg:mb-[18px] lg:col-span-3 ">
            <p className="text-[#202427] text-[18px] font-Lato lg:text-xl">
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
                onClick={() => {
                  setSaveContact({
                    shopkeeper: true,

                    warehouse: false,
                  });
                  handleContactChange("type", "shopkeeper");
                }}
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
                  handleContactChange("type", "warehouse associate");

                  // isItLgScreen
                  //   ? setIsSaveContactRightModal(true)
                  //   : setIsSaveContactModal(true);
                }}
              >
                <img src={Warehouse} alt="Warehouse associate" />
                <p>Warehouse associate</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block mb-7 pb-24">
            <CustomInputWithImage
              placeholder="Delivery Date"
              imgSrc={CalenderIcon}
              value={deliveryDate}
              onClick={() => setIsDateRightModal(true)}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
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
          isOpen={isDateRightModal}
          onClose={() => setIsDateRightModal(false)}
          className="!w-[389px]"
        >
          <SelectDateModalContent
            onClick={() => setIsDateRightModal(false)}
            onPickupTimeSelected={handlePickupTimeSelected}
          />
        </RightSideModal>

        <RightSideModalPickup
          isOpen={isLocationRightModal}
          onClose={() => setIsLocationRightModal(false)}
          className="!w-[389px]"
        >
          <DeliveryMap onClick={() => setIsLocationRightModal(false)} />
        </RightSideModalPickup>

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
      </div>
      <BottomLayout callApi={() => postDeliveryOrderDetails(payload)} />
      {/* <div
        className={`  ${
          isItLgScreen ? "flex justify-end " : " grid grid-cols-2"
        }   shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] fixed w-full bottom-0`}
      >
        <ServiceButton
          text="NEXT"
          className="bg-[#1C1C1C] text-[#FFFFFF] lg:!py-2 lg:!px-16"
          onClick={() => {
            postDeliveryOrderDetails(payload);
          }}
        />
      </div> */}
    </div>
  );
};

export default Index;
