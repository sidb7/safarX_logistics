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
import { Breadcum } from "../../../components/Layout/breadcum";
import Stepper from "../../../components/Stepper";
import BottomLayout from "../../../components/Layout/bottomLayout";

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

  console.log("latest order details", latestOrder);

  const pickupLocationDetails = latestOrder?.data?.pickupLocation;

  console.log("pickupLocationDetails", pickupLocationDetails);

  const deliveryLocationDetails = latestOrder?.data?.deliveryLocation;
  console.log("deliveryLocationDetails", deliveryLocationDetails);

  const serviceDetails = latestOrder?.data?.service;
  console.log("serviceDetails", serviceDetails);

  return (
    <div>
      <div className="hidden lg:flex lg:items-center px-5 ml-6 mb-1">
        <p className="font-Open text-[14px] text-[#777777] mr-1">Home</p>
        <span className="font-Open text-[14px] text-[#777777] mr-1">/</span>
        <span className="font-Open font-semibold text-[14px] text-[#1C1C1C]">
          Order
        </span>
      </div>
      <Breadcum label="Add New Order" />
      <div className="lg:mb-8">
        <Stepper steps={steps} />
      </div>
      <div className="grid grid-cols-1 gap-y-5 p-5   ">
        <div className="flex flex-row gap-2">
          <img src={SummaryIcon} alt="Summary Icon" />
          <p className="text-[18px] text-[#202427] font-semibold lg:font-normal lg:text-2xl ">
            Summary
          </p>
        </div>
        <div className="flex flex-row justify-between items-center h-[48px] rounded  p-[10px] border-[1px] border-[#A4A4A4] lg:w-1/4  ">
          <p className="text-[12px] text-[#1C1C1C] lg:font-normal lg:text-[#777777]">
            Generate order ID
          </p>
          <p className="text-[#004EFF] text-[14px] font-bold lg:font-semibold">
            AUTO GENERATE
          </p>
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
              navigate("/neworder/pickup");
            }}
          >
            <img src={editIcon} alt="" />
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
              navigate("/neworder/delivery");
            }}
          >
            <img src={editIcon} alt="" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-x-5 lg:w-[770px] pb-20">
          <BoxDetails />

          {/*Service */}

          <SummaryService
            companyServiceName={serviceDetails?.companyServiceName}
            // companyServiceId={serviceDetails?.companyServiceId}
            baseWeight={serviceDetails?.baseWeight}
            price={serviceDetails?.price}
            partnerServiceId={""}
            partnerServiceName={serviceDetails?.partnerServiceName}
            dimension={""}
          />
        </div>
      </div>
      <BottomLayout
        callApi={() => navigate("/neworder/payment")}
        Button2Name={true}
      />
    </div>
  );
};

export default Summary;
