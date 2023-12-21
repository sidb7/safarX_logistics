import React, { useEffect, useState } from "react";

interface IProps {
  onClick: (selectedItems: string[]) => void;
  items: string[];
  initialSelectedFilter?: any;
}

const FilterItems: React.FC<IProps> = (props: IProps) => {
  const { items, onClick, initialSelectedFilter } = props;
  const [selectedItem, setSelectedItem] = useState<string>(
    initialSelectedFilter
  );

  useEffect(() => {
    onClick([initialSelectedFilter]);
  }, []);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onClick([item]);
  };
  return (
    <div className="flex customScroll items-center gap-2 lg:gap-6">
      {items?.map((each: string, index: number) => {
        const isSelected = selectedItem === each;

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
