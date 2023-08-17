import React, { useState } from "react";
import Checkbox from "../../../components/CheckBox";
import CustomButton from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import WelcomeHeader from "./welcomeHeader";
import CloseIcon from "../../../assets/CloseIcon.svg";
import CompanyLogo from "../../../assets/CompanyLogo/shipyaari icon.svg";
import { ResponsiveState } from "../../../utils/responsiveState";
import CenterModal from "../../../components/CustomModal/customCenterModal";

export const QuestionComponent5: React.FunctionComponent = () => {
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

  const note = () => {
    return (
      <div className="mt-6.5 text-[#494949] text-xs mt-[86px]">
        NOTE: KYC is mandatory for shipping orders and identification.
      </div>
    );
  };

  const question5 = () => {
    return (
      <div className="relative h-full w-full">
        {isLgScreen && modalTitle()}
        <div className="flex flex-col mx-4 mt-10 lg:grid lg:grid-cols-2 lg:mt-[100px] lg:gap-x-4">
          <div>
            <WelcomeHeader
              welcomeLabel="For account activation kindly complete the KYC"
              welcomeClassName="lg:!mt-0"
              className="hidden"
            />
            {isLgScreen && note()}
          </div>
          <div>
            <div className="flex flex-col px-4 py-4 border-[1px] border-[#E8E8E8] rounded-md shadow-lg mt-[50px] lg:mt-0">
              <div className="">
                <span className="text-xl font-semibold">
                  Benefits of doing KYC
                </span>
              </div>
              <div className="flex flex-col items-start mt-4">
                <Checkbox label="Faster COD pay-outs" className="text-base" />
                <Checkbox
                  label="Faster hiccup free shipping"
                  className="text-base"
                />
                <Checkbox
                  label="Protection against Identity Theft"
                  className="text-base"
                />
                <Checkbox label="Regulatory compliance" className="text-base" />
              </div>
            </div>
            <div className="mt-6">
              <CustomButton
                text="PROCEED FOR KYC"
                onClick={() => navigate("/onboarding/kyc-type")}
              />
            </div>

            <div className="flex justify-center text-[#004EFF] text-sm underline underline-offset-4	decoration-[#004EFF] mt-4">
              SKIP FOR NOW
            </div>
            {!isLgScreen && note()}
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
          {question5()}
        </CenterModal>
      )}

      {!isLgScreen && question5()}
    </>
  );
};
