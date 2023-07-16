import React, { useState, useRef } from "react";

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
import Datepicker from "../../../components/Datepicker";
import weather from "../../../assets/Delivery/weather.svg";

const Index = () => {
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
    other: false,
    warehouse: true,
  });

  const [pastedData, setPastedData] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData("text");
    setPastedData(pastedData);
  };

  const handleClick = () => {
    // inputRef.current?.focus();
  };

  return (
    <div className="grid grid-cols-1  gap-y-4 ">
      <div className="w-100% h-[54px] bg-[#F5BE6D] p-2  items-center">
        <div className="text-sm mx-5 text-[#1C1C1C]">
          <div className="flex">
            <img src={weather} alt=""/>
            <p className="text-[14px] ml-1 font-medium">HEAVY RAIN WARNING</p>
          </div>
          
          <p className="text-[14p] font-normal">Expect delay in pickup due to weather</p>
        </div>
      </div>
      <div className="mx-5">
      <div className="relative z-1 mt-5   border-[1px] h-[230px] rounded border-[#EAEAEA] bg-[#FFFFFF] drop-shadow-xl px-4 pt-[40px] pb-[8px] ">
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
            <div className="flex flex-row  items-center gap-2 absolute z-2 -top-3 bg-[#FEFEFE]">
              {selectRecipient.business && (
                <Checkbox
                  checked={selectRecipient.business === true ? true : false}
                />
              )}
              <p className="bg-white">Business</p>
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
            <div className="flex flex-row absolute z-2 -top-3 items-center gap-2 bg-[#FEFEFE]">
              {selectRecipient.consumer && (
                <Checkbox
                  checked={selectRecipient.consumer === true ? true : false}
                />
              )}
              <p className="bg-white">Consumer</p>
            </div>
          </div>
        </div>
        <p className="absolute z-2 -top-3 left-5 bg-[#00AEEF] rounded-lg w-[90px] px-[13px] py-[4px] text-[#FFFFFF] ">
          Recipient
        </p>
      </div>
      <div>
        <div className="inline-flex space-x-2 items-center justify-start mt-5 ">
          <img src={LocationIcon} alt="" />
          <p className="text-lg font-semibold text-center text-gray-900">
            Delivery location
          </p>
        </div>
      </div>

      <div>
        <div className="bg-white rounded-lg overflow-hidden shadow-lg relative mt-5">
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
                title="inputWithImage"
              />
            </div>
            <div className="absolute right-[5%] top-[70%] transform -translate-y-1/2">
              <img src={ForwardArrowIcon} alt="Arrow" />
            </div>
          </div>
        </div>
      </div>

      
      <div className="my-5">
        <CustomInputWithImage
          placeholder="Choose location (optional)"
          imgSrc={ChooseLocationIcon}
        />
      </div>

      <div className="relative my-5">
        <CustomInputBox label="Plot no., floor, building name" />
      </div>
      <div className="my-5">
        <CustomInputBox label="Locality" />
      </div>
      <div className="my-5">
        <CustomInputBox label="Sector" />
      </div>
      <div className="my-5">
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
      <div className="my-5">
        <CustomInputBox label="Pincode" />
      </div>
      <div className="grid grid-cols-2 gap-3 my-5">
        <div>
          <CustomInputBox label="City" />
        </div>
        <div>
          <CustomInputBox label="Country" />
        </div>
      </div>
      
      <div className="my-5">
        <CustomInputWithImage
          placeholder="Record the directions(optional)"
          imgSrc={microphone}
        />
      </div>
      
      <div className="my-5">
        <CustomInputBox label="GST no." />
      </div>

      <div className="flex flex-row my-5">
        <div className="mr-2">
          <span className="text-[14px] font-semibold text-[#004EFF]">
            Hours
          </span>
        </div>
        <div className="mr-2">
          <span className="text-[14px] text-[#202427]">Open</span>
        </div>
        <div className="mr-2">
          <span className="text-[14px] text-[#202427]">Closes at 6</span>
        </div>
      </div>
      <div className="my-5">
        <p className="text-[18px] font-semibold">Save your address as</p>
      </div>
      <div className="flex items-center gap-x-2 my-5">
        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px]  border-[0.5px]  p-[8px] rounded bg-[#FEFEFE] cursor-pointer ${
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
          className={`flex flex-row justify-center items-center gap-[8px] text-[16px]  border-[0.5px]   p-[8px] cursor-pointer rounded bg-[#FEFEFE] ${
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
          className={`flex flex-row justify-center items-center gap-[8px] text-[16px] border-[0.5px]  cursor-pointer p-[8px] rounded bg-[#FEFEFE] ${
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

      <div className="flex flex-row items-center gap-[8px] my-5">
        <Checkbox />
        <p className="text-[14px] font-medium uppercase text-[#004EFF]">
          BILLING DETAILS IS SAME AS PICKUP
        </p>
      </div>
      <div className="flex flex-row items-center gap-2 my-5">
        <img src={ContactIcon} alt="Contact" />
        <p className="text-[18px]">Contact</p>
      </div>

      <div className="my-5">
        <CustomInputBox label="Name of the contact person" />
      </div>

      <div className="my-5">
        <CustomInputBox label="Mobile Number" />
      </div>

      <div className="my-5">
        <CustomInputBox label="Email ID(optional)" />
      </div>
      <div className="my-5">
        <CustomInputBox label="Alternate mobile number(optional)" />
      </div>
      <div className="my-5">
        <p className="text-[#202427] text-[18px] font-semibold">
          Save your contact as
        </p>
      </div>
      <div>
      

<div className="flex flex-nowrap  overflow-x-scroll space-x-4">
        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px]  border-[0.5px]   px-8 rounded bg-[#FEFEFE] cursor-pointer ${
            saveContact.shopkeeper === true
              ? "border-[#004EFF] text-[#004EFF] "
              : "border-gray-300"
          }`}
          onClick={() =>
            setSaveContact({ shopkeeper: true, other: false, warehouse: false })
          }
        >
          <img src={OfficeIcon} alt="ShopKeeper" />
          <p>Shopkeeper</p>
        </div>
        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px]  border-[0.5px]   px-8 rounded bg-[#FEFEFE] cursor-pointer ${
            saveContact.other === true
              ? "border-[#004EFF] text-[#004EFF] "
              : "border-gray-300"
          }`}
          onClick={() =>
            setSaveContact({ shopkeeper: false, other: true, warehouse: false })
          }
        >
          <img src={LocationIcon} alt="Other" />
          <p>Other</p>
        </div>
        <div
          className={`flex flex-row justify-center text-[16px] items-center gap-[8px]  border-[0.5px]   px-8 rounded bg-[#FEFEFE] cursor-pointer ${
            saveContact.warehouse === true
              ? "border-[#004EFF] text-[#004EFF] "
              : "border-gray-300"
          }`}
          onClick={() =>
            setSaveContact({ shopkeeper: false, other: false, warehouse: true })
          }
        >
          <img src={Warehouse} alt="Warehouse associate" />
          <p>Warehouse associate</p>
        </div>
      </div>
      

      </div>
      <div className="my-5">
        <CustomInputBox label="Alternate mobile number(optional)" />
        
      </div>
      </div>
      </div>
    
  );
};

export default Index;
