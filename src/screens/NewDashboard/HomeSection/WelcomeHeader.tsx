import React, { useEffect, useState } from "react";
import WelcomeGif from "../../../assets/WelcomePage.gif";
import { capitalizeFirstLetter } from "../../../utils/utility";
import { ResponsiveState } from "../../../utils/responsiveState";
import { POST } from "../../../utils/webService";
import { GET_TODAY_DATA_FOR_DASHBOARD } from "../../../utils/ApiUrls";
import toast from "react-hot-toast";
// Improved Type Definitions

const WelcomeHeader: React.FC<any> = ({
  userName = "",
  profilePicture = "",
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
  const bookedCount = getCount("BOOKED") || 0;
  const notPickedCount = getCount("NOT PICKED") || 0;
  const inTransitCount = getCount("IN TRANSIT") || 0;
  const pickedUp = getCount("PICKED UP") || 0;
  const outForDeliveryCount = getCount("OUT FOR DELIVERY") || 0;
  const exceptionCount = getCount("EXCEPTION") || 0;
  const cancelledCount = getCount("CANCELLED") || 0;
  const cancelledRequested = getCount("CANCELLED REQUESTED") || 0;
  const cancelRequested = getCount("CANCEL REQUESTED") || 0;

  return (
    <div className="w-full max-w-[98vw] mx-auto mt-10 mb-6 px-2 md:px-8">
      <div className="rounded-3xl shadow-2xl bg-gradient-to-br from-[#F8F8FF] via-[#E7E4FF] to-[#CFDFFF] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 min-h-[260px]">
        <div className="flex flex-col md:flex-row items-center gap-10 w-full">
          {/* User Card */}
          <div className="relative flex flex-col justify-end items-start bg-white/80 rounded-3xl shadow-xl min-w-[240px] max-w-[280px] h-[240px] overflow-hidden p-0">
            <img
              src={profilePicture || WelcomeGif}
              alt="profile-avatar"
              className="absolute top-0 left-0 w-full h-full object-fill rounded-3xl"
            />
            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-[#E7E4FF]/90 via-[#CFDFFF]/70 to-transparent flex flex-col justify-end px-6 pb-2">
              <div className="font-Open text-lg md:text-xl font-bold text-[#160783]  drop-shadow-sm">
                {capitalizeFirstLetter(userName)}
              </div>
              <div className="font-Open text-sm text-[#160783] opacity-90 ">
                Good to see you again
              </div>
            </div>
          </div>
          {/* Welcome and Stats */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 w-full">
              <div>
                <h2 className="font-Lato text-3xl md:text-4xl font-bold text-[#160783] tracking-wide">
                  {completedStatus?.returningUser ? "Welcome Back, " : "Hi, "}
                  <span className="text-[#9082FF]">
                    {capitalizeFirstLetter(userName)}
                  </span>
                  !
                </h2>
                <p className="font-Open text-lg md:text-xl text-[#494949] font-normal md:font-semibold tracking-wide mt-1">
                  {completedStatus?.returningUser
                    ? "Here's a quick look at your shipping activity today."
                    : "We are excited to have you aboard and look forward to supporting your success!"}
                </p>
              </div>
            </div>
            {completedStatus?.returningUser && (
              <div className="w-full flex flex-col items-center mt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 w-full">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-32 bg-[#CFDFFF] rounded-2xl animate-pulse"
                      />
                    ))
                  ) : (
                    <>
                      <div className="bg-white/90 border-t-4 border-[#9082FF] rounded-2xl shadow p-6 flex flex-col items-center min-w-[140px]">
                        <span className="text-sm font-semibold text-[#9082FF] tracking-wider uppercase mb-1">
                          Orders Placed
                        </span>
                        <span className="text-4xl font-bold text-[#160783]">
                          {bookedCount + notPickedCount || "0"}
                        </span>
                      </div>
                      <div className="bg-white/90 border-t-4 border-[#160783] rounded-2xl shadow p-6 flex flex-col items-center min-w-[140px]">
                        <span className="text-sm font-semibold text-[#9082FF] tracking-wider uppercase mb-1">
                          In Transit
                        </span>
                        <span className="text-4xl font-bold text-[#160783]">
                          {inTransitCount + pickedUp || "0"}
                        </span>
                      </div>
                      <div className="bg-white/90 border-t-4 border-[#CFDFFF] rounded-2xl shadow p-6 flex flex-col items-center min-w-[140px]">
                        <span className="text-sm font-semibold text-[#9082FF] tracking-wider uppercase mb-1">
                          Out for Delivery
                        </span>
                        <span className="text-4xl font-bold text-[#160783]">
                          {outForDeliveryCount || "0"}
                        </span>
                      </div>
                      <div className="bg-white/90 border-t-4 border-[#E7E4FF] rounded-2xl shadow p-6 flex flex-col items-center min-w-[140px]">
                        <span className="text-sm font-semibold text-[#9082FF] tracking-wider uppercase mb-1">
                          Exception
                        </span>
                        <span className="text-4xl font-bold text-[#160783]">
                          {exceptionCount || "0"}
                        </span>
                      </div>
                      <div className="bg-white/90 border-t-4 border-[#9082FF] rounded-2xl shadow p-6 flex flex-col items-center min-w-[140px]">
                        <span className="text-sm font-semibold text-[#9082FF] tracking-wider uppercase mb-1">
                          Cancelled
                        </span>
                        <span className="text-4xl font-bold text-[#160783]">
                          {cancelledCount +
                            cancelRequested +
                            cancelledRequested || "0"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default WelcomeHeader;
