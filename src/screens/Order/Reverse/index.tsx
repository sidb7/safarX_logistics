import React, { useEffect, useState } from "react";
import ReverDummyJson from "./reverseDummy.json";
import CustomInputBox from "../../../components/Input";

const ReverseIndex = () => {
  const [actualArray, setActualArray] = useState([]);
  const [isActiveItemAccordionOpen, setIsActiveItemAccordionOpen] =
    useState(false);
  const [activeItem, setActiveItem] = useState();
  let productsArray: any = [];

  useEffect(() => {
    let temp: any = ReverDummyJson?.[0]?.data?.[0];
    console.log("🚀 ~ useEffect ~ temp:", temp);
    // get all products from box object
    for (let i = 0; i < temp?.boxInfo?.length; i++) {
      productsArray.push(...temp?.boxInfo?.[i]?.products);
    }

    // console.log("productsArray", productsArray);
    let newDataArray: any = [];
    if (temp["pickupAddress"]) {
      newDataArray.push({
        title: "Pickup Address",
        data: temp["pickupAddress"],
      });
    }
    // push Pickup Date and Time array in newDataArray[]
    newDataArray.push({
      title: "Pickup Date and Time",
    });

    if (temp["deliveryAddress"]) {
      newDataArray.push({
        title: "Delivery Address",
        data: temp["deliveryAddress"],
      });
    }
    if (temp["boxInfo"]) {
      newDataArray.push({
        title: "Products",
        data: productsArray,
      });
    }
    if (temp["boxInfo"]) {
      newDataArray.push({
        title: "Box",
        data: temp["boxInfo"],
      });
    }
    // push in array reverse service

    newDataArray.push({
      title: "Reverse Service",
      data: [],
    });

    setActualArray(newDataArray);
  }, []);

  // console.log("newDataArray", newDataArray);

  const setActiveAccordian = (index: any) => {
    // console.log("🚀 ~ setActiveAccordian ~ index:", index);
    actualArray.forEach((element: any, i: number) => {
      if (i === index) {
        setActiveItem(index);
        element.isActive = !element.isActive;
        // setIsActiveItemAccordionOpen(true);
      } else {
        element.isActive = false;
        // setIsActiveItemAccordionOpen(false);
      }
    });
    // console.log("🚀 ~ actualArray.forEach ~ actualArray:", actualArray);

    setActualArray(actualArray);
  };

  // console.log("actualArray", actualArray);

  return (
    <div className=" flex flex-col gap-2">
      {actualArray?.map((item: any, i: number) => {
        return (
          <div className="accordionContainerBoxStyle">
            <div
              className={`cursor-pointer px-4 py-3 flex justify-between items-center
            ${
              activeItem === i
                ? "bg-[#F6F6F6] rounded-none rounded-t-lg"
                : "bg-white"
            }`}
              onClick={() => setActiveAccordian(i)}
              key={i}
            >
              <div className="flex basis-[90%] items-center gap-x-2">
                <div className="text-[16px] font-semibold font-Open text-[#1C1C1C] leading-tight">
                  {item?.title}
                </div>
              </div>
              <svg
                className={`w-5 h-5 transform ${
                  activeItem === i ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {/* Pickup Address Accordian */}
            {activeItem === i && item?.title === "Pickup Address" && (
              <div className="m-5 h-[500]px gap-[10px] flex flex-col overflow-auto border p-[0.5rem]">
                <div className="flex gap-2 mt-[10px] ">
                  <CustomInputBox
                    label="Contact Person"
                    value={item?.data?.contact?.name}
                    isDisabled={true}
                  />
                  <CustomInputBox
                    label="Contact No"
                    value={item?.data?.contact?.mobileNo}
                    isDisabled={true}
                  />
                </div>
                <div className="">
                  <CustomInputBox
                    label="Email Id"
                    value={item?.data?.contact?.emailId}
                    isDisabled={true}
                  />
                </div>
                <div className="">
                  <CustomInputBox
                    label="Plot no., floor, building name "
                    value={item?.data?.fullAddress}
                    isDisabled={true}
                  />
                </div>
                <div className="flex gap-2 ">
                  <CustomInputBox
                    label="Locality"
                    value={item?.data?.locality}
                    isDisabled={true}
                  />
                  <CustomInputBox
                    label="Landmark"
                    value={item?.data?.landmark}
                    isDisabled={true}
                  />
                </div>
                <div className="flex gap-2 ">
                  <CustomInputBox
                    label="Pincode"
                    value={item?.data?.pincode}
                    isDisabled={true}
                  />
                  <CustomInputBox
                    label="City"
                    value={item?.data?.city}
                    isDisabled={true}
                  />
                </div>
                <div className="flex gap-2 ">
                  <CustomInputBox
                    label="State"
                    value={item?.data?.state}
                    isDisabled={true}
                  />
                  <CustomInputBox
                    label="Country"
                    value={item?.data?.country}
                    isDisabled={true}
                  />
                </div>
              </div>
            )}
            {/* Delivery Address Accordian */}
            {activeItem === i && item?.title === "Delivery Address" && (
              <div className="m-5 h-[500]px gap-[10px] flex flex-col overflow-auto border p-[0.5rem]">
                {console.log("item", item) as any}
                <div className="flex gap-2 mt-[10px] ">
                  <CustomInputBox
                    label="Contact Person"
                    value={item?.data?.contact?.name}
                    isDisabled={true}
                  />
                  <CustomInputBox
                    label="Contact No"
                    value={item?.data?.contact?.mobileNo}
                    isDisabled={true}
                  />
                </div>
                <div className="">
                  <CustomInputBox
                    label="Email Id"
                    value={item?.data?.contact?.emailId}
                    isDisabled={true}
                  />
                </div>
                <div className="">
                  <CustomInputBox
                    label="Plot no., floor, building name "
                    value={item?.data?.fullAddress}
                    isDisabled={true}
                  />
                </div>
                <div className="flex gap-2 ">
                  <CustomInputBox
                    label="Locality"
                    value={item?.data?.locality}
                    isDisabled={true}
                  />
                  <CustomInputBox
                    label="Landmark"
                    value={item?.data?.landmark}
                    isDisabled={true}
                  />
                </div>
                <div className="flex gap-2 ">
                  <CustomInputBox
                    label="Pincode"
                    value={item?.data?.pincode}
                    isDisabled={true}
                  />
                  <CustomInputBox
                    label="City"
                    value={item?.data?.city}
                    isDisabled={true}
                  />
                </div>
                <div className="flex gap-2 ">
                  <CustomInputBox
                    label="State"
                    value={item?.data?.state}
                    isDisabled={true}
                  />
                  <CustomInputBox
                    label="Country"
                    value={item?.data?.country}
                    isDisabled={true}
                  />
                </div>
              </div>
            )}
            {/* Products Accordian*/}
            {activeItem === i && item?.title === "Products" && (
              <div className="m-5 h-[500]px gap-[10px] flex flex-col overflow-auto border p-[0.5rem]">
                {console.log("item", item) as any}
                {item?.data?.map((ele: any, j: number) => {
                  console.log("🚀 ~ {productsArray?.map ~ ele:", ele);
                  return (
                    <div className="accordionContainerBoxStyle">
                      <div
                        className={`cursor-pointer px-4 py-3 flex justify-between items-center
                    ${
                      j === 0
                        ? "bg-[#F6F6F6] rounded-none rounded-t-lg"
                        : "bg-white"
                    }`}
                        onClick={() => setActiveAccordian(i)}
                        key={j}
                      >
                        <div className="flex basis-[90%] items-center gap-x-2">
                          <div className="text-[16px] font-semibold font-Open text-[#1C1C1C] leading-tight">
                            {ele?.name}
                          </div>
                        </div>
                        <svg
                          className={`w-5 h-5 transform ${
                            j === 0 ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      {/* nested accordian expand */}
                      <div>
                        <div className="flex pt-[21px]">
                          <p className="font-Open text-[12px] font-semibold">
                            Product Quantity:
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReverseIndex;
