import React, { useState, useEffect } from "react";
import TooltipContent from "./TooltipContent";
import FilterIcon from "../../../assets/serv/filter.svg";
import FilterItems from "../../../components/FilterItemsScroll";
interface IServiceOption {
  value: string;
  text: {
    partnerName: string;
    companyServiceName: string;
    total: number;
    serviceMode: string;
    EDT: string;
  };
}
interface IRadioButtonProps {
  name?: string;
  options?: any;
  cheapestService?: any;
  fastestService?: any;
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
    // cheapestService,
    // fastestService,
  } = props;

  const [surface, setSurface] = useState(true);
  const [air, setAir] = useState(true);
  const [sortingPrice, setSortingPrice] = useState(false);
  const [sortingFastest, setSortingFastest] = useState(false);
  const [sortedOptions, setSortedOptions] = useState<IServiceOption[]>([]);
  // const [selectedOption, setSelectedOption] = useState<any>(null);

  // const cheapestService = options.reduce(
  //   (minOption: any, currentOption: any) => {
  //     return currentOption.text.total < minOption.text.total
  //       ? currentOption
  //       : minOption;
  //   },
  //   options[0]
  // );

  // const fastestService = options.reduce(
  //   (minOption: any, currentOption: any) => {
  //     return currentOption.text.EDT_Epoch < minOption.text.EDT_Epoch
  //       ? currentOption
  //       : minOption;
  //   },
  //   options[0]
  // );

  const handleSortBy = (selectedItems: string[]) => {
    const isSurfaceSelected = selectedItems.includes("Surface");
    const isAirSelected = selectedItems.includes("Air");

    setSurface(isSurfaceSelected);
    setAir(isAirSelected);

    const sortingItems = selectedItems.filter(
      (item) => item !== "Surface" && item !== "Air"
    );

    setSortingPrice(sortingItems.includes("Low Price"));
    setSortingFastest(sortingItems.includes("Fastest"));
  };

  const handleOnChange = (option: any) => {
    setSelectedOption(option);
    selectedValue(option.value);
  };

  const cheapestService = options[0];
  const fastestService = options[1];
  const balancedService = options[2];

  const toPascalCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  return (
    <div>
      <div className="flex items-center cursor-pointer px-4 gap-4 flex-wrap">
        {cheapestService && (
          <>
            {/* Cheapest Card */}
            <div
              key={`${cheapestService?.value}-cheapest`}
              className={` relative flex items-center p-2 shadow-md border rounded-lg w-[288px] h-[112px] mb-4 md:mb-0 ${
                selectedOption?.value === cheapestService?.value
                  ? "border-[#004EFF] border-2"
                  : "border-[#c1c1c1]"
              }`}
              onClick={() => handleOnChange(cheapestService)}
              // data-tooltip-id={`my-tooltip-inline-${cheapestService.value}`}
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
                {/* <p className="text-[16px] font-semibold font-Open pt-2 capitalize">
                  {`${toPascalCase(
                    cheapestService.text?.partnerName
                  )}: ${toPascalCase(
                    cheapestService.text?.companyServiceName
                  )}`}
                </p> */}
                <p className="text-[14px] text-[#1C1C1C] font-semibold font-Open">
                  <span className="pr-2  text-[#1C1C1C] text-[16px] font-Open">
                    {`${toPascalCase(cheapestService.text?.serviceMode)}`}
                  </span>
                  {`\u20B9`} {cheapestService.text?.total.toFixed(2)}{" "}
                </p>
                <p className="text-[#004EFF] text-[14px] pt-6 font-semibold font-Open">
                  ETA: {cheapestService.text?.EDT || "N/A"}{" "}
                </p>
              </div>
              {/* <TooltipContent option={cheapestService} /> */}
            </div>

            {/* Fastest Card */}
            <div
              key={`${fastestService?.value}-fastest`}
              className={` relative flex items-center p-2 shadow-md border rounded-lg w-[288px] h-[112px] mb-4 md:mb-0 ${
                selectedOption?.value === fastestService?.value
                  ? "border-blue-500 border-2"
                  : "border-[#c1c1c1]"
              }`}
              onClick={() => handleOnChange(fastestService)}
              // data-tooltip-id={`my-tooltip-inline-${fastestService.value}`}
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
                {/* <p className="text-[16px] font-semibold font-Open pt-2">
                  {`${toPascalCase(
                    fastestService.text?.partnerName
                  )}: ${toPascalCase(fastestService.text?.companyServiceName)}`}
                </p> */}
                <p className="text-[14px] text-[#1C1C1C] font-semibold font-Open">
                  <span className="pr-2 text-[#1C1C1C] text-[14px] font-Open">
                    {`${toPascalCase(fastestService.text?.serviceMode)}`}
                  </span>
                  {`\u20B9`} {fastestService.text?.total.toFixed(2)}{" "}
                </p>
                <p className="text-[#004EFF] text-[14px] pt-6 font-semibold font-Open">
                  ETA: {fastestService.text?.EDT || "N/A"}{" "}
                </p>
              </div>
              {/* <TooltipContent option={fastestService} /> */}
            </div>

            {/* Balanced Card */}
            <div
              key={`${balancedService?.value}-balanced`}
              className={` relative flex items-center p-2 shadow-md border rounded-lg w-[288px] h-[112px] mb-4 md:mb-0 ${
                selectedOption?.value === balancedService?.value
                  ? "border-blue-500 border-2"
                  : "border-[#c1c1c1]"
              }`}
              onClick={() => handleOnChange(balancedService)}
              // data-tooltip-id={`my-tooltip-inline-${balancedService.value}`}
            >
              <p className="absolute z-2 -top-3 left-5 bg-[#00AEEF] rounded-lg text-[12px] font-semibold px-[12px] py-[2px] text-[#FFFFFF]">
                Balanced
              </p>

              <div className="self-start px-2">
                <input
                  type="radio"
                  name={name}
                  value={balancedService?.value}
                  className="!w-4 !p-0 !m-0"
                  readOnly={true}
                  checked={selectedOption?.value === balancedService?.value}
                  onChange={() => handleOnChange(balancedService)}
                />
              </div>
              <div className=" ">
                {/* <p className="text-[16px] font-semibold font-Open pt-2">
                  {`${toPascalCase(
                    balancedService.text?.partnerName
                  )}: ${toPascalCase(
                    balancedService.text?.companyServiceName
                  )}`}
                </p> */}
                <p className="text-[14px] text-[#1C1C1C] font-semibold font-Open">
                  <span className="pr-2 text-[#1C1C1C] text-[14px] font-Open">
                    {`${toPascalCase(balancedService.text?.serviceMode)}`}
                  </span>
                  {`\u20B9`} {balancedService.text?.total.toFixed(2)}{" "}
                </p>
                <p className="text-[#004EFF] text-[14px] pt-6 font-semibold font-Open">
                  ETA: {balancedService.text?.EDT || "N/A"}{" "}
                </p>
              </div>
              {/* <TooltipContent option={balancedService} /> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecommendatedServiceCard;
