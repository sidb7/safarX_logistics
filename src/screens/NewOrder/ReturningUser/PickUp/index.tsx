import LocationIcon from "../../../../assets/PickUp/Location.svg";
import { useState } from "react";
import PickupCard from "./customCard";

interface IReturningUserPickupAddress {
  data: {
    returningUserData: any;
    setReturningUserData: any;
    label?: string;
    onAddressSelect: any;
  };
}

const ReturningPickUp: React.FunctionComponent<IReturningUserPickupAddress> = ({
  data: { returningUserData, setReturningUserData, onAddressSelect },
}) => {
  const [selectedCardID, setSelectedCardID] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const returningUserAddressData = returningUserData?.data;

  const returningUserAddress = returningUserAddressData?.map(
    (addressData: any) => ({
      label: addressData?.addressType,
      address: addressData?.fullAddress,
      name: addressData?.contact?.name,
      phoneNumber: addressData?.contact?.mobileNo,
      addressID: addressData?.pickupAddressId,
    })
  );

  const handleCardSelect = (selectedCardId: string) => {
    if (selectedCardId === selectedCardID) {
      setSelectedCardID("");
      setSelectedAddress(null);
      onAddressSelect(null);
    } else {
      const selected = returningUserAddressData.find(
        (addressData: any) => addressData.pickupAddressId === selectedCardId
      );

      if (selected) {
        setSelectedCardID(selectedCardId);
        setSelectedAddress(selected);
        onAddressSelect(selected);
      }
    }
  };

  return (
    <div>
      <div className="inline-flex space-x-2 items-center justify-start px-5">
        <img src={LocationIcon} alt="" />
        <p className="font-Lato text-2xl font-normal leading-8 text-[#323232]">
          Your Top Pickup Address
        </p>
      </div>

      <div className="flex customScroll space-x-4 px-5 pt-5 pb-2 scrollbar-thin scrollbar-thumb-black-400 scrollbar-track-black-200 ml-1 mb-1">
        {returningUserAddress?.map((data: any, index: any) => {
          return (
            <div
              id="address-box"
              key={index}
              onClick={() => handleCardSelect(data?.addressID)}
            >
              <PickupCard
                cardData={data}
                checked={data?.addressID === selectedCardID}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReturningPickUp;
