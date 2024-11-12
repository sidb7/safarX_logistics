import React, { useEffect, useState } from "react";
import { retrieveLocalStorageData } from "../../../utils/utility";
import WelcomeHeader from "./WelcomeHeader";
import TopCardSection from "./TopCardSection";
import QuickGuideSection from "./QuickGuideSection";
import GuidelinesSection from "./GuidelinesSection";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import CompanyNameContent from "./accordianSections/CompanyNameContent";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
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
      title: "Brand Profile Management",
      content:
        "Key your brand presence consistent and professional by updating your brand name and logo. This shall be updated in your shipping labels.",
      section: "brandDetails",
      completed: false,
    },
    {
      title: "Become a COD Seller",
      content:
        "Get access to seamless COD payouts by verifying your bank Details.",
      section: "bankDetails",
      completed: false,
    },
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
  const [accordianItems, setAccordianItems]: any = useState(items);
  const [userName, setUserName] = useState<any>("");
  const [mandatoryCheck, setMandatoryCheck] = useState<any>();
  const [completedStatus, setCompletedStatus] = useState<{
    [key: string]: boolean;
  }>({
    verifyAccount: true,
    qna: false,
    kyc: false,
    bankDetails: false,
    walletRecharge: false,
    brandDetails: false,
    planDetails: false,
    customizeLabels: false,
    returningUser: false,
    channelIntegrated: false,
  });

  const [openCentreModal, setOpenCentreModal] = useState(false);

  // List of invalid company names
  const invalidCompanyNames = [null, undefined, "", "N/A", "NA", "n/a", "na"];

  // Function to update the `completed` status of a specific accordion item
  const handleAccordionComplete = (index: number, { section }: any) => {
    const updatedItems = [...accordianItems];
    updatedItems[index].completed = true; // Mark the item as completed
    setAccordianItems(updatedItems); // Update the state

    if (
      section === "kyc" ||
      section === "bankDetails" ||
      section === "brandDetails"
    ) {
      let obj = completedStatus;
      obj[section] = true;
      setCompletedStatus({ ...obj });
    }
  };

  useEffect(() => {
    const kycValue = retrieveLocalStorageData("kycValue");
    const userName = localStorage.getItem("userName");
    const brandDetails = localStorage.getItem("brandDetails");
    const brandName = kycValue?.privateCompany?.brandName;
    let privateCompanyName = kycValue?.privateCompany?.name;
    // const isCompanyNameInvalid =
    //   !privateCompanyName ||
    //   privateCompanyName.trim() === "" ||
    //   privateCompanyName === "N/A";

    // Check if the company name is invalid
    const isCompanyNameInvalid = invalidCompanyNames.includes(
      privateCompanyName?.trim()
    );

    if (userName !== null && userName !== undefined) {
      setUserName(userName);
    }

    if (kycValue?.nextStep) {
      setMandatoryCheck(kycValue.nextStep);

      const { kyc, bank, isChannelIntegrated, qna } = kycValue.nextStep;
      // Check if companyName is not an empty string or undefined
      const isBrandDetailsValid =
        brandName &&
        brandName.trim() !== "" &&
        brandName.trim().toUpperCase() !== "N/A";

      const updatedStatus = {
        ...completedStatus,
        kyc: !!kyc,
        bankDetails: !!bank,
        qna: !!qna,
        channelIntegrated: !!isChannelIntegrated,
        walletRecharge: !!kycValue?.isWalletRechage,
        returningUser: !!kycValue?.isReturningUser,
        brandDetails: isBrandDetailsValid || !!brandDetails,
      };

      setCompletedStatus(updatedStatus);
    }
    if (kycValue?.nextStep?.kyc && isCompanyNameInvalid) {
      setOpenCentreModal(true);
    }
  }, []);

  return (
    <>
      {/* welcome message */}
      <WelcomeHeader userName={userName} completedStatus={completedStatus} />
      {/* top reroute section  */}
      <TopCardSection completedStatus={completedStatus} />
      {/* the center accordian part  */}
      <QuickGuideSection
        completedStatus={completedStatus}
        mandatoryCheck={mandatoryCheck}
        accordianItems={accordianItems}
        setAccordianItems={setAccordianItems}
        onAccordionComplete={handleAccordionComplete}
      />
      {/* packaging guidelines container  */}
      <GuidelinesSection />
      <CenterModal
        isOpen={openCentreModal}
        onRequestClose={() => setOpenCentreModal(false)}
        className="!flex !justify-start !items-center w-[60%] lg:!w-3/4 lg:!h-3/4 xl:!w-[45%]  xl:!h-2/3 "
      >
        <CompanyNameContent setOpenCentreModal={setOpenCentreModal} />
      </CenterModal>
    </>
  );
};

export default Home;
