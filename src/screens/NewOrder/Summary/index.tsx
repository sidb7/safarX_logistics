import React, { useState, useEffect } from "react";
import SummaryAddressBox from "./summaryAddressBox";
import { useNavigate } from "react-router-dom";
import { POST } from "../../../utils/webService";
import {
  GET_LATEST_ORDER,
  POST_SET_ORDER_ID,
  POST_PLACE_ORDER,
} from "../../../utils/ApiUrls";
import { HighRiskPincodeModal } from "./whatsappModal";
import { Breadcum } from "../../../components/Layout/breadcrum";
import Stepper from "../../../components/Stepper";
import BottomLayout from "../../../components/Layout/bottomLayout";
import AddButton from "../../../components/Button/addButton";
import { generateUniqueCode } from "../../../utils/utility";
import PricingDetails from "./pricingDetails";
import { toast } from "react-toastify";
import AutoGenerateIcon from "../../../assets/Product/autogenerate.svg";
import CustomInputBox from "../../../components/Input";
import BoxDetails from "./boxDetails";
import SummaryService from "./summaryService";
import contactIcon from "../../../assets/serv/contact.svg";
import locationIcon from "../../../assets/serv/location.svg";
import phoneIcon from "../../../assets/serv/phone.svg";
import editIcon from "../../../assets/serv/edit.svg";
import TickLogo from "../../../assets/common/Tick.svg";
import SummaryIcon from "../../../assets/serv/Summary.svg";
import { Spinner } from "flowbite-react";

type Props = {};

const Summary = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [ishighRisk, setIsHighRisk] = useState(false);
  const [latestOrder, setLatestOrder] = useState<any>([]);
  const [ewaybillNumber, setEwaybillNumber] = useState("");

  const [pickupLocation, setPickupLocation] = useState({
    flatNo: "",
    address: "",
    sector: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    addressType: "",
  });
  const [completeAddress, setCompleteAddress] = useState("");
  const steps = [
    {
      label: "Pickup",
      isCompleted: true,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Delivery",
      isCompleted: true,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Product",
      isCompleted: true,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Service",
      isCompleted: true,
      isActive: false,
      imgSrc: TickLogo,
    },
    {
      label: "Summary",
      isCompleted: false,
      isActive: true,
      imgSrc: TickLogo,
    },
    {
      label: "Payment",
      isCompleted: false,
      isActive: false,
      imgSrc: TickLogo,
    },
  ];

  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const getLatestOrderDetails = async () => {
    try {
      setLoading(true);

      const { data: response } = await POST(GET_LATEST_ORDER);

      if (response?.success) {
        setLatestOrder(response);
      } else {
        setLatestOrder([]);
      }
    } catch (error) {
      console.error("Error in API call:", error);
    } finally {
      setLoading(false);
    }
  };

  const setOrderIdApi = async () => {
    try {
      let payload = { orderId: orderId, ewaybillNumber: ewaybillNumber };

      const setOrderIdPromise = await POST(POST_SET_ORDER_ID, payload);
      const placeOrderPromise = await POST(POST_PLACE_ORDER);

      let promiseSetOrderId = new Promise(function (resolve, reject) {
        resolve(setOrderIdPromise);
      });

      let promisePlaceOrder = new Promise(function (resolve, reject) {
        resolve(placeOrderPromise);
      });

      promiseSetOrderId
        .then((orderIdResponse: any) => {
          // toast.success(successMessage?.data?.message);
          promisePlaceOrder
            .then((orderPlaceResponse: any) => {
              if (orderPlaceResponse?.success) {
                toast.success(orderPlaceResponse?.data?.message);
                navigate("/orders/view-orders");
              } else {
                const requiredBalance =
                  orderPlaceResponse?.data?.data[0]?.requiredBalance;

                navigate("/orders/add-order/payment", {
                  state: { requiredBalance: requiredBalance },
                });
              }
            })
            .catch(function (errorResponse) {
              toast.error(errorResponse?.data?.message);
            });
        })
        .catch(function (errorMessage) {
          toast.error(errorMessage?.data?.message);
        });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getLatestOrderDetails();
  }, []);

  const pickupLocationDetails = latestOrder?.data?.[0]?.pickupAddress;
  const pickupLocationReturnAddress = latestOrder?.data?.[0]?.returnAddress;

  const deliveryLocationDetails = latestOrder?.data?.[0]?.deliveryAddress;
  const deliveryLocationBillingDetails = latestOrder?.data?.[0]?.billingAddress;
  const serviceDetails = latestOrder?.data?.[0]?.service;
  const products = latestOrder?.data?.[0]?.products || [];
  const boxInfo = latestOrder?.data?.[0]?.boxInfo;

  // console.log("boxInfo", boxInfo);

  return (
    <div>
      <Breadcum label="Add New Order" />
      <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div>
      <div className="grid grid-cols-1 gap-y-5 p-5 ">
        <div className="flex flex-row gap-2">
          <img src={SummaryIcon} alt="Summary Icon" />
          <p className="text-[18px] text-[#202427] font-semibold lg:font-normal font:lato lg:text-2xl ">
            Summary
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="!w-[372px]">
            <div className="!w-[372px]">
              <CustomInputBox
                label="Enter Eway Bill No."
                value={ewaybillNumber}
                onChange={(e) => setEwaybillNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="!w-[372px]">
            <CustomInputBox
              isRightIcon={true}
              containerStyle=""
              rightIcon={AutoGenerateIcon}
              className="w-full !text-base !font-semibold"
              imageClassName="!h-[12px] !w-[113px] !top-[40%] "
              value={orderId}
              maxLength={12}
              label="Generate order ID"
              onChange={(e) => {
                setOrderId(e.target.value);
              }}
              onClick={() => {
                const orderId = generateUniqueCode(8, 12);
                setOrderId(orderId);
              }}
              visibility={true}
              setVisibility={() => {}}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-row">
          <div className="basis-2/1 grid grid-cols-1 gap-y-5 px-5">
            {/* Pickup Details */}
            <div className="flex flex-col lg:flex-row lg:justify-between shadow-lg rounded-lg border-[1px] border-[#E8E8E8] p-4 gap-y-5 max-w-screen-md	 ">
              <SummaryAddressBox
                locationImage={locationIcon}
                summaryTitle="Pickup Details"
                isEditIcon={true}
                warehouse={
                  pickupLocationDetails?.addressType.charAt(0).toUpperCase() +
                  pickupLocationDetails?.addressType.slice(1)
                }
                editImage={editIcon}
                locationImage2={locationIcon}
                summaryAddres={pickupLocationDetails?.fullAddress}
                city={pickupLocationDetails?.city}
                profileImage={contactIcon}
                contactNumber={pickupLocationDetails?.contact?.mobileNo}
                contactImage={phoneIcon}
                contactName={pickupLocationDetails?.contact?.name}
                isContactName={true}
                isContactNumber={true}
              />

              <SummaryAddressBox
                locationImage={locationIcon}
                summaryTitle="RTO Address"
                editImage={editIcon}
                warehouse={
                  pickupLocationDetails?.addressType.charAt(0).toUpperCase() +
                  pickupLocationDetails?.addressType.slice(1)
                }
                locationImage2={locationIcon}
                summaryAddres={pickupLocationReturnAddress?.fullAddress}
                city=""
                profileImage={contactIcon}
                contactNumber={pickupLocationReturnAddress?.contact?.mobileNo}
                contactImage={phoneIcon}
                contactName={pickupLocationReturnAddress?.contact?.name}
                isContactName={true}
                isContactNumber={true}
              />
              <div
                className="hidden lg:block cursor-pointer"
                onClick={() => {
                  navigate("/orders/add-order/pickup");
                }}
              >
                <div style={{ width: "20px", height: "20px" }}>
                  {" "}
                  <img
                    src={editIcon}
                    alt="editIcon"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="flex flex-col lg:flex-row lg:justify-between shadow-lg rounded-lg border-[1px] border-[#E8E8E8] p-4 gap-y-5 max-w-screen-md	 ">
              <SummaryAddressBox
                locationImage={locationIcon}
                summaryTitle="Delivery Details"
                isEditIcon={true}
                warehouse={
                  deliveryLocationDetails?.addressType.charAt(0).toUpperCase() +
                  deliveryLocationDetails?.addressType.slice(1)
                }
                editImage={editIcon}
                locationImage2={locationIcon}
                summaryAddres={deliveryLocationDetails?.fullAddress}
                city=""
                profileImage={contactIcon}
                contactNumber={deliveryLocationDetails?.contact?.mobileNo}
                contactImage={phoneIcon}
                contactName={deliveryLocationDetails?.contact?.name}
                isContactName={true}
                isContactNumber={true}
              />
              <SummaryAddressBox
                locationImage={locationIcon}
                summaryTitle="Billing Address"
                editImage={editIcon}
                warehouse={
                  deliveryLocationDetails?.addressType.charAt(0).toUpperCase() +
                  deliveryLocationDetails?.addressType.slice(1)
                }
                locationImage2={locationIcon}
                summaryAddres={deliveryLocationDetails?.fullAddress}
                city=""
                profileImage={contactIcon}
                contactNumber={deliveryLocationDetails?.contact?.mobileNo}
                contactImage={phoneIcon}
                contactName={deliveryLocationDetails?.contact?.name}
                isContactName={true}
                isContactNumber={true}
              />
              <div
                className="hidden lg:block cursor-pointer"
                onClick={() => {
                  navigate("/orders/add-order/delivery");
                }}
              >
                <div style={{ width: "20px", height: "20px" }}>
                  {" "}
                  <img
                    src={editIcon}
                    alt="editIcon"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-x-5  pb-20 max-w-screen-md	">
              <BoxDetails boxInfo={boxInfo} />

              {/* Service Details */}
              <SummaryService
                companyServiceName={serviceDetails?.companyServiceName}
                price={serviceDetails?.total}
                add={serviceDetails?.add}
                base={serviceDetails?.base}
                cod={serviceDetails?.cod}
                gst={serviceDetails?.gst}
                invoiceValue={serviceDetails?.invoiceValue}
                partnerServiceName={serviceDetails?.partnerServiceName}
                baseWeight={serviceDetails?.appliedWeight}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row mr-5 ">
            {/* Pricing Details */}
            <PricingDetails
              appliedWeight={serviceDetails?.appliedWeight}
              price={serviceDetails?.total}
              add={serviceDetails?.add}
              base={serviceDetails?.base}
              variables={serviceDetails?.variables}
              cod={serviceDetails?.cod}
              gst={serviceDetails?.gst}
              invoiceValue={serviceDetails?.invoiceValue}
              insurance={serviceDetails?.insurance}
            />
          </div>
        </div>
      )}

      <BottomLayout
        customButtonText="PLACE ORDER"
        callApi={() => setOrderIdApi()}
        className="lg:w-[120px]"
        Button2Name={true}
      />
    </div>
  );
};

export default Summary;
