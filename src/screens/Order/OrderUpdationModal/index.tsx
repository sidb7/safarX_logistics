//This is the main  file for the order updation
import { useEffect, useState } from "react";
import Header from "./Header";
import PickupAddress from "./PickupAddress";
import DeliveryAddress from "./DeliveryAddress";
import PaymentDetails from "./PaymentDetails";
import OrderHistory from "./OrderHistory";
import EventLogs from "./EventLogs";
import BoxAndProducts from "./BoxAndProucts/index";
// import Products from "./Products";
// import Box from "./Box";
import { GET_SELLER_ORDER_COMPLETE_DATA } from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
// import OneButton from "../../../components/Button/ServiceButton";
import OneButton from "../../../components/Button/OneButton";

interface getIdData {
  getIdData?: any;
}
const OrderUpdationModal = (getIdData: getIdData) => {
  const [completeData, setCompleted] = useState([]);
  const dataOfOrderandShipyaariID = getIdData;
  const tempOrderId =
    dataOfOrderandShipyaariID?.getIdData?.data?.orderId.split("T")[1];
  const awb = dataOfOrderandShipyaariID?.getIdData?.data?.awb;
  const getCompleteData = async (data: any) => {
    try {
      const { data } = await POST(GET_SELLER_ORDER_COMPLETE_DATA, {
        tempOrderId: tempOrderId,
        awb: awb ? awb : "0",
      });
      if (data.status) {
        setCompleted(data?.data?.[0]?.data?.[0]);
      } else {
        setCompleted([]);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCompleteData(dataOfOrderandShipyaariID);
  }, []);
  return (
    <div className="h-screen overflow-y-auto">
      <div>
        <Header getIdData={dataOfOrderandShipyaariID} />
        <PickupAddress completeData={completeData} />
        <DeliveryAddress completeData={completeData} />
        <BoxAndProducts completeData={completeData} />
        <PaymentDetails completeData={completeData} />
        <EventLogs completeData={completeData} />
        <OrderHistory completeData={completeData} />
      </div>

      <div>
        <div
          className="flex justify-center gap-x-8  shadow-lg border-[1px] h-[88px]  bg-[#FFFFFF] px-6 py-7 rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
          style={{ width: "-webkit-fill-available" }}
        >
          <OneButton
            text={"UPDATE ORDER"}
            variant="secondary"
            onClick={function (e: any): void {
              throw new Error("Function not implemented.");
            }}
            className="!w-[160px]"
          />
          <OneButton
            text={"PROCESS ORDER"}
            variant="primary"
            onClick={function (e: any): void {
              throw new Error("Function not implemented.");
            }}
            className="!w-[160px] "
          />
        </div>
      </div>
    </div>
  );
};
export default OrderUpdationModal;
