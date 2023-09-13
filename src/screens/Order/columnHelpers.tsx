import BlackShipIcon from "../../assets/OrderDetails/BlackShipIcon.svg";
import Delivery from "../../assets/OrderDetails/Delivery.svg";
import CopyIcon from "../../assets/OrderDetails/CopyIcon.svg";
import { createColumnHelper } from "@tanstack/react-table";
const columnsHelper = createColumnHelper<any>();

const ProductBox = ({ name, dimension }: any) => {
  return (
    <div className="flex flex-col gap-y-0 whitespace-nowrap text-[14px] text-[#1C1C1C] font-normal">
      <span>{name}</span>
      <div>
        <span>Dimention: </span>
        <span className="font-semibold">
          {`${dimension.length}x${dimension.breadth}x${dimension.height}`} cm
        </span>
      </div>
      <div>
        <span>SKU: </span>
        <span className="font-semibold">GT87YU1</span>
      </div>
    </div>
  );
};
const mainCommonHelper = [
  columnsHelper.accessor("payment", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>Payment</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="flex flex-col">
          <div>
            <span className="text-[14px] font-semibold text-[#1C1C1C]">
              {info?.row?.original?.payment?.amount}
            </span>
          </div>
          <div>
            <span className="text-[16px] font-semibold text-[#777777]">
              {info?.row?.original?.payment?.gatewayName}
            </span>
          </div>
        </div>
      );
    },
  }),
  columnsHelper.accessor("orderStatus", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>Status</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="flex justify-center items-center gap-x-2 p-2 bg-[#FDF6EA] rounded-md border-[1px] border-[#F0A22E] whitespace-nowrap h-[28px] w-[93px]">
          <img src={Delivery} alt="" className="w-[12px]" />
          <span className="text-[#F0A22E] text-[12px] font-semibold  ">
            {info?.row?.original?.orderStatus?.isOrderPlaced &&
              (info?.row?.original?.orderStatus.isOrderPlaced
                ? "Sucsess"
                : "Error")}
          </span>
        </div>
      );
    },
  }),
  columnsHelper.accessor("asd", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>General Tag</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="flex justify-center items-center gap-x-2 p-2 bg-[#FDF6EA] rounded-md border-[1px] border-[#F0A22E] whitespace-nowrap h-[28px] w-[93px]">
          <img src={Delivery} alt="" className="w-[12px]" />
          <span className="text-[#F0A22E] text-[12px] font-semibold  ">
            General Tag
          </span>
        </div>
      );
    },
  }),
  columnsHelper.accessor("fdsf", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>Service Tag</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="flex justify-center items-center gap-x-2 p-2 bg-[#FDF6EA] rounded-md border-[1px] border-[#F0A22E] whitespace-nowrap h-[28px] w-[93px]">
          <img src={Delivery} alt="" className="w-[12px]" />
          <span className="text-[#F0A22E] text-[12px] font-semibold  ">
            Service Tag
          </span>
        </div>
      );
    },
  }),
  columnsHelper.accessor("deliveryLocation", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>From</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="w-[151px]">
          <span className="text-[14px] font-normal text-[#1C1C1C]">
            Jhindal Warehouse Plot no.18, Sector 7, Link road, Andheri Satish
            Sharma +91 12345 12345
          </span>
        </div>
      );
    },
  }),
  columnsHelper.accessor("asda", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>Actions</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return <span>Actions</span>;
    },
  }),
];
const commonColumnHelper = [
  columnsHelper.accessor("packageType", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>Package Details</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="my-4 space-y-2">
          {ProductBox(info?.row?.original?.packageType)}{" "}
        </div>
      );
    },
  }),
];

const idHelper = [
  columnsHelper.accessor("orderId", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>IDs</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <>
          <div className="flex flex-col gap-y-1">
            {info?.row?.original?.orderId ? (
              <div className="flex flex-col">
                <div className="flex">
                  <span className="text-[12px] font-normal">Order :</span>
                </div>
                <div className="flex justify-between gap-x-2">
                  <span className="text-[15px] ">
                    {info?.row?.original?.orderId}
                  </span>
                  <img src={CopyIcon} alt="" className="mr-4" />
                </div>
              </div>
            ) : (
              ""
            )}
            {info?.row?.original?.shipyaariId ? (
              <div className="flex flex-col">
                <div className="flex">
                  <span className="text-[12px] font-normal">Shipyaari:</span>
                </div>
                <div className="flex justify-between gap-x-2">
                  <span className="text-[15px] ">
                    {info?.row?.original?.shipyaariId}
                  </span>
                  <img src={CopyIcon} alt="" className="mr-4" />
                </div>
              </div>
            ) : (
              ""
            )}
            {info?.row?.original?.trackingId ? (
              <div className="flex flex-col">
                <div className="flex">
                  <span className="text-[12px] font-normal">Tracking:</span>
                </div>
                <div className="flex justify-between gap-x-2">
                  <span className="text-[15px] ">
                    {info?.row?.original?.trackingId}
                  </span>
                  <img src={CopyIcon} alt="" className="mr-4" />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </>
      );
    },
  }),
];

// table for draft/pending order
export const columnHelperForPendingOrder = []

export const columnHelperForNewOrder = [
  ...commonColumnHelper,
  columnsHelper.accessor("createdAt", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>Order Placed</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="flex flex-col whitespace-nowrap">
          <div className="flex gap-x-2">
            <img src={BlackShipIcon} alt="" />
            <span className="text-[14px]">04 Jun 2023</span>
          </div>
        </div>
      );
    },
  }),
  ...idHelper,
  ...mainCommonHelper,
];

export const columnHelperForBookedAndReadyToPicked = [
  ...commonColumnHelper,
  columnsHelper.accessor("createdAt", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>Pickup Expected</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="flex flex-col whitespace-nowrap">
          <div className="flex gap-x-2">
            <img src={BlackShipIcon} alt="" />
            <span className="text-[14px]">04 Jun 2023</span>
          </div>
        </div>
      );
    },
  }),
  ...idHelper,
  ...mainCommonHelper,
];
export const columnHelpersForRest = [
  ...commonColumnHelper,
  columnsHelper.accessor("createdAt", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>ETA</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="flex flex-col whitespace-nowrap">
          <div className="flex gap-x-2">
            <img src={BlackShipIcon} alt="" />
            <span className="text-[14px]">04 Jun 2023</span>
          </div>
        </div>
      );
    },
  }),
  columnsHelper.accessor("createdAt", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>Remark</h1>
        </div>
      );
    },
    cell: (info: any) => {
      return (
        <div className="flex flex-col whitespace-nowrap">
          <div className="flex gap-x-2">
            <span className="text-[14px]">Remarks</span>
          </div>
        </div>
      );
    },
  }),
  ...idHelper,
  ...mainCommonHelper,
];
