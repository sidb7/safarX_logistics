import React, { useState } from "react";
import ServiceButton from "../../../components/Button/ServiceButton";

import serviceIcon from "../../../assets/serv/service.svg";
import contactIcon from "../../../assets/serv/contact.svg";
import deliveryIcon from "../../../assets/serv/delivery.svg";
import locationIcon from "../../../assets/serv/location.svg";
import summaryIcon from "../../../assets/serv/summary.svg";
import phoneIcon from "../../../assets/serv/phone.svg";
import editIcon from "../../../assets/serv/edit.svg";
import copySuccess from "../../../assets/serv/copy-success.svg";
import SummaryAddressBox from "./summaryAddressBox";
import Product from "./product";
import Service from "./service";
import { HighRiskPincodeModal } from "./whatsappModal";

type Props = {};

const Summary = (props: Props) => {
  const [ishighRisk, setIsHighRisk] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-1 gap-y-5 p-5   ">
        <div className="flex flex-row gap-2">
          <img src={copySuccess} alt="Summary Icon" />
          <p className="text-[18px] text-[#202427] font-semibold ">Summary</p>
        </div>
        <div className="flex flex-row justify-between items-center h-[48px] rounded  p-[10px] border-[1px] border-[#A4A4A4] ">
          <p className="text-[12px] text-[#1C1C1C]">Generate order ID</p>
          <p className="text-[#004EFF] text-[14px] font-bold">AUTO GENERATE</p>
        </div>

        <SummaryAddressBox
          locationImage={locationIcon}
          summaryTitle="Pickup Location"
          editImage={editIcon}
          locationImage2={locationIcon}
          summaryAddres="Door 12, sector 8, Shankar Nagar"
          city=" Andheri East, Mumbai 422011"
          profileImage={contactIcon}
          contactNumber="+91 12345 12345"
          contactImage={phoneIcon}
          contactName="Amith Sharma"
        />

        {/* Delivery */}
        <SummaryAddressBox
          locationImage={locationIcon}
          summaryTitle="Delivery Location"
          editImage={editIcon}
          locationImage2={locationIcon}
          summaryAddres="Door 12, sector 8, Shankar Nagar"
          city=" Andheri East, Mumbai 422011"
          profileImage={contactIcon}
          contactNumber="+91 12345 12345"
          contactImage={phoneIcon}
          contactName="Amith Sharma"
        />

        <Product />

        {/*Service */}

        <Service />
        <HighRiskPincodeModal
          ishighRisk={ishighRisk}
          setIsHighRisk={setIsHighRisk}
        />
      </div>
    </div>
  );
};

export default Summary;
