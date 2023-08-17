import React from "react";

interface IProps {
  onClick: () => void;
  items: any[];
  icons?:string
}

const index = (props: IProps) => {
  const { items, onClick, icons } = props;

  return (
    <div className="flex overflow-x-auto whitespace-nowrap space-x-4 py-2 px-4">
      {items.map((item: any, index: number) => (
        <button
          key={index}
          className="flex border-[1px] h-[35px] grow border-[#A4A4A4] bg-[#FEFEFE] py-[8px] px-[16px] rounded text-[14px] font-semibold text-[#1C1C1C]"
          onClick={onClick}
        >
          <img src={item?.icons} alt="" className="mr-2" />
          {item?.label}
        </button>
      ))}
    </div>
  );
};

export default index;
