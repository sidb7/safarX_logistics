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
import {
  GET_PLAN_URL,
  GET_PENDING_PLANS,
  POST_ASSIGN_PLANV3,
  GET_PLANS_PREVIEW,
} from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import PlanDetailsGif from "../../assets/Plan/plan-details.gif";
import { GET_ALL_PLANS } from "../../utils/ApiUrls";
import { ScrollNav } from "../../components/ScrollNav";
import CourierPricing from "./courierPricing";
import { useSelector } from "react-redux";
import AccessDenied from "../../components/AccessDenied";
import { ResponsiveState } from "../../utils/responsiveState";
import { BottomNavBar } from "../../components/BottomNavBar";
import { checkPageAuthorized } from "../../redux/reducers/role";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/Button";
import CrossIcon from "../../assets/CloseIcon.svg";
import CenterModal from "../../components/CustomModal/customCenterModal";
import { capitalizeFirstLetter } from "../../utils/utility";
import { toast } from "react-hot-toast";
import CodPricing from "./CodPricing";

interface ITypeProps {}

const PlanDetails = (props: ITypeProps) => {
  const columnsHelper = createColumnHelper<any>();
  const navigate = useNavigate();
  const roles = useSelector((state: any) => state?.roles);
  // const isActive = roles.roles?.[0]?.menu?.[4]?.menu?.[1]?.pages?.[0]?.isActive;
  const isActive = checkPageAuthorized("Plan Details");

  const [planData, setPlanData] = useState<any>([]);
  const [allPlans, setAllPlans] = useState<any>([]);
  const [pendingPlan, setPendingPlan] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [renderingComponents, setRenderingComponents] = useState<any>(0);

  // State to hold logistics rate card data
  const [logisticsData, setLogisticsData] = useState<any>([]);

  // State to hold COD rate card data
  const [codData, setCodData] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(false);

  const { isLgScreen, isMdScreen } = ResponsiveState();

  const arrayData = [
    { index: 0, label: "Courier Pricing" },
    // { index: 1, label: "VAS Pricing" },
    { index: 1, label: "COD Pricing" },
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
             font-semibold   text-start  whitespace-nowrap  lg:w-[642px]`}
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
              checked={true}
              style={{ accentColor: "black" }}
              showCase={true}
              checkboxClassName="gap-2"
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
              checkboxClassName="!text-black gap-2"
              checked={true}
              style={{ accentColor: "black" }}
              showCase={true}
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
              showCase={true}
              checkboxClassName="gap-2"
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
              showCase={true}
              checkboxClassName="gap-2"
            />
          </div>
        );
      },
    }),
  ];

  const activeData = [
    {
      pricing: "",
      silver: allPlans[0]?.planName,
      freemium: allPlans[1]?.planName,
      gold: allPlans[2]?.planName,
      platinum: allPlans[3]?.planName,
    },
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

    columnsHelper.accessor("silver", {
      header: () => {
        return <></>;
      },
      cell: (info: any) => {
        return (
          planData[0]?.planName.toUpperCase() === info.row.original.silver &&
          activeElement()
        );
      },
    }),
    columnsHelper.accessor("freemium", {
      header: () => {
        return <></>;
      },
      cell: (info: any) => {
        return (
          planData[0]?.planName.toUpperCase() === info.row.original.freemium &&
          activeElement()
        );
      },
    }),
    columnsHelper.accessor("gold", {
      header: () => {
        return <></>;
      },
      cell: (info: any) => {
        return (
          planData[0]?.planName.toUpperCase() === info.row.original.gold &&
          activeElement()
        );
      },
    }),
    columnsHelper.accessor("platinum", {
      header: () => {
        return <></>;
      },
      cell: (info: any) => {
        return planData[0]?.planName.toUpperCase() ===
          info.row.original.platinum ? (
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
    {
      pricing: "",
      silver: allPlans[0]?.planName,
      freemium: allPlans[1]?.planName,
      gold: allPlans[2]?.planName,
      platinum: allPlans[3]?.planName,
    },
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

    columnsHelper.accessor("silver", {
      header: (info: any) => {
        return <></>;
      },
      cell: (info: any) => {
        return (
          <div className="flex justify-center">
            {planData[0]?.planName.toUpperCase() !== info.row.original.silver &&
              changeButton()}
          </div>
        );
      },
    }),
    columnsHelper.accessor("freemium", {
      header: () => {
        return <></>;
      },
      cell: (info: any) => {
        return (
          <div className="flex justify-center">
            {planData[0]?.planName.toUpperCase() !==
              info.row.original.freemium && changeButton()}
          </div>
        );
      },
    }),
    columnsHelper.accessor("gold", {
      header: () => {
        return <></>;
      },
      cell: (info: any) => {
        return (
          <div className="flex justify-center">
            {planData[0]?.planName.toUpperCase() !== info.row.original.gold &&
              changeButton()}
          </div>
        );
      },
    }),
    columnsHelper.accessor("platinum", {
      header: () => {
        return <></>;
      },
      cell: (info: any) => {
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
          <div className="flex justify-between items-center lg:w-[266px]">
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

  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);
  };

  const assignPlan = async () => {
    let payload = { planId: pendingPlan?.planId };
    try {
      const { data: responseV4 }: any = await POST(POST_ASSIGN_PLANV3, payload);
      if (responseV4?.success) {
        console.log("responseV4", responseV4?.message.includes("Approve"));
        if (responseV4?.message.includes("Approve")) {
          toast.success(responseV4?.message);
          setIsModalOpen(false);
        } else {
          setIsModalOpen(false);
          toast.success(responseV4?.message);
          window.location.reload();
        }
      } else {
        toast.error(responseV4?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const planPreview = async (planId: any) => {
    let payload = {
      planId: planId,
    };
    try {
      setIsLoading(true);
      const { data } = await POST(GET_PLANS_PREVIEW, payload);
      if (data?.success && data?.data?.length > 0) {
        let rateCards: any = data.data[0].rateCards;

        // Filter and set logistics data
        const filteredLogisticsData: any = rateCards
          .filter((card: any) => card.type === "LOGISTIC")
          .map((card: any) => card.data);
        setLogisticsData(filteredLogisticsData);

        // Filter and set COD data
        const filteredCodData = rateCards
          .filter((card: any) => card.type === "COD")
          .map((card: any) => card.data);
        setCodData(filteredCodData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      let planId: any = "";
      try {
        //Get Plan API
        const { data: planResponse }: any = await POST(GET_PLAN_URL);
        const { data: response }: any = await POST(GET_ALL_PLANS, {
          limit: 4,
        });

        if (planResponse?.success) {
          setPlanData(planResponse?.data);
          planId = planResponse?.data?.[0]?.planId;
          planPreview(planId);
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

  useEffect(() => {
    (async () => {
      try {
        const { data: response }: any = await POST(GET_PENDING_PLANS);
        if (response?.success && response?.data?.length > 0) {
          setPendingPlan(response?.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   planPreview();
  // }, []);

  return (
    <>
      {isActive ? (
        <div className="">
          <div className="lg:mb-5">
            <Breadcrum label="Plans" />
          </div>
          {/* Plan Upgradation */}
          {/* <div className="flex  items-center h-[124px]  rounded-lg border-[1px] p-1 md:p-4 border-[#E8E8E8] bg-[#F2F6FF] justify-between    mb-7  mx-5 lg:ml-[30px]">
            <div className="flex    items-center justify-between ">
              <img
                src={PlanDetailsGif}
                alt=""
                height={isLgScreen ? 124 : 90}
                width={isLgScreen ? 124 : 90}
                className="lg:mr-8"
              />
              <div className="flex flex-col   justify-center gap-y-1 lg:gap-y-2  lg:h-[120px]  lg:mr-5">
                <p className="font-Open lg:font-Lato text-[#004EFF] font-semibold text-sm lg:text-[22px] leading-5 lg:leading-7  ">
                  PLATINUM PLAN
                </p>
                <p className="font-Open lg:font-Lato font-semibold text-sm lg:text-lg leading-4 lg:leading-6 text-[#323232]">
                  Built exclusively for your needs
                </p>
                <p className="font-Open  lg:font-Lato font-normal text-sm lg:text-lg leading-4 lg:leading-6 text-[#777777]">
                  Get extra 8% off on all your orders
                  {isLgScreen &&
                    "International shipping,label customization and more."}
                </p>
              </div>
            </div>
            <div className="flex   items-center justify-end ">
              <ServiceButton
                onClick={() => {
                  navigate("/plans");
                }}
                text="UPGRADE"
                className="lg:!w-full !w-[80px]  !h-[36px] !bg-[#1C1C1C] !text-[#FFFFFF] !py-2 !px-4  !font-Open"
              />
            </div>
          </div> */}
          {/* Plan Details */}
          <div className=" mb-9 mx-5 lg:ml-[20px]">
            <PlanDetailsCard planDetails={planData} />
          </div>
          {/* Pricing Details */}
          <div className="mb-4 mx-5 lg:ml-[20px]">
            <ScrollNav
              arrayData={arrayData}
              showNumber={false}
              setScrollIndex={setScrollIndex}
            />
          </div>
          {renderingComponents === 0 && (
            <CourierPricing
              logisticsData={logisticsData}
              setLogisticsData={setLogisticsData}
              isLoading={isLoading}
            />
          )}

          {renderingComponents === 1 && <CodPricing codData={codData} />}

          {/* Info Cards */}
          {/* <div className="grid grid-cols-2 lg:grid-cols-4   gap-5   mb-6 mx-5 lg:ml-[30px] ">
            <InfoCards
              title="Custom Label Usage"
              numerator={3}
              denominator={5}
            />
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
          </div> */}
          {/*Active Recommended */}

          {/* <div className="customScroll mx-5 lg:ml-[30px] ">
            <CustomTable
              data={activeData}
              columns={activeColumns}
              thclassName={"border-none bg-white"}
              tdclassName={"border-none "}
              trclassName={"shadow-none"}
            />
          </div> */}
          {/*Pricing Table */}
          {/* <div className="customScroll mx-5 lg:ml-[30px] ">
            <CustomTable
              columns={pricingColumns}
              data={pricingData}
              tdclassName={"def"}
              thclassName={"bg-white"}
            />
          </div> */}
          {/* Change-Upgrade Plans */}

          {/* <div className="customScroll mx-5 lg:ml-[30px]">
            <CustomTable
              data={changePlansData}
              columns={changePlansColumns}
              thclassName={"border-none bg-white"}
              tdclassName={"border-none "}
              trclassName={"shadow-none"}
            />
          </div> */}
          {/* Features Table */}
          {/* <div className=" mb-[68px] customScroll mx-5 lg:ml-[30px]">
            <CustomTable
              columns={featuresColumns}
              data={featuresData}
              tdclassName={"def"}
              thclassName={"border-none bg-white"}
            />
          </div> */}
          <div
            className={`${
              isMdScreen
                ? "flex items-center justify-between h-[60px] rounded-lg p-9 md:p-5  bg-[#E5E4FF]  mb-6 mx-5 lg:ml-[20px]"
                : "flex items-center text-center px-3 py-4 rounded-lg  bg-[#E5E4FF]  mb-6 mx-5"
            }`}
          >
            {isMdScreen ? (
              <p className=" font-Open md:font-Lato font-normal md:font-semibold text-base lg:text-xl leading-3 lg:leading-[26px] text-[#494949]">
                Not sure which plan to choose?
              </p>
            ) : (
              <></>
            )}

            <div className="flex gap-x-2">
              {Object.keys(pendingPlan).length !== 0 ? (
                <>
                  <div className="">
                    <CustomButton
                      className=" !bg-[#FFFFFF] !border-[#FABCAF] !text-[#F35838] lg:!py-2 lg:!px-4 !font-Open !border-[1px] !rounded-sm lg:!border-2 lg:!rounded-[4px] lg:hover:-translate-y-1 lg:hover:scale-100 lg:duration-300"
                      text={"Pending Plan!"}
                      textClassName="!font-normal !text-[12px]"
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="">
                <ServiceButton
                  className=" md:!h-[36px] !bg-[#1C1C1C] !text-[#FFFFFF] !py-2 !px-4 !font-Open text-xs md:text-sm font-normal md:font-semibold leading-4 whitespace-nowrap"
                  text="TALK TO OUR SUPPORT"
                  onClick={() => {
                    window.open(
                      "https://support.shipyaari.com/tickets",
                      "_blank"
                    );
                  }}
                />
              </div>
            </div>
          </div>

          {isModalOpen && (
            <CenterModal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              className="md:h-[65%] md:w-[65%] h-[55%] lg:h-[60%%] lg:w-[50%] xl:h-[60%] 2xl:h-[56%] xl:w-[40%]"
            >
              <>
                <div className=" w-full gap-y-6 p-4 flex flex-col">
                  <div className="flex items-center justify-end">
                    {/* <p className="font-open text-lg font-semibold leading-5">
                      Plan Info
                    </p> */}
                    <div
                      onClick={() => {
                        setIsModalOpen(false);
                      }}
                      className="flex justify-end"
                    >
                      <img alt="" className="cursor-pointer" src={CrossIcon} />
                    </div>
                  </div>
                  <div className="flex flex-col m-5 mt-3 gap-y-4">
                    <div className="p-5 border-[1px] border-[#DDDDDD] shadow-lg rounded-md">
                      <div className="flex flex-col gap-y-6">
                        <div className="flex justify-between">
                          <p className="font-Open font-normal text-base leading-[22px]">
                            Plan Name:
                          </p>
                          <p className="font-Open text-base font-semibold leading-[22px]">
                            {capitalizeFirstLetter(pendingPlan?.planName)}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-Open font-normal text-base leading-[22px]">
                            Validity:
                          </p>
                          <p className="font-Open text-base font-semibold leading-[22px]">
                            {capitalizeFirstLetter(pendingPlan?.validity)}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-Open font-normal text-base leading-[22px]">
                            Description:
                          </p>
                          <p className="font-Open text-base font-semibold leading-[22px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {capitalizeFirstLetter(
                              pendingPlan?.shortDescription
                            )}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-Open font-normal text-base leading-[22px]">
                            Plan Price:
                          </p>
                          <p className="font-Open text-base font-semibold leading-[22px]">
                            ₹ {pendingPlan?.preTaxPrice || 0}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="font-Open font-normal text-base leading-[22px]">
                            Tax:
                          </p>
                          <p className="font-Open text-base font-semibold leading-[22px]">
                            ₹ {pendingPlan?.taxAmount || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 border-[1px] border-[#DDDDDD] shadow-lg rounded-md">
                      <div className="flex flex-col gap-y-6">
                        <div className="flex justify-between">
                          <p className="font-Open font-semibold text-lg leading-[24px] text-[#004EFF]">
                            Total:
                          </p>
                          <p className="font-Open text-lg font-semibold leading-[24px] text-[#004EFF]">
                            ₹ {pendingPlan?.price || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-x-3 mt-5">
                      <CustomButton
                        text="close"
                        onClick={() => {
                          setIsModalOpen(false);
                        }}
                        className="lg:!w-[184px] lg:!h-[54px] !bg-[white] !border-[1px] !border-[#A4A4A4] !text-[black] lg:!py-[18px] lg:!px-[80px] !rounded-[4px]"
                      />
                      <CustomButton
                        text="yes"
                        onClick={assignPlan}
                        className="lg:!w-[184px] lg:!h-[54px] lg:!py-[18px] lg:!px-[80px] !rounded-[4px]"
                      />
                    </div>
                  </div>
                </div>
              </>
            </CenterModal>
          )}

          {/* Terms & Conditions */}

          {/* <div className="mx-5 lg:ml-[30px]">
            <CustomAccordianWithTable
              dummyDatas={DummyData}
              title="Terms & Conditions"
              titleForMobile="Our Terms"
              isIcon={true}
              icon={TermsAndConditionsIcon}
              data={termsAndConditionsData}
              columns={termsAndConditionsColumns}
            />
          </div> */}

          {/* Bottom NavBar for Mobile */}
          {/* <div className="lg:hidden mt-24">
            <BottomNavBar />
          </div> */}
          {/* end here */}
        </div>
      ) : (
        <div>
          <AccessDenied />
        </div>
      )}
    </>
  );
};

export default PlanDetails;
