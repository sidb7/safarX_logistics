import Checkbox from "../../../components/CheckBox";
import CustomButton from "../../../components/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeHeader from "./welcomeHeader";
import Onboarding from "../../../assets/AccountQuestions/Onboarding.gif";
import CloseIcon from "../../../assets/CloseIcon.svg";
import CompanyLogo from "../../../assets/CompanyLogo/shipyaari icon.svg";
import { ResponsiveState } from "../../../utils/responsiveState";
import CenterModal from "../../../components/CustomModal/customCenterModal";

export const QuestionComponent2: React.FunctionComponent = () => {
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

  const question2 = () => {
    return (
      <div className="relative h-full w-full">
        {isLgScreen && modalTitle()}
        <div className="flex flex-col mx-4 mt-10 lg:grid lg:grid-cols-2 lg:mt-[80px] lg:gap-x-4">
          <div>
            <WelcomeHeader welcomeClassName="!mt-4" className="hidden" />
            <div className="flex justify-center">
              <img src={Onboarding} alt="" width="180px" />
            </div>
          </div>
          <div>
            <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-4 lg:mt-[18px]">
              <div className="">
                <span className="text-xl font-semibold">Describe yourself</span>
              </div>
              <div className="flex flex-col items-start mt-4">
                <Checkbox
                  label="Trader / wholesaler / Reseller"
                  className="text-base"
                />
                <Checkbox label="D2C Brand" className="text-base" />
                <Checkbox
                  label="Individual selling on marketplace"
                  className="text-base"
                />
                <Checkbox label="Social seller" className="text-base" />
                <Checkbox label="Other" className="text-base" />
              </div>
            </div>
            <div className="mt-6">
              <CustomButton
                text="NEXT"
                onClick={() => navigate("/onboarding/questionnaire/question3")}
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
          className="h-[474px] w-[688px]"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {question2()}
        </CenterModal>
      )}

      {!isLgScreen && question2()}
    </>
  );
};
