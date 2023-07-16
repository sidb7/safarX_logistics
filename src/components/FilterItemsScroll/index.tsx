import React from "react";

interface IProps {
  onClick: () => void;
  items: string[];
}

const index = (props: IProps) => {
  const { items, onClick } = props;

  return (
    <div className="flex overflow-x-scroll items-center gap-2">
      {items.map((each: any) => {
        return (
          <div
            className="flex border-[1px] h-[35px] grow border-[#A4A4A4] bg-[#FEFEFE] py-[8px] px-[16px] rounded text-[14px] font-semibold text-[#1C1C1C]"
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
