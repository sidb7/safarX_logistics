import BoxDetails from "./boxDetails";
import SummaryService from "./summaryService";
import SummaryAddressBox from "./summaryAddressBox";
import React, { useState } from "react";
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

import { HighRiskPincodeModal } from "./whatsappModal";
import { Breadcum } from "../../../components/Layout/breadcum";
import Stepper from "../../../components/Stepper";
import BottomLayout from "../../../components/Layout/bottomLayout";

type Props = {};

const Summary = (props: Props) => {
  const [ishighRisk, setIsHighRisk] = useState(false);

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
            warehouse="Warehouse"
            editImage={editIcon}
            locationImage2={locationIcon}
            summaryAddres="Door 12, sector 8, Shankar Nagar"
            city=" Andheri East, Mumbai 422011"
            profileImage={contactIcon}
            contactNumber="+91 12345 12345"
            contactImage={phoneIcon}
            contactName="Amith Sharma"
            isContactName={true}
            isContactNumber={true}
          />
          <SummaryAddressBox
            locationImage={locationIcon}
            summaryTitle="RTO Address"
            editImage={editIcon}
            warehouse="Warehouse Pune"
            locationImage2={locationIcon}
            summaryAddres="Door 12, sector 8, Shankar Nagar"
            city=" Andheri East, Mumbai 422011"
            profileImage={contactIcon}
            contactNumber="+91 12345 12345"
            contactImage={phoneIcon}
            contactName="Amith Sharma"
          />

          <div className="hidden lg:block">
            <img src={editIcon} alt="" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between shadow-lg rounded-lg border-[1px] border-[#E8E8E8] p-4 gap-y-5 lg:w-[770px]">
          <SummaryAddressBox
            locationImage={locationIcon}
            summaryTitle="Delivery Details"
            isEditIcon={true}
            warehouse="Warehouse Mumbai"
            editImage={editIcon}
            locationImage2={locationIcon}
            summaryAddres="Door 12, sector 8, Shankar Nagar"
            city=" Andheri East, Mumbai 422011"
            profileImage={contactIcon}
            contactNumber="+91 12345 12345"
            contactImage={phoneIcon}
            contactName="Amith Sharma"
            isContactName={true}
            isContactNumber={true}
          />
          <SummaryAddressBox
            locationImage={locationIcon}
            summaryTitle="Billing Address"
            editImage={editIcon}
            warehouse="Warehouse Mumbai"
            locationImage2={locationIcon}
            summaryAddres="Door 12, sector 8, Shankar Nagar"
            city=" Andheri East, Mumbai 422011"
            profileImage={contactIcon}
            contactNumber="+91 12345 12345"
            contactImage={phoneIcon}
            contactName="Amith Sharma"
          />

          <div className="hidden lg:block">
            <img src={editIcon} alt="" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-y-5 lg:gap-x-5 lg:w-[770px]">
          <BoxDetails />

          {/*Service */}

          <SummaryService />
        </div>
      </div>
      <BottomLayout
        // callApi={() => postPickupOrderDetails(payload)}
        Button2Name={true}
      />
    </div>
  );
};

export default Summary;
