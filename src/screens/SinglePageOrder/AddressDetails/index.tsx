import { useState } from "react";
import React from "react";
import WebLocationIcon from "../../../assets/PickUp/WebLocation.svg";
import PlusIcon from "../../../assets/plusIcon.svg";
import OneButton from "../../../components/Button/OneButton";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import PickupDetailsContent from "./pickupDetailsContent";
import { useMediaQuery } from "react-responsive";
import DeliveryDetailsContent from "./deliveryDetailsContent";
import EditIcon from "../../../assets/editIcon.svg";
import ProfileIcon from "../../../assets/Catalogue/profileIcon.svg";
import ContactIcon from "../../../assets/ReturningUser/phoneIcon.svg";
import AddressLocationIcon from "../../../assets/serv/location.svg";

interface IAddressCardDetailsProps {}

const AddressCardDetails: React.FunctionComponent<IAddressCardDetailsProps> = (
  props
) => {
  const isLgScreen = useMediaQuery({ query: "(min-width: 640px)" });
  const [isPickupRightModal, setIsPickupRightModal] = useState<boolean>(false);
  // console.log("🚀 ~ isPickupRightModal:", isPickupRightModal);
  const [isDeliveryRightModal, setIsDeliveryRightModal] =
    useState<boolean>(false);
  // console.log("🚀 ~ isDeliveryRightModal:", isDeliveryRightModal);
  return (
    <>
      <div className="border-[1px] rounded-md border-[#004EFF] min-h-[222px] max-h-[268px] px-3 py-[12px]">
        {/* pickup section  */}
        {/* <div className="flex gap-x-[6px] items-center text-center">
          <img src={WebLocationIcon} alt="locationIcon" />
          <p className="font-Open font-semibold text-base text-[#1C1C1C] leading-5 capitalize">
            Pickup Details
          </p>
        </div>
        <div className="flex items-start p-3">
          <OneButton
            text={"Add Pickup Details"}
            onClick={() => setIsPickupRightModal(true)}
            variant="quad"
            showIcon={true}
            icon={PlusIcon}
            textTransform="capitalize"
          />
        </div> */}
        {/* the address filled section  */}
        <div className="flex justify-between">
          <div className="flex gap-x-[6px] items-center text-center">
            <img src={WebLocationIcon} alt="locationIcon" />
            <p className="font-Open font-semibold text-base text-[#1C1C1C] leading-5 capitalize">
              Pickup Details
            </p>
          </div>
          <div>
            <img src={EditIcon} alt="edit" />
          </div>
        </div>
        <div className="flex flex-col p-3 gap-y-2">
          <div className="flex gap-x-5">
            <div className="flex gap-x-[6px] items-center">
              <img src={ProfileIcon} alt="profile" />
              <span className="font-Open font-semibold text-sm text-[#323232] leading-[18px]">
                anish sharma
              </span>
            </div>
            <div className="flex gap-x-[6px] items-center">
              <img src={ContactIcon} alt="phone icon" />
              <p className="font-Open font-semibold text-sm text-[#323232] leading-[18px]">
                +91{" "}
                <span className="font-Open font-semibold text-sm text-[#323232] leading-[18px]">
                  9876543210
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-x-[6px] items-center ">
            <img src={AddressLocationIcon} alt="address-location-icon" />
            <p className="font-Open font-semibold text-sm text-[#323232] leading-[18px] capitalize">
              jhindal warehouse -{" "}
              <span className="font-Open font-semibold text-sm text-[#323232] leading-[18px]">
                400012
              </span>
            </p>
          </div>
          <div>
            <p className="font-Open font-normal text-sm text-[#323232] leading-5">
              Door 12, sector 8, Shankar Nagar, Plot no. ICICI Bank, Andheri
              link road{" "}
            </p>
          </div>
        </div>

        {/* border line  */}
        <div className="border-[1px] mt-[8px] mb-6"></div>
        {/* delivery section  */}
        <div className="flex gap-x-[6px] items-center text-center">
          <img src={WebLocationIcon} alt="locationIcon" />
          <p className="font-Open font-semibold text-base text-[#1C1C1C] leading-5 capitalize">
            Delivery Details
          </p>
        </div>
        <div className="flex items-start p-3">
          <OneButton
            text={"Add Delivery Details"}
            onClick={() => setIsDeliveryRightModal(true)}
            variant="quad"
            showIcon={true}
            icon={PlusIcon}
            textTransform="capitalize"
          />
        </div>
      </div>
      {/* pickup details modal  */}
      <RightSideModal
        isOpen={isPickupRightModal}
        onClose={() => setIsPickupRightModal(false)}
        className={`w-full ${
          isLgScreen ? "md:!w-[389px]" : "mobile-modal-styles"
        }`}
      >
        <PickupDetailsContent
          isPickupRightModal={isPickupRightModal}
          setIsPickupRightModal={setIsPickupRightModal}
        />
      </RightSideModal>

      {/* delivery details modal  */}
      <RightSideModal
        isOpen={isDeliveryRightModal}
        onClose={() => setIsDeliveryRightModal(false)}
        className={`w-full ${
          isLgScreen ? "md:!w-[389px]" : "mobile-modal-styles"
        }`}
      >
        <DeliveryDetailsContent
          isDeliveryRightModal={isDeliveryRightModal}
          setIsDeliveryRightModal={setIsDeliveryRightModal}
        />
      </RightSideModal>
    </>
  );
};

export default AddressCardDetails;
