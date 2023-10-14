import React, { useEffect } from "react";
import DroneDelivery from "../../../../assets/Delivery/DroneDelivery.gif";
import CargoRating from "../../../../assets/Delivery/CargoRating.gif";
import Checkbox from "../../../../components/CheckBox";

interface IRecipientType {
  data: {
    deliveryAddress: any;
    setDeliveryAddress: any;
  };
}

const RecipientType: React.FunctionComponent<IRecipientType> = ({
  data: { deliveryAddress, setDeliveryAddress },
}) => {
  const type = deliveryAddress?.orderType;
  useEffect(() => {}, [type]);
  return (
    <div className="relative z-1 mt-5 mx-5 lg:mb-5 mb-4 border-[1px] h-[230px] rounded border-[#EAEAEA] bg-[#FFFFFF] drop-shadow-xl px-4 pt-[40px] pb-[8px] lg:w-1/2 lg:col-span-3 ">
      <div className="grid grid-cols-2 gap-3 ">
        <div
          className={`relative z-1  border-[1px] rounded ${
            type === "B2B" ? "border-[#1C1C1C]" : "border-[#EAEAEA]"
          } bg-[#FEFEFE] h-[150px]  p-5 cursor-pointer`}
          onClick={() => {
            setDeliveryAddress((prevData: any) => ({
              ...prevData,
              orderType: "B2B",
              gstNumber: "",
              deliveryAddress: {
                ...prevData.deliveryAddress,
                recipientType: "business",
              },
              billingAddress: {
                ...prevData.billingAddress,
                recipientType: "business",
              },
            }));
          }}
        >
          <img
            src={CargoRating}
            alt="Cargo Rating"
            className="h-[100%] w-[100%] object-contain"
          />
          <div className="flex flex-row  items-center  absolute z-2 -top-3 bg-[#FEFEFE] ">
            {type === "B2B" && (
              <Checkbox checked={type === "B2B" ? true : false} />
            )}
            <p className="bg-white   lg:font-semibold lg:font-Open lg:text-sm">
              Business
            </p>
          </div>
        </div>
        <div
          className={`relative z-1  border-[1px] rounded  bg-[#FEFEFE] h-[150px] ${
            type === "B2C" ? "border-[#1C1C1C]" : "border-[#EAEAEA]"
          }  p-5 cursor-pointer`}
          onClick={() => {
            setDeliveryAddress((prevData: any) => ({
              ...prevData,
              orderType: "B2C",
              gstNumber: "",
              deliveryAddress: {
                ...prevData.deliveryAddress,
                recipientType: "consumer",
              },
              billingAddress: {
                ...prevData.billingAddress,
                recipientType: "consumer",
              },
            }));
          }}
        >
          <img
            src={DroneDelivery}
            alt="Drone Delivery"
            className="h-[100%] w-[100%] object-contain"
          />
          <div className="flex  absolute z-2 -top-3 items-center  bg-[#FEFEFE]">
            {type === "B2C" && (
              <Checkbox checked={type === "B2C" ? true : false} />
            )}
            <p className="bg-white lg:font-semibold lg:font-Open lg:text-sm">
              Consumer
            </p>
          </div>
        </div>
      </div>
      <p className="absolute z-2 -top-3 left-5 bg-[#00AEEF] rounded-lg w-[90px] px-[13px] py-[4px] text-[#FFFFFF] lg:font-bold lg:font-lato lg:text-[12px] ">
        Recipient
      </p>
    </div>
  );
};

export default RecipientType;
