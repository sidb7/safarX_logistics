import React, { useEffect, useState } from "react";
import PlanCard from "./planCard";
import { CustomTable } from "../../components/Table";
import { Breadcum } from "../../components/Layout/breadcrum";

import "../../styles/plan.css";

import { createColumnHelper } from "@tanstack/react-table";
import Checkbox from "../../components/CheckBox";
import { GET_ALL_PLANS, POST_CREATE_PLAN } from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import { toast } from "react-toastify";

interface ITypeProps {}

const Index = (props: ITypeProps) => {
  const columnsHelper = createColumnHelper<any>();
  const [allPlans, setAllPlans] = useState<any>([]);
  const [activePlanId, setActivePlanId] = useState<string>("");

  //Table Data

  const data = [
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

  const createPlan = async (payload: any) => {
    try {
      //Create Plan API
      const { data: response }: any = await POST(POST_CREATE_PLAN, payload);

      if (response?.success) {
        setActivePlanId(payload?.planId);
        toast.success(response?.message);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        //Get all plans API
        const { data: response }: any = await POST(GET_ALL_PLANS, { limit: 4 });
        console.log("Response....", response);
        if (response?.success) {
          console.log("Response...", response);
          setAllPlans(response?.data.reverse());
        }
      } catch (error) {
        console.log("GET PLAN API ERROR", error);
        return error;
      }
    })();
  }, []);

  return (
    <>
      <div className="mr-6">
        <div className="mb-6">
          <Breadcum label="Plans" />
        </div>

        {/* Plan Cards */}
        <div className="flex items-end gap-x-6 overflow-x-scroll ml-5 xl:justify-evenly  mb-[60px] ">
          {allPlans.map((eachPlan: any, index: any) => {
            return (
              <PlanCard
                planId={eachPlan.planId}
                planName={eachPlan.planName}
                price={eachPlan.price}
                validity={eachPlan.validity}
                description={eachPlan.description}
                onClick={() => createPlan(eachPlan)}
                activePlanId={activePlanId}
              />
            );
          })}
        </div>
        {/* Table */}
        <div className="ml-5 ">
          <CustomTable
            columns={columns}
            data={data}
            tdclassName={"def"}
            thclassName={"bg-white"}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
