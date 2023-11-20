import CustomButton from "../../../components/Button";
import DownArrowIcon from "../../../assets/Filter/downArrow.svg";
import UpArrowIcon from "../../../assets/Filter/upArrow.svg";
import RupeeIcon from "../../../assets/common/Rupee.svg";

import sortIconTable from "../../../assets/Transaction/sortIcon.svg";
import { useEffect, useRef, useState } from "react";
import Collapsible from "react-collapsible";

import { createColumnHelper } from "@tanstack/react-table";
import {
  date_DD_MMM_YYY,
  date_DD_MMM_YYYY_HH_MM,
} from "../../../utils/dateFormater";
import bookedIcon from "../../../assets/Transaction/bookedIcon.svg";
import cancelledicon from "../../../assets/Transaction/cancelledIcon.svg";
import CopyTooltip from "../../../components/CopyToClipboard";

interface IPassbookProps {
  data: {
    title: string;
    rupee: string;
    date: string;
    credited: string;
    debited: string;
    balance: string;
    status: any;
    slabAmount: string;
    redeemAmount: string;
    redeemPoint: string;
    paymentGatewayName: any;
    privateCompanyId: any;
    remark: any;
    discription: any;
    orderId: any;
    amount: any;
    type: any;
  };
}

const columnsHelper = createColumnHelper<any>();

const PartialChecked = ({ checked, onChange, intermediate }: any) => {
  const ref: any = useRef(null);
  useEffect(() => {
    if (typeof intermediate === "boolean") {
      ref.current.indeterminate = intermediate;
    }
  }, [ref, intermediate]);
  return (
    <input
      type="checkbox"
      className="mr-3 cursor-pointer"
      ref={ref}
      checked={checked}
      onChange={onChange}
    />
  );
};

export const PassbookColumns = (setSortOrder: any) => {
  const renderStatusComponent = (status: string) => {
    return (
      <div>
        <div
          className={`inline-flex justify-center gap-x-1 ${
            status.toUpperCase() === "SUCCESS" ? "bg-[#F2FAEF]" : "bg-[#FEEEEB]"
          }  rounded-sm border-[0.5px]${
            status === "SUCCESS" ? " border-[#7CCA62]" : "border-[#F35838]"
          } px-3 py-[6px]`}
        >
          <img
            src={`${
              status.toUpperCase() === "SUCCESS" ? bookedIcon : cancelledicon
            }`}
            alt=""
          />
          <span
            className={`text-xs font-semibold ${
              status.toUpperCase() === "SUCCESS"
                ? "text-[#7CCA62]"
                : "text-[#F35838]"
            }  items-center`}
          >
            {status.toUpperCase()}
          </span>
        </div>
      </div>
    );
  };

  // const compareDates = (rowA: any, rowB: any) => {
  //   const dateA = new Date(rowA.values.createdAt);
  //   const dateB = new Date(rowB.values.createdAt);
  //   return dateA > dateB ? 1 : -1;
  // };

  const handleSortClick = () => {
    if (setSortOrder) {
      setSortOrder((prevOrder: any) => (prevOrder === "desc" ? "asc" : "desc"));
    }
  };

  function formatEpochTimeWithAMPM(epochTime: number) {
    const date = new Date(epochTime);
    const formattedDate = date_DD_MMM_YYY(epochTime);

    const hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    const formattedTime = `${formattedHours}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

    return `${formattedDate} ${formattedTime} ${ampm}`;
  }

  return [
    columnsHelper.accessor("createdAt", {
      header: (props) => {
        return (
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center">
              <PartialChecked
                checked={props.table?.getIsAllRowsSelected()}
                onChange={props?.table?.getToggleAllRowsSelectedHandler()}
                intermediate={props?.table?.getIsSomeRowsSelected()}
              />
              <h1 className="text-sm font-semibold leading-5">Date</h1>
            </div>
            <div className="flex">
              <img src={sortIconTable} alt="" onClick={handleSortClick} />
            </div>
          </div>
        );
      },
      cell: (info: any) => {
        const formattedDateTime = date_DD_MMM_YYYY_HH_MM(info.getValue());

        return (
          <div className="flex items-center">
            <div className="flex items-center justify-center mr-3 cursor-pointer">
              <input
                type="checkbox"
                checked={info?.row?.getIsSelected()}
                onChange={info?.row?.getToggleSelectedHandler()}
              />
            </div>
            <div className="whitespace-nowrap my-4 ">{formattedDateTime}</div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("transactionId", {
      header: () => {
        return (
          <div className="flex whitespace-nowrap justify-between items-center ">
            <h1 className="text-sm font-semibold leading-5 ">Transaction ID</h1>
            {/* <img src={sortIconTable} alt="" /> */}
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex  whitespace-nowrap">
            {info.row.original.transactionId}
          </div>
        );
      },
    }),
    columnsHelper.accessor("amount_credit", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-[142px]">
            <div>
              <h1 className="text-sm font-semibold leading-5 ">Credited </h1>
            </div>
            {/* <div className="flex">
              <img src={sortIconTable} alt="" />
            </div> */}
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex whitespace-nowrap ">
            {info.row.original.type === "credit"
              ? `₹ ${info.row?.original?.amount}`
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
            {/* <div className="flex">
              <img src={sortIconTable} alt="" />
            </div> */}
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex whitespace-nowrap ">
            {info.row.original.type === "debit"
              ? `₹ ${info.row?.original?.amount}`
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
            <img src={sortIconTable} alt="" onClick={handleSortClick} />
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
          </div>
        );
      },
      cell: (info: any) => {
        return renderStatusComponent(info.getValue());
      },
    }),

    columnsHelper.accessor("description", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-sm font-semibold leading-5">Description</h1>
            </div>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div>
            <span className="font-Open font-normal text-sm leading-5 ">
              {info.row?.original?.description}
            </span>
          </div>
        );
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
          <div className="flex  items-center">
            <div className="cursor-pointer">
              <CopyTooltip
                stringToBeCopied={`
                Date:${date_DD_MMM_YYY(info.row?.original?.createdAt)},
                TransactionId:${info.row?.original?.transactionId},
                ${
                  info.row?.original?.type === "credit" ? "Credited" : "Debited"
                }:${info.row?.original?.amount},Balance:${
                  info.row?.original?.balance
                },
                Status:${info.row?.original?.status},
                Description:${info.row?.original?.description}`}
              />
            </div>
          </div>
        );
      },
    }),
  ];
};

export const PassbookHistory: React.FunctionComponent<IPassbookProps> = ({
  data,
}: any) => {
  const [onOpen, setOnOpen] = useState(false);

  const copyString = ` Date:${date_DD_MMM_YYY(data?.date)}, 
                TransactionId:${data?.orderId},Credited:${
    data?.credited
  },Debited:${data?.debited},Balance:${data?.balance},Status:${
    data?.status
  },PrivateCompanyId:${data?.privateCompanyId},PaymentGatewayName:${
    data?.paymentGatewayName
  }`;

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
          <div
            className="max-w-[750px] max-sm:w-[200px] max-sm:truncate"
            title={data?.title}
          >
            <span className="text-base font-semibold text-[#1C1C1C] ml-4">
              {data?.title}
            </span>
          </div>
          <div className="flex items-center  space-x-3  mr-4">
            <div>
              <div
                className={`font-semibold ${
                  data.type === "credit" ? "text-[#7cca62]" : "text-[#f35838]"
                } `}
              >
                ₹ {data?.amount}
              </div>
              {/* <CustomButton
                text={data?.amount}
                onClick={() => { }}
                className={`p-2 bg-transparent ${data.type === "credit" ? "text-[#7cca62]" : "text-[#f35838]"}  h-[28px]`}
                showIcon={true}
                icon={RupeeIcon}
                iconClass={"w-[7px] mr-1"}
              /> */}
            </div>
            <div className="cursor-pointer">
              <img
                src={onOpen ? UpArrowIcon : DownArrowIcon}
                alt=""
                className="ml-1"
                onClick={() => setOnOpen(!onOpen)}
              />
            </div>
          </div>
        </div>

        <Collapsible open={onOpen} trigger="">
          <div className="flex flex-col ml-4 mt-4">
            <span className="text-[10px] text-[#777777] font-normal">Date</span>
            <span className="text-xs text-[#1C1C1C] font-semibold">
              {date_DD_MMM_YYY(data?.date)}
            </span>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#95d47f] font-semibold">
                Credited
              </span>
              <div className="flex items-center">
                <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" />
                <span className="text-xs text-[#1C1C1C] font-semibold	">
                  {data?.credited}
                </span>
              </div>
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <span className="ml-3 text-[10px] text-[#f35838] font-semibold">
                Debited
              </span>
              <span className="ml-3 flex text-xs text-[#1C1C1C] font-semibold items-center">
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
              <div className="flex items-center">
                <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" />
                <span className="text-xs text-[#1C1C1C] font-semibold	">
                  {data?.balance}
                </span>
              </div>
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <span className="ml-3 text-[10px] text-[#777777] font-normal">
                Status
              </span>
              <span className="ml-3 flex text-xs text-[#1C1C1C] font-semibold">
                {/* <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" /> */}
                <span>{data?.status}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#777777] font-normal">
                Transaction Id
              </span>
              <div className="flex items-center">
                <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" />
                <span
                  className="text-xs text-[#1C1C1C] font-semibold max-sm:w-[120px] truncate"
                  title={data?.orderId}
                >
                  {data?.orderId}
                </span>
              </div>
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <span className="ml-3 text-[10px] text-[#777777] font-normal">
                Remark
              </span>
              <span className="ml-3 mr-3 flex items-center max-w-full overflow-x-scroll text-xs text-[#1C1C1C] font-semibold">
                {/* <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" /> */}
                <span>{data?.remark}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#777777] font-normal">
                Private Company Id
              </span>
              <div className="flex items-center">
                <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" />
                <span className="text-xs text-[#1C1C1C] font-semibold	">
                  {data?.privateCompanyId}
                </span>
              </div>
            </div>
            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <span className="ml-3 text-[10px] text-[#777777] font-normal">
                Payment Gateway Name
              </span>
              <span className="ml-3 flex text-xs text-[#1C1C1C] font-semibold">
                {/* <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" /> */}
                <span>{data?.paymentGatewayName}</span>
              </span>
            </div>
          </div>

          <div className="flex mx-4 my-4">
            <div className="flex items-center cursor-pointer">
              <CopyTooltip stringToBeCopied={copyString} />

              <span className="ml-2 text-[#004EFF] text-sm">COPY</span>
            </div>
          </div>
        </Collapsible>
      </div>
    );
  };

  return <>{header()}</>;
};
