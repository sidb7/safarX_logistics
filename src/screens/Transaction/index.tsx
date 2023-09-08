import { useEffect, useState } from "react";
import SelectIcon from "../../assets/Order/SelectIcon.svg";
import FilterIcon from "../../assets/Order/FilterIcon.svg";
import { ScrollNav } from "../../components/ScrollNav";
import { PassbookHistory } from "./history/passbookHistory";
import { CashbackHistory } from "./history/cashbackHistory";
import { ResponsiveState } from "../../utils/responsiveState";
import { CustomTable } from "../../components/Table";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../../components/Pagination";
import { SearchBox } from "../../components/SearchBox";
import { PassbookColumns } from "./history/passbookHistory";
import { OnlineDetailsColumns } from "./history/onlineHistory";
import { cashbackDetailsColumns } from "./history/cashbackHistory";
import { POST } from "../../utils/webService";
import { GET_WALLET_TRANSACTION } from "../../utils/ApiUrls";
import { toast } from "react-toastify";
import { Breadcum } from "../../components/Layout/breadcrum";

const arrayData = [
  { label: "Passbook" },
  { label: "NEFT /IMPS / RTGS" },
  { label: "Cashback" },
];

export const Transaction = () => {
  const navigate = useNavigate();
  const [totalItemCount, setTotalItemCount] = useState(10);
  const [renderingComponents, setRenderingComponents] = useState(0);
  const { isLgScreen } = ResponsiveState();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (renderingComponents === 0) {
      (async () => {
        const { data } = await POST(GET_WALLET_TRANSACTION);

        if (data?.success) {
          setData(data.data[0]);
        } else {
          toast.error(data?.message);
        }
      })();
    }
  }, []);

  //on page change index
  const onPageIndexChange = () => {};

  // on per page item change
  const onPerPageItemChange = () => {};

  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);
  };

  // search and filter component
  const filterButton = () => {
    if (isLgScreen) {
      return (
        <div className="grid grid-cols-3 gap-x-2 lg:flex">
          <div>
            <SearchBox label="Search" value="" onChange={() => {}} />
          </div>
          <div
            className="flex justify-between items-center p-2 gap-x-2"
            // onClick={() => setFilterModal(true)}
          >
            <img src={FilterIcon} alt="" />
            <span className="text-[#004EFF] text-[14px] font-semibold">
              FILTER
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-3 gap-x-2">
          <div className="flex items-center justify-center border-[1px] rounded-md border-[#A4A4A4] col-span-2">
            <img src={SelectIcon} alt="" />
            <span className="ml-2 text-[#1C1C1C] text-[14px] font-medium">
              SELECT
            </span>
          </div>
          <div
            className="grid justify-center items-center border-[1px] rounded-md border-[#A4A4A4] "
            onClick={() => {
              navigate("/neworder/filter");
            }}
          >
            <img src={FilterIcon} alt="Filter Order" width="16px" />
          </div>
        </div>
      );
    }
  };

  const render = () => {
    if (renderingComponents === 0) {
      return <CustomTable data={data} columns={PassbookColumns()} />;
    } else if (renderingComponents === 1) {
      return <CustomTable data={data} columns={OnlineDetailsColumns()} />;
    } else if (renderingComponents === 2) {
      return <CustomTable data={data} columns={cashbackDetailsColumns()} />;
    }
  };

  return (
    <>
      <div>
        <Breadcum label="Transaction History" />
      </div>
      <div className="flex flex-col">
        <div className="mx-4">
          <div className="lg:flex justify-between lg:mt-2 lg:mb-4">
            <div>
              <ScrollNav
                arrayData={arrayData}
                showNumber={false}
                setScrollIndex={setScrollIndex}
              />
            </div>
            <div className="hidden lg:block">{filterButton()}</div>
          </div>

          <div className="grid grid-cols-2 justify-center mt-4 h-[36px] lg:hidden">
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

          <div className="lg:hidden">
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
          <div>
            {isLgScreen && <div className="overflow-x-auto">{render()}</div>}
          </div>
          {totalItemCount > 0 && (
            <PaginationComponent
              totalItems={totalItemCount}
              itemsPerPageOptions={[10, 20, 30, 50]}
              onPageChange={onPageIndexChange}
              onItemsPerPageChange={onPerPageItemChange}
            />
          )}
        </div>
      </div>
    </>
  );
};
