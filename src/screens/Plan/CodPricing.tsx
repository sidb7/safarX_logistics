import React from "react";
import { capitalizeFirstLetter } from "../../utils/utility";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../../components/Table";

interface ICodPricingPropsTypes {
  codData?: any;
}

const CodPricing = (props: ICodPricingPropsTypes) => {
  const { codData } = props;
  const columnsHelper = createColumnHelper<any>();
  // COD RATE COLUMNS
  const CODColumns = [
    columnsHelper.accessor("rateCardId", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <div className="flex">
              <h1 className="text-[0.875rem] font-Open font-semibold leading-5">
                Rate Card Id
              </h1>
            </div>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex justify-start text-[0.875rem] font-Open font-normal my-4 space-y-2">
            {info?.row?.original?.rateCardId}
          </div>
        );
      },
    }),
    columnsHelper.accessor("rateCardName", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-fit ">
            <h1 className="text-[0.875rem] font-Open font-semibold leading-5">
              Rate Card Name
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex justify-start text-[0.875rem] font-Open font-normal my-4 space-y-2">
            {capitalizeFirstLetter(info.getValue())}
          </div>
        );
      },
    }),
    columnsHelper.accessor("status", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-fit">
            <h1 className="text-[0.875rem] font-Open font-semibold leading-5">
              Remittance Cycle
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        let paymentOn = info?.row?.original?.conditions?.paymentOn;
        let paymentBy = info?.row?.original?.conditions?.paymentBy;

        return (
          <div className="flex justify-start text-[0.875rem] font-Open font-normal my-4 space-y-2">
            {paymentOn === "DELIVERY" ? `D + ${paymentBy}` : `P + ${paymentBy}`}
          </div>
        );
      },
    }),
    columnsHelper.accessor("status", {
      header: () => {
        return (
          <div className="flex justify-between items-center text-center min-w-fit">
            <h1 className="text-[0.875rem] font-Open font-semibold leading-5">
              Days
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        let days = info?.row?.original?.conditions?.days;
        let daysArr: any = [];
        Object.entries(days).map(([key, value]) => {
          if (value === true) {
            daysArr.push(key);
          }
        });

        return (
          <div className="flex justify-start text-[0.875rem] font-Open font-normal my-4 space-2">
            {daysArr?.map((day: any, i: number) => (
              <h6 className="mr-1">{capitalizeFirstLetter(day)}</h6>
            ))}
          </div>
        );
      },
    }),
    columnsHelper.accessor("validity", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-fit">
            <h1 className="text-[0.875rem] font-Open font-semibold leading-5">
              Unit Definition
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        let definition = info?.row?.original?.conditions?.grantType;
        return (
          <div className="flex justify-start text-[0.875rem] font-Open font-normal my-4 space-y-2">
            {definition}
          </div>
        );
      },
    }),
    columnsHelper.accessor("validity", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-fit">
            <h1 className="text-[0.875rem] font-Open font-semibold leading-5">
              Absolute (Applicable Charges)
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        let absoluteValue = info?.row?.original?.conditions?.absoluteValue;
        return (
          <div className="flex justify-start text-[0.875rem] font-Open font-normal my-4 space-y-2">
            {`Rs. ${absoluteValue}`}
          </div>
        );
      },
    }),
    columnsHelper.accessor("validity", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-fit">
            <h1 className="text-[0.875rem] font-Open font-semibold leading-5">
              Percentage (Applicable Charges)
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        let percentValue = info?.row?.original?.conditions?.percentValue;

        return (
          <div className="flex justify-start text-[0.875rem] font-Open font-normal my-4 space-y-2">
            {percentValue}%
          </div>
        );
      },
    }),
  ];
  return (
    <>
      <div className="overflow-auto custromScroll mx-5">
        <CustomTable columns={CODColumns} data={codData || []} />
      </div>
    </>
  );
};

export default CodPricing;
