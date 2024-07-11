import React from "react";
import CustomInputBox from "../../../components/Input";
import WebLocationIcon from "../../../assets/PickUp/WebLocation.svg";
import CrossIcon from "../../../assets/CloseIcon.svg";
import CustomInputWithDropDown, {
  LandMark,
} from "../../../components/LandmarkDropdown/LandmarkDropdown";
import ServiceButton from "../../../components/Button/ServiceButton";

interface IPickupDetailsContentProps {
  isPickupRightModal?: any;
  setIsPickupRightModal?: any;
}

const PickupDetailsContent: React.FunctionComponent<
  IPickupDetailsContentProps
> = ({ isPickupRightModal, setIsPickupRightModal }) => {
  return (
    <>
      <div className="mx-5">
        <div className="flex justify-between py-5 items-center text-center">
          <div className="flex gap-x-[8px] ">
            <img src={WebLocationIcon} alt="locationIcon" />
            <p className="font-Lato font-normal text-2xl text-[#323232] leading-8 capitalize">
              Pickup Details
            </p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setIsPickupRightModal(false)}
          >
            <img src={CrossIcon} alt="close button" />
          </div>
        </div>
        <div className="flex flex-col gap-y-5 mt-1">
          <div>
            <CustomInputBox
              label="Reciever's Name"
              //   value={address.flatNo}
              value={""}
              //   onChange={(e) => {
              //     handlePickupAddressChange("flatNo", e.target.value);
              //   }}
              //   inputError={inputError}
              onChange={() => {}}
              name="reciever-name"
            />
          </div>
          <div>
            <CustomInputBox
              label="Reciever's Mobile Number"
              //   value={address.flatNo}
              value={""}
              //   onChange={(e) => {
              //     handlePickupAddressChange("flatNo", e.target.value);
              //   }}
              //   inputError={inputError}
              onChange={() => {}}
              name="reciever-number"
            />
          </div>
          <div>
            <CustomInputBox
              label="Address"
              //   value={address.flatNo}
              value={""}
              className="!h-[70px]"
              //   onChange={(e) => {
              //     handlePickupAddressChange("flatNo", e.target.value);
              //   }}
              //   inputError={inputError}
              onChange={() => {}}
              name="address"
            />
          </div>
          <div className="flex justify-between">
            <div className="">
              <CustomInputBox
                label="Pincode"
                //   value={address.flatNo}
                value={""}
                //   onChange={(e) => {
                //     handlePickupAddressChange("flatNo", e.target.value);
                //   }}
                //   inputError={inputError}
                onChange={() => {}}
                name="pincode"
              />
            </div>
            <div>
              <CustomInputWithDropDown
                handleLandmarkSelected={() => {}}
                handlePickupAddressChange={() => {}}
                pastedData={""}
                value={""}

                // pastedData={
                //   address?.fullAddress ? address?.fullAddress : pastedData
                // }
                // value={address.landmark}
                // handlePickupAddressChange={handlePickupAddressChange}
                // handleLandmarkSelected={handleLandmarkSelected}
                // inputError={inputError}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex justify-end gap-x-5  shadow-lg border-[1px] h-[68px]  bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        {/* <ServiceButton
          text={"CANCEL"}
          onClick={() => {
            setIsPickupRightModal(false);
          }}
          className={` bg-white text-[#1C1C1C] h-[36px] lg:!py-2 lg:!px-4`}
        /> */}
        <ServiceButton
          text={"SAVE"}
          // onClick={() => {
          //   setRenderingComponents(1);
          // }}
          onClick={() => {}}
          className={` bg-[#1C1C1C] text-[#FFFFFF] h-[36px] lg:!py-2 lg:!px-4 disabled:bg-[#E8E8E8] disabled:text-[#BBB] disabled:border-none`}
        />
      </div>
    </>
  );
};

export default PickupDetailsContent;
