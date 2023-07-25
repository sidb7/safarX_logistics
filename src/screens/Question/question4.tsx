import Checkbox from "../../components/CheckBox";
import DroneDeliveryGif from "../../assets/AccountQuestions/DroneDelivery.gif";
import CustomButton from "../../components/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeHeader from "./welcomeHeader";
import { ResponsiveState } from "../../utils/responsiveState";
import CloseIcon from "../../assets/CloseIcon.svg";
import CompanyLogo from "../../assets/CompanyLogo/shipyaari icon.svg";
import CenterModal from "../../components/CustomModal/customCenterModal";

export const QuestionComponent4: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { isLgScreen } = ResponsiveState();
  const [isModalOpen, setIsModalOpen] = useState(true);

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

  const question4 = () => {
    return (
      <div className="relative h-full w-full">
        {isLgScreen && modalTitle()}
        <div className="flex flex-col mx-4 mt-10 lg:grid lg:grid-cols-2 lg:mt-[80px] lg:gap-x-4">
          <div>
            <WelcomeHeader welcomeClassName="lg:!mt-4" className="hidden" />
            <div className="flex justify-center">
              <img src={DroneDeliveryGif} alt="" width="180px" />
            </div>
          </div>
          <div>
            <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-4">
              <div className="">
                <span className="text-xl font-semibold">
                  How do you sell your products?
                </span>
              </div>
              <div className="flex flex-col items-start mt-4">
                <Checkbox
                  label="Online Marketplaces (Amazon, Filpkart etc.)"
                  className="text-base"
                />
                <Checkbox label="Own Website" className="text-base" />
                <Checkbox
                  label="Social Channels (Facebook, Instagram etc.)"
                  className="text-base"
                />
                <Checkbox label="Physical Store" className="text-base" />
              </div>
            </div>
            <div className="mt-6">
              <CustomButton
                text="NEXT"
                onClick={() => navigate("/account/question5")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLgScreen && isModalOpen && (
        <CenterModal
          className="h-[474px] w-[700px]"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {question4()}
        </CenterModal>
      )}

      {!isLgScreen && question4()}
    </>
  );
};
