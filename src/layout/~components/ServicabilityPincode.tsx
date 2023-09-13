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

  const columns = [
    columnsHelper.accessor("accountId", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Account Id
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className="text-[#1C1C1C] font-Open text-sm font-semibold ">
            {info.row.original.accountId}
          </p>
        );
      },
    }),
    columnsHelper.accessor("partnerName", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Partner Name
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold  ">
            {info.row.original.partnerName}
          </p>
        );
      },
    }),
    columnsHelper.accessor("pincode", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Pincode
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold  ">
            {info.row.original.pincode}
          </p>
        );
      },
    }),
    columnsHelper.accessor("city", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              City
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold  ">
            {info.row.original.city}
          </p>
        );
      },
    }),
    columnsHelper.accessor("state", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              State
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold  ">
            {info.row.original.state}
          </p>
        );
      },
    }),
    columnsHelper.accessor("cod", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              COD
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p
            className={`flex items-center text-[#1C1C1C] font-Open text-sm font-semibold`}
          >
            {info.row.original.cod ? "Yes" : "No"}
          </p>
        );
      },
    }),
    columnsHelper.accessor("delivery", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Delivery
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p
            className={`flex items-center text-[#1C1C1C] font-Open text-sm font-semibold`}
          >
            {info.row.original.delivery ? "Yes" : "No"}
          </p>
        );
      },
    }),
    columnsHelper.accessor("insurance", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Insurance
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p
            className={`flex items-center text-[#1C1C1C] font-Open text-sm font-semibold`}
          >
            {info.row.original.insurance ? "Yes" : "No"}
          </p>
        );
      },
    }),

    columnsHelper.accessor("pickup", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Pickup
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p
            className={`flex items-center text-[#1C1C1C] font-Open text-sm font-semibold`}
          >
            {info.row.original.pickup ? "Yes" : "No"}
          </p>
        );
      },
    }),
  ];

  return (
    <div className="flex flex-col gap-y-8 lg:h-screen lg:w-full lg:py-5">
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

      <div className="mb-4 lg:mb-6 lg:mr-10 ml-10 w-[50%]">
        <CustomInputBox
          label="Enter Pincode"
          value={pincode}
          onChange={handlePincodeChange}
        />
      </div>

      <div className="w-[50%] ml-10">
        <AddButton
          text="Check Availability"
          onClick={() => {
            postServicablePincode(payload);
          }}
        />
      </div>
      {response && response?.data && response?.data?.length > 0 && (
        <div className="ml-10 mr-5 max-w-screen-xl ">
          <div className="overflow-x-auto  overflow-y-auto">
            <CustomTable columns={columns} data={response?.data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicabilityPincode;
