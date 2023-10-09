import React, { useState, useEffect } from "react";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import Checkbox from "../../components/CheckBox";
import { POST } from "../../utils/webService";
import { GET_ALL_PLANS } from "../../utils/ApiUrls";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { BottomNavBar } from "../../components/BottomNavBar";

interface ITypeProps {}

const ComparePlans = (props: ITypeProps) => {
  const columnsHelper = createColumnHelper<any>();
  const [allPlans, setAllPlans] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        //Get all plans API
        const { data: response }: any = await POST(GET_ALL_PLANS, { limit: 4 });

        if (response?.success) {
          setAllPlans(response?.data.reverse());
        }
      } catch (error) {
        console.error("GET PLAN API ERROR", error);
        return error;
      }
    })();
  }, []);

  //Table Data

  const data = [
    {
      overview: "Pricing(per month)",
      freemium: "Free",
      silver: "₹ 500",
      gold: "₹999",
      platinum: "On request",
    },

    {
      overview: "Shared Support Team",

      freemium: true,
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      overview: "Account Manager",

      freemium: true,
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      overview: "Multiple Carrier Partner",

      freemium: true,
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      overview: "Channel Integration",

      freemium: true,
      silver: true,
      gold: true,
      platinum: true,
    },

    {
      overview: "Label Customization",

      freemium: true,
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      overview: "Domestic International Shipping",

      freemium: true,
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      overview: "Complementary NDR Support",

      freemium: true,
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      overview: "Exception Management Support",

      freemium: true,
      silver: true,
      gold: true,
      platinum: true,
    },
    {
      overview: "Customized Reporting & Analytical Solution",

      freemium: true,
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
          <p className=" flex items-center text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.overview}
          </p>
        );
      },
    }),
    columnsHelper.accessor("freemium", {
      header: () => {
        return (
          <p className="font-Open flex items-center justify-center text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            {allPlans[0]?.planName || "FREEMIUM"}
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center ">
            <Checkbox
              checked={info.row.original.freemium}
              style={{ accentColor: "black" }}
            />
          </div>
        );
      },
    }),
    columnsHelper.accessor("silver", {
      header: () => {
        return (
          <p className="font-Open flex items-center justify-center text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            {allPlans[1]?.planName || "SILVER"}
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center ">
            <Checkbox
              checkboxClassName="!text-black"
              checked={info.row.original.silver}
              style={{ accentColor: "black" }}
            />
          </div>
        );
      },
    }),
    columnsHelper.accessor("gold", {
      header: () => {
        return (
          <p className="font-Open flex items-center justify-center text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            {allPlans[2]?.planName || "GOLD"}
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center ">
            <Checkbox
              checked={info.row.original.gold}
              style={{ accentColor: "black" }}
            />
          </div>
        );
      },
    }),
    columnsHelper.accessor("platinum", {
      header: () => {
        return (
          <p className="font-Open flex justify-center items-center text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap ">
            {allPlans[3]?.planName || "PLATINUM"}
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center ">
            <Checkbox
              checked={info.row.original.platinum}
              style={{ accentColor: "black" }}
            />
          </div>
        );
      },
    }),
  ];

  return (
    <div>
      <div className="lg:hidden">
        <Breadcrum label="Compare" />
      </div>
      <div className="ml-5  overflow-x-scroll">
        <CustomTable
          columns={columns}
          data={data}
          tdclassName={"def"}
          thclassName={"bg-white"}
        />
      </div>
      <div className="lg:hidden mt-24">
        <BottomNavBar />
      </div>
    </div>
  );
};

export default ComparePlans;
