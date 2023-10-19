import React, { useState } from "react";
import TooltipContent from "./TooltipContent";
import FilterIcon from "../../../assets/serv/filter.svg";
import FilterItems from "../../../components/FilterItemsScroll";

interface IRadioButtonProps {
  name?: string;
  options?: any;
  selectedValue?: any;
  selectedOption?: any;
  setSelectedOption?: any;
  ignoreRecommended?: boolean;
}

const ServiceBox: React.FunctionComponent<IRadioButtonProps> = (
  props: IRadioButtonProps
) => {
  const {
    name,
    options = [],
    selectedValue,
    selectedOption,
    setSelectedOption,
    ignoreRecommended,
  } = props;

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleOnChange = (option: any) => {
    setSelectedOption(option);
    selectedValue(option.value);
  };

  const handleSortBy = (selectedItems: string[]) => {
    setSelectedItems(selectedItems);
  };

  const sortingFunctions: { [key: string]: (a: any, b: any) => number } = {
    Fastest: (a, b) => a.text.EDT - b.text.EDT,
    "Low Price": (a, b) => a.text.total - b.text.total,
    Surface: (a, b) =>
      a.text.serviceMode === "SURFACE"
        ? -1
        : b.text.serviceMode === "SURFACE"
        ? 1
        : 0,
    Air: (a, b) =>
      a.text.serviceMode === "AIR" ? -1 : b.text.serviceMode === "AIR" ? 1 : 0,
  };

  const sortedOptions = [...options].sort((a, b) => {
    let result = 0;
    for (const selectedSortOption of selectedItems) {
      result = sortingFunctions[selectedSortOption](a, b);
      if (result !== 0) {
        break;
      }
    }
    return result;
  });

  const toPascalCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const displayedOptions = sortedOptions.slice(0, 10);

  return (
    <div>
      <div className="flex flex-row items-center gap-x-2 mb-5 ml-4">
        <img src={FilterIcon} alt="Filter" />
        <div className="text-[18px] font-bold lg:font-normal lg:text-2xl">
          Filter by
        </div>
      </div>
      <div className="grid lg:grid-cols-1 mx-5 mb-5 mt-4 lg:mb-6">
        <FilterItems
          items={["Fastest", "Low Price", "Surface", "Air"]}
          onClick={handleSortBy}
        />
      </div>
      <div className="flex items-center cursor-pointer px-4 gap-4 flex-wrap">
        {displayedOptions.map((option: any) => (
          <div
            key={option?.value}
            className={`flex items-center p-2 shadow-md border rounded-lg w-[288px] h-[112px] mb-4 md:mb-0 ${
              selectedOption?.value === option?.value
                ? "border-[#004EFF] border-2"
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
            <div className=" ">
              <p className="text-[16px] font-semibold font-Open pt-2">
                {`${toPascalCase(option.text?.partnerName)}: ${toPascalCase(
                  option.text?.companyServiceName
                )}`}
              </p>
              <p className="text-[14px] text-[#1C1C1C] font-semibold font-Open">
                {`\u20B9`} {option.text?.total.toFixed(2)}{" "}
                <span className="pl-2 text-[#1C1C1C] text-[14px] font-Open">
                  {`${toPascalCase(option.text?.serviceMode)}`}
                </span>
              </p>
              <p className="text-[#004EFF] text-[14px] pt-4 font-semibold font-Open">
                ETA: {option.text?.EDT || "N/A"}{" "}
              </p>
            </div>
            <TooltipContent option={option} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceBox;
