import React from "react";
import InfoIcon from "../../assets/info.svg";
import { commaSeparator } from "../../utils/utility";

interface IYaariCashBalanceProps {
  summary?: any;
  loadingState?: any;
  companyName?: any;
}

const YaariCashBalance: React.FunctionComponent<IYaariCashBalanceProps> = ({
  summary,
  loadingState,
  companyName,
}) => {
  const shimmerEffect = "bg-gray-200 animate-pulse rounded-md";
  const formatDate = (isoString: any) => {
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    // Function to add ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (day: any) => {
      if (day > 3 && day < 21) return "th"; // Covers 4th-20th
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <div className="flex flex-col lg:flex-row justify-between gap-y-4 lg:items-center">
        {/* Left Section */}
        <div>
          {loadingState ? (
            <>
              <div className={`${shimmerEffect} h-6 w-48 mb-2`}></div>
              <div className={`${shimmerEffect} h-8 w-32`}></div>
            </>
          ) : (
            <>
              <p className="text-gray-500 text-lg lg:text-xl font-Open font-semibold leading-7 capitalize tracking-wide mb-2 lg:mb-1">
                {`${
                  companyName === "Shipyaari"
                    ? "  Your YaariCash Balance"
                    : "  Your Cashback Balance"
                }`}
              </p>
              <p className="text-xl lg:text-2xl font-Open font-bold text-gray-800 leading-8">
                ₹ {commaSeparator(summary?.totalCashback) || 0}
              </p>
            </>
          )}
        </div>
        {/* Right Section */}
        <div className="px-4 py-3 rounded-lg border-[0.5px] border-[#faad1433] bg-[#faad141a] text-[#FAAD14] flex gap-x-2">
          {loadingState ? (
            <div className={`${shimmerEffect} h-5 w-64`}></div>
          ) : (
            <>
              <img src={InfoIcon} alt="Info Icon" />
              <p className="font-Open text-sm lg:text-base font-medium lg:font-semibold leading-5 tracking-wider lg:tracking-normal">
                {`₹${commaSeparator(
                  summary?.remainingAmount
                )} is expiring on ${formatDate(
                  summary?.expiryDate
                )}. Use it before it expires!`}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default YaariCashBalance;
