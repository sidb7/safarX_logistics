import CompanyLogo from "./../../../assets/CompanyLogo/shipyaari icon.svg";
import CloseIcon from "./../../../assets/CloseIcon.svg";
import { useNavigate } from "react-router-dom";
import Card from "./offersCard";
import { ResponsiveState } from "../../../utils/responsiveState";
import { useState } from "react";
import CenterModal from "../../../components/CustomModal/customCenterModal";

const Index = () => {
  const navigate = useNavigate();
  const { isLgScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const skipForNowOnClick = () => {
    navigate("/onboarding/getStarted");
  };

  const modalTitle = () => {
    return (
      <div className="product-box flex justify-between items-center w-full h-[60px] absolute top-0">
        <img
          className="my-auto ml-6  h-[25px] object-contain"
          src={CompanyLogo}
          alt="Company Logo"
        />
        <img
          className="my-auto mr-6"
          src={CloseIcon}
          alt="Close"
          onClick={() => setIsModalOpen(false)}
        />
      </div>
    );
  };

  const offerScreen = () => {
    return (
      <div className="relative h-full w-full">
        {isLgScreen && modalTitle()}
        <div className="lg:mx-24 lg:mt-[84px]">
          <div className="flex flex-col gap-y-1">
            <div className="product-box flex items-center lg:hidden">
              <img
                className="m-4 h-[25px] object-contain"
                src={CompanyLogo}
                alt="CompanyLogo"
              />
            </div>

            <div className="flex flex-col mt-[55px] mx-4 gap-y-3">
              <p className="text-center text-2xl font-medium">Offers</p>
              <p className="text-center font-thin">
                Choose from our lists of offers that suits you the best.
              </p>
            </div>
            <div className="mt-4">
              <Card
                cardHeaderText="10 % EXTRA up to ₹1000"
                cardBodyText="Use standard charter Digismart credit card"
                cardFooterText="Save up to ₹500 with this code"
                wrapperClassName="!bg-[#F2FAEF]"
              />
              <Card
                cardHeaderText="10 % EXTRA up to ₹1000"
                cardBodyText="Use standard charter Digismart credit card"
                cardFooterText="Save up to ₹500 with this code"
                wrapperClassName="!bg-[#FDF6EA]"
              />
              <Card
                cardHeaderText="10 % EXTRA up to ₹1000"
                cardBodyText="Use standard charter Digismart credit card"
                cardFooterText="Save up to ₹500 with this code"
                wrapperClassName="!bg-[#F2FAEF]"
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={skipForNowOnClick}
                className="text-[#004EFF] border-b-[1px] border-[#004EFF]"
              >
                SKIP FOR NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLgScreen && isModalOpen && (
        <CenterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {offerScreen()}
        </CenterModal>
      )}

      {!isLgScreen && offerScreen()}
    </>
  );
};

export default Index;
