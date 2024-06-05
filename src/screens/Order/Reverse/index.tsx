import React, { useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import { parse } from "date-fns";

interface ReverseProps {
  awbData?: any;
  summaryData?: any;
}

let reverseServiceArrayTemp: any = [];

const ReverseIndex = (props: ReverseProps) => {
  const { awbData, summaryData } = props;
  const [actualArray, setActualArray] = useState([]);
  const [prentActiveItem, setPrentActiveItem] = useState<number>();
  const [nestedProductAccordian, setNestedProductAccordian] =
    useState<number>();
  const [nestedBoxAccordian, setNestedBoxAccordian] = useState<number>();
  const [serviceArray, setServiceArray] = useState<any>();
  const [pickupDate, setPickupDate] = useState("");
  const [productArray, setProductArray]: any = useState();
  const [productCopyArray, setProductCopyArray]: any = useState();

  const [boxArray, setBoxArray]: any = useState();
  const [pickupAddress, setPickupAddress] = useState({
    contactPerson: "",
    contactNo: "",
    emailId: "",
    buildingName: "",
    locality: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });
  const [deliveryAddress, setDeliveryAddress] = useState({
    contactPerson: "",
    contactNo: "",
    emailId: "",
    buildingName: "",
    locality: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });
  const [reverseSeviceArray, setReverseSeviceArray]: any = useState([]);
  const [restInfo, setRestInfo]: any = useState(); // it only store info and use in reverse order time in payload

  let productsArray: any = [];

  // call reverse service api
  const callReverseServiceAPI = async (responsData: any) => {
    // console.log("🚀 ~ callReverseServiceAPI ~ responsData:", responsData);
    try {
      const payload = {
        pickupPincode: responsData["deliveryAddress"]?.pincode,
        deliveryPincode: responsData["pickupAddress"]?.pincode,
        invoiceValue: responsData?.boxInfo?.[0]?.codInfo?.invoiceValue,
        paymentMode: responsData?.boxInfo?.[0]?.codInfo?.isCod
          ? "COD"
          : "PREPAID",
        // serviceId: "a07d01f5",
        weight: responsData?.boxInfo?.[0]?.appliedWeight,
        orderType: "B2C",
        transit: "REVERSE",
        dimension: {
          length: responsData?.boxInfo?.[0]?.length,
          width: responsData?.boxInfo?.[0]?.breadth,
          height: responsData?.boxInfo?.[0]?.height,
        },
      };
      const response = await POST(POST_SERVICEABILITY, payload);
      setServiceArray(response?.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    let awbNo: any = awbData?.data;

    // call service api
    (async () => {
      try {
        const payload = {
          awb: awbNo,
        };
        const response = await POST(GET_SELLER_ORDER_COMPLETE_DATA, payload);
        if (response?.data?.status) {
          let responsData = response?.data?.data?.[0]?.data?.[0];
          setRestInfo(responsData);
          // get all products from box object
          for (let i = 0; i < responsData?.boxInfo?.length; i++) {
            productsArray.push(...responsData?.boxInfo?.[i]?.products);
          }
          let newDataArray: any = [];
          if (responsData["deliveryAddress"]) {
            newDataArray.push({
              title: "Pickup Address",
            });
            setPickupAddress((prevState) => ({
              ...prevState,
              contactPerson: responsData["deliveryAddress"]?.contact?.name,
              contactNo: responsData["deliveryAddress"]?.contact?.mobileNo,
              emailId: responsData["deliveryAddress"]?.contact?.emailId,
              buildingName: responsData["deliveryAddress"]?.fullAddress,
              locality: responsData["deliveryAddress"]?.locality,
              landmark: responsData["deliveryAddress"]?.landmark,
              pincode: responsData["deliveryAddress"]?.pincode,
              city: responsData["deliveryAddress"]?.city,
              state: responsData["deliveryAddress"]?.state,
              country: responsData["deliveryAddress"]?.country,
            }));
          }
          // push Pickup Date and Time array in newDataArray[]
          newDataArray.push({
            title: "Pickup Date and Time",
          });

          if (responsData["pickupAddress"]) {
            newDataArray.push({
              title: "Delivery Address",
            });
            setDeliveryAddress((prevState) => ({
              ...prevState,
              contactPerson: responsData["pickupAddress"]?.contact?.name,
              contactNo: responsData["pickupAddress"]?.contact?.mobileNo,
              emailId: responsData["pickupAddress"]?.contact?.emailId,
              buildingName: responsData["pickupAddress"]?.fullAddress,
              locality: responsData["pickupAddress"]?.locality,
              landmark: responsData["pickupAddress"]?.landmark,
              pincode: responsData["pickupAddress"]?.pincode,
              city: responsData["pickupAddress"]?.city,
              state: responsData["pickupAddress"]?.state,
              country: responsData["pickupAddress"]?.country,
            }));
          }
          if (responsData["boxInfo"]) {
            newDataArray.push({
              title: "Products",
            });
            setProductArray(productsArray);
            // copy product array in new state
            setProductCopyArray(productsArray);
          }
          if (responsData["boxInfo"]) {
            newDataArray.push({
              title: "Box",
            });
            setBoxArray(responsData["boxInfo"]);
          }
          // push in array reverse service
          newDataArray.push({
            title: "Reverse Service",
          });

          setActualArray(newDataArray);

          callReverseServiceAPI(responsData);
        } else {
          //services
        }
      } catch (error) {}
    })(); // Immediately invoke the async function
  }, []);

  const handleCheck = (ele: any, index: number) => {
    let tempArr = serviceArray;
    tempArr?.forEach((element: any) => {
      element.isChecked = false;
    });
    tempArr[index].isChecked = true;
    setServiceArray([...tempArr]);

    // if (ele?.target?.checked) {
    //   reverseServiceArrayTemp.push(ele.target.name);
    //   // this function are used to get unique value from array
    //   const uniqueArray = reverseServiceArrayTemp.reduce(
    //     (accumulator: any, currentValue: any) => {
    //       if (!accumulator.includes(currentValue)) {
    //         accumulator.push(currentValue);
    //       }
    //       return accumulator;
    //     },
    //     []
    //   );
    //   setReverseSeviceArray(uniqueArray);
    // } else {
    //   let filterValue = reverseSeviceArray.filter(
    //     (item: any) => item !== ele?.target?.name
    //   );
    //   setReverseSeviceArray(filterValue);
    // }
  };

  const addQtyProduct = (j: any) => {
    let qtyElements: any = document.getElementsByClassName(`qtyProduct_${j}`);
    if (qtyElements.length > 0) {
      // Access the first element in the collection
      let qtyElement = qtyElements[0];

      // Ensure the element has a value and it's a number
      if (qtyElement.value && !isNaN(qtyElement.value)) {
        // Parse the current value as an integer
        let currentQty = parseInt(qtyElement.value, 10);

        // Subtract 1 from the current value
        let newQty = currentQty + 1;

        for (let i = 0; i < productCopyArray?.length; i++) {
          if (i === j) {
            // here we check from productCopyArray object is qty is not greaterthan newQty value
            if (productCopyArray[j].qty >= newQty) {
              qtyElement.value = newQty;
              productArray[j].qty = newQty;
            } else {
              toast.error("Qty is not update");
            }
            break;
          }
        }
      } else {
        console.error("The value of the element is not a number.");
      }
    } else {
      console.error(`No elements found with the class name qtyProduct_${j}`);
    }
  };

  const minusQtyProduct = (j: any) => {
    let qtyElements: any = document.getElementsByClassName(`qtyProduct_${j}`);
    if (qtyElements.length > 0) {
      // Access the first element in the collection
      let qtyElement = qtyElements[0];

      // Ensure the element has a value and it's a number
      if (qtyElement.value && !isNaN(qtyElement.value)) {
        // Parse the current value as an integer
        let currentQty = parseInt(qtyElement.value, 10);

        // Subtract 1 from the current value
        let newQty = currentQty - 1;

        for (let i = 0; i < productCopyArray?.length; i++) {
          if (newQty >= 0) {
            // here we check from productCopyArray object is qty is not greaterthan newQty value
            if (productCopyArray[j].qty >= newQty) {
              qtyElement.value = newQty;
              productArray[j].qty = newQty;
            } else {
              toast.error("Qty is not less than 0");
            }
            break;
          } else {
            toast.error(`Qty is not less than zero ${i}`);
            break;
          }
        }
      } else {
        console.error("The value of the element is not a number.");
      }
    } else {
      console.error(`No elements found with the class name qtyProduct_${j}`);
    }
  };

  function convertToEpoch(dateTimeString: any) {
    const parsedDateTime = parse(
      dateTimeString,
      "dd/MM/yyyy hh:mm a",
      new Date()
    );
    return Math.floor(parsedDateTime.getTime());
  }

  const handlePickupTimeSelected = (pickupTime: string) => {
    // console.log("🚀 ~ handlePickupTimeSelected ~ pickupTime:", pickupTime);
    let editedPickupDateForEpoch: any = pickupTime?.substring(0, 19);
    editedPickupDateForEpoch = convertToEpoch(editedPickupDateForEpoch);
    setPickupDate(editedPickupDateForEpoch);

    // console.log(
    //   "🚀 ~ handlePickupTimeSelected ~ editedPickupDateForEpoch:",
    //   editedPickupDateForEpoch
    // );
  };

  const handlePickupInputChange = (event: any) => {
    const { name, value } = event.target;
    setPickupAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeliveryInputChange = (event: any) => {
    const { name, value } = event.target;
    setDeliveryAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlerSubmit = () => {
    let summaryTemp: any = {
      pickupAddress: pickupAddress,
      pickupTime: pickupDate,
      deliveryAddress: deliveryAddress,
      productArray: productArray,
      boxArray: boxArray,
      reverseSeviceArray: serviceArray,
      restInfo: restInfo,
    };
    summaryData(summaryTemp);
  };
  return (
    <div className="relative h-[90vh] px-4">
      <div className="flex flex-col gap-2">
        {actualArray?.map((item: any, i: number) => {
          // console.log("🚀 ~ {actualArray?.map ~ item:", item);
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
                      value={pickupAddress?.contactPerson}
                      name="contactPerson"
                      onChange={handlePickupInputChange}
                    />
                    <CustomInputBox
                      label="Contact No"
                      value={pickupAddress?.contactNo}
                      name="contactNo"
                      onChange={handlePickupInputChange}
                    />
                  </div>
                  <div className="">
                    <CustomInputBox
                      label="Email Id"
                      value={pickupAddress?.emailId}
                      name="emailId"
                      onChange={handlePickupInputChange}
                    />
                  </div>
                  <div className="">
                    <CustomInputBox
                      label="Plot no., floor, building name "
                      value={pickupAddress?.buildingName}
                      name="buildingName"
                      onChange={handlePickupInputChange}
                    />
                  </div>
                  <div className="flex gap-2 ">
                    <CustomInputBox
                      label="Locality"
                      value={pickupAddress?.locality}
                      name="locality"
                      onChange={handlePickupInputChange}
                    />
                    <CustomInputBox
                      label="Landmark"
                      value={pickupAddress?.landmark}
                      name="landmark"
                      onChange={handlePickupInputChange}
                    />
                  </div>
                  <div className="flex gap-2 ">
                    <CustomInputBox
                      label="Pincode"
                      value={pickupAddress?.pincode}
                      name="pincode"
                      onChange={handlePickupInputChange}
                    />
                    <CustomInputBox
                      label="City"
                      value={pickupAddress?.city}
                      name="city"
                      onChange={handlePickupInputChange}
                    />
                  </div>
                  <div className="flex gap-2 ">
                    <CustomInputBox
                      label="State"
                      value={pickupAddress?.state}
                      name="state"
                      onChange={handlePickupInputChange}
                    />
                    <CustomInputBox
                      label="Country"
                      value={pickupAddress?.country}
                      name="country"
                      onChange={handlePickupInputChange}
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
                      value={deliveryAddress?.contactPerson}
                      name="contactPerson"
                      onChange={handleDeliveryInputChange}
                    />
                    <CustomInputBox
                      label="Contact No"
                      value={deliveryAddress?.contactNo}
                      name="contactNo"
                      onChange={handleDeliveryInputChange}
                    />
                  </div>
                  <div className="">
                    <CustomInputBox
                      label="Email Id"
                      value={deliveryAddress?.emailId}
                      name="emailId"
                      onChange={handleDeliveryInputChange}
                    />
                  </div>
                  <div className="">
                    <CustomInputBox
                      label="Plot no., floor, building name "
                      value={deliveryAddress?.buildingName}
                      name="buildingName"
                      onChange={handleDeliveryInputChange}
                    />
                  </div>
                  <div className="flex gap-2 ">
                    <CustomInputBox
                      label="Locality"
                      value={deliveryAddress?.locality}
                      name="locality"
                      onChange={handleDeliveryInputChange}
                    />
                    <CustomInputBox
                      label="Landmark"
                      value={deliveryAddress?.landmark}
                      name="landmark"
                      onChange={handleDeliveryInputChange}
                    />
                  </div>
                  <div className="flex gap-2 ">
                    <CustomInputBox
                      label="Pincode"
                      value={deliveryAddress?.pincode}
                      name="pincode"
                      onChange={handleDeliveryInputChange}
                    />
                    <CustomInputBox
                      label="City"
                      value={deliveryAddress?.city}
                      name="city"
                      onChange={handleDeliveryInputChange}
                    />
                  </div>
                  <div className="flex gap-2 ">
                    <CustomInputBox
                      label="State"
                      value={deliveryAddress?.state}
                      name="state"
                      onChange={handleDeliveryInputChange}
                    />
                    <CustomInputBox
                      label="Country"
                      value={deliveryAddress?.country}
                      name="country"
                      onChange={handleDeliveryInputChange}
                    />
                  </div>
                </div>
              )}
              {/* Products Accordian*/}
              {prentActiveItem === i && item?.title === "Products" && (
                <div className="m-5 h-[500]px gap-[10px] flex flex-col overflow-auto border p-[0.5rem]">
                  {productArray?.map((ele: any, j: number) => {
                    console.log("🚀 ~ {item?.data?.map ~ ele:", ele);
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
                                Product Quantity:
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
                                  value={ele?.qty}
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
                  {boxArray?.map((ele: any, j: number) => {
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
              {/* {console.log("serviceArray", serviceArray)} */}
              {prentActiveItem === i && item?.title === "Reverse Service" && (
                <div className="m-5 max-h-[200px] overflow-auto">
                  {serviceArray?.map((el: any, index: number) => {
                    // console.log("🚀 ~ {serviceArray?.map ~ el:", el);
                    return (
                      <div className="flex" key={index}>
                        <Checkbox
                          key={index}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleCheck(event, index);
                          }}
                          name={el?.partnerServiceName}
                          label={""}
                          style={{ accentColor: "black" }}
                          checked={el.isChecked}
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
          <CustomButton text={"Next"} onClick={() => handlerSubmit()} />
        </div>
      </div>
    </div>
  );
};

export default ReverseIndex;
