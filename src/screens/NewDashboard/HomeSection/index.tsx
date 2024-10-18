import React, { useEffect, useState } from "react";
import { retrieveLocalStorageData } from "../../../utils/utility";
import WelcomeHeader from "./WelcomeHeader";
import TopCardSection from "./TopCardSection";
import QuickGuideSection from "./QuickGuideSection";
import GuidelinesSection from "./GuidelinesSection";

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
    planDetails: false,
    customizeLabels: false,
    returningUser: false,
    channelIntegrated: false,
  });

  useEffect(() => {
    const kycValue = retrieveLocalStorageData("kycValue");
    const userName = localStorage.getItem("userName");
    if (userName !== null && userName !== undefined) {
      setUserName(userName);
    }

    if (kycValue?.nextStep) {
      setMandatoryCheck(kycValue.nextStep);

      const { kyc, bank, isChannelIntegrated, qna } = kycValue.nextStep;

      const updatedStatus = {
        ...completedStatus,

        kyc: !!kyc,
        bankDetails: !!bank,
        qna: !!qna,
        channelIntegrated: !!isChannelIntegrated,
        walletRecharge: !!kycValue?.isWalletRechage,
        returningUser: !!kycValue?.isReturningUser,
      };

      setCompletedStatus(updatedStatus);
    }
  }, []);

  return (
    <>
      {/* welcome message */}
      <WelcomeHeader userName={userName} />
      {/* top reroute section  */}
      <TopCardSection completedStatus={completedStatus} />
      {/* the center accordian part  */}
      <QuickGuideSection
        completedStatus={completedStatus}
        mandatoryCheck={mandatoryCheck}
        accordianItems={accordianItems}
        setAccordianItems={setAccordianItems}
      />
      {/* packaging guidelines container  */}
      <GuidelinesSection />
    </>
  );
};

export default Home;
