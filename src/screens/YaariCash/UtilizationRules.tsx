import React from "react";

interface IUtilizationRulesProps {
  summary?: any;
}

const UtilizationRules: React.FunctionComponent<IUtilizationRulesProps> = ({
  summary,
}) => {
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg lg:text-2xl font-Open font-semibold leading-6 mb-4">
        Cashback Utilization Rules
      </h2>
      <p className="text-gray-600 text-base lg:text-lg font-Open font-normal lg:leading-5 mb-4">
        Important information about using your YaariCash
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <i className="fas fa-info-circle text-blue-500 mr-2"></i>
            <h3 className="font-Open text-base lg:text-lg font-semibold leading-5">
              Maximum Usage Per Order
            </h3>
          </div>
          <p className="text-gray-600 font-Open text-sm lg:text-base font-normal leading-7">
            You can apply a maximum of 10% of your order value as YaariCash for
            any order.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <i className="fas fa-clock text-blue-500 mr-2"></i>
            <h3 className="font-Open text-base lg:text-lg font-semibold leading-5">
              Expiration Policy
            </h3>
          </div>
          <p className="text-gray-600 font-Open text-sm lg:text-base font-normal leading-7 tracking-wide">
            {`Your YaariCash expires on ${formatDate(summary?.expiryDate)}.`}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <i className="fas fa-ban text-blue-500 mr-2"></i>
            <h3 className="font-Open text-base lg:text-lg font-semibold leading-5">
              No Transfer Policy
            </h3>
          </div>
          <p className="text-gray-600 font-Open text-sm lg:text-base font-normal leading-7">
            YaariCash is non-transferable and cannot be exchanged for real cash.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <i className="fas fa-sync-alt text-blue-500 mr-2"></i>
            <h3 className="font-Open text-base lg:text-lg font-semibold leading-5">
              Latest Rule Applicability
            </h3>
          </div>
          <p className="text-gray-600 font-Open text-sm lg:text-base font-normal leading-7">
            The latest cashback utilization rule for the maximum utilization
            amount shall be applicable for all YaariCash redemptions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UtilizationRules;
