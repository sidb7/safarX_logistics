import BoxDetails from "./boxDetails";
import SummaryService from "./summaryService";
import SummaryAddressBox from "./summaryAddressBox";
import React, { useState, useEffect } from "react";
import ServiceButton from "../../../components/Button/ServiceButton";

import serviceIcon from "../../../assets/serv/service.svg";
import contactIcon from "../../../assets/serv/contact.svg";
import locationIcon from "../../../assets/serv/location.svg";
import phoneIcon from "../../../assets/serv/phone.svg";
import editIcon from "../../../assets/serv/edit.svg";
import TickLogo from "../../../assets/common/Tick.svg";

import SummaryIcon from "../../../assets/serv/Summary.svg";
import copySuccess from "../../../assets/serv/copy-success.svg";
import { useNavigate } from "react-router-dom";
import { POST } from "../../../utils/webService";
import { GET_LATEST_ORDER } from "../../../utils/ApiUrls";
import { HighRiskPincodeModal } from "./whatsappModal";
import { Breadcum } from "../../../components/Layout/breadcrum";
import Stepper from "../../../components/Stepper";
import BottomLayout from "../../../components/Layout/bottomLayout";
import AddButton from "../../../components/Button/addButton";
import { generateUniqueCode } from "../../../utils/utility";

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

  useEffect(() => {
    getLatestOrderDetails();
  }, []);

  const pickupLocationDetails = latestOrder?.data?.pickupLocation;

  const deliveryLocationDetails = latestOrder?.data?.deliveryLocation;

  const serviceDetails = latestOrder?.data?.service;

  // latestOrder?.data?.products.forEach((product: any) => {
  //   const productName = product.productName;
  //   const productWeight = product.weight.deadWeightUnit;
  //   const productDimension = product.dimensions.length;
  // });
  return (
    <div>
      <Breadcum label="Add New Order" />
      <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div>
      <div className="grid grid-cols-1 gap-y-5 p-5   ">
        <div className="flex flex-row gap-2">
          <img src={SummaryIcon} alt="Summary Icon" />
          <p className="text-[18px] text-[#202427] font-semibold lg:font-normal font:lato lg:text-2xl ">
            Summary
          </p>
        </div>
        <div className="flex flex-row justify-between items-center h-[48px] rounded  p-[10px] border-[1px] border-[#A4A4A4] lg:w-1/4  ">
          <p
            className={`text-[12px] text-[#1C1C1C] font-Open leading-4  ${
              orderId !== ""
                ? "lg:text-[#1C1C1C] lg:font-semibold text-base"
                : "lg:text-[#777777] lg:font-normal"
            }`}
          >
            {orderId !== "" ? orderId : "Generate order ID"}
          </p>

          <div>
            <AddButton
              onClick={() => {
                const orderId = generateUniqueCode(8, 12);
                setOrderId(orderId);
              }}
              text={"AUTO GENERATE"}
              className="!bg-transparent !border-none !font-Open !font-semibold !text-sm !leading-5 !shadow-none"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between shadow-lg rounded-lg border-[1px] border-[#E8E8E8] p-4 gap-y-5 lg:w-[770px]">
          <SummaryAddressBox
            locationImage={locationIcon}
            summaryTitle="Pickup Details"
            isEditIcon={true}
            warehouse={pickupLocationDetails?.addressType}
            editImage={editIcon}
            locationImage2={locationIcon}
            summaryAddres={pickupLocationDetails?.address}
            city=""
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
            warehouse={pickupLocationDetails?.addressType}
            locationImage2={locationIcon}
            summaryAddres={pickupLocationDetails?.address}
            city=""
            profileImage={contactIcon}
            contactNumber={pickupLocationDetails?.contact?.mobileNo}
            contactImage={phoneIcon}
            contactName={pickupLocationDetails?.contact?.name}
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
            <img src={editIcon} alt="" className="w-6 h-6" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between shadow-lg rounded-lg border-[1px] border-[#E8E8E8] p-4 gap-y-5 lg:w-[770px]">
          <SummaryAddressBox
            locationImage={locationIcon}
            summaryTitle="Delivery Details"
            isEditIcon={true}
            warehouse={deliveryLocationDetails?.addressType}
            editImage={editIcon}
            locationImage2={locationIcon}
            summaryAddres={deliveryLocationDetails?.address}
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
            warehouse={deliveryLocationDetails?.addressType}
            locationImage2={locationIcon}
            summaryAddres={deliveryLocationDetails?.address}
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
              navigate("/orders/add-order/add-product");
            }}
          >
            <img src={editIcon} alt="" className="w-10 h-10" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-x-5 lg:w-[770px] pb-20">
          {latestOrder?.data?.products?.map((product: any) => (
            <BoxDetails
              key={product.productId}
              productName={product.productName}
              productWeight={product.weight?.deadWeight}
              productWeightUnit={product.weight?.deadWeightUnit}
              productDimensionLength={product.dimensions.length}
              productDimensionBreadth={product.dimensions.breadth}
              productDimensionHeight={product.dimensions.height}
              productDimensionUnit={product.dimensions.unit}
            />
          ))}

          {/*Service */}
          {latestOrder?.data?.products?.map((product: any) => (
            <SummaryService
              companyServiceName={serviceDetails?.companyServiceName}
              // companyServiceId={serviceDetails?.companyServiceId}

              price={serviceDetails?.price}
              partnerServiceId={""}
              partnerServiceName={serviceDetails?.partnerServiceName}
              baseWeight={product.weight?.deadWeight}
              productWeightUnit={product.weight?.deadWeightUnit}
              productDimensionLength={product.dimensions.length}
              productDimensionBreadth={product.dimensions.breadth}
              productDimensionHeight={product.dimensions.height}
              productDimensionUnit={product.dimensions.unit}
              // dimension={productDetails?.dimension}
            />
          ))}
        </div>
      </div>
      <BottomLayout
        callApi={() => navigate("/orders/add-order/payment")}
        Button2Name={true}
      />
    </div>
  );
};

export default Summary;
