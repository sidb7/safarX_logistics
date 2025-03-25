import CustomButton from "../../../components/Button";
import DownArrowIcon from "../../../assets/Filter/downArrow.svg";
import UpArrowIcon from "../../../assets/Filter/upArrow.svg";
import RupeeIcon from "../../../assets/common/Rupee.svg";
import { useState } from "react";
import Collapsible from "react-collapsible";
// import { Cancelled } from "../StatusComponents";
// import copyIcon from "../../../assets/Transaction/CopyIcon.svg";
// import shareIcon from "../../../assets/Transaction/ShareIcon.svg";
import { createColumnHelper } from "@tanstack/react-table";
// import filterIconTable from "../../../assets/Transaction/filtericon.svg";
// import sortIconTable from "../../../assets/Transaction/sortIcon.svg";
import CopyTooltip from "../../../components/CopyToClipboard";
import { date_DD_MMM_YYYY_HH_MM } from "../../../utils/dateFormater";
import bookedIcon from "../../../assets/Transaction/bookedIcon.svg";
import PendingIcon from "../../../assets/pendingRed.svg";
import { capitalizeFirstLetter } from "../../../utils/utility";

interface ICashbackProps {
  data: {
    title: string;
    rupee: string;
    date: string;
    time: string;
    description: string;
    type: string;
    yaariCashBalance: number;
    transactionId: string;
    status: string;
    remark: string;
  };
}

const columnsHelper = createColumnHelper<any>();

export const cashbackDetailsColumns = () => {
  const renderStatusComponent = (status: string) => {
    return (
      <div>
        <div
          className={`inline-flex items-center text-xs justify-center gap-x-2 ${
            status.toUpperCase() === "SUCCESS"
              ? "bg-[#F2FAEF] border-[#7CCA62]"
              : "bg-[#FEEEEB] border-[#F35838]"
          }  rounded-sm border-[0.5px] px-3 py-[6px]`}
        >
          <img
            src={`${
              status.toUpperCase() === "SUCCESS" ? bookedIcon : PendingIcon
            }`}
            alt=""
            width={20}
          />
          <span
            className={`text-xs font-semibold font-Open leading-5  ${
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
  return [
    columnsHelper.accessor("createdAt", {
      header: (props: any) => {
        return (
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center">
              {/* <PartialChecked
                checked={props.table?.getIsAllRowsSelected()}
                onChange={props?.table?.getToggleAllRowsSelectedHandler()}
                intermediate={props?.table?.getIsSomeRowsSelected()}
              /> */}
              <h1 className="font-Open font-semibold leading-5 text-sm">
                Date
              </h1>
            </div>
            {/* <div className="flex">
              <img src={sortIconTable} alt="" onClick={handleSortClick} />
            </div> */}
          </div>
        );
      },

      cell: (info: any) => {
        // console.log("timestamp", info.getValue());
        const formattedDateTime = date_DD_MMM_YYYY_HH_MM(info.getValue());

        return (
          <div className="flex items-center">
            {/* <div className="flex items-center justify-center mr-3 cursor-pointer">
              <input
                type="checkbox"
                checked={info?.row?.getIsSelected()}
                onChange={info?.row?.getToggleSelectedHandler()}
              />
            </div> */}
            <div className="flex flex-col  whitespace-nowrap my-4 ">
              <span className="font-Open font-normal leading-5 text-sm">
                {formattedDateTime.split(",")[0]}
              </span>
              <span className="font-Open font-normal leading-5 text-sm">
                {formattedDateTime.split(",")[1]}
              </span>
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("transactionId", {
      header: () => {
        return (
          <div className="flex whitespace-nowrap justify-between items-center w-[90px] ">
            <h1 className="font-Open font-semibold leading-5 text-sm">
              Transaction ID
            </h1>
            {/* <img src={sortIconTable} alt="" /> */}
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex  items-center justify-between ">
            <div className=" w-[80px] whitespace-nowrap  overflow-hidden overflow-ellipsis font-Open font-normal leading-5 text-sm   ">
              {info.row.original.transactionId}
            </div>
            <div className="cursor-pointer">
              <CopyTooltip stringToBeCopied={info.row.original.transactionId} />
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("awb", {
      header: () => {
        return (
          <div className="flex whitespace-nowrap justify-between items-center">
            <h1 className="font-Open font-semibold leading-5 text-sm">
              Tracking No
            </h1>
            {/* <img src={sortIconTable} alt="" /> */}
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex  items-center justify-between ">
            <div className=" font-Open font-normal leading-5 text-sm   ">
              {info.row.original.awb}
            </div>
            <div className="cursor-pointer">
              <CopyTooltip stringToBeCopied={info.row.original.awb} />
            </div>
          </div>
        );
      },
    }),

    columnsHelper.accessor("yaariCashBalance", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <h1 className="font-Open font-semibold leading-5 text-sm">
              Balance
            </h1>
            {/* <img src={sortIconTable} alt="" onClick={handleSortClick} /> */}
          </div>
        );
      },
      cell: (info: any) => {
        let yaariCashBalance = parseFloat(info.getValue()).toFixed(2);

        return (
          <div className="flex whitespace-nowrap font-Open font-normal leading-5 text-sm">
            ₹ {yaariCashBalance}
          </div>
        );
      },
    }),

    columnsHelper.accessor("type", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <h1 className="font-Open font-semibold leading-5 text-sm">Type</h1>

            {/* <img src={sortIconTable} alt="" /> */}
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex">
            <span className="font-Open font-normal leading-5 text-sm">
              {capitalizeFirstLetter(info?.row?.original?.type) || "-"}
            </span>
          </div>
        );
      },
    }),

    columnsHelper.accessor("remark", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <h1 className="font-Open font-semibold leading-5 text-sm">
              Remark
            </h1>

            {/* <img src={sortIconTable} alt="" /> */}
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex">
            <span className="font-Open font-normal leading-5 text-sm">
              {capitalizeFirstLetter(info?.row?.original?.remark) || "-"}
            </span>
          </div>
        );
      },
    }),
    columnsHelper.accessor("status", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-Open font-semibold leading-5 text-sm">
                Status
              </h1>
            </div>
            {/* <div className="flex">
              <img src={sortIconTable} alt="" />
            </div> */}
          </div>
        );
      },
      cell: (info: any) => {
        return renderStatusComponent(info.getValue());
      },
    }),

    columnsHelper.accessor("actions", {
      header: () => {
        return (
          <div className="flex justify-between">
            <h1 className="text-sm font-semibold leading-5 ">Actions</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex space-x-2 items-center cursor-pointer">
            <CopyTooltip stringToBeCopied={info.row?.original} />
          </div>
        );
      },
    }),
  ];
};

export const CashbackHistory: React.FunctionComponent<ICashbackProps> = ({
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
          <div className="grid grid-cols-2 ml-4 mt-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#777777] font-normal">
                Date
              </span>
              <div className="flex">
                <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" />
                <span className="text-xs text-[#1C1C1C] font-semibold	">
                  {data?.date}
                </span>
              </div>
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <span className="ml-3 text-[10px] text-[#777777] font-normal">
                Time
              </span>
              <span className="ml-3 flex text-xs text-[#1C1C1C] font-semibold">
                <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" />
                <span>{data?.time}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col ml-4 mt-2 mb-4">
            <span className="text-[10px] text-[#777777] font-normal">
              Description
            </span>
            <span className="text-xs text-[#1C1C1C] font-semibold">
              {data?.description}
            </span>
          </div>
        </Collapsible>
      </div>
    );
  };

  return <>{header()}</>;
};
