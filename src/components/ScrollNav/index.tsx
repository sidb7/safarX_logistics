import React, { useState } from "react";

interface IScrollNavProps {
  arrayData: { label: string; number?: string }[];
  showNumber: boolean;
  setScrollIndex?: any;
}

export const ScrollNav: React.FunctionComponent<IScrollNavProps> = ({
  arrayData,
  showNumber = true,
  setScrollIndex,
}) => {
  const [selectedId, setSelectedId] = useState(0);

  const setValue = (id: number) => {
    setSelectedId(id);
    setScrollIndex(id);
  };

  return (
    <div>
      <div className="flex gap-x-2 overflow-x-scroll whitespace-nowrap mt-2 h-[34px]">
        {arrayData.map((singleData, index) => {
          return (
            <div
              className={`flex justify-center items-center border-b-2 border-[#777777] px-4 ${
                selectedId === index ? "!border-[#004EFF]" : ""
              }`}
              // onClick={() => setSelectedId(index)}
              onClick={() => setValue(index)}
            >
              <span
                className={`text-[#777777] text-[14px] ${
                  selectedId === index ? "!text-[#004EFF]" : ""
                }`}
              >
                {singleData.label}
              </span>
              {showNumber && (
                <span
                  className={`flex justify-center items-center rounded-full ml-2 text-[8px] text-white bg-[#777777] h-[16px] w-[16px] ${
                    selectedId === index ? "!bg-[#004EFF]" : ""
                  }`}
                >
                  {singleData.number}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
