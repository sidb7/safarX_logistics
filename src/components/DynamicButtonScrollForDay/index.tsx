import React from "react";

interface IProps {
  onClick: (item: any) => void;
  items: any[];
  icons?: string;
}

const index = (props: IProps) => {
  const { items, onClick, icons } = props;

  return (
    <div className="flex overflow-x-auto whitespace-nowrap space-x-4 py-2  w-[305px]">
      {items.map((item: any, index: number) => (
        <button
          key={index}
          className="flex items-center justify-center border-[1px] w-[74px] h-[35px]  grow border-[#A4A4A4] bg-[#FEFEFE]  px-[26px] rounded text-[14px] font-semibold font-Open text-[#1C1C1C]"
          onClick={() => onClick(item)}
        >
          {/* <img src={item?.icons} alt="" className="mr-2" /> */}
          {item?.label}
        </button>
      ))}
    </div>
  );
};

export default index;
