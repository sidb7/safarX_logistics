import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MagicLocationIcon from "../../../assets/PickUp/magicLocation.svg";
import ForwardArrowIcon from "../../../assets/PickUp/forwardArrow.svg";
import ChooseLocationIcon from "../../../assets/PickUp/chooseLocation.svg";
import Warehouse from "../../../assets/PickUp/Warehouse.svg";
import OfficeIcon from "../../../assets/PickUp/Office.svg";
import LocationIcon from "../../../assets/PickUp/Location.svg";
import MapIcon from "../../../assets/PickUp/MapIcon.svg";
import ContactIcon from "../../../assets/PickUp/Contact.svg";
import PersonIcon from "../../../assets/PickUp/PersonIcon.svg";
import CustomCheckbox from "../../../components/CheckBox";
import EditIcon from "../../../assets/PickUp/Edit.svg";
import CustomDropDown from "../../../components/DropDown";
import CustomDatePicker from "../../../components/Datepicker/customDatePicker";
import CustomInputBox from "../../../components/Input";
import CustomInputWithImage from "../../../components/InputWithImage/InputWithImage";
import Switch from "react-switch";
import { useAppSelector } from "../../../hooks/typeHook";
import { CommonBottomModal } from "../../../components/CustomModal/commonBottomModal";
import AudioInputBox from "../../../components/AudioInput/AudioInputBox";
import CustomBottomModal from "../../../components/CustomModal/customBottomModal";
import SelectDateModalContent from "./selectDateModal";
import WebLocationIcon from "../../../assets/PickUp/WebLocation.svg";
import WebContactIcon from "../../../assets/PickUp/WebContact.svg";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import { MdOutlineCancel } from "react-icons/md";

const Index = () => {
  const navigate = useNavigate();
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
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData("text");
    setPastedData(pastedData);
  };

  const handleClick = () => {
    // inputRef.current?.focus();
  };

  const [isLandmarkModal, setIsLandmarkModal] = useState(false);
  const [isSaveContactModal, setIsSaveContactModal] = useState(false);
  const [isAudioModal, setIsAudioModal] = useState(false);
  const [directionAudio, setDirectionAudio] = useState("");
  const { address } = useAppSelector((state) => state.rootReducer.map);
  const [modalIsOpen, setIsOpen] = useState(false);

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
    setLocateAddress(address);
  }, [address]);

  return (
    <div>
      <div className="inline-flex space-x-2 items-center justify-start px-5 mb-5 lg:mb-[10px]">
        <img src={LocationIcon} alt="" className="lg:hidden" />

        <img src={WebLocationIcon} alt="" className="hidden lg:block" />

        <p className="text-lg font-semibold text-center text-gray-900 lg:font-normal lg:text-[28px] lg:text-[#1C1C1C]  ">
          Pickup location
        </p>
      </div>
      <div className="flex flex-col   lg:grid lg:grid-cols-3   px-5">
        <div className="lg:col-span-2 mb-4 lg:mb-6 lg:mr-6  ">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg relative   ">
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

            <div className="relative h-[75px]">
              <div className="w-full max-w-xs mx-auto">
                <div
                  onClick={handleClick}
                  className="w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none bg-transparent border-none cursor-text"
                >
                  {pastedData || "Click here to paste..."}
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={pastedData}
                  onPaste={handlePaste}
                  onChange={() => {}}
                  style={{ position: "absolute", left: "-9999px" }}
                  title="inputBox"
                />
              </div>
              <div className="absolute right-[5%] top-[70%] transform -translate-y-1/2">
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
            onClick={() => {
              navigate("/neworder/map");
            }}
          />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="Plot no., floor, building name" />
        </div>
        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="Locality" />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
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
        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="City" />
        </div>
        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="Pincode" />
        </div>
        <div className="grid grid-cols-2 gap-x-5 lg:hidden mb-4 lg:mb-6 lg:mr-6">
          <div>
            <CustomInputBox label="State" />
          </div>
          <div>
            <CustomInputBox label="Country" />
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
          <p className="text-[18px] font-semibold lg:text-[20px] lg:text-[#323232] ">
            Save your address as
          </p>
        </div>

        <div className="flex flex-nowrap overflow-x-scroll space-x-4  mb-[28px] lg:mb-[18px] lg:col-span-3">
          <div
            className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]  px-8 rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] lg:py-2 lg:px-4  lg:w-[172px] ${
              saveAddress.office === true
                ? "!border-[#004EFF] !text-[#004EFF] "
                : "border-gray-300 text-[#1C1C1C]"
            }`}
            onClick={() =>
              setSaveAddress({
                office: true,
                warehouse: false,
                other: false,
              })
            }
          >
            <img src={OfficeIcon} alt="ShopKeeper" />
            <p className="lg:font-semibold lg:text-[14px] ">Office</p>
          </div>
          <div
            className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]  px-8 rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] lg:w-[172px] lg:px-4 lg:py-2 ${
              saveAddress.warehouse === true
                ? "border-[#004EFF] !text-[#004EFF] "
                : "border-gray-300 text-[#1C1C1C]"
            }`}
            onClick={() =>
              setSaveAddress({
                office: false,
                warehouse: true,
                other: false,
              })
            }
          >
            <img src={LocationIcon} alt="Other" />
            <p className="lg:font-semibold lg:text-[14px] ">Warehouse</p>
          </div>
          <div
            className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]  px-8 rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] lg:w-[172px] lg:px-4 lg:py-2 ${
              saveAddress.other === true
                ? "border-[#004EFF] text-[#004EFF] "
                : "border-gray-300  text-[#1C1C1C]"
            }`}
            onClick={() =>
              setSaveAddress({
                office: false,
                warehouse: false,
                other: true,
              })
            }
          >
            <img src={Warehouse} alt="Warehouse associate" />
            <p className="lg:font-semibold lg:text-[14px] ">Other</p>
          </div>
        </div>

        <div className="flex flex-row items-center gap-x-[8px] mb-11 lg:col-span-3 lg:mb-5">
          <CustomCheckbox />
          <p className="text-[14px] font-medium uppercase text-[#004EFF] lg:font-semibold">
            RETURN ADDRESS SAME AS PICKUP
          </p>
        </div>

        <div className="flex flex-row items-center gap-2  lg:col-span-3 mb-5 lg:mb-[23px]">
          <img src={ContactIcon} alt="Contact" className="lg:hidden" />
          <img src={WebContactIcon} alt="Contact" className="hidden lg:block" />

          <p className="text-[18px] lg:text-[24px] lg:font-normal lg:text-[#323232]">
            Contact
          </p>
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="Name of the contact person" />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="Mobile Number" />
        </div>

        <div className="mb-4 lg:mb-6 lg:mr-6">
          <CustomInputBox label="Email ID(optional)" />
        </div>
        <div className="mb-7 lg:mb-6 lg:mr-6">
          <CustomInputBox label="Alternate mobile number(optional)" />
        </div>

        <div className="lg:col-span-3  mb-3 lg:mb-[18px]">
          <p className="text-[#202427] text-[18px] font-semibold lg:text-[20px] lg:text-[#323232] ">
            Save your contact as
          </p>
        </div>

        <div className="flex flex-nowrap overflow-x-scroll space-x-4 lg:col-span-3 mb-7 ">
          <div
            className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]  px-8 rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] lg:py-2 lg:px-4   ${
              saveContact.shopkeeper === true
                ? "border-[#004EFF] text-[#004EFF] "
                : "border-gray-300 text-[#1C1C1C]"
            }`}
            onClick={() =>
              setSaveContact({
                shopkeeper: true,

                warehouse: false,
              })
            }
          >
            <img src={OfficeIcon} alt="ShopKeeper" />
            <p className="lg:font-semibold lg:text-[14px] ">Shopkeeper</p>
          </div>

          <div
            className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]  px-8 rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] lg:py-2 lg:px-4   whitespace-nowrap ${
              saveContact.warehouse === true
                ? "border-[#004EFF] text-[#004EFF] "
                : "border-gray-300 text-[#1C1C1C]"
            }`}
            onClick={() =>
              setSaveContact({
                shopkeeper: false,

                warehouse: true,
              })
            }
          >
            <img src={Warehouse} alt="Warehouse associate" />
            <p className="lg:font-semibold lg:text-[14px] ">
              Warehouse associate
            </p>
          </div>
        </div>

        <div className="mb-7">
          <CustomDatePicker />
        </div>

        <div className="hidden lg:block mb-7"></div>

        <div className="mb-7">
          <div className="flex flex-col">
            <div
              className={`grid grid-cols-2 p-2 ${
                toggleStatus
                  ? "bg-[#E8E8E8] rounded-tr-lg rounded-tl-lg border-[1px]"
                  : "shadow-md rounded "
              }`}
            >
              <h1 className="self-center justify-start text-[14px] font-semibold text-[#1C1C1C] ">
                Custom Branding
              </h1>
              <div className="flex justify-end items-center gap-x-1">
                {toggleStatus && <img src={EditIcon} alt="" />}
                <Switch
                  onChange={() => {
                    if (toggleStatus === true) setToggleStatus(false);
                    else setToggleStatus(true);
                  }}
                  checked={toggleStatus}
                />
                <p
                  className={`${
                    toggleStatus ? "text-[#7CCA62]" : "text-[#F35838]"
                  } font-semibold text-[14px] `}
                >
                  {toggleStatus ? "ACTIVE" : "DEACTIVE"}
                </p>
              </div>
            </div>
            {toggleStatus && (
              <div className="grid grid-cols-2 grid-rows-2 gap-2 border-[1px] border-[#E8E8E8] rounded-bl-lg rounded-br-lg p-2">
                <div className="flex flex-col border-r-[2px] border-r-[#E8E8E8] ">
                  <p className="text-[10px] text-[#777777] font-normal ">
                    Brand Name and Logo
                  </p>
                  <h1 className="font-semibold text-[12px] text-[#1C1C1C] ">
                    User Detail
                  </h1>
                </div>

                <div className="flex flex-col">
                  <p className="text-[10px] text-[#777777] font-normal">
                    Contact Name
                  </p>
                  <h1 className="font-semibold text-[12px] text-[#1C1C1C]">
                    User Detail
                  </h1>
                </div>

                <div className="flex flex-col border-r-[2px] border-r-[#E8E8E8]">
                  <p className="text-[10px] text-[#777777] font-normal">
                    Brand Address
                  </p>
                  <h1 className="font-semibold text-[12px] text-[#1C1C1C]">
                    User Detail
                  </h1>
                </div>

                <div className="flex flex-col">
                  <p className="text-[10px] text-[#777777] font-normal">
                    Contact Number
                  </p>
                  <h1 className="font-semibold text-[12px] text-[#1C1C1C]">
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

      <button onClick={openModal}>Open Modal</button>
      <CustomBottomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <SelectDateModalContent />
      </CustomBottomModal>
    </div>
  );
};

export default Index;
