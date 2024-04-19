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
  options?: IServiceOption[];
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

  const [surface, setSurface] = useState(true);
  const [air, setAir] = useState(true);
  const [sortingPrice, setSortingPrice] = useState(false);
  const [sortingFastest, setSortingFastest] = useState(false);
  const [sortedOptions, setSortedOptions] = useState<IServiceOption[]>([]);

  // useEffect(() => {
  //   const filters = options.filter((service) => {
  //     const serviceMode = service.text.serviceMode.toLowerCase();

  //     if (
  //       (surface && serviceMode === "surface") ||
  //       (air && serviceMode === "air") ||
  //       (!surface && !air)
  //     ) {
  //       return service;
  //     }
  //     return null;
  //   });

  //   if (sortingPrice) {
  //     filters.sort((a, b) => a.text.total - b.text.total);
  //   }
  //   if (sortingFastest) {
  //     filters.sort((a, b) => a.text.EDT.localeCompare(b.text.EDT));
  //   }

  //   setSortedOptions(filters.slice(0, 10));
  // }, [surface, air, sortingPrice, sortingFastest, options]);

  const handleOnChange = (option: any) => {
    setSelectedOption({
      ...option,
      type: option.type,
    });
    selectedValue({
      value: option.value,
      type: option.type,
    });
  };

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

  const toPascalCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  useEffect(() => {
    const filters = options.filter((service) => {
      const serviceMode = service.text.serviceMode.toLowerCase();

      if (
        (surface && serviceMode === "surface") ||
        (air && serviceMode === "air") ||
        (!surface && !air)
      ) {
        return service;
      }
      return null;
    });

    filters.sort((a, b) => {
      if (
        a.text.partnerName === "BLUEDART" &&
        b.text.partnerName !== "BLUEDART"
      ) {
        return -1;
      } else if (
        a.text.partnerName !== "BLUEDART" &&
        b.text.partnerName === "BLUEDART"
      ) {
        return 1;
      } else {
        return a.text.total - b.text.total;
      }
    });
    // console.log("filters>>", filters);

    setSortedOptions(filters);
  }, [options, surface, air, sortingPrice, sortingFastest]);

  return (
    <div data-cy="filter-options">
      {/* <div className="flex flex-row items-center gap-x-2 mb-5 ml-4">
        <img src={FilterIcon} alt="Filter" />
        <div className="text-[18px] font-bold lg:font-normal lg:text-2xl">
          Filter by
        </div>
      </div> */}
      {/* <div className="grid lg:grid-cols-1 mx-5 mb-5 mt-4 lg:mb-6">
        <FilterItems
          items={["Surface", "Air", "Low Price", "Fastest"]}
          onClick={handleSortBy}
        />
      </div> */}
      <div className="flex items-center cursor-pointer px-4 gap-4 flex-wrap">
        {options.map((option) => (
          <div
            key={option?.value}
            className={`flex items-center p-2 shadow-md border rounded-lg w-[288px] h-[112px] mb-4 md:mb-0 ${
              selectedOption?.value === option?.value
                ? "border-[#004EFF] border-2"
                : "border-[#c1c1c1]"
            }`}
            onClick={() => handleOnChange(option)}
            data-cy={`filter-option-${option?.value}`}
            // data-tooltip-id={`my-tooltip-inline-${option.value}`}
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
                {`\u20B9`}{" "}
                {Math.round(option.text?.total)?.toLocaleString("en-IN")}{" "}
                <span className="pl-2 text-[#1C1C1C] text-[14px] font-Open">
                  {`${toPascalCase(option.text?.serviceMode)}`}
                </span>
              </p>
              <p className="text-[#004EFF] text-[14px] pt-4 font-semibold font-Open">
                ETA: {option.text?.EDT || "N/A"}{" "}
              </p>
            </div>
            {/* <TooltipContent option={option} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceBox;
