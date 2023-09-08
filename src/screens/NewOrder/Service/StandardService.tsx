import React, { useState } from "react";
import ServiceCard from "./ServiceCard";

import TruckIcon from "../../../assets/serv/truck.svg";
import { standardServiceData } from "../../../utils/dummyData";

type Props = {};

const StandardService = (props: Props) => {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelection = (serviceDetails: any) => {
    setSelectedService(serviceDetails);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-y-8 p-5  ">
        <div className="flex flex-row gap-2">
          <img src={TruckIcon} alt="Truck Icon" />
          <p className="text-[18px] text-[#202427] font-semibold  ">Service</p>
        </div>

        {standardServiceData?.map((each) => {
          return (
            <></>
            // <ServiceCard
            //   serviceType={each.serviceType}
            //   totalPrice={each.price}
            //   savePrice={each.savedPrice}
            //   etaDate={each.etaDate}
            //   name="service"
            //   value="1"
            //   isStandardService={true}
            //   // onSelectService={handleServiceSelection}
            //   serviceData={each}
            // />
          );
        })}
      </div>
    </div>
  );
};

export default StandardService;
