import React, { useState } from "react";
import WelcomeHeader from "../welcomeHeader";
import { useMediaQuery } from "react-responsive";
import CustomInputBox from "../../../../components/InputBox";
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

  return (
    <div>
    
      <div className="px-5 lg:hidden">
        <WelcomeHeader
          title="Welcome to Shipyaari"
          content="Kindly complete your KYC"
        />

        <div className="flex flex-col items-center gap-y-5 mb-6">
          <CustomInputBox label="Enter Aadhar Number" />
          <CustomInputBox label="Enter Pan Number" />
        </div>
        <div className="flex flex-col  pb-12">
          <ServiceButton
            text="SEND OTP"
            className="bg-[#1C1C1C] text-white w-full mb-5"
            onClick={() => {
              navigate("/account/kyc-mobile-verify");
            }}
          />
        </div>
      </div>

      {isBigScreen && (
        <div className="mx-4 hidden lg:block lg:h-[602px]">
          <CustomBottomModal
            isOpen={openModal}
            onRequestClose={closeModal}
            className="!p-0 !w-[500px] !h-[700px]"
            overlayClassName="flex  items-center"
          >
            <div className=" hidden lg:block">
            <div className="flex justify-between items-center shadow-md  p-4 ">
                <img src={CompanyLogo} alt="" />
                <img src={CrossLogo} alt="" onClick={closeModal} />
              </div>
            <WelcomeHeader
              title="Welcome to Shipyaari"
              content="Kindly complete your KYC"
            />

            <div className="flex flex-col items-center gap-y-5 mb-6 mx-[90px] mt-[104px]">
              <CustomInputBox label="Aadhar Number" />
              <CustomInputBox label="Pan Number" />
              <ServiceButton
                text="SEND OTP"
                className="bg-[#1C1C1C] text-white w-full mb-5"
                onClick={() => {
                  navigate("/account/kyc-mobile-verify");
                }}
              />
            </div>
            
            </div>
          </CustomBottomModal>
        </div>
    )}
    </div>
  );
};

export default Index;
