import React, { useState } from "react";
import TooltipContent from "./TooltipContent";

interface IRadioButtonProps {
  name?: string;
  options?: any;
  selectedValue?: any;
}

const ServiceBox: React.FunctionComponent<IRadioButtonProps> = (
  props: IRadioButtonProps
) => {
  const { name, options = [], selectedValue } = props;

  const [selectedOption, setSelectedOption] = useState<any>(null);

  const handleOnChange = (option: any) => {
    setSelectedOption(option);
    selectedValue(option.value);
  };

  return (
    <div className="flex items-center cursor-pointer px-4 gap-4 flex-wrap">
      {options?.map((option: any) => (
        <div
          key={option?.value}
          className={`flex items-center p-2 shadow-md border rounded-lg w-[310px] h-[210px] mb-4 md:mb-0 ${
            selectedOption?.value === option?.value
              ? "border-green-500 border-2"
              : "border-[#c1c1c1]"
          }`}
          onClick={() => handleOnChange(option)}
          data-tooltip-id={`my-tooltip-inline-${option.value}`}
        >
          <div className="self-start px-2">
            <input
              type="radio"
              name={name}
              value={option?.value}
              className="!w-4 !p-0 !m-0"
              readOnly={true}
              checked={selectedOption?.value === option?.value}
              onChange={() => handleOnChange(option)}
            />
          </div>
          <div className="px-2 text-lg">
            <p className="my-2">
              {`${option.text?.partnerName}: ${option.text?.companyServiceName}`}
            </p>
            <p className="">
              {option.text?.total.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </p>
            <p className="text-[#004EFF] font-medium py-2">
              ETA: {option.text?.EDT || "N/A"}
            </p>
            <p className="my-2">MODE: {`${option.text?.serviceMode}`}</p>
          </div>
          <TooltipContent option={option} />
        </div>
      ))}
    </div>
  );
};

export default ServiceBox;
