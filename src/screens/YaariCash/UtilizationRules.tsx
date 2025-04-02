import React from "react";

interface IUtilizationRulesProps {
  summary?: any;
  loadingState?: any;
  companyName?: any;
}

const UtilizationRules: React.FunctionComponent<IUtilizationRulesProps> = ({
  summary,
  loadingState,
  companyName,
}) => {
  const shimmerEffect = "bg-gray-200 animate-pulse rounded-md";
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);

    const day = date.getUTCDate(); // Use UTC Date
    const month = date.toLocaleString("en-US", {
      month: "long",
      timeZone: "UTC",
    }); // Ensure UTC timeZone
    const year = date.getUTCFullYear(); // Use UTC Full Year

    // Function to add ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (day: number) => {
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
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Title */}
      {loadingState ? (
        <div className={`${shimmerEffect} h-6 w-64 mb-4`}></div>
      ) : (
        <h2 className="text-lg lg:text-2xl font-Open font-semibold leading-6 mb-4">
          Cashback Utilization Rules
        </h2>
      )}

      {/* Subtitle */}
      {loadingState ? (
        <div className={`${shimmerEffect} h-4 w-80 mb-4`}></div>
      ) : (
        <p className="text-gray-600 text-base lg:text-lg font-Open font-normal lg:leading-5 mb-4">
          {`${
            companyName?.toLowerCase() === "shipyaari"
              ? "  Important information about using your YaariCash"
              : "  Important information about using your Cashback"
          }`}
        </p>
      )}

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rule Items */}
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              {loadingState ? (
                <div
                  className={`${shimmerEffect} h-5 w-5 rounded-full mr-2`}
                ></div>
              ) : (
                <i className="fas fa-info-circle text-blue-500 mr-2"></i>
              )}
              {loadingState ? (
                <div className={`${shimmerEffect} h-5 w-40`}></div>
              ) : (
                <h3 className="font-Open text-base lg:text-lg font-semibold leading-5">
                  {index === 0
                    ? "Maximum Usage Per Order"
                    : index === 1
                    ? "Expiration Policy"
                    : index === 2
                    ? "No Transfer Policy"
                    : "Latest Rule Applicability"}
                </h3>
              )}
            </div>
            {loadingState ? (
              <div className={`${shimmerEffect} h-4 w-full`}></div>
            ) : (
              <p className="text-gray-600 font-Open text-sm lg:text-base font-normal leading-7">
                {index === 0
                  ? summary?.latestUtilizationRule?.toLowerCase() === "full"
                    ? `You can apply the full amount of your ${
                        companyName?.toLowerCase() === "shipyaari"
                          ? "YaariCash"
                          : "cashback"
                      } for any order.`
                    : `You can apply a maximum of ${
                        summary?.latestUtilizationRule || 10
                      }% of your order value as ${
                        companyName?.toLowerCase() === "shipyaari"
                          ? "YaariCash"
                          : "cashback"
                      } for any order.`
                  : index === 1
                  ? `Your ${
                      companyName?.toLowerCase() === "shipyaari"
                        ? "YaariCash"
                        : "cashback"
                    } expires on ${formatDate(summary?.expiryDate)}.`
                  : index === 2
                  ? `${
                      companyName?.toLowerCase() === "shipyaari"
                        ? "YaariCash"
                        : "Cashback"
                    } is non-transferable and cannot be exchanged for real cash.`
                  : `The latest ${
                      companyName?.toLowerCase() === "shipyaari"
                        ? "YaariCash"
                        : "cashback"
                    } utilization rule for the maximum utilization amount shall be applicable for all ${
                      companyName?.toLowerCase() === "shipyaari"
                        ? "YaariCash"
                        : "cashback"
                    } redemptions.`}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UtilizationRules;
