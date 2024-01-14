import React from "react";

interface ITypeProps {
  title: string;
  numerator: number;
  denominator?: number;
  isShipments?: boolean;
}

const InfoCards = (props: ITypeProps) => {
  const { title, numerator, denominator, isShipments = false } = props;

  return (
    <div className="h-[60px]  lg:h-[96px] flex justify-between items-center lg:items-start  lg:flex-col   rounded-lg border-[1px] border-[#A4A4A4] p-2 lg:p-4 bg-[#E5EDFF]">
      {/* <div className=""> */}
      <p className="font-Open font-normal  lg:w-full text-sm lg:text-base leading-4 lg:leading-[22px] text-[#494949] lg:text-[#1C1C1C] lg:mb-3 lg:whitespace-nowrap">
        {title}
      </p>
      <div className="flex items-center gap-x-2">
        <span className="font-Open lg:font-Lato font-bold text-sm lg:text-[22px] leading-[18px] lg:leading-7 text-[#1C1C1C]">
          {numerator}
        </span>
        {!isShipments && (
          <div className="font-Open flex items-center gap-x-2 lg:font-Lato font-bold text-sm lg:text-[22px] leading-[18px] lg:leading-7 text-[#606060]">
            <span>/</span>
            <span>{denominator}</span>
          </div>
        )}
      </div>
      {/* </div> */}
    </div>
  );
};

export default InfoCards;
