import { useState, useEffect } from "react";
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

interface IContact {
  name: string;
  mobileNo: number;
}

interface IPickupDetails {
  fullAddress: string;
  pincode: number;
  contact: IContact;
}

interface IDeliveryDetails extends IPickupDetails {
  gstNumber: string;
}

interface IAddressCardDetailsProps {
  pickupDetails: IPickupDetails;
  deliveryDetails: IDeliveryDetails;
  onPickupDetailsChange: (newPickupDetails: IPickupDetails) => void;
  onDeliveryDetailsChange: (newDeliveryDetails: IDeliveryDetails) => void;
  order: any;
  setSortServiciblity: any;
  showDownloadLebal: boolean;
}

const AddressCardDetails: React.FunctionComponent<IAddressCardDetailsProps> = ({
  pickupDetails,
  deliveryDetails,
  onPickupDetailsChange,
  onDeliveryDetailsChange,
  order,
  setSortServiciblity,
  showDownloadLebal,
}) => {
  const [isPickupRightModal, setIsPickupRightModal] = useState<boolean>(false);
  const [isDeliveryRightModal, setIsDeliveryRightModal] =
    useState<boolean>(false);
  const [currentEditType, setCurrentEditType] = useState<
    "pickup" | "delivery" | null
  >(null);
  const isLgScreen = useMediaQuery({ query: "(min-width: 640px)" });

  const [pickupAddress, setPickupAddress] =
    useState<IPickupDetails>(pickupDetails);
  const [deliveryAddress, setDeliveryAddress] =
    useState<IDeliveryDetails>(deliveryDetails);

  const [pickupLandmark, setPickupLandmark] = useState<any>("");
  const [deliveryLandmark, setDeliveryLandmark] = useState<any>({});

  console.log("pickupLandmark", pickupLandmark);
  console.log("deliveryLandmark", deliveryLandmark);

  useEffect(() => {
    setPickupAddress(pickupDetails);
  }, [pickupDetails]);

  useEffect(() => {
    setDeliveryAddress(deliveryDetails);
  }, [deliveryDetails]);

  const handlePickupDetailsSave = (
    newDetails: IPickupDetails,
    landmark: string
  ) => {
    setPickupAddress(newDetails);
    setPickupLandmark(landmark);
    onPickupDetailsChange(newDetails);
    setIsPickupRightModal(false);
  };

  const handleDeliveryDetailsSave = (
    newDetails: IDeliveryDetails,
    landmark: string
  ) => {
    setDeliveryAddress(newDetails);
    setDeliveryLandmark(landmark);
    onDeliveryDetailsChange(newDetails);
    setIsDeliveryRightModal(false);
  };

  const handleEditClick = (type: "pickup" | "delivery") => {
    if (type === "pickup") {
      setCurrentEditType("pickup");
      setIsPickupRightModal(true);
    } else if (type === "delivery") {
      setCurrentEditType("delivery");
      setIsDeliveryRightModal(true);
    }
  };

  console.log("pickupAddress", pickupAddress);

  const renderAddressDetails = (details: any, type: string, landmark: any) => {
    const otherDetails = `${landmark?.landmark}, ${landmark?.city}, ${landmark?.state} , ${details?.pincode}`;
    return (
      <div>
        <div className="flex justify-between">
          <div className="flex gap-x-[6px] items-center text-center">
            <img src={WebLocationIcon} alt="locationIcon" />
            <p className="font-Open font-semibold text-[18px] text-[#1C1C1C] leading-5 capitalize">
              {type} Details
            </p>
          </div>
          {!showDownloadLebal && (
            <div
              onClick={() => {
                handleEditClick(type === "Pickup" ? "pickup" : "delivery");
                setSortServiciblity("");
              }}
            >
              <img src={EditIcon} alt="edit" className="cursor-pointer" />
            </div>
          )}
        </div>
        <div className="flex flex-col p-3 gap-y-2">
          <div className="flex gap-x-5">
            <div className="flex gap-x-[6px] items-center">
              <img
                src={ProfileIcon}
                alt="profile"
                className="w-[15px] h-[15px]"
              />
              <span className="font-Open font-semibold ml-1 text-[14px] text-[#323232] leading-[18px]">
                {details.contact.name}
              </span>
            </div>
            <div className="flex gap-x-[6px] items-center">
              <img
                src={ContactIcon}
                alt="phone icon"
                className="w-[15px] h-[15px]"
              />
              <p className="font-Open font-semibold text-[14px] text-[#323232] leading-[18px]">
                +91{" "}
                <span className="font-Open font-semibold text-[14px] text-[#323232] leading-[18px]">
                  {details.contact.mobileNo}
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-x-[6px]">
            <img
              src={AddressLocationIcon}
              alt="address-location-icon"
              className="w-[15px] h-[15px]"
            />
            <div className="">
              <p className="font-Open font-semibold ml-1 max-w-[600px] text-[14px] text-[#323232] leading-[18px] capitalize">
                {details.fullAddress}
                {/* {landmark?.landmark} - {details.pincode} */}
              </p>
              <p className="font-Open font-semibold ml-1 mt-1 max-w-[600px] text-[14px] text-[#323232] leading-[18px] capitalize">
                {otherDetails}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const isAddressEmpty = (address: IPickupDetails | IDeliveryDetails) => {
    return (
      !address.fullAddress ||
      !address.pincode ||
      !address.contact.name ||
      !address.contact.mobileNo
    );
  };
  const isPickupAddressEmpty = isAddressEmpty(pickupAddress);
  const isDeliveryAddressEmpty = isAddressEmpty(deliveryAddress);

  return (
    <>
      <div
        className={`border-[1px] border-[#E8E8E8] max-h-[100%] customScroll rounded-md px-3 py-[12px]`}
      >
        {isPickupAddressEmpty ? (
          <div>
            <div className="flex gap-x-[6px] items-center text-center">
              <img src={WebLocationIcon} alt="locationIcon" />
              <p className="font-Open font-semibold text-base text-[#1C1C1C] leading-5 capitalize">
                Pickup Details
              </p>
            </div>
            <div className="flex items-start p-3">
              <OneButton
                text={"ADD PICKUP DETAILS"}
                onClick={() => {
                  setCurrentEditType("pickup");
                  setIsPickupRightModal(true);
                }}
                variant="quad"
                showIcon={true}
                icon={PlusIcon}
                textTransform="capitalize"
              />
            </div>
          </div>
        ) : (
          renderAddressDetails(pickupAddress, "Pickup", pickupLandmark)
        )}

        <div className="border-[1px] mt-[8px] mb-6"></div>

        {isDeliveryAddressEmpty ? (
          <div>
            <div className="flex gap-x-[6px] items-center text-center">
              <img src={WebLocationIcon} alt="locationIcon" />
              <p className="font-Open font-semibold text-base text-[#1C1C1C] leading-5 capitalize">
                Delivery Details
              </p>
            </div>
            <div className="flex items-start p-3">
              <OneButton
                text={"ADD DELIVERY DETAILS"}
                onClick={() => {
                  setCurrentEditType("delivery");
                  setIsDeliveryRightModal(true);
                }}
                variant="quad"
                showIcon={true}
                icon={PlusIcon}
                textTransform="capitalize"
              />
            </div>
          </div>
        ) : (
          renderAddressDetails(deliveryAddress, "Delivery", deliveryLandmark)
        )}
      </div>

      <RightSideModal
        isOpen={isPickupRightModal}
        onClose={() => setIsPickupRightModal(false)}
        className={`w-full ${
          isLgScreen ? "md:!w-[389px]" : "mobile-modal-styles"
        }`}
      >
        <PickupDetailsContent
          details={pickupAddress}
          landmark={pickupLandmark}
          setIsPickupRightModal={setIsPickupRightModal}
          onSave={handlePickupDetailsSave}
        />
      </RightSideModal>

      <RightSideModal
        isOpen={isDeliveryRightModal}
        onClose={() => setIsDeliveryRightModal(false)}
        className={`w-full ${
          isLgScreen ? "md:!w-[389px]" : "mobile-modal-styles"
        }`}
      >
        <DeliveryDetailsContent
          details={deliveryAddress}
          landmark={deliveryLandmark}
          setIsDeliveryRightModal={setIsDeliveryRightModal}
          onSave={handleDeliveryDetailsSave}
        />
      </RightSideModal>
    </>
  );
};

export default AddressCardDetails;
