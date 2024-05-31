import React, { useEffect, useState } from "react";
import ReverDummyJson from "./reverseDummy.json";
import CustomInputBox from "../../../components/Input";
import AddCircleBlack from "../../../assets/add-circle_black.svg";
import MinusCircle from "../../../assets/subtract-circle.svg";
import { POST } from "../../../utils/webService";
import {
  GET_SELLER_ORDER_COMPLETE_DATA,
  POST_SERVICEABILITY,
} from "../../../utils/ApiUrls";
import CustomDropDown from "../../../components/DropDown";
import SelectDateModalContent from "./dateTime";
import CustomButton from "../../../components/Button";
import Checkbox from "../../../components/CheckBox";

interface ReverseProps {
  awbData?: any;
}

const ReverseIndex = (props: ReverseProps) => {
  const { awbData } = props;
  const [actualArray, setActualArray] = useState([]);
  const [isActiveItemAccordionOpen, setIsActiveItemAccordionOpen] =
    useState(false);
  const [prentActiveItem, setPrentActiveItem] = useState<number>();
  const [nestedProductAccordian, setNestedProductAccordian] =
    useState<number>();
  const [nestedBoxAccordian, setNestedBoxAccordian] = useState<number>();
  const [serviceArray, setServiceArray] = useState<any>();
  const [serviceOptionValue, setServiceOptionValue] = useState<any>("");
  const [pickupDate, setPickupDate] = useState("");

  let productsArray: any = [];

  useEffect(() => {
    let awbNo: any = awbData?.data;

    // call reverse service api
    const callReverseServiceAPI = async () => {
      try {
        const payload = {
          pickupPincode: 400018,
          deliveryPincode: 400020,
          invoiceValue: 1000,
          paymentMode: "COD",
          serviceId: "a07d01f5",
          weight: 1.5,
          orderType: "B2C",
          transit: "REVERSE",
          dimension: { length: 1, width: 1, height: 1 },
        };
        const response = await POST(POST_SERVICEABILITY, payload);
        console.log("🚀 ~ callReverseServiceAPI ~ response:", response);
        // let serviceOption: any = [];
        // for (let j = 0; j < response?.data?.data?.length; j++) {
        //   serviceOption.push({
        //     // label: response?.data?.data?.[j]?.partnerServiceName,
        //     label: `
        //     <div className="flex flex-row justify-between p-2 w-full">
        //       <div className="flex ">
        //         <span className="font-Open text-[14px] mr-1 font-normal text-[#494949]">
        //           Bluedart
        //         </span>

        //         <span className="font-Open ml-1 text-[14px] font-normal text-[#494949]">
        //           : Reverse Surface
        //         </span>
        //       </div>
        //       <div className="flex font-Open text-[14px] font-normal">
        //         <span>₹</span>
        //         <span>101</span>
        //       </div>
        //     </div>
        //     <hr />
        //   `,
        //     value: response?.data?.data?.[j]?.partnerServiceId,
        //   });
        // }

        // setServiceArray(serviceOption);
        setServiceArray(response?.data?.data);
      } catch (error) {}
    };

    // call service api
    (async () => {
      try {
        const payload = {
          awb: awbNo,
        };
        const response = await POST(GET_SELLER_ORDER_COMPLETE_DATA, payload);
        if (response?.data?.status) {
          let responsData = response?.data?.data?.[0]?.data?.[0];
          // get all products from box object
          for (let i = 0; i < responsData?.boxInfo?.length; i++) {
            productsArray.push(...responsData?.boxInfo?.[i]?.products);
          }
          let newDataArray: any = [];
          if (responsData["pickupAddress"]) {
            newDataArray.push({
              title: "Pickup Address",
              data: responsData["pickupAddress"],
            });
          }
          // push Pickup Date and Time array in newDataArray[]
          newDataArray.push({
            title: "Pickup Date and Time",
          });

          if (responsData["deliveryAddress"]) {
            newDataArray.push({
              title: "Delivery Address",
              data: responsData["deliveryAddress"],
            });
          }
          if (responsData["boxInfo"]) {
            newDataArray.push({
              title: "Products",
              data: productsArray,
            });
          }
          if (responsData["boxInfo"]) {
            newDataArray.push({
              title: "Box",
              data: responsData["boxInfo"],
            });
          }
          // push in array reverse service
          newDataArray.push({
            title: "Reverse Service",
            data: [],
          });

          setActualArray(newDataArray);

          callReverseServiceAPI();
        } else {
          //services
        }
      } catch (error) {}
    })(); // Immediately invoke the async function
  }, []);

  const handleCheck = (ele: any) => {
    console.log("ele", ele?.target?.name);
  };

  const addQtyProduct = (j: any) => {
    let qty: any = document.getElementsByClassName(`qtyProduct_${j}`);
    qty = qty?.value;
  };

  const minusQtyProduct = (j: any) => {
    let qty: any = document.getElementsByClassName(`qtyProduct_${j}`);
    qty = qty?.[0]?.value - 1;
    console.log("🚀 ~ minusQtyProduct ~ qty:", qty);
  };

  const handlePickupTimeSelected = (pickupTime: string) => {
    console.log("🚀 ~ handlePickupTimeSelected ~ pickupTime:", pickupTime);
    // setPickupDate(pickupTime);
    // const editedPickupDateForEpoch = pickupTime?.substring(0, 19);
    // epochPickupDate(convertToEpoch(editedPickupDateForEpoch));
  };

  return (
    <div className="relative h-[90vh] px-4">
      <div className="flex flex-col gap-2">
        {actualArray?.map((item: any, i: number) => {
          console.log("🚀 ~ {actualArray?.map ~ item:", item);
          return (
            <div className="accordionContainerBoxStyle">
              <div
                className={`cursor-pointer px-4 py-3 flex justify-between items-center
            ${
              prentActiveItem === i
                ? "bg-[#F6F6F6] rounded-none rounded-t-lg"
                : "bg-white"
            }`}
                onClick={() => setPrentActiveItem(i)}
                key={i}
              >
                <div className="flex basis-[90%] items-center gap-x-2">
                  <div className="text-[16px] font-semibold font-Open text-[#1C1C1C] leading-tight">
                    {item?.title}
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 transform ${
                    prentActiveItem === i ? "rotate-180" : ""
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
              {prentActiveItem === i && item?.title === "Pickup Address" && (
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
              {prentActiveItem === i && item?.title === "Delivery Address" && (
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
              {/* Products Accordian*/}
              {prentActiveItem === i && item?.title === "Products" && (
                <div className="m-5 h-[500]px gap-[10px] flex flex-col overflow-auto border p-[0.5rem]">
                  {item?.data?.map((ele: any, j: number) => {
                    return (
                      <div className="accordionContainerBoxStyle">
                        <div
                          className={`cursor-pointer px-4 py-3 flex justify-between items-center
                    ${
                      j === 0
                        ? "bg-[#F6F6F6] rounded-none rounded-t-lg"
                        : "bg-white"
                    }`}
                          onClick={() => setNestedProductAccordian(j)}
                          key={j}
                        >
                          <div className="flex basis-[90%] items-center gap-x-2">
                            <div className="text-[16px] font-semibold font-Open text-[#1C1C1C] leading-tight">
                              {ele?.name}
                            </div>
                          </div>
                          <svg
                            className={`w-5 h-5 transform ${
                              nestedProductAccordian === j ? "rotate-180" : ""
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
                        {nestedProductAccordian === j && (
                          <div className="p-[10px]">
                            <div className="flex justify-between">
                              <p className="font-Open text-[12px] font-semibold self-center">
                                Box Quantity:
                              </p>
                              <div className="flex gap-2">
                                <img
                                  src={MinusCircle}
                                  className="cursor-pointer"
                                  onClick={() => minusQtyProduct(j)}
                                />
                                <input
                                  type="text"
                                  className={`w-[12px] p-0 qtyProduct_${j}`}
                                  value={2}
                                />
                                <img
                                  src={AddCircleBlack}
                                  className="cursor-pointer"
                                  onClick={() => addQtyProduct(j)}
                                />
                              </div>
                            </div>
                            <div className="flex gap-2 mb-[10px]">
                              <CustomInputBox
                                label="Dead Weight"
                                value={ele?.deadWeight}
                                isDisabled={true}
                              />
                              <CustomInputBox
                                label="Volumentric Weight"
                                value={ele?.volumetricWeight}
                                isDisabled={true}
                              />
                            </div>
                            <div className="flex gap-2">
                              <CustomInputBox
                                label="Mesurement Unit"
                                value={ele?.measureUnit}
                                isDisabled={true}
                              />
                              <div className="flex gap-2">
                                <CustomInputBox
                                  label="L"
                                  value={ele?.length}
                                  isDisabled={true}
                                />
                                <CustomInputBox
                                  label="B"
                                  value={ele?.breadth}
                                  isDisabled={true}
                                />
                                <CustomInputBox
                                  label="H"
                                  value={ele?.height}
                                  isDisabled={true}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {/* Box Accordian*/}
              {prentActiveItem === i && item?.title === "Box" && (
                <div className="m-5 h-[500]px gap-[10px] flex flex-col overflow-auto border p-[0.5rem]">
                  {item?.data?.map((ele: any, j: number) => {
                    return (
                      <div className="accordionContainerBoxStyle">
                        <div
                          className={`cursor-pointer px-4 py-3 flex justify-between items-center
                          ${
                            j === 0
                              ? "bg-[#F6F6F6] rounded-none rounded-t-lg"
                              : "bg-white"
                          }`}
                          onClick={() => setNestedBoxAccordian(j)}
                          key={j}
                        >
                          <div className="flex basis-[90%] items-center gap-x-2">
                            <div className="text-[16px] font-semibold font-Open text-[#1C1C1C] leading-tight">
                              {ele?.name}
                            </div>
                          </div>
                          <svg
                            className={`w-5 h-5 transform ${
                              nestedBoxAccordian === j ? "rotate-180" : ""
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
                        {nestedBoxAccordian === j && (
                          <div className="p-[10px]">
                            <div className="flex gap-2 mb-[10px]">
                              <CustomInputBox
                                label="Dead Weight"
                                value={ele?.deadWeight}
                                isDisabled={true}
                              />
                              <CustomInputBox
                                label="Volumentric Weight"
                                value={ele?.volumetricWeight}
                                isDisabled={true}
                              />
                            </div>
                            <div className="flex gap-2">
                              <CustomInputBox
                                label="Mesurement Unit"
                                value={ele?.measureUnit}
                                isDisabled={true}
                              />
                              <div className="flex gap-2">
                                <CustomInputBox
                                  label="L"
                                  value={ele?.length}
                                  isDisabled={true}
                                />
                                <CustomInputBox
                                  label="B"
                                  value={ele?.breadth}
                                  isDisabled={true}
                                />
                                <CustomInputBox
                                  label="H"
                                  value={ele?.height}
                                  isDisabled={true}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {/* Delivery Address Accordian */}
              {prentActiveItem === i && item?.title === "Reverse Service" && (
                <div className="m-5 max-h-[200px] overflow-auto">
                  {/* <CustomDropDownWithHTML
                    value={serviceOptionValue}
                    options={serviceArray}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                      setServiceOptionValue(event.target.value);
                    }}
                    wrapperClass="w-full mb-4 lg:mb-0 "
                    heading="Select Reverse Service"
                  /> */}
                  {serviceArray?.map((el: any, index: number) => {
                    return (
                      <div className="flex">
                        <Checkbox
                          key={index}
                          checked={false}
                          onChange={(element: any) => {
                            handleCheck(element);
                          }}
                          name={el?.partnerServiceId}
                          label={""}
                          style={{ accentColor: "black" }}
                          // checkboxClassName="gap-2 mt-1"
                        />
                        <div className="flex flex-row justify-between p-2 w-full">
                          <div className="flex ">
                            <span className="font-Open text-[14px] mr-1 font-normal text-[#494949]">
                              {el?.partnerServiceName}
                            </span>

                            <span className="font-Open ml-1 text-[14px] font-normal text-[#494949]">
                              : Reverse {el?.serviceMode}
                            </span>
                          </div>
                          <div className="flex font-Open text-[14px] font-normal">
                            <span>₹</span>
                            <span className="ml-0">{el?.total}</span>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              )}
              {/* Pickup Date and Time Accordian */}
              {prentActiveItem === i &&
                item?.title === "Pickup Date and Time" && (
                  <SelectDateModalContent
                    onPickupTimeSelected={handlePickupTimeSelected}
                  />
                )}
            </div>
          );
        })}
        <div className="absolute w-[93%] bottom-6">
          <CustomButton text={"Next"} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default ReverseIndex;
