import React, { useState } from "react";
import { Spinner } from "../../components/Spinner";
import UpArrow from "../../assets/AccordionUp.svg";
import {
  capitalizeFirstLetter,
  convertNumberToMultipleOfhundred,
  orderErrorsEnum,
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
}

const Errors = (props: ErrorProps) => {
  const { setIsErrorModalOpen, errorData, setErrorModalData } = props;
  let errors = errorData?.[0]?.matchingErrors;
  let finalError = [];
  // for (let i = 0; i < errors.length; i++) {}
  const [openIndex, setOpenIndex] = useState(null);
  const [isLoading, setIsLoading]: any = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleError = (elem: any, errorName: any) => {
    setErrorModalData({ entityDetails: elem, error: errorName });
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

  return (
    <div className="h-[70vh]">
      {isLoading ? (
        <div className="flex w-full justify-center items-center h-[50%]">
          <Spinner />
        </div>
      ) : (
        <div>
          {errorData?.map((item: any, index: any) => (
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
                <div>
                  <div>{item.errorName}</div>
                  <div className="text-[14px]">
                    {item.ErrorOrderCount} Orders
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-[1rem] border-[blue] border-b-[1px] text-[blue]">
                    {/* Fix */}
                  </span>
                  <span>
                    <img
                      className={`${index !== openIndex && "rotate-180"}`}
                      src={UpArrow}
                    />{" "}
                  </span>
                </div>
              </div>
              {openIndex === index &&
                item.matchingErrors.map((elem: any, nestedIndex: any) => (
                  <div
                    className={`flex flex-col overflow-auto border p-[0.5rem]`}
                  >
                    <div className="">
                      {orderErrorsEnum[item.errorName] ===
                      "Update Product Details" ? (
                        <div>
                          <div className="flex items-center justify-between mr-2">
                            <div className="flex gap-x-2 mx-[1rem] my-[0.5rem] max-w-[80%] line-clamp-1">
                              {elem?.boxInfo?.[0]?.products?.map(
                                (product: any) => (
                                  <div>
                                    <div className="max-w-[120px] line-clamp-1">
                                      {capitalizeFirstLetter(product?.name)},
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                            <div
                              onClick={() =>
                                handleError(
                                  elem?.boxInfo?.[0]?.products,
                                  orderErrorsEnum[item.errorName]
                                )
                              }
                              className="border-[blue] border-b-[1px] text-[blue]"
                            >
                              UPDATE
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between mx-[1rem] my-[0.5rem]">
                          <div>
                            {elem.orderId ? elem.orderId : elem.tempOrderId}
                          </div>
                          <div
                            onClick={() =>
                              handleError(elem, orderErrorsEnum[item.errorName])
                            }
                            className="border-[blue] border-b-[1px] text-[blue]"
                          >
                            {orderErrorsEnum[item.errorName]}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Errors;
