import React, { useEffect } from "react";
import DroneDelivery from "../../../../assets/Delivery/DroneDelivery.gif";
import CargoRating from "../../../../assets/Delivery/CargoRating.gif";
import Checkbox from "../../../../components/CheckBox";

interface IRecipientType {
  data: {
    deliveryAddress: any;
    setDeliveryAddress: any;
    inputError?: boolean;
  };
  transitType?: string;
}

const RecipientType: React.FunctionComponent<IRecipientType> = ({
  data: { deliveryAddress, setDeliveryAddress, inputError },
  transitType,
}) => {
  const type = deliveryAddress?.orderType;
  useEffect(() => {}, [type]);

  const isError = inputError && !deliveryAddress?.orderType;

  return (
    <div
      className={`relative z-1 mt-5 mx-5 lg:mb-5 mb-4 border-[1px] h-[230px] rounded border-[#EAEAEA] ${
        isError ? "border-red-500" : "border-[#EAEAEA]"
      }  ${
        transitType === "FORWARD" ? "xl:w-1/3" : "xl:w-1/4"
      } bg-[#FFFFFF] drop-shadow-xl px-4 pt-[40px] pb-[8px] lg:w-2/4 xl:w-1/4  `} // remove the xl:w-1/4 when implementing the b2b option from this line
      id="consumer-type"
    >
      <div
        className={`${
          transitType === "FORWARD" ? "grid grid-cols-2" : "grid grid-cols-1"
        } grid !grid-cols-1`} // remove the grid-cols-1 when implementing the b2b option from this line
      >
        <div
          className={`relative z-1  border-[1px] rounded  bg-[#FEFEFE] h-[150px] ${
            type === "B2C" ? "border-[#1C1C1C]" : "border-[#EAEAEA]"
          }  p-5 cursor-pointer mx-3 font-Open font-semibold text-sm leading-5`}
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
          id="consumer-b2c"
        >
          <img
            src={DroneDelivery}
            alt="Drone Delivery"
            className="h-[100%] w-[100%] object-contain"
          />
          <div className="flex  absolute z-2 -top-3 items-center  bg-[#FEFEFE]">
            {type === "B2C" && (
              <Checkbox
                checked={type === "B2C" ? true : false}
                checkboxClassName="gap-2"
                id="b2c"
                style={{ accentColor: "black" }}
              />
            )}
            <p className="bg-white lg:font-semibold lg:font-Open lg:text-sm">
              Consumer
            </p>
          </div>
        </div>
        {/* {transitType === "FORWARD" ? (
          <div
            className={`relative z-1  border-[1px] rounded ${
              type === "B2B" ? "border-[#1C1C1C]" : "border-[#EAEAEA]"
            } bg-[#FEFEFE] h-[150px]  p-5 cursor-pointer mx-3 font-Open font-semibold text-sm leading-5`}
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
            id="consumer-b2b"
          >
            <img
              src={CargoRating}
              alt="Cargo Rating"
              className="h-[100%] w-[100%] object-contain"
            />
            <div className="flex flex-row  items-center  absolute z-2 -top-3 bg-[#FEFEFE] ">
              {type === "B2B" && (
                <Checkbox
                  checked={type === "B2B" ? true : false}
                  checkboxClassName="gap-2"
                  style={{ accentColor: "black" }}
                />
              )}
              <p className="bg-white   lg:font-semibold lg:font-Open lg:text-sm">
                Business
              </p>
            </div>
          </div>
        ) : (
          <></>
        )} */}
      </div>
      <p className="absolute z-2 -top-3 left-5 bg-[#00AEEF] rounded-lg w-[90px] px-[13px] py-[4px] text-[#FFFFFF] lg:font-bold lg:font-lato lg:text-[12px] ">
        Recipient
      </p>
    </div>
  );
};

export default RecipientType;
