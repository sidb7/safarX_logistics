import { useState } from "react";
import { Breadcum } from "../../../components/Layout/breadcrum";
import Stepper from "../../../components/Stepper";
import CustomCheckbox from "../../../components/CheckBox";

//Icons
import TickLogo from "../../../assets/common/Tick.svg";
import PickupAddress from "./PickupAddress/pickupLocation";

const steps = [
  {
    label: "Pickup",
    isCompleted: false,
    isActive: true,
    imgSrc: TickLogo,
  },
  {
    label: "Delivery",
    isCompleted: false,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Product",
    isCompleted: false,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Service",
    isCompleted: false,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Summary",
    isCompleted: false,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Payment",
    isCompleted: false,
    isActive: false,
    imgSrc: TickLogo,
  },
];

const PickupLocation = () => {
  const [pickupAddress, setPickupAddress] = useState({
    pickupAddress: {
      fullAddress: "",
      flatNo: "",
      locality: "",
      sector: "",
      landmark: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
      addressType: "warehouse",
      workingDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      workingHours: "",
      contact: {
        name: "",
        mobileNo: "",
        alternateMobileNo: "",
        emailId: "",
        type: "",
      },
      pickupDate: 0,
    },
    returnAddress: {
      fullAddress: "",
      flatNo: "",
      locality: "",
      sector: "",
      landmark: "",
      pincode: 0,
      city: "",
      state: "",
      country: "",
      addressType: "warehouse",
      workingDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      workingHours: "",
      contact: {
        name: "",
        mobileNo: "",
        alternateMobileNo: "",
        emailId: "",
        type: "",
      },
    },
    branding: {
      id: "",
      name: "",
      logo: "",
      address: "",
      contact: {
        name: "",
        mobileNo: 0,
      },
    },
  });

  const [isReturnAddress, setIsReturnAddress] = useState(true);

  return (
    <div className="w-full">
      <Breadcum label="Add New Order" />
      <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div>

      {/* PICKUP ADDRESS */}

      <PickupAddress
        data={{
          pickupAddress,
          setPickupAddress,
        }}
      />

      <div className="flex flex-row items-center px-5 gap-x-[8px] mb-11 lg:col-span-3 lg:mb-5">
        <CustomCheckbox
          checked={isReturnAddress}
          onChange={(e) => {
            setIsReturnAddress(e.target.checked);
          }}
        />
        <p className="text-[14px] font-Open uppercase text-[#004EFF] lg:font-semibold">
          RETURN ADDRESS SAME AS PICKUP
        </p>
      </div>

      {!isReturnAddress && (
        <PickupAddress
          data={{
            pickupAddress,
            setPickupAddress,
            label: "return",
          }}
        />
      )}
    </div>
  );
};

export default PickupLocation;
