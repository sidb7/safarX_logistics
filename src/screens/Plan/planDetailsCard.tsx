import React from "react";
import PlanDetailsIcon from "../../assets/common/task-square.svg";
import LabelContainer from "../../components/LabelContainer";
import { useMediaQuery } from "react-responsive";
import { date_DD_MMM_YYY } from "../../utils/dateFormater";

interface ITypeProps {
  planDetails: any;
}

const PlanDetailsCard = (props: ITypeProps) => {
  const { planDetails } = props;
  console.log("PLan Details Card ", planDetails);
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

        <div className="  ">
          {planDetails.map((eachPlan: any, index: any) => {
            return (
              <div className="grid grid-cols-5 py-4  h-[70px]">
                <div className="flex flex-col border-[1px] px-8 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                  <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px]">
                    {"Plan Name"}
                  </span>
                  <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                    {eachPlan.planName}
                  </span>
                </div>
                <div className="flex flex-col border-[1px] px-8 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                  <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px]">
                    {"Purchase Date"}
                  </span>
                  <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                    {date_DD_MMM_YYY(eachPlan.createdAt)}
                  </span>
                </div>
                <div className="flex flex-col border-[1px] px-8 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                  <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px]">
                    {"Expiry Date"}
                  </span>
                  <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                    {eachPlan.expiryDate}
                  </span>
                </div>
                <div className="flex flex-col border-[1px] px-8 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                  <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px]">
                    {"Subscription Amount"}
                  </span>
                  <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                    {eachPlan.price}
                  </span>
                </div>
                <div className="flex flex-col border-[1px] px-8 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                  <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px]">
                    {"Subscription Period"}
                  </span>
                  <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                    {eachPlan.validity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsCard;
