import React, { useState, useEffect } from "react";
import { Breadcum } from "../../components/Layout/breadcrum";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import Checkbox from "../../components/CheckBox";
import ServiceButton from "../../components/Button/ServiceButton";
import PlanDetailsCard from "./planDetailsCard";
import InfoCards from "./infoCards";
import DummyData from "../../screens/NewOrder/Filter/dummyFile.json";
import CustomAccordianWithTable from "../../components/CustomAccordian/customAccordianWithTable";
import RateCardIcon from "../../assets/Plan/Essential.svg";
import TermsAndConditionsIcon from "../../assets/Plan/document.svg";
import "../../styles/plan.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { GET_PLAN_URL } from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import PlanDetailsGif from "../../assets/Plan/plan-details.gif";

interface ITypeProps {}

const PlanDetails = (props: ITypeProps) => {
  const columnsHelper = createColumnHelper<any>();
  const [isRateCardPresent, setIsRateCardPresent] = useState(true);
  const [planData, setPlanData]: any = useState([]);
  let pricingData = [
    {
      pricing: "Subscription Amount",
      bronze: "Free",
      silver: "₹ 500",
      gold: "₹ 500",
      platinum: "On Request",
    },

    {
      pricing: "Annual Pricing",
      bronze: "Free",
      silver: "₹ 5000",
      gold: "₹ 5000",
      platinum: "On Request",
    },
    {
      pricing: "Your Savings",
      bronze: "-",
      silver: "₹ 5000",
      gold: "₹ 5000",
      platinum: "-",
    },
  ];

  const pricingDataOnRateCardFalse = [
    {
      pricing: "Zone 1",
      bronze: "Free",
      silver: "₹ 10",
      gold: "₹ 10",
      platinum: "₹ 10",
    },
    {
      pricing: "Zone 2",
      bronze: "Free",
      silver: "₹ 10",
      gold: "₹ 10",
      platinum: "₹ 10",
    },

    {
      pricing: "Zone 3",
      bronze: "Free",
      silver: "₹ 10",
      gold: "₹ 10",
      platinum: "₹ 10",
    },
    {
      pricing: "Zone 4",
      bronze: "Free",
      silver: "₹ 10",
      gold: "₹ 10",
      platinum: "₹ 10",
    },
    {
      pricing: "Zone 5",
      bronze: "Free",
      silver: "₹ 10",
      gold: "₹ 10",
      platinum: "₹ 10",
    },
  ];

  if (isRateCardPresent === false) {
    pricingData = [...pricingData, ...pricingDataOnRateCardFalse];
  }

  const PricingColumns = [
    columnsHelper.accessor("pricing", {
      header: () => {
        return (
          <p
            className={`font-Open  
               text-base leading-[22px] text-[#004EFF]
             font-semibold   text-start  whitespace-nowrap  lg:w-[642px] `}
          >
            Pricing
          </p>
        );
      },

      cell: (info: any) => {
        return (
          <p className="flex items-center  text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.pricing}
          </p>
        );
      },
    }),

    columnsHelper.accessor("bronze", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center ">
            Bronze
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.bronze}
          </div>
        );
      },
    }),
    columnsHelper.accessor("silver", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center ">
            Silver
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center first-letter:justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.silver}
          </div>
        );
      },
    }),
    columnsHelper.accessor("gold", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center ">
            Gold
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.gold}
          </div>
        );
      },
    }),
    columnsHelper.accessor("platinum", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center ">
            Platinum
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.platinum}
          </div>
        );
      },
    }),
  ];

  const FeaturesData = [
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

  const FeaturesColumns = [
    columnsHelper.accessor("overview", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-start whitespace-nowrap lg:w-[642px] ">
            Features
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
    columnsHelper.accessor("bronze", {
      header: () => {
        return <div className=""></div>;
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center">
            <Checkbox checked={info.row.original.bronze} />
          </div>
        );
      },
    }),
    columnsHelper.accessor("silver", {
      header: () => {
        return <div className=""></div>;
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center ">
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
        return <div className=""></div>;
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center ">
            <Checkbox checked={info.row.original.gold} />
          </div>
        );
      },
    }),
    columnsHelper.accessor("platinum", {
      header: () => {
        return <div className=""></div>;
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center ">
            <Checkbox checked={info.row.original.platinum} />
          </div>
        );
      },
    }),
  ];

  const RateCardData = [
    {
      zone: "Zone 1",
      bronze: "₹ 10",
      silver: "₹ 10",
      gold: "₹ 10",
      platinum: "₹ 10",
    },
    {
      zone: "Zone 2",
      bronze: "₹ 10",
      silver: "₹ 10",
      gold: "₹ 10",
      platinum: "₹ 10",
    },

    {
      zone: "Zone 3",
      bronze: "₹ 10",
      silver: "₹ 10",
      gold: "₹ 10",
      platinum: "₹ 10",
    },
    {
      zone: "Zone 4",
      bronze: "₹ 10",
      silver: "₹ 10",
      gold: "₹ 10",
      platinum: "₹ 10",
    },
    {
      zone: "Zone 5",
      bronze: "₹ 10",
      silver: "₹ 10",
      gold: "₹ 10",
      platinum: "₹ 10",
    },
  ];

  const RateCardDataColumns = [
    columnsHelper.accessor("zone", {
      header: () => {
        return (
          <p
            className={`font-Open  
               text-sm leading-5 text-[#1C1C1C]
             font-semibold   text-start  whitespace-nowrap lg:w-[642px] `}
          >
            Zones
          </p>
        );
      },

      cell: (info: any) => {
        return (
          <p className="flex items-center justify-start  text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.zone}
          </p>
        );
      },
    }),

    columnsHelper.accessor("bronze", {
      header: () => {
        return (
          <p
            className="font-Open  
               text-sm leading-5 text-[#1C1C1C]
             font-semibold   text-start  whitespace-nowrap "
          >
            Bronze
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-start font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.bronze}
          </div>
        );
      },
    }),
    columnsHelper.accessor("silver", {
      header: () => {
        return (
          <p
            className="font-Open  
               text-sm leading-5 text-[#1C1C1C]
             font-semibold   text-start  whitespace-nowrap"
          >
            Silver
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-start first-letter:justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.silver}
          </div>
        );
      },
    }),
    columnsHelper.accessor("gold", {
      header: () => {
        return (
          <p
            className="font-Open  
               text-sm leading-5 text-[#1C1C1C]
             font-semibold   text-start  whitespace-nowrap"
          >
            Gold
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-start font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.gold}
          </div>
        );
      },
    }),
    columnsHelper.accessor("platinum", {
      header: () => {
        return (
          <p
            className="font-Open  
               text-sm leading-5 text-[#1C1C1C]
             font-semibold   text-start  whitespace-nowrap "
          >
            Platinum
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-start font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.platinum}
          </div>
        );
      },
    }),
  ];

  useEffect(() => {
    (async () => {
      try {
        const { data: response }: any = await POST(GET_PLAN_URL);

        if (response?.success) {
          setPlanData(response.data);
        }
      } catch (error) {
        console.log("GET PLAN API ERROR", error);
        return error;
      }
    })();
  }, []);

  return (
    <>
      <div className="mr-4">
        <div className="mb-5">
          <Breadcum label="Plans" />
        </div>
        {/* Plan Upgradation */}

        <div className="flex items-center  rounded-lg border-[1px] p-4 border-[#E8E8E8] bg-[#F2F6FF] xl:justify-between   ml-[30px] mb-7">
          <div className="flex items-center">
            <img
              src={PlanDetailsGif}
              alt=""
              height={124}
              width={124}
              className="lg:mr-8"
            />
            <div className="flex flex-col justify-center gap-y-2  h-[120px]  lg:w-[838px] lg:mr-5">
              <p className="font-Lato text-[#004EFF] font-semibold text-[22px] leading-7  ">
                PLATINUM PLAN
              </p>
              <p className="font-Lato font-semibold text-lg leading-6 text-[#323232]">
                Built exclusively for your needs
              </p>
              <p className="font-Lato font-normal text-lg leading-6 text-[#777777]">
                Get extra 8% off on all your orders. International shipping,
                label customization and more
              </p>
            </div>
          </div>

          <ServiceButton
            onClick={() => {}}
            text="UPGRADE"
            className="!h-[36px] !bg-[#1C1C1C] !text-[#FFFFFF] !py-2 !px-4 !mr-5 !font-Open"
          />
        </div>
        {/* Plan Details */}

        <div className="ml-[30px] mb-9">
          <PlanDetailsCard planDetails={planData} />
        </div>

        {/* Info Cards */}
        <div className="flex items-center overflow-x-scroll  gap-x-6  ml-[30px] mb-9 xl:justify-between ">
          <InfoCards title="Custom Label Usage" numerator={3} denominator={5} />
          <InfoCards
            title="Total Shipments"
            numerator={250}
            isShipments={true}
          />
          <InfoCards
            title="Utilized Courier Partners"
            numerator={23}
            denominator={30}
          />
          <InfoCards
            title="Integrated Channels"
            numerator={23}
            denominator={30}
          />
        </div>

        {/*Active Recommended */}

        <div className="flex items-center justify-end  gap-x-4 mb-[21px] ml-[30px] ">
          <div className="rounded py-1 px-2 bg-[#004EFF] text-[#FFFFFF] font-Open font-semibold text-[12px] leading-4 ">
            Active
          </div>

          <div
            className="rounded py-1 px-2 bg-[#004EFF] text-[#FFFFFF] font-Open font-semibold text-[12px] leading-4 "
            data-tooltip-id="my-tooltip-inline"
            data-tooltip-content="Get more custom labels & channel integrations"
          >
            Recommended
          </div>
          <Tooltip
            id="my-tooltip-inline"
            style={{
              backgroundColor: "#004EFF",
              color: "#FFFFFF",
              width: "166px",
              fontFamily: "font-Open",
              fontSize: "12px",
              lineHeight: "16px",
            }}
          />
        </div>

        {/*Pricing Table */}

        <div className="ml-[30px] ">
          <CustomTable
            columns={PricingColumns}
            data={pricingData}
            tdclassName={"def"}
            thclassName={"bg-white"}
          />
        </div>
        {/* Change Buttons */}

        <div className="grid grid-cols-12 gap-x-4 ml-[30px] mr-6 ">
          <div className="col-span-7"></div>

          <ServiceButton
            text={"Change"}
            className="!py-2 !px-4 !h-[34px]"
            onClick={() => {}}
          />
          <ServiceButton
            text={"Change"}
            className="!py-2 !px-4 !h-[34px]"
            onClick={() => {}}
          />
          <div className="col-span-1"></div>
          <ServiceButton
            onClick={() => {}}
            text="UPGRADE"
            className="!h-[34px] !bg-[#1C1C1C] !text-[#FFFFFF] !py-2 !px-4 "
          />
        </div>

        {/* Features Table */}
        <div className="ml-[30px] mb-[68px] ">
          <CustomTable
            columns={FeaturesColumns}
            data={FeaturesData}
            tdclassName={"def"}
            thclassName={"border-none bg-white"}
          />
        </div>

        <div className="flex items-center justify-between   h-[60px] rounded-lg p-3 bg-[#E5E4FF] ml-[30px] mb-6">
          <p className="font-Lato font-semibold text-xl leading-[26px] text-[#494949]">
            Not sure which plan to choose?
          </p>
          <ServiceButton
            className="!h-[36px] !bg-[#1C1C1C] !text-[#FFFFFF] !py-2 !px-4 !mr-5 !font-Open"
            text="TALK TO OUR SUPPORT"
            onClick={() => {}}
          />
        </div>
        {/* Rate Card  */}
        {isRateCardPresent && (
          <div className="ml-[30px] mb-6">
            <CustomAccordianWithTable
              dummyDatas={DummyData}
              title="Rate Card"
              isIcon={true}
              icon={RateCardIcon}
              data={RateCardData}
              columns={RateCardDataColumns}
            />
          </div>
        )}
        {/* Terms & Conditions */}
        <div className="ml-[30px]">
          <CustomAccordianWithTable
            dummyDatas={DummyData}
            title="Terms & Conditions"
            isIcon={true}
            icon={TermsAndConditionsIcon}
            data={[]}
            columns={[]}
          />
        </div>
      </div>
    </>
  );
};

export default PlanDetails;
