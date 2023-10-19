import React, { useState } from "react";
import TooltipContent from "./TooltipContent";

interface IRadioButtonProps {
  name?: string;
  options?: any;
  selectedValue?: any;
  selectedOption?: any;
  setSelectedOption?: any;
}

const RecommendatedServiceCard: React.FunctionComponent<IRadioButtonProps> = (
  props: IRadioButtonProps
) => {
  const {
    name,
    options = [],
    selectedValue,
    selectedOption,
    setSelectedOption,
  } = props;

  // const [selectedOption, setSelectedOption] = useState<any>(null);

  const cheapestService = options.reduce(
    (minOption: any, currentOption: any) => {
      return currentOption.text.total < minOption.text.total
        ? currentOption
        : minOption;
    },
    options[0]
  );

  const fastestService = options.reduce(
    (minOption: any, currentOption: any) => {
      return currentOption.text.EDT_Epoch < minOption.text.EDT_Epoch
        ? currentOption
        : minOption;
    },
    options[0]
  );

  const handleOnChange = (option: any) => {
    setSelectedOption(option);
    selectedValue(option.value);
  };

  return (
    <div className="flex items-center cursor-pointer px-4 gap-4 flex-wrap">
      {cheapestService && (
        <>
          {/* Cheapest Card */}
          <div
            key={cheapestService?.value}
            className={` relative flex items-center p-2 shadow-md border rounded-lg w-[288px] h-[112px] mb-4 md:mb-0 ${
              selectedOption?.value === cheapestService?.value
                ? "border-green-500 border-2"
                : "border-[#c1c1c1]"
            }`}
            onClick={() => handleOnChange(cheapestService)}
            data-tooltip-id={`my-tooltip-inline-${cheapestService.value}`}
          >
            <p className="absolute z-2 -top-3 left-5 bg-[#00AEEF] rounded-lg text-[12px] font-semibold px-[12px] py-[2px] text-[#FFFFFF]">
              Cheapest
            </p>

            <div className="self-start px-2">
              <input
                type="radio"
                name={name}
                value={cheapestService?.value}
                className="!w-4 !p-0 !m-0"
                readOnly={true}
                checked={selectedOption?.value === cheapestService?.value}
                onChange={() => handleOnChange(cheapestService)}
              />
            </div>
            <div className=" ">
              <p className="text-[16px] font-semibold font-Open pt-2">
                {`${cheapestService.text?.partnerName}: ${cheapestService.text?.companyServiceName}`}
              </p>
              <p className="text-[14px] text-[#1C1C1C] font-semibold font-Open">
                {`\u20B9`} {cheapestService.text?.total.toFixed(2)}{" "}
                <span className="pl-2 text-[#1C1C1C] text-[14px] font-Open">
                  {`${cheapestService.text?.serviceMode}`}
                </span>
              </p>
              <p className="text-[#004EFF] text-[14px] pt-4 font-semibold font-Open">
                ETA: {cheapestService.text?.EDT || "N/A"}{" "}
              </p>
            </div>
            <TooltipContent option={cheapestService} />
          </div>

          {/* Fastest Card */}
          <div
            key={fastestService?.value}
            className={` relative flex items-center p-2 shadow-md border rounded-lg w-[288px] h-[112px] mb-4 md:mb-0 ${
              selectedOption?.value === fastestService?.value
                ? "border-blue-500 border-2"
                : "border-[#c1c1c1]"
            }`}
            onClick={() => handleOnChange(fastestService)}
            data-tooltip-id={`my-tooltip-inline-${fastestService.value}`}
          >
            <p className="absolute z-2 -top-3 left-5 bg-[#00AEEF] rounded-lg text-[12px] font-semibold px-[12px] py-[2px] text-[#FFFFFF]">
              Fastest
            </p>

            <div className="self-start px-2">
              <input
                type="radio"
                name={name}
                value={fastestService?.value}
                className="!w-4 !p-0 !m-0"
                readOnly={true}
                checked={selectedOption?.value === fastestService?.value}
                onChange={() => handleOnChange(fastestService)}
              />
            </div>
            <div className=" ">
              <p className="text-[16px] font-semibold font-Open pt-2">
                {`${fastestService.text?.partnerName}: ${fastestService.text?.companyServiceName}`}
              </p>
              <p className="text-[14px] text-[#1C1C1C] font-semibold font-Open">
                {`\u20B9`} {fastestService.text?.total.toFixed(2)}{" "}
                <span className="pl-2 text-[#1C1C1C] text-[14px] font-Open">
                  {`${fastestService.text?.serviceMode}`}
                </span>
              </p>
              <p className="text-[#004EFF] text-[14px] pt-4 font-semibold font-Open">
                ETA: {fastestService.text?.EDT || "N/A"}{" "}
              </p>
            </div>
            <TooltipContent option={fastestService} />
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendatedServiceCard;
