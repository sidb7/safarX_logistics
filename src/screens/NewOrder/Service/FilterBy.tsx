import React from "react";
import FilterIcon from "../../../assets/serv/filter.svg";
import FilterItems from "../../../components/FilterItemsScroll";

type Props = {};

const items = ["Fastest", "Low Price", "Economy", "Standard", "Premium"];

const FilterBy = (props: Props) => {
  return (
    <div className="grid grid-cols-1 gap-y-6    ">
      <div>
        <div className="flex flex-row items-center gap-2">
          <img src={FilterIcon} alt="Filter" />
          <div className="text-[18px] font-bold">Filter by</div>
        </div>
      </div>
      <div>
        <FilterItems
          items={items}
          onClick={() => {
            alert("pranay");
          }}
        />
      </div>
    </div>
  );
};

export default FilterBy;
