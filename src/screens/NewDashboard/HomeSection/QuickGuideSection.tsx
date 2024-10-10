import React, { useState } from "react";
import AccordionItem from "./AccordianItem";
import HomeGif from "../../../assets/girl doing research on app.gif";
import { ResponsiveState } from "../../../utils/responsiveState";

interface IQuickGuideSectionProps {
  completedStatus: any;
  // setCompletedStatus: any;
  mandatoryCheck: any;
  // setMandatoryCheck: any;
}

const QuickGuideSection: React.FunctionComponent<IQuickGuideSectionProps> = ({
  completedStatus,
  // setCompletedStatus,
  mandatoryCheck,
  // setMandatoryCheck,
}) => {
  const { isLgScreen, isXlScreen } = ResponsiveState();
  const items = [
    {
      title: "Verify Your Account",
      content:
        "Verify your account to unlock all features of Shipyaari. Complete this step of verification process and start managing your shipments seamlessly.",
      section: "verifyAccount",
      completed: false,
    },
    {
      title: "Complete Your KYC",
      content:
        "Complete your KYC to access Shipyaari's full range of services. Complete this step for a quick and easy KYC process to ensure seamless shipping.",
      section: "kyc",
      completed: false,
    },
    {
      title: "Become a COD Seller",
      content:
        "Get access to seamless COD payouts by verifying your bank Details.",
      section: "bankDetails",
      completed: false,
    },
    // {
    //   title: "Top up your Wallet for the first time",
    //   content:
    //     "Easily view your plan details to manage your shipping services. This guide will help you access and understand your plan information with Shipyaari.",
    //   section: "walletRecharge",
    //   completed: false,
    // },
    {
      title: "View your Plan Details",
      content:
        "Easily view your plan details to manage your shipping services. This guide will help you access and understand your plan information with Shipyaari.",
      section: "planDetails",
      completed: false,
    },
    {
      title: "Customize your Labels",
      content:
        "Personalize your shipping labels by adding your brand's logo and details. This guide will help you create professional, customized labels for a seamless shipping experience.",
      section: "customizeLabels",
      completed: false,
    },
  ];
  // const [accordianItems, setAccordianItems]: any = useState(items);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const sectionRoutes: any = {
    verifyAccount: "/onboarding/get-started",
    kyc: "/onboarding/kyc-welcome",
    bankDetails: "/onboarding/cash-on-delivery",
    planDetails: "/subscription/plans",
    customizeLabels: "/settings/label-settings",
  };

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };
  return (
    <>
      <div className="bg-[#F0F4FE] py-7 px-6 lg:py-[50px] lg:px-12">
        <div className="flex flex-col items-start gap-y-4">
          <h1 className="text-lg lg:text-2xl text-[#1C1C1C] font-Open font-semibold leading-5 lg:leading-8">
            Your Quick Start Guide to Shipyaari
          </h1>
          <p className="font-Open text-sm lg:text-base font-normal leading-6 text-[#697586]">
            Quickly learn how to set up and use Shipyaari with this
            easy-to-follow guide. It covers everything you need to start
            managing your shipments efficiently and effectively.
          </p>
        </div>
        <div className="py-5 lg:py-10 px-4 lg:px-6 flex bg-white rounded-[20px] shadow-[4px_4px_15px_0px_rgba(0, 0, 0, 0.10)] my-4 lg:my-[28px]">
          {isLgScreen ? (
            <div className="flex justify-center items-center">
              <img
                src={HomeGif}
                loading="lazy"
                alt="home-screen"
                width={isXlScreen ? 450 : 300}
              />
            </div>
          ) : (
            <></>
          )}

          <div className="flex-1">
            <div className=" ">
              {items?.map((item, index) => (
                <AccordionItem
                  key={index}
                  title={item?.title}
                  content={item?.content}
                  isOpen={openIndex === index}
                  onClick={() => {
                    toggleItem(index);
                    handleSectionSelect(item?.section);
                  }}
                  completed={completedStatus[item.section] || false}
                  section={item.section} // Pass the section key here
                  selectedSection={selectedSection}
                  mandatoryCheck={mandatoryCheck}
                  sectionRoutes={sectionRoutes}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickGuideSection;
