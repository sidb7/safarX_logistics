import React from "react";

interface IProps {
  onClick: (time: string) => void;
  items: any[];
  icons?: string;
  selectedDay: string | null;
  selectedTime: string | null;
}

const index = (props: IProps) => {
  const { items, onClick, icons, selectedDay, selectedTime } = props;

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-4 py-2 w-[352px] h-[137px]">
      {items.map((item: any, index: number) => (
        <button
          key={index}
          className={`flex items-center justify-center border-[1px] w-[168px] h-[35px] rounded text-[14px] font-semibold ${
            selectedDay === "today" || selectedDay === "tomorrow"
              ? "text-[#1C1C1C] border-[#A4A4A4] bg-[#FEFEFE]"
              : "text-[#A4A4A4] border-[#A4A4A4] bg-[#FEFEFE]"
          } ${
            selectedTime === item.label ? "border-blue-500 text-blue-500" : ""
          }`}
          onClick={() => onClick(item.label)}
        >
          {item?.label}
        </button>
      ))}
    </div>
  );
};

export default index;
