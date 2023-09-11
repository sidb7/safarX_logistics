import React from "react";
import CargoRatingGif from "../../assets/common/CargoRating.gif";
import AddButton from "../../components/Button/addButton";

interface ITypeProps {
  planName: string;
  price: any;
  validity: string;
  description: string;
  planId: string;
  onClick: any;
  activePlanId: string;
}

const PlanCard = (props: ITypeProps) => {
  const {
    planName,
    price,
    validity,
    description,
    onClick,
    activePlanId,
    planId,
  } = props;

  return (
    <div>
      {planName.toUpperCase() === "GOLD" ? (
        <div className="p-3  border-[1px] rounded-t-lg  bg-[#004EFF] w-[273px] h-[44px] ">
          <p className="text-[#FFFFFF] font-Lato text-base font-bold leading-5 text-center  ">
            MOST POPULAR
          </p>
        </div>
      ) : (
        <div></div>
      )}

      <div
        className={`flex flex-col  items-center  ${
          planName.toUpperCase() === "GOLD" ? "rounded-t-none" : "rounded-lg"
        } ${
          activePlanId === planId && "!border-[#004EFF]"
        } py-5 px-4 shadow-sm border-[1px] border-t-[0px] border-[#E8E8E8] bg-[#FFFFFF]  h-[433px] w-[273px]`}
      >
        <img
          src={CargoRatingGif}
          alt="CargoRating"
          width={180}
          height={180}
          className="mb-4"
        />

        <p className="text-[#004EFF] font-Lato text-[22px] font-semibold leading-7 uppercase mb-2 ">
          {planName}
        </p>

        {planName.toUpperCase() === "FREEMIUM" ||
        planName.toUpperCase() === "PLATINUM" ? (
          <div className="flex items-center mb-8">
            <p className="text-[#777777] font-Lato text-[22px] font-semibold leading-7  ">
              <span className="font-Open text-[12px] font-semibold leading-4 ">
                ₹
              </span>
              {`${planName === "FREEMIUM" ? "Free" : "Price On Request"}`}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-end gap-x-1">
              <p className="text-[#777777] font-Lato text-[22px] font-semibold leading-7  ">
                <span className="font-Open text-[12px] font-semibold leading-4 text-[#777777] ">
                  ₹
                </span>
                {`${price}`}
              </p>
              <p className=" font-Open text-[12px] font-semibold  text-[#777777] leading-4">
                {`/${validity}`}
              </p>
            </div>
          </div>
        )}

        <p className="font-Open text-sm font-normal leading-[18px] text-[#1C1C1C] text-start mb-4">
          {description}
        </p>

        <AddButton
          text={activePlanId === planId ? "SELECTED" : "SELECT"}
          onClick={onClick}
          className={`!py-2 !px-4 !w-[209px]  !font-Open !border-[1px] !border-black ${
            activePlanId === planId
              ? "!bg-[#1C1C1C] !text-white "
              : "!text-black !bg-transparent"
          } `}
          textClassName={`${
            activePlanId === planId ? "!text-white" : "!text-black"
          }`}
        />
      </div>
    </div>
  );
};

export default PlanCard;
