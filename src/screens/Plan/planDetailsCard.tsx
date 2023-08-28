import React from "react";
import PlanDetailsIcon from "../../assets/common/task-square.svg";
import LabelContainer from "../../components/LabelContainer";
import { useMediaQuery } from "react-responsive";

interface ITypeProps {
  planDetails: any;
}

const PlanDetailsCard = (props: ITypeProps) => {
  const { planDetails } = props;
  return (
    <div>
      <div
        className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden  mt-4 `}
      >
        <div
          className={`flex justify-between items-center py-2 px-4 h-[40px] bg-[#F6F6F6]`}
        >
          <div className="flex items-center gap-x-2 ">
            <img src={PlanDetailsIcon} alt="" />
            <span className=" font-Open  text-base font-semibold text-[#1C1C1C]  leading-[22px]">
              Plan Details
            </span>
          </div>
        </div>

        <div className="grid grid-cols-5 py-4  h-[70px]  ">
          {planDetails.map((eachPlan: any, index: any) => {
            return (
              <div className="flex flex-col border-[1px] px-8 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px]">
                  {eachPlan.title}
                </span>
                <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                  {eachPlan.info}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsCard;
