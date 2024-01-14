import React from "react";

import AddressCard from "./addressCard";
import SaveAddress from "../SaveAddress/saveAddress";
import AddressTiming from "../Timing/addressTiming";
import ContactDetails from "../ContactDetails/contactDetails";

interface IDeliveryAddress {
  data: {
    deliveryAddress: any;
    setDeliveryAddress: any;
    label?: string;
    inputError: boolean;
    setInputError?: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const DeliveryAddress: React.FunctionComponent<IDeliveryAddress> = ({
  data: {
    deliveryAddress,
    setDeliveryAddress,
    label,
    inputError,
    setInputError,
  },
}) => {
  const data = {
    deliveryAddress,
    setDeliveryAddress,
    addressLabel: label === "billing" ? "Billing Address" : "Delivery Address",
  };

  const contactData = {
    deliveryAddress,
    setDeliveryAddress,
    contactLabel:
      label === "billing"
        ? "Billing Address Contact"
        : "Delivery Address Contact",
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

export default DeliveryAddress;
