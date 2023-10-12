import BlackShipIcon from "../../assets/OrderDetails/BlackShipIcon.svg";
import Delivery from "../../assets/OrderDetails/Delivery.svg";
import CopyIcon from "../../assets/OrderDetails/CopyIcon.svg";
import { createColumnHelper } from "@tanstack/react-table";
import CopyTooltip from "../../components/CopyToClipboard";
import { date_DD_MMM_YYY } from "../../utils/dateFormater";
import HamBurger from "../../assets/HamBurger.svg";
import MenuForColumnHelper from "./MenuComponent /MenuForColumnHelper";
import ShowLabel from "./ShowLabel";
import CrossIcon from "../../assets/cross.svg";
import DeleteIconForLg from "../../assets/DeleteIconRedColor.svg";
import DeleteIcon from "../../assets/DeleteIconRedColor.svg";

import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import CustomButton from "../../components/Button";
import { CANCEL_TEMP_SELLER_ORDER } from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import { stat } from "fs";

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

const idHelper = (navigate: any = "") => [
  ColumnsHelper.accessor("IDs", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>IDs</h1>
        </div>
      );
    },
    cell: (info: any) => {
      const { tempOrderId, orderId, status = [], source } = info?.row?.original;
      const { AWB } = status[0] ?? "";
      return (
        <div className="py-3">
          {tempOrderId && (
            <div className="">
              <span className="text-sm font-light">Shipyaari ID :</span>
              <div className="flex text-base items-center font-medium">
                {status.length === 0 ? (
                  <Link
                    to={`/orders/add-order/pickup?shipyaari_id=${tempOrderId}&source=${source}`}
                    className="underline text-blue-500 cursor-pointer"
                  >
                    <span
                      className=""
                      data-tooltip-id="my-tooltip-inline"
                      data-tooltip-content="Complete Order"
                    >
                      {tempOrderId}
                    </span>
                  </Link>
                ) : (
                  <span className=""> {tempOrderId}</span>
                )}
              </div>
            </div>
          )}
          {orderId && (
            <div className="">
              <span className=" text-sm font-light">Order ID :</span>
              <div className=" flex text-base items-center font-medium">
                <span className="">{orderId}</span>
                <CopyTooltip stringToBeCopied={orderId} />
              </div>
            </div>
          )}
          {AWB && (
            <div className="">
              <span className=" text-sm font-light">Tracking :</span>
              <div className="flex text-base items-center font-medium">
                <span
                  onClick={() =>
                    navigate({
                      pathname: "/tracking",
                      search: `?trackingNo=${AWB}`,
                    })
                  }
                  className="hover:text-[#004EFF] underline-offset-4 underline  decoration-2 cursor-pointer"
                  data-tooltip-id="my-tooltip-inline"
                  data-tooltip-content="Track"
                >
                  {AWB}
                </span>
                <Tooltip
                  id="my-tooltip-inline"
                  style={{
                    backgroundColor: "bg-neutral-900",
                    color: "#FFFFFF",
                    width: "fit-content",
                    fontSize: "14px",
                    lineHeight: "16px",
                  }}
                />
                <CopyTooltip stringToBeCopied={AWB} />
              </div>
            </div>
          )}
        </div>
      );
    },
  }),
  //STATUS
  ColumnsHelper.accessor("Status", {
    header: () => {
      return (
        <div className="flex justify-between">
          <h1>Status</h1>
        </div>
      );
    },
    cell: (info: any) => {
      const { status } = info?.row?.original;
      console.log("status", status?.[0]?.currentStatus);
      const renderStatus = status?.[0]?.currentStatus || "Draft";
      console.log("renderStatus", renderStatus);
      return (
        <div className="py-3">
          {
            <div className="">
              <div className="flex text-base items-center font-medium">
                <p>{renderStatus}</p>
              </div>
            </div>
          }
        </div>
      );
    },
  }),
];

// table for draft/pending order
export const columnHelperForPendingOrder = [];

export const columnHelperForNewOrder = (
  navigate: any,
  setDeleteModalDraftOrder: any
) => {
  const handleDeleteModalDraftOrder = (payload: any) => {
    setDeleteModalDraftOrder({ isOpen: true, payload });
  };

  return [
    ...idHelper(),
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
                // onClick={() => navigate("/orders/add-order/product-package")}
                className="  decoration-2 "
              >
                No Package Details Found
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
                // onClick={() => navigate("/orders/add-order/delivery")}
                className="  decoration-2 text-[black]"
              >
                No Delivery Address Found
              </div>
            )}
          </div>
        );
      },
    }),
    // ColumnsHelper.accessor("orderStatus", {
    //   header: () => {
    //     return (
    //       <div className="flex justify-between">
    //         <h1>Status</h1>
    //       </div>
    //     );
    //   },
    //   cell: (info: any) => {
    //     return (
    //       <div className="flex justify-center items-center gap-x-2 p-2 bg-[#f6eddf] rounded-md border-[1px] border-[#e5a235] whitespace-nowrap h-[28px] w-[93px]">
    //         <img src={Delivery} alt="" className="w-[12px]" />
    //         <span className="text-[#F0AE47] text-[12px] font-semibold  ">
    //           Success
    //         </span>
    //       </div>
    //     );
    //   },
    // }),
    ColumnsHelper.accessor("Payment", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Charges</h1>
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
          source,
        } = info?.row?.original;
        const { AWB } = status[0] ?? "";
        const copyString = `
          Order Id: ${tempOrderId} 
          Shipyaari Id: ${sellerId}
          Tracking Id: ${AWB}
          Package Details: ${boxInfo.length > 0 && boxInfo[0].name} ${
          (boxInfo.length > 0 && boxInfo[1]?.boxInfo) || ""
        }
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
        let draftOrderPayload = {
          tempOrderId: tempOrderId,
          source: source,
        };
        return (
          <div className="flex items-center">
            <CopyTooltip stringToBeCopied={copyString} />

            <img
              src={DeleteIconForLg}
              alt="Delete "
              onClick={() => {
                handleDeleteModalDraftOrder(draftOrderPayload);
              }}
              className="w-5 h-5 cursor-pointer "
              data-tooltip-id="my-tooltip-inline"
              data-tooltip-content="Delete Order"
            />
            <Tooltip
              id="my-tooltip-inline"
              style={{
                backgroundColor: "bg-neutral-900",
                color: "#FFFFFF",
                width: "fit-content",
                fontSize: "14px",
                lineHeight: "16px",
              }}
            />
          </div>
        );
      },
    }),
  ];
};

export const ColumnHelperForBookedAndReadyToPicked = (
  navigate: any,
  setCancellationModal?: any
) => {
  const handleCancellationModal = (awbNo: any) => {
    setCancellationModal({ isOpen: true, awbNo });
  };
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
        return (
          <div className=" ">
            <p className="">
              {pickupAddress?.pickupDate
                ? date_DD_MMM_YYY(pickupAddress?.pickupDate * 1000)
                : null}
            </p>
            <div className="py-2 flex flex-col">
              <span className="text-sm font-light">Delivery Partner</span>
              <div className="font-semibold">{service?.partnerName}</div>
            </div>
          </div>
        );
      },
    }),
    ...idHelper(navigate),
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
        const { original } = info.cell.row;
        const data = original;

        const { otherDetails = {} } = info?.row?.original;
        const { label = [] } = otherDetails;
        const fileUrl = label[0] || "";
        return (
          <>
            <div className="flex items-center ">
              {fileUrl !== "" ? (
                <ShowLabel fileUrl={fileUrl} />
              ) : (
                <div className="text-[grey]">No Label Found</div>
              )}
              {setCancellationModal && (
                <img
                  src={CrossIcon}
                  width={"35px"}
                  alt="Cancel Order"
                  className=" group-hover:flex cursor-pointer p-[6px] hover:-translate-y-[0.1rem] hover:scale-110 duration-300"
                  onClick={() =>
                    handleCancellationModal(data.wayBillObject.AWBNo)
                  }
                />
              )}
            </div>
          </>
        );
      },
    }),
  ];
};
export const columnHelpersForRest = [
  ...idHelper(),
  // ColumnsHelper.accessor("createdAt", {
  //   header: () => {
  //     return (
  //       <div className="flex justify-between">
  //         <h1>ETA</h1>
  //       </div>
  //     );
  //   },
  //   cell: (info: any) => {
  //     const { original } = info.cell.row;
  //     console.log("original: ", original);

  //     return (
  //       <div className="flex flex-col whitespace-nowrap">
  //         <div className="flex gap-x-2">
  //           <img src={BlackShipIcon} alt="" />
  //           <span className="text-[14px]">04 Jun 2023</span>
  //         </div>
  //       </div>
  //     );
  //   },
  // }),
  ...commonColumnHelper,
  // ColumnsHelper.accessor("createdAt", {
  //   header: () => {
  //     return (
  //       <div className="flex justify-between">
  //         <h1>Remark</h1>
  //       </div>
  //     );
  //   },
  //   cell: (info: any) => {
  //     return (
  //       <div className="flex flex-col whitespace-nowrap">
  //         <div className="flex gap-x-2">
  //           <span className="text-[14px]">Remarks</span>
  //         </div>
  //       </div>
  //     );
  //   },
  // }),
  ...MainCommonHelper(),
];
