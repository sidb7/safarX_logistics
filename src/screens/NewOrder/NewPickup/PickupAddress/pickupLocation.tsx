import React from "react";

import AddressCard from "./addressCard";
import SaveAddress from "../SaveAddress/saveAddress";
import AddressTiming from "../Timing/addressTiming";
import ContactDetails from "../ContactDetails/contactDetails";

interface IPickupAddress {
  data: {
    pickupAddress: any;
    setPickupAddress: any;
    label?: string;
    inputError: boolean;
    setInputError?: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const PickupAddress: React.FunctionComponent<IPickupAddress> = ({
  data: { pickupAddress, setPickupAddress, label, inputError, setInputError },
}) => {
  const data = {
    pickupAddress,
    setPickupAddress,
    addressLabel: label === "return" ? "Return Address" : "Pickup Address",
  };

  const contactData = {
    pickupAddress,
    setPickupAddress,
    contactLabel:
      label === "return" ? "Return Address Contact" : "Pickup Address Contact",
  };

  return (
    <div className="px-5">
      <AddressCard data={{ ...data, inputError, setInputError }} />
      <SaveAddress data={data} />
      <AddressTiming data={data} />
      <ContactDetails data={{ ...contactData, inputError, setInputError }} />
    </div>
  );
};

export default PickupAddress;
