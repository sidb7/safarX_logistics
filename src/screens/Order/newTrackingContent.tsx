import { Spinner } from "flowbite-react";
import React, { useEffect, useMemo, useState } from "react";
import WebCloseIcon from "../../assets/CloseIcon.svg";
import DeliveryIcon from "../../assets/Delivery Icon.svg";
import TrackingGif from "../../assets/Tracking .gif";
import Stepper from "../NewOrder/Tracking/clientStepper";
import TickLogo from "../../assets/common/Tick.svg";
import { GET_CLIENTTRACKING_INFO } from "../../utils/ApiUrls";
import { GET, POST } from "../../utils/webService";
import toast from "react-hot-toast";
import { capitalizeFirstLetter } from "../../utils/utility";
interface INewTrackingContentProps {
  setOpenRightModalForTracking?: any;
  openRightModalForTracking?: any;
}

const NewTrackingContent: React.FunctionComponent<INewTrackingContentProps> = (
  props
) => {
  const { setOpenRightModalForTracking, openRightModalForTracking } = props;
  console.log("🚀 ~ openRightModalForTracking:", openRightModalForTracking);
  const steps = [
    {
      label: "Order Created",
      isCompleted: true,
      value: "BOOKED",
      isActive: false,
      imgSrc: TickLogo,
      timeStatus: "01 Jun | 16:32:46",
    },
    {
      label: "In Transit",
      isCompleted: false,
      value: "IN TRANSIT",
      isActive: false,
      imgSrc: TickLogo,
      timeStatus: "01 Jun | 16:32:46",
    },
    {
      label: "Out For Delivery",
      value: "OUT FOR DELIVERY",

      isCompleted: false,
      isActive: false,
      imgSrc: TickLogo,
      timeStatus: "",
    },
    {
      label: "Delivered",
      isCompleted: false,
      isActive: false,
      value: "DELIVERED",
      imgSrc: TickLogo,
      timeStatus: "",
    },
  ];
  const [orderSteps, setOrderSteps] = useState<any>(steps);
  const [loading, setLoading] = useState<boolean>(false);
  const [trackingData, setTrackingData] = useState<any>([]);
  console.log("🚀 ~ trackingData:", trackingData?.currentStatus);

  const shipmentStatusArr1 = [
    "Exception",
    "In Transit",
    "Not Picked",
    "Booked",
    "Out For Delivery",
    "Rto Delivered",
    "Rto In Transit",
    "Rto Out For Delivery",
    "Rto Exception",
    "Cancel Requested",
  ];
  const shipmentStatusArr2 = [
    "Hold",
    "Lost Damage",
    "Lost/damage",
    "Cancelled",
  ];
  const shipmentStatusArr3 = ["Delivered"];
  //   temp variable later replace it with the api call
  // let currentStatus = trackingData?.currentStatus || "N/A";
  // console.log("🚀 ~ currentStatus:", currentStatus);

  function orderStatus(status: any) {
    const statuses = {
      BOOKED: false,
      "IN TRANSIT": false,
      "OUT FOR DELIVERY": false,
      DELIVERED: false,
    };

    if (status === "BOOKED" || status === "NOT PICKED") {
      statuses.BOOKED = true;
    } else if (status === "IN TRANSIT" || status === "RTO IN TRANSIT") {
      statuses.BOOKED = true;
      statuses["IN TRANSIT"] = true;
    } else if (
      status === "OUT FOR DELIVERY" ||
      status === "RTO OUT FOR DELIVERY"
    ) {
      statuses.BOOKED = true;
      statuses["IN TRANSIT"] = true;
      statuses["OUT FOR DELIVERY"] = true;
    } else if (status === "DELIVERED" || status === "RTO DELIVERED") {
      statuses.BOOKED = true;
      statuses["IN TRANSIT"] = true;
      statuses["OUT FOR DELIVERY"] = true;
      statuses["DELIVERED"] = true;
    }
    return statuses;
  }

  const getTrackingData = async () => {
    // let payload = {
    //   //   awbNo: openRightModalForTracking?.awbNo,

    // };
    try {
      setLoading(true);
      console.log("awb ", openRightModalForTracking?.awbNo);
      const { data: response }: any = await GET(
        `${GET_CLIENTTRACKING_INFO}?trackingNo=${openRightModalForTracking?.awbNo}`
      );

      //   console.log("🚀 ~ getTrackingData ~ response:", response);
      if (response?.success && response?.data[0]?.trackingInfo?.length > 0) {
        toast.success(response.message);
        setTrackingData(response?.data?.[0]?.trackingInfo?.[0]);
        setLoading(false);
      } else {
        // navigate("/weight-management/import-weight/upload-file");
        setLoading(false);
        toast.error(response?.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // const trackingCycleInformation = useMemo(() => {
  //   return trackingCycleDetails.length === 0 ? (
  //     <p className="text-sm font-Open text-center font-semibold">
  //       No Data Found
  //     </p>
  //   ) : (
  //     trackingCycleDetails?.Scans?.map((each: any, index: number) => {
  //       return (
  //         <div className="flex gap-x-4  w-full " key={index}>
  //           <div className="font-bold pr-2 py-2 min-w-[24%] md:min-w-[14%] lg:min-w-[12%]">
  //             <p className="text-xs font-Open w-full ">
  //               {new Date(each?.time).toDateString().slice(3) || "-"}
  //             </p>
  //             <p className="text-xs font-Open">
  //               {new Date(each?.time).toLocaleTimeString() || "-"}
  //             </p>
  //           </div>
  //           <div className="relative border-l-[2px] mt-[2px]  border-l-[#80A7FF] border-dotted">
  //             <div className="w-3 h-3 bg-[#80A7FF] rounded-full absolute top-2 left-[-7px]"></div>
  //           </div>
  //           <div className="py-2">
  //             <div className="text-xs font-Open font-medium  md:w-full ">
  //               <p className="capitalize text-xs font-Open">
  //                 {each?.message.toLowerCase()}
  //               </p>
  //             </div>
  //             <p className="text-xs py-1 font-Open  capitalize font-semibold   md:w-full">
  //               {each?.status.toLowerCase()}
  //             </p>
  //             <div className="flex gap-x-1">
  //               <img src={Location} alt="" className="w-4 h-4" />
  //               <p className="text-xs font-Open font-normal capitalize md:w-full  ">
  //                 {each?.location.toLowerCase()}
  //               </p>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     })
  //   );
  // }, [trackingCycleDetails]);

  useEffect(() => {
    if (
      openRightModalForTracking?.awbNo !== undefined &&
      openRightModalForTracking?.awbNo !== ""
    ) {
      getTrackingData();
    }
  }, [openRightModalForTracking?.awbNo]);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[800px]">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col ">
          <div className="flex flex-col ">
            <div className="flex items-center justify-between p-5 gap-y-5">
              <div className="flex gap-x-2">
                {/* <img src={TransactionIcon} alt="transaction icon" /> */}
                <p className="text-2xl font-Lato font-normal leading-8 text-[#1C1C1C]">
                  Activity Log
                </p>
              </div>
              <div>
                <img
                  src={WebCloseIcon}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => setOpenRightModalForTracking(false)}
                />
              </div>
            </div>
            <div className="bg-[#F6F6F6]">
              <div className="flex justify-between p-5">
                <div className="flex gap-x-2 ">
                  <div>
                    <img src={DeliveryIcon} alt="" />
                  </div>
                  <p className="xl:text-xl font-Lato xl:font-bold xl:leading-[26px] text-[#202427]">
                    Current Status
                  </p>
                </div>
                <div>
                  {/* {capitalizeFirstLetter(trackingData?.currentStatus)} */}
                  {shipmentStatusArr1.includes(
                    capitalizeFirstLetter(trackingData?.currentStatus) || "N/A"
                  ) ? (
                    <span className="border-[0.5px] border-[#F0A22E] bg-[#FDF6EA] text-[#F0A22E] px-3 py-[4px] rounded-sm font-Open text-xs font-semibold leading-4">
                      {capitalizeFirstLetter(trackingData?.currentStatus) ||
                        "N/A"}
                    </span>
                  ) : shipmentStatusArr2.includes(
                      capitalizeFirstLetter(trackingData?.currentStatus) ||
                        "N/A"
                    ) ? (
                    <span className="border-[0.5px] border-[#F35838] bg-[#FEEEEB] text-[#F35838] px-3 py-[4px] rounded-sm font-Open text-xs font-semibold leading-4">
                      {capitalizeFirstLetter(trackingData?.currentStatus) ||
                        "N/A"}
                    </span>
                  ) : shipmentStatusArr3.includes(
                      capitalizeFirstLetter(trackingData?.currentStatus) ||
                        "N/A"
                    ) ? (
                    <span className="border-[0.5px] border-[#7CCA62] bg-[#F2FAEF] text-[#7CCA62] px-3 py-[4px] rounded-sm font-Open text-xs font-semibold leading-4">
                      {capitalizeFirstLetter(trackingData?.currentStatus) ||
                        "N/A"}
                    </span>
                  ) : (
                    "N/A"
                  )}
                </div>
              </div>
              <div className="flex justify-between px-5">
                <div className="flex flex-col py-4 gap-y-5">
                  <div>
                    <p className="text-base font-Open font-normal leading-[22px]">
                      Mac Book Air + Air podes
                    </p>
                  </div>
                  <div className="flex gap-x-8">
                    <div>
                      <p className="font-Open text-xs font-normal leading-4">
                        order ID:
                      </p>
                      <p className="font-Open text-sm font-semibold leading-5">
                        {trackingData?.orderId || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="font-Open text-xs font-normal leading-4">
                        order Placed:
                      </p>
                      <p className="font-Open text-sm font-semibold leading-5">
                        14 Jun
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    src={TrackingGif}
                    alt=""
                    width={"159.468px"}
                    height={"128px"}
                  />
                </div>
              </div>
              <div className="pt-4 pb-9">
                <Stepper steps={orderSteps} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewTrackingContent;
