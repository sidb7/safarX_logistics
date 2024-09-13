import React from "react";
import { capitalizeFirstLetter, kFormatter } from "../../../../utils/utility";

interface IperformanceCardProps {
  ordersArr?: any;
}

const PerformanceCard: React.FunctionComponent<IperformanceCardProps> = (
  props: IperformanceCardProps
) => {
  const { ordersArr } = props;

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-6">
        {ordersArr?.map((order: any, i: number) => {
          return (
            <div className="border-[#E8E8E8] border-[1px] rounded-lg shadow-[0px_0px_0px_0px_rgba(133,133,133,0.05),0px_6px_13px_0px_rgba(133,133,133,0.05)] flex-1 w-[273px] p-4">
              <div className="flex flex-col gap-y-3">
                <div>
                  <p className="font-bold font-Lato text-[#1C1C1C] lg:text-[#F57960] text-[22px] lg:text-[32px] leading-7">
                    {order?.count !== null && order?.count !== undefined
                      ? kFormatter(order?.count)
                      : "-"}
                  </p>
                </div>
                <div className="lg:text-[#1C1C1C] font-normal lg:text-base font-Open text-sm text-[#494949] leading-5 lg:leading-[22px]">
                  {capitalizeFirstLetter(order?.text || "")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PerformanceCard;
