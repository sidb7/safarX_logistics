import React from "react";
import { Breadcum } from "../../components/Layout/breadcum";
import PlanCard from "./planCard";
import { CustomTable } from "../../components/Table";
import { dummyPlanData } from "../../utils/dummyData";
import "../../styles/plan.css";

import { createColumnHelper } from "@tanstack/react-table";
import Checkbox from "../../components/CheckBox";

interface ITypeProps {}

const Index = (props: ITypeProps) => {
  const columnsHelper = createColumnHelper<any>();

  //Table Data

  const data = [
    {
      overview: "Shared Support Team",

      bronze: true,
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      overview: "Account Manager",

      bronze: true,
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      overview: "Multiple Carrier Partner",

      bronze: true,
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      overview: "Channel Integration",

      bronze: true,
      silver: true,
      gold: true,
      platinum: true,
    },

    {
      overview: "Label Customization",

      bronze: true,
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      overview: "Domestic International Shipping",

      bronze: true,
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      overview: "Complementary NDR Support",

      bronze: true,
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      overview: "Exception Management Support",

      bronze: true,
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      overview: "Customized Reporting & Analytical Solution",

      bronze: true,
      silver: true,
      gold: true,
      platinum: true,
    },
  ];

  //Table Columns

  const columns = [
    columnsHelper.accessor("overview", {
      header: () => {
        return (
          <p className=" flex items-center justify-start font-Open text-sm font-semibold leading-[18px] text-[#004EFF] whitespace-nowrap lg:w-[642px] ">
            Overview
          </p>
        );
      },

      cell: (info: any) => {
        return (
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 h-[48px]">
            {info.row.original.overview}
          </p>
        );
      },
    }),
    columnsHelper.accessor("bronze", {
      header: () => {
        return (
          <p className="font-Open flex items-center justify-center text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            Bronze
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center h-[48px]">
            <Checkbox checked={info.row.original.bronze} />
          </div>
        );
      },
    }),
    columnsHelper.accessor("silver", {
      header: () => {
        return (
          <p className="font-Open flex items-center justify-center text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            Silver
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center h-[48px]">
            <Checkbox
              checkboxClassName="!text-black"
              checked={info.row.original.silver}
            />
          </div>
        );
      },
    }),
    columnsHelper.accessor("gold", {
      header: () => {
        return (
          <p className="font-Open flex items-center justify-center text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            Gold
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center h-[48px]">
            <Checkbox checked={info.row.original.gold} />
          </div>
        );
      },
    }),
    columnsHelper.accessor("platinum", {
      header: () => {
        return (
          <p className="font-Open flex justify-center items-center text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            Platinum
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center h-[48px]">
            <Checkbox checked={info.row.original.platinum} />
          </div>
        );
      },
    }),
  ];

  // const setCheckBox = (planInfo: any, planName: any) => {
  //   if (planName === "Bronze") {
  //     let keys = Object.keys(planInfo);

  //     keys.map((item) => {
  //       data.map((item2) => {
  //         if (
  //           item.toUpperCase() ===
  //           item2.overview.split(" ").join("").toUpperCase()
  //         ) {
  //           item2.bronze = planInfo.item;
  //         }
  //       });
  //     });
  //   }
  //   if (planName === "Silver") {
  //     let keys = Object.keys(planInfo);
  //     keys.map((item) => {
  //       data.map((item2) => {
  //         if (
  //           item.toUpperCase() ===
  //           item2.overview.split(" ").join("").toUpperCase()
  //         ) {
  //           item2.gold = planInfo.item;
  //         }
  //       });
  //     });
  //   }

  //   if (planName === "Gold") {
  //     let keys = Object.keys(planInfo);
  //     keys.map((item) => {
  //       data.map((item2) => {
  //         if (
  //           item.toUpperCase() ===
  //           item2.overview.split(" ").join("").toUpperCase()
  //         ) {
  //           item2.silver = planInfo.item;
  //         }
  //       });
  //     });
  //   }

  //   if (planName === "Platinum") {
  //     let keys = Object.keys(planInfo);
  //     keys.map((item) => {
  //       data.map((item2) => {
  //         if (
  //           item.toUpperCase() ===
  //           item2.overview.split(" ").join("").toUpperCase()
  //         ) {
  //           item2.platinum = planInfo.item;
  //         }
  //       });
  //     });
  //   }
  // };
  // dummyPlanData.map((item1) => {
  //   setCheckBox(item1.planInfo, item1.planName);
  // });

  return (
    <>
      <div className=" mt-5 mr-6">
        <div className=" flex items-center gap-x-1 ml-12">
          <span className="font-Open text-sm leading-5 font-normal text-[#777777]">
            Home
          </span>
          <span className="font-Open text-sm leading-5 font-normal text-[#777777]">
            /
          </span>
          <span className="font-Open font-semibold text-sm leading-[18px] text-[#1C1C1C]">
            Plans
          </span>
        </div>
        <div className="mb-6">
          <Breadcum label="Plans" />
        </div>

        {/* Plan Cards */}
        <div className="flex items-end gap-x-6 ml-5 xl:justify-evenly  mb-[60px] ">
          <PlanCard
            planName="BRONZE"
            pricePerMonth="Free"
            isBronze={true}
            planDescription="Ideal for all new established D2C brands, Social sellers, SME & MSMEs"
          />
          <PlanCard
            planName="SILVER"
            pricePerMonth="499"
            pricePerGrams={27}
            planDescription="Ideal for growing business selling on multiple marketplaces & websites"
          />
          <PlanCard
            planName="GOLD"
            pricePerMonth="999"
            pricePerGrams={26}
            isMostPopular={true}
            planDescription="Ideal for business selling on multiple marketplaces & websites"
          />
          <PlanCard
            planName="PLATINUM"
            pricePerMonth="Price On Request"
            isPlatinum={true}
            planDescription="Plan built exclusively as per logistic requirements of your business"
          />
        </div>
        {/* Table */}
        <div className="ml-5 ">
          <CustomTable columns={columns} data={data} tdclassName={"def"} />
        </div>
      </div>
    </>
  );
};

export default Index;
