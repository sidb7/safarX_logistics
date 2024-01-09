import React, { useState } from "react";
import { Spinner } from "../../components/Spinner";
import UpArrow from "../../assets/AccordionUp.svg";

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

const Errors = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isLoading, setIsLoading]: any = useState(false);

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
          {dummyDataError.map((item: any, index: any) => (
            <div
              className="flex flex-col mb-5 cursor-pointer shadow-md"
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
                  <div>{item.error}</div>
                  <div className="text-[14px]">{item.noOfOrders} Orders</div>
                </div>
                <div className="flex items-center">
                  <span className="mr-[1rem] border-[blue] border-b-[1px] text-[blue]">
                    Fix
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
                item.orders.map((elem: any, nestedIndex: any) => (
                  <div
                    className={`flex flex-col overflow-auto border p-[0.5rem]`}
                  >
                    <div className=" flex justify-between mx-[1rem] my-[0.5rem]">
                      <div>{elem.orderId}</div>
                      <div className="border-[blue] border-b-[1px] text-[blue]">
                        {elem.solution}
                      </div>
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
