import React from "react";
import FilterIcon from "../../../assets/serv/filter.svg";
import FilterItems from "../../../components/FilterItemsScroll";

type Props = {
  items?: any;
};

const FilterBy = (props: Props) => {
  const { items } = props;
  return (
    <div className="">
      <div>
        <div className="flex flex-row items-center gap-x-2 mb-5">
          <img src={FilterIcon} alt="Filter" />
          <div className="text-[18px] font-bold lg:font-normal lg:text-2xl">
            Filter by
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-1">
        <FilterItems
          items={items}
          onClick={() => {
            alert("suresh");
          }}
        />
      </div>
    </div>
  );
};

export default FilterBy;
