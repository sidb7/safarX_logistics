import React, { useState } from "react";
import WelcomeHeader from "../welcomeHeader";
import { useMediaQuery } from "react-responsive";
import CustomInputBox from "../../../../components/Input";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CustomBottomModal from "../../../../components/CustomModal/customBottomModal";
import CompanyLogo from "../../../../assets/Navbar/ShipyaariLogos.svg";
import CrossLogo from "../../../../assets/cross.svg";
import { useNavigate } from "react-router-dom";

type Props = {};

const Index = (props: Props) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const closeModal = () => setOpenModal(false);

  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const sendOtpFormComponent = () => {
    return (
      <div className="px-5 lg:px-0">
        <div className="hidden lg:flex justify-between items-center shadow-md h-[60px] px-6 py-4 mb-6 ">
          <img src={CompanyLogo} alt="" />
          <img
            src={CrossLogo}
            alt=""
            onClick={closeModal}
            className="cursor-pointer"
          />
        </div>

        <WelcomeHeader
          title="Welcome to Shipyaari"
          content="Kindly complete your KYC"
        />

        <div className="flex flex-col justify-center items-center mt-[53px] lg:mt-[92px]  gap-y-5 mb-6">
          <CustomInputBox
            containerStyle="lg:!w-auto"
            label="GST Number"
            className="lg:!w-[320px]   !font-Open"
          />
          <CustomInputBox
            containerStyle="lg:!w-auto"
            label=" Pan Number"
            className="lg:!w-[320px] !font-Open"
          />
        </div>
        <div className="flex  lg:justify-center lg:items-center  pb-12 ">
          <ServiceButton
            text="SEND OTP"
            className="bg-[#1C1C1C] text-white w-full mb-5 lg:!w-[320px]"
            onClick={() => {
              navigate("/account/kyc-mobile-verify", {
                state: { path: "otp-form" },
              });
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      {!isBigScreen && sendOtpFormComponent()}

      {isBigScreen && (
        <CustomBottomModal
          isOpen={openModal}
          onRequestClose={closeModal}
          className="!p-0 !w-[500px] !h-[602px]"
          overlayClassName="flex  items-center"
        >
          {sendOtpFormComponent()}
        </CustomBottomModal>
      )}
    </div>
  );
};

export default Index;
