import React, { useState, useEffect } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import Checkbox from "../../components/CheckBox";
import ServiceButton from "../../components/Button/ServiceButton";
import PlanDetailsCard from "./planDetailsCard";
import InfoCards from "./infoCards";
import DummyData from "../../screens/NewOrder/Filter/dummyFile.json";
import CustomAccordianWithTable from "../../components/CustomAccordian/customAccordianWithTable";
import TermsAndConditionsIcon from "../../assets/Plan/document.svg";
import "../../styles/plan.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { GET_PLAN_URL } from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import PlanDetailsGif from "../../assets/Plan/plan-details.gif";
import { GET_ALL_PLANS } from "../../utils/ApiUrls";
import { ScrollNav } from "../../components/ScrollNav";
import CourierPricing from "./courierPricing";

interface ITypeProps {}

const PlanDetails = (props: ITypeProps) => {
  const columnsHelper = createColumnHelper<any>();

  const [planData, setPlanData] = useState<any>([]);
  const [allPlans, setAllPlans] = useState<any>([]);

  const [renderingComponents, setRenderingComponents] = React.useState(0);

  const arrayData = [
    { index: 0, label: "Courier Pricing" },
    { index: 1, label: "VAS Pricing" },
    { index: 2, label: "COD Pricing" },
  ];
  let pricingData = [
    {
      pricing: "Subscription Amount",
      freemium: "Free",
      silver: "₹ 500",
      gold: "₹ 500",
      platinum: "On Request",
    },

    {
      pricing: "Annual Pricing",
      freemium: "Free",
      silver: "₹ 5000",
      gold: "₹ 5000",
      platinum: "On Request",
    },
    {
      pricing: "Your Savings",
      freemium: "-",
      silver: "₹ 5000",
      gold: "₹ 5000",
      platinum: "-",
    },
    {
      pricing: "Zone 1",
      freemium: "₹ 10",
      silver: "₹ 10",
      gold: "₹ 10",
      platinum: "₹ 10",
    },
    {
      pricing: "Zone 2",
      freemium: "₹ 20",
      silver: "₹ 20",
      gold: "₹ 20",
      platinum: "₹ 20",
    },

    {
      pricing: "Zone 3",
      freemium: "₹ 30",
      silver: "₹ 30",
      gold: "₹ 30",
      platinum: "₹ 30",
    },
    {
      pricing: "Zone 4",
      freemium: "₹ 40",
      silver: "₹ 40",
      gold: "₹ 40",
      platinum: "₹ 40",
    },
    {
      pricing: "Zone 5",
      freemium: "₹ 50",
      silver: "₹ 50",
      gold: "₹ 50",
      platinum: "₹ 50",
    },
  ];

  const pricingColumns = [
    columnsHelper.accessor("pricing", {
      header: () => {
        return (
          <p
            className={`font-Open  
               text-base leading-[22px] text-[#004EFF]
             font-semibold   text-start  whitespace-nowrap  lg:min-w-[642px] lg:max-w-[642px]`}
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

    columnsHelper.accessor("freemium", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center ">
            {allPlans[0]?.planName || "FREEMIUM"}
          </p>
        );
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center font-Open font-normal text-sm leading-5 text-[#1C1C1C] ">
            {info.row.original.freemium}
          </div>
        );
      },
    }),
    columnsHelper.accessor("silver", {
      header: () => {
        return (
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
            {allPlans[1]?.planName || "SILVER"}
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
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
            {allPlans[2]?.planName || "GOLD"}
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
          <p className="font-Open text-sm font-semibold leading-[18px] text-[#004EFF] text-center  ">
            {allPlans[3]?.planName || "PLATINUM"}
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

  const featuresData = [
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

  const featuresColumns = [
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
    columnsHelper.accessor("freemium", {
      header: () => {
        return <div></div>;
      },
      cell: (info: any) => {
        return (
          <div className="flex items-center justify-center">
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
        return <div></div>;
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
        return <div></div>;
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
        return <div></div>;
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

  const activeData = [
    { pricing: "", freemium: "", silver: "", gold: "", platinum: "" },
  ];
  const activeColumns = [
    columnsHelper.accessor("pricing", {
      header: () => {
        return <div className="lg:w-[642px]"></div>;
      },

      cell: (info: any) => {
        return (
          <p className="flex items-center  text-[#1C1C1C] font-Open text-sm font-semibold leading-5 ">
            {info.row.original.pricing}
          </p>
        );
      },
    }),

    columnsHelper.accessor("freemium", {
      header: () => {
        return <></>;
      },
      cell: (info: any) => {
        return (
          planData[0]?.planName.toUpperCase() === "FREEMIUM" && activeElement()
        );
      },
    }),
    columnsHelper.accessor("silver", {
      header: () => {
        return <></>;
      },
      cell: (info: any) => {
        return (
          planData[0]?.planName.toUpperCase() === "SILVER" && activeElement()
        );
      },
    }),
    columnsHelper.accessor("gold", {
      header: () => {
        return <></>;
      },
      cell: (info: any) => {
        return (
          planData[0]?.planName.toUpperCase() === "GOLD" && activeElement()
        );
      },
    }),
    columnsHelper.accessor("platinum", {
      header: () => {
        return <></>;
      },
      cell: (info: any) => {
        return planData[0]?.planName.toUpperCase() === "PLATINUM" ? (
          activeElement()
        ) : (
          <div className="flex items-center justify-center">
            <div
              className="rounded  py-1 px-2 bg-[#004EFF] text-[#FFFFFF] font-Open font-semibold text-[12px] leading-4 "
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
        );
      },
    }),
  ];

  const changePlansData = [
    { pricing: "", freemium: "", silver: "", gold: "", platinum: "" },
  ];
  const changePlansColumns = [
    columnsHelper.accessor("pricing", {
      header: () => {
        return <div className="lg:w-[642px]"></div>;
      },

      cell: (info: any) => {
        return <></>;
      },
    }),

    columnsHelper.accessor("freemium", {
      header: () => {
        return (
          <div className="flex justify-center">
            {planData[0]?.planName.toUpperCase() !== "FREEMIUM" &&
              changeButton()}
          </div>
        );
      },
      cell: (info: any) => {},
    }),
    columnsHelper.accessor("silver", {
      header: () => {
        return (
          <div className="flex justify-center">
            {planData[0]?.planName.toUpperCase() !== "SILVER" && changeButton()}
          </div>
        );
      },
      cell: (info: any) => {},
    }),
    columnsHelper.accessor("gold", {
      header: () => {
        return (
          <div className="flex justify-center">
            {planData[0]?.planName.toUpperCase() !== "GOLD" && changeButton()}
          </div>
        );
      },
      cell: (info: any) => {},
    }),
    columnsHelper.accessor("platinum", {
      header: () => {
        return (
          <div className="flex justify-center">
            {planData[0]?.planName.toUpperCase() !== "PLATINUM" && (
              <div className="flex items-center justify-center">
                <ServiceButton
                  onClick={() => {}}
                  text="UPGRADE"
                  className="!h-[34px] !bg-[#1C1C1C] !text-[#FFFFFF] !py-2 !px-4  "
                />
              </div>
            )}
          </div>
        );
      },
      cell: (info: any) => {},
    }),
  ];

  const termsAndConditionsData = [
    {
      termType: "Courier Selection",
      definition:
        "Courier Partner Selection will be done by Shipyaari monitored Automation Right Tool",
    },
    {
      termType: "COD Charges",
      definition: "INR 39 or 1.50 % whichever is higher",
    },
    {
      termType: "Return Charge",
      definition: "Same as forward charges",
    },
    {
      termType: "Reverse Pick Up Charge",
      definition:
        "1.5 times of forward charges. (i.e.- if forward charges - INR 100, then reverse charge is INR 150)",
    },

    {
      termType: "Insurance Charges on Invoice value (Optional)",
      definition: (
        <div className="flex items-center justify-between max-w-[400px]">
          <div className="flex flex-col">
            <span className="mb-2">Sum Assured</span>
            <span>{`(i)  Up to 5000 `}</span>
            <span>{`(ii)  5000 to 50000 `}</span>
            <span>{`(iii)  50,000 to 1,00,000 `}</span>
            <span>{`(iv)  Above 1 Lakh`}</span>
          </div>
          <div className="flex flex-col">
            <span className="mb-2">Premium</span>
            <span>{`0.00 %`}</span>
            <span>{`0.75 %`}</span>
            <span>{`1.00 %`}</span>
            <span>{`On Demand Quote`}</span>
          </div>
        </div>
      ),
    },
    {
      termType: "Certificate of Fact",
      definition:
        "0.3% of the invoice value or INR 50 whichever is higher. (optional)",
    },
    {
      termType: "Chargeable Weight",
      definition:
        "The volumetric or dimensional weight is calculated and compared with the actual weight of the shipment to ascertain which is greater, the higher weight is used to calculate the shipment cost.",
    },
    {
      termType: "Volumetric Calculation",
      definition: (
        <div className="flex flex-col gap-y-4">
          <p>
            The volumetric weight of a shipmentis a calculation that reflects
            the density of a package. Calculations would be follow:
          </p>
          <div className="flex flex-col gap-y-2">
            <span>{`Surface mode (L*B*H)/4000 in Centimeter`}</span>
            <span>{`Air mode (L*B*H)/5000 in Centimeter`}</span>
          </div>
        </div>
      ),
    },
    {
      termType: "Manual Label Penalty",
      definition: "INR 500 per shipment",
    },
    {
      termType: "ODA / OPA / ESS",
      definition:
        "INR 1000 per consignment or INR 160/kg, whichever is higher.",
    },
  ];
  const termsAndConditionsColumns = [
    columnsHelper.accessor("termType", {
      header: () => {
        return (
          <div className="flex justify-between items-center max-w-[266px]">
            <div>
              <h1 className="text-sm font-Open leading-5 font-semibold text-[#1C1C1C]">
                Term Type
              </h1>
            </div>
          </div>
        );
      },

      cell: (info: any) => {
        return (
          <div className="font-Open font-normal text-sm leading-5 text-[#1C1C1C]">
            {info.row.original.termType}
          </div>
        );
      },
    }),
    columnsHelper.accessor("definition", {
      header: () => {
        return (
          <div className="flex justify-between items-center  ">
            <h1 className="text-sm font-Open leading-5 font-semibold text-[#1C1C1C]">
              Definition
            </h1>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <div className="font-Open font-normal text-sm leading-5 text-[#1C1C1C] p-2">
            {info.row.original.definition}
          </div>
        );
      },
    }),
  ];

  const activeElement = () => {
    return (
      <div className="flex items-center justify-center">
        <div
          className={`rounded   py-1 px-2 bg-[#004EFF] text-[#FFFFFF] font-Open font-semibold text-[12px] leading-4 `}
        >
          Active
        </div>
      </div>
    );
  };

  const changeButton = () => {
    return (
      <div className="flex items-center justify-center">
        <ServiceButton
          text={"Change"}
          className="!py-2 !px-4 !h-[34px]"
          onClick={() => {}}
        />
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        //Get Plan API
        const { data: planResponse }: any = await POST(GET_PLAN_URL);
        const { data: response }: any = await POST(GET_ALL_PLANS, {
          limit: 4,
        });

        if (planResponse?.success) {
          setPlanData(planResponse?.data);
        }

        if (response?.success) {
          setAllPlans(response?.data.reverse());
        }
      } catch (error) {
        console.error(" PLANS API ERROR", error);

        return error;
      }
    })();
  }, []);

  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);
  };

  return (
    <>
      <div className="mr-4">
        <div className="mb-5">
          <Breadcrum label="Plans" />
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
            <div className="flex flex-col justify-center gap-y-2  h-[120px]   lg:mr-5">
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
          <div className="justify-end">
            <ServiceButton
              onClick={() => {}}
              text="UPGRADE"
              className="!h-[36px] !bg-[#1C1C1C] !text-[#FFFFFF] !py-2 !px-4 !mr-5 !font-Open"
            />
          </div>
        </div>
        {/* Plan Details */}
        <div className="ml-[30px] mb-9">
          <PlanDetailsCard planDetails={planData} />
        </div>
        {/* Pricing Details */}
        <div className="ml-[30px] mb-4">
          <ScrollNav
            arrayData={arrayData}
            showNumber={false}
            setScrollIndex={setScrollIndex}
          />
        </div>
        {renderingComponents === 0 && <CourierPricing />}

        {/* Info Cards */}
        <div className="flex items-center overflow-x-scroll  gap-x-6  ml-[30px] mb-2 xl:justify-between ">
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

        <div className="ml-[30px] ">
          <CustomTable
            data={activeData}
            columns={activeColumns}
            thclassName={"border-none bg-white"}
            tdclassName={"border-none "}
            trclassName={"shadow-none"}
          />
        </div>
        {/*Pricing Table */}
        <div className="ml-[30px] ">
          <CustomTable
            columns={pricingColumns}
            data={pricingData}
            tdclassName={"def"}
            thclassName={"bg-white"}
          />
        </div>
        {/* Change-Upgrade Plans */}

        <div className="ml-[30px]">
          <CustomTable
            data={changePlansData}
            columns={changePlansColumns}
            thclassName={"border-none bg-white"}
            tdclassName={"border-none "}
            trclassName={"shadow-none"}
          />
        </div>
        {/* Features Table */}
        <div className="ml-[30px] mb-[68px] ">
          <CustomTable
            columns={featuresColumns}
            data={featuresData}
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

        {/* Terms & Conditions */}

        <div className="ml-[30px]">
          <CustomAccordianWithTable
            dummyDatas={DummyData}
            title="Terms & Conditions"
            isIcon={true}
            icon={TermsAndConditionsIcon}
            data={termsAndConditionsData}
            columns={termsAndConditionsColumns}
          />
        </div>

        {/* end here */}
      </div>
    </>
  );
};

export default PlanDetails;
