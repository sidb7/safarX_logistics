import React from "react";

interface ITypesProps {}

const CardsWithScroll = (props: any) => {
  const { eachChannelType } = props;

  return (
    <div className="mb-[42px]">
      <p className="font-bold text-[18px] text-[#323232] mb-4">
        {eachChannelType.title}
      </p>
      <div className="flex items-center gap-x-3 overflow-x-scroll">
        {eachChannelType.channels.map((eachChannel: any, index: any) => {
          return (
            <div
              className={`${eachChannel.integrated && "relative z-1  mt-5"}`}
              key={index}
            >
              <div
                className={`flex flex-col border-[1px] border-[#A4A4A4] rounded py-[14px] px-[16px] w-[248px] `}
              >
                <div className="flex items-center gap-x-6 mb-3 w-[118px]">
                  <img src={eachChannel.icon} alt="" />
                  <p className="font-semibold text-[12px] text-[#323232]">
                    {eachChannel.name}
                  </p>
                </div>
                <div className="border-[1px] rounded py-2 px-4 border-[#A4A4A4] w-[118px]">
                  <p className="font-semibold text-[14px] text-[#1C1C1C] uppercase">
                    {eachChannel.integrated ? "Integrated" : "Integrate"}
                  </p>
                </div>
              </div>

              {eachChannel.integrated && (
                <p className="absolute -top-3 left-5  z-2 bg-[#4D83FF] flex items-center px-3 py-1 h-[24px] font-semibold text-[12px] rounded text-white">
                  {`${eachChannel.storesIntegrated} Active Stores`}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardsWithScroll;
