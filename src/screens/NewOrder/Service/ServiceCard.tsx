import { useState } from "react";

import CustomRadioButton from "../../../components/RadioButton/Index";
import CustomSquaredRadioButton from "../../../components/RadioButton/Index";

interface IServiceCardProps {
  isRecommendation?: boolean;
  recommendation?: string;
  courierPartner?: string;
  serviceType?: string;
  minimumServiceWeight?: any;
  totalPrice?: number;
  serviceId?: number;
  savePrice?: number;
  etaDate?: string;
  name?: string;
  value?: string;
  isStandardService?: boolean;
  onSelectService: (serviceDetails: any) => void;
}

const ServiceCard = (props: IServiceCardProps & { serviceData: any }) => {
  const {
    isRecommendation,
    recommendation,
    courierPartner,
    serviceType,
    minimumServiceWeight,
    totalPrice,
    serviceId,
    savePrice,
    etaDate,
    name,
    value,
    isStandardService = false,
    onSelectService,
  } = props;

  interface IRadioButtonProps {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

  const [serviceDetails, setServiceDetails] = useState("");
  const [selected, setSelected] = useState(false);

  const handleRadioChange = () => {
    setSelected(!selected);
    onSelectService(value);
  };

  // console.log("serviceDetails", serviceDetails);
  console.log("serviceData", props.serviceData);

  console.log("name", name);
  console.log("value", value);
  return (
    <div
      className={`${
        isRecommendation && "relative z-1"
      } border-[1px] rounded-lg  bg-[#FFFFFF] drop-shadow-lg lg:min-w-[300px] `}
    >
      <div
        className="flex flex-col  px-3 pb-2 cursor-pointer  "
        onClick={handleRadioChange}
      >
        <div
          className="flex  items-center  text-[16px] font-semibold font-Open text-[#1C1C1C] gap-x-2 cursor-pointer"
          onClick={handleRadioChange}
        >
          <div>
            <CustomRadioButton
              name={name}
              value={value}
              onChange={handleRadioChange}
              checked={selected}
            />
          </div>
          {!isStandardService && <div>{courierPartner}</div>}
          <div>{serviceType} Kg</div>
          {/* {!isStandardService && <div>{`${minimumServiceWeight} Kg`}</div>} */}
        </div>
        <div className="flex items-center gap-x-2 mb-2  lg:ml-5">
          <div className="text-[14px] text-[#1C1C1C] font-semibold font-Open">{`₹ ${totalPrice} `}</div>
          {/* <div className="text-[14px] text-[#1C1C1C]">|</div>
          <div className="text-[12px] text-[#004EFF]   ">
            {`Save ₹ ${savePrice} using this service`}
          </div> */}
        </div>
        <div className="flex  items-center lg:ml-5 ">
          <div className="text-[#004EFF] text-[14px] font-semibold font-Open lg:font-bold">
            {`ETA: ${etaDate}`}
          </div>
        </div>
      </div>

      {isRecommendation && (
        <p className="absolute z-2 -top-3 left-5 bg-[#00AEEF] rounded-lg text-[12px] font-semibold  px-[12px] py-[2px] text-[#FFFFFF] ">
          {recommendation}
        </p>
      )}
    </div>
  );
};

export default ServiceCard;
