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
import InformativeIcon from "../../assets/I icon.svg";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import CustomButton from "../../components/Button";
import { CANCEL_TEMP_SELLER_ORDER } from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import { stat } from "fs";
import { capitalizeFirstLetter } from "../../utils/utility";
import editIcon from "../../assets/serv/edit.svg";

const ColumnsHelper = createColumnHelper<any>();

const ProductBox = ({ name = "", dimension = "" }: any) => {
  return (
    <div className="flex flex-col gap-y-0 whitespace-nowrap text-[14px] text-[#1C1C1C] font-normal">
      <span>{name}</span>
      <div>
        <span>Dimention: </span>
        <span className="font-semibold">
          {`${dimension?.length}x${dimension.breadth}x${dimension.height}`} cm
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
    ColumnsHelper.accessor("Pickup Adreess", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Pickup Adress</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="text-base py-3 ]">
            {capitalizeFirstLetter(
              info?.row?.original?.pickupAddress?.fullAddress
            ) ?? (
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
          <div className="text-base  py-3 ]">
            {capitalizeFirstLetter(
              info?.row?.original?.deliveryAddress?.fullAddress
            ) ?? (
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
    ColumnsHelper.accessor("Payment", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Payment Mode</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { service, codInfo } = info?.row?.original;
        return (
          <>
            <div className="flex flex-col gap-y-1 text-base py-3">
              <p>
                <span>Invoice Value : </span>
                {codInfo.invoiceValue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>
              <p>
                <span>COD : </span>
                {codInfo?.collectableAmount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>

              <span>
                {codInfo
                  ? codInfo?.isCod
                    ? "Payment Type : COD"
                    : "Payment Type : PREPAID"
                  : "-"}
              </span>
            </div>
          </>
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
      const { service } = info?.row?.original;
      return (
        <div className=" ">
          <div className="py-2 flex flex-col">
            <span className="text-sm font-light">Delivery Partner</span>
            <div className="font-semibold">{service?.partnerName}</div>
          </div>
        </div>
      );
    },
  }),
];

const idHelper = (navigate: any = "", setInfoModalContent?: any) => [
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
        tempOrderId,
        orderId,
        status = [],
        source,
        updatedAt,
        orderType,
      } = info?.row?.original;
      const { AWB } = status[0] ?? "";

      return (
        <div className="py-3">
          {tempOrderId && (
            <div className="">
              <span className="text-sm font-light">Shipyaari ID :</span>
              <div className="flex text-base items-center font-medium">
                <span
                  className=""
                  data-tooltip-id="my-tooltip-inline"
                  data-tooltip-content="Complete Order"
                >
                  {tempOrderId}
                </span>

                <CopyTooltip stringToBeCopied={tempOrderId} />
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

          <div className="flex items-center">
            <span className=" text-sm font-light">Source :</span>
            <div className=" pl-2 text-base items-center font-medium">
              <span className="">{source}</span>
            </div>
          </div>
          <div className="flex items-center">
            <span className=" text-sm font-light">Order Type :</span>
            <div className=" pl-2 flex text-base items-center font-medium">
              <span className="">{orderType}</span>
            </div>
          </div>
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
      const rowsData = info?.row?.original;
      const timeStamp = status?.[0]?.timeStamp;
      const time = timeStamp && date_DD_MMM_YYY(timeStamp);
      // const renderStatus = status?.[0]?.currentStatus || "Draft";
      let renderStatus =
        rowsData?.status?.[rowsData?.status?.length - 1].currentStatus ||
        "DRAFT";
      const rows: any = [
        {
          title: "Pickup Address",
          FlatNo: rowsData?.pickupAddress?.flatNo,
          LandkMark: rowsData?.pickupAddress?.landmark,
          Locality: rowsData?.pickupAddress?.locality,
          City: rowsData?.pickupAddress?.city,
          State: rowsData?.pickupAddress?.state,
          Pincode: rowsData?.pickupAddress?.pincode,
          Country: rowsData?.pickupAddress?.country,
          "Address Type": rowsData?.pickupAddress?.addressType,
          Name: rowsData?.pickupAddress?.contact?.name,
          "Email Id": rowsData?.pickupAddress?.contact?.emailId,
          Type: rowsData?.pickupAddress?.contact?.type,
        },
        {
          title: rowsData?.deliveryAddress?.flatNo && "Delivery Address",
          FlatNo: rowsData?.deliveryAddress?.flatNo,
          Landmark: rowsData?.deliveryAddress?.landmark,
          Locality: rowsData?.deliveryAddress?.locality,
          City: rowsData?.deliveryAddress?.city,
          State: rowsData?.deliveryAddress?.state,
          Pincode: rowsData?.deliveryAddress?.pincode,
          Country: rowsData?.deliveryAddress?.country,
          "Address Type": rowsData?.deliveryAddress?.addressType,
          Name: rowsData?.deliveryAddress?.contact?.name,
          "Email Id": rowsData?.deliveryAddress?.contact?.emailId,
          Type: rowsData?.deliveryAddress?.contact?.type,
        },
        {
          title: rowsData?.service?.companyServiceId && "Services",
          "Partner Name": rowsData?.service?.partnerName,
          "AVN Service": rowsData?.service?.companyServiceName,
          "Service Mode": rowsData?.service?.serviceMode,
          "Applied Weight": rowsData?.service?.appliedWeight,
          "Freight Charges": (
            rowsData?.service?.add + rowsData?.service?.base
          )?.toFixed(2),
          "COD Charges": rowsData?.service?.cod,
          Insurance: rowsData?.service?.insurance,
          "Other Charges": rowsData?.service?.variables,
          GST: rowsData?.service?.gst?.toFixed(2),
          Total: rowsData?.service?.total?.toFixed(2),
        },
      ];
      let boxObj: any = { title: "" };
      rowsData?.boxInfo?.map((item: any, index: any) => {
        let title = `Box Info ${
          rowsData?.boxInfo?.length > 1 ? `${index + 1}` : ""
        }`;
        let qty = 0;
        item?.products?.map((elem: any, num: any) => {
          boxObj = {
            ...boxObj,
            [`Name ${num + 1}`]: elem?.name,
            [`QTY ${num + 1}`]: elem?.qty,
            [`Dead Weight ${num + 1}`]: elem?.deadWeight,
            [`Applied Weight ${num + 1}`]: elem?.appliedWeight,
            [`Dimensions ${
              num + 1
            }`]: `${elem?.length} x ${elem?.breadth} x ${elem?.height}`,
            [`Price ${num + 1}`]: elem?.unitPrice,
            [`Tax ${num + 1}`]: elem?.unitTax,
            [`SKU ${num + 1}`]: elem?.sku,
          };
          qty += elem?.qty;
        });
        title += ` Product(s) x ${qty}`;
        boxObj.title = title;
        rows.push(boxObj);
      });

      let statusObj: any = { title: "" };
      rowsData?.status?.map((elem: any, index: any) => {
        statusObj = {
          ...statusObj,
          [`AWB No ${index + 1}`]: elem.AWB,
          [`Current Status ${index + 1}`]: elem.currentStatus,
          [`Description ${index + 1}`]: elem.description,
          [`LogId ${index + 1}`]: elem.logId,
          [`Notes ${index + 1}`]: elem.notes,
          [`Time ${index + 1}`]: date_DD_MMM_YYY(elem.timeStamp),
        };
        statusObj.title = "Status";
      });
      rows.push(statusObj);

      rows.push({
        title: "Other Details",
        "Shipyaari ID": rowsData?.tempOrderId,
        "Order Id": rowsData?.orderId,
        "Tracking Id": rowsData?.otherDetails?.awbNo,
        Source: rowsData?.source,
        "Order Type": rowsData?.orderType,
      });

      // if (rowsData?.orderId === "100175") {
      //   console.log("rowsData: ", rowsData);
      // }

      const handleInformativeModal = () => {
        setInfoModalContent({
          isOpen: true,
          data: rows,
          orderId: rowsData.orderId
            ? rowsData.orderId
            : `T${rowsData.tempOrderId}`,
        });
      };
      return (
        <div className="py-3">
          {
            <div className="flex flex-col gap-y-1">
              <div className="flex text-base items-center font-medium">
                <div className="flex gap-x-1 items-center">
                  <div>
                    <p>{renderStatus}</p>
                  </div>
                  {setInfoModalContent && (
                    <div
                      className="cursor-pointer"
                      onClick={handleInformativeModal}
                    >
                      <img src={InformativeIcon} width={"20px"} />
                    </div>
                  )}
                </div>
              </div>
              <div>{time}</div>
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
  setDeleteModalDraftOrder: any,
  setInfoModalContent?: any
) => {
  const handleDeleteModalDraftOrder = (payload: any) => {
    setDeleteModalDraftOrder({ isOpen: true, payload });
  };

  return [
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
          tempOrderId,
          orderId,
          status = [],
          source,
          updatedAt,
          orderType,
        } = info?.row?.original;
        const { AWB } = status[0] ?? "";
        return (
          <div className="py-3">
            {tempOrderId && (
              <div className="">
                <span className="text-sm font-light">Shipyaari ID :</span>
                <div className="flex text-base items-center font-medium">
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

                  <CopyTooltip stringToBeCopied={tempOrderId} />
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
            <div className="">
              <span className=" text-sm font-light">Order Updated At :</span>
              <div className=" flex text-base items-center font-medium">
                <span className="">{date_DD_MMM_YYY(updatedAt)}</span>
              </div>
            </div>

            <div className="flex items-center">
              <span className=" text-sm font-light">Source :</span>
              <div className=" pl-2 text-base items-center font-medium">
                <span className="">{source}</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className=" text-sm font-light">Order Type :</span>
              <div className=" pl-2 flex text-base items-center font-medium">
                <span className="">{orderType}</span>
              </div>
            </div>
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
        let rowData = info?.row?.original;
        const latestStatus =
          rowData?.status?.[rowData?.status?.length - 1]?.currentStatus;
        const { status, tempOrderId, source } = info?.row?.original;
        const rowsData = info?.row?.original;
        // console.log("rowData: ", info?.row?.original);
        const timeStamp = status?.[0]?.timeStamp;
        const time = timeStamp && date_DD_MMM_YYY(timeStamp);
        const renderStatus = status?.[0]?.currentStatus || "Draft";
        const rows: any = [
          {
            title: "Pickup Address",
            FlatNo: rowsData?.pickupAddress?.flatNo,
            LandkMark: rowsData?.pickupAddress?.landmark,
            Locality: rowsData?.pickupAddress?.locality,
            City: rowsData?.pickupAddress?.city,
            State: rowsData?.pickupAddress?.state,
            Pincode: rowsData?.pickupAddress?.pincode,
            Country: rowsData?.pickupAddress?.country,
            "Address Type": rowsData?.pickupAddress?.addressType,
            Name: rowsData?.pickupAddress?.contact?.name,
            "Email Id": rowsData?.pickupAddress?.contact?.emailId,
            Type: rowsData?.pickupAddress?.contact?.type,
          },
          {
            title: rowsData?.deliveryAddress?.flatNo && "Delivery Address",
            FlatNo: rowsData?.deliveryAddress?.flatNo,
            Landmark: rowsData?.deliveryAddress?.landmark,
            Locality: rowsData?.deliveryAddress?.locality,
            City: rowsData?.deliveryAddress?.city,
            State: rowsData?.deliveryAddress?.state,
            Pincode: rowsData?.deliveryAddress?.pincode,
            Country: rowsData?.deliveryAddress?.country,
            "Address Type": rowsData?.deliveryAddress?.addressType,
            Name: rowsData?.deliveryAddress?.contact?.name,
            "Email Id": rowsData?.deliveryAddress?.contact?.emailId,
            Type: rowsData?.deliveryAddress?.contact?.type,
          },
          {
            title: rowsData?.service?.companyServiceId && "Services",
            "Partner Name": rowsData?.service?.partnerName,
            "AVN Service": rowsData?.service?.companyServiceName,
            "Service Mode": rowsData?.service?.serviceMode,
            "Applied Weight": rowsData?.service?.appliedWeight,
            "Freight Charges": (
              rowsData?.service?.add + rowsData?.service?.base
            )?.toFixed(2),
            "COD Charges": rowsData?.service?.cod,
            Insurance: rowsData?.service?.insurance,
            "Other Charges": rowsData?.service?.variables,
            GST: rowsData?.service?.gst?.toFixed(2),
            Total: rowsData?.service?.total?.toFixed(2),
          },
        ];
        let boxObj: any = { title: "" };
        rowsData?.boxInfo?.map((item: any, index: any) => {
          let title = `Box Info ${
            rowsData?.boxInfo?.length > 1 ? `${index + 1}` : ""
          }`;
          let qty = 0;
          item?.products?.map((elem: any, num: any) => {
            boxObj = {
              ...boxObj,
              [`Name ${num + 1}`]: elem?.name,
              [`QTY ${num + 1}`]: elem?.qty,
              [`Dead Weight ${num + 1}`]: elem?.deadWeight,
              [`Applied Weight ${num + 1}`]: elem?.appliedWeight,
              [`Dimensions ${
                num + 1
              }`]: `${elem?.length} x ${elem?.breadth} x ${elem?.height}`,
              [`Price ${num + 1}`]: elem?.unitPrice,
              [`Tax ${num + 1}`]: elem?.unitTax,
              [`SKU ${num + 1}`]: elem?.sku,
            };
            qty += elem?.qty;
          });
          title += ` Product(s) x ${qty}`;
          boxObj.title = title;
          rows.push(boxObj);
        });

        let statusObj: any = { title: "" };
        rowsData?.status?.map((elem: any, index: any) => {
          statusObj = {
            ...statusObj,
            [`AWB No ${index + 1}`]: elem.AWB,
            [`Current Status ${index + 1}`]: elem.currentStatus,
            [`Description ${index + 1}`]: elem.description,
            [`LogId ${index + 1}`]: elem.logId,
            [`Notes ${index + 1}`]: elem.notes,
            [`Time ${index + 1}`]: date_DD_MMM_YYY(elem.timeStamp),
          };
          statusObj.title = "Status";
        });
        rows.push(statusObj);

        rows.push({
          title: "Other Details",
          "Shipyaari ID": rowsData?.tempOrderId,
          "Order Id": rowsData?.orderId,
          "Tracking Id": rowsData?.otherDetails?.awbNo,
          Source: rowsData?.source,
          "Order Type": rowsData?.orderType,
        });

        // if (rowsData?.orderId === "100175") {
        //   console.log("rowsData: ", rowsData);
        // }

        const handleInformativeModal = () => {
          setInfoModalContent({
            isOpen: true,
            data: rows,
            orderId: rowsData.orderId
              ? rowsData.orderId
              : `T${rowsData.tempOrderId}`,
          });
        };
        return (
          <div className="py-3">
            {
              <div className="flex flex-col gap-y-1">
                <div className="flex text-base items-center font-medium">
                  <div className="flex gap-x-1 items-center">
                    <div>
                      <p>{latestStatus ? latestStatus : "DRAFT"}</p>
                    </div>
                    {setInfoModalContent && (
                      <div
                        className="cursor-pointer"
                        onClick={handleInformativeModal}
                      >
                        <img src={InformativeIcon} width={"20px"} />
                      </div>
                    )}
                  </div>
                  <div
                    className="lg:block cursor-pointer pl-1"
                    onClick={() => {
                      navigate(
                        `/orders/add-order/pickup?shipyaari_id=${tempOrderId}&source=${source}`
                      );
                    }}
                  >
                    <div style={{ width: "20px", height: "20px" }}>
                      {" "}
                      <img
                        src={editIcon}
                        alt="editIcon"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
                <div>{time}</div>
              </div>
            }
          </div>
        );
      },
    }),
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
            {boxInfo?.length > 0 ? (
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
            <h1>Pickup Adress</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="text-base py-3]">
            {capitalizeFirstLetter(
              info?.row?.original?.pickupAddress?.fullAddress
            ) ?? (
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
          <div className="text-base  py-3 ]">
            {capitalizeFirstLetter(
              info?.row?.original?.deliveryAddress?.fullAddress
            ) ?? (
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
            <h1>Payment Mode</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { service, codInfo } = info?.row?.original;
        return (
          <>
            <div className="flex flex-col gap-y-1 text-base py-3">
              <p>
                <span>Invoice Value : </span>
                {codInfo.invoiceValue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>
              <p>
                <span>COD : </span>
                {codInfo?.collectableAmount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>

              <span>
                {codInfo
                  ? codInfo?.isCod
                    ? "Payment Type : COD"
                    : "Payment Type : PREPAID"
                  : "-"}
              </span>
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
          Package Details: ${boxInfo?.length > 0 && boxInfo[0].name} ${
          (boxInfo?.length > 0 && boxInfo[1]?.boxInfo) || ""
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
  setCancellationModal?: any,
  setInfoModalContent?: any
) => {
  const handleCancellationModal = (awbNo: any, orderId: any) => {
    setCancellationModal({ isOpen: true, awbNo, orderId });
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
    ...idHelper(navigate, setInfoModalContent),
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
                <div>
                  <img
                    src={CrossIcon}
                    width={"35px"}
                    // alt="Cancel Order"
                    className=" group-hover:flex cursor-pointer p-[6px] hover:-translate-y-[0.1rem] hover:scale-110 duration-300"
                    onClick={() =>
                      handleCancellationModal(
                        data?.status?.[0]?.AWB,
                        data?.orderId
                      )
                    }
                    data-tooltip-id="my-tooltip-inline"
                    data-tooltip-content="Cancel Order"
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
              )}
            </div>
          </>
        );
      },
    }),
  ];
};
export const columnHelpersForRest = (
  navigate: any,
  setInfoModalContent: any
) => {
  return [
    // ...commonColumnHelper,
    ColumnsHelper.accessor("packageType", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1>Courier Details</h1>
          </div>
        );
      },
      cell: (info: any) => {
        const { service } = info?.row?.original;
        return (
          <div className=" ">
            <div className="py-2 flex flex-col">
              <span className="text-sm font-light">Delivery Partner</span>
              <div className="font-semibold">{service?.partnerName}</div>
            </div>
          </div>
        );
      },
    }),
    ...idHelper(navigate, setInfoModalContent),
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
};
