import BlackShipIcon from "../../assets/OrderDetails/BlackShipIcon.svg";
import Delivery from "../../assets/OrderDetails/Delivery.svg";
import CopyIcon from "../../assets/OrderDetails/CopyIcon.svg";
import { createColumnHelper } from "@tanstack/react-table";
import CopyTooltip from "../../components/CopyToClipboard";
import { date_DD_MMM_YYY } from "../../utils/dateFormater";
import HamBurger from "../../assets/HamBurger.svg";
import MenuForColumnHelper from "./MenuComponent /MenuForColumnHelper";
import ShowLabel from "./ShowLabel";
const ColumnsHelper = createColumnHelper<any>();

const ProductBox = ({ name = "", dimension = "" }: any) => {
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
const MainCommonHelper = (navigate: any = "") => {
  return [
    ColumnsHelper.accessor("Payment", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Amounts</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { payment, codInfo } = info?.row?.original;
        return (
          <>
            <div className="flex flex-col gap-y-2 text-base py-3 justify-start">
              <span>
                {payment?.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                }) ?? "0"}
              </span>
              <span>{codInfo ? (codInfo?.isCod ? "COD" : "ONLINE") : "-"}</span>
            </div>
          </>
        );
      },
    }),
    ColumnsHelper.accessor("Pickup Adreess", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Pickup Adreess</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="text-base py-3 text-[#8D8D8D]">
            {info?.row?.original?.pickupAddress?.fullAddress ?? (
              <div
                onClick={() => navigate("/orders/add-order/pickup")}
                className="text-[#004EFF] underline-offset-4 underline  decoration-2 cursor-pointer"
              >
                ADD PICKUP ADDRESS
              </div>
            )}
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("Delivery Adreess", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Delivery Adreess</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="text-base  py-3 text-[#8D8D8D]">
            {info?.row?.original?.deliveryAddress?.fullAddress ?? (
              <div
                onClick={() => navigate("/orders/add-order/delivery")}
                className="text-[#004EFF] underline-offset-4 underline  decoration-2 cursor-pointer"
              >
                ADD DELIVERY ADDRESS
              </div>
            )}
          </div>
        );
      },
    }),
  ];
};
const commonColumnHelper = [
  ColumnsHelper.accessor("packageType", {
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
          {/* {ProductBox(info?.row?.original?.packageType)}{" "} */}
        </div>
      );
    },
  }),
];

const idHelper = [
  ColumnsHelper.accessor("IDs", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>IDs</h1>
        </div>
      );
    },
    cell: (info: any) => {
      const {
        tempOrderId = "-",
        sellerId = "-",
        status = [],
      } = info?.row?.original;

      const { AWB } = status[0] ?? "";

      return (
        <div className="py-3">
          {tempOrderId && (
            <div className="">
              <span className=" text-sm font-light">Order :</span>
              <div className=" flex text-base items-center font-medium">
                <span className="">{tempOrderId}</span>
                <CopyTooltip stringToBeCopied={tempOrderId} />
              </div>
            </div>
          )}
          {sellerId && (
            <div className="">
              <span className=" text-sm font-light">Shipyaari :</span>
              <div className=" flex text-base items-center font-medium">
                <span className="">{sellerId}</span>
                <CopyTooltip stringToBeCopied={sellerId} />
              </div>
            </div>
          )}
          {AWB && (
            <div className="">
              <span className=" text-sm font-light">Tracking :</span>
              <div className=" flex text-base items-center font-medium">
                <span className="">{AWB}</span>
                <CopyTooltip stringToBeCopied={AWB} />
              </div>
            </div>
          )}
        </div>
      );
    },
  }),
];

// table for draft/pending order
export const columnHelperForPendingOrder = [];

export const columnHelperForNewOrder = (navigate: any) => {
  return [
    ...idHelper,
    ColumnsHelper.accessor(".", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Package Details</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { boxInfo = [] } = info?.row?.original;
        return (
          <div className="my-4 space-y-2 ">
            {boxInfo.length > 0 ? (
              <div>
                <span>
                  {boxInfo[0].name} {boxInfo[1]?.boxInfo ?? ""}
                </span>
              </div>
            ) : (
              <div
                onClick={() => navigate("/orders/add-order/product-package")}
                className="text-[#004EFF] underline-offset-4 underline  decoration-2 cursor-pointer"
              >
                ADD PACKAGE DETAILS
              </div>
            )}
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("Pickup Adreess", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Pickup Adreess</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="text-base py-3 text-[#8D8D8D]">
            {info?.row?.original?.pickupAddress?.fullAddress ?? (
              <div
                onClick={() => navigate("/orders/add-order/pickup")}
                className="text-[#004EFF] underline-offset-4 underline  decoration-2 cursor-pointer"
              >
                ADD PICKUP ADDRESS
              </div>
            )}
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("Delivery Adreess", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Delivery Adreess</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="text-base  py-3 text-[#8D8D8D]">
            {info?.row?.original?.deliveryAddress?.fullAddress ?? (
              <div
                onClick={() => navigate("/orders/add-order/delivery")}
                className="text-[#004EFF] underline-offset-4 underline  decoration-2 cursor-pointer"
              >
                ADD DELIVERY ADDRESS
              </div>
            )}
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("orderStatus", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Status</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex justify-center items-center gap-x-2 p-2 bg-[#F2FAEF] rounded-md border-[1px] border-[#7CCA62] whitespace-nowrap h-[28px] w-[93px]">
            <img src={Delivery} alt="" className="w-[12px]" />
            <span className="text-[#7CCA62] text-[12px] font-semibold  ">
              Sucsess
            </span>
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("Payment", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Payment</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { payment, codInfo } = info?.row?.original;
        return (
          <>
            <div className="flex flex-col gap-y-2 text-base py-3">
              <span>
                {payment?.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                }) ?? "0"}
              </span>
              <span>{codInfo ? (codInfo?.isCod ? "COD" : "ONLINE") : "-"}</span>
            </div>
          </>
        );
      },
    }),
    ColumnsHelper.accessor("asda", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Actions</h1>
          </div>
        );
      },
      cell: (info: any) => {
        //Status is hardcode now
        const {
          payment,
          boxInfo,
          codInfo,
          tempOrderId = "-",
          sellerId = "-",
          status,
        } = info?.row?.original;
        const { AWB } = status[0] ?? "";
        const copyString = `
          Order Id: ${tempOrderId} 
          Shipyaari Id: ${sellerId}
          Tracking Id: ${AWB}
          Package Details: ${ boxInfo.length > 0 && boxInfo[0].name} ${(boxInfo.length > 0 && boxInfo[1]?.boxInfo) || ""}
          Pickup Address: ${info?.row?.original?.pickupAddress?.fullAddress}
          Delivery Address: ${info?.row?.original?.deliveryAddress?.fullAddress}
          Status: Success
          Payment: ${
            payment?.amount.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            }) ?? "0"
          } ${codInfo ? (codInfo?.isCod ? "COD" : "ONLINE") : "-"}

        `;

        return (
          <>
            <CopyTooltip stringToBeCopied={copyString} />
          </>
        );
      },
    }),
  ];
};

export const ColumnHelperForBookedAndReadyToPicked = () => {
  return [
    // ...commonColumnHelper,
    ColumnsHelper.accessor("Pick up Expected", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Pickup Expected</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { pickupAddress, service } = info?.row?.original;
        const { pickupDate } = pickupAddress;
        const { partnerName } = service;
        return (
          <div className=" ">
            <p className="">{date_DD_MMM_YYY(pickupDate * 1000)}</p>
            <div className="py-2 flex flex-col">
              <span className="text-sm font-light">Delivery Partner</span>
              <div className="font-semibold">{partnerName}</div>
            </div>
          </div>
        );
      },
    }),
    ...idHelper,
    ...MainCommonHelper(),
    ColumnsHelper.accessor("asd", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Actions</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { otherDetails = {} } = info?.row?.original;
        const { label = [] } = otherDetails;
        const fileUrl = label[0] || "";
        return (
          <>
            {fileUrl !== "" ? (
              <ShowLabel fileUrl={fileUrl} />
            ) : (
              <div className="text-[grey]">No Label Found</div>
            )}
          </>
        );
      },
    }),
  ];
};
export const columnHelpersForRest = [
  ...commonColumnHelper,
  ColumnsHelper.accessor("createdAt", {
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
  ColumnsHelper.accessor("createdAt", {
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
  ...MainCommonHelper(),
];
