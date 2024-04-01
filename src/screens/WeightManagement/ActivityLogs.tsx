import React, { useMemo } from "react";
import CrossIcon from "../../assets/cross.svg";
import Location from "../../assets/other.png";
import { date_DD_MMM_YYYY_HH_MM_SS } from "../../utils/dateFormater";

function ActivityLogs({ onClosed, data }: any) {
  const actionName: any = {
    DISPUTE_ADDED_IN_SYSTEM: "Dispute Added In System",
    SELLER_REJECT_DISPUTE: "Seller Reject Dispute",
    SELLER_ACCEPTED_DISPUTE: "Seller Accepted Dispute",
  };

  const trackingCycleInformation = useMemo(() => {
    return data?.length === 0 ? (
      <p className=" h-[100%] flex justify-center items-center font-Open text-center font-semibold">
        No Data Found
      </p>
    ) : (
      data?.map((each: any, index: number) => {
        return (
          <div className="flex gap-x-4  w-full " key={index}>
            <div className="font-bold pr-2 py-2 min-w-[24%] md:min-w-[14%] lg:min-w-[12%]">
              <p className="text-xs font-Open w-full ">
                {date_DD_MMM_YYYY_HH_MM_SS(each?.createdAt) || "-"}
              </p>
              {/* <p className="text-xs font-Open">
                {new Date(each?.time).toLocaleTimeString() || "-"}
              </p> */}
            </div>
            <div className="relative border-l-[2px] mt-[2px]  border-l-[#80A7FF] border-dotted">
              <div className="w-3 h-3 bg-[#80A7FF] rounded-full absolute top-2 left-[-7px]"></div>
            </div>
            <div className="py-1">
              <p className="text-xs py-1 font-Open  capitalize font-semibold   md:w-full">
                {actionName[each?.actionName]}
              </p>
              <div className="text-xs font-Open font-medium  md:w-full ">
                <p className="capitalize text-xs font-Open">
                  {each?.isAdminLog ? "Admin" : "Seller"}
                </p>
              </div>

              <div className="flex gap-x-1">
                {/* <img src={Location} alt="" className="w-4 h-4" /> */}
                <p className="text-xs font-Open font-normal capitalize md:w-full  ">
                  {each?.userId}
                </p>
              </div>
            </div>
          </div>
        );
      })
    );
  }, [data]);

  return (
    <>
      <div className="bg-[#F6F6F6] h-[100%]">
        <div className="font-Open bg-[#ffffff] shadow-md text-[25px] px-4 py-2.5 font-semibold flex justify-between">
          <div>Activity Logs</div>
          <button
            className="flex justify-center cursor-pointer items-center w-[40px] h-[40px]"
            onClick={() =>
              onClosed({
                isOpen: false,
                data: [],
              })
            }
          >
            <img src={CrossIcon} alt="" className="w-[25px]" />
          </button>
        </div>
        <div className="mx-4 h-[100%]">
          <div
            className={`bg-[#d2d2d225] ${
              data?.length === 0 && "h-[200%]"
            } transition-all shadow-inner max-h-[200px] customScroll my-4 py-2 px-4 rounded-lg`}
          >
            {trackingCycleInformation}
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityLogs;
