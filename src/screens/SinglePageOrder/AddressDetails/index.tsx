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
import gstIcon from "../../../assets/gstIcon.svg";
import { v4 as uuidv4 } from "uuid";
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
  resetOtherAddressDetails: boolean;
  setResetOtherAddressDetails: any;
  setHighLightField: any;
}

const AddressCardDetails: React.FunctionComponent<IAddressCardDetailsProps> = ({
  pickupDetails,
  deliveryDetails,
  onPickupDetailsChange,
  onDeliveryDetailsChange,
  order,
  setSortServiciblity,
  showDownloadLebal,
  resetOtherAddressDetails,
  setResetOtherAddressDetails,
  setHighLightField,
}) => {
  console.log("🚀 ~ order:", order);
  const [isPickupRightModal, setIsPickupRightModal] = useState<boolean>(false);
  const [isDeliveryRightModal, setIsDeliveryRightModal] =
    useState<boolean>(false);
  const [currentEditType, setCurrentEditType] = useState<
    "pickup" | "delivery" | null
  >(null);
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const [pickupAddress, setPickupAddress] =
    useState<IPickupDetails>(pickupDetails);
  const [deliveryAddress, setDeliveryAddress] =
    useState<IDeliveryDetails>(deliveryDetails);

  const [pickupLandmark, setPickupLandmark] = useState<any>(() => {
    const storedValue = sessionStorage.getItem("pickupOtherAddressDetails");
    return storedValue !== null ? JSON.parse(storedValue) : {};
  });
  const [deliveryLandmark, setDeliveryLandmark] = useState<any>(() => {
    const storedValue = sessionStorage.getItem("DeliveryOtherAddressDetails");
    return storedValue !== null ? JSON.parse(storedValue) : {};
  });

  useEffect(() => {
    setPickupAddress(pickupDetails);
  }, [pickupDetails]);

  useEffect(() => {
    setDeliveryAddress(deliveryDetails);
  }, [deliveryDetails]);

  const handlePickupDetailsSave = (
    newDetails: IPickupDetails,
    landmark: any
  ) => {
    setPickupAddress(newDetails);
    setPickupLandmark(landmark);
    onPickupDetailsChange(newDetails);
    setIsPickupRightModal(false);
  };

  const handleDeliveryDetailsSave = (
    newDetails: IDeliveryDetails,
    landmark: any
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

  const renderAddressDetails = (details: any, type: string, landmark: any) => {
    return (
      <div>
        <div className="flex justify-between ">
          <div className="flex gap-x-[6px] items-center text-center">
            <img
              src={WebLocationIcon}
              alt="locationIcon"
              className={`${!isLgScreen && "w-[18px]"}`}
            />
            <p
              className={`font-Open font-semibold text-[#1C1C1C] leading-5 capitalize ${
                !isLgScreen ? "text-[16px]" : "text-[18px]"
              }`}
            >
              {type} Details
            </p>
          </div>
          {!showDownloadLebal && (
            <div
              onClick={() => {
                handleEditClick(type === "Pickup" ? "pickup" : "delivery");
                setSortServiciblity("");
                setHighLightField({
                  addressDetails: true,
                  packageDetails: false,
                  shippingDetails: false,
                  orderDetails: false,
                  pickupTimeDetails: false,
                });
              }}
            >
              <img
                src={EditIcon}
                alt="edit"
                className={`cursor-pointer ${!isLgScreen && "w-[18px]"}`}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col p-3 gap-y-2">
          <div className={`flex gap-x-5 ${!isLgScreen && "flex-wrap"}`}>
            <div className="flex gap-x-[6px] items-center">
              <img
                src={ProfileIcon}
                alt="profile"
                className="w-[15px] h-[15px]"
              />
              <span
                className={`${
                  !isLgScreen ? "text-[14px]" : "font-Open font-semibold"
                }  ml-1 text-[#323232] leading-[18px]`}
              >
                {details.contact.name}
              </span>
            </div>
            <div className={`flex gap-x-[6px] items-center`}>
              <img
                src={ContactIcon}
                alt="phone icon"
                className="w-[15px] h-[15px]"
              />
              <p
                className={`${
                  !isLgScreen ? "" : "font-Open font-semibold"
                }  text-[14px] text-[#323232] leading-[18px]`}
              >
                +91{" "}
                <span
                  className={`${
                    !isLgScreen ? "" : "font-Open font-semibold"
                  }  text-[14px] text-[#323232] leading-[18px]`}
                >
                  {details.contact.mobileNo}
                </span>
              </p>
            </div>
            {details.gstNumber && (
              <div
                className={`flex gap-x-[6px] items-center ${
                  !isLgScreen && "my-1"
                }`}
              >
                <img
                  src={gstIcon}
                  alt="phone icon"
                  className="w-[15px] h-[15px]"
                />

                <span
                  className={`${
                    isLgScreen && "font-Open font-semibold"
                  } text-[14px] text-[#323232] leading-[18px]`}
                >
                  {details.gstNumber}
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-x-[6px]">
            <img
              src={AddressLocationIcon}
              alt="address-location-icon"
              className="w-[15px] h-[15px]"
            />
            <div className="">
              <p
                className={`${
                  !isLgScreen ? "" : "font-Open font-semibold"
                } ml-1 max-w-[600px] text-[14px] text-[#323232] leading-[18px] capitalize`}
              >
                {details.fullAddress}
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

  useEffect(() => {
    if (resetOtherAddressDetails) {
      setPickupLandmark({});
      setDeliveryLandmark({});
      const timer = setTimeout(() => {
        setResetOtherAddressDetails(false);
      }, 3000);

      // Clean up the timer if the component unmounts or dependencies change
      return () => clearTimeout(timer);
    }
  }, [order?.orderType, order?.transit]);

  useEffect(() => {
    sessionStorage.setItem(
      "pickupOtherAddressDetails",
      JSON.stringify(pickupLandmark)
    );
    sessionStorage.setItem(
      "DeliveryOtherAddressDetails",
      JSON.stringify(deliveryLandmark)
    );
  }, [pickupLandmark, deliveryLandmark]);

  return (
    <>
      <div className={`max-h-[100%] px-3 py-[12px]`}>
        {isPickupAddressEmpty ? (
          <div>
            <div className="flex gap-x-[6px] items-center text-center">
              <img
                src={WebLocationIcon}
                alt="locationIcon"
                className={`${isLgScreen ? "" : "w-[16px]"}`}
              />
              <p
                className={`${
                  isLgScreen
                    ? "font-Open font-semibold text-base"
                    : " text-[15px]"
                } text-[#1C1C1C] leading-5 capitalize`}
              >
                Pickup Details
              </p>
            </div>
            <div className="flex items-start p-3">
              <OneButton
                text={"ADD PICKUP DETAILS"}
                onClick={() => {
                  setCurrentEditType("pickup");
                  setIsPickupRightModal(true);
                  setHighLightField({
                    addressDetails: true,
                    packageDetails: false,
                    shippingDetails: false,
                    orderDetails: false,
                    pickupTimeDetails: false,
                  });
                }}
                variant="quad"
                showIcon={true}
                icon={PlusIcon}
                className="text-[14px]"
                iconClass="w-[14px]"
                textTransform="capitalize"
              />
            </div>
          </div>
        ) : (
          renderAddressDetails(pickupAddress, "Pickup", pickupLandmark)
        )}

        {isLgScreen && <div className="border-[1px] mt-[8px] mb-6"></div>}

        {isDeliveryAddressEmpty ? (
          <div>
            <div className="flex gap-x-[6px] items-center text-center">
              <img
                src={WebLocationIcon}
                alt="locationIcon"
                className={`${isLgScreen ? "" : "w-[16px]"}`}
              />
              <p
                className={`${
                  isLgScreen
                    ? "font-Open font-semibold text-base"
                    : " text-[15px]"
                } text-[#1C1C1C] leading-5 capitalize`}
              >
                Delivery Details
              </p>
            </div>
            <div className="flex items-start p-3">
              <OneButton
                text={"ADD DELIVERY DETAILS"}
                onClick={() => {
                  setCurrentEditType("delivery");
                  setIsDeliveryRightModal(true);
                  setHighLightField({
                    addressDetails: true,
                    packageDetails: false,
                    shippingDetails: false,
                    orderDetails: false,
                    pickupTimeDetails: false,
                  });
                }}
                variant="quad"
                showIcon={true}
                icon={PlusIcon}
                className="text-[14px]"
                iconClass="w-[14px]"
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
        className={`w-full md:!w-[450px]`}
      >
        <PickupDetailsContent
          details={pickupAddress}
          landmark={pickupLandmark}
          setIsPickupRightModal={setIsPickupRightModal}
          onSave={handlePickupDetailsSave}
          order={order}
        />
      </RightSideModal>

      <RightSideModal
        isOpen={isDeliveryRightModal}
        onClose={() => setIsDeliveryRightModal(false)}
        className={`w-full md:!w-[450px]`}
      >
        <DeliveryDetailsContent
          details={deliveryAddress}
          landmark={deliveryLandmark}
          setIsDeliveryRightModal={setIsDeliveryRightModal}
          onSave={handleDeliveryDetailsSave}
          order={order}
        />
      </RightSideModal>
    </>
  );
};

export default AddressCardDetails;
