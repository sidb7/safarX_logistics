import React, { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../../../components/Table";
import orangeTruck from "../../../assets/orangeTruck.svg";
import RightSideModal from "../../../components/CustomModal/customRightModal";
import EditAction from "./BuyerRequestEditAction";

type Props = {
  cancelRequestData?: any;
  openRightSideModal?: any;
  setOpenRightSideModal?: any;
  getAllTracingBuyerRequest?: any;
};

const CancellationRequestTable = (props: Props) => {
  const { getAllTracingBuyerRequest } = props;
  const [awb, setAwb] = useState<any>();
  const [requestType, setRequestType] = useState<any>();
  const [openRightSideModal, setOpenRightSideModal] = useState<any>(false);

  const { cancelRequestData } = props;
  const columnsHelper = createColumnHelper<any>();

  function convertUTCToIST(utcDateTime: string) {
    const utcDate = new Date(utcDateTime);

    if (isNaN(utcDate.getTime())) return "Invalid Date";

    const IST_OFFSET = 5.5 * 60 * 60 * 1000;

    const istDate = new Date(utcDate.getTime() + IST_OFFSET);

    const formattedIST = istDate.toISOString().replace("T", " ").slice(0, -5);

    return `${formattedIST} IST`;
  }
  const columns = [
    columnsHelper.accessor("trackingNo", {
      header: () => <div className="text-left">Tracking No</div>,
      cell: (info) => {
        const awb = info?.row?.original?.awb;

        return (
          <div className="font-sans text-sm leading-5 text-black">
            <span>{awb || "NA"}</span>
          </div>
        );
      },
    }),
    columnsHelper.accessor("edd", {
      header: () => <div className="text-left">EDD</div>,
      cell: (info) => {
        const edd = info?.row?.original?.edd;
        const rescheduleEdd = info?.row?.original?.rescheduleEdd;

        const eddSplit = edd?.split("T")?.[0];
        const rescheduleEddSplit = rescheduleEdd?.split("T")?.[0];

        return (
          <div className="font-sans text-sm leading-5 text-black font-semibold w-[124px]">
            <p>{`EDD : ${eddSplit || "NA"}`}</p>
            <p className="text-[#7CCA62] text-[14px] font-Open mt-1">
              {rescheduleEdd ? (
                <>
                  <div>
                    <p>Rescheduled Edd :</p>
                    <p>{`${rescheduleEddSplit || "NA"} `}</p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </p>
          </div>
        );
      },
    }),

    columnsHelper.accessor("currentStatus", {
      header: () => <div className="text-left">Current Status</div>,
      cell: (info) => {
        const currentStatus = info?.row?.original?.currentStatus;

        // Define dynamic styles for border, text, and background colors
        const styles: any = (() => {
          if (currentStatus === "IN TRANSIT")
            return {
              border: "border-blue-500",
              bg: "bg-blue-100",
              text: "text-blue-500",
            };
          if (currentStatus === "DELIVERED")
            return {
              border: "border-green-500",
              bg: "bg-green-100",
              text: "text-green-500",
            };
          if (currentStatus === "OUT FOR DELIVERY")
            return {
              border: "border-yellow-500",
              bg: "bg-yellow-100",
              text: "text-yellow-500",
            };
          if (currentStatus === "BOOKED")
            return {
              border: "border-[#F0A22E]",
              bg: "bg-[#FDF6EA]",
              text: "text-[#F0A22E]",
            };
          return {
            border: "border-gray-300",
            bg: "bg-gray-100",
            text: "text-gray-500",
          };
        })();

        return (
          <div
            className={`flex justify-center gap-x-2 items-center border ${styles.border} ${styles.bg} ${styles.text} px-8 py-2 w-[100px]`}
          >
            {/* <img src={orangeTruck} alt="Truck" /> */}
            <p className="text-[12px]">{currentStatus || "NA"}</p>
          </div>
        );
      },
    }),

    columnsHelper.accessor("buyerRequest", {
      header: () => <div className="text-left">Buyer Request D&T</div>,
      cell: (info) => {
        const buyerRequest = info?.row?.original?.remarks?.buyer;

        const buyerRequestData =
          buyerRequest?.[buyerRequest?.length - 1]?.buyerRequestDate;

        const newDate = convertUTCToIST(buyerRequestData);

        const [datePart, timePartWithIST] = newDate.split(" ");

        const timePart = timePartWithIST.replace("IST", "").trim();

        return (
          <div className="flex flex-col w-[140px]">
            <p>{`Date: ${datePart}` || "NA"}</p>

            <p>{`Time: ${timePart}` || "NA"}</p>
          </div>
        );
      },
    }),

    columnsHelper.accessor("sellerRequest", {
      header: () => <div className="text-left">Seller Request D&T</div>,
      cell: (info) => {
        const sellerRequest = info?.row?.original?.remarks?.seller;

        const sellerRequestData =
          sellerRequest?.[sellerRequest?.length - 1]?.sellerActionDate;

        const newDate = convertUTCToIST(sellerRequestData);

        const [datePart, timePartWithIST] = newDate.split(" ");

        const timePart = timePartWithIST.replace("IST", "").trim();

        console.log("timePart", timePart);

        return (
          <div className="flex flex-col w-[140px]">
            <p>{`Date: ${datePart === "Invalid" ? "NA" : datePart}`}</p>

            <p>{`Time: ${timePart === "Date" ? "NA" : timePart}`}</p>
          </div>
        );
      },
    }),

    columnsHelper.accessor("adminRequest", {
      header: () => <div className="text-left">Admin Action D&T</div>,
      cell: (info) => {
        const adminRequest = info?.row?.original?.remarks?.admin;

        const adminRequestData =
          adminRequest?.[adminRequest?.length - 1]?.adminActionDate;

        const newDate = convertUTCToIST(adminRequestData);

        const [datePart, timePartWithIST] = newDate.split(" ");

        const timePart = timePartWithIST.replace("IST", "").trim();

        return (
          <div className="flex flex-col w-[140px]">
            <p>{`Date: ${datePart === "Invalid" ? "NA" : datePart}`}</p>

            <p>{`Time: ${timePart === "Date" ? "NA" : timePart}`}</p>
          </div>
        );
      },
    }),

    columnsHelper.accessor("requestType", {
      header: () => <div className="text-left ">Request Type</div>,
      cell: (info) => {
        const requestType = info?.row?.original?.requestType;

        return (
          <div className="flex flex-col w-[130px]">
            <p className="text-[14px]">{requestType || "NA"}</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("courierPartner", {
  header: () => <div className="text-left">Courier Partner</div>,
  cell: (info) => {
    const courierPartnerName = info?.row?.original?.courierPartnerName;

    return (
      <div className="font-sans text-sm leading-5 text-black w-[120px]">
        <span>{courierPartnerName || "NA"}</span>
      </div>
    );
  },
}),
    columnsHelper.accessor("custContactDetail", {
      header: () => <div className="text-left">Cust Contact Details</div>,
      cell: (info) => {
        const custContactDetail =
          info?.row?.original?.deliveryAddress?.contact?.mobileNo;
        const alternateMobileNo =
          info?.row?.original?.deliveryAddress?.contact?.alternateMobileNo;

        return (
          <div className="flex flex-col space-y-2 w-[160px]">
            <div className="flex flex-col mt-1   gap-y-2">
              <p className=" text-[14px]">{`Mobile No: ${
                custContactDetail || "NA"
              }`}</p>
              {alternateMobileNo ? (
                <div>
                  <p className="text-[#7CCA62] text-[14px]">Alt Mobile No:</p>
                  <p className="text-[#7CCA62] text-[14px]">{` ${
                    alternateMobileNo || "NA"
                  }`}</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("remark", {
      header: () => <div className="text-left">Remark</div>,
      cell: (info) => {
        const buyerRemark = info?.row?.original?.remarks?.buyer;
        const buyerlastRemark =
          buyerRemark[buyerRemark?.length - 1]?.buyerRemark;
        const sellerRemark = info?.row?.original?.remarks?.seller;
        const lastSellerRemark =
          sellerRemark[sellerRemark?.length - 1]?.sellerRemark;
        const admin = info?.row?.original?.remarks?.admin;
        const lastAdminRemark = admin[admin?.length - 1]?.adminRemark;

        return (
          <div className="flex flex-col  my-1 w-[300px] gap-y-2">
            <p className="w-full overflow-x-scroll whitespace-nowrap customScroll">
              Buyer : {buyerlastRemark || "NA"}
            </p>
            <p className="w-full overflow-x-scroll whitespace-nowrap customScroll">
              Seller : {lastSellerRemark || "NA"}
            </p>
            <p className="w-full overflow-x-scroll whitespace-nowrap customScroll">
              Admin : {lastAdminRemark || "NA"}
            </p>
          </div>
        );
      },
    }),

    columnsHelper.accessor("actions", {
      header: () => <div className="text-left">Actions</div>,
      cell: (info) => {
        const awb = info?.row?.original?.awb;
        const requestType = info?.row?.original?.requestType;

        return (
          <p className="text-blue-600">
            {" "}
            <button
              className={`bg-white text-[#004EFF] border border-[#004EFF] m-1 px-2 py-1 rounded text-sm font-normal hover:bg-blue-50 `}
              onClick={() => {
                setAwb(awb);
                setRequestType(requestType);
                setOpenRightSideModal(true);
              }}
            >
              Remarks
            </button>
          </p>
        );
      },
    }),
  ];

  return (
    <div>

      
      { <CustomTable columnsData={columns} rowData={cancelRequestData} />}

      {openRightSideModal && (
        <RightSideModal
          isOpen={openRightSideModal}
          onClose={() => setOpenRightSideModal(false)}
        >
          <EditAction
            setOpenRightSideModal={setOpenRightSideModal}
            openRightSideModal={openRightSideModal}
            onSubmit={"Cancellation"}
            awb={awb}
            requestType={requestType}
            getAllTracingBuyerRequest={getAllTracingBuyerRequest}
          />
        </RightSideModal>
      )}
    </div>
  );
};

export default CancellationRequestTable;
