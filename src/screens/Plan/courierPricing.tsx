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
import { useSelector } from "react-redux";
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
  // const [isMasked, setIsMasked] = useState(false);
  const isMasked = useSelector((state: any) => state?.user?.isMasked);

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
              <h1 className="text-sm font-semibold leading-5 ">Term Type</h1>
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
            {termName["fuelSurcharges"] && <div>Fuel Surcharge</div>}
            {termName["currencyAdjustmentCharges"] && (
              <div>Currency Adjustment Charges</div>
            )}
            {termName["criticalPickupLocation"] && (
              <div>Critical Pickup Location</div>
            )}
            {termName["criticalDeliveryLocation"] && (
              <div>Critical Delivery Location</div>
            )}
            {termName["remoteAreaSurcharges"] && (
              <div>Remote Area Surcharges</div>
            )}

            {termName["outOfDeliveryArea"] && <div>Out Of Delivery Area</div>}
            {termName["reversePickUpSurcharges"] && (
              <div>Reverse PickUp Surcharges</div>
            )}

            {termName["dieselMechanism"] && <div>Diesal Mechanism</div>}
            {termName["docketCharges"] && <div>Docket Charges</div>}
            {termName["rov"] && <div>ROV Charges</div>}
            {termName["fovCharges"] && <div>FOV Charges</div>}
            {termName["demurrage"] && <div>Demurrage</div>}

            {termName["re-attemptCharges"] && <div>Re-Attempt Charges</div>}
            {termName["holidayPickup/DeliveryCharges"] && (
              <div>Holiday Pickup/Delivery Charges</div>
            )}
            {termName["greenTaxCharges(delhi-ncr)"] && (
              <div>Green Tax Charges(Delhi-NCR)</div>
            )}
            {termName["additionalCharges"] && <div>Additional Charges</div>}
            {termName["handlingCharges(heavyShipment)"] && (
              <div>Handling Charges(Heavy Shipment)</div>
            )}
            {termName["appoitmentBaseDeliveryCharges"] && (
              <div>Appoitment Base Delivery Charges</div>
            )}
            {termName["podCharge(hardCopies)"] && (
              <div>POD Charge (hardCopies)</div>
            )}
            {termName["toPayCharges"] && <div>To Pay Charges</div>}
            {termName["oda"] && <div>ODA</div>}
            {termName["peakSurcharges"] && <div>Peak Surcharges</div>}
            {termName["baseCharge"] && <div>Base Charge</div>}
            {/* {termName["invoiceValue"] && (
              <div>Insurance Charges on Invoice value (Optional)</div>
            )} */}
            {termName["pincodeCharge"] && <div>Pincode Charge</div>}
            {termName["addhocCharge"] && <div>Addhoc Charge</div>}
            {termName["allWeight"] && <div>All Weight</div>}
            {termName["deliveryagainstconsigneecopy"] && (
              <div>Delivery against consignee copy</div>
            )}
            {termName["sp.deliverycharge"] && <div>Sp. delivery charge</div>}
            {termName["multistory"] && <div>Multi Story</div>}
            {termName["keralahandlingcharges"] && (
              <div>Kerala Handling Charges</div>
            )}
            {termName["freestoragefacility"] && (
              <div>Free Storage facility</div>
            )}
            {termName["damageclaim"] && <div>Damage Claim</div>}
          </div>
        );
      },
    }),
    columnsHelper.accessor("incrementalWeight", {
      header: () => {
        return (
          <div className="flex justify-between items-center max-w-[280px]">
            <h1 className="text-sm font-semibold leading-5 ">Definition</h1>
          </div>
        );
      },
      cell: ({ row }) => {
        let termName = row?.original;

        return (
          <div>
            {termName["fuelSurcharges"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["fuelSurcharges"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["fuelSurcharges"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["fuelSurcharges"]?.calculateOn || "Base Charge"}`},
                Preference To :{" "}
                {`${termName["fuelSurcharges"]?.preferenceTo || "Higher"}`}
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
                {`${
                  termName["currencyAdjustmentCharges"]?.preferenceTo || "N/A"
                }`}
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
                {`${termName["criticalPickupLocation"]?.preferenceTo || "N/A"}`}
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
                {`${
                  termName["criticalDeliveryLocation"]?.preferenceTo || "N/A"
                }`}
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
                {`${termName["remoteAreaSurcharges"]?.preferenceTo || "N/A"}`}
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
                {`${termName["outOfDeliveryArea"]?.preferenceTo || "N/A"}`}
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
                {`${
                  termName["reversePickUpSurcharges"]?.preferenceTo || "N/A"
                }`}
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
                {`${termName["dieselMechanism"]?.preferenceTo || "N/A"}`}
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
                {`${termName["docketCharges"]?.preferenceTo || "N/A"}`}
              </div>
            )}
            {termName["rov"] && (
              <div>
                Absolute Charge : {`Rs.${termName["rov"]?.absoluteCharge || 0}`}{" "}
                , Percentage Charge :{" "}
                {`${termName["rov"]?.percentageCharge || 0}%`}, Calculate On :{" "}
                {`${termName["rov"]?.calculateOn || "N/A"}`}, Preference To :{" "}
                {`${termName["rov"]?.preferenceTo || "N/A"}`}
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
                {`${termName["fovCharges"]?.preferenceTo || "N/A"}`}
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
                {`${termName["demurrage"]?.preferenceTo || "N/A"}`}
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
                {`${termName["re-attemptCharges"]?.preferenceTo || "N/A"}`}
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
                {`${
                  termName["holidayPickup/DeliveryCharges"]?.preferenceTo ||
                  "N/A"
                }`}
              </div>
            )}
            {termName["greenTaxCharges(delhi-ncr)"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${
                  termName["greenTaxCharges(delhi-ncr)"]?.absoluteCharge || 0
                }`}{" "}
                , Percentage Charge :{" "}
                {`${
                  termName["greenTaxCharges(delhi-ncr)"]?.percentageCharge || 0
                }%`}
                , Calculate On :{" "}
                {`${
                  termName["greenTaxCharges(delhi-ncr)"]?.calculateOn || "N/A"
                }`}
                , Preference To :{" "}
                {`${
                  termName["greenTaxCharges(delhi-ncr)"]?.preferenceTo || "N/A"
                }`}
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
                {`${termName["additionalCharges"]?.preferenceTo || "N/A"}`}
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
                {`${
                  termName["handlingCharges(heavyShipment)"]?.preferenceTo ||
                  "N/A"
                }`}
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
                {`${
                  termName["appoitmentBaseDeliveryCharges"]?.preferenceTo ||
                  "N/A"
                }`}
              </div>
            )}
            {termName["podCharge(hardCopies)"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["podCharge(hardCopies)"]?.absoluteCharge || 0}`}{" "}
                , Percentage Charge :{" "}
                {`${termName["podCharge(hardCopies)"]?.percentageCharge || 0}%`}
                , Calculate On :{" "}
                {`${termName["podCharge(hardCopies)"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${termName["podCharge(hardCopies)"]?.preferenceTo || "N/A"}`}
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
                {`${termName["toPayCharges"]?.preferenceTo || "N/A"}`}
              </div>
            )}
            {termName["oda"] && (
              <div>
                Absolute Charge : {`Rs.${termName["oda"]?.absoluteCharge || 0}`}{" "}
                , Percentage Charge :{" "}
                {`${termName["oda"]?.percentageCharge || 0}%`}, Calculate On :{" "}
                {`${termName["oda"]?.calculateOn || "N/A"}`}, Preference To :{" "}
                {`${termName["oda"]?.preferenceTo || "N/A"}`}
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
                {`${termName["peakSurcharges"]?.preferenceTo || "N/A"}`}
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
                {`${termName["baseCharge"]?.preferenceTo || "N/A"}`}
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
                {`${termName["pincodeCharge"]?.preferenceTo || "N/A"}`}
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
                {`${termName["addhocCharge"]?.preferenceTo || "N/A"}`}
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
                {`${termName["allWeight"]?.preferenceTo || "N/A"}`}
              </div>
            )}
            {termName["deliveryagainstconsigneecopy"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${
                  termName["deliveryagainstconsigneecopy"]?.absoluteCharge || 0
                }`}{" "}
                , Percentage Charge :{" "}
                {`${
                  termName["deliveryagainstconsigneecopy"]?.percentageCharge ||
                  0
                }%`}
                , Calculate On :{" "}
                {`${
                  termName["deliveryagainstconsigneecopy"]?.calculateOn || "N/A"
                }`}
                , Preference To :{" "}
                {`${
                  termName["deliveryagainstconsigneecopy"]?.preferenceTo ||
                  "N/A"
                }`}
              </div>
            )}
            {termName["sp.deliverycharge"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["sp.deliverycharge"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["sp.deliverycharge"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["sp.deliverycharge"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${termName["sp.deliverycharge"]?.preferenceTo || "N/A"}`}
              </div>
            )}
            {termName["multistory"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["multistory"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["multistory"]?.percentageCharge || 0}%`}, Calculate
                On : {`${termName["multistory"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${termName["multistory"]?.preferenceTo || "N/A"}`}
              </div>
            )}
            {termName["keralahandlingcharges"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["keralahandlingcharges"]?.absoluteCharge || 0}`}{" "}
                , Percentage Charge :{" "}
                {`${termName["keralahandlingcharges"]?.percentageCharge || 0}%`}
                , Calculate On :{" "}
                {`${termName["keralahandlingcharges"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${termName["keralahandlingcharges"]?.preferenceTo || "N/A"}`}
              </div>
            )}
            {termName["freestoragefacility"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["freestoragefacility"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["freestoragefacility"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["freestoragefacility"]?.calculateOn || "N/A"}`},
                Preference To :{" "}
                {`${termName["freestoragefacility"]?.preferenceTo || "N/A"}`}
              </div>
            )}
            {termName["damageclaim"] && (
              <div>
                Absolute Charge :{" "}
                {`Rs.${termName["damageclaim"]?.absoluteCharge || 0}`} ,
                Percentage Charge :{" "}
                {`${termName["damageclaim"]?.percentageCharge || 0}%`},
                Calculate On :{" "}
                {`${termName["damageclaim"]?.calculateOn || "N/A"}`}, Preference
                To : {`${termName["damageclaim"]?.preferenceTo || "N/A"}`}
              </div>
            )}
          </div>
        );
      },
    }),
  ];

  const arrayData = [
    { index: 0, label: "B2C" },
    { index: 1, label: "B2B" },
  ];

  let variableData: any;
  let filterVariableData: any;

  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);
  };

  const RatesB2CForpartners: any = () => {
    let logisticsB2CData: any = logisticsData?.filter(
      (el: any) => el?.accountType === "B2C"
    );
    return logisticsB2CData?.map((logisticsInfo: any, index: number) => {
      if (logisticsB2CData.length > 0) {
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
                        </>
                      )}
                    </div>
                  </>
                );
              }
            })}
            {/* variable charges code commented for now as no requirement for now */}

            <div className="ml-4 mt-6">
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
            </div>
          </div>
        </>
      );
    });
  };

  // if user isMasked then it will work
  const RatesB2CForMaskedpartners: any = () => {
    let logisticsB2CData: any = logisticsData?.filter(
      (el: any) => el?.accountType === "B2C"
    );

    return logisticsB2CData?.map((logisticsInfo: any, index: number) => {
      let firstB2CObject = logisticsInfo?.rates?.[0];

      let serviceArray = firstB2CObject?.service?.slice(0, 2);
      serviceArray?.forEach((element: any, i: number) => {
        if (i < 2) {
          if (element?.mode === "AIR") {
            element.partnerServiceName = "Air";
          } else if (element?.mode === "SURFACE") {
            element.partnerServiceName = "SURFACE";
          }
        }
      });

      return (
        <>
          <div className="mt-5">
            {/* {console.log("logisticsInfo?.rates", logisticsInfo?.rates)} */}
            <div className="flex flex-col mb-2 " key={index}>
              <div
                className={`grid grid-cols-2 px-4  h-[50px] gap-y-6 cursor-pointer
                        ${
                          firstB2CObject?.isCollapse
                            ? "bg-[#E8E8E8] rounded-tr-lg rounded-tl-lg border-[1px]"
                            : "shadow-md rounded "
                        }
                        `}
                onClick={() => {
                  let temp = [...logisticsData];

                  if (firstB2CObject.isCollapse === true) {
                    firstB2CObject.isCollapse = false;
                    setLogisticsData(temp);
                  } else {
                    firstB2CObject.isCollapse = true;
                    setLogisticsData(temp);
                  }
                }}
              >
                <div className="flex items-center gap-x-2">
                  <h1 className="self-center justify-start text-[16px] font-semibold font-Lato text-[#1C1C1C] whitespace-nowrap ">
                    {/* {capitalizeFirstLetter(firstB2CObject.partnerName)} */}
                    {capitalizeFirstLetter("Shipyaari")}
                  </h1>
                </div>
                <div className="flex justify-end items-center gap-x-1">
                  <img
                    src={
                      firstB2CObject.isCollapse === true
                        ? UpArrowIcon
                        : DownArrowIcon
                    }
                    alt=""
                    className="cursor-pointer"
                    onClick={() => {}}
                  />
                </div>
              </div>
              {firstB2CObject.isCollapse && (
                <>
                  <div className="overflow-auto ">
                    <RateCardTable serviceData={serviceArray} />
                  </div>
                </>
              )}
            </div>
            {/* variable charges code commented for now as no requirement for now */}

            <div className="ml-4 mt-6">
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
            </div>
          </div>
        </>
      );
    });
  };

  const RatesB2BForpartners: any = () => {
    let logisticsB2CData: any = logisticsData?.filter(
      (el: any) => el?.accountType === "B2B"
    );
    return logisticsB2CData?.map((logisticsInfo: any, index: number) => {
      if (logisticsB2CData.length > 0) {
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
                        </>
                      )}
                    </div>
                  </>
                );
              }
            })}
            {/* variable charges code commented for now as no requirement for now */}

            <div className="ml-4 mt-6">
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
            </div>
          </div>
        </>
      );
    });
  };

  // if user isMasked then it will work
  const RatesB2BForMaskedpartners: any = () => {
    let logisticsB2BData: any = logisticsData?.filter(
      (el: any) => el?.accountType === "B2B"
    );

    return logisticsB2BData?.map((logisticsInfo: any, index: number) => {
      let firstB2BObject = logisticsInfo?.rates?.[0];

      let serviceArray = firstB2BObject?.service?.slice(0, 2);
      serviceArray?.forEach((element: any, i: number) => {
        if (i < 2) {
          if (element?.mode === "AIR") {
            element.partnerServiceName = "Air";
          } else if (element?.mode === "SURFACE") {
            element.partnerServiceName = "SURFACE";
          }
        }
      });
      return (
        <>
          <div className="mt-5">
            {/* {console.log("logisticsInfo?.rates", logisticsInfo?.rates)} */}
            <div className="flex flex-col mb-2 " key={index}>
              <div
                className={`grid grid-cols-2 px-4  h-[50px] gap-y-6 cursor-pointer
                        ${
                          firstB2BObject?.isCollapse
                            ? "bg-[#E8E8E8] rounded-tr-lg rounded-tl-lg border-[1px]"
                            : "shadow-md rounded "
                        }
                        `}
                onClick={() => {
                  let temp = [...logisticsData];

                  if (firstB2BObject.isCollapse === true) {
                    firstB2BObject.isCollapse = false;
                    setLogisticsData(temp);
                  } else {
                    firstB2BObject.isCollapse = true;
                    setLogisticsData(temp);
                  }
                }}
              >
                <div className="flex items-center gap-x-2">
                  <h1 className="self-center justify-start text-[16px] font-semibold font-Lato text-[#1C1C1C] whitespace-nowrap ">
                    {/* {capitalizeFirstLetter(firstB2BObject.partnerName)} */}
                    {capitalizeFirstLetter("Shipyaari")}
                  </h1>
                </div>
                <div className="flex justify-end items-center gap-x-1">
                  <img
                    src={
                      firstB2BObject.isCollapse === true
                        ? UpArrowIcon
                        : DownArrowIcon
                    }
                    alt=""
                    className="cursor-pointer"
                    onClick={() => {}}
                  />
                </div>
              </div>
              {firstB2BObject.isCollapse && (
                <>
                  <div className="overflow-auto ">
                    <RateCardTable serviceData={serviceArray} />
                  </div>
                </>
              )}
            </div>
            {/* variable charges code commented for now as no requirement for now */}

            <div className="ml-4 mt-6">
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
            </div>
          </div>
        </>
      );
    });
  };

  useEffect(() => {
    (async () => {
      const { data } = await POST(COURIER_PRICING);
      if (data?.success) {
        // if (data.data[0].accountType === "B2C") {
        //   setData(data?.data);
        // } else {
        //   setData({ ...data, b2bData: data.data[0].rates });
        // }
        setData(data?.data);
      } else {
        toast.error(data.message);
      }
    })();
  }, [renderingComponents]);

  function getComponentToRender(renderingComponents: any, isMasked: any) {
    if (renderingComponents === 0) {
      return isMasked ? <RatesB2CForMaskedpartners /> : <RatesB2CForpartners />;
    } else if (renderingComponents === 1) {
      return isMasked ? <RatesB2BForMaskedpartners /> : <RatesB2BForpartners />;
    } else {
      return null; // Default case if no conditions are met
    }
  }

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
        {getComponentToRender(renderingComponents, isMasked)}
      </div>
    </div>
  );
};

export default CourierPricing;
