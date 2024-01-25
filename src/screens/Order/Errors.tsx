import React, { useState } from "react";
import { Spinner } from "../../components/Spinner";
import UpArrow from "../../assets/AccordionUp.svg";
import {
  capitalizeFirstLetter,
  convertNumberToMultipleOfhundred,
  orderErrorsEnum,
  orderErrorCategoryENUMs,
} from "../../utils/utility";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PaymentSlice } from "../../redux/reducers/paymentReducer";

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
  errorData: any;
  setErrorModalData: any;
  isLoading: any;
}

const Errors = (props: ErrorProps) => {
  const { setIsErrorModalOpen, errorData, setErrorModalData, isLoading } =
    props;
  let errors = errorData?.[0]?.matchingErrors;
  let finalError = [];
  // for (let i = 0; i < errors.length; i++) {}
  const [openIndex, setOpenIndex] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleError = (elem: any, errorName: any, orderDetails?: any) => {
    if (errorName === "Box And Product") {
      setErrorModalData({
        entityDetails: elem,
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

  const allValuesEmpty =
    errorData && errorData?.some((error: any) => error.value.length === 0);

  console.log("🚀 ~ Errors ~ allValuesEmpty:", allValuesEmpty);
  console.log("errorData", errorData);

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
                      className="flex flex-col mb-5 cursor-pointer mr-3"
                      style={{
                        boxShadow: "1px 1px 8px 0px rgba(0, 0, 0, 0.12)",
                      }}
                      key={index}
                    >
                      <div
                        className={`flex select-none gap-y-[1rem] justify-between p-3  border-[1px] border-[#E8E8E8] ${
                          openIndex === index
                            ? "  rounded-tr-lg rounded-tl-lg rounded-b-none "
                            : " rounded-lg "
                        }`}
                        onClick={() => handleItemClick(index)}
                      >
                        <div className="mx-1">
                          <div>{item?.errorName}</div>
                          <div className="text-[14px]">
                            {totalOrdersCount} Orders
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-[1rem] border-[blue] border-b-[1px] text-[blue]"></span>
                          <span>
                            <img
                              className={`${
                                index !== openIndex && "rotate-180"
                              }`}
                              src={UpArrow}
                            />
                          </span>
                        </div>
                      </div>
                      {openIndex === index &&
                        item?.value.map((elem: any, nestedIndex: any) => (
                          <div
                            className={`flex flex-col overflow-auto border p-[0.5rem]`}
                            key={nestedIndex}
                          >
                            <div className="">
                              {item.errorName === "Box And Product" ? (
                                <div>
                                  <div className="flex items-center justify-between my-1 mr-2">
                                    <div className="flex items-center justify-between gap-x-2 mx-2 max-w-[80%] line-clamp-1">
                                      <div className="text-[12px] border border-[#cecece] flex justify-center rounded-md bg-[#D2D2D2] items-center w-[22px] h-[22px]">
                                        {elem.ordersCount}
                                      </div>
                                      {elem?.boxInfo?.map((sinleBox: any) => (
                                        <div className="flex">
                                          {sinleBox?.products?.map(
                                            (singleProduct: any) => (
                                              <div className="max-w-[120px] mr-1 line-clamp-1">
                                                {capitalizeFirstLetter(
                                                  singleProduct?.name
                                                )}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                    <div
                                      onClick={() =>
                                        handleError(
                                          elem?.boxInfo,
                                          item.errorName,
                                          elem?.orders
                                        )
                                      }
                                      className="border-[blue] border-b-[1px] text-[blue]"
                                    >
                                      UPDATE
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="justify-between mx-2 my-[0.5rem]  flex flex-col">
                                  {elem?.orders?.map(
                                    (order: any, index: any) => {
                                      return (
                                        <div
                                          className="my-1 flex justify-between items-center "
                                          key={index}
                                        >
                                          <div className="flex items-center">
                                            <div className="rounded-md bg-[#D2D2D2] mr-4 py-1 px-3">
                                              {order?.orderId
                                                ? order?.orderId
                                                : order?.tempOrderId}
                                            </div>
                                            <div>{order?.source}</div>
                                          </div>
                                          <div
                                            onClick={() =>
                                              handleError(order, item.errorName)
                                            }
                                            className="border-[blue] border-b-[1px] text-[blue]"
                                          >
                                            UPDATE
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </>
              );
            })
          ) : (
            <div className="border rounded-md flex justify-center items-center bg-[#D2D2D2] h-[35vh]">
              No Error List Found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Errors;
