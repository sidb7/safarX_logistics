import CustomButton from "../../../components/Button";
import DownArrowIcon from "../../../assets/Filter/downArrow.svg";
import UpArrowIcon from "../../../assets/Filter/upArrow.svg";
import RupeeIcon from "../../../assets/common/Rupee.svg";
import { useState } from "react";
import Collapsible from "react-collapsible";
// import { Cancelled } from "../StatusComponents";
import copyIcon from "../../../assets/Transaction/CopyIcon.svg";
import shareIcon from "../../../assets/Transaction/ShareIcon.svg";
import { createColumnHelper } from "@tanstack/react-table";
import filterIconTable from "../../../assets/Transaction/filtericon.svg";
import sortIconTable from "../../../assets/Transaction/sortIcon.svg";
import CopyTooltip from "../../../components/CopyToClipboard";

interface ICashbackProps {
  data: {
    title: string;
    rupee: string;
    date: string;
    time: string;
    description: string;
  };
}

const columnsHelper = createColumnHelper<any>();
export const cashbackDetailsColumns = () => {
  return [
    columnsHelper.accessor("createdAt", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-[208px]">
            <div>
              <h1 className="text-sm font-semibold leading-5 ">Date</h1>
            </div>
            <div className="flex">
              <img src={sortIconTable} alt="" />
            </div>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="whitespace-nowrap my-4 space-y-2">23 May 2023</div>
        );
      },
    }),
    columnsHelper.accessor("received", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-[254px] ">
            <h1 className="text-sm font-semibold leading-5 ">Recieved via</h1>
            <img src={sortIconTable} alt="" />
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex  whitespace-nowrap">
            <p className="uppercase">coupon</p>
          </div>
        );
      },
    }),
    columnsHelper.accessor("amount", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-[220px]">
            <h1 className="text-sm font-semibold leading-5 ">Amount </h1>

            <img src={sortIconTable} alt="" />
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex whitespace-nowrap ">
            <span>₹ 5000</span>
          </div>
        );
      },
    }),
    columnsHelper.accessor("description", {
      header: () => {
        return (
          <div className="flex justify-between items-center min-w-[371px] ">
            <h1>Description</h1>

            <img src={sortIconTable} alt="" />
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex">
            <span>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Dignissimos deleniti itaque laboriosam, voluptatibus inventore
              iure ab! Quia asperiores laborum consequatur?
            </span>
          </div>
        );
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
