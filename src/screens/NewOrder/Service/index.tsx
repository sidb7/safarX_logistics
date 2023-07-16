import React from "react";
import TruckIcon from "../../../assets/serv/truck.svg";

import ServiceCard from "./ServiceCard";
import FilterBy from "./FilterBy";
import { RecommendedServiceData } from "../../../utils/dummyData";
import { FilterServiceData } from "../../../utils/dummyData";

const Index: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-y-8 p-5">
        <div className="flex flex-row gap-2">
          <img src={TruckIcon} alt="Truck Icon" />
          <p className="text-[18px] text-[#202427] font-semibold  ">Service</p>
        </div>

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

        <FilterBy />

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
