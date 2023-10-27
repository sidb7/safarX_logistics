import LocationIcon from "../../../../assets/PickUp/Location.svg";
// import CustomPickupLocation from "./customPickupLocation";
// import EditIcon from "../../../../assets/PickUp/Edit.svg";
import PlusIcon from "../../../../assets/ReturningUser/plusIcon.svg";
import ProfileIcon from "../../../../assets/ReturningUser/profileIcon.svg";
// import CustomContact from "./customContact";
// import PhoneIcon from "../../../../assets/ReturningUser/phoneIcon.svg";
// import DatePicker from "../../../../components/Datepicker/customDatePicker";
// import Switch from "react-switch";
import { useState } from "react";
// import { customContactData } from "../../../../utils/dummyData";
// import { customPickUpData } from "../../../../utils/dummyData";
import { useNavigate } from "react-router-dom";
import PickupCard from "../PickUp/customCard";

interface IReturningUserDeliveryAddress {
  data: {
    returningUserDeliveryData: any;
    setReturningUserDeliveryData: any;
    label?: string;
    onAddressSelect: any;
  };
}
const ReturningDelivery: React.FunctionComponent<
  IReturningUserDeliveryAddress
> = ({
  data: {
    returningUserDeliveryData,
    setReturningUserDeliveryData,
    label,
    onAddressSelect,
  },
}) => {
  const [selectedCardID, setSelectedCardID] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

  // const [toggleStatus, setToggleStatus] = useState(false);
  const returningUserAddressData = returningUserDeliveryData?.data;

  const returningUserAddress = returningUserAddressData?.map(
    (addressData: any) => ({
      label: addressData?.addressType,
      address: addressData?.fullAddress,
      name: addressData?.contact?.name,
      phoneNumber: addressData?.contact?.mobileNo,
      addressID: addressData?.deliveryAddressId,
    })
  );

  const handleCardSelect = (selectedCardId: string) => {
    setSelectedCardID(selectedCardId);

    const selected = returningUserAddressData.find(
      (addressData: any) => addressData.deliveryAddressId === selectedCardId
    );

    if (selected) {
      setSelectedAddress(selected);
      onAddressSelect(selected);
    }
  };

  // const contactInfoData = returningUserData?.data;

  // const contactInfo = contactInfoData?.map((contactData: any) => ({
  //   label: contactData?.contact?.type,
  //   name: contactData?.contact?.name,
  //   phoneNumber: contactData?.contact?.mobileNo,
  // }));
  // const navigate = useNavigate();

  // const handleNavgigate = () => {
  //   navigate("/neworder/pickup");
  // };
  return (
    <div>
      <div className="inline-flex space-x-2 items-center justify-start px-5">
        <img src={LocationIcon} alt="" />

        <p className="font-Lato text-2xl font-normal leading-8 text-[#323232]">
          Your Top Delivery Address
        </p>
      </div>

      {/* address data  */}

      <div className="flex overflow-x-auto space-x-4 px-5 pt-5 pb-2 scrollbar-thin scrollbar-thumb-black-400 scrollbar-track-black-200 ml-1 mb-1">
        {returningUserAddress?.map((data: any, index: any) => {
          return (
            <div key={index} onClick={() => handleCardSelect(data?.addressID)}>
              <PickupCard
                cardData={data}
                checked={data?.addressID === selectedCardID}
              />
            </div>
          );
        })}
      </div>

      {/* <div className="flex justify-between mx-5 mt-2">
        <div
          className="flex items-center gap-x-2 mt-2"
          onClick={handleNavgigate}
        >
          <img src={PlusIcon} alt="" />
          <span className="text-[#004EFF] text-[14px] w-[240px]">
            ADD ADDRESS
          </span>
        </div>
        <p className="mt-2 border-b-2 border-[#004EFF] text-[#004EFF] text-[14px]">
          CHANGE
        </p>
      </div> */}
      {/* <div className="flex items-center mt-3 mx-5 gap-x-2">
        <img src={ProfileIcon} alt="" />
        <p className="font-Lato text-2xl font-normal leading-8 text-[#323232]">
          Your Top Contact Address
        </p>
      </div>

      <div className="flex overflow-x-auto space-x-4 px-5 pt-5 pb-2">
        {contactInfo?.map((data: any, index: any) => {
          return <PickupCard cardData={data} key={index} />;
        })}
      </div>

      <div className="flex justify-between mx-5 mt-2">
        <div
          className="flex items-center gap-x-2 mt-2"
          onClick={handleNavgigate}
        >
          <img src={PlusIcon} alt="" />
          <span className="text-[#004EFF] text-[14px] w-[240px]">
            ADD CONTACT
          </span>
        </div>
        <p className="mt-2 border-b-2 border-[#004EFF] text-[#004EFF] text-[14px]">
          CHANGE
        </p>
      </div> */}
    </div>
  );
};
export default ReturningDelivery;
