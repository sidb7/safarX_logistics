import { useEffect, useRef, useState } from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import Stepper from "../../../components/Stepper";
import CustomCheckbox from "../../../components/CheckBox";
import { v4 as uuidv4 } from "uuid";
import ReturningUserPickup from "../ReturningUser/PickUp";
import { format } from "date-fns";

//Icons
import TickLogo from "../../../assets/common/Tick.svg";
import PickupAddress from "./PickupAddress/pickupLocation";
import CustomBranding from "./CustomBranding/customBranding";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { toast } from "react-hot-toast";
import { POST } from "../../../utils/webService";
import {
  ADD_PICKUP_LOCATION,
  GET_LATEST_ORDER,
  RETURNING_USER_PICKUP,
} from "../../../utils/ApiUrls";
import { useNavigate, useParams } from "react-router-dom";
import PickupDate from "./PickupDate/pickupDate";
import { useSelector } from "react-redux";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import ModalContent from "./RightModal/ModalContent";
import AccessDenied from "../../../components/AccessDenied";
import { getQueryJson } from "../../../utils/utility";
import { checkPageAuthorized } from "../../../redux/reducers/role";

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

  const roles = useSelector((state: any) => state?.roles);
  // const isActive = roles.roles?.[0]?.menu?.[1]?.menu?.[1]?.pages?.[0]?.isActive;
  const isActive = checkPageAuthorized("Add Order");
  const params = getQueryJson();

  const [isReturnAddress, setIsReturnAddress] = useState(true);
  const [pickupDate, setPickupDate] = useState("");
  const [isRightLandmarkModal, setIsRightLandmarkModal] = useState(false);
  const [pickupDateInEpoch, setPickupDateInEpoch] = useState("");
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
      pickupDate: "",
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
  const [inputError, setInputError] = useState(false);
  let shipyaari_id = params?.shipyaari_id || "";
  let orderSource = params?.source || "";

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
        if (
          key === "emailId" ||
          key === "alternateMobileNo" ||
          key === "type"
        ) {
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

  const postPickupOrderDetails = async () => {
    try {
      const isPickupAddressValid = !isObjectEmpty(pickupAddress.pickupAddress);
      const isReturnAddressValid = !isObjectEmpty(pickupAddress.returnAddress);

      const isContactDetailsValid = !isContactObjectEmpty(
        pickupAddress.pickupAddress.contact
      );
      const isContactDetailsReturnValid = !isContactObjectEmpty(
        pickupAddress.returnAddress.contact
      );

      const isPickupDateValid = pickupDate !== "" && pickupDate !== "0";
      // console.log("isPickuPDateValid", isPickupDateValid);
      // console.log("pickupAddress", pickupAddress);

      // console.log("isPickupAddValid", isPickupAddressValid);
      if (
        !isPickupAddressValid ||
        !isContactDetailsValid ||
        !isPickupDateValid ||
        (!isReturnAddress &&
          !isReturnAddressValid &&
          !isContactDetailsReturnValid)
      ) {
        setInputError(true);

        return;
      }

      setInputError(false);
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
        const tempOrderId = response?.data[0]?.tempOrderId;
        shipyaari_id = params?.shipyaari_id || tempOrderId || "";
        const orderTypeForNeworder = response?.data[0]?.source;
        orderSource = params?.source || orderTypeForNeworder || "";
        let orderId = params?.orderId || "";
        navigate(
          `/orders/add-order/delivery?shipyaari_id=${shipyaari_id}&source=${orderSource}&orderId=${orderId}`
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
      if (shipyaari_id) {
        const payload = { tempOrderId: shipyaari_id, source: orderSource };
        const { data } = await POST(GET_LATEST_ORDER, payload);
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
              pickupDate: "",
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
            tempOrderId: shipyaari_id,
            source: orderSource,
          });
        }
      }
    })();
  }, [shipyaari_id]); //useLocation hook can be used here with location as dependency if other params are added in url.

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

  useEffect(() => {
    if (inputError) {
      const container = document.getElementById("scrollDiv");
      if (container) {
        container.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  }, [inputError]);

  return (
    <>
      {isActive ? (
        <div className="w-full ">
          <Breadcrum label="Add New Order" />
          <div className=" p-2 mb-4 lg:mb-8">
            <Stepper steps={steps} />
          </div>

          {/* PICKUP ADDRESS */}

          {userType && (
            <ReturningUserPickup
              data={{
                returningUserData,
                setReturningUserData,
                onAddressSelect: (selectedAddress: any) => {
                  if (selectedAddress) {
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
                  } else {
                    setPickupAddress((prevPickupAddress: any) => ({
                      ...prevPickupAddress,
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
                        pickupDate: "",
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
                    }));
                  }
                },
              }}
            />
          )}

          <div id="scrollDiv" />

          <PickupAddress
            data={{
              pickupAddress,
              setPickupAddress,
              inputError,
              setInputError,
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
                inputError,
                setInputError,
              }}
            />
          )}

          <PickupDate epochPickupDate={setPickupDate} inputError={inputError} />

          {/* <CustomBranding
            data={{
              pickupAddress,
              setPickupAddress,
            }}
          /> */}

          <BottomLayout
            callApi={() => postPickupOrderDetails()}
            Button2Name={true}
          />
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default PickupLocation;
