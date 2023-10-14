import React from "react";

interface IProps {
  onClick: (item: any) => void;
  items: any[];
  icons?: string;
  selectedDay?: string | null;
}

const index = (props: IProps) => {
  const { items, onClick, icons, selectedDay } = props;

  return (
    <div className="flex overflow-x-auto whitespace-nowrap space-x-4 py-2 ">
      {items?.map((item: any, index: number) => (
        <button
          key={index}
          className={`flex items-center justify-center border-[1px] w-[107px] h-[35px] grow ${
            selectedDay === item?.value
              ? "border-blue-500  text-blue-500"
              : "border-[#A4A4A4] bg-[#FEFEFE] text-[#1C1C1C]"
          } px-[26px] rounded text-[14px] font-semibold font-Open`}
          onClick={() => onClick(item)}
        >
          {/* <img src={item?.icons} alt="" className="mr-2 w-4 h-4" /> */}
          {item?.label}
        </button>
      ))}
    </div>
  );
};

export default index;
