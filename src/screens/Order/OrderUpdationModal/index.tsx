import { useEffect, useState } from "react";
import Header from "./Header";
import PickupAddress from "./PickupAddress";
import DeliveryAddress from "./DeliveryAddress";
import PaymentDetails from "./PaymentDetails";
import OrderHistory from "./OrderHistory";
import EventLogs from "./EventLogs";
import BoxAndProducts from "./BoxAndProucts/index";
import { toast } from "react-hot-toast";
import {
  UPDATE_TEMP_ORDER_INFO,
  GET_SELLER_ORDER_COMPLETE_DATA,
  GET_SERVICE_LIST_ORDER,
  POST_PLACE_ALL_ORDERS,
} from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import OneButton from "../../../components/Button/OneButton";
import Services from "./services";

interface getIdData {
  getIdData?: any;
  setInfoModalContent?: any;
}

const OrderUpdationModal = (props: getIdData) => {
  const getIdData = props;
  const setInfoModalContent = props.setInfoModalContent;
  const [updatedData, setUpdatedData] = useState<any>([]);
  const [completeData, setCompleted] = useState<any>([]);
  const [serviceList, setServiceList] = useState<any>([-1]);

  const [enableShowServicesOption, setEnableShowServicesOption] =
    useState<any>(false);
  const [enabled, setEnabled] = useState<any>(true);
  const [placeOrderButton, setPlaceOrderButton] = useState<any>(false);

  const dataOfOrderandShipyaariID = getIdData;
  const tempOrderId =
    dataOfOrderandShipyaariID?.getIdData?.data?.orderId?.split("T")[1];
  const source = completeData?.source;
  const awb = dataOfOrderandShipyaariID?.getIdData?.data?.awb;

  const getCompleteData = async (data: any) => {
    try {
      const { data } = await POST(GET_SELLER_ORDER_COMPLETE_DATA, {
        tempOrderId: tempOrderId,
        awb: awb ? awb : "0",
      });
      if (data.status) {
        setCompleted(data?.data?.[0]?.data?.[0]);
        setUpdatedData(data?.data?.[0]?.data?.[0]);
      } else {
        setCompleted([]);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleServices = async (isPlaceOrder: boolean) => {
    try {
      const { data: response } = await POST(
        UPDATE_TEMP_ORDER_INFO,
        updatedData
      );
      if (response?.status) {
        toast.success("Order Updated Successfully");

        const payload = {
          tempOrderId: tempOrderId,
          source: source,
        };

        const { data: response } = await POST(GET_SERVICE_LIST_ORDER, payload);
        if (response.success) {
          setServiceList(response?.data);
        } else {
          setServiceList([]);
        }

        setPlaceOrderButton(true);
        if (isPlaceOrder) {
          try {
            const payload: any = {
              orders: [
                {
                  orderId: completeData?.orderId,
                  source: completeData?.source,
                  tempOrderId: completeData?.tempOrderId,
                },
              ],
            };
            const { data: response } = await POST(
              POST_PLACE_ALL_ORDERS,
              payload
            );
            if (response?.status) {
              toast.success("Order Updated Successfully");
            } else {
              toast.error(response.message);
            }
          } catch (error: any) {
            toast.error("Something went wrong");
            console.log(error.message);
          }
        }
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const updateOrder = async () => {
    try {
      // console.log(
      //   "updatedData123",
      //   updatedData?.deliveryAddress?.pincode?.toString().length
      // );
      // console.log("deliveryAddresssssssssss", updatedData?.deliveryAddress);
      if (
        updatedData?.pickupAddress?.contact?.name === "" ||
        updatedData?.pickupAddress?.contact?.name === undefined ||
        updatedData?.pickupAddress?.contact?.mobileNo == 0 ||
        updatedData?.pickupAddress?.locality === "" ||
        updatedData?.pickupAddress?.pincode == 0 ||
        updatedData?.pickupAddress?.pincode === undefined ||
        updatedData?.pickupAddress?.pincode?.toString().length < 6
      ) {
        toast.error("Error found in Pickup Address");
      }
      if (
        updatedData?.pickupAddress?.contact?.name === "" ||
        updatedData?.pickupAddress?.contact?.name === undefined ||
        updatedData?.pickupAddress?.contact?.mobileNo == 0 ||
        updatedData?.pickupAddress?.locality === "" ||
        updatedData?.pickupAddress?.pincode == 0 ||
        updatedData?.pickupAddress?.pincode === undefined ||
        updatedData?.pickupAddress?.pincode?.toString().length < 6
      ) {
        toast.error("Error found in Delivery Address");
      } else {
        const payload = updatedData;
        const { data: response } = await POST(UPDATE_TEMP_ORDER_INFO, payload);
        if (response?.status) {
          toast.success("Order Updated Successfully");
          setInfoModalContent({ isOpen: false });
        } else {
          toast.error(response.message);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!enabled) {
      setEnableShowServicesOption(true);
    }
  }, [enabled]);

  useEffect(() => {
    if (placeOrderButton) {
      setEnableShowServicesOption(true);
      setUpdatedData({
        ...updatedData,
        service: {},
      });
    } else setEnableShowServicesOption(false);
  }, [placeOrderButton]);

  useEffect(() => {
    getCompleteData(dataOfOrderandShipyaariID);
  }, []);

  useEffect(() => {
    if (awb === "" || awb == 0 || awb === undefined) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [awb]);

  return (
    <div className="flex flex-col h-screen">
      <div
        className={`flex-grow overflow-y-auto ${enabled ? "mb-32" : "mb-0"}`}
      >
        <Header getIdData={dataOfOrderandShipyaariID} />
        <PickupAddress
          completeData={completeData}
          setUpdatedData={setUpdatedData}
          updatedData={updatedData}
          enabled={enabled}
          setPlaceOrderButton={setPlaceOrderButton}
        />
        <DeliveryAddress
          completeData={completeData}
          setUpdatedData={setUpdatedData}
          updatedData={updatedData}
          enabled={enabled}
          setPlaceOrderButton={setPlaceOrderButton}
        />
        <BoxAndProducts
          completeData={completeData}
          setUpdatedData={setUpdatedData}
          updatedData={updatedData}
          setPlaceOrderButton={setPlaceOrderButton}
          enabled={enabled}
        />
        <Services
          serviceList={serviceList}
          completeData={completeData}
          enableShowServicesOption={enableShowServicesOption}
          enabled={enabled}
          setUpdatedData={setUpdatedData}
          updatedData={updatedData}
          placeOrderButton={placeOrderButton}
        />
        <PaymentDetails completeData={completeData} />
        <EventLogs completeData={completeData} />
        <OrderHistory completeData={completeData} />
      </div>
      {enabled && (
        <div
          className="flex justify-center gap-x-10 shadow-lg border-[1px] h-[88px] bg-[#FFFFFF] px-6 py-7 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0"
          style={{ width: "-webkit-fill-available" }}
        >
          <OneButton
            text={"UPDATE ORDER"}
            variant="secondary"
            onClick={() => updateOrder()}
            className="!w-[160px]"
          />
          <OneButton
            text={placeOrderButton ? "Place Order" : "Check Service"}
            variant="primary"
            onClick={() => handleServices(placeOrderButton)}
            className="!w-[160px]"
          />
        </div>
      )}
    </div>
  );
};

export default OrderUpdationModal;
