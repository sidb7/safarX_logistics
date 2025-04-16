import React, { useState } from "react";
import Collapsible from "../../components/OneComponents/Collapsible";
import OneButton from "../../components/Button/OneButton";
import CustomInputBox from "../../components/Input"; // Using the existing component
import AutoGenerateIcon from "../../assets/Product/autogenerate.svg"; // Update path if needed
import RadioButton from "../../components/RadioButton/Index";
import AddressForm from "./AddressForm";

const OrderDetails = () => {
  const [order, setOrder] = useState({ orderId: "", orderType: "B2C" });

  const [sortServiciblity, setSortServiciblity] = useState("");
  const [highLightField, setHighLightField] = useState({
    addressDetails: false,
    packageDetails: false,
    orderDetails: false,
    shippingDetails: false,
    pickupTimeDetails: false,
  });
  const [showDownloadLebal, setShowDownloadLebal] = useState(false);
  const [visibility, setVisibility] = useState(false);

  // Function to generate a unique code
  const generateUniqueCode = (minLength: any, maxLength: any) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length =
      Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let code = "";

    while (code.length < length) {
      const randomIndex = Math.random() * charset.length;
      const randomIndexOnFloor = Math.floor(randomIndex);
      code += charset.charAt(randomIndexOnFloor);
    }

    return code;
  };

  // Function to handle order type change
  const handleOrderTypeChange = (type: string) => {
    setOrder((prevState) => ({
      ...prevState,
      orderType: type,
    }));
  };

  return (
    <>
      <Collapsible title="Order Information" className="mb-10">
        <>
          <div className="flex items-center justify-between mb-4 ">
            <OneButton
              text={"Parcel"}
              onClick={() => console.log("Parcel clicked")}
              variant="primary"
              className="!rounded-full !w-[100px]"
            />

            {/* Reduced width input container */}
            <div className="w-80">
              <CustomInputBox
                isRightIcon={true}
                containerStyle=""
                rightIcon={AutoGenerateIcon}
                className={`!text-base !font-semibold`}
                imageClassName="!h-[12px] !z-0 !w-[113px] !top-[40%] "
                value={order?.orderId || ""}
                maxLength={12}
                label="Order ID"
                onChange={(e) => {
                  setOrder((prevState) => {
                    return {
                      ...prevState,
                      orderId: e.target.value,
                    };
                  });
                  setSortServiciblity("");
                  setHighLightField({
                    addressDetails: false,
                    packageDetails: false,
                    shippingDetails: false,
                    orderDetails: true,
                    pickupTimeDetails: false,
                  });
                }}
                isDisabled={showDownloadLebal}
                onClick={() => {
                  const orderId = generateUniqueCode(8, 12);
                  setOrder((prevState) => {
                    return { ...prevState, orderId: orderId };
                  });
                  setSortServiciblity("");
                  setHighLightField({
                    addressDetails: false,
                    packageDetails: false,
                    shippingDetails: false,
                    orderDetails: true,
                    pickupTimeDetails: false,
                  });
                }}
                visibility={visibility}
                setVisibility={setVisibility}
                name="orderId"
                data-cy="auto-generate-order-id"
              />
            </div>
          </div>

          {/* Order Type Radio Buttons */}
          <div className="mt-4 mb-4">
            <div className="flex gap-5">
              <div className="flex  items-center">
                <input
                  type="radio"
                  id="b2c"
                  name="orderType"
                  value="B2C"
                  className="mr-2 w-[15px] cursor-pointer h-[15px]"
                  checked={order.orderType === "B2C"}
                  onChange={() => handleOrderTypeChange("B2C")}
                />
                <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
                  B2C
                </span>
              </div>

              <div className="flex  items-center">
                <input
                  type="radio"
                  id="b2b"
                  name="orderType"
                  value="B2B"
                  className="mr-2 w-[15px] cursor-pointer h-[15px]"
                  checked={order.orderType === "B2B"}
                  onChange={() => handleOrderTypeChange("B2B")}
                />
                <span className="font-semibold text-sm font-Open leading-[18px] text-[#323232]">
                  B2B
                </span>
              </div>

              <div className="flex  items-center ">
                <input
                  type="radio"
                  id="sprint"
                  name="orderType"
                  value="SPRINT"
                  className="mr-2 w-[15px] cursor-pointer h-[15px] "
                  checked={order.orderType === "SPRINT"}
                  onChange={() => handleOrderTypeChange("SPRINT")}
                  disabled={true}
                />
                <div className="text-sm font-Open leading-[18px] mt-5">
                  <span className="font-semibold text-gray-500">
                    SPRINT (Coming Soon)
                  </span>
                  <div className="text-gray-500">
                    (For same day and next day delivery)
                  </div>
                </div>
              </div>
            </div>
          </div>



        </>
      </Collapsible>

      <Collapsible title="Where should we pick up and deliver your order?" className="mb-10">
        <>
          <AddressForm/>
        </>
      </Collapsible>
    </>
  );
};

export default OrderDetails;
