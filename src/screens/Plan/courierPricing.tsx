import React, { useEffect, useState } from "react";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import SortIcon from "../../assets/sort.svg";
import { POST } from "../../utils/webService";
import { COURIER_PRICING } from "../../utils/ApiUrls";
import { capitalizeFirstLetter } from "../../utils/utility";

const CourierPricing = () => {
  const columnsHelper = createColumnHelper<any>();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await POST(COURIER_PRICING);
      if (data?.sucess) {
        setData(data?.data[0]?.rates);
      } else {
      }
    })();
  }, []);

  const CourierPricingDataHeading = [
    columnsHelper.accessor("serviceName", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Service Name
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.companyServiceName)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("courier", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Partner Name
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.courier)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("partnerServiceName", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Partner Service Name
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.partnerServiceName)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("transit", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Transit
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.transit)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("mode", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Mode
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.mode)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("category", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Category
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.category)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("base_add", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Base/Add
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.base_add)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("weight", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Weight (Kgs)
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.weight} Kg
          </p>
        );
      },
    }),
    columnsHelper.accessor("from", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              From (Kgs)
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.from} Kg
          </p>
        );
      },
    }),
    columnsHelper.accessor("to", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              To (Kgs)
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.to} Kg
          </p>
        );
      },
    }),
    columnsHelper.accessor("zone", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Zone
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {capitalizeFirstLetter(info.row.original.zone)}
          </p>
        );
      },
    }),
    columnsHelper.accessor("price", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              Price
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            ₹ {info.row.original.price}
          </p>
        );
      },
    }),
    columnsHelper.accessor("codCharges", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              COD
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            ₹ {info.row.original.codCharges}
          </p>
        );
      },
    }),
    columnsHelper.accessor("codPercentage", {
      header: () => {
        return (
          <div className="flex justify-between">
            <p className="font-Open text-sm font-semibold leading-[18px]  text-[#1C1C1C] self-center whitespace-nowrap">
              COD %
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.codPercentage} %
          </p>
        );
      },
    }),
  ];

  return (
    <div className="ml-[30px] mb-[68px] overflow-x-scroll ">
      <CustomTable columns={CourierPricingDataHeading} data={data || []} />
    </div>
  );
};

export default CourierPricing;
