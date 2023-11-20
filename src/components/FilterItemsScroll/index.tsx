import React, { useState } from "react";

interface IProps {
  onClick: (selectedItems: string[]) => void;
  items: string[];
}

const FilterItems: React.FC<IProps> = (props: IProps) => {
  const { items, onClick } = props;
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemClick = (item: string) => {
    const updatedSelection = selectedItems.includes(item)
      ? selectedItems.filter((selected) => selected !== item)
      : [...selectedItems, item];

    setSelectedItems(updatedSelection);
    onClick(updatedSelection);
  };

  return (
    <div className="flex overflow-x-scroll items-center gap-2 lg:gap-6">
      {items?.map((each: string, index: number) => {
        const isSelected = selectedItems.includes(each);

        return (
          <div
            className={`flex justify-center px-2 lg:px-0 lg:w-[172px] border-[1px] h-[35px] bg-[#FEFEFE] items-center rounded text-[14px] cursor-pointer font-Open font-semibold text-[#1C1C1C]  border-[#A4A4A4] lg:text-center ${
              isSelected ? "border-blue-600 border-2 text-[blue]" : ""
            }`}
            onClick={() => handleItemClick(each)}
            id={each}
            key={index}
          >
            {each}
          </div>
        );
      })}
    </div>
  );
};

export default FilterItems;
