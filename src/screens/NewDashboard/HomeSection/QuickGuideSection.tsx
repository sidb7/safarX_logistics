import React, { useEffect, useRef, useState } from "react";
import AccordionItem from "./AccordianItem";
import HomeGif from "../../../assets/girl doing research on app.gif";
import { ResponsiveState } from "../../../utils/responsiveState";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { COMPANY_NAME } from "../../../utils/ApiUrls";

interface IQuickGuideSectionProps {
  completedStatus: any;
  // setCompletedStatus: any;
  mandatoryCheck: any;
  // setMandatoryCheck: any;
  accordianItems: any;
  setAccordianItems: any;
  onAccordionComplete: any;
}

const QuickGuideSection: React.FunctionComponent<IQuickGuideSectionProps> = ({
  completedStatus,
  // setCompletedStatus,
  mandatoryCheck,
  // setMandatoryCheck,
  accordianItems,
  setAccordianItems,
  onAccordionComplete,
}) => {
  const location = useLocation();
  const kycRef = useRef<HTMLDivElement | null>(null); // Ref for KYC section
  // const brandDetailsRef = useRef<HTMLDivElement | null>(null); // Ref for brandDetails section
  const { isXlScreen } = ResponsiveState();
  const [loadingState, setLoadingState] = useState(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [bankLoadingState, setBankLoadingState] = useState(null);
  const [brandLoadingState, setBrandLoadingState] = useState(null);
  const [isComponentMounted, setIsComponentMounted] = useState(false);

  const sectionRoutes: any = {
    verifyAccount: "/onboarding/get-started",
    kyc: "/onboarding/kyc-welcome",
    bankDetails: "/onboarding/cash-on-delivery",
    planDetails: "/subscription/plans",
    customizeLabels: "/settings/label-settings",
  };

  // const toggleItem = (index: number) => {
  //   if (loadingState) return; // Prevent toggling if an API call is in progress
  //   setOpenIndex(openIndex === index ? null : index);
  // };

  const toggleItem = (index: number, section: string) => {
    // Check if loading is in progress
    if (loadingState) return;

    // Check if the selected section is 'bankDetails' and KYC is not completed
    if (section === "bankDetails" && !mandatoryCheck?.kyc) {
      toast.error("KYC is not completed. Please complete KYC to proceed.");
      return; // Stop execution to prevent opening the bank section
    }

    if (section === "brandDetails" && !mandatoryCheck?.kyc) {
      toast.error("KYC is not completed. Please complete KYC to proceed.");
      return; // Stop execution to prevent opening the bank section
    }

    // If not loading and no KYC issue, toggle the accordion item
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleClick = (index: number, section: string) => {
    toggleItem(index, section);
    handleSectionSelect(section);
  };

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };

  useEffect(() => {
    if (isComponentMounted && location.state?.openSection) {
      const sectionToOpen = location.state.openSection;

      // Find the index of the section you want to open
      const sectionIndex = accordianItems.findIndex(
        (item: any) => item.section === sectionToOpen
      );

      if (sectionIndex !== -1) {
        // First, toggle open the accordion
        toggleItem(sectionIndex, sectionToOpen);
        handleSectionSelect(sectionToOpen);

        // Add a slight delay before scrolling to ensure accordion is opened
        setTimeout(() => {
          if (
            sectionToOpen === "kyc" &&
            !completedStatus["kyc"] &&
            kycRef.current
          ) {
            kycRef.current.scrollIntoView({ behavior: "smooth" });
          }
          // if (
          //   sectionToOpen === "brandDetails" &&
          //   !completedStatus["brandDetails"] &&
          //   brandDetailsRef.current
          // ) {
          //   brandDetailsRef.current.scrollIntoView({ behavior: "smooth" });
          // }
        }, 300); // Delay of 300ms to ensure accordion opens first
      }
    }
  }, [location.state, accordianItems, isComponentMounted]);

  // Set component as mounted once it's fully rendered
  useEffect(() => {
    setIsComponentMounted(true); // Set as mounted when component renders
  }, []);

  // to toggle open the accordians with different use cases
  useEffect(() => {
    if (accordianItems.length > 0) {
      const firstItemSection = accordianItems[0]?.section;

      // Prevent opening the bank section if KYC is not completed
      if (firstItemSection !== "bankDetails" || mandatoryCheck?.kyc) {
        toggleItem(0, firstItemSection); // Only toggle if it's not bankDetails or KYC is completed
      }
    }
  }, [loadingState, accordianItems, bankLoadingState]);

  // to update the completed status as soon as its verification is done
  useEffect(() => {
    let indexOfKyc = accordianItems.findIndex((e: any) => e.section === "kyc");
    if (indexOfKyc > -1 && loadingState === false) {
      onAccordionComplete(indexOfKyc, {
        section: accordianItems[indexOfKyc].section,
      });
    }
    let indexOfBank = accordianItems.findIndex(
      (e: any) => e.section === "bankDetails"
    );
    if (indexOfBank > -1 && bankLoadingState === false) {
      onAccordionComplete(indexOfBank, {
        section: accordianItems[indexOfBank].section,
      });
    }
    let indexOfBrand = accordianItems.findIndex(
      (e: any) => e.section === "brandDetails"
    );
    if (indexOfBrand > -1 && brandLoadingState === false) {
      onAccordionComplete(indexOfBrand, {
        section: accordianItems[indexOfBrand].section,
      });
    }
  }, [loadingState, bankLoadingState, brandLoadingState]);

  return (
    <>
      <div className="bg-gradient-to-br from-[#F0F4FE] via-[#E7E4FF] to-[#CFDFFF] py-10 px-4 md:px-10 lg:py-[50px] lg:px-20 transition-all duration-500 animate-fadein">
        <div className="flex flex-col items-start gap-y-4 mb-2">
          <h1 className="text-2xl lg:text-3xl text-[#160783] font-Open font-extrabold leading-7 lg:leading-10 tracking-tight">
            Your Quick Start Guide to{" "}
            <span className="text-[#9082FF]">{COMPANY_NAME}</span>
          </h1>
          <p className="font-Open text-base lg:text-lg font-normal leading-6 text-[#697586] max-w-2xl">
            Quickly learn how to set up and use {COMPANY_NAME} with this
            easy-to-follow guide. It covers everything you need to start
            managing your shipments efficiently and effectively.
          </p>
        </div>
        <div className="py-6 lg:py-10 px-2 lg:px-8 flex flex-col lg:flex-row bg-white rounded-[28px] shadow-2xl my-6 lg:my-[32px] gap-8 items-center transition-all duration-500 animate-fadein">
          {isXlScreen && (
            <div className="flex justify-center items-center flex-shrink-0">
              <img
                src={"https://i.postimg.cc/MKfttmyY/20945996.jpg"}
                loading="lazy"
                alt="home-screen"
                width={isXlScreen ? 340 : 220}
                className="rounded-2xl animate-fadein"
              />
            </div>
          )}
          <div className="flex-1 w-full" ref={kycRef}>
            <div className="space-y-4">
              {accordianItems?.map((item: any, index: number) => (
                <div key={index} className="animate-fadein">
                  <AccordionItem
                    key={index}
                    title={item?.title}
                    content={item?.content}
                    isOpen={openIndex === index}
                    onClick={() => {
                      if (!loadingState) {
                        handleClick(index, item?.section);
                      }
                    }}
                    completed={completedStatus[item.section]}
                    section={item.section}
                    selectedSection={selectedSection}
                    mandatoryCheck={mandatoryCheck}
                    sectionRoutes={sectionRoutes}
                    loadingState={loadingState}
                    setLoadingState={setLoadingState}
                    bankLoadingState={bankLoadingState}
                    setBankLoadingState={setBankLoadingState}
                    brandLoadingState={brandLoadingState}
                    setBrandLoadingState={setBrandLoadingState}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickGuideSection;

/* Add this to your global CSS or Tailwind config:
@keyframes fadein {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadein {
  animation: fadein 0.7s cubic-bezier(0.4,0,0.2,1) both;
}
*/
