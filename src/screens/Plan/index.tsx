import React, { useEffect, useState } from "react";
import PlanCard from "./planCard";
import { Breadcrum } from "../../components/Layout/breadcrum";
import "../../styles/plan.css";
import {
  GET_ALL_PLANS,
  POST_ASSIGN_PLANV3,
  POST_CREATE_PLAN,
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

interface ITypeProps {}

const Index = (props: ITypeProps) => {
  const navigate = useNavigate();
  const roles = useSelector((state: any) => state?.roles);

  // const isActive = roles.roles?.[0]?.menu?.[4]?.menu?.[0]?.pages?.[0]?.isActive;
  const isActive = checkPageAuthorized("Plans");

  const [allPlans, setAllPlans] = useState<any>([]);
  const [activePlanId, setActivePlanId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onSelectPlan, setOnSelectPlan] = useState<any>();
  const [loading, setLoading] = useState(false);

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
              <ServiceButton
                text="Yes"
                className="bg-[#ffffff] px-4 py-2 text-[#1c1c1c] font-semibold text-sm"
                onClick={() => {
                  assignPlan(onSelectPlan);
                  setIsModalOpen(false);
                }}
              />
              <ServiceButton
                text="No"
                className="bg-[#1C1C1C] px-4 py-2 text-white font-semibold text-sm"
                onClick={() => setIsModalOpen(false)}
              />
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

  useEffect(() => {
    (async () => {
      try {
        //Get all plans API
        setLoading(true);
        const { data: response }: any = await POST(GET_ALL_PLANS, {
          limit: 1000000,
        });

        if (response?.success) {
          setLoading(false);
          setAllPlans(response?.data?.reverse());
        }
      } catch (error) {
        setLoading(false);
        console.error("GET PLAN API ERROR", error);
        return error;
      }
    })();
  }, [activePlanId]);

  return (
    <>
      {isActive ? (
        <div>
          <div className=" lg:mr-6">
            <div className="lg:mb-6">
              <Breadcrum label="Plans" />
            </div>

            {loading ? (
              <div className="flex items-center justify-center w-full h-[40vh]">
                <Spinner />
              </div>
            ) : (
              <>
                {/* Plan Cards */}
                <div className="px-4 flex items-center  w-full gap-x-6   overflow-x-auto   ml-5  mb-8 lg:mb-[60px] ">
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
                <div className="flex justify-center ml-5  lg:hidden">
                  <ServiceButton
                    text="COMPARE"
                    className="bg-[#1c1c1c] !w-[160px] px-4 py-2 text-[#ffffff] font-semibold text-sm"
                    onClick={() => {
                      navigate("/plans/compare-plans");
                    }}
                  />
                </div>
                {/* Table */}
                <div className="hidden lg:block">
                  <ComparePlans />
                </div>
              </>
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
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default Index;
