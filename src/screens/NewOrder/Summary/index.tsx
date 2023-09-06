import BoxDetails from "./boxDetails";
import SummaryService from "./summaryService";
import SummaryAddressBox from "./summaryAddressBox";
import React, { useState, useEffect } from "react";
import contactIcon from "../../../assets/serv/contact.svg";
import locationIcon from "../../../assets/serv/location.svg";
import phoneIcon from "../../../assets/serv/phone.svg";
import editIcon from "../../../assets/serv/edit.svg";
import TickLogo from "../../../assets/common/Tick.svg";
import SummaryIcon from "../../../assets/serv/Summary.svg";
import { useNavigate } from "react-router-dom";
import { POST } from "../../../utils/webService";
import { GET_LATEST_ORDER, POST_SET_ORDER_ID } from "../../../utils/ApiUrls";
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

type Props = {};

const Summary = (props: Props) => {
  const [ishighRisk, setIsHighRisk] = useState(false);
  const [latestOrder, setLatestOrder] = useState<any>([]);
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

  // endpoint to maintain order state
  const getLatestOrderDetails = async () => {
    try {
      const { data: response } = await POST(GET_LATEST_ORDER);

      if (response?.success) {
        // const recommended = response.filter(
        //   (item: any) => item?.isRecommendation
        // );
        // const filter = response.filter((item: any) => !item?.isRecommendation);

        setLatestOrder(response);
        // setFilterData(filter);
      } else {
        setLatestOrder([]);
        // toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };
  const setOrderIdApi = async () => {
    try {
      let payload = { orderId: orderId };

      const { data: response } = await POST(POST_SET_ORDER_ID, payload);

      if (response?.success) {
        //  navigate
        toast.success(response?.message);
        navigate("/orders/add-order/payment");
      } else {
        toast.error(response?.message);
      }
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

  // latestOrder?.data?.[0]?.products.forEach((product: any) => {
  //   const productName = product?.productName;
  //   const productWeight = product?.weight?.deadWeightUnit;
  //   const productDimension = product?.dimensions?.length;
  // });

  return (
    <div>
      <Breadcum label="Add New Order" />
      <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div>
      <div className="grid grid-cols-1 gap-y-5 p-5 ">
        <div className=" flex flex-row gap-2">
          <img src={SummaryIcon} alt="Summary Icon" />
          <p className="text-[18px] text-[#202427] font-semibold lg:font-normal font:lato lg:text-2xl ">
            Summary
          </p>
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
      <div className="flex flex-row">
        <div className=" basis-2/1 grid grid-cols-1 gap-y-5 px-5   ">
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
            />

            {/* <div className="hidden lg:block w-20 h-20">
            <img src={editIcon} alt="" />
          </div> */}

            <div
              className="hidden lg:block cursor-pointer"
              onClick={() => {
                navigate("/orders/add-order/pickup");
              }}
            >
              <div style={{ width: "20px", height: "20px" }}>
                {" "}
                <img src={editIcon} alt="editIcon" className="w-full h-full" />
              </div>
            </div>
          </div>
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
            />

            {/* <div className="hidden lg:block">
            <img src={editIcon} alt="" />
          </div> */}

            <div
              className="hidden lg:block cursor-pointer"
              onClick={() => {
                navigate("/orders/add-order/delivery");
              }}
            >
              <div style={{ width: "20px", height: "20px" }}>
                {" "}
                <img src={editIcon} alt="editIcon" className="w-full h-full" />
              </div>
            </div>
          </div>
          {/* latestOrder?.data?.[0]?.products */}
          <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-x-5  pb-20 max-w-screen-md	">
            {products.map((product: any) => (
              <BoxDetails
                key={product.productId}
                productName={product.name}
                productWeight={product?.deadWeight}
                productWeightUnit={product?.weightUnit}
                productDimensionLength={product.length}
                productDimensionBreadth={product.breadth}
                productDimensionHeight={product.height}
                productDimensionUnit={product.measureUnit}
              />
            ))}

            {/*Service */}
            {products.map((product: any) => (
              <SummaryService
                companyServiceName={serviceDetails?.companyServiceName}
                // companyServiceId={serviceDetails?.companyServiceId}
                price={serviceDetails?.total}
                add={serviceDetails?.add}
                base={serviceDetails?.base}
                cod={serviceDetails?.cod}
                gst={serviceDetails?.gst}
                invoiceValue={serviceDetails?.invoiceValue}
                // partnerServiceId={""}
                partnerServiceName={serviceDetails?.partnerServiceName}
                baseWeight={product?.deadWeight}
                productWeightUnit={product?.weightUnit}
                productDimensionLength={product.length}
                productDimensionBreadth={product.breadth}
                productDimensionHeight={product.height}
                productDimensionUnit={product.measureUnit}
                // dimension={productDetails?.dimension}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mr-5 ">
          {products.map((product: any) => (
            <PricingDetails
              appliedWeight={serviceDetails?.appliedWeight}
              appliedWeightUnit={product?.weightUnit}
              price={serviceDetails?.total}
              add={serviceDetails?.add}
              base={serviceDetails?.base}
              variables={serviceDetails?.variables}
              cod={serviceDetails?.cod}
              gst={serviceDetails?.gst}
              invoiceValue={serviceDetails?.invoiceValue}
            />
          ))}
        </div>
      </div>
      <BottomLayout callApi={() => setOrderIdApi()} Button2Name={true} />
    </div>
  );
};

export default Summary;
