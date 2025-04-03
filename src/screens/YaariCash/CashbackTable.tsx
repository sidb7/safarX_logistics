import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { CustomTable } from "../../components/Table";
import { capitalizeFirstLetterWithExclude } from "../../utils/utility";

interface ICashbackTableProps {
  tablesData?: any;
  loadingState?: any;
  companyName?: any;
}

const CashbackTable: React.FunctionComponent<ICashbackTableProps> = ({
  tablesData,
  loadingState,
  companyName,
}) => {
  function formatDate(dateStr: string) {
    const date = new Date(dateStr);

    // Get the UTC day, month, and year to avoid timezone issues
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(date.getUTCFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  }
  const ColumnsHelper = createColumnHelper<any>();

  const columns = [
    ColumnsHelper.accessor("source", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] text-start ">
              Earned Via
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const earnedVia = info?.row?.original?.type;

        return (
          <div className="flex gap-x-2">
            <p
              className={`font-Open text-sm font-normal leading-5  text-[#1C1C1C] text-start `}
            >
              {capitalizeFirstLetterWithExclude(earnedVia) || "-"}
            </p>
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("code", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] text-start ">
              Coupon Code
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const code = info?.row?.original?.couponCode;

        return (
          <div className="flex gap-x-2">
            <p
              className={`font-Open text-sm font-normal leading-5  text-[#1C1C1C] text-start `}
            >
              {code || "-"}
            </p>
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("amount", {
      header: () => {
        return (
          <div>
            <p className="font-Open text-sm font-semibold leading-5 text-[#1C1C1C] text-start ">
              Amount
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const amount = info?.row?.original?.initialCashbackAmount;

        return (
          <>
            <p
              className={`font-Open text-sm font-normal leading-5  text-[#1C1C1C] text-start`}
            >
              ₹ {amount.toLocaleString("en-IN") || 0}
            </p>
          </>
        );
      },
    }),
    ColumnsHelper.accessor("activatedDate", {
      header: () => {
        return (
          <div>
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] text-start ">
              Activated Date
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const activatedDate = info?.row?.original?.appliedDate;
        return (
          <div
            className={`font-Open text-sm font-normal leading-5 text-[#1C1C1C] text-start`}
          >
            {" "}
            {formatDate(activatedDate) || "-"}
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("utilized", {
      header: () => {
        return (
          <div>
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] text-start ">
              Ulitized
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const utilizedPercentage = info?.row?.original?.utilizedPercentage;
        const getProgressColor = () => {
          if (utilizedPercentage < 0) return "#FF0004";
          if (utilizedPercentage <= 33) return "#89CF72"; // Green for low usage
          if (utilizedPercentage <= 66) return "#F3B558"; // Orange for mid usage
          return "#F57960"; // Red for high usage
        };
        const getBackgroundColor = () => {
          if (utilizedPercentage <= 33) return "#E5F4E0"; // Green for low usage
          if (utilizedPercentage <= 66) return "#FCECD5"; // Orange for mid usage
          return "#FDDED7"; // Red for high usage
        };
        return (
          <div className="flex justify-start items-center text-center gap-x-2 max-w-[120px]">
            {/* Progress bar container */}
            <div
              className="progress-bar h-2 w-[60px]  rounded-lg"
              style={{ backgroundColor: getBackgroundColor() }}
            >
              <div
                className="h-full transition-all duration-700 ease-in-out rounded-lg"
                style={{
                  width: `${
                    utilizedPercentage >= 0 && utilizedPercentage <= 100
                      ? utilizedPercentage
                      : ""
                  }%`,
                  backgroundColor: getProgressColor(), // Dynamic color
                }}
              ></div>
            </div>

            <p
              className="font-Open text-xs font-normal leading-4 mt-4"
              style={{ color: getProgressColor() }}
            >
              {/* <span className=" text-sm font-semibold font-Open leading-5"></span> */}
              {/* {`( ₹${commaSeparator(utilizedPercentage) || 0} )`} */}
              {utilizedPercentage.toFixed(1)}% &nbsp;
            </p>
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("expiryDate", {
      header: () => {
        return (
          <div>
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] text-start ">
              Expiry Date
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const expiry = info?.row?.original?.expiryDate;
        return (
          <div
            className={`font-Open text-sm font-normal leading-5  text-[#1C1C1C] text-start`}
          >
            {" "}
            {formatDate(expiry) || "-"}
          </div>
        );
      },
    }),

    ColumnsHelper.accessor("utilizationRule", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-5  text-[#1C1C1C] text-start ">
              Utilization Rule
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const utilizationRule = info?.row?.original?.utilizationRule;
        return (
          <div
            className={`font-Open text-sm font-normal leading-5 tracking-wide  text-[#1C1C1C] text-start`}
          >
            {utilizationRule?.toLowerCase() === "full"
              ? "No restrictions on cashback utilization."
              : `max ${utilizationRule} % per order.`}
          </div>
        );
      },
    }),
  ];

  const ShimmerRow = () => {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="h-[21px] bg-gray-300 rounded w-1/4"></div>
        <div className="h-[21px] bg-gray-300 rounded w-1/4"></div>
        <div className="h-[21px] bg-gray-300 rounded w-1/4"></div>
        <div className="h-[21px] bg-gray-300 rounded w-1/4"></div>
        <div className="h-[21px] bg-gray-300 rounded w-1/4"></div>
        <div className="h-[21px] bg-gray-300 rounded w-1/4"></div>
        <div className="h-[21px] bg-gray-300 rounded w-1/4"></div>
      </div>
    );
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className=" text-lg lg:text-xl font-Open font-bold text-gray-800 leading-4">
        Cashback Details
      </h2>
      <div className=" mt-4">
        {loadingState ? (
          <div className="space-y-4">
            {Array.from({ length: (tablesData?.length ?? 0) + 1 }).map(
              (_, index) => (
                <ShimmerRow key={index} />
              )
            )}
          </div>
        ) : (
          <CustomTable
            columnsData={columns}
            rowData={tablesData || []}
            minHeight="21vh"
          />
        )}
      </div>
    </div>
  );
};

export default CashbackTable;
