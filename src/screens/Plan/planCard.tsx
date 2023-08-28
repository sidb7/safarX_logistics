import React from "react";
import CargoRatingGif from "../../assets/common/CargoRating.gif";
import AddButton from "../../components/Button/addButton";

interface ITypeProps {
  isMostPopular?: boolean;
  isBronze?: boolean;
  isPlatinum?: boolean;
  planName: string;
  pricePerMonth: any;
  pricePerGrams?: number;
  planDescription: string;
}

const PlanCard = (props: ITypeProps) => {
  const {
    isMostPopular,
    isBronze,
    isPlatinum,
    planName,
    pricePerMonth,
    pricePerGrams,
    planDescription,
  } = props;

  return (
    <div>
      {isMostPopular ? (
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
          isMostPopular ? "rounded-t-none" : "rounded-lg"
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

        {isBronze === true || isPlatinum === true ? (
          <div className="flex items-center mb-8">
            <p className="text-[#777777] font-Lato text-[22px] font-semibold leading-7  ">
              <span className="font-Open text-[12px] font-semibold leading-4 ">
                ₹
              </span>
              {`${pricePerMonth}`}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-end gap-x-1">
              <p className="text-[#777777] font-Lato text-[22px] font-semibold leading-7  ">
                <span className="font-Open text-[12px] font-semibold leading-4 text-[#777777] ">
                  ₹
                </span>
                {`${pricePerMonth}`}
              </p>
              <p className=" font-Open text-[12px] font-semibold  text-[#777777] leading-4">
                /month
              </p>
            </div>
            <div>
              <p className="font-Open text-[12px] font-semibold leading-4 text-[#8D8D8D]">{`From ₹ ${pricePerGrams} per 500 grams`}</p>
            </div>
          </div>
        )}

        <p className="font-Open text-sm font-normal leading-[18px] text-[#1C1C1C] text-start mb-4">
          {planDescription}
        </p>

        <AddButton
          text={"GET STARTED"}
          onClick={() => {}}
          className="!py-2 !px-4 !bg-[#1C1C1C] !w-[209px] "
          textClassName="text-[#FFFFFF]"
        />
      </div>
    </div>
  );
};

export default PlanCard;
