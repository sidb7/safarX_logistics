import React from "react";

interface IProps {
  onClick: (e: any) => void;
  items: string[];
}

const index = (props: IProps) => {
  const { items, onClick } = props;

  return (
    <div className="flex overflow-x-scroll items-center gap-2 lg:gap-6">
      {items?.map((each: any, index: number) => {
        return (
          <div
            className="flex justify-center  lg:w-[172px] border-[1px] h-[35px] bg-[#FEFEFE] items-center rounded text-[14px] cursor-pointer font-Open font-semibold text-[#1C1C1C]  border-[#A4A4A4] lg:text-center"
            onClick={onClick}
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

export default index;
