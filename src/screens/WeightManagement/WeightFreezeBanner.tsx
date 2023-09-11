import React from "react";

interface WeightFreezeBannerProps {
  isActiveFreezeweight: boolean;
}

const WeightFreezeBanner: React.FC<WeightFreezeBannerProps> = ({
  isActiveFreezeweight,
}) => {
  return (
    <div className={"rounded-lg p-8 bg-[#E5EDFF]"}>
      {isActiveFreezeweight ? (
        <p className="font-Lato font-semibold">
          Congrats! With Weight Freeze, you have saved up to 20% of your money.
        </p>
      ) : (
        <p className="font-Lato font-semibold">
          Save up to 40% weight discrepancy with weight freeze{" "}
        </p>
      )}
    </div>
  );
};

export default WeightFreezeBanner;
