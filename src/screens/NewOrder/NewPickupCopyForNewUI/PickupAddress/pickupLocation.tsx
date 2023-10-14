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
  };
}

const PickupAddress: React.FunctionComponent<IPickupAddress> = ({
  data: { pickupAddress, setPickupAddress, label },
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
      <ContactDetails data={contactData} />
      <AddressCard data={data} />
      <SaveAddress data={data} />
      <AddressTiming data={data} />
    </div>
  );
};

export default PickupAddress;
