import { useState } from "react";
import React from "react";
import OneButton from "../../../../components/Button/OneButton";
import { useMediaQuery } from "react-responsive";
import WebLocationIcon from "../../../../assets/PickUp/WebLocation.svg";
import PlusIcon from "../../../../assets/plusIcon.svg";
import RightSideModal from "../../../../components/CustomModal/customRightModal";
import EditIcon from "../../../../assets/editIcon.svg";
import ProfileIcon from "../../../../assets/Catalogue/profileIcon.svg";
import ContactIcon from "../../../../assets/ReturningUser/phoneIcon.svg";
import gstIcon from "../../../../assets/gstIcon.svg";
import AddressLocationIcon from "../../../../assets/serv/location.svg";
import PickupDetailsContentInternational from "./pickupDetailsInternational";
import DeliveryDetailsInternational from "./deliveryDetailsInternational";

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

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  const [isPickupRightModal, setIsPickupRightModal] = useState<boolean>(false);
  const [isDeliveryRightModal, setIsDeliveryRightModal] =
    useState<boolean>(false);
  const [currentEditType, setCurrentEditType] = useState<
    "pickup" | "delivery" | null
  >(null);
  const isLgScreen = useMediaQuery({ query: "(min-width: 640px)" });

  const [deliveryAddress, setDeliveryAddress] = useState<any>({
    deliveryAddress: {
      recipientType: "consumer",
      fullAddress:
        "Goregaon , tets, Veer Savarkar Flyover, Mumbai, 400091, Maharashtra, India",
      flatNo: "Goregaon",
      locality: "tets",
      sector: "",
      landmark: "Veer Savarkar Flyover",
      pincode: 400091,
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      countryCode: "IN",
      addressType: "warehouse",
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      workingHours: "09:00",
      contact: {
        name: "admin",
        mobileNo: 9876543210,
        alternateMobileNo: null,
        emailId: "",
        type: "warehouse associate",
      },
      isActive: true,
      deliveryAddressId: "70788c3e-930b-4e6f-9b18-2e3b40cdeb79",
      privateCompanyId: 130278,
      companyId: "00a8dd6f-9a70-497e-b7bd-2c149521fdad",
      isDeleted: false,
      createdAt: 1723180084756,
      createdBy: 131622,
      created_At: "2024-07-25T11:58:39.766Z",
      sellerId: 131622,
      updatedAt: 1723180084756,
      updatedBy: 131622,
      updated_At: "2024-07-25T11:58:39.766Z",
    },
    billingAddress: {
      recipientType: "consumer",
      fullAddress:
        "Goregaon , tets, Veer Savarkar Flyover, Mumbai, 400091, Maharashtra, India",
      flatNo: "Goregaon",
      locality: "tets",
      sector: "",
      landmark: "Veer Savarkar Flyover",
      pincode: 400091,
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      countryCode: "IN",
      addressType: "warehouse",
      workingDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
      workingHours: "09:00",
      contact: {
        name: "admin",
        mobileNo: 9876543210,
        alternateMobileNo: null,
        emailId: "",
        type: "warehouse associate",
      },
      isActive: true,
      deliveryAddressId: "70788c3e-930b-4e6f-9b18-2e3b40cdeb79",
      privateCompanyId: 130278,
      companyId: "00a8dd6f-9a70-497e-b7bd-2c149521fdad",
      isDeleted: false,
      createdAt: 1723180084756,
      createdBy: 131622,
      created_At: "2024-07-25T11:58:39.766Z",
      sellerId: 131622,
      updatedAt: 1723180084756,
      updatedBy: 131622,
      updated_At: "2024-07-25T11:58:39.766Z",
    },
    orderType: "INTERNATIONAL_B2B",
    gstNumber: "",
    tempOrderId: "1723189270190",
    source: "WEBSITE",
  });

  //   const [pickupLandmark, setPickupLandmark] = useState<any>(() => {
  //     const storedValue = sessionStorage.getItem("pickupOtherAddressDetails");
  //     return storedValue !== null ? JSON.parse(storedValue) : {};
  //   });
  //   const [deliveryLandmark, setDeliveryLandmark] = useState<any>(() => {
  //     const storedValue = sessionStorage.getItem("DeliveryOtherAddressDetails");
  //     return storedValue !== null ? JSON.parse(storedValue) : {};
  //   });
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
    const otherDetails = `${landmark?.landmark}, ${landmark?.city}, ${landmark?.state} - ${details?.pincode}`;
    return (
      <div>
        <div className="flex justify-between ">
          <div className="flex gap-x-[6px] items-center text-center">
            <img src={WebLocationIcon} alt="locationIcon" />
            <p className="font-Open font-semibold text-[18px] text-[#1C1C1C] leading-5 capitalize">
              {type} Details
            </p>
          </div>
          {/* {!showDownloadLebal && (
            <div
              onClick={() => {
                handleEditClick(type === "Pickup" ? "pickup" : "delivery");
                setSortServiciblity("");
              }}
            >
              <img src={EditIcon} alt="edit" className="cursor-pointer" />
            </div>
          )} */}
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
            {details.gstNumber && (
              <div className="flex gap-x-[6px] items-center">
                <img
                  src={gstIcon}
                  alt="phone icon"
                  className="w-[15px] h-[15px]"
                />
                <p className="font-Open font-semibold text-[14px] text-[#323232] leading-[18px]">
                  <span className="font-Open font-semibold text-[14px] text-[#323232] leading-[18px]">
                    {details.gstNumber}
                  </span>
                </p>
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
              <p className="font-Open font-semibold ml-1 max-w-[600px] text-[14px] text-[#323232] leading-[18px] capitalize">
                {details.fullAddress}
                {/* {landmark?.landmark} - {details.pincode} */}
              </p>
              {/* <p className="font-Open font-semibold ml-1 mt-1 max-w-[600px] text-[14px] text-[#323232] leading-[18px] capitalize">
                {otherDetails}
              </p> */}
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
  //   const isPickupAddressEmpty = isAddressEmpty(pickupAddress);
  //   const isDeliveryAddressEmpty = isAddressEmpty(deliveryAddress);
  return (
    <>
      <div className={`max-h-[100%] px-3 py-[12px]`}>
        {/* {isPickupAddressEmpty ? (
        
        ) : (
          renderAddressDetails(pickupAddress, "Pickup", pickupLandmark)
        )} */}
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
        <div className="border-[1px] mt-[8px] mb-6"></div>

        {/* {isDeliveryAddressEmpty ? (
         
        ) : (
          renderAddressDetails(deliveryAddress, "Delivery", deliveryLandmark)
        )} */}
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
      </div>
      <RightSideModal
        isOpen={isPickupRightModal}
        onClose={() => setIsPickupRightModal(false)}
        className={`w-full ${
          isLgScreen ? "md:!w-[450px]" : "mobile-modal-styles"
        }`}
      >
        <PickupDetailsContentInternational
          setIsPickupRightModal={setIsPickupRightModal}
        />
      </RightSideModal>

      <RightSideModal
        isOpen={isDeliveryRightModal}
        onClose={() => setIsDeliveryRightModal(false)}
        className={`w-full ${
          isLgScreen ? "md:!w-[450px]" : "mobile-modal-styles"
        }`}
      >
        <DeliveryDetailsInternational
          setIsDeliveryRightModal={setIsDeliveryRightModal}
        />
      </RightSideModal>
    </>
  );
};

export default Index;
