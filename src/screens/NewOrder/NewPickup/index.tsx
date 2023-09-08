import { useState } from "react";
import { Breadcum } from "../../../components/Layout/breadcrum";
import Stepper from "../../../components/Stepper";
import CustomCheckbox from "../../../components/CheckBox";
import { v4 as uuidv4 } from "uuid";

//Icons
import TickLogo from "../../../assets/common/Tick.svg";
import PickupAddress from "./PickupAddress/pickupLocation";
import CustomBranding from "./CustomBranding/customBranding";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { toast } from "react-toastify";
import { POST } from "../../../utils/webService";
import { ADD_PICKUP_LOCATION } from "../../../utils/ApiUrls";
import { useNavigate } from "react-router-dom";
import PickupDate from "./PickupDate/pickupDate";

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
  const navigate = useNavigate();
  const [isReturnAddress, setIsReturnAddress] = useState(true);
  const [pickupDate, setPickupDate] = useState("");
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
      workingHours: "09:00",
      contact: {
        name: "",
        mobileNo: "",
        alternateMobileNo: "",
        emailId: "",
        type: "warehouse associate",
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
      workingHours: "09:00",
      contact: {
        name: "",
        mobileNo: "",
        alternateMobileNo: "",
        emailId: "",
        type: "warehouse associate",
      },
    },
    branding: {
      id: uuidv4(),
      name: "",
      logo: "",
      address: "",
      contact: {
        name: "",
        mobileNo: "",
      },
      isActive: false,
    },
  });

  const postPickupOrderDetails = async () => {
    try {
      let payload = {};
      if (isReturnAddress) {
        payload = {
          ...pickupAddress,
          pickupAddress: {
            ...pickupAddress.pickupAddress,
            pickupDate: pickupDate,
          },
          returnAddress: pickupAddress.pickupAddress,
        };
      } else {
        payload = {
          ...pickupAddress,
          pickupAddress: {
            ...pickupAddress.pickupAddress,
            pickupDate: pickupDate,
          },
        };
      }
      const { data: response } = await POST(ADD_PICKUP_LOCATION, payload);

      if (response?.success) {
        toast.success(response?.message);
        navigate("/orders/add-order/delivery");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

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

      <PickupDate epochPickupDate={setPickupDate} />

      <CustomBranding
        data={{
          pickupAddress,
          setPickupAddress,
        }}
      />

      <BottomLayout
        callApi={() => postPickupOrderDetails()}
        Button2Name={true}
      />
    </div>
  );
};

export default PickupLocation;
