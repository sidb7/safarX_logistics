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
    <div className="lg:w-[272px] h-[96px] rounded-lg border-[1px] border-[#A4A4A4] p-4 bg-[#E5EDFF]">
      <div className="flex flex-col">
        <p className="font-Open font-normal text-base leading-[22px] text-[#1C1C1C] mb-3 whitespace-nowrap">
          {title}
        </p>
        <div className="flex items-center gap-x-2">
          <span className="font-Lato font-bold text-[22px] leading-7 text-[#1C1C1C]">
            {numerator}
          </span>
          {!isShipments && (
            <div className=" flex items-center gap-x-2 font-Lato font-bold text-[22px] leading-7 text-[#606060]">
              <span>/</span>
              <span>{denominator}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
