import * as React from "react";
import CenterModal from "../CustomModal/customCenterModal";
import CompanyLogo from "../../assets/CompanyLogo/shipyaari icon.svg";
import CloseIcon from "../../assets/CloseIcon.svg";

interface ICheckIsOnlineProps {}

const CheckIsOnline: React.FunctionComponent<ICheckIsOnlineProps> = (props) => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    // Add event listeners to track online/offline status
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      // Remove event listeners when component unmounts
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOnline]);

  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
  };

  return (
    <CenterModal
      isOpen={!isOnline}
      onRequestClose={() => {}}
      className="min-w-0 max-w-lg min-h-0 max-h-[30%]"
    >
      <div className="relative h-full w-full">
        <div className="product-box sticky z-10 bg-white flex justify-between items-center w-full h-[60px] top-0">
          <img
            className="my-auto ml-6  h-[25px] object-contain"
            src={CompanyLogo}
            alt="Company Logo"
          />
          <img
            className="my-auto mr-6"
            src={CloseIcon}
            alt="Close"
            onClick={() => {}}
          />
        </div>
        <div className="flex flex-col items-center h-[calc(100%-60px)]">
          <div className="flex mt-6 font-semibold text-xl">
            Network Connection
          </div>
          <div className="flex mt-6 font-normal text-base">
            {isOnline ? "You are Online" : "You are Offline"}
          </div>
        </div>
      </div>
    </CenterModal>
  );
};

export default CheckIsOnline;
