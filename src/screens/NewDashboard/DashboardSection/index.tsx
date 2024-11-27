import React, { useEffect, useState } from "react";
import DashboardNewUserIcon from "../../../assets/dashboardNewUser.svg";
import ComingSoonIcon from "../../../assets/Coming Soon.svg";
import OneButton from "../../../components/Button/OneButton";
import { useNavigate } from "react-router-dom";
import { retrieveLocalStorageData } from "../../../utils/utility";

interface KycData {
  isReturningUser: boolean;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isReturningUser, setIsReturningUser] = useState<boolean | null>(null);

  useEffect(() => {
    const kycData = retrieveLocalStorageData("kycValue") as KycData | null;

    if (kycData?.isReturningUser !== undefined) {
      setIsReturningUser(kycData.isReturningUser);
    }
  }, []);

  const handleAddOrder = () => {
    navigate("/orders/quick-order-place");
  };

  const renderNewUserContent = () => (
    <div className="h-[calc(100vh-220px)] flex flex-col items-center justify-center gap-y-[35px]">
      <img
        src={DashboardNewUserIcon}
        alt="New user dashboard"
        width={370}
        height={370}
        className="object-contain"
      />

      <p className="font-Lato font-bold text-2xl leading-8 text-center">
        Place your first order to unlock access to your analytics
      </p>

      <OneButton
        onClick={handleAddOrder}
        text="Add Order"
        variant="primary"
        className="!text-[14px] !font-Open !font-semibold !leading-5 !px-4 !py-2"
      />
    </div>
  );

  const renderComingSoonContent = () => (
    <div className="h-[calc(100vh-360px)] flex flex-col items-center justify-center">
      <img
        src={ComingSoonIcon}
        alt="Coming soon"
        width={320}
        height={320}
        className="object-contain"
      />
    </div>
  );

  const dashboard = () => (
    <>
      <div>the tabs to go here</div>
    </>
  );

  // Render null while loading
  if (isReturningUser === null) {
    return null;
  }

  return isReturningUser ? renderComingSoonContent() : renderNewUserContent();
};

export default Dashboard;
