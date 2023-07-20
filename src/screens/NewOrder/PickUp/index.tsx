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
    other: false,
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
    <>
      <div>
        <div className="inline-flex space-x-2 items-center justify-start px-5">
          <img src={LocationIcon} alt="" />

          <p className="text-lg font-semibold text-center text-gray-900">
            Pickup location
          </p>
        </div>
        <div className="flex flex-col gap-y-4 p-5">
          <div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg relative">
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
          <div>
            <CustomInputWithImage
              placeholder="Choose location (optional)"
              imgSrc={ChooseLocationIcon}
              value={locateAddress}
              onClick={() => {
                navigate("/neworder/map");
              }}
            />
          </div>

          <div>
            <CustomInputBox label="Plot no., floor, building name" />
          </div>
          <div>
            <CustomInputBox label="Your address" />
          </div>
          <div>
            <CustomInputBox label="Sector" />
          </div>
          <div>
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
          <div>
            <CustomInputBox label="Pincode" />
          </div>
          <div className="flex gap-3">
            <div>
              <CustomInputBox label="City" />
            </div>
            <div>
              <CustomInputBox label="Country" />
            </div>
          </div>
          <div>
            <AudioInputBox
              label="Record the directions(optional)"
              audio={directionAudio}
              setAudio={setDirectionAudio}
              onClick={() => !directionAudio && setIsAudioModal(true)}
            />
          </div>
          <div>
            <p className="text-[18px] font-semibold">Save your address as</p>
          </div>

          <div className="flex flex-nowrap overflow-x-scroll space-x-4 p-4 ">
            <div
              className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]  px-8 rounded bg-[#FEFEFE] cursor-pointer ${
                saveAddress.office === true
                  ? "border-[#004EFF] text-[#004EFF] "
                  : "border-gray-300"
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
              <p>Office</p>
            </div>
            <div
              className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]  px-8 rounded bg-[#FEFEFE] cursor-pointer ${
                saveAddress.warehouse === true
                  ? "border-[#004EFF] text-[#004EFF] "
                  : "border-gray-300"
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
              <p>Warehouse</p>
            </div>
            <div
              className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]  px-8 rounded bg-[#FEFEFE] cursor-pointer ${
                saveAddress.other === true
                  ? "border-[#004EFF] text-[#004EFF] "
                  : "border-gray-300"
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
              <p>Other</p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-[8px]">
            <CustomCheckbox />
            <p className="text-[14px] font-medium uppercase text-[#004EFF]">
              MASK MY PROVIDER
            </p>
          </div>
          <div className="flex flex-row items-center gap-2 ">
            <img src={ContactIcon} alt="Contact" />
            <p className="text-[18px]">Contact</p>
          </div>

          <div>
            <CustomInputBox label="Name of the contact person" />
          </div>

          <div>
            <CustomInputBox label="Mobile Number" />
          </div>

          <div>
            <CustomInputBox label="Email ID(optional)" />
          </div>
          <div>
            <CustomInputBox label="Alternate mobile number(optional)" />
          </div>
          <div>
            <p className="text-[#202427] text-[18px] font-semibold">
              Save your contact as
            </p>
          </div>

          <div className="flex flex-nowrap overflow-x-scroll space-x-4 p-4 ">
            <div
              className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]  px-8 rounded bg-[#FEFEFE] cursor-pointer ${
                saveContact.shopkeeper === true
                  ? "border-[#004EFF] text-[#004EFF] "
                  : "border-gray-300"
              }`}
              onClick={() =>
                setSaveContact({
                  shopkeeper: true,
                  other: false,
                  warehouse: false,
                })
              }
            >
              <img src={OfficeIcon} alt="ShopKeeper" />
              <p>Shopkeeper</p>
            </div>
            <div
              className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]  px-8 rounded bg-[#FEFEFE] cursor-pointer ${
                saveContact.other === true
                  ? "border-[#004EFF] text-[#004EFF] "
                  : "border-gray-300"
              }`}
              onClick={() =>
                setSaveContact({
                  shopkeeper: false,
                  other: true,
                  warehouse: false,
                })
              }
            >
              <img src={LocationIcon} alt="Other" />
              <p>Other</p>
            </div>
            <div
              className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]  px-8 rounded bg-[#FEFEFE] cursor-pointer ${
                saveContact.warehouse === true
                  ? "border-[#004EFF] text-[#004EFF] "
                  : "border-gray-300"
              }`}
              onClick={() =>
                setSaveContact({
                  shopkeeper: false,
                  other: false,
                  warehouse: true,
                })
              }
            >
              <img src={Warehouse} alt="Warehouse associate" />
              <p>Warehouse associate</p>
            </div>
          </div>

          <div>
            <CustomDatePicker />
          </div>

          <div>
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
        <div>
          <button onClick={openModal}>Open Modal</button>
          <CustomBottomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
            {/* <h2>Hello</h2>
          <button onClick={closeModal}>Close</button>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati,
            consequuntur natus. Cumque rem sint eius vitae quia! Dolorum
            perferendis quae eos quasi vitae, architecto beatae vero? Quidem
            accusamus minus maiores molestias voluptatem perferendis totam,
            assumenda cum minima quibusdam. Provident adipisci ex quia possimus
            minima nihil maxime eius iusto accusantium praesentium porro,
            tempore expedita eum eaque molestiae placeat cumque dicta. Enim!
          </p> */}
            <SelectDateModalContent />
          </CustomBottomModal>
        </div>
      </div>

      <button onClick={handleOpenModal}>Open Right Modal</button>
      <RightSideModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex items-center justify-between w-full p-4 bg-gray-200">
          <h2 className="text-xl font-bold">Modal Title</h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-600"
            title="button"
          >
            <MdOutlineCancel size={24} />
          </button>
        </div>
      </RightSideModal>
    </>
  );
};

export default Index;
