import CustomButton from "../../../components/Button";
import DownArrowIcon from "../../../assets/Filter/downArrow.svg";
import UpArrowIcon from "../../../assets/Filter/upArrow.svg";
import RupeeIcon from "../../../assets/common/Rupee.svg";
import CopyIcon from "../../../assets/Transaction/CopyIcon.svg";
import ShareIcon from "../../../assets/Transaction/ShareIcon.svg";
import filterIconTable from "../../../assets/Transaction/filtericon.svg";
import sortIconTable from "../../../assets/Transaction/sortIcon.svg";
import { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { Cancelled, Approved, Returned, Booked } from "../StatusComponents";
import copyIcon from "../../../assets/Transaction/CopyIcon.svg";
import shareIcon from "../../../assets/Transaction/ShareIcon.svg";
import { createColumnHelper } from "@tanstack/react-table";
import { POST } from "../../../utils/webService";
import { date_DD_MMM_YYY } from "../../../utils/dateFormater";

interface IPassbookProps {
  data: {
    title: string;
    rupee: string;
    date: string;
    credited: string;
    debited: string;
    balance: string;
    slabAmount: string;
    redeemAmount: string;
    redeemPoint: string;
  };
}

const columnsHelper = createColumnHelper<any>();

export const PassbookColumns = () => {
  const renderStatusComponent = (status: string) => {
    console.log(
      "🚀 ~ file: passbookHistory.tsx:50 ~ renderStatusComponent ~ status:",
      status
    );
    if (status === "APPROVED")
      return (
        <div>
          <Approved />
        </div>
      );
    else if (status === "COMPLETED")
      return (
        <div>
          <Booked />
        </div>
      );
    else if (status === "RETURNED")
      return (
        <div>
          <Returned />
        </div>
      );
    else if (status === "CANCELLED")
      return (
        <div>
          <Cancelled />
        </div>
      );
  };

  return [
    columnsHelper.accessor("createdAt", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-sm font-semibold leading-5">Date</h1>
            </div>
            <div className="flex">
              <img src={sortIconTable} alt="" />
              {/* <img src={filterIconTable} alt="" /> */}
            </div>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="whitespace-nowrap my-4 space-y-2">
            {date_DD_MMM_YYY(info.getValue())}
          </div>
        );
      },
    }),
    columnsHelper.accessor("sellerId", {
      header: () => {
        return (
          <div className="flex whitespace-nowrap justify-between items-center ">
            <h1 className="text-sm font-semibold leading-5 ">Shipyaari ID</h1>
            <img src={sortIconTable} alt="" />
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex  whitespace-nowrap">
            {`SHIPYAARI-${info.getValue()}`}
          </div>
        );
      },
    }),
    columnsHelper.accessor("amount", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-[142px]">
            <div>
              <h1 className="text-sm font-semibold leading-5 ">Credited </h1>
            </div>
            <div className="flex">
              <img src={sortIconTable} alt="" />
              {/* <img src={filterIconTable} alt="" /> */}
            </div>
          </div>
        );
      },
      cell: (info: any) => {
        console.log("info ", info);
        return (
          <div className="flex whitespace-nowrap ">
            {info.row.original.type === "credit"
              ? `₹ ${info.getValue()}`
              : "₹ 0"}
          </div>
        );
      },
    }),
    columnsHelper.accessor("amount", {
      header: () => {
        return (
          <div className="flex justify-between items-center  min-w-[142px]">
            <div>
              <h1>Debited</h1>
            </div>
            <div className="flex">
              <img src={sortIconTable} alt="" />
              {/* <img src={filterIconTable} alt="" /> */}
            </div>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex whitespace-nowrap ">
            {info.row.original.type === "debit"
              ? `₹ ${info.getValue()}`
              : "₹ 0"}
          </div>
        );
      },
    }),
    columnsHelper.accessor("balance", {
      header: () => {
        return (
          <div className="flex justify-between items-center  min-w-[142px]">
            <h1>Balance</h1>
            <img src={sortIconTable} alt="" />
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex whitespace-nowrap ">
            {`₹ ${(info.getValue() && info.getValue()) || 0}`}
          </div>
        );
      },
    }),

    columnsHelper.accessor("status", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-sm font-semibold leading-5">Status</h1>
            </div>
            <div className="flex">
              <img src={sortIconTable} alt="" />
              {/* <img src={filterIconTable} alt="" /> */}
            </div>
          </div>
        );
      },
      cell: (info: any) => {
        return renderStatusComponent(info.getValue());
      },
    }),
    columnsHelper.accessor("userCount", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1 className="text-sm font-semibold leading-5 ">Actions</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex space-x-2 items-center">
            <img src={copyIcon} alt="" />
            <img src={shareIcon} alt="" />
          </div>
        );
        // <span>Actions</span>;
      },
    }),
  ];
};

export const PassbookHistory: React.FunctionComponent<IPassbookProps> = ({
  data,
}) => {
  const [onOpen, setOnOpen] = useState(false);

  const header = () => {
    return (
      <div
        className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden ${
          onOpen ? "grid grid-rows-1" : "grid h-[44px]"
        }`}
      >
        <div
          className={`flex justify-between items-center h-[44px] ${
            onOpen ? "bg-[#E8E8E8]" : "bg-white"
          }`}
        >
          <div>
            <span className="text-base font-semibold text-[#1C1C1C] ml-4">
              {data?.title}
            </span>
          </div>
          <div className="flex items-center mr-4">
            <div>
              <CustomButton
                text={data?.rupee}
                onClick={() => {}}
                className="p-2 !bg-[#004EFF] text-white text-[12p] h-[28px]"
                showIcon={true}
                icon={RupeeIcon}
                iconClass={"w-[7px] mr-1"}
              />
            </div>
            <div>
              <img
                src={onOpen ? UpArrowIcon : DownArrowIcon}
                alt=""
                className="ml-4"
                onClick={() => setOnOpen(!onOpen)}
              />
            </div>
          </div>
        </div>

        <Collapsible open={onOpen} trigger="">
          <div className="flex flex-col ml-4 mt-4">
            <span className="text-[10px] text-[#777777] font-normal">Date</span>
            <span className="text-xs text-[#1C1C1C] font-semibold">
              {data?.date}
            </span>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#777777] font-normal">
                Credited
              </span>
              <div className="flex">
                <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" />
                <span className="text-xs text-[#1C1C1C] font-semibold	">
                  {data?.credited}
                </span>
              </div>
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <span className="ml-3 text-[10px] text-[#777777] font-normal">
                Debited
              </span>
              <span className="ml-3 flex text-xs text-[#1C1C1C] font-semibold">
                <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" />
                <span>{data?.debited}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#777777] font-normal">
                Balance
              </span>
              <div className="flex">
                <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" />
                <span className="text-xs text-[#1C1C1C] font-semibold	">
                  {data?.balance}
                </span>
              </div>
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <span className="ml-3 text-[10px] text-[#777777] font-normal">
                Slab Amount
              </span>
              <span className="ml-3 flex text-xs text-[#1C1C1C] font-semibold">
                <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" />
                <span>{data?.slabAmount}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#777777] font-normal">
                Redeem Amount
              </span>
              <div className="flex">
                <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" />
                <span className="text-xs text-[#1C1C1C] font-semibold	">
                  {data?.redeemAmount}
                </span>
              </div>
            </div>
            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <span className="ml-3 text-[10px] text-[#777777] font-normal">
                Redeem Points
              </span>
              <span className="ml-3 flex text-xs text-[#1C1C1C] font-semibold">
                <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" />
                <span>{data?.redeemPoint}</span>
              </span>
            </div>
          </div>

          <div className="flex mx-4 my-2">
            <div className="flex items-center">
              <img src={CopyIcon} alt="Copy" />
              <span className="ml-2 text-[#004EFF] text-sm">COPY</span>
            </div>
            <div className="flex items-center ml-4">
              <img src={ShareIcon} alt="Share" />
              <span className="ml-2 text-[#004EFF] text-sm">SHARE</span>
            </div>
          </div>
        </Collapsible>
      </div>
    );
  };

  return <>{header()}</>;
};
