import PlanDetailsIcon from "../../assets/common/task-square.svg";
import { date_DD_MMM_YYY } from "../../utils/dateFormater";

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

        <div className="  ">
          {planDetails && planDetails.length > 0 ? (
            planDetails?.map((eachPlan: any, index: any) => {
              return (
                <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 lg:grid-cols-5 py-4  lg:h-[70px]">
                  {/*Plan Name*/}
                  <div className="flex flex-col border-[1px] px-8 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                    <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px] whitespace-nowrap">
                      {"Plan Name"}
                    </span>
                    <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                      {eachPlan?.planName}
                    </span>
                  </div>
                  {/*Purchase Date */}
                  <div className="flex flex-col border-[1px] px-8 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                    <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px] whitespace-nowrap">
                      {"Purchase Date"}
                    </span>
                    <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                      {date_DD_MMM_YYY(eachPlan?.planStartDate)}
                    </span>
                  </div>
                  {/*Expiry Date */}
                  <div className="flex flex-col border-[1px] px-8 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                    <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px] whitespace-nowrap">
                      {"Expiry Date"}
                    </span>
                    <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                      {date_DD_MMM_YYY(eachPlan?.planEndDate)}
                    </span>
                  </div>
                  {/*Subscription Amount */}
                  <div className="flex flex-col border-[1px] px-8 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                    <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px] whitespace-nowrap">
                      {"Subscription Amount"}
                    </span>
                    <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                      {`₹${eachPlan?.price}`}
                    </span>
                  </div>
                  {/* Subscription Period */}
                  <div className="flex flex-col border-[1px] px-8 border-t-0 border-b-0 border-l-0 border-r-[#E8E8E8]">
                    <span className="font-Open font-normal text-[12px] leading-4 text-[#777777] mb-[2px] whitespace-nowrap">
                      {"Subscription Period"}
                    </span>
                    <span className="font-Open font-semibold text-sm leading-5 text-[#1C1C1C]">
                      {eachPlan?.validity}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center font-Open py-3 font-semibold text-[#1C1C1C] text-base leading-[22px]">
              Plan Details Not Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsCard;
