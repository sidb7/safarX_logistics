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
};

const CancellationRequestTable = (props: Props) => {
  const [awb, setAwb] = useState<any>();
  const [requestType, setRequestType] = useState<any>();
  const [openRightSideModal, setOpenRightSideModal] = useState<any>(false);

  const { cancelRequestData } = props;
  const columnsHelper = createColumnHelper<any>();

  const columns = [
    columnsHelper.accessor("trackingNo", {
      header: () => <div className="text-left">Tracking No</div>,
      cell: (info) => {
        const awb = info?.row?.original?.awb;
        setAwb(awb);
        return (
          <div className="font-sans text-sm leading-5 text-black">
            <span>{awb}</span>
          </div>
        );
      },
    }),
    columnsHelper.accessor("edd", {
      header: () => <div className="text-left">EDD</div>,
      cell: (info) => {
        const edd = info?.row?.original?.edd;
        return (
          <div className="font-sans  text-sm leading-5 text-black font-semibold">
            <p>{edd}</p>
            <p className="text-[#7CCA62] text-[14px] font-Open mt-1">
              {"24-Oct-2024"}
            </p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("currentStatus", {
      header: () => <div className="text-left">Current Status</div>,
      cell: (info) => {
        const currentStatus = info?.row?.original?.currentStatus;
        return (
          <div className="flex justify-center gap-x-2 items-center border border-[#F0A22E] bg-[#FDF6EA] text-[#F0A22E]">
            <img src={orangeTruck} alt="Truck" />
            {currentStatus}
          </div>
        );
      },
    }),
    columnsHelper.accessor("buyerRequest", {
      header: () => <div className="text-left">Buyer Request D&T</div>,
      cell: (info) => {
        // const custRequest = info?.row?.original?.custRequest;
        const buyerRequest =
          info?.row?.original?.remarks?.buyer?.[0]?.buyerRequestDate;
        return <div className="flex flex-col items-center">{buyerRequest}</div>;
      },
    }),
    columnsHelper.accessor("sellerRequest", {
      header: () => <div className="text-left">Seller Request D&T</div>,
      cell: (info) => {
        // const custRequest = info?.row?.original?.custRequest;
        const sellerRequest = info?.row?.original?.seller;
        return (
          <div className="flex flex-col items-center">
            {sellerRequest || "-"}
          </div>
        );
      },
    }),

    columnsHelper.accessor("adminRequest", {
      header: () => <div className="text-left">Admin Action D&T </div>,
      cell: (info) => {
        // const sellerAction = info?.row?.original?.sellerAction;
        const adminAction = info?.row?.original?.admin;
        return <div className="space-y-1">{adminAction || "-"}</div>;
      },
    }),
    columnsHelper.accessor("requestType", {
      header: () => <div className="text-left">Request Type</div>,
      cell: (info) => {
        const requestType = info?.row?.original?.requestType;
        setRequestType(requestType);
        return <div className="flex flex-col">{requestType}</div>;
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
          <div className="flex flex-col space-y-2 w-[200px]">
            <div className="flex flex-col mt-1 items-center  gap-y-2">
              <p className=" text-[14px]">{`Mobile No: ${custContactDetail}`}</p>
              <p className=" text-[14px]">{`Alt Mobile No: ${alternateMobileNo}`}</p>
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
          buyerRemark[buyerRemark.length - 1]?.buyerRemark;
        const sellerRemark = info?.row?.original?.remarks?.seller;
        const lastSellerRemark =
          sellerRemark[sellerRemark.length - 1]?.sellerRemark;
        const admin = info?.row?.original?.remarks?.admin;
        const lastAdminRemark = admin[admin.length - 1]?.adminRemark;

        return (
          <div className="flex flex-col  my-1 w-[300px] gap-y-2">
            <p className="w-full overflow-x-scroll whitespace-nowrap customScroll">
              Buyer : {buyerlastRemark}
            </p>
            <p className="w-full overflow-x-scroll whitespace-nowrap customScroll">
              Seller : {lastSellerRemark}
            </p>
            <p className="w-full overflow-x-scroll whitespace-nowrap customScroll">
              Admin : {lastAdminRemark}
            </p>
          </div>
        );
      },
    }),

    columnsHelper.accessor("actions", {
      header: () => <div className="text-left">Actions</div>,
      cell: (info) => {
        return (
          <p className="text-blue-600">
            {" "}
            <button
              className={`bg-white text-[#004EFF] border border-[#004EFF] m-1 px-2 py-1 rounded text-sm font-normal hover:bg-blue-50 `}
              onClick={() => {
                setOpenRightSideModal(true);
                // onActionModalClick(dataForAction);
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
      <CustomTable columns={columns} data={cancelRequestData} />

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
          />
        </RightSideModal>
      )}
    </div>
  );
};

export default CancellationRequestTable;
