import React from "react";
import TruckIcon from "../../../assets/serv/truck.svg";
import WebTruckIcon from "../../../assets/serv/WebTruck.svg";

import ServiceCard from "./ServiceCard";
import FilterBy from "./FilterBy";
import { RecommendedServiceData } from "../../../utils/dummyData";
import { FilterServiceData } from "../../../utils/dummyData";

const Index: React.FC = () => {
  return (
    <div>
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
