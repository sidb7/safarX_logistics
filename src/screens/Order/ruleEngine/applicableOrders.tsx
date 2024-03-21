import React, { useState } from "react";

const ApplicableOrders = (props: any) => {
  const { index, changeHandler, getDataFromBackend } = props;

  const sortBy = [
    {
      label: "Cheapest",
      value: "Cheapest",
    },
    {
      label: "Highest",
      value: "Highest",
    },
  ];

  return (
    <div className="mx-5 mb-5 p-5 shadow-lg bg-white rounded-lg">
      <h1 className="text-[#1C1C1C] font-Lato font-semibold text-[28px]">
        {index + 1}. Applicable To All Orders
      </h1>
      <div className="mt-5">
        <div className="flex items-center gap-4 mt-5">
          <div className="!w-[372px] flex !h-[48px]">
            <select
              onChange={(e: any) => {
                if (e.target.value != "") {
                  changeHandler("applicable_orders", "sort", e.target.value);
                }
              }}
              className="h-full p-[5px] text-[12px] font-Open font-semibold w-full rounded-lg bg-transparent border-2 border-[#A4A4A4]"
            >
              <option value={""} className="bg-gray-100">
                Select Sort
              </option>
              {sortBy?.map((option: any, i: number) => (
                <option
                  value={option?.value}
                  selected={
                    getDataFromBackend?.sortBy === option?.value ? true : false
                  }
                >
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicableOrders;
