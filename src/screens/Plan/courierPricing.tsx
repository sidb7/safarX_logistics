import React, { useEffect, useState } from "react";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { POST } from "../../utils/webService";
import { COURIER_PRICING } from "../../utils/ApiUrls";
import { ScrollNav } from "../../components/ScrollNav";
import upArrowBlue from "../../assets/upArrorwBlue.svg";
import UpArrowIcon from "../../assets/Filter/upArrow.svg";
import DownArrowIcon from "../../assets/Filter/downArrow.svg";
import RateCardTable from "./rateCardTable";
import { capitalizeFirstLetter } from "../../utils/utility";
import { toast } from "react-hot-toast";
import { Spinner } from "../../components/Spinner";
interface ICourierPricingPropTypes {
  logisticsData?: any;
  setLogisticsData?: any;
  isLoading?: boolean;
}

const CourierPricing = (props: ICourierPricingPropTypes) => {
  const { logisticsData, setLogisticsData, isLoading } = props;

  const columnsHelper = createColumnHelper<any>();

  const [data, setData] = useState<any>({ b2bData: [], b2cData: [] });

  const [renderingComponents, setRenderingComponents] = useState(0);

  const arrayData = [
    { index: 0, label: "B2C" },
    // { index: 1, label: "B2B" },
  ];

  let variableData: any;
  let filterVariableData: any;
  let ratesData: any;

  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);
  };

  const columns = [
    columnsHelper.accessor("serviceName", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <div className="flex">
              <h1 className="text-[0.875rem] font-Open font-semibold leading-5">
                Service Name
              </h1>
            </div>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex justify-start text-[0.875rem] font-Open font-normal my-4 space-y-2">
            {info.getValue()}
          </div>
        );
      },
    }),
    columnsHelper.accessor("weightRangeSlab", {
      header: () => {
        return (
          <div className="flex justify-between items-center ">
            <h1 className="text-[0.875rem] font-Open font-semibold leading-5 ">
              Weight Range Slab (Kgs)
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className=" flex justify-between w-[30%] items-center text-[0.875rem] font-Open font-normal my-4 ">
            <span>{info?.row?.original?.from}</span>
            <span>to</span>
            <span>{info?.row?.original?.to}</span>
          </div>
        );
      },
    }),
    columnsHelper.accessor("incremental", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-fit whitespace-nowrap">
            <h1 className="text-[0.875rem] font-Open font-semibold leading-5 ">
              Weight (Kgs)
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="whitespace-nowrap flex  justify-start  text-[0.875rem] font-Open font-normal my-4 space-y-2">
            {info?.row?.original?.weight}
          </div>
        );
      },
    }),
    columnsHelper.accessor("zone1", {
      header: () => {
        return (
          <div className="flex flex-col text-left min-w-fit whitespace-nowrap">
            <h1 className="text-[0.875rem] font-Open font-semibold leading-5 ">
              Zone 1 (Rs.)
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="whitespace-nowrap w-[60%] items-baseline flex justify-between font-medium my-4 space-y-2 ">
            <span className=" text-[0.875rem]   font-Open font-normal">
              {info?.row?.original["ZONE 1"]?.add}
            </span>
            <span className="mx-2">|</span>
            <span className="text-[0.875rem] space-x-2 font-Open font-normal flex text-blue-500">
              <span className="">{info?.row?.original["ZONE 1"]?.base}</span>
              <img src={upArrowBlue} alt="" />
            </span>
          </div>
        );
      },
    }),
    columnsHelper.accessor("zone2", {
      header: () => {
        return (
          <div className="flex flex-col text-left justify-between min-w-fit whitespace-nowrap">
            <h1 className="text-[0.875rem] font-Open font-semibold leading-5 ">
              Zone 2 (Rs.)
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="whitespace-nowrap items-baseline w-[60%] flex justify-between font-medium my-4 space-y-2  ">
            <span className="text-[0.875rem] font-Open font-normal">
              {info?.row?.original["ZONE 2"]?.add}
            </span>{" "}
            <span className="mx-2">|</span>
            <span className=" text-[0.875rem] font-Open font-normal space-x-2 flex text-blue-500">
              <span>{info?.row?.original["ZONE 2"]?.base}</span>
              <img src={upArrowBlue} alt="" />
            </span>
          </div>
        );
      },
    }),
    columnsHelper.accessor("zone3", {
      header: () => {
        return (
          <div className="flex flex-col text-left min-w-fit whitespace-nowrap">
            <h1 className="text-[0.875rem] font-Open font-semibold leading-5 ">
              Zone 3 (Rs.)
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="items-baseline flex  w-[60%] justify-between font-medium my-4 space-y-2">
            <span className="text-[0.875rem] font-Open font-normal">
              {info?.row?.original["ZONE 3"]?.add}
            </span>
            <span className="mx-2">|</span>
            <span className="text-[0.875rem] font-Open font-normal flex text-blue-500 space-x-2">
              <span>{info?.row?.original["ZONE 3"]?.base}</span>
              <img src={upArrowBlue} alt="" />
            </span>
          </div>
        );
      },
    }),
    columnsHelper.accessor("zone4", {
      header: () => {
        return (
          <div className="flex flex-col text-left min-w-fit whitespace-nowrap">
            <h1 className="text-[0.875rem] font-Open font-semibold leading-5 ">
              Zone 4 (Rs.)
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="whitespace-nowrap w-[60%] items-baseline flex justify-between font-medium my-4 space-y-2">
            <span className=" text-[0.875rem] font-Open font-normal">
              {info?.row?.original["ZONE 4"]?.add}
            </span>
            <span className="mx-2">|</span>
            <span className=" text-[0.875rem] font-Open font-normal flex text-blue-500 space-x-2">
              <span>{info?.row?.original["ZONE 4"]?.base}</span>
              <img src={upArrowBlue} alt="" />
            </span>
          </div>
        );
      },
    }),
    columnsHelper.accessor("zone5", {
      header: () => {
        return (
          <div className="flex flex-col text-left min-w-fit whitespace-nowrap">
            <h1 className="text-[0.875rem] font-Open font-semibold leading-5 ">
              Zone 5 (Rs.)
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="whitespace-nowrap items-baseline w-[60%] flex justify-between font-medium my-4 space-y-2">
            <span className="text-[0.875rem] font-Open font-normal">
              {info?.row?.original["ZONE 5"]?.add}
            </span>{" "}
            <span className="mx-2">|</span>
            <span className="text-[0.875rem] font-Open font-normal flex text-blue-500 space-x-2">
              <span>{info?.row?.original["ZONE 5"]?.base}</span>
              <img src={upArrowBlue} alt="" />
            </span>
          </div>
        );
      },
    }),
  ];

  const variableColumns = [
    columnsHelper.accessor("serviceName", {
      header: (props) => {
        return (
          <div className="flex items-center min-w-[90px]">
            {/* <PartialChecked
              checked={props.table?.getIsAllRowsSelected()}
              onChange={props?.table?.getToggleAllRowsSelectedHandler()}
              intermediate={props?.table?.getIsSomeRowsSelected()}
            /> */}
            <div>
              <h1 className="text-sm font-Open font-semibold leading-5 ">
                Term Type
              </h1>
            </div>
          </div>
        );
      },
      cell: ({ row }: any) => {
        let termName = row?.original;
        return (
          <div className="flex items-center  my-4">
            {/* <div className="flex justify-center items-center  w-[20px] h-[20px] mr-3 cursor-pointer">
              <input
                type="checkbox"
                checked={row?.getIsSelected()}
                onChange={row?.getToggleSelectedHandler()}
                className="!w-[16px]"
              />
            </div> */}
            {termName["fuelSurcharges"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Fuel Surcharge
              </div>
            )}
            {termName["currencyAdjustmentCharges"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Currency Adjustment Charges
              </div>
            )}
            {termName["criticalPickupLocation"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Critical Pickup Location
              </div>
            )}
            {termName["criticalDeliveryLocation"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Critical Delivery Location
              </div>
            )}
            {termName["remoteAreaSurcharges"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Remote Area Surcharges
              </div>
            )}

            {termName["outOfDeliveryArea"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Out Of Delivery Area
              </div>
            )}
            {termName["reversePickUpSurcharges"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Reverse PickUp Surcharges
              </div>
            )}

            {termName["dieselMechanism"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Diesal Mechanism
              </div>
            )}
            {termName["docketCharges"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Docket Charges
              </div>
            )}
            {termName["rov"] && (
              <div className="text-sm font-Open font-normal leading-5">
                ROV Charges
              </div>
            )}
            {termName["fovCharges"] && (
              <div className="text-sm font-Open font-normal leading-5">
                FOV Charges
              </div>
            )}
            {termName["demurrage"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Demurrage
              </div>
            )}

            {termName["re-attemptCharges"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Re-Attempt Charges
              </div>
            )}
            {termName["holidayPickup/DeliveryCharges"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Holiday Pickup/Delivery Charges
              </div>
            )}
            {termName["greenTaxCharges(delhi-ncr)"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Green Tax Charges(Delhi-NCR)
              </div>
            )}
            {termName["additionalCharges"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Additional Charges
              </div>
            )}
            {termName["handlingCharges(heavyShipment)"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Handling Charges(Heavy Shipment)
              </div>
            )}
            {termName["appoitmentBaseDeliveryCharges"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Appoitment Base Delivery Charges
              </div>
            )}
            {termName["podCharge(hardCopies)"] && (
              <div className="text-sm font-Open font-normal leading-5">
                POD Charge (hardCopies)
              </div>
            )}
            {termName["toPayCharges"] && (
              <div className="text-sm font-Open font-normal leading-5">
                To Pay Charges
              </div>
            )}
            {termName["oda"] && (
              <div className="text-sm font-Open font-normal leading-5">ODA</div>
            )}
            {termName["peakSurcharges"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Peak Surcharges
              </div>
            )}
            {termName["baseCharge"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Base Charge
              </div>
            )}
            {/* {termName["invoiceValue"] && (
              <div>Insurance Charges on Invoice value (Optional)</div>
            )} */}
            {termName["pincodeCharge"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Pincode Charge
              </div>
            )}
            {termName["addhocCharge"] && (
              <div className="text-sm font-Open font-normal leading-5">
                Addhoc Charge
              </div>
            )}
            {termName["allWeight"] && (
              <div className="text-sm font-Open font-normal leading-5">
                All Weight
              </div>
            )}
          </div>
        );
      },
    }),
    columnsHelper.accessor("incrementalWeight", {
      header: () => {
        return (
          <div className="flex justify-between items-center max-w-[280px]">
            <h1 className="text-sm font-Open font-semibold leading-5 ">
              Definition
            </h1>
          </div>
        );
      },
      cell: ({ row }) => {
        let termName = row?.original;

        return (
          <div className="text-sm font-Open font-normal leading-5">
            {termName["fuelSurcharges"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["fuelSurcharges"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["fuelSurcharges"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["fuelSurcharges"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["fuelSurcharges"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["currencyAdjustmentCharges"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${
                  termName["currencyAdjustmentCharges"]?.absoluteCharge || 0
                }`}{" "}
                , Percentage Charge :{" "}
                {`${
                  termName["currencyAdjustmentCharges"]?.percentageCharge || 0
                }%`}
                , Calculate On :{" "}
                {`${
                  termName["currencyAdjustmentCharges"]?.calculateOn || "N/A"
                }`}
                , Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["currencyAdjustmentCharges"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["criticalPickupLocation"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${
                  termName["criticalPickupLocation"]?.absoluteCharge || 0
                }`}{" "}
                , Percentage Charge :{" "}
                {`${
                  termName["criticalPickupLocation"]?.percentageCharge || 0
                }%`}
                , Calculate On :{" "}
                {`${termName["criticalPickupLocation"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["criticalPickupLocation"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["criticalDeliveryLocation"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${
                  termName["criticalDeliveryLocation"]?.absoluteCharge || 0
                }`}{" "}
                , Percentage Charge :{" "}
                {`${
                  termName["criticalDeliveryLocation"]?.percentageCharge || 0
                }%`}
                , Calculate On :{" "}
                {`${
                  termName["criticalDeliveryLocation"]?.calculateOn || "N/A"
                }`}
                , Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["criticalDeliveryLocation"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["remoteAreaSurcharges"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["remoteAreaSurcharges"]?.absoluteCharge || 0}`}{" "}
                , Percentage Charge :{" "}
                {`${termName["remoteAreaSurcharges"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["remoteAreaSurcharges"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["remoteAreaSurcharges"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}

            {termName["outOfDeliveryArea"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["outOfDeliveryArea"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["outOfDeliveryArea"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["outOfDeliveryArea"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["outOfDeliveryArea"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["reversePickUpSurcharges"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${
                  termName["reversePickUpSurcharges"]?.absoluteCharge || 0
                }`}{" "}
                , Percentage Charge :{" "}
                {`${
                  termName["reversePickUpSurcharges"]?.percentageCharge || 0
                }%`}
                , Calculate On :{" "}
                {`${termName["reversePickUpSurcharges"]?.calculateOn || "N/A"}`}
                , Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["reversePickUpSurcharges"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}

            {termName["dieselMechanism"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["dieselMechanism"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["dieselMechanism"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["dieselMechanism"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["dieselMechanism"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["docketCharges"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["docketCharges"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["docketCharges"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["docketCharges"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["docketCharges"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["rov"] && (
              <div>
                Absolute Charge : {`Rs.${termName["rov"]?.absoluteCharge || 0}`}{" "}
                , Percentage Charge :{" "}
                {`${termName["rov"]?.percentageCharge || 0}%`}, Calculate On :{" "}
                {`${termName["rov"]?.calculateOn || "N/A"}`}, Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["rov"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["fovCharges"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["fovCharges"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["fovCharges"]?.percentageCharge || 0}%`}, Calculate
                On : {`${termName["fovCharges"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["fovCharges"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["demurrage"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["demurrage"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["demurrage"]?.percentageCharge || 0}%`}, Calculate
                On : {`${termName["demurrage"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["demurrage"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}

            {termName["re-attemptCharges"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["re-attemptCharges"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["re-attemptCharges"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["re-attemptCharges"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["re-attemptCharges"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["holidayPickup/DeliveryCharges"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${
                  termName["holidayPickup/DeliveryCharges"]?.absoluteCharge || 0
                }`}{" "}
                , Percentage Charge :{" "}
                {`${
                  termName["holidayPickup/DeliveryCharges"]?.percentageCharge ||
                  0
                }%`}
                , Calculate On :{" "}
                {`${
                  termName["holidayPickup/DeliveryCharges"]?.calculateOn ||
                  "N/A"
                }`}
                , Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["holidayPickup/DeliveryCharges"]?.preferenceTo ||
                    "N/A"
                )}`}
              </div>
            )}
            {termName["greenTaxCharges(delhi-ncr)"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${
                  termName["greenTaxCharges(delhi-ncr"]?.absoluteCharge || 0
                }`}{" "}
                , Percentage Charge :{" "}
                {`${
                  termName["greenTaxCharges(delhi-ncr"]?.percentageCharge || 0
                }%`}
                , Calculate On :{" "}
                {`${
                  termName["greenTaxCharges(delhi-ncr"]?.calculateOn || "N/A"
                }`}
                , Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["greenTaxCharges(delhi-ncr"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["additionalCharges"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["additionalCharges"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["additionalCharges"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["additionalCharges"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["additionalCharges"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["handlingCharges(heavyShipment)"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${
                  termName["handlingCharges(heavyShipment)"]?.absoluteCharge ||
                  0
                }`}{" "}
                , Percentage Charge :{" "}
                {`${
                  termName["handlingCharges(heavyShipment)"]
                    ?.percentageCharge || 0
                }%`}
                , Calculate On :{" "}
                {`${
                  termName["handlingCharges(heavyShipment)"]?.calculateOn ||
                  "N/A"
                }`}
                , Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["handlingCharges(heavyShipment)"]?.preferenceTo ||
                    "N/A"
                )}`}
              </div>
            )}
            {termName["appoitmentBaseDeliveryCharges"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${
                  termName["appoitmentBaseDeliveryCharges"]?.absoluteCharge || 0
                }`}{" "}
                , Percentage Charge :{" "}
                {`${
                  termName["appoitmentBaseDeliveryCharges"]?.percentageCharge ||
                  0
                }%`}
                , Calculate On :{" "}
                {`${
                  termName["appoitmentBaseDeliveryCharges"]?.calculateOn ||
                  "N/A"
                }`}
                , Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["appoitmentBaseDeliveryCharges"]?.preferenceTo ||
                    "N/A"
                )}`}
              </div>
            )}
            {termName["podCharge(hardCopies)"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["podCharge(hardCopies"]?.absoluteCharge || 0}`}{" "}
                , Percentage Charge :{" "}
                {`${termName["podCharge(hardCopies"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["podCharge(hardCopies"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["podCharge(hardCopies"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["toPayCharges"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["toPayCharges"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["toPayCharges"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["toPayCharges"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["toPayCharges"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["oda"] && (
              <div>
                Absolute Charge : {`Rs.${termName["oda"]?.absoluteCharge || 0}`}{" "}
                , Percentage Charge :{" "}
                {`${termName["oda"]?.percentageCharge || 0}%`}, Calculate On :{" "}
                {`${termName["oda"]?.calculateOn || "N/A"}`}, Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["oda"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["peakSurcharges"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["peakSurcharges"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["peakSurcharges"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["peakSurcharges"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["peakSurcharges"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["baseCharge"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["baseCharge"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["baseCharge"]?.percentageCharge || 0}%`}, Calculate
                On : {`${termName["baseCharge"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["baseCharge"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {/* {termName["invoiceValue"] && (
              <div>Insurance Charges on Invoice value (Optional)</div>
            )} */}
            {termName["pincodeCharge"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["pincodeCharge"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["pincodeCharge"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["pincodeCharge"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["pincodeCharge"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["addhocCharge"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["addhocCharge"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["addhocCharge"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["addhocCharge"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["addhocCharge"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
            {termName["allWeight"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["allWeight"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["allWeight"]?.percentageCharge || 0}%`}, Calculate
                On : {`${termName["allWeight"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${capitalizeFirstLetter(
                  termName["allWeight"]?.preferenceTo || "N/A"
                )}`}
              </div>
            )}
          </div>
        );
      },
    }),
  ];

  const RatesForpartners: any = () => {
    return logisticsData?.map((logisticsInfo: any, index: number) => {
      if (logisticsData.length > 0) {
        variableData = logisticsInfo?.variables;
        filterVariableData = variableData?.filter(
          (obj: any) => obj?.isActive === true
        );
      }
      return (
        <>
          <div className="mt-5">
            {logisticsInfo?.rates.map((rateCard: any, index: number) => {
              if (rateCard?.isActive === true) {
                return (
                  <>
                    <div className="flex flex-col mb-2 " key={index}>
                      <div
                        className={`grid grid-cols-2 px-4  h-[50px] gap-y-6 cursor-pointer
                        ${
                          rateCard?.isCollapse
                            ? "bg-[#E8E8E8] rounded-tr-lg rounded-tl-lg border-[1px]"
                            : "shadow-md rounded "
                        }
                        `}
                        onClick={() => {
                          let temp = [...logisticsData];

                          if (rateCard.isCollapse === true) {
                            rateCard.isCollapse = false;
                            setLogisticsData(temp);
                          } else {
                            rateCard.isCollapse = true;
                            setLogisticsData(temp);
                          }
                        }}
                      >
                        <div className="flex items-center gap-x-2">
                          <h1 className="self-center justify-start text-[16px] font-semibold font-Lato text-[#1C1C1C] whitespace-nowrap ">
                            {capitalizeFirstLetter(rateCard.partnerName)}
                          </h1>
                        </div>
                        <div className="flex justify-end items-center gap-x-1">
                          <img
                            src={
                              rateCard.isCollapse === true
                                ? UpArrowIcon
                                : DownArrowIcon
                            }
                            alt=""
                            className="cursor-pointer"
                            onClick={() => {}}
                          />
                        </div>
                      </div>
                      {rateCard.isCollapse && (
                        <>
                          <div className="overflow-auto ">
                            <RateCardTable serviceData={rateCard?.service} />
                          </div>

                          {/* variable charges code commented for now as no requirement for now */}

                          {/* <div className="ml-4 mt-6">
                            {" "}
                            <h4 className="text-[22px] font-Lato font-semibold">
                              Variable Charges{" "}
                            </h4>{" "}
                            <div className="mt-7">
                              <CustomTable
                                data={filterVariableData || []}
                                columns={variableColumns}
                              />
                            </div>
                          </div> */}
                        </>
                      )}
                    </div>
                  </>
                );
              }
            })}
          </div>
        </>
      );
    });
  };

  useEffect(() => {
    (async () => {
      const { data } = await POST(COURIER_PRICING);
      if (data?.success) {
        if (data.data[0].accountType === "B2C") {
          setData({ ...data, b2cData: data.data[0].rates });
        } else {
          setData({ ...data, b2bData: data.data[0].rates });
        }
      } else {
        toast.error(data.message);
      }
    })();
  }, [renderingComponents]);

  return (
    <div>
      <div className="mx-5 lg:ml-[20px]">
        <ScrollNav
          arrayData={arrayData}
          showNumber={false}
          setScrollIndex={setScrollIndex}
        />
      </div>

      <div className="mx-5 lg:ml-[20px] mb-[68px] customScroll ">
        {/* {data[0].accountType==="B2C"} */}

        {renderingComponents === 0 ? (
          // <CustomTable columns={columns} data={data.b2cData || []} />
          isLoading ? (
            <div className="flex justify-center w-[100%] h-[40vh] items-center">
              <Spinner />
            </div>
          ) : (
            <RatesForpartners />
          )
        ) : (
          <CustomTable columns={columns} data={data.b2bData || []} />
        )}
      </div>
    </div>
  );
};

export default CourierPricing;
