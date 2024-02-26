import React, { useEffect, useState } from "react";
import { Spinner } from "../../components/Spinner";
import UpArrow from "../../assets/AccordionUp.svg";
import DownArrowIcon from "../../assets/Filter/downArrow.svg";
import { pickupAddress, deliveryAddress } from "../../utils/dummyData";
import CustomRightModal from "../../components/CustomModal/customRightModal";
import {
  capitalizeFirstLetter,
  convertNumberToMultipleOfhundred,
  orderErrorsEnum,
  orderErrorCategoryENUMs,
} from "../../utils/utility";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PaymentSlice } from "../../redux/reducers/paymentReducer";
import CustomDropDown from "../../components/DropDown";
import addCircleIcon from "../../assets/add-circle.svg";
import AddAddress from "./AddAddress";
import {
  RETURNING_USER_DELIVERY,
  RETURNING_USER_PICKUP,
  UPDATE_TEMP_ORDER_ADDRESS,
} from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import { toast } from "react-hot-toast";

let dummyErrors = [
  "Insufficient Balance",
  "Duplicate ID",
  "Inservicable Pincodes",
  "Incomplete Product Details",
];

let dummyDataError = [
  {
    error: "Insufficient Balance",
    noOfOrders: 5,
    orders: [
      {
        orderId: "12345",
        solution: "Recharge",
      },
      {
        orderId: "67890",
        solution: "Recharge",
      },
      {
        orderId: "09876",
        solution: "Recharge",
      },
      {
        orderId: "54321",
        solution: "Recharge",
      },
    ],
  },
  {
    error: "Duplicate ID",
    noOfOrders: 50,
    orders: [
      {
        orderId: "12345",
        solution: "Update",
      },
      {
        orderId: "67890",
        solution: "Update",
      },
      {
        orderId: "09876",
        solution: "Update",
      },
      {
        orderId: "54321",
        solution: "Update",
      },
    ],
  },
  {
    error: "Inservicable Pincodes",
    noOfOrders: 15,
    orders: [
      {
        orderId: "12345",
        solution: "Update",
      },
      {
        orderId: "67890",
        solution: "Update",
      },
      {
        orderId: "09876",
        solution: "Update",
      },
      {
        orderId: "54321",
        solution: "Update",
      },
    ],
  },
  {
    error: "Incomplete Product Details",
    noOfOrders: 20,
    orders: [
      {
        orderId: "12345",
        solution: "Update",
      },
      {
        orderId: "67890",
        solution: "Update",
      },
      {
        orderId: "09876",
        solution: "Update",
      },
      {
        orderId: "54321",
        solution: "Update",
      },
    ],
  },
];

interface ErrorProps {
  setIsErrorModalOpen: any;
  isErrorModalOpen: any;
  errorData: any;
  setErrorModalData: any;
  isLoading: any;
  getErrors: any;
}

const Errors = (props: ErrorProps) => {
  const {
    setIsErrorModalOpen,
    isErrorModalOpen,
    errorData,
    setErrorModalData,
    isLoading,
    getErrors,
  } = props;
  let errors = errorData?.[0]?.matchingErrors;
  let finalError = [];
  // for (let i = 0; i < errors.length; i++) {}
  const [openIndex, setOpenIndex] = useState(null);
  const [globalIndex, setGlobalIndex]: any = useState(null);
  // const [selectedAddress, setSelectedAddress]: any = useState("");
  const [seletedPickupAddress, setSelectedPickupAddress]: any = useState("");
  const [addAddressModal, setAddAddressModal] = useState({
    isOpen: false,
    addressType: "",
  });
  const [selectedDeliveryAddress, setSelectedDeliveryAddress]: any =
    useState("");

  const [indexFixedAllLoader, setIndexFixedAllLoader]: any = useState(null);

  const [addressLoader, setAddressLoader] = useState(false);
  const [pickupAddressDropDownData, setPickupAddressDropDownData] = useState(
    []
  );
  const [deliveryAddressDropDownData, setDeliveryAddressDropDownData] =
    useState([]);

  const [isFixDisabled, setIsFixDisabled] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductsDetails = (index?: any) => {
    setGlobalIndex(index === globalIndex ? null : index);
  };

  const handleError = (
    elem: any,
    errorName: any,
    orderDetails?: any,
    orderData?: any
  ) => {
    if (errorName === "Box And Product") {
      setErrorModalData({
        entityDetails: elem,
        error: errorName,
        orderDetails,
      });
    } else if (errorName === "Others") {
      setErrorModalData({
        entityDetails: orderData,
        error: errorName,
        orderDetails,
      });
    } else {
      setErrorModalData({
        entityDetails: elem,
        error: errorName,
      });
    }
    // console.log(convertNumberToMultipleOfhundred("2920"));
    // const amountArray = elem?.status?.[0]?.notes?.split(" ");
    // let amount = amountArray?.[amountArray?.length - 2];

    // const walletAmount = amount ? amount : 1000;
    // dispatch(PaymentSlice.actions.paymentAmount(walletAmount));
    if (errorName === "Recharge") navigate(`/wallet/view-wallet`);
    else setIsErrorModalOpen(true);
  };

  const handleItemClick = (index: any) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const DropDownjsx = (order: any, errorName: any) => {
    return (
      <>
        {order.orders.map((eachOrder: any) => {
          return (
            <div className="flex flex-col mb-1 min-w-[100%] bg-[#fdfdfd] border-1 p-[5px] px-[10px] shadow-inner rounded-br rounded-bl border-t-0 ">
              <div className="flex justify-between border-1 my-1 shadow-md w-[100%] py-[10px] px-[10px] rounded ">
                <div className="">
                  <div>
                    OrderId - {eachOrder?.orderNumber || eachOrder.orderId}
                  </div>
                  <div></div>
                </div>
                <div
                  onClick={() =>
                    order?.errorType !== "Administrative Errors" &&
                    order?.errorType !== "GST Number Errors"
                      ? handleError(
                          order,
                          errorName,
                          order?.errorType,
                          eachOrder
                        )
                      : null
                  }
                  className="border-[blue] border-b-[1px] mr-2 text-[blue]"
                >
                  {order?.errorType === "Administrative Errors"
                    ? "CONTACT ADMINISTRATION"
                    : "UPDATE"}
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const returnUserAddress = async () => {
    // setAddressDropDownLoad(true);
    const { data: pickupResponse } = await POST(RETURNING_USER_PICKUP, {});
    const { data: deliveresponse } = await POST(RETURNING_USER_DELIVERY, {});

    let pickupDropDownData = pickupResponse.data.map((address: any) => {
      return { label: address?.fullAddress, value: address?.pickupAddressId };
    });
    let DeliveryDropDownData = deliveresponse.data.map((address: any) => {
      return {
        label: address?.fullAddress,
        value: address?.deliveryAddressId,
      };
    });

    pickupDropDownData.unshift({ label: "", value: "" });
    DeliveryDropDownData.unshift({ label: "", value: "" });

    setDeliveryAddressDropDownData(DeliveryDropDownData);
    setPickupAddressDropDownData(pickupDropDownData);
  };

  const fixAllHandler = async (errorName: any, data: any, index: any) => {
    try {
      setAddressLoader(true);
      setIndexFixedAllLoader(index);

      let payLoad: any = {
        tempOrderDetails: [],
      };

      data[0]?.orders.map((tempOrderData: any) => {
        payLoad.tempOrderDetails.push({
          orderId: tempOrderData?.orderId,
          tempOrderId: tempOrderData?.tempOrderId,
          source: tempOrderData?.source,
        });
      });

      if (errorName === "Delivery Address") {
        payLoad = {
          ...payLoad,
          deliveryAddressId: selectedDeliveryAddress,
        };
      } else if (errorName === "Pickup Address") {
        payLoad = { ...payLoad, pickupAddressId: seletedPickupAddress };
      }

      let payload: any = {};
      const { data: responseData } = await POST(
        UPDATE_TEMP_ORDER_ADDRESS,
        payLoad
      );
      if (responseData?.success) {
        setAddressLoader(false);
        getErrors();
        toast.success(responseData?.message);
        return true;
      } else {
        setAddressLoader(false);
        getErrors();
        toast.error(responseData?.message);

        return false;
      }
    } catch (error: any) {
      toast.error(error?.message);
      setAddressLoader(false);
      return false;
    }
  };

  const onSelectDropDownHandler = (e: any, errorName?: any) => {
    if (errorName === "Pickup Address") {
      setSelectedPickupAddress(e.target.value);
      if (e.target.value.length > 0) setIsFixDisabled(false);
      else setIsFixDisabled(true);
    } else {
      setSelectedDeliveryAddress(e.target.value);
      if (e.target.value.length > 0) setIsFixDisabled(false);
      else setIsFixDisabled(true);
    }
  };

  const switchConditionsForError = (
    errorName?: any,
    elem?: any,
    Index?: any
  ) => {
    switch (errorName) {
      case orderErrorCategoryENUMs["Box And Product"]: {
        return (
          <div
            className="hover:bg-[#F6F6F6] hover:shadow-inner py-[0.5rem]"
            onClick={() => handleError(elem?.boxInfo, errorName, elem?.orders)}
          >
            <div className="flex items-center justify-between my-1 ml-2 mr-4">
              <div className="flex items-start  justify-between gap-x-2 max-w-[80%] line-clamp-1">
                {elem?.boxInfo?.map((sinleBox: any) => (
                  <div className="flex flex-col ml-2 ">
                    {sinleBox?.products?.map((singleProduct: any) => (
                      <div className="flex items-center fit-content">
                        <div className="w-[10px] mx-1 h-[10px] border rounded-full bg-black"></div>
                        <span className="my-[2px]">
                          {capitalizeFirstLetter(singleProduct?.name)}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div
                onClick={() =>
                  handleError(elem?.boxInfo, errorName, elem?.orders)
                }
                className="border-[blue] flex border-b-[1px] text-[blue]"
              >
                UPDATE {"("}
                <div className="text-[18px] flex justify-center items-center mx-[2px]">
                  {elem.ordersCount}
                </div>
                {")"}
              </div>
            </div>
          </div>
        );
      }
      case orderErrorCategoryENUMs["Delivery Address"]:
      case orderErrorCategoryENUMs["Pickup Address"]: {
        return (
          <div className="flex items-center justify-between ">
            <div className="flex flex-col items-center w-[100%] justify-between">
              {elem?.orders?.map((order: any, index: any) => {
                return (
                  <div
                    className={`py-2 hover:bg-[#F6F6F6] hover:shadow-inner flex justify-between w-[100%] items-center ${
                      elem?.orders.length - 1 !== index ? "border-b-[2px]" : ""
                    }  px-4`}
                    key={index}
                    onClick={() => handleError(order, errorName)}
                  >
                    <div className="flex items-center">
                      <div className="rounded-md py-1">
                        {order?.orderNumber
                          ? "OrderId - " + order?.orderNumber
                          : order?.orderId
                          ? "OrderId - " + order?.orderId
                          : "TempOrderId - " + order?.tempOrderId}
                      </div>
                    </div>
                    <div
                      onClick={() => handleError(order, errorName)}
                      className="border-[blue] border-b-[1px] text-[blue]"
                    >
                      UPDATE
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      case orderErrorCategoryENUMs["Service"]: {
        return (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-col w-[100%] justify-between">
                {elem?.orders?.map((order: any, index: any) => {
                  return (
                    <div
                      className={`py-3 flex justify-between w-[100%] items-center hover:bg-[#F6F6F6] hover:shadow-inner ${
                        elem?.orders.length - 1 !== index
                          ? "border-b-[2px]"
                          : ""
                      }  px-4`}
                      key={index}
                      onClick={() => handleError(order, errorName)}
                    >
                      <div className="flex items-center">
                        <div className="rounded-md bg-[#D2D2D2] mr-4 py-1 px-3">
                          {order?.orderNumber
                            ? order?.orderNumber
                            : order?.orderId
                            ? order?.orderId
                            : order?.tempOrderId}
                        </div>
                        <div>{order?.source}</div>
                      </div>
                      <div
                        onClick={() => handleError(order, errorName)}
                        className="border-[blue] border-b-[1px] text-[blue]"
                      >
                        UPDATE
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        );
      }
      case orderErrorCategoryENUMs["Others"]: {
        return (
          <>
            <div className="flex items-center justify-between p-[5px] bg-[#F5F5F4]">
              <div className="flex flex-col items-center w-[100%] justify-between">
                <>
                  <div
                    className={`py-2 flex justify-between w-[100%] bg-white mt-0 rounded shadow-md items-center px-4`}
                    key={Index}
                    // onClick={() => handleError(order, errorName)}
                    onClick={() => handleProductsDetails(Index)}
                  >
                    <div className="flex items-start  flex-col">
                      <div className="rounded-md py-1">{elem.errorType}</div>
                      <div>{elem?.orders?.length} Orders</div>
                    </div>
                    {/* <div
                        onClick={() => handleError(order, errorName)}
                        className="border-[blue] border-b-[1px] text-[blue]"
                      >
                        UPDATE
                      </div> */}
                    <div className="mr-[1rem]">
                      <img
                        className={`${Index === globalIndex && "rotate-180"}`}
                        src={DownArrowIcon}
                      />
                    </div>
                  </div>
                  {Index === globalIndex && DropDownjsx(elem, errorName)}
                </>
              </div>
            </div>
          </>
        );
      }
    }
  };

  const allValuesEmpty =
    errorData && errorData?.some((error: any) => error.value.length !== 0);

  useEffect(() => {
    if (!isErrorModalOpen) {
      getErrors();
    }
  }, [isErrorModalOpen]);

  useEffect(() => {
    returnUserAddress();
  }, []);

  return (
    <div className="h-[70vh]">
      {isLoading ? (
        <div className="flex w-full justify-center items-center h-[50%]">
          <Spinner />
        </div>
      ) : (
        <div>
          {allValuesEmpty ? (
            errorData?.map((item: any, index: any) => {
              const totalOrdersCount = item?.value.reduce(
                (acc: any, obj: any) => acc + obj.ordersCount,
                0
              );
              return (
                <>
                  {item?.value.length > 0 && (
                    <div
                      className="flex flex-col mb-5  cursor-pointer mr-3 rounded-lg"
                      style={{
                        boxShadow: "1px 1px 8px 0px rgba(0, 0, 0, 0.12)",
                      }}
                      key={index}
                    >
                      <div
                        className={`flex select-none items-center gap-y-[1rem] justify-between p-3  border-[1px] border-[#E8E8E8] ${
                          openIndex === index
                            ? "  rounded-tr-lg rounded-tl-lg rounded-b-none "
                            : " rounded-lg "
                        }`}
                      >
                        <div
                          className="mx-1 flex flex-col flex-1 "
                          onClick={() => handleItemClick(index)}
                        >
                          <div>
                            {item?.errorName === "Box And Product"
                              ? "Update Dimension And Weight"
                              : item?.errorName}
                          </div>
                          <div className="text-[14px]">
                            {totalOrdersCount} Orders
                          </div>
                        </div>

                        <div className="flex items-center">
                          {(item?.errorName === "Delivery Address" ||
                            item?.errorName === "Pickup Address") && (
                            <div className="flex w-[600px] mx-4">
                              <button
                                disabled={isFixDisabled}
                                className={`border py-2 px-4 rounded drop-shadow-sm ${
                                  isFixDisabled ? "opacity-50" : "opacity-100"
                                }`}
                                onClick={() =>
                                  fixAllHandler(
                                    item?.errorName,
                                    item?.value,
                                    index
                                  )
                                }
                              >
                                {addressLoader &&
                                indexFixedAllLoader === index ? (
                                  <div className="flex justify-center items-center">
                                    <Spinner />
                                  </div>
                                ) : (
                                  "FIX ALL"
                                )}
                              </button>
                              <div className="flex-1 mx-4">
                                <CustomDropDown
                                  value={
                                    item?.errorName === "Pickup Address"
                                      ? seletedPickupAddress
                                      : selectedDeliveryAddress
                                  }
                                  name="Selete Address"
                                  onChange={(e: any) =>
                                    onSelectDropDownHandler(e, item?.errorName)
                                  }
                                  options={
                                    item?.errorName === "Pickup Address"
                                      ? pickupAddressDropDownData.map(
                                          (e: any) => {
                                            return {
                                              ...e,
                                              label: `${
                                                e.label === ""
                                                  ? ""
                                                  : e.label.slice(0, 60) + "..."
                                              }`,
                                            };
                                          }
                                        )
                                      : deliveryAddressDropDownData.map(
                                          (e: any) => {
                                            return {
                                              ...e,
                                              label: `${
                                                e.label === ""
                                                  ? ""
                                                  : e.label.slice(0, 60) + "..."
                                              }`,
                                            };
                                          }
                                        )
                                  }
                                  placeHolder="Selete Address"
                                  wrapperClass="w-[100%]"
                                />
                              </div>
                              <button
                                className="flex justify-center items-center"
                                onClick={() =>
                                  setAddAddressModal({
                                    isOpen: true,
                                    addressType: item?.errorName,
                                  })
                                }
                              >
                                <img src={addCircleIcon} alt="" />
                              </button>
                            </div>
                          )}
                          <button
                            className="p-4"
                            onClick={() => handleItemClick(index)}
                          >
                            <img
                              className={`${
                                index !== openIndex && "rotate-180"
                              }`}
                              src={UpArrow}
                            />
                          </button>
                        </div>
                      </div>
                      {openIndex === index &&
                        item?.value.map((elem: any, nestedIndex: any) => {
                          return (
                            <div
                              className={`flex flex-col overflow-auto border`}
                              key={nestedIndex}
                            >
                              <div>
                                {switchConditionsForError(
                                  item.errorName,
                                  elem,
                                  nestedIndex
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </>
              );
            })
          ) : (
            <div className="w-[100%] h-52 bg-[#f7f7f7] hover:bg-[#e9e9e9] flex rounded-lg justify-center items-center">
              No Error List Found
            </div>
          )}
        </div>
      )}

      <CustomRightModal
        isOpen={addAddressModal?.isOpen}
        onClose={() => setAddAddressModal({ isOpen: false, addressType: "" })}
        className="!justify-start "
      >
        <AddAddress
          addressType={addAddressModal?.addressType}
          setAddAddressModal={setAddAddressModal}
          returnAddress={returnUserAddress}
        />
      </CustomRightModal>
    </div>
  );
};

export default Errors;
