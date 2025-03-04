import React, { useEffect, useState } from "react";
import PlanCard from "./planCard";
import { Breadcrum } from "../../components/Layout/breadcrum";
import "../../styles/plan.css";
import {
  GET_ALL_PLANS,
  GET_FEATURES_PLANS,
  GET_PENDING_PLANS,
  POST_ASSIGN_PLANV3,
  POST_CREATE_PLAN,
  POST_PROCESS_SHOPIFY_PLAN,
} from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import AccessDenied from "../../components/AccessDenied";
import ComparePlans from "./comparePlans";
import { useNavigate } from "react-router-dom";
import CenterModal from "../../components/CustomModal/customCenterModal";
import WebCrossIcon from "../../assets/PickUp/ModalCrossWeb.svg";
import ServiceButton from "../../components/Button/ServiceButton";
import { BottomNavBar } from "../../components/BottomNavBar";
import { checkPageAuthorized } from "../../redux/reducers/role";
import { Spinner } from "../../components/Spinner";
import ToastCustom from "../toastCutom";
import OneButton from "../../components/Button/OneButton";
import FeatureRateCard from "./featureRateCardDetails";
import { ResponsiveState } from "../../utils/responsiveState";
import CustomButton from "../../components/Button";
import { capitalizeFirstLetter } from "../../utils/utility";

interface ITypeProps {}

const Index = (props: ITypeProps) => {
  const navigate = useNavigate();
  const roles = useSelector((state: any) => state?.roles);
  const { isMdScreen } = ResponsiveState();

  // const isActive = roles.roles?.[0]?.menu?.[4]?.menu?.[0]?.pages?.[0]?.isActive;
  const isActive = checkPageAuthorized("Plans");

  const [allPlans, setAllPlans] = useState<any>([]);
  const [activePlanId, setActivePlanId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPlan, setIsModalOpenPlan] = useState(false);
  const [onSelectPlan, setOnSelectPlan] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [featureRateCardPlan, setFeatureRateCardPlan] = useState([]);
  const [isShopifyEnabled, setIsShopifyEnabled] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<any>({});
  const [LoaderForAssignValue, setLoaderForAssignValue] = useState(false);

  const ModalContent = () => {
    return (
      <div className="flex flex-col  w-full h-full p-5">
        <div className="flex justify-end">
          <img
            src={WebCrossIcon}
            alt=""
            className="cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
        <div className="flex flex-col  mt-16">
          <div className="flex flex-col  items-center  ">
            <p className="font-Open text-sm md:text-base font-semibold text-center">
              Are you sure you want to select
              <span className="text-[#004EFF]"> {onSelectPlan?.planName} </span>
              plan?
            </p>
            <div className="flex  items-center gap-x-4 mt-10">
              <OneButton
                text="Yes"
                className=" px-4 py-2"
                onClick={() => {
                  isShopifyEnabled
                    ? processShopifyPlan(onSelectPlan)
                    : assignPlan(onSelectPlan);
                  setIsModalOpen(false);
                }}
                variant="secondary"
              />
              {/* <ServiceButton
                text="Yes"
                className="bg-[#ffffff] px-4 py-2 text-[#1c1c1c] font-semibold text-sm"
                onClick={() => {
                  assignPlan(onSelectPlan);
                  setIsModalOpen(false);
                }}
              /> */}
              <OneButton
                text="No"
                className=" px-4 py-2"
                onClick={() => setIsModalOpen(false)}
                variant="primary"
              />
              {/* <ServiceButton
                text="No"
                className="bg-[#1C1C1C] px-4 py-2 text-white font-semibold text-sm"
                onClick={() => setIsModalOpen(false)}
              /> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const assignPlan = async (payload: any) => {
    try {
      // Assign Plan API
      const { data: response }: any = await POST(POST_ASSIGN_PLANV3, {
        planId: payload?.planId,
      });
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

  const processShopifyPlan = async (payload: any) => {
    try {
      // Assign Plan API
      const { data: response }: any = await POST(POST_PROCESS_SHOPIFY_PLAN, {
        planId: payload?.planId,
      });

      if (response?.success) {
        setActivePlanId(payload?.planId);
        toast.success(response?.message);

        // Redirect to the confirmation URL
        if (response?.confirmationUrl) {
          // window.location.href = response?.confirmationUrl;
          window.open(response?.confirmationUrl, "_blank");
        }
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("An error occurred during the plan process.");
      console.error(error);
    }
  };

  const sortByPrice = (a: any, b: any) => {
    return a.price - b.price;
  };

  const callFeaturesRateCard = async () => {
    try {
      const { data: response }: any = await POST(GET_FEATURES_PLANS, {
        limit: 1000000,
      });
      if (response?.success) {
        setFeatureRateCardPlan(response?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      try {
        //Get all plans API
        setLoading(true);
        const kycCheck = JSON.parse(localStorage.getItem("kycValue") || "{}");
        const isChannelIntegrated =
          kycCheck?.nextStep?.isChannelIntegrated || false;
        const isShopifyApp = kycCheck?.nextStep?.isShopifyApp || false;
        const shouldEnableShopify = isChannelIntegrated && isShopifyApp;
        // console.log("🚀 ~ shouldEnableShopify:", shouldEnableShopify);
        setIsShopifyEnabled(shouldEnableShopify);
        const payload: any = {
          limit: 1000000,
          ...(shouldEnableShopify ? { isShopify: true } : {}),
        };
        const { data: response }: any = await POST(GET_ALL_PLANS, payload);

        if (response?.success) {
          setLoading(false);
          let tempPlan = response?.data;
          tempPlan.sort(sortByPrice);
          // const selectedPlans = tempPlan.filter((plan: any) => plan.isSelected);
          // const unselectedPlans = tempPlan.filter(
          //   (plan: any) => !plan.isSelected
          // );
          // const reorderedPlans = selectedPlans.concat(unselectedPlans);
          // tempPlan.push({
          //   planId: "123445",
          //   planName: "Enterprise",
          //   validity: "YEARLY",
          //   description:
          //     "Enterprise 12sdfsdfdfsdf fsdfsdfsdf efsdfsdfsdf sfasasd sadasdasd SSDASdsad sadasdas asdasdsa sdasdsad asdasd asdas adsadsadsdsds ",
          //   shortDescription: "Enterprise",
          //   price: 0,
          //   isPublic: true,
          //   rateCards: [],
          //   currency: "INR",
          //   created_At: "2024-05-09T13:10:58.000Z",
          //   updated_At: "2024-05-09T13:11:31.000Z",
          //   isActive: true,
          //   isDeleted: false,
          //   variantId: "5ac217ed-d307-4d4d-a158-6efd2943d507",
          //   isSelected: false,
          // });
          setAllPlans(tempPlan);
          callFeaturesRateCard();
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("GET PLAN API ERROR", error);
        return error;
      }
    })();
  }, [activePlanId]);

  // const featureRateCardData = [
  //   {
  //     rateCardName: "Bronze",
  //     featureRateCard: [
  //       {
  //         featureTitle: "Pre-Shipment",
  //         featureSubMenu: [
  //           {
  //             featureSubTitle: "Catalog Management",
  //             isActive: true,
  //           },
  //           {
  //             featureSubTitle: "AI based Carrier allocation",
  //             isActive: false,
  //           },
  //         ],
  //       },
  //       {
  //         featureTitle: "Order Creation",
  //         featureSubMenu: [
  //           {
  //             featureSubTitle: "Single dashboard for all orders",
  //             isActive: true,
  //           },
  //           {
  //             featureSubTitle: "Real-time serviceability check",
  //             isActive: true,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     rateCardName: "Silver",
  //     featureRateCard: [
  //       {
  //         featureTitle: "Pre-Shipment",
  //         featureSubMenu: [
  //           {
  //             featureSubTitle: "Catalog Management",
  //             isActive: false,
  //           },
  //           {
  //             featureSubTitle: "AI based Carrier allocation",
  //             isActive: true,
  //           },
  //         ],
  //       },
  //       {
  //         featureTitle: "Order Creation",
  //         featureSubMenu: [
  //           {
  //             featureSubTitle: "Single dashboard for all orders",
  //             isActive: true,
  //           },
  //           {
  //             featureSubTitle: "Real-time serviceability check",
  //             isActive: false,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     rateCardName: "Gold",
  //     featureRateCard: [
  //       {
  //         featureTitle: "Pre-Shipment",
  //         featureSubMenu: [
  //           {
  //             featureSubTitle: "Catalog Management",
  //             isActive: true,
  //           },
  //           {
  //             featureSubTitle: "AI based Carrier allocation",
  //             isActive: false,
  //           },
  //         ],
  //       },
  //       {
  //         featureTitle: "Order Creation",
  //         featureSubMenu: [
  //           {
  //             featureSubTitle: "Single dashboard for all orders",
  //             isActive: true,
  //           },
  //           {
  //             featureSubTitle: "Real-time serviceability check",
  //             isActive: true,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     rateCardName: "Platium",
  //     featureRateCard: [
  //       {
  //         featureTitle: "Pre-Shipment",
  //         featureSubMenu: [
  //           {
  //             featureSubTitle: "Catalog Management",
  //             isActive: false,
  //           },
  //           {
  //             featureSubTitle: "AI based Carrier allocation",
  //             isActive: true,
  //           },
  //         ],
  //       },
  //       {
  //         featureTitle: "Order Creation",
  //         featureSubMenu: [
  //           {
  //             featureSubTitle: "Single dashboard for all orders",
  //             isActive: true,
  //           },
  //           {
  //             featureSubTitle: "Real-time serviceability check",
  //             isActive: false,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];
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

  const assignPendingPlan = async () => {
    setLoaderForAssignValue(true);
    let payload = { planId: pendingPlan?.planId };
    try {
      const { data: responseV4 }: any = await POST(POST_ASSIGN_PLANV3, payload);
      if (responseV4?.success) {
        // console.log("responseV4", responseV4?.message.includes("Approve"));
        if (responseV4?.message.includes("Approve")) {
          toast.success(responseV4?.message);
          setIsModalOpenPlan(false);
          setLoaderForAssignValue(false);
        } else {
          setIsModalOpenPlan(false);
          setLoaderForAssignValue(false);

          toast.success(responseV4?.message);
          window.location.reload();
        }
      } else {
        setIsModalOpenPlan(false);
        setLoaderForAssignValue(false);
        toast.error(responseV4?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
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

  return (
    <>
      {/* {<ToastCustom message="hello i am from plan" />} */}
      {isActive ? (
        <div>
          <div className="">
            <div className="">
              <Breadcrum label="Plans" />
            </div>
            {loading ? (
              <div className="flex items-center justify-center w-full h-[40vh]">
                <Spinner />
              </div>
            ) : (
              <>
                {/* Plan Cards */}
                <div
                  className={`px-4 flex items-center  w-full gap-x-20 ${
                    allPlans?.length <= 4 && "lg:justify-center"
                  }  overflow-x-auto`}
                >
                  {allPlans?.map((eachPlan: any, index: any) => {
                    return (
                      <>
                        {eachPlan?.isPublic && (
                          <PlanCard
                            planId={eachPlan?.planId}
                            planName={eachPlan?.planName}
                            price={eachPlan?.price}
                            validity={eachPlan?.validity}
                            description={eachPlan?.description}
                            currencyType={eachPlan?.currency}
                            onClick={() => {
                              setIsModalOpen(true);
                              setOnSelectPlan(eachPlan);
                            }}
                            activePlanId={activePlanId}
                            isSelected={eachPlan?.isSelected}
                          />
                        )}
                      </>
                    );
                  })}
                </div>
                {/*Compare Button */}
                {/* <div className="flex justify-center ml-5  lg:hidden">
                  <ServiceButton
                    text="COMPARE"
                    className="bg-[#1c1c1c] !w-[160px] px-4 py-2 text-[#ffffff] font-semibold text-sm"
                    onClick={() => {
                      navigate("/plans/compare-plans");
                    }}
                  />
                </div> */}
                {/* feature rate card details */}
                {featureRateCardPlan?.length > 0 && (
                  <div className="border-t-2 mt-20 p-6">
                    <h1 className="font-Lato ml-4 text-[#1C1C1C] mb-2 text-[28px] font-semibold">
                      Pricing Structure
                    </h1>
                    <FeatureRateCard
                      featureRateCardData={featureRateCardPlan}
                    />
                  </div>
                )}
                {/* Table */}
                {/* <div className="hidden lg:block">
                  <ComparePlans />
                </div> */}
              </>
            )}
            {!loading && featureRateCardPlan?.length > 0 ? (
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
                            setIsModalOpenPlan(true);
                            setIsModalOpen(true);
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="">
                    {/* <ServiceButton
                  className=" md:!h-[36px] !bg-[#1C1C1C] !text-[#FFFFFF] !py-2 !px-4 !font-Open text-xs md:text-sm font-normal md:font-semibold leading-4 whitespace-nowrap"
                  text="TALK TO OUR SUPPORT"
                  onClick={() => {
                    window.open(
                      "https://support.shipyaari.com/tickets",
                      "_blank"
                    );
                  }}
                /> */}
                    <OneButton
                      text={"TALK TO OUR SUPPORT"}
                      onClick={() => {
                        window.open(
                          "https://support.shipyaari.com/tickets",
                          "_blank"
                        );
                      }}
                      variant="primary"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* Bottom NavBar */}
          {/* <div className="lg:hidden">
            <BottomNavBar />
          </div> */}
          {/* Modal */}
          <CenterModal
            isOpen={isModalOpen}
            className=" !flex !justify-center !items-center !w-[320px] !h-[320px]  lg:!w-[500px] lg:!h-[320px]"
            onRequestClose={() => setIsModalOpen(false)}
          >
            {ModalContent()}
          </CenterModal>

          {isModalOpenPlan && (
            <CenterModal
              isOpen={isModalOpenPlan}
              onRequestClose={() => setIsModalOpenPlan(false)}
              className="md:h-[65%] md:w-[65%] h-[55%] lg:h-[60%%] lg:w-[50%] xl:h-[60%] 2xl:h-[56%] xl:w-[40%]"
            >
              <>
                <div className=" w-full gap-y-6 p-4 flex flex-col">
                  <div className="flex items-center justify-end">
                    <div
                      onClick={() => {
                        setIsModalOpenPlan(false);
                      }}
                      className="flex justify-end"
                    >
                      <img
                        alt=""
                        className="cursor-pointer"
                        src={WebCrossIcon}
                      />
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
                      {LoaderForAssignValue ? (
                        <div className="flex justify-center items-center lg:!w-[184px] lg:!h-[54px] lg:!py-[18px] lg:!px-[80px] !rounded-[4px]">
                          <Spinner />
                        </div>
                      ) : (
                        <CustomButton
                          text="yes"
                          onClick={assignPendingPlan}
                          className="lg:!w-[184px] lg:!h-[54px] lg:!py-[18px] lg:!px-[80px] !rounded-[4px]"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            </CenterModal>
          )}
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default Index;
