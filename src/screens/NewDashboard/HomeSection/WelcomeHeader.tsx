import React, { useEffect, useState } from "react";
import WelcomeGif from "../../../assets/WelcomePage.gif";
import { capitalizeFirstLetter } from "../../../utils/utility";
import { ResponsiveState } from "../../../utils/responsiveState";
import { POST } from "../../../utils/webService";
import { GET_TODAY_DATA_FOR_DASHBOARD } from "../../../utils/ApiUrls";
import toast from "react-hot-toast";
// Improved Type Definitions
interface IWelcomeHeaderProps {
  userName?: string;
  completedStatus?: {
    returningUser?: boolean;
  };
}
const WelcomeHeader: React.FC<IWelcomeHeaderProps> = ({
  userName = "",
  completedStatus,
}) => {
  const { isLgScreen } = ResponsiveState();
  const [isLoading, setIsLoading] = useState(false);
  const [todaysImportantData, setTodaysImportantData] = useState<any[]>([]);
  // Optimized count extraction with default fallback
  const getCount = (status: string) => {
    try {
      return (
        todaysImportantData[0]?.statusCounts.find(
          (item: any) => item.status === status
        )?.count || 0
      );
    } catch (error) {
      console.error(`Error extracting count for ${status}:`, error);
      return 0;
    }
  };
  // Improved error handling in API call
  const getEverydayShippingDetails = async () => {
    try {
      setIsLoading(true);
      const payload = [
        {
          tableId: 1,
          tableName: "home",
          globalFilter: {
            startDate: 0,
            endDate: 0,
          },
          customFilter: {},
          data: [{}],
          isActive: true,
        },
      ];
      const everydayShippingData = await POST(
        GET_TODAY_DATA_FOR_DASHBOARD,
        payload
      );
      if (everydayShippingData?.data?.success) {
        const quickResponse = everydayShippingData?.data;
        const filteredData = quickResponse.data.filter(
          (item: any) => item.tableId === 1 && item.tableName === "home"
        );
        if (filteredData.length > 0) {
          const relevantData = filteredData.map((item: any) => ({
            statusCounts: item.statusCounts,
            totalOrders: item.totalOrders,
            tableId: item.tableId,
            tableName: item.tableName,
          }));
          setTodaysImportantData(relevantData);
          // toast.success(everydayShippingData?.data?.message);
        } else {
          //    toast.error("No data matching the criteria found.");
        }
      } else {
        // toast.error(
        //   everydayShippingData?.data?.message || "Failed to fetch data"
        // );
      }
    } catch (error) {
      console.error("Error fetching shipping details:", error);
      //  toast.error("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (completedStatus?.returningUser) {
      getEverydayShippingDetails();
    }
    // getEverydayShippingDetails();
  }, [completedStatus?.returningUser]);

  // Extracted count calculations
  const bookedCount = getCount("BOOKED");
  const inTransitCount = getCount("IN TRANSIT");
  const outForDeliveryCount = getCount("OUT FOR DELIVERY");
  const exceptionCount = getCount("EXCEPTION");
  const cancelledCount = getCount("CANCELLED");
  return (
    <>
      <div className="px-4 py-[10px] border-1 border-[#E8E8E8] rounded-2xl shadow-md bg-[#EBFCFF] mt-[35px] mb-6 md:mb-0">
        <div className="flex justify-between items-center">
          <div className="flex flex-col p-3 lg:p-2 gap-y-3 lg:gap-y-[14px]">
            <p className="font-Lato text-lg lg:text-[22px] xl:text-[26px] text-[#1C1C1C] font-semibold lg:leading-6 xl:leading-9 tracking-wider capitalize">
              {completedStatus?.returningUser ? "Welcome Back, " : "Hi, "}
              <span>{capitalizeFirstLetter(userName)}</span>!
            </p>
            <p className="font-Open text-[13px] lg:text-base xl:text-lg text-[#606060] font-normal lg:font-semibold  leading-5 xl:leading-6 tracking-wide">
              {completedStatus?.returningUser
                ? "Important Today!"
                : " We are excited to have you aboard and look forward to supporting your Success!"}
            </p>
          </div>
          {!completedStatus?.returningUser && isLgScreen && (
            <div>
              <img
                src={WelcomeGif}
                loading="lazy"
                alt="welcome-gif"
                height={134}
                width={134}
              />
            </div>
          )}
        </div>
        {completedStatus?.returningUser && (
          <>
            <div className="flex flex-wrap gap-x-6 mb-1">
              <>
                {isLoading ? (
                  <>
                    <div className="flex-1 m-2 animated rounded-xl w-[273px] h-40 p-4"></div>
                    <div className="flex-1 m-2 animated rounded-xl w-[273px] h-40 p-4"></div>
                    <div className="flex-1 m-2 animated rounded-xl w-[273px] h-40 p-4"></div>
                    <div className="flex-1 m-2 animated rounded-xl w-[273px] h-40 p-4"></div>
                  </>
                ) : (
                  <>
                    <div className="border-[1px] bg-[#F2FAEF] rounded-2xl shadow-md mt-4 flex-1 w-[273px] px-[18px] py-[17px]">
                      <div className=" flex flex-col justify-center items-center text-center gap-y-[11px]">
                        <p className="font-Lato font-semibold text-xl leading-[26px] text-[#1C1C1C]">
                          {" "}
                          Orders Placed
                        </p>
                        <p className="font-Lato font-bold text-[22px] leading-[28px] text-[#1C1C1C]">
                          {bookedCount || "0"}
                        </p>
                      </div>
                    </div>
                    <div className="border-[1px] bg-[#D8EFD0] rounded-2xl shadow-md mt-4 flex-1 w-[273px] px-[18px] py-[17px]">
                      <div className=" flex flex-col justify-center items-center text-center gap-y-[11px]">
                        <p className="font-Lato font-semibold text-xl leading-[26px] text-[#1C1C1C]">
                          {" "}
                          Orders In Transit
                        </p>
                        <p className="font-Lato font-bold text-[22px] leading-[28px] text-[#1C1C1C]">
                          {inTransitCount || "0"}
                        </p>
                      </div>
                    </div>
                    <div className="border-[1px] bg-[#B0DFA1] rounded-2xl shadow-md mt-4 flex-1 w-[273px] px-[18px] py-[17px]">
                      <div className=" flex flex-col justify-center items-center text-center gap-y-[11px]">
                        <p className="font-Lato font-semibold text-xl leading-[26px] text-[#1C1C1C]">
                          {" "}
                          Out for Delivery
                        </p>
                        <p className="font-Lato font-bold text-[22px] leading-[28px] text-[#1C1C1C]">
                          {outForDeliveryCount || "0"}
                        </p>
                      </div>
                    </div>
                    <div className="border-[1px] bg-[#FEEEEB] rounded-2xl shadow-md mt-4 flex-1 w-[273px] px-[18px] py-[17px]">
                      <div className=" flex flex-col justify-center items-center text-center gap-y-[11px]">
                        <p className="font-Lato font-semibold text-xl leading-[26px] text-[#1C1C1C]">
                          {" "}
                          Exception Orders
                        </p>
                        <p className="font-Lato font-bold text-[22px] leading-[28px] text-[#1C1C1C]">
                          {exceptionCount || "0"}
                        </p>
                      </div>
                    </div>
                    <div className="border-[1px] bg-[#FBCDC3] rounded-2xl shadow-md mt-4 flex-1 w-[273px] px-[18px] py-[17px]">
                      <div className=" flex flex-col justify-center items-center text-center gap-y-[11px]">
                        <p className="font-Lato font-semibold text-xl leading-[26px] text-[#1C1C1C]">
                          {" "}
                          Orders Cancelled
                        </p>
                        <p className="font-Lato font-bold text-[22px] leading-[28px] text-[#1C1C1C]">
                          {cancelledCount || "0"}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default WelcomeHeader;
