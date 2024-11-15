import React, { useState } from "react";
import CancelIcon from "../../assets/common/cancel.svg";
import AddButton from "../../components/Button";
import CustomInputBox from "../../components/Input";
import { POST } from "../../utils/webService";
import {
  COMPANY_NAME,
  GET_SERVICABLEV2_PINCODE,
  GET_SERVICABLE_PINCODE,
} from "../../utils/ApiUrls";
import "../../styles/scrollablePincodeServiceTale.css";
import { toast } from "react-hot-toast";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { capitalizeFirstLetter } from "../../utils/utility";
import CustomTableWithScroll from "../../components/CustomTableWithScroll";
import OneButton from "../../components/Button/OneButton";
import { useSelector } from "react-redux";

interface ITypeProps {
  onClick?: any;
}

const ServicabilityPincode = (props: ITypeProps) => {
  const columnsHelper = createColumnHelper<any>();
  const isMasked = useSelector((state: any) => state?.user?.isMasked);

  const { onClick } = props;
  const [pincode, setPincode] = useState("");
  const [response, setResponse] = useState<any>(null);

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPincode(e.target.value);
  };

  const payload = {
    pincode: +pincode,
  };

  const postServicablePincode = async (payload: any) => {
    try {
      const { data: response } = await POST(GET_SERVICABLEV2_PINCODE, payload);

      if (response?.success) {
        const tempArray = response.data?.[0].partnerServices.map(
          (perData: any) => {
            return {
              partnerServiceId: perData.partnerServiceId,
              partnerServiceName: perData.partnerServiceName,
              zoneMapping: perData.zoneMapping,
              partnerId: perData.partnerId,
              partnerName: perData.partnerName,
              isCod: perData.isCod,
              isInsured: perData.isInsured,
              pincode: response.data?.[0].pincode,
              city: response.data?.[0].city,
              country: response.data?.[0].country,
              state: response.data?.[0].state,
              isPickup: perData.isPickup,
              isDelivery: perData.isDelivery,
              maxInvoiceValue: perData.maxInvoiceValue,
              dutyTax: perData.dutyTax,
              additionalCharged: perData.additionalCharged,
              stateBlock: perData.stateBlock,
              isActive: perData.isActive,
            };
          }
        );

        if (isMasked) {
          let slice = tempArray?.slice(0, 1);
          slice.forEach((element: any, i: number) => {
            element.partnerServiceName = COMPANY_NAME || "Shipyaari";
          });
          setResponse(slice);
        } else {
          setResponse(tempArray);
        }
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error in ServicablePincode API", error);
      return error;
    }
  };

  const displayTableField = (name: string, value: string) => {
    return (
      <>
        <p className="mt-2 text-[#1C1C1C] font-Open text-xs font-normal">
          {capitalizeFirstLetter(name)}:
        </p>
        <p className="text-[#1C1C1C] font-Open text-sm font-semibold">
          {typeof value === "string" ? capitalizeFirstLetter(value) : value}
        </p>
      </>
    );
  };

  const columns = [
    columnsHelper.accessor("accountName", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Partner Details
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex flex-col">
            {displayTableField(
              "Name",
              info.row.original.partnerServiceName.replace(/_/g, " ")
            )}
          </div>
        );
      },
    }),
    columnsHelper.accessor("pincode", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Pincode Details
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex flex-col">
            {displayTableField("Pincode", info.row.original.pincode)}
          </div>
        );
      },
    }),
    columnsHelper.accessor("city", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Location Details
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="flex flex-col">
            {displayTableField("City", info.row.original.city)}
            {displayTableField("State", info.row.original.state)}
            {displayTableField("Country", info.row.original.country)}
          </div>
        );
      },
    }),
    columnsHelper.accessor("state", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Serviceability
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        console.log();
        return (
          <div className="flex flex-col">
            {displayTableField("COD", info.row.original.isCod ? "Yes" : "No")}
            {displayTableField(
              "Insurance",
              info.row.original.isInsured ? "Yes" : "No"
            )}
            {displayTableField(
              "Pickup",
              info.row.original.isPickup ? "Yes" : "No"
            )}
            {displayTableField(
              "Delivery",
              info.row.original.isDelivery ? "Yes" : "No"
            )}
          </div>
        );
      },
    }),
  ];

  return (
    <div className="flex flex-col lg:h-screen lg:w-full lg:py-5">
      <div className="flex justify-between lg:mb-10 lg:px-5">
        <div className="flex gap-x-2 lg:gap-x-3 ">
          <h3 className="lg:font-Lato lg:text-2xl lg:text-[#323232] ml-4">
            Servicable Pincode
          </h3>
        </div>
        <div>
          <img
            src={CancelIcon}
            alt=""
            onClick={onClick}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col items-center px-4 mt-5">
        <div className="w-full max-w-md mb-4">
          <CustomInputBox
            label="Enter Pincode"
            value={pincode}
            onChange={handlePincodeChange}
            className="w-full"
          />
        </div>

        <div className="w-full max-w-md mb-6">
          <OneButton
            text="Check Availability"
            onClick={() => {
              postServicablePincode(payload);
            }}
            variant="primary"
            className="w-full"
          />
        </div>
      </div>

      {response && response.length > 0 && (
        <div className="ml-10 mr-5 max-h-[550px] customScroll">
          <CustomTable columns={columns} data={response || []} />
        </div>
      )}
    </div>
  );
};

export default ServicabilityPincode;
