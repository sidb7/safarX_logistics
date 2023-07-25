import { useState } from "react";
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

const arrayData = [
  { label: "Passbook" },
  { label: "NEFT /IMPS / RTGS" },
  { label: "Cashback" },
  { label: "Wallet" },
];

export const Transaction = () => {
  const navigate = useNavigate();
  const [totalItemCount, setTotalItemCount] = useState(10);
  const { isLgScreen } = ResponsiveState();

  const data = [
    {
      roleId: "c858434b-68e0-4c2c-b1a2-99fe220de887",
      roleName: "test",
      userCount: 2,
    },
    {
      roleId: "4008aa11-fc21-44a4-a056-31e359ce4d34",
      roleName: "dummy",
      userCount: 2,
    },
    {
      roleId: "1712159a-f2a4-48c0-b6a6-e5471fa1b997",
      roleName: "testRole23",
      userCount: 3,
    },
    {
      roleId: "b4bce5c3-d7a9-4708-b9ec-f05d6e09ccc8",
      roleName: "SUPERUSER",
      userCount: 3,
    },
  ];
  // const columnsHelper = createColumnHelper<any>();
  // const columns = [
  //   columnsHelper.accessor("roleId", {
  //     header: () => {
  //       return (
  //         <div className="flex justify-between items-center">
  //           <div>
  //             <h1 className="text-sm font-semibold leading-5 ">Date</h1>
  //           </div>
  //           <div className="flex">
  //             <img src={sortIconTable} alt="" />
  //             <img src={filterIconTable} alt="" />
  //           </div>
  //         </div>
  //       );
  //     },
  //     cell: (info: any) => {
  //       return (
  //         <div className="whitespace-nowrap my-4 space-y-2">23 may 2023 </div>
  //       );
  //     },
  //   }),
  //   columnsHelper.accessor("roleName", {
  //     header: () => {
  //       return (
  //         <div className="flex justify-between items-center ">
  //           <h1 className="text-sm font-semibold leading-5 ">Shipyaari ID</h1>
  //           <img src={sortIconTable} alt="" />
  //         </div>
  //       );
  //     },
  //     cell: (info: any) => {
  //       return (
  //         <div className="flex  whitespace-nowrap">
  //           <p className="uppercase ">
  //             shipyaari - <span>5118971</span>
  //           </p>
  //         </div>
  //       );
  //     },
  //   }),
  //   columnsHelper.accessor("userCount", {
  //     header: () => {
  //       return (
  //         <div className="flex justify-between items-center min-w-[142px]">
  //           <div>
  //             <h1 className="text-sm font-semibold leading-5 ">Credited </h1>
  //           </div>
  //           <div className="flex">
  //             <img src={sortIconTable} alt="" />
  //             <img src={filterIconTable} alt="" />
  //           </div>
  //         </div>
  //       );
  //     },
  //     cell: (info: any) => {
  //       return (
  //         <div className="flex whitespace-nowrap ">
  //           <p>₹ 500</p>
  //         </div>
  //       );
  //     },
  //   }),
  //   columnsHelper.accessor("userCount", {
  //     header: () => {
  //       return (
  //         <div className="flex justify-between items-center  min-w-[142px]">
  //           <div>
  //             <h1>Debited</h1>
  //           </div>
  //           <div className="flex">
  //             <img src={sortIconTable} alt="" />
  //             <img src={filterIconTable} alt="" />
  //           </div>
  //         </div>
  //       );
  //     },
  //     cell: (info: any) => {
  //       return (
  //         <div className="flex whitespace-nowrap ">
  //           <p>₹ 0</p>
  //         </div>
  //       );
  //     },
  //   }),
  //   columnsHelper.accessor("userCount", {
  //     header: () => {
  //       return (
  //         <div className="flex justify-between items-center  min-w-[142px]">
  //           <h1>Balance</h1>
  //           <img src={sortIconTable} alt="" />
  //         </div>
  //       );
  //     },
  //     cell: (info: any) => {
  //       return (
  //         <div className="flex whitespace-nowrap ">
  //           <p>₹ 500</p>
  //         </div>
  //       );
  //     },
  //   }),
  //   columnsHelper.accessor("userCount", {
  //     header: () => {
  //       return (
  //         <div className="flex justify-between items-center  min-w-[162px]">
  //           <h1>Redeem Amount</h1>
  //           <img src={sortIconTable} alt="" />
  //         </div>
  //       );
  //     },
  //     cell: (info: any) => {
  //       return (
  //         <div className="flex whitespace-nowrap ">
  //           <p>₹ 0</p>
  //         </div>
  //       );
  //     },
  //   }),
  //   columnsHelper.accessor("userCount", {
  //     header: () => {
  //       return (
  //         <div className="flex justify-between items-center">
  //           <div>
  //             <h1 className="text-sm font-semibold leading-5">Status</h1>
  //           </div>
  //           <div className="flex">
  //             <img src={sortIconTable} alt="" />
  //             <img src={filterIconTable} alt="" />
  //           </div>
  //         </div>
  //       );
  //     },
  //     cell: (info: any) => {
  //       return (
  //         <div>
  //           <Cancelled />
  //         </div>
  //       );
  //     },
  //   }),
  //   columnsHelper.accessor("userCount", {
  //     header: () => {
  //       return (
  //         <div className="flex justify-between">
  //           <h1 className="text-sm font-semibold leading-5 ">Actions</h1>
  //         </div>
  //       );
  //     },
  //     cell: (info: any) => {
  //       return (
  //         <div className="flex space-x-2 items-center">
  //           <img src={copyIcon} alt="" />
  //           <img src={shareIcon} alt="" />
  //         </div>
  //       );
  //       // <span>Actions</span>;
  //     },
  //   }),
  // ];

  //on page change index
  const onPageIndexChange = () => {};

  // on per page item change
  const onPerPageItemChange = () => {};

  // search and filter component
  const filterButton = () => {
    if (isLgScreen) {
      return (
        <div className="grid grid-cols-3 gap-x-2 lg:flex ">
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

  return (
    <div className="flex flex-col mx-4">
      <div className="lg:flex justify-between">
        <div>
          <ScrollNav arrayData={arrayData} showNumber={false} />
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
        {isLgScreen && (
          <div className="overflow-x-auto">
            <CustomTable data={data} columns={OnlineDetailsColumns()} />
          </div>
        )}
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
  );
};
