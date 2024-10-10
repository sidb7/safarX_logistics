import React, { useEffect, useState } from "react";
// import OneButton from "../../../components/Button/OneButton";
import HomeGif from "../../../assets/girl doing research on app.gif";
// import { useNavigate } from "react-router-dom";
import { ResponsiveState } from "../../../utils/responsiveState";
import { retrieveLocalStorageData } from "../../../utils/utility";
// import toast from "react-hot-toast";
import AccordionItem from "./AccordianItem";
import WelcomeHeader from "./WelcomeHeader";
import TopCardSection from "./TopCardSection";
import QuickGuideSection from "./QuickGuideSection";
import GuidelinesSection from "./GuidelinesSection";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const { isLgScreen, isXlScreen } = ResponsiveState();
  // const navigate = useNavigate();

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
      />
      {/* packaging guidelines container  */}
      <GuidelinesSection />
    </>
  );
};

export default Home;
