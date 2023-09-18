import { useEffect, useState } from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import Stepper from "../../../components/Stepper";
import CustomCheckbox from "../../../components/CheckBox";

//Icons
import TickLogo from "../../../assets/common/Tick.svg";
import DeliveryAddress from "./DeliveryAddress/deliveryLocation";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { toast } from "react-toastify";
import { POST } from "../../../utils/webService";
import {
  ADD_DELIVERY_LOCATION,
  GET_LATEST_ORDER,
} from "../../../utils/ApiUrls";
import { useNavigate } from "react-router-dom";
import RecipientType from "./Recipient/recipient";

const steps = [
  {
    label: "Pickup",
    isCompleted: true,
    isActive: false,
    imgSrc: TickLogo,
  },
  {
    label: "Delivery",
    isCompleted: false,
    isActive: true,
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

const DeliveryLocation = () => {
  const navigate = useNavigate();
  const [isBillingAddress, setIsBillingAddress] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState<any>({
    deliveryAddress: {
      recipientType: "business",
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
    billingAddress: {
      recipientType: "business",
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
    orderType: "B2B",
    gstNumber: "",
  });

  const postDeliveryOrderDetails = async () => {
    try {
      let payload = {};
      if (isBillingAddress) {
        payload = {
          ...deliveryAddress,
          deliveryAddress: {
            ...deliveryAddress.deliveryAddress,
          },
          billingAddress: deliveryAddress.deliveryAddress,
        };
      } else {
        payload = {
          ...deliveryAddress,
        };
      }

      const { data: response } = await POST(ADD_DELIVERY_LOCATION, payload);

      if (response?.success) {
        toast.success(response?.message);
        navigate("/orders/add-order/add-product");
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

        if (orderData?.deliveryAddress && orderData?.billingAddress) {
          setDeliveryAddress({
            deliveryAddress: {
              fullAddress: orderData?.deliveryAddress?.fullAddress,
              flatNo: orderData?.deliveryAddress?.flatNo,
              locality: orderData?.deliveryAddress?.locality,
              sector: orderData?.deliveryAddress?.sector,
              landmark: orderData?.deliveryAddress?.landmark,
              pincode: orderData?.deliveryAddress?.pincode,
              city: orderData?.deliveryAddress?.city,
              state: orderData?.deliveryAddress?.state,
              country: orderData?.deliveryAddress?.country,
              addressType: orderData?.deliveryAddress?.addressType,
              workingDays: {
                monday: orderData?.deliveryAddress?.workingDays?.monday,
                tuesday: orderData?.deliveryAddress?.workingDays?.tuesday,
                wednesday: orderData?.deliveryAddress?.workingDays?.wednesday,
                thursday: orderData?.deliveryAddress?.workingDays?.thursday,
                friday: orderData?.deliveryAddress?.workingDays?.friday,
                saturday: orderData?.deliveryAddress?.workingDays?.saturday,
                sunday: orderData?.deliveryAddress?.workingDays?.sunday,
              },
              workingHours: orderData?.deliveryAddress?.workingHours || "09:00",
              contact: {
                name: orderData?.deliveryAddress?.contact?.name,
                mobileNo: orderData?.deliveryAddress?.contact?.mobileNo,
                alternateMobileNo:
                  orderData?.deliveryAddress?.contact?.alternateMobileNo,
                emailId: orderData?.deliveryAddress?.contact?.emailId,
                type: orderData?.deliveryAddress?.contact?.type,
              },
              pickupDate: 0,
            },
            billingAddress: {
              fullAddress: orderData?.billingAddress?.fullAddress,
              flatNo: orderData?.billingAddress?.flatNo,
              locality: orderData?.billingAddress?.locality,
              sector: orderData?.billingAddress?.sector,
              landmark: orderData?.billingAddress?.landmark,
              pincode: orderData?.billingAddress?.pincode,
              city: orderData?.billingAddress?.city,
              state: orderData?.billingAddress?.state,
              country: orderData?.billingAddress?.country,
              addressType: orderData?.billingAddress?.addressType,
              workingDays: {
                monday: orderData?.billingAddress?.workingDays?.monday,
                tuesday: orderData?.billingAddress?.workingDays?.tuesday,
                wednesday: orderData?.billingAddress?.workingDays?.wednesday,
                thursday: orderData?.billingAddress?.workingDays?.thursday,
                friday: orderData?.billingAddress?.workingDays?.friday,
                saturday: orderData?.billingAddress?.workingDays?.saturday,
                sunday: orderData?.billingAddress?.workingDays?.sunday,
              },
              workingHours: orderData?.billingAddress?.workingHours || "09:00",
              contact: {
                name: orderData?.billingAddress?.contact?.name,
                mobileNo: orderData?.billingAddress?.contact?.mobileNo,
                alternateMobileNo:
                  orderData?.billingAddress?.contact?.alternateMobileNo,
                emailId: orderData?.billingAddress?.contact?.emailId,
                type: orderData?.billingAddress?.contact?.type,
              },
            },
            orderType: orderData?.orderType,
            gstNumber: orderData?.gstNumber,
          });
        }
      }
    })();
  }, []);

  return (
    <div className="w-full mb-24">
      <Breadcrum label="Add New Order" />
      <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div>

      <RecipientType data={{ deliveryAddress, setDeliveryAddress }} />

      {/* DELIVERY ADDRESS */}

      <DeliveryAddress
        data={{
          deliveryAddress,
          setDeliveryAddress,
        }}
      />

      <div className="flex flex-row items-center px-5 gap-x-[8px] mb-11 lg:col-span-3 lg:mb-5">
        <CustomCheckbox
          checked={isBillingAddress}
          onChange={(e) => {
            setIsBillingAddress(e.target.checked);
          }}
        />
        <p className="text-[14px] font-Open uppercase text-[#004EFF] lg:font-semibold">
          BILLING DETAILS IS SAME AS DELIVERY
        </p>
      </div>

      {!isBillingAddress && (
        <DeliveryAddress
          data={{
            deliveryAddress,
            setDeliveryAddress,
            label: "billing",
          }}
        />
      )}

      <BottomLayout
        callApi={() => postDeliveryOrderDetails()}
        // Button2Name={true}
      />
    </div>
  );
};

export default DeliveryLocation;
