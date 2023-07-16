import CustomButton from "../../../components/Button";
import DownArrowIcon from "../../../assets/Filter/downArrow.svg";
import UpArrowIcon from "../../../assets/Filter/upArrow.svg";
import RupeeIcon from "../../../assets/common/Rupee.svg";
import CopyIcon from "../../../assets/Transaction/CopyIcon.svg";
import ShareIcon from "../../../assets/Transaction/ShareIcon.svg";
import { useState } from "react";
import Collapsible from "react-collapsible";

interface IOnlineProps {
  data: {
    title: string;
    status: string;
    reference: string;
    amount: string
    requestedDate: string
    approvedDate: string
    description: string
  };
}

export const OnlineHistory: React.FunctionComponent<IOnlineProps>  = ({data}) => {
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
                text={data?.status}
                onClick={() => {}}
                className="p-2 !bg-[#7CCA62] text-white "
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
            <span className="text-[10px] text-[#777777] font-normal">
              Reference
            </span>
            <span className="text-xs text-[#1C1C1C] font-semibold">
              {data?.reference}
            </span>
          </div>

          <div className="flex flex-col ml-4 mt-4">
            <span className="text-[10px] text-[#777777] font-normal">
              Amount
            </span>
            <span className="flex text-xs text-[#1C1C1C] font-semibold">
              <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" />
              <span>{data?.amount}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#777777] font-normal">
                Request Date
              </span>
              <div className="flex">
                <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" />
                <span className="text-xs text-[#1C1C1C] font-semibold	">
                  {data?.requestedDate}
                </span>
              </div>
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <span className="ml-3 text-[10px] text-[#777777] font-normal">
                Approved Date
              </span>
              <span className="ml-3 flex text-xs text-[#1C1C1C] font-semibold">
                <img src={RupeeIcon} alt="Rupee" className="mr-1 h-[10px]" />
                <span>{data?.approvedDate}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col ml-4 mt-4">
            <span className="text-[10px] text-[#777777] font-normal">
              Transaction Description
            </span>
            <span className="text-xs text-[#1C1C1C] font-semibold">
              {data?.description}
            </span>
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
