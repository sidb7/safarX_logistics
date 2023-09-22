import React from "react";
import Checkbox from "../../../../components/CheckBox";

type TimingState = {
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
  Sunday: boolean;
};

interface IAddressTimingProps {
  data: {
    deliveryAddress: any;
    setDeliveryAddress: any;
    addressLabel: string;
  };
}

const AddressTiming: React.FunctionComponent<IAddressTimingProps> = ({
  data: { deliveryAddress, setDeliveryAddress, addressLabel },
}) => {
  const address =
    addressLabel === "Billing Address"
      ? deliveryAddress.billingAddress
      : deliveryAddress.deliveryAddress;

  const handleTimingChange = (fieldName: keyof TimingState) => {
    const addressName: string =
      addressLabel === "Billing Address" ? "billingAddress" : "deliveryAddress";
    setDeliveryAddress((prevData: any) => ({
      ...prevData,
      [addressName]: {
        ...prevData[addressName],
        workingDays: {
          ...prevData[addressName].workingDays,
          [fieldName]: !prevData[addressName].workingDays[fieldName],
        },
      },
    }));
  };

  const titleCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return deliveryAddress?.orderType === "B2B" ? (
    <div>
      <div className="lg:col-span-3 mb-[12px] lg:mb-[18px] ">
        <p className="text-[18px] font-semibold font-Lato lg:text-[20px] lg:text-[#323232] ">
          Operational Days
        </p>
      </div>

      <div className="relative z-1  flex flex-nowrap overflow-x-scroll space-x-4  mb-[28px] lg:mb-[18px] lg:col-span-3">
        {Object.keys(address.workingDays)?.map((day) => (
          <div
            key={day}
            className={`flex flex-row justify-center text-[16px] items-center gap-[8px] border-[0.5px]   rounded bg-[#FEFEFE] cursor-pointer lg:h-[35px] py-2 px-4  lg:w-[172px] `}
            onClick={() => handleTimingChange(day as keyof TimingState)}
          >
            <div className="flex flex-row  items-center  absolute z-2 -top--1 bg-[#FEFEFE] ">
              <Checkbox
                checked={address.workingDays[day as keyof TimingState]}
              />
              <p className="bg-white   lg:font-semibold lg:font-Open lg:text-sm">
                {titleCase(day)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row mb-5 lg:mb-[36px] lg:col-span-3">
        <div className="mr-2">
          <span className="text-[14px] font-semibold font-Open text-[#004EFF] lg:text-[16px]">
            Operational Hours:-
          </span>
        </div>
        <div className="mr-2">
          <span className="text-[14px] text-[#202427] lg:text-[16px] font-Open lg:text-[#323232]">
            9am - 9pm
          </span>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddressTiming;
