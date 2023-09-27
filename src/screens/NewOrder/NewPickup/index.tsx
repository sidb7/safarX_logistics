import { useEffect, useState } from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import Stepper from "../../../components/Stepper";
import CustomCheckbox from "../../../components/CheckBox";
import { v4 as uuidv4 } from "uuid";
import ReturningUserPickup from "../ReturningUser/PickUp";

//Icons
import TickLogo from "../../../assets/common/Tick.svg";
import PickupAddress from "./PickupAddress/pickupLocation";
import CustomBranding from "./CustomBranding/customBranding";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { toast } from "react-toastify";
import { POST } from "../../../utils/webService";
import {
  ADD_PICKUP_LOCATION,
  GET_LATEST_ORDER,
  RETURNING_USER_PICKUP,
} from "../../../utils/ApiUrls";
import { useNavigate } from "react-router-dom";
import PickupDate from "./PickupDate/pickupDate";
import { useSelector } from "react-redux";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import ModalContent from "./RightModal/ModalContent";

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
  const [isRightLandmarkModal, setIsRightLandmarkModal] = useState(false);

  const [pickupAddress, setPickupAddress] = useState<any>({
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

  const userType = useSelector((state: any) => state.user.isReturningUser);
  const [loading, setLoading] = useState(true);
  const [returningUserData, setReturningUserData] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

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

  useEffect(() => {
    (async () => {
      const { data } = await POST(GET_LATEST_ORDER);
      if (data.success && data?.data.length > 0) {
        const orderData = data?.data[0];
        setPickupAddress({
          pickupAddress: {
            fullAddress: orderData?.pickupAddress?.fullAddress,
            flatNo: orderData?.pickupAddress?.flatNo,
            locality: orderData?.pickupAddress?.locality,
            sector: orderData?.pickupAddress?.sector,
            landmark: orderData?.pickupAddress?.landmark,
            pincode: orderData?.pickupAddress?.pincode,
            city: orderData?.pickupAddress?.city,
            state: orderData?.pickupAddress?.state,
            country: orderData?.pickupAddress?.country,
            addressType: orderData?.pickupAddress?.addressType,
            workingDays: {
              monday: orderData?.pickupAddress?.workingDays?.monday,
              tuesday: orderData?.pickupAddress?.workingDays?.tuesday,
              wednesday: orderData?.pickupAddress?.workingDays?.wednesday,
              thursday: orderData?.pickupAddress?.workingDays?.thursday,
              friday: orderData?.pickupAddress?.workingDays?.friday,
              saturday: orderData?.pickupAddress?.workingDays?.saturday,
              sunday: orderData?.pickupAddress?.workingDays?.sunday,
            },
            workingHours: orderData?.pickupAddress?.workingHours,
            contact: {
              name: orderData?.pickupAddress?.contact?.name,
              mobileNo: orderData?.pickupAddress?.contact?.mobileNo,
              alternateMobileNo:
                orderData?.pickupAddress?.contact?.alternateMobileNo,
              emailId: orderData?.pickupAddress?.contact?.emailId,
              type: orderData?.pickupAddress?.contact?.type,
            },
            pickupDate: 0,
          },
          returnAddress: {
            fullAddress: orderData?.returnAddress?.fullAddress,
            flatNo: orderData?.returnAddress?.flatNo,
            locality: orderData?.returnAddress?.locality,
            sector: orderData?.returnAddress?.sector,
            landmark: orderData?.returnAddress?.landmark,
            pincode: orderData?.returnAddress?.pincode,
            city: orderData?.returnAddress?.city,
            state: orderData?.returnAddress?.state,
            country: orderData?.returnAddress?.country,
            addressType: orderData?.returnAddress?.addressType,
            workingDays: {
              monday: orderData?.returnAddress?.workingDays?.monday,
              tuesday: orderData?.returnAddress?.workingDays?.tuesday,
              wednesday: orderData?.returnAddress?.workingDays?.wednesday,
              thursday: orderData?.returnAddress?.workingDays?.thursday,
              friday: orderData?.returnAddress?.workingDays?.friday,
              saturday: orderData?.returnAddress?.workingDays?.saturday,
              sunday: orderData?.returnAddress?.workingDays?.sunday,
            },
            workingHours: orderData?.returnAddress?.workingHours,
            contact: {
              name: orderData?.returnAddress?.contact?.name,
              mobileNo: orderData?.returnAddress?.contact?.mobileNo,
              alternateMobileNo:
                orderData?.returnAddress?.contact?.alternateMobileNo,
              emailId: orderData?.returnAddress?.contact?.emailId,
              type: orderData?.returnAddress?.contact?.type,
            },
          },
          branding: {
            id: orderData?.branding?.id,
            name: orderData?.branding?.name,
            logo: orderData?.branding?.logo,
            address: orderData?.branding?.address,
            contact: {
              name: orderData?.branding?.contact?.name,
              mobileNo: orderData?.branding?.contact?.mobileNo,
            },
            isActive: orderData?.branding?.isActive,
          },
        });
      }
    })();
  }, []);

  const getReturningUserPickupDetails = async () => {
    try {
      setLoading(true);

      const { data: response } = await POST(RETURNING_USER_PICKUP);

      if (response?.success) {
        setReturningUserData(response);
      } else {
        setReturningUserData([]);
      }
    } catch (error) {
      console.error("Error in Returning User API call:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userType) {
      getReturningUserPickupDetails();
    }
  }, [userType]);

  console.log("pickupAddress", pickupAddress);
  return (
    <div className="w-full">
      <Breadcrum label="Add New Order" />
      <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div>

      {/* PICKUP ADDRESS */}

      {userType && (
        <ReturningUserPickup
          data={{
            returningUserData,
            setReturningUserData,
            onAddressSelect: (selectedAddress: any) => {
              setPickupAddress((prevPickupAddress: any) => ({
                ...prevPickupAddress,
                pickupAddress: {
                  ...prevPickupAddress.pickupAddress,
                  ...selectedAddress,
                },
                returnAddress: {
                  ...prevPickupAddress.returnAddress,
                  ...selectedAddress,
                },
              }));
            },
          }}
        />
      )}

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
        <p className="text-[14px] font-Open text-[#004EFF] lg:font-semibold">
          Return Address Same As Pickup
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
