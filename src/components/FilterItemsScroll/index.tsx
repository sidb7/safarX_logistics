import React from "react";

interface IProps {
  onClick: () => void;
  items: string[];
}

const index = (props: IProps) => {
  const { items, onClick } = props;

  return (
    <div className="flex overflow-x-scroll items-center gap-2 lg:gap-6">
      {items.map((each: any) => {
        return (
          <div
            className="flex justify-center lg:w-[172px] border-[1px] h-[35px] grow  bg-[#FEFEFE] py-[8px] px-[16px] rounded text-[14px] font-semibold text-[#1C1C1C]  border-[#A4A4A4] lg:text-center"
            onClick={onClick}
          >
            {each}
          </div>
        );
      })}
    </div>
  );
};

export default index;
