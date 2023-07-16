import SelectIcon from "../../assets/Order/SelectIcon.svg";
import FilterIcon from "../../assets/Order/FilterIcon.svg";
import { ScrollNav } from "../../components/ScrollNav";
import { PassbookHistory } from "./history/passbookHistory";
import { CashbackHistory } from "./history/cashbackHistory";

import { useNavigate } from "react-router-dom";

const arrayData = [
  { label: "Passbook" },
  { label: "NEFT /IMPS / RTGS" },
  { label: "Cashback" },
  { label: "Wallet" },
];

export const Transaction = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col mx-4">
      <div>
        <ScrollNav arrayData={arrayData} showNumber={false} />
      </div>

      <div className="grid grid-cols-2 justify-center mt-4 h-[36px]">
        <div className="flex items-center">
          <span className="text-[#494949] text-[14px] font-semibold">
            00 Order
          </span>
        </div>
        <div className="grid grid-cols-3 gap-x-2">
          <div className="flex items-center justify-center border-[1px] rounded-md border-[#A4A4A4] col-span-2">
            <img src={SelectIcon} alt="" />
            <span className="ml-2 text-[#1C1C1C] text-[14px] font-medium">
              SELECT
            </span>
          </div>
          <div
            className="grid justify-center items-center border-[1px] rounded-md border-[#A4A4A4]"
            onClick={() => {
              navigate("/transaction/filter");
            }}
          >
            <img src={FilterIcon} alt="Filter Order" width="16px" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <PassbookHistory
          data={{
            title: "Shipyaari - 438473",
            rupee: "500",
            date: "July 9, 2023",
            credited: "378",
            debited: "7879",
            balance: "84263627",
            slabAmount: "0",
            redeemAmount: "0",
            redeemPoint: "0",
          }}
        />
      </div>

      <div className="mt-4">
        <CashbackHistory
          data={{
            title: "May 23- 2023 COUPON",
            rupee: "500",
            date: "May 23, 2023",
            time: "08: 12 PM",
            description:
              "Rs. 3000 has been credited on 2023-05-30 19:39:04 during wallet recharge through coupon ASDTS.",
          }}
        />
      </div>
    </div>
  );
};
