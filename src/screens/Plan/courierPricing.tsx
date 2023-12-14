import React, { useEffect, useState } from "react";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { POST } from "../../utils/webService";
import { COURIER_PRICING } from "../../utils/ApiUrls";
import { ScrollNav } from "../../components/ScrollNav";
import upArrowBlue from "../../assets/upArrorwBlue.svg";

const CourierPricing = () => {
  const columnsHelper = createColumnHelper<any>();

  const [data, setData] = useState<any>({ b2bData: [], b2cData: [] });

  const [renderingComponents, setRenderingComponents] = React.useState(0);

  const arrayData = [
    { index: 0, label: "B2B" },
    { index: 1, label: "B2C" },
  ];

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
      }
    })();
  }, [renderingComponents]);

  return (
    <div>
      <div className="mx-5 lg:ml-[30px]">
        <ScrollNav
          arrayData={arrayData}
          showNumber={false}
          setScrollIndex={setScrollIndex}
        />
      </div>

      <div className="mx-5 lg:ml-[30px] mb-[68px] overflow-x-scroll ">
        {/* {data[0].accountType==="B2C"} */}

        {renderingComponents === 0 ? (
          <CustomTable columns={columns} data={data.b2bData || []} />
        ) : (
          <CustomTable columns={columns} data={data.b2cData || []} />
        )}
      </div>
    </div>
  );
};

export default CourierPricing;
