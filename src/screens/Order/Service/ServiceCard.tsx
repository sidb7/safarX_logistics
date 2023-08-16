import { useState } from "react";

import CustomRadioButton from "../../../components/RadioButton";

interface IServiceCardProps {
  isRecommendation?: boolean;
  recommendation?: string;
  courierPartner?: string;
  serviceType?: string;
  weight?: number;
  totalPrice?: number;
  savePrice?: number;
  etaDate?: string;
  name?: string;
  value?: string;
  isStandardService?: boolean;
}

const ServiceCard = (props: IServiceCardProps) => {
  const {
    isRecommendation,
    recommendation,
    courierPartner,
    serviceType,
    weight,
    totalPrice,

    savePrice,
    etaDate,
    name,
    value,
    isStandardService = false,
  } = props;

  const [serviceDetails, setServiceDetails] = useState("");

  return (
    <div
      className={`${
        isRecommendation && "relative z-1"
      } border-[1px] rounded-lg  bg-[#FFFFFF] drop-shadow-lg lg:min-w-[300px] `}
    >
      <div className="flex flex-col  px-3 pb-2 ">
        <div className="flex  items-center  text-[16px] font-semibold text-[#1C1C1C] gap-x-2 ">
          <div>
            <CustomRadioButton
              name={name}
              value={value}
              onChange={(e: any) => setServiceDetails(e.target.value)}
            />
          </div>
          {!isStandardService && <div>{courierPartner}</div>}
          <div>{serviceType}</div>
          {!isStandardService && <div>{`${weight} Kg`}</div>}
        </div>
        <div className="flex items-center gap-x-2 mb-2  lg:ml-5">
          <div className="text-[14px] text-[#1C1C1C] font-semibold">{`₹ ${totalPrice} Kg`}</div>
          <div className="text-[10px] text-[#1C1C1C]">|</div>
          <div className="text-[10px] text-[#004EFF] font-normal ">
            {`Save ₹ ${savePrice} using this service`}
          </div>
        </div>
        <div className="flex  items-center lg:ml-5 ">
          <div className="text-[#004EFF] text-[14px] font-bold lg:font-bold">
            {`ETA: ${etaDate}`}
          </div>
        </div>
      </div>

      {isRecommendation && (
        <p className="absolute z-2 -top-3 left-5 bg-[#6695FF] rounded-lg text-[12px] font-semibold  px-[12px] py-[2px] text-[#FFFFFF] ">
          {recommendation}
        </p>
      )}
    </div>
  );
};

export default ServiceCard;
