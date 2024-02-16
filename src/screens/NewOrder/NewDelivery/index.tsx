import { useEffect, useState } from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import Stepper from "../../../components/Stepper";
import CustomCheckbox from "../../../components/CheckBox";

//Icons
import TickLogo from "../../../assets/common/Tick.svg";
import DeliveryAddress from "./DeliveryAddress/deliveryLocation";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { toast } from "react-hot-toast";
import { POST } from "../../../utils/webService";
import {
  ADD_DELIVERY_LOCATION,
  GET_LATEST_ORDER,
  RETURNING_USER_DELIVERY,
} from "../../../utils/ApiUrls";
import { useNavigate } from "react-router-dom";
import RecipientType from "./Recipient/recipient";
import { useSelector } from "react-redux";
import ReturningDelivery from "../ReturningUser/Delivery";
import { getQueryJson } from "../../../utils/utility";

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
  const [loading, setLoading] = useState(true);
  const params = getQueryJson();
  const [inputError, setInputError] = useState(false);
  const shipyaari_id = params?.shipyaari_id;
  let orderSource = params?.source || "";
  let orderId = params?.orderId;

  const [isBillingAddress, setIsBillingAddress] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState<any>({
    deliveryAddress: {
      recipientType: "consumer",
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
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
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
      recipientType: "consumer",
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
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
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
    orderType: "B2C",
    gstNumber: "",
    tempOrderId: shipyaari_id || "",
    source: orderSource || "",
  });
  const userType = useSelector((state: any) => state.user.isReturningUser);

  const [returningUserDeliveryData, setReturningUserDeliveryData] =
    useState<any>([]);

  const isObjectEmpty = (obj: any) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === "sector") {
          continue;
        }

        if (typeof obj[key] === "object") {
          if (!isObjectEmpty(obj[key])) {
            return false;
          }
        } else if (
          obj[key] === "" ||
          obj[key] === null ||
          obj[key] === undefined
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const isContactObjectEmpty = (obj: any) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === "emailId" || key === "alternateMobileNo") {
          continue;
        }

        if (typeof obj[key] === "object") {
          if (!isObjectEmpty(obj[key])) {
            return false;
          }
        } else if (
          obj[key] === "" ||
          obj[key] === null ||
          obj[key] === undefined
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const isGSTNumberValid = (gstNumber: string) => {
    const gstNumberRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[0-9A-Z]{1}[0-9A-Z]{1}$/;
    return gstNumber && gstNumberRegex.test(gstNumber);
  };

  const isGSTFieldValid = (orderType: string, gstNumber: string) => {
    return orderType === "B2B" ? isGSTNumberValid(gstNumber) : true;
  };

  const postDeliveryOrderDetails = async () => {
    try {
      const isDeliveryAddressValid = !isObjectEmpty(
        deliveryAddress.deliveryAddress
      );
      const isbillingAddressValid = !isObjectEmpty(
        deliveryAddress.billingAddress
      );

      const isContactDetailsValid = !isContactObjectEmpty(
        deliveryAddress.deliveryAddress.contact
      );
      const isContactDetailsBillingValid = !isObjectEmpty(
        deliveryAddress.billingAddress.contact
      );

      if (
        !isDeliveryAddressValid ||
        !isContactDetailsValid ||
        (!isBillingAddress &&
          !isbillingAddressValid &&
          !isContactDetailsBillingValid)
      ) {
        setInputError(true);

        return;
      }
      if (
        deliveryAddress.orderType === "B2B" &&
        !isGSTFieldValid(deliveryAddress.orderType, deliveryAddress.gstNumber)
      ) {
        setInputError(true);
        return;
      }

      setInputError(false);
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

        navigate(
          `/orders/add-order/product-package?shipyaari_id=${shipyaari_id}&source=${orderSource}&orderId=${orderId}`
        );
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    (async () => {
      {
        const sanitizeField = (fieldValue: number) =>
          fieldValue === 0 ? "" : fieldValue;

        const payload = { tempOrderId: +shipyaari_id, source: orderSource };

        const { data } = await POST(GET_LATEST_ORDER, payload);
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
                pincode: orderData?.deliveryAddress?.pincode || "",
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
                workingHours:
                  orderData?.deliveryAddress?.workingHours || "09:00",
                contact: {
                  name: orderData?.deliveryAddress?.contact?.name,
                  mobileNo: sanitizeField(
                    orderData?.deliveryAddress?.contact?.mobileNo
                  ),
                  alternateMobileNo: sanitizeField(
                    orderData?.deliveryAddress?.contact?.alternateMobileNo
                  ),
                  emailId: orderData?.deliveryAddress?.contact?.emailId,
                  type: orderData?.deliveryAddress?.contact?.type,
                },
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
                workingHours:
                  orderData?.billingAddress?.workingHours || "09:00",
                contact: {
                  name: orderData?.billingAddress?.contact?.name,
                  mobileNo: sanitizeField(
                    orderData?.billingAddress?.contact?.mobileNo
                  ),
                  alternateMobileNo: sanitizeField(
                    orderData?.billingAddress?.contact?.alternateMobileNo
                  ),
                  emailId: orderData?.billingAddress?.contact?.emailId,
                  type: orderData?.billingAddress?.contact?.type,
                },
              },
              orderType: orderData?.orderType,
              gstNumber: orderData?.deliveryAddress?.gstNumber,
              tempOrderId: orderData?.tempOrderId || "",
              source: orderData?.source || "",
            });
          }
        }
      }
    })();
    // This snippet will scroll the page to top
    const container = document.getElementById("scrollDiv");
    if (container) {
      container.scrollIntoView({ block: "start" });
    }
  }, []);

  const getReturningUserDeliveryDetails = async () => {
    try {
      setLoading(true);

      const { data: response } = await POST(RETURNING_USER_DELIVERY);

      if (response?.success) {
        setReturningUserDeliveryData(response);
      } else {
        setReturningUserDeliveryData([]);
      }
    } catch (error) {
      console.error("Error in Returning User API call:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userType) {
      getReturningUserDeliveryDetails();
    }
  }, [userType]);

  useEffect(() => {
    if (inputError) {
      const container = document.getElementById("scrollDiv");
      if (container) {
        container.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }, [inputError]);
  return (
    <div className="w-full mb-24" id="scrollDiv">
      <Breadcrum label="Add New Order" />
      <div className=" p-2 mb-4 lg:mb-8">
        <Stepper steps={steps} />
      </div>

      <RecipientType
        data={{ deliveryAddress, setDeliveryAddress, inputError }}
      />

      {/* DELIVERY ADDRESS */}

      {userType && (
        <ReturningDelivery
          data={{
            returningUserDeliveryData,
            setReturningUserDeliveryData,
            onAddressSelect: (selectedAddress: any) => {
              if (selectedAddress) {
                setDeliveryAddress((prevDeliveryAddress: any) => ({
                  ...prevDeliveryAddress,
                  deliveryAddress: {
                    ...prevDeliveryAddress.deliveryAddress,
                    ...selectedAddress,
                  },
                  billingAddress: {
                    ...prevDeliveryAddress.billingAddress,
                    ...selectedAddress,
                  },
                }));
              } else {
                setDeliveryAddress((prevDeliveryAddress: any) => ({
                  ...prevDeliveryAddress,
                  deliveryAddress: {
                    recipientType:
                      prevDeliveryAddress.deliveryAddress.recipientType,
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
                      monday: true,
                      tuesday: true,
                      wednesday: true,
                      thursday: true,
                      friday: true,
                      saturday: true,
                      sunday: true,
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
                    recipientType:
                      prevDeliveryAddress.billingAddress.recipientType,
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
                      monday: true,
                      tuesday: true,
                      wednesday: true,
                      thursday: true,
                      friday: true,
                      saturday: true,
                      sunday: true,
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
                  orderType: prevDeliveryAddress.orderType,
                  gstNumber: "",
                  tempOrderId: shipyaari_id || "",
                  source: orderSource || "",
                }));
              }
            },
          }}
        />
      )}

      <div id="scrollDiv" />

      <DeliveryAddress
        data={{
          deliveryAddress,
          setDeliveryAddress,
          inputError,
          setInputError,
        }}
      />

      <div className="flex flex-row items-center px-5 gap-x-[8px] mb-11 lg:col-span-3 lg:mb-5">
        <CustomCheckbox
          checked={isBillingAddress}
          onChange={(e) => {
            setIsBillingAddress(e.target.checked);
          }}
        />
        <p className="text-[14px] font-Open text-[#004EFF] lg:font-semibold">
          Billing Details Is Same As Delivery
        </p>
      </div>

      {!isBillingAddress && (
        <DeliveryAddress
          data={{
            deliveryAddress,
            setDeliveryAddress,
            label: "billing",
            inputError,
            setInputError,
          }}
        />
      )}

      <BottomLayout
        callApi={() => postDeliveryOrderDetails()}
        // Button2Name={true}
        finalButtonText="NEXT"
      />
    </div>
  );
};

export default DeliveryLocation;
