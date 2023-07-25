import React, { useState } from "react";
import Checkbox from "../../components/CheckBox";
import CargoRatingGif from "../../assets/AccountQuestions/CargoRating.gif";
import CustomButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
import WelcomeHeader from "./welcomeHeader";
import { ResponsiveState } from "../../utils/responsiveState";
import CloseIcon from "../../assets/CloseIcon.svg";
import CompanyLogo from "../../assets/CompanyLogo/shipyaari icon.svg";
import CenterModal from "../../components/CustomModal/customCenterModal";

export const QuestionComponent3: React.FunctionComponent = () => {
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
  const question3 = () => {
    return (
      <div className="relative h-full w-full">
        {isLgScreen && modalTitle()}
        <div className="flex flex-col mx-4 mt-10 lg:grid lg:grid-cols-2 lg:mt-[80px] lg:gap-x-4">
          <div>
            <WelcomeHeader welcomeClassName="lg:!mt-4" className="hidden" />
            <div className="flex justify-center">
              <img src={CargoRatingGif} alt="" width="180px" />
            </div>
          </div>
          <div>
            <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-4">
              <div className="">
                <span className="text-xl font-semibold">
                  What is your monthly order volume?
                </span>
              </div>
              <div className="flex flex-col items-start mt-4">
                <Checkbox label="1-100" className="text-base" />
                <Checkbox label="100-500" className="text-base" />
                <Checkbox label="500-1000" className="text-base" />
                <Checkbox label="1000-5000" className="text-base" />
                <Checkbox label="Above 5000" className="text-base" />
              </div>
            </div>
            <div className="mt-6">
              <CustomButton
                text="NEXT"
                onClick={() => navigate("/account/question4")}
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
          {question3()}
        </CenterModal>
      )}

      {!isLgScreen && question3()}
    </>
  );
};
