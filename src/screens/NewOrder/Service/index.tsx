import React from "react";
import TruckIcon from "../../../assets/serv/truck.svg";
import WebTruckIcon from "../../../assets/serv/WebTruck.svg";
import TickLogo from "../../../assets/common/Tick.svg";
import ServiceCard from "./ServiceCard";
import FilterBy from "./FilterBy";
import { RecommendedServiceData } from "../../../utils/dummyData";
import { FilterServiceData } from "../../../utils/dummyData";
import Stepper from "../../../components/Stepper";
import { Breadcum } from "../../../components/Layout/breadcum";

const Index: React.FC = () => {
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
  return (
    <div>
      <div className="hidden lg:flex lg:items-center px-5 ml-6 mb-1 ">
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
      <div className="flex flex-row gap-x-2 mb-5 lg:mb-[38px] mx-5">
        <img src={TruckIcon} alt="Truck Icon" className="lg:hidden" />
        <img src={WebTruckIcon} alt="" className="hidden lg:block" />
        <p className="text-[18px] text-[#202427] font-semibold lg:font-normal lg:text-2xl lg:text-[#323232] ">
          Service
        </p>
      </div>
      <div className="flex flex-col lg:flex-row     gap-y-[22px] mx-5 mb-5 lg:gap-6 lg:mb-9">
        {RecommendedServiceData.map((each) => {
          return (
            <ServiceCard
              isRecommendation={each.isRecommendation}
              recommendation={each.recommendation}
              courierPartner={each.courierPartner}
              serviceType={each.serviceType}
              weight={each.weight}
              totalPrice={each.totalPrice}
              savePrice={each.savePrice}
              etaDate={each.etaDate}
              name={each.name}
              value={each.value}
            />
          );
        })}
      </div>

      <div className="mx-5  mb-5 lg:mb-6">
        <FilterBy />
      </div>

      <div className="mx-5 flex flex-col lg:flex-row h-[500px] lg:h-full   gap-y-[13px] overflow-y-scroll  lg:overflow-x-scroll flex-nowrap   lg:gap-x-6  ">
        {FilterServiceData.map((each) => {
          return (
            <ServiceCard
              isRecommendation={each.isRecommendation}
              recommendation={each.recommendation}
              courierPartner={each.courierPartner}
              serviceType={each.serviceType}
              weight={each.weight}
              totalPrice={each.totalPrice}
              savePrice={each.savePrice}
              etaDate={each.etaDate}
              name={each.name}
              value={each.value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Index;
