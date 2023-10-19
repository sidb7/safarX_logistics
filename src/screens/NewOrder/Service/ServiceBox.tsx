import React, { useState } from "react";
import TooltipContent from "./TooltipContent";
import FilterIcon from "../../../assets/serv/filter.svg";
import FilterItems from "../../../components/FilterItemsScroll";

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
  const [sortOption, setSortOption] = useState<string | null>(null);

  const handleOnChange = (option: any) => {
    setSelectedOption(option);
    selectedValue(option.value);
  };
  const items = ["Fastest", "Low Price", "Surface", "Air"];
  const handleSortBy = (sortBy: string) => {
    setSortOption(sortBy);
  };

  const sortedOptions = [...options];

  if (sortOption === "Fastest") {
    sortedOptions.sort((a, b) => a.text.EDT - b.text.EDT);
  } else if (sortOption === "Low Price") {
    sortedOptions.sort((a, b) => a.text.total - b.text.total);
  } else if (sortOption === "Surface") {
    sortedOptions.sort((a, b) =>
      a.text.serviceMode === "SURFACE"
        ? -1
        : b.text.serviceMode === "SURFACE"
        ? 1
        : 0
    );
  } else if (sortOption === "Air") {
    sortedOptions.sort((a, b) =>
      a.text.serviceMode === "AIR" ? -1 : b.text.serviceMode === "AIR" ? 1 : 0
    );
  }

  return (
    <div>
      <div className="flex flex-row items-center gap-x-2 mb-5 ml-4">
        <img src={FilterIcon} alt="Filter" />
        <div className="text-[18px] font-bold lg:font-normal lg:text-2xl">
          Filter by
        </div>
      </div>
      <div className="grid lg:grid-cols-1 mx-5 mb-5 mt-4 lg:mb-6">
        <FilterItems items={items} onClick={handleSortBy} />
      </div>
      <div className="flex items-center cursor-pointer px-4 gap-4 flex-wrap">
        {sortedOptions.map((option: any) => (
          <div
            key={option?.value}
            className={`flex items-center p-2 shadow-md border rounded-lg w-[288px] h-[112px] mb-4 md:mb-0 ${
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
            <div className=" ">
              <p className="text-[16px] font-semibold font-Open pt-2">
                {`${option.text?.partnerName}: ${option.text?.companyServiceName}`}
              </p>
              <p className="text-[14px] text-[#1C1C1C] font-semibold font-Open">
                {`\u20B9`} {option.text?.total.toFixed(2)}{" "}
                <span className="pl-2 text-[#1C1C1C] text-[14px] font-Open">
                  {`${option.text?.serviceMode}`}
                </span>
              </p>
              <p className="text-[#004EFF] text-[14px] pt-4 font-semibold font-Open">
                ETA: {option.text?.EDT || "N/A"}{" "}
              </p>
              {/* <p className="my-2">MODE: {`${option.text?.serviceMode}`}</p> */}
            </div>
            <TooltipContent option={option} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceBox;
