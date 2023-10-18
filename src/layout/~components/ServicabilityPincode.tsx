import React, { useState } from "react";
import CancelIcon from "../../assets/common/cancel.svg";
import AddButton from "../../components/Button";
import CustomInputBox from "../../components/Input";
import { POST } from "../../utils/webService";
import { GET_SERVICABLE_PINCODE } from "../../utils/ApiUrls";
import "../../styles/scrollablePincodeServiceTale.css";
import { toast } from "react-toastify";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { capitalizeFirstLetter } from "../../utils/utility";
import CustomTableWithScroll from "../../components/CustomTableWithScroll";

interface ITypeProps {
  onClick?: any;
}

const ServicabilityPincode = (props: ITypeProps) => {
  const columnsHelper = createColumnHelper<any>();

  const { onClick } = props;
  const [pincode, setPincode] = useState("");
  const [response, setResponse] = useState<any>(null);

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPincode(e.target.value);
  };

  const payload = {
    pincode: pincode,
  };

  const postServicablePincode = async (payload: any) => {
    try {
      const { data: response } = await POST(GET_SERVICABLE_PINCODE, payload);

      if (response?.success) {
        setResponse(response);
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
            {displayTableField("Name", info.row.original.accountName)}
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
        return (
          <div className="flex flex-col">
            {displayTableField("COD", info.row.original.cod ? "Yes" : "No")}
            {displayTableField(
              "Insurance",
              info.row.original.insurance ? "Yes" : "No"
            )}
            {displayTableField(
              "Pickup",
              info.row.original.pickup ? "Yes" : "No"
            )}
            {displayTableField(
              "Delivery",
              info.row.original.delivery ? "Yes" : "No"
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

      <div className="mb-4 lg:mr-10 ml-10 w-[20%]">
        <CustomInputBox
          label="Enter Pincode"
          value={pincode}
          onChange={handlePincodeChange}
        />
      </div>

      <div className="mb-6 w-[20%] ml-10">
        <AddButton
          text="Check Availability"
          onClick={() => {
            postServicablePincode(payload);
          }}
        />
      </div>

      {response && response?.data && response?.data?.length > 0 && (
        <div className="ml-10 mr-5  overflow-scroll">
          <CustomTable columns={columns} data={response?.data} />
        </div>
      )}
    </div>
  );
};

export default ServicabilityPincode;
